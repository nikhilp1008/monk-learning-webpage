"use client";

/**
 * P12Ch04 · Section 24 — "Worked Examples Three and Four: Mass Spectrometer, and a Loop Beside a Wire"
 * Beats (en [0,1,2,3,4,5,6,9,11,12]): 10 beats
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

export default function P12Ch04Sec24({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("JEE Main & Advanced: Mass Spectrometer & Loop Beside Straight Wire", "JEE Main & Advanced: Mass Spectrometer & Loop Beside Straight Wire")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1, 2, 3 & 4: JEE Main Mass Spectrometer */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">JEE MAIN: MASS SPECTROMETER RADIUS</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 5}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            v = E/B = 1.5 × 10⁵ m/s  ⇒  r = mv / (qB')
          </T>
          <T x={225} y={52} anchor="middle" size={16} fill={GREEN} weight={800}>
            r = 6.2 × 10⁻² m = 6.2 cm
          </T>
        </g>
      </Fade>

      {/* BEAT 5, 6, 9 & 11, 12: JEE Advanced Loop Beside Wire Net Force */}
      <Badge n={2} cx={540} cy={140} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">JEE ADVANCED: LOOP BESIDE WIRE NET FORCE</T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 12}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={14} fill={INK} weight={800}>
            F_near (attraction) − F_far (repulsion)
          </T>
          <T x={240} y={52} anchor="middle" size={16} fill={GREEN} weight={800}>
            F_net = (μ₀ I₁ I₂ a²) / [2π d (d + a)]  (ATTRACTIVE!)
          </T>
        </g>
      </Fade>

      {/* BEAT 12: Summary Chip */}
      <Fade on={beat >= 12}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Mass spectrometer r = 6.2 cm | Loop beside wire net attractive force F_net = μ0 I1 I2 a² / [2π d (d+a)]! ✓",
            "★ Mass spectrometer r = 6.2 cm | Loop beside wire net attractive force F_net = μ0 I1 I2 a² / [2π d (d+a)]! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
