"use client";

/**
 * P12Ch02 · Section 17 — "Formula toolkit: potential energy of charge systems"
 * Subtopic: Potential Energy & External Fields
 * OPEN CHALKBOARD DESIGN WITH FORMULA MATRIX (NO CONTAINER BOXES):
 *  - 1. Two-charge isolated system: U = k q₁ q₂ / r
 *  - 2. Three-charge system: U = k (q₁q₂/r₁₂ + q₂q₃/r₂₃ + q₁q₃/r₁₃)
 *  - 3. Two charges in external field V(r): U = q₁ V(r₁) + q₂ V(r₂) + k q₁ q₂ / r₁₂
 *  - Zero card box containers
 */

import React from "react";
import {
  SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, arrowD,
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

export default function P12Ch02Sec17({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Formula Toolkit: Potential Energy of Isolated & External Field Charge Systems", "Formula Toolkit: Potential Energy of Isolated & External Field Charge Systems")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: ISOLATED N-CHARGE SYSTEMS */}
      <g transform="translate(40, 85)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("ISOLATED SYSTEMS (NO EXTERNAL FIELD)", "ISOLATED SYSTEMS (NO EXTERNAL FIELD)")}
          </T>
        </Fade>

        {/* Floating Formulas (No Card Boxes) */}
        <Fade on={beat >= 1}>
          <T x={40} y={85} size={15} fill={INK} weight={800} anchor="start">
            1. Two Charges: U = k q₁ q₂ / r₁₂
          </T>

          <T x={40} y={150} size={15} fill={AMBER_DARK} weight={800} anchor="start">
            2. Three Charges: U = k ( q₁q₂/r₁₂ + q₂q₃/r₂₃ + q₁q₃/r₁₃ )
          </T>

          <T x={40} y={215} size={15} fill={GREEN} weight={800} anchor="start">
            3. N-Charge General: U = ½ Σ (k q_i q_j / r_ij)
          </T>
        </Fade>

        {/* Free Floating Rule (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={230} y={350} anchor="middle" size={15} fill={RED} weight={800}>
            Number of interaction pairs for N charges = N(N − 1) / 2 !
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: CHARGES IN EXTERNAL POTENTIAL V(r) */}
      <g transform="translate(540, 85)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("CHARGES IN EXTERNAL FIELD V(r)", "CHARGES IN EXTERNAL FIELD V(r)")}
          </T>
        </Fade>

        {/* Floating External Field Formulas (No Card Boxes) */}
        <Fade on={beat >= 4}>
          <T x={50} y={85} size={15} fill={RED} weight={800} anchor="start">
            1. Single Charge q in V(r): U = q V(r)
          </T>

          <T x={50} y={150} size={15} fill={GREEN} weight={800} anchor="start">
            2. Two Charges in V(r):
          </T>

          <T x={70} y={190} size={18} fill={GREEN} weight={900} anchor="start">
            U_total = q₁ V(r₁) + q₂ V(r₂) + (k q₁ q₂ / r₁₂)
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={350} anchor="middle" size={15} fill={GREEN} weight={800}>
            Includes BOTH interaction with external field AND mutual charge-charge interaction!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 470)">
        <Badge n={3} cx={25} cy={25} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("SYSTEM POTENTIAL ENERGY MASTER RULE", "SYSTEM POTENTIAL ENERGY MASTER RULE")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={500} y={30} anchor="middle" size={17} fill={GREEN} weight={800}>
            Always count: 1. External Field Energy (q V) + 2. Pairwise Mutual Energies (k q_i q_j / r_ij)!
          </T>
          <T x={500} y={65} anchor="middle" size={15} fill={INK} weight={700}>
            Never double-count pairs! Use N(N-1)/2 formula to check total term count.
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={570} w={880} h={42} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Toolkit Mastered: U_ext = q₁V(r₁) + q₂V(r₂) + k q₁ q₂ / r₁₂ (External field + Mutual interaction)! ✓",
            "★ Toolkit Mastered: U_ext = q₁V(r₁) + q₂V(r₂) + k q₁ q₂ / r₁₂ (External field + Mutual interaction)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
