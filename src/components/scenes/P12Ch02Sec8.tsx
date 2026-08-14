"use client";

/**
 * P12Ch02 · Section 8 — "Deriving the potential of a short dipole"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md & SCENE_PLAYBOOK.md.
 *
 * OBJECT-RICH OPEN CHALKBOARD DESIGN (NO HEAVY CONTAINERS):
 *  - Short dipole: charges ±q separated by 2a, dipole moment p = q(2a)
 *  - Point P at (r, θ) from dipole center O  (far field: r >> a)
 *  - V = (q/4πε₀)(1/r₁ − 1/r₂)
 *  - Geometric approximation: r₁ ≈ r − a cos θ,  r₂ ≈ r + a cos θ
 *  - Simplify: V = (1/4πε₀)(p cos θ / r²)  (falls off as 1/r²!)
 *
 * Beats (en [0,4,16,27,46,56,69,79,93]):
 *  0 Title "derivation: potential of a short dipole" + underline
 *  1 Diagram: short dipole with point P at (r, θ)
 *  2 Far field setup: r >> a, superposition of two point potentials
 *  3 Formula: V = (q/4πε₀)(1/r₁ − 1/r₂)
 *  4 Geometric trick: perpendicular from charges onto line OP
 *  5 Approximations: r₁ ≈ r − a cos θ,  r₂ ≈ r + a cos θ
 *  6 Justification: a << r so linear approximation is valid
 *  7 Final: V = (1/4πε₀)(p cos θ / r²)
 *  8 Takeaway: dipole potential falls off as 1/r² (faster than point charge 1/r!)
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

export default function P12Ch02Sec8({ currentTime, reveals, language }: SceneProps) {
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
            "derivation: potential of a short dipole",
            "derivation: short dipole ka potential"
          )}
        </T>
      </Fade>
      <Draw
        on={beat >= 0}
        delay={dl(0, 2.5)}
        d="M 220 70 C 400 66, 640 74, 860 69"
        stroke={RED}
        sw={2.4}
        dur={0.7}
      />

      {/* ── BEAT 1: Diagram — Dipole with point P ── */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        {/* Dipole axis vertical */}
        <Draw on={beat >= 1} delay={dl(1, 0.3)} d="M 200 320 v -180" stroke={INK} sw={1.5} dur={0.5} />
        {/* −q charge bottom */}
        <circle cx={200} cy={320} r={10} fill="#3b82f6" stroke={INK} strokeWidth={1.5} />
        <T x={200} y={324} size={12} fill="#fff" weight={800}>−</T>
        <T x={175} y={345} size={12} fill={INK} script>−q</T>
        {/* +q charge top */}
        <circle cx={200} cy={140} r={10} fill={RED} stroke={INK} strokeWidth={1.5} />
        <T x={200} y={144} size={12} fill="#fff" weight={800}>+</T>
        <T x={175} y={130} size={12} fill={INK} script>+q</T>
        {/* Center O */}
        <circle cx={200} cy={230} r={3} fill={INK} />
        <T x={186} y={246} size={12} fill={INK} weight={700}>O</T>
        {/* 2a label */}
        <T x={160} y={230} size={12} fill={AMBER_DARK} script>2a</T>
        {/* Point P */}
        <circle cx={420} cy={150} r={4} fill={RED} />
        <T x={430} y={147} size={14} fill={RED} weight={700} anchor="start">P(r, θ)</T>
        {/* r line from O to P */}
        <Draw on={beat >= 1} delay={dl(1, 0.8)} d="M 200 230 L 420 150" stroke={MUTED} sw={1.5} dur={0.5} />
        <T x={305} y={178} size={13} fill={INK} weight={700}>r</T>
        {/* θ arc */}
        <Draw on={beat >= 1} delay={dl(1, 1.2)} d="M 200 195 A 35 35 0 0 1 220 192" stroke={AMBER_DARK} sw={1.5} dur={0.3} />
        <T x={218} y={200} size={12} fill={AMBER_DARK} weight={700}>θ</T>
      </Fade>

      {/* ── BEAT 2: Far field setup text ── */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={490} y={110} size={14} fill={INK} anchor="start" script>
          {t(
            "Far field: r >> a, use superposition of two point potentials",
            "Far field: r >> a, do point potentials ka superposition"
          )}
        </T>
      </Fade>

      {/* ── BEAT 3: Badge 1 — Superposition Formula ── */}
      <Badge n={1} cx={490} cy={160} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 1)}>
        <T x={512} y={165} size={14} fill={RED} weight={700} anchor="start">
          SUPERPOSITION OF POINT POTENTIALS
        </T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 7}>
        <g transform="translate(490, 178)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={38} anchor="middle" size={20} fill={INK} weight={800}>
            V = (q / 4πε₀) · (1/r₁ − 1/r₂)
          </T>
        </g>
      </Fade>

      {/* ── BEAT 4: Geometric trick text ── */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={490} y={260} size={14} fill={MUTED} anchor="start" script>
          {t(
            "Drop perpendicular from each charge onto line OP →",
            "Har charge se line OP pe perpendicular giraao →"
          )}
        </T>
      </Fade>

      {/* ── BEAT 5: Badge 2 — Approximations ── */}
      <Badge n={2} cx={490} cy={300} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 1)}>
        <T x={512} y={305} size={14} fill={RED} weight={700} anchor="start">
          GEOMETRIC APPROXIMATION (r &gt;&gt; a)
        </T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(490, 318)">
          <rect x={0} y={5} width={500} height={55} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={250} y={25} anchor="middle" size={17} fill={INK} weight={800}>
            r₁ ≈ r − a cos θ
          </T>
          <T x={250} y={50} anchor="middle" size={17} fill={INK} weight={800}>
            r₂ ≈ r + a cos θ
          </T>
        </g>
      </Fade>

      {/* ── BEAT 6: Justification text ── */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={490} y={405} size={13} fill={MUTED} anchor="start" script>
          {t(
            "a << r → linear approximation perfectly valid, higher orders negligible!",
            "a << r → linear approximation bilkul valid hai, higher orders negligible!"
          )}
        </T>
      </Fade>

      {/* ── BEAT 7: Badge 3 — Final Result ── */}
      <Badge n={3} cx={65} cy={440} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <g transform="translate(85, 424)">
          <rect x={0} y={0} width={520} height={60} rx={10} fill={CREAM} stroke={RED} strokeWidth={2.5} />
          <T x={260} y={40} anchor="middle" size={24} fill={RED} weight={800}>
            V = (1/4πε₀) · p cos θ / r²
          </T>
        </g>
      </Fade>

      {/* ── BEAT 8: Takeaway Chip ── */}
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
            "★ TAKEAWAY: Dipole V ∝ 1/r² (faster decay than point charge 1/r!) ✓",
            "★ TAKEAWAY: Dipole V ∝ 1/r² (point charge 1/r se faster decay!) ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
