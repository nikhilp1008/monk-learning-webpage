"use client";

/**
 * P12Ch04 · Section 12 — "Derivation A: The Solenoid Field"
 * Beats (en [0,1,3,4,8,10,12]): 7 beats
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

export default function P12Ch04Sec12({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Board Derivation: Field Inside Long Ideal Solenoid (B = μ₀ n I)", "Board Derivation: Field Inside Long Ideal Solenoid (B = μ₀ n I)")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: RECTANGULAR AMPERIAN LOOP */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("RECTANGULAR AMPERIAN LOOP LINE INTEGRAL", "RECTANGULAR AMPERIAN LOOP LINE INTEGRAL")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Four Path Segments: ∮ B · dl = ∫_ab + ∫_bc + ∫_cd + ∫_da.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Perpendicular Sides (bc &amp; da): B ⊥ dl =&gt; ∫ B · dl = 0.
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. External Side (cd): Outside ideal solenoid B = 0 =&gt; ∫ B · dl = 0.
          </T>

          <Draw on={beat >= 8} delay={dl(8, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Interior Segment (ab): ∫ B · dl = B L (only non-zero side)!
          </T>
        </Fade>

        <Fade on={beat >= 8}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Rectangular Amperian loop abcd of length L)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: ENCLOSED CURRENT & FIELD DERIVATION */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 8} delay={dl(8, 0.2)} />
        <Fade on={beat >= 8} delay={dl(8, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("ENCLOSED CURRENT & FIELD DERIVATION", "ENCLOSED CURRENT & FIELD DERIVATION")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 8}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Number of Turns Enclosed: N_enc = n L (n = turns per unit length).
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Enclosed Current: I_enclosed = N_enc × I = (n L I).
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Apply Ampere's Law: B L = μ₀ (n L I).
          </T>

          <Draw on={beat >= 12} delay={dl(12, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Solenoid Core Formula: B_inside = μ₀ n I !
          </T>
        </Fade>

        <Fade on={beat >= 12}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (At solenoid open end, field lines spread out =&gt; B_end = ½ μ₀ n I)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 12} delay={dl(12, 0.2)} />
        <Fade on={beat >= 12} delay={dl(12, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("SOLENOID FIELD DERIVATION VERDICT", "SOLENOID FIELD DERIVATION VERDICT")}
          </T>
        </Fade>

        <Fade on={beat >= 12}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Evaluating ∮ B · dl around rectangular Amperian loop isolates interior segment ab: ∮ B · dl = B L.
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Equating B L = μ₀ (n L I) yields uniform interior field B = μ₀ n I (dropping to ½ μ₀ n I at ends).
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 12}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Derived! Solenoid B_inside = μ0nI (Uniform!) | Solenoid B_end = ½μ0nI! ✓",
            "★ Derived! Solenoid B_inside = μ0nI (Uniform!) | Solenoid B_end = ½μ0nI! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
