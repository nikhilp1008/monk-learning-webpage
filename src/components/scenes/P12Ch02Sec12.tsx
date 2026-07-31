"use client";

/**
 * P12Ch02 · Section 12 — "JEE Advanced: field from a potential function"
 * Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0,9,25,31,44,55,71,86]):
 *  0 Title
 *  1 Diagram: equipotential contours for V = x²−y²
 *  2 Study shapes before algebra
 *  3 Gradient: E_x = −∂V/∂x, E_y = −∂V/∂y
 *  4 Gradient relation explanation
 *  5 Numerical: |E| at (2,1)
 *  6 Equipotential family description
 *  7 Field vanishes at origin where V = 0
 */

import React from "react";
import {
  SceneProps,
  useBeat,
  delayFor,
  Fade,
  Draw,
  T,
  Chip,
  ringD,
  INK,
  MUTED,
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
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

export default function P12Ch02Sec12({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* ── BEAT 0: Title ── */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("JEE Advanced: field from a potential function", "JEE Advanced: potential function se field nikalo")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* ── BEAT 1: Diagram — Equipotential contours ── */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        {/* Axes */}
        <Draw on={beat >= 1} delay={dl(1, 0.3)} d="M 100 350 h 300" stroke={INK} sw={1.5} />
        <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 250 450 v -250" stroke={INK} sw={1.5} />
        <T x={405} y={348} size={12} fill={INK} weight={700}>x</T>
        <T x={254} y={192} size={12} fill={INK} weight={700}>y</T>
        {/* Hyperbolic contours (simplified) */}
        <Draw on={beat >= 1} delay={dl(1, 0.7)} d="M 310 210 Q 340 350, 400 350" stroke={AMBER_DARK} sw={1.5} dur={0.5} />
        <Draw on={beat >= 1} delay={dl(1, 0.9)} d="M 190 210 Q 160 350, 100 350" stroke={AMBER_DARK} sw={1.5} dur={0.5} />
        <T x={385} y={310} size={11} fill={AMBER_DARK} script>V = +C</T>
        <T x={115} y={310} size={11} fill={AMBER_DARK} script>V = −C</T>
        {/* Function label */}
        <T x={250} y={470} size={15} fill={INK} weight={700}>V(x,y) = x² − y²</T>
      </Fade>

      {/* ── BEAT 2: Study shapes note ── */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={480} y={140} size={14} fill={MUTED} anchor="start" script>
          {t(
            "Study the shape of contours before touching algebra!",
            "Algebra se pehle contours ki shape study karo!"
          )}
        </T>
      </Fade>

      {/* ── BEAT 3: Badge 1 — Gradient Components ── */}
      <Badge n={1} cx={480} cy={180} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 1)}>
        <T x={502} y={185} size={14} fill={RED} weight={700} anchor="start">
          GRADIENT COMPONENTS
        </T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 5}>
        <g transform="translate(480, 198)">
          <rect x={0} y={5} width={460} height={70} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={230} y={30} anchor="middle" size={18} fill={INK} weight={800}>
            E_x = −∂V/∂x = −2x
          </T>
          <T x={230} y={58} anchor="middle" size={18} fill={INK} weight={800}>
            E_y = −∂V/∂y = +2y
          </T>
        </g>
      </Fade>

      {/* ── BEAT 4: Gradient explanation ── */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={480} y={298} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Same E = −dV/dr idea, applied component-wise in 2D!",
            "Wahi E = −dV/dr concept, 2D mein component-wise apply!"
          )}
        </T>
      </Fade>

      {/* ── BEAT 5: Badge 2 — Numerical at (2,1) ── */}
      <Badge n={2} cx={480} cy={340} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 1)}>
        <T x={502} y={345} size={14} fill={RED} weight={700} anchor="start">
          |Ē| AT POINT (2, 1)
        </T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(480, 358)">
          <rect x={0} y={5} width={480} height={70} rx={8} fill={CREAM} stroke={RED} strokeWidth={2} />
          <T x={240} y={30} anchor="middle" size={16} fill={INK} weight={800}>
            E_x = −4,  E_y = +2
          </T>
          <T x={240} y={58} anchor="middle" size={18} fill={RED} weight={800}>
            |Ē| = √(16 + 4) = √20 = 2√5 V/m
          </T>
        </g>
      </Fade>

      {/* ── BEAT 6: Equipotential family ── */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={60} y={500} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Equipotentials: x²−y² = C → family of rectangular hyperbolas!",
            "Equipotentials: x²−y² = C → rectangular hyperbolas ki family!"
          )}
        </T>
      </Fade>

      {/* ── BEAT 7: Takeaway ── */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ E vanishes only at origin (both components zero) where V = 0 ✓",
            "★ E sirf origin pe zero hota hai (dono components zero) jahaan V = 0 ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
