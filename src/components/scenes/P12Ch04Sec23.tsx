"use client";

/**
 * P12Ch04 · Section 23 — "Worked Examples One and Two: The Angle Trap, and Same Voltage Not Same Speed"
 * Beats (en [0,1,3,5,6,7,8,10,11]): 9 beats
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

export default function P12Ch04Sec23({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Worked Examples: The Angle Trap & Same Voltage NEET Speed Trap", "Worked Examples: The Angle Trap & Same Voltage NEET Speed Trap")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: CBSE ANGLE TRAP */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("CBSE LEVEL: ANGLE TRAP (PLANE 30° ⇒ NORMAL 60°)", "CBSE LEVEL: ANGLE TRAP (PLANE 30° ⇒ NORMAL 60°)")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Given Angle: Angle between plane of loop and B field is α = 30°.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Normal Angle Conversion: Torque uses angle θ = 90° - 30° = 60°.
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Formula Substitution: τ = N I A B sin 60° = 20 × 0.5 × (0.1×0.05) × 0.6 × (√3/2).
          </T>

          <Draw on={beat >= 7} delay={dl(7, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Calculated Torque: τ = 0.298 N m  (NEVER use 30° directly)!
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Classic 2-mark CBSE trap: reading plane angle instead of normal angle)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: NEET SPEED TRAP SAME VOLTAGE */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("NEET SPEED TRAP: SAME VOLTAGE (qV = ½ mv²)", "NEET SPEED TRAP: SAME VOLTAGE (qV = ½ mv²)")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 7}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Accelerating Voltage: Kinetic energy K = q V =&gt; Momentum p = √(2 m q V).
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Orbit Radius Formula: r = p / (q B) = [ √(2 m q V) ] / (q B) = √(2 m V / q) / B.
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Proportionality: Radius r ∝ √(m / q) at constant voltage V!
          </T>

          <Draw on={beat >= 11} delay={dl(11, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Alpha / Proton Ratio: r_α / r_p = √[ (4/2) / (1/1) ] = √2 = 1.414!
          </T>
        </Fade>

        <Fade on={beat >= 11}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Common NEET mistake: assuming equal velocity instead of equal voltage)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 11} delay={dl(11, 0.2)} />
        <Fade on={beat >= 11} delay={dl(11, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("ANGLE TRAP & ACCELERATION VERDICT", "ANGLE TRAP & ACCELERATION VERDICT")}
          </T>
        </Fade>

        <Fade on={beat >= 11}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Torque calculation requires normal angle θ = 90° - 30° = 60°, yielding τ = 0.298 N m.
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            For particles accelerated through same voltage V, orbit radius scales as r ∝ √(m/q), giving r_α/r_p = √2.
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 11}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Result: Torque τ = 0.29 N m (use normal angle 60°) | Same voltage radius ratio r_α/r_p = √2! ✓",
            "★ Result: Torque τ = 0.29 N m (use normal angle 60°) | Same voltage radius ratio r_α/r_p = √2! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
