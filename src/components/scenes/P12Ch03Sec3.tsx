"use client";

/**
 * P12Ch02 · Section 3 — "Defining current, and why it is a scalar"
 * Beats (en [0,8,14,24,37,50,62,74]): 8 beats
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

export default function P12Ch03Sec3({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Defining current, and why it is a scalar", "Defining current, aur ye scalar kyun hai")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 310 70 C 440 66, 640 74, 770 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Mathematical Definition */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">RATE OF CHARGE FLOW</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 3}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={16} fill={INK} weight={800}>
            I = dq / dt   (SI Unit: Ampere, 1 A = 1 C/s)
          </T>
        </g>
      </Fade>

      {/* BEAT 2: Conventional vs Electron Direction */}
      <Badge n={2} cx={540} cy={140} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">CONVENTIONAL CURRENT</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 3}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={35} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Points in direction of +q flow (Opposite to electron drift!)",
              "+q flow ki direction mein hota hai (Electron drift ke opposite!)"
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 3 & 4: Junction Diagram - Why it is a Scalar */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)} dim={beat >= 7}>
        <g transform="translate(100, 250)">
          {/* Junction wires */}
          <Draw on={beat >= 3} delay={dl(3, 0.5)} d="M 50 20 L 200 100" stroke={INK} sw={3} />
          <Draw on={beat >= 3} delay={dl(3, 0.5)} d="M 50 180 L 200 100" stroke={INK} sw={3} />
          <Draw on={beat >= 3} delay={dl(3, 0.5)} d="M 200 100 L 400 100" stroke={INK} sw={4} />

          {/* Junction dot */}
          <circle cx={200} cy={100} r={6} fill={RED} />

          {/* Angle theta arc */}
          <path d="M 120 60 A 90 90 0 0 1 120 140" fill="none" stroke={AMBER_DARK} strokeWidth={1.5} strokeDasharray="3 3" />
          <T x={100} y={105} size={13} fill={AMBER_DARK} weight={700}>Angle θ</T>

          {/* Incoming currents */}
          <T x={70} y={35} size={14} fill={AMBER_DARK} weight={800}>I₁ = 5 A →</T>
          <T x={70} y={175} size={14} fill={AMBER_DARK} weight={800}>I₂ = 3 A →</T>

          {/* Outgoing current */}
          <T x={300} y={80} size={16} fill={GREEN} weight={800}>I_out = 5 + 3 = 8 A</T>
          <T x={300} y={130} size={13} fill={RED} weight={700}>
            {t("Independent of angle θ! (Algebraic Addition)", "Angle θ se bilkul farak nahi padta! (Algebraic Addition)")}
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Scalar vs Vector distinction */}
      <Badge n={3} cx={580} cy={240} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={602} y={245} size={14} fill={RED} weight={700} anchor="start">CURRENT IS A SCALAR</T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(580, 260)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Does NOT obey vector parallelogram law!",
              "Vector parallelogram law obey nahi karta!"
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Current (I) is SCALAR (adds algebraically). Current density (J) is VECTOR! ✓",
            "★ Current (I) SCALAR hai (algebraically judta hai). Current density (J) VECTOR hai! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
