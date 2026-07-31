"use client";

/**
 * P12Ch02 · Section 23 — "Worked example: reading a four-band resistor"
 * Beats (en [0,8,16,24,37,46,52,66]): 8 beats
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

export default function P12Ch03Sec23({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("CBSE Level: Reading a Four-Band Resistor", "CBSE Level: Reading a Four-Band Resistor")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 230 70 C 440 66, 640 74, 850 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Problem statement */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={60} y={120} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Bands in order: Brown, Black, Red, Gold. Find Resistance and Tolerance.",
            "Bands in order: Brown, Black, Red, Gold. Resistance aur Tolerance nikaalein."
          )}
        </T>
      </Fade>

      {/* BEAT 3: Decoding bands */}
      <Badge n={1} cx={52} cy={160} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={74} y={165} size={14} fill={RED} weight={700} anchor="start">DECODE COLOUR BANDS</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 4}>
        <g transform="translate(60, 180)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={15} fill={INK} weight={800}>
            Brown = 1,  Black = 0,  Red = 10²,  Gold = ±5%
          </T>
        </g>
      </Fade>

      {/* BEAT 4 & 5: Value Calculation */}
      <Badge n={2} cx={540} cy={160} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={562} y={165} size={14} fill={RED} weight={700} anchor="start">CALCULATE VALUE & RANGE</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(540, 180)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={16} fill={INK} weight={800}>
            R = (10) × 10² = 1000 Ω = 1 kΩ ± 5%
          </T>
          <T x={240} y={52} anchor="middle" size={14} fill={GREEN} weight={800}>
            True Range: 950 Ω to 1050 Ω
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Warning */}
      <Badge n={3} cx={52} cy={290} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={74} y={295} size={14} fill={RED} weight={700} anchor="start">PRO-TIP: RIGHT ORIENTATION</T>
      </Fade>
      <Fade on={beat >= 6} dim={beat >= 7}>
        <g transform="translate(60, 310)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Always place Gold/Silver band on the RIGHT before reading digits!",
              "Hamesha Gold/Silver band ko RIGHT taraf rakh kar hi digits padhein!"
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Result: R = 1 kΩ ± 5% (Range: 950 Ω – 1050 Ω). Perfect 4-band read! ✓",
            "★ Result: R = 1 kΩ ± 5% (Range: 950 Ω – 1050 Ω). bilkul sahi calculation! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
