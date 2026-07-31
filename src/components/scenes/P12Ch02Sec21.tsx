"use client";

/**
 * P12Ch02 · Section 21 — "CBSE level: potential energy of a two-charge system"
 * Beats (en [0,4,12,23,31,36,43]): 7 beats
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

export default function P12Ch02Sec21({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("CBSE level: PE of a two-charge system", "CBSE level: do charge system ki PE")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 220 70 C 440 66, 640 74, 860 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Givens */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <g transform="translate(60, 90)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.5} />
          <T x={20} y={25} size={14} fill={INK} weight={700} anchor="start">GIVEN:</T>
          <T x={20} y={46} size={14} fill={INK} anchor="start" script>
            {t(
              "q₁ = +3 μC, q₂ = −5 μC, separation r = 0.60 m. Find PE of the system.",
              "q₁ = +3 μC, q₂ = −5 μC, distance r = 0.60 m. System ki PE nikalo."
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 2: Substitution */}
      <Badge n={1} cx={52} cy={185} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 1)}>
        <T x={74} y={190} size={14} fill={RED} weight={700} anchor="start">SUBSTITUTE INTO U = kq₁q₂/r</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 4}>
        <g transform="translate(60, 205)">
          <rect x={0} y={5} width={600} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={300} y={38} anchor="middle" size={17} fill={INK} weight={800}>
            U = (9×10⁹)(+3×10⁻⁶)(−5×10⁻⁶) / 0.60
          </T>
        </g>
      </Fade>

      {/* BEAT 3: Carry signs */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={60} y={285} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Carry signs through carefully — don't drop and fix later!",
            "Signs carefully carry karo — baad mein fix karne ki zaroorat nahi!"
          )}
        </T>
      </Fade>

      {/* BEAT 4: Result */}
      <Badge n={2} cx={52} cy={320} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <g transform="translate(60, 335)">
          <rect x={0} y={0} width={350} height={55} rx={10} fill={CREAM} stroke={RED} strokeWidth={2.5} />
          <T x={175} y={35} anchor="middle" size={26} fill={RED} weight={800}>
            U = −0.225 J
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Result meaning */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={440} y={365} size={14} fill={INK} anchor="start" script>
          {t(
            "Negative result: minus 0.225 joules",
            "Negative result: minus 0.225 joules"
          )}
        </T>
      </Fade>

      {/* BEAT 6: Takeaway */}
      <Fade on={beat >= 6}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Negative U → bound, attractive system — energy needed to pull apart ✓",
            "★ Negative U → bound, attractive system — todne ke liye energy chahiye ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
