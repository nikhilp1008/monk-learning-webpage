"use client";

/**
 * P12Ch02 · Section 26 — "Capacitance — the water tank of charge storage"
 * Beats (en [0,6,19,31,40,50,62,72]): 8 beats
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

export default function P12Ch02Sec26({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("capacitance: storage capacity for charge", "capacitance: charge storage capacity")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 220 70 C 440 66, 640 74, 860 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Water tank analogy */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={60} y={110} size={14} fill={MUTED} anchor="start" script>
          {t(
            "Pour water → level rises. Rate depends on volume poured AND tank shape!",
            "Paani daalo → level badhta. Rate volume AND tank shape pe depend karta!"
          )}
        </T>
      </Fade>

      {/* BEAT 2: Diagram — parallel plate capacitor */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)} dim={beat >= 5}>
        {/* Plates */}
        <rect x={200} y={140} width={10} height={180} rx={2} fill={RED} />
        <rect x={380} y={140} width={10} height={180} rx={2} fill="#3b82f6" />
        <T x={195} y={340} size={13} fill={RED} weight={700}>+Q</T>
        <T x={385} y={340} size={13} fill="#3b82f6" weight={700}>−Q</T>
        {/* E field lines */}
        {[170, 210, 250, 290].map(y => (
          <g key={y}>
            <Draw on={beat >= 2} delay={dl(2, 0.5)} d={`M 215 ${y} h 160`} stroke={AMBER_DARK} sw={1.2} />
            <polygon points={`377,${y} 367,${y-3} 367,${y+3}`} fill={AMBER_DARK} />
          </g>
        ))}
        <T x={295} y={365} size={12} fill={AMBER_DARK} weight={700}>Ē</T>
        {/* V label */}
        <Draw on={beat >= 2} delay={dl(2, 0.8)} d="M 205 380 h 180" stroke={INK} sw={1} />
        <T x={295} y={398} size={13} fill={INK} weight={700}>V</T>
      </Fade>

      {/* BEAT 3: Charge ↔ voltage analogy */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={440} y={160} size={14} fill={INK} anchor="start" script>
          {t(
            "Swap water for charge, level for voltage → capacitor!",
            "Paani ki jagah charge, level ki jagah voltage → capacitor!"
          )}
        </T>
      </Fade>

      {/* BEAT 4: Definition */}
      <Badge n={1} cx={440} cy={200} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 1)}>
        <T x={462} y={205} size={14} fill={RED} weight={700} anchor="start">DEFINITION OF CAPACITANCE</T>
      </Fade>
      <Fade on={beat >= 4}>
        <g transform="translate(440, 220)">
          <rect x={0} y={0} width={300} height={60} rx={10} fill={CREAM} stroke={RED} strokeWidth={2.5} />
          <T x={150} y={40} anchor="middle" size={28} fill={RED} weight={800}>C = Q / V</T>
        </g>
      </Fade>

      {/* BEAT 5: Large C meaning */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={440} y={310} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Large C → soaks up lots of charge with barely changing voltage!",
            "Bada C → bahut charge store karta voltage thoda badal ke!"
          )}
        </T>
      </Fade>

      {/* BEAT 6: Physical structure */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <g transform="translate(60, 420)">
          <rect x={0} y={5} width={960} height={45} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.5} />
          <T x={480} y={34} anchor="middle" size={13} fill={INK} script>
            {t(
              "In practice: two conductors separated by insulator. Simplest = parallel plates!",
              "Practically: do conductors insulator se separated. Simplest = parallel plates!"
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Uniform field */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ +Q on one plate, −Q on other → uniform field in gap → V across plates ✓",
            "★ Ek plate pe +Q, doosri pe −Q → gap mein uniform field → plates ke beech V ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
