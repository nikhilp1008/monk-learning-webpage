"use client";

/**
 * P12Ch02 · Section 21 — "The temperature law and the coefficient alpha"
 * Beats (en [0,8,16,24,36,48,60,72]): 8 beats
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

export default function P12Ch03Sec21({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("The temperature law and the coefficient alpha", "The temperature law and the coefficient alpha")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 230 70 C 440 66, 640 74, 850 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Master Equation */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">TEMPERATURE DEPENDENCE LAW</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 3}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={18} fill={INK} weight={800}>
            R_T = R_0 [ 1 + α (T − T_0) ]
          </T>
        </g>
      </Fade>

      {/* BEAT 3: Definition of Alpha */}
      <Badge n={2} cx={540} cy={140} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">COEFFICIENT ALPHA (α)</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 5}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={35} anchor="middle" size={18} fill={INK} weight={800}>
            α = (R_T − R_0) / [ R_0 (T − T_0) ]
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 6: Values for different materials */}
      <Badge n={3} cx={52} cy={270} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={74} y={275} size={14} fill={RED} weight={700} anchor="start">VALUES OF ALPHA</T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(60, 290)">
          <rect x={0} y={5} width={960} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={480} y={32} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Metals: α > 0 (~4×10⁻³ K⁻¹)  |  Semiconductors: α < 0  |  Alloys (Nichrome, Manganin): α ≈ 0",
              "Metals: α > 0 (~4×10⁻³ K⁻¹)  |  Semiconductors: α < 0  |  Alloys (Nichrome, Manganin): α ≈ 0"
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Ratio Shortcut: R_T / R_0 = 1 + α ΔT. Useful for quick 1-line numerical solving! ✓",
            "★ Ratio Shortcut: R_T / R_0 = 1 + α ΔT. 1-line numerical solving ke liye best! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
