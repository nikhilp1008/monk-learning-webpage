"use client";

import React, { useState } from "react";

interface ScopingViewProps {
  initialSpeech: string;
  options?: string[];
  planReady: boolean;
  onSendScope: (utterance: string) => void;
}

export function ScopingView({
  initialSpeech,
  options,
  planReady,
  onSendScope,
}: ScopingViewProps) {
  const [inputText, setInputText] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && planReady) {
      onSendScope(inputText.trim());
      setInputText("");
    }
  };

  const handleOptionClick = (option: string) => {
    if (planReady) {
      onSendScope(option);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6 space-y-6">
      {/* Drona Confirmation Speech */}
      <div className="bg-indigo-50 dark:bg-gray-800 border border-indigo-100 dark:border-gray-700 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
            D
          </div>
          <span className="text-xs font-semibold text-indigo-900 dark:text-indigo-200">
            Drona Tutor
          </span>
        </div>
        <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
          {initialSpeech}
        </p>
      </div>

      {/* Preparing your lesson banner when plan_ready is false */}
      {!planReady && (
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl p-4 flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin flex-shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200">
              Preparing your lesson...
            </h4>
            <p className="text-xs text-amber-700 dark:text-amber-400">
              Analyzing topic grounding and assembling your custom lesson segments. This takes a few moments.
            </p>
          </div>
        </div>
      )}

      {/* Tappable Subtopic Options (if scoping options returned) */}
      {options && options.length > 0 && (
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Select a subtopic to focus on:
          </label>
          <div className="flex flex-wrap gap-2">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                disabled={!planReady}
                onClick={() => handleOptionClick(opt)}
                className="px-3.5 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500 text-gray-800 dark:text-gray-200 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Scope Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={!planReady}
          placeholder={
            planReady
              ? "What specifically do you want to learn or practice?"
              : "Preparing lesson — please wait..."
          }
          className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || !planReady}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Send
        </button>
      </form>
    </div>
  );
}
