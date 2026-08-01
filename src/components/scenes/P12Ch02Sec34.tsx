"use client";

/**
 * P12Ch02 · Section 34 — "CBSE level: capacitance and charge of an air capacitor"
 * Subtopic: Capacitance, Dielectrics & Stored Energy
 * OPEN CHALKBOARD DESIGN WITH CBSE WORKED NUMERICAL (NO CONTAINER BOXES):
 *  - Area A = 90 cm² (9×10⁻³ m²), spacing d = 2.5 mm (2.5×10⁻³ m), V = 400 V
 *  - Step 1: Calculate C₀ = ε₀ A / d = 31.9 pF
 *  - Step 2: Calculate Charge Q₀ = C₀ V = 12.75 nC
 *  - Step 3: Calculate Stored Energy U₀ = ½ C₀ V² = 2.55 µJ
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

export default function P12Ch02Sec34({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("CBSE Worked Problem: Air Capacitor (A = 90 cm², d = 2.5 mm, V = 400 V)", "CBSE Worked Problem: Air Capacitor (A = 90 cm², d = 2.5 mm, V = 400 V)")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: PHYSICAL SETUP DIAGRAM */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("PARALLEL PLATE AIR CAPACITOR SETUP", "PARALLEL PLATE AIR CAPACITOR SETUP")}
          </T>
        </Fade>

        {/* Capacitor Diagram */}
        <Fade on={beat >= 1}>
          <line x1="60" y1="90" x2="420" y2="90" stroke={RED} strokeWidth={4} />
          <T x={435} y={95} size={14} fill={RED} weight={800}>Area A = 90 cm²</T>

          <line x1="60" y1="230" x2="420" y2="230" stroke={GREEN} strokeWidth={4} />
          <T x={435} y={235} size={14} fill={GREEN} weight={800}>Gap d = 2.5 mm</T>

          {/* Battery 400V connection */}
          <line x1="240" y1="90" x2="240" y2="40" stroke={INK} strokeWidth={2} />
          <line x1="240" y1="230" x2="240" y2="280" stroke={INK} strokeWidth={2} />
          <T x={240} y={300} size={15} fill={AMBER_DARK} weight={900} anchor="middle">DC Battery V = 400 V</T>
        </Fade>

        {/* Free Floating Question (Spacious, No Box) */}
        <Fade on={beat >= 2}>
          <T x={240} y={305} anchor="middle" size={16} fill={INK} weight={800}>
            Calculate Capacitance C₀, Charge Q₀, and Stored Energy U₀!
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: NUMERICAL CALCULATION STEPS */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={25} cy={25} on={beat >= 3} delay={dl(3, 0.2)} />
        <Fade on={beat >= 3} delay={dl(3, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("STEP-BY-STEP CALCULATION", "STEP-BY-STEP CALCULATION")}
          </T>
        </Fade>

        {/* Floating Solution Steps (No Card Boxes) */}
        <Fade on={beat >= 3}>
          <T x={50} y={85} size={16} fill={AMBER_DARK} weight={800} anchor="start">
            1. C₀ = (8.854×10⁻¹² × 9×10⁻³) / (2.5×10⁻³) = 31.9 pF
          </T>

          <T x={50} y={145} size={16} fill={GREEN} weight={800} anchor="start">
            2. Q₀ = C₀ V = 31.9×10⁻¹² × 400 = 12.75 nC
          </T>

          <T x={50} y={205} size={16} fill={RED} weight={800} anchor="start">
            3. U₀ = ½ C₀ V² = ½ (31.9×10⁻¹²) (400)² = 2.55 µJ
          </T>

          <Draw on={beat >= 3} delay={dl(3, 1.2)} d="M 50 235 L 450 235" stroke={INK} sw={2} />

          <T x={50} y={285} size={20} fill={GREEN} weight={900} anchor="start">
            4. C₀ = 31.9 pF, Q₀ = 12.75 nC, U₀ = 2.55 µJ
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={305} anchor="middle" size={15} fill={GREEN} weight={800}>
            Always convert cm² to m² (90 cm² = 90 × 10⁻⁴ m² = 9 × 10⁻³ m²)!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 420)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("CBSE BOARD MARKS CHECKLIST", "CBSE BOARD MARKS CHECKLIST")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={52} size={14} anchor="start" fill={GREEN} weight={800}>
            Always state final answers with correct prefix units (pF = 10⁻¹² F, nC = 10⁻⁹ C, µJ = 10⁻⁶ J)!
          </T>
          <T x={45} y={76} size={13} anchor="start" fill={INK} weight={700}>
            Electric field E = V/d = 400 / 2.5×10⁻³ = 1.6 × 10⁵ V/m!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ CBSE Problem Mastered: C₀ = 31.9 pF, Charge Q₀ = 12.75 nC, and Stored Energy U₀ = 2.55 µJ! ✓",
            "★ CBSE Problem Mastered: C₀ = 31.9 pF, Charge Q₀ = 12.75 nC, and Stored Energy U₀ = 2.55 µJ! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
