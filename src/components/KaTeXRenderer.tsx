"use client";

import katex from "@/lib/katex-setup";
import React from "react";

interface KaTeXRendererProps {
  latex: string;
  displayMode?: boolean;
  className?: string;
}

// Memoized because the output is a pure function of the props, and the render
// is NOT cheap: katex.renderToString per formula line, regexes per prose line.
// The caption is word-paced (several React updates per second while the tutor
// speaks), and each update re-rendered every board item from scratch — as the
// board filled up over a lesson, that main-thread load starved the caption
// timers, which is how captions fell behind the voice on later turns.
export const KaTeXRenderer = React.memo(function KaTeXRenderer({
  latex,
  className = "",
}: KaTeXRendererProps) {
  if (!latex) return null;

  const normalized = latex.replace(/\\n/g, "\n");
  const lines = normalized.split("\n");

  return (
    <div className={`space-y-2 text-ink font-semibold leading-relaxed text-[0.96rem] ${className}`}>
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-2" />;

        // Display math line ($$ ... $$ or \begin{...})
        const isDisplayMath =
          (trimmed.startsWith("$$") && trimmed.endsWith("$$")) ||
          trimmed.startsWith("\\begin{");

        if (isDisplayMath) {
          const rawMath = trimmed.replace(/^\$\$|\$\$/g, "");
          try {
            const html = katex.renderToString(rawMath, { displayMode: true, throwOnError: false });
            return (
              <div
                key={idx}
                className="overflow-x-auto my-2 py-1 max-w-full font-mono text-center"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          } catch {
            return <div key={idx} className="font-mono text-center">{trimmed}</div>;
          }
        }

        // If line contains bare LaTeX commands (\text, \frac, \vec, etc.) but no delimiters, wrap bare commands
        let processedLine = trimmed.replace(/\\\s*bullet/g, "•");
        const hasBareLatex = /\\(text|frac|vec|alpha|beta|theta|sigma|Delta|bullet|cdot|approx|sim|sqrt)\b/.test(processedLine) && !processedLine.includes("$");
        if (hasBareLatex) {
          processedLine = processedLine.replace(/\\(text|frac|vec|alpha|beta|theta|sigma|Delta|bullet|cdot|approx|sim|sqrt)(\{[^}]*\})?/g, (m) => `$${m}$`);
        }

        // Inline math ($ ... $) or Plain Text
        const parts = processedLine.split(/(\$[^\$]+\$)/g);

        return (
          <div key={idx} className="whitespace-pre-wrap break-words">
            {parts.map((part, pIdx) => {
              if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
                const mathStr = part.slice(1, -1);
                try {
                  const html = katex.renderToString(mathStr, { displayMode: false, throwOnError: false });
                  return (
                    <span
                      key={pIdx}
                      className="inline-block mx-0.5"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                  );
                } catch {
                  return <span key={pIdx}>{part}</span>;
                }
              }
              return <span key={pIdx}>{part}</span>;
            })}
          </div>
        );
      })}
    </div>
  );
});
