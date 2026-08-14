"use client";

/**
 * B11 Ch02 · Section 39 — "Kingdom Animalia, and what no wall makes possible"
 * Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0, 7.68, 21.25, 40.96, 51.8, 64.68, 85.76, 103.25]):
 *  0 intro: the other half — Kingdom Animalia, definition exact
 *  1 THE DEFINITION: multicellular eukaryotic heterotrophs, NO CELL WALL emphasised
 *  2 feeding: ingest→digest = holozoic (vs fungi's digest-outside-and-absorb)
 *  3 storage: glycogen + fat, not starch
 *  4 cascade start: NO WALL → FLEXIBLE & MOBILE
 *  5 cascade continues: → MUSCLE + NERVE (walled cell cannot)
 *  6 cascade completes: → SENSORY + NEUROMOTOR → active, food-seeking life
 *  7 closing: determinate growth — fixed adult size, then reproduce
 *
 * Layout plan (Anek bl−0.78s..+0.31s, Kalam bl−1.3s..+0.5s):
 *  title (persist)      | T mid script20 RED   | x540 y58
 *  title swoosh          | Draw                  | y76 x340..740
 *  b0 intro (Anek14)     | T mid                 | x540 y100  [dim@1]
 *  b1 line1 (Anek14)     | T mid                 | x540 y130
 *  b1 line2 (Anek16 RED) | T mid                 | x540 y160
 *  b1 swoosh             | Draw                  | y178 x400..680
 *  b2 line3 (Anek14 GREEN)| T mid                | x540 y204
 *  b2 line4 (Anek14)     | T mid                 | x540 y236
 *  b3 storage (Anek14 AMBER_DARK)| T mid          | x540 y270
 *  b4 chip NO WALL (RED) | Chip x175 y300 w100 h42
 *  b4 arrow1             | Draw                   | x275..335 y321
 *  b4 chip FLEXIBLE&MOBILE(GREEN)| Chip x335 y300 w150 h42
 *  b5 arrow2              | Draw                  | x485..545 y321
 *  b5 chip MUSCLE+NERVE (GREEN)| Chip x545 y300 w130 h42
 *  b5 contrast (Anek14 RED)| T mid                 | x540 y368
 *  b6 arrow3               | Draw                  | x675..735 y321
 *  b6 chip SENSORY+NEUROMOTOR(GREEN)| Chip x735 y300 w170 h42
 *  b6 caption (Kalam15 GREEN)| T mid                | x540 y412
 *  b7 line1 (Anek14)        | T mid                 | x540 y446
 *  b7 line2 (Kalam15 RED)   | T mid                 | x540 y486
 *  b7 swoosh                | Draw                  | y504 x420..660
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
  INK,
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
} from "./kit";

export default function B11Ch02Sec39({ currentTime, reveals, language }: SceneProps) {
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
      {/* title — persists whole scene */}
      <Fade on={beat >= 0} delay={dl(0, 0.2)}>
        <T x={540} y={58} size={20} fill={RED} script>
          {t("Animalia: no wall, and what it makes possible", "Animalia: wall nahi, aur usse kya milta hai")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 1.6)} d="M 340 76 C 420 72, 660 72, 740 76" stroke={RED} sw={2.2} dur={0.5} />

      {/* beat 0 — intro */}
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 0.5)}>
        <T x={540} y={100} size={14} fill={INK} anchor="middle">
          {t("the other half — Kingdom Animalia, definition exact", "doosra half — Kingdom Animalia, definition exact")}
        </T>
      </Fade>

      {/* beat 1 — THE DEFINITION, no cell wall emphasised */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={540} y={130} size={14} fill={INK} anchor="middle">
          {t("multicellular, eukaryotic heterotrophs", "multicellular, eukaryotic heterotrophs")}
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 0.9)}>
        <T x={540} y={160} size={16} fill={RED} weight={800} anchor="middle">
          {t("...with NO CELL WALL", "...jisme NO CELL WALL hai")}
        </T>
      </Fade>
      <Draw on={beat >= 1} delay={dl(1, 1.5)} d="M 400 178 C 450 174, 630 174, 680 178" stroke={RED} sw={1.8} dur={0.5} />

      {/* beat 2 — feeding: ingest then digest, contrast with fungi */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={540} y={204} size={14} fill={GREEN} weight={700} anchor="middle">
          {t("ingest → digest = HOLOZOIC nutrition", "ingest → digest = HOLOZOIC nutrition")}
        </T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 1)}>
        <T x={540} y={236} size={14} fill={INK} anchor="middle">
          {t(
            "(fungi digest outside & absorb — animals bring food IN first)",
            "(fungi bahar digest karke absorb karte — animals pehle food ANDAR laate)"
          )}
        </T>
      </Fade>

      {/* beat 3 — storage: glycogen + fat, not starch */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={540} y={270} size={14} fill={AMBER_DARK} weight={700} anchor="middle">
          {t("stores as glycogen + fat — not starch", "glycogen + fat store karte — starch nahi")}
        </T>
      </Fade>

      {/* beat 4 — cascade start: no wall -> flexible & mobile */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <Chip x={175} y={300} w={100} h={42} fill={RED} textFill={CREAM} size={14} script={false}>
          NO WALL
        </Chip>
      </Fade>
      <Draw on={beat >= 4} delay={dl(4, 0.9)} d={arrowD(275, 321, 335, 321)} stroke={GREEN} sw={2} dur={0.35} />
      <Fade on={beat >= 4} delay={dl(4, 1.3)}>
        <Chip x={335} y={300} w={150} h={42} fill={GREEN} textFill={CREAM} size={14} script={false}>
          FLEXIBLE & MOBILE
        </Chip>
      </Fade>

      {/* beat 5 — cascade continues: -> muscle + nerve; a walled cell cannot */}
      <Draw on={beat >= 5} delay={dl(5, 0.3)} d={arrowD(485, 321, 545, 321)} stroke={GREEN} sw={2} dur={0.35} />
      <Fade on={beat >= 5} delay={dl(5, 0.7)}>
        <Chip x={545} y={300} w={130} h={42} fill={GREEN} textFill={CREAM} size={14} script={false}>
          MUSCLE + NERVE
        </Chip>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1.3)}>
        <T x={540} y={368} size={14} fill={RED} weight={700} anchor="middle">
          {t("a walled cell simply cannot do this", "walled cell yeh kabhi nahi kar sakta")}
        </T>
      </Fade>

      {/* beat 6 — cascade completes: -> sensory + neuromotor -> active life */}
      <Draw on={beat >= 6} delay={dl(6, 0.3)} d={arrowD(675, 321, 735, 321)} stroke={GREEN} sw={2} dur={0.35} />
      <Fade on={beat >= 6} delay={dl(6, 0.7)}>
        <Chip x={735} y={300} w={170} h={42} fill={GREEN} textFill={CREAM} size={14} script={false}>
          SENSORY + NEUROMOTOR
        </Chip>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1.4)}>
        <T x={540} y={412} size={15} fill={GREEN} script>
          {t("active, food-seeking life", "active, khana-dhoondhne wali zindagi")}
        </T>
      </Fade>

      {/* beat 7 — closing: determinate growth */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={540} y={446} size={14} fill={INK} weight={700} anchor="middle">
          {t(
            "fixed adult size, then reproduce (usually sexual) — DETERMINATE growth",
            "fixed adult size, phir reproduce (aksar sexual) — DETERMINATE growth"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1)}>
        <T x={540} y={486} size={15} fill={RED} script>
          {t("a tree keeps growing — you stopped", "ek ped badhta rehta — tum ruk gaye")}
        </T>
      </Fade>
      <Draw on={beat >= 7} delay={dl(7, 1.6)} d="M 420 504 C 470 500, 610 500, 660 504" stroke={RED} sw={1.8} dur={0.5} />
    </svg>
  );
}
