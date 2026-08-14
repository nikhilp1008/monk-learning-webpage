"use client";

/**
 * P12Ch04 · Section 28 — "Key Formulas and Definitions"
 * Beats (en [0,2,3,5,7,9,11,12]): 8 beats
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

export default function P12Ch04Sec28({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Key Formulas: Ammeter & Voltmeter Conversions", "Key Formulas: Ammeter & Voltmeter Conversions")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 2 & 3: Figure of Merit & Sensitivities */}
      <Badge n={1} cx={52} cy={140} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">FIGURE OF MERIT & SENSITIVITIES</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 5}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            S_I = NAB/k   |   S_V = S_I / G
          </T>
          <T x={225} y={52} anchor="middle" size={14} fill={AMBER_DARK} weight={700}>
            (Figure of merit K = 1/S_I = k / (NAB) [Current per division])
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 7: Ammeter Conversion Formula */}
      <Badge n={2} cx={540} cy={140} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">AMMETER SHUNT FORMULA</T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 9}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={16} fill={INK} weight={800}>
            S = (I_g G) / (I − I_g) = G / (n − 1)
          </T>
          <T x={240} y={52} anchor="middle" size={14} fill={GREEN} weight={800}>
            (Effective R_A = GS/(G+S) → 0)
          </T>
        </g>
      </Fade>

      {/* BEAT 9, 11 & 12: Voltmeter Multiplier Formula */}
      <Badge n={3} cx={52} cy={270} on={beat >= 9} delay={dl(9, 0.4)} />
      <Fade on={beat >= 9} delay={dl(9, 0.8)}>
        <T x={74} y={275} size={14} fill={RED} weight={700} anchor="start">VOLTMETER MULTIPLIER FORMULA</T>
      </Fade>
      <Fade on={beat >= 9}>
        <g transform="translate(60, 290)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            R = (V / I_g) − G   ⇒   Effective R_V = G + R = V / I_g  (Ideal R_V → ∞!)
          </T>
        </g>
      </Fade>

      {/* BEAT 12: Summary Chip */}
      <Fade on={beat >= 9}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Shunt S = Ig G / (I - Ig) for Ammeter | Multiplier R = V/Ig - G for Voltmeter! ✓",
            "★ Shunt S = Ig G / (I - Ig) Ammeter ke liye | Multiplier R = V/Ig - G Voltmeter ke liye! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
