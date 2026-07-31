"use client";

/**
 * P12Ch04 · Section 37 — "Derivation A: The Revolving Electron and the Bohr Magneton"
 * Beats (en [0,1,3,4,6,8,10,11,12]): 9 beats
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

export default function P12Ch04Sec37({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Board Derivation: Revolving Electron & The Bohr Magneton", "Board Derivation: Revolving Electron & The Bohr Magneton")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1, 3, 4 & 6: Orbit Current & Orbital Moment */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">ORBIT CURRENT & MOMENT μ_l = evr / 2</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 8}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            T = 2πr / v  ⇒  I = ev / (2πr)
          </T>
          <T x={225} y={52} anchor="middle" size={16} fill={GREEN} weight={800}>
            μ_l = I A = (ev / 2πr)(π r²) = evr / 2
          </T>
        </g>
      </Fade>

      {/* BEAT 8: Gyromagnetic Ratio */}
      <Badge n={2} cx={540} cy={140} on={beat >= 8} delay={dl(8, 0.4)} />
      <Fade on={beat >= 8} delay={dl(8, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">GYROMAGNETIC RATIO μ_l / L = e / (2m)</T>
      </Fade>
      <Fade on={beat >= 8} dim={beat >= 11}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            L = m v r  ⇒  μ_l = (e / 2m) L
          </T>
          <T x={240} y={52} anchor="middle" size={16} fill={GREEN} weight={800}>
            μ_l / L = e / (2m) ≈ 8.8 × 10¹⁰ C kg⁻¹
          </T>
        </g>
      </Fade>

      {/* BEAT 11 & 12: Bohr Quantization & Bohr Magneton */}
      <Badge n={3} cx={52} cy={270} on={beat >= 11} delay={dl(11, 0.4)} />
      <Fade on={beat >= 11} delay={dl(11, 0.8)}>
        <T x={74} y={275} size={14} fill={RED} weight={700} anchor="start">BOHR QUANTIZATION & BOHR MAGNETON</T>
      </Fade>
      <Fade on={beat >= 11}>
        <g transform="translate(60, 290)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            L = nh / (2π)  ⇒  μ_l = neh / (4πm)  ⇒  Smallest (n=1): μ_B = eh / (4πm) ≈ 9.27 × 10⁻²⁴ A m²!
          </T>
        </g>
      </Fade>

      {/* BEAT 12: Summary Chip */}
      <Fade on={beat >= 11}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Derived! μ_l = evr/2 = (e/2m)L; Bohr Magneton μ_B = eh/(4πm) = 9.27 × 10⁻²⁴ A m²! ✓",
            "★ Derived! μ_l = evr/2 = (e/2m)L; Bohr Magneton μ_B = eh/(4πm) = 9.27 × 10⁻²⁴ A m²! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
