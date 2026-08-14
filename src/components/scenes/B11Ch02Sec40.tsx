"use client";

/**
 * B11 Ch02 · Section 40 — "The diagnostic table" (Plantae vs Animalia)
 * Canvas 1080×620 · safe x36–1044, y30–596. Table pattern mirrors Sec5.
 *
 * Beats (en [0, 11.69, 20.05, 34.56, 55.38, 71.68, 89.43, 109.65]):
 *  0 title only — "not 8 facts, 8 consequences of one idea"
 *  1 grid drawn + Feature/Plantae/Animalia headers + 8 row labels (empty cells)
 *  2 row "cell type" fills MERGED (both eukaryotic, multicellular) — can't separate
 *  3 rows "cell wall" + "nutrition" fill (highlighted) — the cleanest separators
 *  4 rows "stored food" + "plastids" fill — the tiebreakers
 *  5 rows "movement" + "reproduction" fill
 *  6 row "body organisation" fills — animals go one further (ringed)
 *  7 green box around table + closing caption (story band): read every row to the axis
 *
 * Layout plan (Anek bl−0.78s..+0.31s):
 *  b0 | title (script20 red)          | T mid | x540 y58
 *  b1 | grid                          | Draw  | x90..985 y150..470
 *  b1 | headers (15 ink)              | T mid | y172  x175(Feature start100)/441/803
 *  b1 | 8 row labels (13 ink, start)  | T st  | x100  baselines 211/246/281/316/351/386/421/456
 *  b2 | row1 merged data (13)         | T mid | x622 y211
 *  b3 | ring "cell wall"/"nutrition"  | Draw  | c129,246 rx32 ry16 / c129,316 rx32 ry16
 *  b3 | row2+row4 data (13)           | T mid | x441/803 y246 / y316
 *  b4 | ring "plastids"/"stored food" | Draw  | c126,281 rx30 ry16 / c136,351 rx36 ry16
 *  b4 | row3+row5 data (13)           | T mid | x441/803 y281 / y351
 *  b5 | row6+row7 data (13)           | T mid | x441/803 y386 / y421
 *  b6 | ring "body organisation"      | Draw  | c159,456 rx58 ry16
 *  b6 | row8 data (13)                | T mid | x441/803 y456
 *  b7 | box around whole table        | Draw  | x80..995 y140..480
 *  b7 | closing caption (script16)    | T mid | x540 y104 (story band)
 *
 * Caption slot (b2..b6, x540 y495 script15) is beat-scoped via `beat===k`
 * rather than dim-forever: unlike Sec5's exemplar pattern (which leaves
 * every prior caption dimmed at the same slot, stacking into illegible
 * overlapping text by the final frame — verified present in Sec5 itself,
 * not touched per guardrails), each caption here is visible ONLY during
 * its own beat and cleanly vanishes when the next beat starts, so at most
 * one occupies the slot at any time.
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, ringD, INK, AMBER_DARK, GREEN, RED } from "./kit";

const FEATURE_X = 100;
const PLANTAE_X = 441;
const ANIMALIA_X = 803;
const MERGED_X = 622;
const TABLE_X0 = 90;
const TABLE_X1 = 985;
const COL_DIVS_FULL = 260;
const ROW_DIVS = [190, 225, 260, 295, 330, 365, 400, 435];

const ROW_Y = {
  cellType: 211,
  cellWall: 246,
  plastids: 281,
  nutrition: 316,
  storedFood: 351,
  movement: 386,
  reproduction: 421,
  bodyOrg: 456,
};

const LABELS: [string, number][] = [
  ["cell type", ROW_Y.cellType],
  ["cell wall", ROW_Y.cellWall],
  ["plastids", ROW_Y.plastids],
  ["nutrition", ROW_Y.nutrition],
  ["stored food", ROW_Y.storedFood],
  ["movement", ROW_Y.movement],
  ["reproduction", ROW_Y.reproduction],
  ["body organisation", ROW_Y.bodyOrg],
];

function gridPath(): string {
  let d = `M ${TABLE_X0} 150 H ${TABLE_X1} V 470 H ${TABLE_X0} Z`;
  d += ` M ${COL_DIVS_FULL} 150 V 470`;
  // Plantae/Animalia divider — skipped through the "cell type" row to show the merge
  d += ` M 622 150 V 190`;
  d += ` M 622 225 V 470`;
  for (const y of ROW_DIVS) d += ` M ${TABLE_X0} ${y} H ${TABLE_X1}`;
  return d;
}

export default function B11Ch02Sec40({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={58} size={20} fill={RED} script>
          {t("the diagnostic table — 8 consequences of one idea", "diagnostic table — 1 idea ke 8 consequences")}
        </T>
      </Fade>

      {/* beat 1 — the grid + headers + row labels */}
      <Draw on={beat >= 1} delay={dl(1, 0.3)} d={gridPath()} stroke={INK} sw={2} dur={1.2} />
      <Fade on={beat >= 1} delay={dl(1, 1.6)}>
        <T x={175} y={172} size={15} fill={INK} weight={700} anchor="middle">
          Feature
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1.8)}>
        <T x={PLANTAE_X} y={172} size={15} fill={GREEN} weight={700} anchor="middle">
          Kingdom Plantae
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 2)}>
        <T x={ANIMALIA_X} y={172} size={15} fill={AMBER_DARK} weight={700} anchor="middle">
          Kingdom Animalia
        </T>
      </Fade>
      {LABELS.map(([label, y], i) => (
        <Fade key={label} on={beat >= 1} delay={dl(1, 2.3 + i * 0.15)}>
          <T x={FEATURE_X} y={y} size={13} fill={INK} anchor="start" weight={700}>
            {label}
          </T>
        </Fade>
      ))}

      {/* beat 2 — cell type: merged row, can't separate them */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={MERGED_X} y={ROW_Y.cellType} size={13} fill={INK} anchor="middle">
          eukaryotic, multicellular — both apply
        </T>
      </Fade>
      <Fade on={beat === 2} delay={dl(2, 1.2)}>
        <T x={540} y={495} size={15} fill={RED} script>
          {t("cell type alone can't separate them", "sirf cell type inhe alag nahi karta")}
        </T>
      </Fade>

      {/* beat 3 — cleanest separators: cell wall + nutrition */}
      <Draw on={beat >= 3} delay={dl(3, 0.3)} d={ringD(129, 246, 32, 16)} stroke={AMBER_DARK} sw={2} dur={0.6} />
      <Draw on={beat >= 3} delay={dl(3, 0.9)} d={ringD(129, 316, 32, 16)} stroke={AMBER_DARK} sw={2} dur={0.6} />
      <Fade on={beat >= 3} delay={dl(3, 1.5)}>
        <T x={PLANTAE_X} y={ROW_Y.cellWall} size={13} fill={GREEN} anchor="middle">
          present (cellulose)
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 1.8)}>
        <T x={ANIMALIA_X} y={ROW_Y.cellWall} size={13} fill={AMBER_DARK} anchor="middle">
          absent
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 2.1)}>
        <T x={PLANTAE_X} y={ROW_Y.nutrition} size={13} fill={GREEN} anchor="middle">
          autotrophic
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 2.4)}>
        <T x={ANIMALIA_X} y={ROW_Y.nutrition} size={13} fill={AMBER_DARK} anchor="middle">
          heterotrophic (holozoic)
        </T>
      </Fade>
      <Fade on={beat === 3} delay={dl(3, 3)}>
        <T x={540} y={495} size={15} fill={RED} script>
          {t("cleanest separators: nutrition + cell wall", "sabse saaf separators: nutrition + cell wall")}
        </T>
      </Fade>

      {/* beat 4 — tiebreakers: stored food + plastids */}
      <Draw on={beat >= 4} delay={dl(4, 0.3)} d={ringD(126, 281, 30, 16)} stroke={AMBER_DARK} sw={2} dur={0.6} />
      <Draw on={beat >= 4} delay={dl(4, 0.9)} d={ringD(136, 351, 36, 16)} stroke={AMBER_DARK} sw={2} dur={0.6} />
      <Fade on={beat >= 4} delay={dl(4, 1.5)}>
        <T x={PLANTAE_X} y={ROW_Y.plastids} size={13} fill={GREEN} anchor="middle">
          present
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.8)}>
        <T x={ANIMALIA_X} y={ROW_Y.plastids} size={13} fill={AMBER_DARK} anchor="middle">
          absent
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 2.1)}>
        <T x={PLANTAE_X} y={ROW_Y.storedFood} size={13} fill={GREEN} anchor="middle">
          starch
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 2.4)}>
        <T x={ANIMALIA_X} y={ROW_Y.storedFood} size={13} fill={AMBER_DARK} anchor="middle">
          glycogen + fat
        </T>
      </Fade>
      <Fade on={beat === 4} delay={dl(4, 3)}>
        <T x={540} y={495} size={15} fill={RED} script>
          {t("tiebreakers: stored food + plastids", "tiebreakers: stored food + plastids")}
        </T>
      </Fade>

      {/* beat 5 — movement + reproduction */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={PLANTAE_X} y={ROW_Y.movement} size={13} fill={INK} anchor="middle">
          generally fixed
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 0.6)}>
        <T x={ANIMALIA_X} y={ROW_Y.movement} size={13} fill={INK} anchor="middle">
          generally motile
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 0.9)}>
        <T x={PLANTAE_X} y={ROW_Y.reproduction} size={13} fill={INK} anchor="middle">
          asexual + sexual (alternation)
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1.2)}>
        <T x={ANIMALIA_X} y={ROW_Y.reproduction} size={13} fill={INK} anchor="middle">
          mostly sexual
        </T>
      </Fade>
      <Fade on={beat === 5} delay={dl(5, 1.8)}>
        <T x={540} y={495} size={15} fill={INK} script>
          {t("movement + reproduction, stated cleanly", "movement + reproduction, saaf saaf")}
        </T>
      </Fade>

      {/* beat 6 — body organisation: animals go one further */}
      <Draw on={beat >= 6} delay={dl(6, 0.3)} d={ringD(159, 456, 58, 16)} stroke={GREEN} sw={2} dur={0.6} />
      <Fade on={beat >= 6} delay={dl(6, 1)}>
        <T x={PLANTAE_X} y={ROW_Y.bodyOrg} size={13} fill={INK} anchor="middle">
          tissue / organ level
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1.3)}>
        <T x={ANIMALIA_X} y={ROW_Y.bodyOrg} size={13} fill={GREEN} weight={700} anchor="middle">
          organ-system level
        </T>
      </Fade>
      <Fade on={beat === 6} delay={dl(6, 1.9)}>
        <T x={540} y={495} size={15} fill={GREEN} script>
          {t("animals go one further — organ-system level", "animals ek step aage — organ-system level")}
        </T>
      </Fade>

      {/* beat 7 — closing: read every row back to the axis */}
      <Draw on={beat >= 7} delay={dl(7, 0.3)} d="M 80 140 h 915 v 340 h -915 z" stroke={GREEN} sw={2.4} dur={1} />
      <Fade on={beat >= 7} delay={dl(7, 1.4)}>
        <T x={540} y={104} size={16} fill={GREEN} script>
          {t(
            "read every row back to the axis: make food vs find food",
            "har row ko axis se jodo: khana banana vs khana dhoondhna"
          )}
        </T>
      </Fade>
    </svg>
  );
}
