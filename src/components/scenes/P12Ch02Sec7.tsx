"use client";

/**
 * P12Ch02 · Section 7 — "Deriving E equals minus dV by dr from equipotential surfaces"
 * Subtopic: Electrostatic Potential Derivations
 * OPEN CHALKBOARD DESIGN WITH TWO ADJACENT EQUIPOTENTIAL PLANES (NO CONTAINER BOXES):
 *  - Two parallel equipotential surfaces A and B separated by perpendicular distance dr
 *  - Potential V on surface A, V + dV on surface B
 *  - Work done in moving charge q₀ by dr: dW = q₀ dV = - q₀ E dr
 *  - Derivation E = - dV/dr (Electric field is magnitude of potential gradient)
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

export default function P12Ch02Sec7({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  // Moving charge animation between planes
  const animDr = Math.min(1, currentTime * 0.48);
  const qy = 120 + animDr * 140;

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Derivation: Field-Potential Relation E = − dV/dr from Equipotentials", "Derivation: Field-Potential Relation E = − dV/dr from Equipotentials")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: TWO ADJACENT EQUIPOTENTIAL SURFACES */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("SURFACES A AND B SEPARATED BY dr", "SURFACES A AND B SEPARATED BY dr")}
          </T>
        </Fade>

        <Fade on={beat >= 1}>
          {/* Surface B (higher potential V + dV) */}
          <line x1="60" y1="120" x2="420" y2="120" stroke={AMBER_DARK} strokeWidth={3} />
          <T x={435} y={125} size={14} fill={AMBER_DARK} weight={800} anchor="start">Surface B (V + dV)</T>

          {/* Surface A (potential V) */}
          <line x1="60" y1="260" x2="420" y2="260" stroke={GREEN} strokeWidth={3} />
          <T x={435} y={265} size={14} fill={GREEN} weight={800} anchor="start">Surface A (V)</T>

          {/* Perpendicular displacement dr line */}
          <line x1="140" y1="120" x2="140" y2="260" stroke={INK} strokeWidth={2} strokeDasharray="4 4" />
          <T x={120} y={195} size={14} fill={INK} weight={800} anchor="end">dr (⊥ distance)</T>

          {/* Electric Field Vector E pointing downwards */}
          <path d={arrowD(300, 120, 300, 255)} stroke={RED} strokeWidth={3.5} />
          <T x={315} y={195} size={16} fill={RED} weight={900}>E (Vector)</T>

          {/* Moving charge +q0 */}
          <circle cx={140} cy={qy} r={9} fill={GREEN} />
          <T x={140} y={qy - 12} size={11} fill={GREEN} weight={800}>+q₀</T>
        </Fade>

        {/* Free Floating Work Equation (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={240} y={305} anchor="middle" size={17} fill={INK} weight={800}>
            Work done by field: dW = F_E · dr = q₀ E dr
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: CALCULUS PROOF & TWO CONCLUSION RULES */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("CALCULUS PROOF OF E = − dV/dr", "CALCULUS PROOF OF E = − dV/dr")}
          </T>
        </Fade>

        {/* Floating Derivation Steps (No Card Boxes) */}
        <Fade on={beat >= 4}>
          <T x={50} y={90} size={17} fill={INK} weight={800} anchor="start">
            1. Potential Difference: V_A − V_B = V − (V + dV) = − dV
          </T>

          <T x={50} y={150} size={17} fill={AMBER_DARK} weight={800} anchor="start">
            2. Work per unit charge: W / q₀ = E dr
          </T>

          <T x={50} y={210} size={17} fill={GREEN} weight={800} anchor="start">
            3. Equate Work to − dV: q₀ E dr = − q₀ dV
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 50 245 L 450 245" stroke={INK} sw={2} />

          <T x={50} y={295} size={22} fill={RED} weight={800} anchor="start">
            4. E = − dV / dr  (Negative Gradient!)
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={305} anchor="middle" size={15} fill={GREEN} weight={800}>
            Electric field E equals magnitude of potential drop per unit perpendicular distance!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 420)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("TWO CRITICAL CONSEQUENCES FOR EXAMS", "TWO CRITICAL CONSEQUENCES FOR EXAMS")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={52} size={14} anchor="start" fill={GREEN} weight={800}>
            1. E points in direction where potential decreases steepest!
          </T>
          <T x={45} y={76} size={13} anchor="start" fill={INK} weight={700}>
            2. E magnitude is given by change in potential per unit displacement normal to equipotential!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Proof Completed: E = − dV/dr (Electric field is negative radial gradient of potential)! ✓",
            "★ Proof Completed: E = − dV/dr (Electric field is negative radial gradient of potential)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
