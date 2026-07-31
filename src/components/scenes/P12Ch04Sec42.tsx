"use client";

/**
 * P12Ch04 · Section 42 — "Formula Recap: The Complete Toolkit"
 * Beats (en [0,1,4,7,11,13,16]): 7 beats
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

export default function P12Ch04Sec42({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Master Formula Toolkit: Moving Charges and Magnetism", "Master Formula Toolkit: Moving Charges and Magnetism")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1, 4 & 7: Biot-Savart, Ampere & Lorentz Forces */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">FIELDS & LORENTZ FORCE TOOLKIT</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 11}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={14} fill={INK} weight={800}>
            B_wire = μ₀I/2πa | B_sol = μ₀nI | r = mv/qB
          </T>
          <T x={225} y={52} anchor="middle" size={14} fill={AMBER_DARK} weight={700}>
            (F/L = μ₀I₁I₂/2πd; τ = m × B)
          </T>
        </g>
      </Fade>

      {/* BEAT 11, 13 & 16: Meters & Dipole Moments */}
      <Badge n={2} cx={540} cy={140} on={beat >= 11} delay={dl(11, 0.4)} />
      <Fade on={beat >= 11} delay={dl(11, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">METERS & DIPOLE TOOLKIT</T>
      </Fade>
      <Fade on={beat >= 11}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={14} fill={INK} weight={800}>
            S = Ig G/(I−Ig) | R = V/Ig − G
          </T>
          <T x={240} y={52} anchor="middle" size={15} fill={GREEN} weight={800}>
            m = NIA | B_ax = (μ₀/4π)(2m/x³) | μ_B = 9.27×10⁻²⁴ A m²
          </T>
        </g>
      </Fade>

      {/* BEAT 16: Universal Constant */}
      <Badge n={3} cx={52} cy={270} on={beat >= 16} delay={dl(16, 0.4)} />
      <Fade on={beat >= 16} delay={dl(16, 0.8)}>
        <T x={74} y={275} size={14} fill={RED} weight={700} anchor="start">THE UNIVERSAL CONSTANT</T>
      </Fade>
      <Fade on={beat >= 16}>
        <g transform="translate(60, 290)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            Permeability of free space μ₀ = 4π × 10⁻⁷ T m A⁻¹  ⇒  μ₀ / 4π = 10⁻⁷ T m A⁻¹!
          </T>
        </g>
      </Fade>

      {/* BEAT 16: Summary Chip */}
      <Fade on={beat >= 16}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Complete Chapter 4 Toolkit verified! Use μ0/4π = 10⁻⁷ T m A⁻¹ as your universal numerical constant! ✓",
            "★ Complete Chapter 4 Toolkit verified! Numericals mein μ0/4π = 10⁻⁷ T m A⁻¹ use karein! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
