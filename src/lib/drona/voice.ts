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
  isSpeaking: boolean; // Drona is speaking
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
        this.isDronaSpeaking = true;
        this.currentSpeechText = msg.speech || "";
        this.options.onSpeechText?.(this.currentSpeechText, false);
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
        if (this.isMuted || this.isPaused || !this.ws || this.ws.readyState !== WebSocket.OPEN) {
          return;
        }

        const inputData = e.inputBuffer.getChannelData(0);
        
        // Compute RMS for VAD (Voice Activity Detection)
        let sum = 0;
        for (let i = 0; i < inputData.length; i++) {
          sum += inputData[i] * inputData[i];
        }
        const rms = Math.sqrt(sum / inputData.length);

        // Convert Float32 to Int16 PCM
        const pcm16 = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          const s = Math.max(-1, Math.min(1, inputData[i]));
          pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
        }

        // Buffer audio locally while listening (never while Drona speaks)
        if (!this.isDronaSpeaking) {
          this.pcmRingBuffer.push(pcm16);
          if (this.pcmRingBuffer.length > this.maxRingBufferChunks) {
            this.pcmRingBuffer.shift();
          }
        }

        // VAD gating: upload only if speech energy > threshold (0.015)
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
    if (this.isDronaSpeaking) {
      this.isDronaSpeaking = false;
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
  }

  public togglePause(): void {
    this.isPaused = !this.isPaused;
    this.notifyState();
  }

  public sendUtterance(text: string): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: "utterance", text }));
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
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  private notifyState(): void {
    const state: VoiceClientState = {
      isConnected: this.ws?.readyState === WebSocket.OPEN,
      isMuted: this.isMuted,
      isPaused: this.isPaused,
      isListening: !this.isDronaSpeaking && !this.isMuted && !this.isPaused,
      isSpeaking: this.isDronaSpeaking,
      tutorStatusLabel: this.isDronaSpeaking
        ? "Explaining concept"
        : this.isMuted
        ? "Muted"
        : this.isPaused
        ? "Paused"
        : "Listening",
      dronaCaption: this.currentSpeechText,
      sessionCap: this.currentSpeechText,
      dronaCapColor: this.isDronaSpeaking ? "#EEA31F" : "#1C9B57",
    };
    this.options.onStateChange?.(state);
  }
}
