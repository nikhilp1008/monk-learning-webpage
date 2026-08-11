"use client";

export interface VoiceClientOptions {
  sessionId: string;
  wsUrl?: string;
  onStateChange?: (state: VoiceClientState) => void;
  onSpeechText?: (text: string, isFinal: boolean) => void;
  onBoardEvents?: (events: any[]) => void;
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
    const wsUrl = this.options.wsUrl || `${wsBase}/drona/session/${this.sessionId}/live?token=${encodeURIComponent(token)}`;

    this.ws = new WebSocket(wsUrl);
    this.ws.binaryType = "arraybuffer";

    this.ws.onopen = () => {
      const isReconnect = this.reconnectAttempts > 0;
      this.reconnectAttempts = 0;
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
          const pipelineIdle =
            !this.isDronaSpeaking &&
            this.activeSources.length === 0 &&
            this.pendingAudioBuffers.length === 0 &&
            this.turnCompleteTimer === null &&
            !this.pendingReveals.some((r) => !r.fired);
          if (pipelineIdle && Array.isArray(msg.check_options) && msg.check_options.length > 0) {
            console.log("[STATE FRAME - IDLE FLUSH] No audio in flight; applying question/chips immediately.");
            this.options.onTurnComplete?.();
          }
        }
        this.notifyState();
      } else if (type === "transcript_final") {
        this.options.onSpeechText?.(msg.transcript || "", true);
      } else if (type === "board_events") {
        console.log(`[BOARD EVENTS RECEIVED] count: ${(msg.events || []).length}`);
        if (msg.events && msg.events.length > 0) {
          this.options.onBoardEvents?.(msg.events);
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
        if (this.turnErrorRecoveryTimer) {
          clearTimeout(this.turnErrorRecoveryTimer);
          this.turnErrorRecoveryTimer = null;
        }
        this.isDronaSpeaking = true;
        const speechText = msg.speech || "";
        const boardEvent = msg.board_event || msg.board;
        const sentenceId = msg.sentence_id || "";
        if (msg.audio) {
          this.playAudioChunk(msg.audio, speechText, boardEvent, sentenceId);
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
        const outstanding = this.pendingReveals.filter((r) => !r.fired);
        const lastRevealMs = Math.max(
          0,
          outstanding.reduce((max, r) => Math.max(max, r.fireAt), 0) - performance.now()
        );
        const scheduledRemainingMs = this.playbackCtx
          ? Math.max(0, (this.nextAudioStartTime - this.playbackCtx.currentTime) * 1000)
          : 0;
        const queuedMs = this.pendingAudioBuffers.reduce((sum, item) => sum + item.buffer.duration * 1000, 0);
        const remainingAudioMs = scheduledRemainingMs + queuedMs;
        const waitMs = Math.max(lastRevealMs, remainingAudioMs);
        if (this.turnCompleteTimer) clearTimeout(this.turnCompleteTimer);
        this.turnCompleteTimer = setTimeout(() => {
          this.turnCompleteTimer = null;
          this.options.onTurnComplete?.();
        }, waitMs + 200);
      } else if (type === "stt_too_short") {
        this.options.onSpeechText?.(msg.message || "Hold the button while you speak", false);
      } else if (type === "error") {
        console.warn("Drona Voice Server Error:", msg.message);
      }
    } catch (e) {
      console.error("Failed to parse WS message:", e);
    }
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

    // Schedule caption & board event release at EXACT audio playback time (startTime = currentTime + leadTime)
    const leadTimeMs = Math.max(0, (startTime - currentTime) * 1000);

    this.armReveal(() => {
      const t0 = performance.now();
      if (item.speechText) {
        this.currentSpeechText = item.speechText;
        this.options.onSpeechText?.(item.speechText, false);
      }
      if (item.boardText !== undefined && item.boardText !== null) {
        this.options.onBoardUpdate?.(item.boardText);
      }
      const tDomOffset = performance.now() - t0;

      console.log(
        `🎧 [REAL PLAYBACK SYNC] sentence_id=${item.sentenceId || "unknown"} | Audio Start | Queue Lead=${leadTimeMs.toFixed(1)}ms | DOM Offset=${tDomOffset.toFixed(2)}ms`
      );
    }, leadTimeMs);

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

    if (leadTime < 2.0) {
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

  public async playAudioChunk(base64Pcm: string, speechText?: string, boardText?: any, sentenceId?: string): Promise<void> {
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
      const item: AudioQueueItem = { buffer, sentenceId, speechText, boardText };

      // Capped lookahead (Max 2.0s ahead of speech playback)
      if (leadTime > 2.0) {
        if (this.DEBUG_AUDIO) console.log(`[AUDIO QUEUE BUFFERED] leadTime=${leadTime.toFixed(2)}s > 2.0s limit. Queuing chunk (${buffer.duration.toFixed(2)}s)`);
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

  public startPushToTalk(): void {
    console.log("[PTT START] Push-to-talk button activated");
    this.isPushToTalkActive = true;
    
    // Stop Drona speech immediately on barge-in
    if (this.isDronaSpeaking || this.activeSources.length > 0 || this.pendingAudioBuffers.length > 0) {
      this.flushAudioQueue("ptt_barge_in");
      this.isDronaSpeaking = false;
      // The turn being cut off is never going to reach its own turn_complete
      // now — its wait timer, if one was pending, would otherwise fire later
      // and flush this cut-off turn's leftover board/state onto whatever the
      // student interrupted it to do instead.
      if (this.turnCompleteTimer) {
        clearTimeout(this.turnCompleteTimer);
        this.turnCompleteTimer = null;
      }
      this.options.onBargeIn?.();
    }

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
    // would run ahead while paused. Hold them and re-arm on resume.
    if (this.isPaused) {
      this.pauseScheduledReveals();
    } else {
      this.resumeScheduledReveals();
    }

    this.notifyState();
  }

  public sendUtterance(text: string): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
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
    const statusLabel = !isConn
      ? "Connecting..."
      : this.isDronaSpeaking
      ? "Explaining concept"
      : this.isMuted
      ? "Muted"
      : this.isPaused
      ? "Paused"
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
