"use client";

/**
 * B11 Ch05 · Section 9 — "Stem modifications: underground and subaerial"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 10.5, 21.16, 38.49, 48.21, 59.82, 77.57, 89.43]
 *        hi [0, 11.18, 19.2, 31.4, 41.3, 52.82, 70.83, 80.38]):
 *  0 title + hook: underground family first, then subaerial [dim@1]
 *  1 underground stems named: RHIZOME · TUBER · CORM · BULB (ground line +
 *    4 icons) — "four names, one address"
 *  2 their jobs (set of three): STORAGE, PERENNATION, VEGETATIVE PROPAGATION
 *  3 examples: ginger=rhizome, potato=tuber, + turmeric/zaminkand/Colocasia
 *    (narration does not pair these last 3 to corm vs bulb individually —
 *    NOT invented here, listed as "more of the family" only)
 *  4 why still a stem: keeps nodes, scale-leaves, buds
 *  5 second family intro: SUBAERIAL stems + RUNNER/STOLON icon+label
 *  6 RUNNER: rooting tip = the point, vegetative spread — mint, jasmine
 *  7 OFFSET (aquatic version): one internode, rosette + root tuft — Pistia,
 *    Eichhornia
 *
 * Layout plan (Kalam bl−1.3s..+0.5s · Anek bl−0.78s..+0.31s). No dividers —
 * two loose families stacked top/bottom, each a single row of items.
 * TOP (underground) columns x=162/414/666/918 (RHIZOME/TUBER/CORM/BULB):
 *  b0 | title (script24 red)          | T mid  | x?..? y30..75 (bl63)
 *  b0 | underline                     | Draw   | y77 x330..750
 *  b0 | hook (script14 muted)         | T mid  | x?..? y88..109 (bl102) [dim@1]
 *  b1 | ground line                   | Draw   | y150 x120..960
 *  b1 | 4 icons                       | Draw   | y155..221 per column
 *  b1 | 4 labels (13 amber-d)         | T mid  | per column y226..240 (bl235)
 *  b2 | 3 job chips                   | Chip   | y255..283 x357..723
 *  b3 | examples (13 ink)             | T mid  | x?..? y301..314 (bl307)
 *  b4 | why-stem chip (14 ink/cream)  | Chip   | x359..721 y325..355
 *  b5 | mini-header (13 green script) | T mid  | x?..? y389..411 (bl400)
 *  b5 | RUNNER icon                   | Draw   | x95..420 y417..479
 *  b5 | "RUNNER / STOLON" (15 green)  | T mid  | x?..? y476..494 (bl490)
 *  b6 | runner fact (12 ink)          | T mid  | x?..? y498..515 (bl512)
 *  b6 | runner example (13 green)     | T mid  | x?..? y518..535 (bl532)
 *  b7 | OFFSET icon                   | Draw   | x615..850 y435..488
 *  b7 | "OFFSET" (15 green)           | T mid  | x?..? y476..494 (bl490)
 *  b7 | offset fact (12 ink)          | T mid  | x?..? y498..515 (bl512)
 *  b7 | offset example (13 green)     | T mid  | x?..? y518..535 (bl532)
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

export default function B11Ch05Sec9({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  // underground icons, each drawn as an independent path so beat1 can
  // stagger them ("one hand": rhizome -> tuber -> corm -> bulb)
  const rhizomeD =
    "M 132 190 C 132 178, 145 172, 162 172 C 179 172, 192 178, 192 190 C 192 202, 179 208, 162 208 C 145 208, 132 202, 132 190 Z " +
    "M 145 208 L 140 216 M 162 208 L 162 217 M 179 208 L 184 216";
  const tuberD =
    "M 414 165 C 432 165, 444 178, 444 195 C 444 212, 432 220, 414 220 C 396 220, 384 212, 384 195 C 384 178, 396 165, 414 165 Z " +
    "M 406 186 C 408 186, 409 187, 409 189 C 409 191, 408 192, 406 192 C 404 192, 403 191, 403 189 C 403 187, 404 186, 406 186 Z " +
    "M 423 200 C 425 200, 426 201, 426 203 C 426 205, 425 206, 423 206 C 421 206, 420 205, 420 203 C 420 201, 421 200, 423 200 Z";
  const cormD =
    "M 636 185 C 636 172, 650 165, 666 165 C 682 165, 696 172, 696 185 C 696 205, 682 218, 666 218 C 650 218, 636 205, 636 185 Z " +
    "M 645 180 L 687 180 M 642 195 L 690 195";
  const bulbD =
    "M 888 168 C 905 168, 918 180, 918 197 C 918 213, 905 222, 888 222 C 871 222, 858 213, 858 197 C 858 180, 871 168, 888 168 Z " +
    "M 872 178 C 880 174, 896 174, 904 178 M 868 195 C 878 190, 898 190, 908 195";

  return (
    <svg
      viewBox="0 0 1080 620"
      preserveAspectRatio="xMidYMin meet"
      className="w-full h-full select-none"
    >
      {/* title — always on */}
      <Fade on={true}>
        <T x={540} y={63} size={24} fill={RED} script>
          {t("stem modifications: underground and subaerial", "stem modifications: underground aur subaerial")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 0.3)} d="M 330 77 C 420 74, 660 74, 750 77" stroke={RED} sw={2.2} dur={0.6} />
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 1.4)}>
        <T x={540} y={102} size={14} fill={MUTED} script>
          {t("underground stems first, then surface runners", "pehle underground stems, phir surface runners")}
        </T>
      </Fade>

      {/* beat 1 — the four underground stems: rhizome, tuber, corm, bulb */}
      <Draw on={beat >= 1} delay={dl(1, 0.2)} d="M 120 150 L 960 150" stroke={INK} sw={1.4} dur={0.5} />
      <Draw on={beat >= 1} delay={dl(1, 0.5)} d={rhizomeD} stroke={AMBER_DARK} sw={1.8} dur={0.5} />
      <Draw on={beat >= 1} delay={dl(1, 0.9)} d={tuberD} stroke={AMBER_DARK} sw={1.8} dur={0.5} />
      <Draw on={beat >= 1} delay={dl(1, 1.3)} d={cormD} stroke={AMBER_DARK} sw={1.8} dur={0.5} />
      <Draw on={beat >= 1} delay={dl(1, 1.7)} d={bulbD} stroke={AMBER_DARK} sw={1.8} dur={0.5} />
      <Fade on={beat >= 1} delay={dl(1, 1.0)}>
        <T x={162} y={235} size={13} fill={AMBER_DARK} weight={700}>
          RHIZOME
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1.4)}>
        <T x={414} y={235} size={13} fill={AMBER_DARK} weight={700}>
          TUBER
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1.8)}>
        <T x={666} y={235} size={13} fill={AMBER_DARK} weight={700}>
          CORM
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 2.2)}>
        <T x={918} y={235} size={13} fill={AMBER_DARK} weight={700}>
          BULB
        </T>
      </Fade>

      {/* beat 2 — jobs, a set of three */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <Chip x={357} y={255} w={68} h={28} fill={GREEN} textFill={CREAM} size={12} script={false}>
          STORAGE
        </Chip>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 0.7)}>
        <Chip x={449} y={255} w={92} h={28} fill={GREEN} textFill={CREAM} size={12} script={false}>
          PERENNATION
        </Chip>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 1.1)}>
        <Chip x={565} y={255} w={158} h={28} fill={GREEN} textFill={CREAM} size={12} script={false}>
          VEGETATIVE PROPAGATION
        </Chip>
      </Fade>

      {/* beat 3 — examples */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={540} y={307} size={13} fill={INK}>
          {t(
            "ginger = RHIZOME · potato = TUBER · + turmeric, zaminkand, Colocasia",
            "ginger = RHIZOME · potato = TUBER · + turmeric, zaminkand, Colocasia"
          )}
        </T>
      </Fade>

      {/* beat 4 — why still a stem */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <Chip x={359} y={325} w={362} h={30} fill={INK} textFill={CREAM} size={14} script={false}>
          {t("still a STEM — keeps NODES, SCALE-LEAVES, BUDS", "phir bhi STEM hai — NODES, SCALE-LEAVES, BUDS rakhta")}
        </Chip>
      </Fade>

      {/* beat 5 — second family: subaerial + RUNNER icon */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={540} y={400} size={13} fill={GREEN} script>
          {t(
            "second family: SUBAERIAL stems — run along the surface",
            "doosra family: SUBAERIAL stems — surface par daurte"
          )}
        </T>
      </Fade>
      <Draw on={beat >= 5} delay={dl(5, 0.7)} d="M 95 479 L 420 479" stroke={INK} sw={1.4} dur={0.4} />
      <Draw on={beat >= 5} delay={dl(5, 1.0)} d="M 120 445 L 120 417" stroke={GREEN} sw={1.8} dur={0.3} />
      <Draw
        on={beat >= 5}
        delay={dl(5, 1.3)}
        d="M 120 445 C 180 453, 260 453, 330 445 C 365 441, 385 447, 393 465"
        stroke={GREEN}
        sw={1.8}
        dur={0.7}
      />
      <Draw on={beat >= 5} delay={dl(5, 2.0)} d="M 393 465 L 388 479 M 393 465 L 397 479" stroke={GREEN} sw={1.6} dur={0.3} />
      <Fade on={beat >= 5} delay={dl(5, 2.3)}>
        <T x={260} y={490} size={15} fill={GREEN} weight={700}>
          {t("RUNNER / STOLON", "RUNNER / STOLON")}
        </T>
      </Fade>

      {/* beat 6 — runner fact + example */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={260} y={512} size={12} fill={INK}>
          {t("rooting tip = the point — vegetative spread", "rooting tip hi point hai — vegetative spread")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={260} y={532} size={13} fill={GREEN} weight={700}>
          {t("e.g. mint, jasmine", "e.g. mint, jasmine")}
        </T>
      </Fade>

      {/* beat 7 — OFFSET: aquatic version */}
      <Draw
        on={beat >= 7}
        delay={dl(7, 0.2)}
        d="M 615 465 C 650 460, 690 470, 730 465 C 770 460, 810 470, 850 465"
        stroke={INK}
        sw={1.4}
        dur={0.5}
      />
      <Draw on={beat >= 7} delay={dl(7, 0.6)} d="M 660 463 L 690 463" stroke={GREEN} sw={3} dur={0.3} />
      <Draw
        on={beat >= 7}
        delay={dl(7, 0.9)}
        d="M 750 463 L 740 440 M 750 463 L 750 435 M 750 463 L 760 440 M 750 463 L 765 447"
        stroke={GREEN}
        sw={1.6}
        dur={0.4}
      />
      <Draw
        on={beat >= 7}
        delay={dl(7, 1.3)}
        d="M 750 463 L 745 485 M 750 463 L 750 488 M 750 463 L 756 485"
        stroke={GREEN}
        sw={1.6}
        dur={0.4}
      />
      <Fade on={beat >= 7} delay={dl(7, 1.2)}>
        <T x={800} y={448} size={15} fill={GREEN} anchor="start" weight={700}>
          OFFSET
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.6)}>
        <T x={780} y={512} size={12} fill={INK}>
          {t(
            "aquatic version — ONE internode, rosette + root tuft",
            "aquatic version — SIRF ek internode, rosette + root tuft"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 2.0)}>
        <T x={780} y={532} size={13} fill={GREEN} weight={700}>
          {t("e.g. Pistia, Eichhornia", "e.g. Pistia, Eichhornia")}
        </T>
      </Fade>
    </svg>
  );
}
