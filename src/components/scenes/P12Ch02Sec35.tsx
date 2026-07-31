"use client";

/**
 * P12Ch02 · Section 35 — "NEET speed trap: dielectric with the battery disconnected"
 * Beats (en [0,6,20,32,44,55,66,83]): 8 beats
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

export default function P12Ch02Sec35({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("NEET speed trap: dielectric with battery disconnected", "NEET speed trap: dielectric with battery disconnected")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Problem setup */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <g transform="translate(60, 90)">
          <rect x={0} y={5} width={960} height={55} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.5} />
          <T x={20} y={25} size={14} fill={INK} weight={700} anchor="start">GIVEN:</T>
          <T x={20} y={48} size={14} fill={INK} anchor="start" script>
            {t(
              "C₀ = 5 μF, V₀ = 100 V. Battery DISCONNECTED. Then dielectric K = 4 inserted.",
              "C₀ = 5 μF, V₀ = 100 V. Battery DISCONNECTED. Phir dielectric K = 4 dala."
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 2: The Trap */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <g transform="translate(60, 160)">
          <rect x={0} y={0} width={450} height={40} rx={6} fill="#fef2f2" stroke={RED} strokeWidth={2} />
          <T x={225} y={26} anchor="middle" size={14} fill={RED} weight={800}>
            {t("⚠ TRAP: Assuming V stays at 100 V!", "⚠ TRAP: Maan lena ki V 100 V hi rahega!")}
          </T>
        </g>
      </Fade>

      {/* BEAT 3: Disconnected → Q locked */}
      <Badge n={1} cx={52} cy={220} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={74} y={225} size={14} fill={RED} weight={700} anchor="start">Q IS LOCKED (DISCONNECTED)</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 4}>
        <g transform="translate(60, 240)">
          <rect x={0} y={5} width={600} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={300} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            Q = C₀V₀ = (5μF)(100V) = 500 μC (fixed!)
          </T>
        </g>
      </Fade>

      {/* BEAT 4: V drops */}
      <Badge n={2} cx={52} cy={315} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={74} y={320} size={14} fill={RED} weight={700} anchor="start">NEW CAPACITANCE & VOLTAGE</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(60, 335)">
          <rect x={0} y={5} width={800} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={400} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            C = KC₀ = 20 μF    |    V = Q/C = 500/20 = 25 V
          </T>
        </g>
      </Fade>

      {/* BEAT 5: V/K meaning */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={60} y={415} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Voltage fell from 100V to 25V (divided by K=4) exactly as theory says!",
            "Voltage 100V se 25V gir gaya (K=4 se divide hua) exactly theory ke mutabiq!"
          )}
        </T>
      </Fade>

      {/* BEAT 6: Energy drops */}
      <Badge n={3} cx={52} cy={445} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={74} y={450} size={14} fill={RED} weight={700} anchor="start">ENERGY DROPS (U = Q²/2C)</T>
      </Fade>
      <Fade on={beat >= 6}>
        <g transform="translate(60, 465)">
          <rect x={0} y={5} width={900} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={450} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            U₀ = Q²/(2C₀) = 2.5×10⁻² J    |    U = Q²/(2C) = U₀/4 = 0.625×10⁻² J
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Speed Rule */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ SPEED RULE: Disconnected → Q fixed → V, E, and U all divide by K! ✓",
            "★ SPEED RULE: Disconnected → Q fixed → V, E, aur U sab K se divide hote hain! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
