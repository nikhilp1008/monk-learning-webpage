"use client";

/**
 * P12Ch02 · Section 44 — "Deriving that the field inside vanishes and charge goes to the surface"
 * Subtopic: Conductors & Spherical Capacitors Derivations
 * OPEN CHALKBOARD DESIGN WITH GAUSSIAN PROOF (NO CONTAINER BOXES):
 *  - Gaussian surface S inside conductor volume
 *  - Electrostatic condition: E = 0 inside conductor
 *  - Flux Φ = ∮ E · dA = 0  =>  Q_enclosed = 0
 *  - Conclusion: Charge cannot exist in interior volume; all excess charge is forced to the outer surface!
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

export default function P12Ch02Sec44({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Derivation: Why Excess Charge Resides 100% on Conductor Outer Surface", "Derivation: Why Excess Charge Resides 100% on Conductor Outer Surface")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: GAUSSIAN SURFACE INSIDE CONDUCTOR */}
      <g transform="translate(40, 85)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("GAUSSIAN SURFACE INSIDE CONDUCTOR MATERIAL", "GAUSSIAN SURFACE INSIDE CONDUCTOR MATERIAL")}
          </T>
        </Fade>

        {/* Conductor & Gaussian Surface */}
        <Fade on={beat >= 1}>
          {/* Conductor Body */}
          <path d="M 100 180 C 100 90, 280 70, 370 130 C 430 180, 390 280, 270 280 C 150 280, 100 240, 100 180 Z"
            fill={AMBER_DARK} opacity={0.2} stroke={AMBER_DARK} strokeWidth={3} />
          <T x={380} y={90} size={14} fill={AMBER_DARK} weight={800}>Outer Surface</T>

          {/* Interior Gaussian Surface S */}
          <path d="M 140 180 C 140 120, 260 110, 320 150 C 360 180, 330 240, 250 240 C 170 240, 140 220, 140 180 Z"
            stroke={RED} strokeWidth={2} strokeDasharray="5 5" fill="none" />
          <T x={240} y={185} size={15} fill={RED} weight={900} anchor="middle">Gaussian Surface S (E = 0)</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={240} y={350} anchor="middle" size={17} fill={INK} weight={800}>
            Since E = 0 everywhere on surface S, Flux Φ_E = ∮ E · dA = 0 !
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: CALCULUS PROOF STEPS */}
      <g transform="translate(540, 85)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("GAUSS LAW CALCULUS PROOF", "GAUSS LAW CALCULUS PROOF")}
          </T>
        </Fade>

        {/* Floating Derivation Steps (No Card Boxes) */}
        <Fade on={beat >= 4}>
          <T x={50} y={85} size={16} fill={INK} weight={800} anchor="start">
            1. Gauss's Law: ∮_S E · dA = Q_enclosed / ε₀
          </T>

          <T x={50} y={145} size={16} fill={AMBER_DARK} weight={800} anchor="start">
            2. Substitute E = 0 inside: 0 = Q_enclosed / ε₀
          </T>

          <T x={50} y={205} size={16} fill={GREEN} weight={800} anchor="start">
            3. Q_enclosed = 0 inside ANY interior volume!
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 50 235 L 450 235" stroke={INK} sw={2} />

          <T x={50} y={285} size={20} fill={RED} weight={900} anchor="start">
            4. All excess charge Q is pushed to outer boundary!
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={360} anchor="middle" size={15} fill={GREEN} weight={800}>
            Mutual electrostatic repulsion forces all like charges as far apart as possible!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 470)">
        <Badge n={3} cx={25} cy={25} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("DERIVATION VERDICT", "DERIVATION VERDICT")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={500} y={30} anchor="middle" size={17} fill={GREEN} weight={800}>
            Interior charge density ρ = 0 for any conductor in static equilibrium!
          </T>
          <T x={500} y={65} anchor="middle" size={15} fill={INK} weight={700}>
            Charges sit exclusively in a thin surface layer ~1 atomic thickness!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={570} w={880} h={42} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Proof Completed: Gauss's Law ∮ E·dA = Q_enclosed/ε₀ = 0 proves 100% of charge resides on outer surface! ✓",
            "★ Proof Completed: Gauss's Law ∮ E·dA = Q_enclosed/ε₀ = 0 proves 100% of charge resides on outer surface! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
