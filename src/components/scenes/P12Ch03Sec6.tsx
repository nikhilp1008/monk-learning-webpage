"use client";

/**
 * P12Ch02 · Section 6 — "Non-unique characteristics and two kinds of resistance"
 * Beats (en [0,10,20,30,43,57,68,81]): 8 beats
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

export default function P12Ch03Sec6({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Non-unique characteristics & two kinds of resistance", "Non-unique characteristics aur do tarah ke resistance")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 230 70 C 440 66, 640 74, 850 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 2: GaAs Non-Unique Curve */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)} dim={beat >= 6}>
        <g transform="translate(100, 130)">
          <T x={150} y={-20} size={15} fill={RED} weight={800}>GaAs Characteristic (Negative Resistance)</T>

          {/* Axes */}
          <Draw on={beat >= 1} delay={dl(1, 0.4)} d="M 40 180 L 320 180" stroke={INK} sw={2} />
          <Draw on={beat >= 1} delay={dl(1, 0.4)} d="M 40 180 L 40 20" stroke={INK} sw={2} />
          <T x={330} y={185} size={13} fill={INK} weight={700}>V</T>
          <T x={40} y={10} size={13} fill={INK} weight={700}>I</T>

          {/* S-shaped curve for GaAs */}
          <Draw on={beat >= 2} delay={dl(2, 0.4)} d="M 40 170 C 90 60 130 40 170 60 C 210 80 230 150 270 160 C 290 165 310 120 320 60" stroke={AMBER_DARK} sw={2.5} />
          
          {/* Negative resistance region highlight */}
          <Fade on={beat >= 3} delay={dl(3, 0.3)}>
            <Draw on={beat >= 3} delay={dl(3, 0.4)} d="M 170 60 C 210 80 230 150 270 160" stroke={RED} sw={3.5} />
            <T x={220} y={110} size={12} fill={RED} weight={800}>Negative R region (dV/dI &lt; 0)</T>
          </Fade>
        </g>
      </Fade>

      {/* BEAT 5 & 6: Static vs Dynamic Resistance */}
      <Badge n={1} cx={540} cy={140} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">STATIC vs DYNAMIC RESISTANCE</T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={70} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={16} fill={INK} weight={800}>
            R_static = V / I   (Origin to Operating Point)
          </T>
          <T x={240} y={55} anchor="middle" size={16} fill={INK} weight={800}>
            R_dynamic = dV / dI   (Local Slope of Curve)
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Key takeaway */}
      <Badge n={2} cx={52} cy={370} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={74} y={375} size={14} fill={RED} weight={700} anchor="start">NEGATIVE DYNAMIC RESISTANCE</T>
      </Fade>
      <Fade on={beat >= 7} dim={beat >= 8}>
        <g transform="translate(60, 390)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Static R is always positive, but Dynamic R (dV/dI) can be negative!",
              "Static R hamesha positive hota hai, par Dynamic R (dV/dI) negative ho sakta hai!"
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 8: Summary Chip */}
      <Fade on={beat >= 8}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Ohmic: R_static = R_dynamic. Non-Ohmic: R_dynamic = dV/dI (can be negative like in GaAs)! ✓",
            "★ Ohmic: R_static = R_dynamic. Non-Ohmic: R_dynamic = dV/dI (GaAs mein negative ho sakta hai)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
