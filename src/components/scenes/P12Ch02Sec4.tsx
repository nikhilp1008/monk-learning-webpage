"use client";

/**
 * P12Ch02 · Section 4 — "Formula toolkit: potential and superposition"
 * Subtopic: Electrostatic Potential & Capacitance
 * OPEN CHALKBOARD DESIGN WITH RICH SVG INTERACTIVE DIAGRAMS (NO CONTAINER BOXES):
 *  - 2-Charge System Potential Energy U = k q₁ q₂ / r
 *  - 3-Charge Triangle System (q₁, q₂, q₃) with Pair Distance Lines (r₁₂, r₂₃, r₁₃)
 *  - Electron Acceleration in 1V Potential Field (1 eV = 1.6 × 10⁻¹⁹ J)
 *  - Zero card box containers (<rect fill={CREAM}> removed completely)
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

export default function P12Ch02Sec4({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  // Electron acceleration trajectory animation
  const eVPos = (currentTime * 1.2) % 1;
  const ex = 80 + eVPos * 300;

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Formula Toolkit: Potential Energy Superposition & 1 eV Unit", "Formula Toolkit: Potential Energy Superposition & 1 eV Unit")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: 2-CHARGE & 3-CHARGE SYSTEM DIAGRAMS */}
      <g transform="translate(40, 85)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("SYSTEM POTENTIAL ENERGY U_total", "SYSTEM POTENTIAL ENERGY U_total")}
          </T>
        </Fade>

        {/* 3-Charge Triangle Configuration */}
        <Fade on={beat >= 2}>
          {/* Charge 1: q1 */}
          <circle cx={220} cy={90} r={20} fill="#ffe4e6" stroke={RED} strokeWidth={2} />
          <T x={220} y={96} size={16} fill={RED} weight={800}>+q₁</T>

          {/* Charge 2: q2 */}
          <circle cx={80} cy={290} r={20} fill="#dcfce7" stroke={GREEN} strokeWidth={2} />
          <T x={80} y={296} size={18} fill={GREEN} weight={800}>-q₂</T>

          {/* Charge 3: q3 */}
          <circle cx={360} cy={290} r={20} fill="#ffe4e6" stroke={RED} strokeWidth={2} />
          <T x={360} y={296} size={16} fill={RED} weight={800}>+q₃</T>

          {/* Distance Lines r12, r23, r13 */}
          <line x1="205" y1="105" x2="95" y2="275" stroke={AMBER_DARK} strokeWidth={2.5} strokeDasharray="5 5" />
          <T x={130} y={180} size={13} fill={AMBER_DARK} weight={800}>r₁₂</T>

          <line x1="100" y1="290" x2="340" y2="290" stroke={GREEN} strokeWidth={2.5} strokeDasharray="5 5" />
          <T x={220} y={310} size={13} fill={GREEN} weight={800}>r₂₃</T>

          <line x1="235" y1="105" x2="345" y2="275" stroke={RED} strokeWidth={2.5} strokeDasharray="5 5" />
          <T x={310} y={180} size={13} fill={RED} weight={800}>r₁₃</T>
        </Fade>

        {/* Free Floating System Formula (Spacious, No Box) */}
        <Fade on={beat >= 4}>
          <T x={220} y={365} anchor="middle" size={17} fill={GREEN} weight={800}>
            U_total = k [ (q₁q₂ / r₁₂) + (q₂q₃ / r₂₃) + (q₁q₃ / r₁₃) ]
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: WORK-ENERGY THEOREM & ELECTRON-VOLT CONVERSION */}
      <g transform="translate(540, 85)">
        <Badge n={2} cx={25} cy={25} on={beat >= 3} delay={dl(3, 0.2)} />
        <Fade on={beat >= 3} delay={dl(3, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("WORK-ENERGY THEOREM & ELECTRON-VOLT (eV)", "WORK-ENERGY THEOREM & ELECTRON-VOLT (eV)")}
          </T>
        </Fade>

        {/* Electron Accelerating Across 1V Plates */}
        <Fade on={beat >= 5}>
          <line x1="60" y1="90" x2="60" y2="270" stroke={RED} strokeWidth={3} />
          <T x={60} y={75} size={13} fill={RED} weight={800} anchor="middle">Plate A (0V)</T>

          <line x1="420" y1="90" x2="420" y2="270" stroke={GREEN} strokeWidth={3} />
          <T x={420} y={75} size={13} fill={GREEN} weight={800} anchor="middle">Plate B (1V)</T>

          {/* E-field Arrows */}
          <path d={arrowD(80, 130, 400, 130)} stroke={MUTED} strokeWidth={1.5} />
          <path d={arrowD(80, 230, 400, 230)} stroke={MUTED} strokeWidth={1.5} />

          {/* Accelerating Electron */}
          <circle cx={ex} cy={180} r={10} fill={GREEN} />
          <T x={ex} y={184} size={11} fill="#ffffff" weight={900}>e⁻</T>
          <T x={ex} y={160} size={12} fill={GREEN} weight={800}>K.E. = 1 eV</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 5}>
          <T x={240} y={325} anchor="middle" size={20} fill={GREEN} weight={800}>
            1 eV = 1.6 × 10⁻¹⁹ Joules
          </T>
          <T x={240} y={365} anchor="middle" size={16} fill={INK} weight={800}>
            W_ext = ΔU = q ΔV = q (V_B − V_A)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 470)">
        <Badge n={3} cx={25} cy={25} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("CBSE BOARD SPEED TRAP WARNING", "CBSE BOARD SPEED TRAP WARNING")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={500} y={30} anchor="middle" size={17} fill={AMBER_DARK} weight={800}>
            Always include proper charge sign (+ / -) in W = q (V_final − V_initial)!
          </T>
          <T x={500} y={65} anchor="middle" size={15} fill={INK} weight={700}>
            For electrons (q = -e), moving to higher potential (V_B &gt; V_A) decreases potential energy ΔU &lt; 0!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={570} w={880} h={42} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Toolkit Mastered: U = k q₁ q₂ / r  |  U_total = Σ k q_i q_j / r_ij  |  1 eV = 1.6 × 10⁻¹⁹ J! ✓",
            "★ Toolkit Mastered: U = k q₁ q₂ / r  |  U_total = Σ k q_i q_j / r_ij  |  1 eV = 1.6 × 10⁻¹⁹ J! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
