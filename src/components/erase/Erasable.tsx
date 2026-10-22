"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Rub-to-delete, for one card. A port of the phone's erase feature
 * (monk-learning-mobile handoff_erase_feature/MECHANICS.md); the numbers below
 * are that document's, so the two feel alike.
 *
 * While `active`, an overlay owns the pointer for this card: rubbing paints
 * card-coloured paper over the content on a canvas (painting paper over ink is
 * what makes the ink disappear; nothing is cut out). Progress is measured on a
 * coarse grid, so it rewards TRAVEL, not time: scrubbing one spot marks one
 * cell and never commits. Lift above 55% and the card collapses and `onRemove`
 * fires; lift below it and the strokes fade and the card is exactly as it was.
 * Nothing is asked, nothing is confirmed: the gesture is the confirmation.
 */

export const ERASE = {
  radius: 27,
  spacing: 9,
  cols: 10,
  rows: 4,
  threshold: 0.55,
  restoreMs: 300,
  dipMs: 200,
  collapseMs: 340,
  undoMs: 5000,
};

const COLLAPSE_EASE = "cubic-bezier(.3,.85,.3,1)";

function reducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

/** "rgb(r, g, b)" or "rgba(...)" -> [r, g, b]; falls back to white. */
function rgbOf(css: string): [number, number, number] {
  const m = /rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/.exec(css);
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : [255, 255, 255];
}

type Phase = "idle" | "dip" | "collapse";

export function Erasable({
  active,
  onRemove,
  label,
  children,
  className = "",
}: {
  /** Erase mode: the overlay is mounted and rubbing works. */
  active: boolean;
  /** Called once the collapse has finished; the caller drops the item. */
  onRemove: () => void;
  /** Names the card for the keyboard/screen-reader "Remove" action. */
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [wrapStyle, setWrapStyle] = useState<React.CSSProperties>({});
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const rub = useRef<{
    pointerId: number;
    rect: DOMRect;
    last: { x: number; y: number };
    marked: Set<number>;
    paper: [number, number, number];
    lastDust: { x: number; y: number };
  } | null>(null);

  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);
  useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  const stamp = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    const r = rub.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !r) return;
    const [pr, pg, pb] = r.paper;
    const g = ctx.createRadialGradient(x, y, 0, x, y, ERASE.radius);
    g.addColorStop(0, `rgba(${pr},${pg},${pb},1)`);
    g.addColorStop(0.62, `rgba(${pr},${pg},${pb},0.97)`);
    g.addColorStop(1, `rgba(${pr},${pg},${pb},0)`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, ERASE.radius, 0, Math.PI * 2);
    ctx.fill();
    // Stamps past the edge are clamped to the edge cells.
    const col = Math.min(ERASE.cols - 1, Math.max(0, Math.floor((x / r.rect.width) * ERASE.cols)));
    const row = Math.min(ERASE.rows - 1, Math.max(0, Math.floor((y / r.rect.height) * ERASE.rows)));
    r.marked.add(row * ERASE.cols + col);
  }, []);

  const puffDust = useCallback((x: number, y: number) => {
    const host = dustRef.current;
    if (!host || reducedMotion()) return;
    // Never leave particles accumulating in the tree.
    while (host.childElementCount > 18) host.firstElementChild?.remove();
    for (let i = 0; i < 2; i++) {
      const s = document.createElement("span");
      const size = 2 + Math.random() * 2.2;
      s.style.cssText =
        `position:absolute;left:${x + (Math.random() * 16 - 8)}px;top:${y + (Math.random() * 14 - 7)}px;` +
        `width:${size}px;height:${size}px;border-radius:50%;background:rgba(28,26,22,.3);pointer-events:none;` +
        `animation:mlDust ${0.7 + Math.random() * 0.5}s ease-out forwards`;
      host.appendChild(s);
      setTimeout(() => s.remove(), 1300);
    }
  }, []);

  const progress = () => (rub.current ? rub.current.marked.size / (ERASE.cols * ERASE.rows) : 0);

  const clearCanvas = () => {
    const c = canvasRef.current;
    c?.getContext("2d")?.clearRect(0, 0, c.width, c.height);
  };

  const commit = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return onRemove();
    if (dustRef.current) dustRef.current.innerHTML = "";
    const reduce = reducedMotion();
    setPhase("dip");
    setWrapStyle(
      reduce
        ? { transition: "opacity 200ms linear", opacity: 0 }
        : { transition: `transform ${ERASE.dipMs}ms ease, opacity ${ERASE.dipMs}ms ease`, transform: "scale(.965)", opacity: 0.55 }
    );
    if (reduce) {
      later(onRemove, 200 + 80);
      return;
    }
    later(() => {
      // Lock the measured height, then animate it to nothing: siblings are
      // laid out by the browser, so they rise into the space instead of
      // jumping. Removing the node first and animating after is where the
      // jump comes from.
      const h = el.getBoundingClientRect().height;
      setPhase("collapse");
      setWrapStyle({ height: h, overflow: "hidden", opacity: 0.55, transform: "scale(.965)" });
      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          setWrapStyle({
            height: 0,
            overflow: "hidden",
            opacity: 0,
            transform: "scale(.94)",
            marginTop: 0,
            marginBottom: -12,
            paddingTop: 0,
            paddingBottom: 0,
            transition: `height ${ERASE.collapseMs}ms ${COLLAPSE_EASE}, margin ${ERASE.collapseMs}ms ${COLLAPSE_EASE}, opacity ${ERASE.collapseMs}ms ease, transform ${ERASE.collapseMs}ms ease`,
          })
        )
      );
      later(onRemove, ERASE.collapseMs + 80);
    }, ERASE.dipMs);
  }, [later, onRemove]);

  const restore = useCallback(() => {
    const c = canvasRef.current;
    if (c) {
      c.style.transition = `opacity ${ERASE.restoreMs}ms ease`;
      c.style.opacity = "0";
    }
    setWrapStyle({ transition: "transform 200ms ease", transform: "none" });
    later(() => {
      clearCanvas();
      if (c) {
        c.style.transition = "none";
        c.style.opacity = "1";
      }
    }, ERASE.restoreMs + 20);
  }, [later]);

  const onPointerDown = (e: React.PointerEvent) => {
    // Ignore a second finger: only the first pointer drives a rub.
    if (rub.current || phase !== "idle" || e.button > 0) return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    e.preventDefault();
    const rect = wrap.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
    const ctx = canvas.getContext("2d");
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    canvas.style.transition = "none";
    canvas.style.opacity = "1";
    // The paper is the card's own colour (dark mode, tinted cards).
    const card = (wrap.firstElementChild as HTMLElement | null) ?? wrap;
    const paper = rgbOf(getComputedStyle(card).backgroundColor);
    const start = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    rub.current = { pointerId: e.pointerId, rect, last: start, marked: new Set(), paper, lastDust: start };
    stamp(start.x, start.y);

    const move = (ev: PointerEvent) => {
      const r = rub.current;
      if (!r || ev.pointerId !== r.pointerId) return;
      const p = { x: ev.clientX - r.rect.left, y: ev.clientY - r.rect.top };
      const dist = Math.hypot(p.x - r.last.x, p.y - r.last.y);
      // Interpolate so a fast move leaves a continuous stroke, not dots.
      const steps = Math.max(1, Math.ceil(dist / ERASE.spacing));
      for (let i = 1; i <= steps; i++) {
        stamp(r.last.x + ((p.x - r.last.x) * i) / steps, r.last.y + ((p.y - r.last.y) * i) / steps);
      }
      if (Math.hypot(p.x - r.lastDust.x, p.y - r.lastDust.y) > 10) {
        puffDust(p.x, p.y);
        r.lastDust = p;
      }
      r.last = p;
      if (!reducedMotion()) {
        // The card thins as it clears, capped so it never shrinks out of the list.
        setWrapStyle({ transform: `scale(${1 - Math.min(0.035, progress() * 0.05)})` });
      }
    };
    const up = (ev: PointerEvent) => {
      if (!rub.current || ev.pointerId !== rub.current.pointerId) return;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      const done = progress() > ERASE.threshold;
      rub.current = null;
      if (done) commit();
      else restore();
    };
    // Rubbing continues if the pointer leaves the card (a real eraser overshoots).
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };

  return (
    <div
      ref={wrapRef}
      className={`relative ${className}`}
      style={wrapStyle}
      data-erasing={active ? "true" : undefined}
    >
      {children}
      {active && phase === "idle" && (
        <>
          <canvas
            ref={canvasRef}
            aria-hidden
            className="absolute inset-0 w-full h-full pointer-events-none rounded-[16px]"
          />
          <div ref={dustRef} aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden rounded-[16px]" />
          {/* Owns the pointer for this card, so a rub is not a click-through and
              (touch-action: none) the page does not scroll under the finger. */}
          <div
            onPointerDown={onPointerDown}
            className="absolute inset-0 rounded-[16px] cursor-crosshair"
            style={{ touchAction: "none" }}
          />
          {/* The gesture cannot be the only way to remove a card. */}
          <button
            type="button"
            onClick={commit}
            aria-label={`Remove ${label}`}
            className="absolute right-2 top-2 z-10 rounded-full bg-white/90 border border-border-subtle px-2.5 py-0.5 text-[0.68rem] font-bold text-ink-light hover:text-red-dark"
          >
            Remove
          </button>
        </>
      )}
    </div>
  );
}
