"use client";

/**
 * P12Ch06 · Section 64 — "Master revision: the 12 core formulas of Electromagnetic Induction"
 * Subtopic: Advanced EMI, Maxwell & Chapter Synthesis
 */

import React from "react";
import {
  SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, ringD,
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

export default function P12Ch06Sec64({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Master Revision: The 12 Essential Formulas of EMI", "Master Revision: The 12 Essential Formulas of EMI")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 3: Formulas 1 to 6 */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("FORMULAS 1 - 6: FLUX, FARADAY, MOTIONAL & ROTATING EMF", "FORMULAS 1 - 6: FLUX, FARADAY, MOTIONAL & ROTATING EMF")}
        </T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 5}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={14} fill={INK} weight={800}>
            1. Φ = BA cosθ | 2. ε = −N dΦ/dt | 3. ΔQ = (N/R)ΔΦ
          </T>
          <T x={225} y={52} anchor="middle" size={14} fill={AMBER_DARK} weight={700}>
            4. ε = Blv | 5. P = B²l²v²/R | 6. ε_rot = ½ B ω L²
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 6: Formulas 7 to 12 */}
      <Badge n={2} cx={540} cy={140} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("FORMULAS 7 - 12: INDUCTANCE, ENERGY & GENERATORS", "FORMULAS 7 - 12: INDUCTANCE, ENERGY & GENERATORS")}
        </T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={14} fill={GREEN} weight={800}>
            7. L = μ₀N²A/l | 8. M = μ₀N₁N₂A_in/l | 9. U_B = ½ LI²
          </T>
          <T x={240} y={52} anchor="middle" size={14} fill={INK} weight={800}>
            10. u_B = B²/(2μ₀) | 11. ε₀ = NBAω | 12. I_d = ε₀(dΦ_E/dt)
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Full Chapter Formula Master Shield */}
      <Badge n={3} cx={52} cy={340} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={74} y={345} size={14} fill={RED} weight={700} anchor="start">
          {t("CHAPTER 6 COMPLETE FORMULA MASTER SHIELD", "CHAPTER 6 COMPLETE FORMULA MASTER SHIELD")}
        </T>
      </Fade>
      <Fade on={beat >= 7}>
        <g transform="translate(60, 360)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            All 12 Core EMI Formulas Mastered: Ready for CBSE, NEET, JEE Main, and JEE Advanced!
          </T>
        </g>
      </Fade>

      {/* Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={490} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Master Revision Complete: All 12 fundamental equations of Electromagnetic Induction summarized for quick review! ✓",
            "★ Master Revision Complete: All 12 fundamental equations of Electromagnetic Induction summarized for quick review! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
