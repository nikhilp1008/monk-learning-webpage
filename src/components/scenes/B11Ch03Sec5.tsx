"use client";

/**
 * B11 Ch03 · Section 5 — "Artificial vs natural, and the match-the-column"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 19.71, 44.2, 68.01, 90.45, 113.24, 130.47, 148.39, 167.77]):
 *  Q1 — board-level 2-mark question (beats 0-5, then fully erased for Q2):
 *  0 title (always-on) + Q1 question line (2 marks, one proponent each)
 *  1 instruction parse: "distinguish=CONTRAST" / "one proponent each=name
 *    COMPULSORY", two captions under the question line
 *  2 framework: shared row-axis table (CHARACTERS/PROPONENT/CONSEQUENCE ×
 *    ARTIFICIAL/NATURAL), headers + divider only
 *  3 ARTIFICIAL column fills (all 3 rows)
 *  4 NATURAL column fills (all 3 rows) — consequences mirror each other
 *  5 closing rule: name the axis → both sides → proponent
 *  Q2 — entrance-level match-the-column (beats 6-8, full canvas reused):
 *  6 setup: two lists (A/B/C systems, 1/2/3 given facts) — no lines yet,
 *    "try it before I speak"
 *  7 work it: three curved connectors drawn one at a time (A-3, B-1, C-2)
 *  8 answer stamp + technique: anchor the surest pair, eliminate the rest
 *
 * Layout plan (Kalam bl−1.3s..+0.5s, Anek bl−0.78s..+0.31s):
 *  always | title (script23 red)            | T mid  | x?..?  y32.6..72.6 (bl62)
 *  Q1 (on while beat<6):
 *  b0 | question line (script13 ink)         | T mid  | x?..?  y85..102 (bl98)
 *  b1 | left caption (12 red)                | T mid  | x300  bl122
 *  b1 | right caption (12 red)                | T mid  | x780  bl122
 *  b2 | row labels + col headers + divider   | T/Draw | y150 header, y162 rule
 *  b3 | ARTIFICIAL col ×3 rows                | T mid  | x400  bl190/222/254
 *  b4 | NATURAL col ×3 rows                   | T mid  | x790  bl190/222/254
 *  b5 | closing rule (script13 amber-d)       | T mid  | x?..?  bl300
 *  Q2 (on while beat>=6):
 *  b6 | Q2 label (script13 muted)             | T mid  | x?..?  bl98
 *  b6 | COLUMN 1 / COLUMN 2 headers           | T mid  | x250/830  bl140
 *  b6 | col1 items ×3 / col2 items ×3         | T st/end | y175/225/275
 *  b7 | 3 curved connectors                   | Draw   | x260..730
 *  b8 | answer chip                           | Chip   | x360..720 y330..366
 *  b8 | technique note (script13 amber-d)     | T mid  | x?..?  bl400
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

function connector(x1: number, y1: number, x2: number, y2: number): string {
  const midx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${midx} ${y1}, ${midx} ${y2}, ${x2} ${y2}`;
}

export default function B11Ch03Sec5({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);
  const q1On = beat < 6;

  return (
    <svg
      viewBox="0 0 1080 620"
      preserveAspectRatio="xMidYMin meet"
      className="w-full h-full select-none"
    >
      {/* title — always on */}
      <Fade on={true}>
        <T x={540} y={62} size={23} fill={RED} script>
          {t("the contrast — then the match", "farak — phir match the column")}
        </T>
      </Fade>

      {/* ══════════ Q1 — board 2-mark question (beats 0-5) ══════════ */}
      <Fade on={beat >= 0 && q1On} delay={dl(0, 0.3)}>
        <T x={540} y={98} size={13} fill={INK} anchor="middle" script>
          {t(
            "Q1 (2 marks): distinguish ARTIFICIAL vs NATURAL — ONE proponent each",
            "Q1 (2 marks): artificial vs natural mein FARAK — ek proponent har ek"
          )}
        </T>
      </Fade>

      <Fade on={beat >= 1 && q1On} dim={beat >= 2} delay={dl(1, 0.3)}>
        <T x={300} y={122} size={12} fill={RED} anchor="middle" script={false}>
          {t("distinguish = CONTRAST (not describe)", "distinguish = CONTRAST (describe nahi)")}
        </T>
      </Fade>
      <Fade on={beat >= 1 && q1On} dim={beat >= 2} delay={dl(1, 0.8)}>
        <T x={780} y={122} size={12} fill={RED} anchor="middle" script={false}>
          {t("one proponent each = name COMPULSORY", "one proponent each = naam ZAROORI")}
        </T>
      </Fade>

      {/* beat 2 — shared row-axis framework */}
      <Fade on={beat >= 2 && q1On} delay={dl(2, 0.3)}>
        <T x={95} y={150} size={11} fill={MUTED} anchor="start" script={false}>
          {t("AXIS", "AXIS")}
        </T>
      </Fade>
      <Fade on={beat >= 2 && q1On} delay={dl(2, 0.5)}>
        <T x={400} y={150} size={13} fill={AMBER_DARK} weight={700} anchor="middle" script={false}>
          ARTIFICIAL
        </T>
      </Fade>
      <Fade on={beat >= 2 && q1On} delay={dl(2, 0.7)}>
        <T x={790} y={150} size={13} fill={AMBER_DARK} weight={700} anchor="middle" script={false}>
          NATURAL
        </T>
      </Fade>
      <Draw on={beat >= 2 && q1On} delay={dl(2, 1.0)} d="M 90 162 L 990 162" stroke={INK} sw={1.6} dur={0.6} />
      <Fade on={beat >= 2 && q1On} delay={dl(2, 1.3)}>
        <T x={95} y={190} size={11} fill={MUTED} anchor="start" script={false}>
          CHARACTERS
        </T>
      </Fade>
      <Fade on={beat >= 2 && q1On} delay={dl(2, 1.5)}>
        <T x={95} y={222} size={11} fill={MUTED} anchor="start" script={false}>
          PROPONENT
        </T>
      </Fade>
      <Fade on={beat >= 2 && q1On} delay={dl(2, 1.7)}>
        <T x={95} y={254} size={11} fill={MUTED} anchor="start" script={false}>
          CONSEQUENCE
        </T>
      </Fade>

      {/* beat 3 — ARTIFICIAL column */}
      <Fade on={beat >= 3 && q1On} delay={dl(3, 0.3)}>
        <T x={400} y={190} size={12} fill={INK} anchor="middle" script={false}>
          {t("one/few easy characters", "ek-do easy characters")}
        </T>
      </Fade>
      <Fade on={beat >= 3 && q1On} delay={dl(3, 0.8)}>
        <T x={400} y={222} size={12} fill={INK} anchor="middle" script={false}>
          Linnaeus — androecium
        </T>
      </Fade>
      <Fade on={beat >= 3 && q1On} delay={dl(3, 1.3)}>
        <T x={400} y={254} size={12} fill={RED} anchor="middle" script={false}>
          {t(
            "convenient, but SEPARATES related plants",
            "convenient, par related plants ko SEPARATE kar sakta"
          )}
        </T>
      </Fade>

      {/* beat 4 — NATURAL column */}
      <Fade on={beat >= 4 && q1On} delay={dl(4, 0.3)}>
        <T x={790} y={190} size={12} fill={INK} anchor="middle" script={false}>
          {t("ALL available (natural affinities)", "SAB available (natural affinities)")}
        </T>
      </Fade>
      <Fade on={beat >= 4 && q1On} delay={dl(4, 0.8)}>
        <T x={790} y={222} size={12} fill={INK} anchor="middle" script={false}>
          Bentham & Hooker — Genera Plantarum
        </T>
      </Fade>
      <Fade on={beat >= 4 && q1On} delay={dl(4, 1.3)}>
        <T x={790} y={254} size={12} fill={GREEN} anchor="middle" script={false}>
          {t("related plants PLACED TOGETHER", "related plants SAATH mein aate hain")}
        </T>
      </Fade>

      {/* beat 5 — closing rule */}
      <Fade on={beat >= 5 && q1On} delay={dl(5, 0.3)}>
        <T x={540} y={300} size={13} fill={AMBER_DARK} anchor="middle" script>
          {t(
            "name the AXIS → give BOTH sides → attach the PROPONENT",
            "AXIS naam do → dono sides do → PROPONENT jodo"
          )}
        </T>
      </Fade>

      {/* ══════════ Q2 — match the column (beats 6-8) ══════════ */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={98} size={13} fill={MUTED} anchor="middle" script>
          {t("Q2 · match the column — try it before the reveal", "Q2 · match the column — pehle khud try karo")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 0.7)}>
        <T x={250} y={140} size={13} fill={INK} weight={700} anchor="middle" script={false}>
          COLUMN 1
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 0.9)}>
        <T x={830} y={140} size={13} fill={INK} weight={700} anchor="middle" script={false}>
          COLUMN 2
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1.2)}>
        <T x={130} y={175} size={13} fill={INK} anchor="start" script={false}>
          A. ARTIFICIAL
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1.5)}>
        <T x={130} y={225} size={13} fill={INK} anchor="start" script={false}>
          B. NATURAL
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1.8)}>
        <T x={130} y={275} size={13} fill={INK} anchor="start" script={false}>
          C. PHYLOGENETIC
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 2.1)}>
        <T x={950} y={175} size={13} fill={INK} anchor="end" script={false}>
          1. Bentham & Hooker
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 2.4)}>
        <T x={950} y={225} size={13} fill={INK} anchor="end" script={false}>
          2. Evolutionary relationships
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 2.7)}>
        <T x={950} y={275} size={13} fill={INK} anchor="end" script={false}>
          3. Linnaeus — androecium
        </T>
      </Fade>

      {/* beat 7 — three connectors, one at a time (A-3, B-1, C-2) */}
      <Draw on={beat >= 7} delay={dl(7, 0.3)} d={connector(260, 225, 730, 175)} stroke={AMBER_DARK} sw={2} dur={0.8} />
      <Draw on={beat >= 7} delay={dl(7, 1.3)} d={connector(260, 275, 730, 225)} stroke={AMBER_DARK} sw={2} dur={0.8} />
      <Draw on={beat >= 7} delay={dl(7, 2.3)} d={connector(260, 175, 730, 275)} stroke={AMBER_DARK} sw={2} dur={0.8} />

      {/* beat 8 — answer + technique */}
      <Fade on={beat >= 8} delay={dl(8, 0.3)}>
        <Chip x={360} y={330} w={360} h={36} fill={CREAM} stroke={AMBER_DARK} textFill={AMBER_DARK} size={15} script={false}>
          A → 3 · B → 1 · C → 2
        </Chip>
      </Fade>
      <Fade on={beat >= 8} delay={dl(8, 1.1)}>
        <T x={540} y={400} size={13} fill={AMBER_DARK} anchor="middle" script>
          {t(
            "anchor the pair you're SUREST of, then eliminate the rest",
            "jis pair pe sabse confident ho usi ko anchor karo, baaki elimination se"
          )}
        </T>
      </Fade>
    </svg>
  );
}
