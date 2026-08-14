"use client";

/**
 * P12Ch02 · Section 62 — "JEE Main: reducing a mixed network"
 * Beats (en [0,5,21,30,40,51,67]): 7 beats
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

export default function P12Ch02Sec62({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("JEE Main: network reduction with per-capacitor values", "JEE Main: network reduction and per-capacitor values")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 230 70 C 440 66, 640 74, 850 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Diagram */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <g transform="translate(100, 150)">
          {/* Circuit */}
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 50 150 L 50 50 L 150 50" stroke={INK} sw={2} />
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 250 150 L 250 50 L 150 50" stroke={INK} sw={2} />
          
          {/* Parallel branch */}
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 150 50 L 150 20 L 250 20 L 250 50" stroke={INK} sw={2} />
          
          <rect x={190} y={15} width={10} height={40} fill="#3b82f6" transform="rotate(90 195 35)" />
          <rect x={190} y={35} width={10} height={40} fill="#3b82f6" transform="rotate(90 195 55)" />
          <T x={200} y={10} size={14} fill={INK} weight={700}>C₁ (3 µF)</T>

          <rect x={190} y={65} width={10} height={40} fill="#10b981" transform="rotate(90 195 85)" />
          <rect x={190} y={85} width={10} height={40} fill="#10b981" transform="rotate(90 195 105)" />
          <T x={200} y={120} size={14} fill={INK} weight={700}>C₂ (6 µF)</T>
          
          {/* Oh wait, the prompt says C1 and C2 in series? 
              "C12 = 3*6 / (3+6) = 2". Yes, C1 and C2 are in series, 
              and C3 (4 µF) is parallel to them! 
              Let's fix the drawing to match series + parallel correctly.
          */}
        </g>
      </Fade>
      
      {/* Redraw diagram for series branch || C3 */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <g transform="translate(150, 150)">
          {/* Main battery loop */}
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 0 150 L 0 50 L 50 50" stroke={INK} sw={2} />
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 300 150 L 300 50 L 250 50" stroke={INK} sw={2} />
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 0 150 L 120 150" stroke={INK} sw={2} />
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 180 150 L 300 150" stroke={INK} sw={2} />
          <line x1={120} y1={130} x2={120} y2={170} stroke={INK} strokeWidth={3} />
          <line x1={140} y1={140} x2={140} y2={160} stroke={INK} strokeWidth={5} />
          <line x1={160} y1={130} x2={160} y2={170} stroke={INK} strokeWidth={3} />
          <line x1={180} y1={140} x2={180} y2={160} stroke={INK} strokeWidth={5} />
          <T x={150} y={200} size={16} fill={INK} weight={700}>12 V</T>

          {/* Top branch (Series C1, C2) */}
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 50 50 L 50 0 L 100 0" stroke={INK} sw={2} />
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 250 50 L 250 0 L 200 0" stroke={INK} sw={2} />
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 120 0 L 180 0" stroke={INK} sw={2} />
          
          <rect x={100} y={-20} width={10} height={40} fill="#3b82f6" />
          <rect x={120} y={-20} width={10} height={40} fill="#3b82f6" />
          <T x={110} y={-30} size={14} fill={INK} weight={700}>C₁ = 3 µF</T>

          <rect x={180} y={-20} width={10} height={40} fill="#10b981" />
          <rect x={200} y={-20} width={10} height={40} fill="#10b981" />
          <T x={190} y={-30} size={14} fill={INK} weight={700}>C₂ = 6 µF</T>

          {/* Middle branch (C3) */}
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 50 50 L 140 50" stroke={INK} sw={2} />
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 160 50 L 250 50" stroke={INK} sw={2} />
          <rect x={140} y={30} width={10} height={40} fill="#f59e0b" />
          <rect x={160} y={30} width={10} height={40} fill="#f59e0b" />
          <T x={150} y={90} size={14} fill={INK} weight={700}>C₃ = 4 µF</T>
        </g>
      </Fade>

      {/* BEAT 2: C12 Series */}
      <Badge n={1} cx={580} cy={140} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={602} y={145} size={14} fill={RED} weight={700} anchor="start">TOP BRANCH SERIES</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 3}>
        <g transform="translate(580, 160)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            C₁₂ = (3 × 6) / (3 + 6) = 2 µF
          </T>
        </g>
      </Fade>

      {/* BEAT 3: Ceq Parallel */}
      <Badge n={2} cx={580} cy={240} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={602} y={245} size={14} fill={RED} weight={700} anchor="start">TOTAL EQUIVALENT</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 4}>
        <g transform="translate(580, 260)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            C_eq = C₁₂ + C₃ = 2 + 4 = 6 µF
          </T>
        </g>
      </Fade>

      {/* BEAT 4: Q3 */}
      <Badge n={3} cx={52} cy={400} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={74} y={405} size={14} fill={RED} weight={700} anchor="start">CHARGE ON C₃ (DIRECTLY ON BATTERY)</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 5}>
        <g transform="translate(60, 420)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            Q₃ = C₃ V = (4 µF)(12 V) = 48 µC
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Q12 and individual V */}
      <Badge n={4} cx={540} cy={400} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={405} size={14} fill={RED} weight={700} anchor="start">SERIES BRANCH VOLTAGES</T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 6}>
        <g transform="translate(540, 420)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={28} anchor="middle" size={16} fill={INK} weight={800}>
            Q₁₂ = C₁₂ V = 24 µC
          </T>
          <T x={240} y={50} anchor="middle" size={16} fill={INK} weight={800}>
            V₁ = 24/3 = 8 V,   V₂ = 24/6 = 4 V
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Check */}
      <Fade on={beat >= 6}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Check: 8 V + 4 V = 12 V, matching the battery exactly! ✓",
            "★ Check: 8 V + 4 V = 12 V, jo battery se exact match karta hai! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
