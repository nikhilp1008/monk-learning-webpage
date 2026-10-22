"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { SUBJECT_TILES } from "@/components/textbook/subjects";
import { loadTextbookCatalogue, loadTextbookExam } from "@/lib/textbook-catalogue";
import type { SubjectGroup } from "@/lib/drona/types";
import { isChapterReady } from "@/lib/textbooks";

const CLASSES = [11, 12] as const;

export default function TextbookChaptersPage({ params }: { params: Promise<{ subject: string }> }) {
  const subject = use(params).subject.toLowerCase();
  const tile = SUBJECT_TILES[subject];
  const [classLevel, setClassLevel] = useState<11 | 12>(11);
  const [catalogue, setCatalogue] = useState<SubjectGroup[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadTextbookExam()
      .then(loadTextbookCatalogue)
      .then((data) => !cancelled && setCatalogue(data))
      .catch(() => !cancelled && setError("We could not load the chapters. Check your connection and refresh."));
    return () => {
      cancelled = true;
    };
  }, []);

  const chapters = useMemo(() => {
    const group = (catalogue ?? []).find((s) => s.subject.trim().toLowerCase() === subject);
    return (group?.chapters ?? []).filter((c) => (c.class_level ?? 11) === classLevel);
  }, [catalogue, subject, classLevel]);

  return (
    <main className="max-w-2xl mx-auto px-4 py-8 space-y-5">
      <Link href="/textbooks" className="text-sm text-ink-light underline">← Textbooks</Link>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl font-extrabold text-ink">{tile?.label ?? "Textbooks"}</h1>
        <div className="inline-flex gap-1 p-1 bg-cream-card rounded-full border border-border-subtle">
          {CLASSES.map((c) => (
            <button
              key={c}
              onClick={() => setClassLevel(c)}
              aria-pressed={classLevel === c}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                classLevel === c ? "bg-ink text-white" : "text-ink-light hover:text-ink"
              }`}
            >
              Class {c}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <p className="text-sm text-red-note">{error}</p>
      ) : !catalogue ? (
        <p className="text-sm text-ink-muted">Loading…</p>
      ) : chapters.length === 0 ? (
        <p className="text-sm text-ink-muted">No chapters here yet.</p>
      ) : (
        <ul className="divide-y divide-border-subtle bg-white rounded-2xl border border-border-subtle">
          {chapters.map((chapter, index) => {
            const ready = isChapterReady(subject, classLevel, chapter.name);
            const inner = (
              <>
                <span className="w-7 text-sm text-ink-muted tabular-nums">{index + 1}</span>
                <span className="flex-1 text-[0.95rem] text-ink">{chapter.name}</span>
                {ready ? (
                  <span className="text-orange-dark" aria-hidden>›</span>
                ) : (
                  <span className="text-xs font-bold text-ink-muted">Soon</span>
                )}
              </>
            );
            return (
              <li key={chapter.id}>
                {ready ? (
                  <Link
                    href={`/textbooks/read?subject=${subject}&class=${classLevel}&title=${encodeURIComponent(chapter.name)}`}
                    className="flex items-center gap-2 px-4 py-3.5 hover:bg-cream-light transition-colors"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-3.5 opacity-50" aria-disabled>
                    {inner}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
