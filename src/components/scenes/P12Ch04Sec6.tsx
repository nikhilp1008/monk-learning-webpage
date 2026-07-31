"use client";

/**
 * P12Ch04 · Section 6 — "Worked Examples One and Two: Coil at the Centre, and the Arc Trap"
 * Beats (en [0,1,2,3,5,6,9,11]): 8 beats
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

export default function P12Ch04Sec6({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Worked Examples: Coil Centre Field & The NEET Arc Trap", "Worked Examples: Coil Centre Field & The NEET Arc Trap")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 2: Example 1 CBSE Board Level */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">CBSE LEVEL: N-TURN COIL AT CENTRE</T>
      </Badge>
      <Fade on={beat >= 1} dim={beat >= 5}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            N = 250, R = 0.08m, I = 3.0A  ⇒  B = N μ₀ I / (2R)
          </T>
          <T x={225} y={52} anchor="middle" size={16} fill={GREEN} weight={800}>
            B = 5.9 × 10⁻³ T = 5.9 mT
          </T>
        </g>
      </Fade>

      {/* BEAT 5, 6 & 9: Example 2 NEET Arc Trap */}
      <Badge n={2} cx={540} cy={140} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">NEET SPEED TRAP: 240° ARC & RADIAL LEADS</T>
      </Badge>
      <Fade on={beat >= 5} dim={beat >= 11}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={14} fill={INK} weight={800}>
            Radial leads pass through centre ⇒ Contribution = 0!
          </T>
          <T x={240} y={52} anchor="middle" size={15} fill={GREEN} weight={800}>
            B = [μ₀ I / (2R)] × (240°/360°) = 2.5 × 10⁻⁵ T
          </T>
        </g>
      </Fade>

      {/* BEAT 11: Summary Chip */}
      <Fade on={beat >= 11}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Result: Coil B = 5.9 mT | Arc B = 2.5 × 10⁻⁵ T (Radial leads contribute zero)! ✓",
            "★ Result: Coil B = 5.9 mT | Arc B = 2.5 × 10⁻⁵ T (Radial leads zero contribute karte hain)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
