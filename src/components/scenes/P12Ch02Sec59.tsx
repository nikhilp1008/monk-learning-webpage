"use client";

/**
 * P12Ch02 · Section 59 — "CBSE level: three capacitors in series and parallel"
 * Subtopic: Series & Parallel Combinations & Charge Sharing
 * OPEN CHALKBOARD DESIGN WITH CBSE WORKED NUMERICAL (NO CONTAINER BOXES):
 *  - C₁ = 2 µF, C₂ = 3 µF, C₃ = 6 µF
 *  - Step 1: Series 1/C_s = 1/2 + 1/3 + 1/6 = 6/6 = 1  =>  C_s = 1 µF
 *  - Step 2: Parallel C_p = 2 + 3 + 6 = 11 µF
 *  - Step 3: Ratio C_p / C_s = 11 / 1 = 11 !
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

export default function P12Ch02Sec59({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("CBSE Worked Problem: Three Capacitors (2 µF, 3 µF, 6 µF) Series & Parallel Ratio", "CBSE Worked Problem: Three Capacitors (2 µF, 3 µF, 6 µF) Series & Parallel Ratio")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: CIRCUIT DIAGRAM & VALUES */}
      <g transform="translate(40, 85)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("THREE CAPACITOR VALUES: 2 µF, 3 µF, 6 µF", "THREE CAPACITOR VALUES: 2 µF, 3 µF, 6 µF")}
          </T>
        </Fade>

        {/* Values Diagram */}
        <Fade on={beat >= 1}>
          <T x={80} y={110} size={18} fill={RED} weight={900} anchor="start">C₁ = 2 µF</T>
          <T x={80} y={170} size={18} fill={AMBER_DARK} weight={900} anchor="start">C₂ = 3 µF</T>
          <T x={80} y={230} size={18} fill={GREEN} weight={900} anchor="start">C₃ = 6 µF</T>
        </Fade>

        {/* Free Floating Question (Spacious, No Box) */}
        <Fade on={beat >= 2}>
          <T x={230} y={350} anchor="middle" size={16} fill={INK} weight={800}>
            Find C_series, C_parallel, and their ratio C_p / C_s !
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: NUMERICAL CALCULATION STEPS */}
      <g transform="translate(540, 85)">
        <Badge n={2} cx={25} cy={25} on={beat >= 3} delay={dl(3, 0.2)} />
        <Fade on={beat >= 3} delay={dl(3, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("STEP-BY-STEP CALCULATION", "STEP-BY-STEP CALCULATION")}
          </T>
        </Fade>

        {/* Floating Solution Steps (No Card Boxes) */}
        <Fade on={beat >= 3}>
          <T x={50} y={85} size={16} fill={AMBER_DARK} weight={800} anchor="start">
            1. Series: 1/C_s = 1/2 + 1/3 + 1/6 = (3+2+1)/6 = 6/6 = 1
          </T>

          <T x={50} y={145} size={16} fill={GREEN} weight={800} anchor="start">
            2. C_series = 1 µF
          </T>

          <T x={50} y={205} size={16} fill={RED} weight={800} anchor="start">
            3. Parallel: C_p = 2 + 3 + 6 = 11 µF
          </T>

          <Draw on={beat >= 3} delay={dl(3, 1.2)} d="M 50 235 L 450 235" stroke={INK} sw={2} />

          <T x={50} y={285} size={20} fill={GREEN} weight={900} anchor="start">
            4. Ratio C_parallel / C_series = 11 / 1 = 11
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={360} anchor="middle" size={15} fill={GREEN} weight={800}>
            Notice how 2 µF, 3 µF, and 6 µF combine into a clean integer 1 µF in series!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 470)">
        <Badge n={3} cx={25} cy={25} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("CBSE BOARD MARKS CHECKLIST", "CBSE BOARD MARKS CHECKLIST")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={500} y={30} anchor="middle" size={17} fill={GREEN} weight={800}>
            Always show LCM steps explicitly when adding fractions in series combinations!
          </T>
          <T x={500} y={65} anchor="middle" size={15} fill={INK} weight={700}>
            Never forget to invert 1/C_s at the end to get final C_s!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={570} w={880} h={42} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ CBSE Problem Mastered: C_series = 1 µF, C_parallel = 11 µF, and Ratio C_p/C_s = 11! ✓",
            "★ CBSE Problem Mastered: C_series = 1 µF, C_parallel = 11 µF, and Ratio C_p/C_s = 11! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
