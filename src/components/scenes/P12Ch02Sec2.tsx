"use client";

/**
 * P12Ch02 · Section 2 — "Potential is a scalar — add with sign, not direction"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md & SCENE_PLAYBOOK.md.
 *
 * OBJECT-RICH OPEN CHALKBOARD DESIGN (NO HEAVY CONTAINERS):
 *  - Electric potential V is a SCALAR quantity!
 *  - Superposition: Total potential V_total = V₁ + V₂ + V₃ + ... = Σ (k Q_i / r_i)
 *  - CRITICAL: Add with ALGEBRAIC SIGNS (+ for positive charge, - for negative charge)!
 *  - NO vector components or vector resolution required!
 *
 * Beats (en [0,9,23,33,45,56,70,82]):
 *  0 Title "potential is a scalar — add with sign, not direction" + drawn underline
 *  1 Hook note: unlike force/field vector addition, potential adds algebraically with sign!
 *  2 Badge 1 & Scalar Superposition: V_total = Σ (k Q_i / r_i)
 *  3 Badge 2 & Charge Signs Matter: Positive charge → +V, Negative charge → -V
 *  4 Badge 3 & Zero Potential Points: V can be zero where positive & negative potentials cancel!
 *  5 Worked Example: Dipole midpoint V = k(+q)/a + k(-q)/a = 0!
 *  6 Summary: No vector components needed for potential calculations!
 *  7 Grand Verdict: V_total = Σ (k q_i / r_i)  (Algebraic sum with signs)!
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

export default function P12Ch02Sec2({ currentTime, reveals, language }: SceneProps) {
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
            "potential is a scalar — add with sign, not direction",
            "potential scalar hai — sign ke sath add karein, direction nahi"
          )}
        </T>
      </Fade>
      <Draw
        on={beat >= 0}
        delay={dl(0, 2.5)}
        d="M 180 70 C 440 66, 640 74, 900 69"
        stroke={RED}
        sw={2.4}
        dur={0.7}
      />

      {/* ── BEAT 1: Hook Note ── */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={60} y={110} size={15} fill={MUTED} script anchor="start">
          {t(
            "unlike force/field vector addition, potential adds algebraically with sign!",
            "force/field vector addition ke opposite, potential algebraically sign ke sath add hota hai!"
          )}
        </T>
      </Fade>

      {/* ── BEAT 2: Badge 1 & Scalar Superposition ── */}
      <Badge n={1} cx={52} cy={165} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 1)}>
        <T x={74} y={170} size={14} fill={RED} weight={700} anchor="start">
          {t("SCALAR SUPERPOSITION: V_total = Σ V_i", "SCALAR SUPERPOSITION: V_total = Σ V_i")}
        </T>
      </Fade>

      <Fade on={beat >= 2} dim={beat >= 5}>
        <g transform="translate(60, 185)">
          <rect x={0} y={10} width={430} height={85} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={215} y={48} anchor="middle" size={20} fill={INK} weight={800}>
            V_total = k (q₁/r₁ + q₂/r₂ + ...)
          </T>
          <T x={215} y={78} anchor="middle" size={13} fill={AMBER_DARK} script>
            {t("Pure algebraic addition — NO vector components!", "Simple algebraic sum — koi vector components nahi!")}
          </T>
          <Draw on={beat >= 2} delay={dl(2, 1.6)} d="M 100 56 h 230 M 100 60 h 230" stroke={AMBER_DARK} sw={1.5} />
        </g>
      </Fade>

      {/* ── BEAT 3: Badge 2 & Charge Signs Matter ── */}
      <Badge n={2} cx={540} cy={165} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 1)}>
        <T x={562} y={170} size={14} fill={RED} weight={700} anchor="start">
          {t("CHARGE SIGNS (+ / -) DEFINE POTENTIAL", "CHARGE SIGNS (+ / -) DEFINE POTENTIAL")}
        </T>
      </Fade>

      <Fade on={beat >= 3} dim={beat >= 5}>
        <g transform="translate(540, 185)">
          <T x={0} y={25} anchor="start" size={14} fill={INK} weight={700}>
            +q creates Positive Potential (+V)
          </T>
          <T x={0} y={65} anchor="start" size={20} fill={RED} weight={800}>
            -q creates Negative Potential (-V)
          </T>
        </g>
      </Fade>

      {/* ── BEAT 7: Grand Verdict Chip ── */}
      <Fade on={beat >= 7}>
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
            "★ VERDICT: V_total = Σ (k q_i / r_i)  (Algebraic sum with signs)!",
            "★ VERDICT: V_total = Σ (k q_i / r_i)  (Algebraic sum with signs)!"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
