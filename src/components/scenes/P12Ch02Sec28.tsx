"use client";

/**
 * P12Ch02 · Section 28 — "The dielectric — why an insulator boosts capacitance"
 * Subtopic: Capacitance, Dielectrics & Stored Energy
 * OPEN CHALKBOARD DESIGN WITH POLARIZED DIELECTRIC SLAB (NO CONTAINER BOXES):
 *  - Parallel plate capacitor with dielectric slab of constant K inserted
 *  - Atomic Dipole Polarization: Induced bound surface charges ±Q_p
 *  - Induced opposing field E_p reduces net internal field E = E₀ - E_p = E₀ / K
 *  - Potential drop V = V₀ / K  =>  Capacitance boost C = K C₀ !
 */

import React from "react";
import {
  SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, arrowD,
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

export default function P12Ch02Sec28({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("The Dielectric: Polarization Boosts Capacitance to C = K C₀", "The Dielectric: Polarization Boosts Capacitance to C = K C₀")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: DIELECTRIC POLARIZATION SCHEMATIC */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("POLARIZATION OF DIELECTRIC MEDIUM", "POLARIZATION OF DIELECTRIC MEDIUM")}
          </T>
        </Fade>

        {/* Dielectric Slab Diagram */}
        <Fade on={beat >= 1}>
          {/* Top Free Charge Plate +Q */}
          <line x1="60" y1="80" x2="420" y2="80" stroke={RED} strokeWidth={4} />
          <T x={435} y={85} size={14} fill={RED} weight={900}>+Q Free</T>

          {/* Bottom Free Charge Plate -Q */}
          <line x1="60" y1="260" x2="420" y2="260" stroke={GREEN} strokeWidth={4} />
          <T x={435} y={265} size={14} fill={GREEN} weight={900}>−Q Free</T>

          {/* Dielectric Slab Fill */}
          <rect x="70" y="100" width="340" height="140" fill={AMBER_DARK} opacity={0.15} stroke={AMBER_DARK} strokeWidth={2} />
          <T x={240} y={170} size={16} fill={AMBER_DARK} weight={900} anchor="middle">Dielectric Slab (K &gt; 1)</T>

          {/* Bound Surface Charges -Qp (Top of slab), +Qp (Bottom of slab) */}
          <T x={240} y={115} size={13} fill={GREEN} weight={800} anchor="middle">− Bound Surface Charge −Q_p</T>
          <T x={240} y={225} size={13} fill={RED} weight={800} anchor="middle">+ Bound Surface Charge +Q_p</T>

          {/* External Field E0 and Internal Field E */}
          <path d={arrowD(120, 85, 120, 255)} stroke={RED} strokeWidth={2.5} />
          <T x={100} y={170} size={13} fill={RED} weight={800} anchor="end">E₀</T>

          <path d={arrowD(360, 235, 360, 105)} stroke={GREEN} strokeWidth={2} />
          <T x={380} y={170} size={13} fill={GREEN} weight={800} anchor="start">E_p</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={240} y={305} anchor="middle" size={17} fill={INK} weight={800}>
            Net Internal Field E = E₀ − E_p = E₀ / K
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: VOLTAGE REDUCTION & CAPACITANCE MULTIPLICATION */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("VOLTAGE REDUCTION & CAPACITANCE BOOST", "VOLTAGE REDUCTION & CAPACITANCE BOOST")}
          </T>
        </Fade>

        {/* Floating Proof Steps (No Card Boxes) */}
        <Fade on={beat >= 4}>
          <T x={50} y={85} size={16} fill={AMBER_DARK} weight={800} anchor="start">
            1. Net Electric Field: E = E₀ / K
          </T>

          <T x={50} y={145} size={16} fill={GREEN} weight={800} anchor="start">
            2. Potential Difference: V = E d = (E₀ d) / K = V₀ / K
          </T>

          <T x={50} y={205} size={16} fill={RED} weight={800} anchor="start">
            3. New Capacitance: C = Q / V = Q / (V₀ / K)
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 50 235 L 450 235" stroke={INK} sw={2} />

          <T x={50} y={285} size={22} fill={GREEN} weight={900} anchor="start">
            4. C = K C₀ = K (ε₀ A / d)
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={305} anchor="middle" size={15} fill={GREEN} weight={800}>
            Dielectric Constant K = ε_r = C / C₀ &gt; 1 (Insulator boosts capacity!)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 420)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("SUMMARY OF DIELECTRIC EFFECTS", "SUMMARY OF DIELECTRIC EFFECTS")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={52} size={14} anchor="start" fill={GREEN} weight={800}>
            Bound Surface Charge: Q_p = Q (1 − 1/K)   |   Polarization Vector P = ε₀ (K − 1) E!
          </T>
          <T x={45} y={76} size={13} anchor="start" fill={INK} weight={700}>
            Dielectrics increase capacitance WITHOUT electrical breakdown!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Dielectric Mastered: C = K C₀ because induced polarization weakens internal field to E = E₀/K! ✓",
            "★ Dielectric Mastered: C = K C₀ because induced polarization weakens internal field to E = E₀/K! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
