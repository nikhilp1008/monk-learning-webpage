"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Header } from "@/components/Header";
import type { BoardEventData } from "@/components/BoardEvent";
import { PremiumBoardEvent } from "@/components/PremiumBoardEvent";
import { getScene } from "@/components/scenes";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";

type ChapterRow = Database["public"]["Tables"]["chapters"]["Row"];
type SectionRow = Database["public"]["Tables"]["lesson_sections"]["Row"];

type Language = "english" | "hinglish";

const TEACHER = "Drona";

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

function titleCase(s: string | null | undefined): string {
  if (!s) return "Lesson";
  return s.charAt(0).toUpperCase() + s.slice(1);
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
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const boardContainerRef = useRef<HTMLDivElement | null>(null);
  const debugSeekRef = useRef<number | null>(null);

  const currentSection = sections[activeIndex] ?? null;

  // Hand-choreographed scene for this section, if one is registered.
  const SceneComp = getScene(
    chapterId,
    currentSection?.position ?? activeIndex + 1
  );

  // Dev/deep-link: ?t=SECONDS jumps the first section to that time (paused),
  // so any board state can be inspected or shared directly.
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("t");
    if (t && !isNaN(parseFloat(t))) debugSeekRef.current = parseFloat(t);
  }, []);

  // Esc leaves the full-screen board.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullScreen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

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

  // Narration segments align 1:1 with board events, so the reveal timestamps
  // double as caption timings — this drives the live-caption strip.
  const captionSegments = useMemo<string[]>(() => {
    if (!currentSection) return [];
    const json =
      language === "english"
        ? currentSection.segments_english
        : currentSection.segments_hinglish;
    if (!Array.isArray(json)) return [];
    return (json as { text?: string }[]).map((s) =>
      (s?.text || "").replace(/<[^>]+>/g, "").trim()
    );
  }, [currentSection, language]);

  const activeCaption =
    revealedEventsCount > 0 ? captionSegments[revealedEventsCount - 1] || "" : "";

  // Keep the newest writing in view (event mode only — scenes are one stage).
  useEffect(() => {
    if (SceneComp) return;
    const el = boardContainerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [revealedEventsCount, activeIndex, SceneComp]);

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
          // Deep-link: ?sec=N opens section N (1-based position).
          const secParam = new URLSearchParams(window.location.search).get("sec");
          const secIdx = secParam ? parseInt(secParam, 10) - 1 : 0;
          setActiveIndex(
            secIdx > 0 && secIdx < (secRes.data || []).length ? secIdx : 0
          );
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
      setIsBuffering(false);
      if (debugSeekRef.current != null) {
        const t = debugSeekRef.current;
        debugSeekRef.current = null;
        audioRef.current.currentTime = t;
        setCurrentTime(t);
      }
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

      <main className="flex-1 max-w-[1180px] w-full mx-auto px-6 md:px-11 pt-[30px] pb-16 flex flex-col animate-ml-rise">
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
          <div style={{ margin: "0 calc(50% - 50vw + 36px)" }}>
            {/* Top Bar Controls */}
            <div className="flex items-center justify-between gap-3.5 flex-wrap mb-[18px]">
              <div className="flex items-center gap-3.5">
                <Link
                  href="/lessons"
                  className="font-semibold text-[0.86rem] px-3.5 py-2 rounded-full text-ink-light hover:text-ink transition-colors"
                >
                  ← All lessons
                </Link>
                <span className="w-px h-[22px] bg-[rgba(28,26,22,0.14)]" />
                <div>
                  <b className="font-bold text-[1.15rem] tracking-[-0.01em] text-ink">
                    {chapter.name}
                  </b>
                  <span className="block text-[0.76rem] text-ink-muted font-semibold">
                    {titleCase(chapter.subject)} · Class {chapter.class_level}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                {/* Language toggle (app feature — styled with the design's mini pills) */}
                <span className="inline-flex gap-[3px] p-[3px] bg-[rgba(28,26,22,0.055)] rounded-full">
                  {(["english", "hinglish"] as Language[]).map((lang) => {
                    const on = language === lang;
                    return (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`text-[0.82rem] px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                          on
                            ? "font-bold bg-ink text-cream-light shadow-[0_6px_14px_-8px_rgba(28,26,22,0.7)]"
                            : "font-semibold text-ink-light"
                        }`}
                      >
                        {lang === "english" ? "English" : "Hinglish"}
                      </button>
                    );
                  })}
                </span>

                {/* Play / Pause Main Button */}
                <button
                  onClick={togglePlayPause}
                  disabled={!audioUrl}
                  className="inline-flex items-center gap-[9px] font-semibold text-[0.9rem] px-5 py-[11px] rounded-full text-cream-light bg-ink shadow-[0_10px_24px_-12px_rgba(28,26,22,0.7)] hover:-translate-y-0.5 transition-transform cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isBuffering && isPlaying ? (
                    <div className="w-[15px] h-[15px] border-2 border-cream-light border-t-transparent rounded-full animate-ml-spin" />
                  ) : isPlaying ? (
                    <svg
                      viewBox="0 0 24 24"
                      width={15}
                      height={15}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    >
                      <path d="M9 5v14M15 5v14" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width={15} height={15} fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                  {isPlaying ? "Pause" : "Play lesson"}
                </button>
              </div>
            </div>

            {/* Board + Sidebar Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3.4fr)_minmax(0,1fr)] gap-5 items-stretch h-[calc(100vh-320px)] min-h-[460px]">
              {/* The Board */}
              <div
                className={`flex flex-col min-h-0 bg-ruled-board border-[1.5px] border-ink ${
                  isFullScreen
                    ? "fixed inset-0 z-[80] rounded-none p-[26px_40px_28px_60px]"
                    : "relative rounded-2xl p-[20px_26px_22px_52px] shadow-ref-board"
                }`}
              >
                {/* Red Margin Line */}
                <span
                  aria-hidden="true"
                  className="absolute top-5 bottom-5 left-9 w-[1.4px] bg-red-note/35 pointer-events-none"
                />

                <div className="flex items-center gap-2.5 mb-4 flex-none">
                  <span className="w-2 h-2 rounded-full bg-orange flex-none animate-ml-blink" />
                  <span className="font-bold text-[0.88rem] tracking-[-0.01em] min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">
                    The board · {currentSection?.title || `Part ${activeIndex + 1}`}
                  </span>

                  <button
                    onClick={() => setIsFullScreen(!isFullScreen)}
                    title={
                      isFullScreen
                        ? "Back to the normal view (Esc works too)"
                        : "Watch the board full screen"
                    }
                    className="ml-auto flex-none inline-flex items-center gap-1.5 font-semibold text-[0.76rem] px-3 py-1.5 rounded-full border border-[rgba(28,26,22,0.12)] bg-white text-ink-light hover:border-ink hover:text-ink transition-colors cursor-pointer"
                  >
                    {isFullScreen ? (
                      <>
                        <svg
                          viewBox="0 0 24 24"
                          width={12}
                          height={12}
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
                          width={12}
                          height={12}
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

                  {/* Monk mark — spins while the lesson plays */}
                  <span className="flex-none inline-flex">
                    <svg
                      viewBox="0 0 120 120"
                      width={26}
                      height={26}
                      fill="none"
                      style={{
                        display: "block",
                        transformOrigin: "center",
                        animation: isPlaying ? "mlSpin 7s linear infinite" : undefined,
                      }}
                    >
                      <circle
                        cx={60}
                        cy={60}
                        r={36}
                        stroke="#1C1A16"
                        strokeWidth={11}
                        strokeLinecap="round"
                        strokeDasharray="52 23.4"
                        transform="rotate(-90 60 60)"
                      />
                      <circle
                        cx={60}
                        cy={60}
                        r={19}
                        stroke="#1C1A16"
                        strokeWidth={9}
                        strokeLinecap="round"
                        strokeDasharray="21.8 18"
                        transform="rotate(-30 60 60)"
                      />
                      <circle cx={60} cy={60} r={6} fill="#EEA31F" />
                    </svg>
                  </span>
                </div>

                <div
                  ref={boardContainerRef}
                  className={`flex-1 min-h-0 ${
                    SceneComp ? "overflow-hidden" : "overflow-y-auto pr-1.5"
                  }`}
                >
                  {SceneComp ? (
                    <SceneComp
                      currentTime={currentTime}
                      reveals={revealTimestamps}
                      language={language}
                    />
                  ) : boardEvents.length === 0 ? (
                    <div className="py-12 text-center text-ink-muted text-sm italic">
                      No board content available for this section.
                    </div>
                  ) : revealedEventsCount === 0 ? (
                    <div className="py-12 text-center text-ink-muted text-sm font-medium animate-pulse">
                      Press Play and {TEACHER} starts writing on the board...
                    </div>
                  ) : (
                    boardEvents.slice(0, revealedEventsCount).map((event, idx) => (
                      <div key={idx}>
                        <PremiumBoardEvent
                          event={event}
                          animate={idx === revealedEventsCount - 1}
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Sidebar — In this chapter */}
              <div className="min-h-0 max-h-full self-start overflow-y-auto bg-white border border-border-subtle rounded-[18px] p-[18px_14px] shadow-ref-stat">
                <span className="block font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted mx-2 mb-2.5">
                  In this chapter
                </span>

                <div className="flex flex-col gap-0.5">
                  {sections.map((section, idx) => {
                    const isDone = idx < activeIndex;
                    const isCurrent = idx === activeIndex;
                    const posNum = section.position ?? idx + 1;

                    return (
                      <button
                        key={section.id}
                        onClick={() => handleSelectSection(idx)}
                        className="w-full text-left flex items-center gap-[11px] p-[11px_12px] rounded-[11px] cursor-pointer hover:bg-cream-card transition-colors"
                      >
                        <span
                          className={`w-[22px] h-[22px] rounded-full flex-none grid place-items-center font-bold text-[0.68rem] transition-colors ${
                            isDone
                              ? "border-[1.5px] border-transparent"
                              : isCurrent
                              ? "bg-white border-[1.5px] border-orange text-orange-dark"
                              : "bg-white border-[1.5px] border-[rgba(28,26,22,0.16)] text-ink-muted"
                          }`}
                        >
                          {isDone ? (
                            <span className="w-2 h-2 rounded-full bg-green-badge" />
                          ) : (
                            posNum
                          )}
                        </span>
                        <span
                          className={`flex-1 min-w-0 transition-all ${
                            isCurrent
                              ? "text-[1.02rem] font-bold text-ink"
                              : "text-[0.9rem] font-semibold text-ink-light"
                          }`}
                        >
                          {section.title || `Part ${posNum}`}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <p className="text-[0.76rem] text-ink-muted mt-2.5 mx-2">
                  Pick any part and {TEACHER} jumps straight there.
                </p>
              </div>
            </div>

            {/* Live Captions */}
            <div className="bg-dark-bg text-[#EFEBDD] rounded-[14px] p-[13px_18px] mt-4">
              <div className="flex justify-between font-bold text-[0.56rem] tracking-[0.12em] uppercase text-orange mb-[5px]">
                <span>{TEACHER} · live captions</span>
                <em className="not-italic text-[#938d80] tracking-[0.02em] normal-case">
                  {language === "english" ? "English" : "Hinglish"}
                </em>
              </div>
              <div className="font-devanagari text-[0.92rem] leading-[1.45]">
                {activeCaption ||
                  (currentSection?.subtopic
                    ? `${currentSection.subtopic} — ${currentSection.title}`
                    : currentSection?.title || "Listening...")}
                {isPlaying && (
                  <span
                    className="inline-block w-[5px] h-3 bg-orange ml-[3px] align-[-1px]"
                    style={{ animation: "mlBlink 1s infinite" }}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
