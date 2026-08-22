"use client";

import React, { useMemo } from "react";
import katex from "@/lib/katex-setup";

interface MathTextProps {
  content?: string | null;
  className?: string;
}

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

    let processedContent = content;

    // Normalise LaTeX bracket delimiters to dollar form BEFORE anything else.
    // The splitter below only recognises $...$ and $$...$$, so \(...\) and \[...\]
    // previously fell through and reached the student as raw LaTeX source.
    // Display form \[...\] is converted first so it cannot be eaten by the inline rule.
    processedContent = processedContent
      .replace(/\\\[([\s\S]+?)\\\]/g, (_match, body) => `$$${body}$$`)
      .replace(/\\\(([\s\S]+?)\\\)/g, (_match, body) => `$${body}$`);

    // Detect undelimited LaTeX expressions (e.g. \text{...}, \frac{...}, \, \mu, etc.)
    const hasDelimiters = processedContent.includes("$") || processedContent.includes("\\(");
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

    if (hasLatexCmds) {
      if (!hasDelimiters) {
        // Nothing is delimited: wrap whole segments that look like expressions.
        processedContent = processedContent.replace(
          /([a-zA-Z0-9.\s-]*\\[a-zA-Z,]+\{[^}]*\}[\w\s\\,^{}_-]*|[a-zA-Z0-9.\s-]*\\[a-zA-Z,]+[\w\s\\,^{}_-]*|[a-zA-Z0-9._-]+\^\{[^}]*\}|[a-zA-Z0-9._-]+_\{[^}]*\})/g,
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
  }, [content]);

  // NOTE: overflow-x-auto/max-w-full are deliberately NOT applied here. This
  // span is inline, and both properties are ignored on inline boxes -- measured
  // at 380px, a wide equation still clipped (scrollWidth 380 > clientWidth 348).
  // The scroll container lives on the display-math block in renderMathString.
  return <span className={className}>{renderedElements}</span>;
}
