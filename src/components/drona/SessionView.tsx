"use client";

import React, { useState, useRef, useEffect } from "react";
import { KaTeXRenderer } from "@/components/KaTeXRenderer";
import { TranscriptEntry } from "@/lib/drona/types";
import { getTutorName } from "@/lib/drona/tutor";

interface SessionViewProps {
  boardLatex: string;
  transcript: TranscriptEntry[];
  segmentIndex: number;
  totalSegments: number;
  phase: "teaching" | "awaiting_answer" | "wrapup" | "complete";
  isStreaming: boolean;
  onSendTurn: (utterance: string) => void;
}

export function SessionView({
  boardLatex,
  transcript,
  segmentIndex,
  totalSegments,
  phase,
  isStreaming,
  onSendTurn,
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

  // Extract latest speech text for captions bar
  const latestSpeech = [...transcript].reverse().find(t => t.sender === "drona")?.text || `${teacher} is presenting the lesson...`;

  return (
    <div className="flex flex-col h-[calc(100vh-96px)] min-h-[560px] animate-ml-rise">
      {/* ─── Whiteboard Area (Ruled Paper Background) ─── */}
      <div className="relative flex-1 min-h-0 flex flex-col mb-3">
        <div
          className="relative flex flex-col flex-1 min-h-0 bg-white border-[1.5px] border-ink rounded-[16px] p-5 pl-13 shadow-[0_20px_44px_-28px_rgba(28,26,22,0.5)]"
          style={{
            backgroundImage: "repeating-linear-gradient(transparent 0 28px, rgba(28,26,22,0.055) 28px 29px)",
          }}
        >
          {/* Red margin line */}
          <span className="absolute top-5 bottom-5 left-9 w-[1.4px] bg-[rgba(221,68,51,0.35)]" />

          {/* Board Header */}
          <div className="flex items-center gap-2.5 mb-3.5 flex-none">
            <span className="w-2 h-2 rounded-full bg-[#EEA31F] flex-none animate-pulse" />
            <span className="font-bold text-[0.88rem] tracking-[-0.01em] text-ink truncate">
              The board · Part {segmentIndex} of {totalSegments}
            </span>
          </div>

          {/* Board Content (KaTeX & Text) */}
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
              <div className="h-full flex items-center justify-center text-[#9C988C] text-xs font-script font-bold">
                {teacher} is preparing the board…
              </div>
            )}

            {/* Transcript lines on board */}
            {transcript.map((ln) => (
              <div key={ln.id} className="animate-ml-rise">
                <p className={`text-[0.94rem] leading-relaxed ${ln.sender === "student" ? "font-bold text-[#DD4433]" : "text-ink font-semibold"}`}>
                  {ln.sender === "student" ? "You: " : `${teacher}: `}{ln.text}
                </p>
              </div>
            ))}

            {isStreaming && (
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2.5 h-4 bg-[#EEA31F] rounded-sm animate-pulse" />
                <span className="font-script font-bold text-[0.84rem] text-[#9C988C]">
                  {teacher} is writing…
                </span>
              </div>
            )}
            <div ref={transcriptEndRef} />
          </div>
        </div>

        {/* ─── Ask Sheet (Checkpoint Overlay when awaiting answer) ─── */}
        {phase === "awaiting_answer" && (
          <div className="absolute top-0 right-0 bottom-0 w-[min(380px,85%)] z-10 flex flex-col bg-white border-[1.5px] border-ink rounded-[16px] p-5 shadow-[-28px_0_48px_-34px_rgba(28,26,22,0.5)] overflow-y-auto animate-ml-rise">
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
                placeholder="Type your answer…"
                className="flex-1 min-w-0 bg-white border-[1.4px] border-[rgba(28,26,22,0.14)] rounded-full py-2.5 px-4 text-[0.86rem] text-ink outline-none focus:border-[#EEA31F]"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isStreaming}
                className="w-9 h-9 flex-none rounded-full bg-ink flex items-center justify-center cursor-pointer disabled:opacity-50"
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

      {/* ─── Captions Bar (Dark Background) ─── */}
      <div className="flex items-center gap-3.5 bg-[#211C15] text-[#EFEBDD] border border-[#2a2419] rounded-[14px] py-3 px-5 flex-none mb-2.5 overflow-hidden">
        <span className="font-extrabold text-[0.6rem] tracking-[0.14em] uppercase text-[#EEA31F] flex-none">
          Live Speech
        </span>
        <span className="min-w-0 flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-[1.06rem] leading-normal font-medium">
          {latestSpeech}
          {isStreaming && (
            <span className="inline-block w-0.5 h-[1.05em] bg-[#EEA31F] ml-0.5 align-middle animate-pulse" />
          )}
        </span>
      </div>

      {/* ─── Command Dock ─── */}
      <div className="flex items-center gap-3.5 bg-white border border-[rgba(28,26,22,0.08)] rounded-[18px] py-2.5 px-4 flex-none shadow-[0_10px_24px_-20px_rgba(28,26,22,0.4)]">
        <div className="flex items-center gap-3 flex-none min-w-0">
          <span className="w-[46px] h-[46px] flex-none rounded-[12px] bg-[#F4EFE3] border border-[rgba(28,26,22,0.08)] grid place-items-center">
            <svg viewBox="0 0 120 120" width={28} height={28} fill="none">
              <circle cx={60} cy={60} r={36} stroke="#1C1A16" strokeWidth={11} strokeLinecap="round" strokeDasharray="52 23.4" transform="rotate(-90 60 60)" />
              <circle cx={60} cy={60} r={19} stroke="#1C1A16" strokeWidth={9} strokeLinecap="round" strokeDasharray="21.8 18" transform="rotate(-30 60 60)" />
              <circle cx={60} cy={60} r={6} fill="#EEA31F" />
            </svg>
          </span>
          <span className="min-w-0">
            <span className="block font-extrabold text-[0.56rem] tracking-[0.16em] uppercase text-[#9C988C]">
              {teacher} is
            </span>
            <span className="block font-extrabold text-[1.04rem] tracking-[-0.01em] text-ink leading-tight whitespace-nowrap">
              {isStreaming ? "Explaining concept" : phase === "awaiting_answer" ? "Waiting for your answer" : "Listening"}
            </span>
          </span>
        </div>

        <span className="flex-1" />
        <span className="w-px self-stretch bg-[rgba(28,26,22,0.1)] flex-none" />

        {/* Regular turn input form when not in checkpoint mode */}
        {phase !== "awaiting_answer" && (
          <form onSubmit={handleSubmit} className="flex gap-2 flex-1 max-w-md">
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isStreaming}
              placeholder={`Ask ${teacher} something…`}
              className="flex-1 min-w-0 bg-[#FBF8EF] border border-[rgba(28,26,22,0.12)] rounded-full py-2 px-4 text-xs text-ink outline-none focus:border-[#EEA31F]"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isStreaming}
              className="py-2 px-4 bg-ink text-white text-xs font-bold rounded-full disabled:opacity-50 cursor-pointer"
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
