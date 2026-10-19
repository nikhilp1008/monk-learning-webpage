"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SUBJECT_TILES, SubjectArt } from "@/components/textbook/subjects";
import { loadTextbookExam } from "@/lib/textbook-catalogue";
import { readyChapterCount, textbookSubjects } from "@/lib/textbooks";

export default function TextbooksPage() {
  const [subjects, setSubjects] = useState<string[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadTextbookExam().then((exam) => {
      if (!cancelled) setSubjects(textbookSubjects(exam));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">Textbooks</h1>
        <p className="text-sm text-ink-light mt-1">
          Chapters written for JEE and NEET, with worked examples, figures and practice.
        </p>
      </div>

      {subjects === null ? (
        <p className="text-sm text-ink-muted">Loading…</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {subjects.map((subject) => {
            const tile = SUBJECT_TILES[subject];
            if (!tile) return null;
            const ready = readyChapterCount(subject);
            return (
              <Link
                key={subject}
                href={`/textbooks/${subject}`}
                style={{ background: tile.background, borderColor: tile.border }}
                className="relative flex h-60 overflow-hidden rounded-l-2xl rounded-r-md border shadow-[0_10px_14px_rgba(28,26,22,.12)] transition-transform active:scale-[0.97] hover:-translate-y-0.5"
              >
                {/* The binding, with the subject turned on it. */}
                <div className="relative w-11 flex-none" style={{ background: tile.ink }}>
                  <span
                    className="absolute left-1/2 top-1/2 w-[150px] -translate-x-1/2 -translate-y-1/2 -rotate-90 text-center text-sm font-bold tracking-wide whitespace-nowrap"
                    style={{ color: tile.background }}
                  >
                    {tile.label}
                  </span>
                </div>
                <div className="relative flex-1">
                  <div className="absolute inset-0 grid place-items-center">
                    <SubjectArt subject={subject} size={92} tile={tile} />
                  </div>
                  <div className="absolute bottom-3 right-3 text-right" style={{ color: tile.ink }}>
                    <p className="text-sm font-bold">{ready > 0 ? `${ready} chapters` : "coming soon"}</p>
                    <p className="text-xs opacity-80">Class 11 · 12</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <p className="border-t border-border-subtle pt-4 text-xs text-ink-muted leading-relaxed">
        Every chapter here was written by the strongest models available, then recomputed and checked
        against the syllabus, question by question and formula by formula.
      </p>
    </main>
  );
}
