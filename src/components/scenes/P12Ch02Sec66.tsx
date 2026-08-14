"use client";

/**
 * P12Ch02 · Section 66 — "The big picture: mastering capacitors"
 * Beats (en [0,8,22,34,51,59,71]): 7 beats
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

export default function P12Ch02Sec66({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("The big picture: mastering capacitors", "The big picture: mastering capacitors")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 330 70 C 440 66, 640 74, 750 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Energy Storage */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">ENERGY STORAGE (THE CORE FUNCTION)</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 3}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Stores ½CV² energy by separating charge.",
              "Charge alag karke ½CV² energy store karta hai."
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 2: Dielectrics */}
      <Badge n={2} cx={52} cy={270} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={74} y={275} size={14} fill={RED} weight={700} anchor="start">DIELECTRICS (THE MULTIPLIER)</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 4}>
        <g transform="translate(60, 290)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Inserting dielectric multiplies C by K.",
              "Dielectric dalne se C, K times multiply ho jata hai."
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 3: Combinations */}
      <Badge n={3} cx={540} cy={140} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">COMBINATIONS (THE NETWORK)</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 5}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={35} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Series = common Q. Parallel = common V.",
              "Series = common Q. Parallel = common V."
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 4: Disconnection / Reconnection */}
      <Badge n={4} cx={540} cy={270} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={562} y={275} size={14} fill={RED} weight={700} anchor="start">CONNECTION & RECONNECTION</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(540, 290)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={35} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Battery off = Q conserved. Connecting = V common, loss.",
              "Battery off = Q conserved. Connecting = V common, loss."
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Transition to Current */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={540} y={420} size={14} fill={MUTED} anchor="middle" script>
          {t(
            "So far, charges were stationary after a brief flow (electrostatics).",
            "Abhi tak charge brief flow ke baad stationary tha (electrostatics)."
          )}
        </T>
      </Fade>

      {/* BEAT 6: Final hook */}
      <Fade on={beat >= 6}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Next chapter: What happens when charge flows CONTINUOUSLY? (Current Electricity) ✓",
            "★ Agla chapter: Kya hoga agar charge CONTINUOUSLY flow kare? (Current Electricity) ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
