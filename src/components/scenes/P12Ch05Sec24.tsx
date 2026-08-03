"use client";

/**
 * P12Ch05 · Section 24 — "Board level: rebuilding the field from two given numbers"
 * Subtopic: Earth's Magnetism
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

export default function P12Ch05Sec24({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Board Level: Rebuilding Earth's Field from B_H and Dip I", "Board Level: Rebuilding Earth's Field from B_H and Dip I")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: STEP 1: FIND VERTICAL COMPONENT B_V */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("STEP 1: FIND VERTICAL COMPONENT B_V", "STEP 1: FIND VERTICAL COMPONENT B_V")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Given Values: B_H = 0.36 × 10⁻⁴ T and Dip angle I = 60°.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Tangent Relation: tan I = B_V / B_H ⇒ B_V = B_H tan I.
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Substitute Angle: tan 60° = √3 ≈ 1.732.
          </T>

          <Draw on={beat >= 5} delay={dl(5, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Calculate B_V: B_V = 0.36 × 10⁻⁴ × 1.732 ≈ 0.624 × 10⁻⁴ T!
          </T>
        </Fade>

        <Fade on={beat >= 5}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Vertical component is larger than horizontal component because I &gt; 45°)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: STEP 2: FIND TOTAL EARTH FIELD B_E */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 5} delay={dl(5, 0.2)} />
        <Fade on={beat >= 5} delay={dl(5, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("STEP 2: FIND TOTAL EARTH FIELD B_E", "STEP 2: FIND TOTAL EARTH FIELD B_E")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 5}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Cosine Relation: B_H = B_E cos I ⇒ B_E = B_H / cos I.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Substitute Angle: cos 60° = 0.5.
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Division: B_E = (0.36 × 10⁻⁴ T) / 0.5.
          </T>

          <Draw on={beat >= 7} delay={dl(7, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Calculate B_E: B_E = 0.72 × 10⁻⁴ T = 0.72 Gauss!
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Total magnetic field B_E is exactly double B_H at 60° dip)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("RESULT VERIFICATION & CHECK", "RESULT VERIFICATION & CHECK")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Pythagorean Check: B_E = √(B_H² + B_V²) = √((0.36)² + (0.624)²) × 10⁻⁴ T = 0.72 × 10⁻⁴ T.
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Units Conversion: 0.72 × 10⁻⁴ Tesla = 0.72 Gauss (matches typical surface Earth field).
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Board Numerical: B_V = 0.624 × 10⁻⁴ T and total field B_E = 0.72 × 10⁻⁴ T (0.72 G)! ✓",
            "★ Board Numerical: B_V = 0.624 × 10⁻⁴ T and total field B_E = 0.72 × 10⁻⁴ T (0.72 G)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
