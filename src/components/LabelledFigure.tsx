"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  HAIRLINE_STROKE,
  LABEL_SIZE,
  READOUT_SIZE,
  hasDevanagari,
  textWidth,
} from "@/lib/widgets/chrome";
import {
  ANCHOR_R,
  LEADER_MIN_DRAW,
  LEADER_STROKE,
  PILL_LINE_H,
  PILL_RADIUS,
  SMALLEST_BOARD,
  layoutFigure,
  type Lang,
} from "@/lib/widgets/labelled-figure/figure-layout";
import { validate } from "@/lib/widgets/labelled-figure/validate";
import type { FigureRecord } from "@/lib/widgets/labelled-figure/figure-resolver";
import { loadFigure } from "@/lib/widgets/labelled-figure/web-resolver";

/**
 * `labelled_figure` on the web: sourced art with a label layer drawn over it
 * (labelled anatomy, dissections, floral diagrams). Ported from the phone's
 * lib/widgets/labelled-figure/index.tsx; the placement maths
 * (figure-layout.ts, label-set.ts, validate.ts, chrome.ts) is the phone's own
 * code, unchanged, so a label lands where the author meant on both.
 *
 * Differences from the phone:
 *  - The layout is computed at the phone's board width (343) and the finished
 *    drawing is enlarged with CSS zoom on a wider column, as the textbook
 *    figures are, so 12px labels do not shrink against a 580px plate.
 *  - Each label line is given `textLength` equal to the width the layout
 *    priced it at. The layout measures with the phone's font (Onest); the web
 *    draws in its own UI face, and forcing the planned length keeps the text
 *    inside its pill whatever the face's real advances are.
 *  - There are no narration cues here, so a figure with several label groups
 *    gets chips to step through them (the phone advances by cue).
 */

const DESIGN_W = SMALLEST_BOARD.width; // 343
const ZOOM_MAX = 1.7;
const THEME = {
  ink: "#1C1A16",
  inkMuted: "#57534B",
  rule: "rgba(28,26,22,.25)",
  accent: "#DD4433",
  surface: "#FFFEFB",
};
const SANS = "var(--font-sans), system-ui, sans-serif";
const DEVA = "var(--font-devanagari), var(--font-sans), sans-serif";

export function LabelledFigure({
  slug,
  lang,
  activeGroup,
  caption,
}: {
  slug: string;
  lang: Lang;
  /** The group the payload asked for; the student can step through the rest. */
  activeGroup?: string | null;
  caption?: string;
}) {
  const [record, setRecord] = useState<FigureRecord | null>(null);
  const [failed, setFailed] = useState(false);
  const [group, setGroup] = useState<string | null>(activeGroup ?? null);
  const hostRef = useRef<HTMLDivElement>(null);
  const [hostW, setHostW] = useState<number>(DESIGN_W);

  useEffect(() => {
    let cancelled = false;
    loadFigure(slug).then((r) => {
      if (cancelled) return;
      if (r) setRecord(r);
      else setFailed(true);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHostW(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const params = useMemo(() => {
    if (!record) return null;
    const first = record.groups[0]?.id ?? "";
    const wanted =
      group && record.groups.some((g) => g.id === group) ? group : first;
    const checked = validate({ ...record, lang, active_group: wanted });
    if (!checked.ok) {
      console.warn(`[labelled_figure] "${slug}" refused:`, checked.errors);
      return null;
    }
    return checked.params;
  }, [record, lang, group, slug]);

  const ratio = Math.min(ZOOM_MAX, Math.max(1, hostW / DESIGN_W));
  const W = Math.min(DESIGN_W, hostW);
  const layout = useMemo(() => {
    if (!params) return null;
    const multi = params.groups.length > 1;
    const artH = (W * params.art.intrinsic_h) / params.art.intrinsic_w;
    const H = Math.max(SMALLEST_BOARD.height * (W / DESIGN_W), artH + (multi ? READOUT_SIZE * 2.6 : 0));
    return { H, ...{ l: layoutFigure(params, W, H) } };
  }, [params, W]);

  // A figure that cannot be drawn is nothing, never an endless spinner.
  if (failed || (record && !params)) return null;
  const familyFor = (t: string) => (hasDevanagari(t) ? DEVA : SANS);

  return (
    <div className="my-5 flex flex-col items-center">
      <div
        ref={hostRef}
        className="relative w-full max-w-xl overflow-hidden rounded-xl border-[1.5px] border-ink/70 bg-cream-soft/70 p-2 shadow-sm"
      >
        {!params || !layout ? (
          <div className="h-48 grid place-items-center text-sm text-ink-muted">Loading figure…</div>
        ) : (
          <div style={{ zoom: ratio, margin: "0 auto", width: W }}>
            <svg width={W} height={layout.H} role="img" aria-label={caption || "Labelled figure"}>
              <image
                x={layout.l.fit.ox}
                y={layout.l.fit.oy}
                width={layout.l.fit.sW}
                height={layout.l.fit.sH}
                href={(params.art.source as { uri: string }).uri}
                preserveAspectRatio="none"
              />
              {layout.l.strip ? (
                <g>
                  <rect
                    x={layout.l.strip.plate.x}
                    y={layout.l.strip.plate.y}
                    width={layout.l.strip.plate.w}
                    height={layout.l.strip.plate.h}
                    fill={THEME.surface}
                  />
                  <text
                    x={layout.l.strip.x}
                    y={layout.l.strip.y}
                    fontSize={READOUT_SIZE}
                    fontFamily={familyFor(layout.l.strip.text)}
                    fill={THEME.inkMuted}
                    textAnchor="start"
                  >
                    {layout.l.strip.text}
                  </text>
                </g>
              ) : null}
              {layout.l.labels.map((l) => (
                <g key={l.id}>
                  {l.leaderLen >= LEADER_MIN_DRAW ? (
                    l.via ? (
                      <>
                        <line x1={l.stub.x} y1={l.stub.y} x2={l.via.x} y2={l.via.y} stroke={THEME.ink} strokeWidth={LEADER_STROKE} />
                        <line x1={l.via.x} y1={l.via.y} x2={l.anchor.x} y2={l.anchor.y} stroke={THEME.ink} strokeWidth={LEADER_STROKE} />
                      </>
                    ) : (
                      <line x1={l.stub.x} y1={l.stub.y} x2={l.anchor.x} y2={l.anchor.y} stroke={THEME.ink} strokeWidth={LEADER_STROKE} />
                    )
                  ) : null}
                  <circle cx={l.anchor.x} cy={l.anchor.y} r={ANCHOR_R} fill={THEME.accent} />
                  <rect
                    x={l.plate.x}
                    y={l.plate.y}
                    width={l.plate.w}
                    height={l.plate.h}
                    rx={PILL_RADIUS}
                    ry={PILL_RADIUS}
                    fill={THEME.surface}
                    stroke={THEME.rule}
                    strokeWidth={HAIRLINE_STROKE}
                  />
                  {l.lines.map((line, i) => (
                    <text
                      key={i}
                      x={l.tx}
                      y={l.ty + i * PILL_LINE_H}
                      fontSize={LABEL_SIZE}
                      fontFamily={familyFor(l.text)}
                      fill={THEME.ink}
                      textAnchor={l.textAnchor}
                      textLength={textWidth(line, LABEL_SIZE)}
                      lengthAdjust="spacingAndGlyphs"
                    >
                      {line}
                    </text>
                  ))}
                </g>
              ))}
            </svg>
          </div>
        )}
      </div>

      {record && record.groups.length > 1 && (
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          {record.groups.map((g) => {
            const on = params?.active_group === g.id;
            return (
              <button
                key={g.id}
                type="button"
                aria-pressed={on}
                onClick={() => setGroup(g.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                  on ? "bg-ink text-white border-ink" : "border-border-subtle text-ink-light hover:text-ink"
                }`}
              >
                {g.label[lang]}
              </button>
            );
          })}
        </div>
      )}
      {caption ? <p className="mt-2 text-sm text-ink-light text-center max-w-xl">{caption}</p> : null}
    </div>
  );
}
