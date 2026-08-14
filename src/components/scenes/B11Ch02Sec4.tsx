"use client";

/**
 * B11 Ch02 · Section 4 — "The five yardsticks for a kingdom"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 10.5, 28.16, 49.75, 70.57, 83.97, 107.35, 119.81]):
 *  0 title + underline
 *  1 yardstick spine drawn + criterion ① cell structure
 *  2 criterion ② body organisation
 *  3 criterion ③ mode of nutrition
 *  4 criterion ④ reproduction
 *  5 criterion ⑤ phylogenetic relationships
 *  6 recap: ring + recolour ① (deepest) and ⑤ (the sneaky one)
 *  7 closing (story band): applied together, never singly + example
 *
 * Layout plan (measured ratios: Kalam bl−1.3s..+0.5s, Anek bl−0.78s..+0.31s):
 *  b0 | title (script24 red)        | T mid | x540  y56
 *  b0 | underline                   | Draw  | y74  x330..750
 *  b1 | spine                       | Draw  | x100  y275..555
 *  b1 | badge① (r15) + label/detail | -/T st| c(100,285) · x138 y280/302
 *  b2 | badge② + label/detail       | -/T st| c(100,350) · x138 y345/367
 *  b3 | badge③ + label/detail       | -/T st| c(100,415) · x138 y410/432
 *  b4 | badge④ + label/detail       | -/T st| c(100,480) · x138 y475/497
 *  b5 | badge⑤ + label/detail       | -/T st| c(100,545) · x138 y540/562
 *  b6 | ring ①                      | Draw  | c(100,285) rx24 ry21
 *  b6 | ring ⑤                      | Draw  | c(100,545) rx24 ry21
 *  b6 | ①⑤ labels recolour to green | (dynamic fill on beat>=6, no new els)
 *  b7 | caption (script17 green)    | T mid | x540  y110
 *  b7 | example (script14 muted)    | T mid | x540  y148
 *  b7 | underline                   | Draw  | y162  x300..780
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, ringD, INK, MUTED, GREEN, RED, CREAM } from "./kit";

const ROWS: {
  beat: number;
  cy: number;
  n: string;
  labelEn: string;
  labelHi: string;
  detailEn: string;
  detailHi: string;
  highlight?: boolean;
}[] = [
  {
    beat: 1,
    cy: 285,
    n: "1",
    labelEn: "cell structure",
    labelHi: "cell structure",
    detailEn: "prokaryotic vs eukaryotic — no nucleus, or a true one",
    detailHi: "prokaryotic vs eukaryotic — nucleus nahi, ya real nucleus",
    highlight: true,
  },
  {
    beat: 2,
    cy: 350,
    n: "2",
    labelEn: "body organisation",
    labelHi: "body organisation",
    detailEn: "single- or many-celled; loose thallus or true tissues",
    detailHi: "single- ya many-celled; loose thallus ya true tissues",
  },
  {
    beat: 3,
    cy: 415,
    n: "3",
    labelEn: "mode of nutrition",
    labelHi: "mode of nutrition",
    detailEn: "autotrophic (self-fed) vs heterotrophic (fed by others)",
    detailHi: "autotrophic (khud banata) vs heterotrophic (doosron se)",
  },
  {
    beat: 4,
    cy: 480,
    n: "4",
    labelEn: "reproduction",
    labelHi: "reproduction",
    detailEn: "asexual & sexual methods, differ by group",
    detailHi: "asexual aur sexual methods, group se group alag",
  },
  {
    beat: 5,
    cy: 545,
    n: "5",
    labelEn: "phylogenetic relationships",
    labelHi: "phylogenetic relationships",
    detailEn: "shared evolutionary ancestry, not just looks",
    detailHi: "shared evolutionary ancestry, sirf looks nahi",
    highlight: true,
  },
];

export default function B11Ch02Sec4({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={56} size={24} fill={RED} script>
          {t("Whittaker's five yardsticks", "Whittaker ke paanch yardsticks")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 330 74 C 430 70, 650 70, 750 74" stroke={RED} sw={2.2} dur={0.6} />

      {/* beats 1-5 — the spine + five criteria */}
      <Draw on={beat >= 1} delay={dl(1, 0.3)} d="M 100 275 L 100 555" stroke={MUTED} sw={2.2} dur={1.1} />
      {ROWS.map((r) => (
        <React.Fragment key={r.n}>
          <Fade on={beat >= r.beat} delay={dl(r.beat, 1)}>
            <circle cx={100} cy={r.cy} r={15} fill={INK} />
            <T x={100} y={r.cy + 5.5} size={15} fill={CREAM} weight={800}>
              {r.n}
            </T>
          </Fade>
          <Fade on={beat >= r.beat} delay={dl(r.beat, 1.5)}>
            <T x={138} y={r.cy - 5} size={16} fill={r.highlight && beat >= 6 ? GREEN : INK} anchor="start" weight={700}>
              {t(r.labelEn, r.labelHi)}
            </T>
          </Fade>
          <Fade on={beat >= r.beat} delay={dl(r.beat, 2)}>
            <T x={138} y={r.cy + 17} size={13} fill={MUTED} anchor="start">
              {t(r.detailEn, r.detailHi)}
            </T>
          </Fade>
        </React.Fragment>
      ))}

      {/* beat 6 — recap: ring the deepest and the sneaky one */}
      <Draw on={beat >= 6} delay={dl(6, 0.3)} d={ringD(100, 285, 24, 21)} stroke={GREEN} sw={2.2} dur={0.7} />
      <Draw on={beat >= 6} delay={dl(6, 1.2)} d={ringD(100, 545, 24, 21)} stroke={GREEN} sw={2.2} dur={0.7} />

      {/* beat 7 — closing, in the freed story band */}
      <Fade on={beat >= 7} delay={dl(7, 0.4)}>
        <T x={540} y={110} size={17} fill={GREEN} script>
          {t(
            "applied together — never singly",
            "sabko saath mein apply karo — akela nahi"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.6)}>
        <T x={540} y={148} size={14} fill={MUTED} script>
          {t(
            "loses photosynthesis? the other 4 still place it",
            "photosynthesis chala gaya? baaki 4 se phir bhi pata chalega"
          )}
        </T>
      </Fade>
      <Draw on={beat >= 7} delay={dl(7, 2.8)} d="M 300 162 C 400 158, 680 158, 780 162" stroke={GREEN} sw={2} dur={0.6} />
    </svg>
  );
}
