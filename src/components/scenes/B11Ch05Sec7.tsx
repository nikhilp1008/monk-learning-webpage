"use client";

/**
 * B11 Ch05 · Section 7 — "The four zones of the root tip"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 12.03, 24.49, 37.97, 49.66, 58.62, 70.66, 81.92]
 *        hi [0, 10.41, 21.5, 34.39, 47.1, 57.26, 69.46, 78.93]):
 *  0 title + hook: reasoning tip → base, four zones [dim@1]
 *  1 ROOT CAP (tip, bottom of diagram): dome icon, thimble of cells, armour+
 *    sacrificial
 *  2 MERISTEMATIC ZONE (above cap): verticals + dividing-cell dots, engine
 *    room, every new cell made here
 *  3 ZONE OF ELONGATION (above meristem): verticals + stretch arrows, cells
 *    stretch lengthwise, pushes root down
 *  4 ZONE OF MATURATION (topmost, nearest base): verticals + root-hair ticks,
 *    cells differentiate, epidermis grows root hairs
 *  5 ring around root-hair ticks + addendum: = WORKING ZONE, absorption +
 *    lateral roots start here
 *  6 "hold the logic": DIVISION → ELONGATION → MATURATION chip chain
 *  7 whisper verdict: root hairs never at the very tip, always a step behind
 *
 * Layout plan (Kalam bl−1.3s..+0.5s · Anek bl−0.78s..+0.31s). Diagram is a
 * vertical root axis built BOTTOM-UP (tip first) at x396–444 (center 420),
 * mirroring "reasoning tip to base". Label column starts x480. Row bands
 * (top→bottom on screen = base→tip of root): maturation y150–245, elongation
 * y245–315, meristem y315–385, cap y385–450 (tip point at y450).
 *  b0 | title (script24 red)          | T mid  | x?..? y30..75 (bl63)
 *  b0 | underline                     | Draw   | y77 x330..750
 *  b0 | hook (script14 muted)         | T mid  | x?..? y88..109 (bl102) [dim@1]
 *  b1 | cap dome                      | Draw   | x396..444 y385..450
 *  b1 | cap/meristem divider          | Draw   | y385 x396..444
 *  b1 | "ROOT CAP" (15 amber-d)       | T start| x480..?   y399..414 (bl410)
 *  b1 | cap fact (12 ink)             | T start| x480..774 y422..436 (bl432)
 *  b2 | meristem verticals            | Draw   | x396/444 y315..385
 *  b2 | meristem/elongation divider   | Draw   | y315 x396..444
 *  b2 | dividing-cell dots ×7 (green) | circle | x406..434 y325..378
 *  b2 | "MERISTEMATIC ZONE" (14 grn)  | T start| x480..?   y329..344 (bl340)
 *  b2 | meristem fact (12 ink)        | T start| x480..~750 y352..366 (bl362)
 *  b3 | elongation verticals          | Draw   | x396/444 y245..315
 *  b3 | elongation/maturation divider | Draw   | y245 x396..444
 *  b3 | stretch arrows ×2             | Draw   | x420 y258..302
 *  b3 | "ZONE OF ELONGATION" (14 ad)  | T start| x480..?   y259..274 (bl270)
 *  b3 | elongation fact (12 ink)      | T start| x480..~760 y282..296 (bl292)
 *  b4 | maturation verticals          | Draw   | x396/444 y150..245
 *  b4 | maturation top edge           | Draw   | y150 x396..444
 *  b4 | root-hair ticks ×5 pr (green) | Draw   | x380..460 y155..240
 *  b4 | "ZONE OF MATURATION" (14 ink) | T start| x480..?   y174..189 (bl185)
 *  b4 | maturation fact (12 ink)      | T start| x480..~770 y197..211 (bl207)
 *  b5 | ring around hair ticks        | Draw   | cx420 cy198 rx54 ry48
 *  b5 | working-zone addendum (12 grn)| T start| x480..~816 y218..232 (bl228)
 *  b6 | "hold the logic:" (13 script) | T mid  | x?..? y465..489 (bl482)
 *  b6 | chip DIVISION                 | Chip   | x374..452 y496..524
 *  b6 | arrow 1                       | Draw   | x452..486 y510
 *  b6 | chip ELONGATION               | Chip   | x488..579 y496..524
 *  b6 | arrow 2                       | Draw   | x579..613 y510
 *  b6 | chip MATURATION               | Chip   | x615..706 y496..524
 *  b7 | verdict chip (15 ink/cream)   | Chip   | x396..684 y540..570
 *  b7 | whisper caption (12 red)      | T mid  | x?..? y579..591 (bl588)
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
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
} from "./kit";

export default function B11Ch05Sec7({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  const hairTicks =
    "M 396 155 L 380 155 M 444 155 L 460 155 " +
    "M 396 173 L 380 173 M 444 173 L 460 173 " +
    "M 396 191 L 380 191 M 444 191 L 460 191 " +
    "M 396 209 L 380 209 M 444 209 L 460 209 " +
    "M 396 227 L 380 227 M 444 227 L 460 227";

  const dots: [number, number][] = [
    [412, 332],
    [428, 340],
    [408, 352],
    [432, 358],
    [416, 368],
    [426, 375],
    [410, 340],
  ];

  return (
    <svg
      viewBox="0 0 1080 620"
      preserveAspectRatio="xMidYMin meet"
      className="w-full h-full select-none"
    >
      {/* title — always on */}
      <Fade on={true}>
        <T x={540} y={63} size={24} fill={RED} script>
          {t("the four zones of a root tip", "root tip ke chaar zones")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 0.3)} d="M 330 77 C 420 74, 660 74, 750 77" stroke={RED} sw={2.2} dur={0.6} />
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 1.4)}>
        <T x={540} y={102} size={14} fill={MUTED} script>
          {t("tip to base — growth order, four zones", "tip se base tak — growth order, chaar zones")}
        </T>
      </Fade>

      {/* beat 1 — ROOT CAP (the tip, bottom of the diagram) */}
      <Draw
        on={beat >= 1}
        delay={dl(1, 0.3)}
        d="M 396 385 C 396 425, 402 442, 420 450 C 438 442, 444 425, 444 385"
        stroke={AMBER_DARK}
        sw={2}
        dur={0.9}
      />
      <Draw on={beat >= 1} delay={dl(1, 1.0)} d="M 396 385 L 444 385" stroke={INK} sw={1.4} dur={0.4} />
      <Fade on={beat >= 1} delay={dl(1, 1.4)}>
        <T x={480} y={410} size={15} fill={AMBER_DARK} anchor="start" weight={700}>
          {t("ROOT CAP", "ROOT CAP")}
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1.6)}>
        <T x={480} y={432} size={12} fill={INK} anchor="start">
          {t(
            "a thimble of cells — protects the apex, sacrificial",
            "cells ka thimble — apex ko bachata, sacrificial hai"
          )}
        </T>
      </Fade>

      {/* beat 2 — MERISTEMATIC ZONE */}
      <Draw
        on={beat >= 2}
        delay={dl(2, 0.3)}
        d="M 396 385 L 396 315 M 444 385 L 444 315"
        stroke={GREEN}
        sw={1.8}
        dur={0.7}
      />
      <Draw on={beat >= 2} delay={dl(2, 0.9)} d="M 396 315 L 444 315" stroke={INK} sw={1.4} dur={0.4} />
      <Fade on={beat >= 2} delay={dl(2, 1.3)}>
        <g>
          {dots.map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={3} fill={GREEN} />
          ))}
        </g>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 1.6)}>
        <T x={480} y={340} size={14} fill={GREEN} anchor="start" weight={700}>
          {t("MERISTEMATIC ZONE", "MERISTEMATIC ZONE")}
        </T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 2.1)}>
        <T x={480} y={362} size={12} fill={INK} anchor="start">
          {t(
            "small, rapidly dividing cells — the engine room",
            "chhote, tezi se divide hote cells — engine room hai"
          )}
        </T>
      </Fade>

      {/* beat 3 — ZONE OF ELONGATION */}
      <Draw
        on={beat >= 3}
        delay={dl(3, 0.3)}
        d="M 396 315 L 396 245 M 444 315 L 444 245"
        stroke={AMBER_DARK}
        sw={1.8}
        dur={0.7}
      />
      <Draw on={beat >= 3} delay={dl(3, 0.9)} d="M 396 245 L 444 245" stroke={INK} sw={1.4} dur={0.4} />
      <Fade on={beat >= 3} delay={dl(3, 1.3)}>
        <Draw on={true} d={arrowD(420, 280, 420, 258)} stroke={AMBER_DARK} sw={1.6} dur={0.6} />
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 1.5)}>
        <Draw on={true} d={arrowD(420, 280, 420, 302)} stroke={AMBER_DARK} sw={1.6} dur={0.6} />
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 1.9)}>
        <T x={480} y={270} size={14} fill={AMBER_DARK} anchor="start" weight={700}>
          {t("ZONE OF ELONGATION", "ZONE OF ELONGATION")}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 2.4)}>
        <T x={480} y={292} size={12} fill={INK} anchor="start">
          {t(
            "cells stretch lengthwise — pushes the root down",
            "cells lambai mein khinchte — root ko neeche dhakelta hai"
          )}
        </T>
      </Fade>

      {/* beat 4 — ZONE OF MATURATION */}
      <Draw
        on={beat >= 4}
        delay={dl(4, 0.3)}
        d="M 396 245 L 396 150 M 444 245 L 444 150"
        stroke={INK}
        sw={1.8}
        dur={0.7}
      />
      <Draw on={beat >= 4} delay={dl(4, 0.9)} d="M 396 150 L 444 150" stroke={INK} sw={1.2} dur={0.4} />
      <Fade on={beat >= 4} delay={dl(4, 1.3)}>
        <Draw on={true} d={hairTicks} stroke={GREEN} sw={1.6} dur={0.9} />
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.7)}>
        <T x={480} y={185} size={14} fill={INK} anchor="start" weight={700}>
          {t("ZONE OF MATURATION", "ZONE OF MATURATION")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 2.2)}>
        <T x={480} y={207} size={12} fill={INK} anchor="start">
          {t(
            "cells differentiate — epidermis grows root hairs",
            "cells differentiate — epidermis root hairs nikalta hai"
          )}
        </T>
      </Fade>

      {/* beat 5 — root hairs = the working zone (ring + addendum) */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <Draw on={true} d={ringD(420, 198, 54, 48)} stroke={GREEN} sw={2} dur={0.8} />
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1.0)}>
        <T x={480} y={228} size={12} fill={GREEN} anchor="start" weight={700}>
          {t(
            "= WORKING ZONE — absorption + lateral roots start here",
            "= WORKING ZONE — absorption + lateral roots yahin se shuru"
          )}
        </T>
      </Fade>

      {/* beat 6 — hold the logic: division → elongation → maturation */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={482} size={13} fill={INK} script>
          {t("hold the logic:", "yeh logic pakadiye:")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 0.9)}>
        <Chip x={374} y={496} w={78} h={28} fill={GREEN} textFill={CREAM} size={12} script={false}>
          DIVISION
        </Chip>
      </Fade>
      <Draw on={beat >= 6} delay={dl(6, 1.3)} d={arrowD(452, 510, 486, 510)} stroke={INK} sw={1.6} dur={0.4} />
      <Fade on={beat >= 6} delay={dl(6, 1.6)}>
        <Chip x={488} y={496} w={91} h={28} fill={AMBER_DARK} textFill={CREAM} size={12} script={false}>
          ELONGATION
        </Chip>
      </Fade>
      <Draw on={beat >= 6} delay={dl(6, 2.0)} d={arrowD(579, 510, 613, 510)} stroke={INK} sw={1.6} dur={0.4} />
      <Fade on={beat >= 6} delay={dl(6, 2.3)}>
        <Chip x={615} y={496} w={91} h={28} fill={INK} textFill={CREAM} size={12} script={false}>
          MATURATION
        </Chip>
      </Fade>

      {/* beat 7 — whisper verdict: absorption is never at the very tip */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <Chip x={396} y={540} w={288} h={30} fill={INK} textFill={CREAM} size={15} script={false}>
          {t("root hairs = NEVER at the very tip", "root hairs = kabhi bhi tip par nahi")}
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.0)}>
        <T x={540} y={588} size={12} fill={RED}>
          {t(
            "an option saying 'hairs at the apex'? wrong before you finish reading",
            "option mein 'hairs apex par' dikhe? padhte hi galat samajh lijiye"
          )}
        </T>
      </Fade>
    </svg>
  );
}
