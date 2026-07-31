"use client";

/**
 * P12Ch02 · Section 37 — "JEE Advanced: composite dielectric, two stacked slabs"
 * Beats (en [0,7,22,33,50,66,77,93]): 8 beats
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

export default function P12Ch02Sec37({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("JEE Advanced: composite dielectric, two stacked slabs", "JEE Advanced: composite dielectric, two stacked slabs")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 220 70 C 440 66, 640 74, 860 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Diagram — Stacked slabs */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)} dim={beat >= 5}>
        <rect x={180} y={120} width={8} height={200} rx={2} fill={RED} />
        <rect x={380} y={120} width={8} height={200} rx={2} fill="#3b82f6" />
        <T x={170} y={150} size={14} fill={RED} weight={800} anchor="end">+Q, A</T>
        <T x={400} y={150} size={14} fill="#3b82f6" weight={800} anchor="start">−Q, A</T>
        {/* Slab 1 */}
        <rect x={200} y={130} width={80} height={180} rx={4} fill="#fef3c7" stroke={AMBER_DARK} strokeWidth={1.5} />
        <T x={240} y={225} size={14} fill={AMBER_DARK} weight={800}>K₁</T>
        <T x={240} y={335} size={12} fill={AMBER_DARK} weight={700}>d/2</T>
        {/* Slab 2 */}
        <rect x={290} y={130} width={80} height={180} rx={4} fill="#dcfce7" stroke={GREEN} strokeWidth={1.5} />
        <T x={330} y={225} size={14} fill={GREEN} weight={800}>K₂</T>
        <T x={330} y={335} size={12} fill={GREEN} weight={700}>d/2</T>
      </Fade>

      {/* BEAT 2: Q is same, σ is same */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={460} y={130} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Same charge Q → same density σ threads through both slabs!",
            "Same charge Q → same density σ dono slabs se pass karti hai!"
          )}
        </T>
      </Fade>

      {/* BEAT 3: E and V in each slab */}
      <Badge n={1} cx={460} cy={180} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={482} y={185} size={14} fill={RED} weight={700} anchor="start">FIELD AND POTENTIAL IN EACH SLAB</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 5}>
        <g transform="translate(460, 200)">
          <rect x={0} y={5} width={500} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={250} y={38} anchor="middle" size={16} fill={INK} weight={800}>
            E_i = σ / (K_i ε₀)    |    V_i = E_i · (d/2)
          </T>
        </g>
      </Fade>

      {/* BEAT 4: Total V */}
      <Badge n={2} cx={52} cy={350} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={74} y={355} size={14} fill={RED} weight={700} anchor="start">TOTAL POTENTIAL V</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(60, 370)">
          <rect x={0} y={5} width={420} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={210} y={38} anchor="middle" size={16} fill={INK} weight={800}>
            V = V₁ + V₂ = (Qd / 2ε₀A) [1/K₁ + 1/K₂]
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Equivalent C */}
      <Badge n={3} cx={500} cy={350} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={522} y={355} size={14} fill={RED} weight={700} anchor="start">EQUIVALENT CAPACITANCE</T>
      </Fade>
      <Fade on={beat >= 5}>
        <g transform="translate(500, 370)">
          <rect x={0} y={5} width={460} height={50} rx={10} fill={CREAM} stroke={RED} strokeWidth={2.5} />
          <T x={230} y={38} anchor="middle" size={18} fill={RED} weight={800}>
            C = Q/V = (2ε₀A / d) · [K₁K₂ / (K₁ + K₂)]
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Numerical plugging */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={60} y={450} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Just plug in A, d, K₁, K₂ in SI units into the derived formula.",
            "Bas A, d, K₁, K₂ ko SI units mein derived formula mein daal do."
          )}
        </T>
      </Fade>

      {/* BEAT 7: Series connection structure */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Stacked slabs SHARE charge Q and SPLIT voltage V → exact behaviour of SERIES capacitors! ✓",
            "★ Stacked slabs charge Q share karti aur V split karti → yeh exactly SERIES connection hai! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
