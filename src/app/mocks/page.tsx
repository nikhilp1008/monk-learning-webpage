"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  createMockPaper,
  earnedTowardNext,
  examFromTarget,
  formatDay,
  getMockStatus,
  listMockRuns,
  mockLockFrom,
  subjectLabel,
  type ExamKey,
  type MockLock,
  type MockRunRow,
  type MockStatus,
} from "@/lib/mock";

// The paper patterns, for display before a paper exists. The server's
// blueprint (routers/mock.py PAPERS) is the authority -- these only say what
// Start will build.
const PATTERNS = {
  jee: {
    label: "JEE Main",
    rows: [
      ["Physics", "20 MCQ + 5 numerical"],
      ["Chemistry", "20 MCQ + 5 numerical"],
      ["Maths", "20 MCQ + 5 numerical"],
    ],
    total: "75 Q · 300 marks · 3 hours",
  },
  neet: {
    label: "NEET UG",
    rows: [
      ["Physics", "45 questions"],
      ["Chemistry", "45 questions"],
      ["Biology", "90 questions"],
    ],
    total: "180 Q · 720 marks · 3 hours",
  },
} as const;

function ScoreTrend({ runs }: { runs: MockRunRow[] }) {
  // Oldest first, as a percentage of the paper's own maximum so a JEE and a
  // NEET paper can sit on one line.
  const points = runs
    .filter((r) => r.status === "submitted" && r.score && r.score.max_marks > 0)
    .sort((a, b) => (a.submitted_at ?? a.created_at).localeCompare(b.submitted_at ?? b.created_at))
    .map((r) => ({
      pct: Math.max(0, r.score!.total_marks) / r.score!.max_marks,
      marks: r.score!.total_marks,
    }));
  if (points.length < 2) return null;
  const W = 320;
  const H = 80;
  const x = (i: number) => 8 + (i * (W - 16)) / (points.length - 1);
  const y = (p: number) => H - 8 - p * (H - 16);
  const d = points.map((p, i) => `${i ? "L" : "M"}${x(i)},${y(p.pct)}`).join(" ");
  return (
    <div className="bg-white rounded-2xl border border-border-subtle p-4">
      <p className="text-xs font-bold text-ink-muted tracking-wide mb-2">YOUR SCORES OVER TIME</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-20" role="img" aria-label="Mock score trend">
        <path d={d} fill="none" stroke="#EEA31F" strokeWidth="2.5" strokeLinejoin="round" />
        {points.map((p, i) => (
          <circle key={i} cx={x(i)} cy={y(p.pct)} r="3.5" fill="#EEA31F" />
        ))}
      </svg>
      <p className="text-xs text-ink-light mt-1">
        Latest {points[points.length - 1].marks} marks · {points.length} papers
      </p>
    </div>
  );
}

export default function MocksPage() {
  const router = useRouter();
  const [exam, setExam] = useState<ExamKey | null>(null);
  const [status, setStatus] = useState<MockStatus | null>(null);
  const [runs, setRuns] = useState<MockRunRow[] | null>(null);
  const [building, setBuilding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lock, setLock] = useState<MockLock | null>(null);

  // The exam is the student's, set at onboarding -- not a choice made on the
  // way into a three-hour paper.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      let target: string | null = null;
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("target_exam")
          .eq("id", user.id)
          .maybeSingle();
        target = data?.target_exam ?? null;
      }
      if (!cancelled) setExam(examFromTarget(target));
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const load = useCallback((e: ExamKey) => {
    getMockStatus(e).then(setStatus).catch(() => undefined);
    listMockRuns().then(setRuns).catch(() => setRuns([]));
  }, []);

  useEffect(() => {
    if (exam) load(exam);
  }, [exam, load]);

  const hasActive = !!status?.active_paper;
  const canStart = hasActive || (status?.credits_available ?? 0) > 0;

  const start = async () => {
    if (!exam) return;
    setError(null);
    if (hasActive) {
      router.push("/mocks/paper");
      return;
    }
    setBuilding(true);
    try {
      await createMockPaper(exam);
      router.push("/mocks/paper");
    } catch (err) {
      const locked = mockLockFrom(err);
      if (locked) {
        setLock(locked);
        load(exam);
      } else {
        setError("We could not set your paper. Check your connection and try again.");
      }
      setBuilding(false);
    }
  };

  const pattern = PATTERNS[exam ?? "jee"];
  const gate = lock ?? status;
  const earned = gate ? earnedTowardNext(gate) : 0;
  const submitted = (runs ?? []).filter((r) => r.status === "submitted" && r.score);

  return (
    <main className="max-w-2xl mx-auto px-4 py-8 space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">Mock tests</h1>
        <p className="text-sm text-ink-light mt-1">
          A full {pattern.label} paper, timed, marked the way the real one is.
        </p>
      </div>

      {gate && (
        <section className="bg-white rounded-2xl border border-border-subtle p-5">
          <p className="text-xs font-bold text-ink-muted tracking-wide">
            {hasActive
              ? "A PAPER IS WAITING"
              : gate.credits_available > 0
                ? "YOU HAVE A PAPER READY"
                : "EARN YOUR NEXT PAPER"}
          </p>
          <p className="text-sm text-ink-light mt-2">
            One paper for every {gate.threshold} practice questions you get right for the first time.
          </p>
          <div className="mt-3 h-2 rounded-full bg-cream-card overflow-hidden">
            <div
              className="h-full bg-orange rounded-full"
              style={{ width: `${(earned / gate.threshold) * 100}%` }}
            />
          </div>
          <p className="text-xs text-ink-muted mt-2">
            {earned} of {gate.threshold} correct toward the next paper
            {gate.credits_available > 0 &&
              ` · ${gate.credits_available} ${gate.credits_available === 1 ? "paper" : "papers"} available`}
          </p>
          {error && <p className="text-sm text-red-note mt-3">{error}</p>}
          <div className="mt-4 flex gap-3">
            <button
              onClick={start}
              disabled={building || !canStart}
              className="px-5 py-2.5 rounded-full bg-orange text-ink font-bold text-sm disabled:opacity-40"
            >
              {building ? "Setting your paper…" : hasActive ? "Resume paper" : "Start paper"}
            </button>
            {!canStart && (
              <Link
                href="/practice"
                className="px-5 py-2.5 rounded-full border border-border-subtle text-ink font-bold text-sm"
              >
                Practice to unlock
              </Link>
            )}
          </div>
        </section>
      )}

      <section className="bg-white rounded-2xl border border-border-subtle p-5">
        <p className="text-xs font-bold text-ink-muted tracking-wide">THE PAPER</p>
        <ul className="mt-3 divide-y divide-border-subtle">
          {pattern.rows.map(([name, value]) => (
            <li key={name} className="flex justify-between py-2 text-sm">
              <span className="font-bold text-ink">{name}</span>
              <span className="text-ink-light">{value}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm font-bold text-ink mt-3">{pattern.total}</p>
        <p className="text-xs text-ink-muted mt-1">
          +4 for a correct answer, −1 for a wrong one, 0 for a skip.{" "}
          <Link href="/exam-scope" className="underline">
            What the exam covers
          </Link>
        </p>
      </section>

      {runs && <ScoreTrend runs={runs} />}

      <section>
        <p className="text-xs font-bold text-ink-muted tracking-wide mb-2">PAPERS YOU HAVE SAT</p>
        {runs === null ? (
          <p className="text-sm text-ink-muted">Loading…</p>
        ) : submitted.length === 0 ? (
          <p className="text-sm text-ink-muted">No papers yet. Your first one is a few correct answers away.</p>
        ) : (
          <ul className="space-y-2">
            {submitted.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/mocks/report/${r.id}`}
                  className="flex items-center justify-between bg-white rounded-2xl border border-border-subtle p-4 hover:border-orange transition-colors"
                >
                  <div>
                    <p className="text-sm font-bold text-ink">
                      {r.exam === "neet" ? "NEET UG" : "JEE Main"} · {formatDay(r.submitted_at ?? r.created_at)}
                    </p>
                    <p className="text-xs text-ink-muted mt-0.5">
                      {r.score!.correct} right · {r.score!.wrong} wrong · {r.score!.unanswered} skipped
                      {Object.entries(r.score!.per_subject ?? {}).length > 0 &&
                        " · " +
                          Object.entries(r.score!.per_subject)
                            .map(([s, v]) => `${subjectLabel(s)} ${v.marks}`)
                            .join(" · ")}
                    </p>
                  </div>
                  <p className="text-lg font-extrabold text-ink">
                    {r.score!.total_marks}
                    <span className="text-xs font-bold text-ink-muted"> / {r.score!.max_marks}</span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
