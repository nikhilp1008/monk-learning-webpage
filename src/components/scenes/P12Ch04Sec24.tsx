"use client";

/**
 * P12Ch04 · Section 24 — "Worked Examples Three and Four: Mass Spectrometer, and a Loop Beside a Wire"
 * Beats (en [0,1,2,3,4,5,6,9,11,12]): 10 beats
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

export default function P12Ch04Sec24({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("JEE Main & Advanced: Mass Spectrometer & Loop Beside Straight Wire", "JEE Main & Advanced: Mass Spectrometer & Loop Beside Straight Wire")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: JEE MAIN MASS SPECTROMETER */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("JEE MAIN: MASS SPECTROMETER RADIUS", "JEE MAIN: MASS SPECTROMETER RADIUS")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Velocity Selector Stage: Speed v = E / B = (6.0 × 10⁴) / 0.40 = 1.5 × 10⁵ m/s.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Deflection Chamber Field: Mass spectrometer B' = 0.50 T.
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Semicircular Radius: r = (m v) / (q B') = (6.64×10⁻²⁷ × 1.5×10⁵) / (3.2×10⁻¹⁹ × 0.50).
          </T>

          <Draw on={beat >= 5} delay={dl(5, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Resulting Orbit Radius: r = 0.0623 m = 6.23 cm!
          </T>
        </Fade>

        <Fade on={beat >= 5}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Detector placement at diameter distance 2r = 12.46 cm)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: JEE ADVANCED LOOP BESIDE WIRE */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 5} delay={dl(5, 0.2)} />
        <Fade on={beat >= 5} delay={dl(5, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("JEE ADVANCED: LOOP BESIDE WIRE NET FORCE", "JEE ADVANCED: LOOP BESIDE WIRE NET FORCE")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 5}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Near Side Attraction: F_near = (μ₀ I₁ I₂ a) / (2π d)  [towards wire].
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Far Side Repulsion: F_far = (μ₀ I₁ I₂ a) / [2π (d + a)]  [away from wire].
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Top &amp; Bottom Sides: Equal and opposite forces cancel out exactly.
          </T>

          <Draw on={beat >= 12} delay={dl(12, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Net Attractive Force: F_net = (μ₀ I₁ I₂ a²) / [2π d (d + a)]!
          </T>
        </Fade>

        <Fade on={beat >= 12}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Near side force dominates because magnetic field drops as 1/r)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 12} delay={dl(12, 0.2)} />
        <Fade on={beat >= 12} delay={dl(12, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("MASS SPECTROMETER & LOOP BESIDE WIRE VERDICT", "MASS SPECTROMETER & LOOP BESIDE WIRE VERDICT")}
          </T>
        </Fade>

        <Fade on={beat >= 12}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Mass spectrometer uses velocity selector v = E/B then computes deflection radius r = m v / (q B') = 6.23 cm.
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Square current loop beside long straight wire feels net attraction F_net = (μ₀ I₁ I₂ a²) / [2π d (d + a)].
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 12}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Mass spectrometer r = 6.2 cm | Loop beside wire net attractive force F_net = μ0 I1 I2 a² / [2π d (d+a)]! ✓",
            "★ Mass spectrometer r = 6.2 cm | Loop beside wire net attractive force F_net = μ0 I1 I2 a² / [2π d (d+a)]! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
