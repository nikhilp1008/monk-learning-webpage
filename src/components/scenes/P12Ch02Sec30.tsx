"use client";

/**
 * P12Ch02 · Section 30 — "Formula toolkit: capacitance and the parallel plate"
 * Beats (en [0,4,15,24,35,47,54,65]): 8 beats
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

export default function P12Ch02Sec30({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("formula toolkit: capacitance and parallel plates", "formula toolkit: capacitance and parallel plates")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 220 70 C 440 66, 640 74, 860 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Definition */}
      <Badge n={1} cx={52} cy={120} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 1)}>
        <T x={74} y={125} size={14} fill={RED} weight={700} anchor="start">DEFINITION</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 3}>
        <g transform="translate(60, 140)">
          <rect x={0} y={5} width={400} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={200} y={38} anchor="middle" size={20} fill={INK} weight={800}>
            C = Q / V
          </T>
        </g>
      </Fade>

      {/* BEAT 2: Dimensions */}
      <Badge n={2} cx={540} cy={120} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 1)}>
        <T x={562} y={125} size={14} fill={RED} weight={700} anchor="start">DIMENSIONS</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 3}>
        <g transform="translate(540, 140)">
          <rect x={0} y={5} width={400} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={200} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            [C] = [M⁻¹ L⁻² T⁴ A²]
          </T>
        </g>
      </Fade>

      {/* BEAT 3: Plate fields */}
      <Badge n={3} cx={52} cy={230} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 1)}>
        <T x={74} y={235} size={14} fill={RED} weight={700} anchor="start">BETWEEN PLATES</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 5}>
        <g transform="translate(60, 250)">
          <rect x={0} y={5} width={500} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={250} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            E = σ/ε₀ = Q / (ε₀A)    |    V = Ed
          </T>
        </g>
      </Fade>

      {/* BEAT 4: Uniform field note */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={60} y={335} size={13} fill={MUTED} anchor="start" script>
          {t(
            "V = Ed holds because field E is uniform between the plates!",
            "V = Ed holds kyunki plates ke beech field E uniform hai!"
          )}
        </T>
      </Fade>

      {/* BEAT 5: Free space C */}
      <Badge n={4} cx={52} cy={380} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 1)}>
        <T x={74} y={385} size={14} fill={RED} weight={700} anchor="start">PARALLEL PLATE CAPACITANCE</T>
      </Fade>
      <Fade on={beat >= 5}>
        <g transform="translate(60, 400)">
          <rect x={0} y={5} width={380} height={50} rx={10} fill={CREAM} stroke={RED} strokeWidth={2.5} />
          <T x={190} y={38} anchor="middle" size={20} fill={RED} weight={800}>
            C₀ = ε₀A / d
          </T>
        </g>
      </Fade>

      {/* BEAT 6: With dielectric */}
      <Fade on={beat >= 6} delay={dl(6, 0.5)}>
        <g transform="translate(460, 400)">
          <rect x={0} y={5} width={380} height={50} rx={10} fill={CREAM} stroke={GREEN} strokeWidth={2.5} />
          <T x={190} y={38} anchor="middle" size={20} fill={GREEN} weight={800}>
            C = Kε₀A / d = KC₀
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Geometry note */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Area A (m²), gap d (m), dielectric K (dimensionless). Pure geometry! ✓",
            "★ Area A (m²), gap d (m), dielectric K (dimensionless). Pure geometry! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
