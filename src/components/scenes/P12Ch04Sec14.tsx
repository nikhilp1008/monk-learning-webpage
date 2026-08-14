"use client";

/**
 * P12Ch04 · Section 14 — "Worked Examples One and Two: Solenoid Numerical and the Thick-Wire Trap"
 * Beats (en [0,1,2,3,5,6,9,10,11]): 9 beats
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

export default function P12Ch04Sec14({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Worked Examples: Solenoid Field & NEET Thick-Wire Speed Trap", "Worked Examples: Solenoid Field & NEET Thick-Wire Speed Trap")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1, 2 & 3: CBSE Solenoid Example */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">CBSE LEVEL: SOLENOID FIELD NUMERICAL</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 5}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            n = N/L = 1500 / 0.50 = 3000 m⁻¹
          </T>
          <T x={225} y={52} anchor="middle" size={16} fill={GREEN} weight={800}>
            B = μ₀ n I = 1.5 × 10⁻² T = 15 mT
          </T>
        </g>
      </Fade>

      {/* BEAT 5, 6, 9 & 10: NEET Speed Trap: Thick Wire */}
      <Badge n={2} cx={540} cy={140} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">NEET SPEED TRAP: THICK WIRE (r = R/2 vs r = 2R)</T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 11}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={14} fill={INK} weight={800}>
            B_in(R/2) = (μ₀ I R/2)/(2πR²) = μ₀ I / (4πR)
          </T>
          <T x={240} y={52} anchor="middle" size={16} fill={GREEN} weight={800}>
            B_out(2R) = μ₀ I / (2π · 2R) = μ₀ I / (4πR)  [Ratio = 1.0!]
          </T>
        </g>
      </Fade>

      {/* BEAT 11: Summary Chip */}
      <Fade on={beat >= 11}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Result: Solenoid B = 15 mT | Thick wire B at R/2 equals B at 2R (Ratio = 1.0 exactly)! ✓",
            "★ Result: Solenoid B = 15 mT | Thick wire B(R/2) aur B(2R) barabar hain (Ratio = 1.0)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
