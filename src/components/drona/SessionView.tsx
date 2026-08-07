"use client";

import React, { useState, useRef, useEffect } from "react";
import { KaTeXRenderer } from "@/components/KaTeXRenderer";
import { PremiumBoardEvent } from "@/components/PremiumBoardEvent";
import { TranscriptEntry } from "@/lib/drona/types";
import { getTutorName } from "@/lib/drona/tutor";
import { VoiceClientState } from "@/lib/drona/voice";

interface SessionViewProps {
  sessionTopic: string;
  boardLatex: string;
  boardEvents?: any[];
  transcript: TranscriptEntry[];
  segmentIndex: number;
  totalSegments: number;
  phase: "teaching" | "awaiting_answer" | "wrapup" | "complete";
  isStreaming: boolean;
  voiceState?: VoiceClientState;
  subtopicOptions?: string[];
  onSendTurn: (utterance: string) => void;
  onEndSession: () => void;
  onToggleMute?: () => void;
  onInterrupt?: () => void;
  onTogglePause?: () => void;
  onStartPushToTalk?: () => void;
  onStopPushToTalk?: () => void;
}

export function SessionView({
  sessionTopic,
  boardLatex,
  boardEvents = [],
  transcript,
  segmentIndex,
  totalSegments,
  phase,
  isStreaming,
  voiceState,
  subtopicOptions,
  onSendTurn,
  onEndSession,
  onToggleMute,
  onInterrupt,
  onTogglePause,
  onStartPushToTalk,
  onStopPushToTalk,
}: SessionViewProps) {
  const [inputText, setInputText] = useState<string>("");
  const [holdDuration, setHoldDuration] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const teacher = getTutorName("male");

  const handlePttDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
    setHoldDuration(0);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setHoldDuration((prev) => prev + 0.1);
    }, 100);
    onStartPushToTalk?.();
  };

  const handlePttUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    try { if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    onStopPushToTalk?.();
  };

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputText.trim();
    if (text) {
      onSendTurn(text);
      setInputText("");
    }
  };

  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
  const isDronaSpeaking = voiceState?.isSpeaking || false;
  const hasAudioPlayed = voiceState?.hasPlayedFirstChunk || false;
  const isMuted = voiceState?.isMuted || false;
  const isPaused = voiceState?.isPaused || false;
  const isConnected = voiceState?.isConnected ?? true;

  // B5: Explicit preparing state before first audio chunk plays
  const statusLabel = !isConnected
    ? "Connecting..."
    : isTranscribing
    ? "Transcribing..."
    : voiceState?.hasTurnError
    ? "Something went wrong — retrying"
    : !hasAudioPlayed
    ? "Drona is preparing your lesson…"
    : isDronaSpeaking
    ? "Explaining concept"
    : isMuted
    ? "Muted"
    : isPaused
    ? "Paused"
    : phase === "awaiting_answer"
    ? "Waiting for your answer"
    : "Listening";

  // Clean speech text for captions bar (B1 fix: never raw JSON)
  const rawSpeech = voiceState?.sessionCap || (
    [...transcript].reverse().find((t) => t.sender === "drona")?.text || `${teacher} is presenting the lesson...`
  );
  
  // Extract speech string if JSON envelope was passed
  let cleanSpeech = rawSpeech;
  if (cleanSpeech.startsWith("{") && cleanSpeech.includes('"speech"')) {
    try {
      const parsed = JSON.parse(cleanSpeech);
      cleanSpeech = parsed.speech || cleanSpeech;
    } catch {
      // ignore
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-96px)] min-h-[560px] w-full max-w-[1180px] mx-auto animate-ml-rise px-3 md:px-0 overflow-x-hidden">
      {/* ─── Header Bar ─── */}
      <div className="flex items-center justify-between gap-3 flex-wrap mb-3.5 flex-none">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 font-bold text-[0.84rem] border border-[rgba(28,26,22,0.12)] rounded-full px-3.5 py-1.5 bg-white text-ink truncate max-w-[280px] sm:max-w-none">
            <span className="w-2 h-2 rounded-full bg-[#EEA31F] flex-none" />
            {sessionTopic || `Part ${segmentIndex} of ${totalSegments}`}
          </span>
          <span className="inline-flex items-center gap-1.5 font-extrabold text-[0.7rem] tracking-[0.12em] uppercase text-[#157A45]">
            <span className="w-2 h-2 rounded-full bg-[#1C9B57] animate-pulse flex-none" />
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

      {/* ─── Whiteboard Area (B6: Board Overflow Fix) ─── */}
      <div className="relative flex-1 min-h-0 flex flex-col mb-3 max-w-full overflow-hidden">
        <div
          className="relative flex flex-col flex-1 min-h-0 bg-white border-[1.5px] border-[#1C1A16] rounded-[16px] p-4 sm:p-5 pl-10 sm:pl-13 shadow-[0_20px_44px_-28px_rgba(28,26,22,0.5)] max-w-full overflow-hidden"
          style={{
            backgroundImage: "repeating-linear-gradient(transparent 0 28px, rgba(28,26,22,0.055) 28px 29px)",
          }}
        >
          {/* Red margin line */}
          <span className="absolute top-5 bottom-5 left-7 sm:left-9 w-[1.4px] bg-[rgba(221,68,51,0.35)]" />

          {/* Board Header */}
          <div className="flex items-center gap-2.5 mb-3 flex-none">
            <span className="w-2 h-2 rounded-full bg-[#EEA31F] flex-none animate-pulse" />
            <span className="font-bold text-[0.88rem] tracking-[-0.01em] truncate text-ink">
              The board · {sessionTopic || `Segment ${segmentIndex}`}
            </span>
          </div>

          {/* Board Content (B2 & B6: Line-by-line KaTeX & wrapped prose) */}
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-1 space-y-3.5 max-w-full">
            {boardEvents && boardEvents.length > 0 ? (
              boardEvents.map((evt, idx) => (
                <PremiumBoardEvent key={idx} event={evt} animate={idx === boardEvents.length - 1} />
              ))
            ) : boardLatex ? (
              <div className="py-1 max-w-full overflow-x-hidden whitespace-pre-wrap">
                <KaTeXRenderer
                  latex={boardLatex}
                  displayMode={true}
                  className="text-ink text-sm sm:text-base font-semibold leading-relaxed"
                />
              </div>
            ) : (
              <div className="text-ink-muted text-sm italic">Board will update as Drona speaks...</div>
            )}
            <div ref={transcriptEndRef} />
          </div>
        </div>

        {/* ─── Ask Sheet Overlay — Ported 1:1 from design-reference/index.html (lines 620–643) ─── */}
        {(phase === "awaiting_answer" || (subtopicOptions && subtopicOptions.length > 0)) && (
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(380px, 85%)",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              background: "#fff",
              border: "1.5px solid #1C1A16",
              borderRadius: "16px",
              padding: "22px 22px 18px",
              boxShadow: "-28px 0 48px -34px rgba(28,26,22,.5)",
              animation: "mlSheetIn .45s cubic-bezier(.2,.7,.2,1)",
              overflowY: "auto",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", flex: "none" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#EEA31F", flex: "none" }} />
              <span style={{ fontWeight: 800, fontSize: ".62rem", letterSpacing: ".14em", textTransform: "uppercase", color: "#9A6A12" }}>
                {teacher} asks you
              </span>
            </div>

            {/* Question Text */}
            <p style={{ fontSize: "1rem", lineHeight: 1.5, fontWeight: 600, marginBottom: "14px", flex: "none", color: "#1C1A16" }}>
              {cleanSpeech.length > 20 ? cleanSpeech : "Select an option or type your response below:"}
            </p>

            {/* Option Chips — Renders 2 chips for procedural, 3 chips for check/checkpoint; empty if prompt omitted options */}
            {subtopicOptions && subtopicOptions.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: "none" }}>
                {subtopicOptions.map((optionText, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onSendTurn(optionText);
                      setInputText("");
                    }}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "11px",
                      border: "1.4px solid rgba(28,26,22,.14)",
                      background: "#fff",
                      fontFamily: "inherit",
                      fontWeight: 600,
                      fontSize: ".88rem",
                      textAlign: "left",
                      color: "#1C1A16",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#1C1A16";
                      e.currentTarget.style.background = "#FCFAF4";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(28,26,22,.14)";
                      e.currentTarget.style.background = "#fff";
                    }}
                  >
                    <KaTeXRenderer latex={optionText} displayMode={false} />
                  </button>
                ))}
              </div>
            )}

            {/* Input Row */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (inputText.trim()) {
                  onSendTurn(inputText.trim());
                  setInputText("");
                }
              }}
              style={{ display: "flex", gap: "8px", marginTop: "12px", flex: "none" }}
            >
              <input
                placeholder="or type your answer…"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: 0,
                  background: "#fff",
                  border: "1.4px solid rgba(28,26,22,.14)",
                  borderRadius: "99px",
                  padding: "9px 15px",
                  fontFamily: "inherit",
                  fontSize: ".86rem",
                  color: "#1C1A16",
                  outline: "none"
                }}
              />
              <button
                type="submit"
                aria-label="Send answer"
                style={{
                  width: "38px",
                  height: "38px",
                  flex: "none",
                  borderRadius: "50%",
                  border: "none",
                  background: "#1C1A16",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer"
                }}
              >
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                  <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="#FCFAF4" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>

            <span style={{ flex: 1 }} />

            {/* Bottom Encouragement Caption */}
            <p style={{ fontFamily: "'Kalam', cursive", fontWeight: 700, fontSize: ".9rem", color: "#9C988C", textAlign: "center", marginTop: "14px", flex: "none" }}>
              guessing is allowed — that&apos;s how we learn
            </p>
          </div>
        )}
      </div>

      {/* ─── Captions Bar (B1: Clean Speech Text) ─── */}
      <div className="flex items-center gap-3 bg-[#211C15] text-[#EFEBDD] border border-[#2a2419] rounded-[14px] py-2.5 px-4 sm:px-5 flex-none mb-2 overflow-hidden max-w-full">
        <span className="font-extrabold text-[0.6rem] tracking-[0.14em] uppercase text-[#EEA31F] flex-none">
          HINGLISH
        </span>
        <span className="min-w-0 flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-[0.98rem] leading-normal font-medium">
          {cleanSpeech}
          {isDronaSpeaking && (
            <span className="inline-block w-0.5 h-[1.05em] bg-[#EEA31F] ml-0.5 align-middle animate-pulse" />
          )}
        </span>
      </div>

      {/* ─── Simplified Command Dock (Directive 5 & 6) ─── */}
      <div className="flex items-center justify-between gap-2 sm:gap-3 bg-white border border-[rgba(28,26,22,0.08)] rounded-[18px] py-2 px-3 sm:px-4 flex-none shadow-[0_10px_24px_-20px_rgba(28,26,22,0.4)] max-w-full overflow-hidden">
        {/* Status Indicator */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-none min-w-0">
          <span className="w-9 h-9 sm:w-10 sm:h-10 flex-none rounded-[12px] bg-[#F4EFE3] border border-[rgba(28,26,22,0.08)] grid place-items-center">
            <svg viewBox="0 0 120 120" width={22} height={22} fill="none" className="animate-pulse">
              <circle cx={60} cy={60} r={36} stroke="#1C1A16" strokeWidth={11} strokeLinecap="round" strokeDasharray="52 23.4" transform="rotate(-90 60 60)" />
              <circle cx={60} cy={60} r={19} stroke="#1C1A16" strokeWidth={9} strokeLinecap="round" strokeDasharray="21.8 18" transform="rotate(-30 60 60)" />
              <circle cx={60} cy={60} r={6} fill="#EEA31F" />
            </svg>
          </span>
          <span className="min-w-0 hidden md:block">
            <span className="block font-extrabold text-[0.88rem] tracking-[-0.01em] text-[#1C1A16] leading-tight truncate">
              {statusLabel}
            </span>
          </span>
        </div>

        {/* Text Input for Answers (Directive 6: Always available) */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-1 min-w-0 mx-1">
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={phase === "awaiting_answer" ? "Your answer…" : "Ask Drona something…"}
            className="w-full bg-[#FCFAF4] border border-[rgba(28,26,22,0.14)] rounded-full py-1.5 px-3.5 text-[0.82rem] text-ink outline-none focus:border-[#EEA31F] focus:bg-white transition-colors"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-8 h-8 flex-none rounded-full bg-[#1C1A16] grid place-items-center cursor-pointer disabled:opacity-40 hover:bg-[#2C2A26] transition-colors"
          >
            <svg viewBox="0 0 16 16" width={13} height={13} fill="none">
              <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="#FCFAF4" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>

        {/* Controls: Push-To-Talk Mic & Pause/Resume (Directive 5) */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-none">
          {/* Hold to Speak Mic Button (Primary PTT control) */}
          <button
            onPointerDown={handlePttDown}
            onPointerUp={handlePttUp}
            onPointerCancel={handlePttUp}
            onPointerLeave={handlePttUp}
            title="Hold to speak (Interrupts Drona if speaking)"
            className={`inline-flex items-center gap-1.5 font-bold text-[0.74rem] sm:text-xs py-1.5 px-3.5 rounded-full border transition-all select-none cursor-pointer ${
              voiceState?.isListening
                ? "bg-[#DD4433] text-white border-[#DD4433] scale-105 shadow-[0_0_16px_rgba(221,68,51,0.7)] animate-pulse"
                : "bg-[#1C1A16] text-white border-[#1C1A16] hover:bg-[#2C2A26]"
            }`}
          >
            <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a4 4 0 0 1 4 4v4a4 4 0 0 1-8 0V7a4 4 0 0 1 4-4Z" />
              <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
            </svg>
            {voiceState?.isListening ? `Recording ${holdDuration.toFixed(1)}s` : "Hold to speak"}
          </button>

          {/* Pause / Resume Button */}
          <button
            onClick={onTogglePause}
            aria-label="Pause or resume class"
            title={isPaused ? "Resume class" : "Pause class"}
            className="w-8 h-8 sm:w-[42px] sm:h-[42px] flex-none rounded-full border-[1.4px] border-[rgba(28,26,22,0.16)] bg-white grid place-items-center cursor-pointer hover:border-[#1C1A16] transition-colors"
          >
            {isPaused ? (
              <svg viewBox="0 0 24 24" width={14} height={14} fill="#1C1A16">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="#1C1A16" strokeWidth={2} strokeLinecap="round">
                <path d="M9 5v14M15 5v14" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}


