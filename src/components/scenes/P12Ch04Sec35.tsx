"use client";

/**
 * P12Ch04 · Section 35 — "Concept Intuition: The Current Loop Is the Atom of Magnetism"
 * Beats (en [0,1,3,4,5,7]): 6 beats
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

export default function P12Ch04Sec35({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Subtopic Five: The Current Loop as a Magnetic Dipole", "Subtopic Five: The Current Loop as a Magnetic Dipole")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: MAGNETIC DIPOLE MOMENT VEC(m) */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("MAGNETIC DIPOLE MOMENT VEC(m)", "MAGNETIC DIPOLE MOMENT VEC(m)")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Current Loop Dipole: Planar current loop behaves like magnetic dipole.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Magnitude Formula: m = N × I × A  [SI unit: A m² or J/T].
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Vector Direction: m = N I A n_hat (normal to loop plane).
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Right-Hand Rule: Curl right fingers along I =&gt; Thumb along m!
          </T>
        </Fade>

        <Fade on={beat >= 4}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Magnetic dipole moment points from South pole face to North pole face)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: RIGHT-HAND RULE & ELECTRIC DIPOLE ANALOGY */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("RIGHT-HAND RULE & ELECTRIC DIPOLE ANALOGY", "RIGHT-HAND RULE & ELECTRIC DIPOLE ANALOGY")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 4}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Electric Analogy: Dipole m is magnetic mirror of electric dipole p.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Far Field: B_axial = (μ_0/4π)(2m/z³), B_eq = (μ_0/4π)(m/x³).
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. No Monopoles: Magnetic dipoles are fundamental units.
          </T>

          <Draw on={beat >= 7} delay={dl(7, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Key Result: Current loops replace magnetic monopoles!
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (All magnetism in nature arises from circulating electric charge currents)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("ORBITING ELECTRON: BOHR MAGNETON", "ORBITING ELECTRON: BOHR MAGNETON")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Microscopic Atomic Loop: Electron revolving in circular orbit with frequency f = v / 2πr constitutes atomic current I = e f.
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Orbital Dipole Moment: m_l = I A = (e v r) / 2 = (e / 2m_e) L (Bohr magneton μ_B = 9.27 × 10^-24 A m²).
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Magnetic dipole moment m = NIA (A m²); orbiting electron acts as atomic magnetic dipole! ✓",
            "★ Magnetic dipole moment m = NIA (A m²); orbiting electron acts as atomic magnetic dipole! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
