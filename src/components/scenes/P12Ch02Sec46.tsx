"use client";

/**
 * P12Ch02 · Section 46 — "Deriving the capacitance of an isolated spherical conductor"
 * Subtopic: Conductors & Spherical Capacitors Derivations
 * OPEN CHALKBOARD DESIGN WITH ISOLATED SPHERE PROOF (NO CONTAINER BOXES):
 *  - Isolated spherical conductor of radius R carrying charge Q
 *  - Surface Potential V = k Q / R = Q / (4π ε₀ R)
 *  - Capacitance definition C = Q / V = 4π ε₀ R
 *  - Worked Example for Planet Earth (R = 6400 km -> C = 711 µF)
 *  - Zero card box containers
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

export default function P12Ch02Sec46({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Derivation: Isolated Spherical Conductor Capacitance C = 4πε₀R", "Derivation: Isolated Spherical Conductor Capacitance C = 4πε₀R")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: ISOLATED SPHERE GEOMETRY */}
      <g transform="translate(40, 85)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("ISOLATED CONDUCTING SPHERE (RADIUS R, CHARGE Q)", "ISOLATED CONDUCTING SPHERE (RADIUS R, CHARGE Q)")}
          </T>
        </Fade>

        {/* Sphere Diagram */}
        <Fade on={beat >= 1}>
          <circle cx={220} cy={180} r={80} fill="#ffe4e6" stroke={RED} strokeWidth={3} opacity={0.3} />
          <T x={220} y={185} size={16} fill={RED} weight={900} anchor="middle">Sphere (R, Q)</T>
          <line x1="220" y1="180" x2="300" y2="180" stroke={INK} strokeWidth={2} />
          <T x={260} y={170} size={13} fill={INK} weight={800}>Radius R</T>
        </Fade>

        {/* Free Floating Surface Potential Formula (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={220} y={350} anchor="middle" size={17} fill={INK} weight={800}>
            Surface Potential: V = k Q / R = Q / (4π ε₀ R)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: PROOF & PLANET EARTH CALCULATION */}
      <g transform="translate(540, 85)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("CAPACITANCE PROOF & EARTH EXAMPLE", "CAPACITANCE PROOF & EARTH EXAMPLE")}
          </T>
        </Fade>

        {/* Floating Derivation Steps (No Card Boxes) */}
        <Fade on={beat >= 4}>
          <T x={50} y={85} size={16} fill={INK} weight={800} anchor="start">
            1. Definition: C = Q / V
          </T>

          <T x={50} y={145} size={16} fill={AMBER_DARK} weight={800} anchor="start">
            2. Substitute V: C = Q / [ Q / (4π ε₀ R) ]
          </T>

          <T x={50} y={205} size={16} fill={GREEN} weight={800} anchor="start">
            3. Result: C = 4π ε₀ R  (Directly proportional to radius!)
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 50 235 L 450 235" stroke={INK} sw={2} />

          <T x={50} y={285} size={19} fill={RED} weight={900} anchor="start">
            4. Earth (R = 6400 km): C = 6.4×10⁶ / (9×10⁹) = 711 µF
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={360} anchor="middle" size={15} fill={GREEN} weight={800}>
            Even a planet as massive as Earth has a capacitance of only 711 microfarads!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 440)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("DERIVATION VERDICT", "DERIVATION VERDICT")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={52} size={14} anchor="start" fill={GREEN} weight={800}>
            Isolated sphere capacitance C = 4πε₀R can be viewed as a spherical capacitor with outer shell at ∞!
          </T>
          <T x={45} y={76} size={13} anchor="start" fill={INK} weight={700}>
            Stored energy U = ½ C V² = Q² / (8π ε₀ R)!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Proof Completed: C = 4πε₀R derived for isolated sphere (Earth capacitance C = 711 µF)! ✓",
            "★ Proof Completed: C = 4πε₀R derived for isolated sphere (Earth capacitance C = 711 µF)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
