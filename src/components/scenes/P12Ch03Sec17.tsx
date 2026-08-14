"use client";

/**
 * P12Ch02 · Section 17 — "Pitfalls and pro-tips for current and drift velocity"
 * Beats (en [0,7,18,27,42,49,62,76]): 8 beats
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

export default function P12Ch03Sec17({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Pitfalls & Pro-Tips: Current & Drift Velocity", "Pitfalls & Pro-Tips: Current & Drift Velocity")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 230 70 C 440 66, 640 74, 850 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Pitfall 1 - I vs J */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">CURRENT vs CURRENT DENSITY</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 3}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Current I is SCALAR (A); Current Density J is VECTOR (A/m²).",
              "Current I SCALAR hai (A); Current Density J VECTOR hai (A/m²)."
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 3: Pitfall 2 - Drift vs Signal */}
      <Badge n={2} cx={540} cy={140} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">DRIFT SPEED vs SIGNAL SPEED</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 5}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={35} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Never confuse v_d (~10⁻⁴ m/s) with E-field signal (~c)!",
              "v_d (~10⁻⁴ m/s) ko E-field signal (~c) se kabhi confuse mat karna!"
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Unit conversion & Stretching */}
      <Badge n={3} cx={52} cy={270} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={74} y={275} size={14} fill={RED} weight={700} anchor="start">STRETCHING & UNIT CONVERSIONS</T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(60, 290)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "1 mm² = 10⁻⁶ m² | Stretch Rule: R ∝ L² at constant volume | ρ is constant!",
              "1 mm² = 10⁻⁶ m² | Stretch Rule: R ∝ L² constant volume pe | ρ constant rehta hai!"
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Sanity Checks: v_d ~ 10⁻⁴ m/s, τ ~ 10⁻¹⁴ s. R changes on stretching, ρ does not! ✓",
            "★ Sanity Checks: v_d ~ 10⁻⁴ m/s, τ ~ 10⁻¹⁴ s. Stretch karne pe R badalta hai, ρ nahi! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
