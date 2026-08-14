"use client";

/**
 * P12Ch02 · Section 12 — "CBSE level: calculating resistance and current density"
 * Beats (en [0,8,18,29,41,53,65,77]): 8 beats
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

export default function P12Ch03Sec12({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("CBSE Level: Resistance & Current Density Numerical", "CBSE Level: Resistance & Current Density Numerical")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 230 70 C 440 66, 640 74, 850 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Problem Statement */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={60} y={120} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Wire: Length L = 2 m, Radius r = 1 mm, ρ = 1.7×10⁻⁸ Ω·m, Voltage V = 3.4 V.",
            "Wire: Length L = 2 m, Radius r = 1 mm, ρ = 1.7×10⁻⁸ Ω·m, Voltage V = 3.4 V."
          )}
        </T>
      </Fade>

      {/* BEAT 2: Step 1 - Area & Resistance */}
      <Badge n={1} cx={52} cy={160} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={74} y={165} size={14} fill={RED} weight={700} anchor="start">CALCULATE RESISTANCE (R)</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 4}>
        <g transform="translate(60, 180)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            A = π r² = 3.14 × (10⁻³)² = 3.14 × 10⁻⁶ m²
          </T>
          <T x={225} y={52} anchor="middle" size={15} fill={INK} weight={800}>
            R = (ρ L) / A = 0.0108 Ω
          </T>
        </g>
      </Fade>

      {/* BEAT 4: Step 2 - Current & Current Density */}
      <Badge n={2} cx={540} cy={160} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={562} y={165} size={14} fill={RED} weight={700} anchor="start">CURRENT & CURRENT DENSITY</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(540, 180)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            I = V / R = 3.4 / 0.0108 ≈ 315 A
          </T>
          <T x={240} y={52} anchor="middle" size={15} fill={INK} weight={800}>
            J = I / A = 1.0 × 10⁸ A/m²
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Microscopic check */}
      <Badge n={3} cx={52} cy={290} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={74} y={295} size={14} fill={RED} weight={700} anchor="start">CHECK VIA MICROSCOPIC FORM (J = E / ρ)</T>
      </Fade>
      <Fade on={beat >= 6} dim={beat >= 7}>
        <g transform="translate(60, 310)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={INK} weight={800}>
            E = V/L = 1.7 V/m  ⇒  J = E / ρ = 1.7 / (1.7×10⁻⁸) = 1.0 × 10⁸ A/m²  (Exact Match!)
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Both macroscopic (V/R) and microscopic (E/ρ) methods give identical J! ✓",
            "★ Macroscopic (V/R) aur microscopic (E/ρ) dono tarike exact same J dete hain! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
