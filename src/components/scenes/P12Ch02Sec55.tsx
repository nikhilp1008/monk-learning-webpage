"use client";

/**
 * P12Ch02 · Section 55 — "Formula toolkit: series and parallel combinations"
 * Beats (en [0,4,11,21,35,42,55,70]): 8 beats
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

export default function P12Ch02Sec55({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Formula toolkit: series and parallel", "Formula toolkit: series and parallel")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 350 70 C 440 66, 640 74, 730 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Series formula */}
      <Badge n={1} cx={52} cy={120} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={125} size={14} fill={RED} weight={700} anchor="start">SERIES FORMULA</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 3}>
        <g transform="translate(60, 140)">
          <rect x={0} y={5} width={420} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={210} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            1/C_eq = 1/C₁ + 1/C₂ + ... + 1/C_n
          </T>
        </g>
      </Fade>

      {/* BEAT 2: Special cases (two caps, n equal) */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)} dim={beat >= 3}>
        <g transform="translate(60, 200)">
          <rect x={0} y={5} width={420} height={70} rx={8} fill="#fef2f2" stroke={RED} strokeWidth={1.5} />
          <T x={210} y={30} anchor="middle" size={15} fill={INK} weight={700}>Two only: C_eq = (C₁C₂) / (C₁ + C₂)</T>
          <T x={210} y={55} anchor="middle" size={15} fill={INK} weight={700}>n equal: C_eq = C / n</T>
        </g>
      </Fade>

      {/* BEAT 3: Series logic */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={60} y={305} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Charge is common: Q = C₁V₁ = C₂V₂. Voltages add: V = V₁ + V₂.",
            "Charge common hai: Q = C₁V₁ = C₂V₂. Voltages add hote hain: V = V₁ + V₂."
          )}
        </T>
      </Fade>

      {/* BEAT 4: Parallel formula */}
      <Badge n={2} cx={520} cy={120} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={542} y={125} size={14} fill={RED} weight={700} anchor="start">PARALLEL FORMULA</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(520, 140)">
          <rect x={0} y={5} width={420} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={210} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            C_eq = C₁ + C₂ + ... + C_n
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Parallel logic */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)} dim={beat >= 6}>
        <g transform="translate(520, 200)">
          <rect x={0} y={5} width={420} height={40} rx={8} fill="#ecfdf5" stroke={GREEN} strokeWidth={1.5} />
          <T x={210} y={32} anchor="middle" size={15} fill={INK} weight={700}>n equal: C_eq = nC</T>
        </g>
        <T x={520} y={280} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Voltage is common. Charges add: Q = Q₁ + Q₂.",
            "Voltage common hai. Charges add hote hain: Q = Q₁ + Q₂."
          )}
        </T>
      </Fade>

      {/* BEAT 6: Sanity checks */}
      <Badge n={3} cx={52} cy={380} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={74} y={385} size={14} fill={RED} weight={700} anchor="start">SANITY CHECKS</T>
      </Fade>
      <Fade on={beat >= 6} dim={beat >= 7}>
        <T x={74} y={415} size={14} fill={INK} anchor="start" script>
          {t(
            "Series result MUST be less than the smallest C in the group.",
            "Series result hamesha group ke sabse chote C se bhi kam hoga."
          )}
        </T>
        <T x={74} y={445} size={14} fill={INK} anchor="start" script>
          {t(
            "Parallel result MUST be greater than the largest C in the group.",
            "Parallel result hamesha group ke sabse bade C se bada hoga."
          )}
        </T>
      </Fade>

      {/* BEAT 7: Ratio n^2 */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={536} w={880} h={44} fill={AMBER_DARK} textFill="#ffffff" size={18}>
          {t(
            "★ For n equal capacitors: C_parallel / C_series = (nC) / (C/n) = n² ! ✓",
            "★ n equal capacitors ke liye: C_parallel / C_series = (nC) / (C/n) = n² ! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
