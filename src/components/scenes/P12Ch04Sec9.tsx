"use client";

/**
 * P12Ch04 · Section 9 — "Concept Intuition: The Shortcut Around Integration"
 * Beats (en [0,1,3,4,6,7]): 6 beats
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

export default function P12Ch04Sec9({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Subtopic Two: Ampere's Circuital Law ∮ B · dl = μ₀ I_enc", "Subtopic Two: Ampere's Circuital Law ∮ B · dl = μ₀ I_enc")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: AMPERE'S LAW STATEMENT */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("AMPERE'S CIRCUITAL LAW STATEMENT", "AMPERE'S CIRCUITAL LAW STATEMENT")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Fundamental Equation: Line integral of magnetic field ∮ B · dl.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Enclosed Current: Equals μ₀ times total current I_enclosed passing loop.
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Closed Amperian Loop: Arbitrary closed path surrounding current threads.
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Core Law: ∮ B · dl = μ₀ I_enclosed !
          </T>
        </Fade>

        <Fade on={beat >= 4}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Analogous to Gauss's Law in electrostatics ∮ E · dA = Q / ε₀)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: ENCLOSED CURRENT & EXTERNAL FIELDS */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("ENCLOSED CURRENT & EXTERNAL FIELDS", "ENCLOSED CURRENT & EXTERNAL FIELDS")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 4}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Enclosed Current Only: Only currents passing THROUGH loop count in I_enc.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. External Current Impact: External currents alter local B, but sum to 0 in ∮ B · dl.
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Sign Convention: Right-Hand Rule (fingers along loop =&gt; thumb gives +I).
          </T>

          <Draw on={beat >= 6} delay={dl(6, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Field Source: B on loop comes from ALL currents (inside + outside)!
          </T>
        </Fade>

        <Fade on={beat >= 6}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Though ∮ B · dl depends only on enclosed current I_enc)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 6} delay={dl(6, 0.2)} />
        <Fade on={beat >= 6} delay={dl(6, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("AMPERE'S CIRCUITAL LAW CONCEPT VERDICT", "AMPERE'S CIRCUITAL LAW CONCEPT VERDICT")}
          </T>
        </Fade>

        <Fade on={beat >= 6}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Ampere's Circuital Law ∮ B · dl = μ₀ I_enc relates line integral of B along any closed loop to enclosed current.
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            It provides a powerful high-symmetry shortcut to calculate B without performing tedious Biot-Savart integrations.
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 6}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Ampere's Law ∮ B · dl = μ0 I_enc is the high-symmetry shortcut around Biot-Savart integration! ✓",
            "★ Ampere's Law ∮ B · dl = μ0 I_enc is the high-symmetry shortcut around Biot-Savart integration! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
