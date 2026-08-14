"use client";

/**
 * P12Ch02 · Section 42 — "Formula toolkit: conductors in equilibrium"
 * Beats (en [0,4,11,19,32,45,50,63]): 8 beats
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

export default function P12Ch02Sec42({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("formula toolkit: conductors in equilibrium", "formula toolkit: conductors in equilibrium")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 320 70 C 440 66, 640 74, 760 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: E inside = 0 */}
      <Badge n={1} cx={52} cy={120} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 1)}>
        <T x={74} y={125} size={14} fill={RED} weight={700} anchor="start">FIELD INSIDE</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 3}>
        <g transform="translate(60, 140)">
          <rect x={0} y={5} width={400} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={200} y={38} anchor="middle" size={20} fill={INK} weight={800}>
            E_inside = 0
          </T>
        </g>
      </Fade>

      {/* BEAT 2: Charge on surface */}
      <Badge n={2} cx={540} cy={120} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 1)}>
        <T x={562} y={125} size={14} fill={RED} weight={700} anchor="start">EXCESS CHARGE</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 3}>
        <g transform="translate(540, 140)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            q_interior = 0 (all on surface)
          </T>
        </g>
      </Fade>

      {/* BEAT 3: Field outside */}
      <Badge n={3} cx={52} cy={230} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 1)}>
        <T x={74} y={235} size={14} fill={RED} weight={700} anchor="start">FIELD JUST OUTSIDE</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 5}>
        <g transform="translate(60, 250)">
          <rect x={0} y={5} width={600} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={300} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            E_conductor = σ/ε₀   vs   E_sheet = σ/2ε₀
          </T>
        </g>
      </Fade>

      {/* BEAT 4: Sigma note */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={60} y={335} size={13} fill={MUTED} anchor="start" script>
          {t(
            "σ is LOCAL surface charge density (C/m²), E points perpendicular to surface.",
            "σ yahan LOCAL surface charge density (C/m²) hai, aur E perpendicular point karti hai."
          )}
        </T>
      </Fade>

      {/* BEAT 5: Potential V */}
      <Badge n={4} cx={52} cy={380} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 1)}>
        <T x={74} y={385} size={14} fill={RED} weight={700} anchor="start">POTENTIAL V</T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(60, 400)">
          <rect x={0} y={5} width={400} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={200} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            V = constant throughout
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Cavity induction */}
      <Badge n={5} cx={540} cy={380} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 1)}>
        <T x={562} y={385} size={14} fill={RED} weight={700} anchor="start">CAVITY INDUCTION (charge q inside)</T>
      </Fade>
      <Fade on={beat >= 6} dim={beat >= 7}>
        <g transform="translate(540, 400)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            q_inner = −q,    q_outer = +q
          </T>
        </g>
      </Fade>

      {/* BEAT 7: Uneven charge distribution */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={536} w={880} h={44} fill={RED} textFill="#ffffff" size={18}>
          {t(
            "★ Caution: σ is NOT uniform on irregular shapes! It piles up at sharp points! ✓",
            "★ Caution: Irregular shapes pe σ uniform NAHI hota! Sharp points pe jama hota hai! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
