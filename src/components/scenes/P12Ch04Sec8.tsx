"use client";

/**
 * P12Ch04 · Section 8 — "Common Pitfalls and Pro-Tips"
 * Beats (en [0,1,2,3,4,6,7]): 7 beats
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

export default function P12Ch04Sec8({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Common Pitfalls & Exam Pro-Tips for Biot-Savart Law", "Common Pitfalls & Exam Pro-Tips for Biot-Savart Law")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 2: Scalar Addition & Collinear Lead Traps */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">COLLINEAR LEADS & SCALAR TRAPS</T>
      </Badge>
      <Fade on={beat >= 1} dim={beat >= 4}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Collinear straight leads pass through point ⇒ dB = 0! Always add fields as VECTORS!",
              "Collinear leads point se paas hote hain ⇒ dB = 0! Fields ko hamesha VECTORS ki tarah jodein!"
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 4 & 6: Pro-Tip: Scaling vs Integration */}
      <Badge n={2} cx={540} cy={140} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">EXAM PRO-TIP: SCALE & SUPERPOSE</T>
      </Badge>
      <Fade on={beat >= 4} dim={beat >= 7}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            Never integrate polygons or arcs from scratch!
          </T>
          <T x={240} y={52} anchor="middle" size={14} fill={GREEN} weight={800}>
            (Scale B_loop = μ₀I/2R and superpose B_wire = (μ₀I/4πa)(sinθ₁ + sinθ₂))
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Key Formulas Summary */}
      <Badge n={3} cx={52} cy={270} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={74} y={275} size={14} fill={RED} weight={700} anchor="start">MEMORISE CORE ANCHORS</T>
      </Badge>
      <Fade on={beat >= 7}>
        <g transform="translate(60, 290)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            B_centre = μ₀ I / (2R)   |   B_wire = (μ₀ I / 4πa) (sin θ₁ + sin θ₂)   [Multiply coil by N]
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Ignore collinear leads, scale loop/wire formulas, and add vectorially for 100% accuracy! ✓",
            "★ Collinear leads ko ignore karein, formulas scale karein, aur vectorially jodein 100% accuracy ke liye! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
