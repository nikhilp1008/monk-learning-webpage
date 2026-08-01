"use client";

/**
 * P12Ch04 · Section 5 — "Derivation B: Finite Straight Wire and the Infinite Limit"
 * Beats (en [0,1,3,5,6,7,9]): 7 beats
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

export default function P12Ch04Sec5({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Board Derivation: Finite Straight Wire & Infinite Limit", "Board Derivation: Finite Straight Wire & Infinite Limit")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: FINITE WIRE DERIVATION */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("FINITE STRAIGHT WIRE DERIVATION", "FINITE STRAIGHT WIRE DERIVATION")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Geometry Setup: Perpendicular distance a, element dl at angle θ.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Differential Field: dB = (μ₀ I / 4π a) cos θ dθ.
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Integrate Angles: Evaluate from lower limit -θ₁ to upper limit +θ₂.
          </T>

          <Draw on={beat >= 5} delay={dl(5, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Finite Wire Formula: B = (μ₀ I / 4π a) (sin θ₁ + sin θ₂) !
          </T>
        </Fade>

        <Fade on={beat >= 5}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (θ₁ and θ₂ are subtended angles from perpendicular to wire ends)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: INFINITE WIRE LIMIT */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 5} delay={dl(5, 0.2)} />
        <Fade on={beat >= 5} delay={dl(5, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("INFINITE WIRE LIMIT (θ₁ = θ₂ = 90°)", "INFINITE WIRE LIMIT (θ₁ = θ₂ = 90°)")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 5}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Infinite Extension: Wire extends to ±∞  =&gt;  θ₁ = 90°, θ₂ = 90°.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Trigonometric Sum: sin(90°) + sin(90°) = 1 + 1 = 2.
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Simplify Constant: B = (μ₀ I / 4π a) × 2 = μ₀ I / (2π a).
          </T>

          <Draw on={beat >= 9} delay={dl(9, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Infinite Wire Result: B_infinite = μ₀ I / (2π a) !
          </T>
        </Fade>

        <Fade on={beat >= 9}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (For a semi-infinite wire extending in one direction: B = μ₀ I / 4π a)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 9} delay={dl(9, 0.2)} />
        <Fade on={beat >= 9} delay={dl(9, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("FINITE TO INFINITE WIRE DERIVATION VERDICT", "FINITE TO INFINITE WIRE DERIVATION VERDICT")}
          </T>
        </Fade>

        <Fade on={beat >= 9}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Integrating dB = (μ₀ I / 4πa) cos θ dθ over subtended angles gives B = (μ₀ I / 4πa)(sin θ₁ + sin θ₂).
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Taking the infinite length limit (θ₁ = θ₂ = 90°) yields the famous Biot-Savart result B_infinite = μ₀ I / (2πa).
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 9}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Derived! Finite B = (μ0I/4πa)(sinθ1 + sinθ2) → Infinite wire B = μ0I / 2πa! ✓",
            "★ Derived! Finite B = (μ0I/4πa)(sinθ1 + sinθ2) → Infinite wire B = μ0I / 2πa! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
