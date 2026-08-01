"use client";

/**
 * P12Ch04 · Section 27 — "The Two Conversions Are Mirror Images"
 * Beats (en [0,1,3,6,7,8]): 6 beats
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

export default function P12Ch04Sec27({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Ammeter vs Voltmeter Conversions: Mirror Image Concepts", "Ammeter vs Voltmeter Conversions: Mirror Image Concepts")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: AMMETER PARALLEL LOW SHUNT */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("AMMETER: PARALLEL LOW SHUNT (S)", "AMMETER: PARALLEL LOW SHUNT (S)")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Resistor Connection: Low Shunt S connected in PARALLEL with coil G.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Circuit Placement: Meter itself is placed in SERIES with circuit line.
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Current Bypassing: Bypasses majority current (I - I_g) around delicate coil G.
          </T>

          <Draw on={beat >= 3} delay={dl(3, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Ideal Resistance Limit: Ideal Ammeter R_A = (G S)/(G + S) → 0!
          </T>
        </Fade>

        <Fade on={beat >= 3}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Zero resistance ensures meter does not drop voltage in circuit)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: VOLTMETER SERIES HIGH MULTIPLIER */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 3} delay={dl(3, 0.2)} />
        <Fade on={beat >= 3} delay={dl(3, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("VOLTMETER: SERIES HIGH MULTIPLIER (R)", "VOLTMETER: SERIES HIGH MULTIPLIER (R)")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 3}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Resistor Connection: High Multiplier R connected in SERIES with coil G.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Circuit Placement: Meter itself is placed in PARALLEL across component.
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Voltage Dropping: Drops excess voltage V - V_g across high multiplier R.
          </T>

          <Draw on={beat >= 7} delay={dl(7, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Ideal Resistance Limit: Ideal Voltmeter R_V = G + R → ∞!
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Infinite resistance ensures meter draws zero current from circuit)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("IDEAL LIMITS & SYSTEMATIC LOADING", "IDEAL LIMITS & SYSTEMATIC LOADING")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Ideal Ammeter R = 0 (low parallel shunt); Ideal Voltmeter R = ∞ (high series multiplier).
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Real meters introduce slight systematic loading: real ammeter reduces total circuit current, real voltmeter draws small current.
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Mirror images: Ammeter has low parallel shunt S | Voltmeter has high series multiplier R! ✓",
            "★ Mirror images: Ammeter has low parallel shunt S | Voltmeter has high series multiplier R! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
