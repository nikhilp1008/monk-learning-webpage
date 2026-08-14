"use client";

/**
 * P12Ch02 · Section 3 — "Equipotential surfaces — walking the contour lines"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md & SCENE_PLAYBOOK.md.
 *
 * OBJECT-RICH OPEN CHALKBOARD DESIGN (NO HEAVY CONTAINERS):
 *  - Equipotential Surface: A surface where potential V is constant at every point!
 *  - Work done W = q (V_B - V_A) = 0 for moving charge along an equipotential surface!
 *  - Electric field Ē is ALWAYS PERPENDICULAR (⊥) to an equipotential surface!
 *  - Concentric spheres for point charge, parallel planes for uniform field!
 *  - Equipotential surfaces NEVER intersect!
 *
 * Beats (en [0,5,18,31,41,52,66]):
 *  0 Title "equipotential surfaces — walking the contour lines" + drawn underline
 *  1 Hook note: visualising constant-potential surfaces and 4 core rules!
 *  2 Badge 1 & Zero Work: W = q ΔV = 0 along equipotential surface!
 *  3 Badge 2 & Perpendicular Field: Electric field Ē is ALWAYS ⊥ to surface!
 *  4 Badge 3 & Shape Rules: Concentric spheres (point charge), Parallel planes (uniform field)
 *  5 Non-Intersection Rule: Two equipotential surfaces NEVER intersect!
 *  6 Grand Verdict: W = 0 along equipotential  |  Ē ⊥ Equipotential  |  Never Intersect!
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

export default function P12Ch02Sec3({ currentTime, reveals, language }: SceneProps) {
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
            "equipotential surfaces — walking the contour lines",
            "equipotential surfaces — contour lines par chalna"
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
            "visualising constant-potential surfaces and 4 core rules!",
            "constant-potential surfaces aur 4 core rules ko visualise karna!"
          )}
        </T>
      </Fade>

      {/* ── BEAT 2: Badge 1 & Zero Work ── */}
      <Badge n={1} cx={52} cy={165} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 1)}>
        <T x={74} y={170} size={14} fill={RED} weight={700} anchor="start">
          {t("ZERO WORK: W = q (V_B - V_A) = 0", "ZERO WORK: W = q (V_B - V_A) = 0")}
        </T>
      </Fade>

      <Fade on={beat >= 2} dim={beat >= 5}>
        <g transform="translate(60, 185)">
          <rect x={0} y={10} width={430} height={85} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={215} y={48} anchor="middle" size={20} fill={INK} weight={800}>
            W_AB = 0  (Since V_A = V_B)
          </T>
          <T x={215} y={78} anchor="middle" size={13} fill={AMBER_DARK} script>
            {t("Moving a charge on equipotential requires ZERO net work!", "Equipotential par charge move karne me ZERO net work lagta hai!")}
          </T>
          <Draw on={beat >= 2} delay={dl(2, 1.6)} d="M 100 56 h 230 M 100 60 h 230" stroke={AMBER_DARK} sw={1.5} />
        </g>
      </Fade>

      {/* ── BEAT 3: Badge 2 & Perpendicular Field ── */}
      <Badge n={2} cx={540} cy={165} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 1)}>
        <T x={562} y={170} size={14} fill={RED} weight={700} anchor="start">
          {t("ELECTRIC FIELD IS ALWAYS PERPENDICULAR ⊥", "ELECTRIC FIELD IS ALWAYS PERPENDICULAR ⊥")}
        </T>
      </Fade>

      <Fade on={beat >= 3} dim={beat >= 5}>
        <g transform="translate(540, 185)">
          <T x={0} y={25} anchor="start" size={14} fill={INK} weight={700}>
            Ē · d̄r = 0  ⇒  Ē ⊥ Equipotential Surface!
          </T>
          <T x={0} y={65} anchor="start" size={20} fill={RED} weight={800}>
            Points in direction of steepest potential drop!
          </T>
        </g>
      </Fade>

      {/* ── BEAT 6: Grand Verdict Chip ── */}
      <Fade on={beat >= 6}>
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
            "★ VERDICT: W = 0 along equipotential  |  Ē ⊥ Equipotential  |  Never Intersect!",
            "★ VERDICT: W = 0 along equipotential  |  Ē ⊥ Equipotential  |  Never Intersect!"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
