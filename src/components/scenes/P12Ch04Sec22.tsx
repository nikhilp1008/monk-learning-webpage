"use client";

/**
 * P12Ch04 · Section 22 — "Derivations C and D: Parallel Wires, and the Moving-Coil Galvanometer"
 * Beats (en [0,1,2,4,6,8,10,11]): 8 beats
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

export default function P12Ch04Sec22({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Board Derivations: Parallel Wires Force & Moving-Coil Galvanometer", "Board Derivations: Parallel Wires Force & Moving-Coil Galvanometer")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: PARALLEL WIRES FORCE DERIVATION */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("PARALLEL WIRES FORCE DERIVATION", "PARALLEL WIRES FORCE DERIVATION")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Magnetic Field of Wire 1: B₁ = (μ₀ I₁) / (2π d).
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Force on Wire 2 in Field B₁: F₂ = B₁ I₂ L = [ (μ₀ I₁) / (2π d) ] I₂ L.
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Force Per Unit Length: F / L = (μ₀ I₁ I₂) / (2π d).
          </T>

          <Draw on={beat >= 6} delay={dl(6, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. SI Definition of Ampere: 1A gives F/L = 2 × 10⁻⁷ N/m at d = 1m!
          </T>
        </Fade>

        <Fade on={beat >= 6}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (SI base unit of current is defined using force between parallel wires)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: MOVING-COIL GALVANOMETER RADIAL FIELD */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 6} delay={dl(6, 0.2)} />
        <Fade on={beat >= 6} delay={dl(6, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("MOVING-COIL GALVANOMETER RADIAL FIELD", "MOVING-COIL GALVANOMETER RADIAL FIELD")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 6}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Radial Field Role: Concave poles &amp; soft iron core keep θ = 90° always.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Deflecting Torque: τ_def = N I A B sin 90° = N I A B.
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Restoring Spring Torque: τ_res = k φ (where k is torsional constant).
          </T>

          <Draw on={beat >= 10} delay={dl(10, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Linear Deflection: Equating τ_def = τ_res =&gt; φ = (N A B / k) I!
          </T>
        </Fade>

        <Fade on={beat >= 10}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Radial field produces a perfectly linear deflection scale φ ∝ I)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 10} delay={dl(10, 0.2)} />
        <Fade on={beat >= 10} delay={dl(10, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("GALVANOMETER SENSITIVITIES & VERDICT", "GALVANOMETER SENSITIVITIES & VERDICT")}
          </T>
        </Fade>

        <Fade on={beat >= 10}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Current Sensitivity S_I = φ / I = (N A B) / k.
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Voltage Sensitivity S_V = φ / V = (N A B) / (k R). Note: Doubling N doubles S_I but keeps S_V constant!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 10}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Parallel wires F/L = μ0I1I2/2πd | Galvanometer linear scale φ = (NAB/k)I due to radial field! ✓",
            "★ Parallel wires F/L = μ0I1I2/2πd | Galvanometer linear scale φ = (NAB/k)I due to radial field! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
