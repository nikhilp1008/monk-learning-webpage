"use client";

/**
 * B11 Ch02 · Section 54 — "Viroids and prions in detail" (subtopic 5
 * continues) Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0, 15.19, 34.39, 48.13, 72.62, 89.0, 110.08, 131.58]):
 *  0 title: below the virus, two agents, simpler in different directions
 *  1 VIROID card lands: header, naked-RNA squiggle, discovery facts
 *  2 disease chip: Potato spindle tuber disease (the memory hook)
 *  3 contrast note: missing coat, harder to inactivate
 *  4 PRION card lands: header, fold/mis-fold icons, protein-only chip
 *  5 how it spreads: forces normal copies to mis-fold
 *  6 the surprise: infectious without any genes
 *  7 prion diseases: mad-cow/CJD/kuru, fatal, no cure
 *
 * Layout plan — two outline cards, never sharing x-range:
 *  b1  VIROID card (AMBER_DARK)| Draw rect  | x70..500  y100..390
 *  b1  header/squiggle/caption/facts | T/path | y128..212
 *  b2  disease chip                    | Chip     | x100..470 y228..260
 *  b3  contrast note (2 lines)           | T mid script | y292/310
 *  b4  PRION card (INK)                    | Draw rect  | x580..1010 y100..390
 *  b4  header/icons/label/chip                | T/path/Chip | y128..235
 *  b5  spread (2 lines)                          | T mid       | y262/280
 *  b6  surprise chip                               | Chip          | y302..332
 *  b7  diseases chip (RED)                           | Chip            | y345..377
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, arrowD, INK, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

export default function B11Ch02Sec54({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={54} size={15} fill={RED} script>
          {t(
            "below the virus — two agents, simpler in different directions",
            "virus se neeche — do agents, bilkul alag directions mein simpler"
          )}
        </T>
      </Fade>

      {/* beat 1 — VIROID card */}
      <Draw on={beat >= 1} delay={dl(1, 0.3)} d="M 70 100 h 430 v 290 h -430 z" stroke={AMBER_DARK} sw={2.2} dur={0.9} fill={CREAM} />
      <Fade on={beat >= 1} delay={dl(1, 1.4)}>
        <T x={285} y={128} size={15} fill={AMBER_DARK} weight={800}>
          VIROID
        </T>
        <path d="M 185 155 q 20 -12 40 0 q 20 12 40 0 q 20 -12 40 0 q 20 12 40 0" fill="none" stroke={AMBER_DARK} strokeWidth={2.4} />
        <T x={285} y={185} size={11} fill={INK} script>
          {t("naked RNA — no coat at all", "nanga RNA — koi coat nahi")}
        </T>
        <T x={285} y={212} size={10} fill={INK}>
          {t(
            "discovered by T. O. Diener, 1971 · RNA of low molecular weight",
            "T. O. Diener ne khoja, 1971 mein · RNA low molecular weight ka"
          )}
        </T>
      </Fade>

      {/* beat 2 — the memory hook disease */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <Chip x={100} y={228} w={370} h={32} fill={CREAM} stroke={AMBER_DARK} textFill={AMBER_DARK} size={12} script={false}>
          {t("Potato spindle tuber disease", "Potato spindle tuber disease")}
        </Chip>
      </Fade>

      {/* beat 3 — the contrast: missing coat */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={285} y={292} size={10.5} fill={INK} script>
          {t(
            "no coat = the headline contrast with a virus",
            "koi coat nahi = virus se mukhya farak"
          )}
        </T>
        <T x={285} y={310} size={10.5} fill={RED} script>
          {t(
            "→ harder to inactivate — no coat to attack",
            "→ inactivate karna mushkil — coat hai hi nahi"
          )}
        </T>
      </Fade>

      {/* beat 4 — PRION card */}
      <Draw on={beat >= 4} delay={dl(4, 0.3)} d="M 580 100 h 430 v 290 h -430 z" stroke={INK} sw={2.2} dur={0.9} fill={CREAM} />
      <Fade on={beat >= 4} delay={dl(4, 1.4)}>
        <T x={795} y={128} size={15} fill={INK} weight={800}>
          PRION
        </T>
        <path d="M 680 158 q 14 -12 28 0 q 14 12 28 0" fill="none" stroke={GREEN} strokeWidth={2.4} />
        <Draw on={beat >= 4} delay={dl(4, 1.6)} d={arrowD(742, 150, 772, 150)} stroke={INK} sw={1.6} dur={0.3} />
        <path d="M 782 140 l 11 16 l 12 -18 l 11 20 l 12 -16" fill="none" stroke={RED} strokeWidth={2.4} />
        <T x={795} y={188} size={10} fill={INK}>
          {t("normal fold → mis-folded", "normal fold → mis-fold")}
        </T>
        <Chip x={600} y={205} w={390} h={30} fill={CREAM} stroke={INK} textFill={INK} size={11} script={false}>
          {t("protein only — NO nucleic acid", "sirf protein — koi nucleic acid nahi")}
        </Chip>
      </Fade>

      {/* beat 5 — how it spreads */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={795} y={262} size={10.5} fill={INK} script>
          {t(
            "propagates by forcing normal copies",
            "usi protein ki normal folded copies ko"
          )}
        </T>
        <T x={795} y={280} size={10.5} fill={INK} script>
          {t(
            "of the SAME protein to mis-fold — spreads like a rumour",
            "mis-fold karne majboor karta — afwaah jaisa failta"
          )}
        </T>
      </Fade>

      {/* beat 6 — the surprise */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <Chip x={600} y={302} w={390} h={30} fill={CREAM} stroke={GREEN} textFill={GREEN} size={11} script={false}>
          {t("surprise: infectious WITHOUT any genes", "surprise: bina genes ke bhi infectious")}
        </Chip>
      </Fade>

      {/* beat 7 — prion diseases */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <Chip x={600} y={345} w={390} h={32} fill={RED} textFill={CREAM} size={11} script={false}>
          {t("mad-cow (BSE) · CJD · kuru — fatal, no cure", "mad-cow (BSE) · CJD · kuru — fatal, ilaaj nahi")}
        </Chip>
      </Fade>
    </svg>
  );
}
