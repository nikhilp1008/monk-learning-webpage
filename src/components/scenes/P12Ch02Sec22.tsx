"use client";

/**
 * P12Ch02 · Section 22 — "NEET speed trap: one over r, not one over r squared"
 * Beats (en [0,6,14,25,36,48,56,66]): 8 beats
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

export default function P12Ch02Sec22({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("NEET speed trap: energy goes as 1/r, NOT 1/r²", "NEET speed trap: energy 1/r hai, 1/r² NAHI")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 180 70 C 400 66, 660 74, 900 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Problem */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <g transform="translate(60, 90)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.5} />
          <T x={20} y={36} size={14} fill={INK} anchor="start" script>
            {t(
              "q₁ = q₂ = +4 μC, r = 0.20 m. Find PE. Students under pressure reach for F = kq²/r²...",
              "q₁ = q₂ = +4 μC, r = 0.20 m. PE nikalo. Pressure mein students F = kq²/r² use karte hain..."
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 2: WARNING — trap */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <g transform="translate(60, 155)">
          <rect x={0} y={0} width={500} height={40} rx={6} fill="#fef2f2" stroke={RED} strokeWidth={2} />
          <T x={250} y={26} anchor="middle" size={15} fill={RED} weight={800}>
            {t("⚠ TRAP: Using 1/r² (force law) instead of 1/r (energy)!", "⚠ TRAP: 1/r² (force law) use karna instead of 1/r (energy)!")}
          </T>
        </g>
      </Fade>

      {/* BEAT 3: Badge 1 — Correct answer */}
      <Badge n={1} cx={52} cy={230} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 1)}>
        <T x={74} y={235} size={14} fill={GREEN} weight={700} anchor="start">✓ CORRECT: U = kq₁q₂ / r</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 5}>
        <g transform="translate(60, 250)">
          <rect x={0} y={5} width={500} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={2} />
          <T x={250} y={38} anchor="middle" size={20} fill={GREEN} weight={800}>
            U = (9×10⁹)(4×10⁻⁶)² / 0.20 = 0.72 J  ✓
          </T>
        </g>
      </Fade>

      {/* BEAT 4: Correct explanation */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={60} y={330} size={13} fill={MUTED} anchor="start" script>
          {t(
            "PE scales as 1/r → divide by 0.20 (not 0.20²!)",
            "PE 1/r se scale hota → 0.20 se divide karo (0.20² se nahi!)"
          )}
        </T>
      </Fade>

      {/* BEAT 5: Badge 2 — Wrong answer */}
      <Badge n={2} cx={52} cy={370} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 1)}>
        <T x={74} y={375} size={14} fill={RED} weight={700} anchor="start">✗ WRONG: Using 1/r² (force law)</T>
      </Fade>
      <Fade on={beat >= 5}>
        <g transform="translate(60, 390)">
          <rect x={0} y={5} width={520} height={50} rx={8} fill="#fef2f2" stroke={RED} strokeWidth={2} />
          <T x={260} y={38} anchor="middle" size={18} fill={RED} weight={800}>
            WRONG = (9×10⁹)(16×10⁻¹²) / (0.20)² = 3.6 J  ✗
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Why wrong */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={60} y={470} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Wrong answer is 5× too big! (0.2² = 0.04 vs 0.2 = 0.20)",
            "Wrong answer 5× zyada hai! (0.2² = 0.04 vs 0.2 = 0.20)"
          )}
        </T>
      </Fade>

      {/* BEAT 7: Speed rule */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ SPEED RULE: PE → 1/r | Force → 1/r². If exponent matches force, you're wrong! ✓",
            "★ SPEED RULE: PE → 1/r | Force → 1/r². Agar exponent force jaisa hai, galat hai! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
