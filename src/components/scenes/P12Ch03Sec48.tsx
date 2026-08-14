"use client";

/**
 * P12Ch02 · Section 48 — "Worked example: which bulb glows brighter in series"
 * Beats (en [0,1,2,4,5,6,7]): 7 beats
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

export default function P12Ch03Sec48({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("NEET Speed Trap: Which Bulb Glows Brighter in Series?", "NEET Speed Trap: Which Bulb Glows Brighter in Series?")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 2: The Trap */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={60} y={120} size={13} fill={MUTED} anchor="start" script>
          {t(
            "100W bulb and 40W bulb (both 240V rated) in SERIES across 240V. Which is brighter?",
            "100W bulb aur 40W bulb (dono 240V) SERIES mein 240V par jude hain. Konsa tez chamkega?"
          )}
        </T>
      </Fade>

      {/* BEAT 4: Calculate Resistances */}
      <Badge n={1} cx={52} cy={160} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={74} y={165} size={14} fill={RED} weight={700} anchor="start">CALCULATE BULB RESISTANCES</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 5}>
        <g transform="translate(60, 180)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={15} fill={INK} weight={800}>
            R₁₀₀ = 240²/100 = 576 Ω   |   R₄₀ = 240²/40 = 1440 Ω
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 6: Series Rule Application */}
      <Badge n={2} cx={540} cy={160} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={165} size={14} fill={RED} weight={700} anchor="start">SERIES P = I² R RULE</T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 6}>
        <g transform="translate(540, 180)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={16} fill={INK} weight={800}>
            In Series, I is common  ⇒  P_actual = I² R
          </T>
          <T x={240} y={52} anchor="middle" size={16} fill={GREEN} weight={800}>
            R₄₀ (1440 Ω) &gt; R₁₀₀ (576 Ω)  ⇒  40W Bulb is BRIGHTER!
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Golden Rule Memory Hook */}
      <Badge n={3} cx={52} cy={290} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={74} y={295} size={14} fill={RED} weight={700} anchor="start">GOLDEN MEMORY HOOK</T>
      </Fade>
      <Fade on={beat >= 6}>
        <g transform="translate(60, 310)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Series: WEAKER rated bulb wins (40W > 100W)! Parallel: STRONGER rated bulb wins (100W > 40W)!",
              "Series: WEAKER rated bulb jeet ti hai (40W > 100W)! Parallel: STRONGER rated bulb jeet ti hai!"
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 8: Summary Chip */}
      <Fade on={beat >= 6}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Result: 40W bulb glows brighter in series! Higher resistance R₄₀ = 1440 Ω wins P = I²R! ✓",
            "★ Result: 40W bulb series mein tez chamkega! Higher resistance R₄₀ = 1440 Ω jeetta hai! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
