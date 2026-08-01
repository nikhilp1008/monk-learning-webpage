"use client";

/**
 * P12Ch02 · Section 58 — "Deriving common potential and energy loss on connecting two conductors"
 * Subtopic: Series & Parallel Combinations Derivations
 * OPEN CHALKBOARD DESIGN WITH ALGEBRAIC ΔU PROOF (NO CONTAINER BOXES):
 *  - Initial Energy U_i = ½ C₁ V₁² + ½ C₂ V₂²
 *  - Final Energy U_f = ½ (C₁ + C₂) V_com² = ½ (C₁ V₁ + C₂ V₂)² / (C₁ + C₂)
 *  - Algebraic Expansion ΔU = U_i - U_f:
 *      ΔU = ½ [ C₁ C₂ / (C₁ + C₂) ] (V₁ - V₂)²
 *  - Since (V₁ - V₂)² ≥ 0, ΔU ≥ 0 ALWAYS!
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

export default function P12Ch02Sec58({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Derivation: Heat Loss Formula ΔU = ½[C₁C₂/(C₁+C₂)](V₁−V₂)² Algebraic Proof", "Derivation: Heat Loss Formula ΔU = ½[C₁C₂/(C₁+C₂)](V₁−V₂)² Algebraic Proof")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: ALGEBRAIC STEPS (U_i and U_f) */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("INITIAL AND FINAL ENERGY FORMULATIONS", "INITIAL AND FINAL ENERGY FORMULATIONS")}
          </T>
        </Fade>

        {/* Floating Derivation Steps (No Card Boxes) */}
        <Fade on={beat >= 1}>
          <T x={40} y={85} size={16} fill={INK} weight={800} anchor="start">
            1. Initial Energy U_i = ½ C₁ V₁² + ½ C₂ V₂²
          </T>

          <T x={40} y={145} size={16} fill={AMBER_DARK} weight={800} anchor="start">
            2. Substitute V_com: U_f = ½ (C₁ + C₂) [ (C₁ V₁ + C₂ V₂) / (C₁ + C₂) ]²
          </T>

          <T x={40} y={205} size={16} fill={GREEN} weight={800} anchor="start">
            3. Simplify: U_f = ½ (C₁ V₁ + C₂ V₂)² / (C₁ + C₂)
          </T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={230} y={305} anchor="middle" size={17} fill={RED} weight={800}>
            Subtracting U_i − U_f reveals a perfect square term (V₁ − V₂)² !
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: PERFECT SQUARE SIMPLIFICATION */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("PERFECT SQUARE HEAT LOSS RESULT", "PERFECT SQUARE HEAT LOSS RESULT")}
          </T>
        </Fade>

        {/* Floating Solution Steps (No Card Boxes) */}
        <Fade on={beat >= 4}>
          <T x={50} y={85} size={16} fill={AMBER_DARK} weight={800} anchor="start">
            1. ΔU = ½ [ (C₁ V₁² + C₂ V₂²)(C₁ + C₂) − (C₁ V₁ + C₂ V₂)² ] / (C₁ + C₂)
          </T>

          <T x={50} y={145} size={16} fill={GREEN} weight={800} anchor="start">
            2. Expand: C₁ C₂ V₁² + C₁ C₂ V₂² − 2 C₁ C₂ V₁ V₂
          </T>

          <T x={50} y={205} size={16} fill={GREEN} weight={800} anchor="start">
            3. Factor: C₁ C₂ (V₁² − 2 V₁ V₂ + V₂²) = C₁ C₂ (V₁ − V₂)²
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 50 235 L 450 235" stroke={INK} sw={2} />

          <T x={50} y={285} size={20} fill={RED} weight={900} anchor="start">
            4. ΔU = ½ [ (C₁ C₂) / (C₁ + C₂) ] (V₁ − V₂)²  (Q.E.D.)
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={305} anchor="middle" size={15} fill={GREEN} weight={800}>
            Because (V₁ − V₂)² is non-negative, electrostatic energy is ALWAYS lost during sharing!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 420)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("DERIVATION VERDICT", "DERIVATION VERDICT")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={52} size={14} anchor="start" fill={GREEN} weight={800}>
            The lost electrostatic potential energy converts into Joulean heat in connecting wires and spark radiation!
          </T>
          <T x={45} y={76} size={13} anchor="start" fill={INK} weight={700}>
            Zero energy loss occurs ONLY if initial potentials are already equal (V₁ = V₂)!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Proof Completed: ΔU = ½[C₁C₂/(C₁+C₂)](V₁−V₂)² rigorously proven via algebraic expansion of U_i − U_f! ✓",
            "★ Proof Completed: ΔU = ½[C₁C₂/(C₁+C₂)](V₁−V₂)² rigorously proven via algebraic expansion of U_i − U_f! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
