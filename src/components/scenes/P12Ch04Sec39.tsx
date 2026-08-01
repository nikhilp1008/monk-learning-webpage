"use client";

/**
 * P12Ch04 · Section 39 — "Worked Examples One and Two: Coil Moment and Torque, and the Ground-State Moment"
 * Beats (en [0,1,2,3,5,6,8,9,10]): 9 beats
 */

import React from "react";
import {
  SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, ringD,
  INK, MUTED, AMBER_DARK, GREEN, RED, CREAM,
} from "./kit";

function Badge({ n, cx, cy, on, delay }: { n: number; cx: number; cy: number; on: boolean; delay: number }) {
  return (
    <g>
      <Draw on={on} delay={delay}
        d={`M ${cx - 13} ${cy} A 13 13 0 1 1 ${cx + 13} ${cy} A 13 13 0 1 1 ${cx - 13} ${cy}`}
        stroke={RED} sw={2.2} dur={0.4} />
      <Fade on={on} delay={delay + 0.3}>
        <T x={cx} y={cy + 5} size={14} fill={RED} weight={800}>{n}</T>
      </Fade>
    </g>
  );
}

export default function P12Ch04Sec39({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Worked Examples: Coil Torque & Ground-State Bohr Magneton", "Worked Examples: Coil Torque & Ground-State Bohr Magneton")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: CBSE COIL MOMENT & TORQUE */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("CBSE LEVEL: COIL MOMENT & TORQUE", "CBSE LEVEL: COIL MOMENT & TORQUE")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Given Parameters: N = 100 turns, I = 0.40 A, r = 0.05 m, B = 0.50 T.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Dipole Moment: m = N I (π r²) = 100 × 0.40 × π(0.05)² = 0.314 A m².
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Torque Formula: τ = m B sin θ (θ = 30° with field vector).
          </T>

          <Draw on={beat >= 5} delay={dl(5, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Calculated Torque: τ = 0.314 × 0.50 × sin 30° = 0.0785 N m!
          </T>
        </Fade>

        <Fade on={beat >= 5}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Torque is maximum at θ = 90° and zero when dipole aligns at θ = 0°)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: NEET SPEED TRAP: GROUND STATE MOMENT */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 5} delay={dl(5, 0.2)} />
        <Fade on={beat >= 5} delay={dl(5, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("NEET SPEED TRAP: GROUND STATE MOMENT", "NEET SPEED TRAP: GROUND STATE MOMENT")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 5}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Hydrogen Ground State: Principle quantum number n = 1 in Bohr atom.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Angular Momentum: L_1 = 1 × h / (2π).
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Substitution into Moment Ratio: μ_1 = (e / 2 m_e) L_1 = (e h) / (4π m_e).
          </T>

          <Draw on={beat >= 10} delay={dl(10, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Calculated Value: μ_1 = μ_B = 9.27 × 10^-24 A m²!
          </T>
        </Fade>

        <Fade on={beat >= 10}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (NEET speed trap: ground-state orbital dipole moment IS 1 Bohr Magneton)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 10} delay={dl(10, 0.2)} />
        <Fade on={beat >= 10} delay={dl(10, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("MACRO VS MICRO DIPOLE COMPARISON", "MACRO VS MICRO DIPOLE COMPARISON")}
          </T>
        </Fade>

        <Fade on={beat >= 10}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Macroscopic Coil: Moment m = 0.314 A m² produces noticeable mechanical torque τ = 0.0785 N m.
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Microscopic Atomic Loop: Hydrogen ground state electron moment is quantized at 1 μ_B = 9.27 × 10^-24 A m².
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 10}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Result: Coil torque τ = 0.0785 N m | Ground-state orbital moment is exactly 1 Bohr Magneton μ_B! ✓",
            "★ Result: Coil torque τ = 0.0785 N m | Ground-state orbital moment is exactly 1 Bohr Magneton μ_B! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
