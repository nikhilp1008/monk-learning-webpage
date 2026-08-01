"use client";

/**
 * P12Ch02 · Section 29 — "The battery fork — is the battery still connected?"
 * Subtopic: Capacitance, Dielectrics & Stored Energy
 * OPEN CHALKBOARD DESIGN WITH BATTERY FORK DECISION MATRIX (NO CONTAINER BOXES):
 *  - Branch 1: Battery CONNECTED -> Voltage V = V₀ Constant!
 *      C -> K C₀ (↑), Q -> K Q₀ (↑), E -> E₀ (=), U -> K U₀ (↑)
 *  - Branch 2: Battery DISCONNECTED -> Charge Q = Q₀ Constant!
 *      C -> K C₀ (↑), V -> V₀/K (↓), E -> E₀/K (↓), U -> U₀/K (↓)
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

export default function P12Ch02Sec29({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* Title */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={48} size={25} fill={RED} script>
          {t("The Battery Fork: Battery Connected (V Constant) vs Disconnected (Q Constant)", "The Battery Fork: Battery Connected (V Constant) vs Disconnected (Q Constant)")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 60 C 420 56, 660 64, 960 59" stroke={RED} sw={2.4} dur={0.7} />

      {/* LEFT SECTION: BRANCH 1 — BATTERY STILL CONNECTED */}
      <g transform="translate(40, 75)">
        <Badge n={1} cx={20} cy={18} on={beat >= 1} delay={dl(1, 0.2)} />
        <Fade on={beat >= 1} delay={dl(1, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("BRANCH A: BATTERY CONNECTED (V = V₀)", "BRANCH A: BATTERY CONNECTED (V = V₀)")}
          </T>
        </Fade>

        {/* Floating Matrix Features */}
        <Fade on={beat >= 1}>
          <T x={45} y={75} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            • Voltage: V = V₀  (Constant, fixed by battery!)
          </T>

          <T x={45} y={115} size={14} fill={GREEN} weight={800} anchor="start">
            • Capacitance: C = K C₀  (Increases by K)
          </T>

          <T x={45} y={155} size={14} fill={GREEN} weight={800} anchor="start">
            • Charge: Q = K Q₀  (Increases — Battery pumps charge!)
          </T>

          <T x={45} y={195} size={14} fill={INK} weight={800} anchor="start">
            • Field: E = E₀  (Constant)
          </T>

          <T x={45} y={235} size={14} fill={GREEN} weight={800} anchor="start">
            • Stored Energy: U = ½ C V² = K U₀  (Increases!)
          </T>
        </Fade>
      </g>

      {/* RIGHT SECTION: BRANCH 2 — BATTERY DISCONNECTED */}
      <g transform="translate(540, 75)">
        <Badge n={2} cx={20} cy={18} on={beat >= 2} delay={dl(2, 0.2)} />
        <Fade on={beat >= 2} delay={dl(2, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("BRANCH B: BATTERY DISCONNECTED (Q = Q₀)", "BRANCH B: BATTERY DISCONNECTED (Q = Q₀)")}
          </T>
        </Fade>

        {/* Floating Matrix Features */}
        <Fade on={beat >= 2}>
          <T x={45} y={75} size={14} fill={AMBER_DARK} weight={800} anchor="start">
            • Charge: Q = Q₀  (Constant — Charge is trapped!)
          </T>

          <T x={45} y={115} size={14} fill={GREEN} weight={800} anchor="start">
            • Capacitance: C = K C₀  (Increases by K)
          </T>

          <T x={45} y={155} size={14} fill={RED} weight={800} anchor="start">
            • Voltage: V = V₀ / K  (Decreases by 1/K)
          </T>

          <T x={45} y={195} size={14} fill={RED} weight={800} anchor="start">
            • Field: E = E₀ / K  (Decreases by 1/K)
          </T>

          <T x={45} y={235} size={14} fill={RED} weight={800} anchor="start">
            • Stored Energy: U = Q² / (2C) = U₀ / K  (Decreases!)
          </T>
        </Fade>
      </g>

      {/* MIDDLE BRIDGE FORK */}
      <g transform="translate(40, 325)">
        <Fade on={beat >= 4}>
          <line x1="20" y1="10" x2="980" y2="10" stroke={INK} strokeWidth={1.8} />
          <T x={500} y={38} anchor="middle" size={17} fill={RED} weight={800}>
            THE #1 EXAM FORK RULE: Identify battery state BEFORE choosing formula!
          </T>
        </Fade>
      </g>

      {/* LOWER SECTION: OPEN SPACIOUS SUMMARY */}
      <g transform="translate(40, 415)">
        <Badge n={3} cx={20} cy={18} on={beat >= 7} delay={dl(7, 0.2)} />
        <Fade on={beat >= 7} delay={dl(7, 0.5)}>
          <T x={45} y={23} size={15} fill={RED} weight={800} anchor="start">
            {t("FORMULA SELECTION GUIDE", "FORMULA SELECTION GUIDE")}
          </T>
        </Fade>

        <Fade on={beat >= 7}>
          <T x={45} y={50} size={14} anchor="start" fill={GREEN} weight={800}>
            Battery Connected → Use U = ½ C V² (since V is constant)!
          </T>
          <T x={45} y={72} size={13} anchor="start" fill={INK} weight={700}>
            Battery Disconnected → Use U = Q² / (2C) (since Q is constant)!
          </T>
        </Fade>
      </g>

      {/* Footer Summary Chip (Floating without card boxes) */}
      <Fade on={beat >= 7}>
        <Chip x={40} y={545} w={1000} h={46} fill={GREEN} textFill="#ffffff" size={14}>
          {t(
            "★ Battery Fork Mastered: Connected -> V constant & U increases; Disconnected -> Q constant & U decreases! ✓",
            "★ Battery Fork Mastered: Connected -> V constant & U increases; Disconnected -> Q constant & U decreases! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
