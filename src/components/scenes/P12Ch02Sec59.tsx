"use client";

/**
 * P12Ch02 · Section 59 — "Deriving the common potential and the energy loss"
 * Beats (en [0,5,18,27,33,42,50,60]): 8 beats
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

export default function P12Ch02Sec59({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Derivation: common potential and energy loss", "Derivation: common potential aur energy loss")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 280 70 C 440 66, 640 74, 800 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Setup */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={60} y={120} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Two capacitors with Q₁ = C₁V₁ and Q₂ = C₂V₂ are connected (like plate to like plate).",
            "Do capacitors Q₁ = C₁V₁ aur Q₂ = C₂V₂ ko joda gaya hai (like plate to like plate)."
          )}
        </T>
      </Fade>

      {/* BEAT 2: Common potential */}
      <Badge n={1} cx={52} cy={160} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={74} y={165} size={14} fill={RED} weight={700} anchor="start">CONSERVE TOTAL CHARGE</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 3}>
        <g transform="translate(60, 180)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            V_c = (Q₁ + Q₂) / (C₁ + C₂) = (C₁V₁ + C₂V₂) / (C₁ + C₂)
          </T>
        </g>
      </Fade>

      {/* BEAT 3: Initial energy */}
      <Badge n={2} cx={540} cy={160} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={562} y={165} size={14} fill={RED} weight={700} anchor="start">INITIAL TOTAL ENERGY</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 4}>
        <g transform="translate(540, 180)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            U_before = ½ C₁V₁² + ½ C₂V₂²
          </T>
        </g>
      </Fade>

      {/* BEAT 4: Final energy */}
      <Badge n={3} cx={540} cy={260} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={562} y={265} size={14} fill={RED} weight={700} anchor="start">FINAL TOTAL ENERGY (COMMON V_c)</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 5}>
        <g transform="translate(540, 280)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            U_after = ½ (C₁ + C₂) V_c²
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Difference */}
      <Badge n={4} cx={52} cy={350} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={74} y={355} size={14} fill={RED} weight={700} anchor="start">DIFFERENCE: U_before - U_after</T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(60, 370)">
          <rect x={0} y={5} width={960} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={43} anchor="middle" size={20} fill={INK} weight={800}>
            ΔU_lost = ½ [ (C₁C₂) / (C₁ + C₂) ] (V₁ − V₂)²  ≥  0
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Always positive */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={60} y={465} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "The squared difference (V₁ − V₂)² guarantees the loss is never negative.",
            "Squared difference (V₁ − V₂)² ki wajah se loss kabhi negative nahi ho sakta."
          )}
        </T>
      </Fade>

      {/* BEAT 7: Vanishes only if V1=V2 */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={520} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Loss is unavoidable (heat/sparks) and vanishes ONLY if V₁ = V₂ initially! ✓",
            "★ Loss unavoidable hai (heat/sparks) aur SIRF tab zero hoga agar initially V₁ = V₂ ho! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
