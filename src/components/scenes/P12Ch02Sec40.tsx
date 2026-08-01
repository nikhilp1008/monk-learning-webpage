"use client";

/**
 * P12Ch02 · Section 40 — "Charge on the surface, and one big equipotential blob"
 * Subtopic: Conductors & Spherical Capacitors
 * OPEN CHALKBOARD DESIGN WITH EQUIPOTENTIAL CONDUCTOR DIAGRAM (NO CONTAINER BOXES):
 *  - 1. Excess charge resides 100% on outer surface (ρ_inside = 0)
 *  - 2. Conductor interior and surface form one single EQUIPOTENTIAL VOLUME (V = const)
 *  - Potential gradient: E = - dV/dr = 0  =>  V_inside = V_surface everywhere!
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

export default function P12Ch02Sec40({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Charge Resides on Outer Surface & Conductor is an Equipotential Volume", "Charge Resides on Outer Surface & Conductor is an Equipotential Volume")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: SURFACE CHARGE DISTRIBUTION DIAGRAM */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("SURFACE CHARGE DISTRIBUTION (ρ_inside = 0)", "SURFACE CHARGE DISTRIBUTION (ρ_inside = 0)")}
          </T>
        </Fade>

        {/* Irregular Conductor Shape (Open Chalkboard Outline) */}
        <Fade on={beat >= 1}>
          <path d="M 120 160 C 120 100, 260 80, 330 130 C 380 160, 350 230, 240 230 C 150 230, 120 200, 120 160 Z"
            fill="none" stroke={AMBER_DARK} strokeWidth={1.8} strokeDasharray="6 4" />

          {/* Plus signs along outer boundary */}
          <T x={110} y={160} size={18} fill={RED} weight={900}>+</T>
          <T x={150} y={95} size={18} fill={RED} weight={900}>+</T>
          <T x={260} y={90} size={18} fill={RED} weight={900}>+</T>
          <T x={345} y={130} size={18} fill={RED} weight={900}>+</T>
          <T x={350} y={190} size={18} fill={RED} weight={900}>+</T>
          <T x={240} y={245} size={18} fill={RED} weight={900}>+</T>
          <T x={140} y={225} size={18} fill={RED} weight={900}>+</T>

          {/* Inside zero charge label */}
          <T x={225} y={160} size={15} fill={GREEN} weight={900} anchor="middle">Inside ρ = 0 & E = 0</T>
        </Fade>

        {/* Free Floating Formula */}
        <Fade on={beat >= 3}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            Gauss's Law: ∮ E · dA = Q_enclosed / ε₀ = 0  ⇒  No interior charge!
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: EQUIPOTENTIAL VOLUME PROOF */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("EQUIPOTENTIAL VOLUME PROOF (V = CONSTANT)", "EQUIPOTENTIAL VOLUME PROOF (V = CONSTANT)")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 4}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Field-Potential Relation: E = − dV / dr
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Since E = 0 inside: dV / dr = 0
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Integrating: V(r) = Constant everywhere inside!
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. V_inside = V_surface  (Zero Work to move inside!)
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Moving a charge inside a conductor requires ZERO net work)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("CONDUCTOR RULE 2 & 3 RECAP", "CONDUCTOR RULE 2 & 3 RECAP")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            All excess charge resides 100% on the outer surface; interior charge density ρ = 0!
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            The entire conductor (surface + interior) is at the exact same potential V!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Conductor Rule 2 & 3 Mastered: Charge resides entirely on outer surface and V_inside = V_surface = Const! ✓",
            "★ Conductor Rule 2 & 3 Mastered: Charge resides entirely on outer surface and V_inside = V_surface = Const! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
