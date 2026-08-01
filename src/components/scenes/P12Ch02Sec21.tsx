"use client";

/**
 * P12Ch02 · Section 21 — "CBSE level: potential energy of a two-charge system"
 * Subtopic: Potential Energy & External Fields
 * OPEN CHALKBOARD DESIGN WITH CBSE WORKED NUMERICAL (NO CONTAINER BOXES):
 *  - q₁ = +7 µC, q₂ = -2 µC at distance r = 18 cm (0.18 m)
 *  - Step 1: Calculate U = k q₁ q₂ / r = -0.7 Joules
 *  - Step 2: Calculate Work to separate to infinity W_ext = +0.7 Joules
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

export default function P12Ch02Sec21({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("CBSE Worked Problem: Potential Energy of Two Charges (+7 µC & −2 µC)", "CBSE Worked Problem: Potential Energy of Two Charges (+7 µC & −2 µC)")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: PROBLEM GEOMETRY */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("CHARGE SYSTEM DIAGRAM (r = 18 cm)", "CHARGE SYSTEM DIAGRAM (r = 18 cm)")}
          </T>
        </Fade>

        <Fade on={beat >= 1}>
          {/* Charge q1 = +7 uC */}
          <circle cx={100} cy={165} r={22} fill="#ffe4e6" stroke={RED} strokeWidth={2.5} />
          <T x={100} y={172} size={16} fill={RED} weight={900}>+7 µC</T>
          <T x={100} y={128} size={13} fill={RED} weight={800}>Charge q₁</T>

          {/* Separation line */}
          <line x1="122" y1="165" x2="338" y2="165" stroke={INK} strokeWidth={2.5} strokeDasharray="5 5" />
          <T x={230} y={145} size={14} fill={INK} weight={800} anchor="middle">r = 18 cm = 0.18 m</T>

          {/* Charge q2 = -2 uC */}
          <circle cx={360} cy={165} r={22} fill="#dcfce7" stroke={GREEN} strokeWidth={2.5} />
          <T x={360} y={172} size={18} fill={GREEN} weight={900}>-2 µC</T>
          <T x={360} y={128} size={13} fill={GREEN} weight={800}>Charge q₂</T>
        </Fade>

        {/* Free Floating Question */}
        <Fade on={beat >= 2}>
          <T x={45} y={240} anchor="start" size={14} fill={RED} weight={800}>
            (a) Find initial potential energy U of system
          </T>
          <T x={45} y={265} anchor="start" size={14} fill={INK} weight={800}>
            (b) Work to separate charges infinitely far apart
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: NUMERICAL CALCULATION STEPS */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 3} delay={dl(3, 0.2)} />
        <Fade on={beat >= 3} delay={dl(3, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("STEP-BY-STEP CALCULATION", "STEP-BY-STEP CALCULATION")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 3}>
          <T x={45} y={80} size={15} fill={INK} weight={800} anchor="start">
            1. Formula: U = k q₁ q₂ / r
          </T>

          <T x={45} y={125} size={15} fill={AMBER_DARK} weight={800} anchor="start">
            2. U = (9×10⁹ × 7×10⁻⁶ × −2×10⁻⁶) / 0.18
          </T>

          <T x={45} y={170} size={15} fill={GREEN} weight={800} anchor="start">
            3. U = − 0.126 / 0.18 = − 0.7 Joules
          </T>

          <Draw on={beat >= 3} delay={dl(3, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={800} anchor="start">
            4. W_sep = U(∞) − U_initial = 0 − (−0.7) = + 0.7 J
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (+0.7 J work needed against electrostatic attraction)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("CBSE BOARD MARKS CHECKLIST", "CBSE BOARD MARKS CHECKLIST")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Always convert distance from cm to m (18 cm = 0.18 m) to get answer directly in Joules!
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Negative potential energy U = −0.7 J confirms attractive bound state!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ CBSE Problem Mastered: U = −0.7 Joules and Work to separate infinitely W_sep = +0.7 Joules! ✓",
            "★ CBSE Problem Mastered: U = −0.7 Joules and Work to separate infinitely W_sep = +0.7 Joules! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
