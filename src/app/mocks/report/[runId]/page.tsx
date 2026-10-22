"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { QuestionStem } from "@/components/QuestionStem";
import { MathText } from "@/components/MathText";
import {
  fetchReport,
  formatDay,
  formatSpan,
  mockInsights,
  subjectLabel,
  type MockReport,
  type MockReportQuestion,
} from "@/lib/mock";

type Filter = "all" | "wrong" | "skipped" | "marked";

// questions.solution is a JSONB object ({approach?, steps[], final_answer?}),
// occasionally a bare string. Never hand it to MathText unchecked.
function Solution({ solution }: { solution: unknown }) {
  if (!solution) return null;
  if (typeof solution === "string") return <MathText content={solution} />;
  const s = solution as { approach?: string | null; steps?: string[] | null; final_answer?: string | null };
  const steps = (s.steps ?? []).filter((x) => x?.trim());
  if (!s.approach?.trim() && !steps.length && !s.final_answer?.trim()) return null;
  return (
    <div className="space-y-2 text-sm text-ink">
      {s.approach?.trim() && <MathText content={s.approach} />}
      {steps.length > 0 && (
        <ol className="list-decimal pl-5 space-y-1.5">
          {steps.map((st, i) => (
            <li key={i}>
              <MathText content={st} />
            </li>
          ))}
        </ol>
      )}
      {s.final_answer?.trim() && (
        <p className="font-bold">
          Answer: <MathText content={s.final_answer} />
        </p>
      )}
    </div>
  );
}

function QuestionReview({ q }: { q: MockReportQuestion }) {
  const [open, setOpen] = useState(false);
  const verdict = !q.answered ? "Skipped" : q.is_correct ? "Correct" : "Wrong";
  const tone = !q.answered ? "text-ink-muted" : q.is_correct ? "text-green-badge" : "text-red-note";
  const numerical = q.type === "numerical";
  return (
    <li className="bg-white rounded-2xl border border-border-subtle">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left">
        <span className="text-sm font-bold text-ink">
          Q{q.num} · {subjectLabel(q.subject)}
          {q.chapter_name ? ` · ${q.chapter_name}` : ""}
          {q.marked && <span className="ml-2 text-orange-dark text-xs">marked</span>}
        </span>
        <span className={`text-xs font-bold ${tone}`}>
          {verdict}
          {q.elapsed_ms > 0 && <span className="text-ink-muted"> · {formatSpan(q.elapsed_ms)}</span>}
        </span>
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-border-subtle pt-3">
          <QuestionStem content={q.stem} />
          {q.diagram?.map((fig, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={fig.url} alt="Question diagram" className="max-w-full rounded-xl border border-border-subtle" />
          ))}
          {numerical ? (
            <p className="text-sm text-ink">
              Your answer: <b>{q.chosen_value ?? "—"}</b> · Correct answer: <b>{q.correct_value ?? "—"}</b>
            </p>
          ) : (
            q.options && (
              <ul className="space-y-1.5">
                {Object.entries(q.options).map(([key, text]) => {
                  const right = key === q.correct_option;
                  const chosen = key === q.chosen_option;
                  return (
                    <li
                      key={key}
                      className={`flex gap-3 rounded-xl border px-3 py-2 text-sm ${
                        right
                          ? "border-green-badge bg-green-badge/10"
                          : chosen
                            ? "border-red-note bg-red-note/10"
                            : "border-border-subtle"
                      }`}
                    >
                      <span className="font-bold text-ink-light w-5">{key}</span>
                      <span className="flex-1 text-ink">
                        <MathText content={text} />
                      </span>
                      {right && <span className="text-xs font-bold text-green-badge">Correct</span>}
                      {chosen && !right && <span className="text-xs font-bold text-red-note">Yours</span>}
                    </li>
                  );
                })}
              </ul>
            )
          )}
          <Solution solution={q.solution} />
        </div>
      )}
    </li>
  );
}

export default function MockReportPage({ params }: { params: Promise<{ runId: string }> }) {
  const { runId } = use(params);
  const [report, setReport] = useState<MockReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    fetchReport(runId)
      .then(setReport)
      .catch(() => setError("We could not open this paper."));
  }, [runId]);

  const insights = useMemo(() => (report ? mockInsights(report) : null), [report]);

  if (error) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <p className="text-red-note">{error}</p>
        <Link href="/mocks" className="underline text-ink">Back to Mock tests</Link>
      </main>
    );
  }
  if (!report || !insights) {
    return <main className="max-w-2xl mx-auto px-4 py-24 text-center text-ink-light">Opening your report…</main>;
  }

  const shown = report.questions.filter((q) =>
    filter === "wrong" ? q.answered && !q.is_correct
      : filter === "skipped" ? !q.answered
      : filter === "marked" ? q.marked
      : true
  );

  return (
    <main className="max-w-2xl mx-auto px-4 py-8 space-y-5">
      <Link href="/mocks" className="text-sm text-ink-light underline">← Mock tests</Link>

      <section className="bg-white rounded-2xl border border-border-subtle p-6 text-center">
        <p className="text-xs font-bold text-ink-muted tracking-wide">
          {report.exam === "neet" ? "NEET UG" : "JEE MAIN"} · {formatDay(report.submitted_at)}
        </p>
        <p className="text-5xl font-extrabold text-ink mt-2">
          {report.total_marks}
          <span className="text-lg text-ink-muted"> / {report.max_marks}</span>
        </p>
        <p className="text-sm text-ink-light mt-2">
          {report.correct} right · {report.wrong} wrong · {report.unanswered} skipped
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl border border-border-subtle p-4">
          <p className="text-xs font-bold text-ink-muted">HANDED BACK BY WRONG ANSWERS</p>
          <p className="text-xl font-extrabold text-ink mt-1">{insights.lostToWrong} marks</p>
        </div>
        <div className="bg-white rounded-2xl border border-border-subtle p-4">
          <p className="text-xs font-bold text-ink-muted">LEFT ON THE TABLE</p>
          <p className="text-xl font-extrabold text-ink mt-1">{insights.leftOnTable} marks</p>
        </div>
        {insights.timeMs > 0 && (
          <div className="col-span-2 bg-white rounded-2xl border border-border-subtle p-4">
            <p className="text-xs font-bold text-ink-muted">TIME</p>
            <p className="text-sm text-ink mt-1">
              {formatSpan(insights.timeMs)} in total
              {insights.medianMs !== null && ` · ${formatSpan(insights.medianMs)} on a typical attempted question`}
            </p>
          </div>
        )}
      </section>

      <section className="bg-white rounded-2xl border border-border-subtle p-5">
        <p className="text-xs font-bold text-ink-muted tracking-wide mb-2">BY SUBJECT</p>
        <ul className="divide-y divide-border-subtle">
          {insights.subjects.map((s) => (
            <li key={s.subject} className="py-2.5 flex items-center justify-between text-sm">
              <span className="font-bold text-ink">{subjectLabel(s.subject)}</span>
              <span className="text-ink-light">
                {s.correct} right · {s.wrong} wrong · {s.unanswered} skipped
                {s.accuracy !== null && ` · ${Math.round(s.accuracy * 100)}%`}
              </span>
              <span className="font-extrabold text-ink">{s.marks}</span>
            </li>
          ))}
        </ul>
        {insights.strongest && insights.weakest && (
          <p className="text-xs text-ink-muted mt-2">
            Strongest: {subjectLabel(insights.strongest.subject)} · To improve:{" "}
            {subjectLabel(insights.weakest.subject)}
          </p>
        )}
      </section>

      {insights.weakChapters.length > 0 && (
        <section className="bg-white rounded-2xl border border-border-subtle p-5">
          <p className="text-xs font-bold text-ink-muted tracking-wide mb-2">CHAPTERS TO WORK ON</p>
          <ul className="divide-y divide-border-subtle">
            {insights.weakChapters.slice(0, 6).map((c) => (
              <li key={c.chapterId} className="py-2.5 flex items-center justify-between text-sm">
                <span>
                  <span className="font-bold text-ink">{c.name}</span>
                  <span className="text-ink-muted"> · {subjectLabel(c.subject)}</span>
                </span>
                <span className="text-ink-light">
                  {c.wrong} wrong of {c.questions} · −{c.lost} marks
                </span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 mt-3">
            {insights.weakChapters.slice(0, 3).map((c) => (
              <Link
                key={c.chapterId}
                href={`/practice?chapter=${encodeURIComponent(c.chapterId)}&name=${encodeURIComponent(c.name)}`}
                className="px-4 py-2 rounded-full bg-orange text-ink text-sm font-bold"
              >
                Practice {c.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="flex gap-2 mb-3">
          {(["all", "wrong", "skipped", "marked"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
                filter === f ? "bg-ink text-white border-ink" : "border-border-subtle text-ink-light"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <ul className="space-y-2">
          {shown.map((q) => (
            <QuestionReview key={q.id} q={q} />
          ))}
          {shown.length === 0 && <p className="text-sm text-ink-muted">Nothing here.</p>}
        </ul>
      </section>
    </main>
  );
}
