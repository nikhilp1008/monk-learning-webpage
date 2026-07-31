"use client";

/**
 * P12Ch02 · Section 20 — "Superconductivity, thermistors and the limits of the law"
 * Beats (en [0,10,19,31,41,54,67,77]): 8 beats
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

export default function P12Ch03Sec20({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Superconductivity, thermistors & limits of Ohm's law", "Superconductivity, thermistors & limits of Ohm's law")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 3 & 4: Superconductivity */}
      <Badge n={1} cx={52} cy={140} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">SUPERCONDUCTIVITY (T &lt; T_c)</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 6}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={16} fill={INK} weight={800}>
            ρ = 0  (Below Critical Temperature T_c)
          </T>
          <T x={225} y={52} anchor="middle" size={13} fill={GREEN} weight={700}>
            {t("Zero energy loss! Cooper pairs move without scattering.", "Zero energy loss! Cooper pairs bina scattering ke move karte hain.")}
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Thermistors */}
      <Badge n={2} cx={540} cy={140} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">THERMISTORS (HIGH NEGATIVE α)</T>
      </Fade>
      <Fade on={beat >= 6} dim={beat >= 7}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Semiconductor oxide with huge negative α.",
              "Semiconductor oxide jisme bohot bada negative α hota hai."
            )}
          </T>
          <T x={240} y={52} anchor="middle" size={13} fill={AMBER_DARK} weight={700}>
            {t("Resistance drops steeply as temperature rises!", "Temperature badhne pe resistance tezise ghatta hai!")}
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Superconductors: ρ=0 below T_c! Thermistors: Sensitive temperature sensors (NTC)! ✓",
            "★ Superconductors: T_c ke neeche ρ=0! Thermistors: Sensitive temperature sensors (NTC)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
