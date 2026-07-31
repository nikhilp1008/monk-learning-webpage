"use client";

/**
 * P12Ch02 · Section 24 — "JEE Advanced: dipole released, rotational energy conservation"
 * Beats (en [0,6,24,37,51,67,78,83]): 8 beats
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

export default function P12Ch02Sec24({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("JEE Advanced: dipole released, rotational energy", "JEE Advanced: dipole chhoda, rotational energy")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 180 70 C 400 66, 660 74, 900 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Diagram — dipole at 90° in E field */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)} dim={beat >= 4}>
        {/* E field arrows */}
        {[160, 220, 280].map(y => (
          <g key={y}>
            <Draw on={beat >= 1} delay={dl(1, 0.3)} d={`M 80 ${y} h 80`} stroke={AMBER_DARK} sw={1.5} />
            <polygon points={`162,${y} 152,${y-4} 152,${y+4}`} fill={AMBER_DARK} />
          </g>
        ))}
        <T x={95} y={310} size={12} fill={AMBER_DARK} weight={700}>Ē</T>

        {/* Dipole perpendicular to E (at 90°) */}
        <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 230 160 v 120" stroke={INK} sw={2} dur={0.4} />
        <circle cx={230} cy={160} r={8} fill={RED} stroke={INK} strokeWidth={1} />
        <T x={230} y={163} size={10} fill="#fff" weight={800}>+</T>
        <circle cx={230} cy={280} r={8} fill="#3b82f6" stroke={INK} strokeWidth={1} />
        <T x={230} y={283} size={10} fill="#fff" weight={800}>−</T>
        <T x={252} y={225} size={13} fill={INK} weight={700}>p̄ (90°)</T>

        {/* Arrow showing rotation toward E */}
        <Draw on={beat >= 1} delay={dl(1, 0.8)} d="M 270 180 C 310 170, 320 200, 300 220" stroke={RED} sw={1.5} dur={0.4} />
        <T x={325} y={200} size={12} fill={RED} script>→ 0°</T>
      </Fade>

      {/* BEAT 2: Problem text */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <g transform="translate(380, 115)">
          <rect x={0} y={5} width={600} height={55} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.5} />
          <T x={300} y={28} anchor="middle" size={13} fill={INK} script>
            {t(
              "p = 4×10⁻⁹ C·m, I = 1×10⁻⁶ kg·m², E = 2×10⁴ V/m",
              "p = 4×10⁻⁹ C·m, I = 1×10⁻⁶ kg·m², E = 2×10⁴ V/m"
            )}
          </T>
          <T x={300} y={50} anchor="middle" size={13} fill={INK} script>
            {t("Released from 90°, find ω at 0°", "90° se chhoda, 0° pe ω nikalo")}
          </T>
        </g>
      </Fade>

      {/* BEAT 3: Rotational energy conservation */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={380} y={200} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Only field torque does work → rotational mechanical energy conserved!",
            "Sirf field torque work karta → rotational mechanical energy conserve!"
          )}
        </T>
      </Fade>

      {/* BEAT 4: U values */}
      <Badge n={1} cx={52} cy={350} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 1)}>
        <T x={74} y={355} size={14} fill={RED} weight={700} anchor="start">PE AT 90° AND 0°</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(60, 370)">
          <rect x={0} y={5} width={500} height={55} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={250} y={28} anchor="middle" size={16} fill={INK} weight={800}>
            U₉₀ = 0,    U₀ = −pE = −8×10⁻⁵ J
          </T>
          <T x={250} y={50} anchor="middle" size={13} fill={MUTED} script>
            ΔU = U₉₀ − U₀ = 8×10⁻⁵ J (converts to KE!)
          </T>
        </g>
      </Fade>

      {/* BEAT 5: ½Iω² = ΔU */}
      <Badge n={2} cx={580} cy={350} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <g transform="translate(580, 370)">
          <rect x={0} y={5} width={400} height={48} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={200} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            ½Iω² = 8×10⁻⁵ J
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Final ω */}
      <Badge n={3} cx={52} cy={458} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <g transform="translate(72, 443)">
          <rect x={0} y={0} width={520} height={55} rx={10} fill={CREAM} stroke={RED} strokeWidth={2.5} />
          <T x={260} y={35} anchor="middle" size={22} fill={RED} weight={800}>
            ω = √(2×8×10⁻⁵ / 10⁻⁶) ≈ 12.6 rad/s
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Takeaway */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Dipole swings to alignment like a pendulum — U → ½Iω² directly ✓",
            "★ Dipole alignment ki taraf swing karta jaise pendulum — U → ½Iω² directly ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
