"use client";

/**
 * P12Ch04 · Section 13 — "Derivation B: The Toroid Field"
 * Beats (en [0,1,3,4,5,7,8,9]): 8 beats
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

export default function P12Ch04Sec13({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Board Derivation: Magnetic Field Inside Toroid Windings", "Board Derivation: Magnetic Field Inside Toroid Windings")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: CIRCULAR AMPERIAN LOOP */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("CIRCULAR AMPERIAN LOOP LINE INTEGRAL", "CIRCULAR AMPERIAN LOOP LINE INTEGRAL")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Concentric Amperian Path: Circular loop of radius r inside core.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Tangential Field Alignment: Magnetic field B is everywhere parallel to dl.
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Line Integral Evaluation: ∮ B · dl = B ∮ dl = B (2π r).
          </T>

          <Draw on={beat >= 5} delay={dl(5, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Enclosed Current: I_enc = N I (N turns carrying current I).
          </T>
        </Fade>

        <Fade on={beat >= 5}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (High azimuthal symmetry ensures B magnitude is constant along loop)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: THREE REGIONS & SOLENOID EQUIVALENCE */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 5} delay={dl(5, 0.2)} />
        <Fade on={beat >= 5} delay={dl(5, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("THREE REGIONS & SOLENOID EQUIVALENCE", "THREE REGIONS & SOLENOID EQUIVALENCE")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 5}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Hollow Inner Core (r &lt; r₁): Encloses zero current =&gt; B = 0.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Outer Region (r &gt; r₂): Opposing currents cancel out =&gt; B = 0.
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Inside Windings: B (2π r) = μ₀ N I =&gt; B = (μ₀ N I) / (2π r).
          </T>

          <Draw on={beat >= 9} delay={dl(9, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Solenoid Form: Setting n = N / (2πr) gives B = μ₀ n I !
          </T>
        </Fade>

        <Fade on={beat >= 9}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Toroid is an endless solenoid bent into a ring structure)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 9} delay={dl(9, 0.2)} />
        <Fade on={beat >= 9} delay={dl(9, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("TOROID FIELD DERIVATION VERDICT", "TOROID FIELD DERIVATION VERDICT")}
          </T>
        </Fade>

        <Fade on={beat >= 9}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Inside toroidal windings, field B = μ₀ N I / (2π r), perfectly matching straight solenoid formula B = μ₀ n I.
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Magnetic field is strictly confined within core; B = 0 in central hole and everywhere outside toroid.
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 9}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Derived! Toroid B = μ0 N I / (2πr) inside windings, and B = 0 in hollow center and outside! ✓",
            "★ Derived! Toroid B = μ0 N I / (2πr) inside windings, and B = 0 in hollow center and outside! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
