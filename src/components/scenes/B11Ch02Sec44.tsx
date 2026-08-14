"use client";

/**
 * B11 Ch02 · Section 44 — "The unifying contrast, and what they share"
 * Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0, 8.53, 22.7, 41.13, 58.28, 64.77, 80.47, 105.3]):
 *  0 intro: tying the sub-topic together — and what's forgotten: what they share
 *  1 THE AXIS restated: make food vs find food — that's it, that's the sub-topic
 *  2 LEFT row: chloroplasts -> cell wall -> fixed -> starch (Plantae cascade, mini)
 *  3 RIGHT row: wall-less -> locomotion -> sensory -> glycogen (Animalia cascade, mini)
 *  4 ecological framing: GREEN BASE (under Plantae) / MOBILE TOP (under Animalia)
 *  5 what they SHARE: eukaryotic, multicellular, sexual reproduction, division of labour
 *  6 history: both kept since the first 2-kingdom split; the other 3 came later
 *  7 closing image: two halves of the multicellular eukaryotic world
 *
 * Layout plan (Anek bl−0.78s..+0.31s, Kalam bl−1.3s..+0.5s):
 *  title (persist)          | T mid script20 RED    | x540 y58
 *  title swoosh               | Draw                   | y76 x340..740
 *  b0 intro (Anek14, beat-scoped)| T mid              | x540 y100
 *  b1 axis (Anek18 RED, persist) | T mid              | x540 y150
 *  b2 LEFT row 4 chips + 3 arrows| Chip/Draw y290 h32  | x100 w115/x230 w90/x335 w65/x415 w75
 *  b3 RIGHT row 4 chips + 3 arrows| Chip/Draw y290 h32 | x590 w90/x695 w95/x805 w65/x885 w80
 *  b4 "GREEN BASE"/"MOBILE TOP" (Anek14)| T mid        | x295/x785 y344
 *  b5 shared chip (dashed GREEN) | Chip x280 y390 w520 h40
 *  b6 history (Anek14)          | T mid                | x540 y456
 *  b7 line1 (Anek14)            | T mid                | x540 y490
 *  b7 line2 (Kalam15 GREEN)     | T mid                | x540 y528
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, arrowD, INK, GREEN, RED, AMBER_DARK, CREAM } from "./kit";

const LEFT_CHIPS = [
  { x: 100, w: 115, label: "chloroplasts" },
  { x: 230, w: 90, label: "cell wall" },
  { x: 335, w: 65, label: "fixed" },
  { x: 415, w: 75, label: "starch" },
];
const RIGHT_CHIPS = [
  { x: 590, w: 90, label: "wall-less" },
  { x: 695, w: 95, label: "locomotion" },
  { x: 805, w: 65, label: "sensory" },
  { x: 885, w: 80, label: "glycogen" },
];

export default function B11Ch02Sec44({ currentTime, reveals, language }: SceneProps) {
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
          {t("Plantae vs Animalia: the axis, and what they share", "Plantae vs Animalia: axis, aur jo common hai")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 1.4)} d="M 340 76 C 420 72, 660 72, 740 76" stroke={RED} sw={2.2} dur={0.5} />

      {/* beat 0 — intro (beat-scoped: transient framing, not a fact to keep) */}
      <Fade on={beat === 0} delay={dl(0, 0.5)}>
        <T x={540} y={100} size={14} fill={INK} anchor="middle">
          {t(
            "tying the sub-topic together — and what's forgotten: what they share",
            "sub-topic ko jodte hain — aur jo bhool jaate: jo common hai"
          )}
        </T>
      </Fade>

      {/* beat 1 — the axis restated, persists as the anchor fact */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={540} y={150} size={18} fill={RED} weight={800} anchor="middle">
          {t(
            "make food vs find food — that's it, that's the sub-topic",
            "khana banana vs khana dhoondhna — bas itna hi, yehi sub-topic hai"
          )}
        </T>
      </Fade>

      {/* beat 2 — LEFT: the Plantae cascade, condensed to a mini-chain */}
      {LEFT_CHIPS.map((c, i) => (
        <Fade key={c.label} on={beat >= 2} delay={dl(2, 0.3 + i * 0.3)}>
          <Chip x={c.x} y={290} w={c.w} h={32} fill={CREAM} stroke={GREEN} textFill={INK} size={13} script={false}>
            {c.label}
          </Chip>
        </Fade>
      ))}
      <Draw on={beat >= 2} delay={dl(2, 1.6)} d={arrowD(215, 306, 230, 306)} stroke={GREEN} sw={1.6} dur={0.3} />
      <Draw on={beat >= 2} delay={dl(2, 1.8)} d={arrowD(320, 306, 335, 306)} stroke={GREEN} sw={1.6} dur={0.3} />
      <Draw on={beat >= 2} delay={dl(2, 2)} d={arrowD(400, 306, 415, 306)} stroke={GREEN} sw={1.6} dur={0.3} />

      {/* beat 3 — RIGHT: the Animalia cascade, condensed to a mini-chain */}
      {RIGHT_CHIPS.map((c, i) => (
        <Fade key={c.label} on={beat >= 3} delay={dl(3, 0.3 + i * 0.3)}>
          <Chip x={c.x} y={290} w={c.w} h={32} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={13} script={false}>
            {c.label}
          </Chip>
        </Fade>
      ))}
      <Draw on={beat >= 3} delay={dl(3, 1.6)} d={arrowD(680, 306, 695, 306)} stroke={AMBER_DARK} sw={1.6} dur={0.3} />
      <Draw on={beat >= 3} delay={dl(3, 1.8)} d={arrowD(790, 306, 805, 306)} stroke={AMBER_DARK} sw={1.6} dur={0.3} />
      <Draw on={beat >= 3} delay={dl(3, 2)} d={arrowD(870, 306, 885, 306)} stroke={AMBER_DARK} sw={1.6} dur={0.3} />

      {/* beat 4 — where it lands ecologically */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={295} y={344} size={14} fill={GREEN} weight={700} anchor="middle">
          GREEN BASE
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 0.7)}>
        <T x={785} y={344} size={14} fill={AMBER_DARK} weight={700} anchor="middle">
          MOBILE TOP
        </T>
      </Fade>

      {/* beat 5 — what they share */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <Chip x={280} y={390} w={520} h={40} fill={CREAM} stroke={GREEN} textFill={GREEN} size={14} script={false} dashed>
          {t(
            "BOTH: eukaryotic · multicellular · sexual reproduction · division of labour",
            "DONO: eukaryotic · multicellular · sexual reproduction · division of labour"
          )}
        </Chip>
      </Fade>

      {/* beat 6 — the historical payoff */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={456} size={14} fill={INK} anchor="middle">
          {t(
            "both kept since the first 2-kingdom split — the other 3 came later",
            "dono the first 2-kingdom split se hi — baaki 3 baad mein aaye"
          )}
        </T>
      </Fade>

      {/* beat 7 — closing image */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={540} y={490} size={14} fill={INK} weight={700} anchor="middle">
          {t("two halves of the multicellular eukaryotic world", "multicellular eukaryotic duniya ke do hisse")}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 0.9)}>
        <T x={540} y={528} size={15} fill={GREEN} script>
          {t(
            "producers and consumers — the green base and the mobile top",
            "producers aur consumers — green base aur mobile top"
          )}
        </T>
      </Fade>
    </svg>
  );
}
