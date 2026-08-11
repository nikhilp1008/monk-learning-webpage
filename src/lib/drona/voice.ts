"use client";

export interface VoiceClientOptions {
  sessionId: string;
  wsUrl?: string;
  onStateChange?: (state: VoiceClientState) => void;
  onSpeechText?: (text: string, isFinal: boolean) => void;
  onBoardEvents?: (events: any[]) => void;
  /** Board history re-sent by the server on (re)connect — paint immediately,
   *  no reveal timing: it's what was already on the board before a refresh. */
  onBoardReplay?: (events: any[]) => void;
  onBoardUpdate?: (latex: any) => void;
  onMetaUpdate?: (meta: any) => void;
  onStateFrame?: (stateFrame: {
    phase: string;
    current_segment: number;
    check_options?: string[];
    /** The question actually asked, so the Ask Sheet shows it rather than the caption. */
    question_text?: string | null;
    /** Outcome of the student's own last answer — drives the green/red chip. */
    answer_result?: "correct" | "partial" | "incorrect" | null;
  }) => void;
  /** Turn finished streaming — flush any board lines audio never got to reveal. */
  onTurnComplete?: () => void;
  /** Push-to-talk actually cut Drona off mid-speech (as opposed to starting
   *  while she was already silent) — the caller should drop any board/state
   *  buffers held for the turn that just got cut off, since it's never
   *  reaching its own turn_complete now. */
  onBargeIn?: () => void;
  /** The student's own words, transcribed from push-to-talk. Distinct from
   *  onSpeechText, which is Drona's caption — routing the STT result through
   *  that made a dictated answer appear on screen as something the TEACHER
   *  said, and left the open question sitting there unanswered. */
  onStudentTranscript?: (text: string) => void;
  /** The socket re-opened after a drop. Any turn that was streaming on the old
   *  connection is gone — the caller should clear "responding…" state. */
  onReconnect?: () => void;
  onError?: (err: Error) => void;
  onSessionEnded?: () => void;
}

export interface VoiceClientState {
  isConnected: boolean;
  isMuted: boolean;
  isPaused: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  hasPlayedFirstChunk: boolean;
  hasTurnError: boolean;
  tutorStatusLabel: string;
  dronaCaption: string;
  sessionCap: string;
  dronaCapColor: string;
}

interface AudioQueueItem {
  buffer: AudioBuffer;
  sentenceId?: string;
  speechText?: string;
  boardText?: any;
  /** True when this frame is only the FIRST streamed part of a longer
   *  sentence, so its buffer duration is not the caption's duration. */
  isPartialSentence?: boolean;
}

/**
 * A caption + board-line reveal, armed to fire at the instant its sentence
 * starts playing. Tracked as a record rather than a bare timer id so a pause
 * can cancel it and re-arm with the time that was still outstanding.
 */
interface ScheduledReveal {
  timerId: ReturnType<typeof setTimeout> | null;
  fireAt: number;
  remainingMs: number | null;
  run: () => void;
  fired: boolean;
}

export class DronaVoiceClient {
  private sessionId: string;
  private ws: WebSocket | null = null;
  private audioCtx: AudioContext | null = null;
  private micStream: MediaStream | null = null;
  private scriptProcessor: ScriptProcessorNode | null = null;

  // Web Audio Playback Context & Capped Queue
  private playbackCtx: AudioContext | null = null;
  private nextAudioStartTime: number = 0;
  private activeSources: AudioBufferSourceNode[] = [];
  private pendingAudioBuffers: AudioQueueItem[] = [];
  private pendingReveals: ScheduledReveal[] = [];
  // The turn_complete wait used to be a bare, untracked setTimeout — a
  // barge-in mid-wait couldn't cancel it, so it fired later against a turn
  // that had already been cut off and flushed a stale board/state buffer
  // onto whatever the new turn was doing.
  private turnCompleteTimer: ReturnType<typeof setTimeout> | null = null;
  // turn_error set hasTurnError and the UI showed "...retrying" — but nothing
  // ever retried anything. If the turn genuinely recovers (another audio_chunk
  // or a real turn_complete arrives) this timer is cancelled; if not, it
  // forces the UI back out of the stuck "retrying" state so the student can
  // act instead of waiting on a promise nothing is keeping.
  private turnErrorRecoveryTimer: ReturnType<typeof setTimeout> | null = null;
  private static readonly TURN_ERROR_RECOVERY_MS = 15000;
  // When the checkpoint wait is due to fire (performance.now() clock), and how
  // much of it was left when a pause interrupted it. The timer is wall-clock
  // while the audio it waits on is audio-clock: an unpaused timer kept
  // counting through a pause, so a 90s pause put the checkpoint 90s out of
  // step with the (frozen) speech.
  private turnCompleteFireAt = 0;
  private turnCompleteRemainingMs: number | null = null;
  // Audio chunks received since the last turn_complete — distinguishes "this
  // turn simply hasn't produced audio yet / at all" from a mid-turn synthesis
  // gap when deciding whether a state frame may be applied immediately.
  private audioChunksThisTurn = 0;
  // Chunks received but still inside playAudioChunk's async decode — not yet
  // visible in pendingAudioBuffers/nextAudioStartTime, so any remaining-audio
  // math done while this is non-zero undercounts.
  private pendingDecodes = 0;
  // Serializes playAudioChunk so chunks schedule in the order they arrived.
  private audioChain: Promise<void> = Promise.resolve();

  // Telemetry & Control Flags
  private isMuted: boolean = false;
  private isPaused: boolean = false;
  private isListening: boolean = true;
  private isDronaSpeaking: boolean = false;
  private isPushToTalkActive: boolean = false;
  private hasPlayedFirstChunk: boolean = false;
  private hasTurnError: boolean = false;
  private currentPlaybackPos: number = 0;
  private currentSpeechText: string = "";
  private DEBUG_AUDIO: boolean = false;

  // 20-30s PCM Ring Buffer (300 chunks of 100ms = 30s at 16kHz Int16)
  private pcmRingBuffer: Int16Array[] = [];
  private readonly maxRingBufferChunks = 300;

  // Reconnection
  //
  // Nothing was re-opening `ws` after it closed for any reason other than an
  // explicit disconnect() — a dropped connection, a backend restart, a
  // network blip — so the client sat on "Connecting..." forever with nothing
  // actually attempting to reconnect. `manualDisconnect` distinguishes an
  // intentional close (component unmount) from one that should be retried.
  private manualDisconnect: boolean = false;
  private reconnectAttempts: number = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly maxReconnectAttempts = 6;

  // Options & Callbacks
  private options: VoiceClientOptions;

  constructor(options: VoiceClientOptions) {
    this.sessionId = options.sessionId;
    this.options = options;
  }

  public async connect(): Promise<void> {
    this.manualDisconnect = false;
    return new Promise((resolve, reject) => {
      try {
        this.openSocket(resolve);
      } catch (err) {
        reject(err);
      }
    });
  }

  /** Opens the WebSocket. `onFirstOpen` (only passed by connect()'s own Promise)
   * fires once, on whichever open succeeds first — the initial one or a retry. */
  private openSocket(onFirstOpen?: () => void): void {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const wsBase = baseUrl.replace(/^http/, "ws");
    const token = (typeof window !== "undefined" && (window as any).__E2E_MOCK_TOKEN__) || "e2e_mock_token_123";
    // Pass ?stream_tts through from the page URL, so streamed-vs-whole
    // sentence audio can be A/B'd on the deployed app without a rebuild.
    // Whole-sentence is the server default now; "1" opts back into streamed
    // parts (for working on the seam artifact), "0" stays as an explicit off.
    let passthrough = "";
    if (typeof window !== "undefined") {
      const streamFlag = new URLSearchParams(window.location.search).get("stream_tts");
      if (streamFlag === "0" || streamFlag === "1") passthrough = `&stream_tts=${streamFlag}`;
    }
    const wsUrl = this.options.wsUrl || `${wsBase}/drona/session/${this.sessionId}/live?token=${encodeURIComponent(token)}${passthrough}`;

    // Never leave a previous socket alive. `onerror` can fire WITHOUT a
    // following `close` (a transient network error on an otherwise open
    // socket), and it schedules a reconnect — so this method could replace
    // this.ws while the old socket stayed open with its handlers attached.
    // Both then fed audio_chunk frames into the same player: two turns of
    // speech playing over each other, which no amount of ordering inside the
    // queue can fix because it is two independent streams.
    const stale = this.ws;
    if (stale) {
      stale.onopen = null;
      stale.onmessage = null;
      stale.onerror = null;
      stale.onclose = null;
      if (stale.readyState === WebSocket.OPEN || stale.readyState === WebSocket.CONNECTING) {
        console.warn("[VOICE WS] Closing a still-live previous socket before reconnecting.");
        try { stale.close(); } catch {}
      }
    }

    this.ws = new WebSocket(wsUrl);
    this.ws.binaryType = "arraybuffer";

    this.ws.onopen = () => {
      const isReconnect = this.reconnectAttempts > 0;
      this.reconnectAttempts = 0;
      // Fresh connection, fresh turn accounting — a resume state frame sent by
      // the server right after this open must qualify for the idle flush even
      // if the previous connection had audio in flight when it died.
      this.audioChunksThisTurn = 0;
      this.notifyState();
      this.initAudioCapture();
      onFirstOpen?.();
      if (isReconnect) this.options.onReconnect?.();
    };

    this.ws.onmessage = (event) => {
      this.handleMessage(event.data);
    };

    this.ws.onerror = (err) => {
      console.warn("Drona Voice WS connection warning:", err);
      this.options.onError?.(new Error("WebSocket warning"));
      onFirstOpen?.();
      // A failed connection attempt (as opposed to a live connection dropping)
      // isn't guaranteed to also fire `close` — observed in practice: only
      // `error` fired for a retry against a still-down backend. Schedule from
      // here too; scheduleReconnect() is idempotent against onclose also
      // firing for the same failure.
      this.scheduleReconnect();
    };

    this.ws.onclose = () => {
      this.notifyState();
      this.scheduleReconnect();
    };
  }

  /** Idempotent: a no-op if a retry is already pending, we've given up, or
   * this is an intentional disconnect. Safe to call from both onerror and
   * onclose since either, or both, may fire for the same failure. */
  private scheduleReconnect(): void {
    if (this.manualDisconnect || this.reconnectTimer) return;

    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.warn("Drona Voice WS: giving up after", this.reconnectAttempts, "reconnect attempts");
      this.options.onError?.(new Error("WebSocket reconnect attempts exhausted"));
      return;
    }

    // Capped exponential backoff: 1s, 2s, 4s, 8s, 8s, 8s...
    const delayMs = Math.min(1000 * 2 ** this.reconnectAttempts, 8000);
    this.reconnectAttempts += 1;
    console.log(`[VOICE WS RECONNECT] Attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts} in ${delayMs}ms`);
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      if (!this.manualDisconnect) this.openSocket();
    }, delayMs);
  }

  public isReady(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }

  public async awaitReady(timeoutMs: number = 10000): Promise<boolean> {
    const start = Date.now();
    while (!this.isReady() && Date.now() - start < timeoutMs) {
      await new Promise((r) => setTimeout(r, 100));
    }
    return this.isReady();
  }

  private handleMessage(data: any): void {
    try {
      const msg = typeof data === "string" ? JSON.parse(data) : data;
      const type = msg.type;

      if (type === "state") {
        if (msg.phase === "complete") {
          this.options.onSessionEnded?.();
        }
        if (msg.phase) {
          this.options.onStateFrame?.({
            phase: msg.phase,
            current_segment: msg.current_segment || msg.segment_index || 1,
            check_options: Array.isArray(msg.check_options) ? msg.check_options : [],
            question_text: msg.question_text ?? null,
            answer_result: msg.answer_result ?? null,
          });
          // The page buffers state frames and applies them on turn_complete so
          // chips wait for the speech to finish. But when a frame arrives with
          // the WHOLE audio pipeline idle — nothing playing, nothing queued, no
          // reveal or completion timer pending — there is no speech to wait for
          // and no turn_complete coming: this is the resume-after-reconnect
          // frame for a question whose turn died with the old connection.
          // Flush immediately or the student sits on "Ready" forever.
          //
          // `audioChunksThisTurn === 0` is load-bearing: the pipeline is ALSO
          // momentarily idle mid-turn whenever TTS synthesis lags playback (a
          // gap between sentences), and the state frame routinely lands in
          // such a gap — flushing there put the question up while the turn's
          // remaining sentences were still being synthesized. Only a turn
          // that has produced no audio at all (the resume case) qualifies.
          const pipelineIdle =
            this.audioChunksThisTurn === 0 &&
            !this.isDronaSpeaking &&
            this.activeSources.length === 0 &&
            this.pendingAudioBuffers.length === 0 &&
            this.turnCompleteTimer === null &&
            !this.pendingReveals.some((r) => !r.fired);
          if (pipelineIdle && Array.isArray(msg.check_options) && msg.check_options.length > 0) {
            console.log("[STATE FRAME - IDLE FLUSH] No audio this turn; applying question/chips immediately.");
            this.options.onTurnComplete?.();
          }
        }
        this.notifyState();
      } else if (type === "transcript_final") {
        this.options.onStudentTranscript?.(msg.transcript || "");
      } else if (type === "board_events") {
        console.log(`[BOARD EVENTS RECEIVED] count: ${(msg.events || []).length}`);
        if (msg.events && msg.events.length > 0) {
          this.options.onBoardEvents?.(msg.events);
        }
      } else if (type === "board_replay") {
        console.log(`[BOARD REPLAY] restoring ${(msg.events || []).length} items after reconnect/refresh`);
        if (msg.events && msg.events.length > 0) {
          this.options.onBoardReplay?.(msg.events);
        }
      } else if (type === "turn_error") {
        console.warn("[TURN ERROR RECEIVED]", msg.message);
        this.hasTurnError = true;
        this.notifyState();
        if (this.turnErrorRecoveryTimer) clearTimeout(this.turnErrorRecoveryTimer);
        this.turnErrorRecoveryTimer = setTimeout(() => {
          this.turnErrorRecoveryTimer = null;
          if (!this.hasTurnError) return;
          console.warn("[TURN ERROR] No recovery within", DronaVoiceClient.TURN_ERROR_RECOVERY_MS, "ms — forcing the UI back out of 'retrying'.");
          this.hasTurnError = false;
          this.notifyState();
          this.options.onError?.(new Error("Turn failed and did not recover"));
          this.options.onTurnComplete?.();
        }, DronaVoiceClient.TURN_ERROR_RECOVERY_MS);
      } else if (type === "audio_chunk") {
        this.hasTurnError = false;
        this.audioChunksThisTurn += 1;
        if (this.turnErrorRecoveryTimer) {
          clearTimeout(this.turnErrorRecoveryTimer);
          this.turnErrorRecoveryTimer = null;
        }
        this.isDronaSpeaking = true;
        const speechText = msg.speech || "";
        const boardEvent = msg.board_event || msg.board;
        const sentenceId = msg.sentence_id || "";
        if (msg.audio) {
          // `continuation` is present only in streamed-TTS mode; `false` marks
          // part 1 of a sentence still being synthesized. A whole-sentence
          // frame carries no such key at all.
          this.playAudioChunk(msg.audio, speechText, boardEvent, sentenceId, msg.continuation === false);
        } else {
          // No audio (checkpoint questions are delivered as a silent caption),
          // so there's nothing to arm this against via scheduleAudioBuffer.
          // But this chunk can still carry the turn's LAST board item — reveal
          // it immediately and it jumps ahead of whatever audio is still
          // playing from earlier chunks in this same turn. Arm it for the same
          // "end of what's currently queued" time a real chunk would use,
          // just without a duration of its own to push the queue further out.
          const delayMs = this.playbackCtx
            ? Math.max(0, (this.nextAudioStartTime - this.playbackCtx.currentTime) * 1000)
            : 0;
          this.armReveal(() => {
            if (speechText) {
              this.currentSpeechText = speechText;
              this.options.onSpeechText?.(speechText, false);
              // Same reason as the word-paced reveals: the caption bar shows
              // the notifyState snapshot, and this reveal fires after the WS
              // frames have gone quiet.
              this.notifyState();
            }
            if (boardEvent !== undefined) {
              console.log(`[BOARD EVENT ATTACHED TO CHUNK]`, boardEvent);
              this.options.onBoardUpdate?.(boardEvent);
            }
          }, delayMs);
        }
        this.notifyState();
      } else if (type === "meta") {
        this.options.onMetaUpdate?.(msg);
        if (msg.phase === "complete") {
          this.options.onSessionEnded?.();
        }
      } else if (type === "turn_complete") {
        this.audioChunksThisTurn = 0;
        if (this.turnErrorRecoveryTimer) {
          clearTimeout(this.turnErrorRecoveryTimer);
          this.turnErrorRecoveryTimer = null;
        }
        // Wait for the audio to FINISH, not merely to start.
        //
        // Reveals are armed against chunk start times, so waiting on the last
        // reveal still fired while the final sentence was mid-playback — which
        // is why the question and its options appeared on screen while Drona
        // was visibly still explaining. nextAudioStartTime is the end of the
        // queue in the playback clock, so use whichever is later.
        //
        // nextAudioStartTime only reflects chunks actually handed to
        // scheduleAudioBuffer — playAudioChunk caps lookahead at 2s and parks
        // anything further out in pendingAudioBuffers, drained one at a time
        // as earlier chunks finish. For a turn with several/long chunks
        // arriving faster than they play (the normal case — synthesis and
        // network are much faster than speech), most of the queue was still
        // sitting unscheduled when turn_complete arrived, so this wait was
        // measured against only the first couple of seconds of a turn that
        // could have another 30-60s left to play. Add the still-queued
        // buffers' own durations to cover the whole thing.
        this.armTurnCompleteWait();
      } else if (type === "stt_too_short") {
        this.options.onSpeechText?.(msg.message || "Hold the button while you speak", false);
      } else if (type === "error") {
        console.warn("Drona Voice Server Error:", msg.message);
      }
    } catch (e) {
      console.error("Failed to parse WS message:", e);
    }
  }

  /** Computes how long the turn's audio still has to play and defers the
   *  page-level turn_complete until then. Retries while chunks are mid-decode:
   *  playAudioChunk decodes base64 → AudioBuffer asynchronously, so the final
   *  sentence of a turn routinely isn't IN pendingAudioBuffers yet when the
   *  turn_complete frame arrives — computing immediately undercounted the
   *  remaining audio and opened the checkpoint early. */
  private armTurnCompleteWait(retries: number = 0): void {
    if (this.pendingDecodes > 0 && retries < 40) {
      if (this.turnCompleteTimer) clearTimeout(this.turnCompleteTimer);
      this.turnCompleteTimer = setTimeout(() => {
        this.turnCompleteTimer = null;
        this.armTurnCompleteWait(retries + 1);
      }, 150);
      return;
    }

    const outstanding = this.pendingReveals.filter((r) => !r.fired);
    const lastRevealMs = Math.max(
      0,
      outstanding.reduce((max, r) => Math.max(max, r.fireAt), 0) - performance.now()
    );
    const scheduledRemainingMs = this.playbackCtx
      ? Math.max(0, (this.nextAudioStartTime - this.playbackCtx.currentTime) * 1000)
      : 0;
    const queuedMs = this.pendingAudioBuffers.reduce((sum, item) => sum + item.buffer.duration * 1000, 0);
    const waitMs = Math.max(lastRevealMs, scheduledRemainingMs + queuedMs) + 200;
    console.log(`⏱️ [SYNC] turn_complete: checkpoint due in ${(waitMs / 1000).toFixed(1)}s (reveal=${(lastRevealMs / 1000).toFixed(1)}s scheduled=${(scheduledRemainingMs / 1000).toFixed(1)}s queued=${(queuedMs / 1000).toFixed(1)}s paused=${this.isPaused})`);
    if (this.turnCompleteTimer) clearTimeout(this.turnCompleteTimer);
    this.turnCompleteFireAt = performance.now() + waitMs;
    if (this.isPaused) {
      // Paused mid-turn: hold the whole wait and start it on resume.
      this.turnCompleteRemainingMs = waitMs;
      this.turnCompleteTimer = null;
      return;
    }
    this.turnCompleteTimer = setTimeout(() => {
      this.turnCompleteTimer = null;
      console.log("⏱️ [SYNC] checkpoint wait elapsed — applying question/chips now");
      this.options.onTurnComplete?.();
    }, waitMs);
  }

  /** Arms a caption/board reveal, remembering when it is due so pause can re-arm it. */
  private armReveal(run: () => void, delayMs: number): void {
    const reveal: ScheduledReveal = {
      timerId: null,
      fireAt: performance.now() + delayMs,
      remainingMs: null,
      fired: false,
      run,
    };
    const fire = () => {
      reveal.fired = true;
      run();
    };
    reveal.timerId = this.isPaused ? null : setTimeout(fire, delayMs);
    if (this.isPaused) reveal.remainingMs = delayMs;
    this.pendingReveals.push(reveal);
  }

  private pauseScheduledReveals(): void {
    const now = performance.now();
    for (const reveal of this.pendingReveals) {
      if (reveal.fired || reveal.timerId === null) continue;
      clearTimeout(reveal.timerId);
      reveal.timerId = null;
      reveal.remainingMs = Math.max(0, reveal.fireAt - now);
    }
  }

  private resumeScheduledReveals(): void {
    const now = performance.now();
    for (const reveal of this.pendingReveals) {
      if (reveal.fired || reveal.timerId !== null) continue;
      const delay = reveal.remainingMs ?? 0;
      reveal.fireAt = now + delay;
      reveal.remainingMs = null;
      reveal.timerId = setTimeout(() => {
        reveal.fired = true;
        reveal.run();
      }, delay);
    }
  }

  private clearScheduledReveals(): void {
    for (const reveal of this.pendingReveals) {
      if (reveal.timerId !== null) {
        try {
          clearTimeout(reveal.timerId);
        } catch {}
      }
    }
    this.pendingReveals = [];
  }

  public flushAudioQueue(reason: string = "user_interrupt"): void {
    console.log(`[AUDIO FLUSH] Stopped ${this.activeSources.length} active sources, cleared ${this.pendingAudioBuffers.length} queued buffers, and cancelled ${this.pendingReveals.length} pending reveals. Reason: '${reason}'`);
    for (const source of this.activeSources) {
      try {
        source.stop();
        source.disconnect();
      } catch (e) {}
    }
    this.clearScheduledReveals();
    this.activeSources = [];
    this.pendingAudioBuffers = [];
    if (this.playbackCtx) {
      this.nextAudioStartTime = this.playbackCtx.currentTime;
    } else {
      this.nextAudioStartTime = 0;
    }
  }

  private scheduleAudioBuffer(item: AudioQueueItem): void {
    if (!this.playbackCtx) return;

    const source = this.playbackCtx.createBufferSource();
    source.buffer = item.buffer;
    source.connect(this.playbackCtx.destination);

    const currentTime = this.playbackCtx.currentTime;
    const startTime = Math.max(currentTime, this.nextAudioStartTime);
    const leadTime = startTime - currentTime;

    if (this.DEBUG_AUDIO) {
      console.log(`[AUDIO SCHEDULE] currentTime=${currentTime.toFixed(2)}s, startTime=${startTime.toFixed(2)}s (leadTime=${leadTime.toFixed(2)}s)`);
    }

    const leadTimeMs = Math.max(0, (startTime - currentTime) * 1000);

    // Board line lands BEFORE its sentence is spoken (up to 3s, bounded by the
    // queue lookahead) — reading the line first and then hearing it explained
    // beats watching the board trail the voice, especially for formulas.
    if (item.boardText !== undefined && item.boardText !== null) {
      this.armReveal(() => {
        this.options.onBoardUpdate?.(item.boardText);
        console.log(`📝 [BOARD LEAD] sentence_id=${item.sentenceId || "unknown"} board revealed ${Math.min(3000, leadTimeMs).toFixed(0)}ms ahead of audio`);
      }, Math.max(0, leadTimeMs - 3000));
    }

    // Caption tracks the sentence word-by-word across its real audio duration
    // instead of dumping the full sentence at chunk start — a long sentence
    // used to leave the caption frozen while the voice kept going, which read
    // as "out of sync" even though the chunk timing was right.
    //
    // With streamed TTS, this chunk may be only the FIRST ~1s part of its
    // sentence (continuation parts carry no text), so pace the words across
    // the estimated full-sentence duration (~14 chars/sec measured for Rumik)
    // rather than this part's length.
    //
    // Only for that case. When the frame carries a WHOLE sentence, its buffer
    // duration is the truth, and the old unconditional Math.max let the
    // 14-chars/sec estimate override it — Rumik actually runs ~15.2 chars/sec,
    // so every caption was paced ~8% slower than the voice and finished more
    // than a second behind it on a long sentence.
    if (item.speechText) {
      const words = item.speechText.split(/\s+/).filter(Boolean);
      const durationMs = item.isPartialSentence
        ? Math.max(item.buffer.duration * 1000, (item.speechText.length / 14) * 1000)
        : item.buffer.duration * 1000;
      const steps = Math.max(1, Math.min(words.length, Math.round(durationMs / 350)));
      for (let s = 1; s <= steps; s++) {
        const upTo = Math.ceil((words.length * s) / steps);
        const text = words.slice(0, upTo).join(" ");
        this.armReveal(() => {
          this.currentSpeechText = text;
          this.options.onSpeechText?.(text, false);
          // The caption bar renders sessionCap, which is a SNAPSHOT of
          // currentSpeechText taken at notifyState time — without this call
          // the bar only refreshed when a WS frame happened to arrive. Early
          // in a turn frames are still streaming in, so it looked alive; once
          // synthesis outran playback the frames stopped and the bar froze on
          // the first few words of whatever sentence was playing.
          this.notifyState();
        }, leadTimeMs + (durationMs * (s - 1)) / steps);
      }
    }

    console.log(
      `🎧 [PLAYBACK SCHEDULED] sentence_id=${item.sentenceId || "unknown"} | Queue Lead=${leadTimeMs.toFixed(1)}ms | dur=${(item.buffer.duration).toFixed(1)}s`
    );

    source.onended = () => {
      const idx = this.activeSources.indexOf(source);
      if (idx !== -1) this.activeSources.splice(idx, 1);

      if (this.activeSources.length === 0 && this.pendingAudioBuffers.length === 0) {
        if (this.DEBUG_AUDIO) console.log("[AUDIO PLAYBACK COMPLETE] All active and pending audio chunks finished playing naturally.");
        this.isDronaSpeaking = false;
        this.notifyState();
      } else {
        this.drainAudioBufferQueue();
      }
    };

    this.activeSources.push(source);
    source.start(startTime);
    this.hasPlayedFirstChunk = true;
    this.nextAudioStartTime = startTime + item.buffer.duration;
  }

  private drainAudioBufferQueue(): void {
    if (!this.playbackCtx || this.pendingAudioBuffers.length === 0) return;
    const currentTime = this.playbackCtx.currentTime;
    const leadTime = this.nextAudioStartTime - currentTime;

    // 3.5s (was 2.0s): the board line for a sentence is revealed up to 3s
    // before its audio starts, which only works if the chunk is actually
    // scheduled that far ahead.
    if (leadTime < 3.5) {
      const nextItem = this.pendingAudioBuffers.shift();
      if (nextItem) {
        this.scheduleAudioBuffer(nextItem);
      }
    }
  }

  public unlockAudio(): void {
    if (typeof window === "undefined") return;
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!this.playbackCtx) {
      this.playbackCtx = new AudioCtx({ sampleRate: 24000 });
    }
    // A paused context must STAY paused. This runs on every arriving audio
    // chunk, so without this guard the next chunk (a few seconds later) silently
    // un-paused playback — which is exactly what "pause doesn't hold" was.
    if (this.isPaused) return;
    if (this.playbackCtx.state === "suspended") {
      this.playbackCtx.resume().then(() => {
        if (this.DEBUG_AUDIO) console.log("[AUDIO UNLOCKED] Playback AudioContext resumed successfully!");
      });
    }
  }

  /** Schedules an audio chunk, STRICTLY in arrival order.
   *
   * The work below awaits (resuming a suspended context), and callers fire
   * this without awaiting — so a chunk that hit the await could be overtaken
   * by the next chunk, which scheduled itself first. One frame per sentence
   * mostly hid it; streaming makes a sentence 13-15 frames, so the reordering
   * spliced the next sentence into the middle of the current one. Chaining
   * every call onto the previous one restores order without blocking the
   * WebSocket handler.
   */
  public playAudioChunk(base64Pcm: string, speechText?: string, boardText?: any, sentenceId?: string, isPartialSentence?: boolean): Promise<void> {
    // Counted at ENQUEUE, not at execution: a chunk waiting its turn in the
    // chain is still audio this turn owes, and armTurnCompleteWait() must not
    // measure "remaining audio" until the queue has drained into the schedule.
    this.pendingDecodes += 1;
    this.audioChain = this.audioChain
      .then(() => this._playAudioChunkOrdered(base64Pcm, speechText, boardText, sentenceId, isPartialSentence))
      .catch((err) => {
        console.error("Audio chunk scheduling failed:", err);
      })
      .finally(() => {
        this.pendingDecodes = Math.max(0, this.pendingDecodes - 1);
      });
    return this.audioChain;
  }

  private async _playAudioChunkOrdered(base64Pcm: string, speechText?: string, boardText?: any, sentenceId?: string, isPartialSentence?: boolean): Promise<void> {
    if (!base64Pcm || typeof window === "undefined") return;
    try {
      this.unlockAudio();
      // Second guard: this resume is independent of unlockAudio's, and would
      // also defeat a pause. While paused we still decode and schedule the
      // chunk — the suspended context freezes its own clock, so the queue stays
      // correctly ordered and simply starts playing again on resume.
      if (!this.isPaused && this.playbackCtx && this.playbackCtx.state === "suspended") {
        await this.playbackCtx.resume();
      }

      const binary = atob(base64Pcm);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!this.playbackCtx) {
        this.playbackCtx = new AudioCtx({ sampleRate: 24000 });
      }

      const int16 = new Int16Array(bytes.buffer, bytes.byteOffset, bytes.byteLength / 2);
      const float32 = new Float32Array(int16.length);
      for (let i = 0; i < int16.length; i++) {
        float32[i] = int16[i] / 32768.0;
      }

      const buffer = this.playbackCtx.createBuffer(1, float32.length, 24000);
      buffer.getChannelData(0).set(float32);

      const currentTime = this.playbackCtx.currentTime;
      const leadTime = this.nextAudioStartTime - currentTime;
      const item: AudioQueueItem = { buffer, sentenceId, speechText, boardText, isPartialSentence };

      // Capped lookahead (max 3.5s ahead of playback, so board lines can lead
      // their sentence by up to 3s)
      if (leadTime > 3.5) {
        if (this.DEBUG_AUDIO) console.log(`[AUDIO QUEUE BUFFERED] leadTime=${leadTime.toFixed(2)}s > 3.5s limit. Queuing chunk (${buffer.duration.toFixed(2)}s)`);
        this.pendingAudioBuffers.push(item);
      } else {
        this.scheduleAudioBuffer(item);
      }
    } catch (err) {
      console.error("Audio playback error:", err);
    }
  }

  private async initAudioCapture(): Promise<void> {
    try {
      if (typeof window === "undefined" || !navigator.mediaDevices) return;

      this.micStream = await navigator.mediaDevices.getUserMedia({
        audio: { channelCount: 1, sampleRate: 16000 },
      });

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioContextClass({ sampleRate: 16000 });

      const source = this.audioCtx.createMediaStreamSource(this.micStream);
      this.scriptProcessor = this.audioCtx.createScriptProcessor(2048, 1, 1);

      source.connect(this.scriptProcessor);
      this.scriptProcessor.connect(this.audioCtx.destination);

      this.scriptProcessor.onaudioprocess = (e) => {
        if (!this.isPushToTalkActive || this.isMuted || this.isPaused || !this.ws || this.ws.readyState !== WebSocket.OPEN) {
          return;
        }

        const inputData = e.inputBuffer.getChannelData(0);
        const pcm16 = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          const s = Math.max(-1, Math.min(1, inputData[i]));
          pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
        }

        console.log(`[MIC PCM FORWARDED] ${pcm16.byteLength} bytes binary PCM audio frame sent over WebSocket`);
        this.ws.send(pcm16.buffer);
      };
    } catch (err) {
      console.warn("Microphone access denied or audio init failed:", err);
    }
  }

  // ─── Public Command Controls ─── //

  /** The student took the floor (mic or typing) while the teacher was mid-
   *  speech: silence the local pipeline and drop everything buffered for the
   *  turn being cut off. The server aborts its half (generation + TTS) when
   *  the ptt_start / utterance control lands. */
  private bargeInIfSpeaking(reason: string): void {
    if (!this.isDronaSpeaking && this.activeSources.length === 0 && this.pendingAudioBuffers.length === 0) {
      return;
    }
    // Did the turn already finish arriving? armTurnCompleteWait() only runs on
    // the turn_complete frame, so a pending wait means the whole turn —
    // question and chips included — is already here and merely waiting for its
    // audio tail to drain.
    const turnFullyArrived =
      this.turnCompleteTimer !== null || this.turnCompleteRemainingMs !== null;

    this.flushAudioQueue(reason);
    this.isDronaSpeaking = false;
    // The turn being cut off is never going to reach its own turn_complete
    // now — its wait timer, if one was pending, would otherwise fire later
    // and flush this cut-off turn's leftover board/state onto whatever the
    // student interrupted it to do instead.
    if (this.turnCompleteTimer) {
      clearTimeout(this.turnCompleteTimer);
      this.turnCompleteTimer = null;
    }
    this.turnCompleteRemainingMs = null;

    if (turnFullyArrived) {
      // Answering IS taking the floor. A checkpoint question is the last
      // sentence of its turn, so the student reaches for the mic the moment
      // they hear it — a fraction of a second before the wait timer would have
      // mounted the chips. Treating that as "discard the interrupted turn"
      // threw away the question they were answering: the Ask Sheet never
      // appeared and the page stayed in `teaching` with no chips at all.
      // The turn is complete; apply it, then let the utterance be the answer.
      console.log("[BARGE-IN] Turn had fully arrived — applying its question/chips instead of dropping them.");
      this.options.onTurnComplete?.();
    } else {
      this.options.onBargeIn?.();
    }
    this.notifyState();
  }

  public startPushToTalk(): void {
    console.log("[PTT START] Push-to-talk button activated");
    this.isPushToTalkActive = true;

    // Stop Drona speech immediately on barge-in
    this.bargeInIfSpeaking("ptt_barge_in");

    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: "ptt_start" }));
    }
    this.notifyState();
  }

  public stopPushToTalk(): void {
    console.log("[PTT STOP] Push-to-talk button released");
    this.isPushToTalkActive = false;
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: "ptt_stop" }));
    }
    this.notifyState();
  }

  public toggleMute(): void {
    this.isMuted = !this.isMuted;
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: this.isMuted ? "mute" : "unmute" }));
    }
    this.notifyState();
  }

  public interrupt(): void {
    this.isDronaSpeaking = false;
    // Previously just suspended the context and dropped the reference —
    // suspend() doesn't release anything, and losing the only reference
    // meant it could never be close()'d, leaking one AudioContext per call.
    // Chrome cuts a tab off at roughly 6 live contexts; a few interrupts in
    // one session and the next `new AudioContext()` throws, breaking audio
    // for the rest of the tab. Also skipped clearing pendingReveals, so a
    // wall-clock reveal armed for the cut-off sentence could still fire.
    this.flushAudioQueue("manual_interrupt");
    if (this.turnCompleteTimer) {
      clearTimeout(this.turnCompleteTimer);
      this.turnCompleteTimer = null;
    }
    this.turnCompleteRemainingMs = null;
    if (this.playbackCtx) {
      this.playbackCtx.close().catch(() => {});
      this.playbackCtx = null;
    }
    this.nextAudioStartTime = 0;
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(
        JSON.stringify({
          type: "interrupt",
          playback_position: this.currentPlaybackPos,
          cutoff_text: this.currentSpeechText.slice(0, this.currentPlaybackPos),
        })
      );
    }
    this.notifyState();
  }

  public togglePause(): void {
    this.isPaused = !this.isPaused;

    // Suspending the playback AudioContext freezes its currentTime, so every
    // already-scheduled BufferSource halts and resumes in place — and because
    // nextAudioStartTime is expressed in that same clock, the queue stays
    // consistent across the pause. Previously this method only flipped the
    // flag, so "Pause" changed the status label and nothing else.
    if (this.playbackCtx) {
      if (this.isPaused) {
        this.playbackCtx.suspend().catch((err) => console.warn("Pause failed:", err));
      } else {
        this.playbackCtx.resume().catch((err) => console.warn("Resume failed:", err));
      }
    }

    // Caption/board reveal timers are wall-clock, not audio-clock, so they
    // would run ahead while paused. Hold them and re-arm on resume. The
    // checkpoint's turn_complete timer is wall-clock too and was NOT held —
    // a pause of N seconds put the checkpoint N seconds out of step with the
    // frozen speech for the rest of the turn.
    if (this.isPaused) {
      this.pauseScheduledReveals();
      if (this.turnCompleteTimer) {
        clearTimeout(this.turnCompleteTimer);
        this.turnCompleteTimer = null;
        this.turnCompleteRemainingMs = Math.max(0, this.turnCompleteFireAt - performance.now());
        console.log(`⏱️ [SYNC] pause: holding checkpoint timer with ${(this.turnCompleteRemainingMs / 1000).toFixed(1)}s left`);
      }
    } else {
      this.resumeScheduledReveals();
      if (this.turnCompleteRemainingMs !== null) {
        const remaining = this.turnCompleteRemainingMs;
        this.turnCompleteRemainingMs = null;
        this.turnCompleteFireAt = performance.now() + remaining;
        console.log(`⏱️ [SYNC] resume: checkpoint timer re-armed for ${(remaining / 1000).toFixed(1)}s`);
        this.turnCompleteTimer = setTimeout(() => {
          this.turnCompleteTimer = null;
          console.log("⏱️ [SYNC] checkpoint wait elapsed — applying question/chips now");
          this.options.onTurnComplete?.();
        }, remaining);
      }
    }

    this.notifyState();
  }

  public sendUtterance(text: string): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      // Typing mid-explanation is a raised hand: cut the local audio the
      // same way holding the mic does. The server aborts its own half when
      // this utterance lands.
      this.bargeInIfSpeaking("text_barge_in");
      console.log("[WS OUTGOING] Sending utterance over WebSocket:", text);
      this.ws.send(JSON.stringify({ type: "utterance", text }));
    } else {
      console.warn("WebSocket is not open. readyState:", this.ws ? this.ws.readyState : "null");
    }
  }

  public disconnect(): void {
    this.manualDisconnect = true;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.turnCompleteTimer) {
      clearTimeout(this.turnCompleteTimer);
      this.turnCompleteTimer = null;
    }
    this.turnCompleteRemainingMs = null;
    if (this.turnErrorRecoveryTimer) {
      clearTimeout(this.turnErrorRecoveryTimer);
      this.turnErrorRecoveryTimer = null;
    }
    // Leftover reveal timers used to survive teardown and could still fire
    // afterward against page-level refs (pendingBoardRef/pendingStateRef)
    // that a fresh session effect doesn't reset — compounding stale content
    // bleeding into whatever comes next in the same tab.
    this.clearScheduledReveals();
    if (this.scriptProcessor) {
      this.scriptProcessor.disconnect();
      this.scriptProcessor = null;
    }
    if (this.micStream) {
      this.micStream.getTracks().forEach((t) => t.stop());
      this.micStream = null;
    }
    if (this.audioCtx) {
      this.audioCtx.close();
      this.audioCtx = null;
    }
    if (this.playbackCtx) {
      this.playbackCtx.close();
      this.playbackCtx = null;
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  private notifyState(): void {
    const isConn = this.ws?.readyState === WebSocket.OPEN;
    // Paused must outrank speaking: pausing suspends the audio without ending
    // it, so isDronaSpeaking stays true through the whole pause and the label
    // kept reading "Explaining concept" while everything was frozen.
    const statusLabel = !isConn
      ? "Connecting..."
      : this.isPaused
      ? "Paused"
      : this.isDronaSpeaking
      ? "Explaining concept"
      : this.isMuted
      ? "Muted"
      : this.isPushToTalkActive
      ? "Listening — Microphone active"
      : "Tap or hold mic to speak";

    const state: VoiceClientState = {
      isConnected: isConn,
      isMuted: this.isMuted,
      isPaused: this.isPaused,
      isListening: isConn && this.isPushToTalkActive && !this.isDronaSpeaking && !this.isMuted && !this.isPaused,
      isSpeaking: this.isDronaSpeaking,
      hasPlayedFirstChunk: this.hasPlayedFirstChunk,
      hasTurnError: this.hasTurnError || false,
      tutorStatusLabel: statusLabel,
      dronaCaption: this.currentSpeechText,
      sessionCap: this.currentSpeechText,
      dronaCapColor: this.isDronaSpeaking ? "#EEA31F" : "#1C9B57",
    };
    this.options.onStateChange?.(state);
  }
}
