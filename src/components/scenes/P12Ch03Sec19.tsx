"use client";

/**
 * P12Ch02 · Section 19 — "Why metals and semiconductors respond oppositely"
 * Beats (en [0,10,20,31,41,49,61,74]): 8 beats
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

export default function P12Ch03Sec19({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Metals vs Semiconductors: Opposite Temperature Response", "Metals vs Semiconductors: Opposite Temperature Response")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 2 & 3: Metals */}
      <Badge n={1} cx={52} cy={140} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">METALS (n IS FIXED, τ DROPS)</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 4}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "T ↑ ⇒ Lattice vibrates ⇒ τ ↓ ⇒ ρ ↑ (Positive α)",
              "T ↑ ⇒ Lattice vibrate karta hai ⇒ τ ↓ ⇒ ρ ↑ (Positive α)"
            )}
          </T>
          <T x={225} y={52} anchor="middle" size={13} fill={RED} weight={700}>
            {t("Resistivity increases with temperature", "Temperature ke sath resistivity badhti hai")}
          </T>
        </g>
      </Fade>

      {/* BEAT 4 & 5: Semiconductors */}
      <Badge n={2} cx={540} cy={140} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">SEMICONDUCTORS (n CLIMBS EXPONENTIALLY)</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 7}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "T ↑ ⇒ Bonds break ⇒ n ↑↑ exponentially ⇒ ρ ↓ (Negative α)",
              "T ↑ ⇒ Bonds tutte hain ⇒ n ↑↑ exponentially ⇒ ρ ↓ (Negative α)"
            )}
          </T>
          <T x={240} y={52} anchor="middle" size={13} fill={GREEN} weight={700}>
            {t("Resistivity DECREASES with temperature", "Temperature ke sath resistivity GHAT TI hai")}
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Alloys (Manganin/Constantan) */}
      <Badge n={3} cx={52} cy={340} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={74} y={345} size={14} fill={RED} weight={700} anchor="start">ALLOYS (MANGANIN / CONSTANTAN)</T>
      </Fade>
      <Fade on={beat >= 7}>
        <g transform="translate(60, 360)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Alloys: α ≈ 0. Resistivity is almost independent of temperature! (Used for standard resistors)",
              "Alloys: α ≈ 0. Resistivity temperature se bilkul change nahi hoti! (Standard resistors ke liye)"
            )}
          </T>
        </g>
      </Fade>
    </svg>
  );
}
