"use client";

/**
 * P12Ch04 · Section 2 — "Field Geometry: Grip Rule, Sine Dependence and Closed Loops"
 * Beats (en [0,1,3,5,6,7]): 6 beats
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

export default function P12Ch04Sec2({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Field Geometry: Grip Rule & Closed Loops ∮ B · dA = 0", "Field Geometry: Grip Rule & Closed Loops ∮ B · dA = 0")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: GRIP RULE */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("RIGHT-HAND GRIP RULE & SINE DEPENDENCE", "RIGHT-HAND GRIP RULE & SINE DEPENDENCE")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Right-Hand Thumb Rule: Thumb points along current I.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Curling Fingers: Show direction of concentric magnetic field lines.
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Angular Sine Law: dB ∝ sin θ (Zero along current axis, max at 90°).
          </T>

          <Draw on={beat >= 5} delay={dl(5, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Field Pattern: B forms concentric closed circles around wire!
          </T>
        </Fade>

        <Fade on={beat >= 5}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Along the line of current element θ = 0° =&gt; dB = 0)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: GAUSS'S LAW FOR MAGNETISM */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 5} delay={dl(5, 0.2)} />
        <Fade on={beat >= 5} delay={dl(5, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("GAUSS'S LAW FOR MAGNETISM (∮ B · dA = 0)", "GAUSS'S LAW FOR MAGNETISM (∮ B · dA = 0)")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 5}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Net Magnetic Flux: Flux entering any closed surface equals flux exiting.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Integral Statement: ∮ B · dA = 0 for ANY closed Gaussian surface.
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Continuous Loops: Magnetic field lines have no start or end point.
          </T>

          <Draw on={beat >= 7} delay={dl(7, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Physical Reality: Isolated magnetic monopoles DO NOT EXIST!
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Unlike electric charges where ∮ E · dA = Q_enclosed / ε₀)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("GAUSS'S LAW & FIELD GEOMETRY VERDICT", "GAUSS'S LAW & FIELD GEOMETRY VERDICT")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Field lines circle current-carrying conductors according to Right-Hand Grip Rule (dB ∝ sin θ).
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Gauss's Law ∮ B · dA = 0 dictates magnetic lines are continuous loops without isolated monopoles.
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Magnetic flux ∮ B · dA = 0 always because magnetic lines form continuous closed loops! ✓",
            "★ Magnetic flux ∮ B · dA = 0 always because magnetic lines form continuous closed loops! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
