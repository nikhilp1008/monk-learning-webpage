"use client";

/**
 * P12Ch02 · Section 23 — "JEE Main: released charge, conservation of energy"
 * Subtopic: Potential Energy & External Fields
 * OPEN CHALKBOARD DESIGN WITH ACCELERATING CHARGE TRAJECTORY (NO CONTAINER BOXES):
 *  - Fixed charge +q₁ at origin
 *  - Charge +q₂ (mass m) released from rest at distance r₁
 *  - Accelerates outward to distance r₂ under Coulomb repulsion
 *  - Conservation of energy: 0 + k q₁ q₂ / r₁ = ½ m v² + k q₁ q₂ / r₂
 *  - Velocity formula: v = √[ (2 k q₁ q₂ / m) (1/r₁ - 1/r₂) ]
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

export default function P12Ch02Sec23({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  // Accelerated charge motion from r1 to r2
  const animR = Math.min(1, currentTime * 0.36);
  const q2X = 180 + animR * 200;

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("JEE Main: Released Charge Speed via Energy Conservation v = √[(2k q₁ q₂ / m)(1/r₁ − 1/r₂)]", "JEE Main: Released Charge Speed via Energy Conservation v = √[(2k q₁ q₂ / m)(1/r₁ − 1/r₂)]")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: PHYSICAL CHARGE MOTION DIAGRAM */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("CHARGE RELEASED FROM REST (r₁ → r₂)", "CHARGE RELEASED FROM REST (r₁ → r₂)")}
          </T>
        </Fade>

        <Fade on={beat >= 1}>
          {/* Fixed charge +q1 */}
          <circle cx={80} cy={180} r={22} fill="#ffe4e6" stroke={RED} strokeWidth={2.5} />
          <T x={80} y={187} size={16} fill={RED} weight={900}>+q₁</T>
          <T x={80} y={140} size={13} fill={RED} weight={800}>Fixed Origin</T>

          {/* Motion axis */}
          <line x1="102" y1="180" x2="450" y2="180" stroke={INK} strokeWidth={2} />

          {/* Initial position r1 */}
          <line x1="180" y1="165" x2="180" y2="195" stroke={AMBER_DARK} strokeWidth={2.5} />
          <T x={180} y={150} size={13} fill={AMBER_DARK} weight={800}>r₁ (v = 0)</T>

          {/* Final position r2 */}
          <line x1="380" y1="165" x2="380" y2="195" stroke={GREEN} strokeWidth={2.5} />
          <T x={380} y={150} size={13} fill={GREEN} weight={800}>r₂ (Speed v)</T>

          {/* Accelerating charge +q2 */}
          <circle cx={q2X} cy={180} r={11} fill={GREEN} />
          <T x={q2X} y={184} size={11} fill="#ffffff" weight={900}>+q₂</T>

          {/* Velocity arrow */}
          <path d={arrowD(q2X, 180, q2X + 45, 180)} stroke={GREEN} strokeWidth={3} />
          <T x={q2X + 25} y={165} size={13} fill={GREEN} weight={900}>v(x)</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={240} y={305} anchor="middle" size={16} fill={INK} weight={800}>
            Electrostatic Repulsion converts ΔU into Kinetic Energy K = ½ m v² !
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: ENERGY CONSERVATION EQUATION STEPS */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("ENERGY CONSERVATION PROOF", "ENERGY CONSERVATION PROOF")}
          </T>
        </Fade>

        {/* Floating Derivation Steps (No Card Boxes) */}
        <Fade on={beat >= 4}>
          <T x={50} y={85} size={16} fill={INK} weight={800} anchor="start">
            1. E_initial = 0 + k q₁ q₂ / r₁
          </T>

          <T x={50} y={145} size={16} fill={AMBER_DARK} weight={800} anchor="start">
            2. E_final = ½ m v² + k q₁ q₂ / r₂
          </T>

          <T x={50} y={205} size={16} fill={GREEN} weight={800} anchor="start">
            3. ½ m v² = k q₁ q₂ ( 1/r₁ − 1/r₂ )
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 50 235 L 450 235" stroke={INK} sw={2} />

          <T x={50} y={285} size={20} fill={RED} weight={800} anchor="start">
            4. v = √ [ (2 k q₁ q₂ / m) ( 1/r₁ − 1/r₂ ) ]
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={305} anchor="middle" size={15} fill={GREEN} weight={800}>
            If released to infinity (r₂ → ∞): v_escape = √ (2 k q₁ q₂ / m r₁) !
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 420)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("JEE MAIN EXAM TRICK", "JEE MAIN EXAM TRICK")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={52} size={14} anchor="start" fill={GREEN} weight={800}>
            If BOTH charges are free to move: Use Reduced Mass µ = m₁ m₂ / (m₁ + m₂)!
          </T>
          <T x={45} y={76} size={13} anchor="start" fill={INK} weight={700}>
            Relative separation velocity v_rel = √ [ (2 k q₁ q₂ / µ) (1/r₁ − 1/r₂) ]!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ JEE Main Formula Mastered: Speed v = √[(2k q₁ q₂ / m)(1/r₁ − 1/r₂)] via Conservation of Energy! ✓",
            "★ JEE Main Formula Mastered: Speed v = √[(2k q₁ q₂ / m)(1/r₁ − 1/r₂)] via Conservation of Energy! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
