"use client";

/**
 * P12Ch02 · Section 27 — "Capacitance is geometry alone — not charge, not voltage"
 * Subtopic: Capacitance, Dielectrics & Stored Energy
 * OPEN CHALKBOARD DESIGN WITH GEOMETRY DEPENDENCE COMPARISON (NO CONTAINER BOXES):
 *  - Misconception: C depends on Q or V? NO! Doubling Q doubles V, so C = Q/V stays constant!
 *  - Reality: C = ε₀ A / d depends STRICTLY on Plate Area A, Separation d, and Medium ε₀!
 *  - Geometrical controls (increase A -> increase C; increase d -> decrease C)
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

export default function P12Ch02Sec27({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Capacitance C = ε₀ A / d Depends ONLY on Geometry (Area A & Spacing d)", "Capacitance C = ε₀ A / d Depends ONLY on Geometry (Area A & Spacing d)")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: MISCONCEPTION VS REALITY */}
      <g transform="translate(40, 85)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("THE Q AND V INDEPENDENCE MISCONCEPTION", "THE Q AND V INDEPENDENCE MISCONCEPTION")}
          </T>
        </Fade>

        {/* Floating Misconception Explanation (No Card Boxes) */}
        <Fade on={beat >= 1}>
          <T x={40} y={85} size={16} fill={RED} weight={800} anchor="start">
            ✗ MYTH: "Increasing charge Q increases capacitance C"
          </T>

          <T x={40} y={135} size={15} fill={INK} weight={800} anchor="start">
            • FACT: Doubling Q automatically doubles voltage V (V = Q / C)!
          </T>

          <T x={40} y={185} size={15} fill={GREEN} weight={800} anchor="start">
            • The ratio C = (2Q) / (2V) = Q / V remains 100% UNCHANGED!
          </T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={230} y={350} anchor="middle" size={17} fill={AMBER_DARK} weight={800}>
            Like Resistance R = V/I (depends on length/area, NOT voltage/current)!
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: GEOMETRICAL CONTROLS (A & d) */}
      <g transform="translate(540, 85)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("GEOMETRICAL DEPENDENCE FORMULA: C = ε₀ A / d", "GEOMETRICAL DEPENDENCE FORMULA: C = ε₀ A / d")}
          </T>
        </Fade>

        {/* Geometrical Diagram */}
        <Fade on={beat >= 4}>
          <line x1="80" y1="100" x2="380" y2="100" stroke={RED} strokeWidth={4} />
          <T x={400} y={105} size={14} fill={RED} weight={800}>Area A</T>

          <line x1="80" y1="220" x2="380" y2="220" stroke={GREEN} strokeWidth={4} />
          <T x={400} y={225} size={14} fill={GREEN} weight={800}>Distance d</T>

          {/* Controls */}
          <T x={80} y={275} size={15} fill={GREEN} weight={800} anchor="start">
            • Double Area A → Double Capacitance 2C
          </T>

          <T x={80} y={315} size={15} fill={RED} weight={800} anchor="start">
            • Double Spacing d → Halve Capacitance C/2
          </T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 5}>
          <T x={250} y={355} anchor="middle" size={20} fill={GREEN} weight={800}>
            C = ε₀ A / d   (Air / Vacuum Capacitor)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 470)">
        <Badge n={3} cx={25} cy={25} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("SUMMARY OF CAPACITANCE DETERMINANTS", "SUMMARY OF CAPACITANCE DETERMINANTS")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={500} y={30} anchor="middle" size={17} fill={GREEN} weight={800}>
            1. Plate Surface Area A   |   2. Plate Separation Distance d   |   3. Dielectric Constant K of Medium!
          </T>
          <T x={500} y={65} anchor="middle" size={15} fill={INK} weight={700}>
            Charge Q and Potential V determine the operating point, NOT the physical capacity C!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={570} w={880} h={42} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Geometry Rule Mastered: C = ε₀A/d is a fixed physical property set by shape, size & medium! ✓",
            "★ Geometry Rule Mastered: C = ε₀A/d is a fixed physical property set by shape, size & medium! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
