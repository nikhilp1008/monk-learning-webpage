"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

interface ResumeSessionData {
  chapterId: string;
  chapterName: string;
  sectionTitle: string;
  position: number;
}

interface DashboardClientProps {
  profile: ProfileRow;
  questionsPracticed: number;
  chaptersStarted: number;
  resumeSession: ResumeSessionData | null;
}

export function DashboardClient({
  profile,
  questionsPracticed,
  chaptersStarted,
  resumeSession,
}: DashboardClientProps) {
  const [teachingLang, setTeachingLang] = useState<"hinglish" | "english">(
    profile.teaching_language === "english" ? "english" : "hinglish"
  );
  const [updatingLang, setUpdatingLang] = useState(false);

  // Time-based greeting helper
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Optimistic UI language update
  const handleLanguageToggle = async (newLang: "hinglish" | "english") => {
    if (newLang === teachingLang || updatingLang) return;
    setTeachingLang(newLang);
    setUpdatingLang(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ teaching_language: newLang })
        .eq("id", profile.id);

      if (error) {
        console.error("Failed to update teaching language:", error);
        // Revert on error
        setTeachingLang(profile.teaching_language === "english" ? "english" : "hinglish");
      }
    } catch (err) {
      console.error("Unexpected error updating language:", err);
    } finally {
      setUpdatingLang(false);
    }
  };

  const nameStr = profile.display_name
    ? profile.display_name.split(" ")[0]
    : "Student";

  return (
    <div className="min-h-screen flex flex-col bg-cream-light">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-11 py-8 space-y-7 animate-ml-rise">
        {/* 1. Greeting */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-ink leading-tight">
              {getGreeting()}, {nameStr}.
            </h1>
            <p className="text-ink-light text-base md:text-lg mt-1.5">
              Tonight, one chapter stands between you and 70%.
            </p>
          </div>

          {/* Teaching Language Toggle */}
          <div className="flex items-center gap-2 bg-white border border-border-subtle p-1.5 rounded-full shadow-xs self-start sm:self-auto">
            <span className="text-xs font-bold text-ink-muted pl-2 flex-none">
              Voice:
            </span>
            <div className="inline-flex gap-1 bg-ink/5 p-1 rounded-full">
              <button
                onClick={() => handleLanguageToggle("hinglish")}
                disabled={updatingLang}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  teachingLang === "hinglish"
                    ? "bg-white text-ink shadow-xs"
                    : "text-ink-light hover:text-ink"
                }`}
              >
                Hinglish
              </button>
              <button
                onClick={() => handleLanguageToggle("english")}
                disabled={updatingLang}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  teachingLang === "english"
                    ? "bg-white text-ink shadow-xs"
                    : "text-ink-light hover:text-ink"
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>

        {/* 2. Top Action Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Action Card 1: Learn with Monk */}
          <Link
            href="/lessons"
            className="relative overflow-hidden flex flex-col p-6 rounded-2xl bg-dark-bg text-[#EFEBDD] border border-[#2a2419] shadow-lg hover:-translate-y-1 transition-transform group"
          >
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(100% 100% at 80% 0%, rgba(238,163,31,0.18), transparent 55%)",
              }}
            />
            <div className="relative flex items-center justify-between z-10">
              <span className="w-12 h-12 rounded-xl grid place-items-center bg-white/10 border border-white/15">
                <svg viewBox="0 0 120 120" className="w-7 h-7" fill="none">
                  <circle
                    cx="60"
                    cy="60"
                    r="36"
                    stroke="#FCFAF4"
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeDasharray="52 23.4"
                    transform="rotate(-90 60 60)"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="19"
                    stroke="#FCFAF4"
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeDasharray="21.8 18"
                    transform="rotate(-30 60 60)"
                  />
                  <circle cx="60" cy="60" r="6" className="fill-orange" />
                </svg>
              </span>
              <span className="font-extrabold text-[0.56rem] tracking-wider uppercase rounded-md px-2.5 py-1 bg-orange-light/15 text-orange-light border border-orange-light/30">
                Most loved
              </span>
            </div>
            <h3 className="relative font-bold text-xl text-white mt-4 mb-1 z-10">
              Learn with Monk
            </h3>
            <p className="relative text-sm text-[#C7C1B3] flex-1 leading-relaxed z-10">
              Pick a chapter and let Monk teach it out loud, writing on the board step by step.
            </p>
            <span className="relative inline-flex items-center gap-2 font-bold text-xs px-4 py-2.5 rounded-full bg-orange text-dark-bg mt-5 self-start shadow-md group-hover:bg-orange-light transition-colors z-10">
              Choose a topic
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round">
                <path d="M2 8h11M9 3.5 13.5 8 9 12.5" />
              </svg>
            </span>
          </Link>

          {/* Action Card 2: Snap a doubt (Disabled / Coming Soon) */}
          <div className="flex flex-col p-5 rounded-2xl bg-white border border-border-subtle shadow-sm opacity-70 cursor-not-allowed">
            <div className="relative flex-1 min-h-[120px] rounded-xl bg-[#FBF8EF] border border-border-subtle/70 flex flex-col items-center justify-center gap-2 p-4">
              <span className="w-10 h-10 rounded-full bg-white border border-border-subtle grid place-items-center shadow-xs">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 stroke-ink"
                  fill="none"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="6" width="18" height="14" rx="3" />
                  <circle cx="12" cy="13" r="3.2" />
                  <path d="M8 6l1.2-2h5.6L16 6" />
                </svg>
              </span>
              <span className="text-center font-semibold text-xs text-ink-light">
                Photograph any question<br />
                <b className="text-ink font-bold">AI doubt solver</b>
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <h3 className="font-bold text-base text-ink">Snap a doubt</h3>
              <span className="font-extrabold text-[0.58rem] tracking-wider uppercase text-ink-muted bg-ink/5 px-2 py-0.5 rounded-full">
                COMING SOON
              </span>
            </div>
          </div>

          {/* Action Card 3: Practice unlimited (Disabled / Coming Soon) */}
          <div className="flex flex-col p-5 rounded-2xl bg-white border border-border-subtle shadow-sm opacity-70 cursor-not-allowed">
            <div className="flex-1 flex flex-col items-center justify-center min-h-[120px] rounded-xl bg-[#FBF8EF] border border-border-subtle/70 p-4">
              <span className="flex items-baseline gap-1 text-ink">
                <b className="font-bold text-3xl tracking-tight">0</b>
                <span className="text-xl text-ink-muted">/</span>
                <span className="font-bold text-2xl text-orange">∞</span>
              </span>
              <span className="font-bold text-[0.6rem] tracking-wider uppercase text-ink-muted mt-2">
                Unlimited question bank
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <h3 className="font-bold text-base text-ink">Practice unlimited</h3>
              <span className="font-extrabold text-[0.58rem] tracking-wider uppercase text-ink-muted bg-ink/5 px-2 py-0.5 rounded-full">
                COMING SOON
              </span>
            </div>
          </div>
        </div>

        {/* 3. Stat Cards Row (Balanced 2-Card Layout per Amendment) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex items-center gap-4 bg-white border border-border-subtle rounded-2xl p-5 shadow-sm">
            <span className="text-3xl md:text-4xl font-bold tracking-tight text-ink flex-none min-w-[50px]">
              {questionsPracticed}
            </span>
            <div>
              <b className="block font-bold text-base text-ink">
                Questions practised
              </b>
              <span className="text-xs text-ink-muted font-semibold">
                Recorded practice attempts in your plan
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white border border-border-subtle rounded-2xl p-5 shadow-sm">
            <span className="text-3xl md:text-4xl font-bold tracking-tight text-green-badge flex-none min-w-[50px]">
              {chaptersStarted}
            </span>
            <div>
              <b className="block font-bold text-base text-ink">
                Chapters started
              </b>
              <span className="text-xs text-ink-muted font-semibold">
                Unique chapters with recorded progress
              </span>
            </div>
          </div>
        </div>

        {/* 4. Resume Session Card */}
        <div className="bg-white border border-border-subtle rounded-2xl p-5 md:p-6 shadow-sm">
          <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted mb-3 block">
            Resume your last session
          </span>

          {resumeSession ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-cream-card border border-border-subtle/80">
              <div className="space-y-1">
                <span className="text-xs font-bold text-orange-dark bg-orange/20 px-2.5 py-0.5 rounded-full inline-block mb-1">
                  Part {resumeSession.position}
                </span>
                <h4 className="font-bold text-base md:text-lg text-ink">
                  {resumeSession.chapterName}
                </h4>
                <p className="text-xs md:text-sm text-ink-light font-medium">
                  {resumeSession.sectionTitle}
                </p>
              </div>

              <Link
                href={`/lessons/${resumeSession.chapterId}`}
                className="inline-flex items-center justify-center gap-2 font-bold text-xs px-5 py-2.5 rounded-full bg-ink text-cream-light shadow-sm hover:bg-ink/90 transition-colors self-start sm:self-auto"
              >
                Resume lesson →
              </Link>
            </div>
          ) : (
            <div className="py-6 px-4 rounded-xl bg-cream-light/50 border border-dashed border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <b className="block font-bold text-sm text-ink">
                  No lesson progress yet
                </b>
                <span className="text-xs text-ink-muted">
                  Start your first chapter and Monk will save your spot automatically.
                </span>
              </div>
              <Link
                href="/lessons"
                className="inline-flex items-center justify-center gap-2 font-bold text-xs px-4 py-2 rounded-full bg-orange text-ink shadow-xs self-center sm:self-auto"
              >
                Start your first lesson →
              </Link>
            </div>
          )}
        </div>

        {/* 5. Static Placeholders: Today's Plan & Doubt of the Day */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Today's Plan Placeholder */}
          <div className="bg-white border border-border-subtle rounded-2xl p-5 md:p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted">
                  Today&apos;s plan
                </span>
                <span className="font-extrabold text-[0.58rem] tracking-wider uppercase text-ink-muted bg-ink/5 px-2 py-0.5 rounded-full">
                  COMING SOON
                </span>
              </div>

              <div className="space-y-2 py-2">
                <div className="flex items-center gap-3 p-2.5 rounded-lg bg-cream-light/60 border border-dashed border-border-subtle text-xs text-ink-light font-medium">
                  <span className="w-4 h-4 rounded border border-ink/20 flex-none" />
                  <span>Review Oscillations restoring force derivations</span>
                </div>
                <div className="flex items-center gap-3 p-2.5 rounded-lg bg-cream-light/60 border border-dashed border-border-subtle text-xs text-ink-light font-medium">
                  <span className="w-4 h-4 rounded border border-ink/20 flex-none" />
                  <span>Solve 5 practice questions on Hooke&apos;s region</span>
                </div>
              </div>
            </div>

            <span className="text-xs text-ink-muted pt-3 border-t border-border-subtle italic">
              Personalized daily study schedules coming in the next release.
            </span>
          </div>

          {/* Doubt of the Day Placeholder */}
          <div className="relative flex flex-col justify-between bg-[#FFFEFB] border border-border-subtle rounded-2xl p-5 md:p-6 pl-10 shadow-sm overflow-hidden">
            <span className="absolute top-4 bottom-4 left-7 w-[1.5px] bg-red-note/35" />

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-script font-bold text-red-note text-base">
                  doubt of the day
                </span>
                <span className="font-extrabold text-[0.58rem] tracking-wider uppercase text-ink-muted bg-ink/5 px-2 py-0.5 rounded-full">
                  COMING SOON
                </span>
              </div>

              <p className="text-sm md:text-base text-ink leading-relaxed font-medium">
                Why do photoelectrons stop the moment intensity drops — but not when frequency drops below threshold?
              </p>
            </div>

            <span className="text-xs text-ink-muted pt-3 border-t border-border-subtle italic mt-4">
              Community and AI solved questions will feature here daily.
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
