"use client";

/**
 * P12Ch02 · Section 20 — "Deriving the potential energy of a dipole in a uniform field"
 * Beats (en [0,7,18,30,34,47,59,72,91]): 9 beats
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

export default function P12Ch02Sec20({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("derivation: dipole PE in a uniform field", "derivation: uniform field mein dipole ki PE")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Diagram — dipole at angle θ in uniform E */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        {/* E field arrows */}
        {[140, 220, 300, 380].map(y => (
          <g key={y}>
            <Draw on={beat >= 1} delay={dl(1, 0.3)} d={`M 80 ${y} h 100`} stroke={AMBER_DARK} sw={1.5} />
            <polygon points={`182,${y} 172,${y-4} 172,${y+4}`} fill={AMBER_DARK} />
          </g>
        ))}
        <T x={100} y={400} size={13} fill={AMBER_DARK} weight={700}>Ē (uniform)</T>

        {/* Dipole tilted at angle */}
        <Draw on={beat >= 1} delay={dl(1, 0.6)} d="M 280 300 L 380 180" stroke={INK} sw={2} dur={0.5} />
        <circle cx={280} cy={300} r={10} fill="#3b82f6" stroke={INK} strokeWidth={1.5} />
        <T x={280} y={304} size={11} fill="#fff" weight={800}>−</T>
        <circle cx={380} cy={180} r={10} fill={RED} stroke={INK} strokeWidth={1.5} />
        <T x={380} y={184} size={11} fill="#fff" weight={800}>+</T>
        <T x={345} y={260} size={14} fill={INK} weight={700}>p̄</T>

        {/* θ arc */}
        <Draw on={beat >= 1} delay={dl(1, 0.9)} d="M 350 240 A 30 30 0 0 1 360 220" stroke={AMBER_DARK} sw={1.5} dur={0.3} />
        <T x={370} y={240} size={13} fill={AMBER_DARK} weight={700}>θ</T>
      </Fade>

      {/* BEAT 2: Net force = 0, pure torque */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={440} y={130} size={14} fill={INK} anchor="start" script>
          {t(
            "Uniform field: forces on ±q cancel → net force = 0, only TORQUE!",
            "Uniform field: ±q pe forces cancel → net force = 0, sirf TORQUE!"
          )}
        </T>
      </Fade>

      {/* BEAT 3: Torque = pE sin θ */}
      <Badge n={1} cx={440} cy={170} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 1)}>
        <T x={462} y={175} size={14} fill={RED} weight={700} anchor="start">TORQUE EXPRESSION</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 7}>
        <g transform="translate(440, 188)">
          <rect x={0} y={5} width={380} height={45} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={190} y={35} anchor="middle" size={20} fill={INK} weight={800}>τ = pE sin θ</T>
        </g>
      </Fade>

      {/* BEAT 4: Quasi-static rotation */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={440} y={265} size={13} fill={MUTED} anchor="start" script>
          {t(
            "External agent rotates dipole quasi-statically (no angular acceleration!)",
            "External agent dipole ko quasi-statically rotate karta (angular acceleration nahi!)"
          )}
        </T>
      </Fade>

      {/* BEAT 5: Work integral */}
      <Badge n={2} cx={440} cy={300} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 1)}>
        <T x={462} y={305} size={14} fill={RED} weight={700} anchor="start">WORK INTEGRAL</T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(440, 318)">
          <rect x={0} y={5} width={500} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={250} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            W_ext = ∫ τ dθ = pE(cos θ₀ − cos θ₁)
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Rotational analogue */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={440} y={398} size={13} fill={MUTED} anchor="start" script>
          {t(
            "τ dθ = rotational analogue of F dx (force × distance)!",
            "τ dθ = F dx ka rotational analogue (force × distance)!"
          )}
        </T>
      </Fade>

      {/* BEAT 7: Final result */}
      <Badge n={3} cx={52} cy={430} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <g transform="translate(72, 415)">
          <rect x={0} y={0} width={520} height={60} rx={10} fill={CREAM} stroke={RED} strokeWidth={2.5} />
          <T x={260} y={40} anchor="middle" size={24} fill={RED} weight={800}>
            U(θ) = −pE cos θ = −p̄ · Ē
          </T>
        </g>
      </Fade>

      {/* BEAT 8: Reference choice */}
      <Fade on={beat >= 8}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Reference: θ₀ = 90° (U = 0 when dipole ⊥ field) — natural choice! ✓",
            "★ Reference: θ₀ = 90° (U = 0 jab dipole ⊥ field) — natural choice! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
