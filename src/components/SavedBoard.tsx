"use client";

import React from "react";
import { BoardEvent } from "@/components/BoardEvent";
import { MathText } from "@/components/MathText";
import type { NoteSegment } from "@/lib/notes";
import type { SolutionStep } from "@/lib/doubts";

/**
 * A saved note's board, rendered through the same BoardEvent components the
 * live session used — so a note looks like the board the student sat in front
 * of, not a transcript of it.
 */
export function SavedBoard({ segments }: { segments: NoteSegment[] }) {
  if (!segments?.length) {
    return <p className="text-[0.9rem] text-ink-light">This note has no board items.</p>;
  }

  return (
    <div className="flex flex-col">
      {segments.map((segment, segmentIdx) => (
        <section key={segment.segment_index} className={segmentIdx > 0 ? "mt-7" : ""}>
          <h5
            className="font-script font-bold text-[1.2rem] text-red-note mb-3"
            style={{ transform: "rotate(-0.4deg)" }}
          >
            {segment.segment_title}
          </h5>
          {segment.items.map((item, itemIdx) => (
            <BoardEvent key={item.seq ?? `${segment.segment_index}-${itemIdx}`} event={item} />
          ))}
        </section>
      ))}
    </div>
  );
}

/**
 * A snapped doubt's solution: numbered steps, the answer set apart in green,
 * and the key idea in handwritten red.
 *
 * Every piece of maths here goes through MathText — the same renderer the
 * question panel uses. Splitting the two panels across separate renderers is
 * what produced raw `\(\frac{...}\)` on screen, so there is exactly one.
 */
export function Solution({
  answer,
  steps,
  keyIdea,
}: {
  answer: string | null;
  steps: SolutionStep[];
  keyIdea: string | null;
}) {
  return (
    <div className="flex flex-col">
      {steps?.length > 0 && (
        <ol className="flex flex-col gap-2.5 mb-3.5">
          {steps.map((step, idx) => (
            <li key={step.n ?? idx} className="flex gap-2.5 items-start">
              <span className="mt-0.5 w-[19px] h-[19px] flex-none rounded-full bg-ink/5 border border-border-subtle grid place-items-center font-bold text-[0.62rem] text-ink-light">
                {step.n ?? idx + 1}
              </span>
              <span className="flex-1 min-w-0 text-[0.94rem] leading-[1.55] text-ink-light">
                <MathText content={step.text} />
              </span>
            </li>
          ))}
        </ol>
      )}

      {answer && (
        <p className="text-[1rem] leading-[1.5] font-bold text-[#157A45] bg-[rgba(28,155,87,0.08)] border border-[rgba(28,155,87,0.3)] rounded-xl px-3.5 py-2.5">
          <MathText content={answer} />
        </p>
      )}

      {keyIdea && (
        <p className="font-script font-bold text-red-note text-[0.95rem] mt-3.5">
          <MathText content={keyIdea} />
        </p>
      )}
    </div>
  );
}

/**
 * The ruled paper sheet the design puts a saved board or a solution on:
 * notebook lines, a red margin rule, and an amber tab naming what it is.
 */
export function RuledSheet({
  label,
  children,
  className = "",
  minHeight,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  minHeight?: string;
}) {
  return (
    <div
      className={`relative bg-white border-[1.5px] border-ink rounded-[16px] pt-6 pr-6 pb-6 pl-11 shadow-[0_16px_36px_-26px_rgba(28,26,22,0.5)] ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(transparent 0 28px, rgba(28,26,22,0.055) 28px 29px)",
        minHeight,
      }}
    >
      <span className="absolute top-0 bottom-0 left-[26px] w-[1.5px] bg-[rgba(221,68,51,0.35)]" />
      <span className="absolute -top-[11px] left-4 bg-orange border-[1.5px] border-ink rounded-[6px] font-extrabold text-[0.6rem] tracking-[0.12em] py-0.5 px-2.5 text-ink">
        {label}
      </span>
      {children}
    </div>
  );
}

/**
 * The left panel of a snapped doubt: ruled paper, red margin rule, a
 * `Q · Subject · Topic` tag in red caps, and the transcribed question rendered
 * through MathText.
 */
export function QuestionSheet({
  questionText,
  subject,
  topic,
}: {
  questionText: string | null;
  subject: string | null;
  topic: string | null;
}) {
  const tag = ["Q", subject, topic].filter(Boolean).join(" · ");
  return (
    <div
      className="relative border border-[rgba(28,26,22,0.1)] rounded-xl py-4 pr-4 pl-9"
      style={{
        backgroundColor: "#FFFEFB",
        backgroundImage:
          "repeating-linear-gradient(transparent 0 25px, rgba(28,26,22,0.06) 25px 26px)",
      }}
    >
      <span className="absolute top-3 bottom-3 left-6 w-[1.4px] bg-[rgba(221,68,51,0.4)]" />
      <span className="font-extrabold text-[0.6rem] tracking-[0.1em] uppercase text-[#C53A2B]">
        {tag}
      </span>
      <p className="mt-1.5 leading-[1.5] text-[0.96rem] text-ink">
        <MathText content={questionText} />
      </p>
    </div>
  );
}
