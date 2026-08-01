"use client";

/**
 * P12Ch02 · Section 19 — "Deriving the potential energy of a two-charge system"
 * Subtopic: Potential Energy & External Fields
 * OPEN CHALKBOARD DESIGN WITH TWO-CHARGE INTEGRAL PROOF (NO CONTAINER BOXES):
 *  - Bringing q₂ from ∞ to distance r₁₂ from q₁
 *  - Coulomb force F_E = k q₁ q₂ / x²
 *  - Calculus integration: U = W_ext = - ∫_∞^r₁₂ F_E dx = k q₁ q₂ / r₁₂
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

export default function P12Ch02Sec19({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  // Moving charge q2 from infinity towards q1
  const animPos = (currentTime * 0.7) % 1;
  const q2X = 440 - animPos * 200;

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Derivation: Two-Charge System Potential Energy U = kq₁q₂/r₁₂", "Derivation: Two-Charge System Potential Energy U = kq₁q₂/r₁₂")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: INTEGRATION AXIS & FORCE VECTORS */}
      <g transform="translate(40, 85)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("BRINGING q₂ FROM ∞ TO DISTANCE r₁₂ FROM q₁", "BRINGING q₂ FROM ∞ TO DISTANCE r₁₂ FROM q₁")}
          </T>
        </Fade>

        <Fade on={beat >= 1}>
          {/* Station Charge q1 */}
          <circle cx={80} cy={180} r={22} fill="#ffe4e6" stroke={RED} strokeWidth={2.5} />
          <T x={80} y={187} size={18} fill={RED} weight={900}>+q₁</T>

          {/* Integration axis */}
          <line x1="102" y1="180" x2="460" y2="180" stroke={INK} strokeWidth={2.5} />

          {/* Target distance r12 */}
          <line x1="240" y1="165" x2="240" y2="195" stroke={GREEN} strokeWidth={3} />
          <T x={240} y={150} size={15} fill={GREEN} weight={800}>Final Position (r₁₂)</T>

          {/* Moving charge q2 */}
          <circle cx={q2X} cy={180} r={12} fill={GREEN} />
          <T x={q2X} y={185} size={13} fill="#ffffff" weight={900}>+q₂</T>

          {/* Force Vectors F_E and F_ext */}
          <path d={arrowD(q2X, 180, q2X + 45, 180)} stroke={RED} strokeWidth={2.5} />
          <T x={q2X + 25} y={165} size={11} fill={RED} weight={800}>F_E</T>

          <path d={arrowD(q2X, 180, q2X - 45, 180)} stroke={GREEN} strokeWidth={2.5} />
          <T x={q2X - 35} y={165} size={11} fill={GREEN} weight={800}>F_ext</T>
        </Fade>

        {/* Free Floating Differential Work (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={240} y={350} anchor="middle" size={17} fill={INK} weight={800}>
            dW = F_ext · dx = − F_E dx = − (k q₁ q₂ / x²) dx
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: CALCULUS PROOF STEPS */}
      <g transform="translate(540, 85)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("STEP-BY-STEP INTEGRAL DERIVATION", "STEP-BY-STEP INTEGRAL DERIVATION")}
          </T>
        </Fade>

        {/* Floating Calculus Equations (No Card Boxes) */}
        <Fade on={beat >= 4}>
          <T x={50} y={85} size={16} fill={INK} weight={800} anchor="start">
            1. Total Work W = ∫_∞^r₁₂ dW = − ∫_∞^r₁₂ (k q₁ q₂ / x²) dx
          </T>

          <T x={50} y={145} size={16} fill={AMBER_DARK} weight={800} anchor="start">
            2. Integrate: W = − k q₁ q₂ [ − 1 / x ]_∞^r₁₂
          </T>

          <T x={50} y={205} size={16} fill={GREEN} weight={800} anchor="start">
            3. Apply Limits: W = k q₁ q₂ ( 1/r₁₂ − 1/∞ ) = k q₁ q₂ / r₁₂
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 50 235 L 450 235" stroke={INK} sw={2} />

          <T x={50} y={285} size={20} fill={RED} weight={800} anchor="start">
            4. U = W_ext = k q₁ q₂ / r₁₂  (Q.E.D.)
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={360} anchor="middle" size={15} fill={GREEN} weight={800}>
            Valid for both positive and negative charges — include proper signs (+ / -)!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 470)">
        <Badge n={3} cx={25} cy={25} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("DERIVATION VERDICT & SYSTEM RECAP", "DERIVATION VERDICT & SYSTEM RECAP")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={500} y={30} anchor="middle" size={17} fill={GREEN} weight={800}>
            Electrostatic potential energy is stored in the electric field surrounding the pair!
          </T>
          <T x={500} y={65} anchor="middle" size={15} fill={INK} weight={700}>
            Reference zero at infinite separation: U(∞) = 0 J!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={570} w={880} h={42} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Proof Completed: Potential energy of two point charges U = k q₁ q₂ / r₁₂ via calculus integration! ✓",
            "★ Proof Completed: Potential energy of two point charges U = k q₁ q₂ / r₁₂ via calculus integration! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
