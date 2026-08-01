"use client";

/**
 * P12Ch04 · Section 6 — "Worked Examples One and Two: Coil at the Centre, and the Arc Trap"
 * Beats (en [0,1,2,3,5,6,9,11]): 8 beats
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

export default function P12Ch04Sec6({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Worked Examples: Coil Centre Field & The NEET Arc Trap", "Worked Examples: Coil Centre Field & The NEET Arc Trap")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: CBSE COIL AT CENTER */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("CBSE LEVEL: N-TURN CIRCULAR COIL", "CBSE LEVEL: N-TURN CIRCULAR COIL")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Given Values: Turns N = 250, Radius R = 0.08 m, Current I = 3.0 A.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Center Field Formula: B = N μ₀ I / (2R).
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Substitute Values: B = (250 × 4π×10⁻⁷ × 3.0) / (2 × 0.08).
          </T>

          <Draw on={beat >= 5} delay={dl(5, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Numerical Output: B = 5.89 × 10⁻³ T = 5.9 mT !
          </T>
        </Fade>

        <Fade on={beat >= 5}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Standard 2-mark CBSE calculation question)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: NEET ARC TRAP */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 5} delay={dl(5, 0.2)} />
        <Fade on={beat >= 5} delay={dl(5, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("NEET SPEED TRAP: 240° ARC WITH RADIAL LEADS", "NEET SPEED TRAP: 240° ARC WITH RADIAL LEADS")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 5}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Radial Leads Contribution: Straight leads pass through center =&gt; B_leads = 0.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Arc Fraction: Angle θ = 240° = (240 / 360) = 2/3 of full circle.
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Arc Formula: B_arc = (2/3) × [μ₀ I / (2R)].
          </T>

          <Draw on={beat >= 11} delay={dl(11, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Total Arc Field: B_net = 2.5 × 10⁻⁵ T !
          </T>
        </Fade>

        <Fade on={beat >= 11}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Always ignore straight wires aiming directly at observation point)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 11} delay={dl(11, 0.2)} />
        <Fade on={beat >= 11} delay={dl(11, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("WORKED EXAMPLES VERDICT", "WORKED EXAMPLES VERDICT")}
          </T>
        </Fade>

        <Fade on={beat >= 11}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Coil center field scales linearly with number of turns N: B = N μ₀ I / (2R) = 5.9 mT.
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Radial lead wires directed at center point create zero magnetic field contribution B_leads = 0.
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 11}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Result: Coil B = 5.9 mT | Arc B = 2.5 × 10⁻⁵ T (Radial leads contribute zero)! ✓",
            "★ Result: Coil B = 5.9 mT | Arc B = 2.5 × 10⁻⁵ T (Radial leads contribute zero)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
