"use client";

/**
 * P12Ch02 · Section 32 — "Deriving the parallel plate capacitance formula"
 * Subtopic: Capacitance Derivations
 * OPEN CHALKBOARD DESIGN WITH GAUSSIAN PILLBOX DERIVATION (NO CONTAINER BOXES):
 *  - Parallel plates of area A and separation d
 *  - Surface charge density σ = Q / A
 *  - Electric field via Gauss Law: E = σ / ε₀ = Q / (ε₀ A)
 *  - Potential difference V = E d = Q d / (ε₀ A)
 *  - Result: C = Q / V = ε₀ A / d
 */

import React from "react";
import {
  SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, arrowD,
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

export default function P12Ch02Sec32({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Derivation: Parallel Plate Capacitance C = ε₀ A / d via Gauss's Law", "Derivation: Parallel Plate Capacitance C = ε₀ A / d via Gauss's Law")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: GAUSSIAN PILLBOX DIAGRAM */}
      <g transform="translate(40, 85)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("PARALLEL PLATES AND GAUSSIAN SURFACE", "PARALLEL PLATES AND GAUSSIAN SURFACE")}
          </T>
        </Fade>

        {/* Plate Diagram */}
        <Fade on={beat >= 1}>
          {/* Top Plate +Q */}
          <line x1="60" y1="90" x2="420" y2="90" stroke={RED} strokeWidth={4} />
          <T x={435} y={95} size={14} fill={RED} weight={900}>+Q (σ = Q/A)</T>

          {/* Bottom Plate -Q */}
          <line x1="60" y1="250" x2="420" y2="250" stroke={GREEN} strokeWidth={4} />
          <T x={435} y={255} size={14} fill={GREEN} weight={900}>−Q (σ = −Q/A)</T>

          {/* Gaussian Pillbox */}
          <rect x="180" y="70" width="80" height="120" stroke={AMBER_DARK} strokeWidth={2} strokeDasharray="4 4" fill="none" />
          <T x={220} y={60} size={12} fill={AMBER_DARK} weight={800} anchor="middle">Pillbox</T>

          {/* Field Vector E */}
          <path d={arrowD(220, 95, 220, 245)} stroke={AMBER_DARK} strokeWidth={3} />
          <T x={235} y={170} size={15} fill={AMBER_DARK} weight={900}>E</T>

          <line x1="45" y1="90" x2="45" y2="250" stroke={INK} strokeWidth={2} strokeDasharray="3 3" />
          <T x={30} y={175} size={13} fill={INK} weight={800} anchor="end">Spacing d</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={240} y={350} anchor="middle" size={17} fill={INK} weight={800}>
            Gauss Law: ∮ E · dA = Q_enclosed / ε₀  ⇒  E A_box = σ A_box / ε₀
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: CALCULUS PROOF STEPS */}
      <g transform="translate(540, 85)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("STEP-BY-STEP PROOF", "STEP-BY-STEP PROOF")}
          </T>
        </Fade>

        {/* Floating Derivation Steps (No Card Boxes) */}
        <Fade on={beat >= 4}>
          <T x={50} y={85} size={16} fill={INK} weight={800} anchor="start">
            1. Surface Charge Density: σ = Q / A
          </T>

          <T x={50} y={145} size={16} fill={AMBER_DARK} weight={800} anchor="start">
            2. Electric Field: E = σ / ε₀ = Q / (ε₀ A)
          </T>

          <T x={50} y={205} size={16} fill={GREEN} weight={800} anchor="start">
            3. Potential Difference: V = E d = Q d / (ε₀ A)
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 50 235 L 450 235" stroke={INK} sw={2} />

          <T x={50} y={285} size={20} fill={RED} weight={900} anchor="start">
            4. Capacitance C = Q / V = ε₀ A / d  (Q.E.D.)
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={360} anchor="middle" size={15} fill={GREEN} weight={800}>
            Fringe field effects at edges are ignored assuming plate dimensions &gt;&gt; spacing d!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 440)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("DERIVATION VERDICT", "DERIVATION VERDICT")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={52} size={14} anchor="start" fill={GREEN} weight={800}>
            C = ε₀ A / d proves capacitance is 100% determined by geometrical area A and gap d!
          </T>
          <T x={45} y={76} size={13} anchor="start" fill={INK} weight={700}>
            Independent of charge Q and potential V!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Proof Completed: C = Q/V = ε₀ A / d derived rigorously from Gauss's Law and V = E d! ✓",
            "★ Proof Completed: C = Q/V = ε₀ A / d derived rigorously from Gauss's Law and V = E d! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
