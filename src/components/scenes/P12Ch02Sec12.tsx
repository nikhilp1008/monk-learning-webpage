"use client";

/**
 * P12Ch02 · Section 12 — "JEE Advanced: field from a potential function"
 * Subtopic: Electrostatic Potential & Equipotentials
 * OPEN CHALKBOARD DESIGN WITH 3D GRADIENT VECTOR FIELD (NO CONTAINER BOXES):
 *  - Partial derivatives: E_x = -∂V/∂x, E_y = -∂V/∂y, E_z = -∂V/∂z
 *  - 3D Gradient Vector E_vector = - ∇ V
 *  - JEE Advanced Worked Problem: V(x,y,z) = 3x²y - y³z at (1, 1, 1)
 *  - Step-by-step partial differentiation & magnitude calculation E = √37 N/C
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

export default function P12Ch02Sec12({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("JEE Advanced: 3D Gradient Vector Field E = −∇V = −(∂V/∂x i + ∂V/∂y j + ∂V/∂z k)", "JEE Advanced: 3D Gradient Vector Field E = −∇V = −(∂V/∂x i + ∂V/∂y j + ∂V/∂z k)")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: 3D GRADIENT CONCEPT & FORMULAS */}
      <g transform="translate(40, 85)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("3D PARTIAL DERIVATIVE GRADIENT COMPONENTS", "3D PARTIAL DERIVATIVE GRADIENT COMPONENTS")}
          </T>
        </Fade>

        {/* 3D Coordinate Axis drawing */}
        <Fade on={beat >= 1}>
          <line x1="200" y1="200" x2="380" y2="200" stroke={INK} strokeWidth={2.5} />
          <T x={395} y={205} size={14} fill={INK} weight={800}>X axis</T>

          <line x1="200" y1="200" x2="200" y2="60" stroke={INK} strokeWidth={2.5} />
          <T x={200} y={45} size={14} fill={INK} weight={800}>Y axis</T>

          <line x1="200" y1="200" x2="110" y2="280" stroke={INK} strokeWidth={2.5} />
          <T x={95} y={295} size={14} fill={INK} weight={800}>Z axis</T>

          {/* Resultant Electric Field Vector E */}
          <path d={arrowD(200, 200, 310, 100)} stroke={RED} strokeWidth={4} />
          <T x={325} y={95} size={16} fill={RED} weight={900}>E = −∇V</T>
        </Fade>

        {/* Free Floating Partial Derivatives (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={240} y={350} anchor="middle" size={17} fill={GREEN} weight={800}>
            E_x = − ∂V / ∂x   |   E_y = − ∂V / ∂y   |   E_z = − ∂V / ∂z
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: JEE ADVANCED WORKED PROBLEM */}
      <g transform="translate(540, 85)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("WORKED PROBLEM: V(x,y,z) = 3x²y − y³z AT (1,1,1)", "WORKED PROBLEM: V(x,y,z) = 3x²y − y³z AT (1,1,1)")}
          </T>
        </Fade>

        {/* Floating Problem Steps (No Card Boxes) */}
        <Fade on={beat >= 4}>
          <T x={50} y={85} size={16} fill={AMBER_DARK} weight={800} anchor="start">
            1. E_x = − ∂/∂x (3x²y − y³z) = − 6xy = − 6
          </T>

          <T x={50} y={145} size={16} fill={GREEN} weight={800} anchor="start">
            2. E_y = − ∂/∂y (3x²y − y³z) = − (3x² − 3y²z) = 0
          </T>

          <T x={50} y={205} size={16} fill={RED} weight={800} anchor="start">
            3. E_z = − ∂/∂z (3x²y − y³z) = − (− y³) = + 1
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 50 235 L 450 235" stroke={INK} sw={2} />

          <T x={50} y={285} size={20} fill={RED} weight={800} anchor="start">
            4. E_vector = − 6 i^ + 1 k^   ⇒   |E| = √(36 + 1) = √37 N/C
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={360} anchor="middle" size={15} fill={GREEN} weight={800}>
            Partial derivative ∂/∂x treats y and z as constant parameters!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 470)">
        <Badge n={3} cx={25} cy={25} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("JEE ADVANCED STRATEGY: INTEGRATION IN REVERSE", "JEE ADVANCED STRATEGY: INTEGRATION IN REVERSE")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={500} y={30} anchor="middle" size={17} fill={GREEN} weight={800}>
            Reverse Operation: V(B) − V(A) = − ∫_A^B E_vector · d r_vector = − ∫ (E_x dx + E_y dy + E_z dz)!
          </T>
          <T x={500} y={65} anchor="middle" size={15} fill={INK} weight={700}>
            If E is uniform: ΔV = − E_vector · Δr_vector = − E d cosθ!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={570} w={880} h={42} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Gradient Method Solved: E_vector = −∇V gives E_vector = −6 i^ + 1 k^ with magnitude |E| = √37 N/C! ✓",
            "★ Gradient Method Solved: E_vector = −∇V gives E_vector = −6 i^ + 1 k^ with magnitude |E| = √37 N/C! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
