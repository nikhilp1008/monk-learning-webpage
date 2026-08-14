"use client";

/**
 * P12Ch02 · Section 17 — "Formula toolkit: potential energy of charge systems"
 * Beats (en [0,4,13,26,34,45,55,64,74]): 9 beats
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

export default function P12Ch02Sec17({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("formula toolkit: potential energy", "formula toolkit: potential energy")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 260 70 C 440 66, 640 74, 820 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Two-charge PE */}
      <Badge n={1} cx={52} cy={120} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 1)}>
        <T x={74} y={125} size={14} fill={RED} weight={700} anchor="start">TWO-CHARGE PE</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 5}>
        <g transform="translate(60, 140)">
          <rect x={0} y={5} width={460} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={230} y={38} anchor="middle" size={20} fill={INK} weight={800}>
            U = (1/4πε₀) · q₁q₂ / r₁₂
          </T>
        </g>
      </Fade>

      {/* BEAT 2: n-charge system */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={60} y={220} size={13} fill={MUTED} anchor="start" script>
          {t(
            "For n charges: sum over all distinct pairs, factor ½ if double-counting",
            "n charges ke liye: sab distinct pairs ka sum, ½ factor agar double-count ho"
          )}
        </T>
      </Fade>

      {/* BEAT 3: Pairwise sum */}
      <Badge n={2} cx={52} cy={260} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 1)}>
        <T x={74} y={265} size={14} fill={RED} weight={700} anchor="start">n-CHARGE SYSTEM</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 5}>
        <g transform="translate(60, 280)">
          <rect x={0} y={5} width={500} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={250} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            U = (1/4πε₀) Σ_{"{i<j}"} qᵢqⱼ / rᵢⱼ
          </T>
        </g>
      </Fade>

      {/* BEAT 4: Number of pairs */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={60} y={360} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "Number of distinct pairs = n(n−1)/2. For 3 charges: 3 pairs. For 4: 6 pairs!",
            "Distinct pairs ki sankhya = n(n−1)/2. 3 charges: 3 pairs. 4 charges: 6 pairs!"
          )}
        </T>
      </Fade>

      {/* BEAT 5: Bridge U = qV */}
      <Badge n={3} cx={540} cy={120} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 1)}>
        <T x={562} y={125} size={14} fill={RED} weight={700} anchor="start">BRIDGE: U = qV</T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(540, 140)">
          <rect x={0} y={5} width={300} height={55} rx={10} fill={CREAM} stroke={RED} strokeWidth={2.5} />
          <T x={150} y={40} anchor="middle" size={28} fill={RED} weight={800}>U = qV</T>
        </g>
      </Fade>

      {/* BEAT 6: Bridge meaning */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={225} size={13} fill={MUTED} anchor="start" script>
          {t(
            "U (joules) = charge+field system | V (volts) = field property only!",
            "U (joules) = charge+field system | V (volts) = sirf field ki property!"
          )}
        </T>
      </Fade>

      {/* BEAT 7: External field formula */}
      <Fade on={beat >= 7} delay={dl(7, 0.5)}>
        <g transform="translate(540, 260)">
          <rect x={0} y={5} width={460} height={65} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={230} y={30} anchor="middle" size={14} fill={INK} weight={800}>
            Charges in external field:
          </T>
          <T x={230} y={58} anchor="middle" size={16} fill={INK} weight={800}>
            U = q₁V(r₁) + q₂V(r₂) + kq₁q₂/r₁₂
          </T>
        </g>
      </Fade>

      {/* BEAT 8: Takeaway */}
      <Fade on={beat >= 8}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ 3 pieces: each charge × external V + mutual pair interaction ✓",
            "★ 3 pieces: har charge × external V + mutual pair interaction ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
