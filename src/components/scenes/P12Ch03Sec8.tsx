"use client";

/**
 * P12Ch02 · Section 8 — "Mobility, and Ohm's law in two forms"
 * Beats (en [0,8,19,29,41,48,59,71]): 8 beats
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

export default function P12Ch03Sec8({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Mobility, and Ohm's law in two forms", "Mobility, aur Ohm's law ke do forms")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 280 70 C 440 66, 640 74, 800 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Mobility Definition */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">ELECTRON MOBILITY (μ)</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 4}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={18} fill={INK} weight={800}>
            μ = |v_d| / E = (e τ) / m
          </T>
        </g>
      </Fade>

      {/* BEAT 2: Mobility Units & Dimensions */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)} dim={beat >= 4}>
        <T x={60} y={235} size={13} fill={MUTED} anchor="start" script>
          {t(
            "SI Unit: m² / (V·s)  |  Dimensions: [M⁻¹ T² A]",
            "SI Unit: m² / (V·s)  |  Dimensions: [M⁻¹ T² A]"
          )}
        </T>
      </Fade>

      {/* BEAT 4: Macroscopic Form */}
      <Badge n={2} cx={540} cy={140} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">MACROSCOPIC OHM'S LAW</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 5}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={35} anchor="middle" size={18} fill={INK} weight={800}>
            V = I R   (Whole Conductor Object)
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Microscopic Form */}
      <Badge n={3} cx={540} cy={270} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={275} size={14} fill={RED} weight={700} anchor="start">MICROSCOPIC OHM'S LAW</T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(540, 290)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={35} anchor="middle" size={18} fill={INK} weight={800}>
            J = σ E   or   E = ρ J   (Point-by-point)
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Key distinction */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Macroscopic V=IR describes total device; Microscopic J=σE holds point-by-point! ✓",
            "★ Macroscopic V=IR pure device ko batata hai; Microscopic J=σE har point pe hold karta hai! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
