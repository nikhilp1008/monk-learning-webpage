"use client";

/**
 * P12Ch04 · Section 32 — "Worked Examples One and Two: Shunt Value, and the Minus G Correction"
 * Beats (en [0,1,3,5,7,8,9]): 7 beats
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

export default function P12Ch04Sec32({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Worked Examples: Ammeter Shunt & NEET Minus-G Voltmeter Trap", "Worked Examples: Ammeter Shunt & NEET Minus-G Voltmeter Trap")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: CBSE AMMETER SHUNT NUMERICAL */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("CBSE LEVEL: AMMETER SHUNT NUMERICAL", "CBSE LEVEL: AMMETER SHUNT NUMERICAL")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Given Parameters: Coil G = 50 Ω, I_g = 2.0 mA = 0.002 A, Target I = 5.0 A.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Current through Shunt: I_shunt = I - I_g = 5.0 - 0.002 = 4.998 A.
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Shunt Formula Calculation: S = (I_g × G) / (I - I_g) = (0.002 × 50) / 4.998.
          </T>

          <Draw on={beat >= 5} delay={dl(5, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Calculated Shunt: S = 0.1 / 4.998 = 0.0200 Ω (in parallel)!
          </T>
        </Fade>

        <Fade on={beat >= 5}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Small parallel shunt resistor bypasses 4.998 A around delicate 2 mA coil)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: NEET SPEED TRAP: MINUS-G CORRECTION */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 5} delay={dl(5, 0.2)} />
        <Fade on={beat >= 5} delay={dl(5, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("NEET SPEED TRAP: MINUS-G CORRECTION", "NEET SPEED TRAP: MINUS-G CORRECTION")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 5}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Given Parameters: Coil G = 60 Ω, I_g = 1.0 mA = 0.001 A, Target V = 3.0 V.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Total Required Resistance: R_total = V / I_g = 3.0 / 0.001 = 3000 Ω.
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Multiplier Calculation: R = R_total - G = 3000 - 60.
          </T>

          <Draw on={beat >= 9} delay={dl(9, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Calculated Multiplier: R = 2940 Ω (connected in series)!
          </T>
        </Fade>

        <Fade on={beat >= 9}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (NEET speed trap: selecting 3000 Ω without subtracting G causes wrong answer!)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 9} delay={dl(9, 0.2)} />
        <Fade on={beat >= 9} delay={dl(9, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("NUMERICAL SUMMARY & BEST PRACTICE", "NUMERICAL SUMMARY & BEST PRACTICE")}
          </T>
        </Fade>

        <Fade on={beat >= 9}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Ammeter Shunt S = 0.0200 Ω (low parallel bypass); Voltmeter Multiplier R = 2940 Ω (high series multiplier).
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Always double-check units (mA to A) and remember to subtract internal coil resistance G in voltmeter problems!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 9}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Result: Ammeter Shunt S = 0.0200 Ω (parallel) | Voltmeter Multiplier R = 2940 Ω (series, subtract G!) ✓",
            "★ Result: Ammeter Shunt S = 0.0200 Ω (parallel) | Voltmeter Multiplier R = 2940 Ω (series, subtract G!) ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
