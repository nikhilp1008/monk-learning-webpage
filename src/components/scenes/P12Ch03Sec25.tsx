"use client";

/**
 * P12Ch02 · Section 25 — "Worked example: finding alpha from two readings"
 * Beats (en [0,10,18,28,34,45,54,67]): 8 beats
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

export default function P12Ch03Sec25({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("JEE Main Level: Finding Alpha from Two Readings", "JEE Main Level: Finding Alpha from Two Readings")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 230 70 C 440 66, 640 74, 850 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Given Values */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={60} y={120} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Coil: R₁ = 50 Ω at T₁ = 20°C,  R₂ = 60 Ω at T₂ = 120°C. Find α (ref 20°C).",
            "Coil: R₁ = 50 Ω at T₁ = 20°C,  R₂ = 60 Ω at T₂ = 120°C. Find α (ref 20°C)."
          )}
        </T>
      </Fade>

      {/* BEAT 3: Formula Setup */}
      <Badge n={1} cx={52} cy={160} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={74} y={165} size={14} fill={RED} weight={700} anchor="start">APPLY RATIO LAW</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 5}>
        <g transform="translate(60, 180)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={16} fill={INK} weight={800}>
            R₂ / R₁ = 1 + α (T₂ − T₁) = 1 + 100 α
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 6: Calculation */}
      <Badge n={2} cx={540} cy={160} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={165} size={14} fill={RED} weight={700} anchor="start">SOLVE FOR ALPHA</T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(540, 180)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={16} fill={INK} weight={800}>
            60 / 50 = 1.2 = 1 + 100 α
          </T>
          <T x={240} y={52} anchor="middle" size={16} fill={INK} weight={800}>
            α = 0.2 / 100 = 2.0 × 10⁻³ °C⁻¹
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Sanity check */}
      <Badge n={3} cx={52} cy={290} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={74} y={295} size={14} fill={RED} weight={700} anchor="start">SANITY ORDER-OF-MAGNITUDE</T>
      </Fade>
      <Fade on={beat >= 7}>
        <g transform="translate(60, 310)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Positive value of order ~10⁻³ °C⁻¹ confirms typical metal behavior! ✓",
              "Positive value ~10⁻³ °C⁻¹ metal behavior ko bilkul sahi confirm karti hai! ✓"
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 8: Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Result: α = 2.0×10⁻³ °C⁻¹. Straightforward 1-step solving with ratio R₂/R₁! ✓",
            "★ Result: α = 2.0×10⁻³ °C⁻¹. R₂/R₁ ratio se easy calculation! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
