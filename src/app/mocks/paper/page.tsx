"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { QuestionStem } from "@/components/QuestionStem";
import { MathText } from "@/components/MathText";
import { supabase } from "@/lib/supabase";
import {
  answersPayload,
  examFromTarget,
  forgetProgress,
  formatClock,
  getActivePaper,
  isAnswered,
  loadProgress,
  saveProgress,
  submitMockPaper,
  subjectLabel,
  type MockAnswerDraft,
  type MockPaper,
} from "@/lib/mock";

/**
 * The live paper. The server owns the paper and the clock (GET /mock/active
 * returns seconds_left); this page owns what the student has put against it,
 * kept in localStorage so a refresh or a closed tab does not cost them a
 * credit. The countdown runs on performance.now() so changing the computer's
 * clock cannot add time.
 */

type View = "loading" | "none" | "paper" | "submitting" | "error";

export default function MockPaperPage() {
  const router = useRouter();
  const [view, setView] = useState<View>("loading");
  const [paper, setPaper] = useState<MockPaper | null>(null);
  const [answers, setAnswers] = useState<Map<string, MockAnswerDraft>>(new Map());
  const [marked, setMarked] = useState<Set<string>>(new Set());
  const [index, setIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Time per question lives in refs: it changes on every switch and must not
  // re-render the paper.
  const elapsed = useRef<Map<string, number>>(new Map());
  const shownAt = useRef(0); // set when the paper loads
  const deadlineMono = useRef(0);
  const submitted = useRef(false);

  const charge = useCallback((p: MockPaper | null, i: number) => {
    const q = p?.questions[i];
    const now = Date.now();
    if (q) elapsed.current.set(q.id, (elapsed.current.get(q.id) ?? 0) + Math.max(0, now - shownAt.current));
    shownAt.current = now;
  }, []);

  // Load: the student's exam, then the server's unfinished paper.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
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
        const { paper: active } = await getActivePaper(examFromTarget(target));
        if (cancelled) return;
        if (!active) {
          setView("none");
          return;
        }
        const saved = loadProgress(active.mock_run_id);
        const msLeft =
          typeof active.seconds_left === "number"
            ? active.seconds_left * 1000
            : active.duration_minutes * 60_000;
        deadlineMono.current = performance.now() + msLeft;
        setSecondsLeft(Math.floor(msLeft / 1000));
        if (saved) {
          setAnswers(new Map(saved.answers));
          setMarked(new Set(saved.marked));
          setIndex(Math.max(0, Math.min(active.questions.length - 1, saved.index ?? 0)));
          elapsed.current = new Map(saved.elapsed);
        }
        shownAt.current = Date.now();
        setPaper(active);
        setView("paper");
      } catch {
        if (!cancelled) {
          setError("We could not load your paper. Check your connection and refresh.");
          setView("error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Persist after any change (debounced: a numerical answer changes per key).
  useEffect(() => {
    if (view !== "paper" || !paper) return;
    const t = setTimeout(() => {
      saveProgress({
        run_id: paper.mock_run_id,
        answers: [...answers.entries()],
        marked: [...marked],
        index,
        elapsed: [...elapsed.current.entries()],
      });
    }, 300);
    return () => clearTimeout(t);
  }, [view, paper, answers, marked, index]);

  const submit = useCallback(async () => {
    if (!paper || submitted.current) return;
    submitted.current = true;
    charge(paper, index);
    setConfirming(false);
    setView("submitting");
    try {
      await submitMockPaper(paper.mock_run_id, answersPayload(paper, answers), {
        marked: [...marked],
        elapsed_ms: Object.fromEntries(
          [...elapsed.current.entries()].map(([id, ms]) => [id, Math.round(ms)])
        ),
      });
      forgetProgress(paper.mock_run_id);
      router.replace(`/mocks/report/${paper.mock_run_id}`);
    } catch {
      submitted.current = false;
      setError("We could not submit your paper. Your answers are saved here; try again.");
      setView("paper");
    }
  }, [paper, answers, marked, index, charge, router]);

  // The countdown. A paper whose clock reaches zero is submitted as it stands.
  useEffect(() => {
    if (view !== "paper") return;
    const tick = () => {
      const left = Math.max(0, Math.floor((deadlineMono.current - performance.now()) / 1000));
      setSecondsLeft(left);
      if (left === 0) submit();
    };
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [view, submit]);

  // A hidden tab is not time spent on the question that was on screen.
  useEffect(() => {
    if (view !== "paper") return;
    const onVis = () => {
      if (document.hidden) charge(paper, index);
      else shownAt.current = Date.now();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [view, paper, index, charge]);

  // Leaving mid-paper does not pause the clock; say so.
  useEffect(() => {
    if (view !== "paper") return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [view]);

  const goTo = (i: number) => {
    if (!paper) return;
    charge(paper, index);
    setIndex(Math.max(0, Math.min(paper.questions.length - 1, i)));
  };

  const counts = useMemo(() => {
    if (!paper) return { answered: 0, marked: 0 };
    return {
      answered: paper.questions.filter((q) => isAnswered(q, answers.get(q.id))).length,
      marked: marked.size,
    };
  }, [paper, answers, marked]);

  if (view === "loading" || view === "submitting") {
    return (
      <main className="max-w-xl mx-auto px-4 py-24 text-center text-ink-light">
        {view === "loading" ? "Opening your paper…" : "Marking your paper…"}
      </main>
    );
  }
  if (view === "none") {
    return (
      <main className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <p className="text-ink">You have no paper in progress.</p>
        <Link href="/mocks" className="inline-block px-5 py-2.5 rounded-full bg-orange text-ink font-bold text-sm">
          Back to Mock tests
        </Link>
      </main>
    );
  }
  if (view === "error" || !paper) {
    return (
      <main className="max-w-xl mx-auto px-4 py-24 text-center text-red-note">{error}</main>
    );
  }

  const q = paper.questions[index];
  const draft = answers.get(q.id);
  const setDraft = (next: MockAnswerDraft | null) =>
    setAnswers((prev) => {
      const m = new Map(prev);
      if (next) m.set(q.id, next);
      else m.delete(q.id);
      return m;
    });
  const options = q.options ? Object.entries(q.options) : [];
  const low = secondsLeft <= 300;

  return (
    <main className="max-w-5xl mx-auto px-4 py-4">
      <div className="sticky top-0 z-10 bg-cream-light/95 backdrop-blur flex items-center justify-between py-3 border-b border-border-subtle">
        <p className="text-sm font-bold text-ink">
          {subjectLabel(q.subject)} · Q{q.question_num} of {paper.total_questions}
        </p>
        <p className={`text-lg font-extrabold tabular-nums ${low ? "text-red-note" : "text-ink"}`}>
          {formatClock(secondsLeft)}
        </p>
        <button
          onClick={() => setConfirming(true)}
          className="px-4 py-2 rounded-full bg-ink text-white text-sm font-bold"
        >
          Submit
        </button>
      </div>

      {error && <p className="text-sm text-red-note mt-3">{error}</p>}

      <div className="grid md:grid-cols-[1fr_220px] gap-6 mt-5">
        <section className="space-y-4">
          <div className="bg-white rounded-2xl border border-border-subtle p-5 space-y-4">
            <QuestionStem content={q.question_text} />
            {q.diagram && q.diagram.length > 0 && (
              <div className="flex flex-col items-center gap-3">
                {q.diagram.map((fig, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={fig.url}
                    alt="Question diagram"
                    className="max-w-full rounded-xl border border-border-subtle"
                  />
                ))}
              </div>
            )}

            {q.question_type === "numerical" ? (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-ink-light">
                  Enter your numerical answer:
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={draft?.value ?? ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    setDraft(v.trim() ? { value: v } : null);
                  }}
                  className="w-48 rounded-xl border border-border-subtle px-3 py-2 text-ink bg-cream-soft"
                  placeholder="e.g. 4.5"
                />
              </div>
            ) : (
              <div className="space-y-2" role="radiogroup">
                {options.map(([key, text]) => {
                  const on = draft?.option === key;
                  return (
                    <button
                      key={key}
                      role="radio"
                      aria-checked={on}
                      onClick={() => setDraft(on ? null : { option: key })}
                      className={`w-full text-left flex gap-3 rounded-xl border px-4 py-3 transition-colors ${
                        on ? "border-orange bg-orange/10" : "border-border-subtle hover:border-orange"
                      }`}
                    >
                      <span className="font-bold text-ink-light w-5">{key}</span>
                      <span className="text-ink flex-1">
                        <MathText content={text} />
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              className="px-4 py-2 rounded-full border border-border-subtle text-sm font-bold text-ink disabled:opacity-30"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setMarked((prev) => {
                  const s = new Set(prev);
                  if (s.has(q.id)) s.delete(q.id);
                  else s.add(q.id);
                  return s;
                })
              }
              className={`px-4 py-2 rounded-full text-sm font-bold border ${
                marked.has(q.id)
                  ? "border-orange bg-orange/15 text-orange-dark"
                  : "border-border-subtle text-ink-light"
              }`}
            >
              {marked.has(q.id) ? "Marked for review" : "Mark for review"}
            </button>
            <button
              onClick={() => goTo(index + 1)}
              disabled={index === paper.questions.length - 1}
              className="px-4 py-2 rounded-full bg-orange text-ink text-sm font-bold disabled:opacity-30"
            >
              Next
            </button>
          </div>
        </section>

        <aside className="space-y-3">
          <p className="text-xs font-bold text-ink-muted tracking-wide">PALETTE</p>
          {paper.sections.map((sec) => {
            const qs = paper.questions
              .map((qq, i) => ({ qq, i }))
              .filter(({ qq }) => qq.subject === sec.subject);
            return (
              <div key={sec.subject}>
                <p className="text-xs font-bold text-ink-light mb-1">{subjectLabel(sec.subject)}</p>
                <div className="grid grid-cols-5 gap-1.5">
                  {qs.map(({ qq, i }) => {
                    const done = isAnswered(qq, answers.get(qq.id));
                    const flag = marked.has(qq.id);
                    return (
                      <button
                        key={qq.id}
                        onClick={() => goTo(i)}
                        aria-label={`Question ${qq.question_num}${done ? ", answered" : ""}${flag ? ", marked" : ""}`}
                        className={`relative h-8 rounded-lg text-xs font-bold border ${
                          i === index
                            ? "border-ink"
                            : "border-transparent"
                        } ${done ? "bg-green-badge text-white" : "bg-cream-card text-ink-light"}`}
                      >
                        {qq.question_num}
                        {flag && (
                          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-orange" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <p className="text-xs text-ink-muted">
            {counts.answered} answered · {counts.marked} marked
          </p>
        </aside>
      </div>

      {confirming && (
        <div className="fixed inset-0 z-20 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4">
            <h2 className="text-lg font-extrabold text-ink">Submit your paper?</h2>
            <p className="text-sm text-ink-light">
              {counts.answered} of {paper.total_questions} answered
              {paper.total_questions - counts.answered > 0 &&
                `, ${paper.total_questions - counts.answered} left blank`}
              {counts.marked > 0 && `, ${counts.marked} still marked for review`}. You cannot change
              answers after submitting.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirming(false)}
                className="px-4 py-2 rounded-full border border-border-subtle text-sm font-bold text-ink"
              >
                Keep going
              </button>
              <button onClick={submit} className="px-4 py-2 rounded-full bg-ink text-white text-sm font-bold">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
