"use client";

/**
 * B11 Ch02 · Section 5 — "The single most useful table in the chapter"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 10.24, 25.0, 38.74, 51.2, 60.42, 74.84, 88.15]):
 *  0 title
 *  1 grid drawn + 5 kingdom headers + 5 characteristic row-headers (empty cells)
 *  2 row "cell type" fills all 5 cols (Monera=Prokaryotic red, rest Eukaryotic)
 *  3 row "nuclear membrane" fills all 5 (Monera=Absent red, rest Present green)
 *  4 ring "cell wall" + "nutrition" row-headers — the next 2 clues
 *  5 "cell wall"+"nutrition" fill for Fungi/Plantae/Animalia
 *  6 "cell wall"+"nutrition" fill for Protista+Monera, "body organisation" fills all 5
 *  7 green box around the whole table + closing caption (story band)
 *
 * Layout plan (measured ratios: Anek bl−0.78s..+0.31s):
 *  b0 | title (script22 red)         | T mid | x540  y56
 *  b1 | grid                         | Draw  | x90..985  y150..470 (6×6, col0 w170, rows h40/56×5)
 *  b1 | kingdom headers (15 ink)     | T mid | y170  x333/478/623/768/913
 *  b1 | row headers (13 ink, start)  | T st  | x100  y218/274/330/386/442
 *  b2 | row1 data (13)               | T mid | y223  x333..913
 *  b2 | caption slot (script15 red)  | T mid | x540  y495  [dim@3]
 *  b3 | row3 data (13)               | T mid | y335  x333..913
 *  b3 | caption slot (script15 red)  | T mid | x540  y495  [dim@4]
 *  b4 | ring "cell wall" header      | Draw  | c(129,274) rx32 ry16
 *  b4 | ring "nutrition" header      | Draw  | c(129,442) rx32 ry16
 *  b4 | caption slot (script15 ink)  | T mid | x540  y495  [dim@6]
 *  b5 | row2/row5 (Fungi/Plantae/Animalia) | T mid | y279/447  x623/768/913
 *  b6 | row2/row5 (Protista/Monera)  | T mid | y279/447  x333/478
 *  b6 | row4 data (13)               | T mid | y391  x333..913
 *  b6 | caption slot (script15 green)| T mid | x540  y495  [dim@7]
 *  b7 | box around whole table       | Draw  | x80..995  y140..480
 *  b7 | closing caption (script17)   | T mid | x540  y110 (story band)
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, ringD, INK, AMBER_DARK, GREEN, RED } from "./kit";

const COL_X = [333, 478, 623, 768, 913];
const KINGDOMS = ["Monera", "Protista", "Fungi", "Plantae", "Animalia"];
const ROW_Y = { header: 170, r1: 218, r2: 274, r3: 330, r4: 386, r5: 442 };
const TABLE_X0 = 90;
const TABLE_X1 = 985;
const COL_DIVS = [260, 405, 550, 695, 840];
const ROW_DIVS = [190, 246, 302, 358, 414];

const ROW1 = { text: ["Prokaryotic", "Eukaryotic", "Eukaryotic", "Eukaryotic", "Eukaryotic"], color: [RED, INK, INK, INK, INK] };
const ROW3 = { text: ["Absent", "Present", "Present", "Present", "Present"], color: [RED, GREEN, GREEN, GREEN, GREEN] };
const ROW2 = { text: ["non-cellulosic", "variable", "chitin", "cellulose", "absent"], color: [INK, INK, INK, INK, INK] };
const ROW5 = { text: ["auto+hetero", "auto+hetero", "heterotroph", "autotroph", "heterotroph"], color: [AMBER_DARK, AMBER_DARK, AMBER_DARK, GREEN, AMBER_DARK] };
const ROW4 = { text: ["cellular", "cellular", "multicellular", "tissue", "tissue/organ"], color: [INK, INK, INK, INK, INK] };

function gridPath(): string {
  let d = `M ${TABLE_X0} 150 H ${TABLE_X1} V 470 H ${TABLE_X0} Z`;
  for (const x of COL_DIVS) d += ` M ${x} 150 V 470`;
  for (const y of ROW_DIVS) d += ` M ${TABLE_X0} ${y} H ${TABLE_X1}`;
  return d;
}

export default function B11Ch02Sec5({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={56} size={22} fill={RED} script>
          {t("the single most useful table in the chapter", "chapter ki sabse useful table")}
        </T>
      </Fade>

      {/* beat 1 — the grid + headers */}
      <Draw on={beat >= 1} delay={dl(1, 0.3)} d={gridPath()} stroke={INK} sw={2} dur={1.2} />
      {KINGDOMS.map((k, i) => (
        <Fade key={k} on={beat >= 1} delay={dl(1, 1.6 + i * 0.15)}>
          <T x={COL_X[i]} y={ROW_Y.header + 5} size={15} fill={INK} weight={700}>
            {k}
          </T>
        </Fade>
      ))}
      {[
        ["cell type", ROW_Y.r1],
        ["cell wall", ROW_Y.r2],
        ["nuclear membrane", ROW_Y.r3],
        ["body organisation", ROW_Y.r4],
        ["nutrition", ROW_Y.r5],
      ].map(([label, y], i) => (
        <Fade key={label as string} on={beat >= 1} delay={dl(1, 2.4 + i * 0.15)}>
          <T x={100} y={(y as number) + 5} size={13} fill={INK} anchor="start" weight={700}>
            {label}
          </T>
        </Fade>
      ))}

      {/* beat 2 — cell type row: splits Monera off */}
      {ROW1.text.map((v, i) => (
        <Fade key={`r1-${i}`} on={beat >= 2} delay={dl(2, 0.3 + i * 0.2)}>
          <T x={COL_X[i]} y={ROW_Y.r1 + 5} size={13} fill={ROW1.color[i]}>
            {v}
          </T>
        </Fade>
      ))}
      <Fade on={beat >= 2} dim={beat >= 3} delay={dl(2, 1.6)}>
        <T x={540} y={495} size={15} fill={RED} script>
          {t("row 1 alone splits Monera off", "row 1 hi Monera ko alag kar deta hai")}
        </T>
      </Fade>

      {/* beat 3 — nuclear membrane row: the fastest single test */}
      {ROW3.text.map((v, i) => (
        <Fade key={`r3-${i}`} on={beat >= 3} delay={dl(3, 0.3 + i * 0.2)}>
          <T x={COL_X[i]} y={ROW_Y.r3 + 5} size={13} fill={ROW3.color[i]}>
            {v}
          </T>
        </Fade>
      ))}
      <Fade on={beat >= 3} dim={beat >= 4} delay={dl(3, 1.6)}>
        <T x={540} y={495} size={15} fill={RED} script>
          {t("fastest test: nuclear membrane present?", "fastest test: nuclear membrane hai kya?")}
        </T>
      </Fade>

      {/* beat 4 — the next two clues, once it's a eukaryote */}
      <Draw on={beat >= 4} delay={dl(4, 0.3)} d={ringD(129, 274, 32, 16)} stroke={AMBER_DARK} sw={2} dur={0.6} />
      <Draw on={beat >= 4} delay={dl(4, 0.9)} d={ringD(129, 442, 32, 16)} stroke={AMBER_DARK} sw={2} dur={0.6} />
      <Fade on={beat >= 4} dim={beat >= 6} delay={dl(4, 1.6)}>
        <T x={540} y={495} size={15} fill={INK} script>
          {t("eukaryote? 2 more clues: wall + nutrition", "eukaryote hai? 2 aur clues: wall + nutrition")}
        </T>
      </Fade>

      {/* beat 5 — wall + nutrition for Fungi, Plantae, Animalia */}
      {[2, 3, 4].map((i, k) => (
        <React.Fragment key={`b5-${i}`}>
          <Fade on={beat >= 5} delay={dl(5, 0.3 + k * 0.3)}>
            <T x={COL_X[i]} y={ROW_Y.r2 + 5} size={13} fill={ROW2.color[i]}>
              {ROW2.text[i]}
            </T>
          </Fade>
          <Fade on={beat >= 5} delay={dl(5, 1.4 + k * 0.3)}>
            <T x={COL_X[i]} y={ROW_Y.r5 + 5} size={13} fill={ROW5.color[i]}>
              {ROW5.text[i]}
            </T>
          </Fade>
        </React.Fragment>
      ))}

      {/* beat 6 — Protista + Monera fill in, and the rest of the table (body organisation) */}
      {[1, 0].map((i, k) => (
        <React.Fragment key={`b6-${i}`}>
          <Fade on={beat >= 6} delay={dl(6, 0.3 + k * 0.3)}>
            <T x={COL_X[i]} y={ROW_Y.r2 + 5} size={13} fill={ROW2.color[i]}>
              {ROW2.text[i]}
            </T>
          </Fade>
          <Fade on={beat >= 6} delay={dl(6, 1 + k * 0.3)}>
            <T x={COL_X[i]} y={ROW_Y.r5 + 5} size={13} fill={ROW5.color[i]}>
              {ROW5.text[i]}
            </T>
          </Fade>
        </React.Fragment>
      ))}
      {ROW4.text.map((v, i) => (
        <Fade key={`r4-${i}`} on={beat >= 6} delay={dl(6, 1.8 + i * 0.2)}>
          <T x={COL_X[i]} y={ROW_Y.r4 + 5} size={13} fill={ROW4.color[i]}>
            {v}
          </T>
        </Fade>
      ))}
      <Fade on={beat >= 6} dim={beat >= 7} delay={dl(6, 3)}>
        <T x={540} y={495} size={15} fill={GREEN} script>
          {t("Protista = the eukaryote leftovers", "Protista = bache hue eukaryotes")}
        </T>
      </Fade>

      {/* beat 7 — closing: memorise this table */}
      <Draw on={beat >= 7} delay={dl(7, 0.3)} d="M 80 140 h 915 v 340 h -915 z" stroke={GREEN} sw={2.4} dur={1} />
      <Fade on={beat >= 7} delay={dl(7, 1.4)}>
        <T x={540} y={110} size={17} fill={GREEN} script>
          {t(
            "memorise this table — most MCQs are one row in disguise",
            "yeh table yaad rakho — zyada MCQs iska ek row hi hote hain"
          )}
        </T>
      </Fade>
    </svg>
  );
}
