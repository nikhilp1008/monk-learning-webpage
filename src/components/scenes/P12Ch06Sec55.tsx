"use client";

/**
 * P12Ch06 · Section 55 — "CBSE level: a commercial generator spinning at 50 Hz"
 * Subtopic: AC Generator & Energy Density
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

export default function P12Ch06Sec55({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("CBSE Level: 50 Hz Commercial AC Generator Calculation", "CBSE Level: 50 Hz Commercial AC Generator Calculation")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 3: Given & Peak EMF */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("STEP 1: ω = 2π(50) = 100π ⇒ ε₀ = N B A ω = 628.3 V", "STEP 1: ω = 2π(50) = 100π ⇒ ε₀ = N B A ω = 628.3 V")}
        </T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 5}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            Given: N = 100, A = 0.1 m², B = 0.2 T, f = 50 Hz
          </T>
          <T x={225} y={52} anchor="middle" size={14} fill={AMBER_DARK} weight={700}>
            ε₀ = 100 × 0.2 × 0.1 × (100π) = 200π = 628.3 V
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 6: Peak Current & Average Power */}
      <Badge n={2} cx={540} cy={140} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("STEP 2: I₀ = 31.4 A & AVERAGE POWER ⟨P⟩ = 9.87 kW", "STEP 2: I₀ = 31.4 A & AVERAGE POWER ⟨P⟩ = 9.87 kW")}
        </T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={16} fill={GREEN} weight={800}>
            I₀ = 628.3 V / 20 Ω = 31.4 A
          </T>
          <T x={240} y={52} anchor="middle" size={16} fill={INK} weight={800}>
            ⟨P⟩ = (1/2) × 628.3 × 31.4 = 9.87 kW
          </T>
        </g>
      </Fade>

      {/* BEAT 7: CBSE Step-by-Step Marking */}
      <Badge n={3} cx={52} cy={340} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={74} y={345} size={14} fill={RED} weight={700} anchor="start">
          {t("CBSE STEP-BY-STEP MARKING RECAP", "CBSE STEP-BY-STEP MARKING RECAP")}
        </T>
      </Fade>
      <Fade on={beat >= 7}>
        <g transform="translate(60, 360)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            1. ω = 100π rad/s (1 mark) → 2. ε₀ = 628.3 V (1 mark) → 3. I₀ = 31.4 A (1 mark) → 4. ⟨P⟩ = 9.87 kW (1 mark)!
          </T>
        </g>
      </Fade>

      {/* Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={490} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ CBSE Solution: Peak EMF ε₀ = 628.3 V, Peak Current I₀ = 31.4 A, and Average Power Output ⟨P⟩ = 9.87 kW! ✓",
            "★ CBSE Solution: Peak EMF ε₀ = 628.3 V, Peak Current I₀ = 31.4 A, aur Average Power Output ⟨P⟩ = 9.87 kW! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
