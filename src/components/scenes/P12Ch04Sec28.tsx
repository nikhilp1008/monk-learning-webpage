"use client";

/**
 * P12Ch04 · Section 28 — "Key Formulas and Definitions"
 * Beats (en [0,2,3,5,7,9,11,12]): 8 beats
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

export default function P12Ch04Sec28({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Key Formulas: Ammeter & Voltmeter Conversions", "Key Formulas: Ammeter & Voltmeter Conversions")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: FIGURE OF MERIT & SENSITIVITIES */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 2} delay={dl(2, 0.2)} />
        <Fade on={beat >= 2} delay={dl(2, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("FIGURE OF MERIT & SENSITIVITIES", "FIGURE OF MERIT & SENSITIVITIES")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 2}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Current Sensitivity: S_I = φ / I = (N A B) / k.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Voltage Sensitivity: S_V = φ / V = (N A B) / (k G).
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Figure of Merit K: K = 1 / S_I = k / (N A B)  [Current per div deflection].
          </T>

          <Draw on={beat >= 5} delay={dl(5, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Full-Scale Current: I_g = K × (Total Divisions N_div)!
          </T>
        </Fade>

        <Fade on={beat >= 5}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Figure of merit K defines maximum current capacity of galvanometer)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: AMMETER SHUNT FORMULA */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 5} delay={dl(5, 0.2)} />
        <Fade on={beat >= 5} delay={dl(5, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("AMMETER SHUNT FORMULA", "AMMETER SHUNT FORMULA")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 5}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Parallel Voltage Equality: V_shunt = V_coil =&gt; (I - I_g) S = I_g G.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Shunt Resistance: S = (I_g G) / (I - I_g) = G / (n - 1)  [where n = I / I_g].
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Ammeter Equivalent Resistance: R_A = (G S) / (G + S) ≈ S.
          </T>

          <Draw on={beat >= 9} delay={dl(9, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Ammeter Property: Effective R_A is extremely small (R_A → 0)!
          </T>
        </Fade>

        <Fade on={beat >= 9}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Larger target range I requires smaller shunt resistance S)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 9} delay={dl(9, 0.2)} />
        <Fade on={beat >= 9} delay={dl(9, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("VOLTMETER MULTIPLIER FORMULA & VERDICT", "VOLTMETER MULTIPLIER FORMULA & VERDICT")}
          </T>
        </Fade>

        <Fade on={beat >= 9}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Series Multiplier: R = (V / I_g) - G  |  Voltmeter Equivalent Resistance R_V = G + R = V / I_g.
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Effective R_V is extremely large (R_V → ∞), drawing negligible current when connected in parallel across components.
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 9}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Shunt S = Ig G / (I - Ig) for Ammeter | Multiplier R = V/Ig - G for Voltmeter! ✓",
            "★ Shunt S = Ig G / (I - Ig) for Ammeter | Multiplier R = V/Ig - G for Voltmeter! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
