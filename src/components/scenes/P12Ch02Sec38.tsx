"use client";

/**
 * P12Ch02 · Section 38 — "Pitfalls: the battery check and the right energy formula"
 * Beats (en [0,4,14,26,40,57,70,90]): 8 beats
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

export default function P12Ch02Sec38({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("common pitfalls in capacitance and dielectrics", "capacitance aur dielectrics ke common pitfalls")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 220 70 C 440 66, 640 74, 860 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Pitfall 1 — C depends on Q or V */}
      <Badge n={1} cx={52} cy={115} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={120} size={14} fill={RED} weight={700} anchor="start">
          PITFALL 1: Believing C depends on Q or V
        </T>
      </Fade>

      {/* BEAT 2: Geometry only */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={74} y={145} size={13} fill={MUTED} anchor="start" script>
          {t(
            "It does NOT! C is geometry and dielectric ONLY (A, d, K).",
            "Nahi! C sirf geometry aur dielectric pe depend karta hai (A, d, K)."
          )}
        </T>
      </Fade>

      {/* BEAT 3: Pitfall 2 — Skipping battery check */}
      <Badge n={2} cx={52} cy={205} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={74} y={210} size={14} fill={RED} weight={700} anchor="start">
          PITFALL 2: Skipping the battery check
        </T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 6}>
        <g transform="translate(74, 225)">
          <rect x={0} y={0} width={600} height={40} rx={6} fill="#fef2f2" stroke={RED} strokeWidth={2} />
          <T x={300} y={26} anchor="middle" size={14} fill={RED} weight={800}>
            {t("⚠ Number ONE error in this subtopic!", "⚠ Is subtopic ki sabse BADI galti!")}
          </T>
        </g>
      </Fade>

      {/* BEAT 4: Wrong energy formula */}
      <Badge n={3} cx={52} cy={305} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={74} y={310} size={14} fill={RED} weight={700} anchor="start">
          PITFALL 3: Picking the wrong energy formula
        </T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <T x={74} y={335} size={13} fill={INK} anchor="start" script>
          {t(
            "Wrong formula buries K-scaling under unnecessary algebra.",
            "Galat formula K-scaling ko unnecessary algebra mein daba deta hai."
          )}
        </T>
      </Fade>

      {/* BEAT 5: Energy squared / heat */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={74} y={360} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "Remember: U scales with V² (not V), and charging ALWAYS wastes half energy as heat!",
            "Yaad rakho: U scale karta V² (not V) se, aur charging HAMESHA half energy heat mein waste karti hai!"
          )}
        </T>
      </Fade>

      {/* BEAT 6: Reflex 1 — Disconnected */}
      <Badge n={4} cx={52} cy={430} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={74} y={435} size={14} fill={RED} weight={700} anchor="start">
          PRO-TIP: BUILD THE TWO-BRANCH REFLEX
        </T>
      </Fade>
      <Fade on={beat >= 6}>
        <g transform="translate(74, 450)">
          <rect x={0} y={0} width={420} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={210} y={22} anchor="middle" size={13} fill={AMBER_DARK} weight={700}>DISCONNECTED?</T>
          <T x={210} y={40} anchor="middle" size={14} fill={INK} weight={700}>Write Q = constant! Use U = Q²/(2C)</T>
        </g>
      </Fade>

      {/* BEAT 7: Reflex 2 — Connected */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <g transform="translate(520, 450)">
          <rect x={0} y={0} width={420} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={210} y={22} anchor="middle" size={13} fill={GREEN} weight={700}>CONNECTED?</T>
          <T x={210} y={40} anchor="middle" size={14} fill={INK} weight={700}>Write V = constant! Use U = ½CV²</T>
        </g>
      </Fade>

      {/* BEAT 8: Done */}
    </svg>
  );
}
