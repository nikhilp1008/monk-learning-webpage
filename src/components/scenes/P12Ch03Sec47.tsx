"use client";

/**
 * P12Ch02 · Section 47 — "Worked example: resistance and current of a rated bulb"
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

export default function P12Ch03Sec47({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("CBSE Level: Resistance & Current of a Rated Bulb (60W, 240V)", "CBSE Level: Resistance & Current of a Rated Bulb (60W, 240V)")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Problem Statement */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={60} y={120} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Bulb rated 60 W at 240 V. Find operating resistance R and operating current I.",
            "Bulb rated 60 W at 240 V. Operating resistance R aur operating current I nikaalein."
          )}
        </T>
      </Fade>

      {/* BEAT 2 & 3: Resistance Calculation */}
      <Badge n={1} cx={52} cy={160} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={74} y={165} size={14} fill={RED} weight={700} anchor="start">RESISTANCE R = V² / P</T>
      </Badge>
      <Fade on={beat >= 2} dim={beat >= 4}>
        <g transform="translate(60, 180)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={16} fill={INK} weight={800}>
            R = (240)² / 60 = 57600 / 60 = 960 Ω
          </T>
        </g>
      </Fade>

      {/* BEAT 4: Current Calculation */}
      <Badge n={2} cx={540} cy={160} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={562} y={165} size={14} fill={RED} weight={700} anchor="start">CURRENT I = P / V</T>
      </Badge>
      <Fade on={beat >= 4} dim={beat >= 5}>
        <g transform="translate(540, 180)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={35} anchor="middle" size={16} fill={INK} weight={800}>
            I = 60 / 240 = 0.25 A
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 6: Cross-check */}
      <Badge n={3} cx={52} cy={290} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={74} y={295} size={14} fill={RED} weight={700} anchor="start">CROSS-CHECK VIA I² R</T>
      </Badge>
      <Fade on={beat >= 5}>
        <g transform="translate(60, 310)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            I² R = (0.25)² × 960 = 0.0625 × 960 = 60 W  (Matches rated power perfectly! ✓)
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Summary Chip */}
      <Fade on={beat >= 6}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Result: R = 960 Ω, I = 0.25 A. Cross-checked and 100% consistent! ✓",
            "★ Result: R = 960 Ω, I = 0.25 A. Cross-check se 100% verified! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
