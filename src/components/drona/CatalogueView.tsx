"use client";

import React, { useState } from "react";
import { SubjectGroup, Chapter, Subtopic } from "@/lib/drona/types";

interface CatalogueViewProps {
  catalogue: SubjectGroup[];
  selectedLanguage: "english" | "hinglish";
  onLanguageChange: (lang: "english" | "hinglish") => void;
  onSelectChapter: (chapterId: string, chapterName: string) => void;
  onCustomTopic: (topicText: string) => void;
}

export function CatalogueView({
  catalogue,
  selectedLanguage,
  onLanguageChange,
  onSelectChapter,
  onCustomTopic,
}: CatalogueViewProps) {
  const [activeSubjectIdx, setActiveSubjectIdx] = useState<number>(0);
  const [customTopic, setCustomTopic] = useState<string>("");

  const activeSubject = catalogue[activeSubjectIdx] || catalogue[0];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTopic.trim()) {
      onCustomTopic(customTopic.trim());
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header & Language Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Learn with Drona
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Pick a chapter or enter a custom topic to start your live tutoring session.
          </p>
        </div>

        {/* Language Toggle */}
        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg self-start sm:self-auto">
          <button
            type="button"
            onClick={() => onLanguageChange("english")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              selectedLanguage === "english"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange("hinglish")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              selectedLanguage === "hinglish"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Hinglish
          </button>
        </div>
      </div>

      {/* Custom Topic Bar */}
      <form onSubmit={handleCustomSubmit} className="flex gap-2">
        <input
          type="text"
          value={customTopic}
          onChange={(e) => setCustomTopic(e.target.value)}
          placeholder="Or pick your own topic (e.g. Projectile Motion, SN1 Reaction)..."
          className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={!customTopic.trim()}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Start
        </button>
      </form>

      {/* Subject Tabs */}
      {catalogue.length > 0 && (
        <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-800 overflow-x-auto pb-1">
          {catalogue.map((subj, idx) => (
            <button
              key={subj.subject}
              onClick={() => setActiveSubjectIdx(idx)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                activeSubjectIdx === idx
                  ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {subj.subject}
            </button>
          ))}
        </div>
      )}

      {/* Chapters & Subtopics Grid */}
      {activeSubject ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeSubject.chapters.map((chapter: Chapter) => {
            // Filter subtopics: show only grounded or sections_only. Never render unavailable.
            const validSubtopics = chapter.subtopics.filter(
              (st: Subtopic) => st.grounding_status !== "unavailable"
            );

            return (
              <div
                key={chapter.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-2">
                    {chapter.name}
                  </h3>
                  {validSubtopics.length > 0 ? (
                    <ul className="space-y-1 mb-4">
                      {validSubtopics.slice(0, 4).map((st: Subtopic) => (
                        <li
                          key={st.id}
                          className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />
                          {st.name}
                        </li>
                      ))}
                      {validSubtopics.length > 4 && (
                        <li className="text-xs text-indigo-500 dark:text-indigo-400 font-medium pt-1">
                          +{validSubtopics.length - 4} more subtopics
                        </li>
                      )}
                    </ul>
                  ) : (
                    <p className="text-xs text-gray-400 mb-4">
                      General chapter discussion available
                    </p>
                  )}
                </div>

                <button
                  onClick={() => onSelectChapter(chapter.id, chapter.name)}
                  className="w-full py-2 bg-indigo-50 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-gray-700 text-indigo-700 dark:text-indigo-300 font-medium text-xs rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Start Chapter Session →
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No catalogue items available.
        </div>
      )}
    </div>
  );
}
