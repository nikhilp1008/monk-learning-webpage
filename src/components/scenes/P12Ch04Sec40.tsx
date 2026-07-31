"use client";

/**
 * P12Ch04 · Section 40 — "Worked Examples Three and Four: Dipole Field and SHM Oscillations"
 * Beats (en [0,4,5,6,8,9,10,11]): 8 beats
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

export default function P12Ch04Sec40({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("JEE Main & Advanced: Dipole Far Field & Vibration Magnetometer SHM", "JEE Main & Advanced: Dipole Far Field & Vibration Magnetometer SHM")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 4: JEE Main Dipole Axial Field */}
      <Badge n={1} cx={52} cy={140} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">JEE MAIN: DIPOLE AXIAL FIELD NUMERICAL</T>
      </Badge>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            B_axial = (10⁻⁷)[2(0.188) / (0.50)³]
          </T>
          <T x={225} y={52} anchor="middle" size={16} fill={GREEN} weight={800}>
            B_axial = 3.0 × 10⁻⁷ T
          </T>
        </g>
      </Fade>

      {/* BEAT 6, 8, 9, 10 & 11: JEE Advanced Vibration Magnetometer SHM */}
      <Badge n={2} cx={540} cy={140} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">JEE ADVANCED: DIPOLE SHM OSCILLATIONS</T>
      </Badge>
      <Fade on={beat >= 6} dim={beat >= 11}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            τ = −mB θ  ⇒  I d²θ/dt² = −mB θ  ⇒  ω² = mB / I
          </T>
          <T x={240} y={52} anchor="middle" size={17} fill={GREEN} weight={800}>
            T = 2π √(I / mB) = 2π √(2.0×10⁻⁴ / 0.02) = 0.63 s
          </T>
        </g>
      </Fade>

      {/* BEAT 11: Summary Chip */}
      <Fade on={beat >= 11}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ B_axial = 3.0 × 10⁻⁷ T | Vibration Magnetometer SHM period T = 2π √(I / mB) = 0.63 s! ✓",
            "★ B_axial = 3.0 × 10⁻⁷ T | Vibration Magnetometer SHM period T = 2π √(I / mB) = 0.63 s! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
