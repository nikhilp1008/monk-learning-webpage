"use client";

/**
 * P12Ch02 · Section 49 — "Worked example: monthly energy and the bill"
 * Beats (en [0,1,3,4,5,6,7]): 7 beats
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

export default function P12Ch03Sec49({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("JEE Main: Monthly Energy Consumption & Electricity Bill", "JEE Main: Monthly Energy Consumption & Electricity Bill")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Problem Statement */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={60} y={120} size={13} fill={MUTED} anchor="start" script>
          {t(
            "1.5 kW geyser runs 2 h/day for 30 days at ₹8 per kWh. Find kWh energy & bill cost.",
            "1.5 kW geyser runs 2 h/day for 30 days at ₹8 per kWh. kWh energy aur bill cost nikaalein."
          )}
        </T>
      </Fade>

      {/* BEAT 3 & 4: Energy in kWh */}
      <Badge n={1} cx={52} cy={160} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={74} y={165} size={14} fill={RED} weight={700} anchor="start">ENERGY W IN KILOWATT-HOURS</T>
      </Badge>
      <Fade on={beat >= 3} dim={beat >= 5}>
        <g transform="translate(60, 180)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={16} fill={INK} weight={800}>
            W = 1.5 kW × (2 h × 30) = 1.5 × 60 = 90 kWh
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 6: Bill Cost Calculation */}
      <Badge n={2} cx={540} cy={160} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={165} size={14} fill={RED} weight={700} anchor="start">MONTHLY BILL COST</T>
      </Badge>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(540, 180)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={16} fill={INK} weight={800}>
            Cost = 90 Units × ₹8 = ₹720
          </T>
          <T x={240} y={52} anchor="middle" size={14} fill={GREEN} weight={800}>
            (In Joules: W = 3.24 × 10⁸ J)
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Summary Chip */}
      <Fade on={beat >= 6}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Result: Energy W = 90 kWh, Monthly Geyser Cost = ₹720! ✓",
            "★ Result: Energy W = 90 kWh, Monthly Geyser Cost = ₹720! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
