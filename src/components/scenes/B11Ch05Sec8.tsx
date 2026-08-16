"use client";

/**
 * B11 Ch05 · Section 8 — "Root modifications: a root doing another job"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 8.96, 19.8, 30.29, 47.53, 59.99, 75.26, 89.26]
 *        hi [0, 9.98, 21.33, 31.49, 47.36, 59.56, 78.17, 89.86]):
 *  0 title + hook: four jobs, four shapes [dim@1]
 *  1 grid frame opens + STORAGE (tap root swells): carrot, turnip
 *  2 STORAGE addon: adventitious root too — sweet potato (root, not stem)
 *  3 PROP ROOTS: aerial, branch→ground, support from ABOVE — banyan
 *  4 STILT ROOTS: from lower nodes, brace from BELOW — maize/sugarcane/screwpine
 *  5 PNEUMATOPHORES: grow UP, negatively geotropic, gas exchange
 *  6 PNEUMATOPHORES addon: mangrove trio — Rhizophora/Avicennia/Heritiera
 *  7 closing: "keep the triplet" — STILT ROOT→SUPPORT→SUGARCANE, caution chip
 *
 * Layout plan (Kalam bl−1.3s..+0.5s · Anek bl−0.78s..+0.31s). 2×2 grid,
 * divider at x540 (vert, y145–470) and y300 (horiz, x60–1020). Cell
 * template: icon ~x[cellX..cellX+70] y[cellY..cellY+80]; label x=cellX+90
 * (or +100 for pneumatophore) y=cellY+40; line1 y=cellY+88; line2 y=cellY+110.
 * Cells: STORAGE cellX70 cellY145 | PROP cellX590 cellY145
 *        STILT cellX70 cellY340 | PNEUMATOPHORE cellX590 cellY340
 *  b0 | title (script24 red)          | T mid  | x?..? y30..75 (bl63)
 *  b0 | underline                     | Draw   | y77 x330..750
 *  b0 | hook (script14 muted)         | T mid  | x?..? y88..109 (bl102) [dim@1]
 *  b1 | vert divider x540             | Draw   | y145..470
 *  b1 | horiz divider y300            | Draw   | x60..1020
 *  b1 | tap-root icon                 | Draw   | x84..126 y158..236
 *  b1 | "STORAGE" (16 amber-d)        | T start| x160..? y172..190 (bl185)
 *  b1 | storage fact1 (11 ink)        | T start| x70..~450 y228..240 (bl233)
 *  b2 | adventitious cluster          | Draw   | x130..165 y197..230
 *  b2 | storage addon (11 amber-d)    | T start| x70..~416 y248..260 (bl255)
 *  b3 | prop icon                     | Draw   | x595..665 y165..220
 *  b3 | "PROP ROOTS" (16 green)       | T start| x680..? y172..190 (bl185)
 *  b3 | prop fact1 (12 ink)           | T start| x590..~900 y227..239 (bl233)
 *  b3 | prop example (13 green)       | T start| x590..~850 y249..262 (bl255)
 *  b4 | stilt icon                    | Draw   | x75..139 y355..418
 *  b4 | "STILT ROOTS" (16 amber-d)    | T start| x160..? y367..385 (bl380)
 *  b4 | stilt fact1 (12 ink)          | T start| x70..~380 y422..434 (bl428)
 *  b4 | stilt example (13 amber-d)    | T start| x70..~370 y444..457 (bl450)
 *  b5 | pneumatophore icon            | Draw   | x588..667 y355..420
 *  b5 | "PNEUMATOPHORES" (15 green)   | T start| x690..? y367..384 (bl380)
 *  b5 | pneumato fact1 (12 ink)       | T start| x590..~980 y422..434 (bl428)
 *  b6 | pneumato addon (12 green)     | T start| x590..~950 y444..457 (bl450)
 *  b7 | header (script13 ink)         | T mid  | x?..? y483..506 (bl500)
 *  b7 | chip STILT ROOT               | Chip   | x387..473 y512..542
 *  b7 | arrow 1                       | Draw   | x473..509 y527
 *  b7 | chip SUPPORT                  | Chip   | x509..577 y512..542
 *  b7 | arrow 2                       | Draw   | x577..613 y527
 *  b7 | chip SUGARCANE                | Chip   | x613..693 y512..542
 *  b7 | caution (12 red)              | T mid  | x?..? y563..576 (bl572)
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

export default function B11Ch05Sec8({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={63} size={24} fill={RED} script>
          {t("root modifications: a root doing another job", "root modifications: root ka doosra kaam")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 0.3)} d="M 330 77 C 420 74, 660 74, 750 77" stroke={RED} sw={2.2} dur={0.6} />
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 1.4)}>
        <T x={540} y={102} size={14} fill={MUTED} script>
          {t("four jobs, four shapes — same organ, different work", "chaar jobs, chaar shapes — wahi organ, alag kaam")}
        </T>
      </Fade>

      {/* beat 1 — grid frame + STORAGE (tap root) */}
      <Draw on={beat >= 1} delay={dl(1, 0.2)} d="M 540 145 L 540 470" stroke={INK} sw={1.6} dur={0.5} />
      <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 60 300 L 1020 300" stroke={INK} sw={1.6} dur={0.5} />
      <Draw
        on={beat >= 1}
        delay={dl(1, 0.8)}
        d="M 105 158 C 114 158, 118 170, 117 185 C 116 194, 111 199, 105 201 C 99 199, 94 194, 93 185 C 92 170, 96 158, 105 158 Z M 96 166 L 86 162 M 114 166 L 124 162"
        stroke={AMBER_DARK}
        sw={1.8}
        dur={0.7}
      />
      <Fade on={beat >= 1} delay={dl(1, 1.1)}>
        <T x={160} y={185} size={16} fill={AMBER_DARK} anchor="start" weight={700}>
          STORAGE
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1.5)}>
        <T x={70} y={240} size={11} fill={INK} anchor="start">
          {t("tap root swells — e.g. CARROT, TURNIP", "tap root fulkar swell hota — e.g. CARROT, TURNIP")}
        </T>
      </Fade>

      {/* beat 2 — STORAGE addon: adventitious root, sweet potato */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <Draw
          on={true}
          d="M 133 206 C 138 203, 142 207, 140 214 C 139 219, 134 220, 131 216 C 129 212, 130 208, 133 206 Z M 147 204 C 151 202, 156 205, 155 211 C 154 215, 150 217, 147 214 C 145 211, 145 207, 147 204 Z"
          stroke={AMBER_DARK}
          sw={1.6}
          dur={0.7}
        />
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 1.1)}>
        <T x={70} y={265} size={11} fill={AMBER_DARK} anchor="start" weight={700}>
          {t(
            "+ adventitious root too — SWEET POTATO (a root, not a stem!)",
            "+ adventitious root bhi — SWEET POTATO (root hai, stem nahi!)"
          )}
        </T>
      </Fade>

      {/* beat 3 — PROP ROOTS: aerial, branch to ground, support from above */}
      <Draw on={beat >= 3} delay={dl(3, 0.2)} d="M 600 165 L 660 165" stroke={GREEN} sw={1.8} dur={0.4} />
      <Draw
        on={beat >= 3}
        delay={dl(3, 0.5)}
        d="M 615 165 L 610 215 M 645 165 L 650 215"
        stroke={GREEN}
        sw={1.8}
        dur={0.5}
      />
      <Draw on={beat >= 3} delay={dl(3, 0.9)} d="M 595 220 L 665 220" stroke={INK} sw={1.4} dur={0.3} />
      <Fade on={beat >= 3} delay={dl(3, 1.2)}>
        <T x={680} y={185} size={16} fill={GREEN} anchor="start" weight={700}>
          {t("PROP ROOTS", "PROP ROOTS")}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 1.6)}>
        <T x={590} y={233} size={12} fill={INK} anchor="start">
          {t("aerial roots, branch → ground — support from ABOVE", "aerial roots, branch se ground tak — support UPAR se")}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 2.2)}>
        <T x={590} y={255} size={13} fill={GREEN} anchor="start" weight={700}>
          {t("e.g. BANYAN (Ficus benghalensis)", "e.g. BANYAN (Ficus benghalensis)")}
        </T>
      </Fade>

      {/* beat 4 — STILT ROOTS: lower nodes, brace from below */}
      <Draw on={beat >= 4} delay={dl(4, 0.2)} d="M 107 355 L 107 385" stroke={AMBER_DARK} sw={1.8} dur={0.3} />
      <Draw
        on={beat >= 4}
        delay={dl(4, 0.5)}
        d="M 107 385 L 82 418 M 107 385 L 107 418 M 107 385 L 132 418"
        stroke={AMBER_DARK}
        sw={1.8}
        dur={0.5}
      />
      <Draw on={beat >= 4} delay={dl(4, 0.9)} d="M 75 418 L 139 418" stroke={INK} sw={1.4} dur={0.3} />
      <Fade on={beat >= 4} delay={dl(4, 1.2)}>
        <T x={160} y={380} size={16} fill={AMBER_DARK} anchor="start" weight={700}>
          {t("STILT ROOTS", "STILT ROOTS")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.6)}>
        <T x={70} y={428} size={12} fill={INK} anchor="start">
          {t("from lower nodes — brace from BELOW", "lower nodes se — support NEECHE se")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 2.2)}>
        <T x={70} y={450} size={13} fill={AMBER_DARK} anchor="start" weight={700}>
          {t("e.g. maize · sugarcane · screwpine", "e.g. maize · sugarcane · screwpine")}
        </T>
      </Fade>

      {/* beat 5 — PNEUMATOPHORES: grow up, negatively geotropic */}
      <Draw
        on={beat >= 5}
        delay={dl(5, 0.2)}
        d="M 588 405 C 602 400, 616 410, 630 405 C 644 400, 658 410, 667 405"
        stroke={INK}
        sw={1.6}
        dur={0.5}
      />
      <Draw on={beat >= 5} delay={dl(5, 0.7)} d={arrowD(605, 405, 605, 362)} stroke={GREEN} sw={1.6} dur={0.4} />
      <Draw on={beat >= 5} delay={dl(5, 0.9)} d={arrowD(625, 405, 625, 355)} stroke={GREEN} sw={1.6} dur={0.4} />
      <Draw on={beat >= 5} delay={dl(5, 1.1)} d={arrowD(645, 405, 645, 365)} stroke={GREEN} sw={1.6} dur={0.4} />
      <Fade on={beat >= 5} delay={dl(5, 1.4)}>
        <T x={690} y={380} size={15} fill={GREEN} anchor="start" weight={700}>
          {t("PNEUMATOPHORES", "PNEUMATOPHORES")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1.8)}>
        <T x={590} y={428} size={12} fill={INK} anchor="start">
          {t("grow UP — negatively geotropic, gas exchange", "UPAR badhte — negatively geotropic, gas exchange")}
        </T>
      </Fade>

      {/* beat 6 — PNEUMATOPHORES addon: mangrove trio */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={590} y={450} size={12} fill={GREEN} anchor="start" weight={700}>
          {t("mangroves: Rhizophora · Avicennia · Heritiera", "mangroves: Rhizophora · Avicennia · Heritiera")}
        </T>
      </Fade>

      {/* beat 7 — closing: keep the triplet */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={540} y={500} size={13} fill={INK} script>
          {t("keep the triplet:", "yeh triplet yaad rakhiye:")}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 0.9)}>
        <Chip x={387} y={512} w={86} h={30} fill={AMBER_DARK} textFill={CREAM} size={12} script={false}>
          STILT ROOT
        </Chip>
      </Fade>
      <Draw on={beat >= 7} delay={dl(7, 1.3)} d={arrowD(473, 527, 509, 527)} stroke={INK} sw={1.6} dur={0.4} />
      <Fade on={beat >= 7} delay={dl(7, 1.6)}>
        <Chip x={509} y={512} w={68} h={30} fill={GREEN} textFill={CREAM} size={12} script={false}>
          SUPPORT
        </Chip>
      </Fade>
      <Draw on={beat >= 7} delay={dl(7, 2.0)} d={arrowD(577, 527, 613, 527)} stroke={INK} sw={1.6} dur={0.4} />
      <Fade on={beat >= 7} delay={dl(7, 2.3)}>
        <Chip x={613} y={512} w={80} h={30} fill={INK} textFill={CREAM} size={12} script={false}>
          SUGARCANE
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 2.9)}>
        <T x={540} y={572} size={12} fill={RED}>
          {t("the bare term alone rarely earns the mark", "sirf term bolne se mark shayad hi milta")}
        </T>
      </Fade>
    </svg>
  );
}
