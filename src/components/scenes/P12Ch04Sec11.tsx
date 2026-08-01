"use client";

/**
 * P12Ch04 · Section 11 — "Key Formulas and Definitions"
 * Beats (en [0,7,8,9,10]): 5 beats
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

export default function P12Ch04Sec11({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Key Formulas: Solenoid, Toroid & Thick Conductors", "Key Formulas: Solenoid, Toroid & Thick Conductors")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: SOLENOID & TOROID FORMULAS */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("IDEAL SOLENOID & TOROID FIELD FORMULAS", "IDEAL SOLENOID & TOROID FIELD FORMULAS")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 7}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Ideal Solenoid (Interior): B = μ₀ n I  (where n = N / L turns/meter).
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Solenoid (Exterior): B = 0 outside ideal infinite solenoid.
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Toroid (Inside Windings): B = (μ₀ N I) / (2π r).
          </T>

          <Draw on={beat >= 8} delay={dl(8, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Uniform Field: B is completely uniform inside solenoid/toroid!
          </T>
        </Fade>

        <Fade on={beat >= 8}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Toroid is simply a circular solenoid with no free ends)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: SOLENOID END & THICK CONDUCTOR */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 8} delay={dl(8, 0.2)} />
        <Fade on={beat >= 8} delay={dl(8, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("SOLENOID END FIELD & THICK CONDUCTOR", "SOLENOID END FIELD & THICK CONDUCTOR")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 8}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Solenoid Open End: Field drops to exactly half: B_end = ½ μ₀ n I.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Thick Wire Inside (r &lt; R): B_in = (μ₀ I r) / (2π R²)  [∝ r].
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Thick Wire Outside (r ≥ R): B_out = (μ₀ I) / (2π r)  [∝ 1/r].
          </T>

          <Draw on={beat >= 10} delay={dl(10, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Surface Peak: B reaches maximum value B_max at surface r = R!
          </T>
        </Fade>

        <Fade on={beat >= 10}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Ampere and Biot-Savart methods produce identical results for infinite wire)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 10} delay={dl(10, 0.2)} />
        <Fade on={beat >= 10} delay={dl(10, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("AMPERIAN KEY FORMULAS VERDICT", "AMPERIAN KEY FORMULAS VERDICT")}
          </T>
        </Fade>

        <Fade on={beat >= 10}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Inside solenoid B = μ₀ n I, inside toroid B = μ₀ N I / (2π r), and at solenoid end B = ½ μ₀ n I.
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            For thick cylindrical wire, field grows linearly inside B ∝ r, reaches peak at surface, and drops as 1/r outside.
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 10}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Solenoid B = μ0nI | Toroid B = μ0NI/2πr | End B = ½μ0nI | Thick wire B_in ∝ r, B_out ∝ 1/r! ✓",
            "★ Solenoid B = μ0nI | Toroid B = μ0NI/2πr | End B = ½μ0nI | Thick wire B_in ∝ r, B_out ∝ 1/r! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
