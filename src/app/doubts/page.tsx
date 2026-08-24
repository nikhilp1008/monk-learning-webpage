"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { MathText } from "@/components/MathText";
import { listDoubts, type DoubtSummary, type SubjectChip } from "@/lib/doubts";

/**
 * Every snapped doubt.
 *
 * Reads the API rather than the `doubts` table directly. The table read could
 * not produce the subject chips: which subjects belong on them depends on the
 * student's exam entitlement, which lives on `profiles` and is resolved
 * server-side. It also kept this page on a generated Row type that predated
 * the stem/options columns, so the list showed the flat question blob while
 * the detail page showed the structured question.
 */
function dayLabel(iso: string) {
  const d = new Date(iso);
  const diffH = (Date.now() - d.getTime()) / 3600000;
  if (diffH < 20) return diffH < 1 ? "just now" : `${Math.round(diffH)}h ago`;
  if (diffH < 44) return "yesterday";
  if (diffH < 24 * 7) return "this week";
  return "last week";
}

export default function DoubtsPage() {
  const [doubts, setDoubts] = useState<DoubtSummary[]>([]);
  const [subjects, setSubjects] = useState<SubjectChip[]>([]);
  const [exam, setExam] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  // Holds the stored KEY ("mathematics"), not the label — that is what the
  // column stores and what a filter has to match.
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    let isMounted = true;
    listDoubts()
      .then((res) => {
        if (!isMounted) return;
        setDoubts(res.doubts || []);
        setSubjects(res.subjects || []);
        setExam(res.exam || "");
      })
      .catch((err) => {
        if (isMounted)
          setError(err instanceof Error ? err.message : "Could not load your doubts.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Filtered here rather than re-fetching: the list is capped at 60 rows, so
  // typing stays instant instead of firing a request per keystroke.
  const filtered = useMemo(
    () =>
      doubts.filter((d) => {
        if (filter !== "all" && d.subject !== filter) return false;
        if (query) {
          const hay = `${d.stem || d.question_text || ""} ${d.concept || ""} ${
            d.chapter || ""
          } ${d.subject_label || ""}`.toLowerCase();
          if (!hay.includes(query.toLowerCase())) return false;
        }
        return true;
      }),
    [doubts, filter, query]
  );

  const offSyllabusCount = doubts.filter((d) => d.on_syllabus === false).length;

  return (
    <div className="min-h-screen flex flex-col bg-ruled-body">
      <main className="flex-1 max-w-[1180px] w-full mx-auto px-6 md:px-11 py-8 animate-ml-rise">
        <h1 className="text-[2.3rem] leading-[1.05] tracking-[-0.025em] font-medium text-ink">
          Every question you&apos;ve snapped.
        </h1>
        <p className="text-ink-light text-base mt-1.5 max-w-[48rem]">
          Each photo you send to Drona is solved and saved here automatically.
        </p>

        <div className="flex items-center gap-3 flex-wrap mt-6 mb-6">
          <div className="flex-1 min-w-[220px] max-w-[380px] flex items-center gap-2 bg-white border border-border-subtle rounded-full px-4 py-2.5 shadow-xs">
            <svg viewBox="0 0 24 24" width={16} height={16} fill="none" className="flex-none stroke-ink-muted" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.2-3.2" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your doubts…"
              className="flex-1 min-w-0 bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
            />
          </div>

          <div className="inline-flex gap-[3px] p-[3px] bg-[rgba(28,26,22,0.055)] rounded-full flex-wrap">
            <button
              onClick={() => setFilter("all")}
              className={`text-[0.82rem] px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                filter === "all" ? "font-bold bg-ink text-cream-light" : "font-semibold text-ink-light"
              }`}
            >
              All
            </button>
            {subjects.map((s) => (
              <button
                key={s.key}
                onClick={() => setFilter(s.key)}
                title={
                  s.on_syllabus
                    ? undefined
                    : `Not on your ${exam.toUpperCase()} syllabus — still solved and saved`
                }
                className={`text-[0.82rem] px-3.5 py-1.5 rounded-full transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
                  filter === s.key
                    ? "font-bold bg-ink text-cream-light"
                    : "font-semibold text-ink-light"
                }`}
              >
                {s.label}
                {!s.on_syllabus && (
                  // The off-syllabus subjects sit after the student's own, so a
                  // dot is enough to explain why an unexpected chip is there.
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      filter === s.key ? "bg-cream-light/60" : "bg-orange"
                    }`}
                  />
                )}
              </button>
            ))}
          </div>

          <span className="text-[0.76rem] text-ink-muted font-semibold ml-auto">
            {doubts.length} snapped doubt{doubts.length === 1 ? "" : "s"}
          </span>
        </div>

        {offSyllabusCount > 0 && filter === "all" && (
          <p className="text-[0.8rem] text-ink-muted mb-4 -mt-2">
            {offSyllabusCount} of these {offSyllabusCount === 1 ? "is" : "are"} outside
            your {exam.toUpperCase()} syllabus. Drona still solved {offSyllabusCount === 1 ? "it" : "them"}.
          </p>
        )}

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-ink-muted">
            <div className="w-6 h-6 border-2 border-orange border-t-transparent rounded-full animate-ml-spin" />
            <span className="text-xs font-semibold">Loading doubts...</span>
          </div>
        ) : error ? (
          <p className="py-20 text-center text-ink-muted text-sm font-semibold">{error}</p>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-ink-muted text-sm font-semibold">
              {doubts.length === 0
                ? "Nothing snapped yet. Questions you photograph for Drona will show up here, solved."
                : "No doubts match that. Try another search."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((d) => (
              <Link
                key={d.id}
                href={`/doubts/${d.id}`}
                className="flex items-center gap-4 bg-white border border-border-subtle rounded-[16px] p-4 shadow-ref-stat hover:-translate-y-0.5 transition-transform"
              >
                <div className="w-16 h-16 flex-none rounded-xl bg-ruled-card border border-border-subtle grid place-items-center relative overflow-hidden">
                  <span className="text-[0.6rem] font-bold text-ink-light text-center leading-tight px-1">
                    {(d.concept || d.subject_label || "?").slice(0, 14)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[0.76rem] text-ink-muted font-semibold flex items-center gap-1.5 flex-wrap">
                    <span>
                      {[d.subject_label, d.chapter].filter(Boolean).join(" · ") || "Unread photo"}
                      {" · "}
                      {dayLabel(d.created_at)}
                    </span>
                    {d.on_syllabus === false && (
                      <span className="font-bold text-[0.68rem] text-orange-dark bg-cream border border-[rgba(238,163,31,0.4)] rounded-full px-2 py-[1px]">
                        off-syllabus
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-[0.96rem] text-ink mt-0.5 line-clamp-2">
                    {/* stem is the clean question alone; question_text is the
                        fallback for doubts saved before that column existed. */}
                    <MathText content={d.stem || d.question_text} />
                  </p>
                  {d.status === "solved" && (
                    <span className="inline-flex items-center gap-1 text-[0.72rem] font-bold text-green-badge mt-1.5">
                      <svg viewBox="0 0 24 24" width={12} height={12} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Solved
                    </span>
                  )}
                  {d.status === "unsure" && (
                    <span className="inline-flex items-center gap-1 text-[0.72rem] font-bold text-orange-dark mt-1.5">
                      Unsure — working shown
                    </span>
                  )}
                  {(d.status === "failed" || d.status === "illegible") && (
                    <span className="inline-flex items-center gap-1 text-[0.72rem] font-bold text-red-dark mt-1.5">
                      Not solved
                    </span>
                  )}
                </div>
                <svg viewBox="0 0 24 24" width={16} height={16} fill="none" className="flex-none stroke-ink-dim" strokeWidth="2" strokeLinecap="round">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
