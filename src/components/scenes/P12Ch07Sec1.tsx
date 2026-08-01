"use client";

/**
 * P12Ch07 · Section 01 — "From steady DC to the restless sine wave"
 * Subtopic: AC Fundamentals, Peak, RMS & Mean Values
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

export default function P12Ch07Sec1({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Introduction to Alternating Current: DC vs AC Waveforms", "Alternating Current Ka Parichay: DC vs AC Waveforms")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1 & 3: Direct Current (DC) */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("DIRECT CURRENT (DC): CONSTANT MAGNITUDE & DIRECTION", "DIRECT CURRENT (DC): CONSTANT MAGNITUDE & DIRECTION")}
        </T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 5}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={30} anchor="middle" size={15} fill={INK} weight={800}>
            I(t) = I₀ = Constant
          </T>
          <T x={225} y={52} anchor="middle" size={14} fill={AMBER_DARK} weight={700}>
            Charges flow steadily in one direction without reversing!
          </T>
        </g>
      </Fade>

      {/* BEAT 5 & 6: Alternating Current (AC) */}
      <Badge n={2} cx={540} cy={140} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">
          {t("ALTERNATING CURRENT (AC): SINUSOIDAL PERIODIC OSCILLATION", "ALTERNATING CURRENT (AC): SINUSOIDAL PERIODIC OSCILLATION")}
        </T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={18} fill={GREEN} weight={800}>
            I(t) = I₀ sin(ωt + φ)
          </T>
          <T x={240} y={52} anchor="middle" size={14} fill={INK} weight={700}>
            {t("Reverses polarity every half cycle with frequency f = ω / 2π!", "Har half cycle me polarity reverse hoti hai with frequency f = ω / 2π!")}
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Key Parameters */}
      <Badge n={3} cx={52} cy={340} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={74} y={345} size={14} fill={RED} weight={700} anchor="start">
          {t("KEY PARAMETERS: PEAK VALUE I₀, PERIOD T & FREQUENCY f", "KEY PARAMETERS: PEAK VALUE I₀, PERIOD T & FREQUENCY f")}
        </T>
      </Fade>
      <Fade on={beat >= 7}>
        <g transform="translate(60, 360)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={16} fill={GREEN} weight={800}>
            Peak Amplitude I₀ | Time Period T = 2π/ω | Frequency f = 1/T = 50 Hz (India Mains Standard)!
          </T>
        </g>
      </Fade>

      {/* Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={490} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Alternating Current I(t) = I₀ sin(ωt) periodically reverses direction with angular frequency ω = 2πf! ✓",
            "★ Alternating Current I(t) = I₀ sin(ωt) angular frequency ω = 2πf ke sath direction periodically reverse karta hai! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
