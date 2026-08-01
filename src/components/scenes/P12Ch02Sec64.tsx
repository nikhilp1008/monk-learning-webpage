"use client";

/**
 * P12Ch02 · Section 64 — "Chapter 2 Synthesis Part 1 — Comprehensive concept recap"
 * Subtopic: Synthesis & Exam Readiness
 * OPEN CHALKBOARD DESIGN WITH COMPREHENSIVE CONCEPT RECAP (NO CONTAINER BOXES):
 *  - Core Pillars of Electrostatic Potential & Capacitance:
 *     1. Potential V & Potential Energy U
 *     2. Equipotential Surfaces & Field Gradient E = -dV/dr
 *     3. Capacitance C = Q/V & Parallel Plate C = ε₀A/d
 *     4. Dielectric Effects & Battery Fork (Connected vs Disconnected)
 *     5. Conductor Equilibrium, Cavities & Shielding
 *     6. Combinations, Charge Sharing & Heat Loss ΔU
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

export default function P12Ch02Sec64({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Chapter 2 Synthesis Part 1: Comprehensive Electrostatics Concept Map", "Chapter 2 Synthesis Part 1: Comprehensive Electrostatics Concept Map")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: POTENTIAL & ENERGY PILLARS */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("POTENTIAL, ENERGY & EQUIVALENT FIELD GRADIENTS", "POTENTIAL, ENERGY & EQUIVALENT FIELD GRADIENTS")}
          </T>
        </Fade>

        {/* Floating Pillars */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={INK} weight={800} anchor="start">
            1. Point Potential: V(r) = k Q / r  (Scalar, 1/r decay)
          </T>

          <T x={45} y={125} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            2. System Energy: U = Σ k q_i q_j / r_ij  (N(N−1)/2 pairs)
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Field Gradient: E = − dV/dr  (Field points high V → low V)
          </T>

          <T x={45} y={215} size={14} fill={RED} weight={800} anchor="start">
            4. Dipole Energy: U(θ) = − p · E = − p E cosθ
          </T>
        </Fade>

        <Fade on={beat >= 3}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Work done by conservative electrostatic force W = −ΔU)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: CAPACITANCE & DIELECTRIC PILLARS */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 2} delay={dl(2, 0.2)} />
        <Fade on={beat >= 2} delay={dl(2, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("CAPACITANCE, DIELECTRICS & BATTERY STATES", "CAPACITANCE, DIELECTRICS & BATTERY STATES")}
          </T>
        </Fade>

        {/* Floating Pillars */}
        <Fade on={beat >= 2}>
          <T x={45} y={80} size={14} fill={GREEN} weight={800} anchor="start">
            5. Parallel Plate: C = ε₀ A / d  (Geometry dependent)
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            6. Dielectric Slab: C = K C₀ = K ε₀ A / d
          </T>

          <T x={45} y={170} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            7. Battery Connected: V = V₀ constant  ⇒  U = ½ C V² (boosts)
          </T>

          <T x={45} y={215} size={14} fill={RED} weight={800} anchor="start">
            8. Battery Disconnected: Q = Q₀ constant  ⇒  U = Q²/(2C) (drops)
          </T>
        </Fade>

        <Fade on={beat >= 6}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Dielectric constant K &gt; 1 ALWAYS increases capacitance C)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: GRAND SYNTHESIS MATRIX */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("CIRCUIT & SHARING MASTER FORMULAE", "CIRCUIT & SHARING MASTER FORMULAE")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Series 1/C_eq = Σ(1/C_i)   |   Parallel C_eq = Σ C_i   |   V_com = (C₁V₁+C₂V₂)/(C₁+C₂)
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Conductors: E_inside = 0, V = Const everywhere, E_surface = σ/ε₀, 100% Faraday Shielding!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Synthesis Part 1 Complete: All 5 core subtopics of Electrostatic Potential & Capacitance interconnected! ✓",
            "★ Synthesis Part 1 Complete: All 5 core subtopics of Electrostatic Potential & Capacitance interconnected! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
