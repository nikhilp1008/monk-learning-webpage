"use client";

/**
 * P12Ch02 · Section 60 — "CBSE level: three capacitors in series and in parallel"
 * Beats (en [0,4,14,24,29,41,47]): 7 beats
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

export default function P12Ch02Sec60({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("CBSE level: three capacitors, both arrangements", "CBSE level: three capacitors, dono arrangements")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 280 70 C 440 66, 640 74, 800 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Setup */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={60} y={120} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Three capacitors are available: 2 µF, 3 µF, and 6 µF.",
            "Teen capacitors available hain: 2 µF, 3 µF, aur 6 µF."
          )}
        </T>
      </Fade>

      {/* BEAT 2: Series calculation */}
      <Badge n={1} cx={52} cy={160} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={74} y={165} size={14} fill={RED} weight={700} anchor="start">SERIES ARRANGEMENT</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 5}>
        <g transform="translate(60, 180)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            1/C_s = 1/2 + 1/3 + 1/6 = (3+2+1)/6 = 1
          </T>
        </g>
      </Fade>

      {/* BEAT 3: Series result */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)} dim={beat >= 5}>
        <g transform="translate(60, 250)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill="#fef2f2" stroke={RED} strokeWidth={1.5} />
          <T x={225} y={38} anchor="middle" size={18} fill={RED} weight={800}>
            C_s = 1 µF
          </T>
        </g>
      </Fade>

      {/* BEAT 4: Watch the last step */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={60} y={340} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "Watch out: the reciprocal was 1, so the capacitance itself is 1. Don't forget to flip!",
            "Dhyan do: reciprocal 1 aaya, toh capacitance bhi 1 hai. Flip karna mat bhoolna!"
          )}
        </T>
      </Fade>

      {/* BEAT 5: Parallel calculation */}
      <Badge n={2} cx={540} cy={160} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={165} size={14} fill={RED} weight={700} anchor="start">PARALLEL ARRANGEMENT</T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 6}>
        <g transform="translate(540, 180)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            C_p = 2 + 3 + 6 = 11 µF
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Sanity checks hold */}
      <Fade on={beat >= 6}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Sanity check: 1 µF < 2 µF (smallest) and 11 µF > 6 µF (largest). Correct! ✓",
            "★ Sanity check: 1 µF < 2 µF (sabse chota) aur 11 µF > 6 µF (sabse bada). Sahi hai! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
