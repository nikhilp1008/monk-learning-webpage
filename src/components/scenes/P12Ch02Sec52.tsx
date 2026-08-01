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
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("SERIES COMBINATION (CHARGE Q IS SAME)", "SERIES COMBINATION (CHARGE Q IS SAME)")}
          </T>
        </Fade>

        {/* Series Circuit Drawing (Open Chalkboard) */}
        <Fade on={beat >= 1}>
          <line x1="45" y1="170" x2="130" y2="170" stroke={INK} strokeWidth={2} />
          {/* C1 */}
          <line x1="130" y1="140" x2="130" y2="200" stroke={RED} strokeWidth={3} />
          <line x1="150" y1="140" x2="150" y2="200" stroke={RED} strokeWidth={3} />
          <T x={140} y={130} size={13} fill={RED} weight={900} anchor="middle">C₁</T>

          <line x1="150" y1="170" x2="270" y2="170" stroke={INK} strokeWidth={2} />
          {/* C2 */}
          <line x1="270" y1="140" x2="270" y2="200" stroke={GREEN} strokeWidth={3} />
          <line x1="290" y1="140" x2="290" y2="200" stroke={GREEN} strokeWidth={3} />
          <T x={280} y={130} size={13} fill={GREEN} weight={900} anchor="middle">C₂</T>

          <line x1="290" y1="170" x2="380" y2="170" stroke={INK} strokeWidth={2} />

          <T x={210} y={220} size={14} fill={AMBER_DARK} weight={900} anchor="middle">Total V = V₁ + V₂</T>
        </Fade>

        {/* Free Floating Formula */}
        <Fade on={beat >= 3}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={900}>
            1/C_eq = 1/C₁ + 1/C₂   ⇒   C_eq = (C₁ C₂) / (C₁ + C₂)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: PARALLEL CIRCUIT SCHEMATIC */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("PARALLEL COMBINATION (VOLTAGE V IS SAME)", "PARALLEL COMBINATION (VOLTAGE V IS SAME)")}
          </T>
        </Fade>

        {/* Parallel Circuit Drawing (Open Chalkboard) */}
        <Fade on={beat >= 4}>
          <line x1="45" y1="170" x2="100" y2="170" stroke={INK} strokeWidth={2} />
          <line x1="100" y1="110" x2="100" y2="230" stroke={INK} strokeWidth={2} />

          {/* Top Branch C1 */}
          <line x1="100" y1="110" x2="190" y2="110" stroke={INK} strokeWidth={2} />
          <line x1="190" y1="90" x2="190" y2="130" stroke={RED} strokeWidth={3} />
          <line x1="210" y1="90" x2="210" y2="130" stroke={RED} strokeWidth={3} />
          <T x={200} y={80} size={13} fill={RED} weight={900} anchor="middle">C₁</T>
          <line x1="210" y1="110" x2="300" y2="110" stroke={INK} strokeWidth={2} />

          {/* Bottom Branch C2 */}
          <line x1="100" y1="230" x2="190" y2="230" stroke={INK} strokeWidth={2} />
          <line x1="190" y1="210" x2="190" y2="250" stroke={GREEN} strokeWidth={3} />
          <line x1="210" y1="210" x2="210" y2="250" stroke={GREEN} strokeWidth={3} />
          <T x={200} y={200} size={13} fill={GREEN} weight={900} anchor="middle">C₂</T>
          <line x1="210" y1="230" x2="300" y2="230" stroke={INK} strokeWidth={2} />

          <line x1="300" y1="110" x2="300" y2="230" stroke={INK} strokeWidth={2} />
          <line x1="300" y1="170" x2="380" y2="170" stroke={INK} strokeWidth={2} />
        </Fade>

        {/* Free Floating Formula */}
        <Fade on={beat >= 5}>
          <T x={45} y={268} anchor="start" size={14} fill={GREEN} weight={900}>
            C_eq = C₁ + C₂   (Direct Addition!)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("EQUIVALENT CAPACITANCE RULES", "EQUIVALENT CAPACITANCE RULES")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Series: C_eq is ALWAYS smaller than the smallest individual capacitor!
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
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
