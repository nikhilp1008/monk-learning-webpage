"use client";

/**
 * P12Ch02 · Section 39 — "Pitfalls and pro-tips for combining resistors"
 * Beats (en [0,1,2,3,4,5,6,7]): 8 beats
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

export default function P12Ch03Sec39({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Pitfalls & Pro-Tips: Combining Resistors", "Pitfalls & Pro-Tips: Combining Resistors")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 230 70 C 440 66, 640 74, 850 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 2: Inversion & Topology traps */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">RECIPROCAL & TOPOLOGY TRAPS</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 3}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Always invert 1/R_p at end | Resistors must share BOTH nodes for parallel",
              "End mein 1/R_p ko invert karein | Parallel ke liye BOTH nodes share hone chahiye"
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 3 & 4: Current divider & bridging */}
      <Badge n={2} cx={540} cy={140} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">CURRENT DIVIDER & BRIDGING</T>
      </Badge>
      <Fade on={beat >= 3} dim={beat >= 5}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={35} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Current divider: OPPOSITE R in numerator! Bridge resistors need Kirchhoff.",
              "Current divider: OPPOSITE R numerator mein! Bridge resistors ke liye Kirchhoff."
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 6: Pre-computation Prediction */}
      <Badge n={3} cx={52} cy={270} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={74} y={275} size={14} fill={RED} weight={700} anchor="start">SANITY CHECK & CONSERVATION</T>
      </Badge>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(60, 290)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={INK} weight={800}>
            R_p = (R₁R₂)/(R₁+R₂)   |   R_p &lt; R_min   |   Branch currents MUST add back to I_total!
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Always end network problems with a current-sum check (I_total = I₁ + I₂)! ✓",
            "★ Har network problem ko current-sum check (I_total = I₁ + I₂) se finish karein! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
