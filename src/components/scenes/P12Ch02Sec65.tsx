"use client";

/**
 * P12Ch02 · Section 65 — "Quick summary of capacitor combinations"
 * Beats (en [0,5,15,22,34,44,52,65]): 8 beats
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

export default function P12Ch02Sec65({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Summary: Capacitor Combinations", "Summary: Capacitor Combinations")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 370 70 C 440 66, 640 74, 710 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Series setup */}
      <Badge n={1} cx={52} cy={120} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={125} size={14} fill={RED} weight={700} anchor="start">SERIES = COMMON Q</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 3}>
        <g transform="translate(60, 140)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={38} anchor="middle" size={16} fill={INK} weight={800} script>
            {t(
              "Charge Q is shared equally. Voltages V add up.",
              "Charge Q sabme same hai. Voltages V add hote hain."
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 2: Series formula */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)} dim={beat >= 3}>
        <g transform="translate(60, 210)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={38} anchor="middle" size={16} fill={INK} weight={800}>
            1/C_s = 1/C₁ + 1/C₂ + ...
          </T>
        </g>
      </Fade>

      {/* BEAT 3: Series C decreases */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={60} y={310} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "C_s is smaller than the smallest capacitor.",
            "C_s sabse chote capacitor se bhi chota hota hai."
          )}
        </T>
      </Fade>

      {/* BEAT 4: Parallel setup */}
      <Badge n={2} cx={540} cy={120} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={562} y={125} size={14} fill={RED} weight={700} anchor="start">PARALLEL = COMMON V</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(540, 140)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={36} anchor="middle" size={16} fill={INK} weight={800} script>
            {t(
              "Voltage V is shared equally. Charges Q add up.",
              "Voltage V sabme same hai. Charges Q add hote hain."
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Parallel formula */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)} dim={beat >= 6}>
        <g transform="translate(540, 210)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={38} anchor="middle" size={16} fill={INK} weight={800}>
            C_p = C₁ + C₂ + ...
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Parallel C increases */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={310} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "C_p is larger than the largest capacitor.",
            "C_p sabse bade capacitor se bhi bada hota hai."
          )}
        </T>
      </Fade>

      {/* BEAT 7: Shared connection loss */}
      <Badge n={3} cx={52} cy={380} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={74} y={385} size={14} fill={RED} weight={700} anchor="start">CONNECTING CHARGED CAPACITORS</T>
      </Fade>
      <Fade on={beat >= 7}>
        <g transform="translate(60, 400)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill="#fef2f2" stroke={RED} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={RED} weight={800} script>
            {t(
              "Charge redistributes until V is common. Energy is LOST to heat/sparks.",
              "Charge redistribute hota hai jab tak V common na ho jaye. Energy heat/sparks mein LOST hoti hai."
            )}
          </T>
        </g>
      </Fade>
    </svg>
  );
}
