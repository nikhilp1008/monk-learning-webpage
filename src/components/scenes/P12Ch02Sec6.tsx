"use client";

/**
 * P12Ch02 · Section 6 — "Deriving V equals kQ over r for a point charge"
 * Subtopic: Electrostatic Potential Derivations
 * OPEN CHALKBOARD DESIGN WITH STEP-BY-STEP INTEGRAL DERIVATION (NO CONTAINER BOXES):
 *  - Visual trajectory of test charge q₀ moving from infinity (∞) to point P at distance r from +Q
 *  - Radial force vector F_ext and field force F_E = k Q q₀ / x²
 *  - Step-by-step calculus integration: W = -∫_∞^r (k Q q₀ / x²) dx = k Q q₀ / r
 *  - Definition V = W / q₀ = k Q / r
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

export default function P12Ch02Sec6({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  // Moving charge animation from infinity towards P
  const animPos = Math.min(1, currentTime * 0.28);
  const qx = 440 - animPos * 240;

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Derivation: Electrostatic Potential V(r) = kQ/r via Calculus Integration", "Derivation: Electrostatic Potential V(r) = kQ/r via Calculus Integration")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: INTEGRATION PATH & FORCE VECTORS */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("CHARGE TRAJECTORY FROM ∞ TO POINT P", "CHARGE TRAJECTORY FROM ∞ TO POINT P")}
          </T>
        </Fade>

        <Fade on={beat >= 1}>
          {/* Source Charge +Q */}
          <circle cx={80} cy={180} r={22} fill="#ffe4e6" stroke={RED} strokeWidth={2.5} />
          <T x={80} y={187} size={18} fill={RED} weight={900}>+Q</T>
          <T x={80} y={145} size={13} fill={RED} weight={700}>Origin (x = 0)</T>

          {/* Integration axis */}
          <line x1="102" y1="180" x2="460" y2="180" stroke={INK} strokeWidth={2.5} />

          {/* Target Point P at distance r */}
          <line x1="200" y1="165" x2="200" y2="195" stroke={GREEN} strokeWidth={3} />
          <T x={200} y={150} size={15} fill={GREEN} weight={800}>Point P (r)</T>

          {/* Distance r dimension line */}
          <line x1="80" y1="220" x2="200" y2="220" stroke={GREEN} strokeWidth={2} />
          <T x={140} y={240} size={13} fill={GREEN} weight={800}>Distance r</T>

          {/* Infinity reference */}
          <T x={450} y={150} size={16} fill={MUTED} weight={800}>Infinity (∞)</T>

          {/* Moving test charge +q0 */}
          <circle cx={qx} cy={180} r={10} fill={AMBER_DARK} />
          <T x={qx} y={184} size={11} fill="#ffffff" weight={900}>+q₀</T>
          <T x={qx} y={205} size={12} fill={AMBER_DARK} weight={800}>Position x</T>

          {/* Repulsive Field Force F_E and External Force F_ext */}
          <path d={arrowD(qx, 180, qx + 45, 180)} stroke={RED} strokeWidth={2.5} />
          <T x={qx + 25} y={165} size={11} fill={RED} weight={800}>F_E</T>

          <path d={arrowD(qx, 180, qx - 45, 180)} stroke={GREEN} strokeWidth={2.5} />
          <T x={qx - 35} y={165} size={11} fill={GREEN} weight={800}>F_ext</T>
        </Fade>

        {/* Free Floating Differential Work Equation (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={240} y={305} anchor="middle" size={17} fill={INK} weight={800}>
            Differential Work: dW = F_ext · dx = − F_E dx = − (k Q q₀ / x²) dx
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: STEP-BY-STEP CALCULUS PROOF */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("STEP-BY-STEP CALCULUS PROOF", "STEP-BY-STEP CALCULUS PROOF")}
          </T>
        </Fade>

        {/* Floating Calculus Equations (No Card Boxes) */}
        <Fade on={beat >= 4}>
          <T x={50} y={90} size={17} fill={INK} weight={800} anchor="start">
            1. Total Work W = ∫_∞^r dW = − ∫_∞^r (k Q q₀ / x²) dx
          </T>

          <T x={50} y={150} size={17} fill={AMBER_DARK} weight={800} anchor="start">
            2. Integration: W = − k Q q₀ [ − 1 / x ]_∞^r
          </T>

          <T x={50} y={210} size={17} fill={GREEN} weight={800} anchor="start">
            3. Apply Limits: W = k Q q₀ ( 1/r − 1/∞ ) = k Q q₀ / r
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 50 245 L 450 245" stroke={INK} sw={2} />

          <T x={50} y={295} size={22} fill={RED} weight={800} anchor="start">
            4. Potential V(r) = W / q₀ = k Q / r  (Q.E.D.)
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={305} anchor="middle" size={15} fill={GREEN} weight={800}>
            Independent of path taken — depends strictly on initial & final limits (∞ to r)!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 420)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("PROFILES & PHYSICAL INTUITION", "PROFILES & PHYSICAL INTUITION")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={52} size={14} anchor="start" fill={GREEN} weight={800}>
            Electric Field E = kQ/r² (decay as 1/r²)  vs  Potential V = kQ/r (decay as 1/r)!
          </T>
          <T x={45} y={76} size={13} anchor="start" fill={INK} weight={700}>
            Potential V is scalar work per unit charge; zero reference at infinity V(∞) = 0 V!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Proof Completed: V(r) = W/q₀ = −∫_∞^r E dx = kQ/r (Scalar inverse-distance potential)! ✓",
            "★ Proof Completed: V(r) = W/q₀ = −∫_∞^r E dx = kQ/r (Scalar inverse-distance potential)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
