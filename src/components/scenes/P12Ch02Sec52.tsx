"use client";

/**
 * P12Ch02 · Section 52 — "Series: capacitors in a single-file queue"
 * Beats (en [0,12,20,42,51,61,76]): 7 beats
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

export default function P12Ch02Sec52({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Series: capacitors in a single-file queue", "Series: capacitors ek single-file queue mein")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 300 70 C 440 66, 640 74, 780 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Diagram — Series capacitors */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)} dim={beat >= 6}>
        <g transform="translate(180, 160)">
          {/* Wire and battery */}
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 0 150 L 0 50 L 100 50" stroke={INK} sw={2} />
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 600 150 L 600 50 L 500 50" stroke={INK} sw={2} />
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 0 150 L 280 150" stroke={INK} sw={2} />
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 320 150 L 600 150" stroke={INK} sw={2} />
          {/* Battery symbol */}
          <line x1={280} y1={130} x2={280} y2={170} stroke={INK} strokeWidth={3} />
          <line x1={320} y1={140} x2={320} y2={160} stroke={INK} strokeWidth={5} />
          <T x={300} y={190} size={16} fill={INK} weight={700}>Total V</T>

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

          {/* Wire C3 to end */}
          <line x1={450} y1={50} x2={500} y2={50} stroke={INK} strokeWidth={2} />

          {/* Charges showing up */}
          <Fade on={beat >= 2} delay={dl(2, 0.5)}>
            <T x={90} y={55} size={16} fill={RED} weight={800}>+Q</T>
            <T x={165} y={55} size={16} fill={RED} weight={800}>−Q</T>
            <T x={240} y={55} size={16} fill={RED} weight={800}>+Q</T>
            <T x={315} y={55} size={16} fill={RED} weight={800}>−Q</T>
            <T x={390} y={55} size={16} fill={RED} weight={800}>+Q</T>
            <T x={465} y={55} size={16} fill={RED} weight={800}>−Q</T>
          </Fade>
          
          {/* Voltage drops */}
          <Fade on={beat >= 4} delay={dl(4, 0.5)}>
            <T x={125} y={100} size={14} fill="#3b82f6" weight={700}>V₁</T>
            <T x={275} y={100} size={14} fill="#10b981" weight={700}>V₂</T>
            <T x={425} y={100} size={14} fill="#f59e0b" weight={700}>V₃</T>
          </Fade>
        </g>
      </Fade>

      {/* BEAT 2: Induction mechanism */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={60} y={400} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Battery pushes +Q on first plate, inducing −Q on facing plate, pushing +Q to next...",
            "Battery first plate pe +Q push karti hai, facing plate pe −Q induce hota hai, next pe +Q push hota hai..."
          )}
        </T>
      </Fade>

      {/* BEAT 3: Charge is identical */}
      <Badge n={1} cx={52} cy={450} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={74} y={455} size={14} fill={RED} weight={700} anchor="start">CHARGE Q IS SAME FOR ALL</T>
      </Fade>

      {/* BEAT 4: Voltages split */}
      <Badge n={2} cx={450} cy={450} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={472} y={455} size={14} fill={RED} weight={700} anchor="start">VOLTAGES ADD UP</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(450, 470)">
          <rect x={0} y={5} width={400} height={40} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={200} y={32} anchor="middle" size={16} fill={INK} weight={800}>
            V = V₁ + V₂ + V₃
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Smaller fraction of V */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={60} y={490} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "Each capacitor holds full Q, but only feels a fraction of V.",
            "Har capacitor poora Q hold karta hai, par bas V ka ek fraction mehsoos karta hai."
          )}
        </T>
        <T x={60} y={510} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "So total capacity is LOWER.",
            "Toh total capacity KAM ho jati hai."
          )}
        </T>
      </Fade>

      {/* BEAT 6: Series C is smaller */}
      <Fade on={beat >= 6}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Series capacitance is ALWAYS smaller than the smallest member! ✓",
            "★ Series capacitance HAMESHA sabse chote capacitor se bhi choti hoti hai! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
