"use client";

/**
 * P12Ch05 · Section 25 — "Speed trap: dip is not the same thing as latitude"
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

export default function P12Ch05Sec25({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Speed Trap: Dip Angle Is NOT the Same as Latitude", "Speed Trap: Dip Angle Is NOT the Same as Latitude")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: COMMON MISTAKE: ASSUMING DIP I = LATITUDE λ */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("COMMON MISTAKE: ASSUMING DIP I = LATITUDE λ", "COMMON MISTAKE: ASSUMING DIP I = LATITUDE λ")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. False Intuition: Assuming magnetic dip needle angle equals latitude.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. The Actual Law: Field components ratio gives tan I = 2 tan λ.
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. The Multiplier: Factor of 2 distorts dip angle relative to latitude.
          </T>

          <Draw on={beat >= 5} delay={dl(5, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Key Warning: Never plug Dip I directly as Latitude λ in exams!
          </T>
        </Fade>

        <Fade on={beat >= 5}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Only equal at 0° equator and 90° poles)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: WORKED CALCULATION AT λ = 30° */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 5} delay={dl(5, 0.2)} />
        <Fade on={beat >= 5} delay={dl(5, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("WORKED CALCULATION AT λ = 30°", "WORKED CALCULATION AT λ = 30°")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 5}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Given Latitude: λ = 30° ⇒ tan(30°) = 1 / √3 ≈ 0.577.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Apply Formula: tan I = 2 × tan(30°) = 2 / √3 ≈ 1.155.
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Inverse Tangent: Dip I = tan⁻¹(1.155) ≈ 49.1°.
          </T>

          <Draw on={beat >= 7} delay={dl(7, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Comparison: Dip I = 49.1° is significantly larger than 30°!
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (At mid-latitudes, magnetic field lines plunge much steeper into Earth)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("ALWAYS CHECK FOR FACTOR 2", "ALWAYS CHECK FOR FACTOR 2")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Steepness Rule: Between equator and poles, Dip angle I is ALWAYS steeper than Latitude λ (I &gt; λ).
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Exam Shortcut: Dip I = 45° occurs at latitude λ = tan⁻¹(0.5) ≈ 26.6° (NOT 45° latitude!).
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Dip I is always steeper than latitude λ due to tan I = 2 tan λ (e.g. at 30° lat, dip is 49.1°)! ✓",
            "★ Dip I is always steeper than latitude λ due to tan I = 2 tan λ (e.g. at 30° lat, dip is 49.1°)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
