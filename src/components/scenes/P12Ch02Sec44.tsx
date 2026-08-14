"use client";

/**
 * P12Ch02 · Section 44 — "Derivation: field inside is zero, charge lies on the surface"
 * Beats (en [0,5,13,23,33,40,51,64]): 8 beats
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

export default function P12Ch02Sec44({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("derivation: field inside is zero, charge on surface", "derivation: field inside zero hoti hai, charge surface pe")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 180 70 C 440 66, 640 74, 900 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Step 1 text */}
      <Badge n={1} cx={52} cy={110} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 1)}>
        <T x={74} y={115} size={14} fill={RED} weight={700} anchor="start">STEP 1: PROVE FIELD IS ZERO</T>
      </Fade>
      <Fade on={beat >= 1}>
        <T x={74} y={145} size={14} fill={INK} anchor="start" script>
          {t(
            "Suppose (for contradiction) a non-zero field E existed inside a conductor.",
            "Maan lo (contradiction ke liye) ki conductor ke andar E zero nahi hai."
          )}
        </T>
      </Fade>

      {/* BEAT 2: Force on electrons */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={74} y={185} size={14} fill={MUTED} anchor="start" script>
          {t(
            "Free electrons would feel force F = qE and accelerate → current would flow! NOT equilibrium.",
            "Free electrons pe force F = qE lagta aur wo chalte → current bahta! Ye equilibrium nahi hai."
          )}
        </T>
      </Fade>

      {/* BEAT 3: Conclusion 1 */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <g transform="translate(74, 215)">
          <rect x={0} y={5} width={400} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={200} y={38} anchor="middle" size={20} fill={INK} weight={800}>
            E_inside = 0 (in equilibrium)
          </T>
        </g>
      </Fade>

      {/* BEAT 4: Step 2 text */}
      <Badge n={2} cx={52} cy={310} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 1)}>
        <T x={74} y={315} size={14} fill={RED} weight={700} anchor="start">STEP 2: PROVE CHARGE IS ON SURFACE</T>
      </Fade>
      <Fade on={beat >= 4}>
        <T x={74} y={345} size={14} fill={INK} anchor="start" script>
          {t(
            "Draw a Gaussian surface ENTIRELY inside the conductor, just beneath the skin.",
            "Ek Gaussian surface draw karo jo conductor ke PURI TARAH andar ho, skin ke theek neeche."
          )}
        </T>
      </Fade>

      {/* BEAT 5: Gauss law application */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <g transform="translate(74, 375)">
          <rect x={0} y={5} width={600} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={300} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            ∮ E·dA = q_enc / ε₀ = 0   (since E = 0)
          </T>
        </g>
      </Fade>

      {/* BEAT 6: q_enc = 0 meaning */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={74} y={460} size={14} fill={MUTED} anchor="start" script>
          {t(
            "So q_enclosed = 0. We can shrink this surface everywhere → NO charge anywhere inside!",
            "Matlab q_enclosed = 0. Hum is surface ko kahin bhi shrink kar sakte hain → ANDAR KOI charge nahi!"
          )}
        </T>
      </Fade>

      {/* BEAT 7: Conclusion 2 */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ All charge MUST reside on the surface — the only place Gauss's law leaves available! ✓",
            "★ Saara charge SURFACE pe hi hona chahiye — Gauss's law bas yahi jagah chhodta hai! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
