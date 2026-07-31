"use client";

/**
 * P12Ch02 · Section 53 — "Parallel — side by side, sharing voltage"
 * Beats (en [0,5,13,26,38,49,59]): 7 beats
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

export default function P12Ch02Sec53({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Parallel: capacitors side by side", "Parallel: capacitors ek doosre ke side by side")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 320 70 C 440 66, 640 74, 760 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Diagram — Parallel capacitors */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)} dim={beat >= 5}>
        <g transform="translate(300, 100)">
          {/* Main wires */}
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M -100 150 L 0 150 L 0 50" stroke={INK} sw={2} />
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 500 150 L 400 150 L 400 50" stroke={INK} sw={2} />
          {/* Top rail */}
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 0 50 L 400 50" stroke={INK} sw={2} />
          {/* Bottom rail */}
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 0 250 L 400 250" stroke={INK} sw={2} />
          {/* Verticals */}
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 0 150 L 0 250" stroke={INK} sw={2} />
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 400 150 L 400 250" stroke={INK} sw={2} />
          
          {/* Battery symbol */}
          <line x1={180} y1={250} x2={220} y2={250} stroke={INK} strokeWidth={3} />
          <line x1={190} y1={240} x2={190} y2={260} stroke={INK} strokeWidth={3} />
          <line x1={210} y1={230} x2={210} y2={270} stroke={INK} strokeWidth={5} />
          <T x={200} y={290} size={16} fill={INK} weight={700}>Total V</T>

          {/* C1 */}
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 100 50 L 100 80" stroke={INK} sw={2} />
          <rect x={70} y={80} width={60} height={10} fill="#3b82f6" />
          <rect x={70} y={100} width={60} height={10} fill="#3b82f6" />
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 100 110 L 100 150" stroke={INK} sw={2} />
          <T x={50} y={95} size={14} fill={INK} weight={700}>C₁</T>
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 100 150 L 100 250" stroke={INK} sw={2} />

          {/* C2 */}
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 200 50 L 200 80" stroke={INK} sw={2} />
          <rect x={170} y={80} width={60} height={10} fill="#10b981" />
          <rect x={170} y={100} width={60} height={10} fill="#10b981" />
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 200 110 L 200 150" stroke={INK} sw={2} />
          <T x={150} y={95} size={14} fill={INK} weight={700}>C₂</T>
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 200 150 L 200 250" stroke={INK} sw={2} strokeDasharray="4 4" />

          {/* C3 */}
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 300 50 L 300 80" stroke={INK} sw={2} />
          <rect x={270} y={80} width={60} height={10} fill="#f59e0b" />
          <rect x={270} y={100} width={60} height={10} fill="#f59e0b" />
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 300 110 L 300 150" stroke={INK} sw={2} />
          <T x={250} y={95} size={14} fill={INK} weight={700}>C₃</T>
          <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 300 150 L 300 250" stroke={INK} sw={2} />

          {/* Charges */}
          <Fade on={beat >= 3} delay={dl(3, 0.5)}>
            <T x={100} y={70} size={14} fill={RED} weight={700}>Q₁</T>
            <T x={200} y={70} size={14} fill={RED} weight={700}>Q₂</T>
            <T x={300} y={70} size={14} fill={RED} weight={700}>Q₃</T>
          </Fade>
        </g>
      </Fade>

      {/* BEAT 2: Voltage is same */}
      <Badge n={1} cx={52} cy={420} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={74} y={425} size={14} fill={RED} weight={700} anchor="start">VOLTAGE V IS SAME FOR ALL</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 5}>
        <T x={74} y={450} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Clipped to the same two rails, so they all see the identical voltage V.",
            "Same do rails pe jude hain, toh sabhi ko same voltage V milta hai."
          )}
        </T>
      </Fade>

      {/* BEAT 3: Charges add up */}
      <Badge n={2} cx={52} cy={490} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={74} y={495} size={14} fill={RED} weight={700} anchor="start">CHARGES ADD UP</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 6}>
        <g transform="translate(60, 510)">
          <rect x={0} y={5} width={400} height={40} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={200} y={32} anchor="middle" size={16} fill={INK} weight={800}>
            Total Q = Q₁ + Q₂ + Q₃
          </T>
        </g>
      </Fade>

      {/* BEAT 4: More area */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={500} y={450} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "More capacitors in parallel means more total plate area. Capacitance INCREASES.",
            "Parallel mein aur capacitors lagane ka matlab hai zyada plate area. Capacitance BADHTI hai."
          )}
        </T>
      </Fade>

      {/* BEAT 5: Big capacitor */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <g transform="translate(750, 150)">
          <rect x={0} y={0} width={200} height={10} fill="#6ee7b7" />
          <rect x={0} y={20} width={200} height={10} fill="#6ee7b7" />
          <T x={100} y={-10} size={16} fill={GREEN} weight={800}>BIG EQUIVALENT</T>
        </g>
      </Fade>

      {/* BEAT 6: Series vs Parallel summary */}
      <Fade on={beat >= 6}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Series: shares charge (smaller C). Parallel: shares voltage (larger C). ✓",
            "★ Series: charge share karta hai (C kam). Parallel: voltage share karta hai (C zyada). ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
