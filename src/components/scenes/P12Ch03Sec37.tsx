"use client";

/**
 * P12Ch02 · Section 37 — "Worked example: reduction with current division"
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

export default function P12Ch03Sec37({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("JEE Main: Network Reduction & Current Division", "JEE Main: Network Reduction & Current Division")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Circuit specification */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={60} y={120} size={13} fill={MUTED} anchor="start" script>
          {t(
            "12 V battery drives 2 Ω in series with (6 Ω || 3 Ω). Find total I and branch current I_3Ω.",
            "12 V battery drives 2 Ω in series with (6 Ω || 3 Ω). Total I aur branch current I_3Ω nikaalein."
          )}
        </T>
      </Fade>

      {/* BEAT 3 & 4: Network Reduction */}
      <Badge n={1} cx={52} cy={160} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={74} y={165} size={14} fill={RED} weight={700} anchor="start">REDUCE PARALLEL PAIR & TOTAL R</T>
      </Badge>
      <Fade on={beat >= 3} dim={beat >= 5}>
        <g transform="translate(60, 180)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={16} fill={INK} weight={800}>
            R_p = (6 × 3) / (6 + 3) = 2 Ω
          </T>
          <T x={225} y={52} anchor="middle" size={16} fill={INK} weight={800}>
            R_total = 2 + 2 = 4 Ω   ⇒   I_total = 12 / 4 = 3 A
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 6: Current Division */}
      <Badge n={2} cx={540} cy={160} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={165} size={14} fill={RED} weight={700} anchor="start">CURRENT DIVIDER AT PARALLEL PAIR</T>
      </Badge>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(540, 180)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={16} fill={INK} weight={800}>
            I_3Ω = 3 × [ 6 / (6 + 3) ] = 3 × (6 / 9) = 2 A
          </T>
          <T x={240} y={52} anchor="middle" size={14} fill={GREEN} weight={800}>
            (Check: I_6Ω = 1 A, sum = 2 + 1 = 3 A ✓)
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Result: Total I = 3 A, Branch Current I_3Ω = 2 A. Double-checked via Kirchhoff! ✓",
            "★ Result: Total I = 3 A, Branch Current I_3Ω = 2 A. Kirchhoff current sum से verified! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
