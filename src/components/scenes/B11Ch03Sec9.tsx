"use client";

/**
 * B11 Ch03 · Section 9 — "The size range: unicell to kelp"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 * Subtopic 2 (Algae), second section. No erase — single growth-ladder
 * diagram builds left→right, then two closing beats stack below it.
 *
 * Beats (en [0, 14.08, 31.4, 46.25, 64.09, 82.35, 98.47, 119.55]):
 *  0 hook: size range is dramatic — one picture, not a list (dims at b>=1)
 *  1 empty axis: baseline + arrowhead, "four stops, body plan doesn't change"
 *  2 stop 1 — unicell: Chlamydomonas, one cell does everything
 *  3 stop 2 — colony: Volvox, hollow ball of cells
 *  4 stop 3 — filament: Spirogyra · Ulothrix, chain of SIMILAR cells
 *  5 stop 4 — kelp: giant brown seaweed, several metres
 *  6 synthesis: what did NOT change — same blueprint, no roots/vascular/seeds
 *  7 correction callout: size ≠ complexity, "bigger = advanced" is a trap
 *
 * Layout plan (Anek bl−0.78s..+0.31s; script only on title):
 *  always | title (script23 red)              | T mid | y61
 *  b0 | hook (12 muted, dims b>=1)             | T mid | y96
 *  b1 | axis caption (13 amber-d)              | T mid | y140
 *  b1 | baseline + arrowhead (ink)             | Draw  | x110..970 y320
 *  b2-5 | 4 stops, shapes sit ON baseline (bottom=320), labels below:
 *       tag (10 amber-d)      | T mid | y225 (fixed row, above tallest shape)
 *       shape (Fade+Draw fill AMBER/stroke AMBER_DARK) | cx180/420/660/900
 *       name (12 ink w700)    | T mid | y344
 *       detail1 (11 ink)      | T mid | y372
 *       detail2 (10 muted)    | T mid | y398
 *  b6 | synthesis line1 (13 green) / line2 (12 red) | T mid | y436 / y466
 *  b7 | correction box (red outline) x250 y494 w580 h98
 *  b7 | header (13 red w700) / line_a (12 ink) / footer (13 amber-d w700)
 *     | T mid | y518 / y546 / y574
 */

import React from "react";
import {
  SceneProps,
  useBeat,
  delayFor,
  Fade,
  Draw,
  T,
  arrowD,
  INK,
  MUTED,
  AMBER,
  AMBER_DARK,
  GREEN,
  RED,
} from "./kit";

function circleD(cx: number, cy: number, r: number): string {
  return `M ${cx - r} ${cy} A ${r} ${r} 0 1 0 ${cx + r} ${cy} A ${r} ${r} 0 1 0 ${
    cx - r
  } ${cy} Z`;
}

const BASELINE = 320;
const STOP_X = [180, 420, 660, 900];

export default function B11Ch03Sec9({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg
      viewBox="0 0 1080 620"
      preserveAspectRatio="xMidYMin meet"
      className="w-full h-full select-none"
    >
      {/* title — always on */}
      <Fade on={true}>
        <T x={540} y={61} size={23} fill={RED} script>
          {t("the size range: unicell to kelp", "size ki range: unicell se kelp tak")}
        </T>
      </Fade>

      {/* beat 0 — hook */}
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 0.3)}>
        <T x={540} y={96} size={12} fill={MUTED} anchor="middle" script={false}>
          {t(
            "the size range is genuinely dramatic — one picture, not a list",
            "algae mein size ki range sachmuch natakiya hai — ek picture, list nahi"
          )}
        </T>
      </Fade>

      {/* beat 1 — empty axis */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={540} y={140} size={13} fill={AMBER_DARK} anchor="middle" script={false}>
          {t(
            "four stops — size grows, body plan does not (watch what stays constant)",
            "chaar padaav — size badhta hai, body plan nahi (dekho kya sthir rehta)"
          )}
        </T>
      </Fade>
      <Draw on={beat >= 1} delay={dl(1, 1.2)} d={arrowD(110, BASELINE, 970, BASELINE)} stroke={INK} sw={2.2} dur={1.0} />

      {/* stop 1 — unicell */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={STOP_X[0]} y={225} size={10} fill={AMBER_DARK} anchor="middle" script={false}>
          UNICELL
        </T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 0.9)}>
        <Draw on={true} d={circleD(STOP_X[0], BASELINE - 12, 12)} fill={AMBER} stroke={AMBER_DARK} sw={1.5} dur={0.4} />
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 1.6)}>
        <T x={STOP_X[0]} y={344} size={12} fill={INK} weight={700} anchor="middle" script={false}>
          Chlamydomonas
        </T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 2.1)}>
        <T x={STOP_X[0]} y={372} size={11} fill={INK} anchor="middle" script={false}>
          {t("one cell does it all", "ek cell sab kuch karta")}
        </T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 2.6)}>
        <T x={STOP_X[0]} y={398} size={10} fill={MUTED} anchor="middle" script={false}>
          {t("(swims, photosynthesises)", "(tairta, photosynthesis karta)")}
        </T>
      </Fade>

      {/* stop 2 — colony */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={STOP_X[1]} y={225} size={10} fill={AMBER_DARK} anchor="middle" script={false}>
          COLONY
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 0.9)}>
        <Draw on={true} d={circleD(STOP_X[1], BASELINE - 22, 22)} fill={AMBER} stroke={AMBER_DARK} sw={1.5} dur={0.4} />
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 1.6)}>
        <T x={STOP_X[1]} y={344} size={12} fill={INK} weight={700} anchor="middle" script={false}>
          Volvox
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 2.1)}>
        <T x={STOP_X[1]} y={372} size={11} fill={INK} anchor="middle" script={false}>
          {t("hollow ball of cells", "cells ki khokhli ball")}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 2.6)}>
        <T x={STOP_X[1]} y={398} size={10} fill={MUTED} anchor="middle" script={false}>
          {t("(not tissue, not organ)", "(tissue nahi, organ nahi)")}
        </T>
      </Fade>

      {/* stop 3 — filament */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={STOP_X[2]} y={225} size={10} fill={AMBER_DARK} anchor="middle" script={false}>
          FILAMENT
        </T>
      </Fade>
      <Draw
        on={beat >= 4}
        delay={dl(4, 0.9)}
        d="M 610 296 h 100 v 24 h -100 z M 643 296 v 24 M 676 296 v 24"
        stroke={AMBER_DARK}
        sw={2}
        dur={0.6}
        fill={AMBER}
      />
      <Fade on={beat >= 4} delay={dl(4, 1.6)}>
        <T x={STOP_X[2]} y={344} size={12} fill={INK} weight={700} anchor="middle" script={false}>
          Spirogyra · Ulothrix
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 2.1)}>
        <T x={STOP_X[2]} y={372} size={11} fill={INK} anchor="middle" script={false}>
          {t("chain of SIMILAR cells", "SIMILAR cells ki chain")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 2.6)}>
        <T x={STOP_X[2]} y={398} size={10} fill={MUTED} anchor="middle" script={false}>
          {t("(same job, not a stem)", "(same kaam, stem nahi)")}
        </T>
      </Fade>

      {/* stop 4 — kelp */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={STOP_X[3]} y={225} size={10} fill={AMBER_DARK} anchor="middle" script={false}>
          KELP
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 0.9)}>
        <Draw on={true} d={circleD(STOP_X[3], BASELINE - 40, 40)} fill={AMBER} stroke={AMBER_DARK} sw={1.5} dur={0.5} />
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1.8)}>
        <T x={STOP_X[3]} y={344} size={12} fill={INK} weight={700} anchor="middle" script={false}>
          {t("giant brown seaweed", "vishaal brown seaweed")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 2.3)}>
        <T x={STOP_X[3]} y={372} size={11} fill={INK} anchor="middle" script={false}>
          {t("several metres long", "kai metre lambi")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 2.8)}>
        <T x={STOP_X[3]} y={398} size={10} fill={MUTED} anchor="middle" script={false}>
          {t("(still just bigger)", "(sirf bada — bas)")}
        </T>
      </Fade>

      {/* beat 6 — synthesis: what did NOT change */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={436} size={13} fill={GREEN} anchor="middle" script={false}>
          {t(
            "what did NOT change: every one = simple thalloid autotroph, same blueprint",
            "jo NAHI badla: har ek = simple thalloid autotroph, wahi blueprint"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1.4)}>
        <T x={540} y={466} size={12} fill={RED} anchor="middle" script={false}>
          {t(
            "✗ no roots · ✗ no vascular tissue · ✗ no seeds — it just got BIGGER",
            "✗ roots nahi · ✗ vascular tissue nahi · ✗ seeds nahi — bas BADA ho gaya"
          )}
        </T>
      </Fade>

      {/* beat 7 — correction callout */}
      <Draw
        on={beat >= 7}
        delay={dl(7, 0.3)}
        d="M 260 494 h 560 q 10 0 10 10 v 78 q 0 10 -10 10 h -560 q -10 0 -10 -10 v -78 q 0 -10 10 -10"
        stroke={RED}
        sw={2}
        dur={0.7}
      />
      <Fade on={beat >= 7} delay={dl(7, 1.3)}>
        <T x={540} y={518} size={13} fill={RED} weight={700} anchor="middle" script={false}>
          {t(
            "CORRECTION: kelp ≠ more advanced than Spirogyra",
            "CORRECTION: kelp Spirogyra se zyada advanced NAHI"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.9)}>
        <T x={540} y={546} size={12} fill={INK} anchor="middle" script={false}>
          {t(
            "bigger, but not vascularised — no true roots or leaves",
            "bada hai, par vascularised nahi — true roots ya leaves nahi"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 2.5)}>
        <T x={540} y={574} size={13} fill={AMBER_DARK} weight={700} anchor="middle" script={false}>
          {t(
            "SIZE ≠ COMPLEXITY — “bigger = advanced” is a trap",
            "SIZE ≠ COMPLEXITY — “bada = advanced” ek trap hai"
          )}
        </T>
      </Fade>
    </svg>
  );
}
