"use client";

/**
 * P12Ch02 · Section 7 — "Current, drift velocity and current density"
 * Beats (en [0,9,14,30,42,56,66,76]): 8 beats
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

export default function P12Ch03Sec7({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Current, drift velocity and current density", "Current, drift velocity aur current density")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 230 70 C 440 66, 640 74, 850 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Master Relation I = neAv_d */}
      <Badge n={1} cx={52} cy={140} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={145} size={14} fill={RED} weight={700} anchor="start">CURRENT & DRIFT VELOCITY RELATION</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 5}>
        <g transform="translate(60, 160)">
          <rect x={0} y={5} width={450} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={35} anchor="middle" size={18} fill={INK} weight={800}>
            I = n e A v_d
          </T>
        </g>
      </Fade>

      {/* BEAT 3: Parameters breakdown */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)} dim={beat >= 5}>
        <T x={60} y={235} size={13} fill={MUTED} anchor="start" script>
          {t(
            "n = electron density (e⁻/m³), e = 1.6×10⁻¹⁹ C, A = cross-section area.",
            "n = electron density (e⁻/m³), e = 1.6×10⁻¹⁹ C, A = cross-section area."
          )}
        </T>
      </Fade>

      {/* BEAT 5: Current Density J = I / A */}
      <Badge n={2} cx={540} cy={140} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={145} size={14} fill={RED} weight={700} anchor="start">CURRENT DENSITY VECTOR (J)</T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(540, 160)">
          <rect x={0} y={5} width={480} height={60} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={240} y={30} anchor="middle" size={16} fill={INK} weight={800}>
            J = I / A = n e v_d
          </T>
          <T x={240} y={52} anchor="middle" size={15} fill={INK} weight={800}>
            Vector: J = σ E
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Dimensions & Units */}
      <Badge n={3} cx={52} cy={340} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={74} y={345} size={14} fill={RED} weight={700} anchor="start">UNITS AND DIMENSIONS</T>
      </Fade>
      <Fade on={beat >= 6} dim={beat >= 7}>
        <g transform="translate(60, 360)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={480} y={35} anchor="middle" size={15} fill={INK} weight={800} script>
            {t(
              "Current I: [A] (Scalar)  |  Current Density J: A/m² -> [L⁻² A] (Vector)",
              "Current I: [A] (Scalar)  |  Current Density J: A/m² -> [L⁻² A] (Vector)"
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Summary Chip */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Master Equation: I = neAv_d  and  J = ne v_d = σE. J is a true vector! ✓",
            "★ Master Equation: I = neAv_d  aur  J = ne v_d = σE. J sacha vector hai! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
