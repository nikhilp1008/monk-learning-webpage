"use client";

/**
 * P12Ch04 · Section 31 — "Multirange Design and the Sensitivity Trade-Off"
 * Beats (en [0,1,2,4,5,7,8,10,11]): 8 beats
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

export default function P12Ch04Sec31({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Multirange Meter Design & Sensitivity Trade-Off", "Multirange Meter Design & Sensitivity Trade-Off")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: MULTIRANGE VOLTMETER SERIES CHAIN */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("MULTIRANGE VOLTMETER SERIES CHAIN", "MULTIRANGE VOLTMETER SERIES CHAIN")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Step-1 Multiplier: R_1 = (V_1 / I_g) - G.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Step-2 Multiplier: R_2 = (V_2 - V_1) / I_g  [Only step 1 subtracts G!].
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Total Series Resistance: R_total = G + R_1 + R_2 + ... = V_max / I_g.
          </T>

          <Draw on={beat >= 5} delay={dl(5, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Rotary Switch: Selects tapped series resistors for range V_n!
          </T>
        </Fade>

        <Fade on={beat >= 5}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Modular series tapping eliminates duplicate resistor components)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: AYRTON SHUNT AMMETER CHAIN */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 5} delay={dl(5, 0.2)} />
        <Fade on={beat >= 5} delay={dl(5, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("AYRTON SHUNT AMMETER CHAIN", "AYRTON SHUNT AMMETER CHAIN")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 5}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Tapped Parallel Shunt: Shunt resistors S_1, S_2, S_3 connected in network.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Shunt Scaling: S_j = (I_g G) / (I_j - I_g) =&gt; S_1 &gt; S_2 &gt; S_3.
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Range Rule: Higher current range I_j requires smaller effective shunt.
          </T>

          <Draw on={beat >= 10} delay={dl(10, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Universal Safety: Prevents coil damage during switching!
          </T>
        </Fade>

        <Fade on={beat >= 10}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (Ayrton shunt maintains continuous parallel bypass during range switching)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 10} delay={dl(10, 0.2)} />
        <Fade on={beat >= 10} delay={dl(10, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("SENSITIVITY TRADE-OFF (S_I vs S_V)", "SENSITIVITY TRADE-OFF (S_I vs S_V)")}
          </T>
        </Fade>

        <Fade on={beat >= 10}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Current Sensitivity S_I = (N A B)/k; Voltage Sensitivity S_V = S_I / G.
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Increasing turns N doubles S_I, but also doubles wire length and coil resistance G! Thus, S_V remains unchanged!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 10}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Multirange meters use resistor chains; raising turns N increases current sensitivity but not voltage sensitivity! ✓",
            "★ Multirange meters use resistor chains; raising turns N increases current sensitivity but not voltage sensitivity! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
