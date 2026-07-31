"use client";

/**
 * P12Ch02 · Section 32 — "Deriving the parallel plate capacitance formula"
 * Beats (en [0,4,19,30,48,66,78,87,96]): 9 beats
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

export default function P12Ch02Sec32({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("derivation: parallel plate capacitance", "derivation: parallel plate capacitance")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 320 70 C 440 66, 640 74, 760 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Diagram */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)} dim={beat >= 6}>
        {/* Plates */}
        <rect x={180} y={120} width={10} height={200} rx={2} fill={RED} />
        <rect x={320} y={120} width={10} height={200} rx={2} fill="#3b82f6" />
        <T x={170} y={150} size={14} fill={RED} weight={800} anchor="end">+Q, A</T>
        <T x={340} y={150} size={14} fill="#3b82f6" weight={800} anchor="start">−Q, A</T>
        {/* d label */}
        <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 190 340 h 130" stroke={INK} sw={1.5} dur={0.4} />
        <T x={255} y={358} size={14} fill={INK} weight={700}>d</T>
        {/* Uniform field inside */}
        {[170, 220, 270].map(y => (
          <g key={y}>
            <Draw on={beat >= 1} delay={dl(1, 0.7)} d={`M 195 ${y} h 120`} stroke={AMBER_DARK} sw={1.5} />
            <polygon points={`317,${y} 307,${y-4} 307,${y+4}`} fill={AMBER_DARK} />
          </g>
        ))}
        <T x={255} y={290} size={14} fill={AMBER_DARK} weight={700}>Ē</T>
      </Fade>

      {/* BEAT 2: Tiny d assumption */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={400} y={120} size={14} fill={MUTED} anchor="start" script>
          {t(
            "Assume d is tiny compared to plate size → field is perfectly uniform inside!",
            "Maan lo d plate size se bahut chota hai → field andar perfectly uniform hai!"
          )}
        </T>
      </Fade>

      {/* BEAT 3: Field E formula */}
      <Badge n={1} cx={400} cy={165} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={422} y={170} size={14} fill={RED} weight={700} anchor="start">STEP 1: FIELD E</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 6}>
        <g transform="translate(400, 185)">
          <rect x={0} y={5} width={400} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={200} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            E = σ/ε₀ = Q / (ε₀A)
          </T>
        </g>
      </Fade>

      {/* BEAT 4: Add inside */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={400} y={260} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "Inside: + sheet pushes, − sheet pulls → both fields add up! (σ/2ε₀ + σ/2ε₀ = σ/ε₀)",
            "Andar: + sheet push karti, − pull karti → dono field add hoti hain!"
          )}
        </T>
      </Fade>

      {/* BEAT 5: Cancel outside */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={400} y={285} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Outside: fields point oppositely and cancel. E = 0 outside!",
            "Bahar: fields opposite point karti aur cancel. E = 0 bahar!"
          )}
        </T>
      </Fade>

      {/* BEAT 6: Potential V */}
      <Badge n={2} cx={52} cy={400} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={74} y={405} size={14} fill={RED} weight={700} anchor="start">STEP 2: POTENTIAL V</T>
      </Fade>
      <Fade on={beat >= 6} dim={beat >= 8}>
        <g transform="translate(60, 420)">
          <rect x={0} y={5} width={380} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={190} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            V = Ed = Qd / (ε₀A)
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Capacitance C */}
      <Badge n={3} cx={500} cy={400} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={522} y={405} size={14} fill={RED} weight={700} anchor="start">STEP 3: CAPACITANCE C</T>
      </Fade>
      <Fade on={beat >= 7}>
        <g transform="translate(500, 420)">
          <rect x={0} y={5} width={500} height={55} rx={10} fill={CREAM} stroke={RED} strokeWidth={2.5} />
          <T x={250} y={40} anchor="middle" size={20} fill={RED} weight={800}>
            C₀ = Q / V = (ε₀A) / d
          </T>
        </g>
      </Fade>

      {/* BEAT 8: Q cancelled */}
      <Fade on={beat >= 8}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Notice Q cancelled out entirely — C depends ONLY on geometry (A, d)! ✓",
            "★ Dhyan do Q poora cancel ho gaya — C SIRF geometry (A, d) pe depend karta hai! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
