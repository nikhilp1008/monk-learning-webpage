"use client";

/**
 * P12Ch02 · Section 6 — "Deriving V equals kQ over r for a point charge"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md & SCENE_PLAYBOOK.md.
 *
 * OBJECT-RICH OPEN CHALKBOARD DESIGN (NO HEAVY CONTAINERS):
 *  - Derivation of V(r) = k Q / r from first principles:
 *    1. Work done to bring test charge q₀ from ∞ to distance r against radial electric field E = k Q / x²:
 *    2. W_ext = - ∫_∞ʳ F_elec dx = - ∫_∞ʳ (k Q q₀ / x²) dx
 *    3. Integration: W_ext = - k Q q₀ [ - 1 / x ]_∞ʳ = k Q q₀ / r
 *    4. Potential V(r) = W_ext / q₀ = k Q / r !
 *
 * Beats (en [0,6,21,31,44,56,68,80,89]):
 *  0 Title "derivation: potential V = k Q / r for a point charge" + drawn underline
 *  1 Hook note: integrating electrostatic force work from infinity to point P!
 *  2 Badge 1 & Integration Setup: W_ext = - ∫_∞ʳ (k Q q₀ / x²) dx
 *  3 Badge 2 & Integral Evaluation: [ -1/x ]_∞ʳ = (1/r - 0) = 1/r
 *  4 Badge 3 & Final Potential Result: V(r) = W_ext / q₀ = k Q / r
 *  5 Distance graph: V decays as 1/r (vs E decaying as 1/r²)!
 *  6 Grand Verdict: V(r) = ∫ E dx = k Q / r  (Point charge potential derivation complete)!
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

export default function P12Ch02Sec6({ currentTime, reveals, language }: SceneProps) {
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
            "derivation: potential V = k Q / r for a point charge",
            "derivation: point charge ka potential V = k Q / r"
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
            "integrating electrostatic force work from infinity to point P!",
            "infinity se point P tak electrostatic force work integrate karna!"
          )}
        </T>
      </Fade>

      {/* ── BEAT 2: Badge 1 & Integration Setup ── */}
      <Badge n={1} cx={52} cy={165} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 1)}>
        <T x={74} y={170} size={14} fill={RED} weight={700} anchor="start">
          {t("WORK INTEGRAL SETUP FROM INFINITY", "WORK INTEGRAL SETUP FROM INFINITY")}
        </T>
      </Fade>

      <Fade on={beat >= 2} dim={beat >= 5}>
        <g transform="translate(60, 185)">
          <rect x={0} y={10} width={430} height={85} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={215} y={48} anchor="middle" size={20} fill={INK} weight={800}>
            W_ext = - ∫_∞ʳ (k Q q₀ / x²) dx
          </T>
          <T x={215} y={78} anchor="middle" size={13} fill={AMBER_DARK} script>
            {t("External force balances electrostatic repulsion!", "External force electrostatic repulsion ko balance karti hai!")}
          </T>
          <Draw on={beat >= 2} delay={dl(2, 1.6)} d="M 100 56 h 230 M 100 60 h 230" stroke={AMBER_DARK} sw={1.5} />
        </g>
      </Fade>

      {/* ── BEAT 4: Badge 3 & Final Potential Result ── */}
      <Badge n={3} cx={540} cy={165} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 1)}>
        <T x={562} y={170} size={14} fill={RED} weight={700} anchor="start">
          {t("FINAL POTENTIAL RESULT V = k Q / r", "FINAL POTENTIAL RESULT V = k Q / r")}
        </T>
      </Fade>

      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(540, 185)">
          <T x={0} y={25} anchor="start" size={14} fill={INK} weight={700}>
            Divide work by test charge q₀:
          </T>
          <T x={0} y={65} anchor="start" size={24} fill={RED} weight={800}>
            V(r) = k Q / r  (Inverse r dependency!)
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
            "★ VERDICT: V(r) = ∫ E dx = k Q / r  (Point charge potential derivation complete)!",
            "★ VERDICT: V(r) = ∫ E dx = k Q / r  (Point charge potential derivation complete)!"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
