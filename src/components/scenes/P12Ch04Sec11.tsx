"use client";

/**
 * P12Ch04 · Section 11 — "Key Formulas and Definitions"
 * Beats (en [0,7,8,9,10]): 5 beats
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

export default function P12Ch04Sec11({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Key Formulas: Solenoid, Toroid & Thick Conductors", "Key Formulas: Solenoid, Toroid & Thick Conductors")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 7: Solenoid & Toroid Formulas */}
      <Badge n={1} cx={52} cy={140} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">IDEAL SOLENOID & TOROID FIELD FORMULAS</T>
      </Fade>
      <Fade on={beat >= 7} dim={beat >= 8}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            Solenoid (Inside): B = μ₀ n I   [n = N/L, Outside = 0]
          </T>
          <T x={225} y={52} anchor="middle" size={15} fill={GREEN} weight={800}>
            Toroid (Inside): B = (μ₀ N I) / (2πr)
          </T>
        </g>
      </Fade>

      {/* BEAT 8 & 9: Solenoid Edge & Thick Wire Results */}
      <Badge n={2} cx={540} cy={140} on={beat >= 8} delay={dl(8, 0.4)} />
      <Fade on={beat >= 8} delay={dl(8, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">SOLENOID END FIELD & THICK WIRE</T>
      </Fade>
      <Fade on={beat >= 8} dim={beat >= 10}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            Solenoid End: B_end = ½ μ₀ n I
          </T>
          <T x={240} y={52} anchor="middle" size={14} fill={GREEN} weight={800}>
            Thick Wire: Inside B = (μ₀ I r)/(2πR²) | Outside B = μ₀ I/(2πr)
          </T>
        </g>
      </Fade>

      {/* BEAT 10: Biot-Savart & Ampere Consistency */}
      <Badge n={3} cx={52} cy={270} on={beat >= 10} delay={dl(10, 0.4)} />
      <Fade on={beat >= 10} delay={dl(10, 0.8)}>
        <T x={74} y={275} size={14} fill={RED} weight={700} anchor="start">BIOT-SAVART & AMPERE CONSISTENCY</T>
      </Fade>
      <Fade on={beat >= 10}>
        <g transform="translate(60, 290)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            Ampere's law B = μ0 I / (2πa) matches Biot-Savart infinite-wire limit exactly! ✓
          </T>
        </g>
      </Fade>

      {/* BEAT 10: Summary Chip */}
      <Fade on={beat >= 10}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Solenoid B = μ0nI | Toroid B = μ0NI/2πr | End B = ½μ0nI | Thick wire B_in ∝ r, B_out ∝ 1/r! ✓",
            "★ Solenoid B = μ0nI | Toroid B = μ0NI/2πr | End B = ½μ0nI | Thick wire B_in ∝ r, B_out ∝ 1/r! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
