"use client";

/**
 * P12Ch05 · Section 40 — "Speed trap: total field B vs external field H"
 * Subtopic: Magnetic Properties of Materials
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

export default function P12Ch05Sec40({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Speed Trap: Total Field B vs External Field Intensity H", "Speed Trap: Total Field B vs External Field Intensity H")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 3: Distinction Between H and B */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("H DEPENDS ONLY ON EXTERNAL CURRENT (H = nI)", "H DEPENDS ONLY ON EXTERNAL CURRENT (H = nI)")}
        </T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 5}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            H = n I (Independent of core material!)
          </T>
          <T x={225} y={52} anchor="middle" size={14} fill={AMBER_DARK} weight={700}>
            {t("Inserting iron core changes B, but leaves H UNCHANGED!", "Iron core dalne par B badalta hai, lekin H UNCHANGED rehta hai!")}
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 6: Total Field Amplification */}
      <Badge n={2} cx={540} cy={140} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("TOTAL FIELD AMPLIFICATION B = μ_r B_0", "TOTAL FIELD AMPLIFICATION B = μ_r B_0")}
        </T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={16} fill={GREEN} weight={800}>
            B = μ_r (μ₀ H) = μ_r B_vac
          </T>
          <T x={240} y={52} anchor="middle" size={14} fill={INK} weight={700}>
            {t("Inside iron (μ_r = 1000), total B is 1000× stronger than B_vac!", "Iron me (μ_r = 1000), total B B_vac se 1000× strong ho jata hai!")}
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Summary Distinction */}
      <Badge n={3} cx={52} cy={340} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={74} y={345} size={14} fill={RED} weight={700} anchor="start">
          {t("INSTANT EXAM RULE", "INSTANT EXAM RULE")}
        </T>
      </Fade>
      <Fade on={beat >= 7}>
        <g transform="translate(60, 360)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            H has units A/m (set by windings nI); B has units Tesla (set by total flux density including iron dipoles)!
          </T>
        </g>
      </Fade>

      {/* Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={490} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ H (A/m) depends strictly on winding current nI; B (Tesla) includes material magnetization M! ✓",
            "★ H (A/m) strictly winding current nI par depend karta hai; B (Tesla) me material magnetization M shamil hota hai! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
