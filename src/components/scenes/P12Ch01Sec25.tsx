"use client";

/**
 * P12Ch01 · Section 25 — "Defining the Field: Force per Unit Positive Charge"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md & SCENE_PLAYBOOK.md.
 *
 * OBJECT-RICH OPEN CHALKBOARD DESIGN (NO HEAVY CONTAINERS):
 *  - Formal definition: Electric Field E = lim (q₀ → 0) [ F / q₀ ]
 *  - Unit: N/C or V/m
 *  - Point charge field: E = k Q / r²
 *  - Drawn point charge +Q with field vector E at distance r
 *
 * Beats (en [0, 6, 20, 32, 44, 56, 66, 78]):
 *  0 Title "defining the field: force per unit positive charge" + drawn underline
 *  1 Hook note: formal mathematical definition of Electric Field intensity E!
 *  2 Badge 1 & Mathematical Definition: E = lim (q₀ → 0) [ F / q₀ ]
 *  3 Why vanishing test charge (q₀ → 0)? Prevents q₀ from distorting source field Q!
 *  4 Badge 2 & Point Charge Field: E = k Q / r²
 *  5 Drawn point charge +Q with field vector E at distance r
 *  6 Units and Dimensions: SI unit N/C (or V/m) | Dimensions: [M L T⁻³ A⁻¹]
 *  7 Direction rule: radially OUTWARD for +Q, radially INWARD for -Q
 *  8 Grand Verdict: E = k Q / r² (Force per unit test charge N/C!)
 */

import React from "react";
import {
  SceneProps,
  useBeat,
  delayFor,
  Fade,
  Draw,
  T,
  Chip,
  arrowD,
  ringD,
  INK,
  MUTED,
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
} from "./kit";

function Badge({ n, cx, cy, on, delay }: { n: number; cx: number; cy: number; on: boolean; delay: number }) {
  return (
    <g>
      <Draw
        on={on}
        delay={delay}
        d={`M ${cx - 13} ${cy} A 13 13 0 1 1 ${cx + 13} ${cy} A 13 13 0 1 1 ${cx - 13} ${cy}`}
        stroke={RED}
        sw={2.2}
        dur={0.4}
      />
      <Fade on={on} delay={delay + 0.3}>
        <T x={cx} y={cy + 5} size={14} fill={RED} weight={800}>
          {n}
        </T>
      </Fade>
    </g>
  );
}

export default function P12Ch01Sec25({ currentTime, reveals, language }: SceneProps) {
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
      {/* ── BEAT 0: Title ── */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t(
            "defining the field: force per unit positive charge",
            "defining the field: force per unit positive charge"
          )}
        </T>
      </Fade>
      <Draw
        on={beat >= 0}
        delay={dl(0, 2.5)}
        d="M 240 70 C 440 66, 640 74, 840 69"
        stroke={RED}
        sw={2.4}
        dur={0.7}
      />

      {/* ── BEAT 1: Hook Note ── */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={60} y={110} size={15} fill={MUTED} script anchor="start">
          {t(
            "formal mathematical definition of Electric Field intensity E!",
            "Electric Field intensity E ki formal mathematical definition!"
          )}
        </T>
      </Fade>

      {/* ── BEAT 2 & 3: Badge 1 & Definition E = lim F/q₀ ── */}
      <Badge n={1} cx={52} cy={165} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 1)}>
        <T x={74} y={170} size={14} fill={RED} weight={700} anchor="start">
          {t("MATHEMATICAL DEFINITION", "MATHEMATICAL DEFINITION")}
        </T>
      </Fade>

      <Fade on={beat >= 2} dim={beat >= 6}>
        <g transform="translate(60, 185)">
          <rect x={0} y={10} width={430} height={85} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={215} y={48} anchor="middle" size={24} fill={INK} weight={800}>
            E = lim (q₀ → 0) [ F / q₀ ]
          </T>
          <T x={215} y={78} anchor="middle" size={13} fill={AMBER_DARK} script>
            {t("Force per unit positive test charge", "Per unit positive test charge par lagne wala force")}
          </T>
          <Draw on={beat >= 2} delay={dl(2, 1.6)} d="M 100 56 h 230 M 100 60 h 230" stroke={AMBER_DARK} sw={1.5} />
        </g>
      </Fade>

      {/* ── BEAT 4 & 5: Badge 2 & Point Charge Field E = k Q / r² ── */}
      <Badge n={2} cx={540} cy={165} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 1)}>
        <T x={562} y={170} size={14} fill={RED} weight={700} anchor="start">
          {t("POINT CHARGE ELECTRIC FIELD", "POINT CHARGE ELECTRIC FIELD")}
        </T>
      </Fade>

      <Fade on={beat >= 4} dim={beat >= 7}>
        <g transform="translate(540, 185)">
          <T x={0} y={25} anchor="start" size={14} fill={INK} weight={700}>
            E = k Q / r² = (1 / 4πε₀) (Q / r²)
          </T>
          <T x={0} y={60} anchor="start" size={13.5} fill={AMBER_DARK} weight={700}>
            Purely inverse-square (E ∝ 1 / r²)
          </T>
        </g>
      </Fade>

      {/* ── BEAT 6: Units & Dimensions ── */}
      <Fade on={beat >= 6} dim={beat >= 8}>
        <g transform="translate(60, 320)">
          <T x={0} y={20} anchor="start" size={13.5} weight={700} fill={GREEN}>
            SI Units & Dimensions:
          </T>
          <T x={0} y={50} anchor="start" size={18} fill={GREEN} weight={800}>
            N / C  (or  V / m)  |  [M L T⁻³ A⁻¹]
          </T>
        </g>
      </Fade>

      {/* ── BEAT 8: Grand Verdict Chip ── */}
      <Fade on={beat >= 8}>
        <Chip
          x={100}
          y={536}
          w={880}
          h={44}
          fill={GREEN}
          textFill="#ffffff"
          size={18}
        >
          {t(
            "★ VERDICT: E = k Q / r² (Force per unit test charge N/C!)",
            "★ VERDICT: E = k Q / r² (Force per unit test charge N/C!)"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
