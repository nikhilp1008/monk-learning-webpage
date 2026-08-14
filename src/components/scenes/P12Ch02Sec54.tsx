"use client";

/**
 * P12Ch02 · Section 54 — "Reconnecting charged capacitors — energy always leaks away"
 * Beats (en [0,7,14,24,34,47,62]): 7 beats
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

export default function P12Ch02Sec54({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Reconnecting two already-charged capacitors", "Do already-charged capacitors ko reconnect karna")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 220 70 C 440 66, 640 74, 860 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Diagram — Reconnection */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)} dim={beat >= 6}>
        <g transform="translate(180, 160)">
          {/* Main wires */}
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 100 50 L 300 50" stroke={INK} sw={2} />
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 100 150 L 300 150" stroke={INK} sw={2} />
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 100 50 L 100 150" stroke={INK} sw={2} />
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 300 50 L 300 150" stroke={INK} sw={2} />

          {/* Switch top */}
          <line x1={180} y1={50} x2={220} y2={20} stroke={RED} strokeWidth={3} />
          {/* Switch bottom */}
          <line x1={180} y1={150} x2={220} y2={120} stroke={RED} strokeWidth={3} />

          {/* C1 */}
          <rect x={70} y={95} width={60} height={10} fill="#3b82f6" />
          <rect x={70} y={115} width={60} height={10} fill="#3b82f6" />
          <T x={40} y={110} size={14} fill={INK} weight={700}>C₁</T>
          <T x={140} y={100} size={12} fill="#3b82f6" weight={700}>V₁</T>

          {/* C2 */}
          <rect x={270} y={95} width={60} height={10} fill="#10b981" />
          <rect x={270} y={115} width={60} height={10} fill="#10b981" />
          <T x={340} y={110} size={14} fill={INK} weight={700}>C₂</T>
          <T x={250} y={100} size={12} fill="#10b981" weight={700}>V₂</T>

          {/* Charge flow */}
          <Fade on={beat >= 2} delay={dl(2, 0.5)}>
            <Draw on={beat >= 2} delay={dl(2, 0.8)} d="M 190 20 L 210 20" stroke={RED} sw={2} />
            <polygon points="210,20 202,16 202,24" fill={RED} />
            <T x={200} y={10} size={12} fill={RED} weight={700}>charge sloshes</T>
          </Fade>
        </g>
      </Fade>

      {/* BEAT 2: Common potential */}
      <Badge n={1} cx={520} cy={120} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={542} y={125} size={14} fill={RED} weight={700} anchor="start">CHARGE SLOSHES TO V_common</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 4}>
        <T x={542} y={150} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Flows from higher V to lower V",
            "Higher V se lower V ki taraf flow karta hai"
          )}
        </T>
        <T x={542} y={170} size={13} fill={MUTED} anchor="start" script>
          {t(
            "until they settle at a single common voltage.",
            "jab tak ek common voltage pe settle na ho."
          )}
        </T>
      </Fade>

      {/* BEAT 3: Charge conserved */}
      <Badge n={2} cx={520} cy={200} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={542} y={205} size={14} fill={RED} weight={700} anchor="start">TOTAL CHARGE CONSERVED</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 5}>
        <g transform="translate(520, 220)">
          <rect x={0} y={5} width={450} height={40} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={225} y={32} anchor="middle" size={16} fill={INK} weight={800}>
            Q_total = Q₁ + Q₂ (constant)
          </T>
        </g>
      </Fade>

      {/* BEAT 4: Energy NOT conserved */}
      <Badge n={3} cx={52} cy={350} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={74} y={355} size={14} fill={RED} weight={700} anchor="start">ENERGY IS LOST!</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <T x={74} y={380} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "Some energy is ALWAYS lost as heat/sparks in the wires.",
            "Kuch energy wires mein heat/sparks ke form mein HAMESHA lose hoti hai."
          )}
        </T>
      </Fade>

      {/* BEAT 5: When is it 0? */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={74} y={420} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Loss is unavoidable, vanishes ONLY if V₁ = V₂ originally (no flow needed).",
            "Loss unavoid hai, SIRF tab zero hota hai jab initially V₁ = V₂ ho (koi flow na ho)."
          )}
        </T>
      </Fade>

      {/* BEAT 6: Like to like */}
      <Fade on={beat >= 6}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ This assumes + plate to + plate. If reversed, total charge is |Q₁ - Q₂|! ✓",
            "★ Yeh tab hai jab + plate ko + se joda ho. Agar ulta joda, toh total charge |Q₁ - Q₂| hoga! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
