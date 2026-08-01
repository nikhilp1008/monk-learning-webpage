"use client";

/**
 * P12Ch04 · Section 16 — "Common Pitfalls and Pro-Tips"
 * Beats (en [0,1,2,3,4,5,6,7]): 8 beats
 */

import React from "react";
import {
  SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, ringD,
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

export default function P12Ch04Sec16({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Common Pitfalls & Exam Pro-Tips for Ampere's Law", "Common Pitfalls & Exam Pro-Tips for Ampere's Law")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: SYMMETRY & TURN DENSITY TRAPS */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("SYMMETRY & TURN DENSITY TRAPS", "SYMMETRY & TURN DENSITY TRAPS")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Low Symmetry Trap: If B is non-uniform on loop, Ampere cannot isolate B.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Solenoid Turn Trap: Solenoid uses turn density n = N / L (turns per meter).
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Toroid Turn Trap: Toroid uses total turns N divided by circumference 2πr.
          </T>

          <Draw on={beat >= 5} delay={dl(5, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Rule: Never confuse total turns N with turn density n!
          </T>
        </Fade>

        <Fade on={beat >= 5}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Always check question units: turns vs turns per meter)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: AMPERIAN LOOP SELECTION */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 5} delay={dl(5, 0.2)} />
        <Fade on={beat >= 5} delay={dl(5, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("EXAM PRO-TIP: AMPERIAN LOOP SELECTION", "EXAM PRO-TIP: AMPERIAN LOOP SELECTION")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 5}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Wires &amp; Cylinders: Use circular Amperian loops concentric with wire.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Solenoid Core: Use rectangular loop with 1 side aligned along axis.
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Toroid Ring: Use circular Amperian loop inside core windings.
          </T>

          <Draw on={beat >= 7} delay={dl(7, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Decision Rule: High symmetry =&gt; Ampere; General =&gt; Biot-Savart!
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Ampere's law gives 10-second solutions for high-symmetry geometries)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("AMPERE'S LAW PITFALLS & PRO-TIPS VERDICT", "AMPERE'S LAW PITFALLS & PRO-TIPS VERDICT")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Match Amperian loop geometry strictly to current distribution (circles for wires/toroids, rectangles for solenoids).
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Use Ampere's Law for rapid high-symmetry problems and Biot-Savart integration for arbitrary wire shapes.
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Match Amperian loop to geometry & check n vs N for 100% speed and precision! ✓",
            "★ Match Amperian loop to geometry & check n vs N for 100% speed and precision! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
