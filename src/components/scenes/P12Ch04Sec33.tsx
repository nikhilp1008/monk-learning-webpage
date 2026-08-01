"use client";

/**
 * P12Ch04 · Section 33 — "Worked Examples Three and Four: Power in the Shunt, and Meter Loading"
 * Beats (en [0,1,2,4,5,6,7,9,11,12,13]): 10 beats
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

export default function P12Ch04Sec33({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("JEE Main & Advanced: Shunt Power Dissipation & Voltmeter Loading", "JEE Main & Advanced: Shunt Power Dissipation & Voltmeter Loading")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: JEE MAIN SHUNT POWER SAFETY */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("JEE MAIN: SHUNT POWER RATING SAFETY", "JEE MAIN: SHUNT POWER RATING SAFETY")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 1}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. Given Parameters: I = 5.0 A, I_g = 2 mA, G = 80 Ω, Rated P_max = 0.50 W.
          </T>

          <T x={45} y={125} size={14} fill={INK} weight={800} anchor="start">
            2. Shunt Current &amp; Voltage: I_shunt = 4.998 A, V_shunt = I_g G = 0.16 V.
          </T>

          <T x={45} y={170} size={14} fill={GREEN} weight={800} anchor="start">
            3. Dissipated Power: P_dissipated = I_shunt × V_shunt = 4.998 × 0.16 = 0.80 W.
          </T>

          <Draw on={beat >= 6} delay={dl(6, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={RED} weight={900} anchor="start">
            4. Power Verdict: 0.80 W &gt; 0.50 W rating =&gt; Shunt WILL BURN OUT!
          </T>
        </Fade>

        <Fade on={beat >= 6}>
          <T x={45} y={268} anchor="start" size={13} fill={INK} weight={800}>
            (Always verify power rating P = I_s^2 S when designing high-current shunts)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: JEE ADVANCED VOLTMETER METER LOADING ERROR */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 6} delay={dl(6, 0.2)} />
        <Fade on={beat >= 6} delay={dl(6, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("JEE ADVANCED: VOLTMETER METER LOADING ERROR", "JEE ADVANCED: VOLTMETER METER LOADING ERROR")}
          </T>
        </Fade>

        {/* Floating Solution Steps */}
        <Fade on={beat >= 6}>
          <T x={45} y={80} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            1. True Unloaded Voltage: 10 kΩ divider across 60 V =&gt; V_true = 30 V.
          </T>

          <T x={45} y={125} size={14} fill={GREEN} weight={800} anchor="start">
            2. Loaded Resistance: R_V = 20 kΩ in parallel with 10 kΩ =&gt; R_par = 6.67 kΩ.
          </T>

          <T x={45} y={170} size={14} fill={RED} weight={800} anchor="start">
            3. Measured Voltage: V_read = 60 V × [6.67 / (10 + 6.67)] = 24.0 V.
          </T>

          <Draw on={beat >= 13} delay={dl(13, 1.2)} d="M 45 195 L 450 195" stroke={INK} sw={1.8} />

          <T x={45} y={235} size={16} fill={GREEN} weight={900} anchor="start">
            4. Percentage Loading Error: Error = [(30 - 24) / 30] × 100 = 20%!
          </T>
        </Fade>

        <Fade on={beat >= 13}>
          <T x={45} y={268} anchor="start" size={13} fill={GREEN} weight={800}>
            (To avoid loading error, meter resistance R_V must be &gt;&gt; circuit resistance)
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 13} delay={dl(13, 0.2)} />
        <Fade on={beat >= 13} delay={dl(13, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("ADVANCED METER ANALYSIS LESSONS", "ADVANCED METER ANALYSIS LESSONS")}
          </T>
        </Fade>

        <Fade on={beat >= 13}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Shunt Safety: P = I_shunt^2 S = 0.80 W exceeds 0.50 W rating, requiring a higher-wattage resistor.
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Voltmeter Loading: Connecting a finite-resistance voltmeter alters circuit currents and introduces systematic negative bias.
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 13}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Shunt P = 0.80W exceeds 0.5W rating | Voltmeter loading causes 20% error (requires R_V >> R_circuit)! ✓",
            "★ Shunt P = 0.80W exceeds 0.5W rating | Voltmeter loading causes 20% error (requires R_V >> R_circuit)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
