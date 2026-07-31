"use client";

/**
 * P12Ch02 · Section 46 — "Deriving the capacitance of an isolated spherical conductor"
 * Beats (en [0,6,19,28,38,47,57]): 7 beats
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

export default function P12Ch02Sec46({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("derivation: capacitance of an isolated sphere", "derivation: isolated sphere ki capacitance")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 280 70 C 440 66, 640 74, 800 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Sphere behaves like point charge */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)} dim={beat >= 3}>
        <circle cx={200} cy={200} r={90} fill="#fef2f2" stroke={RED} strokeWidth={2} />
        <T x={200} y={200} size={14} fill={RED} weight={700}>+Q</T>
        <Draw on={beat >= 1} delay={dl(1, 0.6)} d="M 200 200 L 290 200" stroke={INK} sw={2} />
        <T x={245} y={190} size={14} fill={INK} weight={700}>R</T>
        <T x={320} y={200} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Behaves exactly like a point charge +Q at the centre for external points.",
            "Bahar ke points ke liye, centre pe rakhe +Q point charge ki tarah behave karta hai."
          )}
        </T>
      </Fade>

      {/* BEAT 2: Surface Potential V */}
      <Badge n={1} cx={52} cy={305} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={74} y={310} size={14} fill={RED} weight={700} anchor="start">POTENTIAL V AT SURFACE</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 4}>
        <g transform="translate(60, 325)">
          <rect x={0} y={5} width={400} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={200} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            V = Q / (4πε₀ R)
          </T>
        </g>
      </Fade>

      {/* BEAT 3: Equipotential note */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={60} y={405} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "Since conductor is ONE equipotential, this is the potential of the ENTIRE sphere!",
            "Kyunki conductor EK equipotential hai, yeh PURE sphere ka potential hai!"
          )}
        </T>
      </Fade>

      {/* BEAT 4: Finding C */}
      <Badge n={2} cx={520} cy={305} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={542} y={310} size={14} fill={RED} weight={700} anchor="start">CAPACITANCE C = Q/V</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(520, 325)">
          <rect x={0} y={5} width={500} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={250} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            C = Q / [Q / (4πε₀ R)] = 4πε₀ R
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Depends only on R */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={520} y={435} size={13} fill={MUTED} anchor="start" script>
          {t(
            "C depends ONLY on radius R — pure geometry!",
            "C SIRF radius R pe depend karta hai — pure geometry!"
          )}
        </T>
      </Fade>

      {/* BEAT 6: Q cancels */}
      <Fade on={beat >= 6}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Notice how Q cancelled out completely! Capacitance is purely geometrical. ✓",
            "★ Dekha, Q puri tarah cancel ho gaya! Capacitance sirf geometrical property hai. ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
