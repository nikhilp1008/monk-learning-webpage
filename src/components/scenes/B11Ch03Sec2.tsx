"use client";

/**
 * B11 Ch03 · Section 2 — "The three classical systems, side by side"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 22.02, 42.75, 67.58, 92.42, 117.25, 137.22, 161.28]):
 *  0 title (always-on) + hook line · table framework: 4 column headers
 *    (SYSTEM/BASIS/CHARACTERS/PROPONENT) + divider
 *  1 "read across, not down": a sweep arrow across the empty row-0 slot +
 *    label [erase@2 — row0 real data reuses this exact y]
 *  2 ARTIFICIAL row fills: tick + 4 cells
 *  3 NATURAL row fills: tick + 4 cells
 *  4 PHYLOGENETIC row fills: tick + 4 cells
 *  5 synthesis (excited beat): horizontal arrow under the table + "more
 *    evidence → more natural/truthful" rule
 *  6 high-value fact: ring around NATURAL's proponent cell + note that B&H
 *    is India's most-used natural system
 *  7 closing: compress 3 rows into one line, banner chip
 *
 * Layout plan (Kalam bl−1.3s..+0.5s, Anek bl−0.78s..+0.31s):
 *  always | title (script25 red)             | T mid  | x?..?  y33.5..78.5 (bl66)
 *  b0 | hook (script14 muted)                 | T mid  | x?..?  y84..101 (bl98) [dim@1]
 *  b0 | 4 col headers (12 bold ink)            | T st   | y118.6..131.7 (bl128), x54/180/430/740
 *  b0 | header divider                        | Draw   | y138  x40..1030
 *  b1 | sweep arrow (row-0 slot)               | Draw   | y172  x60..1020 [erase@2]
 *  b1 | "read each ROW left→right" (script14)  | T mid  | x?..?  y188..215 (bl208) [erase@2]
 *  b2 | row0 tick                              | Draw   | x36..50 y168
 *  b2 | row0 SYSTEM "ARTIFICIAL" (14 bold ink) | T st   | x54..124  y158.6..176 (bl172)
 *  b2 | row0 BASIS                             | T st   | x180..324 y163.4..175.7 (bl172)
 *  b2 | row0 CHARACTERS                        | T st   | x430..644.5 y163.4..175.7 (bl172)
 *  b2 | row0 PROPONENT                         | T st   | x740..910.5 y163.4..175.7 (bl172)
 *  b3 | row1 tick + 4 cells (same x, y=242)    | Draw/T | y233.4..245.7 (bl242)
 *  b4 | row2 tick + 4 cells (same x, y=312)    | Draw/T | y303.4..315.7 (bl312)
 *  b5 | synthesis arrow                        | Draw   | y352  x140..940
 *  b5 | synthesis rule (script14 amber-d)      | T mid  | x?..?  y357.8..384.8 (bl376)
 *  b6 | ring on row1 PROPONENT                 | Draw   | cx839 cy239.4 rx113 ry18
 *  b6 | B&H note (script13 green)              | T mid  | x?..?  y394.9..419.9 (bl412)
 *  b7 | outer emphasis box                     | Draw   | x330..750 y446..490
 *  b7 | compressed-line chip                   | Chip   | x335..745 y450..486
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
  AMBER,
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
} from "./kit";

const COLX = { system: 54, basis: 180, chars: 430, prop: 740 };

type Row = { system: string; basis: [string, string]; chars: [string, string]; prop: [string, string] };

const ROWS: Row[] = [
  {
    system: "ARTIFICIAL",
    basis: ["one/few easy characters", "ek-do easy characters"],
    chars: [
      "gross morphology; veg=sex, equal weight",
      "gross morphology; veg=sex, barabar weight",
    ],
    prop: ["Linnaeus — androecium (stamens)", "Linnaeus — androecium (stamens)"],
  },
  {
    system: "NATURAL",
    basis: ["natural affinities", "natural affinities"],
    chars: ["ALL — morphology, anatomy, embryology", "SAB — morphology, anatomy, embryology"],
    prop: ["Bentham & Hooker — Genera Plantarum", "Bentham & Hooker — Genera Plantarum"],
  },
  {
    system: "PHYLOGENETIC",
    basis: ["evolutionary relationships", "evolutionary relationships"],
    chars: ["ALL + evolutionary & fossil evidence", "SAB + evolutionary/fossil evidence"],
    prop: ["Engler & Prantl", "Engler & Prantl"],
  },
];

const ROW_Y = (i: number) => 172 + i * 70; // 172, 242, 312
const BEAT_FOR_ROW = (i: number) => 2 + i; // row0->b2, row1->b3, row2->b4

export default function B11Ch03Sec2({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={66} size={25} fill={RED} script>
          {t("three systems, one table", "teen systems, ek table")}
        </T>
      </Fade>

      {/* beat 0 — hook + table framework */}
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 0.3)}>
        <T x={540} y={98} size={14} fill={MUTED} script>
          {t(
            "basis · characters · proponent — the three things per system",
            "basis · characters · proponent — har system ke teen cheezein"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 0} delay={dl(0, 0.6)}>
        <T x={COLX.system} y={128} size={12} fill={INK} weight={700} anchor="start" script={false}>
          {t("SYSTEM", "SYSTEM")}
        </T>
      </Fade>
      <Fade on={beat >= 0} delay={dl(0, 0.8)}>
        <T x={COLX.basis} y={128} size={12} fill={INK} weight={700} anchor="start" script={false}>
          {t("BASIS", "BASIS")}
        </T>
      </Fade>
      <Fade on={beat >= 0} delay={dl(0, 1.0)}>
        <T x={COLX.chars} y={128} size={12} fill={INK} weight={700} anchor="start" script={false}>
          {t("CHARACTERS", "CHARACTERS")}
        </T>
      </Fade>
      <Fade on={beat >= 0} delay={dl(0, 1.2)}>
        <T x={COLX.prop} y={128} size={12} fill={INK} weight={700} anchor="start" script={false}>
          {t("PROPONENT", "PROPONENT")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 1.5)} d="M 40 138 L 1030 138" stroke={INK} sw={1.6} dur={0.6} />

      {/* beat 1 — "read across, not down": sweep the empty row-0 slot, then vacate it */}
      <Draw
        on={beat === 1}
        delay={dl(1, 0.3)}
        d={arrowD(60, 172, 1020, 172)}
        stroke={AMBER_DARK}
        sw={2}
        dur={1}
      />
      <Fade on={beat === 1} delay={dl(1, 1.2)}>
        <T x={540} y={208} size={14} fill={AMBER_DARK} script>
          {t("read each ROW left → right", "har ROW left → right padho")}
        </T>
      </Fade>

      {/* beats 2-4 — the three rows */}
      {ROWS.map((row, i) => {
        const k = BEAT_FOR_ROW(i);
        const y = ROW_Y(i);
        return (
          <React.Fragment key={i}>
            <Draw on={beat >= k} delay={dl(k, 0.1)} d={`M 36 ${y - 4} L 50 ${y - 4}`} stroke={AMBER} sw={2.4} dur={0.3} />
            <Fade on={beat >= k} delay={dl(k, 0.4)}>
              <T x={COLX.system} y={y} size={14} fill={INK} weight={700} anchor="start" script={false}>
                {row.system}
              </T>
            </Fade>
            <Fade on={beat >= k} delay={dl(k, 0.8)}>
              <T x={COLX.basis} y={y} size={12} fill={INK} anchor="start" script={false}>
                {t(row.basis[0], row.basis[1])}
              </T>
            </Fade>
            <Fade on={beat >= k} delay={dl(k, 1.2)}>
              <T x={COLX.chars} y={y} size={11} fill={INK} anchor="start" script={false}>
                {t(row.chars[0], row.chars[1])}
              </T>
            </Fade>
            <Fade on={beat >= k} delay={dl(k, 1.6)}>
              <T x={COLX.prop} y={y} size={11} fill={AMBER_DARK} anchor="start" script={false}>
                {t(row.prop[0], row.prop[1])}
              </T>
            </Fade>
          </React.Fragment>
        );
      })}

      {/* beat 5 — synthesis: more evidence, more natural/truthful */}
      <Draw on={beat >= 5} delay={dl(5, 0.3)} d={arrowD(140, 352, 940, 352)} stroke={AMBER_DARK} sw={2.4} dur={1} />
      <Fade on={beat >= 5} delay={dl(5, 1.5)}>
        <T x={540} y={376} size={14} fill={AMBER_DARK} script>
          {t(
            "→ MORE characters + closer to descent = MORE natural (truthful)",
            "→ jitne zyada characters + jitna descent ke kareeb, utni natural (sacchi)"
          )}
        </T>
      </Fade>

      {/* beat 6 — high-value fact: Bentham & Hooker's reach */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <Draw on={true} d={ringD(839, 239, 113, 18)} stroke={GREEN} sw={2} dur={0.6} />
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1.1)}>
        <T x={540} y={412} size={13} fill={GREEN} script>
          {t(
            "India's most-used natural system — backbone of many herbaria",
            "India ka sabse zyada use hone wala natural system — herbaria ka backbone"
          )}
        </T>
      </Fade>

      {/* beat 7 — compress the three rows into one line */}
      <Draw
        on={beat >= 7}
        delay={dl(7, 0.2)}
        d="M 330 446 h 420 q 8 0 8 8 v 28 q 0 8 -8 8 h -420 q -8 0 -8 -8 v -28 q 0 -8 8 -8"
        stroke={AMBER_DARK}
        sw={2}
        dur={0.7}
      />
      <Fade on={beat >= 7} delay={dl(7, 1.1)}>
        <Chip x={335} y={450} w={410} h={36} fill={CREAM} stroke="none" textFill={AMBER_DARK} size={12} script={false}>
          {t(
            "LEAST evid.→convenience · BROAD→affinity · BROADEST→ancestry",
            "LEAST evid.→convenience · BROAD→affinity · BROADEST→ancestry"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
