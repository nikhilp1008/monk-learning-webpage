"use client";

/**
 * P12Ch02 · Section 49 — "JEE Main: potentials of two concentric shells"
 * Beats (en [0,5,18,28,41,56,67,76]): 8 beats
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

export default function P12Ch02Sec49({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("JEE Main: potentials of two concentric shells", "JEE Main: potentials of two concentric shells")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 250 70 C 440 66, 640 74, 830 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Diagram — Concentric shells */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)} dim={beat >= 7}>
        <circle cx={200} cy={200} r={40} fill="#fef2f2" stroke={RED} strokeWidth={2} />
        <T x={200} y={200} size={14} fill={RED} weight={700}>+q</T>
        <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 200 200 L 240 200" stroke={INK} sw={1.5} />
        <T x={220} y={190} size={12} fill={INK} weight={700}>a</T>
        <T x={130} y={150} size={13} fill={RED} weight={700}>a = 0.05 m</T>
        <T x={130} y={165} size={13} fill={RED} weight={700}>q = +2 nC</T>
        
        <circle cx={200} cy={200} r={100} fill="none" stroke="#3b82f6" strokeWidth={2} />
        <T x={250} y={110} size={14} fill="#3b82f6" weight={700}>+Q</T>
        <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 200 200 L 200 100" stroke={INK} sw={1.5} />
        <T x={190} y={150} size={12} fill={INK} weight={700}>b</T>
        <T x={250} y={80} size={13} fill="#3b82f6" weight={700}>b = 0.10 m</T>
        <T x={250} y={95} size={13} fill="#3b82f6" weight={700}>Q = +4 nC</T>
      </Fade>

      {/* BEAT 2: Principle */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={60} y={350} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Key principle: a conductor's potential is the SUM of contributions from ALL charges.",
            "Key principle: conductor ka potential SAARI charges ke contributions ka SUM hota hai."
          )}
        </T>
      </Fade>

      {/* BEAT 3: Potential of outer shell V_b */}
      <Badge n={1} cx={450} cy={120} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={472} y={125} size={14} fill={RED} weight={700} anchor="start">POTENTIAL V_b (OUTER SHELL)</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 5}>
        <g transform="translate(450, 140)">
          <rect x={0} y={5} width={500} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={250} y={38} anchor="middle" size={16} fill={INK} weight={800}>
            V_b = k(q+Q) / b = 540 V
          </T>
        </g>
      </Fade>

      {/* BEAT 4: V_a components explanation */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={450} y={215} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "Inner shell gets (kq/a) from ITSELF, and (kQ/b) from OUTER shell (since it's inside!).",
            "Inner shell ko (kq/a) KHUD se milta hai, aur (kQ/b) OUTER shell se (kyunki wo andar hai!)."
          )}
        </T>
      </Fade>

      {/* BEAT 5: Potential of inner shell V_a */}
      <Badge n={2} cx={450} cy={240} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={472} y={245} size={14} fill={RED} weight={700} anchor="start">POTENTIAL V_a (INNER SHELL)</T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(450, 260)">
          <rect x={0} y={5} width={500} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={250} y={38} anchor="middle" size={16} fill={INK} weight={800}>
            V_a = (kq / a) + (kQ / b) = 360 + 360 = 720 V
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Conclusion */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={450} y={380} size={14} fill={INK} anchor="start" script>
          {t(
            "Inner shell sits at a HIGHER potential (720V) than outer shell (540V)!",
            "Inner shell HIGHER potential (720V) pe hai compared to outer shell (540V)!"
          )}
        </T>
      </Fade>

      {/* BEAT 7: The single rule */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Rule: A shell gives (kQ/R) everywhere INSIDE itself, and (kQ/r) OUTSIDE itself! ✓",
            "★ Rule: Shell apne ANDAR (kQ/R) V deti hai, aur apne BAHAR (kQ/r)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
