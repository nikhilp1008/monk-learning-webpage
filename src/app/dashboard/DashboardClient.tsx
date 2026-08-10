"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";
import { TodaysPlan } from "./TodaysPlan";

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

interface ResumeSessionData {
  chapterId: string;
  chapterName: string;
  sectionTitle: string;
  position: number;
}

interface DoubtOfDayData {
  subject: string;
  concept: string;
  questionText: string;
  chapterId: string | null;
}

interface DashboardClientProps {
  profile: ProfileRow;
  questionsPracticed: number;
  chaptersStarted: number;
  resumeSession: ResumeSessionData | null;
  doubtOfDay: DoubtOfDayData | null;
}

export function DashboardClient({
  profile,
  questionsPracticed,
  chaptersStarted,
  resumeSession,
  doubtOfDay,
}: DashboardClientProps) {
  const [teachingLang, setTeachingLang] = useState<"hinglish" | "english">(
    profile.teaching_language === "english" ? "english" : "hinglish"
  );
  const [updatingLang, setUpdatingLang] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    return "Good evening";
  };

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
    <div className="min-h-screen flex flex-col bg-ruled-body">
      <Header />

      <main className="flex-1 max-w-[1180px] w-full mx-auto px-6 md:px-11 py-8 space-y-5 animate-ml-rise">
        {/* 1. Greeting */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
          <div>
            <h1 className="text-[2.3rem] leading-[1.05] tracking-[-0.025em] font-medium text-ink">
              {getGreeting()}, {nameStr}.
            </h1>
            <p className="text-[#57534B] text-[1rem] mt-1.5">
              Tonight, one chapter stands between you and 70%.
            </p>
          </div>

          {/* Voice Language Toggle (Real feature driving lesson player) */}
          <div className="flex items-center gap-2 bg-white border border-border-subtle p-1.5 rounded-full shadow-xs self-start sm:self-auto">
            <span className="text-xs font-bold text-ink-muted pl-2 flex-none">
              Voice:
            </span>
            <div className="inline-flex gap-[3px] p-[3px] bg-[rgba(28,26,22,0.055)] rounded-full">
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

        {/* 2. Top Action Cards Row (1.3fr 1fr 1fr ratio) */}
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr] gap-[18px]">
          {/* Action Card 1: Learn with Monk */}
          <Link
            href="/learn"
            className="relative overflow-hidden flex flex-col p-[24px] rounded-[22px] bg-[#16130E] text-[#EFEBDD] border border-[#2a2419] shadow-ref-hero hover:-translate-y-1 transition-transform group"
          >
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(100% 100% at 80% 0%, rgba(238,163,31,0.18), transparent 55%)",
              }}
            />
            <div className="relative flex items-center justify-between z-10">
              <span className="w-[50px] h-[50px] rounded-[14px] grid place-items-center bg-white/10 border border-white/15">
                <svg viewBox="0 0 120 120" className="w-[27px] h-[27px]" fill="none">
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
              <span className="font-extrabold text-[0.56rem] tracking-[0.1em] uppercase rounded-[6px] px-[9px] py-1 bg-[rgba(245,203,96,0.14)] text-[#F5CB60] border border-[rgba(245,203,96,0.3)]">
                Most loved
              </span>
            </div>
            <h3 className="relative font-bold text-[1.42rem] tracking-[-0.02em] text-white mt-4 mb-1.5 z-10">
              Learn with Monk
            </h3>
            <p className="relative text-[0.94rem] leading-[1.55] text-[#C7C1B3] flex-1 z-10">
              Pick a chapter and let Monk teach it out loud, writing on the board as it goes.
            </p>
            <span className="relative inline-flex items-center gap-2 font-bold text-[0.9rem] px-[20px] py-[11px] rounded-full bg-[#EEA31F] text-[#241a08] mt-4 self-start shadow-ref-pill group-hover:bg-orange-light transition-colors z-10">
              Choose a topic
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="1.9" strokeLinecap="round">
                <path d="M2 8h11M9 3.5 13.5 8 9 12.5" />
              </svg>
            </span>
          </Link>

          {/* Action Card 2: Snap a doubt */}
          <Link
            href="/snap"
            className="group flex flex-col p-5 rounded-[22px] bg-white border border-[rgba(28,26,22,0.08)] shadow-ref-card hover:-translate-y-0.5 transition-transform"
          >
            <div className="relative flex-1 min-h-[128px] rounded-[14px] bg-[#FBF8EF] border border-[rgba(28,26,22,0.07)] flex flex-col items-center justify-center gap-2 p-4">
              {/* Signature Amber Viewfinder Corners */}
              <span className="absolute top-[10px] left-[10px] w-[19px] h-[19px] border-2 border-orange border-r-0 border-b-0 rounded-tl-[5px]" />
              <span className="absolute top-[10px] right-[10px] w-[19px] h-[19px] border-2 border-orange border-l-0 border-b-0 rounded-tr-[5px]" />
              <span className="absolute bottom-[10px] left-[10px] w-[19px] h-[19px] border-2 border-orange border-r-0 border-t-0 rounded-bl-[5px]" />
              <span className="absolute bottom-[10px] right-[10px] w-[19px] h-[19px] border-2 border-orange border-l-0 border-t-0 rounded-br-[5px]" />

              <span className="w-[44px] h-[44px] rounded-full bg-white border border-[rgba(28,26,22,0.12)] grid place-items-center shadow-xs">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 stroke-[#1C1A16]"
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
              <span className="text-center font-semibold text-[0.82rem] text-[#57534B] leading-snug">
                Drop, paste or snap<br />
                <b className="text-[#1C1A16] font-bold">max 2 questions</b>
              </span>
            </div>
            <div className="mt-3.5 flex items-center justify-between">
              <h3 className="font-bold text-[1.14rem] tracking-[-0.02em] text-[#1C1A16]">Snap a doubt</h3>
              <span className="inline-flex items-center gap-1.5 font-bold text-[0.82rem] text-[#1C1A16] group-hover:gap-2.5 transition-all">
                Snap it
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="1.9" strokeLinecap="round">
                  <path d="M2 8h11M9 3.5 13.5 8 9 12.5" />
                </svg>
              </span>
            </div>
          </Link>

          {/* Action Card 3: Practice unlimited (Disabled with COMING SOON badge) */}
          <div className="flex flex-col p-5 rounded-[22px] bg-white border border-[rgba(28,26,22,0.08)] shadow-ref-card opacity-75 cursor-not-allowed">
            <div className="flex-1 flex flex-col items-center justify-center min-h-[128px] rounded-[14px] bg-[#FBF8EF] border border-[rgba(28,26,22,0.07)] p-4">
              <span className="flex items-baseline gap-1 leading-none">
                <b className="font-bold text-[2.5rem] tracking-[-0.03em] text-[#1C1A16]">0</b>
                <span className="font-semibold text-[1.5rem] text-[#9C988C]"> / </span>
                <span className="font-bold text-[2rem] text-[#EEA31F] relative top-[2px]">∞</span>
              </span>
              <span className="font-bold text-[0.62rem] tracking-[0.12em] uppercase text-[#9C988C] mt-2">
                solved today · never runs out
              </span>
            </div>
            <div className="mt-3.5 flex items-center justify-between">
              <h3 className="font-bold text-[1.14rem] tracking-[-0.02em] text-[#1C1A16]">Practice unlimited</h3>
              <span className="font-extrabold text-[0.58rem] tracking-wider uppercase text-ink-muted bg-ink/5 px-2 py-0.5 rounded-full">
                COMING SOON
              </span>
            </div>
          </div>
        </div>

        {/* 3. Stat Cards Row (Balanced 2-Card Layout for Real Metrics) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
          <div className="flex items-center gap-[13px] bg-white border border-[rgba(28,26,22,0.08)] rounded-[18px] p-[16px_20px] shadow-ref-stat">
            <span className="font-bold text-[2rem] leading-none tracking-[-0.03em] text-[#1C1A16] flex-none min-w-[45px]">
              {questionsPracticed}
            </span>
            <div>
              <b className="block font-bold text-[0.86rem] text-[#1C1A16]">
                questions practiced
              </b>
              <span className="text-[0.72rem] text-[#9C988C] font-semibold">
                Recorded practice attempts in your plan
              </span>
            </div>
          </div>

          <div className="flex items-center gap-[13px] bg-white border border-[rgba(28,26,22,0.08)] rounded-[18px] p-[16px_20px] shadow-ref-stat">
            <span className="font-bold text-[2rem] leading-none tracking-[-0.03em] text-[#157A45] flex-none min-w-[45px]">
              {chaptersStarted}
            </span>
            <div>
              <b className="block font-bold text-[0.86rem] text-[#1C1A16]">
                chapters started
              </b>
              <span className="text-[0.72rem] text-[#157A45] font-bold">
                Unique chapters with recorded progress
              </span>
            </div>
          </div>
        </div>

        {/* 4. Resume Last Session Card (Real User Session Data) */}
        <div className="bg-white border border-[rgba(28,26,22,0.08)] rounded-[18px] p-[18px_22px] shadow-ref-stat">
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
                className="inline-flex items-center justify-center gap-2 font-bold text-xs px-4 py-2 rounded-full bg-orange text-dark-card shadow-xs self-center sm:self-auto"
              >
                Start your first lesson →
              </Link>
            </div>
          )}
        </div>

        {/* 5. Middle Grid: Doubt of the Day (Ruled Paper) + Today's Plan (Placeholder) */}
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-[18px] items-stretch">
          {/* Doubt of the Day Card (Ruled Notebook Paper Styling) */}
          <div className="relative flex flex-col justify-between bg-ruled-card border border-[rgba(28,26,22,0.12)] rounded-[16px] p-[20px_24px_20px_48px] shadow-ref-card overflow-hidden">
            <span
              aria-hidden="true"
              className="absolute top-[12px] bottom-[12px] left-[32px] w-[1.5px] bg-[rgba(221,68,51,0.4)] pointer-events-none"
            />

            <div>
              <div className="flex items-center justify-between gap-3">
                <span className="font-script font-bold text-[#DD4433] text-[1rem] -rotate-[0.6deg] inline-block">
                  doubt of the day
                </span>
                <span className="font-extrabold text-[0.6rem] tracking-[0.1em] uppercase text-[#C53A2B]">
                  {(doubtOfDay?.subject || "Physics").toUpperCase()}
                  {doubtOfDay?.concept ? ` · ${doubtOfDay.concept.toUpperCase()}` : ""}
                </span>
              </div>

              <p className="mt-2 leading-[1.55] text-[1.02rem] text-[#1C1A16] font-medium">
                {doubtOfDay?.questionText ||
                  "Why do photoelectrons stop the moment intensity drops — but not when frequency drops below threshold?"}
              </p>
            </div>

            <Link
              href={doubtOfDay?.chapterId ? `/lessons/${doubtOfDay.chapterId}` : "/lessons"}
              className="inline-flex items-center gap-2 font-semibold text-[0.86rem] px-4 py-2 rounded-full border border-[rgba(28,26,22,0.16)] bg-white/70 text-[#1C1A16] hover:border-ink transition-colors mt-4 self-start"
            >
              <span>Learn this with Monk →</span>
            </Link>
          </div>

          <TodaysPlan />
        </div>
      </main>
    </div>
  );
}
