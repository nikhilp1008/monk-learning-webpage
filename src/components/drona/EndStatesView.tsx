"use client";

import React from "react";
import { EndSessionResponse } from "@/lib/drona/types";

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
  // STATE 1: Quiet Session Ended (Fires on early exit / distress / student wrap-up)
  if (type === "session_ended") {
    return (
      <div className="w-full max-w-md mx-auto my-16 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-center space-y-4 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 mx-auto flex items-center justify-center text-slate-600 dark:text-slate-400">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Session Closed
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
            Your learning session has finished. You can return to the catalogue whenever you are ready to continue.
          </p>
        </div>
        <button
          onClick={onReturnToCatalogue}
          className="w-full py-2.5 bg-gray-900 hover:bg-black dark:bg-gray-800 dark:hover:bg-gray-700 text-white font-medium text-xs rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Return to Catalogue
        </button>
      </div>
    );
  }

  // STATE 2: Network Error State (Actual error with retry)
  if (type === "error") {
    return (
      <div className="w-full max-w-md mx-auto my-16 p-6 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded-2xl text-center space-y-4 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/60 mx-auto flex items-center justify-center text-red-600 dark:text-red-400">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-red-900 dark:text-red-200">
            Connection Problem
          </h2>
          <p className="text-xs text-red-700 dark:text-red-400 mt-1 leading-relaxed">
            {errorMessage || "Unable to communicate with Drona backend server."}
          </p>
        </div>
        <div className="flex gap-2">
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium text-xs rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Retry Connection
            </button>
          )}
          <button
            onClick={onReturnToCatalogue}
            className="flex-1 py-2.5 bg-white dark:bg-gray-900 border border-red-200 dark:border-red-800 text-red-900 dark:text-red-200 font-medium text-xs rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Back to Catalogue
          </button>
        </div>
      </div>
    );
  }

  // STATE 3: Normal Session Completion (Summary & Next Suggestion)
  return (
    <div className="w-full max-w-xl mx-auto my-12 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl space-y-6 shadow-sm">
      <div className="text-center space-y-1">
        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 mx-auto flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2">
          🎉
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Lesson Completed!
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Great job! Here is a summary of what you accomplished in this session.
        </p>
      </div>

      {/* Summary Points */}
      {summaryData?.summary_points && summaryData.summary_points.length > 0 && (
        <div className="space-y-2 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
          <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Key Concepts Covered
          </h4>
          <ul className="space-y-1.5">
            {summaryData.summary_points.map((point, idx) => (
              <li
                key={idx}
                className="text-xs text-gray-700 dark:text-gray-300 flex items-start gap-2"
              >
                <span className="text-emerald-500 font-bold">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Next Suggestion */}
      {summaryData?.next_suggestion && (
        <div className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/60 p-4 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Recommended Next Step
            </span>
            <h4 className="text-xs font-semibold text-indigo-950 dark:text-indigo-200 mt-0.5">
              {summaryData.next_suggestion.chapter_name}
            </h4>
          </div>
        </div>
      )}

      <button
        onClick={onReturnToCatalogue}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Return to Catalogue
      </button>
    </div>
  );
}
