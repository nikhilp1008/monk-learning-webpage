"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
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
}: DashboardClientProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const nameStr = profile.display_name
    ? profile.display_name.split(" ")[0]
    : "balayya";

  return (
    <div className="min-h-screen flex flex-col bg-ruled-body">
      <Header />

      <main className="flex-1 max-w-[1180px] w-full mx-auto px-6 md:px-11 py-8 space-y-5 animate-ml-rise">
        {/* 1. Greeting */}
        <div className="mb-6">
          <h1 className="text-[2.3rem] leading-[1.05] tracking-[-0.025em] font-medium text-ink">
            {getGreeting()}, {nameStr}.
          </h1>
          <p className="text-[#57534B] text-[1rem] mt-1.5">
            You cleared <b className="text-[#157A45] font-bold">8 doubts yesterday</b>. Tonight, one chapter stands between you and 70%.
          </p>
        </div>

        {/* 2. Top Action Cards Row (Exact 1.3fr 1fr 1fr ratio) */}
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr] gap-[18px]">
          {/* Action Card 1: Learn with Monk */}
          <Link
            href="/lessons"
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
              <span className="font-extrabold text-[0.56rem] tracking-[0.1em] uppercase rounded-[6px] px-2.5 py-1 bg-[rgba(245,203,96,0.14)] text-[#F5CB60] border border-[rgba(245,203,96,0.3)]">
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

          {/* Action Card 2: Snap a doubt (With Viewfinder Corners & Action Text) */}
          <Link
            href="/doubts"
            className="flex flex-col p-5 rounded-[22px] bg-white border border-[rgba(28,26,22,0.08)] shadow-ref-card hover:-translate-y-1 transition-transform group"
          >
            <div className="relative flex-1 min-h-[128px] rounded-[14px] bg-[#FBF8EF] border border-[rgba(28,26,22,0.07)] flex flex-col items-center justify-center gap-2 p-4">
              {/* Signature Viewfinder Corners */}
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
            <div className="mt-3.5">
              <h3 className="font-bold text-[1.14rem] tracking-[-0.02em] text-[#1C1A16] mb-0.5">Snap a doubt</h3>
              <span className="inline-flex items-center gap-2 font-semibold text-[0.88rem] text-[#57534B]">
                Snap a question
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 stroke-[#DD4433]" fill="none" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 8h11M9 3.5 13.5 8 9 12.5" />
                </svg>
              </span>
            </div>
          </Link>

          {/* Action Card 3: Practice unlimited (With 6 / ∞ styling & Action Text) */}
          <Link
            href="/practice"
            className="flex flex-col p-5 rounded-[22px] bg-white border border-[rgba(28,26,22,0.08)] shadow-ref-card hover:-translate-y-1 transition-transform group"
          >
            <div className="flex-1 flex flex-col items-center justify-center min-h-[128px] rounded-[14px] bg-[#FBF8EF] border border-[rgba(28,26,22,0.07)] p-4">
              <span className="flex items-baseline gap-1 leading-none">
                <b className="font-bold text-[2.5rem] tracking-[-0.03em] text-[#1C1A16]">6</b>
                <span className="font-semibold text-[1.5rem] text-[#9C988C]"> / </span>
                <span className="font-bold text-[2rem] text-[#EEA31F] relative top-[2px]">∞</span>
              </span>
              <span className="font-bold text-[0.62rem] tracking-[0.12em] uppercase text-[#9C988C] mt-2">
                solved today · never runs out
              </span>
            </div>
            <div className="mt-3.5">
              <h3 className="font-bold text-[1.14rem] tracking-[-0.02em] text-[#1C1A16] mb-0.5">Practice unlimited</h3>
              <span className="inline-flex items-center gap-2 font-semibold text-[0.88rem] text-[#57534B]">
                Start practicing
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 stroke-[#1C9B57]" fill="none" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 8h11M9 3.5 13.5 8 9 12.5" />
                </svg>
              </span>
            </div>
          </Link>
        </div>

        {/* 3. Stat Cards Row (Exact 3 Cards: Monk Score, doubts resolved, questions practiced) */}
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr] gap-[18px]">
          {/* Stat Card 1: Monk Score */}
          <div className="flex items-center justify-between gap-3 rounded-[18px] p-[16px_20px] bg-gradient-to-br from-white to-[#FCF4E0] border border-[rgba(238,163,31,0.3)] shadow-[0_10px_24px_-18px_rgba(238,163,31,0.55)]">
            <div className="flex items-center gap-3">
              <span className="flex items-baseline gap-1">
                <b className="font-bold text-[2rem] leading-none tracking-[-0.03em] text-[#1C1A16]">703</b>
                <span className="font-semibold text-[0.9rem] text-[#9C988C]">/ 1000</span>
              </span>
              <div>
                <b className="block font-bold text-[0.86rem] text-[#1C1A16]">Monk Score</b>
                <span className="font-script font-bold text-[0.78rem] text-[#157A45]">▲ +14 this week</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-[22px] h-[22px] rounded-full border border-ink/30 bg-white grid place-items-center text-xs font-bold text-[#57534B] cursor-help">
                i
              </span>
              <button className="font-bold text-[0.76rem] px-3.5 py-1.5 rounded-full border border-[rgba(238,163,31,0.5)] bg-white text-[#1C1A16] hover:border-ink transition-colors">
                See why →
              </button>
            </div>
          </div>

          {/* Stat Card 2: Doubts Resolved */}
          <div className="flex items-center gap-3.5 bg-white border border-[rgba(28,26,22,0.08)] rounded-[18px] p-[16px_20px] shadow-ref-stat">
            <span className="font-bold text-[2rem] leading-none tracking-[-0.03em] text-[#157A45]">
              47
            </span>
            <div>
              <b className="block font-bold text-[0.86rem] text-[#1C1A16]">doubts resolved</b>
              <span className="font-bold text-[0.72rem] text-[#157A45]">▲ 9 this week</span>
            </div>
          </div>

          {/* Stat Card 3: Questions Practiced */}
          <div className="flex items-center gap-3.5 bg-white border border-[rgba(28,26,22,0.08)] rounded-[18px] p-[16px_20px] shadow-ref-stat">
            <span className="font-bold text-[2rem] leading-none tracking-[-0.03em] text-[#1C1A16]">
              320
            </span>
            <div>
              <b className="block font-bold text-[0.86rem] text-[#1C1A16]">questions practiced</b>
              <span className="font-semibold text-[0.72rem] text-[#9C988C]">68% first-try</span>
            </div>
          </div>
        </div>

        {/* 4. Middle Section Grid: Doubt of the Day (Ruled Paper) + Today's Plan */}
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-[18px] items-stretch">
          {/* Doubt of the Day Card (Ruled Notebook Paper) */}
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
                  PHYSICS · MODERN
                </span>
              </div>

              <p className="mt-2 leading-[1.55] text-[1.02rem] text-[#1C1A16] font-medium">
                Why do photoelectrons stop the moment intensity drops — but not when frequency drops below threshold?
              </p>
            </div>

            <Link
              href="/lessons"
              className="inline-flex items-center gap-2 font-semibold text-[0.86rem] px-4 py-2 rounded-full border border-[rgba(28,26,22,0.16)] bg-white/70 text-[#1C1A16] hover:border-ink transition-colors mt-4 self-start"
            >
              <span>Learn this with Monk →</span>
            </Link>
          </div>

          {/* Today's Plan Card (Exact Reference Items & Badges) */}
          <div className="bg-white border border-[rgba(28,26,22,0.08)] rounded-[18px] p-[18px_22px] shadow-ref-stat flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2.5 mb-2">
                <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-[#9C988C]">
                  Today&apos;s plan
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[0.7rem] text-[#157A45] bg-[rgba(28,155,87,0.1)] border border-[rgba(28,155,87,0.3)] rounded-full px-2.5 py-0.5">
                    2 of 3 done
                  </span>
                  <button className="font-bold text-[0.76rem] px-3 py-1 rounded-full border border-[rgba(28,26,22,0.16)] bg-white text-[#1C1A16] hover:border-ink transition-colors">
                    + Add plan
                  </button>
                </div>
              </div>

              <div className="space-y-1 py-1">
                <div className="flex items-center gap-2.5 py-2.5 border-b border-dashed border-[rgba(28,26,22,0.1)] text-sm text-[#1C1A16]">
                  <span className="w-4 h-4 rounded bg-[#157A45] grid place-items-center flex-none">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-white fill-none" strokeWidth="3" strokeLinecap="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="line-through text-[#9C988C]">Revise Kinematics notes</span>
                </div>
                <div className="flex items-center gap-2.5 py-2.5 border-b border-dashed border-[rgba(28,26,22,0.1)] text-sm text-[#1C1A16]">
                  <span className="w-4 h-4 rounded bg-[#157A45] grid place-items-center flex-none">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-white fill-none" strokeWidth="3" strokeLinecap="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="line-through text-[#9C988C]">10 PYQs on projectile motion</span>
                </div>
                <div className="flex items-center gap-2.5 py-2.5 text-sm text-[#1C1A16] font-medium">
                  <span className="w-4 h-4 rounded border border-ink/30 flex-none" />
                  <span>Solve Oscillations restoring force derivations</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Recent Notes Section */}
        <div className="pt-3">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-2.5 font-extrabold text-[0.68rem] tracking-[0.14em] uppercase text-ink">
              <span className="w-[22px] h-[2px] bg-[#EEA31F] rounded-full" />
              Recent notes
            </span>
            <Link href="/notes" className="font-bold text-[0.84rem] text-[#57534B] hover:text-ink">
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-[rgba(28,26,22,0.08)] rounded-[16px] p-[18px_20px] shadow-ref-stat hover:-translate-y-1 transition-transform cursor-pointer">
              <span className="inline-flex items-center gap-2 font-extrabold text-[0.6rem] tracking-[0.12em] uppercase text-[#DD4433]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DD4433]" />
                PHYSICS
              </span>
              <h4 className="font-bold text-[1rem] text-[#1C1A16] mt-2 mb-1">Rotational Dynamics</h4>
              <p className="text-[#57534B] text-[0.86rem] leading-snug">Torque, moment of inertia &amp; rolling without slipping derivations.</p>
            </div>

            <div className="bg-white border border-[rgba(28,26,22,0.08)] rounded-[16px] p-[18px_20px] shadow-ref-stat hover:-translate-y-1 transition-transform cursor-pointer">
              <span className="inline-flex items-center gap-2 font-extrabold text-[0.6rem] tracking-[0.12em] uppercase text-[#1C9B57]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1C9B57]" />
                CHEMISTRY
              </span>
              <h4 className="font-bold text-[1rem] text-[#1C1A16] mt-2 mb-1">Thermodynamics</h4>
              <p className="text-[#57534B] text-[0.86rem] leading-snug">Enthalpy, Hess&apos;s law &amp; Gibbs free energy criteria.</p>
            </div>

            <div className="bg-white border border-[rgba(28,26,22,0.08)] rounded-[16px] p-[18px_20px] shadow-ref-stat hover:-translate-y-1 transition-transform cursor-pointer">
              <span className="inline-flex items-center gap-2 font-extrabold text-[0.6rem] tracking-[0.12em] uppercase text-[#EEA31F]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EEA31F]" />
                MATHEMATICS
              </span>
              <h4 className="font-bold text-[1rem] text-[#1C1A16] mt-2 mb-1">Vectors &amp; 3D Geometry</h4>
              <p className="text-[#57534B] text-[0.86rem] leading-snug">Dot product, cross product &amp; shortest distance between skew lines.</p>
            </div>
          </div>
        </div>

        {/* 6. Recent Sessions Section */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-2.5 font-extrabold text-[0.68rem] tracking-[0.14em] uppercase text-ink">
              <span className="w-[22px] h-[2px] bg-[#EEA31F] rounded-full" />
              Recent sessions
            </span>
            <Link href="/notes" className="font-bold text-[0.84rem] text-[#57534B] hover:text-ink">
              View all →
            </Link>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center gap-3.5 bg-white border border-[rgba(28,26,22,0.08)] rounded-[14px] p-[12px_18px] shadow-ref-stat hover:-translate-y-0.5 transition-transform cursor-pointer">
              <span className="w-[38px] h-[38px] flex-none rounded-[11px] bg-[#F4EFE3] border border-[rgba(28,26,22,0.08)] grid place-items-center">
                <svg viewBox="0 0 120 120" className="w-[21px] h-[21px]" fill="none">
                  <circle cx="60" cy="60" r="36" stroke="#1C1A16" strokeWidth="11" strokeLinecap="round" strokeDasharray="52 23.4" transform="rotate(-90 60 60)" />
                  <circle cx="60" cy="60" r="6" className="fill-orange" />
                </svg>
              </span>
              <div className="flex-1 min-w-0">
                <b className="block font-bold text-[0.95rem] text-[#1C1A16] truncate">Units &amp; Dimensions — Dimensional Analysis &amp; Applications</b>
                <span className="text-[0.76rem] text-[#9C988C] font-semibold">Class 11 Physics · 24 mins watched</span>
              </div>
              <span className="inline-flex items-center gap-1.5 font-bold text-[0.7rem] text-[#157A45] bg-[rgba(28,155,87,0.1)] border border-[rgba(28,155,87,0.3)] rounded-full px-2.5 py-1 flex-none">
                ✓ Saved to notes
              </span>
            </div>
          </div>
          <p className="text-[0.76rem] text-[#9C988C] mt-2">
            Every class is backed up here for 7 days — forgot to save a note? Recover it before it expires.
          </p>
        </div>
      </main>
    </div>
  );
}
