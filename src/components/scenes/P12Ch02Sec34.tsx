"use client";

/**
 * P12Ch02 · Section 34 — "CBSE level: capacitance and charge of an air capacitor"
 * Beats (en [0,4,15,28,44,54,63,71]): 8 beats
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

export default function P12Ch02Sec34({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("CBSE level: capacitance and charge of an air capacitor", "CBSE level: air capacitor ki capacitance aur charge")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 70 C 440 66, 640 74, 960 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Problem statement */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <g transform="translate(60, 90)">
          <rect x={0} y={5} width={960} height={55} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.5} />
          <T x={20} y={25} size={14} fill={INK} weight={700} anchor="start">GIVEN:</T>
          <T x={20} y={48} size={14} fill={INK} anchor="start" script>
            {t(
              "Area A = 200 cm², gap d = 1.0 mm, air filled. Voltage V = 50 V. Find C₀ and Q.",
              "Area A = 200 cm², gap d = 1.0 mm, air. Voltage V = 50 V. C₀ aur Q nikalo."
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 2: SI conversion */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={60} y={170} size={13} fill={MUTED} anchor="start" script>
          {t(
            "First convert to SI: A = 2.0 × 10⁻² m², d = 1.0 × 10⁻³ m",
            "Pehle SI mein convert: A = 2.0 × 10⁻² m², d = 1.0 × 10⁻³ m"
          )}
        </T>
      </Fade>

      {/* BEAT 3: Substitution */}
      <Badge n={1} cx={52} cy={220} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={74} y={225} size={14} fill={RED} weight={700} anchor="start">FIND CAPACITANCE C₀</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 4}>
        <g transform="translate(60, 240)">
          <rect x={0} y={5} width={600} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={300} y={38} anchor="middle" size={16} fill={INK} weight={800}>
            C₀ = (8.85×10⁻¹²)(2.0×10⁻²) / (1.0×10⁻³)
          </T>
        </g>
      </Fade>

      {/* BEAT 4: C₀ Result */}
      <Fade on={beat >= 4} delay={dl(4, 0.5)}>
        <g transform="translate(680, 240)">
          <rect x={0} y={5} width={340} height={50} rx={10} fill={CREAM} stroke={RED} strokeWidth={2.5} />
          <T x={170} y={38} anchor="middle" size={20} fill={RED} weight={800}>
            C₀ = 1.77×10⁻¹⁰ F = 177 pF
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Picofarads note */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={680} y={320} size={13} fill={MUTED} anchor="start" script>
          {t(
            "177 pF: Farad is enormous, so everyday values are tiny!",
            "177 pF: Farad bohot bada hai, practical values tiny hoti hain!"
          )}
        </T>
      </Fade>

      {/* BEAT 6: Find Q */}
      <Badge n={2} cx={52} cy={350} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={74} y={355} size={14} fill={RED} weight={700} anchor="start">FIND CHARGE Q</T>
      </Fade>
      <Fade on={beat >= 6} dim={beat >= 8}>
        <g transform="translate(60, 370)">
          <rect x={0} y={5} width={600} height={55} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={300} y={40} anchor="middle" size={20} fill={INK} weight={800}>
            Q = C₀V = (1.77×10⁻¹⁰)(50) = 8.85 nC
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Plates interpretation */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={60} y={455} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Both plates carry 8.85 nC: one is positive, one is negative.",
            "Dono plates pe 8.85 nC: ek positive, ek negative."
          )}
        </T>
      </Fade>

      {/* BEAT 8: Takeaway */}
      <Fade on={beat >= 8}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Always convert cm² → 10⁻⁴ m² and mm → 10⁻³ m before plugging in! ✓",
            "★ Formulas mein daalne se pehle hamesha SI units (m², m) mein convert karo! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
