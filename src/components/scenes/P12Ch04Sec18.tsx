"use client";

/**
 * P12Ch04 · Section 18 — "Concept Intuition, Part B: Forces and Twists Inside a Wire"
 * Beats (en [0,1,2,3,5,6,7]): 7 beats
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

export default function P12Ch04Sec18({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Force on Wires F = I(L × B) & Torque on Current Loops", "Force on Wires F = I(L × B) & Torque on Current Loops")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1, 2 & 3: Force on Wire & Like Currents Attract */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">PARALLEL WIRES: LIKE CURRENTS ATTRACT</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 6}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={16} fill={INK} weight={800}>
            F = I (L × B)   [F/L = μ₀ I₁ I₂ / (2πd)]
          </T>
          <T x={225} y={52} anchor="middle" size={14} fill={GREEN} weight={800}>
            (Like currents ATTRACT; Unlike currents REPEL!)
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Torque on Current Loop */}
      <Badge n={2} cx={540} cy={140} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">CURRENT LOOP IN UNIFORM B: NET TORQUE</T>
      </Fade>
      <Fade on={beat >= 6} dim={beat >= 7}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            Net Force F_net = 0! (Equal & opposite side forces)
          </T>
          <T x={240} y={52} anchor="middle" size={16} fill={GREEN} weight={800}>
            Net Torque boldsymbol(τ) = M × B  (Loop TWISTS!)
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Like currents attract (F/L = μ0I1I2/2πd)! Closed loop in uniform B experiences zero force but torque τ = M × B! ✓",
            "★ Same direction currents attract karte hain! Uniform B mein closed loop par net force 0 par torque τ = M × B lagta hai! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
