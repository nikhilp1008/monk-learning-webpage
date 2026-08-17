"use client";

import React, { useMemo } from "react";
import { MathText } from "./MathText";

/**
 * Renders a question stem with its exam structure intact.
 *
 * Stems arrive from PDF extraction carrying real structure in their line
 * breaks — Assertion/Reason pairs, numbered statement lists, Column I/II
 * match tables, "choose the correct option" tails. Rendering the raw string
 * in one <div> collapsed all of it into a single run-on paragraph, so a
 * student read an Assertion/Reason item as prose and had to re-parse it by
 * eye. Whitespace alone is not enough either: the labels carry meaning and
 * deserve to be visually distinct from the sentence they introduce.
 *
 * Blocks are classified by their leading label and rendered per kind. Any
 * line that matches nothing is a plain paragraph, so an ordinary one-line
 * stem is unchanged.
 */

type BlockKind = "lead" | "labelled" | "listitem" | "tail";

interface Block {
  kind: BlockKind;
  label?: string;
  body: string;
}

// "Assertion (A) :", "Reason (R):", "Statement I :", "Column - I"
// No /s flag: the splitter feeds this one line at a time, and `.` already
// matches everything in a line. (/s needs an es2018 target this build predates.)
const LABELLED = /^\s*((?:assertion|reason|statement|column)\s*[-–—]?\s*(?:\([A-Za-z]\)|[IVX]+|[A-D])?)\s*[:.]\s*(.*)$/i;
// "(1) benzene", "1) benzene", "A. sodium", "(i) ..." — list rows inside a stem
const LISTITEM = /^\s*\(?([0-9]{1,2}|[ivx]{1,4}|[A-D])\)[.\s]\s*(.+)$/i;
// closing instruction lines
const TAIL = /^\s*(choose|select|identify|in the light of|given below|match the|the correct answer is|which of the)\b/i;

function classify(line: string): Block | null {
  const raw = line.trim();
  if (!raw) return null;

  const labelled = raw.match(LABELLED);
  if (labelled && labelled[2] !== undefined) {
    return { kind: "labelled", label: labelled[1].replace(/\s+/g, " ").trim(), body: labelled[2].trim() };
  }

  const item = raw.match(LISTITEM);
  // Guard: a stem beginning "1) " is a list row, but "(1990) was the year" is
  // not — require the body to look like content rather than a bare number.
  if (item && item[2] && item[2].trim().length > 1) {
    return { kind: "listitem", label: item[1].toUpperCase(), body: item[2].trim() };
  }

  if (TAIL.test(raw)) return { kind: "tail", body: raw };
  return { kind: "lead", body: raw };
}

// Many stems put the whole pair on ONE line — "Assertion (A): ... Reason (R):
// ..." with no break between them — which is the very case that reads as a
// paragraph. Splitting on newlines alone swallowed the Reason into the
// Assertion's body, so a break is inserted before any label that appears
// mid-line. Anchored to a preceding sentence end or the labels' own
// punctuation so the word "reason" inside ordinary prose is left alone.
const INLINE_LABEL = /(?<=[.;:)\s])((?:Assertion|Reason|Statement|Column)\s*[-–—]?\s*(?:\([A-Za-z]\)|[IVX]+|[A-D])?\s*[:.])/g;

function parseStem(text: string): Block[] {
  // Split on newlines (plus the inserted inline-label breaks). Splitting on
  // sentence ends generally would shatter ordinary multi-sentence prose into
  // fragments, which is worse than the run-on paragraph this component fixes.
  const withBreaks = text.replace(INLINE_LABEL, "\n$1");
  return withBreaks
    .split(/\r?\n/)
    .map(classify)
    .filter((b): b is Block => b !== null);
}

export function QuestionStem({ content }: { content?: string | null }) {
  const blocks = useMemo(
    () => (typeof content === "string" ? parseStem(content) : []),
    [content]
  );

  if (!blocks.length) {
    return (
      <div className="text-base md:text-lg text-ink font-medium leading-relaxed overflow-x-auto">
        <MathText content={content} />
      </div>
    );
  }

  // A stem with no structural blocks renders as one flowing paragraph, which
  // is correct for the ordinary case and avoids gratuitous vertical gaps.
  const hasStructure = blocks.some((b) => b.kind === "labelled" || b.kind === "listitem");
  if (!hasStructure) {
    return (
      <div className="text-base md:text-lg text-ink font-medium leading-relaxed overflow-x-auto whitespace-pre-line">
        <MathText content={content} />
      </div>
    );
  }

  return (
    <div className="space-y-3 text-base md:text-lg text-ink font-medium leading-relaxed">
      {blocks.map((b, i) => {
        if (b.kind === "labelled") {
          return (
            <div
              key={i}
              className="rounded-xl border border-border-subtle bg-[#FBF8EF] px-4 py-3 overflow-x-auto"
            >
              <span className="block font-extrabold text-[0.62rem] tracking-[0.12em] uppercase text-orange mb-1">
                {b.label}
              </span>
              <span className="block text-[0.95rem] md:text-base text-ink">
                <MathText content={b.body} />
              </span>
            </div>
          );
        }

        if (b.kind === "listitem") {
          return (
            <div key={i} className="flex gap-3 pl-1 overflow-x-auto">
              <span className="flex-none w-6 h-6 mt-0.5 rounded-md bg-ink/5 text-ink-muted grid place-items-center font-bold text-[0.65rem]">
                {b.label}
              </span>
              <span className="min-w-0 text-[0.95rem] md:text-base">
                <MathText content={b.body} />
              </span>
            </div>
          );
        }

        if (b.kind === "tail") {
          return (
            <p key={i} className="text-[0.9rem] md:text-base text-ink-light italic overflow-x-auto">
              <MathText content={b.body} />
            </p>
          );
        }

        return (
          <p key={i} className="overflow-x-auto">
            <MathText content={b.body} />
          </p>
        );
      })}
    </div>
  );
}
