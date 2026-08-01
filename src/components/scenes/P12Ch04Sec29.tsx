"use client";

/**
 * P12Ch04 · Section 29 — "Derivation A: Converting a Galvanometer Into an Ammeter"
 * Beats (en [0,1,3,4,6,7,8]): 7 beats
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

export default function P12Ch04Sec29({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Board Derivation: Converting Galvanometer Into Ammeter", "Board Derivation: Converting Galvanometer Into Ammeter")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: PARALLEL BRANCH VOLTAGE EQUALITY */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("PARALLEL BRANCH VOLTAGE EQUALITY", "PARALLEL BRANCH VOLTAGE EQUALITY")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Parallel Combination: Shunt S in parallel with coil G =&gt; V_G = V_S.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Kirchhoff's Current Law: Total I splits into I_g (coil) &amp; (I - I_g) (shunt).
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Voltage Equality Equation: I_g × G = (I - I_g) × S.
          </T>

          <Draw on={beat >= 6} delay={dl(6, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Shunt Formula: S = (I_g G) / (I - I_g) = G / (n - 1)!
          </T>
        </Fade>

        <Fade on={beat >= 6}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Derivation step 1 for 3-mark CBSE board exam question)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: DERIVED SHUNT FORMULA & INTERPRETATION */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 6} delay={dl(6, 0.2)} />
        <Fade on={beat >= 6} delay={dl(6, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("DERIVED SHUNT FORMULA & INTERPRETATION", "DERIVED SHUNT FORMULA & INTERPRETATION")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 6}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Shunt Value Behavior: Higher target range I requires smaller shunt S.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Fractional Shunt: S &lt;&lt; G, bypassing almost all current away from coil.
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Scale Calibration: Dial re-calibrated from I_g to total current I.
          </T>

          <Draw on={beat >= 8} delay={dl(8, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Key Result: S = I_g G / (I - I_g) protects delicate galvanometer!
          </T>
        </Fade>

        <Fade on={beat >= 8}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Shunt resistor handles &gt;99% of total circuit current)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 8} delay={dl(8, 0.2)} />
        <Fade on={beat >= 8} delay={dl(8, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("EFFECTIVE AMMETER RESISTANCE R_A", "EFFECTIVE AMMETER RESISTANCE R_A")}
          </T>
        </Fade>

        <Fade on={beat >= 8}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Effective Ammeter Resistance R_A = (G × S) / (G + S) ≈ S (since S &lt;&lt; G).
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Because R_A is extremely small, inserting ammeter into circuit in series introduces minimal voltage drop.
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 8}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Derived! Ig G = (I - Ig) S ⇒ S = Ig G / (I - Ig)! Essential 3-mark CBSE proof! ✓",
            "★ Derived! Ig G = (I - Ig) S ⇒ S = Ig G / (I - Ig)! Essential 3-mark CBSE proof! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
