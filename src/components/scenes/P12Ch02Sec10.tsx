"use client";

/**
 * P12Ch02 · Section 10 — "NEET speed trap: potential zero, field not"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md & SCENE_PLAYBOOK.md.
 *
 * OBJECT-RICH OPEN CHALKBOARD DESIGN (NO HEAVY CONTAINERS):
 *  - Two equal and opposite charges +q and −q
 *  - Midpoint: V = 0 (scalar addition cancels) but E ≠ 0 (vectors ADD!)
 *  - V = kq/r + k(−q)/r = 0  ← scalars cancel
 *  - E = 2 × kq/r²  ← vectors reinforce (both point same direction!)
 *  - Speed rule: potential cancels (scalar ± signs), field reinforces (vector directions!)
 *
 * Beats (en [0,6,18,27,31,45,51,70]):  — 8 beats total
 *  0 Title "NEET speed trap: V = 0 but E ≠ 0" + underline
 *  1 Diagram: +q and −q with midpoint
 *  2 Student instinct: equal & opposite → everything cancels?
 *  3 WARNING: half right = the trap!
 *  4 Badge 1 — Potential: V = kq₁/r + kq₂/r = 0 ✓ (scalar cancels)
 *  5 Text: potential cancels because scalar with signs
 *  6 Badge 2 — Field: E = 2kq/r² ≠ 0 (vectors reinforce!)
 *  7 Speed rule chip: scalar V can cancel, vector E may reinforce!
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

export default function P12Ch02Sec10({ currentTime, reveals, language }: SceneProps) {
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
            "NEET speed trap: V = 0 but E ≠ 0",
            "NEET speed trap: V = 0 lekin E ≠ 0"
          )}
        </T>
      </Fade>
      <Draw
        on={beat >= 0}
        delay={dl(0, 2.5)}
        d="M 260 70 C 440 66, 640 74, 820 69"
        stroke={RED}
        sw={2.4}
        dur={0.7}
      />

      {/* ── BEAT 1: Diagram — +q and −q with midpoint ── */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        {/* +q charge left */}
        <circle cx={200} cy={250} r={18} fill={RED} stroke={INK} strokeWidth={1.5} />
        <T x={200} y={255} size={16} fill="#fff" weight={800}>+q</T>

        {/* −q charge right */}
        <circle cx={480} cy={250} r={18} fill="#3b82f6" stroke={INK} strokeWidth={1.5} />
        <T x={480} y={255} size={16} fill="#fff" weight={800}>−q</T>

        {/* Line connecting */}
        <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 220 250 h 240" stroke={INK} sw={1.5} dur={0.4} />

        {/* Midpoint M */}
        <circle cx={340} cy={250} r={5} fill={AMBER_DARK} />
        <T x={340} y={282} size={14} fill={AMBER_DARK} weight={700}>M (midpoint)</T>

        {/* r labels */}
        <T x={270} y={240} size={12} fill={INK} script>r</T>
        <T x={410} y={240} size={12} fill={INK} script>r</T>

        {/* E vectors at midpoint (both point left to right from + toward −) */}
        <Fade on={beat >= 1} delay={dl(1, 1)}>
          <Draw on={beat >= 1} delay={dl(1, 1)} d="M 340 220 L 340 195" stroke={RED} sw={2} dur={0.3} />
          <T x={340} y={190} size={12} fill={RED} weight={700}>Ē₊</T>
          <Draw on={beat >= 1} delay={dl(1, 1.3)} d="M 345 220 L 345 195" stroke="#3b82f6" sw={2} dur={0.3} />
          <T x={360} y={190} size={12} fill="#3b82f6" weight={700}>Ē₋</T>
        </Fade>
      </Fade>

      {/* ── BEAT 2: Student instinct text ── */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={560} y={140} size={14} fill={INK} anchor="start" script>
          {t(
            "Student instinct: equal & opposite charges → everything cancels?",
            "Student instinct: equal & opposite charges → sab cancel?"
          )}
        </T>
      </Fade>

      {/* ── BEAT 3: WARNING — half right ── */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <g transform="translate(560, 160)">
          <rect x={0} y={0} width={420} height={40} rx={6} fill="#fef2f2" stroke={RED} strokeWidth={2} />
          <T x={210} y={26} anchor="middle" size={15} fill={RED} weight={800}>
            {t(
              "⚠ That instinct is HALF RIGHT — exactly the trap!",
              "⚠ Yeh instinct HALF RIGHT hai — yehi trap hai!"
            )}
          </T>
        </g>
      </Fade>

      {/* ── BEAT 4: Badge 1 — Potential = 0 (scalar cancels) ── */}
      <Badge n={1} cx={52} cy={340} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 1)}>
        <T x={74} y={345} size={14} fill={RED} weight={700} anchor="start">
          POTENTIAL (SCALAR) → CANCELS ✓
        </T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(60, 358)">
          <rect x={0} y={5} width={460} height={55} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={230} y={25} anchor="middle" size={18} fill={INK} weight={800}>
            V = kq/r + k(−q)/r = 0
          </T>
          <T x={230} y={50} anchor="middle" size={13} fill={GREEN} weight={700}>
            Scalar with ± signs → perfectly cancels!
          </T>
        </g>
      </Fade>

      {/* ── BEAT 5: Text — scalar cancels note ── */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={60} y={440} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Potential is scalar: opposite signs cancel algebraically.",
            "Potential scalar hai: opposite signs algebraically cancel karte hain."
          )}
        </T>
      </Fade>

      {/* ── BEAT 6: Badge 2 — Field ≠ 0 (vectors reinforce!) ── */}
      <Badge n={2} cx={540} cy={340} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 1)}>
        <T x={562} y={345} size={14} fill={RED} weight={700} anchor="start">
          FIELD (VECTOR) → REINFORCES ✗
        </T>
      </Fade>
      <Fade on={beat >= 6}>
        <g transform="translate(540, 358)">
          <rect x={0} y={5} width={460} height={55} rx={8} fill={CREAM} stroke={RED} strokeWidth={2.5} />
          <T x={230} y={25} anchor="middle" size={18} fill={RED} weight={800}>
            E = 2 × kq / r² ≠ 0
          </T>
          <T x={230} y={50} anchor="middle" size={13} fill={RED} weight={700}>
            Vectors point SAME direction → they ADD!
          </T>
        </g>
      </Fade>

      {/* ── BEAT 7: Speed Rule Chip ── */}
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
            "★ SPEED RULE: Scalar V can cancel (±signs) but Vector E may reinforce! ✓",
            "★ SPEED RULE: Scalar V cancel ho sakta (±signs) par Vector E reinforce hota! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
