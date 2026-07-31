"use client";

/**
 * P12Ch02 · Section 22 — "Resistivity ranges and the resistor colour code"
 * Beats (en [0,8,16,24,37,46,52,66]): 8 beats
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

export default function P12Ch03Sec22({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Resistivity ranges and resistor colour code", "Resistivity ranges aur resistor colour code")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 230 70 C 440 66, 640 74, 850 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 2: Resistivity Ranges */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">RESISTIVITY RANGES</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 4}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={70} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={28} anchor="middle" size={14} fill={INK} weight={800}>
            Conductors: 10⁻⁸ to 10⁻⁶ Ω·m
          </T>
          <T x={225} y={48} anchor="middle" size={14} fill={INK} weight={800}>
            Semiconductors: 10⁻⁵ to 10² Ω·m
          </T>
          <T x={225} y={68} anchor="middle" size={14} fill={INK} weight={800}>
            Insulators: 10⁸ to 10¹⁶ Ω·m
          </T>
        </g>
      </Fade>

      {/* BEAT 4 & 5: Resistor Colour Code Diagram */}
      <Badge n={2} cx={540} cy={140} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">4-BAND COLOUR CODE</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 7}>
        <g transform="translate(540, 160)">
          {/* Carbon Resistor Body */}
          <rect x={40} y={15} width={400} height={50} rx={10} fill="#fbbf24" stroke={INK} strokeWidth={2} />
          {/* Wire Leads */}
          <Draw on={beat >= 4} delay={dl(4, 0.4)} d="M 0 40 L 40 40 M 440 40 L 480 40" stroke={INK} sw={3} />

          {/* Color Bands */}
          <rect x={100} y={15} width={20} height={50} fill="#92400e" /> {/* Band 1: Brown */}
          <rect x={160} y={15} width={20} height={50} fill="#000000" /> {/* Band 2: Black */}
          <rect x={220} y={15} width={20} height={50} fill="#ef4444" /> {/* Band 3: Red */}
          <rect x={340} y={15} width={20} height={50} fill="#eab308" /> {/* Band 4: Gold */}

          <T x={240} y={85} anchor="middle" size={15} fill={INK} weight={800}>
            R = (Digit 1 Digit 2) × 10ᵐ ± Tolerance
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Mnemonic & Tolerance */}
      <Badge n={3} cx={52} cy={270} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={74} y={275} size={14} fill={RED} weight={700} anchor="start">MNEMONIC & TOLERANCE</T>
      </Fade>
      <Fade on={beat >= 7}>
        <g transform="translate(60, 290)">
          <rect x={0} y={5} width={960} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={30} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Mnemonic: B B ROY of Great Britain had a Very Good Wife (0 to 9)",
              "Mnemonic: B B ROY of Great Britain had a Very Good Wife (0 se 9)"
            )}
          </T>
          <T x={480} y={52} anchor="middle" size={14} fill={GREEN} weight={800}>
            Gold = ±5%  |  Silver = ±10%  |  No band = ±20%
          </T>
        </g>
      </Fade>

      {/* BEAT 8: Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Keep tolerance band on RIGHT before reading bands left to right! ✓",
            "★ Color bands padhne se pehle tolerance band ko RIGHT taraf rakhein! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
