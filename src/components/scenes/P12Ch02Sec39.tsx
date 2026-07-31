"use client";

/**
 * P12Ch02 · Section 39 — "Why the field inside a conductor is exactly zero"
 * Beats (en [0,11,21,33,44,57,67]): 7 beats
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

export default function P12Ch02Sec39({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("inside a conductor, the field is exactly zero", "conductor ke andar, field exactly zero hoti hai")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 220 70 C 440 66, 640 74, 860 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Diagram — Conductor in external field */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)} dim={beat >= 5}>
        <ellipse cx={200} cy={200} rx={120} ry={80} fill="#f1f5f9" stroke={INK} strokeWidth={2} />
        {/* External E field */}
        {[140, 170, 200, 230, 260].map((y, i) => (
          <g key={y}>
            <Draw on={beat >= 1} delay={dl(1, 0.5)} d={`M 20 ${y} h 50`} stroke={AMBER_DARK} sw={1.5} />
            <polygon points={`72,${y} 62,${y-4} 62,${y+4}`} fill={AMBER_DARK} />
            <Draw on={beat >= 1} delay={dl(1, 0.5)} d={`M 330 ${y} h 50`} stroke={AMBER_DARK} sw={1.5} />
            <polygon points={`382,${y} 372,${y-4} 372,${y+4}`} fill={AMBER_DARK} />
          </g>
        ))}
        <T x={60} y={120} size={14} fill={AMBER_DARK} weight={700}>E_ext</T>
        {/* Induced charges (on surfaces) */}
        <Fade on={beat >= 2} delay={dl(2, 0.5)}>
          <T x={90} y={205} size={18} fill="#3b82f6" weight={800}>− − −</T>
          <T x={290} y={205} size={18} fill={RED} weight={800}>+ + +</T>
          {/* Induced E field */}
          <Draw on={beat >= 2} delay={dl(2, 1)} d="M 280 200 h -170" stroke={RED} sw={1.5} />
          <polygon points={`108,200 118,196 118,204`} fill={RED} />
          <T x={190} y={185} size={14} fill={RED} weight={700}>E_ind</T>
        </Fade>
      </Fade>

      {/* BEAT 2: Electrons shuffle */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={440} y={120} size={14} fill={MUTED} anchor="start" script>
          {t(
            "External field appears → electrons shuffle → create own opposing field E_ind!",
            "External field aayi → electrons shift hue → apni opposing field E_ind banayi!"
          )}
        </T>
      </Fade>

      {/* BEAT 3: Exactly zero */}
      <Badge n={1} cx={440} cy={175} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={462} y={180} size={14} fill={RED} weight={700} anchor="start">NET FIELD IS ZERO</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 5}>
        <g transform="translate(440, 195)">
          <rect x={0} y={5} width={420} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={210} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            E_net = E_ext − E_ind = 0
          </T>
        </g>
      </Fade>

      {/* BEAT 4: Why zero? */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={440} y={285} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "If E_net ≠ 0, free charges would STILL feel force (F=qE) and move!",
            "Agar E_net ≠ 0 hota, free charges pe AB BHI force lagta aur wo move karte!"
          )}
        </T>
      </Fade>

      {/* BEAT 5: Equilibrium */}
      <Badge n={2} cx={52} cy={355} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={74} y={360} size={14} fill={RED} weight={700} anchor="start">ELECTROSTATIC EQUILIBRIUM</T>
      </Fade>
      <Fade on={beat >= 5}>
        <g transform="translate(60, 375)">
          <rect x={0} y={0} width={900} height={45} rx={6} fill="#fef2f2" stroke={RED} strokeWidth={2} />
          <T x={450} y={28} anchor="middle" size={14} fill={RED} weight={800}>
            {t(
              "The crowd ONLY settles once NOBODY is being pushed. Equilibrium means E=0 inside.",
              "Bheed TABHI shant hoti hai jab KISI KO dhakka na lage. Equilibrium means andar E=0."
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Important caveat */}
      <Fade on={beat >= 6}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ This holds ONLY in electrostatics. When current flows (batteries), E ≠ 0 inside! ✓",
            "★ Yeh SIRF electrostatics mein hota hai. Jab current behta hai, andar E ≠ 0! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
