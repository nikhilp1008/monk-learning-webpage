"use client";

/**
 * P12Ch04 · Section 17 — "Concept Intuition, Part A: The Force That Only Steers"
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

export default function P12Ch04Sec17({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Subtopic Three: The Force That Only Steers F = q (v × B)", "Subtopic Three: The Force That Only Steers F = q (v × B)")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: LORENTZ MAGNETIC FORCE */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("MAGNETIC LORENTZ FORCE F = q (v × B)", "MAGNETIC LORENTZ FORCE F = q (v × B)")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Vector Cross Product: F = q (v × B)  [Magnitude |F| = q v B sin θ].
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Perpendicular Direction: Force F is always ⊥ to velocity v and field B.
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Zero Power / Zero Work: Power P = F · v = 0 =&gt; Work W = 0!
          </T>

          <Draw on={beat >= 5} delay={dl(5, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Pure Steering: Magnetic force changes direction, NEVER speed!
          </T>
        </Fade>

        <Fade on={beat >= 5}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Kinetic Energy K = ½ m v² remains strictly constant)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: TRAJECTORIES & KEY APPLICATIONS */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 5} delay={dl(5, 0.2)} />
        <Fade on={beat >= 5} delay={dl(5, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("TRAJECTORIES & KEY APPLICATIONS", "TRAJECTORIES & KEY APPLICATIONS")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 5}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Circular Motion (θ = 90°): F_mag provides centripetal force =&gt; r = m v / (q B).
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Helical Motion (θ ≠ 90°): Parallel v_|| creates pitch, v_⊥ creates circular loop.
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Velocity Selector: Cross E and B fields to select undeflected speed v = E / B.
          </T>

          <Draw on={beat >= 7} delay={dl(7, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Cyclotron Accelerator: Constant Period T = 2πm / (q B)!
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Particles take same time T per revolution regardless of speed or radius)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("MAGNETIC FORCE LORENTZ VERDICT", "MAGNETIC FORCE LORENTZ VERDICT")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Magnetic force F = q (v × B) acts perpendicular to velocity, performing zero work and conserving kinetic energy.
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            It acts as a pure steering wheel bending charges into circular (θ=90°) or helical paths and driving cyclotrons.
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Magnetic force F = q(v × B) does ZERO work! It steers charge into circle or helix! ✓",
            "★ Magnetic force F = q(v × B) does ZERO work! It steers charge into circle or helix! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
