"use client";

/**
 * Ch09 · Section 85 — "Chapter formula recap"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 * DRAFTED — UNVERIFIED (no audio uploaded for sec 13+ yet; see PROGRESS.md).
 *
 * Beats (en reveals [0, 6.66, 16.55, 25.6, 37.8, 38.8, 39.8, 40.8]):
 *  1 P = P₀+ρgh,  F₂ = F₁(A₂/A₁)
 *  2 F_B = ρ_f V_sub g,  V_sub/V = ρ_b/ρ_f
 *  3 tanθ = a/g,  Δh = ω²R²/2g
 *  4 A₁v₁ = A₂v₂,  P+½ρv²+ρgh = const
 *  5 v = √(2g(H−h))
 *  6 v_t = (2/9)r²(ρ_b−ρ_f)g/η,  F = 6πηrv
 *  7 Q = πΔPr⁴/8ηl,  ΔP_bubble = 4S/r,  h = 2Scosθ/rρg
 *
 * Layout plan — seven rows, amber bar + formula, baselines ~68px apart:
 *  b1 | bar + formula | Draw+T | x80 y107..133 · bl 125
 *  b2 | bar + formula | Draw+T | x80 y172..198 · bl 190
 *  b3 | bar + formula | Draw+T | x80 y237..263 · bl 255
 *  b4 | bar + formula | Draw+T | x80 y302..328 · bl 320
 *  b5 | bar + formula | Draw+T | x80 y367..393 · bl 385
 *  b6 | bar + formula | Draw+T | x80 y432..458 · bl 450
 *  b7 | bar + formula | Draw+T | x80 y497..523 · bl 515
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, INK, AMBER_DARK, RED } from "./kit";

export default function Ch09Sec85({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  const rows: { y: number; node: React.ReactNode; size: number }[] = [
    { y: 125, node: <>P = P₀+ρgh,  F₂ = F₁(A₂/A₁)</>, size: 16 },
    {
      y: 190,
      node: (
        <>
          F<tspan fontSize={10} dy={4}>B</tspan>
          <tspan dy={-4}> = ρ</tspan>
          <tspan fontSize={10} dy={4}>f</tspan>
          <tspan dy={-4}> V</tspan>
          <tspan fontSize={10} dy={4}>sub</tspan>
          <tspan dy={-4}> g,  V</tspan>
          <tspan fontSize={10} dy={4}>sub</tspan>
          <tspan dy={-4}>/V = ρ</tspan>
          <tspan fontSize={10} dy={4}>b</tspan>
          <tspan dy={-4}>/ρ</tspan>
          <tspan fontSize={10} dy={4}>f</tspan>
        </>
      ),
      size: 15,
    },
    { y: 255, node: <>tanθ = a/g,  Δh = ω²R²/2g</>, size: 16 },
    { y: 320, node: <>A₁v₁ = A₂v₂,  P+½ρv²+ρgh = const</>, size: 14 },
    { y: 385, node: <>v = √(2g(H−h))</>, size: 18 },
    {
      y: 450,
      node: (
        <>
          v<tspan fontSize={9} dy={3}>t</tspan>
          <tspan dy={-3}> = (2/9)r²(ρ</tspan>
          <tspan fontSize={9} dy={3}>b</tspan>
          <tspan dy={-3}>−ρ</tspan>
          <tspan fontSize={9} dy={3}>f</tspan>
          <tspan dy={-3}>)g/η,  F = 6πηrv</tspan>
        </>
      ),
      size: 13,
    },
    {
      y: 515,
      node: (
        <>
          Q = πΔPr⁴/8ηl,  ΔP<tspan fontSize={8} dy={3}>bubble</tspan>
          <tspan dy={-3}> = 4S/r,  h = 2Scosθ/rρg</tspan>
        </>
      ),
      size: 12,
    },
  ];

  return (
    <svg
      viewBox="0 0 1080 620"
      preserveAspectRatio="xMidYMin meet"
      className="w-full h-full select-none"
    >
      <Fade on={true}>
        <T x={540} y={68} size={26} fill={RED} script>
          {t("chapter formula recap", "chapter formula recap")}
        </T>
      </Fade>

      {rows.map((row, i) => (
        <React.Fragment key={row.y}>
          <Draw
            on={beat >= i + 1}
            delay={dl(i + 1, 0)}
            d={`M 80 ${row.y - 16} L 80 ${row.y + 8}`}
            stroke={AMBER_DARK}
            sw={3.2}
            dur={0.4}
          />
          <Fade on={beat >= i + 1} delay={dl(i + 1, 0.4)}>
            <T x={100} y={row.y} size={row.size} fill={INK} weight={700} anchor="start">
              {row.node}
            </T>
          </Fade>
        </React.Fragment>
      ))}
    </svg>
  );
}
