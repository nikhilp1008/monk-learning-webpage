"use client";

/**
 * Scene kit — declarative primitives for hand-choreographed board scenes.
 *
 * A Scene is a pure function of (currentTime, reveals): every element states
 * which narration beat it belongs to and appears/animates when the audio
 * crosses that beat's reveal timestamp. Seeking forward, backward, pausing
 * and language switches (different timestamps) all work for free.
 */

import React, { useEffect, useRef, useState } from "react";

export interface SceneProps {
  currentTime: number;
  reveals: number[];
  language: "english" | "hinglish";
}

/**
 * Index of the latest beat whose reveal time has STRICTLY passed (-1 = none).
 *
 * Strictly-greater (not >=) is deliberate: every section's first reveal is 0.0,
 * so at currentTime === 0 (paused, before the student presses play) this returns
 * -1 — the board is empty, nothing pre-drawn. The instant playback advances past
 * 0 the first beat activates and its elements animate in (a Fade/Draw that mounts
 * already `on` skips its transition, so gating from off→on is what makes them
 * actually draw). Everything therefore draws in step with the narration, never
 * before it. (Author the section title as always-on — `on={true}` — if you want
 * the heading visible on the blank board.)
 */
export function useBeat(currentTime: number, reveals: number[]): number {
  let beat = -1;
  for (let i = 0; i < reveals.length; i++) {
    if (currentTime > (reveals[i] ?? 0)) beat = i;
    else break;
  }
  return beat;
}

/**
 * Stagger helper: an element belonging to beat `k` keeps its choreographed
 * delay only while `k` is the CURRENT beat. Once the narration has moved on
 * (or the user seeks past it), it settles instantly — no ghost replays.
 */
export function delayFor(beat: number, k: number, d: number): number {
  return beat > k ? 0 : d;
}

/* ------------------------------------------------------------------ */
/* fade / rise group                                                   */
/* ------------------------------------------------------------------ */

export function Fade({
  on,
  delay = 0,
  dim = false,
  children,
}: {
  on: boolean;
  /** seconds after the beat fires */
  delay?: number;
  /** render at low opacity instead of full (for de-emphasised elements) */
  dim?: boolean;
  children: React.ReactNode;
}) {
  return (
    // Keyed by delay: CSS transitions capture their delay when they start, so
    // merely updating transition-delay cannot cancel a pending stagger. When
    // the beat moves on and delayFor collapses the delay, the key change
    // remounts the group, which lands in its settled state instantly.
    <g
      key={`d${delay}`}
      className="sc-fade"
      style={{
        opacity: on ? (dim ? 0.14 : 1) : 0,
        transform: on ? "none" : "translateY(8px)",
        transitionDelay: on ? `${delay}s` : "0s",
      }}
    >
      {children}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* stroke-drawn path                                                   */
/* ------------------------------------------------------------------ */

export function Draw({
  on,
  d,
  stroke,
  sw = 2.4,
  delay = 0,
  dur = 1,
  fill = "none",
}: {
  on: boolean;
  d: string;
  stroke: string;
  sw?: number;
  delay?: number;
  dur?: number;
  fill?: string;
}) {
  return (
    // Same remount-on-settle trick as Fade — see the comment there.
    <path
      key={`d${delay}`}
      d={d}
      pathLength={100}
      fill={fill}
      stroke={stroke}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        strokeDasharray: 100,
        strokeDashoffset: on ? 0 : 100,
        transition: `stroke-dashoffset ${dur}s cubic-bezier(0.25,0.1,0.35,1) ${
          on ? delay : 0
        }s`,
      }}
    />
  );
}

/** Straight arrow with a drawn head, as a single Draw path. */
export function arrowD(x1: number, y1: number, x2: number, y2: number): string {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const h = 11;
  return `M ${x1} ${y1} L ${x2} ${y2} M ${x2 - h * Math.cos(a - 0.46)} ${
    y2 - h * Math.sin(a - 0.46)
  } L ${x2} ${y2} L ${x2 - h * Math.cos(a + 0.46)} ${y2 - h * Math.sin(a + 0.46)}`;
}

/** Hand-drawn ellipse for circling something on the board. */
export function ringD(cx: number, cy: number, rx: number, ry: number): string {
  return `M ${cx - rx} ${cy} C ${cx - rx} ${cy - ry * 1.25}, ${cx + rx * 0.9} ${
    cy - ry * 1.3
  }, ${cx + rx} ${cy - ry * 0.1} C ${cx + rx * 1.05} ${cy + ry * 1.2}, ${
    cx - rx * 0.8
  } ${cy + ry * 1.35}, ${cx - rx * 1.02} ${cy + ry * 0.15}`;
}

/** Cross-out (two drawn strokes) over a bounding box. */
export function crossD(x: number, y: number, w: number, h: number): string {
  return `M ${x - 4} ${y - 3} L ${x + w + 4} ${y + h + 3} M ${x + w + 4} ${
    y - 3
  } L ${x - 4} ${y + h + 3}`;
}

/* ------------------------------------------------------------------ */
/* text + chips                                                        */
/* ------------------------------------------------------------------ */

type Anchor = "start" | "middle" | "end";

export function T({
  x,
  y,
  size,
  fill,
  anchor = "middle",
  script = false,
  weight,
  children,
}: {
  x: number;
  y: number;
  size: number;
  fill: string;
  anchor?: Anchor;
  script?: boolean;
  weight?: number;
  children: React.ReactNode;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fill={fill}
      textAnchor={anchor}
      fontWeight={weight ?? (script ? 700 : 600)}
      fontFamily={
        script
          ? "var(--font-kalam), cursive"
          : "var(--font-anek-latin), sans-serif"
      }
    >
      {children}
    </text>
  );
}

export function Chip({
  x,
  y,
  w,
  h,
  fill,
  stroke,
  textFill,
  size = 19,
  script = true,
  dashed = false,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  stroke?: string;
  textFill: string;
  size?: number;
  script?: boolean;
  dashed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={Math.min(14, h / 2)}
        fill={fill}
        stroke={stroke || "none"}
        strokeWidth={1.8}
        strokeDasharray={dashed ? "7 6" : undefined}
      />
      <T
        x={x + w / 2}
        y={y + h / 2 + size * 0.34}
        size={size}
        fill={textFill}
        script={script}
      >
        {children}
      </T>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* animated counter                                                    */
/* ------------------------------------------------------------------ */

export function useCountUp(
  active: boolean,
  to: number,
  durS: number,
  delayS = 0
): number {
  const [val, setVal] = useState(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    cancelAnimationFrame(raf.current);
    if (!active) {
      setVal(0);
      return;
    }
    const t0 = performance.now() + delayS * 1000;
    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - t0) / (durS * 1000)));
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      setVal(Math.round(to * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [active, to, durS, delayS]);
  return active ? val : 0;
}

/**
 * Timeline label — returns the label whose time has passed, driven by
 * elapsed time since the beat activated (for e.g. a stepping counter).
 */
export function useTimelineLabel(
  active: boolean,
  steps: [number, string][]
): string {
  const [label, setLabel] = useState("");
  const raf = useRef<number>(0);
  useEffect(() => {
    cancelAnimationFrame(raf.current);
    if (!active) {
      setLabel("");
      return;
    }
    const t0 = performance.now();
    const tick = (now: number) => {
      const el = (now - t0) / 1000;
      let cur = "";
      for (const [t, l] of steps) if (el >= t) cur = l;
      setLabel(cur);
      if (el < steps[steps.length - 1][0] + 0.2)
        raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
  return active ? label : "";
}

/* ------------------------------------------------------------------ */
/* palette shortcuts                                                   */
/* ------------------------------------------------------------------ */

export const INK = "#1C1A16";
export const INK_LIGHT = "#57534B";
export const MUTED = "#9C988C";
export const AMBER = "#EEA31F";
export const AMBER_DARK = "#9A6A12";
export const GREEN = "#1C9B57";
export const GREEN_DARK = "#157A45";
export const RED = "#DD4433";
export const CREAM = "#FCF4E0";
export const PAPER = "#FFFEFB";
