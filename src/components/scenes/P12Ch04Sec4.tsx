"use client";

/**
 * P12Ch04 · Section 4 — "Derivation A: Field on the Axis of a Circular Current Loop"
 * Beats (en [0,1,3,6,7,9,12,14]): 8 beats
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

export default function P12Ch04Sec4({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Board Derivation: On-Axis Field of a Circular Current Loop", "Board Derivation: On-Axis Field of a Circular Current Loop")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 3: Element Field dB */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">ELEMENT FIELD dB & TRANSVERSE CANCELLATION</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 7}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            dB = (μ₀ / 4π) (I dl) / (x² + R²)  [θ = 90°]
          </T>
          <T x={225} y={52} anchor="middle" size={13} fill={AMBER_DARK} weight={700}>
            (Transverse dB_⊥ components cancel by symmetry!)
          </T>
        </g>
      </Fade>

      {/* BEAT 7 & 9: Integration of Axial Components */}
      <Badge n={2} cx={540} cy={140} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">AXIAL COMPONENT INTEGRATION</T>
      </Fade>
      <Fade on={beat >= 7} dim={beat >= 12}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            dB_x = dB cos α = dB [R / √(x² + R²)]
          </T>
          <T x={240} y={52} anchor="middle" size={16} fill={GREEN} weight={800}>
            B = ∫ dB_x = μ₀ I R² / [2 (x² + R²)³/²]
          </T>
        </g>
      </Fade>

      {/* BEAT 12 & 14: Special Case at Centre */}
      <Badge n={3} cx={52} cy={270} on={beat >= 12} delay={dl(12, 0.4)} />
      <Fade on={beat >= 12} delay={dl(12, 0.8)}>
        <T x={74} y={275} size={14} fill={RED} weight={700} anchor="start">SPECIAL CASE: FIELD AT LOOP CENTRE (x = 0)</T>
      </Fade>
      <Fade on={beat >= 12}>
        <g transform="translate(60, 290)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={18} fill={GREEN} weight={800}>
            At Centre (x = 0): B_centre = μ₀ I / (2R)   [For N turns: B = N μ₀ I / (2R)]
          </T>
        </g>
      </Fade>

      {/* BEAT 14: Summary Chip */}
      <Fade on={beat >= 12}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Derived! B_axis = μ0 I R² / [2(x²+R²)³/²] and B_centre = μ0 I / (2R)! Essential 3-mark CBSE proof! ✓",
            "★ Derived! B_axis = μ0 I R² / [2(x²+R²)³/²] aur B_centre = μ0 I / (2R)! Essential 3-mark CBSE proof! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
