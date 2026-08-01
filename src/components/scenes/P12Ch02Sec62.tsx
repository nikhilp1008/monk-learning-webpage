"use client";

/**
 * P12Ch02 · Section 62 — "JEE Advanced: Wheatstone bridge of capacitors and symmetry"
 * Subtopic: Series & Parallel Combinations & Charge Sharing
 * OPEN CHALKBOARD DESIGN WITH WHEATSTONE BRIDGE SYMMETRY (NO CONTAINER BOXES):
 *  - 5 Capacitors arranged in Wheatstone diamond layout (C₁, C₂, C₃, C₄, and central C₅)
 *  - Balanced Condition: C₁ / C₂ = C₃ / C₄  =>  V_C = V_D !
 *  - Zero charge on central capacitor C₅ (Q₅ = 0)  =>  Remove C₅ completely!
 *  - Equivalent Capacitance C_eq = (C₁ C₂) / (C₁ + C₂) + (C₃ C₄) / (C₃ + C₄)
 *  - For 5 identical capacitors C: C_eq = C !
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

export default function P12Ch02Sec62({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("JEE Advanced: Balanced Wheatstone Bridge (C₁/C₂ = C₃/C₄ ⇒ Central C₅ Removed)", "JEE Advanced: Balanced Wheatstone Bridge (C₁/C₂ = C₃/C₄ ⇒ Central C₅ Removed)")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: WHEATSTONE DIAMOND SCHEMATIC */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("WHEATSTONE CAPACITOR BRIDGE SCHEMATIC", "WHEATSTONE CAPACITOR BRIDGE SCHEMATIC")}
          </T>
        </Fade>

        {/* Diamond Bridge Diagram (Open Chalkboard) */}
        <Fade on={beat >= 1}>
          {/* Node A (45, 170) to Node C (200, 100) -> C1 */}
          <line x1="45" y1="170" x2="200" y2="100" stroke={RED} strokeWidth={2} />
          <T x={115} y={125} size={12} fill={RED} weight={900}>C₁</T>

          {/* Node C (200, 100) to Node B (355, 170) -> C2 */}
          <line x1="200" y1="100" x2="355" y2="170" stroke={RED} strokeWidth={2} />
          <T x={285} y={125} size={12} fill={RED} weight={900}>C₂</T>

          {/* Node A (45, 170) to Node D (200, 240) -> C3 */}
          <line x1="45" y1="170" x2="200" y2="240" stroke={GREEN} strokeWidth={2} />
          <T x={115} y={220} size={12} fill={GREEN} weight={900}>C₃</T>

          {/* Node D (200, 240) to Node B (355, 170) -> C4 */}
          <line x1="200" y1="240" x2="355" y2="170" stroke={GREEN} strokeWidth={2} />
          <T x={285} y={220} size={12} fill={GREEN} weight={900}>C₄</T>

          {/* Central Bridge C5 from C (200, 100) to D (200, 240) */}
          <line x1="200" y1="100" x2="200" y2="240" stroke={AMBER_DARK} strokeWidth={2} strokeDasharray="4 4" />
          <T x={212} y={170} size={12} fill={AMBER_DARK} weight={900}>C₅ (Q₅ = 0!)</T>
        </Fade>

        {/* Free Floating Formula */}
        <Fade on={beat >= 3}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (If C₁ / C₂ = C₃ / C₄  ⇒  V_C = V_D  ⇒  C₅ carries ZERO charge!)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: EQUIVALENT CAPACITANCE CALCULATION */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("BALANCED BRIDGE REDUCTION PROOF", "BALANCED BRIDGE REDUCTION PROOF")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 4}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Remove C₅ (Open Circuit since V_C − V_D = 0).
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Top Branch: C₁ and C₂ in Series  ⇒  C_top = (C₁ C₂) / (C₁ + C₂)
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Bottom Branch: C₃ and C₄ in Series  ⇒  C_bot = (C₃ C₄) / (C₃ + C₄)
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. If all 5 capacitors are identical C  ⇒  C_eq = C/2 + C/2 = C !
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (For 5 identical capacitors in Wheatstone bridge, C_equivalent = C exactly)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("JEE ADVANCED SYMMETRY PRINCIPLE", "JEE ADVANCED SYMMETRY PRINCIPLE")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Use Mirror Symmetry (Equipotential plane) and Perpendicular Axis Symmetry to simplify complex 3D cube networks!
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            If Wheatstone bridge is UNBALANCED: Use Kirchhoff's Voltage/Current Laws (KVL/KCL)!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ JEE Advanced Mastered: Balanced Wheatstone Bridge C₁/C₂ = C₃/C₄ allows removing central C₅ (C_eq = C for 5 identical C)! ✓",
            "★ JEE Advanced Mastered: Balanced Wheatstone Bridge C₁/C₂ = C₃/C₄ allows removing central C₅ (C_eq = C for 5 identical C)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
