"use client";

/**
 * P12Ch02 · Section 35 — "NEET speed trap: dielectric with the battery disconnected"
 * Subtopic: Capacitance, Dielectrics & Stored Energy
 * OPEN CHALKBOARD DESIGN WITH DISCONNECTED BATTERY ANALYSIS (NO CONTAINER BOXES):
 *  - Dielectric K = 5 inserted after battery is DISCONNECTED
 *  - Charge Q = Q₀ (Constant, trapped!)
 *  - Voltage V = V₀ / 5 (Drops to 20%)
 *  - Stored Energy U = U₀ / 5 (Drops to 20%)
 *  - Where did the missing 80% energy go? Electrostatic field pulls slab in (Work done by field W = 0.8 U₀)!
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

export default function P12Ch02Sec35({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("NEET Speed Trap: Dielectric with Battery Disconnected (Where Did Energy Go?)", "NEET Speed Trap: Dielectric with Battery Disconnected (Where Did Energy Go?)")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: DISCONNECTED BATTERY SLAB DRAWING */}
      <g transform="translate(40, 85)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("DIELECTRIC (K = 5) INSERTION (DISCONNECTED)", "DIELECTRIC (K = 5) INSERTION (DISCONNECTED)")}
          </T>
        </Fade>

        {/* Capacitor Diagram */}
        <Fade on={beat >= 1}>
          <line x1="60" y1="90" x2="420" y2="90" stroke={RED} strokeWidth={4} />
          <T x={435} y={95} size={14} fill={RED} weight={800}>+Q₀ Trapped</T>

          <line x1="60" y1="230" x2="420" y2="230" stroke={GREEN} strokeWidth={4} />
          <T x={435} y={235} size={14} fill={GREEN} weight={800}>−Q₀ Trapped</T>

          {/* Dielectric Slab inserted */}
          <rect x="120" y="100" width="240" height="120" fill={AMBER_DARK} opacity={0.2} stroke={AMBER_DARK} strokeWidth={2} />
          <T x={240} y={160} size={16} fill={AMBER_DARK} weight={900} anchor="middle">Dielectric K = 5</T>

          {/* Suction Force Arrow pulling slab into capacitor */}
          <path d={arrowD(60, 160, 110, 160)} stroke={GREEN} strokeWidth={3} />
          <T x={40} y={190} size={12} fill={GREEN} weight={800}>Field Suction Force F_pull</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={240} y={350} anchor="middle" size={16} fill={INK} weight={800}>
            Trapped Charge: Q = Q₀  ⇒  Voltage V = Q₀ / (5 C₀) = V₀ / 5 !
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: ENERGY DISSIPATION ACCOUNTING */}
      <g transform="translate(540, 85)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("WHERE DID THE 80% MISSING ENERGY GO?", "WHERE DID THE 80% MISSING ENERGY GO?")}
          </T>
        </Fade>

        {/* Floating Solution Steps (No Card Boxes) */}
        <Fade on={beat >= 4}>
          <T x={50} y={85} size={16} fill={AMBER_DARK} weight={800} anchor="start">
            1. Initial Energy U₀ = Q₀² / (2 C₀)
          </T>

          <T x={50} y={145} size={16} fill={RED} weight={800} anchor="start">
            2. Final Energy U = Q₀² / (2 × 5 C₀) = U₀ / 5 = 0.20 U₀
          </T>

          <T x={50} y={205} size={16} fill={GREEN} weight={800} anchor="start">
            3. Energy Loss ΔU = U₀ − U = 0.80 U₀ (80% Lost!)
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 50 235 L 450 235" stroke={INK} sw={2} />

          <T x={50} y={285} size={20} fill={GREEN} weight={900} anchor="start">
            4. W_field = +0.80 U₀ (Work done pulling slab!)
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={360} anchor="middle" size={15} fill={GREEN} weight={800}>
            Field sucks slab inward — energy converts into kinetic energy of slab or mechanical work!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 440)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("NEET MCQ SPEED TRAP WARNING", "NEET MCQ SPEED TRAP WARNING")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={52} size={14} anchor="start" fill={GREEN} weight={800}>
            Disconnected Battery → Q is constant! Never use U = ½ C V² (since V changes)!
          </T>
          <T x={45} y={76} size={13} anchor="start" fill={INK} weight={700}>
            Always use U = Q² / (2C) when battery is disconnected!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ NEET Trap Neutralized: Battery Disconnected -> Q constant, U = U₀/K (80% energy converted into mechanical suction work)! ✓",
            "★ NEET Trap Neutralized: Battery Disconnected -> Q constant, U = U₀/K (80% energy converted into mechanical suction work)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
