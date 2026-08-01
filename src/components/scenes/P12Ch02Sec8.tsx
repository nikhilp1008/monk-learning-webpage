"use client";

/**
 * P12Ch02 · Section 8 — "Deriving the potential of a short dipole"
 * Subtopic: Electrostatic Potential Derivations
 * OPEN CHALKBOARD DESIGN WITH SHORT DIPOLE GEOMETRY (NO CONTAINER BOXES):
 *  - Short dipole charges +q and -q separated by 2a
 *  - Distances r₁ and r₂ from charges to point P(r, θ)
 *  - Geometrical approximation: r₂ - r₁ ≈ 2a cosθ, r₁ r₂ ≈ r²
 *  - Step-by-step derivation: V = kq(1/r₁ - 1/r₂) = (k p cosθ) / r²
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

export default function P12Ch02Sec8({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Derivation: Short Dipole Potential V(r, θ) = (kp cosθ)/r²", "Derivation: Short Dipole Potential V(r, θ) = (kp cosθ)/r²")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: SHORT DIPOLE TRIANGLE GEOMETRY */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("SHORT DIPOLE GEOMETRY (r >> a)", "SHORT DIPOLE GEOMETRY (r >> a)")}
          </T>
        </Fade>

        <Fade on={beat >= 1}>
          {/* Dipole axis */}
          <line x1="140" y1="280" x2="260" y2="280" stroke={INK} strokeWidth={3} />

          {/* -q charge */}
          <circle cx={140} cy={280} r={18} fill="#dcfce7" stroke={GREEN} strokeWidth={2} />
          <T x={140} y={286} size={16} fill={GREEN} weight={800}>-q</T>

          {/* +q charge */}
          <circle cx={260} cy={280} r={18} fill="#ffe4e6" stroke={RED} strokeWidth={2} />
          <T x={260} y={286} size={16} fill={RED} weight={800}>+q</T>

          {/* Point P */}
          <circle cx={380} cy={90} r={7} fill={RED} />
          <T x={400} y={85} size={15} fill={RED} weight={800}>Point P</T>

          {/* Distance r1 from +q to P */}
          <line x1="260" y1="280" x2="380" y2="90" stroke={RED} strokeWidth={2} strokeDasharray="4 4" />
          <T x={340} y={190} size={13} fill={RED} weight={700}>r₁</T>

          {/* Distance r2 from -q to P */}
          <line x1="140" y1="280" x2="380" y2="90" stroke={GREEN} strokeWidth={2} strokeDasharray="4 4" />
          <T x={230} y={170} size={13} fill={GREEN} weight={700}>r₂</T>

          {/* Perpendicular drop for r2 - r1 = 2a cosθ */}
          <line x1="260" y1="280" x2="215" y2="150" stroke={AMBER_DARK} strokeWidth={2} strokeDasharray="3 3" />
          <T x={190} y={220} size={12} fill={AMBER_DARK} weight={800}>2a cosθ</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={240} y={305} anchor="middle" size={17} fill={INK} weight={800}>
            Approximation: r₂ − r₁ ≈ 2a cosθ  and  r₁ r₂ ≈ r²
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: ALGEBRAIC DERIVATION STEPS */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("STEP-BY-STEP ALGEBRAIC PROOF", "STEP-BY-STEP ALGEBRAIC PROOF")}
          </T>
        </Fade>

        {/* Floating Derivation Steps (No Card Boxes) */}
        <Fade on={beat >= 4}>
          <T x={50} y={90} size={17} fill={INK} weight={800} anchor="start">
            1. Superposition: V = V₊ + V₋ = k q/r₁ − k q/r₂
          </T>

          <T x={50} y={150} size={17} fill={AMBER_DARK} weight={800} anchor="start">
            2. Combine terms: V = k q ( (r₂ − r₁) / (r₁ r₂) )
          </T>

          <T x={50} y={210} size={17} fill={GREEN} weight={800} anchor="start">
            3. Substitute: V = k q ( 2a cosθ / r² )
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 50 245 L 450 245" stroke={INK} sw={2} />

          <T x={50} y={295} size={22} fill={RED} weight={800} anchor="start">
            4. V = (k p cosθ) / r²  where p = 2aq
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={305} anchor="middle" size={15} fill={GREEN} weight={800}>
            Dipole potential drops as 1/r², whereas point charge potential drops as 1/r!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 420)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("SPECIAL ORIENTATIONS", "SPECIAL ORIENTATIONS")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={52} size={14} anchor="start" fill={GREEN} weight={800}>
            θ = 0° (Axial Point): V = +kp/r²   |   θ = 180°: V = −kp/r²   |   θ = 90° (Equatorial): V = 0 V!
          </T>
          <T x={45} y={76} size={13} anchor="start" fill={INK} weight={700}>
            On the broadside equatorial line (θ = 90°), +q and -q potentials cancel completely at all points!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Proof Completed: Dipole Potential V = (1/4πε₀) (p cosθ / r²) with 1/r² decay profile! ✓",
            "★ Proof Completed: Dipole Potential V = (1/4πε₀) (p cosθ / r²) with 1/r² decay profile! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
