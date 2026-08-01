"use client";

/**
 * P12Ch04 · Section 18 — "Concept Intuition, Part B: Forces and Twists Inside a Wire"
 * Beats (en [0,1,2,3,5,6,7]): 7 beats
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

export default function P12Ch04Sec18({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Force on Wires F = I(L × B) & Torque on Current Loops", "Force on Wires F = I(L × B) & Torque on Current Loops")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: PARALLEL WIRES */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("PARALLEL WIRES: LIKE CURRENTS ATTRACT", "PARALLEL WIRES: LIKE CURRENTS ATTRACT")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Wire Magnetic Force: F = I (L × B)  [Magnitude F = I L B sin θ].
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Force Between Parallel Wires: F / L = (μ₀ I₁ I₂) / (2π d).
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Direction Behavior: Parallel currents ATTRACT; Antiparallel REPEL!
          </T>

          <Draw on={beat >= 6} delay={dl(6, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Ampere Definition: 1 Ampere is defined using 2 × 10⁻⁷ N/m force!
          </T>
        </Fade>

        <Fade on={beat >= 6}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Opposite to electrostatic charges where likes repel and unlikes attract)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: CURRENT LOOP IN UNIFORM B */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 6} delay={dl(6, 0.2)} />
        <Fade on={beat >= 6} delay={dl(6, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("CURRENT LOOP IN UNIFORM B: NET TORQUE", "CURRENT LOOP IN UNIFORM B: NET TORQUE")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 6}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Zero Net Force: Opposite side forces cancel =&gt; F_net = 0 in uniform B.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Magnetic Dipole Moment: M = N I A  (direction ⊥ to loop).
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Torque Vector Equation: τ = M × B  [Magnitude τ = N I A B sin θ].
          </T>

          <Draw on={beat >= 7} delay={dl(7, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Motor Action: Torque aligns magnetic moment M with B field!
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Foundational principle of electric motors and moving coil galvanometers)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("WIRE FORCES & LOOP TORQUE VERDICT", "WIRE FORCES & LOOP TORQUE VERDICT")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Parallel current-carrying wires exert attractive force per unit length F/L = μ₀ I₁ I₂ / (2π d).
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            A planar current loop in a uniform magnetic field experiences zero net force, but a twisting torque τ = M × B.
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Like currents attract (F/L = μ0I1I2/2πd)! Closed loop in uniform B experiences zero force but torque τ = M × B! ✓",
            "★ Like currents attract (F/L = μ0I1I2/2πd)! Closed loop in uniform B experiences zero force but torque τ = M × B! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
