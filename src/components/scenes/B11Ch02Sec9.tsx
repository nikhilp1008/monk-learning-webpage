"use client";

/**
 * B11 Ch02 · Section 9 — "Stating limitations and who proposed what"
 * (worked_examples) Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0, 8.28, 16.98, 37.8, 45.65, 55.81, 69.55, 77.57, 88.75]):
 *  0 EXAMPLE 1 label (CBSE 3-marker)
 *  1 the question + "3 marks = 3 points"
 *  2 the technique: "failed to separate X from Y"
 *  3 point ① prokaryote/eukaryote
 *  4 point ② unicellular/multicellular
 *  5 point ③ photosynthetic/non-photosynthetic + 3/3 marks stamp
 *  6 EXAMPLE 2 label (CUET fact-recall) + question stub
 *  7 the question fully + 4 options
 *  8 answer: Whittaker ringed, others crossed, 1969 + chronology trick
 *
 * Layout plan:
 *  b0 | title (script20 red)          | T mid | x540  y56
 *  b0 | EX1 label chip (amber)        | Chip  | x60   y95   w240 h30
 *  b1 | question (script16 ink)       | T mid | x540  y145
 *  b1 | sub-note (script13 muted)     | T mid | x540  y170
 *  b2 | technique (script14 green)    | T mid | x540  y200
 *  b3 | badge①+text                   | -/T st| c(70,232) r14 · x95 y237
 *  b4 | badge②+text                   | -/T st| c(70,267) r14 · x95 y272
 *  b5 | badge③+text                   | -/T st| c(70,302) r14 · x95 y307
 *  b5 | "= 3/3 marks" stamp           | Chip  | x850  y284  w140 h36
 *  b6 | EX2 label chip (amber)        | Chip  | x60   y350  w260 h30
 *  b7 | question (script16 ink)       | T mid | x540  y400
 *  b7 | 4 option chips                | Chip  | y430  h40  x95/325/555/785
 *  b8 | cross-outs on wrong options   | Draw  | over chips 1,2,4
 *  b8 | ring around Whittaker         | Draw  | c(655,450) rx115 ry32
 *  b8 | "1969" tag                    | T mid | x655  y482
 *  b8 | chronology caption (script13) | T mid | x540  y515
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, crossD, ringD, INK, MUTED, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

const POINTS: { cy: number; textEn: string; textHi: string }[] = [
  { cy: 232, textEn: "failed to separate prokaryotes from eukaryotes", textHi: "prokaryotes ko eukaryotes se separate nahi kiya" },
  { cy: 267, textEn: "failed to separate unicellular from multicellular", textHi: "unicellular ko multicellular se separate nahi kiya" },
  { cy: 302, textEn: "grouped photosynthetic algae with non-photosynthetic fungi", textHi: "photosynthetic algae ko non-photosynthetic fungi ke saath grouped kiya" },
];

const OPTIONS: { x: number; w: number; name: string }[] = [
  { x: 95, w: 200, name: "Linnaeus" },
  { x: 325, w: 200, name: "Aristotle" },
  { x: 555, w: 200, name: "Whittaker" },
  { x: 785, w: 200, name: "Woese" },
];
const OPT_Y = 430;
const OPT_H = 40;

export default function B11Ch02Sec9({ currentTime, reveals, language }: SceneProps) {
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
      {/* beat 0 — title + Example 1 label */}
      <Fade on={beat >= 0} delay={dl(0, 0.2)}>
        <T x={540} y={56} size={20} fill={RED} script>
          {t("putting the framework to work", "framework ko kaam mein lagate hain")}
        </T>
      </Fade>
      <Fade on={beat >= 0} delay={dl(0, 1.2)}>
        <Chip x={60} y={95} w={240} h={30} fill={AMBER_DARK} textFill={CREAM} size={13} script={false}>
          {t("EXAMPLE 1 · CBSE (3 marks)", "EXAMPLE 1 · CBSE (3 marks)")}
        </Chip>
      </Fade>

      {/* beat 1 — the question */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={540} y={145} size={16} fill={INK} script>
          {t(
            "state any 3 limitations of the two-kingdom system",
            "two-kingdom system ki koi 3 limitations batao"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1.2)}>
        <T x={540} y={170} size={13} fill={MUTED} script>
          {t("3 marks = 3 clear, separate points", "3 marks = 3 clear, alag points")}
        </T>
      </Fade>

      {/* beat 2 — the technique */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={540} y={200} size={14} fill={GREEN} script>
          {t(
            "trick: frame it as 'failed to separate X from Y'",
            "trick: 'X ko Y se separate nahi kiya' bolo"
          )}
        </T>
      </Fade>

      {/* beats 3-5 — the three points */}
      {POINTS.map((p, i) => (
        <Fade key={p.cy} on={beat >= 3 + i} delay={dl(3 + i, 0.3)}>
          <circle cx={70} cy={p.cy} r={14} fill={AMBER_DARK} />
          <T x={70} y={p.cy + 5} size={13} fill={CREAM} weight={800}>
            {i + 1}
          </T>
          <T x={95} y={p.cy + 5} size={13} fill={INK} anchor="start">
            {t(p.textEn, p.textHi)}
          </T>
        </Fade>
      ))}
      <Fade on={beat >= 5} delay={dl(5, 1)}>
        <Chip x={850} y={284} w={140} h={36} fill={GREEN} textFill="#fff" size={15} script={false}>
          {t("= 3/3 marks", "= 3/3 marks")}
        </Chip>
      </Fade>

      {/* beat 6 — Example 2 label */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <Chip x={60} y={350} w={260} h={30} fill={AMBER_DARK} textFill={CREAM} size={13} script={false}>
          {t("EXAMPLE 2 · CUET (fact recall)", "EXAMPLE 2 · CUET (fact recall)")}
        </Chip>
      </Fade>

      {/* beat 7 — the question + options */}
      <Fade on={beat >= 7} delay={dl(7, 0.4)}>
        <T x={540} y={400} size={16} fill={INK} script>
          {t("the Five-Kingdom system was proposed by…?", "Five-Kingdom system kisne propose kiya…?")}
        </T>
      </Fade>
      {OPTIONS.map((o, i) => (
        <Fade key={o.name} on={beat >= 7} delay={dl(7, 1.2 + i * 0.3)}>
          <Chip x={o.x} y={OPT_Y} w={o.w} h={OPT_H} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={15} script={false}>
            {o.name}
          </Chip>
        </Fade>
      ))}

      {/* beat 8 — the answer: Whittaker, 1969, sorted by date */}
      <Draw on={beat >= 8} delay={dl(8, 0.3)} d={crossD(95, OPT_Y, 200, OPT_H)} stroke={RED} sw={2.4} dur={0.5} />
      <Draw on={beat >= 8} delay={dl(8, 0.7)} d={crossD(325, OPT_Y, 200, OPT_H)} stroke={RED} sw={2.4} dur={0.5} />
      <Draw on={beat >= 8} delay={dl(8, 1.1)} d={crossD(785, OPT_Y, 200, OPT_H)} stroke={RED} sw={2.4} dur={0.5} />
      <Draw on={beat >= 8} delay={dl(8, 1.6)} d={ringD(655, OPT_Y + OPT_H / 2, 115, 32)} stroke={GREEN} sw={2.6} dur={0.7} />
      <Fade on={beat >= 8} delay={dl(8, 2.4)}>
        <T x={655} y={493} size={13} fill={GREEN} weight={700}>
          1969
        </T>
      </Fade>
      <Fade on={beat >= 8} delay={dl(8, 3)}>
        <T x={540} y={528} size={13} fill={MUTED} script>
          {t(
            "trick: sort by date — Aristotle → Linnaeus → Whittaker → Woese",
            "trick: date se sort karo — Aristotle → Linnaeus → Whittaker → Woese"
          )}
        </T>
      </Fade>
    </svg>
  );
}
