"use client";

/**
 * P12Ch02 · Section 47 — "CBSE level: potential and field of a solid conducting sphere"
 * Beats (en [0,4,18,26,38,50,60,69]): 8 beats
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

export default function P12Ch02Sec47({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("CBSE level: solid conducting sphere", "CBSE level: solid conducting sphere")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 320 70 C 440 66, 640 74, 760 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Problem setup */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <g transform="translate(60, 90)">
          <rect x={0} y={5} width={960} height={55} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.5} />
          <T x={20} y={25} size={14} fill={INK} weight={700} anchor="start">GIVEN:</T>
          <T x={20} y={48} size={14} fill={INK} anchor="start" script>
            {t(
              "Solid conducting sphere: R = 0.10 m, Q = +2 μC (2×10⁻⁶ C).",
              "Solid conducting sphere: R = 0.10 m, Q = +2 μC (2×10⁻⁶ C)."
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 2: Surface Potential */}
      <Badge n={1} cx={52} cy={180} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={74} y={185} size={14} fill={RED} weight={700} anchor="start">POTENTIAL V</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 4}>
        <g transform="translate(60, 200)">
          <rect x={0} y={5} width={460} height={70} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={230} y={35} anchor="middle" size={16} fill={MUTED}>V = kQ / R = (9×10⁹)(2×10⁻⁶) / 0.10</T>
          <T x={230} y={60} anchor="middle" size={20} fill={INK} weight={800}>
            V = 1.8 × 10⁵ V
          </T>
        </g>
      </Fade>

      {/* BEAT 3: Equipotential everywhere */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={60} y={300} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "That's the potential of the WHOLE sphere (surface AND centre). Conductor is equipotential!",
            "Yeh PURE sphere (surface AUR centre) ka potential hai. Conductor equipotential hota hai!"
          )}
        </T>
      </Fade>

      {/* BEAT 4: Field at surface */}
      <Badge n={2} cx={540} cy={180} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={562} y={185} size={14} fill={RED} weight={700} anchor="start">FIELD E AT SURFACE</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(540, 200)">
          <rect x={0} y={5} width={480} height={70} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={35} anchor="middle" size={16} fill={MUTED}>E = kQ / R² = (9×10⁹)(2×10⁻⁶) / (0.10)²</T>
          <T x={240} y={60} anchor="middle" size={20} fill={INK} weight={800}>
            E = 1.8 × 10⁶ V/m
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Field is sigma/epsilon_0 */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={540} y={320} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Equivalently, that same number is σ / ε₀ using local surface charge density.",
            "Wahi same number σ / ε₀ se bhi aata hai (local surface charge density)."
          )}
        </T>
      </Fade>

      {/* BEAT 6: Field at centre */}
      <Badge n={3} cx={52} cy={350} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={74} y={355} size={14} fill={RED} weight={700} anchor="start">FIELD E AT CENTRE</T>
      </Fade>
      <Fade on={beat >= 6}>
        <g transform="translate(60, 370)">
          <rect x={0} y={5} width={460} height={50} rx={8} fill="#fef2f2" stroke={RED} strokeWidth={1.8} />
          <T x={230} y={38} anchor="middle" size={20} fill={RED} weight={800}>
            E_centre = 0
          </T>
        </g>
      </Fade>

      {/* BEAT 7: V vs E paradox */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Notice V is huge at centre while E is zero! V is 'height', E is 'slope'. ✓",
            "★ Notice karo centre pe V bahut bada hai jabki E zero hai! V 'height' hai, E 'slope'. ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
