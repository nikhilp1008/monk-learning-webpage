"use client";

/**
 * P12Ch02 · Section 61 — "JEE Main: infinite ladder of capacitors"
 * Subtopic: Series & Parallel Combinations & Charge Sharing
 * OPEN CHALKBOARD DESIGN WITH RECURSIVE INFINITE LADDER (NO CONTAINER BOXES):
 *  - Infinite repeating network of capacitors C
 *  - Self-Similarity Principle: Truncating 1 unit leaves remaining infinite chain with capacitance C_eq!
 *  - Quadratic Equation: C_eq = C + (C C_eq) / (C + C_eq)  =>  C_eq² - C C_eq - C² = 0
 *  - Golden Ratio Solution: C_eq = C (1 + √5) / 2 ≈ 1.618 C !
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

export default function P12Ch02Sec61({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("JEE Main: Infinite Ladder Network & Golden Ratio Solution C_eq = C(1+√5)/2", "JEE Main: Infinite Ladder Network & Golden Ratio Solution C_eq = C(1+√5)/2")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: RECURSIVE INFINITE LADDER SCHEMATIC */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("INFINITE REPEATING LADDER NETWORK", "INFINITE REPEATING LADDER NETWORK")}
          </T>
        </Fade>

        {/* Infinite Ladder Circuit Drawing (Open Chalkboard) */}
        <Fade on={beat >= 1}>
          {/* Unit 1 */}
          <line x1="45" y1="120" x2="130" y2="120" stroke={INK} strokeWidth={2} />
          <line x1="130" y1="100" x2="130" y2="140" stroke={RED} strokeWidth={3} />
          <line x1="150" y1="100" x2="150" y2="140" stroke={RED} strokeWidth={3} />
          <line x1="150" y1="120" x2="230" y2="120" stroke={INK} strokeWidth={2} />

          <line x1="230" y1="120" x2="230" y2="170" stroke={INK} strokeWidth={2} />
          <line x1="210" y1="170" x2="250" y2="170" stroke={GREEN} strokeWidth={3} />
          <line x1="210" y1="190" x2="250" y2="190" stroke={GREEN} strokeWidth={3} />
          <line x1="230" y1="190" x2="230" y2="240" stroke={INK} strokeWidth={2} />

          {/* Unit 2 repeating to infinity */}
          <line x1="230" y1="120" x2="310" y2="120" stroke={INK} strokeWidth={2} />
          <line x1="310" y1="100" x2="310" y2="140" stroke={RED} strokeWidth={2} />
          <line x1="325" y1="100" x2="325" y2="140" stroke={RED} strokeWidth={2} />
          <line x1="325" y1="120" x2="370" y2="120" stroke={INK} strokeWidth={1.8} strokeDasharray="4 4" />

          <T x={380} y={125} size={16} fill={AMBER_DARK} weight={900}>...</T>

          <line x1="45" y1="240" x2="370" y2="240" stroke={INK} strokeWidth={2} />
        </Fade>

        {/* Free Floating Formula */}
        <Fade on={beat >= 3}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Truncating 1 repeating unit leaves the rest with capacitance C_eq)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: QUADRATIC DERIVATION */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("QUADRATIC EQUATION PROOF", "QUADRATIC EQUATION PROOF")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 4}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. C_eq = C + [ (C C_eq) / (C + C_eq) ]
          </T>

          <T x={45} y={125} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            2. Multiply by (C + C_eq): C_eq² + C C_eq = C² + 2 C C_eq
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Quadratic Form: C_eq² − C C_eq − C² = 0
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. C_eq = C [ (1 + √5) / 2 ] ≈ 1.618 C (Golden Ratio ϕ!)
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Discard negative root C(1−√5)/2 since C must be strictly positive)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("JEE MAIN RECURSION TRICK", "JEE MAIN RECURSION TRICK")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Infinite series/parallel circuits always reduce to a simple 1-variable quadratic equation!
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Golden Ratio ϕ = (1 + √5)/2 ≈ 1.61803... governs infinite capacitor networks!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ JEE Main Mastered: Infinite ladder C_eq² − C C_eq − C² = 0 yields Golden Ratio solution C_eq = 1.618 C! ✓",
            "★ JEE Main Mastered: Infinite ladder C_eq² − C C_eq − C² = 0 yields Golden Ratio solution C_eq = 1.618 C! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
