"use client";

/**
 * B11 Ch02 · Section 11 — "Pitfalls and the placement decision tree"
 * (tips — closes subtopic 1) Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0, 11.09, 32.85, 49.83, 63.66, 84.05, 95.49, 104.36]):
 *  0 title
 *  1 pitfall ① refined, not discarded
 *  2 pitfall ② kingdoms ≠ domains
 *  3 pitfall ③ don't drop phylogeny
 *  4 pitfall ④ five kingdoms aren't flawless
 *  5 the decision tree: ROOT question appears
 *  6 step 1: prokaryote? yes→Monera(done), no→eukaryote→step 2 box
 *  7 step 2: food & wall fan out to Plantae / Fungi / Animalia / Protista
 *
 * Layout plan:
 *  b0 | title (script18 red)         | T mid | x540  y52
 *  b1-4| badge + text (12, one line) | -/T st| c(70,y) r12 · x92 y+4, rows y95/128/161/194
 *  b5 | ROOT box "prokaryote?" (ink) | Draw  | x440..640  y270..318
 *  b5 | tree caption (script14 green)| T mid | x540  y245
 *  b6 | arrow yes→Monera + Monera box| Draw/Chip | (640,294)→(855,294) · x860 y270 w140 h48
 *  b6 | "yes"/"done ✓"               | T     | x750 y285 / x930 y318
 *  b6 | arrow no→STEP2 + STEP2 box   | Draw/Draw | (540,318)→(540,385) · x400 y390 w280 h48
 *  b6 | "no"                         | T     | x558 y352
 *  b7 | 4 fan arrows                 | Draw  | (540,438)→(175/405/635/865,500)
 *  b7 | 4 condition labels (11)      | T mid | y462  x175/405/635/865
 *  b7 | 4 outcome boxes (Chip)       | Chip  | y500  h48  w170  x90/320/550/780
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, INK, MUTED, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

const PITFALLS: { cy: number; en: string; hi: string }[] = [
  {
    cy: 95,
    en: "“refined” not “discarded” — the two-kingdom system wasn't wrong, just insufficient",
    hi: "“refined” bolo, “discarded” nahi — two-kingdom galat nahi tha, bas kam tha",
  },
  {
    cy: 128,
    en: "kingdoms (Whittaker, 5) ≠ domains (Woese, 3) — domains sit above, don't replace",
    hi: "kingdoms (Whittaker, 5) ≠ domains (Woese, 3) — domains upar hain, replace nahi karte",
  },
  {
    cy: 161,
    en: "don't drop phylogeny — the criterion everyone forgets",
    hi: "phylogeny mat chhodo — sabse zyada bhoola jaane wala criterion",
  },
  {
    cy: 194,
    en: "five kingdoms aren't flawless: Monera/Protista heterogeneous, viruses excluded",
    hi: "paanch kingdoms perfect nahi: Monera/Protista heterogeneous, viruses excluded",
  },
];

const OUTCOMES: { x: number; cx: number; name: string; condEn: string; condHi: string }[] = [
  { x: 90, cx: 175, name: "Plantae", condEn: "own food, cellulose wall", condHi: "khud food, cellulose wall" },
  { x: 320, cx: 405, name: "Fungi", condEn: "absorbs food, chitin wall", condHi: "food absorb, chitin wall" },
  { x: 550, cx: 635, name: "Animalia", condEn: "ingests food, no wall", condHi: "food ingest, wall nahi" },
  { x: 780, cx: 865, name: "Protista", condEn: "single-celled, none of these", condHi: "single-celled, in mein se koi nahi" },
];

export default function B11Ch02Sec11({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={52} size={18} fill={RED} script>
          {t("pitfalls + the placement decision tree", "pitfalls + placement decision tree")}
        </T>
      </Fade>

      {/* beats 1-4 — the four pitfalls */}
      {PITFALLS.map((p, i) => (
        <Fade key={p.cy} on={beat >= 1 + i} delay={dl(1 + i, 0.3)}>
          <circle cx={70} cy={p.cy} r={12} fill={RED} />
          <T x={70} y={p.cy + 4.5} size={12} fill={CREAM} weight={800}>
            {i + 1}
          </T>
          <T x={92} y={p.cy + 4} size={12} fill={INK} anchor="start" script>
            {t(p.en, p.hi)}
          </T>
        </Fade>
      ))}

      {/* beat 5 — the decision tree intro */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={540} y={245} size={14} fill={GREEN} script>
          {t("the speed tool — run any organism top to bottom", "speed tool — kisi bhi organism ko top se bottom chalao")}
        </T>
      </Fade>
      <Draw on={beat >= 5} delay={dl(5, 1.2)} d="M 440 270 h 200 v 48 h -200 z" stroke={INK} sw={2.4} dur={0.8} fill={CREAM} />
      <Fade on={beat >= 5} delay={dl(5, 2)}>
        <T x={540} y={299} size={15} fill={INK} weight={700}>
          {t("prokaryote?", "prokaryote?")}
        </T>
      </Fade>

      {/* beat 6 — step 1: yes → Monera, no → eukaryote → step 2 */}
      <Draw on={beat >= 6} delay={dl(6, 0.3)} d="M 640 294 L 855 294" stroke={GREEN} sw={2.2} dur={0.5} />
      <Fade on={beat >= 6} delay={dl(6, 0.9)}>
        <T x={748} y={285} size={12} fill={GREEN} weight={700}>
          {t("yes", "haan")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1.3)}>
        <Chip x={860} y={270} w={140} h={48} fill={INK} textFill={CREAM} size={15} script={false}>
          Monera
        </Chip>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 2)}>
        <T x={930} y={332} size={11} fill={GREEN} weight={700}>
          {t("done ✓", "done ✓")}
        </T>
      </Fade>
      <Draw on={beat >= 6} delay={dl(6, 2.5)} d="M 540 318 L 540 385" stroke={RED} sw={2.2} dur={0.5} />
      <Fade on={beat >= 6} delay={dl(6, 3.1)}>
        <T x={560} y={352} size={12} fill={RED} weight={700} anchor="start">
          {t("no → eukaryote", "nahi → eukaryote")}
        </T>
      </Fade>
      <Draw on={beat >= 6} delay={dl(6, 3.6)} d="M 400 390 h 280 v 48 h -280 z" stroke={INK} sw={2.4} dur={0.7} fill={CREAM} />
      <Fade on={beat >= 6} delay={dl(6, 4.4)}>
        <T x={540} y={419} size={14} fill={INK} weight={700}>
          {t("food & wall?", "food & wall?")}
        </T>
      </Fade>

      {/* beat 7 — step 2: fan out to the four kingdoms */}
      {OUTCOMES.map((o, i) => (
        <Draw
          key={`arrow${o.name}`}
          on={beat >= 7}
          delay={dl(7, 0.2 + i * 0.25)}
          d={`M 540 438 L ${o.cx} 500`}
          stroke={AMBER_DARK}
          sw={1.8}
          dur={0.4}
        />
      ))}
      {OUTCOMES.map((o, i) => (
        <Fade key={`cond${o.name}`} on={beat >= 7} delay={dl(7, 1.3 + i * 0.2)}>
          <T x={o.cx} y={465} size={11} fill={MUTED} anchor="middle">
            {t(o.condEn, o.condHi)}
          </T>
        </Fade>
      ))}
      {OUTCOMES.map((o, i) => (
        <Fade key={`box${o.name}`} on={beat >= 7} delay={dl(7, 2.2 + i * 0.2)}>
          <Chip x={o.x} y={500} w={170} h={48} fill={INK} textFill={CREAM} size={15} script={false}>
            {o.name}
          </Chip>
        </Fade>
      ))}
    </svg>
  );
}
