"use client";

/**
 * P12Ch02 · Section 43 — "Formula toolkit: spherical conductors and capacitors"
 * Subtopic: Conductors & Spherical Capacitors
 * OPEN CHALKBOARD DESIGN WITH SPHERICAL CAPACITOR SCHEMATICS (NO CONTAINER BOXES):
 *  - 1. Isolated Spherical Conductor: C = 4π ε₀ R  (Earth C ≈ 711 µF)
 *  - 2. Concentric Spherical Capacitor (Inner radius a, Outer radius b): C = 4π ε₀ (a b / (b - a))
 *  - 3. Concentric Shell Potentials: V_inner = k q₁/a + k q₂/b
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

export default function P12Ch02Sec43({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Formula Toolkit: Isolated Spheres C = 4πε₀R & Spherical Capacitors C = 4πε₀(ab/(b−a))", "Formula Toolkit: Isolated Spheres C = 4πε₀R & Spherical Capacitors C = 4πε₀(ab/(b−a))")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: ISOLATED SPHERICAL CONDUCTOR */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("ISOLATED SPHERICAL CONDUCTOR (RADIUS R)", "ISOLATED SPHERICAL CONDUCTOR (RADIUS R)")}
          </T>
        </Fade>

        {/* Sphere Diagram */}
        <Fade on={beat >= 1}>
          <circle cx={220} cy={180} r={75} stroke={RED} strokeWidth={3} fill="#ffe4e6" opacity={0.3} />
          <T x={220} y={185} size={16} fill={RED} weight={900} anchor="middle">Sphere (R, Q)</T>
          <line x1="220" y1="180" x2="295" y2="180" stroke={INK} strokeWidth={2} />
          <T x={260} y={170} size={13} fill={INK} weight={800}>Radius R</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={220} y={305} anchor="middle" size={19} fill={GREEN} weight={900}>
            C = 4π ε₀ R   (Earth R = 6400 km → C ≈ 711 µF!)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: CONCENTRIC SPHERICAL CAPACITOR (a, b) */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("CONCENTRIC SPHERICAL CAPACITOR (a, b)", "CONCENTRIC SPHERICAL CAPACITOR (a, b)")}
          </T>
        </Fade>

        {/* Concentric Shells Diagram */}
        <Fade on={beat >= 4}>
          {/* Inner Shell a */}
          <circle cx={240} cy={180} r={45} stroke={RED} strokeWidth={2.5} fill="#ffe4e6" opacity={0.3} />
          <T x={240} y={185} size={13} fill={RED} weight={900} anchor="middle">+Q (a)</T>

          {/* Outer Shell b */}
          <circle cx={240} cy={180} r={95} stroke={GREEN} strokeWidth={2.5} fill="none" strokeDasharray="5 5" />
          <T x={240} y={75} size={13} fill={GREEN} weight={900} anchor="middle">−Q Outer Shell (b, Grounded)</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 5}>
          <T x={240} y={305} anchor="middle" size={20} fill={GREEN} weight={900}>
            C = 4π ε₀ [ (a b) / (b − a) ]
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 420)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("SPHERICAL SHELL POTENTIAL SUPERPOSITION", "SPHERICAL SHELL POTENTIAL SUPERPOSITION")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={52} size={14} anchor="start" fill={GREEN} weight={800}>
            Inner Shell Potential: V_inner = k q₁/a + k q₂/b   |   Outer Shell Potential: V_outer = k(q₁ + q₂)/b !
          </T>
          <T x={45} y={76} size={13} anchor="start" fill={INK} weight={700}>
            Potential difference ΔV = V_inner − V_outer = k q₁ (1/a − 1/b) depends ONLY on inner charge q₁!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Spherical Toolkit Mastered: Isolated Sphere C = 4πε₀R vs Spherical Capacitor C = 4πε₀ ab/(b−a)! ✓",
            "★ Spherical Toolkit Mastered: Isolated Sphere C = 4πε₀R vs Spherical Capacitor C = 4πε₀ ab/(b−a)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
