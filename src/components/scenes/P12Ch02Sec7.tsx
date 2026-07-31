"use client";

/**
 * P12Ch02 · Section 7 — "Deriving E equals minus dV by dr from equipotential surfaces"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md & SCENE_PLAYBOOK.md.
 *
 * OBJECT-RICH OPEN CHALKBOARD DESIGN (NO HEAVY CONTAINERS):
 *  - Two equipotential surfaces A (at V) and B (at V + δV), separated by δl
 *  - Work done W = |E| δl to move unit charge perpendicularly between surfaces
 *  - Work also equals potential drop: W = V_A − V_B = −δV
 *  - Combine: |E| δl = −δV  →  E = −dV/dr
 *  - Where surfaces crowd together, field is STRONGEST!
 *
 * Beats (en [0,5,12,24,32,42,51,61,74]):
 *  0 Title "derivation: E = −dV/dr" + drawn underline
 *  1 Diagram: two equipotential surfaces A and B
 *  2 Setup: surfaces A at V, B at V+δV, separated by δl
 *  3 Field direction: E points perpendicular between surfaces
 *  4 Work formula: W = |E| δl
 *  5 Potential drop: same work = V_A − V_B = −δV
 *  6 Combine: |E| δl = −δV
 *  7 Final: E = −dV/dr  (field is negative gradient of potential!)
 *  8 Rule: crowded equipotentials → strong field!
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

export default function P12Ch02Sec7({ currentTime, reveals, language }: SceneProps) {
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
            "derivation: E = −dV / dr from equipotential surfaces",
            "derivation: equipotential surfaces se E = −dV / dr nikalna"
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

      {/* ── BEAT 1: Diagram — Two Equipotential Surfaces ── */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        {/* Surface A */}
        <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 250 120 C 260 200, 240 320, 250 420" stroke={AMBER_DARK} sw={2.5} dur={0.6} />
        <T x={230} y={115} size={13} fill={AMBER_DARK} weight={700}>A</T>
        <T x={220} y={440} size={12} fill={AMBER_DARK} script>V</T>

        {/* Surface B */}
        <Draw on={beat >= 1} delay={dl(1, 0.8)} d="M 420 120 C 430 200, 410 320, 420 420" stroke={AMBER_DARK} sw={2.5} dur={0.6} />
        <T x={440} y={115} size={13} fill={AMBER_DARK} weight={700}>B</T>
        <T x={440} y={440} size={12} fill={AMBER_DARK} script>V + δV</T>

        {/* δl arrow between */}
        <Draw on={beat >= 1} delay={dl(1, 1.2)} d="M 260 270 h 150" stroke={INK} sw={1.5} />
        <Fade on={beat >= 1} delay={dl(1, 1.4)}>
          <polygon points="408,270 398,265 398,275" fill={INK} />
          <T x={335} y={262} size={13} fill={INK} weight={700}>δl</T>
        </Fade>

        {/* E arrow */}
        <Draw on={beat >= 1} delay={dl(1, 1.6)} d="M 280 310 h 110" stroke={RED} sw={2} />
        <Fade on={beat >= 1} delay={dl(1, 1.8)}>
          <polygon points="392,310 380,305 380,315" fill={RED} />
          <T x={340} y={335} size={14} fill={RED} weight={800}>Ē</T>
        </Fade>
      </Fade>

      {/* ── BEAT 2: Setup Text ── */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={520} y={140} size={14} fill={INK} anchor="start" script>
          {t(
            "Surface A at potential V, surface B at V + δV",
            "Surface A pe potential V, surface B pe V + δV"
          )}
        </T>
        <T x={520} y={165} size={14} fill={INK} anchor="start" script>
          {t(
            "Perpendicular separation = δl between them",
            "Perpendicular separation = δl dono ke beech"
          )}
        </T>
      </Fade>

      {/* ── BEAT 3: Field Direction ── */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={520} y={205} size={14} fill={MUTED} anchor="start" script>
          {t(
            "Field must point along perpendicular (no work along surface!)",
            "Field perpendicular direction mein honi chahiye (surface par work zero!)"
          )}
        </T>
      </Fade>

      {/* ── BEAT 4: Badge 1 — Work formula W = |E| δl ── */}
      <Badge n={1} cx={510} cy={250} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 1)}>
        <T x={534} y={255} size={14} fill={RED} weight={700} anchor="start">
          WORK = FORCE × DISTANCE
        </T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 7}>
        <g transform="translate(520, 268)">
          <rect x={0} y={5} width={380} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={190} y={38} anchor="middle" size={22} fill={INK} weight={800}>
            W = |Ē| · δl
          </T>
        </g>
      </Fade>

      {/* ── BEAT 5: Potential drop equivalence ── */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={520} y={348} size={14} fill={MUTED} anchor="start" script>
          {t(
            "Same work = potential drop for unit charge:",
            "Same work = unit charge ke liye potential drop:"
          )}
        </T>
      </Fade>

      {/* ── BEAT 6: Badge 2 — Combined formula |E| δl = −δV ── */}
      <Badge n={2} cx={510} cy={388} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 1)}>
        <T x={534} y={393} size={14} fill={RED} weight={700} anchor="start">
          EQUATING WORK & POTENTIAL DROP
        </T>
      </Fade>
      <Fade on={beat >= 6} dim={beat >= 7}>
        <g transform="translate(520, 406)">
          <rect x={0} y={5} width={420} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={210} y={38} anchor="middle" size={22} fill={INK} weight={800}>
            |Ē| δl = V_A − V_B = −δV
          </T>
        </g>
      </Fade>

      {/* ── BEAT 7: Badge 3 — Final E = −dV/dr ── */}
      <Badge n={3} cx={65} cy={478} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <g transform="translate(85, 462)">
          <rect x={0} y={0} width={460} height={60} rx={10} fill={CREAM} stroke={RED} strokeWidth={2.5} />
          <T x={230} y={40} anchor="middle" size={28} fill={RED} weight={800}>
            E = − dV / dr    [V/m]
          </T>
        </g>
      </Fade>

      {/* ── BEAT 8: Rule Chip ── */}
      <Fade on={beat >= 8}>
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
            "★ RULE: Crowded equipotentials → STRONG field!  E = −dV/dr ✓",
            "★ RULE: Crowded equipotentials → STRONG field!  E = −dV/dr ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
