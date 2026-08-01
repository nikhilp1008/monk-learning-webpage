"use client";

/**
 * P12Ch05 · Section 41 — "Iron core solenoid: computing B, M and lost power"
 * Subtopic: Magnetic Properties of Materials
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

export default function P12Ch05Sec41({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Iron Core Solenoid: Computing B, M and Hysteresis Power Loss", "Iron Core Solenoid: B, M aur Power Loss Calculation")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 3: Compute H and M */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("STEP 1: COMPUTE H AND MAGNETIZATION M", "STEP 1: H AUR MAGNETIZATION M COMPUTE KAREIN")}
        </T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 5}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            H = n I = 1000 × 2 = 2000 A/m
          </T>
          <T x={225} y={52} anchor="middle" size={14} fill={AMBER_DARK} weight={700}>
            M = (μ_r − 1) H = 499 × 2000 = 9.98 × 10⁵ A/m
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 6: Compute Total Field B */}
      <Badge n={2} cx={540} cy={140} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("STEP 2: TOTAL FIELD B AND POWER LOSS", "STEP 2: TOTAL FIELD B AUR POWER LOSS")}
        </T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            B = μ₀ μ_r H = (4π × 10⁻⁷) × 500 × 2000 ≈ 1.257 T
          </T>
          <T x={240} y={52} anchor="middle" size={16} fill={GREEN} weight={800}>
            P_loss = Area × V × f = 100 × 10⁻³ × 50 = 5.0 W
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Full Solenoid Result */}
      <Badge n={3} cx={52} cy={340} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={74} y={345} size={14} fill={RED} weight={700} anchor="start">
          {t("COMPLETE NUMERICAL RECAP", "COMPLETE NUMERICAL RECAP")}
        </T>
      </Fade>
      <Fade on={beat >= 7}>
        <g transform="translate(60, 360)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            Solenoid: H = 2000 A/m, M = 9.98 × 10⁵ A/m, Total B = 1.257 Tesla, Power Lost = 5.0 Watts!
          </T>
        </g>
      </Fade>

      {/* Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={490} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Solenoid Numerical: H = 2000 A/m, M = 9.98×10⁵ A/m, Total B = 1.257 T, Lost Power P = 5.0 W! ✓",
            "★ Solenoid Numerical: H = 2000 A/m, M = 9.98×10⁵ A/m, Total B = 1.257 T, Lost Power P = 5.0 W! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
