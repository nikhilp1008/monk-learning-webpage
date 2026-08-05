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

/* ------------------------------------------------------------------ */
/* straight lines + smooth curves (function graphs)                    */
/* ------------------------------------------------------------------ */

/** Straight segment — the plotted graph of identity/constant/linear pieces. */
export function lineD(x1: number, y1: number, x2: number, y2: number): string {
  return `M ${x1} ${y1} L ${x2} ${y2}`;
}

/**
 * Smooth curve threaded through an ordered list of points (Catmull-Rom
 * converted to cubic Beziers) — for polynomial/parabola-shaped function
 * graphs. Not for anything needing an exact analytic shape (a real parabola
 * y=x² is close enough visually with 5-7 sampled points; if a chapter later
 * needs true conic precision, add a dedicated generator then).
 */
export function curveD(points: { x: number; y: number }[]): string {
  if (points.length < 2) return "";
  if (points.length === 2)
    return lineD(points[0].x, points[0].y, points[1].x, points[1].y);
  let d = `M ${points[0].x} ${points[0].y} `;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += `C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y} `;
  }
  return d;
}

/* ------------------------------------------------------------------ */
/* Cartesian axes                                                       */
/* ------------------------------------------------------------------ */

/**
 * x/y axes crossing at (originX, originY), each arm drawn as one Draw path
 * (axis shaft + arrowhead at the positive end). Feed the return value's
 * three parts to three <Draw/>s (x-axis, y-axis) — kept separate so they
 * can be gated on different beats if the story draws them one at a time;
 * pass the same beat/delay to both for the common "axes appear together"
 * case.
 */
export function xAxisD(x0: number, x1: number, y: number): string {
  return axisD(x0, x1, y);
}
export function yAxisD(y0: number, y1: number, x: number): string {
  // y1 < y0 (axis points up the screen, i.e. toward smaller SVG y)
  const a = Math.atan2(y1 - y0, 0);
  const h = 11;
  return `M ${x} ${y0} L ${x} ${y1} M ${x - h * Math.cos(a - 0.46)} ${
    y1 - h * Math.sin(a - 0.46)
  } L ${x} ${y1} L ${x - h * Math.cos(a + 0.46)} ${y1 - h * Math.sin(a + 0.46)}`;
}

/**
 * A ready-made x/y axes pair with tick marks at integer spacing and an
 * origin label — the default frame for standard-function graphs (identity,
 * modulus, polynomial, signum, greatest integer). Draw the function's own
 * curve/segments separately with <Draw>/<StepFunction> so it can be staged
 * on a later beat than the axes.
 */
export function CartesianAxes({
  on,
  delay = 0,
  originX,
  originY,
  xLeft,
  xRight,
  yTop,
  yBottom,
  step = 40,
  stroke = INK,
  showTicks = true,
}: {
  on: boolean;
  delay?: number;
  originX: number;
  originY: number;
  xLeft: number;
  xRight: number;
  yTop: number;
  yBottom: number;
  step?: number;
  stroke?: string;
  showTicks?: boolean;
}) {
  const ticks: string[] = [];
  if (showTicks) {
    for (let x = originX + step; x <= xRight - 12; x += step) ticks.push(tickD(x, originY));
    for (let x = originX - step; x >= xLeft + 12; x -= step) ticks.push(tickD(x, originY));
    for (let y = originY + step; y <= yBottom - 12; y += step)
      ticks.push(tickD(originX, y));
    for (let y = originY - step; y >= yTop + 12; y -= step) ticks.push(tickD(originX, y));
  }
  return (
    <>
      <Draw on={on} d={xAxisD(xLeft, xRight, originY)} stroke={stroke} sw={2} delay={delay} />
      <Draw on={on} d={yAxisD(yBottom, yTop, originX)} stroke={stroke} sw={2} delay={delay} />
      {ticks.length > 0 && (
        <Draw on={on} d={ticks.join(" ")} stroke={stroke} sw={1.4} delay={delay + 0.2} />
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* step function (signum, greatest-integer/floor — any piecewise-flat   */
/* graph with jump discontinuities)                                    */
/* ------------------------------------------------------------------ */

type Step = { x1: number; x2: number; y: number; leftOpen?: boolean; rightOpen?: boolean };

/**
 * Draws a sequence of flat segments with open/closed dots at each jump —
 * covers signum (3 segments) and the greatest-integer/floor "staircase"
 * (many segments) with the same primitive. Each segment is its own beat-
 * gated piece so the staircase can be built step by step if the narration
 * wants that; pass one `on`/`delay` per call for a single shared beat.
 */
export function StepFunction({
  on,
  delay = 0,
  steps,
  stroke = INK,
  dotR = 4,
}: {
  on: boolean;
  delay?: number;
  steps: Step[];
  stroke?: string;
  dotR?: number;
}) {
  return (
    <>
      {steps.map((s, i) => (
        <Draw key={i} on={on} d={lineD(s.x1, s.y, s.x2, s.y)} stroke={stroke} sw={2.4} delay={delay} />
      ))}
      {steps.map((s, i) => (
        <React.Fragment key={`d${i}`}>
          <IntervalDot on={on} delay={delay} x={s.x1} y={s.y} open={s.leftOpen ?? false} r={dotR} stroke={stroke} />
          <IntervalDot on={on} delay={delay} x={s.x2} y={s.y} open={s.rightOpen ?? false} r={dotR} stroke={stroke} />
        </React.Fragment>
      ))}
    </>
  );
}

/* re-export the palette/base bits maths scenes reach for most */
export { INK, MUTED } from "./kit";
