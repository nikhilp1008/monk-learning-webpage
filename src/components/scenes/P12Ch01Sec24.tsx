"use client";

/**
 * P12Ch01 · Section 24 — "How Does One Charge Know the Other Is There?"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md & SCENE_PLAYBOOK.md.
 *
 * OBJECT-RICH OPEN CHALKBOARD DESIGN (NO HEAVY CONTAINERS):
 *  - Concept of Field vs Action at a Distance
 *  - 2-Step Interaction Model:
 *      Step 1: Source charge Q modifies space around it creating an Electric Field E.
 *      Step 2: Field E exerts electrostatic force F = q₀ E on test charge q₀.
 *  - Drawn source charge Q with outward radiating field vectors & test charge q₀
 *
 * Beats (en [0, 6, 18, 30, 40, 56, 68, 82]):
 *  0 Title "how does one charge know the other is there?" + drawn underline
 *  1 Hook note: resolving Faraday's puzzle of action at a distance through the Electric Field!
 *  2 Drawn Source Charge Q with radial electric field line vectors
 *  3 Badge 1 & Step 1: Source charge Q creates Electric Field E everywhere in space
 *  4 Test charge q₀ placed at position r in field E
 *  5 Badge 2 & Step 2: Field E acts locally on test charge q₀ (F = q₀ E)
 *  6 Speed of propagation: field changes propagate at speed of light c (3 × 10⁸ m/s)!
 *  7 Energy & Momentum storage: electric field carries real physical energy!
 *  8 Grand Verdict: Source Q creates Field E ⇒ Field E exerts local Force F = q₀ E!
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
  arrowD,
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

export default function P12Ch01Sec24({ currentTime, reveals, language }: SceneProps) {
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
            "how does one charge know the other is there?",
            "ek charge ko doosre ka pata kaise chalta hai?"
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

      {/* ── BEAT 1: Hook Note ── */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={60} y={110} size={15} fill={MUTED} script anchor="start">
          {t(
            "resolving Faraday's puzzle of action at a distance through the Electric Field!",
            "Faraday ke action at a distance puzzle ko Electric Field se solve karna!"
          )}
        </T>
      </Fade>

      {/* ── BEAT 2 & 3: Badge 1 & Step 1 (Field Creation by Q) ── */}
      <Badge n={1} cx={52} cy={165} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 1)}>
        <T x={74} y={170} size={14} fill={RED} weight={700} anchor="start">
          {t("STEP 1: Source Charge Q Creates Field E", "STEP 1: Source Charge Q Creates Field E")}
        </T>
      </Fade>

      <Fade on={beat >= 2} dim={beat >= 6}>
        <g transform="translate(60, 185)">
          {/* Source Charge +Q */}
          <circle cx={140} cy={60} r={22} fill="#ffe4e6" stroke={RED} strokeWidth={2} />
          <T x={140} y={67} anchor="middle" size={14} fill={RED} weight={800}>+Q</T>

          {/* Radiating Field Line Arrows */}
          <Draw on={beat >= 2} delay={dl(2, 0.5)} d={arrowD(165, 60, 230, 60)} stroke="#0284c7" sw={2} />
          <Draw on={beat >= 2} delay={dl(2, 0.5)} d={arrowD(140, 35, 140, -15)} stroke="#0284c7" sw={2} />
          <Draw on={beat >= 2} delay={dl(2, 0.5)} d={arrowD(140, 85, 140, 135)} stroke="#0284c7" sw={2} />
          <Draw on={beat >= 2} delay={dl(2, 0.5)} d={arrowD(115, 60, 50, 60)} stroke="#0284c7" sw={2} />

          <T x={215} y={45} anchor="start" size={12} fill="#0284c7" weight={700}>Electric Field E</T>
        </g>
      </Fade>

      {/* ── BEAT 4 & 5: Badge 2 & Step 2 (Field Acts Locally on q₀) ── */}
      <Badge n={2} cx={540} cy={165} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 1)}>
        <T x={562} y={170} size={14} fill={RED} weight={700} anchor="start">
          {t("STEP 2: Field E Exerts Force F = q₀ E", "STEP 2: Field E Exerts Force F = q₀ E")}
        </T>
      </Fade>

      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(540, 185)">
          <rect x={0} y={10} width={450} height={85} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={225} y={48} anchor="middle" size={24} fill={INK} weight={800}>
            F = q₀ · E
          </T>
          <T x={225} y={78} anchor="middle" size={13} fill={AMBER_DARK} script>
            {t("Local interaction at position of test charge q₀", "Test charge q₀ ki position par local interaction")}
          </T>
          <Draw on={beat >= 5} delay={dl(5, 1.6)} d="M 120 56 h 210 M 120 60 h 210" stroke={AMBER_DARK} sw={1.5} />
        </g>
      </Fade>

      {/* ── BEAT 6: Speed of Light Propagation ── */}
      <Fade on={beat >= 6} dim={beat >= 8}>
        <g transform="translate(60, 330)">
          <T x={0} y={20} anchor="start" size={13.5} weight={700} fill={GREEN}>
            {t("Field Propagation Speed:", "Field Propagation Speed:")}
          </T>
          <T x={0} y={50} anchor="start" size={18} fill={GREEN} weight={800}>
            Field changes travel at c = 3 × 10⁸ m/s (speed of light!)
          </T>
        </g>
      </Fade>

      {/* ── BEAT 8: Grand Verdict Chip ── */}
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
            "★ VERDICT: Source Q creates Field E ⇒ Field E exerts local Force F = q₀ E!",
            "★ VERDICT: Source Q creates Field E ⇒ Field E exerts local Force F = q₀ E!"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
