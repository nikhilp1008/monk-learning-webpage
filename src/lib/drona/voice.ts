"use client";

export interface VoiceClientOptions {
  sessionId: string;
  wsUrl?: string;
  onStateChange?: (state: VoiceClientState) => void;
  onSpeechText?: (text: string, isFinal: boolean) => void;
  onBoardUpdate?: (latex: string) => void;
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
  tutorStatusLabel: string;
  dronaCaption: string;
  sessionCap: string;
  dronaCapColor: string;
}

export class DronaVoiceClient {
  private sessionId: string;
  private ws: WebSocket | null = null;
  private audioCtx: AudioContext | null = null;
  private micStream: MediaStream | null = null;
  private scriptProcessor: ScriptProcessorNode | null = null;

  // Web Audio Playback Context & Queue
  private playbackCtx: AudioContext | null = null;
  private nextAudioStartTime: number = 0;

  // Telemetry & Control Flags
  private isMuted: boolean = false;
  private isPaused: boolean = false;
  private isListening: boolean = true;
  private isDronaSpeaking: boolean = false;
  private currentPlaybackPos: number = 0;
  private currentSpeechText: string = "";

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
      } else if (type === "board") {
        this.options.onBoardUpdate?.(msg.board || "");
      } else if (type === "audio_chunk") {
        console.log("audio_chunk", msg.audio ? msg.audio.length : 0);
        this.isDronaSpeaking = true;
        this.currentSpeechText = msg.speech || "";
        this.options.onSpeechText?.(this.currentSpeechText, false);

        if (msg.audio) {
          this.playAudioChunk(msg.audio);
        }
        this.notifyState();
      } else if (type === "meta") {
        this.options.onMetaUpdate?.(msg);
        if (msg.phase === "complete") {
          this.options.onSessionEnded?.();
        }
      } else if (type === "error") {
        console.warn("Drona Voice Server Error:", msg.message);
      }
    } catch (e) {
      console.error("Failed to parse WS message:", e);
    }
  }

  public playAudioChunk(base64Pcm: string): void {
    if (!base64Pcm || typeof window === "undefined") return;
    try {
      const binary = atob(base64Pcm);
      console.log("base64 decode length:", binary.length);

      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!this.playbackCtx) {
        this.playbackCtx = new AudioCtx({ sampleRate: 24000 });
      }

      console.log("AudioContext state:", this.playbackCtx.state, "sampleRate:", this.playbackCtx.sampleRate);

      if (this.playbackCtx.state === "suspended") {
        console.warn("AudioContext is suspended by browser autoplay policy! Resuming...");
        this.playbackCtx.resume();
      }

      const int16 = new Int16Array(bytes.buffer, bytes.byteOffset, bytes.byteLength / 2);
      console.log("Int16Array length:", int16.length);

      const float32 = new Float32Array(int16.length);
      for (let i = 0; i < int16.length; i++) {
        float32[i] = int16[i] / 32768.0;
      }

      const buffer = this.playbackCtx.createBuffer(1, float32.length, 24000);
      buffer.getChannelData(0).set(float32);
      console.log("AudioBuffer duration:", buffer.duration);

      const source = this.playbackCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(this.playbackCtx.destination);

      const startTime = Math.max(this.playbackCtx.currentTime, this.nextAudioStartTime);
      source.start(startTime);
      console.log("source.start() called at startTime:", startTime);
      this.nextAudioStartTime = startTime + buffer.duration;
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

        let sum = 0;
        for (let i = 0; i < inputData.length; i++) {
          sum += inputData[i] * inputData[i];
        }
        const rms = Math.sqrt(sum / inputData.length);

        const pcm16 = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          const s = Math.max(-1, Math.min(1, inputData[i]));
          pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
        }

        if (!this.isDronaSpeaking) {
          this.pcmRingBuffer.push(pcm16);
          if (this.pcmRingBuffer.length > this.maxRingBufferChunks) {
            this.pcmRingBuffer.shift();
          }
        }

        if (rms > 0.015 && !this.isDronaSpeaking) {
          this.ws.send(pcm16.buffer);
        }
      };
    } catch (err) {
      console.warn("Microphone access denied or audio init failed:", err);
    }
  }

  // ─── Public Command Controls ─── //

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

  private isPushToTalkActive: boolean = false;

  public startPushToTalk(): void {
    this.isPushToTalkActive = true;
    if (!this.micStream) {
      this.initAudioCapture();
    }
    this.notifyState();
  }

  public stopPushToTalk(): void {
    this.isPushToTalkActive = false;
    this.notifyState();
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
      tutorStatusLabel: statusLabel,
      dronaCaption: this.currentSpeechText,
      sessionCap: this.currentSpeechText,
      dronaCapColor: this.isDronaSpeaking ? "#EEA31F" : "#1C9B57",
    };
    this.options.onStateChange?.(state);
  }
}
