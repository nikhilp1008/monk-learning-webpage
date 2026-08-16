"use client";

/**
 * B11 Ch03 · Section 6 — "Naming the approach, and the Linnaeus assertion–reason"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 17.15, 37.55, 60.16, 82.86, 107.69, 126.46, 147.63]):
 *  Q3 — entrance-level "definition in disguise" (beats 0-3, then erased):
 *  0 title (always-on) + Q3 stem: botanist story = a coded definition
 *  1 reframe: this is a DEFINITION in disguise — read phrases, not story
 *  2 decoder: 3 signature-phrase chips, arrows converge on NUMERICAL
 *    TAXONOMY — 3/3 agree
 *  3 second half: + ADVANTAGE = objectivity — both halves needed
 *  Q4 — high-difficulty assertion–reason (beats 4-7, full canvas reused):
 *  4 stem: A statement, R statement, 4 standard options
 *  5 test A alone → TRUE
 *  6 test R alone → TRUE
 *  7 connect: does R explain A? → YES, underline + ANSWER chip on (a)
 *
 * Layout plan (Anek bl−0.78s..+0.31s throughout; script only on title):
 *  always | title (script23 red)          | T mid  | x?..?  y32.6..72.6 (bl62)
 *  Q3 (on while beat<4):
 *  b0 | stem line1/2 (13 ink)               | T mid  | x?..?  bl94/124
 *  b1 | reframe (12 red)                    | T mid  | x?..?  bl154
 *  b2 | 3 phrase chips                      | Chip   | x=colX-110 y185..215
 *  b2 | 3 converge arrows                   | Draw   | →(540,255)
 *  b2 | NUMERICAL TAXONOMY chip              | Chip   | x420..660 y255..289
 *  b2 | "3/3 agree" note (12 green)          | T mid  | x?..?  bl320
 *  b3 | advantage line (13 amber-d)          | T mid  | x?..?  bl350
 *  Q4 (on while beat>=4):
 *  b4 | Q4 label (13 muted)                  | T mid  | x?..?  bl98
 *  b4 | A line (13 ink)                      | T mid  | x?..?  bl128
 *  b4 | R line1/2 (13/12 ink)                | T mid  | x?..?  bl188/218
 *  b4 | 4 options (12 ink, start x300)       | T st   | bl312/346/380/414
 *  b5 | A-verdict (12 green)                 | T mid  | x?..?  bl158
 *  b6 | R-verdict (12 green)                 | T mid  | x?..?  bl248
 *  b7 | connect line (13 amber-d)            | T mid  | x?..?  bl278
 *  b7 | underline option (a)                 | Draw   | x300..522 y318
 *  b7 | ANSWER chip                          | Chip   | x330..750 y450..486
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
  INK,
  MUTED,
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
} from "./kit";

const COL_X = [210, 540, 870];
const PHRASE = ["equal weight", "numerically coded", "computer processed"];

export default function B11Ch03Sec6({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);
  const q3On = beat < 4;

  return (
    <svg
      viewBox="0 0 1080 620"
      preserveAspectRatio="xMidYMin meet"
      className="w-full h-full select-none"
    >
      {/* title — always on */}
      <Fade on={true}>
        <T x={540} y={62} size={23} fill={RED} script>
          {t("define it backwards, then test A–R", "ulta define karo, phir A–R test karo")}
        </T>
      </Fade>

      {/* ══════════ Q3 — definition in disguise (beats 0-3) ══════════ */}
      <Fade on={beat >= 0 && q3On} delay={dl(0, 0.3)}>
        <T x={540} y={94} size={13} fill={INK} anchor="middle" script={false}>
          {t(
            "Q3: equal weight to 100s of characters, numerically coded,",
            "Q3: 100s characters ko barabar weight, numerically coded,"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 0 && q3On} delay={dl(0, 0.9)}>
        <T x={540} y={124} size={13} fill={INK} anchor="middle" script={false}>
          {t(
            "computer-processed → name the approach + its advantage?",
            "computer-processed → approach ka naam + advantage?"
          )}
        </T>
      </Fade>

      <Fade on={beat >= 1 && q3On} dim={beat >= 2} delay={dl(1, 0.3)}>
        <T x={540} y={154} size={12} fill={RED} anchor="middle" script={false}>
          {t(
            "a DEFINITION in disguise — read PHRASES, not a story",
            "ek DEFINITION hai disguise mein — PHRASES padho, story nahi"
          )}
        </T>
      </Fade>

      {/* beat 2 — decoder: 3 phrases converge on numerical taxonomy */}
      {COL_X.map((cx, i) => (
        <Fade key={`ph${i}`} on={beat >= 2 && q3On} delay={dl(2, 0.3 + i * 0.3)}>
          <Chip x={cx - 110} y={185} w={220} h={30} fill={CREAM} stroke={MUTED} textFill={INK} size={12} script={false}>
            {PHRASE[i]}
          </Chip>
        </Fade>
      ))}
      {COL_X.map((cx, i) => (
        <Draw
          key={`arr${i}`}
          on={beat >= 2 && q3On}
          delay={dl(2, 1.3 + i * 0.3)}
          d={arrowD(cx, 219, 540, 253)}
          stroke={AMBER_DARK}
          sw={2}
          dur={0.6}
        />
      ))}
      <Fade on={beat >= 2 && q3On} delay={dl(2, 2.4)}>
        <Chip x={420} y={255} w={240} h={34} fill={CREAM} stroke={AMBER_DARK} textFill={AMBER_DARK} size={13} script={false}>
          NUMERICAL TAXONOMY
        </Chip>
      </Fade>
      <Fade on={beat >= 2 && q3On} delay={dl(2, 3.0)}>
        <T x={540} y={320} size={12} fill={GREEN} anchor="middle" script={false}>
          {t("3/3 agree → commit", "3/3 match → commit karo")}
        </T>
      </Fade>

      {/* beat 3 — the advantage, both halves needed */}
      <Fade on={beat >= 3 && q3On} delay={dl(3, 0.3)}>
        <T x={540} y={350} size={13} fill={AMBER_DARK} anchor="middle" script={false}>
          {t(
            "+ ADVANTAGE: objectivity — BOTH halves needed",
            "+ ADVANTAGE: objectivity — DONO halves chahiye"
          )}
        </T>
      </Fade>

      {/* ══════════ Q4 — assertion–reason (beats 4-7) ══════════ */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={540} y={98} size={13} fill={MUTED} anchor="middle" script={false}>
          {t("Q4 · high difficulty · assertion–reason", "Q4 · high difficulty · assertion–reason")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 0.7)}>
        <T x={540} y={128} size={13} fill={INK} anchor="middle" script={false}>
          {t(
            "A: Linnaeus's classification is an ARTIFICIAL system.",
            "A: Linnaeus ki classification ARTIFICIAL system kahlati hai."
          )}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.1)}>
        <T x={540} y={188} size={13} fill={INK} anchor="middle" script={false}>
          {t(
            "R: equal weightage to vegetative + sexual characters;",
            "R: vegetative + sexual characters ko barabar weightage;"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.4)}>
        <T x={540} y={218} size={12} fill={INK} anchor="middle" script={false}>
          {t(
            "vegetative characters are easily environment-affected.",
            "vegetative characters environment se aasani se affect hote hain."
          )}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.8)}>
        <T x={300} y={312} size={12} fill={INK} anchor="start" script={false}>
          (a) {t("both A and R true — R explains A", "both A and R true — R, A ko explain karta hai")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 2.1)}>
        <T x={300} y={346} size={12} fill={INK} anchor="start" script={false}>
          (b) {t("both A and R true — R does NOT explain A", "both A and R true — R, A ko explain NAHI karta")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 2.4)}>
        <T x={300} y={380} size={12} fill={INK} anchor="start" script={false}>
          (c) {t("A true, R false", "A true, R false")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 2.7)}>
        <T x={300} y={414} size={12} fill={INK} anchor="start" script={false}>
          (d) {t("A false, R true", "A false, R true")}
        </T>
      </Fade>

      {/* beat 5 — test assertion alone */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={540} y={158} size={12} fill={GREEN} anchor="middle" script={false}>
          {t(
            "✓ assertion alone: TRUE — classic textbook example",
            "✓ assertion akela: TRUE — classic textbook example"
          )}
        </T>
      </Fade>

      {/* beat 6 — test reason alone */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={248} size={12} fill={GREEN} anchor="middle" script={false}>
          {t(
            "✓ reason alone: TRUE — known weakness, correctly stated",
            "✓ reason akela: TRUE — jaani-maani kamzori, sahi bataya"
          )}
        </T>
      </Fade>

      {/* beat 7 — connect: does R explain A? underline + answer */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={540} y={278} size={13} fill={AMBER_DARK} anchor="middle" script={false}>
          {t(
            "does R EXPLAIN why it's called artificial? → YES",
            "kya R EXPLAIN karta hai artificial kyun kehte? → HAAN"
          )}
        </T>
      </Fade>
      <Draw on={beat >= 7} delay={dl(7, 1.0)} d="M 300 318 L 522 318" stroke={GREEN} sw={2} dur={0.5} />
      <Fade on={beat >= 7} delay={dl(7, 1.6)}>
        <Chip x={330} y={450} w={420} h={36} fill={CREAM} stroke={GREEN} textFill={GREEN} size={13} script={false}>
          {t("ANSWER: (a) — both true, R explains A", "ANSWER: (a) — dono true, R, A ko explain karta hai")}
        </Chip>
      </Fade>
    </svg>
  );
}
