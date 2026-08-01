"use client";

/**
 * P12Ch02 · Section 33 — "Deriving the energy stored in a capacitor"
 * Subtopic: Capacitance Derivations
 * OPEN CHALKBOARD DESIGN WITH INTEGRAL CHARGING WORK PROOF (NO CONTAINER BOXES):
 *  - Charging process: Transferring charge dq from one plate to another at instant potential v = q / C
 *  - Differential work: dW = v dq = (q / C) dq
 *  - Calculus integration: U = ∫₀^Q (q / C) dq = Q² / (2C) = ½ C V²
 *  - Zero card box containers
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

export default function P12Ch02Sec33({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  // Charge transfer animation
  const chargePos = Math.min(1, currentTime * 0.32);
  const dqY = 240 - chargePos * 140;

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("Derivation: Capacitor Stored Energy U = ½CV² = Q²/(2C) via Integral Work", "Derivation: Capacitor Stored Energy U = ½CV² = Q²/(2C) via Integral Work")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: CHARGE TRANSFER SCHEMATIC */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={25} cy={25} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("TRANSFERRING dq AT INSTANT POTENTIAL v = q/C", "TRANSFERRING dq AT INSTANT POTENTIAL v = q/C")}
          </T>
        </Fade>

        {/* Plates and charge transfer */}
        <Fade on={beat >= 1}>
          {/* Top Plate +q */}
          <line x1="60" y1="90" x2="420" y2="90" stroke={RED} strokeWidth={4} />
          <T x={435} y={95} size={14} fill={RED} weight={900}>+q Instant</T>

          {/* Bottom Plate -q */}
          <line x1="60" y1="250" x2="420" y2="250" stroke={GREEN} strokeWidth={4} />
          <T x={435} y={255} size={14} fill={GREEN} weight={900}>−q Instant</T>

          {/* Transferring dq charge element */}
          <circle cx={240} cy={dqY} r={9} fill={AMBER_DARK} />
          <T x={240} y={dqY - 12} size={11} fill={AMBER_DARK} weight={900}>+dq</T>

          {/* Transfer Arrow */}
          <path d={arrowD(240, 240, 240, 100)} stroke={AMBER_DARK} strokeWidth={2} strokeDasharray="4 4" />
          <T x={255} y={170} size={13} fill={AMBER_DARK} weight={800}>Work dW = v dq</T>
        </Fade>

        {/* Free Floating Formula (Spacious, No Box) */}
        <Fade on={beat >= 3}>
          <T x={240} y={305} anchor="middle" size={17} fill={INK} weight={800}>
            Instant Potential: v(q) = q / C  (Increases linearly with charge!)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: CALCULUS PROOF STEPS */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={25} cy={25} on={beat >= 4} delay={dl(4, 0.2)} />
        <Fade on={beat >= 4} delay={dl(4, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("STEP-BY-STEP INTEGRAL DERIVATION", "STEP-BY-STEP INTEGRAL DERIVATION")}
          </T>
        </Fade>

        {/* Floating Calculus Equations (No Card Boxes) */}
        <Fade on={beat >= 4}>
          <T x={50} y={85} size={16} fill={INK} weight={800} anchor="start">
            1. dW = v dq = (q / C) dq
          </T>

          <T x={50} y={145} size={16} fill={AMBER_DARK} weight={800} anchor="start">
            2. U = ∫₀^Q (q / C) dq = (1 / C) [ q² / 2 ]₀^Q
          </T>

          <T x={50} y={205} size={16} fill={GREEN} weight={800} anchor="start">
            3. U = Q² / (2C)
          </T>

          <Draw on={beat >= 4} delay={dl(4, 1.2)} d="M 50 235 L 450 235" stroke={INK} sw={2} />

          <T x={50} y={285} size={20} fill={RED} weight={900} anchor="start">
            4. Substitute Q = C V  ⇒  U = ½ C V² = ½ Q V
          </T>
        </Fade>

        {/* Open Text Explanation */}
        <Fade on={beat >= 6}>
          <T x={250} y={305} anchor="middle" size={15} fill={GREEN} weight={800}>
            Matches area under linear v-q graph (triangle area = ½ Base × Height)!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 420)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("BATTERY ENERGY LOSS RECAP", "BATTERY ENERGY LOSS RECAP")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={52} size={14} anchor="start" fill={GREEN} weight={800}>
            Battery supplies energy W_battery = Q V = C V², BUT capacitor only stores U = ½ C V²!
          </T>
          <T x={45} y={76} size={13} anchor="start" fill={INK} weight={700}>
            Exactly 50% of total energy supplied by battery is dissipated as heat in connecting wires!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Proof Completed: U = ∫ (q/C)dq = Q²/(2C) = ½CV² (50% battery energy stored, 50% lost to heat)! ✓",
            "★ Proof Completed: U = ∫ (q/C)dq = Q²/(2C) = ½CV² (50% battery energy stored, 50% lost to heat)! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
