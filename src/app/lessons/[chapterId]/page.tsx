"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { BoardEventData } from "@/components/BoardEvent";
import { PremiumBoardEvent } from "@/components/PremiumBoardEvent";
import { getScene } from "@/components/scenes";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";

type ChapterRow = Database["public"]["Tables"]["chapters"]["Row"];
type SectionRow = Database["public"]["Tables"]["lesson_sections"]["Row"];

type Language = "english" | "hinglish";

const TEACHER = "Drona";

const SPEEDS = [0.75, 1, 1.25, 1.5] as const;

function formatSpeed(rate: number): string {
  return `${rate}×`;
}

interface SubtopicGroup {
  name: string;
  sections: { section: SectionRow; originalIndex: number }[];
}

function parseBoardContent(json: unknown): BoardEventData[] {
  if (Array.isArray(json)) {
    return json as BoardEventData[];
  }
  if (json && typeof json === "object" && "events" in json && Array.isArray((json as { events: unknown }).events)) {
    return (json as { events: BoardEventData[] }).events;
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
  const [duration, setDuration] = useState<number>(0);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [speedOpen, setSpeedOpen] = useState<boolean>(false);
  const [openGroup, setOpenGroup] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const boardShellRef = useRef<HTMLDivElement | null>(null);
  const boardContainerRef = useRef<HTMLDivElement | null>(null);
  const scrubRef = useRef<HTMLDivElement | null>(null);
  const speedMenuRef = useRef<HTMLSpanElement | null>(null);
  const debugSeekRef = useRef<number | null>(null);
  const playbackRateRef = useRef<number>(1);

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

  // Real browser fullscreen: Esc / system UI exits land here, so state
  // always mirrors what's actually on screen.
  useEffect(() => {
    const onFsChange = () => {
      const fsEl =
        document.fullscreenElement ??
        (document as Document & { webkitFullscreenElement?: Element })
          .webkitFullscreenElement;
      setIsFullScreen(Boolean(fsEl));
    };
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("webkitfullscreenchange", onFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFsChange);
      document.removeEventListener("webkitfullscreenchange", onFsChange);
    };
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
    // Hand-choreographed scenes drive their own beats straight off the raw
    // reveal array and don't read board_content at all — so for a registered
    // scene, don't clamp/pad reveals to legacy board_content's event count
    // (which is empty for scene-only chapters and would zero this out).
    if (SceneComp) {
      return Array.isArray(json)
        ? json.map((v) => (typeof v === "number" && !isNaN(v) ? Number(v) : 0))
        : [];
    }
    return parseRevealTimestamps(json, boardEvents.length);
  }, [currentSection, language, boardEvents.length, SceneComp]);

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
    const raw =
      language === "english"
        ? currentSection.segments_english
        : currentSection.segments_hinglish;
    let list: unknown[] = [];
    if (Array.isArray(raw)) {
      list = raw;
    } else if (raw && typeof raw === "object" && "segments" in raw && Array.isArray((raw as { segments: unknown }).segments)) {
      list = (raw as { segments: unknown[] }).segments;
    }
    return list.map((s) => {
      if (typeof s === "string") return s.replace(/<[^>]+>/g, "").trim();
      if (s && typeof s === "object" && "text" in s && typeof (s as { text: unknown }).text === "string") {
        return (s as { text: string }).text.replace(/<[^>]+>/g, "").trim();
      }
      return "";
    });
  }, [currentSection, language]);

  const activeCaption =
    revealedEventsCount > 0 ? captionSegments[revealedEventsCount - 1] || "" : "";

  // Sections grouped under their subtopic, mirroring how the chapter's audio
  // was authored (one module -> many parts).
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
      setDuration(audioRef.current.duration || 0);
      setIsBuffering(false);
      // A fresh src resets playbackRate in some browsers — re-apply the choice.
      audioRef.current.playbackRate = playbackRateRef.current;
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
    setDuration(0);
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

  const togglePlayPause = useCallback(() => {
    const audioEl = audioRef.current;
    if (!audioEl || !audioUrl) return;

    if (audioEl.paused) {
      audioEl.play().catch((err) => {
        console.error("Audio play error:", err);
      });
    } else {
      audioEl.pause();
    }
  }, [audioUrl]);

  // One control drives both flavours of fullscreen: the native API where the
  // browser allows it (board fills the physical screen — no tabs, no chrome),
  // with the fixed-overlay CSS as the fallback.
  const toggleFullScreen = useCallback(() => {
    const el = boardShellRef.current as
      | (HTMLDivElement & { webkitRequestFullscreen?: () => Promise<void> })
      | null;
    const doc = document as Document & {
      webkitFullscreenElement?: Element;
      webkitExitFullscreen?: () => Promise<void>;
    };

    if (!isFullScreen) {
      setIsFullScreen(true);
      const request = el?.requestFullscreen ?? el?.webkitRequestFullscreen;
      if (el && request) {
        try {
          const p = request.call(el);
          if (p && typeof p.catch === "function") p.catch(() => {});
        } catch {
          /* CSS overlay still applies */
        }
      }
    } else {
      setIsFullScreen(false);
      if (doc.fullscreenElement ?? doc.webkitFullscreenElement) {
        const exit = doc.exitFullscreen ?? doc.webkitExitFullscreen;
        try {
          const p = exit?.call(document);
          if (p && typeof p.catch === "function") p.catch(() => {});
        } catch {
          /* already out */
        }
      }
    }
  }, [isFullScreen]);

  // Esc leaves the CSS-fallback fullscreen; Space toggles play while the
  // board owns the whole screen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullScreen) {
        toggleFullScreen();
      }
      if (e.code === "Space" && isFullScreen) {
        e.preventDefault();
        togglePlayPause();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isFullScreen, toggleFullScreen, togglePlayPause]);

  // Apply the chosen speed live and remember it across section changes.
  useEffect(() => {
    playbackRateRef.current = playbackRate;
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Speed menu dismisses on any tap outside it.
  useEffect(() => {
    if (!speedOpen) return;
    const onDown = (e: PointerEvent) => {
      if (
        speedMenuRef.current &&
        !speedMenuRef.current.contains(e.target as Node)
      ) {
        setSpeedOpen(false);
      }
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [speedOpen]);

  const handleSelectSection = (idx: number) => {
    if (idx === activeIndex) return;
    setActiveIndex(idx);
    setCurrentTime(0);
  };

  // The sidebar follows the lesson: whichever subtopic holds the playing
  // part unfolds on its own.
  const activeGroupIdx = useMemo(
    () =>
      subtopicGroups.findIndex((g) =>
        g.sections.some((s) => s.originalIndex === activeIndex)
      ),
    [subtopicGroups, activeIndex]
  );

  useEffect(() => {
    if (activeGroupIdx >= 0) setOpenGroup(activeGroupIdx);
  }, [activeGroupIdx]);

  // Reels-style scrub: drag anywhere along the board's baseline to seek.
  const seekFromClientX = useCallback(
    (clientX: number) => {
      const el = scrubRef.current;
      const audioEl = audioRef.current;
      if (!el || !audioEl || !duration) return;
      const rect = el.getBoundingClientRect();
      const frac = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      const t = frac * duration;
      audioEl.currentTime = t;
      setCurrentTime(t);
    },
    [duration]
  );

  const progressFrac =
    duration > 0 ? Math.min(1, Math.max(0, currentTime / duration)) : 0;

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-ruled-body">

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

      <main className="flex-1 min-h-0 max-w-[1180px] w-full mx-auto px-6 md:px-11 pt-5 pb-5 flex flex-col animate-ml-rise">
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
          <div
            className="flex-1 min-h-0 flex flex-col"
            style={{ margin: "0 calc(50% - 50vw + 36px)" }}
          >
            {/* Top Bar Controls */}
            <div className="flex-none flex items-center justify-between gap-3.5 flex-wrap mb-3.5">
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

            {/* Board + Sidebar Grid — fills the rest of the viewport */}
            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[minmax(0,3.4fr)_minmax(0,1fr)] gap-5 items-stretch">
              {/* The Board */}
              <div
                ref={boardShellRef}
                className={`flex flex-col min-h-0 bg-ruled-board border-[1.5px] border-ink ${
                  isFullScreen
                    ? "fixed inset-0 z-[80] w-full h-full rounded-none p-[26px_40px_28px_60px]"
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

                  <div className="ml-auto flex-none flex items-center gap-2">
                    {/* In fullscreen the top bar is gone, so the board
                        carries its own play/pause. */}
                    {isFullScreen && (
                      <button
                        onClick={togglePlayPause}
                        disabled={!audioUrl}
                        title={isPlaying ? "Pause (Space)" : "Play (Space)"}
                        className="flex-none inline-flex items-center gap-1.5 font-semibold text-[0.76rem] pl-2.5 pr-3.5 py-1.5 rounded-full bg-ink text-cream-light shadow-[0_6px_14px_-8px_rgba(28,26,22,0.7)] hover:-translate-y-px transition-transform cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isBuffering && isPlaying ? (
                          <span className="w-3 h-3 border-2 border-cream-light border-t-transparent rounded-full animate-ml-spin" />
                        ) : isPlaying ? (
                          <svg
                            viewBox="0 0 24 24"
                            width={12}
                            height={12}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                          >
                            <path d="M9 5v14M15 5v14" />
                          </svg>
                        ) : (
                          <svg
                            viewBox="0 0 24 24"
                            width={12}
                            height={12}
                            fill="currentColor"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                        {isPlaying ? "Pause" : "Play"}
                      </button>
                    )}

                    {/* Playback speed — a quiet chip; taps open the choices */}
                    <span ref={speedMenuRef} className="relative flex-none">
                      <button
                        onClick={() => setSpeedOpen((v) => !v)}
                        title="Playback speed"
                        className={`inline-flex items-center gap-1 font-bold text-[0.76rem] tracking-[0.01em] px-3 py-1.5 rounded-full border bg-white transition-colors cursor-pointer tabular-nums ${
                          speedOpen || playbackRate !== 1
                            ? "border-ink text-ink"
                            : "border-[rgba(28,26,22,0.12)] text-ink-light hover:border-ink hover:text-ink"
                        }`}
                      >
                        {formatSpeed(playbackRate)}
                      </button>
                      {speedOpen && (
                        <div className="absolute right-0 top-[calc(100%+7px)] z-[90] min-w-[104px] bg-white border border-border-subtle rounded-[14px] shadow-ref-board p-1 animate-ml-rise">
                          {SPEEDS.map((s) => {
                            const on = playbackRate === s;
                            return (
                              <button
                                key={s}
                                onClick={() => {
                                  setPlaybackRate(s);
                                  setSpeedOpen(false);
                                }}
                                className={`w-full text-left flex items-center justify-between gap-3 px-3 py-[7px] rounded-[10px] text-[0.8rem] tabular-nums transition-colors cursor-pointer ${
                                  on
                                    ? "font-bold text-ink bg-cream-card"
                                    : "font-semibold text-ink-light hover:bg-cream-card hover:text-ink"
                                }`}
                              >
                                {formatSpeed(s)}
                                {on && (
                                  <span className="w-[7px] h-[7px] rounded-full bg-orange flex-none" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </span>

                    <button
                      onClick={toggleFullScreen}
                      title={
                        isFullScreen
                          ? "Back to the normal view (Esc works too)"
                          : "Watch the board full screen"
                      }
                      className="flex-none inline-flex items-center gap-1.5 font-semibold text-[0.76rem] px-3 py-1.5 rounded-full border border-[rgba(28,26,22,0.12)] bg-white text-ink-light hover:border-ink hover:text-ink transition-colors cursor-pointer"
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
                  </div>

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
                    SceneComp
                      ? "overflow-hidden flex items-center justify-center"
                      : "overflow-y-auto pr-1.5"
                  }`}
                >
                  {SceneComp ? (
                    // Scenes are authored on a fixed 1080x620 canvas, but this
                    // container just takes whatever height the page's flex
                    // layout hands it -- no aspect ratio of its own. With
                    // `preserveAspectRatio="xMidYMin meet"` on the child <svg>,
                    // a container taller/narrower than 1080:620 (common: tall
                    // viewport, narrow sidebar-shrunk column) left the drawing
                    // scaled to fit the WIDTH and pinned to the top, wasting
                    // up to two-thirds of the box as blank space below it --
                    // measured directly at 67% on one real layout. It reads as
                    // "the board only uses the top of the canvas," but no
                    // amount of content redistribution inside the SVG's own
                    // viewBox fixes it, because the container discards the
                    // space before the SVG is ever positioned inside it.
                    //
                    // This wrapper is the fix: aspect-ratio only takes effect
                    // when at least one axis is free, so width:100% is paired
                    // with max-height:100% (not height:100%) to leave height
                    // free for the ratio to resolve against, then clamped by
                    // max-height if that would overflow -- the standard
                    // "contain" sizing for a fixed-ratio box in CSS. The
                    // parent flex centers whatever size comes out, and because
                    // the wrapper's ratio now matches the SVG's viewBox
                    // exactly, xMidYMin has nothing left to do: the drawing
                    // fills the box with no gap on any side.
                    <div
                      className="w-full max-h-full mx-auto"
                      style={{ aspectRatio: "1080 / 620" }}
                    >
                      <SceneComp
                        currentTime={currentTime}
                        reveals={revealTimestamps}
                        language={language}
                      />
                    </div>
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

                {/* Baseline scrub — the board's bottom rule doubles as the
                    progress line; drag anywhere along it to move through
                    the lesson (reels-style, no external controls). */}
                <div
                  ref={scrubRef}
                  onPointerDown={(e) => {
                    e.currentTarget.setPointerCapture(e.pointerId);
                    setIsScrubbing(true);
                    seekFromClientX(e.clientX);
                  }}
                  onPointerMove={(e) => {
                    if (isScrubbing) seekFromClientX(e.clientX);
                  }}
                  onPointerUp={() => setIsScrubbing(false)}
                  onPointerCancel={() => setIsScrubbing(false)}
                  className={`group absolute h-[18px] flex items-end cursor-pointer select-none ${
                    isFullScreen
                      ? "left-[60px] right-10 bottom-[7px]"
                      : "left-[52px] right-[26px] bottom-[5px]"
                  } ${duration > 0 ? "" : "pointer-events-none opacity-0"}`}
                  style={{ touchAction: "none" }}
                >
                  <div
                    className={`relative w-full rounded-full bg-ink/8 transition-all ${
                      isScrubbing ? "h-[5px]" : "h-[2.5px] group-hover:h-[5px]"
                    }`}
                  >
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-orange"
                      style={{ width: `${progressFrac * 100}%` }}
                    />
                    <span
                      className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[11px] h-[11px] rounded-full bg-orange border-2 border-white shadow-sm transition-opacity ${
                        isScrubbing ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                      style={{ left: `${progressFrac * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Sidebar — In this chapter. No card, no chrome: a quiet
                  notebook index that lives on the ruled page. One subtopic
                  open at a time; the one being taught unfolds on its own. */}
              <div className="min-h-0 max-h-full self-start overflow-y-auto px-1">
                <span className="block font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted mb-1.5 px-0.5">
                  In this chapter
                </span>

                {subtopicGroups.map((group, gIdx) => {
                  const open = openGroup === gIdx;
                  const total = group.sections.length;
                  const doneCount = group.sections.filter(
                    ({ originalIndex }) => originalIndex < activeIndex
                  ).length;
                  const hasCurrent = gIdx === activeGroupIdx;
                  const allDone = doneCount === total;
                  const started = hasCurrent || doneCount > 0;

                  return (
                    <div
                      key={gIdx}
                      className="border-b border-dashed border-[rgba(28,26,22,0.12)]"
                    >
                      {/* Subtopic row — the whole line is the toggle */}
                      <button
                        onClick={() => setOpenGroup(open ? -1 : gIdx)}
                        className="w-full text-left flex items-center gap-2.5 py-3 px-0.5 cursor-pointer group/topic"
                      >
                        <span className="font-script font-bold text-[0.84rem] text-ink-dim w-[18px] flex-none">
                          {gIdx + 1}
                        </span>
                        <span
                          className={`flex-1 min-w-0 text-[0.94rem] leading-snug transition-colors ${
                            hasCurrent
                              ? "font-bold text-ink"
                              : "font-semibold text-ink-light group-hover/topic:text-ink"
                          }`}
                        >
                          {group.name}
                        </span>
                        <span className="flex-none inline-flex items-center gap-2">
                          {allDone ? (
                            <svg
                              viewBox="0 0 16 16"
                              width={13}
                              height={13}
                              fill="none"
                              stroke="#1C9B57"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M2.5 8.5 6 12l7.5-8" />
                            </svg>
                          ) : (
                            <span
                              className={`text-[0.66rem] font-bold tabular-nums ${
                                started ? "text-orange-dark" : "text-ink-dim"
                              }`}
                            >
                              {started ? `${doneCount}/${total}` : total}
                            </span>
                          )}
                          <svg
                            viewBox="0 0 16 16"
                            width={11}
                            height={11}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`text-ink-dim group-hover/topic:text-ink-light transition-transform duration-300 ${
                              open ? "rotate-180" : ""
                            }`}
                          >
                            <path d="M3.5 6 8 10.5 12.5 6" />
                          </svg>
                        </span>
                      </button>

                      {/* Parts — smooth unfold, threaded on a hairline rail */}
                      <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden min-h-0">
                          <div className="relative ml-[7px] pl-[18px] pb-3">
                            <span
                              aria-hidden="true"
                              className="absolute left-0 top-1 bottom-2 w-px bg-[rgba(28,26,22,0.12)]"
                            />
                            {group.sections.map(({ section, originalIndex }) => {
                              const isDone = originalIndex < activeIndex;
                              const isCurrent = originalIndex === activeIndex;
                              const posNum =
                                section.position ?? originalIndex + 1;

                              return (
                                <button
                                  key={section.id}
                                  onClick={() =>
                                    handleSelectSection(originalIndex)
                                  }
                                  className="relative w-full text-left flex items-center py-[6px] pr-1 cursor-pointer group/part"
                                >
                                  <span
                                    aria-hidden="true"
                                    className={`absolute left-[-18px] top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full transition-all ${
                                      isCurrent
                                        ? "w-[9px] h-[9px] bg-orange ring-[3px] ring-orange/20"
                                        : isDone
                                        ? "w-[7px] h-[7px] bg-green-badge"
                                        : "w-[7px] h-[7px] bg-cream-light border border-[rgba(28,26,22,0.3)] group-hover/part:border-ink"
                                    }`}
                                  />
                                  <span
                                    className={`flex-1 min-w-0 leading-snug transition-colors ${
                                      isCurrent
                                        ? "text-[0.9rem] font-bold text-ink"
                                        : isDone
                                        ? "text-[0.84rem] font-medium text-ink-muted group-hover/part:text-ink"
                                        : "text-[0.84rem] font-semibold text-ink-light group-hover/part:text-ink"
                                    }`}
                                  >
                                    {section.title || `Part ${posNum}`}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <p className="text-[0.74rem] text-ink-muted mt-3 px-0.5">
                  Pick any part and {TEACHER} jumps straight there.
                </p>
              </div>
            </div>

            {/* Live Captions */}
            <div className="flex-none bg-dark-bg text-[#EFEBDD] rounded-[14px] p-[13px_18px] mt-4">
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
