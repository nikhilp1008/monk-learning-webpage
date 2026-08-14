"use client";

/**
 * P12Ch02 · Section 31 — "Formula toolkit: stored energy and energy density"
 * Beats (en [0,5,17,27,41,55,62,75]): 8 beats
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

export default function P12Ch02Sec31({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("energy stored in a capacitor", "capacitor mein stored energy")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 320 70 C 440 66, 640 74, 760 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Three formulas */}
      <Badge n={1} cx={52} cy={120} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 1)}>
        <T x={74} y={125} size={14} fill={RED} weight={700} anchor="start">TOTAL ENERGY (U)</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 5}>
        <g transform="translate(60, 140)">
          <rect x={0} y={5} width={600} height={55} rx={10} fill={CREAM} stroke={RED} strokeWidth={2.5} />
          <T x={300} y={40} anchor="middle" size={24} fill={RED} weight={800}>
            U = ½CV² = Q²/(2C) = ½QV
          </T>
        </g>
      </Fade>

      {/* BEAT 2: Identical algebraically */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={60} y={225} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Algebraically identical — but choosing the right one saves your life in dielectric problems!",
            "Algebraically identical — lekin dielectric problems mein sahi form chunna life bachata hai!"
          )}
        </T>
      </Fade>

      {/* BEAT 3: How to choose */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <g transform="translate(60, 255)">
          <rect x={0} y={0} width={400} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={200} y={26} anchor="middle" size={14} fill={AMBER_DARK} weight={700}>
            {t("Q IS FIXED (Disconnected)", "Q FIXED HAI (Disconnected)")}
          </T>
          <T x={200} y={48} anchor="middle" size={18} fill={INK} weight={800}>Use: U = Q²/(2C)</T>
        </g>
        <g transform="translate(500, 255)">
          <rect x={0} y={0} width={400} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={200} y={26} anchor="middle" size={14} fill={GREEN} weight={700}>
            {t("V IS FIXED (Connected)", "V FIXED HAI (Connected)")}
          </T>
          <T x={200} y={48} anchor="middle" size={18} fill={INK} weight={800}>Use: U = ½CV²</T>
        </g>
      </Fade>

      {/* BEAT 4: Consequence of choosing well */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={60} y={345} size={13} fill={INK} anchor="start" script>
          {t(
            "Pick the form matching your fixed quantity → scaling by K falls out cleanly!",
            "Fixed quantity wala form chuno → K scaling easily dikh jayegi!"
          )}
        </T>
      </Fade>

      {/* BEAT 5: Energy density */}
      <Badge n={2} cx={52} cy={395} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 1)}>
        <T x={74} y={400} size={14} fill={RED} weight={700} anchor="start">ENERGY DENSITY (u = U/Volume)</T>
      </Fade>
      <Fade on={beat >= 5}>
        <g transform="translate(60, 415)">
          <rect x={0} y={5} width={400} height={55} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={200} y={40} anchor="middle" size={24} fill={INK} weight={800}>
            u = ½ε₀E²
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Physical meaning */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={60} y={500} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "Deep physics: energy isn't on the plates — it's stored in the FIELD itself!",
            "Deep physics: energy plates pe nahi hai — FIELD mein store hoti hai!"
          )}
        </T>
      </Fade>

      {/* BEAT 7: Battery heat note */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Battery does work QV. Capacitor stores ½QV. The other ½QV is lost as HEAT! ✓",
            "★ Battery QV work karti. Capacitor ½QV store karta. Baaki ½QV HEAT mein loss! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
