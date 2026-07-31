"use client";

/**
 * P12Ch02 · Section 61 — "NEET speed trap: four identical capacitors"
 * Beats (en [0,7,17,28,39,45,58]): 7 beats
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

export default function P12Ch02Sec61({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("NEET speed trap: n equal capacitors", "NEET speed trap: n equal capacitors")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 330 70 C 440 66, 640 74, 750 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Setup */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={60} y={120} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Four identical capacitors (4 µF each) connected in series, then in parallel.",
            "Chaar identical capacitors (har ek 4 µF ka) pehle series mein jode gaye, phir parallel mein."
          )}
        </T>
      </Fade>

      {/* BEAT 2: The trap */}
      <Badge n={1} cx={52} cy={160} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={74} y={165} size={14} fill={RED} weight={700} anchor="start">THE TRAP</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 3}>
        <g transform="translate(60, 180)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill="#fef2f2" stroke={RED} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={15} fill={RED} weight={800}>
            Adding series values directly! (16 µF is wrong for series)
          </T>
        </g>
      </Fade>

      {/* BEAT 3: Series */}
      <Badge n={2} cx={52} cy={270} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={74} y={275} size={14} fill={RED} weight={700} anchor="start">CORRECT SERIES (C / n)</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 4}>
        <g transform="translate(60, 290)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={225} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            C_series = C / n = 4 / 4 = 1 µF
          </T>
        </g>
      </Fade>

      {/* BEAT 4: Parallel */}
      <Badge n={3} cx={540} cy={270} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={562} y={275} size={14} fill={RED} weight={700} anchor="start">CORRECT PARALLEL (nC)</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 5}>
        <g transform="translate(540, 290)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            C_parallel = nC = 4 × 4 = 16 µF
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Difference factor */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={60} y={380} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "The two answers differ by a factor of exactly 16 (which is n²).",
            "Dono answers mein exact 16 (jo n² hai) ka factor hai."
          )}
        </T>
      </Fade>

      {/* BEAT 6: Rule */}
      <Fade on={beat >= 6}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Speed rule: n equal capacitors give C/n in series and nC in parallel. ✓",
            "★ Speed rule: n equal capacitors series mein C/n aur parallel mein nC dete hain. ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
