"use client";

/**
 * P12Ch05 · Section 15 — "Pitfalls: swapped fields, lost signs and phantom forces"
 * Subtopic: Bar Magnet, Magnetic Field Lines and Dipole Moment
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

export default function P12Ch05Sec15({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Subtopic One Pitfalls & Pro-Tips Recap", "Subtopic One Pitfalls & Pro-Tips Recap")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: SWAPPED FIELDS & DIRECTION TRAPS */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("SWAPPED FIELDS & DIRECTION TRAPS", "SWAPPED FIELDS & DIRECTION TRAPS")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Dipole Vector: Vector m ALWAYS points S to N INSIDE magnet.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Field Vectors: B_axial points ALONG m; B_eq points OPPOSITE to m.
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Distance Power Trap: Far field drops off as 1 / r³ (inverse-cube, not 1/r²!).
          </T>

          <Draw on={beat >= 5} delay={dl(5, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Monopole Trap: Magnetic monopoles DO NOT EXIST (∮ B · dA = 0)!
          </T>
        </Fade>

        <Fade on={beat >= 5}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Every cut piece of a magnet automatically becomes a complete dipole)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: PHANTOM FORCE & MAGNET CUT TRAPS */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 5} delay={dl(5, 0.2)} />
        <Fade on={beat >= 5} delay={dl(5, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("PHANTOM FORCE & MAGNET CUT TRAPS", "PHANTOM FORCE & MAGNET CUT TRAPS")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 5}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Phantom Force Trap: Uniform B exerts ZERO net force on dipole.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Translation Rule: Net force F = m (dB/dx) exists ONLY in non-uniform B.
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Perpendicular Cut: Period halves (T' = T / 2) because I' = I/8 and m' = m/2.
          </T>

          <Draw on={beat >= 7} delay={dl(7, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Parallel Cut: Period UNCHANGED (T' = T) as I' &amp; m' both halve!
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Always check cut orientation before calculating oscillation period)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("PRO-TIP: MAP TO ELECTRIC DIPOLE DIRECTLY", "PRO-TIP: MAP TO ELECTRIC DIPOLE DIRECTLY")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Analogous Map: Swap p → m, E → B, and 1 / (4π ε_0) → μ_0 / (4π).
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Universal Rule: All electrostatic dipole equations (τ, U, W, B_ax, B_eq) map 1:1 to magnetism!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Subtopic 1 Complete: Map magnetic dipoles directly onto electric dipoles! ✓",
            "★ Subtopic 1 Complete: Map magnetic dipoles directly onto electric dipoles! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
