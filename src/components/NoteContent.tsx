"use client";

import React from "react";
import { KaTeXRenderer } from "@/components/KaTeXRenderer";

/**
 * Renders a saved note's `content` as structured revision notes.
 *
 * The content contract (written by the API's note assembly, both the
 * gpt-4o-mini structured pass and the flat board fallback) is plain text
 * with exactly this vocabulary:
 *
 *   - Section headings on their own line, ALL CAPS ("PROJECTILE MOTION",
 *     "QUICK REVISION", "TIME OF FLIGHT AND MAXIMUM HEIGHT")
 *   - Bullet lines starting with "• "
 *   - Formulas alone on a line, in $...$ delimiters, LaTeX inside
 *   - Short mixed-case lines as sub-headings ("Formulas:", "Maximum Height (H)")
 *   - "NOT COVERED IN CLASS YET — SELF-STUDY" (structured) or the
 *     "——— class ended here …" marker (flat) separating class material
 *     from self-study material
 *
 * The page used to dump all of this into one whitespace-pre-wrap div, so
 * students saw raw "$u_x = u \cos \theta$" instead of a formula.
 */

const SELF_STUDY_HEADING = "NOT COVERED IN CLASS YET — SELF-STUDY";
const CLASS_END_MARKER_PREFIX = "——— class ended here";
const MISTAKES_HEADING = "FROM YOUR CLASS — WHAT TO REWORK";

interface Section {
  heading: string | null;
  lines: string[];
  selfStudy: boolean;
}

function isAllCapsHeading(line: string): boolean {
  // At least one letter, no lowercase letters anywhere, not a bullet or a
  // formula. Allows digits and punctuation: "QUICK REVISION", "PART 2 — RANGE".
  if (line.startsWith("•") || line.startsWith("$")) return false;
  if (!/[A-Z]/.test(line)) return false;
  return !/[a-z]/.test(line);
}

function isFormulaLine(line: string): boolean {
  return line.length > 2 && line.startsWith("$") && line.endsWith("$");
}

function isSubHeading(line: string): boolean {
  // "Formulas:", "Time of Flight (T)", "Maximum Height (H)" — short label
  // lines the structuring pass emits between bullet groups.
  return line.endsWith(":") ? line.length <= 64 : line.length <= 48;
}

function parseSections(content: string): Section[] {
  const sections: Section[] = [];
  let current: Section = { heading: null, lines: [], selfStudy: false };
  let inSelfStudy = false;

  const push = () => {
    if (current.heading !== null || current.lines.length > 0) sections.push(current);
  };

  for (const raw of content.split("\n")) {
    const line = raw.trim();
    if (!line) continue;

    if (line === SELF_STUDY_HEADING || line.startsWith(CLASS_END_MARKER_PREFIX)) {
      inSelfStudy = true;
      push();
      current = { heading: null, lines: [], selfStudy: true };
      continue;
    }

    if (isAllCapsHeading(line)) {
      push();
      current = { heading: line, lines: [], selfStudy: inSelfStudy };
      continue;
    }

    current.lines.push(line);
  }
  push();
  return sections;
}

function BodyLine({ line }: { line: string }) {
  if (isFormulaLine(line)) {
    // Formula on its own line → display-style math in a quiet card of its
    // own. $$…$$ puts KaTeXRenderer into display mode.
    return (
      <div className="my-2 px-4 py-2.5 bg-white border border-border-subtle rounded-[10px] overflow-x-auto">
        <KaTeXRenderer latex={`$$${line.slice(1, -1)}$$`} />
      </div>
    );
  }

  if (line.startsWith("•")) {
    const text = line.replace(/^•\s*/, "");
    return (
      <div className="flex gap-2.5 py-[3px]">
        <span className="flex-none w-[5px] h-[5px] rounded-full bg-orange-dark mt-[0.55rem]" aria-hidden />
        <div className="min-w-0 flex-1 text-[0.95rem] leading-[1.65] text-ink">
          <KaTeXRenderer latex={text} />
        </div>
      </div>
    );
  }

  if (isSubHeading(line)) {
    return (
      <div className="mt-4 mb-1 font-bold text-[0.9rem] text-ink">
        <KaTeXRenderer latex={line} />
      </div>
    );
  }

  // Plain prose (mostly the flat-board fallback format).
  return (
    <div className="py-[3px] text-[0.95rem] leading-[1.65] text-ink">
      <KaTeXRenderer latex={line} />
    </div>
  );
}

function SectionBlock({ section }: { section: Section }) {
  const isQuickRevision = section.heading === "QUICK REVISION";
  const isMistakes = section.heading === MISTAKES_HEADING;

  const body = (
    <>
      {section.heading && (
        <h2
          className={`font-extrabold text-[0.78rem] tracking-[0.1em] uppercase mb-2.5 ${
            isQuickRevision ? "text-orange-dark" : isMistakes ? "text-[#8E2317]" : "text-ink"
          }`}
        >
          {section.heading}
        </h2>
      )}
      {section.lines.map((line, idx) => (
        <BodyLine key={idx} line={line} />
      ))}
    </>
  );

  // QUICK REVISION is the exam-cram summary — set it apart so it's the block
  // a student's eye lands on when they open the note the night before a test.
  if (isQuickRevision) {
    return (
      <section className="mt-7 bg-orange/8 border border-orange/30 rounded-[12px] px-5 py-4">
        {body}
      </section>
    );
  }

  // The rework section is the student's OWN graded answers — same card
  // pattern, but in the verdict palette the Ask Sheet already uses for
  // "not quite", so "review this" reads differently from "memorize this".
  if (isMistakes) {
    return (
      <section className="mt-7 bg-[#FBEAE7]/45 border border-[#DD4433]/25 rounded-[12px] px-5 py-4">
        {body}
      </section>
    );
  }

  return <section className="mt-7 first:mt-0">{body}</section>;
}

export function NoteContent({ content }: { content: string }) {
  const sections = React.useMemo(() => parseSections(content), [content]);

  // A heading with no body is dead weight — the structured self-study half
  // re-states the topic heading ("PROJECTILE MOTION") directly under the
  // divider before its first real section, and the note title already says it.
  const rendered = sections.filter((s) => s.lines.length > 0);
  const classSections = rendered.filter((s) => !s.selfStudy);
  const selfStudySections = rendered.filter((s) => s.selfStudy);

  return (
    <div>
      {classSections.map((s, idx) => (
        <SectionBlock key={idx} section={s} />
      ))}

      {selfStudySections.length > 0 && (
        <>
          <div className="flex items-center gap-3 mt-9 mb-2" role="separator">
            <div className="flex-1 h-px bg-border-subtle" />
            <span className="flex-none font-extrabold text-[0.66rem] tracking-[0.1em] uppercase text-ink-muted border border-border-subtle rounded-full px-3 py-1">
              Self-study — not covered in class yet
            </span>
            <div className="flex-1 h-px bg-border-subtle" />
          </div>
          {selfStudySections.map((s, idx) => (
            <SectionBlock key={idx} section={s} />
          ))}
        </>
      )}
    </div>
  );
}
