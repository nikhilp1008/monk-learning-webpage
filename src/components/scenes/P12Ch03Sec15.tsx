"use client";

/**
 * P12Ch02 · Section 15 — "Worked example: relaxation time and mobility"
 * Beats (en [0,10,24,32,40,52,67,77]): 8 beats
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

export default function P12Ch03Sec15({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("JEE Main Level: Relaxation time & mobility", "JEE Main Level: Relaxation time & mobility")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 230 70 C 440 66, 640 74, 850 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Given Values */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={60} y={120} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Copper: ρ = 1.7×10⁻⁸ Ω·m, n = 8.5×10²⁸ m⁻³, m = 9.1×10⁻³¹ kg, e = 1.6×10⁻¹⁹ C.",
            "Copper: ρ = 1.7×10⁻⁸ Ω·m, n = 8.5×10²⁸ m⁻³, m = 9.1×10⁻³¹ kg, e = 1.6×10⁻¹⁹ C."
          )}
        </T>
      </Fade>

      {/* BEAT 3: Formula for Relaxation Time */}
      <Badge n={1} cx={52} cy={160} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={74} y={165} size={14} fill={RED} weight={700} anchor="start">RELAXATION TIME (τ)</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 5}>
        <g transform="translate(60, 180)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={16} fill={INK} weight={800}>
            τ = m / (n e² ρ) ≈ 2.5 × 10⁻¹⁴ s
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Formula for Mobility */}
      <Badge n={2} cx={540} cy={160} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={562} y={165} size={14} fill={RED} weight={700} anchor="start">MOBILITY (μ)</T>
      </Fade>
      <Fade on={beat >= 6} dim={beat >= 7}>
        <g transform="translate(540, 180)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={35} anchor="middle" size={16} fill={INK} weight={800}>
            μ = (e τ) / m ≈ 4.3 × 10⁻³ m²/(V·s)
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Order-of-magnitude check: τ ~ 10⁻¹⁴ s, μ ~ 4×10⁻³ m²/(V·s). Passes for copper! ✓",
            "★ Order-of-magnitude check: τ ~ 10⁻¹⁴ s, μ ~ 4×10⁻³ m²/(V·s). Copper ke liye sahi hai! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
