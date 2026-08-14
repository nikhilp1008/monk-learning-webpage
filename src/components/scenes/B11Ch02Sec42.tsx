"use client";

/**
 * B11 Ch02 · Section 42 — "Alternation of generations"
 * Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0, 13.82, 25.86, 44.54, 66.22, 74.07, 98.05, 122.54]):
 *  0 title only — the most-tested plant feature
 *  1 setup: two phases alternate — not one body plan, but two, taking turns
 *  2 TOP node SPOROPHYTE(2n) --meiosis--> RIGHT node SPORES(n)
 *  3 BOTTOM node GAMETOPHYTE(n) --mitosis--> LEFT node GAMETES(n) --fertilisation--> TOP
 *  4 the closing arrow: RIGHT --grows into--> BOTTOM (the loop completes)
 *  5 "round and round" — small loop icon in the diamond's centre
 *  6 refinement: gametophyte dominant in bryophytes; sporophyte in pterido/gymno/angio
 *  7 named mapping: moss=gametophyte; fern/pine/mango=sporophyte — universal in Plantae
 *
 * Layout plan (Anek bl−0.78s..+0.31s, Kalam bl−1.3s..+0.5s):
 *  title (persist)         | T mid script20 RED     | x540 y58
 *  title swoosh              | Draw                    | y76 x340..740
 *  b1 setup (Anek14)         | T mid                   | x540 y130
 *  b2 TOP chip SPOROPHYTE    | Chip x445 y243 w190 h44 (INK)
 *  b2 RIGHT chip SPORES      | Chip x785 y335 w150 h40 (CREAM/AMBER_DARK)
 *  b2 arrow TOP->RIGHT + "meiosis"| Draw / T             | (625,278)->(788,345) label 715,295
 *  b3 BOTTOM chip GAMETOPHYTE| Chip x445 y423 w190 h44 (INK)
 *  b3 LEFT chip GAMETES      | Chip x145 y335 w150 h40 (CREAM/AMBER_DARK)
 *  b3 arrow BOTTOM->LEFT + "mitosis" | Draw / T          | (452,432)->(285,368) label 345,420
 *  b3 arrow LEFT->TOP + "fertilisation"| Draw / T        | (280,340)->(455,278) label 345,295
 *  b4 arrow RIGHT->BOTTOM + "grows into"| Draw / T       | (800,372)->(628,432) label 715,420
 *  b5 centre ring + "round and round"| Draw / T          | ring c540,355 rx25 ry20; text y395
 *  b6 line1/line2 (Anek14)   | T mid                    | x540 y490/y520
 *  b7 line3 (Anek14 RED)     | T mid                    | x540 y550
 *  b7 line4 (Kalam14 GREEN)  | T mid                    | x540 y584
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, arrowD, ringD, INK, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

export default function B11Ch02Sec42({ currentTime, reveals, language }: SceneProps) {
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
      {/* title — persists whole scene */}
      <Fade on={beat >= 0} delay={dl(0, 0.2)}>
        <T x={540} y={58} size={20} fill={RED} script>
          {t("alternation of generations — the cycle", "alternation of generations — the cycle")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 1.8)} d="M 340 76 C 420 72, 660 72, 740 76" stroke={RED} sw={2.2} dur={0.5} />

      {/* beat 1 — setup: two phases alternate */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={540} y={130} size={14} fill={INK} anchor="middle">
          {t(
            "two phases alternate — not one body plan, but two, taking turns",
            "do phases alternate karte — ek body plan nahi, do, baari baari"
          )}
        </T>
      </Fade>

      {/* beat 2 — TOP sporophyte -> meiosis -> RIGHT spores */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <Chip x={445} y={243} w={190} h={44} fill={INK} textFill={CREAM} size={14} script={false}>
          SPOROPHYTE (2n)
        </Chip>
      </Fade>
      <Draw on={beat >= 2} delay={dl(2, 1)} d={arrowD(625, 278, 788, 345)} stroke={AMBER_DARK} sw={2} dur={0.5} />
      <Fade on={beat >= 2} delay={dl(2, 1.6)}>
        <T x={715} y={295} size={14} fill={AMBER_DARK} weight={700} anchor="middle">
          {t("meiosis", "meiosis")}
        </T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 2.1)}>
        <Chip x={785} y={335} w={150} h={40} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={14} script={false}>
          SPORES (n)
        </Chip>
      </Fade>

      {/* beat 3 — BOTTOM gametophyte -> mitosis -> LEFT gametes -> fertilisation -> TOP */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <Chip x={445} y={423} w={190} h={44} fill={INK} textFill={CREAM} size={14} script={false}>
          GAMETOPHYTE (n)
        </Chip>
      </Fade>
      <Draw on={beat >= 3} delay={dl(3, 1)} d={arrowD(452, 432, 285, 368)} stroke={AMBER_DARK} sw={2} dur={0.5} />
      <Fade on={beat >= 3} delay={dl(3, 1.6)}>
        <T x={345} y={420} size={14} fill={AMBER_DARK} weight={700} anchor="middle">
          {t("mitosis", "mitosis")}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 2.1)}>
        <Chip x={145} y={335} w={150} h={40} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={14} script={false}>
          GAMETES (n)
        </Chip>
      </Fade>
      <Draw on={beat >= 3} delay={dl(3, 2.8)} d={arrowD(280, 340, 455, 278)} stroke={GREEN} sw={2} dur={0.5} />
      <Fade on={beat >= 3} delay={dl(3, 3.4)}>
        <T x={345} y={295} size={14} fill={GREEN} weight={700} anchor="middle">
          {t("fertilisation", "fertilisation")}
        </T>
      </Fade>

      {/* beat 4 — the closing arrow: spores grow into the gametophyte */}
      <Draw on={beat >= 4} delay={dl(4, 0.3)} d={arrowD(800, 372, 628, 432)} stroke={AMBER_DARK} sw={2} dur={0.5} />
      <Fade on={beat >= 4} delay={dl(4, 1)}>
        <T x={715} y={420} size={14} fill={AMBER_DARK} weight={700} anchor="middle">
          {t("grows into", "banta hai")}
        </T>
      </Fade>

      {/* beat 5 — round and round, in the diamond's own centre */}
      <Draw on={beat >= 5} delay={dl(5, 0.3)} d={ringD(540, 355, 25, 20)} stroke={GREEN} sw={2} dur={0.7} />
      <Fade on={beat >= 5} delay={dl(5, 1.2)}>
        <T x={540} y={395} size={13} fill={GREEN} script>
          {t("round and round", "gol gol chalta rahta")}
        </T>
      </Fade>

      {/* beat 6 — refinement: which phase dominates where */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={490} size={14} fill={GREEN} weight={700} anchor="middle">
          {t(
            "gametophyte dominates in bryophytes — moss IS the visible plant",
            "gametophyte dominant hai bryophytes mein — moss hi visible plant hai"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 0.9)}>
        <T x={540} y={520} size={14} fill={AMBER_DARK} weight={700} anchor="middle">
          {t(
            "sporophyte dominates in pteridophytes, gymnosperms, angiosperms",
            "sporophyte dominant hai pteridophytes, gymnosperms, angiosperms mein"
          )}
        </T>
      </Fade>

      {/* beat 7 — the named mapping, and the universal closer */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={540} y={550} size={14} fill={RED} weight={700} anchor="middle">
          {t(
            "moss → gametophyte · fern, pine, mango → all sporophyte",
            "moss → gametophyte · fern, pine, mango → sab sporophyte"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1)}>
        <T x={540} y={584} size={14} fill={GREEN} script>
          {t("universal in Plantae — the plant signature", "Plantae mein universal — plant ka signature")}
        </T>
      </Fade>
    </svg>
  );
}
