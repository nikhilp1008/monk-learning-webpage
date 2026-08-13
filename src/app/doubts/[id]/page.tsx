"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { MathText } from "@/components/MathText";
import { QuestionSheet, RuledSheet, Solution } from "@/components/SavedBoard";
import { DEFAULT_VOICE, getTutorName, loadVoicePreference } from "@/lib/drona/tutor";
import { getDoubt, reportDoubt, type DoubtDetail } from "@/lib/doubts";

/**
 * One saved doubt. Everything mathematical renders through the SAME KaTeX
 * pipeline as the live snap screen — raw `$\rho_{1}$` on screen is the exact
 * bug this page previously had, and the structured columns (steps, answer,
 * key_idea, option_labels) replace the flat-text blob it used to dump.
 */
export default function DoubtDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [teacher, setTeacher] = useState(() => getTutorName(DEFAULT_VOICE));
  useEffect(() => {
    setTeacher(getTutorName(loadVoicePreference()));
  }, []);

  const [doubt, setDoubt] = useState<DoubtDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reported, setReported] = useState(false);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;
    // The API detail (not a raw table read) also signs the photo URL and
    // carries the reported flag — neither is reachable client-side.
    getDoubt(id)
      .then((d) => {
        if (isMounted) {
          setDoubt(d);
          setReported(d.reported);
        }
      })
      .catch((err) => {
        if (isMounted)
          setError(err instanceof Error ? err.message : "Could not load that doubt.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleReport = async () => {
    if (!doubt || reported) return;
    try {
      await reportDoubt(doubt.id);
      setReported(true);
    } catch {
      /* best-effort; the page stays useful */
    }
  };

  const chosen =
    doubt?.option_labels && doubt.option_labels.length > 0
      ? doubt.option_labels.join(", ")
      : null;

  return (
    <div className="min-h-screen flex flex-col bg-ruled-body">
      <main className="flex-1 max-w-[1180px] w-full mx-auto px-6 md:px-11 py-8 animate-ml-rise">
        <Link
          href="/doubts"
          className="inline-block font-semibold text-[0.86rem] py-2 px-3.5 rounded-full text-ink-light hover:text-ink transition-colors mb-3"
        >
          ← All doubts
        </Link>

        {loading && (
          <div className="py-20 flex flex-col items-center gap-3 text-ink-muted">
            <div className="w-6 h-6 border-2 border-orange border-t-transparent rounded-full animate-ml-spin" />
            <span className="text-xs font-semibold">Loading doubt…</span>
          </div>
        )}

        {!loading && (error || !doubt) && (
          <p className="text-ink-muted text-sm font-semibold py-16 text-center">
            {error || "Couldn't find that doubt."}
          </p>
        )}

        {!loading && doubt && (
          <>
            <h1 className="text-[2rem] font-medium tracking-[-0.025em] leading-tight text-ink">
              {doubt.concept || doubt.chapter || "Snapped doubt"}
            </h1>
            <div className="flex items-center gap-2.5 flex-wrap mt-2.5 mb-6">
              {doubt.status === "solved" && (
                <span className="inline-flex items-center gap-1.5 font-bold text-[0.72rem] text-[#157A45] bg-[rgba(28,155,87,0.1)] border border-[rgba(28,155,87,0.3)] rounded-full py-1 px-3">
                  Solved by {teacher}
                </span>
              )}
              {doubt.status === "unsure" && (
                <span className="font-bold text-[0.72rem] text-orange-dark bg-cream border border-[rgba(238,163,31,0.4)] rounded-full py-1 px-3">
                  {teacher} is unsure — working shown
                </span>
              )}
              {(doubt.status === "failed" || doubt.status === "illegible") && (
                <span className="font-bold text-[0.72rem] text-red-dark bg-[rgba(221,68,51,0.08)] border border-[rgba(221,68,51,0.3)] rounded-full py-1 px-3">
                  Not solved
                </span>
              )}
              {doubt.subject && (
                <span className="font-bold text-[0.72rem] uppercase tracking-wide text-orange-dark bg-cream border border-[rgba(238,163,31,0.4)] rounded-full py-1 px-3">
                  {doubt.subject}
                </span>
              )}
              {doubt.chapter && (
                <span className="font-semibold text-[0.74rem] text-ink-light border border-[rgba(28,26,22,0.12)] rounded-full py-1 px-3">
                  {doubt.chapter}
                </span>
              )}
              <span className="text-[0.76rem] text-ink-muted font-semibold">
                Snapped {new Date(doubt.created_at).toLocaleDateString()}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-5 items-start">
              <div className="flex flex-col gap-4">
                {doubt.image_url && (
                  <div className="bg-white border border-border-subtle rounded-2xl overflow-hidden shadow-ref-card">
                    <div className="bg-dark-bg text-[#EFEBDD] font-bold text-[0.72rem] py-2.5 px-4">
                      Your photo
                    </div>
                    <div className="relative w-full aspect-4/3 bg-[#FBF8EF]">
                      <Image
                        src={doubt.image_url}
                        alt="The question you photographed"
                        fill
                        unoptimized
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}
                <div className="bg-white border border-border-subtle rounded-2xl p-5 shadow-ref-card">
                  <span className="block font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted mb-3">
                    Your question
                  </span>
                  <QuestionSheet
                    questionText={doubt.question_text}
                    subject={doubt.subject}
                    topic={doubt.chapter}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {doubt.steps?.length > 0 || doubt.answer ? (
                  <RuledSheet label={`${teacher.toUpperCase()}'S EXPLANATION`}>
                    <Solution
                      answer={doubt.status === "solved" ? doubt.answer : null}
                      steps={doubt.steps || []}
                      keyIdea={doubt.key_idea}
                    />
                    {chosen && doubt.status === "solved" && (
                      <p className="mt-3 text-[0.82rem] font-bold text-ink-light">
                        Option ({chosen})
                      </p>
                    )}
                    {doubt.status === "unsure" && doubt.failure_reason && (
                      <p className="mt-3 text-[0.84rem] text-orange-dark leading-relaxed">
                        {doubt.failure_reason}
                      </p>
                    )}
                  </RuledSheet>
                ) : (
                  <div className="bg-[rgba(221,68,51,0.05)] border border-[rgba(221,68,51,0.3)] rounded-2xl p-5">
                    <p className="text-[0.9rem] text-ink-light leading-relaxed">
                      <MathText
                        content={
                          doubt.failure_reason ||
                          doubt.legibility_note ||
                          "No explanation was saved for this doubt."
                        }
                      />
                    </p>
                  </div>
                )}

                <div className="flex gap-3 flex-wrap items-center">
                  <button
                    onClick={() => router.push("/learn?from=snap")}
                    className="inline-flex items-center gap-2 font-semibold text-[0.88rem] py-2.5 px-5 rounded-full border-[1.4px] border-[rgba(28,26,22,0.14)] bg-white text-ink cursor-pointer hover:border-ink transition-colors"
                  >
                    Ask a follow-up →
                  </button>
                  {doubt.status === "solved" && (
                    <button
                      onClick={handleReport}
                      disabled={reported}
                      className={`ml-auto font-semibold text-[0.82rem] py-2.5 px-3 rounded-full bg-transparent cursor-pointer transition-colors ${
                        reported ? "text-red-dark cursor-default" : "text-ink-muted hover:text-red-dark"
                      }`}
                    >
                      {reported ? "Reported — thank you" : "Report a mistake"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
