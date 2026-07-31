"use client";

/**
 * P12Ch02 · Section 5 — "When Ohm's law fails: non-linear and one-way devices"
 * Beats (en [0,11,12,13,14,25,39,52]): 8 beats
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

export default function P12Ch03Sec5({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("When Ohm's law fails: non-linear & one-way devices", "Jab Ohm's law fail hota hai: non-linear aur one-way devices")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 230 70 C 440 66, 640 74, 850 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 2: V-I Non-linear Graph (Filament Bulb) */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)} dim={beat >= 6}>
        <g transform="translate(80, 130)">
          <T x={150} y={0} size={15} fill={RED} weight={800}>1. Non-Linearity (Filament Bulb)</T>

          {/* Axes */}
          <Draw on={beat >= 1} delay={dl(1, 0.4)} d="M 30 180 L 260 180" stroke={INK} sw={2} />
          <Draw on={beat >= 1} delay={dl(1, 0.4)} d="M 30 180 L 30 20" stroke={INK} sw={2} />
          <T x={270} y={185} size={13} fill={INK} weight={700}>V</T>
          <T x={30} y={10} size={13} fill={INK} weight={700}>I</T>

          {/* Ohmic Straight Line */}
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 30 180 L 220 30" stroke={MUTED} sw={1.5} dash="4 3" />
          <T x={180} y={40} size={12} fill={MUTED} weight={700}>Ohmic (Straight)</T>

          {/* Filament Lamp Bending Curve */}
          <Draw on={beat >= 2} delay={dl(2, 0.4)} d="M 30 180 Q 150 70 240 60" stroke={RED} sw={2.5} />
          <T x={200} y={80} size={12} fill={RED} weight={800}>Filament (Heats up)</T>
        </g>
      </Fade>

      {/* BEAT 4 & 5: Diode V-I Characteristics */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)} dim={beat >= 6}>
        <g transform="translate(560, 130)">
          <T x={200} y={-20} size={15} fill={RED} weight={800}>2. Direction Dependent (Diode)</T>

          {/* Axes centered */}
          <Draw on={beat >= 4} delay={dl(4, 0.4)} d="M 40 100 L 360 100" stroke={INK} sw={2} />
          <Draw on={beat >= 4} delay={dl(4, 0.4)} d="M 200 190 L 200 10" stroke={INK} sw={2} />
          <T x={370} y={105} size={13} fill={INK} weight={700}>+V</T>
          <T x={30} y={105} size={13} fill={INK} weight={700}>-V</T>
          <T x={205} y={10} size={13} fill={INK} weight={700}>+I</T>

          {/* Forward Bias Curve */}
          <Draw on={beat >= 5} delay={dl(5, 0.4)} d="M 200 100 L 260 100 Q 300 95 320 20" stroke={GREEN} sw={2.5} />
          <T x={290} y={40} size={12} fill={GREEN} weight={800}>Forward Bias</T>

          {/* Reverse Bias Line */}
          <Draw on={beat >= 5} delay={dl(5, 0.4)} d="M 200 100 L 60 102" stroke={RED} sw={2} />
          <T x={100} y={125} size={12} fill={RED} weight={800}>Reverse Bias (Blocked)</T>
        </g>
      </Fade>

      {/* BEAT 6: Explanation */}
      <Badge n={1} cx={52} cy={370} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={74} y={375} size={14} fill={RED} weight={700} anchor="start">WHY OHM'S LAW FAILS</T>
      </Fade>
      <Fade on={beat >= 6} dim={beat >= 7}>
        <g transform="translate(60, 390)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Heating reduces relaxation time τ, increasing R. Diodes act as one-way valves!",
              "Garmi se relaxation time τ ghatta hai aur R badhta hai. Diodes one-way valve ki tarah kaam karte hain!"
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Ohm's law is NOT a universal law! Non-Ohmic: Filament lamps, Diodes, Transistors. ✓",
            "★ Ohm's law universal law NAHI hai! Non-Ohmic: Filament lamps, Diodes, Transistors. ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
