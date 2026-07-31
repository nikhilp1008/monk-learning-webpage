"use client";

/**
 * P12Ch02 · Section 42 — "Why a battery cannot deliver unlimited power"
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

export default function P12Ch03Sec42({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Maximum Power Transfer Theorem & Battery Limits", "Maximum Power Transfer Theorem & Battery Limits")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 3: Load Power Formula */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">LOAD POWER FORMULA</T>
      </Badge>
      <Fade on={beat >= 1} dim={beat >= 4}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={16} fill={INK} weight={800}>
            P_load = E² R / (R + r)²
          </T>
        </g>
      </Fade>

      {/* BEAT 4 & 5: Matching Condition R = r */}
      <Badge n={2} cx={540} cy={140} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">MATCHING CONDITION (R = r)</T>
      </Badge>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={16} fill={INK} weight={800}>
            Peak Power when R = r
          </T>
          <T x={240} y={52} anchor="middle" size={18} fill={GREEN} weight={800}>
            P_max = E² / (4 r)
          </T>
        </g>
      </Fade>

      {/* BEAT 6: 50% Efficiency Warning */}
      <Badge n={3} cx={52} cy={270} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={74} y={275} size={14} fill={RED} weight={700} anchor="start">50% EFFICIENCY PENALTY</T>
      </Fade>
      <Fade on={beat >= 6}>
        <g transform="translate(60, 290)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill="#fef2f2" stroke={RED} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={15} fill={RED} weight={800} script>
            {t(
              "At R = r, Efficiency = 50%! Exactly half the total power is wasted inside internal resistance r.",
              "R = r par Efficiency = 50%! Aadhi total power internal resistance r mein hi waste ho jaati hai."
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Summary Chip */}
      <Fade on={beat >= 6}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Result: P_max = E²/(4r) occurs at R = r. Deliberately inefficient (50%)! ✓",
            "★ Result: P_max = E²/(4r) R = r par milta hai. 50% Efficiency par! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
