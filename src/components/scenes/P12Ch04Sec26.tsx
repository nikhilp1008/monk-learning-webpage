"use client";

/**
 * P12Ch04 · Section 26 — "Concept Intuition: Why a Raw Galvanometer Is Almost Useless"
 * Beats (en [0,1,2,3,4,5,7]): 7 beats
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

export default function P12Ch04Sec26({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Subtopic Four: Why a Raw Galvanometer Cannot Be Used Directly", "Subtopic Four: Why a Raw Galvanometer Cannot Be Used Directly")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: GALVANOMETER LINEAR DEFLECTION */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("GALVANOMETER LINEAR DEFLECTION", "GALVANOMETER LINEAR DEFLECTION")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Radial Field Torque: Deflecting torque τ_def = N I A B.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Spring Restoring Torque: τ_res = k φ.
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Deflection Equation: φ = (N A B / k) I  [Deflection angle φ ∝ I].
          </T>

          <Draw on={beat >= 3} delay={dl(3, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. High Sensitivity: Full-scale deflection achieved at tiny I_g (μA - mA)!
          </T>
        </Fade>

        <Fade on={beat >= 3}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Linear scale is ideal for meters, but raw coil is extremely delicate)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: THE TWO LIMITING PRACTICAL PROBLEMS */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 3} delay={dl(3, 0.2)} />
        <Fade on={beat >= 3} delay={dl(3, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("THE TWO LIMITING PRACTICAL PROBLEMS", "THE TWO LIMITING PRACTICAL PROBLEMS")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 3}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Extreme Delicacy: Large current I &gt; I_g burns fine coil windings.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. High Internal Resistance G: Connecting in series alters total circuit R.
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Loading Effect: Severe measurement error when inserted into active circuit.
          </T>

          <Draw on={beat >= 5} delay={dl(5, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Conversion Necessity: Modify impedance before measuring I or V!
          </T>
        </Fade>

        <Fade on={beat >= 5}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Raw galvanometer alone cannot function as standard circuit ammeter/voltmeter)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 5} delay={dl(5, 0.2)} />
        <Fade on={beat >= 5} delay={dl(5, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("THE ENGINEERING RESISTOR SOLUTIONS", "THE ENGINEERING RESISTOR SOLUTIONS")}
          </T>
        </Fade>

        <Fade on={beat >= 5}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Ammeter Conversion: Connect low Shunt resistor S in PARALLEL with coil G to bypass excess current.
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Voltmeter Conversion: Connect high Multiplier resistor R in SERIES with coil G to drop excess voltage.
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 5}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Raw galvanometer is too delicate and intrusive; convert using parallel Shunt S or series Multiplier R! ✓",
            "★ Raw galvanometer is too delicate and intrusive; convert using parallel Shunt S or series Multiplier R! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
