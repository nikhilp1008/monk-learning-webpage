"use client";

/**
 * P12Ch02 · Section 5 — "Dipole potential and the field–potential relation"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md & SCENE_PLAYBOOK.md.
 *
 * OBJECT-RICH OPEN CHALKBOARD DESIGN (NO HEAVY CONTAINERS):
 *  - Electric potential of a dipole:
 *    1. General point (r, θ): V(r, θ) = k p cos θ / r²  = k p̄ · r̂ / r²
 *    2. Axial line (θ = 0° or 180°): V_axial = ± k p / r²
 *    3. Equatorial line (θ = 90°): V_equatorial = 0 (PERFECT ZERO POTENTIAL PLANE!)
 *  - Relation between E and V:
 *    E = - dV / dr  (Electric field is negative gradient of potential!)
 *    Direction: Ē points in direction of steepest decrease of potential V.
 *
 * Beats (en [0,8,21,32,43,49,57,64,73]):
 *  0 Title "dipole potential & field–potential gradient relation" + drawn underline
 *  1 Hook note: deriving V(r, θ) for dipole and link E = -dV/dr!
 *  2 Dipole Potential General: V(r, θ) = k p cos θ / r²
 *  3 Axial vs Equatorial: V_axial = ±kp/r²  |  V_equatorial = 0
 *  4 Gradient Relation: E = - dV / dr
 *  5 Direction rule: Electric field points from HIGHER potential to LOWER potential!
 *  6 Distance dependency: Dipole potential decays as 1/r² (vs 1/r for point charge)!
 *  7 Grand Verdict: V_dipole = kp cos θ / r²  |  V_eq = 0  |  E = -dV/dr !
 */

import React from "react";
import {
  SceneProps,
  useBeat,
  delayFor,
  Fade,
  Draw,
  T,
  Chip,
  ringD,
  INK,
  MUTED,
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
} from "./kit";

function Badge({ n, cx, cy, on, delay }: { n: number; cx: number; cy: number; on: boolean; delay: number }) {
  return (
    <g>
      <Draw
        on={on}
        delay={delay}
        d={`M ${cx - 13} ${cy} A 13 13 0 1 1 ${cx + 13} ${cy} A 13 13 0 1 1 ${cx - 13} ${cy}`}
        stroke={RED}
        sw={2.2}
        dur={0.4}
      />
      <Fade on={on} delay={delay + 0.3}>
        <T x={cx} y={cy + 5} size={14} fill={RED} weight={800}>
          {n}
        </T>
      </Fade>
    </g>
  );
}

export default function P12Ch02Sec5({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg
      viewBox="0 0 1080 620"
      preserveAspectRatio="xMidYMin meet"
      className="w-full h-full select-none"
    >
      {/* ── BEAT 0: Title ── */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t(
            "dipole potential & field–potential gradient relation",
            "dipole potential & field–potential gradient relation"
          )}
        </T>
      </Fade>
      <Draw
        on={beat >= 0}
        delay={dl(0, 2.5)}
        d="M 180 70 C 440 66, 640 74, 900 69"
        stroke={RED}
        sw={2.4}
        dur={0.7}
      />

      {/* ── BEAT 1: Hook Note ── */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={60} y={110} size={15} fill={MUTED} script anchor="start">
          {t(
            "deriving V(r, θ) for dipole and link E = -dV/dr!",
            "dipole ke liye V(r, θ) derive karna aur E = -dV/dr link karna!"
          )}
        </T>
      </Fade>

      {/* ── BEAT 2: Badge 1 & Dipole Potential General ── */}
      <Badge n={1} cx={52} cy={165} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 1)}>
        <T x={74} y={170} size={14} fill={RED} weight={700} anchor="start">
          {t("DIPOLE POTENTIAL V(r, θ) = k p cos θ / r²", "DIPOLE POTENTIAL V(r, θ) = k p cos θ / r²")}
        </T>
      </Fade>

      <Fade on={beat >= 2} dim={beat >= 5}>
        <g transform="translate(60, 185)">
          <rect x={0} y={10} width={430} height={85} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={215} y={48} anchor="middle" size={20} fill={INK} weight={800}>
            V(r, θ) = k p cos θ / r²
          </T>
          <T x={215} y={78} anchor="middle" size={13} fill={AMBER_DARK} script>
            {t("Decays as 1/r² (faster than point charge 1/r!)", "1/r² se decay karta hai (point charge 1/r se fast!)")}
          </T>
          <Draw on={beat >= 2} delay={dl(2, 1.6)} d="M 100 56 h 230 M 100 60 h 230" stroke={AMBER_DARK} sw={1.5} />
        </g>
      </Fade>

      {/* ── BEAT 4: Badge 3 & Gradient Relation E = -dV/dr ── */}
      <Badge n={3} cx={540} cy={165} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 1)}>
        <T x={562} y={170} size={14} fill={RED} weight={700} anchor="start">
          {t("GRADIENT RELATION: E = - dV / dr", "GRADIENT RELATION: E = - dV / dr")}
        </T>
      </Fade>

      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(540, 185)">
          <T x={0} y={25} anchor="start" size={14} fill={INK} weight={700}>
            Negative sign means E points toward DECREASING V!
          </T>
          <T x={0} y={65} anchor="start" size={24} fill={RED} weight={800}>
            E = - dV / dr  [V/m or N/C]
          </T>
        </g>
      </Fade>

      {/* ── BEAT 7: Grand Verdict Chip ── */}
      <Fade on={beat >= 7}>
        <Chip
          x={100}
          y={536}
          w={880}
          h={44}
          fill={GREEN}
          textFill="#ffffff"
          size={18}
        >
          {t(
            "★ VERDICT: V_dipole = kp cos θ / r²  |  V_eq = 0  |  E = -dV/dr !",
            "★ VERDICT: V_dipole = kp cos θ / r²  |  V_eq = 0  |  E = -dV/dr !"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
