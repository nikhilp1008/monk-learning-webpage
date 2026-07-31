"use client";

/**
 * P12Ch02 · Section 57 — "Deriving the series combination formula"
 * Beats (en [0,5,13,29,36,46,61,74]): 8 beats
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

export default function P12Ch02Sec57({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Derivation: capacitors in series", "Derivation: capacitors in series")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 370 70 C 440 66, 640 74, 710 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Connect them */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)} dim={beat >= 7}>
        <g transform="translate(300, 150)">
          {/* C1 */}
          <rect x={100} y={20} width={10} height={60} fill="#3b82f6" />
          <rect x={140} y={20} width={10} height={60} fill="#3b82f6" />
          <T x={125} y={15} size={14} fill={INK} weight={700}>C₁</T>

          {/* Wire C1 to C2 */}
          <line x1={150} y1={50} x2={250} y2={50} stroke={INK} strokeWidth={2} />
          
          {/* C2 */}
          <rect x={250} y={20} width={10} height={60} fill="#10b981" />
          <rect x={290} y={20} width={10} height={60} fill="#10b981" />
          <T x={275} y={15} size={14} fill={INK} weight={700}>C₂</T>

          {/* Wire C2 to C3 */}
          <line x1={300} y1={50} x2={400} y2={50} stroke={INK} strokeWidth={2} />

          {/* C3 */}
          <rect x={400} y={20} width={10} height={60} fill="#f59e0b" />
          <rect x={440} y={20} width={10} height={60} fill="#f59e0b" />
          <T x={425} y={15} size={14} fill={INK} weight={700}>C₃</T>

          {/* Source wires */}
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 0 150 L 0 50 L 100 50" stroke={INK} sw={2} />
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 550 150 L 550 50 L 450 50" stroke={INK} sw={2} />
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 0 150 L 260 150" stroke={INK} sw={2} />
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 290 150 L 550 150" stroke={INK} sw={2} />
          
          {/* Source V */}
          <line x1={260} y1={130} x2={260} y2={170} stroke={INK} strokeWidth={3} />
          <line x1={290} y1={140} x2={290} y2={160} stroke={INK} strokeWidth={5} />
          <T x={275} y={190} size={16} fill={INK} weight={700}>V</T>

          {/* Charge Q */}
          <Fade on={beat >= 2} delay={dl(2, 0.3)}>
            <T x={90} y={55} size={16} fill={RED} weight={800}>+Q</T>
            <T x={165} y={55} size={16} fill={RED} weight={800}>−Q</T>
            <T x={240} y={55} size={16} fill={RED} weight={800}>+Q</T>
            <T x={315} y={55} size={16} fill={RED} weight={800}>−Q</T>
            <T x={390} y={55} size={16} fill={RED} weight={800}>+Q</T>
            <T x={465} y={55} size={16} fill={RED} weight={800}>−Q</T>
          </Fade>
        </g>
      </Fade>

      {/* BEAT 2: Common Q */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={60} y={350} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Battery deposits +Q and −Q at ends. By induction, every capacitor gets charge Q.",
            "Battery ends pe +Q aur −Q deti hai. Induction se, har capacitor ko charge Q milta hai."
          )}
        </T>
      </Fade>

      {/* BEAT 3: Voltage sum */}
      <Badge n={1} cx={52} cy={400} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={74} y={405} size={14} fill={RED} weight={700} anchor="start">VOLTAGES ADD</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 5}>
        <g transform="translate(60, 420)">
          <rect x={0} y={5} width={450} height={40} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={32} anchor="middle" size={16} fill={INK} weight={800}>
            V = V₁ + V₂ + V₃
          </T>
        </g>
      </Fade>

      {/* BEAT 4: Substitute V = Q/C */}
      <Badge n={2} cx={540} cy={400} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={562} y={405} size={14} fill={RED} weight={700} anchor="start">SUBSTITUTE V = Q/C</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(540, 420)">
          <rect x={0} y={5} width={480} height={40} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={32} anchor="middle" size={16} fill={INK} weight={800}>
            V = Q/C₁ + Q/C₂ + Q/C₃ = Q (1/C₁ + 1/C₂ + 1/C₃)
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Factor out Q */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={540} y={485} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Q factors out cleanly precisely because it is identical for every capacitor.",
            "Q aaram se factor out hota hai kyunki wo har capacitor ke liye identical hai."
          )}
        </T>
      </Fade>

      {/* BEAT 6: Final formula */}
      <Badge n={3} cx={52} cy={490} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={74} y={495} size={14} fill={RED} weight={700} anchor="start">DIVIDE BY Q TO GET 1/C_series</T>
      </Fade>
      <Fade on={beat >= 6} dim={beat >= 7}>
        <g transform="translate(60, 510)">
          <rect x={0} y={5} width={450} height={40} rx={8} fill="#ecfdf5" stroke={GREEN} strokeWidth={1.8} />
          <T x={225} y={32} anchor="middle" size={16} fill={INK} weight={800}>
            1/C_series = 1/C₁ + 1/C₂ + 1/C₃
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Always smaller */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={60} y={575} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "Because we add reciprocals, C_series is ALWAYS smaller than the smallest member.",
            "Kyunki hum reciprocals add karte hain, C_series HAMESHA smallest member se chota hoga."
          )}
        </T>
      </Fade>
    </svg>
  );
}
