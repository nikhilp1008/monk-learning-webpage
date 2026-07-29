"use client";

/**
 * PremiumBoardEvent — the "Drona writes on the board" rendering layer.
 *
 * Replaces the static BoardEvent renderer with animated, chalk-style reveals:
 *  - headings/notes handwritten (Kalam) with a wipe-on reveal + chalk cursor
 *  - formulas revealed with a wipe + hand-drawn amber underline
 *  - diagrams recolored to the house palette and DRAWN stroke-by-stroke,
 *    with a chalk dot following whichever line is currently being drawn
 *
 * Data contract is identical to BoardEvent — no pipeline changes needed.
 */

import React, { useEffect, useMemo, useRef } from "react";
import { KaTeXRenderer } from "./KaTeXRenderer";
import type { BoardEventData } from "./BoardEvent";

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

function sanitizeSvg(svgStr: string): string {
  if (!svgStr) return "";
  return svgStr
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/\s*on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");
}

/** Map the generator's corporate palette onto the MonkLearning board palette. */
const COLOR_MAP: Record<string, string> = {
  "#ffffff": "transparent", // background rects — let the paper show through
  "#1f2933": "#1C1A16", // slate ink → house ink
  "#2563eb": "#9A6A12", // primary blue → deep amber
  "#dbeafe": "#FCF4E0", // blue-100 fill → cream
  "#bfdbfe": "#F8E9C8",
  "#93c5fd": "#F0D9A0",
  "#64748b": "#9C988C", // slate-500 → ink-muted
  "#94a3b8": "#B5AFA2",
  "#cbd5e1": "#D8D3C6",
  "#f1f5f9": "#FFFEFB", // slate-50 fill → cream-soft
  "#d97706": "#B87A14", // amber-600 → house amber-dark
  "#fef3c7": "#FCF4E0", // amber-100 → cream
  "#dc2626": "#DD4433", // red → red-note
  "#fee2e2": "#FBEAE7",
  "#059669": "#157A45", // green → house green-dark
  "#dcfce7": "#E4F3EA",
  "#16a34a": "#1C9B57",
};

function restyleSvgString(svg: string): string {
  let out = svg;
  for (const [from, to] of Object.entries(COLOR_MAP)) {
    out = out.split(from).join(to).split(from.toUpperCase()).join(to);
  }
  // Generator emits Helvetica; inherit the app's Anek Latin instead.
  out = out.replace(
    /font-family="[^"]*"/gi,
    'font-family="var(--font-anek-latin), sans-serif"'
  );
  // Generator labels sometimes overflow their own viewBox — let them show.
  out = out.replace(/<svg\b(?![^>]*\boverflow=)/i, '<svg overflow="visible" ');
  return out;
}

const DRAWABLE = "path, line, polyline, polygon, circle, ellipse, rect";

interface DrawStep {
  el: SVGElement;
  kind: "stroke" | "fill" | "text";
  length: number;
  origFillOpacity: string;
}

/** Walk the SVG in document order and build the draw plan. */
function buildDrawPlan(root: SVGSVGElement): DrawStep[] {
  const steps: DrawStep[] = [];
  const all = root.querySelectorAll<SVGElement>(`${DRAWABLE}, text`);
  all.forEach((el) => {
    // Marker/clip/gradient internals must not be animated or hidden.
    if (el.closest("defs, marker, clipPath")) return;
    const tag = el.tagName.toLowerCase();
    if (tag === "text") {
      steps.push({ el, kind: "text", length: 0, origFillOpacity: "" });
      return;
    }
    const stroke = el.getAttribute("stroke");
    const fill = el.getAttribute("fill");
    const hasStroke = stroke && stroke !== "none" && stroke !== "transparent";
    const hasFill = fill && fill !== "none" && fill !== "transparent";
    if (!hasStroke && !hasFill) return;

    let length = 0;
    if (hasStroke) {
      try {
        const geo = el as unknown as SVGGeometryElement;
        if (typeof geo.getTotalLength === "function") {
          length = geo.getTotalLength();
        }
      } catch {
        length = 0;
      }
    }
    steps.push({
      el,
      kind: hasStroke && length > 0 ? "stroke" : "fill",
      length,
      origFillOpacity: el.getAttribute("fill-opacity") || "1",
    });
  });
  return steps;
}

/**
 * Animate the SVG: strokes draw themselves in document order, fills and
 * text fade in at their turn, and a chalk dot rides the line being drawn.
 * Total run time is budgeted so long diagrams never drag.
 */
function animateSvg(
  root: SVGSVGElement,
  chalk: HTMLDivElement | null,
  container: HTMLDivElement | null
): () => void {
  const steps = buildDrawPlan(root);
  if (steps.length === 0) return () => {};

  const TOTAL_BUDGET = Math.min(4200, Math.max(1800, steps.length * 120));
  const per = TOTAL_BUDGET / steps.length;
  let cancelled = false;
  const rafIds: number[] = [];

  // Hide everything up-front (synchronously, before first paint of the anim)
  steps.forEach((s) => {
    if (s.kind === "stroke") {
      const dash = s.el.getAttribute("stroke-dasharray");
      if (dash) s.el.setAttribute("data-orig-dash", dash);
      s.el.style.strokeDasharray = `${s.length}`;
      s.el.style.strokeDashoffset = `${s.length}`;
      const fill = s.el.getAttribute("fill");
      if (fill && fill !== "none" && fill !== "transparent") {
        s.el.style.fillOpacity = "0";
      }
    } else {
      s.el.style.opacity = "0";
    }
  });

  const moveChalk = (el: SVGElement, length: number, p: number) => {
    if (!chalk || !container) return;
    try {
      const geo = el as unknown as SVGGeometryElement;
      const pt = geo.getPointAtLength(length * p);
      const ctm = geo.getScreenCTM();
      if (!ctm) return;
      const sp = new DOMPoint(pt.x, pt.y).matrixTransform(ctm);
      const rect = container.getBoundingClientRect();
      chalk.style.opacity = "1";
      chalk.style.transform = `translate(${sp.x - rect.left - 5}px, ${
        sp.y - rect.top - 5
      }px)`;
    } catch {
      /* detached mid-animation — ignore */
    }
  };

  let i = 0;
  const runStep = () => {
    if (cancelled || i >= steps.length) {
      if (chalk) chalk.style.opacity = "0";
      return;
    }
    const s = steps[i];
    const dur = Math.max(
      60,
      s.kind === "stroke" ? Math.min(per * 2.2, 60 + s.length * 1.6) : per * 0.9
    );
    const t0 = performance.now();

    const frame = (now: number) => {
      if (cancelled) return;
      const p = Math.min(1, (now - t0) / dur);
      if (s.kind === "stroke") {
        s.el.style.strokeDashoffset = `${s.length * (1 - p)}`;
        moveChalk(s.el, s.length, p);
        if (p === 1) {
          const orig = s.el.getAttribute("data-orig-dash");
          s.el.style.strokeDasharray = orig || "none";
          s.el.style.strokeDashoffset = "0";
          s.el.style.fillOpacity = s.origFillOpacity;
        }
      } else {
        s.el.style.opacity = `${p}`;
      }
      if (p < 1) {
        rafIds.push(requestAnimationFrame(frame));
      } else {
        i += 1;
        runStep();
      }
    };
    rafIds.push(requestAnimationFrame(frame));
  };
  runStep();

  return () => {
    cancelled = true;
    rafIds.forEach(cancelAnimationFrame);
    // settle to final state
    steps.forEach((s) => {
      if (s.kind === "stroke") {
        const orig = s.el.getAttribute("data-orig-dash");
        s.el.style.strokeDasharray = orig || "none";
        s.el.style.strokeDashoffset = "0";
        s.el.style.fillOpacity = s.origFillOpacity;
      } else {
        s.el.style.opacity = "1";
      }
    });
    if (chalk) chalk.style.opacity = "0";
  };
}

/* ------------------------------------------------------------------ */
/* text-with-inline-math (same contract as BoardEvent)                 */
/* ------------------------------------------------------------------ */

function renderTextWithMath(textStr: string) {
  if (!textStr) return null;
  const parts = textStr.split(/(\$[^$]+\$)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
      return (
        <KaTeXRenderer key={idx} latex={part.slice(1, -1)} displayMode={false} />
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

/* ------------------------------------------------------------------ */
/* wipe-reveal wrapper: clip-path writes content on, chalk dot sweeps  */
/* ------------------------------------------------------------------ */

function WriteIn({
  children,
  animate,
  seconds,
  chalkBottom = "0.4em",
}: {
  children: React.ReactNode;
  animate: boolean;
  seconds: number;
  chalkBottom?: string;
}) {
  if (!animate) return <div className="relative">{children}</div>;
  const dur = `${seconds}s`;
  return (
    <div className="relative">
      <div className="pb-write" style={{ animationDuration: dur }}>
        {children}
      </div>
      <div
        aria-hidden
        className="pb-chalk"
        style={{ animationDuration: dur, bottom: chalkBottom }}
      />
    </div>
  );
}

const wipeSeconds = (text: string | undefined, perChar: number, min: number, max: number) =>
  Math.min(max, Math.max(min, (text?.length || 12) * perChar));

/* ------------------------------------------------------------------ */
/* diagram                                                             */
/* ------------------------------------------------------------------ */

function AnimatedDiagram({
  svg,
  caption,
  animate,
}: {
  svg: string;
  caption?: string;
  animate: boolean;
}) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const chalkRef = useRef<HTMLDivElement | null>(null);

  const cleanSvg = useMemo(() => restyleSvgString(sanitizeSvg(svg)), [svg]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !animate) return;
    const root = host.querySelector("svg");
    if (!root) return;
    const cancel = animateSvg(
      root as SVGSVGElement,
      chalkRef.current,
      hostRef.current
    );
    return cancel;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cleanSvg, animate]);

  return (
    <div className="my-5 flex flex-col items-center justify-center">
      <div
        ref={hostRef}
        className="relative w-full max-w-xl overflow-hidden py-3 px-9 bg-cream-soft/70 rounded-xl border-[1.5px] border-ink/70 shadow-sm [&_svg]:w-full [&_svg]:h-auto"
      >
        <div dangerouslySetInnerHTML={{ __html: cleanSvg }} />
        {/* chalk dot that follows whichever line is being drawn */}
        <div
          ref={chalkRef}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 w-[10px] h-[10px] rounded-full bg-orange shadow-[0_0_0_5px_rgba(238,163,31,0.22)] opacity-0 transition-opacity duration-200"
        />
      </div>
      {caption && (
        <span className="mt-2 text-xs md:text-sm font-script text-orange-dark text-center">
          {caption}
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* main component                                                      */
/* ------------------------------------------------------------------ */

interface PremiumBoardEventProps {
  event: BoardEventData;
  /** Run the entrance animation (true only for the newest revealed event). */
  animate: boolean;
}

export function PremiumBoardEvent({ event, animate }: PremiumBoardEventProps) {
  const isHigh = event.emphasis === "high";

  switch (event.type) {
    case "heading":
      return (
        <WriteIn animate={animate} seconds={wipeSeconds(event.text, 0.045, 0.9, 2.6)}>
          <h3
            className={`font-script text-red-note mt-5 mb-2 leading-snug -rotate-[0.35deg] origin-left ${
              isHigh ? "text-2xl md:text-[1.72rem]" : "text-xl md:text-2xl"
            }`}
          >
            {event.text ? renderTextWithMath(event.text) : null}
          </h3>
        </WriteIn>
      );

    case "text":
      return (
        <WriteIn animate={animate} seconds={wipeSeconds(event.text, 0.028, 0.8, 2.8)}>
          <p
            className={`leading-relaxed my-2 ${
              isHigh
                ? "text-base md:text-lg font-semibold text-ink"
                : "text-[0.95rem] md:text-base text-ink-light"
            }`}
          >
            {event.text ? renderTextWithMath(event.text) : null}
          </p>
        </WriteIn>
      );

    case "formula":
      return (
        <WriteIn animate={animate} seconds={1.6} chalkBottom="0.9em">
          <div
            className={`my-3.5 py-3 px-5 bg-cream/40 rounded-xl border border-orange/25 w-fit max-w-full mx-auto overflow-x-auto ${
              isHigh ? "text-xl md:text-2xl" : "text-lg md:text-xl"
            }`}
          >
            {event.latex ? (
              <KaTeXRenderer latex={event.latex} displayMode={true} />
            ) : null}
            {/* hand-drawn amber underline */}
            <svg
              viewBox="0 0 220 8"
              preserveAspectRatio="none"
              className="block w-full h-[7px] mt-1.5"
              aria-hidden
            >
              <path
                d="M3 5.5 C 40 2.5, 90 6.5, 130 4 S 200 3, 217 5"
                fill="none"
                stroke="#EEA31F"
                strokeWidth="2.4"
                strokeLinecap="round"
                className={animate ? "pb-underline" : undefined}
                pathLength={100}
              />
            </svg>
          </div>
        </WriteIn>
      );

    case "note":
      return (
        <WriteIn animate={animate} seconds={wipeSeconds(event.text, 0.035, 0.9, 3)}>
          <div
            className={`my-3 py-2.5 pl-4 pr-3 border-l-[3px] border-red-note/70 font-script text-red-note leading-snug -rotate-[0.25deg] origin-left ${
              isHigh ? "text-lg md:text-xl" : "text-base md:text-lg"
            }`}
          >
            {event.text ? renderTextWithMath(event.text) : null}
          </div>
        </WriteIn>
      );

    case "diagram":
      return (
        <AnimatedDiagram
          svg={event.svg || ""}
          caption={event.caption}
          animate={animate}
        />
      );

    default:
      return (
        <WriteIn animate={animate} seconds={1}>
          <div className="my-2 text-sm text-ink-light">
            {event.text ? renderTextWithMath(event.text) : null}
          </div>
        </WriteIn>
      );
  }
}
