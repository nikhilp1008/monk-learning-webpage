"use client";

/**
 * P12Ch02 · Section 36 — "JEE Main: dielectric with the battery still connected"
 * Subtopic: Capacitance, Dielectrics & Stored Energy
 * OPEN CHALKBOARD DESIGN WITH CONNECTED BATTERY ANALYSIS (NO CONTAINER BOXES):
 *  - Dielectric K = 4 inserted while battery remains CONNECTED
 *  - Voltage V = V₀ (Constant!)
 *  - Capacitance C = 4 C₀
 *  - Charge Q = 4 Q₀ (Battery pumps ΔQ = 3 Q₀ extra charge)
 *  - Energy U = 4 U₀ (ΔU = 3 U₀)
 *  - Battery Work W_battery = ΔQ V₀ = 3 Q₀ V₀ = 6 U₀
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

export default function P12Ch02Sec36({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("JEE Main: Dielectric with Battery Still Connected (Energy & Charge Pumped)", "JEE Main: Dielectric with Battery Still Connected (Energy & Charge Pumped)")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: CONNECTED BATTERY SCHEMATIC */}
      <g transform="translate(40, 85)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("DIELECTRIC (K = 4) INSERTION (BATTERY CONNECTED)", "DIELECTRIC (K = 4) INSERTION (BATTERY CONNECTED)")}
          </T>
        </Fade>

        {/* Battery & Capacitor Diagram */}
        <Fade on={beat >= 1}>
          <line x1="60" y1="90" x2="420" y2="90" stroke={RED} strokeWidth={4} />
          <T x={435} y={95} size={14} fill={RED} weight={800}>+4 Q₀ Charge</T>

          <line x1="60" y1="230" x2="420" y2="230" stroke={GREEN} strokeWidth={4} />
          <T x={435} y={235} size={14} fill={GREEN} weight={800}>−4 Q₀ Charge</T>

          {/* Battery V0 Connection */}
          <line x1="240" y1="230" x2="240" y2="280" stroke={INK} strokeWidth={2} />
          <T x={240} y={300} size={15} fill={AMBER_DARK} weight={900} anchor="middle">Battery V = V₀ (Fixed)</T>

          {/* Charge Pumping Arrow from battery */}
          <path d={arrowD(200, 290, 200, 100)} stroke={GREEN} strokeWidth={3} />
          <T x={180} y={200} size={12} fill={GREEN} weight={900} anchor="end">Extra ΔQ = 3 Q₀ Pumped!</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={240} y={350} anchor="middle" size={16} fill={INK} weight={800}>
            Fixed Voltage V = V₀  ⇒  New Charge Q = 4 Q₀  (4× Increase!)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: BATTERY WORK VS CAPACITOR STORED ENERGY */}
      <g transform="translate(540, 85)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("BATTERY WORK ACCOUNTING (W_battery = 6 U₀)", "BATTERY WORK ACCOUNTING (W_battery = 6 U₀)")}
          </T>
        </Fade>

        {/* Floating Solution Steps (No Card Boxes) */}
        <Fade on={beat >= 4}>
          <T x={50} y={85} size={16} fill={AMBER_DARK} weight={800} anchor="start">
            1. Initial Energy U₀ = ½ C₀ V₀²
          </T>

          <T x={50} y={145} size={16} fill={GREEN} weight={800} anchor="start">
            2. Final Energy U = ½ (4 C₀) V₀² = 4 U₀  (ΔU = + 3 U₀)
          </T>

          <T x={50} y={205} size={16} fill={RED} weight={800} anchor="start">
            3. Battery Work W_batt = ΔQ V₀ = (3 Q₀) V₀ = 6 U₀
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 50 235 L 450 235" stroke={INK} sw={2} />

          <T x={50} y={285} size={20} fill={GREEN} weight={900} anchor="start">
            4. W_batt (6 U₀) = ΔU (3 U₀) + W_mech (3 U₀)
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={360} anchor="middle" size={15} fill={GREEN} weight={800}>
            50% of battery work goes into stored capacitor energy; 50% into mechanical work pulling slab!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 440)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("JEE MAIN CONNECTED BATTERY SUMMARY", "JEE MAIN CONNECTED BATTERY SUMMARY")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={52} size={14} anchor="start" fill={GREEN} weight={800}>
            Battery Connected → V = V₀ constant, C = KC₀, Q = KQ₀, U = KU₀, E = E₀ constant!
          </T>
          <T x={45} y={76} size={13} anchor="start" fill={INK} weight={700}>
            Always use U = ½ C V² when battery remains connected!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ JEE Main Mastered: Battery Connected -> V & E constant, Q & U increase by factor K (W_battery = 2 ΔU)! ✓",
            "★ JEE Main Mastered: Battery Connected -> V & E constant, Q & U increase by factor K (W_battery = 2 ΔU)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
