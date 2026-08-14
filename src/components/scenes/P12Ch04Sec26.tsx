"use client";

/**
 * P12Ch04 · Section 26 — "Concept Intuition: Why a Raw Galvanometer Is Almost Useless"
 * Beats (en [0,1,2,3,4,5,7]): 7 beats
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

export default function P12Ch04Sec26({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Subtopic Four: Why a Raw Galvanometer Cannot Be Used Directly", "Subtopic Four: Why a Raw Galvanometer Cannot Be Used Directly")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 2: Linear Deflection Formula */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">GALVANOMETER LINEAR DEFLECTION</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 3}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={18} fill={INK} weight={800}>
            φ = ((NAB)/(k)) I   [Linear Scale]
          </T>
        </g>
      </Fade>

      {/* BEAT 3 & 4: Two Major Problems */}
      <Badge n={2} cx={540} cy={140} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">THE TWO LIMITING PROBLEMS</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 5}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={14} fill={INK} weight={800}>
            1. Hypersensitive (FSD at μA – mA; large I destroys coil!)
          </T>
          <T x={240} y={52} anchor="middle" size={14} fill={GREEN} weight={800}>
            2. High Coil Resistance G alters circuit current being measured!
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 7: The Solution (Resistor Conversions) */}
      <Badge n={3} cx={52} cy={270} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={74} y={275} size={14} fill={RED} weight={700} anchor="start">THE ENGINEERING SOLUTION: SINGLE RESISTOR CONVERSIONS</T>
      </Fade>
      <Fade on={beat >= 5}>
        <g transform="translate(60, 290)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            Ammeter: Low Shunt S in parallel | Voltmeter: High Multiplier R in series!
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Summary Chip */}
      <Fade on={beat >= 5}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Raw galvanometer is too delicate and intrusive; convert using parallel Shunt S or series Multiplier R! ✓",
            "★ Raw galvanometer delicate aur intrusive hai; parallel Shunt S ya series Multiplier R se convert karein! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
