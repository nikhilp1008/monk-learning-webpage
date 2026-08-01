"use client";

/**
 * P12Ch05 · Section 60 — "Core selection for transformers, AC motors and memory tapes"
 * Subtopic: Electromagnets, Retentivity, Coercivity & Chapter Close
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

export default function P12Ch05Sec60({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Core Selection for Transformers, AC Motors & Magnetic Tapes", "Transformers, AC Motors aur Magnetic Tapes Ke Liye Core Selection")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 3: Transformers & AC Motors */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("TRANSFORMERS & AC MOTORS: LAMINATED SOFT IRON", "TRANSFORMERS & AC MOTORS: LAMINATED SOFT IRON")}
        </T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 5}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            High μ_r, Low H_c, Narrow Loop Area
          </T>
          <T x={225} y={52} anchor="middle" size={14} fill={AMBER_DARK} weight={700}>
            Lamination breaks eddy currents; narrow loop minimizes heat!
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 6: Magnetic Recording Tapes */}
      <Badge n={2} cx={540} cy={140} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("MAGNETIC RECORDING TAPES: γ-Fe₂O₃ / CrO₂", "MAGNETIC RECORDING TAPES: γ-Fe₂O₃ / CrO₂")}
        </T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            High B_r, Moderate Coercivity H_c
          </T>
          <T x={240} y={52} anchor="middle" size={14} fill={GREEN} weight={800}>
            {t("Retains stored audio/data bits while allowing rewriting by head!", "Stored audio/data bits retain karta hai while allowing rewriting!")}
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Master Material Matrix */}
      <Badge n={3} cx={52} cy={340} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={74} y={345} size={14} fill={RED} weight={700} anchor="start">
          {t("ENGINEERING MATERIAL SELECTION SUMMARY", "ENGINEERING MATERIAL SELECTION SUMMARY")}
        </T>
      </Fade>
      <Fade on={beat >= 7}>
        <g transform="translate(60, 360)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            AC Cores → Laminated Soft Iron (low heat) | Tapes → γ-Fe₂O₃ (data retention) | Permanent → Alnico!
          </T>
        </g>
      </Fade>

      {/* Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={490} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Laminated Soft Iron for AC cores minimizes hysteresis & eddy losses; γ-Fe₂O₃ for magnetic data tapes! ✓",
            "★ Laminated Soft Iron AC cores ke liye hysteresis & eddy losses minimize karta hai; γ-Fe₂O₃ magnetic tapes ke liye! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
