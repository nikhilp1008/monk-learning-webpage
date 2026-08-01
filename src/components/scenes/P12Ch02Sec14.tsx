"use client";

/**
 * P12Ch02 · Section 14 — "Potential energy — the cost of assembling a configuration"
 * Subtopic: Potential Energy & External Fields
 * OPEN CHALKBOARD DESIGN WITH CHARGE ASSEMBLY ANIMATION (NO CONTAINER BOXES):
 *  - Assembly of 3 charges q₁, q₂, q₃ brought from infinity one by one
 *  - Work W₁ = 0 to bring first charge q₁ (no pre-existing field)
 *  - Work W₂ = k q₁ q₂ / r₁₂ to bring q₂ into q₁'s field
 *  - Work W₃ = k (q₁q₃/r₁₃ + q₂q₃/r₂₃) to bring q₃ into combined fields
 *  - Total stored potential energy U = W₁ + W₂ + W₃
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

export default function P12Ch02Sec14({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Electrostatic Potential Energy: The Work Cost of Assembling Charges", "Electrostatic Potential Energy: The Work Cost of Assembling Charges")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: STEP-BY-STEP ASSEMBLY DIAGRAM */}
      <g transform="translate(40, 85)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("ASSEMBLING CHARGES ONE-BY-ONE FROM ∞", "ASSEMBLING CHARGES ONE-BY-ONE FROM ∞")}
          </T>
        </Fade>

        {/* Assembly Triangle */}
        <Fade on={beat >= 2}>
          {/* Charge 1 */}
          <circle cx={200} cy={90} r={20} fill="#ffe4e6" stroke={RED} strokeWidth={2} />
          <T x={200} y={96} size={16} fill={RED} weight={800}>+q₁</T>

          {/* Charge 2 */}
          <circle cx={80} cy={280} r={20} fill="#dcfce7" stroke={GREEN} strokeWidth={2} />
          <T x={80} y={286} size={18} fill={GREEN} weight={800}>-q₂</T>

          {/* Charge 3 */}
          <circle cx={340} cy={280} r={20} fill="#ffe4e6" stroke={RED} strokeWidth={2} />
          <T x={340} y={286} size={16} fill={RED} weight={800}>+q₃</T>

          {/* Pair distance lines */}
          <line x1="185" y1="105" x2="95" y2="265" stroke={AMBER_DARK} strokeWidth={2} strokeDasharray="4 4" />
          <T x={125} y={175} size={13} fill={AMBER_DARK} weight={800}>r₁₂</T>

          <line x1="100" y1="280" x2="320" y2="280" stroke={GREEN} strokeWidth={2} strokeDasharray="4 4" />
          <T x={210} y={300} size={13} fill={GREEN} weight={800}>r₂₃</T>

          <line x1="215" y1="105" x2="325" y2="265" stroke={RED} strokeWidth={2} strokeDasharray="4 4" />
          <T x={290} y={175} size={13} fill={RED} weight={800}>r₁₃</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 4}>
          <T x={210} y={355} anchor="middle" size={16} fill={INK} weight={800}>
            Total Energy U = W₁ + W₂ + W₃ (Stored in configuration field!)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: WORK COMPUTATION BREAKDOWN */}
      <g transform="translate(540, 85)">
        <Badge n={2} cx={25} cy={25} on={beat >= 3} delay={dl(3, 0.2)} />
        <Fade on={beat >= 3} delay={dl(3, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("WORK COST PER CHARGE STEP", "WORK COST PER CHARGE STEP")}
          </T>
        </Fade>

        {/* Floating Work Steps (No Card Boxes) */}
        <Fade on={beat >= 3}>
          <T x={50} y={85} size={16} fill={AMBER_DARK} weight={800} anchor="start">
            1. Bring q₁ from ∞: W₁ = 0  (No existing field!)
          </T>

          <T x={50} y={145} size={16} fill={GREEN} weight={800} anchor="start">
            2. Bring q₂ into q₁ field: W₂ = q₂ V₁(r₁₂) = k q₁ q₂ / r₁₂
          </T>

          <T x={50} y={205} size={16} fill={RED} weight={800} anchor="start">
            3. Bring q₃ into (q₁+q₂) fields: W₃ = k q₁q₃/r₁₃ + k q₂q₃/r₂₃
          </T>

          <Draw on={beat >= 3} delay={dl(3, 1.2)} d="M 50 235 L 450 235" stroke={INK} sw={2} />

          <T x={50} y={285} size={20} fill={GREEN} weight={800} anchor="start">
            4. U_total = Σ_pairs (k q_i q_j / r_ij)
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={360} anchor="middle" size={15} fill={GREEN} weight={800}>
            Independent of the order in which charges are brought together!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 470)">
        <Badge n={3} cx={25} cy={25} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={48} y={30} size={16} fill={RED} weight={800} anchor="start">
            {t("PHYSICAL MEANING OF POTENTIAL ENERGY", "PHYSICAL MEANING OF POTENTIAL ENERGY")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={500} y={30} anchor="middle" size={17} fill={GREEN} weight={800}>
            U represents work done by external agent without acceleration from initial infinite separation!
          </T>
          <T x={500} y={65} anchor="middle" size={15} fill={INK} weight={700}>
            Pair counting formula: N(N-1)/2 total pairs for N charges!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={570} w={880} h={42} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Potential Energy Assembly Mastered: U = Σ k q_i q_j / r_ij equals total work done in bringing charges from ∞! ✓",
            "★ Potential Energy Assembly Mastered: U = Σ k q_i q_j / r_ij equals total work done in bringing charges from ∞! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
