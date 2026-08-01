"use client";

/**
 * P12Ch02 · Section 22 — "NEET speed trap: one over r, not one over r squared"
 * Subtopic: Potential Energy & External Fields
 * OPEN CHALKBOARD DESIGN WITH DECAY PROFILE COMPARISON GRAPH (NO CONTAINER BOXES):
 *  - Trap: Confusing 1/r (Potential & Energy) with 1/r² (Field & Force)
 *  - Graph: 1/r curve vs 1/r² curve decay rate comparison
 *  - Decision Matrix for NEET MCQs
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

export default function P12Ch02Sec22({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("NEET Speed Trap: Energy U ∝ 1/r vs Force F ∝ 1/r² (Don't Square r!)", "NEET Speed Trap: Energy U ∝ 1/r vs Force F ∝ 1/r² (Don't Square r!)")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: 1/r VS 1/r² DECAY GRAPH */}
      <g transform="translate(40, 85)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("GRAPH: 1/r DECAY vs 1/r² DECAY RATE", "GRAPH: 1/r DECAY vs 1/r² DECAY RATE")}
          </T>
        </Fade>

        <Fade on={beat >= 1}>
          {/* Open Axes */}
          <line x1="50" y1="270" x2="450" y2="270" stroke={INK} strokeWidth={2} />
          <line x1="50" y1="270" x2="50" y2="70" stroke={INK} strokeWidth={2} />

          <T x={450} y={290} size={12} fill={INK} anchor="end">Distance r →</T>
          <T x={40} y={65} size={12} fill={INK} anchor="start">Value →</T>

          {/* 1/r Curve (Slower Decay - GREEN) */}
          <Draw on={beat >= 1} delay={dl(1, 0.6)}
            d="M 65 85 Q 120 200, 440 250" stroke={GREEN} sw={3.5} />
          <T x={340} y={225} size={14} fill={GREEN} weight={800}>U, V ∝ 1/r</T>

          {/* 1/r² Curve (Faster Decay - RED) */}
          <Draw on={beat >= 1} delay={dl(1, 1.2)}
            d="M 65 75 Q 85 245, 440 265" stroke={RED} sw={3.5} />
          <T x={220} y={235} size={14} fill={RED} weight={800}>F, E ∝ 1/r²</T>
        </Fade>

        {/* Free Floating Rule (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={240} y={350} anchor="middle" size={16} fill={RED} weight={800}>
            ★ Energy U and Potential V depend on 1/r (Distance is NOT squared!)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: NEET SPEED TRAP MATRIX */}
      <g transform="translate(540, 85)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("NEET MCQ DISTRACTOR MATRIX", "NEET MCQ DISTRACTOR MATRIX")}
          </T>
        </Fade>

        {/* Floating Matrix Features (No Card Boxes) */}
        <Fade on={beat >= 4}>
          <T x={50} y={85} size={16} fill={RED} weight={800} anchor="start">
            • FORCE F = k q₁ q₂ / r²  (Vector, 1/r²)
          </T>

          <T x={50} y={145} size={16} fill={RED} weight={800} anchor="start">
            • FIELD E = k Q / r²  (Vector, 1/r²)
          </T>

          <T x={50} y={205} size={16} fill={GREEN} weight={800} anchor="start">
            • POTENTIAL V = k Q / r  (Scalar, 1/r)
          </T>

          <T x={50} y={265} size={16} fill={GREEN} weight={800} anchor="start">
            • ENERGY U = k q₁ q₂ / r  (Scalar, 1/r)
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={360} anchor="middle" size={15} fill={GREEN} weight={800}>
            Common distractor option in NEET: squaring r in potential energy formula!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 470)">
        <Badge n={3} cx={25} cy={25} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("EXAM REASONING CHECK", "EXAM REASONING CHECK")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={500} y={30} anchor="middle" size={17} fill={GREEN} weight={800}>
            Work = Force × distance → (1/r²) × r = 1/r! Integration reduces power of r by 1!
          </T>
          <T x={500} y={65} anchor="middle" size={15} fill={INK} weight={700}>
            Doubling distance r → Force becomes 1/4th, but Potential Energy becomes 1/2!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={570} w={880} h={42} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Speed Trap Neutralized: Force/Field ∝ 1/r² vs Energy/Potential ∝ 1/r (Never square r for energy)! ✓",
            "★ Speed Trap Neutralized: Force/Field ∝ 1/r² vs Energy/Potential ∝ 1/r (Never square r for energy)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
