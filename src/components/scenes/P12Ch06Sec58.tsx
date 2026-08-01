"use client";

/**
 * P12Ch06 · Section 58 — "The four pitfalls of generators and field energy"
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

export default function P12Ch06Sec58({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Subtopic Four Pitfalls & Generator Formula Summary", "Subtopic Four Pitfalls aur Generator Formula Summary")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 3: f vs omega & Average Power Traps */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("TRAP 1 & 2: ALWAYS USE ω = 2πf & AVERAGE POWER FACTOR 1/2", "TRAP 1 & 2: ALWAYS USE ω = 2πf & AVERAGE POWER FACTOR 1/2")}
        </T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 5}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={14} fill={INK} weight={800}>
            Frequency in rpm or Hz MUST be converted to ω = 2πf!
          </T>
          <T x={225} y={52} anchor="middle" size={14} fill={AMBER_DARK} weight={700}>
            Average Power ⟨P⟩ = ½ ε₀ I₀ = ε_rms I_rms!
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 6: Energy Density Comparison */}
      <Badge n={2} cx={540} cy={140} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("TRAP 3 & 4: u_B = B² / (2 μ₀) VS u_E = (1/2) ε₀ E²", "TRAP 3 & 4: u_B = B² / (2 μ₀) VS u_E = (1/2) ε₀ E²")}
        </T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            u_B has μ₀ in DENOMINATOR: u_B = B² / (2 μ₀)
          </T>
          <T x={240} y={52} anchor="middle" size={15} fill={GREEN} weight={800}>
            u_E has ε₀ in NUMERATOR: u_E = (1/2) ε₀ E² !
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Subtopic 4 Summary */}
      <Badge n={3} cx={52} cy={340} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={74} y={345} size={14} fill={RED} weight={700} anchor="start">
          {t("SUBTOPIC 4 MASTERY SUMMARY", "SUBTOPIC 4 MASTERY SUMMARY")}
        </T>
      </Fade>
      <Fade on={beat >= 7}>
        <g transform="translate(60, 360)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            Mastered: AC Generator Peak & Instantaneous EMF ε(t) = NBAω sin(ωt), RMS values, Retarding Torque, and Magnetic Energy Density!
          </T>
        </g>
      </Fade>

      {/* Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={490} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Subtopic 4 Complete: AC Generators, Sinusoidal EMF, Retarding Torque & Energy Density (Sec 47 – 58)! ✓",
            "★ Subtopic 4 Complete: AC Generators, Sinusoidal EMF, Retarding Torque & Energy Density (Sec 47 – 58)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
