"use client";

/**
 * P12Ch02 · Section 57 — "Deriving the equivalent capacitance for series and parallel"
 * Subtopic: Series & Parallel Combinations Derivations
 * OPEN CHALKBOARD DESIGN WITH DERIVATION PROOFS (NO CONTAINER BOXES):
 *  - Parallel Derivation: Total Charge Q = Q₁ + Q₂  =>  C_eq V = C₁ V + C₂ V  =>  C_eq = C₁ + C₂
 *  - Series Derivation: Total Voltage V = V₁ + V₂  =>  Q/C_eq = Q/C₁ + Q/C₂  =>  1/C_eq = 1/C₁ + 1/C₂
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

export default function P12Ch02Sec57({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Derivation: Rigorous Proof of Series & Parallel Equivalent Capacitance Formulae", "Derivation: Rigorous Proof of Series & Parallel Equivalent Capacitance Formulae")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: PARALLEL COMBINATION PROOF */}
      <g transform="translate(40, 85)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("PARALLEL PROOF (Q_total = Q₁ + Q₂)", "PARALLEL PROOF (Q_total = Q₁ + Q₂)")}
          </T>
        </Fade>

        {/* Floating Solution Steps (No Card Boxes) */}
        <Fade on={beat >= 1}>
          <T x={40} y={85} size={16} fill={INK} weight={800} anchor="start">
            1. Total Charge: Q = Q₁ + Q₂
          </T>

          <T x={40} y={145} size={16} fill={AMBER_DARK} weight={800} anchor="start">
            2. Substitute Q_i = C_i V: C_eq V = C₁ V + C₂ V
          </T>

          <T x={40} y={205} size={16} fill={GREEN} weight={800} anchor="start">
            3. Divide by V: C_eq = C₁ + C₂  (Q.E.D.)
          </T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={230} y={350} anchor="middle" size={17} fill={GREEN} weight={900}>
            Parallel plates combine areas: A_eff = A₁ + A₂ !
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: SERIES COMBINATION PROOF */}
      <g transform="translate(540, 85)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("SERIES PROOF (V_total = V₁ + V₂)", "SERIES PROOF (V_total = V₁ + V₂)")}
          </T>
        </Fade>

        {/* Floating Solution Steps (No Card Boxes) */}
        <Fade on={beat >= 4}>
          <T x={50} y={85} size={16} fill={INK} weight={800} anchor="start">
            1. Total Voltage: V = V₁ + V₂
          </T>

          <T x={50} y={145} size={16} fill={AMBER_DARK} weight={800} anchor="start">
            2. Substitute V_i = Q / C_i: Q / C_eq = Q / C₁ + Q / C₂
          </T>

          <T x={50} y={205} size={16} fill={GREEN} weight={800} anchor="start">
            3. Divide by Q: 1 / C_eq = 1 / C₁ + 1 / C₂  (Q.E.D.)
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={350} anchor="middle" size={15} fill={GREEN} weight={800}>
            Series spacing combines gaps: d_eff = d₁ + d₂ !
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 470)">
        <Badge n={3} cx={25} cy={25} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("PHYSICAL INTERPRETATION OF PROOF", "PHYSICAL INTERPRETATION OF PROOF")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={500} y={30} anchor="middle" size={17} fill={GREEN} weight={800}>
            Parallel plates act like a single larger plate of area (A₁ + A₂), boosting capacitance!
          </T>
          <T x={500} y={65} anchor="middle" size={15} fill={INK} weight={700}>
            Series plates act like a single capacitor with wider spacing (d₁ + d₂), reducing capacitance!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={570} w={880} h={42} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Proof Completed: C_eq = C₁+C₂ (Area Addition) and 1/C_eq = 1/C₁+1/C₂ (Gap Addition) proven! ✓",
            "★ Proof Completed: C_eq = C₁+C₂ (Area Addition) and 1/C_eq = 1/C₁+1/C₂ (Gap Addition) proven! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
