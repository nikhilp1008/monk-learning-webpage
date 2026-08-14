"use client";

/**
 * P12Ch06 · Section 44 — "JEE Main level: coaxial solenoids, switched off"
 * Subtopic: Inductance (Self & Mutual)
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

export default function P12Ch06Sec44({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("JEE Main: Switched-Off Coaxial Solenoids Induced Secondary EMF", "JEE Main: Switched-Off Coaxial Solenoids Induced Secondary EMF")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 3: Mutual Inductance Calculation */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("STEP 1: MUTUAL INDUCTANCE M = μ₀ N₁ N₂ π r_in² / l", "STEP 1: MUTUAL INDUCTANCE M = μ₀ N₁ N₂ π r_in² / l")}
        </T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 5}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            Given: N₁=1000, N₂=500, r₁=0.02m, l=0.4m
          </T>
          <T x={225} y={52} anchor="middle" size={14} fill={AMBER_DARK} weight={700}>
            M = (4π×10⁻⁷ × 1000 × 500 × π(0.02)²) / 0.4 = 1.97 mH
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 6: Induced Secondary EMF */}
      <Badge n={2} cx={540} cy={140} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("STEP 2: INDUCED SECONDARY EMF ε₂ = M (ΔI / Δt)", "STEP 2: INDUCED SECONDARY EMF ε₂ = M (ΔI / Δt)")}
        </T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={16} fill={GREEN} weight={800}>
            ε₂ = (1.97 × 10⁻³ H) × (4 A / 0.02 s)
          </T>
          <T x={240} y={52} anchor="middle" size={16} fill={INK} weight={800}>
            ε₂ = 0.395 V
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Master Exam Formula */}
      <Badge n={3} cx={52} cy={340} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={74} y={345} size={14} fill={RED} weight={700} anchor="start">
          {t("JEE MAIN MASTER RECAP", "JEE MAIN MASTER RECAP")}
        </T>
      </Fade>
      <Fade on={beat >= 7}>
        <g transform="translate(60, 360)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            Mutual Inductance M = 1.97 mH and Secondary Induced EMF ε₂ = 0.395 V!
          </T>
        </g>
      </Fade>

      {/* Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={490} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ JEE Main Result: Coaxial solenoids Mutual Inductance M = 1.97 mH and Secondary EMF ε₂ = 0.395 V! ✓",
            "★ JEE Main Result: Coaxial solenoids Mutual Inductance M = 1.97 mH aur Secondary EMF ε₂ = 0.395 V! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
