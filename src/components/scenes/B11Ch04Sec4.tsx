"use client";

/**
 * B11 Ch04 · Section 4 — "Reading the left branch: the ten non-chordate phyla"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 14.25, 30.04, 47.79, 66.48, 86.02, 103.6, 119.3]):
 *  0 title (always-on) + drawn underline · hook: 10 phyla, a ladder not a list
 *  1 table framework: 4 column headers (PHYLUM/GRADE/SIGNATURE/EXAMPLE) + divider
 *  2 rungs 1-2: Porifera, Coelenterata
 *  3 rungs 3-4: Ctenophora, Platyhelminthes
 *  4 rungs 5-6: Aschelminthes, Annelida
 *  5 rungs 7-8: Arthropoda, Mollusca
 *  6 rungs 9-10: Echinodermata, Hemichordata
 *  7 closing line: not ONE of the ten ever develops a notochord + SIGNATURE banner
 *
 * Layout plan (Kalam bl−1.3s..+0.5s, Anek bl−0.78s..+0.31s):
 *  b0 | title (script23 red)          | T mid  | x?..?  y30..62  (bl54)
 *  b0 | underline swoosh              | Draw   | y68  x400..680
 *  b0 | hook (script13 muted)         | T mid  | x?..?  y86..99  (bl92) [dim@1]
 *  b1 | 4 column headers              | T st   | y110..122 (bl120), x44/225/355/765
 *  b1 | header divider                | Draw   | y132  x40..1030
 *  b2..b6 | rung tick + 4 cells ×2    | Draw/T | x36..1030  rowY(i)=152+34i (bl)
 *  b7 | underline                     | Draw   | y480  x100..980
 *  b7 | summary line                  | T mid  | x?..?  y494..510 (bl502)
 *  b7 | outer emphasis box            | Draw   | x150..930 y522..558
 *  b7 | SIGNATURE chip                | Chip   | x155..925 y528..552
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
  INK,
  MUTED,
  AMBER,
  AMBER_DARK,
  RED,
  CREAM,
} from "./kit";

const ROWS: { phylum: string; grade: string; sig: string; ex: string }[] = [
  { phylum: "1. Porifera", grade: "Cellular", sig: "canal system moves water", ex: "Sycon" },
  { phylum: "2. Coelenterata", grade: "Tissue", sig: "cnidoblasts — stinging cells", ex: "Hydra" },
  { phylum: "3. Ctenophora", grade: "Tissue", sig: "8 rows of comb plates", ex: "Pleurobrachia" },
  { phylum: "4. Platyhelminthes", grade: "Organ", sig: "flame cells, no body cavity", ex: "Taenia" },
  { phylum: "5. Aschelminthes", grade: "Organ-sys", sig: "pseudocoelom (not fully lined)", ex: "Ascaris" },
  { phylum: "6. Annelida", grade: "Organ-sys", sig: "true segments, closed circulation", ex: "Pheretima" },
  { phylum: "7. Arthropoda", grade: "Organ-sys", sig: "jointed legs — largest phylum", ex: "Apis" },
  { phylum: "8. Mollusca", grade: "Organ-sys", sig: "radula + shell", ex: "Pila" },
  { phylum: "9. Echinodermata", grade: "Organ-sys", sig: "water vascular system", ex: "Asterias" },
  { phylum: "10. Hemichordata", grade: "Organ-sys", sig: "excretion by proboscis gland", ex: "Balanoglossus" },
];

const ROW_Y = (i: number) => 152 + i * 34;
const BEAT_FOR_ROW = (i: number) => 2 + Math.floor(i / 2); // rows 0,1->b2; 2,3->b3; ...

export default function B11Ch04Sec4({ currentTime, reveals, language }: SceneProps) {
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
      {/* title — always on */}
      <Fade on={true}>
        <T x={540} y={54} size={23} fill={RED} script>
          {t("Non-Chordata: Climbing the Ladder", "Non-Chordata: Ladder Chadhna")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 0.3)} d="M 400 68 C 460 65, 620 65, 680 68" stroke={RED} sw={2.2} dur={0.6} />
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 1.2)}>
        <T x={540} y={92} size={13} fill={MUTED} script>
          {t("10 phyla — a ladder of rising complexity, not a random list", "10 phyla — badhti complexity ki ladder, random list nahi")}
        </T>
      </Fade>

      {/* beat 1 — table framework */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={44} y={120} size={12} fill={INK} weight={700} anchor="start" script={false}>
          {t("PHYLUM", "PHYLUM")}
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 0.6)}>
        <T x={225} y={120} size={12} fill={INK} weight={700} anchor="start" script={false}>
          {t("GRADE", "GRADE")}
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 0.9)}>
        <T x={355} y={120} size={12} fill={INK} weight={700} anchor="start" script={false}>
          {t("SIGNATURE", "SIGNATURE")}
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1.2)}>
        <T x={765} y={120} size={12} fill={INK} weight={700} anchor="start" script={false}>
          {t("EXAMPLE", "EXAMPLE")}
        </T>
      </Fade>
      <Draw on={beat >= 1} delay={dl(1, 1.6)} d="M 40 132 L 1030 132" stroke={INK} sw={1.6} dur={0.6} />

      {/* beats 2-6 — the ten rows, two per beat */}
      {ROWS.map((row, i) => {
        const k = BEAT_FOR_ROW(i);
        const withinBeat = i % 2; // 0 = first row of the pair, 1 = second
        const base = withinBeat * 1.6;
        const y = ROW_Y(i);
        return (
          <React.Fragment key={i}>
            <Draw
              on={beat >= k}
              delay={dl(k, base + 0.1)}
              d={`M 36 ${y - 4} L 50 ${y - 4}`}
              stroke={AMBER}
              sw={2.4}
              dur={0.3}
            />
            <Fade on={beat >= k} delay={dl(k, base + 0.4)}>
              <T x={62} y={y} size={12} fill={INK} anchor="start" script={false}>
                {row.phylum}
              </T>
            </Fade>
            <Fade on={beat >= k} delay={dl(k, base + 0.6)}>
              <T x={225} y={y} size={11} fill={AMBER_DARK} anchor="start" script={false}>
                {row.grade}
              </T>
            </Fade>
            <Fade on={beat >= k} delay={dl(k, base + 0.8)}>
              <T x={355} y={y} size={11} fill={INK} anchor="start" script={false}>
                {row.sig}
              </T>
            </Fade>
            <Fade on={beat >= k} delay={dl(k, base + 1)}>
              <T x={765} y={y} size={11} fill={MUTED} anchor="start" script>
                {row.ex}
              </T>
            </Fade>
          </React.Fragment>
        );
      })}

      {/* beat 7 — closing line + SIGNATURE banner */}
      <Draw on={beat >= 7} delay={dl(7, 0.2)} d="M 100 480 C 300 476, 780 476, 980 480" stroke={AMBER_DARK} sw={1.8} dur={0.7} />
      <Fade on={beat >= 7} delay={dl(7, 1)}>
        <T x={540} y={502} size={13} fill={AMBER_DARK} script>
          {t(
            "whatever the grade, whatever the signature — NOT ONE ever develops a notochord",
            "grade kuch bhi ho, signature kuch bhi ho — koi bhi notochord kabhi nahi banata"
          )}
        </T>
      </Fade>
      <Draw
        on={beat >= 7}
        delay={dl(7, 2)}
        d="M 150 522 h 780 q 8 0 8 8 v 20 q 0 8 -8 8 h -780 q -8 0 -8 -8 v -20 q 0 -8 8 -8"
        stroke={RED}
        sw={2}
        dur={0.7}
      />
      <Fade on={beat >= 7} delay={dl(7, 2.8)}>
        <Chip x={155} y={528} w={770} h={24} fill={INK} textFill={CREAM} size={12} script={false}>
          {t("SIGNATURE: ten phyla, one shared negative — no notochord, ever", "SIGNATURE: das phyla, ek shared negative — notochord kabhi nahi")}
        </Chip>
      </Fade>
    </svg>
  );
}
