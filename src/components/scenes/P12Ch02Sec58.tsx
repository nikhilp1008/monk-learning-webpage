"use client";

/**
 * P12Ch02 · Section 58 — "Deriving the parallel combination formula"
 * Beats (en [0,4,15,22,34,49,59]): 7 beats
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

export default function P12Ch02Sec58({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Derivation: capacitors in parallel", "Derivation: capacitors in parallel")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 360 70 C 440 66, 640 74, 720 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Connect them */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)} dim={beat >= 6}>
        <g transform="translate(400, 100)">
          {/* Main wires */}
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M -150 150 L 0 150 L 0 50" stroke={INK} sw={2} />
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M -150 250 L 0 250" stroke={INK} sw={2} />
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 0 50 L 200 50" stroke={INK} sw={2} />
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 0 250 L 200 250" stroke={INK} sw={2} />
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 200 150 L 200 50" stroke={INK} sw={2} />
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 200 150 L 200 250" stroke={INK} sw={2} />
          
          {/* Source V */}
          <line x1={-150} y1={130} x2={-150} y2={170} stroke={INK} strokeWidth={3} />
          <line x1={-150} y1={230} x2={-150} y2={270} stroke={INK} strokeWidth={3} />
          <line x1={-160} y1={150} x2={-140} y2={150} stroke={INK} strokeWidth={2} />
          <line x1={-160} y1={250} x2={-140} y2={250} stroke={INK} strokeWidth={2} />
          {/* Simple battery drawing manually */}
          <line x1={-150} y1={180} x2={-150} y2={220} stroke={INK} strokeWidth={3} />
          <line x1={-160} y1={190} x2={-140} y2={190} stroke={INK} strokeWidth={5} />
          <T x={-120} y={205} size={16} fill={INK} weight={700}>V</T>

          {/* C1 */}
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 0 50 L 0 100" stroke={INK} sw={2} />
          <rect x={-30} y={100} width={60} height={10} fill="#3b82f6" />
          <rect x={-30} y={120} width={60} height={10} fill="#3b82f6" />
          <T x={40} y={115} size={14} fill={INK} weight={700}>C₁</T>

          {/* C2 */}
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 100 50 L 100 100" stroke={INK} sw={2} />
          <rect x={70} y={100} width={60} height={10} fill="#10b981" />
          <rect x={70} y={120} width={60} height={10} fill="#10b981" />
          <T x={140} y={115} size={14} fill={INK} weight={700}>C₂</T>

          {/* C3 */}
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 200 50 L 200 100" stroke={INK} sw={2} />
          <rect x={170} y={100} width={60} height={10} fill="#f59e0b" />
          <rect x={170} y={120} width={60} height={10} fill="#f59e0b" />
          <T x={240} y={115} size={14} fill={INK} weight={700}>C₃</T>
        </g>
      </Fade>

      {/* BEAT 2: Individual charges */}
      <Badge n={1} cx={52} cy={350} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={74} y={355} size={14} fill={RED} weight={700} anchor="start">Q DEPENDS ON C</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 4}>
        <g transform="translate(60, 370)">
          <rect x={0} y={5} width={450} height={40} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={32} anchor="middle" size={16} fill={INK} weight={800}>
            Q₁ = C₁V,   Q₂ = C₂V,   Q₃ = C₃V
          </T>
        </g>
      </Fade>

      {/* BEAT 3: Charges add */}
      <Badge n={2} cx={520} cy={350} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={542} y={355} size={14} fill={RED} weight={700} anchor="start">CHARGES ADD UP</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 5}>
        <g transform="translate(520, 370)">
          <rect x={0} y={5} width={480} height={40} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={32} anchor="middle" size={16} fill={INK} weight={800}>
            Q = Q₁ + Q₂ + Q₃ = V(C₁ + C₂ + C₃)
          </T>
        </g>
      </Fade>

      {/* BEAT 4: V factors out */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={542} y={435} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Here V factors out cleanly because it is the exact same for all.",
            "Yahan V aaram se factor out hota hai kyunki wo sabke liye exact same hai."
          )}
        </T>
      </Fade>

      {/* BEAT 5: Final formula */}
      <Badge n={3} cx={52} cy={460} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={74} y={465} size={14} fill={RED} weight={700} anchor="start">DIVIDE BY V TO GET C_parallel</T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 6}>
        <g transform="translate(60, 480)">
          <rect x={0} y={5} width={450} height={40} rx={8} fill="#ecfdf5" stroke={GREEN} strokeWidth={1.8} />
          <T x={225} y={32} anchor="middle" size={16} fill={INK} weight={800}>
            C_parallel = C₁ + C₂ + C₃
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Always larger */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={60} y={545} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "Because we add directly, C_parallel ALWAYS exceeds the largest member.",
            "Kyunki hum directly add karte hain, C_parallel HAMESHA sabse bade member se bhi bada hota hai."
          )}
        </T>
      </Fade>
    </svg>
  );
}
