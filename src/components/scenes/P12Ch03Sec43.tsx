"use client";

/**
 * P12Ch02 · Section 43 — "Power, energy, Joule's law and the commercial unit"
 * Beats (en [0,1,3,5,7]): 5 beats
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

export default function P12Ch03Sec43({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Power, Energy, Joule's Law & Commercial Unit (kWh)", "Power, Energy, Joule's Law & Commercial Unit (kWh)")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Power & Dimensions */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">POWER & DIMENSION</T>
      </Badge>
      <Fade on={beat >= 1} dim={beat >= 3}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={16} fill={INK} weight={800}>
            P = V I = I² R = V² / R   (1 W = 1 J/s, [M L² T⁻³])
          </T>
        </g>
      </Fade>

      {/* BEAT 3: Joule's Law of Heating */}
      <Badge n={2} cx={540} cy={140} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">JOULE'S LAW OF HEATING</T>
      </Badge>
      <Fade on={beat >= 3} dim={beat >= 4}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={35} anchor="middle" size={16} fill={INK} weight={800}>
            H = I² R t   ([M L² T⁻²])
          </T>
        </g>
      </Fade>

      {/* BEAT 4: Commercial Unit kWh Conversion */}
      <Badge n={3} cx={52} cy={270} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={74} y={275} size={14} fill={RED} weight={700} anchor="start">COMMERCIAL UNIT: 1 kWh</T>
      </Badge>
      <Fade on={beat >= 4}>
        <g transform="translate(60, 290)">
          <rect x={0} y={5} width={960} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={30} anchor="middle" size={16} fill={INK} weight={800}>
            1 kWh = 1000 W × 3600 s = 3.6 × 10⁶ J = 3.6 MJ
          </T>
          <T x={480} y={52} anchor="middle" size={14} fill={GREEN} weight={800}>
            {t("1 kWh is 1 Commercial 'Unit' of electricity!", "1 kWh hi electricity board ka 1 'Unit' hota hai!")}
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Summary Chip */}
      <Fade on={beat >= 4}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Result: 1 kWh = 3.6×10⁶ Joules. Master this standard board conversion! ✓",
            "★ Result: 1 kWh = 3.6×10⁶ Joules. Board exams ka favorite conversion! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
