"use client";

/**
 * P12Ch02 · Section 33 — "Deriving the energy stored in a capacitor"
 * Beats (en [0,6,16,30,44,56,72,82,97]): 9 beats
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

export default function P12Ch02Sec33({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("derivation: energy stored in a capacitor", "derivation: capacitor ki stored energy")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 300 70 C 440 66, 640 74, 780 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Conceptual */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={60} y={110} size={14} fill={MUTED} anchor="start" script>
          {t(
            "Ferrying charge across gets harder as more charge piles up!",
            "Charge ko idhar se udhar le jana mushkil hota jata hai jaise charge badhta hai!"
          )}
        </T>
      </Fade>

      {/* BEAT 2: dW step */}
      <Badge n={1} cx={52} cy={165} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={74} y={170} size={14} fill={RED} weight={700} anchor="start">STEP 1: WORK FOR dq</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 4}>
        <T x={74} y={195} size={13} fill={INK} anchor="start" script>
          {t(
            "Extra charge dq must cross existing potential V' = q/C",
            "Extra charge dq ko already built potential V' = q/C cross karna padta hai"
          )}
        </T>
      </Fade>

      {/* BEAT 3: dW formula */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)} dim={beat >= 4}>
        <g transform="translate(60, 215)">
          <rect x={0} y={5} width={400} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={200} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            dW = V' dq = (q/C) dq
          </T>
        </g>
      </Fade>

      {/* BEAT 4: Integration */}
      <Badge n={2} cx={520} cy={165} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={542} y={170} size={14} fill={RED} weight={700} anchor="start">STEP 2: INTEGRATE 0 TO Q</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(520, 195)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={42} anchor="middle" size={20} fill={INK} weight={800}>
            W = ∫ (q/C) dq = Q² / (2C)
          </T>
        </g>
      </Fade>

      {/* BEAT 5: The factor of 1/2 */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={542} y={285} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "Factor of ½ comes from integral — it's the average voltage (½V)!",
            "Integral se ½ factor aata hai — yeh average voltage hai (½V)!"
          )}
        </T>
      </Fade>

      {/* BEAT 6: Final U forms */}
      <Badge n={3} cx={52} cy={345} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={74} y={350} size={14} fill={RED} weight={700} anchor="start">TOTAL STORED ENERGY</T>
      </Fade>
      <Fade on={beat >= 6}>
        <g transform="translate(60, 370)">
          <rect x={0} y={0} width={480} height={60} rx={10} fill={CREAM} stroke={RED} strokeWidth={2.5} />
          <T x={240} y={40} anchor="middle" size={22} fill={RED} weight={800}>
            U = Q²/(2C) = ½CV² = ½QV
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Energy density derivation */}
      <Badge n={4} cx={580} cy={345} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={602} y={350} size={14} fill={RED} weight={700} anchor="start">ENERGY DENSITY u</T>
      </Fade>
      <Fade on={beat >= 7}>
        <g transform="translate(580, 370)">
          <rect x={0} y={0} width={420} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={210} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            u = U / (Ad) = ½ε₀E²
          </T>
        </g>
      </Fade>

      {/* BEAT 8: Energy lives in field */}
      <Fade on={beat >= 8}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Deep physics: energy lives in the FIELD itself, not on the plates! ✓",
            "★ Deep physics: energy plates pe nahi, FIELD mein hoti hai! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
