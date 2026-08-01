"use client";

/**
 * P12Ch04 · Section 15 — "Worked Examples Three and Four: Coaxial Cable and the Drilled Cavity"
 * Beats (en [0,1,3,5,7,8,12,13,14]): 9 beats
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

export default function P12Ch04Sec15({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("JEE Main & Advanced: Coaxial Cable & Drilled Cavity Field", "JEE Main & Advanced: Coaxial Cable & Drilled Cavity Field")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: JEE MAIN COAXIAL CABLE */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("JEE MAIN: COAXIAL CABLE FIELD", "JEE MAIN: COAXIAL CABLE FIELD")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Inner Region (between conductors): I_enc = I_inner = 6.0 A.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Field Between Conductors: B = (μ₀ I) / (2π r) = 0.60 mT.
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Outer Region (outside cable): Equal and opposite currents cancel out.
          </T>

          <Draw on={beat >= 7} delay={dl(7, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Perfect Shielding: B_outside = 0 (I_enc = 6.0A - 6.0A = 0)!
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Coaxial cables prevent magnetic interference with surrounding equipment)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: JEE ADVANCED DRILLED CAVITY */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("JEE ADVANCED: UNIFORM FIELD IN DRILLED CAVITY", "JEE ADVANCED: UNIFORM FIELD IN DRILLED CAVITY")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 7}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Superposition Model: Solid cylinder with current +J plus cavity with -J.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Solid Cylinder Field: B₁ = (μ₀ / 2) J × r₁.
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Cavity Negative Field: B₂ = (μ₀ / 2) (-J) × r₂.
          </T>

          <Draw on={beat >= 14} delay={dl(14, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Net Cavity Field: B_cavity = (μ₀ / 2) J × d (PERFECTLY UNIFORM)!
          </T>
        </Fade>

        <Fade on={beat >= 14}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Field inside off-axis cavity depends only on displacement vector d)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 14} delay={dl(14, 0.2)} />
        <Fade on={beat >= 14} delay={dl(14, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("COAXIAL & CAVITY WORKED EXAMPLES VERDICT", "COAXIAL & CAVITY WORKED EXAMPLES VERDICT")}
          </T>
        </Fade>

        <Fade on={beat >= 14}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Coaxial cable confines magnetic field entirely between conductors; B_outside = 0.
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Drilled cylindrical cavity carrying uniform current density J produces a completely uniform field B = ½ μ₀ J × d.
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 14}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Coaxial cable confines field B_out = 0! Drilled cavity has uniform field B = ½ μ0 J d! ✓",
            "★ Coaxial cable confines field B_out = 0! Drilled cavity has uniform field B = ½ μ0 J d! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
