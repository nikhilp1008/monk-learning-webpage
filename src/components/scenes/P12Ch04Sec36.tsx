"use client";

/**
 * P12Ch04 · Section 36 — "Key Formulas and the Electric-to-Magnetic Analogy"
 * Beats (en [0,1,2,4,6,8,10]): 7 beats
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

export default function P12Ch04Sec36({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Key Formulas: Dipole Fields, Energy & Bohr Magneton", "Key Formulas: Dipole Fields, Energy & Bohr Magneton")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 2: Torque, Energy & Rotation Work */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">TORQUE, POTENTIAL ENERGY & WORK FORMULAS</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 4}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            τ = m × B   |   U = −m · B = −mB cos θ
          </T>
          <T x={225} y={52} anchor="middle" size={14} fill={AMBER_DARK} weight={700}>
            (W = mB(cos θ₁ − cos θ₂))
          </T>
        </g>
      </Fade>

      {/* BEAT 4 & 6: Far Fields of Dipole (Axial vs Equatorial) */}
      <Badge n={2} cx={540} cy={140} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">FAR DIPOLE FIELDS & ELECTRIC ANALOGY</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 8}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            B_axial = (μ₀/4π)(2m / x³)   |   B_eq = (μ₀/4π)(m / x³)
          </T>
          <T x={240} y={52} anchor="middle" size={14} fill={GREEN} weight={800}>
            (Replace p → m, 1/4πε₀ → μ₀/4π for instant conversions!)
          </T>
        </g>
      </Fade>

      {/* BEAT 8 & 10: Revolving Electron & Bohr Magneton */}
      <Badge n={3} cx={52} cy={270} on={beat >= 8} delay={dl(8, 0.4)} />
      <Fade on={beat >= 8} delay={dl(8, 0.8)}>
        <T x={74} y={275} size={14} fill={RED} weight={700} anchor="start">GYROMAGNETIC RATIO & BOHR MAGNETON</T>
      </Fade>
      <Fade on={beat >= 8}>
        <g transform="translate(60, 290)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            μ_l/L = e / (2m) ≈ 8.8 × 10¹⁰ C kg⁻¹   |   Bohr Magneton μ_B = eh / (4πm) ≈ 9.27 × 10⁻²⁴ A m²!
          </T>
        </g>
      </Fade>

      {/* BEAT 10: Summary Chip */}
      <Fade on={beat >= 8}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Dipole fields B_ax = 2B_eq = (μ0/4π)(2m/x³); Gyromagnetic ratio e/2m & Bohr Magneton μ_B = eh/4πm! ✓",
            "★ Dipole fields B_ax = 2B_eq = (μ0/4π)(2m/x³); Gyromagnetic ratio e/2m & Bohr Magneton μ_B = eh/4πm! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
