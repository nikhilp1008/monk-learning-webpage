"use client";

/**
 * P12Ch02 · Section 18 — "Dipole torque and potential energy in a uniform field — formulas"
 * Beats (en [0,7,17,25,33,43,58,71]): 8 beats
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

export default function P12Ch02Sec18({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("dipole in a uniform field: torque & energy", "uniform field mein dipole: torque & energy")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 220 70 C 440 66, 640 74, 860 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Torque formula */}
      <Badge n={1} cx={52} cy={120} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 1)}>
        <T x={74} y={125} size={14} fill={RED} weight={700} anchor="start">TORQUE ON DIPOLE</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 5}>
        <g transform="translate(60, 140)">
          <rect x={0} y={5} width={480} height={55} rx={10} fill={CREAM} stroke={RED} strokeWidth={2.5} />
          <T x={240} y={40} anchor="middle" size={22} fill={RED} weight={800}>
            τ̄ = p̄ × Ē,    τ = pE sin θ
          </T>
        </g>
      </Fade>

      {/* BEAT 2: PE formula */}
      <Badge n={2} cx={560} cy={120} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 1)}>
        <T x={582} y={125} size={14} fill={RED} weight={700} anchor="start">POTENTIAL ENERGY</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 5}>
        <g transform="translate(560, 140)">
          <rect x={0} y={5} width={440} height={55} rx={10} fill={CREAM} stroke={RED} strokeWidth={2.5} />
          <T x={220} y={40} anchor="middle" size={22} fill={RED} weight={800}>
            U(θ) = −p̄ · Ē = −pE cos θ
          </T>
        </g>
      </Fade>

      {/* BEAT 3: θ definition */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={60} y={230} size={14} fill={INK} anchor="start" script>
          {t(
            "θ = angle between dipole moment p̄ and field Ē",
            "θ = dipole moment p̄ aur field Ē ke beech ka angle"
          )}
        </T>
      </Fade>

      {/* BEAT 4: Stable equilibrium */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <g transform="translate(60, 260)">
          <rect x={0} y={0} width={440} height={65} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={2} />
          <T x={220} y={22} anchor="middle" size={14} fill={GREEN} weight={700}>
            STABLE EQUILIBRIUM: θ = 0°
          </T>
          <T x={220} y={48} anchor="middle" size={18} fill={INK} weight={800}>
            U_min = −pE  (lowest energy!)
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Unstable equilibrium */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <g transform="translate(540, 260)">
          <rect x={0} y={0} width={440} height={65} rx={8} fill="#fef2f2" stroke={RED} strokeWidth={2} />
          <T x={220} y={22} anchor="middle" size={14} fill={RED} weight={700}>
            UNSTABLE EQUILIBRIUM: θ = 180°
          </T>
          <T x={220} y={48} anchor="middle" size={18} fill={INK} weight={800}>
            U_max = +pE  (highest energy!)
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Work formulas */}
      <Fade on={beat >= 6} delay={dl(6, 0.5)}>
        <g transform="translate(60, 360)">
          <rect x={0} y={5} width={500} height={55} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={250} y={28} anchor="middle" size={16} fill={INK} weight={800}>
            W_field = −ΔU,    W_ext = +ΔU
          </T>
          <T x={250} y={50} anchor="middle" size={13} fill={MUTED} script>
            {t("Same energy bookkeeping as linear motion!", "Linear motion jaisa hi energy bookkeeping!")}
          </T>
        </g>
      </Fade>

      {/* BEAT 7: eV note */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ 1 eV = 1.6 × 10⁻¹⁹ J — energy gained by 1e through 1V potential ✓",
            "★ 1 eV = 1.6 × 10⁻¹⁹ J — 1 electron ka 1V potential se energy gain ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
