"use client";

/**
 * P12Ch02 · Section 48 — "NEET speed trap: induced charges on a cavity"
 * Beats (en [0,5,18,30,43,53,63,76]): 8 beats
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

export default function P12Ch02Sec48({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("NEET speed trap: charge inside a cavity", "NEET speed trap: charge inside a cavity")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 300 70 C 440 66, 640 74, 780 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Diagram — Cavity in neutral conductor */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)} dim={beat >= 7}>
        <g transform="translate(140, 160)">
          {/* Outer blob */}
          <path d="M 50 100 Q 80 0 200 50 T 350 100 Q 400 200 300 250 T 50 100 Z" fill="#e2e8f0" stroke={INK} strokeWidth={2} />
          {/* Cavity */}
          <circle cx={200} cy={140} r={50} fill="#ffffff" stroke={INK} strokeWidth={1.5} />
          <T x={120} y={60} size={14} fill={INK} weight={700}>NEUTRAL METAL</T>
          {/* Charge inside cavity */}
          <circle cx={200} cy={140} r={6} fill={RED} />
          <T x={200} y={160} size={14} fill={RED} weight={800}>+5 nC</T>
          
          {/* Induced inner charge */}
          <Fade on={beat >= 4} delay={dl(4, 0.5)}>
            <T x={200} y={80} size={14} fill="#3b82f6" weight={800}>−5 nC</T>
            <T x={155} y={145} size={14} fill="#3b82f6" weight={800}>−</T>
            <T x={245} y={145} size={14} fill="#3b82f6" weight={800}>−</T>
            <T x={200} y={205} size={14} fill="#3b82f6" weight={800}>−</T>
          </Fade>
          {/* Induced outer charge */}
          <Fade on={beat >= 5} delay={dl(5, 0.5)}>
            <T x={200} y={30} size={14} fill={RED} weight={800}>+5 nC</T>
            <T x={30} y={105} size={14} fill={RED} weight={800}>+</T>
            <T x={370} y={150} size={14} fill={RED} weight={800}>+</T>
            <T x={280} y={260} size={14} fill={RED} weight={800}>+</T>
            <T x={100} y={240} size={14} fill={RED} weight={800}>+</T>
          </Fade>
          {/* Gaussian surface */}
          <Fade on={beat >= 3} delay={dl(3, 0.5)}>
            <circle cx={200} cy={140} r={65} fill="none" stroke={AMBER_DARK} strokeWidth={2} strokeDasharray="6 4" />
            <T x={280} y={190} size={12} fill={AMBER_DARK} weight={700}>Gaussian Surface</T>
          </Fade>
        </g>
      </Fade>

      {/* BEAT 2: The Trap */}
      <Badge n={1} cx={580} cy={120} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={602} y={125} size={14} fill={RED} weight={700} anchor="start">THE TRAP</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 7}>
        <g transform="translate(580, 140)">
          <rect x={0} y={0} width={450} height={50} rx={6} fill="#fef2f2" stroke={RED} strokeWidth={2} />
          <T x={225} y={18} anchor="middle" size={13} fill={RED} weight={700} script>
            {t(
              "Students forget neutral conductors REARRANGE charge",
              "Students bhool jate hain neutral conductor charge REARRANGE karta hai"
            )}
          </T>
          <T x={225} y={42} anchor="middle" size={13} fill={RED} weight={700} script>
            {t(
              "to keep internal E=0 when a +5nC charge is inside!",
              "taki andar E=0 rahe jab +5nC charge cavity mein ho!"
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 3: Gaussian surface reasoning */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={580} y={220} size={13} fill={INK} anchor="start" script>
          {t(
            "Draw Gaussian surface inside metal. Since E=0, total q_enclosed = 0.",
            "Metal ke andar Gaussian surface draw karo. Kyunki E=0, total q_enclosed = 0."
          )}
        </T>
      </Fade>

      {/* BEAT 4: Inner charge */}
      <Badge n={2} cx={580} cy={250} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={602} y={255} size={14} fill={RED} weight={700} anchor="start">INNER SURFACE CHARGE</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 7}>
        <g transform="translate(580, 270)">
          <rect x={0} y={5} width={450} height={40} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={32} anchor="middle" size={18} fill={INK} weight={800}>
            q_inner = −5 nC
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Outer charge */}
      <Badge n={3} cx={580} cy={340} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={602} y={345} size={14} fill={RED} weight={700} anchor="start">OUTER SURFACE CHARGE</T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(580, 360)">
          <rect x={0} y={5} width={450} height={40} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={32} anchor="middle" size={18} fill={INK} weight={800}>
            q_outer = +5 nC  (since total=0)
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Field outside */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={580} y={430} size={13} fill={MUTED} anchor="start" script>
          {t(
            "From outside, it looks exactly like a +5 nC point charge!",
            "Bahar se, yeh exactly +5 nC point charge jaisa dikhta hai!"
          )}
        </T>
      </Fade>

      {/* BEAT 7: Speed rule */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ RULE: Enclosed charge q gives inner surface −q, outer surface +q (for neutral blob)! ✓",
            "★ RULE: Enclosed charge q gives inner surface −q, outer surface +q (neutral blob pe)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
