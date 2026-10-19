"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Cue, WidgetModule } from "./types";

const TOKEN = /\{\{(\w+)\}\}/g;

function formatDerived(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

/** Fills `{{token}}` from `module.computeDerived(params)` -- the same function
 *  the widget's own readout uses, so the words and the number cannot disagree.
 *  An unknown token drops the WHOLE caption rather than showing braces. */
function interpolateCaption<P extends object>(
  caption: string | undefined,
  module: WidgetModule<P>,
  params: P
): string | null {
  if (!caption) return null;
  TOKEN.lastIndex = 0;
  if (!TOKEN.test(caption)) return caption;
  TOKEN.lastIndex = 0;
  const values = module.computeDerived(params);
  let missing = false;
  const filled = caption.replace(TOKEN, (_m, key: string) => {
    if (!(key in values)) {
      missing = true;
      return "";
    }
    return formatDerived(values[key]);
  });
  return missing ? null : filled;
}

const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

function motionOf<P extends object>(module: WidgetModule<P>, params: P): Record<string, number> {
  return Object.fromEntries(
    module.animatable.map((key) => [key, Number((params as Record<string, unknown>)[key] ?? 0)])
  );
}

/**
 * Narration-driven parameter changes. The web edition of the phone's
 * use-cue-track: the active cue is the one with the greatest `seq` that is
 * <= `activeSeq` (the highest board-event seq revealed so far this turn), so a
 * cue fires when its sentence is spoken and cannot run early or late.
 *
 * The active cue, its params and its caption are DERIVED during render (pure),
 * not stored. Only the tweened numbers are state: keys the module lists in
 * `animatable` ease (easeInOutQuad) toward the target from animation frames;
 * a cue with no `tween` lands on the next frame. A patch that fails validate()
 * is ignored. A new payload resets everything because the host remounts this
 * hook under a new key.
 */
export function useWidgetState<P extends object>(
  module: WidgetModule<P>,
  basePar: P,
  cues: readonly Cue[] | undefined,
  activeSeq: number | null
): { params: P; motion: Record<string, number>; caption: string | null } {
  const active = useMemo(() => {
    if (!cues || cues.length === 0 || activeSeq == null) return null;
    let cue: Cue | null = null;
    for (const c of [...cues].sort((a, b) => a.seq - b.seq)) {
      if (c.seq <= activeSeq) cue = c;
      else break;
    }
    if (!cue) return null;
    const checked = module.validate({ ...basePar, ...(cue.patch as Partial<P>) });
    if (!checked.ok) {
      console.warn("[widgets] cue patch rejected", checked.errors);
      return null;
    }
    return { cue, params: checked.params };
  }, [cues, activeSeq, basePar, module]);

  const params = active?.params ?? basePar;
  const caption = active ? interpolateCaption(active.cue.caption, module, active.params) : null;
  const tweenMs = active?.cue.tween ?? 0;

  const target = useMemo(() => motionOf(module, params), [module, params]);
  const [motion, setMotion] = useState<Record<string, number>>(target);
  const current = useRef(motion);

  useEffect(() => {
    const from = current.current;
    const t0 = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = tweenMs > 0 ? Math.min(1, (now - t0) / tweenMs) : 1;
      const e = easeInOutQuad(t);
      const next = Object.fromEntries(
        Object.keys(target).map((k) => [k, (from[k] ?? target[k]) + (target[k] - (from[k] ?? target[k])) * e])
      );
      current.current = next;
      setMotion(next);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, tweenMs]);

  return { params, motion, caption };
}
