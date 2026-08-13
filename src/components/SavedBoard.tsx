"use client";

import React from "react";
import { BoardEvent } from "@/components/BoardEvent";
import { MathText } from "@/components/MathText";
import type { NoteSegment } from "@/lib/notes";
import type { DoubtOption, Remedy, SolutionStep } from "@/lib/doubts";

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
        <ol className="flex flex-col gap-5 mb-5">
          {steps.map((step, idx) => (
            <li key={step.n ?? idx} className="flex gap-3.5 items-start">
              <span className="mt-0.5 w-6 h-6 flex-none rounded-full bg-ink/[0.04] border border-border-subtle grid place-items-center font-bold text-[0.68rem] text-ink-light">
                {step.n ?? idx + 1}
              </span>
              <span className="flex-1 min-w-0 text-[0.98rem] leading-[1.75] text-ink-light">
                <MathText content={step.text} />
              </span>
            </li>
          ))}
        </ol>
      )}

      {answer && (
        <div className="rounded-xl bg-[rgba(28,155,87,0.06)] border border-[rgba(28,155,87,0.3)] px-4.5 py-3.5">
          <span className="block font-extrabold text-[0.6rem] tracking-[0.14em] uppercase text-[#157A45]/70 mb-1">
            Answer
          </span>
          <p className="text-[1.05rem] leading-[1.6] font-bold text-[#157A45]">
            <MathText content={answer} />
          </p>
        </div>
      )}

      {keyIdea && (
        <p className="font-script font-bold text-red-note text-[1rem] leading-[1.5] mt-4.5">
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
/**
 * The left panel of a snapped doubt: ruled paper, red margin rule, a
 * `Q · Subject · Chapter` tag, the stem, and — when the pipeline captured them
 * as structured data — the options as a clean list rather than run into the
 * stem as one paragraph.
 *
 * `stem`/`options` are only present on doubts solved after migration 0015; a
 * doubt saved before that (or a legacy row) falls back to `questionText`,
 * which is stem and options concatenated as the pipeline always produced for
 * display — still correct, just one paragraph instead of a structured list.
 */
export function QuestionSheet({
  questionText,
  subject,
  topic,
  stem,
  options,
}: {
  questionText: string | null;
  subject: string | null;
  topic: string | null;
  stem?: string | null;
  options?: DoubtOption[] | null;
}) {
  const tag = ["Q", subject, topic].filter(Boolean).join(" · ");
  const hasStructure = Boolean(stem) && (options?.length ?? 0) > 0;

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

      {hasStructure ? (
        <>
          <p className="mt-2 leading-[1.6] text-[0.96rem] text-ink">
            <MathText content={stem} />
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-3.5">
            {options!.map((opt) => (
              <div key={opt.label} className="flex gap-2 items-baseline min-w-0">
                <span className="flex-none font-bold text-[0.86rem] text-ink-muted">
                  ({opt.label})
                </span>
                <span className="flex-1 min-w-0 text-[0.92rem] leading-[1.5] text-ink">
                  <MathText content={opt.text} />
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="mt-1.5 leading-[1.5] text-[0.96rem] text-ink">
          <MathText content={questionText} />
        </p>
      )}
    </div>
  );
}


/**
 * A refusal, shown as the ACTION the student can take rather than one generic
 * error. "Upload a better photo" is right for a blurry image and wrong for a
 * question we read perfectly and still could not answer — sending them back to
 * retake that is a loop they cannot win.
 */
export function RefusalCard({
  message,
  remedy = "our_side",
  teacher,
  onRetake,
  onAskInSession,
}: {
  message: string;
  remedy?: Remedy;
  teacher: string;
  onRetake?: () => void;
  onAskInSession?: () => void;
}) {
  const copy = {
    retake: {
      title: "That photo needs another go",
      tone: "amber" as const,
      action: onRetake && { label: "↺ Retake the photo", fn: onRetake, primary: true },
    },
    not_photo: {
      title: "This one needs the board",
      tone: "amber" as const,
      action: onAskInSession && {
        label: `Ask ${teacher} in a session →`, fn: onAskInSession, primary: true,
      },
    },
    our_side: {
      title: `${teacher} couldn't answer this one`,
      tone: "red" as const,
      action: onAskInSession && {
        label: `Ask ${teacher} in a session →`, fn: onAskInSession, primary: true,
      },
    },
  }[remedy];

  const amber = copy.tone === "amber";
  return (
    <div
      className={`rounded-2xl p-5 border ${
        amber
          ? "bg-[rgba(238,163,31,0.08)] border-[rgba(238,163,31,0.4)]"
          : "bg-[rgba(221,68,51,0.05)] border-[rgba(221,68,51,0.3)]"
      }`}
    >
      <b className={`block font-bold text-[0.95rem] mb-1 ${amber ? "text-orange-dark" : "text-red-dark"}`}>
        {copy.title}
      </b>
      <p className="text-[0.88rem] text-ink-light leading-relaxed">{message}</p>

      {/* Only offered when retaking can actually change the outcome. */}
      {copy.action && (
        <button
          onClick={copy.action.fn}
          className="mt-3.5 inline-flex items-center gap-2 font-semibold text-[0.86rem] py-2.5 px-4 rounded-full border-[1.4px] border-[rgba(28,26,22,0.14)] bg-white text-ink cursor-pointer hover:border-ink transition-colors"
        >
          {copy.action.label}
        </button>
      )}
    </div>
  );
}

/**
 * An answer Monk worked out but will not state, because it disagreed with the
 * answer printed on the page. The working is still worth reading — the answer
 * is the part we cannot vouch for.
 */
export function UnsureCard({
  reason,
  steps,
  keyIdea,
  teacher,
}: {
  reason: string | null;
  steps: SolutionStep[];
  keyIdea: string | null;
  teacher: string;
}) {
  return (
    <div className="flex flex-col gap-3.5">
      <div className="rounded-2xl p-4 bg-[rgba(238,163,31,0.08)] border border-[rgba(238,163,31,0.4)]">
        <b className="block font-bold text-[0.92rem] text-orange-dark mb-1">
          {teacher} might be unsure of this one
        </b>
        <p className="text-[0.86rem] text-ink-light leading-relaxed">
          {reason ||
            `${teacher}'s working disagrees with the answer printed on the page, so it is not stating one it might have wrong.`}
        </p>
      </div>
      <RuledSheet label={`${teacher.toUpperCase()}'S WORKING`}>
        <Solution answer={null} steps={steps} keyIdea={keyIdea} />
      </RuledSheet>
    </div>
  );
}
