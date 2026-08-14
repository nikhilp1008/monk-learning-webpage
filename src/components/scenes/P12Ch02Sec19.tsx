"use client";

/**
 * P12Ch02 · Section 19 — "Deriving the potential energy of a two-charge system"
 * Beats (en [0,5,16,29,42,49,65,75]): 8 beats
 * FIXED: removed inner label overlap in result box by combining into single text.
 */

import React from "react";
import {
  SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, ringD,
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

export default function P12Ch02Sec19({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("derivation: PE of two point charges", "derivation: do point charges ki PE")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 240 70 C 440 66, 640 74, 840 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Assembly setup */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={60} y={110} size={14} fill={MUTED} anchor="start" script>
          {t(
            "Start: empty stage, U = 0 when charges infinitely apart",
            "Start: khaali stage, U = 0 jab charges infinite door hain"
          )}
        </T>
      </Fade>

      {/* BEAT 2: Step 1 — bring q₁ */}
      <Badge n={1} cx={52} cy={155} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={74} y={160} size={14} fill={RED} weight={700} anchor="start">STEP 1: BRING q₁ TO POSITION</T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 4}>
        <g transform="translate(74, 175)">
          <rect x={0} y={5} width={500} height={45} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={250} y={34} anchor="middle" size={16} fill={INK} weight={800}>
            Stage empty → no force → W₁ = 0
          </T>
        </g>
      </Fade>

      {/* BEAT 3: V₁ at q₂'s location */}
      <Fade on={beat >= 3} delay={dl(3, 0.5)}>
        <g transform="translate(600, 155)">
          <rect x={0} y={5} width={400} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={200} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            V₁ = (1/4πε₀) · q₁ / r₁₂
          </T>
        </g>
      </Fade>

      {/* BEAT 4: Step 2 — bring q₂ */}
      <Badge n={2} cx={52} cy={260} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={74} y={265} size={14} fill={RED} weight={700} anchor="start">STEP 2: BRING q₂ INTO q₁'s FIELD</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 7}>
        <T x={74} y={290} size={13} fill={INK} anchor="start" script>
          {t(
            "q₂ moves into the potential V₁ already created by q₁",
            "q₂ us potential V₁ mein jaata hai jo q₁ ne already banaya hai"
          )}
        </T>
      </Fade>

      {/* BEAT 5: Final result — single box, no overlapping labels */}
      <Badge n={3} cx={52} cy={340} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={74} y={345} size={14} fill={RED} weight={700} anchor="start">TOTAL PE = W₁ + W₂ = 0 + q₂V₁</T>
      </Fade>
      <Fade on={beat >= 5}>
        <g transform="translate(60, 365)">
          <rect x={0} y={0} width={540} height={55} rx={10} fill={CREAM} stroke={RED} strokeWidth={2.5} />
          <T x={270} y={36} anchor="middle" size={24} fill={RED} weight={800}>
            U = (1/4πε₀) · q₁q₂ / r₁₂
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Explanation */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={60} y={445} size={13} fill={MUTED} anchor="start" script>
          {t(
            "W₂ = q₂V₁ by definition of potential. Total U = W₁ + W₂ = 0 + q₂V₁",
            "W₂ = q₂V₁ potential ki definition se. Total U = W₁ + W₂ = 0 + q₂V₁"
          )}
        </T>
      </Fade>

      {/* BEAT 7: Order independence */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Bring q₂ first instead → SAME answer! Order never matters (conservative force) ✓",
            "★ q₂ pehle laao → SAME answer! Order matter nahi karta (conservative force) ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
