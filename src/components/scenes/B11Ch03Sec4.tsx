"use client";

/**
 * B11 Ch03 · Section 4 — "Numerical, cyto- and chemotaxonomy"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 21.25, 40.28, 65.11, 88.66, 105.05, 129.88, 152.15]):
 *  0 title (always-on) + hook: not systems 4/5/6 — evidence sources,
 *    formalised
 *  1 framework: 3 titled panel outlines (NUMERICAL taxonomy / CYTO- /
 *    CHEMOTAXONOMY) — "prefix IS the definition", no body text yet
 *  2 panel 1 fills: numerical — all characters, EQUAL weight, coded as
 *    numbers, computer-processed
 *  3 panel 2 fills: cyto — chromosome no./structure/behaviour → matching
 *    chromosomes mean closely related, invisible in the leaves
 *  4 panel 3 fills: chemo — phytochemicals, shared chemicals = kinship
 *    marker
 *  5 prefix decoder: one compressed line under all three panels
 *  6 high-value fact: numerical's key advantage — objectivity (3rd line +
 *    underline inside panel 1)
 *  7 closing: modern layers feed objective data into the classical
 *    systems, banner
 *
 * Layout plan (Kalam bl−1.3s..+0.5s, Anek bl−0.78s..+0.31s):
 *  always | title (script24 red)         | T mid  | x?..?  y33.5..76.6 (bl64)
 *  b0 | hook (script13 muted)             | T mid  | x?..?  y85..102 (bl98) [dim@1]
 *  b1 | 3 panel outlines                  | Draw   | x=colX-150..+150 y130..280
 *  b1 | 3 panel titles (14 bold amber-d)  | T mid  | colX  bl158
 *  b2 | panel1 line1/2 (12 ink)           | T mid  | x210  bl195/222
 *  b3 | panel2 line1/2 (12 ink)           | T mid  | x540  bl195/222
 *  b4 | panel3 line1/2 (12 ink)           | T mid  | x870  bl195/222
 *  b5 | decoder line (script13 amber-d)   | T mid  | x540  bl310
 *  b6 | panel1 advantage line (12 green)  | T mid  | x210  bl250
 *  b6 | underline under advantage line    | Draw   | x?..?  y258
 *  b7 | outer box                         | Draw   | x260..820 y328..372
 *  b7 | closing chip                      | Chip   | x265..815 y332..368
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
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
} from "./kit";

const COL_X = [210, 540, 870];
const TITLE = ["NUMERICAL taxonomy", "CYTOTAXONOMY", "CHEMOTAXONOMY"];
const LINE1: [string, string][] = [
  ["ALL characters, EQUAL weight", "SAB characters, BARABAR weight"],
  ["chromosome no. + structure + behaviour", "chromosome number + structure + behaviour"],
  ["phytochemicals (chemical constituents)", "phytochemicals (chemical constituents)"],
];
const LINE2: [string, string][] = [
  ["numbers → computer-processed", "numbers → computer se process"],
  ["matching chromosomes → closely related", "match karta → closely related"],
  ["shared chemicals = kinship marker", "shared chemicals = kinship marker"],
];
const FILL_BEAT = [2, 3, 4];

export default function B11Ch03Sec4({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={64} size={24} fill={RED} script>
          {t("three modern layers of evidence", "teen modern evidence ki layers")}
        </T>
      </Fade>

      {/* beat 0 — hook */}
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 0.3)}>
        <T x={540} y={98} size={13} fill={MUTED} script>
          {t(
            "not systems 4, 5, 6 — sources of evidence, formalised",
            "system 4, 5, 6 nahi — evidence ke sources, formalise kiye gaye"
          )}
        </T>
      </Fade>

      {/* beat 1 — framework: 3 titled panels, prefix IS the definition */}
      {COL_X.map((cx, i) => (
        <React.Fragment key={`panel${i}`}>
          <Draw
            on={beat >= 1}
            delay={dl(1, 0.3 + i * 0.4)}
            d={`M ${cx - 150} 130 h 300 v 150 h -300 z`}
            stroke={INK}
            sw={1.8}
            dur={0.8}
          />
          <Fade on={beat >= 1} delay={dl(1, 0.9 + i * 0.4)}>
            <T x={cx} y={158} size={14} fill={AMBER_DARK} weight={700} anchor="middle" script={false}>
              {TITLE[i]}
            </T>
          </Fade>
        </React.Fragment>
      ))}

      {/* beats 2-4 — one panel's evidence definition fills per beat */}
      {COL_X.map((cx, i) => {
        const k = FILL_BEAT[i];
        return (
          <React.Fragment key={`fill${i}`}>
            <Fade on={beat >= k} delay={dl(k, 0.3)}>
              <T x={cx} y={195} size={12} fill={INK} anchor="middle" script={false}>
                {t(LINE1[i][0], LINE1[i][1])}
              </T>
            </Fade>
            <Fade on={beat >= k} delay={dl(k, 0.9)}>
              <T x={cx} y={222} size={12} fill={INK} anchor="middle" script={false}>
                {t(LINE2[i][0], LINE2[i][1])}
              </T>
            </Fade>
          </React.Fragment>
        );
      })}

      {/* beat 5 — prefix decoder, one compressed line */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={540} y={310} size={13} fill={AMBER_DARK} anchor="middle" script>
          {t(
            "CYTO = cells → chromosomes · CHEMO = chemicals · NUMERICAL = numbers → computers + equal weight",
            "CYTO = cells → chromosomes · CHEMO = chemicals · NUMERICAL = numbers → computers + barabar weight"
          )}
        </T>
      </Fade>

      {/* beat 6 — high-value fact: numerical taxonomy's advantage is objectivity */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={210} y={250} size={12} fill={GREEN} anchor="middle" script={false}>
          {t("ADVANTAGE: objectivity — no human bias", "ADVANTAGE: objectivity — bias nahi")}
        </T>
      </Fade>
      <Draw on={beat >= 6} delay={dl(6, 1.0)} d="M 110 258 L 310 258" stroke={GREEN} sw={2} dur={0.5} />

      {/* beat 7 — closing: modern layers feed objective data into the classical systems */}
      <Draw
        on={beat >= 7}
        delay={dl(7, 0.2)}
        d="M 260 328 h 560 q 8 0 8 8 v 28 q 0 8 -8 8 h -560 q -8 0 -8 -8 v -28 q 0 -8 8 -8"
        stroke={AMBER_DARK}
        sw={2}
        dur={0.7}
      />
      <Fade on={beat >= 7} delay={dl(7, 1.1)}>
        <Chip x={265} y={332} w={550} h={36} fill={CREAM} stroke="none" textFill={AMBER_DARK} size={12} script={false}>
          {t(
            "don't replace classical — they FEED objective cellular/molecular data in",
            "classical ko replace nahi karte — objective cellular/molecular data FEED karte hain"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
