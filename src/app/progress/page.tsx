"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

/* ── API contract: GET /progress (monk-learning-api) ──────────────────── */

type ApiState = "strong" | "improving" | "needs_revision" | "not_started";

interface ApiConcept {
  concept_id: string;
  name: string;
  mastery: number;
  state: ApiState;
}

interface ApiChapter {
  chapter_id: string;
  name: string;
  class_level: number;
  subject: string;
  mastery: number;
  weight_marks: number | null;
  state: ApiState;
  headroom: number;
  concepts: ApiConcept[];
  curated: boolean;
}

interface ApiSubject {
  subject: string;
  score: number;
  chapters: ApiChapter[];
}

interface ApiRecommendation {
  role: "highest_lever" | "clear_flag" | "exam_craft" | "pace_fix";
  title: string;
  reason: string;
  subject?: string;
  chapter_id?: string;
  concept_id?: string;
}

interface ProgressResponse {
  exam: string;
  monk_score: {
    display: number;
    raw: number;
    ceiling: number;
    delta_week: number;
    flagged_concepts: number;
    climb: { date: string; score: number }[];
  };
  subjects: ApiSubject[];
  pace: { available: boolean; note: string };
  recommendations: ApiRecommendation[];
  ledger: {
    doubts_solved: number;
    questions_attempted: number;
    concepts_mastered: number;
    chapters_strong: number;
  };
}

/* ── presentation maps ─────────────────────────────────────────────────── */

const SUBJECT_LABEL: Record<string, string> = {
  physics: "Physics",
  chemistry: "Chemistry",
  mathematics: "Maths",
  biology: "Biology",
};

const SUBJECT_BAR: Record<string, string> = {
  physics: "bg-red-note",
  chemistry: "bg-green-badge",
  mathematics: "bg-orange",
  biology: "bg-green-badge",
};

const STATE_LABEL: Record<ApiState, string> = {
  strong: "Strong",
  improving: "Improving",
  needs_revision: "Needs revision",
  not_started: "Not started",
};

const STATUS_STYLE: Record<ApiState, string> = {
  strong: "bg-green-badge/15 text-green-badge",
  improving: "bg-orange/15 text-orange-dark",
  needs_revision: "bg-red-note/12 text-red-dark",
  not_started: "bg-ink/6 text-ink-muted",
};

const STATUS_DOT: Record<ApiState, string> = {
  strong: "bg-green-badge",
  improving: "bg-orange",
  needs_revision: "bg-red-note",
  not_started: "bg-ink-dim",
};

const REC_TAG: Record<ApiRecommendation["role"], { tag: string; hint: string; cta: string }> = {
  highest_lever: { tag: "HIGHEST LEVER", hint: "most headroom", cta: "Practice this →" },
  clear_flag: { tag: "CLEAR A FLAG", hint: "lifts the cap", cta: "Revise with Drona →" },
  pace_fix: { tag: "PACE FIX", hint: "mock-day marks", cta: "Start timed drill →" },
  exam_craft: { tag: "EXAM CRAFT", hint: "1.15× premium", cta: "Take a mock →" },
};

const CONCEPTS_PREVIEW = 15;

export default function ProgressPage() {
  const [data, setData] = useState<ProgressResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [subjectKey, setSubjectKey] = useState<string>("physics");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showAllConcepts, setShowAllConcepts] = useState<Record<string, boolean>>({});

  useEffect(() => {
    apiFetch<ProgressResponse>("/progress")
      .then(setData)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load progress"));
  }, []);

  if (error) {
    return (
      <div className="min-h-screen grid place-items-center bg-ruled-body">
        <div className="text-center">
          <p className="text-ink font-bold">Couldn&apos;t load your progress.</p>
          <p className="text-ink-muted text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col bg-ruled-body">
        <main className="flex-1 max-w-[1180px] w-full mx-auto px-6 md:px-11 py-8 space-y-5">
          <div className="h-10 w-96 max-w-full rounded-xl bg-ink/6 animate-pulse" />
          <div className="h-44 rounded-[20px] bg-white border border-border-subtle animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-36 rounded-[16px] bg-white border border-border-subtle animate-pulse" />
            ))}
          </div>
          <div className="h-80 rounded-[18px] bg-white border border-border-subtle animate-pulse" />
        </main>
      </div>
    );
  }

  const ms = data.monk_score;
  const started = ms.raw > 0 || data.ledger.questions_attempted > 0;
  const selected = data.subjects.find((s) => s.subject === subjectKey) ?? data.subjects[0];
  const eightWeeksAgo = ms.climb.length > 0 ? ms.climb[0] : null;

  return (
    <div className="min-h-screen flex flex-col bg-ruled-body">
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
                {ms.display}
              </span>
              <span className="text-lg text-ink-muted font-semibold">/1000</span>
              {ms.delta_week > 0 && (
                <span className="ml-1 text-xs font-bold text-green-badge bg-green-badge/12 px-2.5 py-1 rounded-full">
                  ▲ +{ms.delta_week} this week
                </span>
              )}
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
              {eightWeeksAgo && ms.display > eightWeeksAgo.score && (
                <span className="font-script font-bold text-red-dark text-[0.92rem] -rotate-[0.5deg] inline-block">
                  +{ms.display - eightWeeksAgo.score} since {new Date(eightWeeksAgo.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} — keep the slope.
                </span>
              )}
            </div>
            <div className="relative h-2 rounded-full bg-ink/8 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-orange rounded-full"
                style={{ width: `${Math.max(ms.display / 10, 0.5)}%` }}
              />
              <span
                className="absolute -top-1.5 w-4 h-4 rounded-full bg-orange border-2 border-white shadow-ref-pill"
                style={{ left: `calc(${Math.max(ms.display / 10, 0.5)}% - 8px)` }}
              />
            </div>
            <div className="flex items-center justify-between text-[0.72rem] text-ink-muted font-semibold mt-1.5">
              <span>0</span>
              {eightWeeksAgo ? <span>{eightWeeksAgo.score} · {new Date(eightWeeksAgo.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span> : <span />}
              <span>1000</span>
            </div>
            <div className="mt-3 flex items-start gap-2 bg-orange/10 border border-orange/25 rounded-xl px-3.5 py-2.5 text-xs text-ink-light leading-relaxed">
              <span className="flex-none mt-0.5">ⓘ</span>
              {ms.flagged_concepts > 0 ? (
                <span>
                  Your score never falls — but{" "}
                  <b className="text-ink font-bold">
                    {ms.flagged_concepts} concept{ms.flagged_concepts > 1 ? "s are" : " is"} flagged &quot;needs revision&quot;
                  </b>{" "}
                  and cap{ms.flagged_concepts > 1 ? "" : "s"} how high it can climb until you refresh them.
                </span>
              ) : started ? (
                <span>
                  Your score never falls, and nothing is capping it right now —{" "}
                  <b className="text-ink font-bold">every point of headroom is open</b>.
                </span>
              ) : (
                <span>
                  Everyone starts at 0 — it&apos;s not a judgment, it&apos;s a blank ledger.{" "}
                  <b className="text-ink font-bold">Answer your first practice questions</b> and the climb begins.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Subject cards — double as the selector for the chapter block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
          {data.subjects.map((s) => (
            <button
              key={s.subject}
              onClick={() => {
                setSubjectKey(s.subject);
                setExpanded(null);
              }}
              className={`bg-white rounded-[16px] p-5 shadow-ref-stat border text-left cursor-pointer transition-colors ${
                s.subject === selected.subject ? "border-ink" : "border-border-subtle hover:border-ink/40"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-ink">{SUBJECT_LABEL[s.subject] ?? s.subject}</span>
                <span className="text-[0.7rem] font-bold text-ink-muted">
                  {s.chapters.filter((c) => c.state !== "not_started").length}/{s.chapters.length} chapters started
                </span>
              </div>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="font-bold text-[1.9rem] leading-none tracking-[-0.02em] text-ink">
                  {s.score}
                </span>
                <span className="text-sm text-ink-muted font-semibold">/1000</span>
              </div>
              <div className="h-1.5 rounded-full bg-ink/8 overflow-hidden mt-3">
                <div
                  className={`h-full rounded-full ${SUBJECT_BAR[s.subject] ?? "bg-orange"}`}
                  style={{ width: `${Math.max(s.score / 10, 1)}%` }}
                />
              </div>
              <p className="text-[0.76rem] text-ink-muted font-semibold mt-2.5">
                {s.subject === selected.subject ? "Shown below · chapter by chapter" : "Tap to inspect"}
              </p>
            </button>
          ))}
        </div>

        {/* Chapter by chapter */}
        <div className="bg-white border border-border-subtle rounded-[18px] p-5 shadow-ref-card">
          <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
            <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted">
              Why {SUBJECT_LABEL[selected.subject] ?? selected.subject} is {selected.score} · chapter by chapter
            </span>
            <div className="flex items-center gap-3 text-[0.72rem] text-ink-light font-semibold flex-wrap">
              {(["strong", "improving", "needs_revision", "not_started"] as ApiState[]).map((s) => (
                <span key={s} className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[s]}`} />
                  {STATE_LABEL[s]}
                </span>
              ))}
            </div>
          </div>

          <div className="divide-y divide-dashed divide-border-subtle">
            {selected.chapters.map((c, i) => {
              const isOpen = expanded === c.chapter_id;
              const hasConcepts = c.concepts.length > 0;
              const showAll = showAllConcepts[c.chapter_id];
              const visibleConcepts = showAll ? c.concepts : c.concepts.slice(0, CONCEPTS_PREVIEW);
              return (
                <div key={c.chapter_id} className={isOpen ? "bg-orange/8 -mx-2 px-2 rounded-xl" : ""}>
                  <button
                    onClick={() => setExpanded(isOpen ? null : hasConcepts ? c.chapter_id : null)}
                    className="w-full flex items-center gap-3.5 py-3 text-left cursor-pointer"
                  >
                    <span className="font-script font-bold text-[0.86rem] text-ink-dim flex-none w-[22px]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-bold text-[0.95rem] text-ink">
                      {c.name}
                      <span className="ml-2 font-semibold text-[0.7rem] text-ink-dim">Class {c.class_level}</span>
                    </span>
                    <span className="flex-none text-[0.76rem] text-ink-muted font-semibold">
                      {c.weight_marks != null ? `~${Math.round(c.weight_marks)} marks` : ""}
                    </span>
                    <span
                      className={`flex-none font-bold text-[0.68rem] px-2.5 py-1 rounded-full ${STATUS_STYLE[c.state]}`}
                    >
                      {STATE_LABEL[c.state]}
                    </span>
                    {hasConcepts && (
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

                  {isOpen && hasConcepts && (
                    <div className="pb-4 pl-[34px] space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                        {visibleConcepts.map((ct) => (
                          <div
                            key={ct.concept_id}
                            className="flex items-center justify-between gap-2 text-[0.84rem]"
                          >
                            <span className="flex items-center gap-2 text-ink-light font-medium">
                              <span className={`w-1.5 h-1.5 rounded-full flex-none ${STATUS_DOT[ct.state]}`} />
                              {ct.name}
                            </span>
                            <span
                              className={`flex-none font-bold text-[0.66rem] px-2 py-0.5 rounded-full ${STATUS_STYLE[ct.state]}`}
                            >
                              {ct.state === "not_started" ? STATE_LABEL[ct.state] : `${Math.round(ct.mastery)}`}
                            </span>
                          </div>
                        ))}
                      </div>
                      {c.concepts.length > CONCEPTS_PREVIEW && !showAll && (
                        <button
                          onClick={() => setShowAllConcepts((m) => ({ ...m, [c.chapter_id]: true }))}
                          className="font-bold text-[0.76rem] text-ink-muted border border-border-subtle rounded-full px-3 py-1.5"
                        >
                          Show all {c.concepts.length} concepts
                        </button>
                      )}
                      <div className="flex items-center gap-3 flex-wrap pt-2">
                        <Link
                          href="/practice"
                          className="font-bold text-[0.8rem] px-4 py-2 rounded-full bg-ink text-cream-light"
                        >
                          Practice this →
                        </Link>
                        <Link
                          href="/learn"
                          className="font-bold text-[0.8rem] px-4 py-2 rounded-full border border-border-subtle text-ink"
                        >
                          Revise with Drona
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-[0.72rem] text-ink-muted font-medium mt-3">
            Every state describes you — the syllabus itself is complete everywhere.
          </p>
        </div>

        {/* Pace */}
        <div className="bg-white border border-border-subtle rounded-[18px] p-5 shadow-ref-card">
          <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
            <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted">
              Pace · average time per question
            </span>
            <span className="font-bold text-[0.66rem] text-ink-muted border border-border-subtle rounded-full px-2.5 py-1">
              Display only — doesn&apos;t move your score yet
            </span>
          </div>
          <p className="text-[0.84rem] text-ink-light leading-relaxed">
            {data.pace.available
              ? data.pace.note
              : "Measured silently from Practice — you never run a timer. Answer more questions and your pace against the exam's own per-question budget appears here."}
          </p>
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
            {data.recommendations.map((rec, i) => {
              const meta = REC_TAG[rec.role];
              const href =
                rec.role === "clear_flag" ? "/learn" : rec.role === "exam_craft" ? "/test" : "/practice";
              return (
                <div
                  key={`${rec.role}-${i}`}
                  className="bg-white border border-border-subtle rounded-[16px] p-5 shadow-ref-stat flex flex-col"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-extrabold text-[0.6rem] tracking-[0.12em] uppercase text-ink-muted">
                      {meta.tag}
                    </span>
                    <span className="font-script font-bold text-red-dark text-[0.82rem] -rotate-[0.5deg] inline-block">
                      {meta.hint}
                    </span>
                  </div>
                  <b className="font-bold text-[1.02rem] text-ink leading-snug">{rec.title}</b>
                  <p className="text-[0.8rem] text-ink-light leading-relaxed mt-1.5 flex-1">{rec.reason}</p>
                  <Link
                    href={href}
                    className={`mt-4 font-bold text-[0.82rem] px-4 py-2.5 rounded-full self-start ${
                      i === 0 ? "bg-ink text-cream-light" : "border border-border-subtle text-ink"
                    }`}
                  >
                    {meta.cta}
                  </Link>
                </div>
              );
            })}
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
                Drona&apos;s word
              </span>
              <p className="text-[0.94rem] text-ink leading-relaxed mt-1.5 max-w-[64ch]">
                {started ? (
                  <>
                    Your climb has begun — every point on this page came from a question you proved on your own.
                    Keep the practice honest and steady; <b className="font-bold">the number will follow.</b>
                  </>
                ) : (
                  <>
                    Nothing on this page moves by watching or reading — only by proving concepts on questions
                    you&apos;ve never seen. Start with one honest practice set today.{" "}
                    <b className="font-bold">The number will follow.</b>
                  </>
                )}
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
              [data.ledger.doubts_solved, "doubts solved"],
              [data.ledger.questions_attempted, "questions attempted"],
              [data.ledger.concepts_mastered, "concepts mastered"],
              [data.ledger.chapters_strong, "chapters strong"],
            ].map(([n, label]) => (
              <span key={String(label)} className="text-[0.86rem] text-ink font-semibold">
                <b className="font-bold">{Number(n).toLocaleString("en-IN")}</b> {label}
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
