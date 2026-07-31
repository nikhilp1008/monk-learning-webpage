"use client";

/**
 * P12Ch02 · Section 28 — "The dielectric — why an insulator boosts capacitance"
 * Beats (en [0,6,18,30,40,53,64,77]): 8 beats
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

export default function P12Ch02Sec28({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("the dielectric: polarisation boosts capacitance", "dielectric: polarisation se capacitance badhta hai")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 160 70 C 400 66, 660 74, 920 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Diagram — polarised dielectric between plates */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)} dim={beat >= 4}>
        {/* Plates */}
        <rect x={140} y={120} width={8} height={200} rx={2} fill={RED} />
        <rect x={420} y={120} width={8} height={200} rx={2} fill="#3b82f6" />
        {/* Dielectric slab */}
        <rect x={180} y={130} width={210} height={180} rx={4} fill="#fef3c7" stroke={AMBER_DARK} strokeWidth={1.5} />
        <T x={285} y={325} size={12} fill={AMBER_DARK} weight={700}>dielectric (K)</T>
        {/* Tiny dipoles inside */}
        {[160, 200, 240, 280].map(y => (
          <g key={y}>
            <Draw on={beat >= 1} delay={dl(1, 0.5)} d={`M 220 ${y} h 50`} stroke={MUTED} sw={1} />
            <circle cx={220} cy={y} r={3} fill="#3b82f6" />
            <circle cx={270} cy={y} r={3} fill={RED} />
          </g>
        ))}
        {/* E₀ and E labels */}
        <T x={500} y={200} size={13} fill={AMBER_DARK} weight={700} anchor="start">E₀ (free space)</T>
        <T x={500} y={230} size={13} fill={GREEN} weight={700} anchor="start">E = E₀/K (reduced!)</T>
      </Fade>

      {/* BEAT 2: Molecules line up */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={500} y={140} size={13} fill={INK} anchor="start" script>
          {t(
            "Molecules line up like tiny compass needles, all same way!",
            "Molecules choti compass needles jaisi line up hoti hain!"
          )}
        </T>
      </Fade>

      {/* BEAT 3: Opposing field */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={500} y={270} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Aligned charges create opposing field → net field REDUCED!",
            "Aligned charges opposing field create karte → net field REDUCE!"
          )}
        </T>
      </Fade>

      {/* BEAT 4: Formulas */}
      <Badge n={1} cx={52} cy={370} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 1)}>
        <T x={74} y={375} size={14} fill={RED} weight={700} anchor="start">DIELECTRIC FORMULAS</T>
      </Fade>
      <Fade on={beat >= 4}>
        <g transform="translate(60, 390)">
          <rect x={0} y={0} width={500} height={55} rx={10} fill={CREAM} stroke={RED} strokeWidth={2.5} />
          <T x={250} y={35} anchor="middle" size={22} fill={RED} weight={800}>
            E = E₀/K,    C = KC₀
          </T>
        </g>
      </Fade>

      {/* BEAT 5: K ≥ 1 */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <g transform="translate(580, 390)">
          <rect x={0} y={0} width={400} height={40} rx={6} fill="#fef2f2" stroke={RED} strokeWidth={1.8} />
          <T x={200} y={26} anchor="middle" size={14} fill={RED} weight={800}>
            {t("K ≥ 1 always! Dielectric can ONLY increase C!", "K ≥ 1 hamesha! Dielectric SIRF C badhata hai!")}
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Caution — full fill */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={60} y={470} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "E = E₀/K assumes dielectric completely fills the gap!",
            "E = E₀/K tab valid hai jab dielectric poora gap bharta ho!"
          )}
        </T>
      </Fade>

      {/* BEAT 7: Dielectric strength */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Every dielectric has a breakdown strength — max E before it conducts! ✓",
            "★ Har dielectric ka breakdown strength hai — max E jiske baad conduct karta! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
