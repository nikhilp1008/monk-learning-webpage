"use client";

/**
 * B11 Ch05 · Section 3 — "Nodes, internodes and buds: the railway analogy"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 7.77, 19.63, 30.89, 40.11, 53.93, 68.1, 76.63]
 *        hi [0, 6.14, 15.19, 25.34, 31.91, 43.61, 54.27, 62.46]):
 *  0 title + hook: stem = railway line, nodes = stations [dim@1]
 *  1 DIAGRAM: stem line + 3 station dots (nodes) + a leaf boarding at one
 *  2 NODE: ring the boarding station + glossary line 1
 *  3 INTERNODE: highlight the track stretch before it + glossary line 2
 *  4 BUD: terminal bud at the line's end, axillary bud at the leaf's axil +
 *    glossary lines 3–4
 *  5 root has no railway line at all — wavy root path, no stations, crossed
 *  6 verdict: "no nodes + no internodes = ROOT, not an underground stem"
 *  7 chuckle: potato (eyes = buds at nodes → stem) vs sweet potato (no buds
 *    → root)
 *
 * Layout plan (Kalam bl−1.3s..+0.5s · Anek bl−0.78s..+0.31s). Diagram top,
 * glossary accumulates left column (x150 start) while the root comparison
 * uses the right column (x600–900) at the same height — deliberate
 * side-by-side deviation from the default row bands (thirds/halves guide).
 *  b0 | title (script25 red)          | T mid  | x?..? y30..77 (bl64)
 *  b0 | underline                     | Draw   | y78 x340..740
 *  b0 | hook (script15 muted)         | T mid  | x?..? y85..112 (bl104) [dim@1]
 *  b1 | stem line                     | Draw   | y200 x150..740
 *  b1 | 3 station dots                | Draw   | c260/430/600,200 r5
 *  b1 | leaf boarding icon             | Draw   | x415..445 y158..200
 *  b2 | ring on boarding node          | Draw   | c430,200 rx19 ry17
 *  b2 | glossary "NODE — …"            | T st   | x150..~560 y280..294 (bl290)
 *  b3 | internode highlight bar        | Draw   | y214 x260..430
 *  b3 | glossary "INTERNODE — …"       | T st   | x150..~470 y314..328 (bl324)
 *  b4 | terminal bud icon              | Draw   | x730..750 y170..200
 *  b4 | axillary bud dot               | Draw   | c440,210 r4
 *  b4 | glossary "BUD — …"             | T st   | x150..~420 y348..362 (bl358)
 *  b4 | glossary "terminal @…axil"     | T st   | x150..~480 y373..386 (bl382)
 *  b5 | "ROOT" heading                 | T mid  | x720..780 y259..274 (bl270)
 *  b5 | root wavy path (no stations)   | Draw   | x600..900 y280..340
 *  b5 | red X (no station here)        | Draw   | x726..762 y306..324
 *  b5 | root caption                   | T mid  | x?..? y356..369 (bl365)
 *  b6 | verdict chip (14 ink/cream)    | Chip   | x305..775 y423..457
 *  b6 | stamp underline                | Draw   | y468 x305..775
 *  b7 | potato blob + 3 eyes           | Draw   | x258..380 y500..573
 *  b7 | potato caption                 | T mid  | x222..438 y573..587 (bl584)
 *  b7 | sweet-potato blob (no eyes)    | Draw   | x655..775 y500..573
 *  b7 | sweet-potato caption           | T mid  | x626..824 y573..587 (bl584)
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
  ringD,
  crossD,
  INK,
  MUTED,
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
} from "./kit";

export default function B11Ch05Sec3({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={64} size={25} fill={RED} script>
          {t("the railway analogy: nodes, internodes, buds", "railway analogy: nodes, internodes, buds")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 0.3)} d="M 340 78 C 430 75, 650 75, 740 78" stroke={RED} sw={2.2} dur={0.6} />
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 1.4)}>
        <T x={540} y={104} size={15} fill={MUTED} script>
          {t(
            "picture the stem as a railway line — nodes are its stations",
            "stem ko socho railway line jaisa — nodes uske stations hain"
          )}
        </T>
      </Fade>

      {/* beat 1 — the line, its stations, and a leaf boarding one */}
      <Draw on={beat >= 1} delay={dl(1, 0.3)} d="M 150 200 L 740 200" stroke={INK} sw={2.4} dur={1.2} />
      <Fade on={beat >= 1} delay={dl(1, 1.6)}>
        <Draw on={true} d="M 255 200 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0" stroke={INK} sw={1.4} fill={INK} dur={0.3} />
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1.8)}>
        <Draw on={true} d="M 425 200 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0" stroke={INK} sw={1.4} fill={INK} dur={0.3} />
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 2)}>
        <Draw on={true} d="M 595 200 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0" stroke={INK} sw={1.4} fill={INK} dur={0.3} />
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 2.5)}>
        <Draw
          on={true}
          d="M 430 200 C 415 182, 415 168, 430 158 C 445 168, 445 182, 430 200 Z"
          stroke={GREEN}
          sw={1.2}
          fill={GREEN}
          dur={0.8}
        />
      </Fade>

      {/* beat 2 — NODE: ring the boarding station */}
      <Draw on={beat >= 2} delay={dl(2, 0.3)} d={ringD(430, 200, 19, 17)} stroke={AMBER_DARK} sw={2} dur={0.7} />
      <Fade on={beat >= 2} delay={dl(2, 1.1)}>
        <T x={150} y={290} size={13} fill={AMBER_DARK} weight={700} anchor="start">
          {t(
            "NODE — point on a stem where a leaf (or whorl) arises",
            "NODE — stem ka woh point jahan leaf (ya whorl) arise karta hai"
          )}
        </T>
      </Fade>

      {/* beat 3 — INTERNODE: the stretch of empty track */}
      <Draw on={beat >= 3} delay={dl(3, 0.3)} d="M 260 214 L 430 214" stroke={GREEN} sw={4} dur={0.8} />
      <Fade on={beat >= 3} delay={dl(3, 1.2)}>
        <T x={150} y={324} size={13} fill={GREEN} weight={700} anchor="start">
          {t("INTERNODE — stem between two successive nodes", "INTERNODE — do successive nodes ke beech ka stem")}
        </T>
      </Fade>

      {/* beat 4 — BUD: terminal at the apex, axillary at the leaf's axil */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <Draw
          on={true}
          d="M 740 200 C 730 188, 730 178, 740 170 C 750 178, 750 188, 740 200 Z"
          stroke={AMBER_DARK}
          sw={1.2}
          fill={AMBER_DARK}
          dur={0.6}
        />
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1)}>
        <Draw
          on={true}
          d="M 436 210 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0"
          stroke={AMBER_DARK}
          sw={1.2}
          fill={AMBER_DARK}
          dur={0.4}
        />
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.7)}>
        <T x={150} y={358} size={13} fill={AMBER_DARK} weight={700} anchor="start">
          {t("BUD — a compact, undeveloped shoot", "BUD — ek compact, undeveloped shoot")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 2.4)}>
        <T x={150} y={382} size={12} fill={INK} anchor="start">
          {t(
            "terminal bud @ the apex · axillary bud @ the leaf's axil",
            "terminal bud apex par · axillary bud leaf ke axil mein"
          )}
        </T>
      </Fade>

      {/* beat 5 — the root has no railway line at all */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={750} y={270} size={14} fill={INK} weight={700}>
          ROOT
        </T>
      </Fade>
      <Draw
        on={beat >= 5}
        delay={dl(5, 1)}
        d="M 600 290 C 650 310, 700 280, 750 315 C 800 340, 850 300, 900 340"
        stroke={INK}
        sw={2.2}
        dur={1}
      />
      <Draw on={beat >= 5} delay={dl(5, 2.1)} d={crossD(742, 306, 16, 18)} stroke={RED} sw={1.8} dur={0.4} />
      <Fade on={beat >= 5} delay={dl(5, 2.7)}>
        <T x={750} y={365} size={12} fill={INK}>
          {t(
            "no railway line — no stations, no internodes, no boarding points",
            "koi railway line nahi — na stations, na internodes, na boarding points"
          )}
        </T>
      </Fade>

      {/* beat 6 — verdict: absence of nodes+internodes = root */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <Chip x={305} y={423} w={470} h={34} fill={INK} textFill={CREAM} size={14} script={false}>
          {t(
            "no nodes + no internodes = ROOT (not an underground stem)",
            "no nodes + no internodes = ROOT (underground stem nahi)"
          )}
        </Chip>
      </Fade>
      <Draw on={beat >= 6} delay={dl(6, 1.3)} d="M 305 468 L 775 468" stroke={INK} sw={2} dur={0.5} />

      {/* beat 7 — chuckle: potato (stem) vs sweet potato (root) */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <Draw
          on={true}
          d="M 300 510 C 260 500, 258 550, 298 562 C 338 573, 380 552, 378 525 C 376 500, 338 500, 300 510 Z"
          stroke={AMBER_DARK}
          sw={2}
          fill={CREAM}
          dur={0.8}
        />
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.3)}>
        <Draw on={true} d="M 307 519 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0" stroke={AMBER_DARK} sw={1} fill={AMBER_DARK} dur={0.3} />
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.5)}>
        <Draw on={true} d="M 337 534 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0" stroke={AMBER_DARK} sw={1} fill={AMBER_DARK} dur={0.3} />
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.7)}>
        <Draw on={true} d="M 317 546 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0" stroke={AMBER_DARK} sw={1} fill={AMBER_DARK} dur={0.3} />
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 2.2)}>
        <T x={330} y={584} size={12} fill={AMBER_DARK} weight={700}>
          {t("potato: eyes = buds at nodes → STEM", "potato: eyes = nodes ke buds → STEM")}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 2.8)}>
        <Draw
          on={true}
          d="M 700 510 C 660 502, 655 550, 695 562 C 735 573, 775 552, 772 526 C 770 502, 732 502, 700 510 Z"
          stroke={INK}
          sw={2}
          fill={CREAM}
          dur={0.8}
        />
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 3.6)}>
        <T x={725} y={584} size={12} fill={INK} weight={700}>
          {t("sweet potato: no buds → ROOT", "sweet potato: koi bud nahi → ROOT")}
        </T>
      </Fade>
    </svg>
  );
}
