"use client";

/**
 * P12Ch04 · Section 38 — "Derivation B: The Far Field of a Current Loop"
 * Beats (en [0,1,3,4,6,7]): 6 beats
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

export default function P12Ch04Sec38({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Board Derivation: Far Field of a Current Loop as Dipole", "Board Derivation: Far Field of a Current Loop as Dipole")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 3, 4: Exact Formula & Far-Field Limit */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">EXACT AXIAL FIELD & FAR-FIELD LIMIT x &gt;&gt; R</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 6}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            B = [μ₀ N I R²] / [2(x² + R²)³/²]
          </T>
          <T x={225} y={52} anchor="middle" size={15} fill={AMBER_DARK} weight={800}>
            (x &gt;&gt; R  ⇒  (x² + R²)³/² → x³)
          </T>
        </g>
      </Fade>

      {/* BEAT 6 & 7: Moment Substitution & Electric Analogy */}
      <Badge n={2} cx={540} cy={140} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">MOMENT SUBSTITUTION & ELECTRIC ANALOGY</T>
      </Fade>
      <Fade on={beat >= 6}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={16} fill={INK} weight={800}>
            m = N I (π R²)  ⇒  N I R² = m / π
          </T>
          <T x={240} y={52} anchor="middle" size={18} fill={GREEN} weight={800}>
            B_axial = (μ₀ / 4π) (2m / x³)   [Exact Dipole Match!]
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Summary Chip */}
      <Fade on={beat >= 6}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Derived! Far field B_axial = (μ0/4π)(2m/x³)! Matches electric dipole E_axial = (1/4πε0)(2p/x³)! ✓",
            "★ Derived! Far field B_axial = (μ0/4π)(2m/x³)! Electric dipole E_axial = (1/4πε0)(2p/x³) se match karta hai! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
