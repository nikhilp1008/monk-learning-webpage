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
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("JEE Main & Advanced: Shunt Power Dissipation & Voltmeter Loading", "JEE Main & Advanced: Shunt Power Dissipation & Voltmeter Loading")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1, 2 & 4, 5: JEE Main Shunt Power Safety */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">JEE MAIN: SHUNT POWER RATING SAFETY</T>
      </Badge>
      <Fade on={beat >= 1} dim={beat >= 6}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            P = (I − I_g)(I_g G) = (4.998)(0.16) = 0.80 W
          </T>
          <T x={225} y={52} anchor="middle" size={15} fill={AMBER_DARK} weight={800}>
            (0.80W &gt; 0.50W rating ⇒ NOT SAFE, will burn out!)
          </T>
        </g>
      </Fade>

      {/* BEAT 6, 7 & 11, 12, 13: JEE Advanced Meter Loading Error */}
      <Badge n={2} cx={540} cy={140} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">JEE ADVANCED: VOLTMETER METER LOADING ERROR</T>
      </Badge>
      <Fade on={beat >= 6} dim={beat >= 13}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            V_true = 30 V   |   V_read = 24 V (R_par = 6.67 kΩ)
          </T>
          <T x={240} y={52} anchor="middle" size={17} fill={GREEN} weight={800}>
            Percentage Error = [(30 − 24)/30] × 100 = 20%
          </T>
        </g>
      </Fade>

      {/* BEAT 13: Summary Chip */}
      <Fade on={beat >= 13}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Shunt P = 0.80W exceeds 0.5W rating | Voltmeter loading causes 20% error (requires R_V >> R_circuit)! ✓",
            "★ Shunt P = 0.80W 0.5W rating se zyada hai | Voltmeter loading 20% error deta hai (R_V >> R_circuit chahiye)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
