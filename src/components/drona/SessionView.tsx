"use client";

import React, { useState, useRef, useEffect } from "react";
import { KaTeXRenderer } from "@/components/KaTeXRenderer";
import { TranscriptEntry } from "@/lib/drona/types";
import { getTutorName } from "@/lib/drona/tutor";
import { VoiceClientState } from "@/lib/drona/voice";

interface SessionViewProps {
  sessionTopic: string;
  boardLatex: string;
  transcript: TranscriptEntry[];
  segmentIndex: number;
  totalSegments: number;
  phase: "teaching" | "awaiting_answer" | "wrapup" | "complete";
  isStreaming: boolean;
  voiceState?: VoiceClientState;
  onSendTurn: (utterance: string) => void;
  onEndSession: () => void;
  onToggleMute?: () => void;
  onInterrupt?: () => void;
  onTogglePause?: () => void;
}

export function SessionView({
  sessionTopic,
  boardLatex,
  transcript,
  segmentIndex,
  totalSegments,
  phase,
  isStreaming,
  voiceState,
  onSendTurn,
  onEndSession,
  onToggleMute,
  onInterrupt,
  onTogglePause,
}: SessionViewProps) {
  const [inputText, setInputText] = useState<string>("");
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const teacher = getTutorName("male");

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isStreaming) {
      onSendTurn(inputText.trim());
      setInputText("");
    }
  };

  const isDronaSpeaking = voiceState?.isSpeaking || isStreaming;
  const isMuted = voiceState?.isMuted || false;
  const isPaused = voiceState?.isPaused || false;
  const isListening = voiceState?.isListening ?? !isDronaSpeaking;

  const sessionCap = voiceState?.sessionCap || (
    [...transcript].reverse().find((t) => t.sender === "drona")?.text || `${teacher} is presenting the lesson...`
  );

  const statusLabel = voiceState?.tutorStatusLabel || (
    isDronaSpeaking ? "Explaining concept" : phase === "awaiting_answer" ? "Waiting for your answer" : "Listening"
  );

  return (
    <div className="flex flex-col h-[calc(100vh-96px)] min-h-[560px] mx-[calc(50%-50vw+36px)] animate-ml-rise">
      {/* ─── Header Bar ─── */}
      <div className="flex items-center justify-between gap-3.5 flex-wrap mb-4 flex-none">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-2 font-bold text-[0.84rem] border border-[rgba(28,26,22,0.12)] rounded-full px-3.5 py-1.5 bg-white text-ink">
            <span className="w-1.75 h-1.75 rounded-full bg-[#EEA31F]" />
            {sessionTopic || `Part ${segmentIndex} of ${totalSegments}`}
          </span>
          <span className="inline-flex items-center gap-1.75 font-extrabold text-[0.7rem] tracking-[0.12em] uppercase text-[#157A45]">
            <span className="w-1.75 h-1.75 rounded-full bg-[#1C9B57] animate-pulse" />
            Live
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onEndSession}
            className="inline-flex items-center gap-2 font-bold text-[0.86rem] py-2 px-4 rounded-full border-[1.4px] border-[rgba(221,68,51,0.4)] bg-[rgba(221,68,51,0.05)] text-[#C53A2B] hover:bg-[#DD4433] hover:border-[#DD4433] hover:text-white transition-colors cursor-pointer"
          >
            <svg viewBox="0 0 24 24" width={11} height={11} fill="currentColor">
              <rect x={5} y={5} width={14} height={14} rx={2.5} />
            </svg>
            End class
          </button>
        </div>
      </div>

      {/* ─── Whiteboard Area & Ask Sheet ─── */}
      <div className="relative flex-1 min-h-0 flex flex-col mb-3.5">
        <div
          className="relative flex flex-col flex-1 min-h-0 bg-white border-[1.5px] border-[#1C1A16] rounded-[16px] p-5 pl-13 shadow-[0_20px_44px_-28px_rgba(28,26,22,0.5)]"
          style={{
            backgroundImage: "repeating-linear-gradient(transparent 0 28px, rgba(28,26,22,0.055) 28px 29px)",
          }}
        >
          {/* Red margin line */}
          <span className="absolute top-5 bottom-5 left-9 w-[1.4px] bg-[rgba(221,68,51,0.35)]" />

          {/* Board Header */}
          <div className="flex items-center gap-2.5 mb-3.5 flex-none">
            <span className="w-2 h-2 rounded-full bg-[#EEA31F] flex-none animate-pulse" />
            <span className="font-bold text-[0.88rem] tracking-[-0.01em] truncate text-ink">
              The board · {sessionTopic || `Segment ${segmentIndex}`}
            </span>
          </div>

          {/* Board Content */}
          <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-4">
            {boardLatex ? (
              <div className="py-2">
                <KaTeXRenderer
                  latex={boardLatex}
                  displayMode={true}
                  className="text-ink text-lg font-mono leading-relaxed"
                />
              </div>
            ) : (
              <div className="h-24 flex items-center justify-center text-[#9C988C] text-xs font-script font-bold">
                {teacher} is preparing the board…
              </div>
            )}

            {/* Transcript lines */}
            {transcript.map((ln) => (
              <div key={ln.id} className="animate-ml-rise">
                <p className={`text-[0.94rem] leading-relaxed ${ln.sender === "student" ? "font-bold text-[#DD4433]" : "text-ink font-semibold"}`}>
                  {ln.sender === "student" ? "You: " : `${teacher}: `}{ln.text}
                </p>
              </div>
            ))}

            {isDronaSpeaking && (
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2.25 h-3.75 bg-[#EEA31F] rounded-sm animate-pulse" />
                <span className="font-script font-bold text-[0.84rem] text-[#9C988C]">
                  {teacher} is writing…
                </span>
              </div>
            )}
            <div ref={transcriptEndRef} />
          </div>
        </div>

        {/* ─── Ask Sheet Overlay (Slide-in during awaiting_answer) ─── */}
        {phase === "awaiting_answer" && (
          <div className="absolute top-0 right-0 bottom-0 w-[min(380px,85%)] z-10 flex flex-col bg-white border-[1.5px] border-[#1C1A16] rounded-[16px] p-5 shadow-[-28px_0_48px_-34px_rgba(28,26,22,0.5)] overflow-y-auto animate-ml-rise">
            <div className="flex items-center gap-2 mb-3 flex-none">
              <span className="w-2 h-2 rounded-full bg-[#EEA31F] flex-none" />
              <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-[#9A6A12]">
                {teacher} asks you
              </span>
            </div>
            <p className="text-[1rem] leading-snug font-semibold mb-3.5 flex-none text-ink">
              Check point question — what is your answer?
            </p>

            <form onSubmit={handleSubmit} className="flex gap-2 mt-3 flex-none">
              <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type or speak your answer…"
                className="flex-1 min-w-0 bg-white border-[1.4px] border-[rgba(28,26,22,0.14)] rounded-full py-2.5 px-4 text-[0.86rem] text-ink outline-none focus:border-[#EEA31F]"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isStreaming}
                className="w-9.5 h-9.5 flex-none rounded-full bg-[#1C1A16] grid place-items-center cursor-pointer disabled:opacity-50 hover:translate-y-[-1px] transition-transform"
              >
                <svg viewBox="0 0 16 16" width={14} height={14} fill="none">
                  <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="#FCFAF4" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>

            <span className="flex-1" />
            <p className="font-script font-bold text-[0.9rem] text-[#9C988C] text-center mt-3.5 flex-none">
              guessing is allowed — that&apos;s how we learn
            </p>
          </div>
        )}
      </div>

      {/* ─── Captions Bar (Ported dark theme) ─── */}
      <div className="flex items-center gap-3.5 bg-[#211C15] text-[#EFEBDD] border border-[#2a2419] rounded-[14px] py-3.25 px-5 flex-none mb-2.5 overflow-hidden">
        <span className="font-extrabold text-[0.6rem] tracking-[0.14em] uppercase text-[#EEA31F] flex-none">
          HINGLISH
        </span>
        <span className="min-w-0 flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-[1.06rem] leading-normal font-medium">
          {sessionCap}
          {isDronaSpeaking && (
            <span className="inline-block w-0.5 h-[1.05em] bg-[#EEA31F] ml-0.5 align-middle animate-pulse" />
          )}
        </span>
      </div>

      {/* ─── Command Dock (Ported Phase 2 UI) ─── */}
      <div className="flex items-center gap-3.5 bg-white border border-[rgba(28,26,22,0.08)] rounded-[18px] py-2.5 px-4 flex-none shadow-[0_10px_24px_-20px_rgba(28,26,22,0.4)]">
        <div className="flex items-center gap-3 flex-none min-w-0">
          <span className="w-[46px] h-[46px] flex-none rounded-[12px] bg-[#F4EFE3] border border-[rgba(28,26,22,0.08)] grid place-items-center">
            <svg viewBox="0 0 120 120" width={28} height={28} fill="none" className="animate-pulse">
              <circle cx={60} cy={60} r={36} stroke="#1C1A16" strokeWidth={11} strokeLinecap="round" strokeDasharray="52 23.4" transform="rotate(-90 60 60)" />
              <circle cx={60} cy={60} r={19} stroke="#1C1A16" strokeWidth={9} strokeLinecap="round" strokeDasharray="21.8 18" transform="rotate(-30 60 60)" />
              <circle cx={60} cy={60} r={6} fill="#EEA31F" />
            </svg>
          </span>
          <span className="min-w-0">
            <span className="block font-extrabold text-[0.56rem] tracking-[0.16em] uppercase text-[#9C988C]">
              {teacher} is
            </span>
            <span className="block font-extrabold text-[1.04rem] tracking-[-0.01em] text-[#1C1A16] leading-tight whitespace-nowrap">
              {statusLabel}
            </span>
            <span className="block font-script font-bold text-[0.8rem] text-[#1C9B57] truncate max-w-[200px]">
              {isMuted ? "Mic muted" : isPaused ? "Class paused" : isDronaSpeaking ? "Speaking..." : "Microphone active"}
            </span>
          </span>

          {/* Dynamic Audio Wave Bars */}
          <span className="flex items-end gap-[2.5px] h-4 flex-none ml-1.5">
            {[12, 18, 24, 14, 20, 16, 22, 10].map((h, i) => (
              <i
                key={i}
                className={`w-[2.5px] bg-[#EEA31F] rounded-full transition-all ${isDronaSpeaking ? "animate-pulse" : "opacity-40"}`}
                style={{ height: isDronaSpeaking ? `${h}px` : "6px" }}
              />
            ))}
          </span>
        </div>

        <span className="flex-1" />
        <span className="w-px self-stretch bg-[rgba(28,26,22,0.1)] flex-none" />

        {/* Command Dock Action Buttons */}
        <div className="flex items-center gap-2.5 flex-none">
          {/* Mute Button */}
          <button
            onClick={onToggleMute}
            title={isMuted ? "Unmute microphone" : "Mute microphone"}
            className={`px-3 py-2 rounded-full border text-xs font-bold transition-all cursor-pointer ${
              isMuted
                ? "bg-[#DD4433] text-white border-[#DD4433]"
                : "bg-white text-[#1C1A16] border-[rgba(28,26,22,0.16)] hover:border-[#1C1A16]"
            }`}
          >
            {isMuted ? "Unmute" : "Mute"}
          </button>

          {/* Interrupt / Barge-In Button */}
          <button
            onClick={onInterrupt}
            disabled={!isDronaSpeaking}
            title={isDronaSpeaking ? "Tap to interrupt Drona" : "Listening..."}
            className={`inline-flex items-center gap-1.5 font-bold text-xs py-2 px-4 rounded-full border transition-all cursor-pointer ${
              isDronaSpeaking
                ? "bg-[#EEA31F] text-[#1C1A16] border-[#EEA31F] hover:translate-y-[-1px]"
                : "bg-[#F4EFE3] text-[#9C988C] border-transparent opacity-60 cursor-not-allowed"
            }`}
          >
            <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a4 4 0 0 1 4 4v4a4 4 0 0 1-8 0V7a4 4 0 0 1 4-4Z" />
              <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
            </svg>
            {isDronaSpeaking ? "Tap to interrupt" : "Listening"}
          </button>

          {/* Pause / Resume Button */}
          <button
            onClick={onTogglePause}
            aria-label="Pause or resume class"
            className="w-[42px] h-[42px] flex-none rounded-full border-[1.4px] border-[rgba(28,26,22,0.16)] bg-white grid place-items-center cursor-pointer hover:border-[#1C1A16] transition-colors"
          >
            {isPaused ? (
              <svg viewBox="0 0 24 24" width={16} height={16} fill="#1C1A16">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width={17} height={17} fill="none" stroke="#1C1A16" strokeWidth={2} strokeLinecap="round">
                <path d="M9 5v14M15 5v14" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

