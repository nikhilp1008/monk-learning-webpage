"use client";

import React from "react";
import { EndSessionResponse } from "@/lib/drona/types";
import { getTutorName } from "@/lib/drona/tutor";

interface EndStatesViewProps {
  type: "normal" | "session_ended" | "error";
  summaryData?: EndSessionResponse | null;
  errorMessage?: string;
  onReturnToCatalogue: () => void;
  onRetry?: () => void;
}

export function EndStatesView({
  type,
  summaryData,
  errorMessage,
  onReturnToCatalogue,
  onRetry,
}: EndStatesViewProps) {
  const teacher = getTutorName("male");

  // STATE 1: Quiet Session Ended
  if (type === "session_ended") {
    return (
      <div className="w-full max-w-md mx-auto my-16 p-6 bg-white border border-[rgba(28,26,22,0.12)] rounded-2xl text-center space-y-4 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-[#F4EFE3] mx-auto flex items-center justify-center text-ink">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-ink">Class Closed</h2>
          <p className="text-xs text-[#57534B] mt-1 leading-relaxed">
            Your lesson with {teacher} has finished. Return to the picker whenever you are ready to continue.
          </p>
        </div>
        <button
          onClick={onReturnToCatalogue}
          className="w-full py-2.5 bg-ink text-white font-medium text-xs rounded-lg transition-colors"
        >
          Return to Picker
        </button>
      </div>
    );
  }

  // STATE 2: Network Error State
  if (type === "error") {
    return (
      <div className="w-full max-w-md mx-auto my-16 p-6 bg-[rgba(221,68,51,0.05)] border border-[rgba(221,68,51,0.3)] rounded-2xl text-center space-y-4 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-[rgba(221,68,51,0.1)] mx-auto flex items-center justify-center text-[#C53A2B]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[#C53A2B]">Connection Problem</h2>
          <p className="text-xs text-[#57534B] mt-1 leading-relaxed">
            {errorMessage || `Unable to communicate with ${teacher} backend server.`}
          </p>
        </div>
        <div className="flex gap-2">
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex-1 py-2.5 bg-[#DD4433] text-white font-medium text-xs rounded-lg transition-colors"
            >
              Retry Connection
            </button>
          )}
          <button
            onClick={onReturnToCatalogue}
            className="flex-1 py-2.5 bg-white border border-[rgba(28,26,22,0.14)] text-ink font-medium text-xs rounded-lg transition-colors"
          >
            Back to Picker
          </button>
        </div>
      </div>
    );
  }

  // STATE 3: Normal Session Summary (Ported from design-reference L682–739)
  return (
    <div className="flex flex-col items-center py-6 animate-ml-rise">
      <div className="w-[min(680px,100%)]">
        {/* Class complete header */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 font-bold text-[0.72rem] tracking-[0.1em] uppercase text-[#157A45] bg-[rgba(28,155,87,0.08)] border border-[rgba(28,155,87,0.3)] rounded-full py-1.5 px-3.5">
            <svg viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Class complete
          </span>
          <h1 className="text-[2.3rem] font-normal tracking-[-0.025em] leading-tight mt-3.5 text-ink">
            Class dismissed.
          </h1>
          <p className="font-script font-bold text-[#DD4433] text-[1.02rem] mt-2" style={{ transform: "rotate(-0.4deg)" }}>
            achha padha aaj — here&apos;s what we covered.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3.5 mb-3.5">
          <div className="bg-white border border-[rgba(28,26,22,0.08)] rounded-[16px] p-5 shadow-[0_10px_24px_-20px_rgba(28,26,22,0.4)]">
            <span className="block font-extrabold text-[0.6rem] tracking-[0.14em] uppercase text-[#9C988C] mb-1.5">
              Chapter
            </span>
            <b className="block font-bold text-[1.1rem] tracking-[-0.01em] text-ink">
              {summaryData?.next_suggestion?.chapter_name || "Live Session"}
            </b>
            <span className="block text-[0.8rem] text-[#57534B] mt-1">
              taught by {teacher}, on the board
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div className="bg-white border border-[rgba(28,26,22,0.08)] rounded-[16px] p-5 shadow-[0_10px_24px_-20px_rgba(28,26,22,0.4)]">
              <span className="block font-extrabold text-[0.6rem] tracking-[0.14em] uppercase text-[#9C988C] mb-1.5">
                Time
              </span>
              <b className="block font-bold text-[1.6rem] tracking-[-0.03em] leading-none text-ink">
                ~10m
              </b>
              <span className="block text-[0.76rem] text-[#9C988C] font-semibold mt-1">
                of live class
              </span>
            </div>
            <div className="bg-white border border-[rgba(28,26,22,0.08)] rounded-[16px] p-5 shadow-[0_10px_24px_-20px_rgba(28,26,22,0.4)]">
              <span className="block font-extrabold text-[0.6rem] tracking-[0.14em] uppercase text-[#9C988C] mb-1.5">
                Questions
              </span>
              <b className="block font-bold text-[1.6rem] tracking-[-0.03em] leading-none text-ink">
                {summaryData?.mistakes_count ?? 0}
              </b>
              <span className="block text-[0.76rem] font-bold text-[#157A45] mt-1">
                checkpoint questions
              </span>
            </div>
          </div>
        </div>

        {/* What we covered list */}
        <div className="relative bg-white border-[1.5px] border-ink rounded-[16px] p-6 pl-12 mb-4.5 shadow-[0_16px_36px_-26px_rgba(28,26,22,0.5)]" style={{ backgroundImage: "repeating-linear-gradient(transparent 0 30px, rgba(28,26,22,0.05) 30px 31px)" }}>
          <span className="absolute top-0 bottom-0 left-8 w-[1.4px] bg-[rgba(221,68,51,0.35)]" />
          <span className="absolute -top-2.5 left-4 bg-[#EEA31F] border-[1.5px] border-ink rounded-[6px] font-extrabold text-[0.58rem] tracking-[0.12em] py-0.5 px-2 text-ink">
            WHAT WE COVERED
          </span>
          <div className="flex flex-col gap-2.5 mt-1">
            {summaryData?.summary_points && summaryData.summary_points.length > 0 ? (
              summaryData.summary_points.map((pt, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <span className="w-5 h-5 flex-none rounded-full bg-[rgba(28,155,87,0.1)] border border-[rgba(28,155,87,0.35)] grid place-items-center">
                    <svg viewBox="0 0 24 24" width={11} height={11} fill="none" stroke="#157A45" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="font-script font-bold text-[1rem] text-ink">{pt}</span>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 flex-none rounded-full bg-[rgba(28,155,87,0.1)] border border-[rgba(28,155,87,0.35)] grid place-items-center">
                  <svg viewBox="0 0 24 24" width={11} height={11} fill="none" stroke="#157A45" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <span className="font-script font-bold text-[1rem] text-ink">Key concepts covered with {teacher} on the board</span>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-[0.82rem] text-[#57534B] mb-3.5">
          The full board is backed up in <b className="font-bold">Recent sessions</b> for 7 days.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={onReturnToCatalogue}
            className="inline-flex items-center gap-2 font-semibold text-[0.9rem] py-3 px-5 rounded-full border-[1.4px] border-[rgba(28,26,22,0.14)] bg-white text-ink cursor-pointer hover:border-ink transition-colors"
          >
            Go to dashboard
            <svg viewBox="0 0 16 16" width={14} height={14} fill="none">
              <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
