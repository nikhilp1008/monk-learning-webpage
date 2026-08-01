"use client";

/**
 * P12Ch04 · Section 30 — "Derivation B: Converting a Galvanometer Into a Voltmeter"
 * Beats (en [0,1,3,4,5,6]): 6 beats
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

export default function P12Ch04Sec30({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Board Derivation: Converting Galvanometer Into Voltmeter", "Board Derivation: Converting Galvanometer Into Voltmeter")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: SERIES CHAIN VOLTAGE ADDITION */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("SERIES CHAIN VOLTAGE ADDITION", "SERIES CHAIN VOLTAGE ADDITION")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Series Combination: High Multiplier R connected in series with coil G.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Total Voltage Drop: Total potential difference V = V_coil + V_multiplier.
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Series Ohm's Law: V = I_g × G + I_g × R = I_g (G + R).
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Multiplier Formula: R = (V / I_g) - G!
          </T>
        </Fade>

        <Fade on={beat >= 4}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Never forget the subtraction of coil resistance G in exam derivations)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: DERIVED MULTIPLIER FORMULA & INTERPRETATION */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("DERIVED MULTIPLIER FORMULA & INTERPRETATION", "DERIVED MULTIPLIER FORMULA & INTERPRETATION")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 4}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Multiplier Value Behavior: Higher target voltage V requires larger multiplier R.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Dominant Resistance: R &gt;&gt; G, so multiplier drops almost full circuit voltage.
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Dial Re-calibration: Dial re-mapped from current I_g to total voltage V.
          </T>

          <Draw on={beat >= 6} delay={dl(6, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Key Result: R = (V / I_g) - G limits current through coil to I_g!
          </T>
        </Fade>

        <Fade on={beat >= 6}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (High series multiplier prevents coil burnout under large voltage)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 6} delay={dl(6, 0.2)} />
        <Fade on={beat >= 6} delay={dl(6, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("EFFECTIVE VOLTMETER RESISTANCE R_V", "EFFECTIVE VOLTMETER RESISTANCE R_V")}
          </T>
        </Fade>

        <Fade on={beat >= 6}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Effective Voltmeter Resistance R_V = G + R = V / I_g.
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Because R_V is extremely large, connecting voltmeter in parallel across circuit components draws negligible current.
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 6}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Derived! V = Ig(G + R) ⇒ R = V / Ig - G! Essential 3-mark CBSE proof! ✓",
            "★ Derived! V = Ig(G + R) ⇒ R = V / Ig - G! Essential 3-mark CBSE proof! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
