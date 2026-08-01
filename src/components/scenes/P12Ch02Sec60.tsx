"use client";

/**
 * P12Ch02 · Section 60 — "NEET speed trap: equivalent capacitance with a wire bridge"
 * Subtopic: Series & Parallel Combinations & Charge Sharing
 * OPEN CHALKBOARD DESIGN WITH WIRE BRIDGE NODE REDRAWING (NO CONTAINER BOXES):
 *  - 3 identical capacitors C connected with 2 wire bridges
 *  - Trap: Mistaking it for 3 capacitors in series (C/3)!
 *  - Node Analysis: Labeling nodes 1, 2, 3, 4 reveals all 3 capacitors are in PARALLEL!
 *  - Correct Equivalent Capacitance C_eq = 3 C ! (9× larger than C/3!)
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

export default function P12Ch02Sec60({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("NEET Speed Trap: Wire Bridge Circuits (Series Appearance → Parallel C_eq = 3C)", "NEET Speed Trap: Wire Bridge Circuits (Series Appearance → Parallel C_eq = 3C)")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: WIRE BRIDGE CIRCUIT SCHEMATIC */}
      <g transform="translate(40, 85)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("CIRCUIT WITH TWO CROSSOVER WIRE BRIDGES", "CIRCUIT WITH TWO CROSSOVER WIRE BRIDGES")}
          </T>
        </Fade>

        {/* Crossover Circuit Diagram */}
        <Fade on={beat >= 1}>
          <line x1="40" y1="180" x2="120" y2="180" stroke={INK} strokeWidth={3} />

          {/* C1 */}
          <line x1="120" y1="150" x2="120" y2="210" stroke={RED} strokeWidth={4} />
          <line x1="140" y1="150" x2="140" y2="210" stroke={RED} strokeWidth={4} />
          <line x1="140" y1="180" x2="220" y2="180" stroke={INK} strokeWidth={3} />

          {/* C2 */}
          <line x1="220" y1="150" x2="220" y2="210" stroke={GREEN} strokeWidth={4} />
          <line x1="240" y1="150" x2="240" y2="210" stroke={GREEN} strokeWidth={4} />
          <line x1="240" y1="180" x2="320" y2="180" stroke={INK} strokeWidth={3} />

          {/* C3 */}
          <line x1="320" y1="150" x2="320" y2="210" stroke={AMBER_DARK} strokeWidth={4} />
          <line x1="340" y1="150" x2="340" y2="210" stroke={AMBER_DARK} strokeWidth={4} />
          <line x1="340" y1="180" x2="420" y2="180" stroke={INK} strokeWidth={3} />

          {/* Wire Bridge 1: Node A (40) to Node between C2 & C3 (280) */}
          <path d="M 80 180 Q 180 90, 280 180" stroke={RED} strokeWidth={2.5} fill="none" />
          <T x={180} y={115} size={12} fill={RED} weight={800} anchor="middle">Wire Bridge 1 (Node A)</T>

          {/* Wire Bridge 2: Node between C1 & C2 (180) to Node B (380) */}
          <path d="M 180 180 Q 280 270, 380 180" stroke={GREEN} strokeWidth={2.5} fill="none" />
          <T x={280} y={260} size={12} fill={GREEN} weight={800} anchor="middle">Wire Bridge 2 (Node B)</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={230} y={350} anchor="middle" size={16} fill={RED} weight={800}>
            Looks like Series (C/3)? NO! Crossover wires short-circuit nodes into Parallel!
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: NODE LABELING ANALYSIS */}
      <g transform="translate(540, 85)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("NODE-BY-NODE REDRAWING PROOF", "NODE-BY-NODE REDRAWING PROOF")}
          </T>
        </Fade>

        {/* Floating Solution Steps (No Card Boxes) */}
        <Fade on={beat >= 4}>
          <T x={50} y={85} size={16} fill={AMBER_DARK} weight={800} anchor="start">
            1. Label all wires connected to Node A with Potential V_A.
          </T>

          <T x={50} y={145} size={16} fill={AMBER_DARK} weight={800} anchor="start">
            2. Label all wires connected to Node B with Potential V_B.
          </T>

          <T x={50} y={205} size={16} fill={GREEN} weight={800} anchor="start">
            3. C₁, C₂, and C₃ are ALL connected between V_A and V_B!
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 50 235 L 450 235" stroke={INK} sw={2} />

          <T x={50} y={285} size={22} fill={GREEN} weight={900} anchor="start">
            4. C_eq = C + C + C = 3 C !
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={360} anchor="middle" size={15} fill={GREEN} weight={800}>
            Always re-draw circuits by labeling node potentials (V_A, V_B) before calculating C_eq!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 470)">
        <Badge n={3} cx={25} cy={25} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("NEET MCQ SPEED TRAP WARNING", "NEET MCQ SPEED TRAP WARNING")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={500} y={30} anchor="middle" size={17} fill={GREEN} weight={800}>
            Option (A) C/3 is the classic distractor! Correct answer is Option (D) 3C!
          </T>
          <T x={500} y={65} anchor="middle" size={15} fill={INK} weight={700}>
            Zero resistance wires collapse node potentials V_1 = V_3 and V_2 = V_4!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={570} w={880} h={42} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ NEET Trap Neutralized: Crossover wire bridges turn series appearance into parallel C_eq = 3C! ✓",
            "★ NEET Trap Neutralized: Crossover wire bridges turn series appearance into parallel C_eq = 3C! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
