"use client";

/**
 * P12Ch02 · Section 49 — "JEE Main: potentials of two concentric shells"
 * Subtopic: Conductors & Spherical Capacitors
 * OPEN CHALKBOARD DESIGN WITH CONCENTRIC SHELLS DIAGRAM (NO CONTAINER BOXES):
 *  - Shell A (radius a, charge q₁), Shell B (radius b, charge q₂)
 *  - Superposition: V_A = k q₁/a + k q₂/b;  V_B = k (q₁ + q₂)/b
 *  - Potential Difference: ΔV = V_A - V_B = k q₁ (1/a - 1/b)  [INDEPENDENT of q₂!]
 *  - Charge transfer: Connecting wire causes 100% of charge q₁ to flow to outer shell B!
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

export default function P12Ch02Sec49({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("JEE Main: Concentric Shell Potentials & Independent Difference ΔV = kq₁(1/a − 1/b)", "JEE Main: Concentric Shell Potentials & Independent Difference ΔV = kq₁(1/a − 1/b)")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: CONCENTRIC SHELLS DIAGRAM */}
      <g transform="translate(40, 85)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("CONCENTRIC CONDUCTING SHELLS (A, B)", "CONCENTRIC CONDUCTING SHELLS (A, B)")}
          </T>
        </Fade>

        {/* Concentric Shells */}
        <Fade on={beat >= 1}>
          {/* Inner Shell A */}
          <circle cx={240} cy={180} r={50} stroke={RED} strokeWidth={3} fill="#ffe4e6" opacity={0.3} />
          <T x={240} y={185} size={14} fill={RED} weight={900} anchor="middle">Shell A (a, q₁)</T>

          {/* Outer Shell B */}
          <circle cx={240} cy={180} r={105} stroke={GREEN} strokeWidth={3} fill="none" />
          <T x={240} y={65} size={14} fill={GREEN} weight={900} anchor="middle">Shell B (b, q₂)</T>

          {/* Connecting Switch Wire */}
          <line x1="240" y1="130" x2="240" y2="75" stroke={AMBER_DARK} strokeWidth={2.5} strokeDasharray="3 3" />
          <T x={255} y={105} size={12} fill={AMBER_DARK} weight={800}>Switch S</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={240} y={350} anchor="middle" size={17} fill={INK} weight={800}>
            V_A = k q₁/a + k q₂/b   |   V_B = k (q₁ + q₂)/b
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: POTENTIAL DIFFERENCE & CHARGE FLOW */}
      <g transform="translate(540, 85)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("INDEPENDENT ΔV & CHARGE FLOW PROOF", "INDEPENDENT ΔV & CHARGE FLOW PROOF")}
          </T>
        </Fade>

        {/* Floating Solution Steps (No Card Boxes) */}
        <Fade on={beat >= 4}>
          <T x={50} y={85} size={16} fill={AMBER_DARK} weight={800} anchor="start">
            1. ΔV = V_A − V_B = k q₁ ( 1/a − 1/b )
          </T>

          <T x={50} y={145} size={16} fill={GREEN} weight={800} anchor="start">
            2. Notice: ΔV is 100% INDEPENDENT of outer charge q₂!
          </T>

          <T x={50} y={205} size={16} fill={RED} weight={800} anchor="start">
            3. Since a &lt; b, V_A &gt; V_B for positive q₁!
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 50 235 L 450 235" stroke={INK} sw={2} />

          <T x={50} y={285} size={19} fill={GREEN} weight={900} anchor="start">
            4. Closing Switch S → 100% of q₁ flows to Outer Shell B!
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={360} anchor="middle" size={15} fill={GREEN} weight={800}>
            Fundamental principle behind the Van de Graaff Generator high-voltage accumulator!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 440)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("JEE MAIN CONCENTRIC SHELL RECAP", "JEE MAIN CONCENTRIC SHELL RECAP")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={52} size={14} anchor="start" fill={GREEN} weight={800}>
            Inner charge q₁ ALWAYS creates a higher potential on inner shell A than outer shell B (V_A &gt; V_B)!
          </T>
          <T x={45} y={76} size={13} anchor="start" fill={INK} weight={700}>
            Connecting a wire forces all charge from inner shell to outer shell until V_A = V_B!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ JEE Main Mastered: ΔV = kq₁(1/a − 1/b) independent of q₂; connecting wire empties inner shell completely! ✓",
            "★ JEE Main Mastered: ΔV = kq₁(1/a − 1/b) independent of q₂; connecting wire empties inner shell completely! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
