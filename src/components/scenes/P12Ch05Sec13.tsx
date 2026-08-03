"use client";

/**
 * P12Ch05 · Section 13 — "Cutting a magnet in half, and what happens to its period"
 * Subtopic: Bar Magnet, Magnetic Field Lines and Dipole Moment
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

export default function P12Ch05Sec13({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Cutting a Magnet in Half: Effect on Moment & Period", "Cutting a Magnet in Half: Effect on Moment & Period")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: CASE 1: TRANSVERSE CUT (PERPENDICULAR TO LENGTH) */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("CASE 1: TRANSVERSE CUT (PERPENDICULAR TO LENGTH)", "CASE 1: TRANSVERSE CUT (PERPENDICULAR TO LENGTH)")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Dipole Moment: m' = q_m (l / 2) = m / 2 (length is halved).
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Moment of Inertia: I' = (m_mass / 2) (L / 2)² / 12 = I / 8.
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Period Formula: T' = 2π √[ I' / (m' B) ] = 2π √[ (I/8) / ((m/2) B) ].
          </T>

          <Draw on={beat >= 5} delay={dl(5, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Transverse Period: T' = T / 2 (period is HALVED)!
          </T>
        </Fade>

        <Fade on={beat >= 5}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Magnet oscillates twice as fast after transverse cut)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: CASE 2: LONGITUDINAL CUT (PARALLEL TO LENGTH) */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 5} delay={dl(5, 0.2)} />
        <Fade on={beat >= 5} delay={dl(5, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("CASE 2: LONGITUDINAL CUT (PARALLEL TO LENGTH)", "CASE 2: LONGITUDINAL CUT (PARALLEL TO LENGTH)")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 5}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Dipole Moment: m' = (q_m / 2) l = m / 2 (pole strength is halved).
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Moment of Inertia: I' = (m_mass / 2) L² / 12 = I / 2.
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Period Formula: T' = 2π √[ I' / (m' B) ] = 2π √[ (I/2) / ((m/2) B) ].
          </T>

          <Draw on={beat >= 7} delay={dl(7, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Longitudinal Period: T' = T (period stays UNCHANGED)!
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Mass and dipole moment drop in exact same ratio 1:2)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("NEET / JEE SPEED TRAP RECAP", "NEET / JEE SPEED TRAP RECAP")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Cut perpendicular to length ⇒ T' = T / 2 (period halves, frequency doubles).
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Cut parallel along length ⇒ T' = T (period remains identical).
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Perpendicular cut halves the period (T' = T/2); parallel cut keeps period unchanged (T' = T)! ✓",
            "★ Perpendicular cut halves the period (T' = T/2); parallel cut keeps period unchanged (T' = T)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
