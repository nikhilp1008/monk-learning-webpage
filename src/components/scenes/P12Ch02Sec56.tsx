"use client";

/**
 * P12Ch02 · Section 56 — "Formula toolkit: common potential and energy lost"
 * Beats (en [0,5,21,31,43,55,66,79]): 8 beats
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

export default function P12Ch02Sec56({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Common potential and the energy lost on reconnection", "Common potential and energy lost on reconnection")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 150 70 C 440 66, 640 74, 930 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Common potential formula */}
      <Badge n={1} cx={52} cy={120} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={125} size={14} fill={RED} weight={700} anchor="start">COMMON POTENTIAL V_c</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 3}>
        <g transform="translate(60, 140)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={43} anchor="middle" size={20} fill={INK} weight={800}>
            V_c = (C₁V₁ + C₂V₂) / (C₁ + C₂)
          </T>
        </g>
      </Fade>

      {/* BEAT 2: Charge conservation */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={60} y={235} size={13} fill={MUTED} anchor="start" script>
          {t(
            "This is just charge conservation! (Q₁ + Q₂) / (C₁ + C₂)",
            "Yeh bas charge conservation hai! (Q₁ + Q₂) / (C₁ + C₂)"
          )}
        </T>
      </Fade>

      {/* BEAT 3: Energy lost formula */}
      <Badge n={2} cx={540} cy={120} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={562} y={125} size={14} fill={RED} weight={700} anchor="start">ENERGY LOST (HEAT)</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 5}>
        <g transform="translate(540, 140)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={43} anchor="middle" size={18} fill={INK} weight={800}>
            ΔU_lost = ½ [ (C₁C₂) / (C₁ + C₂) ] (V₁ − V₂)²
          </T>
        </g>
      </Fade>

      {/* BEAT 4: Squared term meaning */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={540} y={235} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "Because of (V₁ − V₂)², it is ALWAYS positive or zero. Energy CANNOT increase.",
            "Kyunki (V₁ − V₂)² hai, yeh HAMESHA positive ya zero hoga. Energy badh NAHI sakti."
          )}
        </T>
      </Fade>

      {/* BEAT 5: When does it vanish? */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={540} y={260} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Vanishes ONLY when V₁ = V₂ (no charge flows at all).",
            "Zero SIRF tab hoga jab V₁ = V₂ ho (charge bilkul flow na kare)."
          )}
        </T>
      </Fade>

      {/* BEAT 6: Total initial energy */}
      <Badge n={3} cx={52} cy={340} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={74} y={345} size={14} fill={RED} weight={700} anchor="start">TOTAL ENERGY OF A SYSTEM</T>
      </Fade>
      <Fade on={beat >= 6} dim={beat >= 7}>
        <g transform="translate(60, 360)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={225} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            U_total = ½ C₁ V₁² + ½ C₂ V₂² + ...
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Warning about V */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={60} y={445} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "WARNING: Use each capacitor's OWN voltage. Don't plug the total series voltage in!",
            "WARNING: Har capacitor ka APNA voltage use karo. Total series voltage mat daal dena!"
          )}
        </T>
      </Fade>
    </svg>
  );
}
