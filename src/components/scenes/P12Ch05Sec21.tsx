"use client";

/**
 * P12Ch05 · Section 21 — "Derivation: where the factor of two in the dip relation comes from"
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

export default function P12Ch05Sec21({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Derivation: Origin of Factor 2 in tan I = 2 tan λ", "Derivation: tan I = 2 tan λ Mein Factor 2 Kahan Se Aaya")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 3: Component Derivation */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("STEP 1: DIPOLE FIELD COMPONENTS AT LATITUDE λ", "STEP 1: LATITUDE λ PAR DIPOLE FIELD COMPONENTS")}
        </T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 5}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            B_r = B_V = (μ₀/4π) (2m sin λ / r³)
          </T>
          <T x={225} y={52} anchor="middle" size={15} fill={AMBER_DARK} weight={700}>
            B_θ = B_H = (μ₀/4π) (m cos λ / r³)
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 6: Dividing Components */}
      <Badge n={2} cx={540} cy={140} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("STEP 2: TAKE THE RATIO B_V / B_H", "STEP 2: RATIO B_V / B_H LENE PAR")}
        </T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={16} fill={GREEN} weight={800}>
            tan I = B_V / B_H = [(2m sin λ) / r³] / [(m cos λ) / r³]
          </T>
          <T x={240} y={52} anchor="middle" size={14} fill={INK} weight={700}>
            {t("Common factors (μ₀/4π) (m/r³) cancel out completely!", "(μ₀/4π) (m/r³) terms poori tarah cancel ho jaate hain!")}
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Final Result */}
      <Badge n={3} cx={52} cy={340} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={74} y={345} size={14} fill={RED} weight={700} anchor="start">
          {t("FINAL DERIVED DIP RELATION", "FINAL DERIVED DIP RELATION")}
        </T>
      </Fade>
      <Fade on={beat >= 7}>
        <g transform="translate(60, 360)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={18} fill={GREEN} weight={800}>
            tan I = 2 (sin λ / cos λ) = 2 tan λ   (Factor of 2 arises from axial-to-equatorial 2:1 ratio!)
          </T>
        </g>
      </Fade>

      {/* Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={490} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Factor 2 in tan I = 2 tan λ comes directly from the 2:1 ratio of dipole radial:transverse fields! ✓",
            "★ tan I = 2 tan λ mein factor 2 dipole radial:transverse fields ke 2:1 ratio se aata hai! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
