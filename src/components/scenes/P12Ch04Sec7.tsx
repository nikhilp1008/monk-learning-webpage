"use client";

/**
 * P12Ch04 · Section 7 — "Worked Examples Three and Four: Vector Addition and the Bent Wire"
 * Beats (en [0,1,3,6,7,10,12,13]): 8 beats
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

export default function P12Ch04Sec7({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("JEE Main & Advanced: Perpendicular Fields & Square vs Circle Loop", "JEE Main & Advanced: Perpendicular Fields & Square vs Circle Loop")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: PERPENDICULAR VECTOR ADDITION */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("JEE MAIN: PERPENDICULAR VECTOR ADDITION", "JEE MAIN: PERPENDICULAR VECTOR ADDITION")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Wire Field Magnitude: B_wire = 50 μT.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Loop Field Magnitude: B_loop = 78.5 μT (orthogonal to wire field).
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Vector Sum: B_net = √(B_wire² + B_loop²).
          </T>

          <Draw on={beat >= 7} delay={dl(7, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Resulting Field: B_net = √(50² + 78.5²) ≈ 93 μT !
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Always add magnetic field vectors orthogonally when fields are 90° apart)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: SQUARE VS CIRCLE LOOP */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("JEE ADVANCED: SQUARE vs CIRCULAR LOOP RATIO", "JEE ADVANCED: SQUARE vs CIRCULAR LOOP RATIO")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 7}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Circular Loop Field: B_circle = (π μ₀ I) / L  [using R = L/2π].
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Square Loop Field: B_square = (8√2 μ₀ I) / (π L)  [4 sides, a = L/4].
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Compute Ratio: B_square / B_circle = (8√2 / π²).
          </T>

          <Draw on={beat >= 13} delay={dl(13, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Numerical Ratio: B_square / B_circle ≈ 1.15 (15% stronger) !
          </T>
        </Fade>

        <Fade on={beat >= 13}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Square geometry focuses current elements closer to center than circle)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 13} delay={dl(13, 0.2)} />
        <Fade on={beat >= 13} delay={dl(13, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("VECTOR & GEOMETRY PROBLEM VERDICT", "VECTOR & GEOMETRY PROBLEM VERDICT")}
          </T>
        </Fade>

        <Fade on={beat >= 13}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Perpendicular fields add via Pythagorean vector sum: B_net = √(50² + 78.5²) = 93 μT.
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            For wire of fixed length L, square loop creates 15% stronger center field than circular loop (Ratio 8√2/π² ≈ 1.15).
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 13}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Result: Vector field B_net = 93 μT | Square loop is 15% stronger than circle (Ratio 8√2/π² ≈ 1.15)! ✓",
            "★ Result: Vector field B_net = 93 μT | Square loop is 15% stronger than circle (Ratio 8√2/π² ≈ 1.15)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
