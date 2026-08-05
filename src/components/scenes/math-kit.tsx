"use client";

/**
 * Maths scene kit — domain primitives layered on top of kit.tsx.
 *
 * Number lines/intervals, Venn diagrams (real SVG clip/mask region shading, not
 * hand-approximated overlap art), and nested nesting-of-sets boxes.
 *
 * Same conventions as kit.tsx / chem-kit.tsx: geometry helpers return an SVG path
 * `d` string (feed them to <Draw/>); small multi-element pieces are React
 * components that take an `on`/`delay` and animate via <Fade>/<Draw>. Everything
 * is a pure function of props — no internal state — so seek/pause/replay stay
 * correct.
 *
 * NOTATION — see SCENE_AUTHORING_MATHS.md before writing board text. Short
 * version: blackboard-bold (ℕ ℤ ℚ ℝ ℂ) is NOT in either board font and renders
 * via a mismatched fallback font — write plain letters (N, Z, Q, R, C) instead.
 * Operators (∈ ∉ ⊆ ⊂ ⊇ ⊃ ∪ ∩ ∅ △ → ⇒ ⇔ Σ) also fall back but are safe to use —
 * legible, unambiguous, and impractical to hand-draw every occurrence.
 */

import React, { useId } from "react";
import { Draw, Fade, T, INK, MUTED } from "./kit";

/* ------------------------------------------------------------------ */
/* circle (path form — usable as a drawn outline AND inside clip/mask) */
/* ------------------------------------------------------------------ */

/** Full circle as a two-arc path, so it can be stroke-drawn by <Draw/> like any
 * other primitive, and reused verbatim inside a <clipPath>/<mask>. */
export function circleD(cx: number, cy: number, r: number): string {
  return `M ${cx - r} ${cy} A ${r} ${r} 0 1 0 ${cx + r} ${cy} A ${r} ${r} 0 1 0 ${cx - r} ${cy} Z`;
}

/* ------------------------------------------------------------------ */
/* number line / intervals                                             */
/* ------------------------------------------------------------------ */

/** Number-line shaft with an arrowhead at the right end. Draw ticks separately
 * with tickD at whatever integer spacing the section needs. */
export function axisD(x1: number, x2: number, y: number): string {
  return `M ${x1} ${y} L ${x2} ${y} M ${x2 - 10} ${y - 5} L ${x2} ${y} L ${x2 - 10} ${y + 5}`;
}

/** One tick mark on a number line at x, centered on the axis at y. */
export function tickD(x: number, y: number, h = 6): string {
  return `M ${x} ${y - h} L ${x} ${y + h}`;
}

/** Interval endpoint marker: hollow ring for an open (<, >) bound, filled dot for
 * a closed (≤, ≥) bound. Get open/closed right — it's the #1 interval mistake. */
export function IntervalDot({
  on,
  delay = 0,
  x,
  y,
  open,
  r = 5,
  stroke = INK,
}: {
  on: boolean;
  delay?: number;
  x: number;
  y: number;
  open: boolean;
  r?: number;
  stroke?: string;
}) {
  return (
    <Fade on={on} delay={delay}>
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={open ? "#FCF4E0" : stroke}
        stroke={stroke}
        strokeWidth={2}
      />
    </Fade>
  );
}

/* ------------------------------------------------------------------ */
/* Venn diagrams — real region shading via nested clipPath / mask       */
/* ------------------------------------------------------------------ */

type Circle = { cx: number; cy: number; r: number };

/**
 * Shades the exact boolean region: inside every circle in `include`, outside
 * every circle in `exclude`. Uses nested SVG <clipPath> (for include) and a
 * <mask> (for exclude) so the region is computed by the browser, not
 * hand-approximated — correct for two or three overlapping circles alike.
 *
 * Examples (two circles A, B): lens (A∩B) = include:[A,B]. Only-A (A−B) =
 * include:[A], exclude:[B]. Outside both = include:[bounding box as a circle
 * covering U] or just wrap in your own <rect> and pass exclude:[A,B].
 */
export function VennShade({
  on,
  delay = 0,
  include,
  exclude = [],
  x = 0,
  y = 0,
  w = 1080,
  h = 620,
  fill,
  opacity = 0.32,
}: {
  on: boolean;
  delay?: number;
  include: Circle[];
  exclude?: Circle[];
  /** bounding rect the shaded fill is drawn from before clipping/masking */
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  fill: string;
  opacity?: number;
}) {
  const uid = useId().replace(/[:]/g, "");
  const maskId = `venn-mask-${uid}`;

  let content = <rect x={x} y={y} width={w} height={h} fill={fill} />;

  if (exclude.length > 0) {
    content = (
      <g mask={`url(#${maskId})`}>
        <rect x={x} y={y} width={w} height={h} fill={fill} />
      </g>
    );
  }

  for (const c of include) {
    content = (
      <g clipPath={`url(#clip-${uid}-${include.indexOf(c)})`}>{content}</g>
    );
  }

  return (
    <Fade on={on} delay={delay} dim={false}>
      <defs>
        {include.map((c, i) => (
          <clipPath id={`clip-${uid}-${i}`} key={i}>
            <path d={circleD(c.cx, c.cy, c.r)} />
          </clipPath>
        ))}
        {exclude.length > 0 && (
          <mask id={maskId}>
            <rect x={x} y={y} width={w} height={h} fill="white" />
            {exclude.map((c, i) => (
              <path key={i} d={circleD(c.cx, c.cy, c.r)} fill="black" />
            ))}
          </mask>
        )}
      </defs>
      <g opacity={opacity}>{content}</g>
    </Fade>
  );
}

/* ------------------------------------------------------------------ */
/* nested boxes (number-set containment: N ⊂ Z ⊂ Q ⊂ R)                */
/* ------------------------------------------------------------------ */

/** Rounded-rect outline as a path, so it can be stroke-drawn by <Draw/>. */
export function roundRectD(x: number, y: number, w: number, h: number, r = 14): string {
  return `M ${x + r} ${y} L ${x + w - r} ${y} A ${r} ${r} 0 0 1 ${x + w} ${y + r} L ${x + w} ${y + h - r} A ${r} ${r} 0 0 1 ${x + w - r} ${y + h} L ${x + r} ${y + h} A ${r} ${r} 0 0 1 ${x} ${y + h - r} L ${x} ${y + r} A ${r} ${r} 0 0 1 ${x + r} ${y} Z`;
}

/**
 * Concentric labeled boxes for number-set nesting, e.g. levels=["N","Z","Q","R"]
 * (outermost first) draws R as the biggest box down to N as the smallest,
 * each gated on its own beat so the containment builds outward-in as narrated.
 */
export function NestedSets({
  on,
  delay = 0,
  cx,
  cy,
  levels,
  outerW = 620,
  outerH = 340,
  step = 70,
  stroke = INK,
  labelFill = MUTED,
}: {
  on: boolean[];
  delay?: number;
  cx: number;
  cy: number;
  levels: string[];
  outerW?: number;
  outerH?: number;
  step?: number;
  stroke?: string;
  labelFill?: string;
}) {
  return (
    <>
      {levels.map((label, i) => {
        const w = outerW - i * step;
        const h = outerH - i * step * (outerH / outerW);
        const x = cx - w / 2;
        const y = cy - h / 2;
        return (
          <React.Fragment key={label}>
            <Draw
              on={on[i] ?? false}
              d={roundRectD(x, y, w, h)}
              stroke={stroke}
              sw={2}
              delay={delay}
            />
            <Fade on={on[i] ?? false} delay={delay + 0.4}>
              <T x={x + 18} y={y + 24} size={17} fill={labelFill} anchor="start">
                {label}
              </T>
            </Fade>
          </React.Fragment>
        );
      })}
    </>
  );
}

/* re-export the palette/base bits maths scenes reach for most */
export { INK, MUTED } from "./kit";
