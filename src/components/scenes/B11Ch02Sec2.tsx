"use client";

/**
 * B11 Ch02 · Section 2 — "From morphology to five kingdoms"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 8.28, 20.65, 37.21, 51.88, 63.23, 73.05, 88.83]):
 *  0 title + underline
 *  1 timeline arrow drawn + 5 empty kingdom slots outlined (all empty)
 *  2 Aristotle callout (prelude — no formal kingdoms yet)
 *  3 Linnaeus label + Plantae/Animalia slots fill (Two-Kingdom, 2/5)
 *  4 Haeckel·1866 label + Protista slot fills + ring (3/5)
 *  5 "later workers" label + Monera slot fills + ring (4/5)
 *  6 Whittaker·1969 label + Fungi slot fills + ring (5/5) + box the row +
 *    "backbone of the whole chapter" caption
 *  7 closing: "subdivided, not discarded" caption + underline
 *
 * Layout plan (measured ratios: Kalam bl−1.3s..+0.5s, Anek bl−0.78s..+0.31s):
 *  b0 | title (script24 red)          | T mid | x540  y58   (bl58)
 *  b0 | underline                     | Draw  | y76  x340..740
 *  b1 | timeline arrow (muted)        | Draw  | y200  x100..930
 *  b1 | 5 empty slots (muted)         | Draw  | y320..372  x100/270/440/610/780 (w150)
 *  b2 | Aristotle note (script15 ink) | T mid | x540  y108
 *  b3 | "Linnaeus" (14 ink)           | T mid | x770  y155
 *  b3 | Plantae/Animalia chips (16)   | Chip  | y320..372  x610 / x780
 *  b4 | "Haeckel · 1866" (14 ink)     | T mid | x345  y155
 *  b4 | Protista chip (16)            | Chip  | y320..372  x270
 *  b4 | ring around Protista          | Draw  | c(345,346) rx89 ry38
 *  b5 | "Monera added" (14 ink)       | T mid | x175  y155
 *  b5 | Monera chip (16)              | Chip  | y320..372  x100
 *  b5 | ring around Monera            | Draw  | c(175,346) rx89 ry38
 *  b6 | "Whittaker · 1969" (14 ink)   | T mid | x515  y155
 *  b6 | Fungi chip (16)               | Chip  | y320..372  x440
 *  b6 | ring around Fungi             | Draw  | c(515,346) rx89 ry38
 *  b6 | box around full row           | Draw  | x90..940  y310..382
 *  b6 | "backbone" caption (script18) | T mid | x540  y500  (bl500)
 *  b7 | closing caption (script17)    | T mid | x540  y550
 *  b7 | underline                     | Draw  | y572  x310..770
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

const SLOTS: { x: number; cx: number; name: string }[] = [
  { x: 100, cx: 175, name: "Monera" },
  { x: 270, cx: 345, name: "Protista" },
  { x: 440, cx: 515, name: "Fungi" },
  { x: 610, cx: 685, name: "Plantae" },
  { x: 780, cx: 855, name: "Animalia" },
];
const SLOT_Y = 320;
const SLOT_W = 150;
const SLOT_H = 52;

export default function B11Ch02Sec2({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={58} size={24} fill={RED} script>
          {t("how the five kingdoms were built", "paanch kingdoms kaise bane")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 340 76 C 440 72, 640 72, 740 76" stroke={RED} sw={2.2} dur={0.6} />

      {/* beat 1 — the timeline arrow + 5 empty kingdom slots */}
      <Draw on={beat >= 1} delay={dl(1, 0.3)} d={arrowD(100, 200, 930, 200)} stroke={MUTED} sw={2} dur={0.8} />
      {SLOTS.map((s, i) => (
        <Draw
          key={`slot${s.name}`}
          on={beat >= 1}
          delay={dl(1, 1.3 + i * 0.5)}
          d={`M ${s.x} ${SLOT_Y} h ${SLOT_W} v ${SLOT_H} h ${-SLOT_W} z`}
          stroke={MUTED}
          sw={1.8}
          dur={0.6}
        />
      ))}

      {/* beat 2 — Aristotle, the prelude (no formal kingdoms yet) */}
      <Fade on={beat >= 2} delay={dl(2, 0.4)}>
        <T x={540} y={108} size={15} fill={INK} script>
          {t(
            "Aristotle: plants by form, animals by blood",
            "Aristotle: plants ko form se, animals ko blood se"
          )}
        </T>
      </Fade>

      {/* beat 3 — Linnaeus, Two-Kingdom */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={770} y={155} size={14} fill={INK} weight={700}>
          Linnaeus
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 1.2)}>
        <Chip x={610} y={SLOT_Y} w={SLOT_W} h={SLOT_H} fill={INK} textFill={CREAM} size={16} script={false}>
          Plantae
        </Chip>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 2.1)}>
        <Chip x={780} y={SLOT_Y} w={SLOT_W} h={SLOT_H} fill={INK} textFill={CREAM} size={16} script={false}>
          Animalia
        </Chip>
      </Fade>

      {/* beat 4 — Haeckel 1866, +Protista */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={345} y={155} size={14} fill={INK} weight={700}>
          Haeckel · 1866
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.2)}>
        <Chip x={270} y={SLOT_Y} w={SLOT_W} h={SLOT_H} fill={INK} textFill={CREAM} size={16} script={false}>
          Protista
        </Chip>
      </Fade>
      <Draw on={beat >= 4} delay={dl(4, 2.1)} d={ringD(345, 346, 89, 38)} stroke={GREEN} sw={2.4} dur={0.7} />

      {/* beat 5 — later workers, +Monera */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={175} y={155} size={14} fill={INK} weight={700}>
          {t("Monera added", "Monera add hua")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1.2)}>
        <Chip x={100} y={SLOT_Y} w={SLOT_W} h={SLOT_H} fill={INK} textFill={CREAM} size={16} script={false}>
          Monera
        </Chip>
      </Fade>
      <Draw on={beat >= 5} delay={dl(5, 2.1)} d={ringD(175, 346, 89, 38)} stroke={GREEN} sw={2.4} dur={0.7} />

      {/* beat 6 — Whittaker 1969, +Fungi: the five-kingdom system lands */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={515} y={155} size={14} fill={INK} weight={700}>
          Whittaker · 1969
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1.2)}>
        <Chip x={440} y={SLOT_Y} w={SLOT_W} h={SLOT_H} fill={INK} textFill={CREAM} size={16} script={false}>
          Fungi
        </Chip>
      </Fade>
      <Draw on={beat >= 6} delay={dl(6, 2.1)} d={ringD(515, 346, 89, 38)} stroke={GREEN} sw={2.4} dur={0.7} />
      <Draw
        on={beat >= 6}
        delay={dl(6, 3.2)}
        d="M 90 310 h 850 v 72 h -850 z"
        stroke={GREEN}
        sw={2.2}
        dur={0.9}
      />
      <Fade on={beat >= 6} delay={dl(6, 4.3)}>
        <T x={540} y={500} size={18} fill={GREEN} script>
          {t(
            "five kingdoms — the backbone of the whole chapter",
            "paanch kingdoms — poore chapter ki backbone"
          )}
        </T>
      </Fade>

      {/* beat 7 — closing: subdivided, never discarded */}
      <Fade on={beat >= 7} delay={dl(7, 0.4)}>
        <T x={540} y={550} size={17} fill={INK} script>
          {t(
            "each step only subdivided — nothing was thrown away",
            "har step sirf subdivide karta hai — kuch discard nahi hota"
          )}
        </T>
      </Fade>
      <Draw on={beat >= 7} delay={dl(7, 2)} d="M 310 572 C 400 568, 680 568, 770 572" stroke={INK} sw={2} dur={0.6} />
    </svg>
  );
}
