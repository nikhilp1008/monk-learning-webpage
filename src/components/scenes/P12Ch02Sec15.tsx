"use client";

/**
 * P12Ch02 · Section 15 — "The sign of U tells the story of the system"
 * Subtopic: Potential Energy & External Fields
 * OPEN CHALKBOARD DESIGN WITH FORCE ARROW DIAGRAMS (NO CONTAINER BOXES):
 *  - Case 1: Like Charges (+q, +q) -> Repulsive Force (← →), Positive Energy U > 0 (Unbound/Work Expended)
 *  - Case 2: Unlike Charges (+q, -q) -> Attractive Force (→ ←), Negative Energy U < 0 (Bound System/Energy Released)
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

export default function P12Ch02Sec15({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("The Sign of Potential Energy U: Positive (Repulsive) vs Negative (Bound)", "The Sign of Potential Energy U: Positive (Repulsive) vs Negative (Bound)")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: LIKE CHARGES (+q, +q) -> U > 0 */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("LIKE CHARGES (+q, +q): U > 0 (REPULSIVE)", "LIKE CHARGES (+q, +q): U > 0 (REPULSIVE)")}
          </T>
        </Fade>

        {/* Sphere pair & repulsion arrows */}
        <Fade on={beat >= 1}>
          <circle cx={140} cy={165} r={22} fill="#ffe4e6" stroke={RED} strokeWidth={2} />
          <T x={140} y={172} size={18} fill={RED} weight={800}>+q₁</T>

          <circle cx={320} cy={165} r={22} fill="#ffe4e6" stroke={RED} strokeWidth={2} />
          <T x={320} y={172} size={18} fill={RED} weight={800}>+q₂</T>

          {/* Repulsive force arrows pointing outward ← → */}
          <path d={arrowD(110, 165, 50, 165)} stroke={RED} strokeWidth={3} />
          <path d={arrowD(350, 165, 410, 165)} stroke={RED} strokeWidth={3} />

          <T x={230} y={130} size={14} fill={RED} weight={800} anchor="middle">Force Repels ← →</T>
          <T x={230} y={210} size={18} fill={RED} weight={900} anchor="middle">U = + k q₁q₂ / r &gt; 0</T>
        </Fade>

        {/* Free Floating Meaning (Spacious, 2-line centered, No collision) */}
        <Fade on={beat >= 3}>
          <T x={230} y={268} anchor="middle" size={14} fill={INK} weight={800}>
            Work must be done by external force
          </T>
          <T x={230} y={290} anchor="middle" size={14} fill={INK} weight={800}>
            to push them together against repulsion!
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: UNLIKE CHARGES (+q, -q) -> U < 0 */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("UNLIKE CHARGES (+q, −q): U < 0 (BOUND SYSTEM)", "UNLIKE CHARGES (+q, −q): U < 0 (BOUND SYSTEM)")}
          </T>
        </Fade>

        {/* Sphere pair & attraction arrows */}
        <Fade on={beat >= 4}>
          <circle cx={140} cy={165} r={22} fill="#ffe4e6" stroke={RED} strokeWidth={2} />
          <T x={140} y={172} size={18} fill={RED} weight={800}>+q₁</T>

          <circle cx={320} cy={165} r={22} fill="#dcfce7" stroke={GREEN} strokeWidth={2} />
          <T x={320} y={172} size={20} fill={GREEN} weight={800}>-q₂</T>

          {/* Attraction force arrows pointing inward → ← */}
          <path d={arrowD(170, 165, 215, 165)} stroke={GREEN} strokeWidth={3} />
          <path d={arrowD(290, 165, 245, 165)} stroke={GREEN} strokeWidth={3} />

          <T x={230} y={130} size={14} fill={GREEN} weight={800} anchor="middle">Force Attracts → ←</T>
          <T x={230} y={210} size={18} fill={GREEN} weight={900} anchor="middle">U = − k q₁q₂ / r &lt; 0</T>
        </Fade>

        {/* Free Floating Meaning (Spacious, 2-line centered, No collision) */}
        <Fade on={beat >= 6}>
          <T x={230} y={268} anchor="middle" size={14} fill={GREEN} weight={800}>
            Energy released as they attract —
          </T>
          <T x={230} y={290} anchor="middle" size={14} fill={GREEN} weight={800}>
            System is BOUND (like e⁻ & p⁺ in atom)!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("ENERGY SIGN CONVENTION RULES", "ENERGY SIGN CONVENTION RULES")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            U &lt; 0 means Bound System (Requires external work to separate to infinity U(∞) = 0)!
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            U &gt; 0 means Unbound System (Releases kinetic energy if released from rest)!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Sign Convention Mastered: Positive U = Repulsive/Unbound; Negative U = Attractive/Bound System! ✓",
            "★ Sign Convention Mastered: Positive U = Repulsive/Unbound; Negative U = Attractive/Bound System! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
