"use client";

/**
 * P12Ch06 · Section 63 — "Integrated problem: AC generator driving an inductive load"
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

export default function P12Ch06Sec63({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Integrated Problem: AC Generator Driving Inductive Load (Wattless Current)", "Integrated Problem: AC Generator Driving Inductive Load (Wattless Current)")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 3: Current Lags Voltage by 90° */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("STEP 1: CURRENT I(t) = I₀ sin(ωt − 90°) LAGS VOLTAGE BY 90°", "STEP 1: CURRENT I(t) = I₀ sin(ωt − 90°) LAGS VOLTAGE BY 90°")}
        </T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 5}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            I(t) = − (ε₀ / ωL) cos(ωt) = I₀ sin(ωt − π/2)
          </T>
          <T x={225} y={52} anchor="middle" size={14} fill={AMBER_DARK} weight={700}>
            Inductive Reactance X_L = ω L (in Ohms Ω)!
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 6: Zero Average Power (Wattless Current) */}
      <Badge n={2} cx={540} cy={140} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("STEP 2: AVERAGE POWER ⟨P⟩ = 0 (WATTLESS CURRENT!)", "STEP 2: AVERAGE POWER ⟨P⟩ = 0 (WATTLESS CURRENT!)")}
        </T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={16} fill={GREEN} weight={800}>
            P(t) = − (1/2) ε₀ I₀ sin(2ωt)
          </T>
          <T x={240} y={52} anchor="middle" size={16} fill={INK} weight={800}>
            ⟨P⟩ = 0 (Zero net energy consumed over full cycle!)
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Bridge to Chapter 7 AC Circuits */}
      <Badge n={3} cx={52} cy={340} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={74} y={345} size={14} fill={RED} weight={700} anchor="start">
          {t("BRIDGE TO CHAPTER 7 (ALTERNATING CURRENT)", "BRIDGE TO CHAPTER 7 (ALTERNATING CURRENT)")}
        </T>
      </Fade>
      <Fade on={beat >= 7}>
        <g transform="translate(60, 360)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            This key result (I_rms = V_rms / X_L with 90° phase lag and zero average power) bridges Chapter 6 EMI directly to Chapter 7 AC Circuits!
          </T>
        </g>
      </Fade>

      {/* Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={490} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Pure Inductive AC Load: Current lags voltage by 90° (I₀ = ε₀ / ωL) resulting in ZERO net average power ⟨P⟩ = 0 (Wattless Current)! ✓",
            "★ Pure Inductive AC Load: Current lags voltage by 90° (I₀ = ε₀ / ωL) giving ZERO net average power ⟨P⟩ = 0 (Wattless Current)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
