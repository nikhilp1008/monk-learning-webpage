"use client";

import katex from "katex";
import React from "react";

interface KaTeXRendererProps {
  latex: string;
  displayMode?: boolean;
  className?: string;
}

export function KaTeXRenderer({
  latex,
  className = "",
}: KaTeXRendererProps) {
  if (!latex) return null;

  const lines = latex.split("\n");

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

        // Inline math ($ ... $) or Plain Text
        const parts = line.split(/(\$[^\$]+\$)/g);

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
}
