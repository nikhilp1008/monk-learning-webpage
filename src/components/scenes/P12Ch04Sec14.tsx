"use client";

/**
 * P12Ch04 · Section 14 — "Worked Examples One and Two: Solenoid Numerical and the Thick-Wire Trap"
 * Beats (en [0,1,2,3,5,6,9,10,11]): 9 beats
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

export default function P12Ch04Sec14({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Worked Examples: Solenoid Field & NEET Thick-Wire Speed Trap", "Worked Examples: Solenoid Field & NEET Thick-Wire Speed Trap")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: CBSE SOLENOID EXAMPLE */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("CBSE LEVEL: SOLENOID FIELD NUMERICAL", "CBSE LEVEL: SOLENOID FIELD NUMERICAL")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Turn Density: n = N / L = 1500 turns / 0.50 m = 3000 turns/m.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Given Current: I = 4.0 A.
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Solenoid Core Formula: B = μ₀ n I = (4π×10⁻⁷) × 3000 × 4.0.
          </T>

          <Draw on={beat >= 5} delay={dl(5, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Numerical Output: B = 1.51 × 10⁻² T = 15.1 mT !
          </T>
        </Fade>

        <Fade on={beat >= 5}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Standard 2-mark CBSE numerical calculation)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: NEET SPEED TRAP THICK WIRE */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 5} delay={dl(5, 0.2)} />
        <Fade on={beat >= 5} delay={dl(5, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("NEET SPEED TRAP: THICK WIRE (r = R/2 vs r = 2R)", "NEET SPEED TRAP: THICK WIRE (r = R/2 vs r = 2R)")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 5}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Inside Field at r = R/2: B_in = [μ₀ I (R/2)] / (2π R²) = μ₀ I / (4π R).
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Outside Field at r = 2R: B_out = μ₀ I / [2π (2R)] = μ₀ I / (4π R).
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Ratio Comparison: B_in(R/2) / B_out(2R) = 1.0.
          </T>

          <Draw on={beat >= 11} delay={dl(11, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Unexpected Result: Fields at R/2 and 2R are EXACTLY equal!
          </T>
        </Fade>

        <Fade on={beat >= 11}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Frequent NEET trick question based on 1:1 ratio symmetry)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 11} delay={dl(11, 0.2)} />
        <Fade on={beat >= 11} delay={dl(11, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("SOLENOID & THICK WIRE WORKED EXAMPLES VERDICT", "SOLENOID & THICK WIRE WORKED EXAMPLES VERDICT")}
          </T>
        </Fade>

        <Fade on={beat >= 11}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Solenoid core field evaluates directly via B = μ₀ n I = 15.1 mT.
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            For thick wire of radius R, magnetic field at interior point r = R/2 exactly matches exterior point r = 2R (Ratio = 1.0).
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 11}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Result: Solenoid B = 15 mT | Thick wire B at R/2 equals B at 2R (Ratio = 1.0 exactly)! ✓",
            "★ Result: Solenoid B = 15 mT | Thick wire B at R/2 equals B at 2R (Ratio = 1.0 exactly)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
