"use client";

/**
 * P12Ch04 · Section 12 — "Derivation A: The Solenoid Field"
 * Beats (en [0,1,3,4,8,10,12]): 7 beats
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

export default function P12Ch04Sec12({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Board Derivation: Field Inside Long Ideal Solenoid (B = μ₀ n I)", "Board Derivation: Field Inside Long Ideal Solenoid (B = μ₀ n I)")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 3: Amperian Loop Choice */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">RECTANGULAR AMPERIAN LOOP LINE INTEGRAL</T>
      </Badge>
      <Fade on={beat >= 1} dim={beat >= 8}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            ∮ \vec{B} \cdot d\vec{l} = \int_a^b + \int_b^c + \int_c^d + \int_d^a
          </T>
          <T x={225} y={52} anchor="middle" size={15} fill={GREEN} weight={800}>
            = B L + 0 + 0 + 0 = B L
          </T>
        </g>
      </Fade>

      {/* BEAT 8 & 10: Enclosed Current & Result */}
      <Badge n={2} cx={540} cy={140} on={beat >= 8} delay={dl(8, 0.4)} />
      <Fade on={beat >= 8} delay={dl(8, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">ENCLOSED CURRENT & FIELD FORMULA</T>
      </Badge>
      <Fade on={beat >= 8} dim={beat >= 12}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            I_enc = n L I  ⇒  B L = μ₀ (n L I)
          </T>
          <T x={240} y={52} anchor="middle" size={18} fill={GREEN} weight={800}>
            ⇒  B_inside = μ₀ n I
          </T>
        </g>
      </Fade>

      {/* BEAT 12: Edge Field Result */}
      <Badge n={3} cx={52} cy={270} on={beat >= 12} delay={dl(12, 0.4)} />
      <Fade on={beat >= 12} delay={dl(12, 0.8)}>
        <T x={74} y={275} size={14} fill={RED} weight={700} anchor="start">OPEN END FIELD DROP</T>
      </Badge>
      <Fade on={beat >= 12}>
        <g transform="translate(60, 290)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            Right at the open end, field drops to half: B_end = ½ μ₀ n I!
          </T>
        </g>
      </Fade>

      {/* BEAT 12: Summary Chip */}
      <Fade on={beat >= 12}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Derived! Solenoid B_inside = μ0nI (Uniform!) | Solenoid B_end = ½μ0nI! ✓",
            "★ Derived! Solenoid B_inside = μ0nI (Uniform!) | Solenoid B_end = ½μ0nI! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
