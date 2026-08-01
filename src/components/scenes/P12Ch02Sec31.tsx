"use client";

/**
 * P12Ch02 · Section 31 — "Formula toolkit: stored energy and energy density"
 * Subtopic: Capacitance, Dielectrics & Stored Energy
 * OPEN CHALKBOARD DESIGN WITH STORED ENERGY FORMULAS (NO CONTAINER BOXES):
 *  - 1. Stored Energy: U = ½ C V² = ½ Q V = Q² / (2C)
 *  - 2. Energy Density: u_E = U / Volume = ½ ε₀ E²  [Joules / m³]
 *  - 3. Energy in Dielectric Medium: u_E = ½ K ε₀ E²
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

export default function P12Ch02Sec31({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Formula Toolkit: Stored Energy U = ½CV² & Energy Density u_E = ½ε₀E²", "Formula Toolkit: Stored Energy U = ½CV² & Energy Density u_E = ½ε₀E²")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: THREE EQUIVALENT ENERGY FORMULAS */}
      <g transform="translate(40, 85)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("TOTAL STORED ENERGY U FORMULAS", "TOTAL STORED ENERGY U FORMULAS")}
          </T>
        </Fade>

        {/* Floating Formulas (No Card Boxes) */}
        <Fade on={beat >= 1}>
          <T x={40} y={85} size={16} fill={GREEN} weight={900} anchor="start">
            U = ½ C V²   (Best when Voltage V is constant!)
          </T>

          <T x={40} y={150} size={16} fill={AMBER_DARK} weight={900} anchor="start">
            U = ½ Q V   (Average Potential Work)
          </T>

          <T x={40} y={215} size={16} fill={RED} weight={900} anchor="start">
            U = Q² / (2C)   (Best when Charge Q is constant!)
          </T>
        </Fade>

        {/* Free Floating Rule (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={230} y={350} anchor="middle" size={16} fill={RED} weight={800}>
            Energy is stored IN THE ELECTRIC FIELD between the plates!
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: ELECTRIC ENERGY DENSITY u_E */}
      <g transform="translate(540, 85)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("ENERGY DENSITY u_E (ENERGY PER UNIT VOLUME)", "ENERGY DENSITY u_E (ENERGY PER UNIT VOLUME)")}
          </T>
        </Fade>

        {/* Floating Energy Density Formulas (No Card Boxes) */}
        <Fade on={beat >= 4}>
          <T x={50} y={85} size={16} fill={INK} weight={800} anchor="start">
            1. Vacuum Energy Density:
          </T>

          <T x={70} y={135} size={19} fill={GREEN} weight={900} anchor="start">
            u_E = ½ ε₀ E²   [Joules / m³]
          </T>

          <T x={50} y={205} size={16} fill={AMBER_DARK} weight={800} anchor="start">
            2. Dielectric Medium (Constant K):
          </T>

          <T x={70} y={255} size={19} fill={GREEN} weight={900} anchor="start">
            u_E = ½ K ε₀ E²   [Joules / m³]
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={350} anchor="middle" size={15} fill={GREEN} weight={800}>
            Universal formula — holds for ANY electric field configuration in space!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 440)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("CAPACITOR ENERGY RECAP", "CAPACITOR ENERGY RECAP")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={52} size={14} anchor="start" fill={GREEN} weight={800}>
            Total Energy U = u_E × (Plate Area A × Spacing d) = (½ ε₀ E²) (A d)!
          </T>
          <T x={45} y={76} size={13} anchor="start" fill={INK} weight={700}>
            Half of battery work W_battery = Q V is lost as heat during charging (U_capacitor = ½ Q V)!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Stored Energy Mastered: U = ½CV² = ½QV = Q²/(2C) and Energy Density u_E = ½ε₀E² (J/m³)! ✓",
            "★ Stored Energy Mastered: U = ½CV² = ½QV = Q²/(2C) and Energy Density u_E = ½ε₀E² (J/m³)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
