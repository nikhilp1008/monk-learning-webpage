"use client";

/**
 * P12Ch02 · Section 59 — "Worked example: current and terminal voltage of a loaded cell"
 * Beats (en [0,1,3,4,5,6,7]): 7 beats
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

export default function P12Ch03Sec59({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("CBSE Level: Current & Terminal Voltage of Loaded Cell", "CBSE Level: Current & Terminal Voltage of Loaded Cell")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Problem Statement */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={60} y={120} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Cell (E = 12 V, r = 0.5 Ω) connected to load R = 5.5 Ω. Find current I and terminal voltage V.",
            "Cell (E = 12 V, r = 0.5 Ω) load R = 5.5 Ω se juda hai. Current I aur terminal voltage V nikaalein."
          )}
        </T>
      </Fade>

      {/* BEAT 3: Calculate Current I */}
      <Badge n={1} cx={52} cy={160} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={74} y={165} size={14} fill={RED} weight={700} anchor="start">CURRENT I = E / (R + r)</T>
      </Badge>
      <Fade on={beat >= 3} dim={beat >= 4}>
        <g transform="translate(60, 180)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={16} fill={INK} weight={800}>
            I = 12 / (5.5 + 0.5) = 12 / 6 = 2 A
          </T>
        </g>
      </Fade>

      {/* BEAT 4: Calculate Terminal Voltage V */}
      <Badge n={2} cx={540} cy={160} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={562} y={165} size={14} fill={RED} weight={700} anchor="start">TERMINAL VOLTAGE V = E - Ir</T>
      </Badge>
      <Fade on={beat >= 4} dim={beat >= 5}>
        <g transform="translate(540, 180)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={35} anchor="middle" size={16} fill={INK} weight={800}>
            V = 12 − (2)(0.5) = 12 − 1 = 11 V
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 6: Cross-check V = IR */}
      <Badge n={3} cx={52} cy={290} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={74} y={295} size={14} fill={RED} weight={700} anchor="start">CROSS-CHECK VIA V = IR</T>
      </Badge>
      <Fade on={beat >= 5}>
        <g transform="translate(60, 310)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            V = I R = 2 × 5.5 = 11 V  (Matches V = E - Ir perfectly! ✓)
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Summary Chip */}
      <Fade on={beat >= 6}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Result: Current I = 2 A, Terminal Voltage V = 11 V. Sags by 1 V internal drop! ✓",
            "★ Result: Current I = 2 A, Terminal Voltage V = 11 V. Internal drop 1 V se kam hua! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
