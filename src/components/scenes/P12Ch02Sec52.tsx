"use client";

/**
 * P12Ch02 · Section 52 — "Series and parallel — two ways to hook up capacitors"
 * Subtopic: Series & Parallel Combinations & Charge Sharing
 * OPEN CHALKBOARD DESIGN WITH CIRCUIT SCHEMATICS (NO CONTAINER BOXES):
 *  - Series Combination (Head-to-tail): Charge Q is SAME; V = V₁ + V₂  =>  1/C_eq = 1/C₁ + 1/C₂
 *  - Parallel Combination (Side-by-side): Voltage V is SAME; Q = Q₁ + Q₂  =>  C_eq = C₁ + C₂
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

export default function P12Ch02Sec52({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Series Combination (Same Charge Q) vs Parallel Combination (Same Voltage V)", "Series Combination (Same Charge Q) vs Parallel Combination (Same Voltage V)")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: SERIES CIRCUIT SCHEMATIC */}
      <g transform="translate(40, 85)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("SERIES COMBINATION (CHARGE Q IS SAME)", "SERIES COMBINATION (CHARGE Q IS SAME)")}
          </T>
        </Fade>

        {/* Series Circuit Drawing */}
        <Fade on={beat >= 1}>
          <line x1="40" y1="180" x2="140" y2="180" stroke={INK} strokeWidth={3} />
          {/* C1 */}
          <line x1="140" y1="150" x2="140" y2="210" stroke={RED} strokeWidth={4} />
          <line x1="160" y1="150" x2="160" y2="210" stroke={RED} strokeWidth={4} />
          <T x={150} y={135} size={14} fill={RED} weight={900} anchor="middle">C₁</T>

          <line x1="160" y1="180" x2="300" y2="180" stroke={INK} strokeWidth={3} />
          {/* C2 */}
          <line x1="300" y1="150" x2="300" y2="210" stroke={GREEN} strokeWidth={4} />
          <line x1="320" y1="150" x2="320" y2="210" stroke={GREEN} strokeWidth={4} />
          <T x={310} y={135} size={14} fill={GREEN} weight={900} anchor="middle">C₂</T>

          <line x1="320" y1="180" x2="420" y2="180" stroke={INK} strokeWidth={3} />

          <T x={230} y={230} size={15} fill={AMBER_DARK} weight={900} anchor="middle">Total V = V₁ + V₂</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={230} y={350} anchor="middle" size={18} fill={GREEN} weight={900}>
            1/C_eq = 1/C₁ + 1/C₂   ⇒   C_eq = (C₁ C₂) / (C₁ + C₂)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: PARALLEL CIRCUIT SCHEMATIC */}
      <g transform="translate(540, 85)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("PARALLEL COMBINATION (VOLTAGE V IS SAME)", "PARALLEL COMBINATION (VOLTAGE V IS SAME)")}
          </T>
        </Fade>

        {/* Parallel Circuit Drawing */}
        <Fade on={beat >= 4}>
          <line x1="40" y1="180" x2="120" y2="180" stroke={INK} strokeWidth={3} />
          <line x1="120" y1="110" x2="120" y2="250" stroke={INK} strokeWidth={3} />

          {/* Top Branch C1 */}
          <line x1="120" y1="110" x2="220" y2="110" stroke={INK} strokeWidth={3} />
          <line x1="220" y1="85" x2="220" y2="135" stroke={RED} strokeWidth={4} />
          <line x1="240" y1="85" x2="240" y2="135" stroke={RED} strokeWidth={4} />
          <T x={230} y={70} size={14} fill={RED} weight={900} anchor="middle">C₁</T>
          <line x1="240" y1="110" x2="340" y2="110" stroke={INK} strokeWidth={3} />

          {/* Bottom Branch C2 */}
          <line x1="120" y1="250" x2="220" y2="250" stroke={INK} strokeWidth={3} />
          <line x1="220" y1="225" x2="220" y2="275" stroke={GREEN} strokeWidth={4} />
          <line x1="240" y1="225" x2="240" y2="275" stroke={GREEN} strokeWidth={4} />
          <T x={230} y={210} size={14} fill={GREEN} weight={900} anchor="middle">C₂</T>
          <line x1="240" y1="250" x2="340" y2="250" stroke={INK} strokeWidth={3} />

          <line x1="340" y1="110" x2="340" y2="250" stroke={INK} strokeWidth={3} />
          <line x1="340" y1="180" x2="420" y2="180" stroke={INK} strokeWidth={3} />
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 5}>
          <T x={240} y={350} anchor="middle" size={19} fill={GREEN} weight={900}>
            C_eq = C₁ + C₂   (Direct Addition!)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 440)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("EQUIVALENT CAPACITANCE RULES", "EQUIVALENT CAPACITANCE RULES")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={52} size={14} anchor="start" fill={GREEN} weight={800}>
            Series: C_eq is ALWAYS smaller than the smallest individual capacitor!
          </T>
          <T x={45} y={76} size={13} anchor="start" fill={INK} weight={700}>
            Parallel: C_eq is ALWAYS larger than the largest individual capacitor!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Combinations Mastered: Series 1/C_eq = Σ(1/C_i) (Same Q) vs Parallel C_eq = Σ C_i (Same V)! ✓",
            "★ Combinations Mastered: Series 1/C_eq = Σ(1/C_i) (Same Q) vs Parallel C_eq = Σ C_i (Same V)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
