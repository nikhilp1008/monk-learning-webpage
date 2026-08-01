"use client";

/**
 * P12Ch02 · Section 53 — "Charge redistribution — connecting two charged spheres"
 * Subtopic: Series & Parallel Combinations & Charge Sharing
 * OPEN CHALKBOARD DESIGN WITH CHARGE REDISTRIBUTION DIAGRAM (NO CONTAINER BOXES):
 *  - Spheres (C₁, V₁) and (C₂, V₂) connected by thin conducting wire
 *  - Common Potential V_common = (C₁ V₁ + C₂ V₂) / (C₁ + C₂)
 *  - Final Charge Ratio: q₁' / q₂' = C₁ / C₂
 *  - Energy Loss ΔU = ½ [C₁ C₂ / (C₁ + C₂)] (V₁ - V₂)²  (Dissipated as heat!)
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

export default function P12Ch02Sec53({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Charge Redistribution: Common Potential V_com & Energy Loss ΔU = ½[C₁C₂/(C₁+C₂)](V₁−V₂)²", "Charge Redistribution: Common Potential V_com & Energy Loss ΔU = ½[C₁C₂/(C₁+C₂)](V₁−V₂)²")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: CONNECTED SPHERES DIAGRAM */}
      <g transform="translate(40, 85)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("CONNECTING CONDUCTORS VIA WIRE", "CONNECTING CONDUCTORS VIA WIRE")}
          </T>
        </Fade>

        {/* Conductors Diagram */}
        <Fade on={beat >= 1}>
          {/* Sphere 1 */}
          <circle cx={110} cy={180} r={55} fill="#ffe4e6" stroke={RED} strokeWidth={3} opacity={0.4} />
          <T x={110} y={185} size={14} fill={RED} weight={900} anchor="middle">Sphere 1 (C₁, V₁)</T>

          {/* Wire */}
          <line x1="165" y1="180" x2="315" y2="180" stroke={INK} strokeWidth={3} />
          <T x={240} y={165} size={13} fill={INK} weight={800} anchor="middle">Connecting Wire</T>

          {/* Sphere 2 */}
          <circle cx={370} cy={180} r={55} fill="#dcfce7" stroke={GREEN} strokeWidth={3} opacity={0.4} />
          <T x={370} y={185} size={14} fill={GREEN} weight={900} anchor="middle">Sphere 2 (C₂, V₂)</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={240} y={350} anchor="middle" size={17} fill={AMBER_DARK} weight={900}>
            Common Potential V_com = (C₁ V₁ + C₂ V₂) / (C₁ + C₂)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: ENERGY LOSS & CHARGE RATIO */}
      <g transform="translate(540, 85)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("ENERGY DISSIPATION & FINAL CHARGES", "ENERGY DISSIPATION & FINAL CHARGES")}
          </T>
        </Fade>

        {/* Floating Derivation Steps (No Card Boxes) */}
        <Fade on={beat >= 4}>
          <T x={50} y={85} size={16} fill={INK} weight={800} anchor="start">
            1. Final Charge Ratio: q₁' / q₂' = C₁ / C₂
          </T>

          <T x={50} y={145} size={16} fill={GREEN} weight={800} anchor="start">
            2. For Spheres: q₁' / q₂' = R₁ / R₂
          </T>

          <T x={50} y={205} size={16} fill={RED} weight={800} anchor="start">
            3. Energy Loss ΔU = U_initial − U_final
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 50 235 L 450 235" stroke={INK} sw={2} />

          <T x={50} y={285} size={19} fill={RED} weight={900} anchor="start">
            4. ΔU = ½ [ (C₁ C₂) / (C₁ + C₂) ] (V₁ − V₂)²
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={360} anchor="middle" size={15} fill={GREEN} weight={800}>
            ΔU is ALWAYS positive (Energy is lost as heat I²R & spark electromagnetic waves)!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 440)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("CHARGE SHARING RECAP", "CHARGE SHARING RECAP")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={52} size={14} anchor="start" fill={GREEN} weight={800}>
            Charge flows from HIGHER potential to LOWER potential until potentials equalize (V₁ = V₂ = V_com)!
          </T>
          <T x={45} y={76} size={13} anchor="start" fill={INK} weight={700}>
            If opposite polarities are connected: V_com = (C₁ V₁ − C₂ V₂) / (C₁ + C₂)!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Charge Sharing Mastered: V_com = (C₁V₁+C₂V₂)/(C₁+C₂) and Heat Loss ΔU = ½[C₁C₂/(C₁+C₂)](V₁−V₂)²! ✓",
            "★ Charge Sharing Mastered: V_com = (C₁V₁+C₂V₂)/(C₁+C₂) and Heat Loss ΔU = ½[C₁C₂/(C₁+C₂)](V₁−V₂)²! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
