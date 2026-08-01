"use client";

/**
 * P12Ch04 · Section 10 — "True Always, Useful Only Sometimes"
 * Beats (en [0,1,3,4,6,7]): 6 beats
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

export default function P12Ch04Sec10({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Ampere's Law: True Always, Useful Only in High Symmetry", "Ampere's Law: True Always, Useful Only in High Symmetry")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: HIGH SYMMETRY REQUIREMENT */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("HIGH-SYMMETRY REQUIREMENT FOR B CALCULATIONS", "HIGH-SYMMETRY REQUIREMENT FOR B CALCULATIONS")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Universal Validity: Ampere's Law ∮ B · dl = μ₀ I_enc is ALWAYS true.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Analytical Utility: Only yields B formula if B is uniform along loop.
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Factor Out B: ∮ B · dl = B ∮ dl = B (2π r) = μ₀ I_enc.
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Key Condition: B must be either parallel or perpendicular to dl!
          </T>
        </Fade>

        <Fade on={beat >= 4}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Without high symmetry, ∮ B · dl remains an unsolved integral)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: FOUR CLASSIC APPLICATIONS */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("THE FOUR CLASSIC HIGH-SYMMETRY APPLICATIONS", "THE FOUR CLASSIC HIGH-SYMMETRY APPLICATIONS")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 4}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Long Straight Conductor: B = μ₀ I / (2π r)  [circular Amperian loop].
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Thick Cylindrical Wire: B_in ∝ r (inside) and B_out ∝ 1/r (outside).
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Long Ideal Solenoid: B_internal = μ₀ n I  [rectangular loop].
          </T>

          <Draw on={beat >= 6} delay={dl(6, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Endless Toroid Coil: B_toroid = μ₀ N I / (2π r) !
          </T>
        </Fade>

        <Fade on={beat >= 6}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (These 4 cases form 90% of all Amperian questions in CBSE/JEE)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 6} delay={dl(6, 0.2)} />
        <Fade on={beat >= 6} delay={dl(6, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("AMPERE'S LAW SYMMETRY VERDICT", "AMPERE'S LAW SYMMETRY VERDICT")}
          </T>
        </Fade>

        <Fade on={beat >= 6}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Ampere's Law holds universally, but solves B easily only when symmetry allows B to be factored out of integral.
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Mastering the 4 classic geometries (straight wire, thick wire, solenoid, toroid) unlocks every Amperian question.
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 6}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Ampere's Law requires steady currents & symmetric Amperian loops (wire, solenoid, toroid)! ✓",
            "★ Ampere's Law requires steady currents & symmetric Amperian loops (wire, solenoid, toroid)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
