"use client";

/**
 * P12Ch02 · Section 16 — "Worked example: a tapering conductor"
 * Beats (en [0,11,22,33,48,56,66,79]): 8 beats
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

export default function P12Ch03Sec16({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("JEE Advanced: A Tapering Conductor", "JEE Advanced: A Tapering Conductor")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 310 70 C 440 66, 640 74, 770 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 3: Tapering Conductor Diagram */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)} dim={beat >= 7}>
        <g transform="translate(100, 130)">
          {/* Truncated Cone Geometry */}
          <Draw on={beat >= 1} delay={dl(1, 0.4)} d="M 0 50 L 350 10 M 0 130 L 350 170" stroke={INK} sw={2} />
          <ellipse cx={0} cy={90} rx={12} ry={40} fill="#f1f5f9" stroke={INK} strokeWidth={2} />
          <ellipse cx={350} cy={90} rx={18} ry={80} fill="#e2e8f0" stroke={INK} strokeWidth={2} />

          {/* Radii labels */}
          <T x={-20} y={95} size={14} fill={RED} weight={800}>r = a</T>
          <T x={380} y={95} size={14} fill={RED} weight={800}>r = b</T>
          <T x={175} y={195} size={14} fill={INK} weight={700}>Length L</T>

          {/* Current arrow (Constant I in steady state) */}
          <Draw on={beat >= 3} delay={dl(3, 0.4)} d="M -50 90 L 420 90" stroke={GREEN} sw={2.5} />
          <T x={200} y={75} size={14} fill={GREEN} weight={800}>Steady Current I = Constant!</T>
        </g>
      </Fade>

      {/* BEAT 4: Drift velocity variation */}
      <Badge n={1} cx={540} cy={140} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">DRIFT SPEED v_d(x)</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={35} anchor="middle" size={16} fill={INK} weight={800}>
            v_d(x) = I / (n e π r(x)²) ∝ 1 / r(x)²
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Total Resistance Integration */}
      <Badge n={2} cx={52} cy={340} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={74} y={345} size={14} fill={RED} weight={700} anchor="start">INTEGRATING RESISTANCE</T>
      </Fade>
      <Fade on={beat >= 6} dim={beat >= 7}>
        <g transform="translate(60, 360)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={18} fill={INK} weight={800}>
            R = ∫ (ρ dx) / [π r(x)²] = (ρ L) / (π a b)
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Result: R = (ρ L)/(π a b). Equivalent to geometric mean area A_eq = π a b! ✓",
            "★ Result: R = (ρ L)/(π a b). Geometric mean area A_eq = π a b ke barabar! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
