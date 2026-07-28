"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Header } from "@/components/Header";
import { BoardEvent, BoardEventData } from "@/components/BoardEvent";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";

type ChapterRow = Database["public"]["Tables"]["chapters"]["Row"];
type SectionRow = Database["public"]["Tables"]["lesson_sections"]["Row"];

type Language = "english" | "hinglish";

interface SubtopicGroup {
  name: string;
  sections: { section: SectionRow; originalIndex: number }[];
}

function parseBoardContent(json: unknown): BoardEventData[] {
  if (Array.isArray(json)) {
    return json as BoardEventData[];
  }
  return [];
}

function parseRevealTimestamps(json: unknown, eventCount: number): number[] {
  if (Array.isArray(json)) {
    const nums = json.map((v) => (typeof v === "number" && !isNaN(v) ? Number(v) : 0));
    if (nums.length === eventCount) {
      return nums;
    }
    if (nums.length > 0) {
      const result = new Array(eventCount).fill(0);
      for (let i = 0; i < eventCount; i++) {
        result[i] = i < nums.length ? nums[i] : (result[i - 1] ?? 0);
      }
      return result;
    }
  }
  return new Array(eventCount).fill(0);
}

export default function LessonPlayerPage() {
  const params = useParams();
  const chapterId = params?.chapterId as string;

  const [chapter, setChapter] = useState<ChapterRow | null>(null);
  const [sections, setSections] = useState<SectionRow[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [language, setLanguage] = useState<Language>("hinglish");

  const [loading, setLoading] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const boardContainerRef = useRef<HTMLDivElement | null>(null);

  const currentSection = sections[activeIndex] ?? null;

  // Load user profile preference for teaching_language
  useEffect(() => {
    async function loadLanguagePreference() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("teaching_language")
            .eq("id", user.id)
            .maybeSingle();

          if (profile?.teaching_language) {
            const lang = profile.teaching_language.toLowerCase();
            if (lang === "english" || lang === "hinglish") {
              setLanguage(lang as Language);
            }
          }
        }
      } catch (err) {
        console.error("Error loading language preference:", err);
      }
    }

    loadLanguagePreference();
  }, []);

  const audioUrl = useMemo(() => {
    if (!currentSection) return "";
    return language === "english"
      ? currentSection.audio_url_english || ""
      : currentSection.audio_url_hinglish || "";
  }, [currentSection, language]);

  const boardEvents = useMemo(() => {
    if (!currentSection) return [];
    return parseBoardContent(currentSection.board_content);
  }, [currentSection]);

  const revealTimestamps = useMemo(() => {
    if (!currentSection) return [];
    const json =
      language === "english"
        ? currentSection.board_reveal_at_english
        : currentSection.board_reveal_at_hinglish;
    return parseRevealTimestamps(json, boardEvents.length);
  }, [currentSection, language, boardEvents.length]);

  const revealedEventsCount = useMemo(() => {
    if (boardEvents.length === 0) return 0;
    let count = 0;
    for (let i = 0; i < boardEvents.length; i++) {
      const revealAt = revealTimestamps[i] ?? 0;
      if (currentTime >= revealAt) {
        count = i + 1;
      } else {
        break;
      }
    }
    return count;
  }, [boardEvents.length, revealTimestamps, currentTime]);

  const subtopicGroups = useMemo<SubtopicGroup[]>(() => {
    if (sections.length === 0) return [];
    const map = new Map<string, { section: SectionRow; originalIndex: number }[]>();

    sections.forEach((sec, idx) => {
      const name = (sec.subtopic && sec.subtopic.trim()) || "Overview & Main Topics";
      if (!map.has(name)) {
        map.set(name, []);
      }
      map.get(name)!.push({ section: sec, originalIndex: idx });
    });

    const groups: SubtopicGroup[] = [];
    map.forEach((items, name) => {
      groups.push({ name, sections: items });
    });
    return groups;
  }, [sections]);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      if (!chapterId) return;
      setLoading(true);
      try {
        const [chRes, secRes] = await Promise.all([
          supabase.from("chapters").select("*").eq("id", chapterId).single(),
          supabase
            .from("lesson_sections")
            .select("*")
            .eq("chapter_id", chapterId)
            .order("position", { ascending: true }),
        ]);

        if (chRes.error) {
          console.error("Error loading chapter:", chRes.error);
        }
        if (secRes.error) {
          console.error("Error loading sections:", secRes.error);
        }

        if (isMounted) {
          setChapter(chRes.data || null);
          setSections(secRes.data || []);
          setActiveIndex(0);
        }
      } catch (err) {
        console.error("Unexpected error loading lesson player data:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [chapterId]);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
      setIsBuffering(false);
    }
  }, []);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    setIsBuffering(false);
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleWaiting = useCallback(() => {
    setIsBuffering(true);
  }, []);

  const handleCanPlay = useCallback(() => {
    setIsBuffering(false);
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setActiveIndex((prev) => {
      if (prev < sections.length - 1) {
        return prev + 1;
      }
      return prev;
    });
  }, [sections.length]);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    audioEl.pause();
    audioEl.currentTime = 0;
    setCurrentTime(0);
    setIsBuffering(true);

    if (audioUrl) {
      audioEl.src = audioUrl;
      audioEl.load();
      if (isPlaying) {
        audioEl.play().catch((err) => {
          console.warn("Autoplay blocked or interrupted:", err);
          setIsPlaying(false);
        });
      }
    }

    return () => {
      audioEl.pause();
      audioEl.currentTime = 0;
    };
  }, [activeIndex, audioUrl]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const togglePlayPause = () => {
    const audioEl = audioRef.current;
    if (!audioEl || !audioUrl) return;

    if (isPlaying) {
      audioEl.pause();
    } else {
      audioEl.play().catch((err) => {
        console.error("Audio play error:", err);
      });
    }
  };

  const handleSelectSection = (idx: number) => {
    if (idx === activeIndex) return;
    setActiveIndex(idx);
    setCurrentTime(0);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-ruled-body">
      <Header />

      <audio
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={handlePlay}
        onPause={handlePause}
        onWaiting={handleWaiting}
        onCanPlay={handleCanPlay}
        onEnded={handleEnded}
      />

      <main className="flex-1 max-w-[1180px] w-full mx-auto px-6 md:px-11 py-6 flex flex-col animate-ml-rise">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-ink-muted flex-1">
            <div className="w-8 h-8 border-3 border-orange border-t-transparent rounded-full animate-ml-spin" />
            <span className="text-sm font-semibold">Loading lesson player...</span>
          </div>
        ) : !chapter || sections.length === 0 ? (
          <div className="py-24 text-center flex-1">
            <h2 className="text-2xl font-bold text-ink">Chapter not found</h2>
            <p className="text-ink-light mt-2 mb-6">
              This chapter has no available sections yet.
            </p>
            <Link
              href="/lessons"
              className="px-5 py-2.5 rounded-full bg-ink text-cream-light text-sm font-semibold"
            >
              ← Back to all lessons
            </Link>
          </div>
        ) : (
          <>
            {/* Top Bar Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div className="flex items-center gap-3.5">
                <Link
                  href="/lessons"
                  className="font-semibold text-sm px-3.5 py-2 rounded-full text-ink-light hover:text-ink hover:bg-white/60 transition-colors"
                >
                  ← All lessons
                </Link>
                <span className="w-px h-5 bg-border-subtle" />
                <div>
                  <h1 className="font-bold text-lg md:text-xl text-ink leading-tight">
                    {chapter.name}
                  </h1>
                  <span className="text-xs text-ink-muted font-semibold">
                    Class {chapter.class_level} ·{" "}
                    {chapter.subject ? chapter.subject.toUpperCase() : "LESSON"}{" "}
                    ·{" "}
                    {subtopicGroups.length > 1
                      ? `${subtopicGroups.length} topic modules (${sections.length} parts)`
                      : `${sections.length} sections`}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Language Toggle Switch */}
                <div className="inline-flex gap-[3px] p-[3px] bg-[rgba(28,26,22,0.055)] rounded-full">
                  <button
                    onClick={() => setLanguage("english")}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      language === "english"
                        ? "bg-white text-ink shadow-xs"
                        : "text-ink-light hover:text-ink"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage("hinglish")}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      language === "hinglish"
                        ? "bg-white text-ink shadow-xs"
                        : "text-ink-light hover:text-ink"
                    }`}
                  >
                    Hinglish
                  </button>
                </div>

                {/* Play / Pause Main Button */}
                <button
                  onClick={togglePlayPause}
                  disabled={!audioUrl}
                  className="inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-full text-dark-card bg-orange shadow-ref-pill hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isBuffering ? (
                    <div className="w-4 h-4 border-2 border-dark-card border-t-transparent rounded-full animate-ml-spin" />
                  ) : isPlaying ? (
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    >
                      <path d="M9 5v14M15 5v14" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                  {isBuffering
                    ? "Loading..."
                    : isPlaying
                    ? "Pause"
                    : "Play lesson"}
                </button>
              </div>
            </div>

            {/* Main Board Player + Sidebar Grid */}
            <div
              className={`grid grid-cols-1 lg:grid-cols-[minmax(0,3.4fr)_minmax(0,1fr)] gap-5 items-stretch transition-all ${
                isFullScreen
                  ? "fixed inset-0 z-50 p-6 bg-cream-light"
                  : "h-[calc(100vh-320px)] min-h-[460px]"
              }`}
            >
              {/* Board Area */}
              <div
                className={`relative flex flex-col bg-ruled-board border-[1.5px] border-ink rounded-[18px] p-[24px_28px_24px_54px] shadow-ref-board overflow-hidden ${
                  isFullScreen ? "h-full" : ""
                }`}
              >
                {/* Red Margin Line */}
                <span
                  aria-hidden="true"
                  className="absolute top-5 bottom-5 left-[36px] w-[1.4px] bg-red-note/35 pointer-events-none"
                />

                <div className="flex items-center gap-3 mb-4 flex-none z-10">
                  <span
                    className={`w-2.5 h-2.5 rounded-full bg-orange flex-none ${
                      isPlaying ? "animate-ml-blink" : ""
                    }`}
                  />
                  <span className="font-bold text-sm text-ink truncate flex-1 min-w-0">
                    The board · {currentSection?.title || `Part ${activeIndex + 1}`}
                  </span>

                  {isBuffering && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-orange font-semibold bg-orange/10 px-2.5 py-0.5 rounded-full">
                      <div className="w-3 h-3 border-2 border-orange border-t-transparent rounded-full animate-ml-spin" />
                      Buffering audio...
                    </span>
                  )}

                  <button
                    onClick={() => setIsFullScreen(!isFullScreen)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-border-subtle bg-white text-ink-light hover:text-ink hover:border-ink transition-colors"
                  >
                    {isFullScreen ? (
                      <>
                        <svg
                          viewBox="0 0 24 24"
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7" />
                        </svg>
                        Exit full screen
                      </>
                    ) : (
                      <>
                        <svg
                          viewBox="0 0 24 24"
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                        </svg>
                        Full screen
                      </>
                    )}
                  </button>
                </div>

                <div
                  ref={boardContainerRef}
                  className="flex-1 min-h-0 overflow-y-auto pl-4 pr-2 space-y-3 z-10"
                >
                  {boardEvents.length === 0 ? (
                    <div className="py-12 text-center text-ink-muted text-sm italic">
                      No board content available for this section.
                    </div>
                  ) : revealedEventsCount === 0 ? (
                    <div className="py-12 text-center text-ink-muted text-sm font-medium animate-pulse">
                      Press Play to reveal board content as Monk speaks...
                    </div>
                  ) : (
                    boardEvents.slice(0, revealedEventsCount).map((event, idx) => (
                      <div key={idx} className="animate-ml-rise">
                        <BoardEvent event={event} />
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-border-subtle flex items-center gap-3 z-10 flex-none">
                  <span className="text-xs font-mono text-ink-muted font-medium w-10">
                    {formatTime(currentTime)}
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={(e) => {
                      const newTime = Number(e.target.value);
                      setCurrentTime(newTime);
                      if (audioRef.current) {
                        audioRef.current.currentTime = newTime;
                      }
                    }}
                    className="flex-1 accent-orange h-1.5 bg-ink/10 rounded-lg cursor-pointer"
                  />
                  <span className="text-xs font-mono text-ink-muted font-medium w-10 text-right">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>

              {/* Sidebar */}
              <div className="flex flex-col bg-white border border-border-subtle rounded-[18px] p-[18px_14px] shadow-ref-stat overflow-hidden h-full">
                <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted mb-3 block">
                  Curriculum Modules
                </span>

                <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-1">
                  {subtopicGroups.map((group, gIdx) => {
                    const hasActiveSection = group.sections.some(
                      (item) => item.originalIndex === activeIndex
                    );

                    return (
                      <div
                        key={gIdx}
                        className={`rounded-xl border p-2.5 transition-colors ${
                          hasActiveSection
                            ? "border-orange/40 bg-cream/30"
                            : "border-border-subtle/60 bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-2 pb-1 border-b border-border-subtle/40">
                          <span className="font-bold text-xs text-ink truncate">
                            {gIdx + 1}. {group.name}
                          </span>
                          <span className="text-[0.62rem] font-bold text-ink-muted bg-ink/5 px-2 py-0.5 rounded-full flex-none">
                            {group.sections.length} parts
                          </span>
                        </div>

                        <div className="space-y-1">
                          {group.sections.map(({ section, originalIndex }) => {
                            const isActive = originalIndex === activeIndex;
                            const posNum = section.position ?? originalIndex + 1;

                            return (
                              <button
                                key={section.id}
                                onClick={() => handleSelectSection(originalIndex)}
                                className={`w-full text-left flex items-center gap-2 p-1.5 rounded-lg transition-all ${
                                  isActive
                                    ? "bg-orange text-dark-card font-bold shadow-xs"
                                    : "hover:bg-cream/50 text-ink-light font-medium"
                                }`}
                              >
                                <span
                                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[0.65rem] flex-none ${
                                    isActive
                                      ? "bg-dark-card text-cream-light font-extrabold"
                                      : "bg-ink/10 text-ink-muted font-bold"
                                  }`}
                                >
                                  {posNum}
                                </span>
                                <span className="text-xs truncate leading-snug">
                                  {section.title || `Part ${posNum}`}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="text-xs text-ink-muted mt-3 pt-3 border-t border-border-subtle">
                  Pick any module or section to jump straight there.
                </p>
              </div>
            </div>

            {/* Bottom Live Captions Banner */}
            <div className="bg-dark-bg text-[#EFEBDD] rounded-xl p-[13px_18px] mt-4 shadow-sm flex flex-col gap-1">
              <div className="flex items-center justify-between text-[0.62rem] font-extrabold tracking-widest uppercase text-orange">
                <span>Monk · Live board sync</span>
                <span className="text-[#C7C1B3] normal-case font-medium">
                  {language === "english" ? "English narration" : "Hinglish narration"}
                </span>
              </div>
              <div className="font-devanagari text-sm md:text-base leading-relaxed text-[#EFEBDD]">
                {currentSection?.subtopic
                  ? `${currentSection.subtopic} — ${currentSection.title}`
                  : currentSection?.title || "Listening..."}
                {isPlaying && (
                  <span className="inline-block w-1.5 h-3 bg-orange ml-1.5 align-middle animate-ml-blink" />
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
