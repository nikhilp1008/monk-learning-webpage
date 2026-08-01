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
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("WHEATSTONE CAPACITOR BRIDGE SCHEMATIC", "WHEATSTONE CAPACITOR BRIDGE SCHEMATIC")}
          </T>
        </Fade>

        {/* Diamond Bridge Diagram */}
        <Fade on={beat >= 1}>
          {/* Node A (40, 180) to Node C (230, 90) -> C1 */}
          <line x1="40" y1="180" x2="230" y2="90" stroke={RED} strokeWidth={3} />
          <T x={125} y={125} size={14} fill={RED} weight={900}>C₁</T>

          {/* Node C (230, 90) to Node B (420, 180) -> C2 */}
          <line x1="230" y1="90" x2="420" y2="180" stroke={RED} strokeWidth={3} />
          <T x={335} y={125} size={14} fill={RED} weight={900}>C₂</T>

          {/* Node A (40, 180) to Node D (230, 270) -> C3 */}
          <line x1="40" y1="180" x2="230" y2="270" stroke={GREEN} strokeWidth={3} />
          <T x={125} y={245} size={14} fill={GREEN} weight={900}>C₃</T>

          {/* Node D (230, 270) to Node B (420, 180) -> C4 */}
          <line x1="230" y1="270" x2="420" y2="180" stroke={GREEN} strokeWidth={3} />
          <T x={335} y={245} size={14} fill={GREEN} weight={900}>C₄</T>

          {/* Central Bridge C5 from C (230, 90) to D (230, 270) */}
          <line x1="230" y1="90" x2="230" y2="270" stroke={AMBER_DARK} strokeWidth={4} strokeDasharray="5 5" />
          <T x={245} y={180} size={14} fill={AMBER_DARK} weight={900}>C₅ (Q₅ = 0!)</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={230} y={305} anchor="middle" size={17} fill={INK} weight={800}>
            If C₁ / C₂ = C₃ / C₄  ⇒  V_C = V_D  ⇒  C₅ carries ZERO charge!
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: EQUIVALENT CAPACITANCE CALCULATION */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("BALANCED BRIDGE REDUCTION PROOF", "BALANCED BRIDGE REDUCTION PROOF")}
          </T>
        </Fade>

        {/* Floating Solution Steps (No Card Boxes) */}
        <Fade on={beat >= 4}>
          <T x={50} y={85} size={16} fill={AMBER_DARK} weight={800} anchor="start">
            1. Remove C₅ (Open Circuit since V_C − V_D = 0).
          </T>

          <T x={50} y={145} size={16} fill={GREEN} weight={800} anchor="start">
            2. Top Branch: C₁ and C₂ in Series  ⇒  C_top = (C₁ C₂) / (C₁ + C₂)
          </T>

          <T x={50} y={205} size={16} fill={GREEN} weight={800} anchor="start">
            3. Bottom Branch: C₃ and C₄ in Series  ⇒  C_bot = (C₃ C₄) / (C₃ + C₄)
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 50 235 L 450 235" stroke={INK} sw={2} />

          <T x={50} y={285} size={20} fill={RED} weight={900} anchor="start">
            4. If all 5 capacitors are identical C  ⇒  C_eq = C/2 + C/2 = C !
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={305} anchor="middle" size={15} fill={GREEN} weight={800}>
            For 5 identical capacitors in a Wheatstone bridge, C_equivalent = C exactly!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 420)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("JEE ADVANCED SYMMETRY PRINCIPLE", "JEE ADVANCED SYMMETRY PRINCIPLE")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={52} size={14} anchor="start" fill={GREEN} weight={800}>
            Use Mirror Symmetry (Equipotential plane) and Perpendicular Axis Symmetry to simplify complex 3D cube networks!
          </T>
          <T x={45} y={76} size={13} anchor="start" fill={INK} weight={700}>
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
