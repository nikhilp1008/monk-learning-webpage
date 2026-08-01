"use client";

/**
 * P12Ch04 · Section 37 — "Derivation A: The Revolving Electron and the Bohr Magneton"
 * Beats (en [0,1,3,4,6,8,10,11,12]): 9 beats
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

export default function P12Ch04Sec37({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Board Derivation: Revolving Electron & The Bohr Magneton", "Board Derivation: Revolving Electron & The Bohr Magneton")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: ORBIT CURRENT & MOMENT μ_l = evr / 2 */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("ORBIT CURRENT & MOMENT μ_l = evr / 2", "ORBIT CURRENT & MOMENT μ_l = evr / 2")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Orbit Time Period: T = 2πr / v.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Orbit Equivalent Current: I = e / T = (e v) / (2πr).
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Orbital Magnetic Moment: μ_l = I × A = (e v / 2πr) × (π r²).
          </T>

          <Draw on={beat >= 8} delay={dl(8, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Classical Result: Orbital dipole moment μ_l = (e v r) / 2!
          </T>
        </Fade>

        <Fade on={beat >= 8}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Direct relationship between electron velocity, orbit radius, and magnetic moment)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: GYROMAGNETIC RATIO μ_l / L = e / (2m) */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 8} delay={dl(8, 0.2)} />
        <Fade on={beat >= 8} delay={dl(8, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("GYROMAGNETIC RATIO μ_l / L = e / (2m)", "GYROMAGNETIC RATIO μ_l / L = e / (2m)")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 8}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Angular Momentum: Orbital angular momentum L = m_e v r.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Moment Ratio: μ_l / L = (e v r / 2) / (m_e v r) = e / (2 m_e).
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Vector Form: μ_l = - (e / 2 m_e) L (opposite to L!).
          </T>

          <Draw on={beat >= 11} delay={dl(11, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Gyromagnetic Ratio: μ_l / L = 8.8 × 10¹⁰ C/kg!
          </T>
        </Fade>

        <Fade on={beat >= 11}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Independent of orbit radius r and electron velocity v!)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 11} delay={dl(11, 0.2)} />
        <Fade on={beat >= 11} delay={dl(11, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("BOHR QUANTIZATION & BOHR MAGNETON", "BOHR QUANTIZATION & BOHR MAGNETON")}
          </T>
        </Fade>

        <Fade on={beat >= 11}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Bohr Postulate: L = n h / (2π)  =&gt;  μ_l = n (e h / 4π m_e).
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Bohr Magneton: Fundamental magnetic unit (n=1): μ_B = (e h) / (4π m_e) = 9.27 × 10^-24 A m².
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 11}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Derived! μ_l = evr/2 = (e/2m)L; Bohr Magneton μ_B = eh/(4πm) = 9.27 × 10⁻²⁴ A m²! ✓",
            "★ Derived! μ_l = evr/2 = (e/2m)L; Bohr Magneton μ_B = eh/(4πm) = 9.27 × 10⁻²⁴ A m²! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
