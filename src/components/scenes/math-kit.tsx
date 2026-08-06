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

/* ------------------------------------------------------------------ */
/* angles + unit circle                                                 */
/* ------------------------------------------------------------------ */

/**
 * Point on a circle at standard math angle `theta` (radians, counterclockwise
 * from positive x-axis) — flips the y term so increasing theta sweeps
 * counterclockwise on screen despite SVG's y-down coordinate system.
 */
export function pointOnCircle(
  cx: number,
  cy: number,
  r: number,
  theta: number
): { x: number; y: number } {
  return { x: cx + r * Math.cos(theta), y: cy - r * Math.sin(theta) };
}

/**
 * Arc marking the angle swept from theta1 to theta2 (radians, standard math
 * convention — see pointOnCircle) at radius r from (cx,cy). Feed to <Draw/>.
 */
export function angleArcD(
  cx: number,
  cy: number,
  r: number,
  theta1: number,
  theta2: number
): string {
  const p1 = pointOnCircle(cx, cy, r, theta1);
  const p2 = pointOnCircle(cx, cy, r, theta2);
  const large = Math.abs(theta2 - theta1) > Math.PI ? 1 : 0;
  const sweep = theta2 > theta1 ? 0 : 1; // y-flip inverts the sweep-flag sense
  return `M ${p1.x} ${p1.y} A ${r} ${r} 0 ${large} ${sweep} ${p2.x} ${p2.y}`;
}

/**
 * Standard unit-circle diagram: circle, faint x/y axes through the center, a
 * point at angle `theta`, the radius line to it, and (optional) drop
 * perpendiculars to both axes — the classic "cos θ, sin θ as coordinates"
 * picture. Drop lines render as thin MUTED strokes rather than a true dashed
 * pattern (Draw's dasharray slot is already used for the reveal animation).
 * Stage the circle/axes on one beat and the radius+point on a later one if
 * the narration wants that; pass matching `on`/`delay` for both if not.
 */
export function UnitCircleDiagram({
  on,
  delay = 0,
  cx,
  cy,
  r = 120,
  theta,
  stroke = INK,
  radiusColor = INK,
  showDrops = true,
  axisOverhang = 20,
}: {
  on: boolean;
  delay?: number;
  cx: number;
  cy: number;
  r?: number;
  theta: number;
  stroke?: string;
  radiusColor?: string;
  showDrops?: boolean;
  axisOverhang?: number;
}) {
  const p = pointOnCircle(cx, cy, r, theta);
  return (
    <>
      <Draw on={on} d={circleD(cx, cy, r)} stroke={stroke} sw={2} delay={delay} />
      <Draw
        on={on}
        d={lineD(cx - r - axisOverhang, cy, cx + r + axisOverhang, cy)}
        stroke={MUTED}
        sw={1.4}
        delay={delay}
      />
      <Draw
        on={on}
        d={lineD(cx, cy + r + axisOverhang, cx, cy - r - axisOverhang)}
        stroke={MUTED}
        sw={1.4}
        delay={delay}
      />
      <Draw on={on} d={lineD(cx, cy, p.x, p.y)} stroke={radiusColor} sw={2.4} delay={delay + 0.3} />
      {showDrops && (
        <>
          <Draw on={on} d={lineD(p.x, p.y, p.x, cy)} stroke={MUTED} sw={1.4} delay={delay + 0.6} />
          <Draw on={on} d={lineD(p.x, p.y, cx, p.y)} stroke={MUTED} sw={1.4} delay={delay + 0.6} />
        </>
      )}
      <Fade on={on} delay={delay + 0.6}>
        <circle cx={p.x} cy={p.y} r={4} fill={radiusColor} />
      </Fade>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* periodic wave graphs (sin/cos)                                       */
/* ------------------------------------------------------------------ */

/**
 * Samples fn (default Math.sin) across [x0,x1] and threads a smooth curve
 * through the samples via curveD — for graphing sin/cos-family functions.
 * pxPerRadian sets the horizontal scale; amplitude/phaseShift are in board
 * pixels/radians respectively. NOT for tan/cot/sec/csc — those have
 * asymptotes a single continuous curve would wrongly bridge; draw those
 * branch by branch with lineD/curveD per continuous piece instead.
 */
export function waveD(
  x0: number,
  x1: number,
  y0: number,
  amplitude: number,
  pxPerRadian: number,
  phaseShift = 0,
  fn: (t: number) => number = Math.sin,
  steps = 48
): string {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = x0 + ((x1 - x0) * i) / steps;
    const t = (x - x0) / pxPerRadian - phaseShift;
    points.push({ x, y: y0 - amplitude * fn(t) });
  }
  return curveD(points);
}

/* ------------------------------------------------------------------ */
/* overline (conjugate z̄, mean x̄, ...)                                 */
/* ------------------------------------------------------------------ */

/**
 * Short bar drawn above a glyph/word — for conjugate (z̄) or mean (x̄)
 * notation. The combining overline mark (like the physics combining
 * vector-arrow, U+20D7) renders as tofu in the board fonts, so this is a
 * real drawn stroke instead, positioned from the same text-box-top formula
 * as the base spec's label math (Anek sans top = y − 0.78×size, Kalam
 * script top = y − 1.3×size). `x`/`y`/`size`/`anchor` must match the <T/>
 * call it sits above; `textWidth` is your estimate of that glyph's width
 * (same estimation rules as base spec Step 3).
 */
export function Overline({
  on,
  delay = 0,
  x,
  y,
  size,
  textWidth,
  anchor = "middle",
  stroke = INK,
  script = false,
}: {
  on: boolean;
  delay?: number;
  x: number;
  y: number;
  size: number;
  textWidth: number;
  anchor?: "start" | "middle" | "end";
  stroke?: string;
  script?: boolean;
}) {
  const top = y - (script ? 1.3 : 0.78) * size - 3;
  const x1 = anchor === "middle" ? x - textWidth / 2 : anchor === "end" ? x - textWidth : x;
  const x2 = anchor === "middle" ? x + textWidth / 2 : anchor === "end" ? x : x + textWidth;
  return <Draw on={on} d={lineD(x1, top, x2, top)} stroke={stroke} sw={2} delay={delay} />;
}

/* ------------------------------------------------------------------ */
/* half-plane shading (linear inequalities in two variables)           */
/* ------------------------------------------------------------------ */

/**
 * Shades the side of the line through (x1,y1)-(x2,y2) that contains
 * (testX,testY), clipped to a bounding box — for graphing y > mx+c style
 * inequalities. Real SVG clip composition (a large quadrilateral covering
 * the correct side, intersected with the box via nested <clipPath>), not a
 * hand-approximated polygon — pick `testX,testY` as the point the section's
 * own "test point" argument uses (often the origin) so the shaded side
 * matches the reasoning on the board.
 */
export function HalfPlaneShade({
  on,
  delay = 0,
  x1,
  y1,
  x2,
  y2,
  testX,
  testY,
  boxX = 0,
  boxY = 0,
  boxW = 1080,
  boxH = 620,
  fill,
  opacity = 0.28,
}: {
  on: boolean;
  delay?: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  testX: number;
  testY: number;
  boxX?: number;
  boxY?: number;
  boxW?: number;
  boxH?: number;
  fill: string;
  opacity?: number;
}) {
  const uid = useId().replace(/[:]/g, "");
  const clipId = `halfplane-clip-${uid}`;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const nx = -uy;
  const ny = ux;
  const side = (testX - x1) * nx + (testY - y1) * ny;
  const sign = side >= 0 ? 1 : -1;
  const EXT = 3000;
  const p1 = { x: x1 - ux * EXT, y: y1 - uy * EXT };
  const p2 = { x: x2 + ux * EXT, y: y2 + uy * EXT };
  const p3 = { x: p2.x + nx * sign * EXT, y: p2.y + ny * sign * EXT };
  const p4 = { x: p1.x + nx * sign * EXT, y: p1.y + ny * sign * EXT };
  const polyD = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} L ${p4.x} ${p4.y} Z`;
  return (
    <Fade on={on} delay={delay}>
      <defs>
        <clipPath id={clipId}>
          <path d={polyD} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect x={boxX} y={boxY} width={boxW} height={boxH} fill={fill} opacity={opacity} />
      </g>
    </Fade>
  );
}

/* ------------------------------------------------------------------ */
/* wavy-curve method (non-linear/rational inequalities)                 */
/* ------------------------------------------------------------------ */

/**
 * The "wavy curve" that snakes through a number line's marked roots,
 * alternating above/below at each crossing — the standard method for
 * solving polynomial/rational inequalities. `roots` need not be pre-sorted.
 * `aboveOnRight` sets the sign of the rightmost region (from the leading
 * coefficient's sign, per the method) and the rest alternates from there.
 * Feed the result to <Draw/>; mark each root itself with a plain dot
 * (open/closed per whether it's included) using IntervalDot, same as any
 * interval endpoint.
 */
export function wavyCurveD(
  roots: number[],
  y: number,
  amplitude: number,
  xLeft: number,
  xRight: number,
  aboveOnRight = true
): string {
  const sorted = [...roots].sort((a, b) => a - b);
  const n = sorted.length;
  const bounds = [xLeft, ...sorted, xRight];
  const points: { x: number; y: number }[] = [];
  for (let region = 0; region <= n; region++) {
    const flip = (n - region) % 2 === 1;
    const isAbove = flip ? !aboveOnRight : aboveOnRight;
    const segLeft = bounds[region];
    const segRight = bounds[region + 1];
    const midY = y - (isAbove ? amplitude : -amplitude);
    if (region === 0) points.push({ x: segLeft, y: midY });
    points.push({ x: (segLeft + segRight) / 2, y: midY });
    if (region < n) points.push({ x: sorted[region], y });
    if (region === n) points.push({ x: segRight, y: midY });
  }
  return curveD(points);
}

/* ------------------------------------------------------------------ */
/* checkmark (verified / sanity-check stamp)                           */
/* ------------------------------------------------------------------ */

/** Hand-drawn checkmark — short downstroke then a longer upstroke, same
 * "draw it, don't rely on a fallback glyph" reasoning as Overline. Common
 * enough across worked-example/tips sections to be worth a primitive. */
export function checkD(x: number, y: number, size = 16): string {
  return `M ${x - size * 0.5} ${y} L ${x - size * 0.15} ${y + size * 0.35} L ${x + size * 0.5} ${y - size * 0.4}`;
}

/* re-export the palette/base bits maths scenes reach for most */
export { INK, MUTED } from "./kit";
