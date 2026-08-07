"use client";

import React from "react";
import { KaTeXRenderer } from "./KaTeXRenderer";

export interface BoardEventData {
  seq?: number;
  type: "heading" | "text" | "formula" | "note" | "diagram" | string;
  text?: string;
  latex?: string;
  svg?: string;
  caption?: string;
  style?: string;
  emphasis?: "high" | "normal" | string;
}

interface BoardEventProps {
  event: BoardEventData;
}

function sanitizeSvg(svgStr: string): string {
  if (!svgStr) return "";
  return svgStr
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/\s*on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");
}

function renderTextWithMath(textStr: string) {
  if (!textStr) return null;
  const parts = textStr.split(/(\$[^\$]+\$)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
      const math = part.slice(1, -1);
      return <KaTeXRenderer key={idx} latex={math} displayMode={false} />;
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

export function BoardEvent({ event }: BoardEventProps) {
  const isHigh = event.emphasis === "high";

  switch (event.type) {
    case "heading":
      return (
        <h3
          className={`font-bold tracking-tight text-ink mt-6 mb-3 ${
            isHigh ? "text-2xl md:text-3xl font-extrabold" : "text-xl md:text-2xl"
          }`}
        >
          {event.text ? renderTextWithMath(event.text) : null}
        </h3>
      );

    case "text":
      return (
        <p
          className={`leading-relaxed text-ink my-2.5 ${
            isHigh
              ? "text-lg md:text-xl font-medium text-ink"
              : "text-base md:text-lg text-ink-light"
          }`}
        >
          {event.text ? renderTextWithMath(event.text) : null}
        </p>
      );

    case "formula":
      const formulaLatex = event.latex || event.text || "";
      return (
        <div
          className={`my-2 py-1 px-0 w-full text-left text-ink leading-relaxed overflow-x-auto ${
            isHigh ? "text-xl md:text-2xl font-bold" : "text-lg md:text-xl font-semibold"
          }`}
        >
          {formulaLatex ? (
            <KaTeXRenderer latex={formulaLatex} displayMode={false} />
          ) : null}
        </div>
      );

    case "note":
      return (
        <div
          className={`my-3 p-3.5 rounded-lg border-l-4 border-red-note bg-red-note/5 font-script ${
            isHigh ? "text-xl md:text-2xl" : "text-lg md:text-xl"
          } text-red-note`}
        >
          {event.text ? renderTextWithMath(event.text) : null}
        </div>
      );

    case "diagram": {
      const cleanSvg = event.svg ? sanitizeSvg(event.svg) : "";
      return (
        <div className="my-5 flex flex-col items-center justify-center">
          <div
            className="w-full max-w-xl overflow-x-auto p-2 bg-white rounded-xl border border-border-subtle shadow-sm"
            dangerouslySetInnerHTML={{ __html: cleanSvg }}
          />
          {event.caption && (
            <span className="mt-2 text-xs md:text-sm font-semibold text-ink-muted text-center italic">
              {event.caption}
            </span>
          )}
        </div>
      );
    }

    default:
      return (
        <div className="my-2 text-sm text-ink-light">
          {event.text ? renderTextWithMath(event.text) : null}
        </div>
      );
  }
}
