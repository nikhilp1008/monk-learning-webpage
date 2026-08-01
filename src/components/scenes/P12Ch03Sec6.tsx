"use client";

/**
 * P12Ch02 · Section 6 — "Non-unique characteristics and two kinds of resistance"
 * Beats (en [0,10,20,30,43,57,68,81]): 8 beats
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

export default function P12Ch03Sec6({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Non-unique characteristics & two kinds of resistance", "Non-unique characteristics & two kinds of resistance")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: GaAs CHARACTERISTICS & GRAPH */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("GaAs V-I CHARACTERISTIC & NEGATIVE R", "GaAs V-I CHARACTERISTIC & NEGATIVE R")}
          </T>
        </Fade>

        {/* GaAs V-I Graph (Open Chalkboard) */}
        <Fade on={beat >= 1}>
          <g transform="translate(0, 10)">
            <Draw on={beat >= 1} delay={dl(1, 0.4)} d="M 45 200 L 320 200" stroke={INK} sw={2} />
            <Draw on={beat >= 1} delay={dl(1, 0.4)} d="M 45 200 L 45 40" stroke={INK} sw={2} />
            <T x={330} y={205} size={13} fill={INK} weight={800}>V</T>
            <T x={45} y={28} size={13} fill={INK} weight={800}>I</T>

            {/* S-shaped curve for GaAs */}
            <Draw on={beat >= 2} delay={dl(2, 0.4)} d="M 45 190 C 90 70 130 50 170 70 C 210 90 230 160 270 170 C 290 175 310 130 320 70" stroke={AMBER_DARK} sw={2.5} />

            {/* Negative resistance region highlight */}
            <Fade on={beat >= 3}>
              <Draw on={beat >= 3} delay={dl(3, 0.4)} d="M 170 70 C 210 90 230 160 270 170" stroke={RED} sw={3.5} />
              <T x={220} y={120} size={12} fill={RED} weight={800}>Negative R (dV/dI &lt; 0)</T>
            </Fade>
          </g>
        </Fade>

        <Fade on={beat >= 4}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (In GaAs, increasing voltage V reduces current I in the negative resistance zone)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: STATIC VS DYNAMIC RESISTANCE */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 5} delay={dl(5, 0.2)} />
        <Fade on={beat >= 5} delay={dl(5, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("STATIC VS DYNAMIC RESISTANCE", "STATIC VS DYNAMIC RESISTANCE")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 5}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Static Resistance: R_static = V / I (Chord slope from origin, always &gt; 0)
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Dynamic Resistance: R_dynamic = dV / dI (Tangent slope at operating point)
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Ohmic Equality: For linear Ohmic materials, R_static = R_dynamic.
          </T>

          <Draw on={beat >= 6} delay={dl(6, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Non-Ohmic: R_dynamic = dV/dI can be positive, zero, or negative!
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Gallium Arsenide (GaAs) exhibits negative dynamic resistance region)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 8} delay={dl(8, 0.2)} />
        <Fade on={beat >= 8} delay={dl(8, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("RESISTANCE CLASSIFICATION VERDICT", "RESISTANCE CLASSIFICATION VERDICT")}
          </T>
        </Fade>

        <Fade on={beat >= 8}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Static resistance R_static = V/I measures total opposition and is strictly positive for active elements.
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Dynamic resistance R_dynamic = dV/dI measures incremental opposition and can be negative in devices like GaAs!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 8}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Ohmic: R_static = R_dynamic. Non-Ohmic: R_dynamic = dV/dI (can be negative like in GaAs)! ✓",
            "★ Ohmic: R_static = R_dynamic. Non-Ohmic: R_dynamic = dV/dI (can be negative like in GaAs)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
