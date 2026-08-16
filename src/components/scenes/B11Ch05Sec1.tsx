"use client";

/**
 * B11 Ch05 · Section 1 — "Two departments: the root system and the shoot
 * system"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 9.39, 18.69, 28.67, 40.62, 52.82, 64.17, 72.87]
 *        hi [0, 7.0, 16.13, 26.28, 38.31, 50.52, 61.01, 69.72]):
 *  0 title + hook: "a business with exactly two departments" [dim@1]
 *  1 DIAGRAM: two boxes open, empty — left = underground, right = above ground
 *  2 root system: heading + facts (descending, from radicle, not green) + a
 *    drawn taproot icon inside the left box
 *  3 root jobs: 4 chips (absorb, anchor, store food, make PGRs) in a 2×2 grid
 *  4 shoot system: heading + facts (from plumule; stem/leaves/buds) + a
 *    drawn stem+leaves+bud icon inside the right box
 *  5 shoot jobs: 3 chips (photosynthesis, storage, reproduction)
 *  6 the two departments converge → "the plant body axis" chip below both
 *  7 closing teaser: thorn / tendril / potato chips + "unusual job" line
 *
 * Layout plan (Kalam bl−1.3s..+0.5s · Anek bl−0.78s..+0.31s):
 *  b0 | title (script26 red)         | T mid  | x?..? y30..77 (bl64)
 *  b0 | underline                    | Draw   | y78  x400..680
 *  b0 | hook (script16 muted)        | T mid  | x?..? y100..126 (bl119) [dim@1]
 *  b1 | left box "underground"       | Draw   | x100..470 y270..480
 *  b1 | right box "above ground"     | Draw   | x610..980 y270..480
 *  b2 | root heading (14 amber-d)    | T mid  | x?..? y289..305 (bl300)
 *  b2 | root facts (12 ink)          | T mid  | x?..? y316..329 (bl325)
 *  b2 | taproot icon                 | Draw   | x258..312 y345..400
 *  b3 | 4 job chips (11 anek)        | Chip   | y414..440/444..470 x115/295 w160
 *  b4 | shoot heading (14 green)     | T mid  | x?..? y289..305 (bl300)
 *  b4 | shoot facts (12 ink)         | T mid  | x?..? y316..329 (bl325)
 *  b4 | stem+leaves+bud icon         | Draw   | x768..822 y342..400
 *  b5 | 3 job chips (12 anek)        | Chip   | y414..440/444..470 x625/805/715 w160
 *  b6 | converge lines               | Draw   | x285→500/795→580 y480..500
 *  b6 | axis chip (16 cream-on-ink)  | Chip   | x400..680 y505..539
 *  b7 | 3 teaser chips (13 anek)     | Chip   | y540..566 x290/470/650 w150
 *  b7 | closing line (13 amber-d)    | T mid  | x?..? y578..592 (bl588)
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

export default function B11Ch05Sec1({ currentTime, reveals, language }: SceneProps) {
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
      {/* title — always on (blank-board exception) */}
      <Fade on={true}>
        <T x={540} y={64} size={26} fill={RED} script>
          {t("two departments, one plant", "do departments, ek hi plant")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 0.3)} d="M 400 78 C 460 75, 620 75, 680 78" stroke={RED} sw={2.2} dur={0.6} />
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 1.4)}>
        <T x={540} y={119} size={16} fill={MUTED} script>
          {t(
            "think of it like a business with exactly two departments",
            "socho jaise ek business ho — bas do hi departments"
          )}
        </T>
      </Fade>

      {/* beat 1 — two boxes open, empty */}
      <Draw on={beat >= 1} delay={dl(1, 0.3)} d="M 100 270 h 370 v 210 h -370 z" stroke={INK} sw={2.2} dur={1} />
      <Draw on={beat >= 1} delay={dl(1, 1.4)} d="M 610 270 h 370 v 210 h -370 z" stroke={INK} sw={2.2} dur={1} />
      <Fade on={beat >= 1} delay={dl(1, 2.4)}>
        <T x={285} y={258} size={13} fill={MUTED} weight={600}>
          {t("underground", "zameen ke neeche")}
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 2.7)}>
        <T x={795} y={258} size={13} fill={MUTED} weight={600}>
          {t("above ground", "zameen ke upar")}
        </T>
      </Fade>

      {/* beat 2 — root system: heading, facts, taproot icon */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={285} y={300} size={14} fill={AMBER_DARK} weight={700}>
          {t("ROOT SYSTEM · underground", "ROOT SYSTEM · zameen ke neeche")}
        </T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 1.1)}>
        <T x={285} y={325} size={12} fill={INK}>
          {t("descending · from the radicle · not green", "descending · radicle se · green nahi")}
        </T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 2)}>
        <Draw
          on={true}
          d="M 285 345 C 282 362, 289 380, 284 400 M 285 362 L 258 374 M 284 384 L 312 398"
          stroke={INK}
          sw={2}
          dur={0.9}
        />
      </Fade>

      {/* beat 3 — root jobs, 2x2 chip grid */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <Chip x={115} y={414} w={160} h={26} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={11} script={false}>
          {t("absorbs H2O + minerals", "H2O + minerals absorb karta")}
        </Chip>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 1)}>
        <Chip x={295} y={414} w={160} h={26} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={11} script={false}>
          {t("anchors the plant", "plant ko anchor karta")}
        </Chip>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 1.7)}>
        <Chip x={115} y={444} w={160} h={26} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={11} script={false}>
          {t("stores food", "food store karta")}
        </Chip>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 2.4)}>
        <Chip x={295} y={444} w={160} h={26} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={11} script={false}>
          {t("makes growth regulators", "growth regulators banata")}
        </Chip>
      </Fade>

      {/* beat 4 — shoot system: heading, facts, stem+leaves+bud icon */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={795} y={300} size={14} fill={GREEN} weight={700}>
          {t("SHOOT SYSTEM · above ground", "SHOOT SYSTEM · zameen ke upar")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.1)}>
        <T x={795} y={325} size={12} fill={INK}>
          {t("from the plumule · stem, leaves, buds", "plumule se · stem, leaves, buds")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 2)}>
        <Draw
          on={true}
          d="M 795 350 L 795 400 M 795 366 L 768 356 M 795 384 L 822 394 M 795 342 a 6 6 0 1 0 0.1 0"
          stroke={INK}
          sw={2}
          dur={0.9}
        />
      </Fade>

      {/* beat 5 — shoot jobs, 2+1 chip grid */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <Chip x={625} y={414} w={160} h={26} fill={CREAM} stroke={GREEN} textFill={INK} size={12} script={false}>
          {t("photosynthesis", "photosynthesis")}
        </Chip>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1)}>
        <Chip x={805} y={414} w={160} h={26} fill={CREAM} stroke={GREEN} textFill={INK} size={12} script={false}>
          {t("storage", "storage")}
        </Chip>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1.7)}>
        <Chip x={715} y={444} w={160} h={26} fill={CREAM} stroke={GREEN} textFill={INK} size={12} script={false}>
          {t("reproduction", "reproduction")}
        </Chip>
      </Fade>

      {/* beat 6 — converge: the plant body axis */}
      <Draw on={beat >= 6} delay={dl(6, 0.3)} d="M 285 480 L 500 500" stroke={INK} sw={2} dur={0.5} />
      <Draw on={beat >= 6} delay={dl(6, 0.5)} d="M 795 480 L 580 500" stroke={INK} sw={2} dur={0.5} />
      <Fade on={beat >= 6} delay={dl(6, 1.3)}>
        <Chip x={400} y={505} w={280} h={34} fill={INK} textFill={CREAM} size={16} script={false}>
          {t("= the plant body axis", "= plant body axis")}
        </Chip>
      </Fade>

      {/* beat 7 — closing teaser: unusual jobs */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <Chip x={290} y={540} w={150} h={26} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={13} script={false}>
          thorn
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <Chip x={470} y={540} w={150} h={26} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={13} script={false}>
          tendril
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.3)}>
        <Chip x={650} y={540} w={150} h={26} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={13} script={false}>
          potato
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 2.1)}>
        <T x={540} y={588} size={13} fill={AMBER_DARK} script>
          {t("same department, just doing an unusual job", "wahi department, bas unusual kaam kar raha")}
        </T>
      </Fade>
    </svg>
  );
}
