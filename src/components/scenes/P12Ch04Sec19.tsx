"use client";

/**
 * P12Ch04 · Section 19 — "Key Formulas and Definitions"
 * Beats (en [0,1,2,5,8,11,13,14]): 8 beats
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

export default function P12Ch04Sec19({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Key Formulas: Lorentz Force, Cyclotron & Torque", "Key Formulas: Lorentz Force, Cyclotron & Torque")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 2: Lorentz Force & Velocity Selector */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">LORENTZ FORCE & VELOCITY SELECTOR</T>
      </Badge>
      <Fade on={beat >= 1} dim={beat >= 5}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            \vec{F} = q (\vec{E} + \vec{v} \times \vec{B})   [Selector v = E/B]
          </T>
          <T x={225} y={52} anchor="middle" size={14} fill={AMBER_DARK} weight={700}>
            (Electric does work, Magnetic steers without work!)
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 8: Cyclotron Motion & Energy */}
      <Badge n={2} cx={540} cy={140} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">CYCLOTRON MOTION & MAX ENERGY</T>
      </Badge>
      <Fade on={beat >= 5} dim={beat >= 11}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            r = mv / (qB)   |   T = 2πm / (qB)  (Speed independent!)
          </T>
          <T x={240} y={52} anchor="middle" size={15} fill={GREEN} weight={800}>
            K_max = (q² B² R²) / (2m)
          </T>
        </g>
      </Fade>

      {/* BEAT 11, 13 & 14: Conductor Force & Torque */}
      <Badge n={3} cx={52} cy={270} on={beat >= 11} delay={dl(11, 0.4)} />
      <Fade on={beat >= 11} delay={dl(11, 0.8)}>
        <T x={74} y={275} size={14} fill={RED} weight={700} anchor="start">WIRE FORCE & LOOP TORQUE FORMULAS</T>
      </Badge>
      <Fade on={beat >= 11}>
        <g transform="translate(60, 290)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            F/L = μ₀I₁I₂ / (2πd)   |   \boldsymbol{\tau} = \vec{m} \times \vec{B}   (m = N I A,  τ = N I A B sin θ)
          </T>
        </g>
      </Fade>

      {/* BEAT 14: Summary Chip */}
      <Fade on={beat >= 11}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Master formulas: r = mv/qB | T = 2πm/qB | K_max = q²B²R²/2m | τ = NIAB sin θ! ✓",
            "★ Master formulas: r = mv/qB | T = 2πm/qB | K_max = q²B²R²/2m | τ = NIAB sin θ! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
