"use client";

import { useState } from "react";
import { Header } from "@/components/Header";

interface SubjectCard {
  key: string;
  name: string;
  score: number;
  delta: string;
  barColor: string;
  flag: string;
}

const SUBJECTS: SubjectCard[] = [
  {
    key: "physics",
    name: "Physics",
    score: 764,
    delta: "+18 this week",
    barColor: "bg-red-note",
    flag: "Rotational Motion",
  },
  {
    key: "chemistry",
    name: "Chemistry",
    score: 618,
    delta: "+6 this week",
    barColor: "bg-green-badge",
    flag: "Coordination Compounds",
  },
  {
    key: "maths",
    name: "Maths",
    score: 727,
    delta: "+12 this week",
    barColor: "bg-orange",
    flag: "Integration",
  },
];

type ChapterStatus = "Strong" | "Improving" | "Needs revision" | "Not started";

interface Chapter {
  n: string;
  name: string;
  marks: string;
  status: ChapterStatus;
  subtopics?: { name: string; status: ChapterStatus }[];
}

const CHAPTERS: Chapter[] = [
  { n: "01", name: "Kinematics", marks: "~8 marks", status: "Strong" },
  { n: "02", name: "Newton's Laws", marks: "~8 marks", status: "Strong" },
  { n: "03", name: "Work, Power & Energy", marks: "~4 marks", status: "Improving" },
  {
    n: "04",
    name: "Rotational Motion",
    marks: "~12 marks",
    status: "Improving",
    subtopics: [
      { name: "Moment of inertia", status: "Improving" },
      { name: "Torque & angular acceleration", status: "Improving" },
      { name: "Angular momentum conservation", status: "Needs revision" },
      { name: "Rolling without slipping", status: "Not started" },
      { name: "Rotational kinetic energy", status: "Strong" },
    ],
  },
  { n: "05", name: "Thermodynamics", marks: "~8 marks", status: "Needs revision" },
  { n: "06", name: "Current Electricity", marks: "~8 marks", status: "Improving" },
  { n: "07", name: "Modern Physics", marks: "~8 marks", status: "Strong" },
  { n: "08", name: "Waves & SHM", marks: "~4 marks", status: "Not started" },
];

const STATUS_STYLE: Record<ChapterStatus, string> = {
  Strong: "bg-green-badge/15 text-green-badge",
  Improving: "bg-orange/15 text-orange-dark",
  "Needs revision": "bg-red-note/12 text-red-dark",
  "Not started": "bg-ink/6 text-ink-muted",
};

const STATUS_DOT: Record<ChapterStatus, string> = {
  Strong: "bg-green-badge",
  Improving: "bg-orange",
  "Needs revision": "bg-red-note",
  "Not started": "bg-ink-dim",
};

const PACE = [
  { name: "Physics", time: "3m 06s", target: "target 2m 54s", delta: "▼ 22s in 4 weeks", bar: "bg-orange", pct: 82 },
  { name: "Chemistry", time: "1m 48s", target: "target 2m 00s", delta: "▼ 6s in 4 weeks", bar: "bg-green-badge", pct: 60 },
  { name: "Maths", time: "3m 42s", target: "target 3m 30s", delta: "▼ 15s in 4 weeks", bar: "bg-orange", pct: 88 },
];

const LEVERS = [
  {
    tag: "HIGHEST LEVER",
    hint: "worth ≈ +9",
    title: "Practice Rotational Motion",
    body: "~12 marks in the paper and your widest Physics gap — no other hour moves the score more.",
    cta: "Practice this →",
    primary: true,
  },
  {
    tag: "CLEAR A FLAG",
    hint: "lifts the cap",
    title: "Refresh Thermochemistry with Drona",
    body: "A needs-revision flag is holding your ceiling down. One revision session and the climb reopens.",
    cta: "Revise with Drona →",
    primary: false,
  },
  {
    tag: "PACE FIX",
    hint: "mock-day marks",
    title: "Timed drill · Physics mechanics",
    body: "Your answers are right but ~40s over budget. Speed is the last mile — drill it on the clock.",
    cta: "Start timed drill →",
    primary: false,
  },
];

export default function ProgressPage() {
  const [expanded, setExpanded] = useState<string | null>("04");

  return (
    <div className="min-h-screen flex flex-col bg-ruled-body">
      <Header />

      <main className="flex-1 max-w-[1180px] w-full mx-auto px-6 md:px-11 py-8 space-y-5 animate-ml-rise">
        <div>
          <h1 className="text-[2.3rem] leading-[1.05] tracking-[-0.025em] font-medium text-ink">
            How good have you become?
          </h1>
          <p className="text-ink-light text-base mt-1.5 max-w-[46rem]">
            One number answers it — and everything below exists to explain it.
          </p>
        </div>

        {/* Monk Score hero */}
        <div className="bg-white border border-border-subtle rounded-[20px] p-6 shadow-ref-card grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-8 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted">
              Monk Score
              <span className="w-3.5 h-3.5 rounded-full border border-ink-dim grid place-items-center text-[0.55rem]">
                i
              </span>
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-bold text-[3.4rem] leading-none tracking-[-0.03em] text-ink">
                703
              </span>
              <span className="text-lg text-ink-muted font-semibold">/1000</span>
              <span className="ml-1 text-xs font-bold text-green-badge bg-green-badge/12 px-2.5 py-1 rounded-full">
                ▲ +14 this week
              </span>
            </div>
            <p className="text-ink-light text-sm mt-3 leading-relaxed max-w-[30ch]">
              It moves only when you prove concepts — on questions you have never seen before.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted">
                The climb · 0 → 1000
              </span>
              <span className="font-script font-bold text-red-dark text-[0.92rem] -rotate-[0.5deg] inline-block">
                +142 in eight weeks — keep the slope.
              </span>
            </div>
            <div className="relative h-2 rounded-full bg-ink/8 overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-orange rounded-full" style={{ width: "70.3%" }} />
              <span
                className="absolute -top-1.5 w-4 h-4 rounded-full bg-orange border-2 border-white shadow-ref-pill"
                style={{ left: "calc(70.3% - 8px)" }}
              />
            </div>
            <div className="flex items-center justify-between text-[0.72rem] text-ink-muted font-semibold mt-1.5">
              <span>0</span>
              <span>8 weeks ago · 561</span>
              <span>1000</span>
            </div>
            <div className="mt-3 flex items-start gap-2 bg-orange/10 border border-orange/25 rounded-xl px-3.5 py-2.5 text-xs text-ink-light leading-relaxed">
              <span className="flex-none mt-0.5">ⓘ</span>
              <span>
                Your score never falls — but <b className="text-ink font-bold">3 concepts are flagged &quot;needs revision&quot;</b> and
                cap how high it can climb until you refresh them.
              </span>
            </div>
          </div>
        </div>

        {/* Subject cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
          {SUBJECTS.map((s) => (
            <div
              key={s.key}
              className={`bg-white rounded-[16px] p-5 shadow-ref-stat border ${
                s.key === "physics" ? "border-ink" : "border-border-subtle"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-ink">{s.name}</span>
                <span className="text-[0.7rem] font-bold text-green-badge">{s.delta}</span>
              </div>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="font-bold text-[1.9rem] leading-none tracking-[-0.02em] text-ink">
                  {s.score}
                </span>
                <span className="text-sm text-ink-muted font-semibold">/1000</span>
              </div>
              <div className="h-1.5 rounded-full bg-ink/8 overflow-hidden mt-3">
                <div className={`h-full rounded-full ${s.barColor}`} style={{ width: `${s.score / 10}%` }} />
              </div>
              <p className="text-[0.76rem] text-ink-muted font-semibold mt-2.5">
                Drona flags: <span className="text-ink font-bold">{s.flag}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Chapter by chapter */}
        <div className="bg-white border border-border-subtle rounded-[18px] p-5 shadow-ref-card">
          <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
            <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted">
              Why Physics is 764 · chapter by chapter
            </span>
            <div className="flex items-center gap-3 text-[0.72rem] text-ink-light font-semibold flex-wrap">
              {(["Strong", "Improving", "Needs revision", "Not started"] as ChapterStatus[]).map((s) => (
                <span key={s} className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[s]}`} />
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="divide-y divide-dashed divide-border-subtle">
            {CHAPTERS.map((c) => {
              const isOpen = expanded === c.n;
              return (
                <div key={c.n} className={isOpen ? "bg-orange/8 -mx-2 px-2 rounded-xl" : ""}>
                  <button
                    onClick={() => setExpanded(isOpen ? null : c.subtopics ? c.n : null)}
                    className="w-full flex items-center gap-3.5 py-3 text-left cursor-pointer"
                  >
                    <span className="font-script font-bold text-[0.86rem] text-ink-dim flex-none w-[22px]">
                      {c.n}
                    </span>
                    <span className="flex-1 font-bold text-[0.95rem] text-ink">{c.name}</span>
                    <span className="flex-none text-[0.76rem] text-ink-muted font-semibold">{c.marks}</span>
                    <span
                      className={`flex-none font-bold text-[0.68rem] px-2.5 py-1 rounded-full ${STATUS_STYLE[c.status]}`}
                    >
                      {c.status}
                    </span>
                    {c.subtopics && (
                      <svg
                        viewBox="0 0 16 16"
                        width={12}
                        height={12}
                        fill="none"
                        className={`flex-none transition-transform ${isOpen ? "rotate-90" : ""}`}
                      >
                        <path
                          d="M2 8h11M9 3.5 13.5 8 9 12.5"
                          stroke="#C2BCAF"
                          strokeWidth="1.9"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>

                  {isOpen && c.subtopics && (
                    <div className="pb-4 pl-[34px] space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                        {c.subtopics.map((st) => (
                          <div key={st.name} className="flex items-center justify-between gap-2 text-[0.84rem]">
                            <span className="flex items-center gap-2 text-ink-light font-medium">
                              <span className={`w-1.5 h-1.5 rounded-full flex-none ${STATUS_DOT[st.status]}`} />
                              {st.name}
                            </span>
                            <span
                              className={`flex-none font-bold text-[0.66rem] px-2 py-0.5 rounded-full ${STATUS_STYLE[st.status]}`}
                            >
                              {st.status}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 flex-wrap pt-2">
                        <button className="font-bold text-[0.8rem] px-4 py-2 rounded-full bg-ink text-cream-light">
                          Practice this →
                        </button>
                        <button className="font-bold text-[0.8rem] px-4 py-2 rounded-full border border-border-subtle text-ink">
                          Revise with Drona
                        </button>
                        <span className="font-script font-bold text-red-dark text-[0.86rem] -rotate-[0.5deg] inline-block">
                          Drona&apos;s pick this week
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-[0.72rem] text-ink-muted font-medium mt-3">
            Opens on what Drona is flagging right now. Every state describes you — the syllabus itself is complete
            everywhere.
          </p>
        </div>

        {/* Pace + speed×accuracy */}
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-[18px] items-start">
          <div className="bg-white border border-border-subtle rounded-[18px] p-5 shadow-ref-card">
            <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
              <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted">
                Pace · average time per question
              </span>
              <span className="font-bold text-[0.66rem] text-ink-muted border border-border-subtle rounded-full px-2.5 py-1">
                Display only — doesn&apos;t move your score yet
              </span>
            </div>

            <div className="space-y-4">
              {PACE.map((p) => (
                <div key={p.name} className="flex items-center gap-4">
                  <span className="w-[74px] flex-none font-bold text-[0.86rem] text-ink">{p.name}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-ink/8 overflow-hidden">
                    <div className={`h-full rounded-full ${p.bar}`} style={{ width: `${p.pct}%` }} />
                  </div>
                  <span className="flex-none text-right w-[64px] font-bold text-[0.86rem] text-ink">{p.time}</span>
                  <span className="flex-none w-[100px] text-[0.68rem] text-ink-muted font-semibold">{p.target}</span>
                  <span className="flex-none text-[0.7rem] font-bold text-green-badge w-[110px] text-right">
                    {p.delta}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[0.72rem] text-ink-muted font-medium mt-4 pt-3 border-t border-border-subtle">
              Measured silently from Practice — you never run a timer. Targets follow the exam&apos;s own
              per-question budget, adjusted for difficulty; the black tick is yours. Less time is the win here.
            </p>
          </div>

          <div className="space-y-3">
            <span className="block font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted mb-1">
              Speed × accuracy — what it catches
            </span>
            <div className="bg-orange/10 border border-orange/25 rounded-[16px] p-4">
              <b className="block font-bold text-ink text-[0.92rem] mb-1">Correct but slow</b>
              <p className="text-[0.8rem] text-ink-light leading-relaxed">
                Rotational Motion — right answers, ~40s over budget. Mastery looks fine; mock scores won&apos;t.
              </p>
              <span className="font-script font-bold text-orange-dark text-[0.84rem] mt-1.5 inline-block -rotate-[0.5deg]">
                → timed drills
              </span>
            </div>
            <div className="bg-red-note/8 border border-red-note/25 rounded-[16px] p-4">
              <b className="block font-bold text-ink text-[0.92rem] mb-1">Fast but careless</b>
              <p className="text-[0.8rem] text-ink-light leading-relaxed">
                Organic GOC — well under target, but accuracy slipped to 71% this week. That&apos;s rushing.
              </p>
              <span className="font-script font-bold text-red-dark text-[0.84rem] mt-1.5 inline-block -rotate-[0.5deg]">
                → slow down; deliberate sets
              </span>
            </div>
          </div>
        </div>

        {/* What moves it next */}
        <div>
          <div className="flex items-end justify-between gap-3 flex-wrap mb-3">
            <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted">
              What moves it next
            </span>
            <span className="text-[0.76rem] text-ink-muted font-medium">
              Syllabus weightage × your gaps — the highest-leverage hours available right now.
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
            {LEVERS.map((lv) => (
              <div key={lv.title} className="bg-white border border-border-subtle rounded-[16px] p-5 shadow-ref-stat flex flex-col">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-extrabold text-[0.6rem] tracking-[0.12em] uppercase text-ink-muted">
                    {lv.tag}
                  </span>
                  <span className="font-script font-bold text-red-dark text-[0.82rem] -rotate-[0.5deg] inline-block">
                    {lv.hint}
                  </span>
                </div>
                <b className="font-bold text-[1.02rem] text-ink leading-snug">{lv.title}</b>
                <p className="text-[0.8rem] text-ink-light leading-relaxed mt-1.5 flex-1">{lv.body}</p>
                <button
                  className={`mt-4 font-bold text-[0.82rem] px-4 py-2.5 rounded-full self-start ${
                    lv.primary ? "bg-ink text-cream-light" : "border border-border-subtle text-ink"
                  }`}
                >
                  {lv.cta}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Drona's word */}
        <div className="bg-orange/10 border border-orange/25 rounded-[18px] p-5">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-full grid place-items-center bg-white border border-orange/40 flex-none">
              <svg viewBox="0 0 120 120" className="w-[18px] h-[18px]" fill="none">
                <circle
                  cx="60" cy="60" r="36" stroke="#1C1A16" strokeWidth="11" strokeLinecap="round"
                  strokeDasharray="52 23.4" transform="rotate(-90 60 60)"
                />
                <circle
                  cx="60" cy="60" r="19" stroke="#1C1A16" strokeWidth="9" strokeLinecap="round"
                  strokeDasharray="21.8 18" transform="rotate(-30 60 60)"
                />
                <circle cx="60" cy="60" r="6" className="fill-orange" />
              </svg>
            </span>
            <div>
              <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-orange-dark">
                Drona&apos;s word · this week
              </span>
              <p className="text-[0.94rem] text-ink leading-relaxed mt-1.5 max-w-[64ch]">
                The score moved because Physics moved — those Rotational Motion sets are starting to pay. What&apos;s
                holding you back isn&apos;t new learning; it&apos;s the three concepts waiting for revision, quietly
                capping your climb. This week is simple: clear the flags, keep the mechanics sets on a clock, and give
                Coordination Compounds one honest hour. <b className="font-bold">The number will follow.</b>
              </p>
              <span className="font-script font-bold text-red-dark text-[0.88rem] mt-2 inline-block -rotate-[0.5deg]">
                — Drona
              </span>
            </div>
          </div>
        </div>

        {/* Journey stats */}
        <div className="flex items-center justify-between gap-4 flex-wrap py-2">
          <div className="flex items-center gap-6 flex-wrap">
            <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted">
              The journey so far
            </span>
            {[
              ["214", "doubts solved"],
              ["1,862", "questions attempted"],
              ["143", "concepts mastered"],
              ["9", "chapters strong"],
            ].map(([n, label]) => (
              <span key={label} className="text-[0.86rem] text-ink font-semibold">
                <b className="font-bold">{n}</b> {label}
              </span>
            ))}
          </div>
          <span className="text-[0.78rem] text-ink-muted italic">
            these count the journey — the score above measures the skill.
          </span>
        </div>
      </main>
    </div>
  );
}
