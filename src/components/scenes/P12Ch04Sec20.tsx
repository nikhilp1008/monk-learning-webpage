"use client";

/**
 * P12Ch04 · Section 20 — "Derivation A: Circular Motion and the Cyclotron Condition"
 * Beats (en [0,1,3,5,6,8,11,12]): 8 beats
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

export default function P12Ch04Sec20({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Board Derivation: Circular Motion Radius & Cyclotron Condition", "Board Derivation: Circular Motion Radius & Cyclotron Condition")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 3: Centripetal Equivalence & Radius */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">CENTRIPETAL FORCE EQUIVALENCE & RADIUS</T>
      </Badge>
      <Fade on={beat >= 1} dim={beat >= 5}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            q v B = m v² / r  ⇒  r = m v / (q B)
          </T>
          <T x={225} y={52} anchor="middle" size={14} fill={AMBER_DARK} weight={700}>
            (Faster/heavier charge → larger circle!)
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 6: Speed-Independent Period */}
      <Badge n={2} cx={540} cy={140} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">CYCLOTRON RESONANCE CONDITION</T>
      </Badge>
      <Fade on={beat >= 5} dim={beat >= 11}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            T = (2πr) / v = (2π/v) [mv / qB]
          </T>
          <T x={240} y={52} anchor="middle" size={18} fill={GREEN} weight={800}>
            ⇒  T = (2π m) / (q B)  (SPEED INDEPENDENT!)
          </T>
        </g>
      </Fade>

      {/* BEAT 11 & 12: Max Kinetic Energy */}
      <Badge n={3} cx={52} cy={270} on={beat >= 11} delay={dl(11, 0.4)} />
      <Fade on={beat >= 11} delay={dl(11, 0.8)}>
        <T x={74} y={275} size={14} fill={RED} weight={700} anchor="start">MAXIMUM KINETIC ENERGY</T>
      </Badge>
      <Fade on={beat >= 11}>
        <g transform="translate(60, 290)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={18} fill={GREEN} weight={800}>
            At Outer Dee Radius R:  v_max = qBR/m  ⇒  K_max = (q² B² R²) / (2 m)
          </T>
        </g>
      </Fade>

      {/* BEAT 12: Summary Chip */}
      <Fade on={beat >= 11}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Derived! r = mv/qB, T = 2πm/qB (speed-independent resonance), and K_max = q²B²R²/2m! ✓",
            "★ Derived! r = mv/qB, T = 2πm/qB (speed-independent resonance), aur K_max = q²B²R²/2m! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
