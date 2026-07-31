"use client";

/**
 * P12Ch02 · Section 41 — "The surface field, and the Faraday cage"
 * Beats (en [0,7,20,32,46,61,71,83]): 8 beats
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

export default function P12Ch02Sec41({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("just outside: perpendicular field & Faraday cage", "just outside: perpendicular field & Faraday cage")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 220 70 C 440 66, 640 74, 860 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Sideways field drags charge */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={60} y={110} size={14} fill={MUTED} anchor="start" script>
          {t(
            "Any sideways (tangential) field would drag surface charges along the surface!",
            "Koi bhi sideways field surface charges ko surface ke along drag karegi!"
          )}
        </T>
      </Fade>

      {/* BEAT 2: Perpendicular E formula */}
      <Badge n={1} cx={52} cy={165} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={74} y={170} size={14} fill={RED} weight={700} anchor="start">FIELD MUST BE PERPENDICULAR</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 4}>
        <g transform="translate(60, 185)">
          <rect x={0} y={5} width={400} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={200} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            E = σ / ε₀ (perpendicular)
          </T>
        </g>
      </Fade>

      {/* BEAT 3: Double the sheet */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={60} y={265} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "This is DOUBLE the field of an isolated sheet (σ/2ε₀) because inside is zero!",
            "Yeh isolated sheet se DOUBLE (σ/2ε₀) hai kyunki andar field zero hai!"
          )}
        </T>
      </Fade>

      {/* BEAT 4: Diagram — Faraday cage */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)} dim={beat >= 7}>
        <g transform="translate(560, 120)">
          {/* Cavity in a blob */}
          <path d="M 50 100 Q 80 0 200 50 T 350 100 Q 400 200 300 250 T 50 100 Z" fill="#e2e8f0" stroke={INK} strokeWidth={2} />
          <path d="M 120 120 Q 150 80 200 100 T 260 150 Q 280 200 220 220 T 120 120 Z" fill="#ffffff" stroke={INK} strokeWidth={1.5} />
          <T x={200} y={60} size={14} fill={INK} weight={700}>METAL BLOB</T>
          <T x={200} y={160} size={14} fill={INK} weight={700}>CAVITY (E=0)</T>
          {/* External lightning */}
          <path d="M 0 -20 L 40 40 L 20 60 L 80 120" fill="none" stroke={RED} strokeWidth={3} />
          <path d="M 400 -30 L 360 30 L 380 50 L 320 110" fill="none" stroke={RED} strokeWidth={3} />
        </g>
      </Fade>

      {/* BEAT 5: Electrostatic shielding */}
      <Badge n={2} cx={52} cy={335} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={74} y={340} size={14} fill={RED} weight={700} anchor="start">THE FARADAY CAGE</T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(60, 355)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={38} anchor="middle" size={16} fill={INK} weight={800}>
            Surface charges rearrange to cancel E inside
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Safety */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={60} y={440} size={13} fill={MUTED} anchor="start" script>
          {t(
            "This is why you are safe inside a car during a lightning storm!",
            "Isi wajah se lightning storm mein car ke andar safe rehte ho!"
          )}
        </T>
      </Fade>

      {/* BEAT 7: One-way shielding */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Shielding is ONE-WAY: protects inside from outside, but NOT outside from inside! ✓",
            "★ Shielding ek-tarfa hai: bahar se andar ko bachata hai, par andar se bahar ko nahi! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
