"use client";

/**
 * P12Ch04 · Section 34 — "Common Pitfalls and Pro-Tips"
 * Beats (en [0,1,2,3,4,5,6,7]): 8 beats
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

export default function P12Ch04Sec34({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Common Pitfalls & Sanity Check Pro-Tips for Meter Conversions", "Common Pitfalls & Sanity Check Pro-Tips for Meter Conversions")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: RECIPE SWAP & MINUS-G TRAPS */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("RECIPE SWAP & MINUS-G TRAPS", "RECIPE SWAP & MINUS-G TRAPS")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Recipe Swap Trap: Ammeter uses parallel S, Voltmeter uses series R.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Minus-G Derivation Trap: Forgetting to subtract G in R = (V / I_g) - G.
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Unit Conversion Trap: Forgetting to convert mA/μA to Amperes.
          </T>

          <Draw on={beat >= 5} delay={dl(5, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Golden Rule: Always check series vs parallel connection layout!
          </T>
        </Fade>

        <Fade on={beat >= 5}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (90% of exam mistakes in meter conversion stem from these 3 traps)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: EXAM PRO-TIP: MAGNITUDE SANITY CHECK */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 5} delay={dl(5, 0.2)} />
        <Fade on={beat >= 5} delay={dl(5, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("EXAM PRO-TIP: MAGNITUDE SANITY CHECK", "EXAM PRO-TIP: MAGNITUDE SANITY CHECK")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 5}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Shunt Magnitude Check: Shunt resistance S MUST be tiny (mΩ to Ω).
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Multiplier Magnitude Check: Multiplier resistance R MUST be huge (kΩ).
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Automatic Red Flag: If calculated S &gt; G or R &lt; G, re-verify your equations.
          </T>

          <Draw on={beat >= 7} delay={dl(7, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Sanity Verdict: Low S bypasses current; high R blocks current!
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Magnitude sanity check instantly flags formula inversion errors)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("UNIFYING PHYSICAL INTUITION", "UNIFYING PHYSICAL INTUITION")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Where does unwanted current go? Ammeter provides a low-resistance parallel highway bypass around coil.
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Voltmeter provides a high-resistance series barrier, refusing excess current entry into delicate coil.
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Shunt S must be tiny, Multiplier R must be large; always subtract G in voltmeter derivation! ✓",
            "★ Shunt S must be tiny, Multiplier R must be large; always subtract G in voltmeter derivation! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
