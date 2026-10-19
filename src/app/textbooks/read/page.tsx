"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BlockState, EMPTY_BLOCK_STATE, TextbookBlock } from "@/components/textbook/blocks";
import { Chapter, groupBlocks, loadChapter } from "@/lib/textbooks";
import {
  READING_SIZE_KEY,
  READING_SIZE_LABEL,
  nextReadingSize,
  parseReadingSize,
  readingMultiplier,
  type ReadingSize,
} from "@/lib/reading-size";

/**
 * The chapter reader. A chapter is a list of topics; each topic is a list of
 * blocks (hook, definition, formula, derivation, figure, solved examples, MCQs,
 * practice...) rendered by TextbookBlock -- the reader itself has no
 * chapter-specific code. Chapter content is a dynamic import per chapter, so
 * opening one downloads that chapter only.
 *
 * Block state (revealed hooks, picked MCQ options, carousel pages) lives here,
 * above the topic, so it survives moving between topics and back.
 */

const scale = (n: number) => n;

function Reader() {
  const params = useSearchParams();
  const subject = (params.get("subject") ?? "").toLowerCase();
  const classLevel = Number(params.get("class") ?? 11);
  const title = params.get("title") ?? "";

  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [missing, setMissing] = useState(false);
  const [active, setActive] = useState(0);
  const [state, setState] = useState<BlockState>(EMPTY_BLOCK_STATE);
  // Read at first client render. The reader body only renders once the chapter
  // has loaded (client-side), so the server-rendered loading state never
  // disagrees with this.
  const [size, setSize] = useState<ReadingSize>(() => {
    if (typeof window === "undefined") return "medium";
    try {
      return parseReadingSize(window.localStorage.getItem(READING_SIZE_KEY));
    } catch {
      return "medium";
    }
  });
  const topRef = useRef<HTMLDivElement>(null);

  const cycleSize = () => {
    const next = nextReadingSize(size);
    setSize(next);
    try {
      window.localStorage.setItem(READING_SIZE_KEY, next);
    } catch {
      /* not persisted */
    }
  };
  const type = useCallback((n: number) => n * readingMultiplier(size), [size]);

  useEffect(() => {
    let cancelled = false;
    loadChapter(subject, classLevel, title)
      .then((data) => {
        if (cancelled) return;
        if (!data) setMissing(true);
        else setChapter(data);
      })
      .catch(() => !cancelled && setMissing(true));
    return () => {
      cancelled = true;
    };
  }, [subject, classLevel, title]);

  const set = useCallback(
    <K extends keyof BlockState>(key: K, id: string, value: BlockState[K][string]) => {
      setState((prev) => ({ ...prev, [key]: { ...prev[key], [id]: value } }));
    },
    []
  );

  const goTo = useCallback((index: number) => {
    setActive(index);
    topRef.current?.scrollIntoView({ block: "start" });
  }, []);

  const topic = chapter?.topics[active];
  const blocks = useMemo(() => (topic ? groupBlocks(topic.blocks) : []), [topic]);

  // Arrow keys move between topics, unless the student is typing.
  useEffect(() => {
    if (!chapter) return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight") setActive((a) => Math.min(chapter.topics.length - 1, a + 1));
      if (e.key === "ArrowLeft") setActive((a) => Math.max(0, a - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [chapter]);

  const back = `/textbooks/${subject || ""}`;

  if (missing) {
    return (
      <main className="max-w-md mx-auto px-4 py-24 text-center space-y-3">
        <h1 className="text-xl font-extrabold text-ink">Not written yet</h1>
        <p className="text-sm text-ink-light">This chapter is on the way. Try another one for now.</p>
        <Link href={back} className="inline-block px-5 py-2.5 rounded-full bg-ink text-white text-sm font-bold">
          Back to chapters
        </Link>
      </main>
    );
  }
  if (!chapter || !topic) {
    return <main className="max-w-md mx-auto px-4 py-24 text-center text-ink-muted">Opening the chapter…</main>;
  }

  const atFirst = active === 0;
  const atLast = active === chapter.topics.length - 1;

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between gap-3 mb-5">
        <Link href={back} className="text-sm text-ink-light underline">← Chapters</Link>
        <p className="flex-1 min-w-0 text-center text-sm font-bold text-ink truncate">{chapter.title}</p>
        <button
          onClick={cycleSize}
          className="text-xs font-bold px-3 py-1.5 rounded-full border border-border-subtle text-ink-light hover:text-ink"
          aria-label={`Text size: ${READING_SIZE_LABEL[size]}. Change`}
        >
          Aa · {size}
        </button>
      </div>

      <div className="grid md:grid-cols-[220px_1fr] gap-8">
        <nav aria-label="Topics" className="hidden md:block">
          <ol className="sticky top-20 space-y-1">
            {chapter.topics.map((t, i) => (
              <li key={t.n}>
                <button
                  onClick={() => goTo(i)}
                  aria-current={i === active}
                  className={`w-full text-left flex gap-2 rounded-xl px-3 py-2 text-sm transition-colors ${
                    i === active ? "bg-cream-card text-ink font-bold" : "text-ink-light hover:text-ink"
                  }`}
                >
                  <span className="tabular-nums text-ink-muted">{t.n}</span>
                  <span>{t.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <article className="min-w-0 max-w-[680px]">
          <div ref={topRef} className="scroll-mt-20" />
          <h1
            className="font-extrabold text-ink mb-5"
            style={{ fontSize: type(25), lineHeight: `${type(30)}px` }}
          >
            {topic.title}
          </h1>
          <div className="space-y-4">
            {blocks.map((block, index) => (
              <TextbookBlock
                key={`${active}-${index}`}
                block={block}
                ctx={{ uid: `${active}-${index}`, scale, type, state, set, topicNumber: topic.n }}
              />
            ))}
          </div>

          <div className="flex items-center justify-between mt-10 pt-4 border-t border-border-subtle">
            <button
              onClick={() => goTo(active - 1)}
              disabled={atFirst}
              className="px-4 py-2 rounded-full border border-border-subtle text-sm font-bold text-ink disabled:opacity-30"
            >
              ← Previous
            </button>
            <span className="text-xs text-ink-muted tabular-nums">
              {active + 1} / {chapter.topics.length}
            </span>
            {atLast ? (
              <Link href={back} className="px-4 py-2 rounded-full bg-orange text-ink text-sm font-bold">
                Finish
              </Link>
            ) : (
              <button
                onClick={() => goTo(active + 1)}
                className="px-4 py-2 rounded-full bg-orange text-ink text-sm font-bold"
              >
                Next topic →
              </button>
            )}
          </div>
        </article>
      </div>
    </main>
  );
}

export default function TextbookReaderPage() {
  return (
    <Suspense fallback={<main className="max-w-md mx-auto px-4 py-24 text-center text-ink-muted">Opening the chapter…</main>}>
      <Reader />
    </Suspense>
  );
}
