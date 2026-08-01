"use client";

/**
 * P12Ch02 · Section 50 — "JEE Advanced: deriving the spherical capacitor"
 * Subtopic: Conductors & Spherical Capacitors
 * OPEN CHALKBOARD DESIGN WITH INTEGRAL DERIVATION (NO CONTAINER BOXES):
 *  - Inner shell radius a (+Q), Outer shell radius b (-Q, Grounded)
 *  - Electric field between shells: E(r) = k Q / r²
 *  - Potential Difference: V = ∫_a^b E dr = k Q (1/a - 1/b) = [Q / 4π ε₀] [ (b - a) / (a b) ]
 *  - Capacitance: C = Q / V = 4π ε₀ (a b / (b - a))
 *  - Isolated sphere limit (b -> ∞): C = 4π ε₀ a !
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

export default function P12Ch02Sec50({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("JEE Advanced: Derivation of Spherical Capacitor C = 4πε₀(ab/(b−a))", "JEE Advanced: Derivation of Spherical Capacitor C = 4πε₀(ab/(b−a))")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: INTEGRAL GEOMETRY */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("SPHERICAL SHELL FIELD INTEGRAL GEOMETRY", "SPHERICAL SHELL FIELD INTEGRAL GEOMETRY")}
          </T>
        </Fade>

        {/* Shells Diagram */}
        <Fade on={beat >= 1}>
          <circle cx={240} cy={180} r={45} stroke={RED} strokeWidth={3} fill="#ffe4e6" opacity={0.3} />
          <T x={240} y={185} size={13} fill={RED} weight={900} anchor="middle">+Q Inner (a)</T>

          <circle cx={240} cy={180} r={100} stroke={GREEN} strokeWidth={3} fill="none" strokeDasharray="5 5" />
          <T x={240} y={70} size={13} fill={GREEN} weight={900} anchor="middle">−Q Outer Grounded (b)</T>

          {/* Radial Field Arrows */}
          <path d={arrowD(285, 180, 335, 180)} stroke={AMBER_DARK} strokeWidth={2.5} />
          <T x={310} y={165} size={13} fill={AMBER_DARK} weight={800}>E(r)</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={240} y={305} anchor="middle" size={17} fill={INK} weight={800}>
            Field between shells: E(r) = k Q / r²   (a ≤ r ≤ b)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: INTEGRAL PROOF STEPS */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("INTEGRAL PROOF OF CAPACITANCE", "INTEGRAL PROOF OF CAPACITANCE")}
          </T>
        </Fade>

        {/* Floating Solution Steps (No Card Boxes) */}
        <Fade on={beat >= 4}>
          <T x={50} y={85} size={16} fill={AMBER_DARK} weight={800} anchor="start">
            1. V = ∫_a^b E(r) dr = ∫_a^b (k Q / r²) dr
          </T>

          <T x={50} y={145} size={16} fill={GREEN} weight={800} anchor="start">
            2. V = k Q [ −1/r ]_a^b = k Q ( 1/a − 1/b )
          </T>

          <T x={50} y={205} size={16} fill={RED} weight={800} anchor="start">
            3. V = [ Q / (4π ε₀) ] [ (b − a) / (a b) ]
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 50 235 L 450 235" stroke={INK} sw={2} />

          <T x={50} y={285} size={20} fill={GREEN} weight={900} anchor="start">
            4. C = Q / V = 4π ε₀ [ (a b) / (b − a) ]  (Q.E.D.)
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={305} anchor="middle" size={15} fill={GREEN} weight={800}>
            Limit as b → ∞ gives isolated sphere capacitance C = 4π ε₀ a!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 420)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("JEE ADVANCED SPHERICAL CAPACITOR VARIATIONS", "JEE ADVANCED SPHERICAL CAPACITOR VARIATIONS")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={52} size={14} anchor="start" fill={GREEN} weight={800}>
            If INNER shell is grounded and charge +Q is given to outer shell: C = 4π ε₀ b + 4π ε₀ (ab/(b−a))!
          </T>
          <T x={45} y={76} size={13} anchor="start" fill={INK} weight={700}>
            Grounding inner shell creates TWO capacitors in parallel (Inner cavity + Outer surface)!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Proof Completed: Spherical Capacitor C = 4πε₀ ab/(b−a) rigorously derived via potential field integration! ✓",
            "★ Proof Completed: Spherical Capacitor C = 4πε₀ ab/(b−a) rigorously derived via potential field integration! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
