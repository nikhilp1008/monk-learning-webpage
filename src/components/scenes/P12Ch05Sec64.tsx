"use client";

/**
 * P12Ch05 · Section 64 — "Board level: choosing between Alnico and Soft Iron for a lifting magnet"
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

export default function P12Ch05Sec64({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Board Level: Choosing Alnico vs Soft Iron for Lifting Magnets", "Board Level: Lifting Magnets Ke Liye Alnico vs Soft Iron Selection")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 3: Lifting Electromagnet requirement */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("CRANE LIFTING ELECTROMAGNET: SOFT IRON", "CRANE LIFTING ELECTROMAGNET: SOFT IRON")}
        </T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 5}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            High μ_r (picks up heavy load) + Low H_c
          </T>
          <T x={225} y={52} anchor="middle" size={14} fill={AMBER_DARK} weight={700}>
            {t("Current OFF ⇒ Load drops instantly with zero residual stickiness!", "Current OFF ⇒ Load immediately drop ho jata hai!")}
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 6: Permanent Bar Magnet requirement */}
      <Badge n={2} cx={540} cy={140} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("PERMANENT BAR MAGNET: ALNICO / STEEL", "PERMANENT BAR MAGNET: ALNICO / STEEL")}
        </T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            High B_r + High Coercivity H_c
          </T>
          <T x={240} y={52} anchor="middle" size={14} fill={GREEN} weight={800}>
            {t("Retains magnetism permanently without fading over time!", "Fading ke bina permanently magnetism retain karta hai!")}
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Board Exam Decision Table */}
      <Badge n={3} cx={52} cy={340} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={74} y={345} size={14} fill={RED} weight={700} anchor="start">
          {t("BOARD EXAM SELECTION SUMMARY", "BOARD EXAM SELECTION SUMMARY")}
        </T>
      </Fade>
      <Fade on={beat >= 7}>
        <g transform="translate(60, 360)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            Lifting Magnets & Transformer Cores → Soft Iron | Bar Magnets & Compass Needles → Alnico / Steel!
          </T>
        </g>
      </Fade>

      {/* Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={490} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Board Rule: Soft Iron for lifting magnets (instant release); Alnico for permanent magnets (high coercivity)! ✓",
            "★ Board Rule: Soft Iron lifting magnets ke liye (instant release); Alnico permanent magnets ke liye (high coercivity)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
