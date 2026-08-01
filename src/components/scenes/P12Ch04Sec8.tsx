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
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Common Pitfalls & Exam Pro-Tips for Biot-Savart Law", "Common Pitfalls & Exam Pro-Tips for Biot-Savart Law")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: COLLINEAR LEADS & SCALAR TRAPS */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("COLLINEAR LEADS & SCALAR ADDITION TRAPS", "COLLINEAR LEADS & SCALAR ADDITION TRAPS")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Collinear Lead Trap: Leads pointing at P give dB = 0.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Scalar Trap: NEVER sum magnitudes; B fields are vectors!
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Direction Check: Apply Right-Hand Grip Rule to assign vector directions.
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Golden Rule: Add B fields vectorially (B_net = B₁ + B₂)!
          </T>
        </Fade>

        <Fade on={beat >= 4}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Check if individual field vectors reinforce, oppose, or act at 90°)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: SCALE & SUPERPOSE */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("EXAM PRO-TIP: SCALE & SUPERPOSE FORMULAS", "EXAM PRO-TIP: SCALE & SUPERPOSE FORMULAS")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 4}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Avoid Re-Integrating: Do not re-derive Biot-Savart integral in exams.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Circular Arc Shortcut: B_arc = (θ / 360°) × [μ₀ I / (2R)].
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Straight Segment Shortcut: B_segment = (μ₀ I / 4πa)(sin θ₁ + sin θ₂).
          </T>

          <Draw on={beat >= 7} delay={dl(7, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Polygon Superposition: Sum individual wire segments!
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (For N turns, simply multiply coil result by N)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("BIOT-SAVART PITFALLS & PRO-TIPS VERDICT", "BIOT-SAVART PITFALLS & PRO-TIPS VERDICT")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Collinear wire leads pointing at observation point create zero field (dB = 0).
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Scale standard anchor formulas (B_wire and B_loop) and add vectorially for 100% exam accuracy.
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Ignore collinear leads, scale loop/wire formulas, and add vectorially for 100% accuracy! ✓",
            "★ Ignore collinear leads, scale loop/wire formulas, and add vectorially for 100% accuracy! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
