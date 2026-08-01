"use client";

/**
 * P12Ch02 · Section 11 — "JEE Main: axial potential of a charged ring"
 * Subtopic: Electrostatic Potential & Equipotentials
 * OPEN CHALKBOARD DESIGN WITH CHARGED RING AXIAL DIAGRAM (NO CONTAINER BOXES):
 *  - Uniformly charged ring with total charge Q and radius R
 *  - Axial observation point P at distance x along the axis
 *  - Slant distance to all charge elements r = √(R² + x²)
 *  - Integration result: V(x) = k Q / √(R² + x²)
 *  - Center V(0) = kQ/R  and Far-field V(x >> R) ≈ kQ/x
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

export default function P12Ch02Sec11({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  // Rotating element on ring
  const rotAngle = Math.min(Math.PI * 1.5, currentTime * 0.8);
  const dqX = 120 + 20 * Math.cos(rotAngle);
  const dqY = 180 - 65 * Math.sin(rotAngle);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("JEE Main: Axial Potential of Uniformly Charged Ring V = kQ/√(R² + x²)", "JEE Main: Axial Potential of Uniformly Charged Ring V = kQ/√(R² + x²)")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: CHARGED RING & AXIAL POINT P */}
      <g transform="translate(40, 85)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("CHARGED RING (Q, R) AND AXIAL POINT P(x)", "CHARGED RING (Q, R) AND AXIAL POINT P(x)")}
          </T>
        </Fade>

        <Fade on={beat >= 1}>
          {/* Ring Ellipse */}
          <ellipse cx={120} cy={180} rx={25} ry={65} stroke={RED} strokeWidth={3} fill="none" />
          <T x={120} y={95} size={14} fill={RED} weight={800} anchor="middle">Ring (Q, R)</T>

          {/* Central Axis */}
          <line x1="120" y1="180" x2="440" y2="180" stroke={INK} strokeWidth={2.5} />
          <T x={280} y={205} size={14} fill={INK} weight={800} anchor="middle">Axial Distance x</T>

          {/* Point P */}
          <circle cx={380} cy={180} r={7} fill={GREEN} />
          <T x={380} y={155} size={15} fill={GREEN} weight={800}>Point P(x)</T>

          {/* Rotating Charge Element dq */}
          <circle cx={dqX} cy={dqY} r={7} fill={AMBER_DARK} />
          <T x={dqX - 25} y={dqY} size={12} fill={AMBER_DARK} weight={800}>dq</T>

          {/* Slant Distance r line */}
          <line x1={dqX} y1={dqY} x2="380" y2="180" stroke={AMBER_DARK} strokeWidth={2} strokeDasharray="4 4" />
          <T x={260} y={135} size={13} fill={AMBER_DARK} weight={800}>r = √(R² + x²)</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={240} y={350} anchor="middle" size={17} fill={INK} weight={800}>
            Integral V = ∫ (k dq / r) = (k / r) ∫ dq = k Q / √(R² + x²)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: SPECIAL LIMITS & GRAPH V(x) */}
      <g transform="translate(540, 85)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("SPECIAL LIMITS & V(x) PROFILE GRAPH", "SPECIAL LIMITS & V(x) PROFILE GRAPH")}
          </T>
        </Fade>

        {/* Open Axes for V(x) vs x */}
        <Fade on={beat >= 4}>
          <line x1="60" y1="270" x2="450" y2="270" stroke={INK} strokeWidth={2} />
          <line x1="250" y1="270" x2="250" y2="70" stroke={INK} strokeWidth={2} />

          <T x={450} y={290} size={12} fill={INK} anchor="end">Axis x →</T>
          <T x={240} y={65} size={12} fill={INK} anchor="end">Potential V(x) →</T>

          {/* Bell-shaped Curve for Ring Potential */}
          <Draw on={beat >= 4} delay={dl(4, 0.6)}
            d="M 70 260 Q 160 250, 250 100 Q 340 250, 430 260" stroke={GREEN} sw={3.5} />

          {/* Peak at x = 0 */}
          <circle cx={250} cy={100} r={6} fill={RED} />
          <T x={250} y={85} size={13} fill={RED} weight={800} anchor="middle">Center V_max = kQ/R</T>
        </Fade>

        {/* Free Floating Asymptote Formulas (Spacious, No Box) */}
        <Fade on={beat >= 6}>
          <T x={250} y={350} anchor="middle" size={17} fill={GREEN} weight={800}>
            At Center (x = 0): V_max = kQ/R   |   Far Away (x &gt;&gt; R): V ≈ kQ/x (Point Charge!)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 440)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("JEE MAIN TRAP: ELECTRIC FIELD DERIVATION FROM V(x)", "JEE MAIN TRAP: ELECTRIC FIELD DERIVATION FROM V(x)")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={52} size={14} anchor="start" fill={GREEN} weight={800}>
            Differentiating V(x): E_x = − dV/dx = k Q x / (R² + x²)^(3/2) !
          </T>
          <T x={45} y={76} size={13} anchor="start" fill={INK} weight={700}>
            At center x = 0, E = 0 N/C (due to symmetry), but Potential V = kQ/R is MAXIMUM!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Ring Potential Mastered: V(x) = kQ/√(R²+x²) with maximum V_max = kQ/R at the ring center x = 0! ✓",
            "★ Ring Potential Mastered: V(x) = kQ/√(R²+x²) with maximum V_max = kQ/R at the ring center x = 0! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
