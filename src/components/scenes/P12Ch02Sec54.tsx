"use client";

/**
 * P12Ch02 · Section 54 — "The Van de Graaff generator — mechanical charge transfer to a giant shell"
 * Subtopic: Series & Parallel Combinations & Charge Sharing
 * OPEN CHALKBOARD DESIGN WITH VAN DE GRAAFF SCHEMATIC (NO CONTAINER BOXES):
 *  - Large hollow spherical metal dome of radius R (Charge Q)
 *  - Small inner sphere of radius r (Charge q) connected to endless insulating belt
 *  - Potential Difference: V_r - V_R = (q / 4π ε₀) (1/r - 1/R) > 0
 *  - Since V_r > V_R always, charge continuously streams from belt to outer dome!
 *  - Accumulates mega-volt potentials up to 10⁷ Volts (limited by air breakdown)!
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

export default function P12Ch02Sec54({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  // Moving belt animation clamped within dome
  const beltY = (currentTime * 40) % 80;

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("The Van de Graaff Generator: Accumulating Mega-Volts (10⁷ V) via Shell Transfer", "The Van de Graaff Generator: Accumulating Mega-Volts (10⁷ V) via Shell Transfer")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: GENERATOR SCHEMATIC DIAGRAM */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("MECHANICAL BELT & HIGH VOLTAGE DOME", "MECHANICAL BELT & HIGH VOLTAGE DOME")}
          </T>
        </Fade>

        {/* Van de Graaff Diagram (Open Chalkboard) */}
        <Fade on={beat >= 1}>
          {/* Outer Conducting Dome R */}
          <path d="M 112 180 A 100 100 0 1 1 312 180 Z" stroke={AMBER_DARK} strokeWidth={1.8} fill="none" strokeDasharray="6 4" />
          <T x={212} y={100} size={13} fill={RED} weight={900} anchor="middle">Outer Dome (R, Q)</T>

          {/* Insulating Belt */}
          <line x1="192" y1="120" x2="192" y2="230" stroke={INK} strokeWidth={1.8} strokeDasharray="5 5" />
          <line x1="232" y1="120" x2="232" y2="230" stroke={INK} strokeWidth={1.8} strokeDasharray="5 5" />

          {/* Moving charge dots on belt */}
          <circle cx={192} cy={220 - beltY} r={4} fill={RED} />
          <circle cx={232} cy={220 - beltY} r={4} fill={RED} />

          {/* Collector Comb */}
          <path d="M 160 120 L 192 120" stroke={GREEN} strokeWidth={2} />
          <T x={150} y={124} size={12} fill={GREEN} weight={800} anchor="end">Collector Comb</T>
        </Fade>

        {/* Free Floating Formula */}
        <Fade on={beat >= 3}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            ΔV = V_r − V_R = (q / 4π ε₀) (1/r − 1/R) &gt; 0 !
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: WORKING PRINCIPLE & LIMITATIONS */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("WORKING PRINCIPLE & AIR BREAKDOWN LIMIT", "WORKING PRINCIPLE & AIR BREAKDOWN LIMIT")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 4}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Spray comb sprays +q charge onto moving insulating belt.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Belt carries +q inside dome to collector comb.
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Since V_inner &gt; V_outer, 100% of charge transfers to outer dome!
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Max Potential V_max = R × E_breakdown ≈ 10⁷ Volts!
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (High-pressure SF₆ gas at 15 atm prevents corona breakdown spark)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("VAN DE GRAAFF APPLICATIONS", "VAN DE GRAAFF APPLICATIONS")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Used to accelerate charged particles (protons, alpha particles) to high kinetic energies for nuclear physics research!
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Transfer occurs regardless of how high the dome potential V_R already is!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Van de Graaff Mastered: Inner potential V_r > V_R forces continuous charge transfer to outer dome up to 10⁷ V! ✓",
            "★ Van de Graaff Mastered: Inner potential V_r > V_R forces continuous charge transfer to outer dome up to 10⁷ V! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
