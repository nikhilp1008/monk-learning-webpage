"use client";

/**
 * B11 Ch02 · Section 47 — "Plantae and Animalia pitfalls, and the
 * one-question tool" (tips — closes subtopic 4) Canvas 1080×620 · safe
 * x36–1044, y30–596.
 *
 * Beats (en [0, 8.36, 33.19, 47.45, 64.6, 82.86, 100.52, 111.02]):
 *  0 title
 *  1-5 five numbered pitfalls (autotroph exception / animal wall / stored
 *      food swap / nutrition-alone trap / mushroom-or-alga confusion)
 *  6 the tool intro + question box drawn ("cell wall + own food?")
 *  7 the full branch (yes->PLANTAE, no wall+ingests->ANIMALIA) + 2
 *    tiebreaker rows (stored food, plastids) + closing line
 *
 * Layout plan (all boxes in viewBox units):
 *  b0  title              | T mid script RED     | x307..773  y31..60
 *  b1  badge1 circle+num   | circle r12 + T        | x58..82   y73..97
 *  b1  pitfall1 text       | T start script INK    | x92..~625 y188..193(base201)
 *  b2  badge2/text (cy113) | same pattern           | x92..~540 base229
 *  b3  badge3/text (cy141) | same pattern           | x92..~560 base257
 *  b4  badge4/text (cy169) | same pattern           | x92..~530 base285
 *  b5  badge5/text (cy197) | same pattern           | x92..~540 base313
 *  b6  tool intro          | T mid script GREEN     | x325..755 y217..238
 *  b6  question box        | Draw rect fill CREAM   | x410..670 y248..292
 *  b6  question label      | T mid weight700 INK    | box-centered  y277
 *  b7  left arrow (yes)     | Draw arrowD GREEN      | (460,292)->(300,330)
 *  b7  "yes" label          | T start INK/GREEN      | x388..~405 y316
 *  b7  right arrow (no)     | Draw arrowD AMBER_DARK | (620,292)->(780,330)
 *  b7  "no wall,ingests"    | T end AMBER_DARK       | x605..690 y316
 *  b7  PLANTAE chip         | Chip fill GREEN        | x200..400 y335..383
 *  b7  ANIMALIA chip        | Chip fill AMBER_DARK   | x680..880 y335..383
 *  b7  tiebreak intro       | T mid script INK       | x352..728 y396..418
 *  b7  row1 box (stored)    | Draw rect CREAM/MUTED  | x140..940 y428..466
 *  b7  row1 texts           | T start various        | inside row1
 *  b7  row2 box (plastids)  | Draw rect CREAM/MUTED  | x140..940 y480..518
 *  b7  row2 texts           | T start various        | inside row2
 *  b7  closing line         | T mid script GREEN     | x~300..780 y536..558
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
  MUTED,
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
} from "./kit";

const PITFALLS: { cy: number; en: string; hi: string }[] = [
  {
    cy: 85,
    en: "don't assume all plants are autotrophic — Venus flytrap, bladderwort & Cuscuta break that",
    hi: "yeh mat maano sab paudhe autotrophic hote — Venus flytrap, bladderwort & Cuscuta iska break hain",
  },
  {
    cy: 113,
    en: "don't give animal cells a wall — its absence is the cleanest plant-vs-animal test",
    hi: "animal cells ko wall mat do — na hona hi sabse saaf plant-vs-animal test hai",
  },
  {
    cy: 141,
    en: "don't swap the stored foods — Plants Starch, Animals Glycogen (P with S, A with G)",
    hi: "stored foods mat badlo — Plants Starch, Animals Glycogen (P ke saath S, A ke saath G)",
  },
  {
    cy: 169,
    en: "don't classify by nutrition alone — a chlorophyll-less Cuscuta is still a plant",
    hi: "sirf nutrition se classify mat karo — chlorophyll-less Cuscuta bhi paudha hi hai",
  },
  {
    cy: 197,
    en: "don't confuse a mushroom (fungus) or pond algae (protist) with these two kingdoms",
    hi: "mushroom (fungus) ya pond algae (protist) ko in do kingdoms se confuse mat karo",
  },
];

export default function B11Ch02Sec47({ currentTime, reveals, language }: SceneProps) {
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
          {t(
            "plantae & animalia pitfalls + the one-question tool",
            "plantae & animalia pitfalls + one-question tool"
          )}
        </T>
      </Fade>

      {/* beats 1-5 — the five pitfalls */}
      {PITFALLS.map((p, i) => (
        <Fade key={p.cy} on={beat >= 1 + i} delay={dl(1 + i, 0.3)}>
          <circle cx={70} cy={p.cy} r={12} fill={RED} />
          <T x={70} y={p.cy + 4.5} size={12} fill={CREAM} weight={800}>
            {i + 1}
          </T>
          <T x={92} y={p.cy + 4} size={11} fill={INK} anchor="start" script>
            {t(p.en, p.hi)}
          </T>
        </Fade>
      ))}

      {/* beat 6 — the tool intro + question box */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={232} size={13} fill={GREEN} script>
          {t(
            "for a multicellular eukaryote, one question decides it all",
            "multicellular eukaryote ke liye, ek hi sawaal sab tay karta hai"
          )}
        </T>
      </Fade>
      <Draw
        on={beat >= 6}
        delay={dl(6, 1)}
        d="M 410 248 h 260 v 44 h -260 z"
        stroke={INK}
        sw={2.2}
        dur={0.7}
        fill={CREAM}
      />
      <Fade on={beat >= 6} delay={dl(6, 1.8)}>
        <T x={540} y={276} size={14} fill={INK} weight={700}>
          {t("cell wall + own food?", "cell wall + apna food?")}
        </T>
      </Fade>

      {/* beat 7 — the full branch */}
      <Draw
        on={beat >= 7}
        delay={dl(7, 0.2)}
        d={arrowD(460, 292, 300, 330)}
        stroke={GREEN}
        sw={2}
        dur={0.4}
      />
      <Fade on={beat >= 7} delay={dl(7, 0.6)}>
        <T x={388} y={316} size={11} fill={GREEN} anchor="start" weight={700}>
          {t("yes", "haan")}
        </T>
      </Fade>
      <Draw
        on={beat >= 7}
        delay={dl(7, 0.9)}
        d={arrowD(620, 292, 780, 330)}
        stroke={AMBER_DARK}
        sw={2}
        dur={0.4}
      />
      <Fade on={beat >= 7} delay={dl(7, 1.3)}>
        <T x={690} y={316} size={10} fill={AMBER_DARK} anchor="end" weight={700}>
          {t("no wall, ingests", "wall nahi, ingest karta")}
        </T>
      </Fade>

      <Fade on={beat >= 7} delay={dl(7, 1.7)}>
        <Chip x={200} y={335} w={200} h={48} fill={GREEN} textFill="#fff" size={16} script={false}>
          PLANTAE
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 2.3)}>
        <Chip x={680} y={335} w={200} h={48} fill={AMBER_DARK} textFill="#fff" size={16} script={false}>
          ANIMALIA
        </Chip>
      </Fade>

      {/* tiebreakers */}
      <Fade on={beat >= 7} delay={dl(7, 3)}>
        <T x={540} y={412} size={12} fill={INK} script>
          {t(
            "if the wall/food clue isn't given, use the tiebreakers:",
            "agar wall/food clue na mile, to tiebreakers use karo:"
          )}
        </T>
      </Fade>

      <Draw
        on={beat >= 7}
        delay={dl(7, 3.6)}
        d="M 140 428 h 800 v 38 h -800 z"
        stroke={MUTED}
        sw={1.6}
        dur={0.6}
        fill={CREAM}
      />
      <Fade on={beat >= 7} delay={dl(7, 4.2)}>
        <T x={170} y={452} size={12} fill={INK} anchor="start" weight={700}>
          {t("stored food:", "stored food:")}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 4.4)}>
        <T x={340} y={452} size={12} fill={GREEN} anchor="start" weight={700}>
          starch = plant
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 4.6)}>
        <T x={520} y={452} size={12} fill={MUTED} anchor="start">
          |
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 4.8)}>
        <T x={560} y={452} size={12} fill={AMBER_DARK} anchor="start" weight={700}>
          glycogen = animal
        </T>
      </Fade>

      <Draw
        on={beat >= 7}
        delay={dl(7, 5.1)}
        d="M 140 480 h 800 v 38 h -800 z"
        stroke={MUTED}
        sw={1.6}
        dur={0.6}
        fill={CREAM}
      />
      <Fade on={beat >= 7} delay={dl(7, 5.6)}>
        <T x={170} y={504} size={12} fill={INK} anchor="start" weight={700}>
          {t("plastids:", "plastids:")}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 5.8)}>
        <T x={340} y={504} size={12} fill={GREEN} anchor="start" weight={700}>
          present = plant
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 6)}>
        <T x={520} y={504} size={12} fill={MUTED} anchor="start">
          |
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 6.2)}>
        <T x={560} y={504} size={12} fill={AMBER_DARK} anchor="start" weight={700}>
          absent = animal
        </T>
      </Fade>

      <Fade on={beat >= 7} delay={dl(7, 6.7)}>
        <T x={540} y={548} size={13} fill={GREEN} script>
          {t(
            "one question, two tiebreakers — sub-topic answered",
            "ek sawaal, do tiebreakers — sub-topic hal"
          )}
        </T>
      </Fade>
    </svg>
  );
}
