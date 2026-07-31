"use client";

/**
 * P12Ch02 · Section 4 — "Formula toolkit: potential and superposition"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md & SCENE_PLAYBOOK.md.
 *
 * OBJECT-RICH OPEN CHALKBOARD DESIGN (NO HEAVY CONTAINERS):
 *  - Master formula compilation for electrostatic potential V and potential energy U.
 *  - 1. Potential Energy of two point charges: U = k q₁ q₂ / r
 *  - 2. Work-Potential Energy Theorem: W_ext = ΔU = q ΔV = q (V_B - V_A)
 *  - 3. Potential Energy of a System of 3 charges: U_total = k (q₁q₂/r₁₂ + q₂q₃/r₂₃ + q₁q₃/r₁₃)
 *  - 4. Conversion: 1 eV (electron-volt) = 1.6 × 10⁻¹⁹ J
 *
 * Beats (en [0,5,13,25,32,40,52,59,72]):
 *  0 Title "formula toolkit: potential & potential energy superposition" + drawn underline
 *  1 Hook note: key formulas connecting work, potential energy U, and scalar superposition!
 *  2 Potential Energy of 2 Charges: U = k q₁ q₂ / r
 *  3 Work-Energy Relation: W_ext = ΔU = q ΔV
 *  4 System of 3 Charges: U_total = k (q₁q₂/r₁₂ + q₂q₃/r₂₃ + q₁q₃/r₁₃)
 *  5 Energy Unit Electron-Volt: 1 eV = 1.6 × 10⁻¹⁹ Joules
 *  6 Board Exam Speed Trap: Watch sign of test charge q in W = q (V_final - V_initial)!
 *  7 Grand Verdict: U = k q₁ q₂ / r  |  W_ext = q ΔV  |  1 eV = 1.6×10⁻¹⁹ J!
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

export default function P12Ch02Sec4({ currentTime, reveals, language }: SceneProps) {
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
            "formula toolkit: potential & potential energy superposition",
            "formula toolkit: potential & potential energy superposition"
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
            "key formulas connecting work, potential energy U, and scalar superposition!",
            "work, potential energy U, aur scalar superposition connect karne wale key formulas!"
          )}
        </T>
      </Fade>

      {/* ── BEAT 2 & 3: PE 2 Charges & Work ── */}
      <Fade on={beat >= 2} dim={beat >= 6}>
        <g transform="translate(60, 160)">
          <T x={0} y={20} anchor="start" size={14} weight={700} fill={RED}>
            1. Two-Charge Potential Energy:
          </T>
          <T x={0} y={50} anchor="start" size={20} fill={INK} weight={800}>
            U = k q₁ q₂ / r
          </T>
        </g>
      </Fade>

      <Fade on={beat >= 3} dim={beat >= 6}>
        <g transform="translate(540, 160)">
          <T x={0} y={20} anchor="start" size={14} weight={700} fill={RED}>
            2. Work-Potential Energy Theorem:
          </T>
          <T x={0} y={50} anchor="start" size={20} fill={INK} weight={800}>
            W_ext = ΔU = q (V_B - V_A)
          </T>
        </g>
      </Fade>

      {/* ── BEAT 4 & 5: System of 3 Charges & 1 eV ── */}
      <Fade on={beat >= 4} dim={beat >= 7}>
        <g transform="translate(60, 270)">
          <T x={0} y={20} anchor="start" size={14} weight={700} fill={GREEN}>
            3. Three-Charge System PE:
          </T>
          <T x={0} y={50} anchor="start" size={18} fill={INK} weight={800}>
            U_total = k (q₁q₂/r₁₂ + q₂q₃/r₂₃ + q₁q₃/r₁₃)
          </T>
        </g>
      </Fade>

      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(540, 270)">
          <T x={0} y={20} anchor="start" size={14} weight={700} fill={GREEN}>
            4. Electron-Volt Unit Conversion:
          </T>
          <T x={0} y={50} anchor="start" size={20} fill={GREEN} weight={800}>
            1 eV = 1.6 × 10⁻¹⁹ Joules
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
            "★ VERDICT: U = k q₁ q₂ / r  |  W_ext = q ΔV  |  1 eV = 1.6×10⁻¹⁹ J!",
            "★ VERDICT: U = k q₁ q₂ / r  |  W_ext = q ΔV  |  1 eV = 1.6×10⁻¹⁹ J!"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
