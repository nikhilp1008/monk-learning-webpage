"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { lookup } from "@/lib/widgets/registry";
import { useWidgetState } from "@/lib/widgets/use-widget-state";
import type { Cue, WidgetModule, WidgetTheme } from "@/lib/widgets/types";

/**
 * Draws one registry widget (xy_plot, ...) on the web board.
 *
 * The model never draws: it names a widget and fills its parameters, the
 * widget's own validate() is the only gate, and the drawing is deterministic
 * code reviewed once (see the phone's lib/widgets/CLAUDE.md). This host is the
 * small web counterpart of the phone's BoardWidget + WidgetHost: resolve the
 * module, validate, run cues, lay the figure out at a phone-board size and
 * enlarge it on a wide screen.
 *
 * Returns `null` through `onUnrenderable` when the payload cannot be drawn
 * (unknown widget, version too new, invalid params) so the caller can fall
 * back to the event's own SVG instead of an empty box.
 */

const THEME: WidgetTheme = {
  ink: "#1C1A16",
  inkMuted: "#57534B",
  rule: "rgba(28,26,22,.14)",
  accent: "#9A6A12",
  surface: "#FFFDF8",
  fontFamily: "Onest_400Regular",
  monoFontFamily: "Menlo",
};

const DESIGN_W_MAX = 495;
const ZOOM_MAX = 1.5;

type StepPayload = { widget?: string; version?: number; params?: unknown };

export interface SequenceStep {
  payload: StepPayload & { cues?: unknown };
  caption?: string;
  /** Absent on step 0, which is shown with the board itself. */
  seq?: number;
}

/** A `board_sequence` is drawable only if EVERY step is: one step this client
 *  cannot draw is a sequence with a hole in it (the server applies the same
 *  rule before sending one). */
export function canHostSequence(steps: readonly SequenceStep[] | undefined): boolean {
  return !!steps && steps.length > 0 && steps.every((s) => canHost(s.payload));
}

/** The step showing at `activeSeq`: the last whose `seq` has been reached. */
export function stepAt(steps: readonly SequenceStep[], activeSeq: number | null): number {
  let at = 0;
  if (activeSeq == null) return at;
  steps.forEach((s, i) => {
    if (i > 0 && typeof s.seq === "number" && s.seq <= activeSeq) at = i;
  });
  return at;
}

/** 1-3 boards on one segment, revealed by narration (see the phone's
 *  board-sequence.ts). Each step is a complete board with its own caption. */
export function SequenceHost({ steps, activeSeq }: { steps: readonly SequenceStep[]; activeSeq: number | null }) {
  const i = stepAt(steps, activeSeq);
  const step = steps[i];
  return (
    <div>
      {steps.length > 1 ? (
        <p className="mt-4 text-center text-xs font-bold tracking-wide text-ink-muted">
          {i + 1} / {steps.length}
        </p>
      ) : null}
      <WidgetHost
        key={i}
        payload={{ widget: step.payload.widget as string, version: step.payload.version, params: step.payload.params, cues: step.payload.cues as readonly Cue[] | undefined }}
        activeSeq={activeSeq}
        caption={step.caption}
      />
    </div>
  );
}

export function canHost(payload: StepPayload | null | undefined): boolean {
  if (!payload?.widget) return false;
  const mod = lookup(payload.widget, Number(payload.version) || 1);
  if (!mod) return false;
  return mod.validate(payload.params).ok;
}

function Plot<P extends object>({
  mod,
  base,
  cues,
  activeSeq,
  caption,
}: {
  mod: WidgetModule<P>;
  base: P;
  cues?: readonly Cue[];
  activeSeq: number | null;
  caption?: string;
}) {
  const { params, motion, caption: cueCaption } = useWidgetState(mod, base, cues, activeSeq);
  const hostRef = useRef<HTMLDivElement>(null);
  const [hostW, setHostW] = useState(DESIGN_W_MAX);
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHostW(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const W = Math.max(260, Math.min(DESIGN_W_MAX, hostW - 16));
  const zoom = Math.min(ZOOM_MAX, Math.max(1, (hostW - 16) / DESIGN_W_MAX));
  const H = Math.round(W * (W < 420 ? 0.69 : 0.545));
  const Component = mod.Component;
  const shown = cueCaption ?? caption;

  return (
    <div className="my-5 flex flex-col items-center">
      <div
        ref={hostRef}
        className="w-full max-w-2xl overflow-hidden rounded-xl border-[1.5px] border-ink/70 bg-cream-soft/70 p-2 shadow-sm"
      >
        <div style={{ zoom, margin: "0 auto", width: W }}>
          <Component params={params} motion={motion} width={W} height={H} theme={THEME} />
        </div>
      </div>
      {shown ? <p className="mt-2 text-sm text-ink-light text-center max-w-xl">{shown}</p> : null}
    </div>
  );
}

export function WidgetHost({
  payload,
  activeSeq,
  caption,
}: {
  payload: { widget: string; version?: number; params?: unknown; cues?: readonly Cue[] };
  activeSeq: number | null;
  caption?: string;
}) {
  const resolved = useMemo(() => {
    const mod = lookup(payload.widget, Number(payload.version) || 1);
    if (!mod) return null;
    const checked = mod.validate(payload.params);
    return checked.ok ? { mod, params: checked.params as object } : null;
  }, [payload]);
  if (!resolved) return null;
  // Keyed by the payload so a new board event starts from its own base params
  // and tween state instead of inheriting the previous one's.
  return (
    <Plot
      key={`${payload.widget}:${JSON.stringify(payload.params)}`}
      mod={resolved.mod}
      base={resolved.params}
      cues={payload.cues}
      activeSeq={activeSeq}
      caption={caption}
    />
  );
}
