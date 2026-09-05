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

type BlockKind = "lead" | "labelled" | "listitem" | "tail" | "table";

interface Block {
  kind: BlockKind;
  label?: string;
  body: string;
  rows?: string[][];
  hasHeader?: boolean;
}

// A markdown pipe table row: "| A. | Pyruvic acid | I. | Undergoes ... |".
// Match-the-following stems arrive from extraction as these, and without a
// table branch they fell through to `classify` as ordinary paragraphs, so the
// student read the raw pipes and the "| :--- |" separator as question text.
const TABLE_ROW = /^\s*\|(.+)\|\s*$/;
// The alignment row directly under a header: "| :--- | ---: | :-: |"
const TABLE_SEP = /^\s*\|[\s:|-]+\|\s*$/;

// Only a `|` OUTSIDE any $...$ span is a real cell boundary. Absolute-value
// notation inside math ("$\left|1-z_1\right|\left|1-z_2\right|$", or the
// bare-escape idiom "$\|x\|$") is never a delimiter, but a plain .split("|")
// cut through both forms — measured live: a 4-column row whose one cell held
// three `\left|...\right|` pairs split into 10 pieces instead of 4, so that
// row's data landed under the wrong header and the table looked ragged next
// to its neighbours. `\left|` doesn't have a backslash directly before the
// pipe (the backslash is on "left"), so escaping only a literal `\|` was not
// enough — the general fix is to track math-span state across the whole cell
// string and ignore every pipe seen while inside one, regardless of form.
function splitRow(line: string): string[] {
  const m = line.match(TABLE_ROW);
  if (!m) return [];
  const inner = m[1];
  const cells: string[] = [];
  let current = "";
  let inMath = false;
  for (let i = 0; i < inner.length; i += 1) {
    const ch = inner[i];
    if (ch === "$") inMath = !inMath;
    if (ch === "|" && !inMath) {
      cells.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  cells.push(current.trim());
  return cells;
}

// "Assertion (A) :", "Reason (R):", "Statement I :", "Column - I"
// No /s flag: the splitter feeds this one line at a time, and `.` already
// matches everything in a line. (/s needs an es2018 target this build predates.)
const LABELLED = /^\s*((?:assertion|reason|statement|column)\s*[-–—]?\s*(?:\([A-Za-z]\)|[IVX]+|[A-D])?)\s*[:.]\s*(.*)$/i;
// "(1) benzene", "1) benzene", "A. sodium", "(i) ..." — list rows inside a stem.
// Letters run to H, not D: a five- or six-item statement list is common, and
// with [A-D] the tail items ("e) Water vascular system") matched nothing and
// reached the student as an unstyled paragraph while a)-d) carried badges.
const LISTITEM = /^\s*\(?([0-9]{1,2}|[ivx]{1,4}|[A-H])\)[.\s]\s*(.+)$/i;
// A second list marker sitting INSIDE a row's body — "a) Spongocoel b) Choanocytes".
// PDF two-column lists extract onto one line, so splitting on newlines alone
// swallowed every even-numbered item into the odd one before it.
// The leading \s is required: it keeps "f(x) is" and "(0, 1) and" intact,
// because there the character before the marker is "(" or a digit, not a space.
const INLINE_ITEM = /\s+(?=\(?[0-9]{1,2}\)\s|\(?[a-hA-H]\)\s|\(?[ivxIVX]{1,4}\)\s)/g;
// A whole line that is nothing but a marker: "A.", "(i)", "3)".
const LONE_MARKER = /^\s*\(?(?:[0-9]{1,2}|[ivxIVX]{1,4}|[A-Ha-h])[).]\s*$/;
// closing instruction lines
const TAIL = /^\s*(choose|select|identify|in the light of|given below|match the|the correct answer is|which of the)\b/i;

function classify(line: string): Block | null {
  const raw = line.trim();
  if (!raw) return null;

  const labelled = raw.match(LABELLED);
  // Require real body content. "Match Column I with Column II." is prose that
  // NAMES the columns, not a label introducing content — but INLINE_LABEL still
  // breaks a line before "Column II." because it ends in a period, and without
  // this guard that orphan line rendered as an empty, content-free orange card
  // sitting right above the actual table. An empty match falls through to the
  // plain-paragraph branches below instead, so the sentence just reads as text.
  if (labelled && labelled[2] !== undefined && labelled[2].trim().length > 0) {
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
  const rawLines = withBreaks.split(/\r?\n/);

  // Extraction often strands a list marker on its own line:
  //   "A. \nRestriction enzymes \nB. \nPolymerase enzymes"
  // Neither half matches LISTITEM on its own (the marker has no body, the body
  // has no marker), so both fell through as plain paragraphs and the student
  // read a column of naked letters above their own items. Re-join a lone
  // marker with the next non-empty line before anything else looks at them.
  const lines: string[] = [];
  for (let i = 0; i < rawLines.length; i += 1) {
    if (LONE_MARKER.test(rawLines[i])) {
      let j = i + 1;
      while (j < rawLines.length && !rawLines[j].trim()) j += 1;
      if (j < rawLines.length && !LONE_MARKER.test(rawLines[j])) {
        lines.push(`${rawLines[i].trim()} ${rawLines[j].trim()}`);
        i = j;
        continue;
      }
    }
    lines.push(rawLines[i]);
  }

  const blocks: Block[] = [];
  for (let i = 0; i < lines.length; i += 1) {
    // Consecutive pipe rows form one table. Consume the whole run here so the
    // rows never reach `classify`, which would render them as raw text.
    if (TABLE_ROW.test(lines[i]) && !TABLE_SEP.test(lines[i])) {
      const rows: string[][] = [];
      let hasHeader = false;
      let j = i;
      while (j < lines.length && TABLE_ROW.test(lines[j])) {
        if (TABLE_SEP.test(lines[j])) {
          // A separator immediately after the first row marks it as a header.
          if (rows.length === 1) hasHeader = true;
        } else {
          rows.push(splitRow(lines[j]));
        }
        j += 1;
      }
      // A single stray pipe line is not a table; let it fall through as prose.
      if (rows.length >= 2) {
        blocks.push({ kind: "table", body: "", rows, hasHeader });
        i = j - 1;
        continue;
      }
    }
    // A line that IS a list row may carry further rows inline. Split it and
    // classify each piece, so "a) X b) Y" becomes two badged items rather than
    // one item whose body still shows "b) Y" as raw text. Only list rows are
    // split, so ordinary prose containing a stray "c)" is left alone.
    if (LISTITEM.test(lines[i])) {
      const parts = lines[i].split(INLINE_ITEM).filter((p) => p.trim());
      const labels = parts.map((p) => p.match(LISTITEM)?.[1]?.toUpperCase());
      // Every piece must be a list row AND the markers must be distinct. The
      // distinctness check is what protects an interval: "1) The set (0, 1) is
      // open" splits at the "1)" inside (0, 1) and yields labels 1 and 1, so it
      // is rejected and the line stays whole. A real list reads a, b, c.
      const distinct =
        labels.every(Boolean) && new Set(labels).size === labels.length;
      if (parts.length > 1 && parts.every((p) => LISTITEM.test(p)) && distinct) {
        for (const p of parts) {
          const pb = classify(p);
          if (pb) blocks.push(pb);
        }
        continue;
      }
    }
    const b = classify(lines[i]);
    if (b) blocks.push(b);
  }
  return blocks;
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
  const hasStructure = blocks.some(
    (b) => b.kind === "labelled" || b.kind === "listitem" || b.kind === "table"
  );
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
        if (b.kind === "table" && b.rows?.length) {
          const rows = b.rows;
          const head = b.hasHeader ? rows[0] : null;
          const body = b.hasHeader ? rows.slice(1) : rows;
          // Overflow lives on the wrapper, not the table: a wide match-table
          // must scroll inside its own box rather than push the page sideways.
          return (
            <div key={i} className="overflow-x-auto rounded-xl border border-border-subtle">
              <table className="w-full border-collapse text-[0.9rem] md:text-[0.95rem]">
                {head && (
                  <thead>
                    <tr className="bg-[#FBF8EF]">
                      {head.map((c, k) => (
                        <th
                          key={k}
                          className="text-left font-extrabold text-ink px-3 py-2 border-b border-border-subtle align-top"
                        >
                          <MathText content={c} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                )}
                <tbody>
                  {body.map((r, ri) => (
                    <tr key={ri} className={ri % 2 ? "bg-black/[0.02]" : undefined}>
                      {r.map((c, ci) => (
                        <td
                          key={ci}
                          className="px-3 py-2 align-top border-b border-border-subtle/60 last:border-r-0"
                        >
                          <MathText content={c} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

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
