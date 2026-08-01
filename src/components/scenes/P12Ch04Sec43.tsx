"use client";

/**
 * P12Ch04 · Section 43 — "Cheat Sheet: Quick Recall for the Whole Chapter"
 * Beats (en [0,1,3,5,7,9,11]): 7 beats
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

export default function P12Ch04Sec43({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Chapter Cheat Sheet & Exam Memory Aids", "Chapter Cheat Sheet & Exam Memory Aids")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: SUBTOPICS 1 – 3 MEMORY AIDS */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("SUBTOPICS 1 – 3 MEMORY AIDS", "SUBTOPICS 1 – 3 MEMORY AIDS")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Zero Field Rule: Straight wires pointing at point give B = 0.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Magnetic Work: Magnetic force ONLY steers, doing ZERO work (W = 0).
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Parallel Wires: Same currents ATTRACT; opposite REPEL.
          </T>

          <Draw on={beat >= 7} delay={dl(7, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Right-Hand Rule: Thumb along current I, fingers curl with B!
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Essential memory rules for Biot-Savart, Lorentz Force, and Ampere's Law)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: SUBTOPICS 4 – 5 MEMORY AIDS */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("SUBTOPICS 4 – 5 MEMORY AIDS", "SUBTOPICS 4 – 5 MEMORY AIDS")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 7}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Meter Conversion: Shunt S is SMALL; Multiplier R is HIGH!
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Dipole Equivalence: Every current loop is a tiny bar magnet.
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Ratio Rule: Axial to equatorial field ratio B_ax : B_eq = 2 : 1.
          </T>

          <Draw on={beat >= 11} delay={dl(11, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Bohr Magneton: Electron μ_l/L = e/2m; μ_B = 9.27×10^-24 A m²!
          </T>
        </Fade>

        <Fade on={beat >= 11}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Core principles for Galvanometer conversion and Dipole Magnetism)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 11} delay={dl(11, 0.2)} />
        <Fade on={beat >= 11} delay={dl(11, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("FINAL EXAM CHECKLIST", "FINAL EXAM CHECKLIST")}
          </T>
        </Fade>

        <Fade on={beat >= 11}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Unit Conversions: Always convert cm -&gt; m, mm -&gt; m, and mA -&gt; A before substituting into formulas!
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Vector Superposition: Magnetic fields add vectorially; resolve perpendicular components carefully!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 11}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={13}>
          {t(
            "★ Class 12 Physics Chapter 4 Moving Charges and Magnetism 100% COMPLETE! All 43 Sections Authored & Registered! 🎉",
            "★ Class 12 Physics Chapter 4 Moving Charges and Magnetism 100% COMPLETE! All 43 Sections Authored & Registered! 🎉"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
