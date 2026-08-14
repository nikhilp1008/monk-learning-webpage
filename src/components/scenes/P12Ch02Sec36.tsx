"use client";

/**
 * P12Ch02 · Section 36 — "JEE Main: dielectric with the battery still connected"
 * Beats (en [0,6,19,29,42,51,63,78]): 8 beats
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

export default function P12Ch02Sec36({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("JEE Main: battery connected, dielectric inserted", "JEE Main: battery connected, dielectric inserted")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 220 70 C 440 66, 640 74, 860 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Problem statement */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <g transform="translate(60, 90)">
          <rect x={0} y={5} width={960} height={55} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.5} />
          <T x={20} y={25} size={14} fill={INK} weight={700} anchor="start">GIVEN:</T>
          <T x={20} y={48} size={14} fill={INK} anchor="start" script>
            {t(
              "C₀ = 10 μF, V = 200 V. Battery KEPT CONNECTED. Then dielectric K = 5 inserted.",
              "C₀ = 10 μF, V = 200 V. Battery CONNECTED hai. Phir dielectric K = 5 dala."
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 2: V is king */}
      <Badge n={1} cx={52} cy={175} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={74} y={180} size={14} fill={GREEN} weight={700} anchor="start">BATTERY CONNECTED → V IS KING</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 3}>
        <g transform="translate(60, 195)">
          <rect x={0} y={5} width={460} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={230} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            V = 200 V (Fixed!)  |  C = KC₀ = 50 μF
          </T>
        </g>
      </Fade>

      {/* BEAT 3: Charge flows */}
      <Badge n={2} cx={540} cy={175} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={562} y={180} size={14} fill={RED} weight={700} anchor="start">CHARGE Q INCREASES</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 4}>
        <g transform="translate(540, 195)">
          <rect x={0} y={5} width={480} height={70} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={35} anchor="middle" size={16} fill={MUTED}>Initial: Q₀ = C₀V = 2000 μC</T>
          <T x={240} y={60} anchor="middle" size={20} fill={INK} weight={800}>
            Final: Q = CV = 10000 μC
          </T>
        </g>
      </Fade>

      {/* BEAT 4: Delta Q */}
      <Badge n={3} cx={52} cy={290} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={74} y={295} size={14} fill={RED} weight={700} anchor="start">EXTRA CHARGE FLOWED IN</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(60, 310)">
          <rect x={0} y={5} width={460} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={230} y={38} anchor="middle" size={20} fill={INK} weight={800}>
            ΔQ = 10000 − 2000 = 8000 μC
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Extra charge flowed from battery */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={60} y={400} size={13} fill={MUTED} anchor="start" script>
          {t(
            "That extra charge physically flowed from the battery! (Can't happen if disconnected)",
            "Yeh extra charge literally battery se flow hua! (Disconnected hota toh nahi hota)"
          )}
        </T>
      </Fade>

      {/* BEAT 6: Energy U */}
      <Badge n={4} cx={540} cy={290} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={562} y={295} size={14} fill={RED} weight={700} anchor="start">STORED ENERGY U INCREASES</T>
      </Fade>
      <Fade on={beat >= 6}>
        <g transform="translate(540, 310)">
          <rect x={0} y={5} width={480} height={70} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={35} anchor="middle" size={16} fill={MUTED}>U₀ = ½C₀V² = 0.20 J</T>
          <T x={240} y={60} anchor="middle" size={20} fill={INK} weight={800}>
            U = ½CV² = 1.0 J  (Rose by 5x!)
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Battery work note */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Battery did Work = ΔQ·V = 1.6 J. Stored energy rose by 0.8 J. Rest is heat! ✓",
            "★ Battery ne ΔQ·V = 1.6 J work kiya. Stored energy 0.8 J badhi. Baaki heat mein lost! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
