"use client";

/**
 * P12Ch05 · Section 20 — "Dipole model components, apparent dip and the locus lines"
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

export default function P12Ch05Sec20({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Apparent Dip & Vertical Planes at Angle α", "Apparent Dip & Vertical Planes at Angle α")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: APPARENT DIP IN A TILTED PLANE (α) */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("APPARENT DIP IN A TILTED PLANE (α)", "APPARENT DIP IN A TILTED PLANE (α)")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Tilted Plane: Plane making angle α with Magnetic Meridian.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Effective Horizontal Component: B_H' = B_H cos α.
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Effective Vertical Component: B_V' = B_V (unchanged).
          </T>

          <Draw on={beat >= 5} delay={dl(5, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Apparent Dip Formula: tan δ' = B_V / B_H' = tan δ / cos α!
          </T>
        </Fade>

        <Fade on={beat >= 5}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Where δ is true dip angle in magnetic meridian)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: KEY APPARENT DIP FORMULA & PROPERTIES */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 5} delay={dl(5, 0.2)} />
        <Fade on={beat >= 5} delay={dl(5, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("KEY APPARENT DIP FORMULA & PROPERTIES", "KEY APPARENT DIP FORMULA & PROPERTIES")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 5}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Cosine Inequality: Since cos α ≤ 1 for all angles α.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Dip Inequality: tan δ' ≥ tan δ ⇒ δ' ≥ δ always.
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Two Perpendicular Planes: cot² δ₁ + cot² δ₂ = cot² δ.
          </T>

          <Draw on={beat >= 7} delay={dl(7, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Universal Truth: Apparent dip is ALWAYS ≥ true dip!
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (True dip δ is the MINIMUM possible dip angle at any location)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("PERPENDICULAR PLANE (α = 90°)", "PERPENDICULAR PLANE (α = 90°)")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Perpendicular Orientation: When plane is at 90° to magnetic meridian, cos 90° = 0.
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Vertical Needle Behavior: B_H' = 0 ⇒ tan δ' = ∞ ⇒ Apparent Dip δ' = 90° (needle points straight DOWN!).
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Apparent dip formula tan δ' = tan δ / cos α proves apparent dip is always ≥ true dip! ✓",
            "★ Apparent dip formula tan δ' = tan δ / cos α proves apparent dip is always ≥ true dip! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
