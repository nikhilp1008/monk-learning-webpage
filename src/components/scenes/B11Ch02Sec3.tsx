"use client";

/**
 * B11 Ch02 · Section 3 — "Three failures of the two-kingdom split"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 15.62, 32.43, 46.34, 62.72, 75.86, 88.49, 108.12]):
 *  0 title + underline
 *  1 the two boxes: Plantae | Animalia, caption "everything forced into 2 boxes"
 *  2 failure ① prokaryote/eukaryote: Bacteria tag arrows into Plantae
 *  3 failure ② unicellular/multicellular: alga & tree tag arrows into Plantae
 *  4 failure ③ photosynthetic/non-photosynthetic: Fungi tag arrows into Plantae
 *  5 Plantae re-stroked red — "the dustbin" caption (dims @7)
 *  6 zoom on Fungi: ring it + 3 fact chips (absorbs / chitin / no chlorophyll)
 *    + caption (dims @7)
 *  7 closing: patched in stages — Protista, Monera, then Whittaker
 *
 * Layout plan (measured ratios: Kalam bl−1.3s..+0.5s, Anek bl−0.78s..+0.31s):
 *  b0 | title (script23 red)         | T mid | x540  y56
 *  b0 | underline                    | Draw  | y72  x330..750
 *  b1 | caption (script16 ink)       | T mid | x540  y106  [dim@5]
 *  b1 | Plantae box                  | Draw  | x140..460  y126..190
 *  b1 | Animalia box                 | Draw  | x620..940  y126..190
 *  b1 | box labels (20 ink)          | T mid | cx300/780  y163
 *  b2 | badge① + text (script15 red) | -/T st| c(620,281) r16 · x650 y286
 *  b2 | "Bacteria" chip (14)         | Chip  | x170  y265  w110 h32
 *  b2 | arrow into Plantae           | Draw  | (225,265)→(220,195)
 *  b3 | badge② + text                | -/T st| c(620,346) r16 · x650 y351
 *  b3 | "alga & giant tree" chip(14) | Chip  | x170  y330  w210 h32
 *  b3 | arrow into Plantae           | Draw  | (300,330)→(300,195)
 *  b4 | badge③ + text                | -/T st| c(620,411) r16 · x650 y416
 *  b4 | "Fungi" chip (14)            | Chip  | x170  y395  w110 h32
 *  b4 | arrow into Plantae           | Draw  | (225,395)→(380,195)
 *  b5 | Plantae box re-stroked red   | Draw  | x140..460  y126..190
 *  b5 | "dustbin" caption (script17) | T mid | x540  y490  [dim@7]
 *  b6 | ring around "Fungi" chip     | Draw  | c(225,411) rx69 ry28
 *  b6 | 3 fact chips (14)            | Chip  | y515..551  x250/450/650  [dim@7]
 *  b6 | caption (script15 green)     | T mid | x540  y582  [dim@7]
 *  b7 | closing caption (script17)   | T mid | x540  y490
 *  b7 | underline                    | Draw  | y512  x250..830
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
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
} from "./kit";

const FAILURES: {
  beat: number;
  cy: number;
  badge: string;
  textEn: string;
  textHi: string;
  tagEn: string;
  tagHi: string;
  tagX: number;
  tagW: number;
  arrowFrom: [number, number];
  arrowTo: [number, number];
}[] = [
  {
    beat: 2,
    cy: 281,
    badge: "1",
    textEn: "no prokaryote/eukaryote split",
    textHi: "prokaryote/eukaryote split hi nahi",
    tagEn: "Bacteria",
    tagHi: "Bacteria",
    tagX: 170,
    tagW: 110,
    arrowFrom: [225, 265],
    arrowTo: [220, 195],
  },
  {
    beat: 3,
    cy: 346,
    badge: "2",
    textEn: "no unicellular/multicellular split",
    textHi: "unicellular/multicellular split hi nahi",
    tagEn: "alga & giant tree",
    tagHi: "alga & giant tree",
    tagX: 170,
    tagW: 210,
    arrowFrom: [300, 330],
    arrowTo: [300, 195],
  },
  {
    beat: 4,
    cy: 411,
    badge: "3",
    textEn: "no photo vs non-photo split",
    textHi: "photo vs non-photo split hi nahi",
    tagEn: "Fungi",
    tagHi: "Fungi",
    tagX: 170,
    tagW: 110,
    arrowFrom: [225, 395],
    arrowTo: [380, 195],
  },
];

export default function B11Ch02Sec3({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={56} size={23} fill={RED} script>
          {t("three cracks in the two-kingdom system", "two-kingdom system ki teen cracks")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 3)} d="M 330 72 C 430 68, 650 68, 750 72" stroke={RED} sw={2.2} dur={0.6} />

      {/* beat 1 — the two boxes everything got forced into */}
      <Fade on={beat >= 1} dim={beat >= 5} delay={dl(1, 0.3)}>
        <T x={540} y={106} size={16} fill={INK} script>
          {t("everything forced into just 2 boxes", "sab kuch sirf 2 boxes mein forced")}
        </T>
      </Fade>
      <Draw on={beat >= 1} delay={dl(1, 1.4)} d="M 140 126 h 320 v 64 h -320 z" stroke={INK} sw={2.4} dur={0.9} fill={CREAM} />
      <Draw on={beat >= 1} delay={dl(1, 2)} d="M 620 126 h 320 v 64 h -320 z" stroke={INK} sw={2.4} dur={0.9} fill={CREAM} />
      <Fade on={beat >= 1} delay={dl(1, 2.8)}>
        <T x={300} y={163} size={20} fill={INK} weight={700}>
          Plantae
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 3.2)}>
        <T x={780} y={163} size={20} fill={INK} weight={700}>
          Animalia
        </T>
      </Fade>

      {/* beats 2-4 — the three failures, each a badge + tag + arrow into Plantae */}
      {FAILURES.map((f) => (
        <React.Fragment key={f.badge}>
          <Fade on={beat >= f.beat} delay={dl(f.beat, 0.3)}>
            <circle cx={620} cy={f.cy} r={16} fill={RED} />
            <T x={620} y={f.cy + 5.5} size={16} fill={CREAM} weight={800}>
              {f.badge}
            </T>
          </Fade>
          <Fade on={beat >= f.beat} delay={dl(f.beat, 0.6)}>
            <T x={650} y={f.cy + 5} size={15} fill={RED} script anchor="start">
              {t(f.textEn, f.textHi)}
            </T>
          </Fade>
          <Fade on={beat >= f.beat} delay={dl(f.beat, 1.3)}>
            <Chip x={f.tagX} y={f.arrowFrom[1] - 16} w={f.tagW} h={32} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={14} script={false}>
              {t(f.tagEn, f.tagHi)}
            </Chip>
          </Fade>
          <Draw
            on={beat >= f.beat}
            delay={dl(f.beat, 2.2)}
            d={arrowD(f.arrowFrom[0], f.arrowFrom[1], f.arrowTo[0], f.arrowTo[1])}
            stroke={AMBER_DARK}
            sw={2}
            dur={0.5}
          />
        </React.Fragment>
      ))}

      {/* beat 5 — Plantae has become a dustbin */}
      <Draw on={beat >= 5} delay={dl(5, 0.3)} d="M 140 126 h 320 v 64 h -320 z" stroke={RED} sw={3.2} dur={0.9} />
      <Fade on={beat >= 5} dim={beat >= 7} delay={dl(5, 1.4)}>
        <T x={540} y={490} size={17} fill={RED} script>
          {t(
            "Plantae had become a dustbin — bacteria, algae, fungi, all crammed in",
            "Plantae ek dustbin ban gaya — bacteria, algae, fungi, sab crammed"
          )}
        </T>
      </Fade>

      {/* beat 6 — zoom on fungi: nothing plant-like except it doesn't move */}
      <Draw on={beat >= 6} delay={dl(6, 0.3)} d={ringD(225, 411, 69, 28)} stroke={GREEN} sw={2.2} dur={0.7} />
      <Fade on={beat >= 6} dim={beat >= 7} delay={dl(6, 1.2)}>
        <Chip x={250} y={515} w={180} h={36} fill={CREAM} stroke={GREEN} textFill={INK} size={14} script={false}>
          {t("absorbs food", "food absorb karta hai")}
        </Chip>
      </Fade>
      <Fade on={beat >= 6} dim={beat >= 7} delay={dl(6, 2)}>
        <Chip x={450} y={515} w={180} h={36} fill={CREAM} stroke={GREEN} textFill={INK} size={14} script={false}>
          {t("chitin, not cellulose", "chitin, cellulose nahi")}
        </Chip>
      </Fade>
      <Fade on={beat >= 6} dim={beat >= 7} delay={dl(6, 2.8)}>
        <Chip x={650} y={515} w={180} h={36} fill={CREAM} stroke={GREEN} textFill={INK} size={14} script={false}>
          {t("no chlorophyll", "chlorophyll nahi")}
        </Chip>
      </Fade>
      <Fade on={beat >= 6} dim={beat >= 7} delay={dl(6, 3.6)}>
        <T x={540} y={582} size={15} fill={GREEN} script>
          {t(
            "nothing plant-like — except it doesn't move",
            "kuch bhi plant-jaisa nahi — bas hilta nahi hai"
          )}
        </T>
      </Fade>

      {/* beat 7 — closing: patched in stages */}
      <Fade on={beat >= 7} delay={dl(7, 0.4)}>
        <T x={540} y={490} size={17} fill={GREEN} script>
          {t(
            "patched in stages: +Protista, +Monera, then Whittaker fixed it for good",
            "stages mein patch hua: +Protista, +Monera, phir Whittaker ne fix kiya"
          )}
        </T>
      </Fade>
      <Draw on={beat >= 7} delay={dl(7, 2.2)} d="M 250 512 C 350 508, 730 508, 830 512" stroke={GREEN} sw={2} dur={0.6} />
    </svg>
  );
}
