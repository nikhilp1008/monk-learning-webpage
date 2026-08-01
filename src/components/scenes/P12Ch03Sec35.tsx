"use client";

/**
 * P12Ch02 · Section 35 — "Worked example: three resistors, series and parallel"
 * Beats (en [0,1,2,3,4,5,6,7]): 8 beats
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

export default function P12Ch03Sec35({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("CBSE Level: Three Resistors Two Ways (2 Ω, 3 Ω, 6 Ω)", "CBSE Level: Three Resistors Two Ways (2 Ω, 3 Ω, 6 Ω)")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Problem Statement */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={60} y={120} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Resistors: 2 Ω, 3 Ω, and 6 Ω. Find R_s (series) and R_p (parallel).",
            "Resistors: 2 Ω, 3 Ω, aur 6 Ω. R_s (series) aur R_p (parallel) nikaalein."
          )}
        </T>
      </Fade>

      {/* BEAT 2 & 3: Series Solution */}
      <Badge n={1} cx={52} cy={160} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={74} y={165} size={14} fill={RED} weight={700} anchor="start">SERIES CALCULATION</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 4}>
        <g transform="translate(60, 180)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={16} fill={INK} weight={800}>
            R_s = 2 + 3 + 6 = 11 Ω
          </T>
        </g>
      </Fade>

      {/* BEAT 4 & 5: Parallel Solution */}
      <Badge n={2} cx={540} cy={160} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={562} y={165} size={14} fill={RED} weight={700} anchor="start">PARALLEL CALCULATION</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(540, 180)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={16} fill={INK} weight={800}>
            1/R_p = 1/2 + 1/3 + 1/6 = (3+2+1)/6 = 6/6 = 1
          </T>
          <T x={240} y={52} anchor="middle" size={16} fill={GREEN} weight={800}>
            R_p = 1 Ω
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Sanity Direction Check */}
      <Badge n={3} cx={52} cy={290} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={74} y={295} size={14} fill={RED} weight={700} anchor="start">DIRECTIONAL CHECK</T>
      </Fade>
      <Fade on={beat >= 7}>
        <g transform="translate(60, 310)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "R_s = 11 Ω > 6 Ω (Largest); R_p = 1 Ω < 2 Ω (Smallest). Both bounds hold perfectly! ✓",
              "R_s = 11 Ω > 6 Ω (Sabse bada); R_p = 1 Ω < 2 Ω (Sabse chota). Bilkul sahi! ✓"
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 8: Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Result: R_s = 11 Ω and R_p = 1 Ω. Beautiful exact integer solutions! ✓",
            "★ Result: R_s = 11 Ω aur R_p = 1 Ω. Bilkul exact solutions! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
