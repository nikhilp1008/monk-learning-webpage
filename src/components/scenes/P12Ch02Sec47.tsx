"use client";

/**
 * P12Ch02 · Section 47 — "CBSE level: potential and field of a solid conducting sphere"
 * Subtopic: Conductors & Spherical Capacitors
 * OPEN CHALKBOARD DESIGN WITH E(r) AND V(r) DUAL GRAPH PROFILES (NO CONTAINER BOXES):
 *  - Solid Conducting Sphere of radius R and charge Q
 *  - Electric Field Profile E(r): E = 0 for r < R; E = kQ/R² at surface; E = kQ/r² for r > R
 *  - Potential Profile V(r): V = kQ/R Constant for r ≤ R; V = kQ/r for r > R
 *  - Zero card box containers
 */

import React from "react";
import {
  SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, arrowD,
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

export default function P12Ch02Sec47({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("CBSE Profile Analysis: Electric Field E(r) & Potential V(r) of Conducting Sphere", "CBSE Profile Analysis: Electric Field E(r) & Potential V(r) of Conducting Sphere")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: ELECTRIC FIELD PROFILE GRAPH E(r) */}
      <g transform="translate(40, 85)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("ELECTRIC FIELD PROFILE E(r)", "ELECTRIC FIELD PROFILE E(r)")}
          </T>
        </Fade>

        {/* E(r) Graph */}
        <Fade on={beat >= 1}>
          <line x1="50" y1="270" x2="450" y2="270" stroke={INK} strokeWidth={2} />
          <line x1="50" y1="270" x2="50" y2="70" stroke={INK} strokeWidth={2} />

          <line x1="180" y1="270" x2="180" y2="70" stroke={MUTED} strokeWidth={1.5} strokeDasharray="4 4" />
          <T x={180} y={290} size={13} fill={INK} weight={800} anchor="middle">r = R</T>

          {/* E = 0 inside */}
          <line x1="50" y1="270" x2="180" y2="270" stroke={RED} strokeWidth={4} />

          {/* Jump to kQ/R² and 1/r² decay */}
          <circle cx={180} cy={100} r={5} fill={RED} />
          <Draw on={beat >= 1} delay={dl(1, 0.6)} d="M 180 100 Q 240 220, 440 260" stroke={RED} sw={3.5} />

          <T x={220} y={90} size={13} fill={RED} weight={800}>E_max = kQ/R²</T>
          <T x={340} y={210} size={13} fill={RED} weight={800}>E ∝ 1/r²</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={240} y={350} anchor="middle" size={16} fill={RED} weight={800}>
            E(r &lt; R) = 0 N/C   |   E(r ≥ R) = k Q / r²
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: POTENTIAL PROFILE GRAPH V(r) */}
      <g transform="translate(540, 85)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("ELECTROSTATIC POTENTIAL PROFILE V(r)", "ELECTROSTATIC POTENTIAL PROFILE V(r)")}
          </T>
        </Fade>

        {/* V(r) Graph */}
        <Fade on={beat >= 4}>
          <line x1="50" y1="270" x2="450" y2="270" stroke={INK} strokeWidth={2} />
          <line x1="50" y1="270" x2="50" y2="70" stroke={INK} strokeWidth={2} />

          <line x1="180" y1="270" x2="180" y2="70" stroke={MUTED} strokeWidth={1.5} strokeDasharray="4 4" />
          <T x={180} y={290} size={13} fill={INK} weight={800} anchor="middle">r = R</T>

          {/* V = constant inside */}
          <line x1="50" y1="100" x2="180" y2="100" stroke={GREEN} strokeWidth={4} />

          {/* 1/r decay outside */}
          <Draw on={beat >= 4} delay={dl(4, 0.6)} d="M 180 100 Q 260 210, 440 250" stroke={GREEN} sw={3.5} />

          <T x={115} y={85} size={13} fill={GREEN} weight={800} anchor="middle">V = kQ/R (Const)</T>
          <T x={340} y={200} size={13} fill={GREEN} weight={800}>V ∝ 1/r</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 6}>
          <T x={250} y={350} anchor="middle" size={16} fill={GREEN} weight={800}>
            V(r ≤ R) = k Q / R   |   V(r &gt; R) = k Q / r
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 470)">
        <Badge n={3} cx={25} cy={25} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("CBSE BOARD EXAM GRAPH RULES", "CBSE BOARD EXAM GRAPH RULES")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={500} y={30} anchor="middle" size={17} fill={GREEN} weight={800}>
            E(r) has a jump discontinuity at r = R (0 to kQ/R²), whereas V(r) is continuous everywhere!
          </T>
          <T x={500} y={65} anchor="middle" size={15} fill={INK} weight={700}>
            At the center r = 0: E = 0 N/C, but V = kQ/R (Non-zero potential)!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={570} w={880} h={42} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ CBSE Profiles Mastered: E(r) jumps from 0 to kQ/R² at surface, while V(r) remains constant kQ/R inside! ✓",
            "★ CBSE Profiles Mastered: E(r) jumps from 0 to kQ/R² at surface, while V(r) remains constant kQ/R inside! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
