"use client";

import React, { useState, useRef, useEffect } from "react";
import { KaTeXRenderer } from "@/components/KaTeXRenderer";
import { TranscriptEntry } from "@/lib/drona/types";

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

  const getPhaseLabel = () => {
    switch (phase) {
      case "awaiting_answer":
        return "Your turn to answer";
      case "wrapup":
        return "Wrapping up";
      case "complete":
        return "Complete";
      default:
        return "Teaching";
    }
  };

  const getPlaceholder = () => {
    if (phase === "awaiting_answer") {
      return "Your answer...";
    }
    return "Ask something...";
  };

  return (
    <div className="w-full h-full flex flex-col lg:flex-row bg-gray-50 dark:bg-gray-950 overflow-hidden">
      {/* Header bar for mobile & desktop */}
      <div className="lg:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-2.5 flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
          Part {segmentIndex} of {totalSegments}
        </span>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300">
          {getPhaseLabel()}
        </span>
      </div>

      {/* Pane 1: Whiteboard (Left on Desktop / Top on Mobile) */}
      <div className="w-full lg:w-1/2 h-64 lg:h-full bg-slate-900 text-white p-4 md:p-6 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-800 overflow-hidden">
        <div className="hidden lg:flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Drona Interactive Whiteboard
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">
              Part {segmentIndex} of {totalSegments}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-indigo-300 font-medium">
              {getPhaseLabel()}
            </span>
          </div>
        </div>

        {/* Board Content (F3: Replaces board state, F5: KaTeXRenderer) */}
        <div className="flex-1 overflow-x-auto overflow-y-auto pt-4 max-w-full">
          {boardLatex ? (
            <div className="overflow-x-auto py-2">
              <KaTeXRenderer
                latex={boardLatex}
                displayMode={true}
                className="text-white text-base md:text-xl font-mono leading-relaxed"
              />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500 text-xs italic">
              Whiteboard empty for current segment
            </div>
          )}
        </div>
      </div>

      {/* Pane 2: Transcript & Composer (Right on Desktop / Bottom on Mobile) */}
      <div className="w-full lg:w-1/2 flex-1 flex flex-col bg-white dark:bg-gray-900 overflow-hidden">
        {/* Transcript Message Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {transcript.map((entry) => (
            <div
              key={entry.id}
              className={`flex ${
                entry.sender === "student" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  entry.sender === "student"
                    ? "bg-indigo-600 text-white rounded-br-none"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none border border-gray-200 dark:border-gray-700"
                }`}
              >
                {entry.sender === "drona" && (
                  <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                    DRONA
                  </div>
                )}
                <div className="whitespace-pre-wrap">{entry.text}</div>
              </div>
            </div>
          ))}
          <div ref={transcriptEndRef} />
        </div>

        {/* Composer Bar */}
        <div className="p-3 md:p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isStreaming}
              placeholder={getPlaceholder()}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isStreaming}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center min-w-[70px]"
            >
              {isStreaming ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Send"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
