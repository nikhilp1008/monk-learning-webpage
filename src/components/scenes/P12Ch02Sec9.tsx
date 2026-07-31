"use client";

/**
 * P12Ch02 · Section 9 — "Worked example: potential and work near a small charged sphere"
 * Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0,4,19,31,36,42,47,59,68]):
 *  0 Title "CBSE level: potential and work near a point charge" + underline
 *  1 Givens: Q = +25 nC, find V at r = 0.30 m & work for q₀ = 2 nC
 *  2 Substitution: V = (9×10⁹)(25×10⁻⁹) / 0.30
 *  3 Mechanical substitution note
 *  4 Result: V = 750 V
 *  5 Part (a) answer: clean 750 V
 *  6 Part (b): W = q₀ V = (2×10⁻⁹)(750)
 *  7 Result: W = 1.5 × 10⁻⁶ J = 1.5 μJ
 *  8 Discipline note: state givens, write formula, substitute, simplify!
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
      <Draw on={on} delay={delay}
        d={`M ${cx - 13} ${cy} A 13 13 0 1 1 ${cx + 13} ${cy} A 13 13 0 1 1 ${cx - 13} ${cy}`}
        stroke={RED} sw={2.2} dur={0.4} />
      <Fade on={on} delay={delay + 0.3}>
        <T x={cx} y={cy + 5} size={14} fill={RED} weight={800}>{n}</T>
      </Fade>
    </g>
  );
}

export default function P12Ch02Sec9({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* ── BEAT 0: Title ── */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("CBSE level: potential & work near a point charge", "CBSE level: point charge ke paas potential & work")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 400 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* ── BEAT 1: Givens ── */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <g transform="translate(60, 90)">
          <rect x={0} y={5} width={960} height={55} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.5} />
          <T x={20} y={25} size={14} fill={INK} weight={700} anchor="start">
            {t("GIVEN:", "DIYA GAYA:")}
          </T>
          <T x={20} y={48} size={14} fill={INK} anchor="start" script>
            {t(
              "Q = +25 nC  |  r = 0.30 m  |  q₀ = 2 nC  |  Find: (a) V at r  (b) W to bring q₀ from ∞",
              "Q = +25 nC  |  r = 0.30 m  |  q₀ = 2 nC  |  Nikalo: (a) V at r  (b) q₀ laane mein W"
            )}
          </T>
        </g>
      </Fade>

      {/* ── BEAT 2: Badge 1 — Part (a) Substitution ── */}
      <Badge n={1} cx={52} cy={195} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 1)}>
        <T x={74} y={200} size={14} fill={RED} weight={700} anchor="start">
          PART (a): SUBSTITUTE INTO V = kQ / r
        </T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 4}>
        <g transform="translate(60, 215)">
          <rect x={0} y={5} width={500} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={250} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            V = (9 × 10⁹)(25 × 10⁻⁹) / 0.30
          </T>
        </g>
      </Fade>

      {/* ── BEAT 3: Note — mechanical ── */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={60} y={295} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Completely mechanical substitution — no tricks, just plug & simplify!",
            "Bilkul mechanical substitution — koi trick nahi, bas plug & simplify!"
          )}
        </T>
      </Fade>

      {/* ── BEAT 4: Result V = 750 V ── */}
      <Fade on={beat >= 4} delay={dl(4, 0.5)}>
        <g transform="translate(60, 310)">
          <rect x={0} y={0} width={300} height={50} rx={10} fill={CREAM} stroke={RED} strokeWidth={2.5} />
          <T x={150} y={33} anchor="middle" size={24} fill={RED} weight={800}>
            V = 750 V  ✓
          </T>
        </g>
      </Fade>

      {/* ── BEAT 5: Part (a) clean answer note ── */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={380} y={340} size={13} fill={MUTED} anchor="start" script>
          {t("Clean answer: seven hundred fifty volts!", "Clean answer: saat sau pachaas volts!")}
        </T>
      </Fade>

      {/* ── BEAT 6: Badge 2 — Part (b) Work ── */}
      <Badge n={2} cx={52} cy={400} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 1)}>
        <T x={74} y={405} size={14} fill={RED} weight={700} anchor="start">
          PART (b): WORK = q₀ × V
        </T>
      </Fade>
      <Fade on={beat >= 6} dim={beat >= 8}>
        <g transform="translate(60, 420)">
          <rect x={0} y={5} width={500} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={250} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            W = (2 × 10⁻⁹)(750) = 1.5 × 10⁻⁶ J
          </T>
        </g>
      </Fade>

      {/* ── BEAT 7: Final result ── */}
      <Fade on={beat >= 7} delay={dl(7, 0.5)}>
        <g transform="translate(580, 420)">
          <rect x={0} y={5} width={300} height={50} rx={10} fill={CREAM} stroke={RED} strokeWidth={2.5} />
          <T x={150} y={38} anchor="middle" size={24} fill={RED} weight={800}>
            W = 1.5 μJ  ✓
          </T>
        </g>
      </Fade>

      {/* ── BEAT 8: Discipline Chip ── */}
      <Fade on={beat >= 8}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ DISCIPLINE: State givens → Write formula → Substitute → Simplify ✓",
            "★ DISCIPLINE: Givens likho → Formula likho → Substitute karo → Simplify karo ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
