"use client";

export interface VoiceClientOptions {
  sessionId: string;
  wsUrl?: string;
  onStateChange?: (state: VoiceClientState) => void;
  onSpeechText?: (text: string, isFinal: boolean) => void;
  onBoardEvents?: (events: any[]) => void;
  onBoardUpdate?: (latex: any) => void;
  onMetaUpdate?: (meta: any) => void;
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
  tutorStatusLabel: string;
  dronaCaption: string;
  sessionCap: string;
  dronaCapColor: string;
}

interface AudioQueueItem {
  buffer: AudioBuffer;
  speechText?: string;
  boardText?: string;
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

  // Telemetry & Control Flags
  private isMuted: boolean = false;
  private isPaused: boolean = false;
  private isListening: boolean = true;
  private isDronaSpeaking: boolean = false;
  private isPushToTalkActive: boolean = false;
  private hasPlayedFirstChunk: boolean = false;
  private currentPlaybackPos: number = 0;
  private currentSpeechText: string = "";
  private DEBUG_AUDIO: boolean = false;

  // 20-30s PCM Ring Buffer (300 chunks of 100ms = 30s at 16kHz Int16)
  private pcmRingBuffer: Int16Array[] = [];
  private readonly maxRingBufferChunks = 300;

  // Options & Callbacks
  private options: VoiceClientOptions;

  constructor(options: VoiceClientOptions) {
    this.sessionId = options.sessionId;
    this.options = options;
  }

  public async connect(): Promise<void> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const wsBase = baseUrl.replace(/^http/, "ws");
    const wsUrl = this.options.wsUrl || `${wsBase}/drona/session/${this.sessionId}/live`;

    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(wsUrl);
        this.ws.binaryType = "arraybuffer";

        this.ws.onopen = () => {
          this.notifyState();
          this.initAudioCapture();
          resolve();
        };

        this.ws.onmessage = (event) => {
          this.handleMessage(event.data);
        };

        this.ws.onerror = (err) => {
          console.error("Drona Voice WS error:", err);
          this.options.onError?.(new Error("WebSocket error"));
          reject(err);
        };

        this.ws.onclose = () => {
          this.notifyState();
        };
      } catch (err) {
        reject(err);
      }
    });
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
        this.notifyState();
      } else if (type === "transcript_final") {
        this.options.onSpeechText?.(msg.transcript || "", true);
      } else if (type === "board_events") {
        console.log(`[BOARD EVENTS RECEIVED] count: ${(msg.events || []).length}`);
        if (msg.events && msg.events.length > 0) {
          this.options.onBoardEvents?.(msg.events);
        }
      } else if (type === "board") {
        console.log(`[BOARD EVENT RECEIVED] length: ${(msg.board || "").length}`);
        this.options.onBoardUpdate?.(msg.board || "");
      } else if (type === "audio_chunk") {
        this.isDronaSpeaking = true;
        const speechText = msg.speech || "";
        const boardEvent = msg.board_event || msg.board;
        if (msg.audio) {
          this.playAudioChunk(msg.audio, speechText, boardEvent);
        } else {
          if (speechText) {
            this.currentSpeechText = speechText;
            this.options.onSpeechText?.(speechText, false);
          }
          if (boardEvent !== undefined) {
            console.log(`[BOARD EVENT ATTACHED TO CHUNK]`, boardEvent);
            this.options.onBoardUpdate?.(boardEvent);
          }
        }
        this.notifyState();
      } else if (type === "meta") {
        this.options.onMetaUpdate?.(msg);
        if (msg.phase === "complete") {
          this.options.onSessionEnded?.();
        }
      } else if (type === "stt_too_short") {
        this.options.onSpeechText?.(msg.message || "Hold the button while you speak", false);
      } else if (type === "error") {
        console.warn("Drona Voice Server Error:", msg.message);
      }
    } catch (e) {
      console.error("Failed to parse WS message:", e);
    }
  }

  public flushAudioQueue(reason: string = "user_interrupt"): void {
    console.log(`[AUDIO FLUSH] Stopped ${this.activeSources.length} active sources and cleared ${this.pendingAudioBuffers.length} queued buffers. Reason: '${reason}'`);
    for (const source of this.activeSources) {
      try {
        source.stop();
        source.disconnect();
      } catch (e) {}
    }
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

    if (item.speechText) {
      this.currentSpeechText = item.speechText;
      this.options.onSpeechText?.(item.speechText, false);
    }
    if (item.boardText !== undefined) {
      console.log(`[BOARD EVENT RECEIVED] length: ${item.boardText.length}`);
      this.options.onBoardUpdate?.(item.boardText);
    }

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
    if (this.playbackCtx.state === "suspended") {
      this.playbackCtx.resume().then(() => {
        if (this.DEBUG_AUDIO) console.log("[AUDIO UNLOCKED] Playback AudioContext resumed successfully!");
      });
    }
  }

  public async playAudioChunk(base64Pcm: string, speechText?: string, boardText?: string): Promise<void> {
    if (!base64Pcm || typeof window === "undefined") return;
    try {
      this.unlockAudio();
      if (this.playbackCtx && this.playbackCtx.state === "suspended") {
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
      const item: AudioQueueItem = { buffer, speechText, boardText };

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
    this.nextAudioStartTime = 0;
    if (this.playbackCtx) {
      this.playbackCtx.suspend();
      this.playbackCtx = null;
    }
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
      tutorStatusLabel: statusLabel,
      dronaCaption: this.currentSpeechText,
      sessionCap: this.currentSpeechText,
      dronaCapColor: this.isDronaSpeaking ? "#EEA31F" : "#1C9B57",
    };
    this.options.onStateChange?.(state);
  }
}
