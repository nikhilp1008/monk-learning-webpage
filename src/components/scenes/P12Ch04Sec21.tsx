"use client";

/**
 * P12Ch04 · Section 21 — "Derivation B: Torque on a Rectangular Current Loop"
 * Beats (en [0,1,3,4,6,7,8,9]): 8 beats
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

export default function P12Ch04Sec21({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Board Derivation: Torque on Rectangular Loop τ = m × B", "Board Derivation: Torque on Rectangular Loop τ = m × B")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: FORCES FORM COUPLE */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("FORCES ON OPPOSITE SIDES FORM COUPLE", "FORCES ON OPPOSITE SIDES FORM COUPLE")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Parallel Side Forces: Top and bottom side forces cancel along axis.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Vertical Side Forces: F₁ = F₂ = B I a (equal &amp; opposite, F_net = 0).
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Line of Action Separation: Perpendicular arm distance = b sin θ.
          </T>

          <Draw on={beat >= 6} delay={dl(6, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Rotational Torque: Opposite forces form a pure twisting couple!
          </T>
        </Fade>

        <Fade on={beat >= 6}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Angle θ is measured between normal to loop and magnetic field B)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: TORQUE DERIVATION & MAGNETIC MOMENT */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 6} delay={dl(6, 0.2)} />
        <Fade on={beat >= 6} delay={dl(6, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("TORQUE DERIVATION & MAGNETIC MOMENT", "TORQUE DERIVATION & MAGNETIC MOMENT")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 6}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Torque Magnitude: τ = Force × Arm = (B I a) × (b sin θ).
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Loop Area Substitution: Area A = a × b  =&gt;  τ = I A B sin θ.
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. N Turns Loop: τ = N I A B sin θ  (Magnetic moment m = N I A).
          </T>

          <Draw on={beat >= 8} delay={dl(8, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Vector Cross Product: τ = m × B  [m = N I A n̂]!
          </T>
        </Fade>

        <Fade on={beat >= 8}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Identical in form to electric dipole torque τ = p × E)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 8} delay={dl(8, 0.2)} />
        <Fade on={beat >= 8} delay={dl(8, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("RECTANGULAR LOOP TORQUE VERDICT", "RECTANGULAR LOOP TORQUE VERDICT")}
          </T>
        </Fade>

        <Fade on={beat >= 8}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Derivation proves torque on N-turn loop is τ = N I A B sin θ where magnetic moment m = N I A.
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            In vector form, torque τ = m × B tends to rotate the loop until magnetic moment m aligns parallel to field B.
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 8}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Derived! Torque τ = NIAB sin θ = mB sin θ and vector torque τ = m × B! Essential CBSE proof! ✓",
            "★ Derived! Torque τ = NIAB sin θ = mB sin θ and vector torque τ = m × B! Essential CBSE proof! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
