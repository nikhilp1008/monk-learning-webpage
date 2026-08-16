"use client";

/**
 * B11 Ch02 · Section 53 — "DNA or RNA, never both" (subtopic 5 continues)
 * Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0, 9.47, 28.07, 37.8, 57.94, 78.34, 98.05, 118.53]):
 *  0 title
 *  1 rule banner (exactly ONE type, never both) + the "contains both" trap
 *  2 transition: one type != one option -> 4-cell grid outline drawn
 *  3 examples fill each cell (Hepatitis B / coliphage / Reovirus / TMV)
 *  4 3 rules of thumb (plant->ssRNA, phage->dsDNA, animal->either)
 *  5 retrovirus special case (RNA->DNA reverse-transcribed, HIV)
 *  6 disease lists: humans / plants, two boxes
 *  7 the trap: cholera=bacterial, rusts/smuts=fungal — check the agent
 *
 * Layout plan:
 *  b1  rule banner            | Chip fill RED       | x160..920 y88..120
 *  b1  trap line                | T mid script RED     | x540 y144
 *  b2  transition                 | T mid script GREEN     | x540 y170
 *  b2  4-cell grid outline          | Draw rect x4              | y188..228 / y240..280
 *  b3  4 examples + arrows            | T start                    | x315/335 & x580/600
 *  b4  rules-of-thumb line              | T mid script INK              | x540 y306
 *  b5  retrovirus line                    | T mid script AMBER_DARK         | x540 y336
 *  b6  disease boxes (humans/plants)        | Draw rect x2 + T             | y360..430
 *  b7  the trap                               | T mid script RED               | x540 y458
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, INK, MUTED, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

export default function B11Ch02Sec53({ currentTime, reveals, language }: SceneProps) {
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
      {/* beat 0 — title */}
      <Fade on={beat >= 0} delay={dl(0, 0.2)}>
        <T x={540} y={52} size={16} fill={RED} script>
          {t("DNA or RNA — never both", "DNA ya RNA — kabhi dono nahi")}
        </T>
      </Fade>

      {/* beat 1 — the rule + the trap */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <Chip x={160} y={88} w={760} h={32} fill={RED} textFill={CREAM} size={13} script={false}>
          {t(
            "a virus carries EXACTLY ONE type of nucleic acid — never both",
            "ek virus mein sirf EK type ka nucleic acid hota — kabhi dono nahi"
          )}
        </Chip>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1)}>
        <T x={540} y={144} size={11} fill={RED} script>
          {t(
            "trap: 'contains both DNA and RNA' — always wrong, almost every MCQ",
            "trap: 'contains both DNA and RNA' — hamesha galat, lagbhag har MCQ mein"
          )}
        </T>
      </Fade>

      {/* beat 2 — one type != one option, grid outline */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={540} y={170} size={11} fill={GREEN} script>
          {t(
            "one type ≠ one option — 4 combinations (each acid single- or double-stranded)",
            "ek type ≠ ek option — 4 combinations (har acid single- ya double-stranded)"
          )}
        </T>
      </Fade>
      <Draw on={beat >= 2} delay={dl(2, 1)} d="M 90 188 h 315 v 40 h -315 z" stroke={GREEN} sw={2} dur={0.6} fill={CREAM} />
      <Draw on={beat >= 2} delay={dl(2, 1.3)} d="M 435 188 h 315 v 40 h -315 z" stroke={AMBER_DARK} sw={2} dur={0.6} fill={CREAM} />
      <Draw on={beat >= 2} delay={dl(2, 1.6)} d="M 90 240 h 315 v 40 h -315 z" stroke={GREEN} sw={2} dur={0.6} fill={CREAM} />
      <Draw on={beat >= 2} delay={dl(2, 1.9)} d="M 435 240 h 315 v 40 h -315 z" stroke={AMBER_DARK} sw={2} dur={0.6} fill={CREAM} />
      <Fade on={beat >= 2} delay={dl(2, 2.4)}>
        <T x={110} y={212} size={11} fill={GREEN} anchor="start" weight={700}>
          double-stranded DNA
        </T>
        <T x={455} y={212} size={11} fill={AMBER_DARK} anchor="start" weight={700}>
          double-stranded RNA
        </T>
        <T x={110} y={264} size={11} fill={GREEN} anchor="start" weight={700}>
          single-stranded DNA
        </T>
        <T x={455} y={264} size={11} fill={AMBER_DARK} anchor="start" weight={700}>
          single-stranded RNA
        </T>
      </Fade>

      {/* beat 3 — examples fill in */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={315} y={212} size={12} fill={MUTED} anchor="start">
          →
        </T>
        <T x={335} y={212} size={11} fill={INK} anchor="start">
          Hepatitis B
        </T>
        <T x={580} y={212} size={12} fill={MUTED} anchor="start">
          →
        </T>
        <T x={600} y={212} size={11} fill={INK} anchor="start">
          Reovirus
        </T>
        <T x={315} y={264} size={12} fill={MUTED} anchor="start">
          →
        </T>
        <T x={335} y={264} size={11} fill={INK} anchor="start">
          coliphage
        </T>
        <T x={580} y={264} size={12} fill={MUTED} anchor="start">
          →
        </T>
        <T x={600} y={264} size={11} fill={INK} anchor="start">
          TMV
        </T>
      </Fade>

      {/* beat 4 — rules of thumb */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={540} y={306} size={11} fill={INK} script>
          {t(
            "plant virus → ssRNA · bacteriophage → dsDNA · animal virus → either (flexible)",
            "plant virus → ssRNA · bacteriophage → dsDNA · animal virus → koi bhi (flexible)"
          )}
        </T>
      </Fade>

      {/* beat 5 — retrovirus */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={540} y={336} size={11} fill={AMBER_DARK} script>
          {t(
            "RNA reverse-transcribed into DNA inside the host = RETROVIRUS (HIV)",
            "RNA jo host ke andar ulta DNA mein likha jaata = RETROVIRUS (HIV)"
          )}
        </T>
      </Fade>

      {/* beat 6 — disease lists */}
      <Draw on={beat >= 6} delay={dl(6, 0.3)} d="M 90 360 h 315 v 70 h -315 z" stroke={GREEN} sw={2} dur={0.7} fill={CREAM} />
      <Draw on={beat >= 6} delay={dl(6, 0.7)} d="M 435 360 h 315 v 70 h -315 z" stroke={GREEN} sw={2} dur={0.7} fill={CREAM} />
      <Fade on={beat >= 6} delay={dl(6, 1.4)}>
        <T x={247} y={382} size={12} fill={GREEN} weight={700}>
          {t("In humans", "Insaano mein")}
        </T>
        <T x={247} y={402} size={10} fill={INK}>
          {t("mumps, smallpox, herpes, influenza,", "mumps, smallpox, herpes, influenza,")}
        </T>
        <T x={247} y={420} size={10} fill={INK}>
          {t("common cold (rhinovirus), AIDS", "common cold (rhinovirus), AIDS")}
        </T>
        <T x={592} y={382} size={12} fill={GREEN} weight={700}>
          {t("In plants", "Paudhon mein")}
        </T>
        <T x={592} y={402} size={10} fill={INK}>
          {t("mosaic, leaf rolling & curling,", "mosaic, patton ka mudna aur sikudna,")}
        </T>
        <T x={592} y={420} size={10} fill={INK}>
          {t("yellowing, vein clearing, stunted growth", "peelapan, vein clearing, bauna reh jaana")}
        </T>
      </Fade>

      {/* beat 7 — the trap */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={540} y={458} size={11} fill={RED} script>
          {t(
            "trap: Cholera = bacterial, Rusts/smuts = fungal — check the AGENT, not just the disease",
            "trap: Cholera = bacterial, Rusts/smuts = fungal — AGENT check karo, sirf disease nahi"
          )}
        </T>
      </Fade>
    </svg>
  );
}
