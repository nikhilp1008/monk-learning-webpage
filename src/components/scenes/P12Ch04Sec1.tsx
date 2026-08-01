"use client";

/**
 * P12Ch04 · Section 1 — "Concept Intuition: Two Sides of One Coin"
 * Beats (en [0,1,3,4,5,6,8]): 7 beats
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

export default function P12Ch04Sec1({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Subtopic One: Magnetic Field & Biot-Savart Law", "Subtopic One: Magnetic Field & Biot-Savart Law")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: PROBE SIDE */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("SIDE ONE: PROBE SIDE (DETECTION OF B)", "SIDE ONE: PROBE SIDE (DETECTION OF B)")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Probe Definition: A moving test charge q probing magnetic field B.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Magnetic Velocity Vector: Charge moves with velocity v.
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Sideways Magnetic Force: F = q (v × B).
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Key Intuition: Magnetic force acts PERPENDICULAR to velocity!
          </T>
        </Fade>

        <Fade on={beat >= 4}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Magnetic field does ZERO work on moving free charges: W = ∫ F · dr = 0)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: SOURCE SIDE */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("SIDE TWO: SOURCE SIDE (CREATION OF B)", "SIDE TWO: SOURCE SIDE (CREATION OF B)")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 4}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Current Element Source: Microscopic current element I dl.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Differential Field Created: dB = (μ₀ / 4π) (I dl × r̂) / r².
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Biot-Savart Law: Calculates field magnitude |dB| ∝ I dl sin θ / r².
          </T>

          <Draw on={beat >= 8} delay={dl(8, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Vector Superposition: Total B = ∫ dB over entire wire!
          </T>
        </Fade>

        <Fade on={beat >= 8}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Every current-carrying conductor manufactures its surrounding B field)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 8} delay={dl(8, 0.2)} />
        <Fade on={beat >= 8} delay={dl(8, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("MAGNETIC FIELD DUALITY & CONCEPT VERDICT", "MAGNETIC FIELD DUALITY & CONCEPT VERDICT")}
          </T>
        </Fade>

        <Fade on={beat >= 8}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Source Side: Current element I dl creates differential field dB via Biot-Savart Law.
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Probe Side: Moving charge q with velocity v detects field B through Lorentz force F = q(v × B).
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 8}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Probe side F = q(v × B) detects B; Source side I dl manufactures B via Biot-Savart! ✓",
            "★ Probe side F = q(v × B) detects B; Source side I dl manufactures B via Biot-Savart! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
