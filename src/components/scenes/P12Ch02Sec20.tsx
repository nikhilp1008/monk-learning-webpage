"use client";

/**
 * P12Ch02 · Section 20 — "Deriving the potential energy of a dipole in a uniform field"
 * Subtopic: Potential Energy & External Fields
 * OPEN CHALKBOARD DESIGN WITH DIPOLE ROTATIONAL INTEGRAL PROOF (NO CONTAINER BOXES):
 *  - Dipole rotated by dθ against restoring torque τ = p E sinθ
 *  - Reference state: θ = 90° (π/2) where U(90°) = 0
 *  - Integration: U(θ) = ∫_90°^θ p E sinθ dθ = - p E cosθ = - p · E
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

export default function P12Ch02Sec20({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Derivation: Dipole Potential Energy U(θ) = −pE cosθ = −p · E", "Derivation: Dipole Potential Energy U(θ) = −pE cosθ = −p · E")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: ROTATIONAL TORQUE GEOMETRY */}
      <g transform="translate(40, 85)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("ROTATING DIPOLE AGAINST RESTORING TORQUE", "ROTATING DIPOLE AGAINST RESTORING TORQUE")}
          </T>
        </Fade>

        <Fade on={beat >= 1}>
          {/* Uniform E field lines */}
          <path d={arrowD(40, 110, 420, 110)} stroke={RED} strokeWidth={2.5} />
          <path d={arrowD(40, 190, 420, 190)} stroke={RED} strokeWidth={2.5} />
          <path d={arrowD(40, 270, 420, 270)} stroke={RED} strokeWidth={2.5} />
          <T x={435} y={195} size={14} fill={RED} weight={800} anchor="start">Field E</T>

          {/* Reference position (90°) */}
          <line x1="220" y1="190" x2="220" y2="90" stroke={MUTED} strokeWidth={2} strokeDasharray="4 4" />
          <T x={220} y={75} size={12} fill={MUTED} weight={800} anchor="middle">Ref θ = 90° (U = 0)</T>

          {/* Rotated Dipole Vector p */}
          <line x1="220" y1="190" x2="310" y2="120" stroke={GREEN} strokeWidth={4} />
          <circle cx={310} cy={120} r={7} fill={GREEN} />
          <T x={325} y={115} size={14} fill={GREEN} weight={800}>p (Dipole)</T>

          {/* Rotational Torque Arrow τ */}
          <path d="M 270 190 A 50 50 0 0 0 250 160" stroke={AMBER_DARK} strokeWidth={2.5} fill="none" />
          <T x={280} y={170} size={13} fill={AMBER_DARK} weight={800}>dθ</T>
        </Fade>

        {/* Free Floating Differential Work (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={230} y={350} anchor="middle" size={17} fill={INK} weight={800}>
            dW = τ_ext dθ = p E sinθ dθ  (Work against torque!)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: CALCULUS PROOF STEPS */}
      <g transform="translate(540, 85)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("STEP-BY-STEP INTEGRATION FROM 90° TO θ", "STEP-BY-STEP INTEGRATION FROM 90° TO θ")}
          </T>
        </Fade>

        {/* Floating Calculus Equations (No Card Boxes) */}
        <Fade on={beat >= 4}>
          <T x={50} y={85} size={16} fill={INK} weight={800} anchor="start">
            1. U(θ) = ∫ (p E sinθ) dθ from 90° to θ
          </T>

          <T x={50} y={145} size={16} fill={AMBER_DARK} weight={800} anchor="start">
            2. Integrate: U(θ) = p E [ − cosθ ] evaluated from 90° to θ
          </T>

          <T x={50} y={205} size={16} fill={GREEN} weight={800} anchor="start">
            3. Apply Limits: U(θ) = − p E ( cosθ − cos 90° ) = − p E cosθ
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 50 235 L 450 235" stroke={INK} sw={2} />

          <T x={50} y={285} size={20} fill={RED} weight={800} anchor="start">
            4. U(θ) = − p · E  (Vector Dot Product!)
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={360} anchor="middle" size={15} fill={GREEN} weight={800}>
            Reference U = 0 chosen at θ = 90° where torque is maximum but field projection is zero!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 470)">
        <Badge n={3} cx={25} cy={25} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("WORK REQUIRED FOR ORIENTATION CHANGE", "WORK REQUIRED FOR ORIENTATION CHANGE")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={500} y={30} anchor="middle" size={17} fill={GREEN} weight={800}>
            Work done in turning dipole from θ₁ to θ₂: W_ext = U(θ₂) − U(θ₁) = p E (cosθ₁ − cosθ₂)!
          </T>
          <T x={500} y={65} anchor="middle" size={15} fill={INK} weight={700}>
            To rotate from 0° (stable) to 180° (unstable): W_ext = pE(1 - (-1)) = +2 pE!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={570} w={880} h={42} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Dipole Derivation Mastered: U(θ) = −pE cosθ = −p · E derived via angular torque integration! ✓",
            "★ Dipole Derivation Mastered: U(θ) = −pE cosθ = −p · E derived via angular torque integration! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
