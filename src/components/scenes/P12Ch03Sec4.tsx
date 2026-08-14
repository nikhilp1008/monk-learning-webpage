"use client";

/**
 * P12Ch02 · Section 4 — "The free-electron model and its limits"
 * Beats (en [0,10,15,25,35,47,56,67]): 8 beats
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

export default function P12Ch03Sec4({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("The free-electron model and its limits", "Free-electron model aur iski limitations")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 310 70 C 440 66, 640 74, 770 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Model Assumptions */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">ELECTRON GAS MODEL (DRUDE-LORENTZ)</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 3}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Valence e⁻ move freely like ideal gas molecules.",
              "Valence e⁻ ideal gas molecules ki tarah freely move karte hain."
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 2: Drift velocity formula */}
      <Badge n={2} cx={540} cy={140} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">DRIFT VELOCITY FORMULA</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 4}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={35} anchor="middle" size={18} fill={INK} weight={800}>
            v_d = (e E τ) / m
          </T>
        </g>
      </Fade>

      {/* BEAT 3: Relaxation Time tau */}
      <Badge n={3} cx={52} cy={270} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={74} y={275} size={14} fill={RED} weight={700} anchor="start">RELAXATION TIME (τ)</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 5}>
        <g transform="translate(60, 290)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={15} fill={INK} weight={800}>
            τ ≈ 10⁻¹⁴ s (Average time between collisions)
          </T>
        </g>
      </Fade>

      {/* BEAT 4: Mean Free Path */}
      <Badge n={4} cx={540} cy={270} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={562} y={275} size={14} fill={RED} weight={700} anchor="start">MEAN FREE PATH (λ)</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 5}>
        <g transform="translate(540, 290)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={35} anchor="middle" size={15} fill={INK} weight={800}>
            λ = v_th × τ ≈ 1 nm (10⁻⁹ m)
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Limitations of Classical Model */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)} dim={beat >= 7}>
        <g transform="translate(60, 390)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill="#fef2f2" stroke={RED} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={15} fill={RED} weight={800} script>
            {t(
              "Limitations: Ignores quantum mechanics, Pauli exclusion, fails for semiconductors!",
              "Limitations: Quantum mechanics ko ignore karta hai, semiconductors ke liye fail hota hai!"
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Classical model explains Ohm's law, but quantum band theory is needed for semiconductors! ✓",
            "★ Classical model Ohm's law samjhata hai, par semiconductors ke liye band theory chahiye! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
