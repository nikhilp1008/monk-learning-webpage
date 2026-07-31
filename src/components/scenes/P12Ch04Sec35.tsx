"use client";

/**
 * P12Ch04 · Section 35 — "Concept Intuition: The Current Loop Is the Atom of Magnetism"
 * Beats (en [0,1,3,4,5,7]): 6 beats
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

export default function P12Ch04Sec35({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Subtopic Five: The Current Loop as a Magnetic Dipole", "Subtopic Five: The Current Loop as a Magnetic Dipole")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 3: Magnetic Dipole Moment Definition */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">MAGNETIC DIPOLE MOMENT VEC(m)</T>
      </Badge>
      <Fade on={beat >= 1} dim={beat >= 4}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={18} fill={INK} weight={800}>
            \vec{m} = N I \vec{A}   [\text{A m}²]
          </T>
        </g>
      </Fade>

      {/* BEAT 4 & 5: Right-Hand Rule & Electric Dipole Analogy */}
      <Badge n={2} cx={540} cy={140} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">RIGHT-HAND RULE & ELECTRIC DIPOLE ANALOGY</T>
      </Badge>
      <Fade on={beat >= 4} dim={beat >= 7}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={14} fill={INK} weight={800}>
            Curl fingers along I ⇒ Thumb points along \vec{m}
          </T>
          <T x={240} y={52} anchor="middle" size={14} fill={GREEN} weight={800}>
            Magnetic dipole \vec{m} mirror of electric dipole \vec{p}!
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Orbiting Electron as Atomic Magnet */}
      <Badge n={3} cx={52} cy={270} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={74} y={275} size={14} fill={RED} weight={700} anchor="start">ORBITING ELECTRON: BOHR MAGNETON</T>
      </Badge>
      <Fade on={beat >= 7}>
        <g transform="translate(60, 290)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            An electron circulating in atomic orbit is a microscopic current loop = natural magnet!
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Magnetic dipole moment m = NIA (A m²); orbiting electron acts as atomic magnetic dipole! ✓",
            "★ Magnetic dipole moment m = NIA (A m²); orbiting electron atomic magnetic dipole ki tarah behave karta hai! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
