"use client";

/**
 * P12Ch05 · Section 2 — "Why you can never hold a single magnetic pole"
 * Subtopic: Bar Magnet, Magnetic Field Lines and Dipole Moment
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

export default function P12Ch05Sec2({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Why You Can Never Hold a Single Magnetic Pole", "Single Magnetic Pole Kyun Nahi Mil Sakta")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 3: Cutting a Magnet Visual */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("CUTTING A MAGNET CREATES TWO NEW MAGNETS", "MAGNET KO KAATNE PAR DO NAYE MAGNETS BAN TAY HAIN")}
        </T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 5}>
        <g transform="translate(60, 160)">
          {/* Original Magnet */}
          <rect x={20} y={10} width={100} height={40} fill={RED} rx={4} />
          <rect x={120} y={10} width={100} height={40} fill={INK} rx={4} />
          <T x={70} y={35} size={18} fill="#ffffff" weight={800}>S</T>
          <T x={170} y={35} size={18} fill="#ffffff" weight={800}>N</T>
          
          <T x={240} y={35} size={24} fill={AMBER_DARK} weight={800}>➔ Cut ➔</T>

          {/* Magnet 1 after cut */}
          <rect x={300} y={10} width={50} height={40} fill={RED} rx={4} />
          <rect x={350} y={10} width={50} height={40} fill={INK} rx={4} />
          <T x={325} y={35} size={16} fill="#ffffff" weight={800}>S</T>
          <T x={375} y={35} size={16} fill="#ffffff" weight={800}>N</T>

          {/* Magnet 2 after cut */}
          <rect x={410} y={10} width={50} height={40} fill={RED} rx={4} />
          <rect x={460} y={10} width={50} height={40} fill={INK} rx={4} />
          <T x={435} y={35} size={16} fill="#ffffff" weight={800}>S</T>
          <T x={485} y={35} size={16} fill="#ffffff" weight={800}>N</T>
        </g>
      </Fade>

      {/* BEAT 5 & 6: Gauss's Law Statement */}
      <Badge n={2} cx={540} cy={140} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("NO MAGNETIC MONOPOLES EXIST (∮ B · dA = 0)", "MAGNETIC MONOPOLES EXIST NAHI KARTE")}
        </T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={18} fill={GREEN} weight={800}>
            ∮ B · dA = 0
          </T>
          <T x={240} y={52} anchor="middle" size={14} fill={INK} weight={700}>
            {t("Net magnetic flux through ANY closed surface is strictly ZERO!", "Kisi bhi closed surface se net magnetic flux ZERO hota hai!")}
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Microscopic Origin */}
      <Badge n={3} cx={52} cy={340} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={74} y={345} size={14} fill={RED} weight={700} anchor="start">
          {t("MICROSCOPIC ORIGIN: ATOMIC CURRENT LOOPS", "ATOMIC CURRENT LOOPS SE MAGNETISM AATI HAI")}
        </T>
      </Fade>
      <Fade on={beat >= 7}>
        <g transform="translate(60, 360)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            {t(
              "Magnetism originates from atomic electron loops! An electron loop has no 'ends', so poles cannot be isolated!",
              "Magnetism atomic electron loops se aati hai! Electron loop ka koi end nahi hota, isliye poles isolate nahi ho sakte!"
            )}
          </T>
        </g>
      </Fade>

      {/* Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={490} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Monopoles do not exist: cutting a magnet yields 2 new dipoles, each with m' = m/2! ✓",
            "★ Monopoles exist nahi karte: magnet kaatne par 2 naye dipoles milte hain, jinka m' = m/2 hota hai! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
