"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";

type ChapterRow = Database["public"]["Tables"]["chapters"]["Row"];

const SUBJECTS = [
  { id: "physics", label: "Physics" },
  { id: "chemistry", label: "Chemistry" },
  { id: "mathematics", label: "Maths" },
  { id: "biology", label: "Biology" },
];

const CLASSES = [11, 12];

const TEACHER = "Drona";

interface ChapterMeta {
  sectionCount: number;
  subtopicCount: number;
}

export default function LessonsPage() {
  const [selectedClass, setSelectedClass] = useState<number>(11);
  const [selectedSubject, setSelectedSubject] = useState<string>("physics");
  const [chapters, setChapters] = useState<ChapterRow[]>([]);
  const [chapterMetas, setChapterMetas] = useState<Record<string, ChapterMeta>>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(true);

  // Check user profile for default enrolled_class preference
  useEffect(() => {
    async function loadProfilePreference() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("enrolled_class")
            .eq("id", user.id)
            .maybeSingle();

          if (profile?.enrolled_class) {
            setSelectedClass(profile.enrolled_class);
          }
        }
      } catch (err) {
        console.error("Error loading user profile preference:", err);
      }
    }

    loadProfilePreference();
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function loadChaptersAndCounts() {
      setLoading(true);
      try {
        const { data: chapterData, error: chErr } = await supabase
          .from("chapters")
          .select("*")
          .eq("class_level", selectedClass)
          .eq("subject", selectedSubject)
          .order("chapter_order", { ascending: true });

        if (chErr) {
          console.error("Error fetching chapters:", chErr);
          if (isMounted) setLoading(false);
          return;
        }

        const loadedChapters = chapterData || [];

        if (loadedChapters.length > 0) {
          const chapterIds = loadedChapters.map((c) => c.id);

          const { data: sectionData, error: secErr } = await supabase
            .from("lesson_sections")
            .select("chapter_id, subtopic")
            .in("chapter_id", chapterIds);

          if (secErr) {
            console.error("Error fetching section counts:", secErr);
          }

          const metas: Record<string, ChapterMeta> = {};
          const subtopicsMap: Record<string, Set<string>> = {};

          (sectionData || []).forEach((sec) => {
            if (sec.chapter_id) {
              if (!metas[sec.chapter_id]) {
                metas[sec.chapter_id] = { sectionCount: 0, subtopicCount: 0 };
                subtopicsMap[sec.chapter_id] = new Set();
              }
              metas[sec.chapter_id].sectionCount += 1;
              if (sec.subtopic && sec.subtopic.trim()) {
                subtopicsMap[sec.chapter_id].add(sec.subtopic.trim());
              }
            }
          });

          Object.keys(subtopicsMap).forEach((chId) => {
            if (metas[chId]) {
              metas[chId].subtopicCount = subtopicsMap[chId].size;
            }
          });

          if (isMounted) {
            setChapters(loadedChapters);
            setChapterMetas(metas);
          }
        } else {
          if (isMounted) {
            setChapters([]);
            setChapterMetas({});
          }
        }
      } catch (err) {
        console.error("Unexpected error in loadChaptersAndCounts:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadChaptersAndCounts();
    return () => {
      isMounted = false;
    };
  }, [selectedClass, selectedSubject]);

  return (
    <div className="min-h-screen flex flex-col bg-ruled-body">

      <main className="flex-1 max-w-[1180px] w-full mx-auto px-6 md:px-11 pt-[30px] pb-16 animate-ml-rise">
        {/* Title Header */}
        <div className="flex items-end justify-between gap-4 flex-wrap mb-[22px]">
          <div>
            <h1 className="text-[2.3rem] leading-[1.05] tracking-[-0.025em] font-medium text-ink">
              Every chapter, taught by {TEACHER}.
            </h1>
            <p className="text-ink-light text-base mt-[7px] max-w-[46rem]">
              Press play on any chapter and {TEACHER} teaches it end to end on the board, at your own pace.
            </p>
          </div>
          <span className="inline-flex items-center gap-[7px] font-bold text-[0.74rem] text-ink-light border border-[rgba(28,26,22,0.12)] rounded-full px-3.5 py-[7px] bg-white">
            <svg
              viewBox="0 0 24 24"
              width={13}
              height={13}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
            JEE Main
          </span>
        </div>

        {/* Card Container */}
        <div className="bg-white border border-border-subtle rounded-[20px] p-[22px_24px_8px] shadow-ref-card">
          {/* Controls Bar */}
          <div className="flex items-center justify-between gap-3 mb-1.5">
            <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted">
              All chapters
            </span>

            <div className="flex items-center gap-3.5">
              <span className="text-[0.74rem] text-ink-muted font-semibold">
                {chapters.length} chapters · taught by {TEACHER}
              </span>

              {/* Class Toggle */}
              <span className="inline-flex gap-[3px] p-[3px] bg-[rgba(28,26,22,0.055)] rounded-full">
                {CLASSES.map((cls) => {
                  const isActive = selectedClass === cls;
                  return (
                    <button
                      key={cls}
                      onClick={() => setSelectedClass(cls)}
                      className={`text-[0.82rem] px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                        isActive
                          ? "font-bold bg-ink text-cream-light shadow-[0_6px_14px_-8px_rgba(28,26,22,0.7)]"
                          : "font-semibold text-ink-light"
                      }`}
                    >
                      Class {cls}
                    </button>
                  );
                })}
              </span>
            </div>
          </div>

          {/* Subject Tabs */}
          <div className="grid grid-cols-4 shadow-[inset_0_-1px_rgba(28,26,22,0.1)] mb-1">
            {SUBJECTS.map((subj) => {
              const isActive = selectedSubject === subj.id;
              return (
                <button
                  key={subj.id}
                  onClick={() => setSelectedSubject(subj.id)}
                  className={`flex items-center justify-center gap-2 text-[0.95rem] py-[13px] px-1 border-b-[2.5px] transition-colors cursor-pointer ${
                    isActive
                      ? "font-bold text-ink border-orange"
                      : "font-semibold text-ink-muted border-transparent"
                  }`}
                >
                  {subj.label}
                </button>
              );
            })}
          </div>

          {/* Chapters List */}
          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-3 text-ink-muted">
              <div className="w-6 h-6 border-2 border-orange border-t-transparent rounded-full animate-ml-spin" />
              <span className="text-xs font-semibold">Loading chapters...</span>
            </div>
          ) : chapters.length === 0 ? (
            <div className="py-16 text-center text-ink-muted text-sm font-semibold">
              No chapters found for Class {selectedClass}{" "}
              {SUBJECTS.find((s) => s.id === selectedSubject)?.label}.
            </div>
          ) : (
            <div className="max-h-[56vh] overflow-y-auto overscroll-contain">
              {chapters.map((chapter, i) => {
                const meta = chapterMetas[chapter.id] || {
                  sectionCount: 0,
                  subtopicCount: 0,
                };
                const isClickable = meta.sectionCount > 0;
                const numStr = String(
                  chapter.chapter_order || i + 1
                ).padStart(2, "0");

                const subtopics =
                  meta.subtopicCount > 0
                    ? meta.subtopicCount
                    : meta.sectionCount;

                const cardContent = (
                  <div
                    className={`flex items-center gap-3.5 py-[15px] px-2 border-b border-dashed border-[rgba(28,26,22,0.1)] rounded-[10px] transition-colors ${
                      isClickable
                        ? "hover:bg-[rgba(252,244,224,0.5)] cursor-pointer"
                        : "opacity-60 cursor-not-allowed"
                    }`}
                  >
                    <span className="font-script font-bold text-[0.86rem] text-ink-dim flex-none w-[26px]">
                      {numStr}
                    </span>

                    <span className="flex-1 min-w-0 flex items-baseline gap-2.5">
                      <b className="font-bold text-[0.98rem] text-ink whitespace-nowrap overflow-hidden text-ellipsis">
                        {chapter.name}
                      </b>
                      <span className="flex-none text-[0.76rem] text-ink-muted font-semibold">
                        {subtopics} subtopics
                      </span>
                    </span>

                    <span className="flex-none font-bold text-[0.7rem] tracking-[0.02em] px-[11px] py-[5px] rounded-full bg-ink/5 text-ink-muted">
                      {isClickable ? "Not started" : "Coming soon"}
                    </span>

                    <svg
                      viewBox="0 0 16 16"
                      width={14}
                      height={14}
                      fill="none"
                      className="flex-none"
                    >
                      <path
                        d="M2 8h11M9 3.5 13.5 8 9 12.5"
                        stroke="#C2BCAF"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                );

                if (isClickable) {
                  return (
                    <Link key={chapter.id} href={`/lessons/${chapter.id}`}>
                      {cardContent}
                    </Link>
                  );
                }

                return <div key={chapter.id}>{cardContent}</div>;
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
