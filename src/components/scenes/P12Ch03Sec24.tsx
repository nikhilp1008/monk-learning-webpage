"use client";

/**
 * P12Ch02 · Section 24 — "Worked example: resistance of a heated wire"
 * Beats (en [0,8,19,26,37,49,56,63]): 8 beats
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

export default function P12Ch03Sec24({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("NEET Speed Trap: A Heated Metal Wire", "NEET Speed Trap: A Heated Metal Wire")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 230 70 C 440 66, 640 74, 850 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Problem Statement */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={60} y={120} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Metal wire: R₀ = 100 Ω at 0°C, α = 4.0×10⁻³ °C⁻¹. Find R at T = 50°C.",
            "Metal wire: R₀ = 100 Ω at 0°C, α = 4.0×10⁻³ °C⁻¹. Find R at T = 50°C."
          )}
        </T>
      </Fade>

      {/* BEAT 3: The Trap */}
      <Badge n={1} cx={52} cy={160} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={74} y={165} size={14} fill={RED} weight={700} anchor="start">THE TRAP</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 4}>
        <g transform="translate(60, 180)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill="#fef2f2" stroke={RED} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={15} fill={RED} weight={800} script>
            {t(
              "WRONG: Reporting ΔR = 20 Ω (Forgetting to add R₀ = 100 Ω!)",
              "WRONG: ΔR = 20 Ω bolna (R₀ = 100 Ω add karna bhool jana!)"
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 4 & 5: Calculation */}
      <Badge n={2} cx={540} cy={160} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={562} y={165} size={14} fill={RED} weight={700} anchor="start">CORRECT CALCULATION</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(540, 180)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={16} fill={INK} weight={800}>
            R_T = R_0 [1 + α ΔT] = 100 [1 + (4×10⁻³)(50)]
          </T>
          <T x={240} y={52} anchor="middle" size={16} fill={INK} weight={800}>
            R_T = 100 [1 + 0.20] = 120 Ω
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Direction check */}
      <Badge n={3} cx={52} cy={290} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={74} y={295} size={14} fill={RED} weight={700} anchor="start">SANITY DIRECTION CHECK</T>
      </Fade>
      <Fade on={beat >= 7}>
        <g transform="translate(60, 310)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Metal wire heated ⇒ Resistance MUST increase above 100 Ω!",
              "Metal wire garam hone pe Resistance 100 Ω se UPAR hi aana chahiye!"
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 8: Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Result: R_T = 120 Ω. Always use R_T = R_0(1 + αΔT) to avoid missing R_0! ✓",
            "★ Result: R_T = 120 Ω. Hamesha R_T = R_0(1 + αΔT) use karein! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
