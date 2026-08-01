"use client";

/**
 * P12Ch02 · Section 5 — "Dipole potential and the field–potential relation"
 * Subtopic: Electrostatic Potential & Equipotentials
 * OPEN CHALKBOARD DESIGN WITH RICH SVG DIPOLES & GRADIENT FIELD ARROWS (NO CONTAINER BOXES):
 *  - Electric Dipole (+q, -q at 2a separation) at angle θ to observation vector r
 *  - Dipole Potential Formula V(r, θ) = (k p cosθ) / r²
 *  - Field-Potential Gradient Relation E = - dV/dr (Field points in direction of steepest potential drop)
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

export default function P12Ch02Sec5({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  // Rotating dipole angle animation
  const rotAngle = Math.sin(Math.min(Math.PI / 2, currentTime * 0.8)) * 0.3;
  const dx = Math.cos(rotAngle) * 60;
  const dy = Math.sin(rotAngle) * 60;

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Electric Dipole Potential V = (kp cosθ)/r² & Gradient E = −dV/dr", "Electric Dipole Potential V = (kp cosθ)/r² & Gradient E = −dV/dr")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: DIPOLE VECTOR & OBSERVATION POINT P */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("ELECTRIC DIPOLE AT ANGLE θ", "ELECTRIC DIPOLE AT ANGLE θ")}
          </T>
        </Fade>

        {/* Dipole Charges +q and -q */}
        <Fade on={beat >= 1}>
          {/* Dipole axis line */}
          <line x1={200 - dx} y1={240 - dy} x2={200 + dx} y2={240 + dy} stroke={INK} strokeWidth={3} />

          {/* -q Charge */}
          <circle cx={200 - dx} cy={240 - dy} r={18} fill="#dcfce7" stroke={GREEN} strokeWidth={2} />
          <T x={200 - dx} y={246 - dy} size={16} fill={GREEN} weight={800}>-q</T>

          {/* +q Charge */}
          <circle cx={200 + dx} cy={240 + dy} r={18} fill="#ffe4e6" stroke={RED} strokeWidth={2} />
          <T x={200 + dx} y={246 + dy} size={16} fill={RED} weight={800}>+q</T>

          {/* Dipole moment vector p */}
          <path d={arrowD(200 - dx, 240 - dy, 200 + dx + 15, 240 + dy + 15)} stroke={AMBER_DARK} strokeWidth={2.5} />
          <T x={200 + dx + 30} y={240 + dy + 20} size={14} fill={AMBER_DARK} weight={800}>p = 2aq</T>

          {/* Position vector r to Point P */}
          <line x1="200" y1="240" x2="380" y2="90" stroke={RED} strokeWidth={2.5} strokeDasharray="5 5" />
          <circle cx={380} cy={90} r={6} fill={RED} />
          <T x={400} y={85} size={15} fill={RED} weight={800}>Point P (r, θ)</T>
          <T x={290} y={150} size={13} fill={RED} weight={700}>r</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 2}>
          <T x={240} y={305} anchor="middle" size={19} fill={GREEN} weight={800}>
            V(r, θ) = (1 / 4πε₀) (p cosθ / r²)   [Decays as 1/r² !]
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: FIELD-POTENTIAL GRADIENT RELATION E = - dV/dr */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={25} cy={25} on={beat >= 3} delay={dl(3, 0.2)} />
        <Fade on={beat >= 3} delay={dl(3, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("FIELD-POTENTIAL GRADIENT: E = − dV/dr", "FIELD-POTENTIAL GRADIENT: E = − dV/dr")}
          </T>
        </Fade>

        {/* Steepest Drop Visual Diagram */}
        <Fade on={beat >= 3}>
          {/* Equipotential Lines V1 = 100V, V2 = 80V, V3 = 60V */}
          <line x1="60" y1="80" x2="420" y2="80" stroke={AMBER_DARK} strokeWidth={2.5} strokeDasharray="6 4" />
          <T x={435} y={85} size={13} fill={AMBER_DARK} weight={800} anchor="start">V₁ = 100V</T>

          <line x1="60" y1="180" x2="420" y2="180" stroke={GREEN} strokeWidth={2.5} strokeDasharray="6 4" />
          <T x={435} y={185} size={13} fill={GREEN} weight={800} anchor="start">V₂ = 80V</T>

          <line x1="60" y1="280" x2="420" y2="280" stroke={RED} strokeWidth={2.5} strokeDasharray="6 4" />
          <T x={435} y={285} size={13} fill={RED} weight={800} anchor="start">V₃ = 60V</T>

          {/* Electric Field E vector pointing DOWNWARD towards decreasing potential */}
          <path d={arrowD(240, 80, 240, 275)} stroke={RED} strokeWidth={4} />
          <T x={255} y={180} size={16} fill={RED} weight={900}>E = − dV/dr (Steepest Drop)</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 5}>
          <T x={240} y={305} anchor="middle" size={20} fill={RED} weight={800}>
            E = − dV / dr   or   E_vector = − ∇ V
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 420)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("SPECIAL CASES & POTENTIAL DECISION MATRIX", "SPECIAL CASES & POTENTIAL DECISION MATRIX")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={52} size={14} fill={GREEN} weight={800} anchor="start">
            {t("• Axial Line (θ = 0°): V = kp/r²   |   • Equatorial Line (θ = 90°): V = 0 V (Zero Potential Line!)", "• Axial Line (θ = 0°): V = kp/r²   |   • Equatorial Line (θ = 90°): V = 0 V (Zero Potential Line!)")}
          </T>
          <T x={45} y={76} size={13} fill={INK} weight={700} anchor="start">
            {t("• Point charge V ∝ 1/r (spherical decay); Dipole V ∝ 1/r² (faster quadrupole-like angular decay)!", "• Point charge V ∝ 1/r (spherical decay); Dipole V ∝ 1/r² (faster quadrupole-like angular decay)!")}
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Dipole Verdict: V(r, θ) = (kp cosθ)/r² and Electric Field points in direction of steepest potential drop E = −dV/dr! ✓",
            "★ Dipole Verdict: V(r, θ) = (kp cosθ)/r² and Electric Field points in direction of steepest potential drop E = −dV/dr! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
