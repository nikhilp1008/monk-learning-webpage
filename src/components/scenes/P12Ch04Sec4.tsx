"use client";

/**
 * P12Ch04 · Section 4 — "Derivation A: Field on the Axis of a Circular Current Loop"
 * Beats (en [0,1,3,6,7,9,12,14]): 8 beats
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

export default function P12Ch04Sec4({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Board Derivation: On-Axis Field of a Circular Current Loop", "Board Derivation: On-Axis Field of a Circular Current Loop")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: ELEMENT FIELD & CANCELLATION */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("ELEMENT FIELD dB & SYMMETRY CANCELLATION", "ELEMENT FIELD dB & SYMMETRY CANCELLATION")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Element Distance: Point P on axis at distance r = √(x² + R²).
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Element Field: dB = (μ₀ / 4π) (I dl) / (x² + R²)  [since dl ⊥ r̂].
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Transverse Cancellation: Opposite elements cancel dB_⊥.
          </T>

          <Draw on={beat >= 7} delay={dl(7, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Net Axial Sum: Only axial components dB_x = dB cos α add up!
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (cos α = R / r = R / √(x² + R²) from right triangle)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: AXIAL INTEGRATION */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("AXIAL COMPONENT INTEGRATION", "AXIAL COMPONENT INTEGRATION")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 7}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Differential Axial Field: dB_x = dB (R / √(x² + R²)).
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Substitute dB: dB_x = (μ₀ I dl R) / [4π (x² + R³)³/²].
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Integrate over Loop: ∫ dl = 2π R (total circumference).
          </T>

          <Draw on={beat >= 12} delay={dl(12, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. On-Axis Result: B_axis = μ₀ I R² / [2 (x² + R²)³/²] !
          </T>
        </Fade>

        <Fade on={beat >= 12}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (At loop center x = 0, formula simplifies to B_center = μ₀ I / (2R))
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 12} delay={dl(12, 0.2)} />
        <Fade on={beat >= 12} delay={dl(12, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("ON-AXIS CURRENT LOOP DERIVATION VERDICT", "ON-AXIS CURRENT LOOP DERIVATION VERDICT")}
          </T>
        </Fade>

        <Fade on={beat >= 12}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Integrating axial component dB_x = dB cos α around full 2πR circumference yields B_axis = μ₀ I R² / [2 (x² + R²)³/²].
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Special Limit: Setting axial distance x = 0 gives exact loop center field B_center = μ₀ I / (2R).
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 12}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Derived! B_axis = μ0 I R² / [2(x²+R²)³/²] and B_centre = μ0 I / (2R)! Essential 3-mark CBSE proof! ✓",
            "★ Derived! B_axis = μ0 I R² / [2(x²+R²)³/²] and B_centre = μ0 I / (2R)! Essential 3-mark CBSE proof! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
