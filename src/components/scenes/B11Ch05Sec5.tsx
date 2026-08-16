"use client";

/**
 * B11 Ch05 · Section 5 — "Where morphology stops and anatomy begins"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 8.79, 18.26, 32.6, 47.7, 60.33, 72.7, 87.3]
 *        hi [0, 8.96, 18.52, 33.11, 47.1, 58.28, 72.87, 84.82]):
 *  0 title + hook: three limits, miss these and lose marks [dim@1]
 *  1 DIAGRAM: eye icon + "MORPHOLOGY = form + arrangement you can SEE"
 *  2 LIMIT 1 heading + crossed-out anatomy terms (not this subtopic)
 *  3 trigger-word chip: see these words → wrong chapter
 *  4 LIMIT 2 heading + red X: "underground = root" is WRONG
 *  5 counter-example chips: ginger/turmeric/potato → underground STEMS
 *  6 LIMIT 3 heading + exception line + a tiny root-from-node squiggle
 *  7 verdict: always reason from defining features, never from where it sits
 *
 * Layout plan (Kalam bl−1.3s..+0.5s · Anek bl−0.78s..+0.31s). Single left
 * column x=100, notebook-style accumulating rules; verdict band centered.
 *  b0 | title (script24 red)          | T mid  | x?..? y30..76 (bl63)
 *  b0 | underline                     | Draw   | y77 x330..750
 *  b0 | hook (script14 muted)         | T mid  | x?..? y88..110 (bl102) [dim@1]
 *  b1 | eye icon                      | Draw   | x100..180 y148..172
 *  b1 | "MORPHOLOGY = …SEE" (15 ink)  | T st   | x210..~640 y159..172 (bl165)
 *  b2 | "LIMIT 1 — not anatomy" (red) | T st   | x100..~430 y203..218 (bl210)
 *  b2 | crossed anatomy-terms chip    | Chip   | x100..520 y222..250
 *  b2 | cross-out over chip           | Draw   | x100..520 y222..250
 *  b3 | "trigger words →…" (13 ink)   | T st   | x100..~330 y263..277 (bl270)
 *  b3 | trigger-word chip (red)       | Chip   | x100..520 y283..309
 *  b4 | "LIMIT 2 — …WRONG" (red)      | T st   | x100..~460 y339..354 (bl346)
 *  b4 | red X icon                    | Draw   | x470..494 y334..352
 *  b5 | 3 chips: ginger/turmeric/potato| Chip  | x100/230/360 y373..399
 *  b5 | label "→ underground STEMS…"  | T st   | x100..~560 y402..416 (bl413)
 *  b6 | "LIMIT 3 — typical-case" (red)| T st   | x100..~480 y439..454 (bl446)
 *  b6 | exception line (12 ink)       | T st   | x100..~560 y466..480 (bl473)
 *  b6 | root-from-node squiggle       | Draw   | x650..690 y458..480
 *  b7 | verdict chip (16 ink/cream)   | Chip   | x170..910 y523..563
 *  b7 | stamp underline               | Draw   | y580 x170..910
 * (b3→b4 gap widened to 24px+ after a visual spot-check caught the trigger-
 *  word chip's border crowding the LIMIT 2 heading — geometry passed the
 *  assertions but read cramped by eye.)
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
  crossD,
  INK,
  MUTED,
  AMBER_DARK,
  RED,
  CREAM,
} from "./kit";

export default function B11Ch05Sec5({ currentTime, reveals, language }: SceneProps) {
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
      {/* title — always on */}
      <Fade on={true}>
        <T x={540} y={63} size={24} fill={RED} script>
          {t("where morphology stops, anatomy begins", "morphology kahan rukti, anatomy shuru hoti")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 0.3)} d="M 330 77 C 420 74, 660 74, 750 77" stroke={RED} sw={2.2} dur={0.6} />
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 1.4)}>
        <T x={540} y={102} size={14} fill={MUTED} script>
          {t(
            "three limits — miss these and you'll lose marks you'd already earned",
            "teen limits — inhe miss kiya toh kamaaye hue marks bhi jaayenge"
          )}
        </T>
      </Fade>

      {/* beat 1 — what morphology even is */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <Draw
          on={true}
          d="M 100 160 C 120 148, 160 148, 180 160 C 160 172, 120 172, 100 160 Z M 140 160 a 6 6 0 1 0 0.1 0"
          stroke={INK}
          sw={1.8}
          dur={0.7}
        />
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1.1)}>
        <T x={210} y={165} size={15} fill={INK} weight={700} anchor="start">
          {t("MORPHOLOGY = form + arrangement you can SEE", "MORPHOLOGY = form + arrangement jo aap SEE karte hain")}
        </T>
      </Fade>

      {/* beat 2 — limit 1: not anatomy */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={100} y={210} size={15} fill={RED} weight={700} anchor="start">
          {t("LIMIT 1 — this is NOT anatomy", "LIMIT 1 — yeh anatomy NAHI hai")}
        </T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 1.1)}>
        <Chip x={100} y={222} w={420} h={28} fill={CREAM} stroke={RED} textFill={INK} size={12} script={false}>
          {t("epidermis, cortex, vascular bundles (microscope only)", "epidermis, cortex, vascular bundles (sirf microscope mein)")}
        </Chip>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 2)}>
        <Draw on={true} d={crossD(100, 222, 420, 28)} stroke={RED} sw={2.2} dur={0.5} />
      </Fade>

      {/* beat 3 — the trigger list */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={100} y={270} size={13} fill={INK} weight={700} anchor="start">
          {t("see any of these words → WRONG CHAPTER:", "in words mein se koi dikhe → WRONG CHAPTER:")}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 1.1)}>
        <Chip x={100} y={283} w={430} h={26} fill={CREAM} stroke={RED} textFill={RED} size={11} script={false}>
          {t(
            "transverse section · pericycle · casparian strips · vascular bundles",
            "transverse section · pericycle · casparian strips · vascular bundles"
          )}
        </Chip>
      </Fade>

      {/* beat 4 — limit 2: underground ≠ root */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={100} y={346} size={15} fill={RED} weight={700} anchor="start">
          {t("LIMIT 2 — “underground = root” is WRONG", "LIMIT 2 — “underground = root” GALAT hai")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.2)}>
        <Draw on={true} d={crossD(470, 334, 24, 18)} stroke={RED} sw={2.2} dur={0.5} />
      </Fade>

      {/* beat 5 — ginger, turmeric, potato: underground STEMS */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <Chip x={100} y={373} w={110} h={26} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={12} script={false}>
          {t("ginger", "ginger")}
        </Chip>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 0.9)}>
        <Chip x={230} y={373} w={110} h={26} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={12} script={false}>
          {t("turmeric", "turmeric")}
        </Chip>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1.5)}>
        <Chip x={360} y={373} w={110} h={26} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={12} script={false}>
          {t("potato", "potato")}
        </Chip>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 2.2)}>
        <T x={100} y={413} size={12} fill={INK} anchor="start">
          {t(
            "→ underground STEMS: nodes + scale-leaves + buds (depth ≠ defining)",
            "→ underground STEMS: nodes + scale-leaves + buds (depth defining nahi)"
          )}
        </T>
      </Fade>

      {/* beat 6 — limit 3: typical-case, not universal */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={100} y={446} size={15} fill={RED} weight={700} anchor="start">
          {t("LIMIT 3 — rules hold for the typical case", "LIMIT 3 — rules typical case ke liye hain")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1.2)}>
        <T x={100} y={473} size={12} fill={INK} anchor="start">
          {t("e.g. some adventitious roots arise from STEM nodes", "e.g. kuch adventitious roots STEM nodes se nikalte hain")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 2)}>
        <Draw
          on={true}
          d="M 670 458 C 665 466, 675 472, 668 480 M 670 458 C 675 466, 665 472, 672 480"
          stroke={AMBER_DARK}
          sw={1.8}
          dur={0.6}
        />
      </Fade>

      {/* beat 7 — verdict: features, never location */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <Chip x={170} y={523} w={740} h={40} fill={INK} textFill={CREAM} size={16} script={false}>
          {t(
            "always reason from DEFINING FEATURES — never from where it sits",
            "hamesha DEFINING FEATURES se reason karo — kabhi location se nahi"
          )}
        </Chip>
      </Fade>
      <Draw on={beat >= 7} delay={dl(7, 1.4)} d="M 170 580 L 910 580" stroke={INK} sw={2} dur={0.6} />
    </svg>
  );
}
