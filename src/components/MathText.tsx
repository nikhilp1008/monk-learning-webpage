"use client";

import React, { useMemo } from "react";
import katex from "@/lib/katex-setup";
import { SmilesStructure } from "./SmilesStructure";

interface MathTextProps {
  content?: string | null;
  className?: string;
}

// A molecule the OCR converted from a structure drawn on the page. Split out
// BEFORE any LaTeX handling below: a SMILES string is chemistry, not maths,
// and the normalisers would happily mangle "CC=CC(C)O" — the parentheses and
// the "=" are exactly what the undelimited-expression sweep looks for.
const SMILES_SPLIT_RE = /(<smiles>[\s\S]*?<\/smiles>)/g;
const SMILES_BODY_RE = /^<smiles>([\s\S]*?)<\/smiles>$/;

export function MathText({ content, className = "" }: MathTextProps) {
  const renderedElements = useMemo(() => {
    if (!content) return null;

    // Defence in depth. A caller passing a non-string -- an object column such
    // as `questions.solution`, a number -- used to reach .replace below, throw,
    // and unmount the whole route through the error boundary. Rendering
    // nothing is always preferable to taking the page down.
    if (typeof content !== "string") {
      if (process.env.NODE_ENV !== "production") {
        console.error("MathText: expected a string, received", typeof content, content);
      }
      return null;
    }

    const renderMathString = (tex: string, displayMode: boolean): React.ReactNode => {
      try {
        const html = katex.renderToString(tex, {
          displayMode,
          throwOnError: false, // Malformed LaTeX degrades gracefully to text
        });
        // A display block wider than the viewport must scroll, not clip. The
        // scroll container has to be block-level: overflow-x and max-width have
        // no effect on an inline element, so putting these classes on the outer
        // inline span below is inert (measured: still clipped at 380px).
        // Scoping it to the equation also means only the equation scrolls,
        // rather than the whole stem.
        if (displayMode) {
          return (
            <span
              className="block overflow-x-auto max-w-full"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }
        return <span dangerouslySetInnerHTML={{ __html: html }} />;
      } catch {
        return <span>{tex}</span>;
      }
    };

    const renderSegment = (segment: string): React.ReactNode[] => {
    let processedContent = segment;

    // Normalise LaTeX bracket delimiters to dollar form BEFORE anything else.
    // The splitter below only recognises $...$ and $$...$$, so \(...\) and \[...\]
    // previously fell through and reached the student as raw LaTeX source.
    // Display form \[...\] is converted first so it cannot be eaten by the inline rule.
    processedContent = processedContent
      .replace(/\\\[([\s\S]+?)\\\]/g, (_match, body) => `$$${body}$$`)
      .replace(/\\\(([\s\S]+?)\\\)/g, (_match, body) => `$${body}$`);

    // Brace multi-character super/subscripts.
    //
    // A caret takes exactly ONE token in LaTeX, so "MLT^-2" means "MLT^{-}2" —
    // the minus is raised and the 2 falls back to the baseline, giving MLT⁻2
    // instead of MLT⁻². The model writes the plain form because that is how a
    // student types it, so normalise rather than expecting LaTeX discipline.
    // Already-braced forms are skipped by requiring a non-brace first char.
    //
    // The trailing ^ and _ in the lookahead are what keep chemistry working.
    // "C^-Na^+" is VALID and means C⁻Na⁺ — two bases, one script each. Without
    // them this rule swallowed "-Na" as one superscript body, producing
    // "C^{-Na}^+": two superscripts on the same C, which is a KaTeX error, so
    // a correct ionic equation reached the student as red source text. Same for
    // "C_3H_4" -> "C_{3H}_4". A charge sign followed by another script belongs
    // to the atom before it, not to the token after it.
    processedContent = processedContent.replace(
      /([\^_])(-?[A-Za-z0-9]{2,}|-[A-Za-z0-9])(?![A-Za-z0-9}^_])/g,
      (_m, op: string, body: string) => `${op}{${body}}`
    );

    // Safety net for double scripts from any other source — the solver's own
    // output included. "x^{a}^{b}" is a hard KaTeX error that renders as red
    // source; an empty group between them is the standard LaTeX fix and keeps
    // both scripts visible. Runs until stable so triples are covered too.
    for (let pass = 0; pass < 3; pass += 1) {
      const repaired = processedContent.replace(
        /([_^])(\{[^{}]*\}|[A-Za-z0-9])(?=\s*\1)/g,
        (_m, op: string, body: string) => `${op}${body}{}`
      );
      if (repaired === processedContent) break;
      processedContent = repaired;
    }

    // Detect undelimited LaTeX expressions (e.g. \text{...}, \frac{...}, \, \mu, etc.)
    // `let`, not `const`: the whole-expression wrap below can introduce
    // delimiters, and the sweep after it must see that. Left stale, the sweep
    // re-processed content it had just wrapped and nested the dollars, which
    // silently un-rendered every chip it had only just fixed.
    let hasDelimiters = processedContent.includes("$") || processedContent.includes("\\(");
    const hasLatexCmds = /\\(?:text|frac|,|pm|mu|theta|alpha|beta|sigma|omega|pi|infty|circ|text\{|[a-zA-Z]+)|\^[^{}\s]+|_[^{}\s]+/.test(processedContent);

    // A wrap is only ever kept when KaTeX can actually parse the fragment.
    // Without this gate the segment regex below, which cuts on braces, slices
    // nested expressions mid-command: "E^{ \text{o}}_{Pb^{4+}}" gets cut after
    // the first closing brace, leaving the unbalanced "E^{ \text{o}", which
    // KaTeX paints as a red error. Measured on the live pool, that turned
    // readable-but-unstyled text into visible errors on several rows.
    const wrapsCleanly = (tex: string): boolean => {
      try {
        katex.renderToString(tex, { throwOnError: true });
        return true;
      } catch {
        return false;
      }
    };

    // A whole line that IS one expression: "x^3 + 2x + C", "[MLT^-2]", "v^2/r".
    //
    // Checkpoint chips are written this way — the model emits the answer, not a
    // sentence containing it — and nothing below caught them: the undelimited
    // sweep only wraps BRACED exponents (`x^{3}`), so a bare `x^3` fell through
    // and reached the student as source. Wrapping the line whole also keeps
    // "+ 2x + C" inside the same expression rather than rendering one term and
    // leaving the rest as plain text.
    //
    // Gated on the line containing no prose: any alphabetic run of 3+ letters
    // that is not a known function name means this is a sentence, and sentences
    // are served by the delimiter rules below.
    const MATH_WORDS = /^(sin|cos|tan|sec|csc|cot|log|ln|exp|lim|max|min|det|mod)$/i;
    const isOneExpression = (s: string): boolean => {
      const t = s.trim();
      if (!t || t.length > 120) return false;
      if (!/[\^_\\]/.test(t)) return false; // no maths marker at all
      if (!/^[A-Za-z0-9\s^_{}()[\]+\-*/=.,<>|\\'°·×÷±−–]+$/.test(t)) return false;
      // Command names are not prose: strip "\dfrac", "\int", "\quad" before
      // looking for words, or any expression using them reads as a sentence
      // and is left as source.
      const withoutCommands = t.replace(/\\[A-Za-z]+/g, " ");
      return (withoutCommands.match(/[A-Za-z]{3,}/g) || []).every(
        // ALL-CAPS runs are symbols, not words: dimension clusters like MLT and
        // variable groups like PV are exactly what these chips carry.
        (w) => MATH_WORDS.test(w) || w === w.toUpperCase()
      );
    };
    if (!hasDelimiters && isOneExpression(processedContent)) {
      const whole = processedContent.trim();
      if (wrapsCleanly(whole)) {
        processedContent = `$${whole}$`;
        hasDelimiters = true;
      }
    }

    if (hasLatexCmds) {
      if (!hasDelimiters) {
        // Nothing is delimited: wrap whole segments that look like expressions.
        processedContent = processedContent.replace(
          // The last alternative catches UNBRACED super/subscripts — "x^2",
          // "r^-1", "a_1". Only braced forms were handled, so a question like
          // "If x^2 + y^2 = r^2, what does r represent?" showed its notation as
          // source while the chips beneath it rendered. wrapsCleanly still
          // vetoes anything KaTeX cannot parse.
          /([a-zA-Z0-9.\s-]*\\[a-zA-Z,]+\{[^}]*\}[\w\s\\,^{}_-]*|[a-zA-Z0-9.\s-]*\\[a-zA-Z,]+[\w\s\\,^{}_-]*|[a-zA-Z0-9._-]+\^\{[^}]*\}|[a-zA-Z0-9._-]+_\{[^}]*\}|[a-zA-Z0-9]+[\^_]-?[a-zA-Z0-9]+)/g,
          (match) => {
            const tex = match.trim();
            if (tex && (tex.includes("\\") || tex.includes("^") || tex.includes("_"))) {
              return wrapsCleanly(tex) ? `$${tex}$` : match;
            }
            return match;
          }
        );
      }

      // Content is often only PARTLY delimited -- "\cos \( \theta \)" has one
      // expression wrapped and one bare, and hasDelimiters is all-or-nothing,
      // so the loose \cos used to reach the student as source. Sweep whatever
      // still sits outside a $...$ span. Measured on the live pool: rows
      // leaking LaTeX source dropped from 17 to 8, with no new render errors.
      processedContent = processedContent
        .split(/(\$\$[\s\S]+?\$\$|\$[\s\S]+?\$)/g)
        .map((part) =>
          part.startsWith("$")
            ? part
            : part.replace(
                /\\[a-zA-Z]+(?:\{[^{}]*\})*(?:[_^](?:\{[^{}]*\}|[A-Za-z0-9]))*/g,
                (m) => (wrapsCleanly(m) ? `$${m}$` : m)
              )
        )
        .join("");
    }

    // Split text by $...$ (inline) and $$...$$ (display)
    const parts = processedContent.split(/(\$\$[\s\S]+?\$\$|\$[\s\S]+?\$)/g);

    return parts.map((part, index) => {
      if (part.startsWith("$$") && part.endsWith("$$") && part.length > 4) {
        const math = part.slice(2, -2);
        return <React.Fragment key={index}>{renderMathString(math, true)}</React.Fragment>;
      }
      if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
        const math = part.slice(1, -1);
        return <React.Fragment key={index}>{renderMathString(math, false)}</React.Fragment>;
      }
      return <span key={index}>{part}</span>;
    });
    };

    // No molecule: the content takes exactly the path it always did.
    if (!content.includes("<smiles>")) return renderSegment(content);

    return content.split(SMILES_SPLIT_RE).map((part, index) => {
      const molecule = part.match(SMILES_BODY_RE);
      if (molecule) {
        const smiles = molecule[1].trim();
        return smiles ? <SmilesStructure key={index} smiles={smiles} /> : null;
      }
      return <React.Fragment key={index}>{renderSegment(part)}</React.Fragment>;
    });
  }, [content]);

  // NOTE: overflow-x-auto/max-w-full are deliberately NOT applied here. This
  // span is inline, and both properties are ignored on inline boxes -- measured
  // at 380px, a wide equation still clipped (scrollWidth 380 > clientWidth 348).
  // The scroll container lives on the display-math block in renderMathString.
  return <span className={className}>{renderedElements}</span>;
}
