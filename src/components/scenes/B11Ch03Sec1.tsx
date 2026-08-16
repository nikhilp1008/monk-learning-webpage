"use client";

/**
 * B11 Ch03 · Section 1 — "Why classification needs a basis"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 20.96, 51.65, 76.36, 96.94, 117.53, 138.49, 156.08]):
 *  0 title (always-on) + hook: algae/moss/fern/flower — how do we even sort them?
 *  1 music-library warm-up analogy: colour-sort (fast,wrong) → many-features
 *    (better) → lineage (best) — 3 chips + connector arrows [erased@2, not
 *    dimmed — genuinely vacates its box for the staircase below]
 *  2 THE PERSISTENT DIAGRAM: a 3-step ascending staircase draws in, ground
 *    line first, then each step, each step's evidence-basis label lands
 *    after its box (gross form → anatomy→chemicals → evolutionary descent)
 *  3 the "direction of travel" arrow along the staircase tops, in the space
 *    vacated by beat 1's erased setup material, + emphasis label
 *  4 the three system NAMES land as chips under their matching step
 *    (ARTIFICIAL / NATURAL / PHYLOGENETIC)
 *  5 caution: flower colour ✗ — easy to see ≠ reliable clue
 *  6 nuance: NATURAL ∩ PHYLOGENETIC overlap — same answer, different question
 *  7 closing: classification is provisional — dashed amber chip
 *
 * Layout plan (measured ratios: Kalam bl−1.3s..+0.5s, Anek bl−0.78s..+0.31s):
 *  always | title (script25 red)         | T mid  | x272..808 y33.5..78.5 (bl66)
 *  b0 | hook (script15 muted)             | T mid  | x268..812 y88.5..115.5 (bl108) [erase@2]
 *  b1 | "like sorting..." (script14 ink)  | T mid  | x?..?  y130.5..157.5 (bl150) [erase@2]
 *  b1 | chip1 colour (13 red)             | Chip   | x95..345  y175..205 [erase@2]
 *  b1 | arrow1                            | Draw   | x350..410 y190 [erase@2]
 *  b1 | chip2 features (13 amber-d)       | Chip   | x415..665 y175..205 [erase@2]
 *  b1 | arrow2                            | Draw   | x670..730 y190 [erase@2]
 *  b1 | chip3 lineage (13 green)          | Chip   | x735..985 y175..205 [erase@2]
 *  b2 | ground line                       | Draw   | y450  x120..960
 *  b2 | step1 box                         | Draw   | x160..380 y390..450
 *  b2 | step1 label "gross form" (13 ink) | T mid  | x234..306 y414.9..429
 *  b2 | step2 box                         | Draw   | x430..650 y330..450
 *  b2 | step2 label "anatomy→chemicals"   | T mid  | x475..605 y354.9..369
 *  b2 | step3 box                         | Draw   | x700..920 y270..450
 *  b2 | step3 label "evolutionary descent"| T mid  | x742..878 y294.9..309
 *  b3 | direction arrow                   | Draw   | y255  x170..870
 *  b3 | "more evidence, deeper down" lbl  | T mid  | x?..?  y212.5..239.5 (bl232)
 *  b4 | chip ARTIFICIAL                   | Chip   | x160..380 y462..490
 *  b4 | chip NATURAL                      | Chip   | x430..650 y462..490
 *  b4 | chip PHYLOGENETIC                 | Chip   | x700..920 y462..490
 *  b5 | cross icon                        | Draw   | x40..68 y502..528
 *  b5 | caution text (15 red, start)      | T st   | x82..? y492.5..519.5 (bl512)
 *  b6 | overlap note (14 green)           | T mid  | x?..?  y528.5..555.5 (bl548)
 *  b7 | provisional chip (dashed amber-d) | Chip   | x300..780 y563..591
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
  crossD,
  INK,
  MUTED,
  AMBER,
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
} from "./kit";

export default function B11Ch03Sec1({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  // beat 1's setup material fully vacates its box once the staircase starts —
  // erase (opacity 0), not dim, so the freed space is legitimately reusable.
  const setupOn = beat === 0 || beat === 1;

  return (
    <svg
      viewBox="0 0 1080 620"
      preserveAspectRatio="xMidYMin meet"
      className="w-full h-full select-none"
    >
      {/* title — always on */}
      <Fade on={true}>
        <T x={540} y={66} size={25} fill={RED} script>
          {t(
            "why does classification need a BASIS?",
            "classification ko BASIS kyun chahiye?"
          )}
        </T>
      </Fade>

      {/* beat 0 — hook */}
      <Fade on={beat >= 0 && setupOn} delay={dl(0, 0.3)}>
        <T x={540} y={108} size={15} fill={MUTED} script>
          {t(
            "algae · moss · fern · flower — first, how do we even SORT them?",
            "algae · moss · fern · flower — pehle, inhe SORT kaise karein?"
          )}
        </T>
      </Fade>

      {/* beat 1 — music-library warm-up analogy */}
      <Fade on={beat >= 1 && setupOn} delay={dl(1, 0.3)}>
        <T x={540} y={150} size={14} fill={INK} script>
          {t(
            "like sorting a giant music library:",
            "jaise ek badi music library sort karna:"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 1 && setupOn} delay={dl(1, 0.9)}>
        <Chip x={95} y={175} w={250} h={30} fill={CREAM} stroke={RED} textFill={RED} size={13} script>
          {t("album colour — fast, WRONG", "album colour — fast, GALAT")}
        </Chip>
      </Fade>
      <Fade on={beat >= 1 && setupOn} delay={dl(1, 1.5)}>
        <Draw on={true} d={arrowD(350, 190, 410, 190)} stroke={MUTED} sw={2} dur={0.4} />
      </Fade>
      <Fade on={beat >= 1 && setupOn} delay={dl(1, 2.1)}>
        <Chip x={415} y={175} w={250} h={30} fill={CREAM} stroke={AMBER_DARK} textFill={AMBER_DARK} size={13} script>
          {t("many features — better", "kai features — behtar")}
        </Chip>
      </Fade>
      <Fade on={beat >= 1 && setupOn} delay={dl(1, 2.7)}>
        <Draw on={true} d={arrowD(670, 190, 730, 190)} stroke={MUTED} sw={2} dur={0.4} />
      </Fade>
      <Fade on={beat >= 1 && setupOn} delay={dl(1, 3.3)}>
        <Chip x={735} y={175} w={250} h={30} fill={CREAM} stroke={GREEN} textFill={GREEN} size={13} script>
          {t("lineage — the BEST", "lineage — sabse BEST")}
        </Chip>
      </Fade>

      {/* beat 2 — the persistent staircase diagram */}
      <Draw on={beat >= 2} delay={dl(2, 0.2)} d="M 120 450 L 960 450" stroke={INK} sw={1.6} dur={0.6} />

      <Draw
        on={beat >= 2}
        delay={dl(2, 0.9)}
        d="M 160 390 h 220 v 60 h -220 z"
        stroke={AMBER_DARK}
        sw={2.2}
        dur={1}
      />
      <Fade on={beat >= 2} delay={dl(2, 2.0)}>
        <T x={270} y={425} size={13} fill={INK}>
          {t("gross form", "gross form")}
        </T>
      </Fade>

      <Draw
        on={beat >= 2}
        delay={dl(2, 2.3)}
        d="M 430 330 h 220 v 120 h -220 z"
        stroke={AMBER_DARK}
        sw={2.2}
        dur={1}
      />
      <Fade on={beat >= 2} delay={dl(2, 3.4)}>
        <T x={540} y={365} size={13} fill={INK}>
          {t("anatomy → chemicals", "anatomy → chemicals")}
        </T>
      </Fade>

      <Draw
        on={beat >= 2}
        delay={dl(2, 3.7)}
        d="M 700 270 h 220 v 180 h -220 z"
        stroke={AMBER_DARK}
        sw={2.2}
        dur={1}
      />
      <Fade on={beat >= 2} delay={dl(2, 4.9)}>
        <T x={810} y={305} size={13} fill={INK}>
          {t("evolutionary descent", "evolutionary descent")}
        </T>
      </Fade>

      {/* beat 3 — direction of travel, in the space beat 1 vacated */}
      <Draw on={beat >= 3} delay={dl(3, 0.3)} d={arrowD(170, 255, 870, 255)} stroke={AMBER_DARK} sw={2.4} dur={1} />
      <Fade on={beat >= 3} delay={dl(3, 1.5)}>
        <T x={540} y={232} size={15} fill={AMBER_DARK} script>
          {t(
            "→ deeper down the staircase, MORE evidence used",
            "→ jitna neeche staircase mein, utna zyada evidence"
          )}
        </T>
      </Fade>

      {/* beat 4 — the three system names, mapped onto their steps */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <Chip x={160} y={462} w={220} h={28} fill={CREAM} stroke={AMBER_DARK} textFill={AMBER_DARK} size={12} script={false}>
          {t("ARTIFICIAL — few characters", "ARTIFICIAL — kam characters")}
        </Chip>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.0)}>
        <Chip x={430} y={462} w={220} h={28} fill={CREAM} stroke={AMBER_DARK} textFill={AMBER_DARK} size={12} script={false}>
          {t("NATURAL — all characters", "NATURAL — sab characters")}
        </Chip>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.7)}>
        <Chip x={700} y={462} w={220} h={28} fill={CREAM} stroke={AMBER_DARK} textFill={AMBER_DARK} size={12} script={false}>
          {t("PHYLOGENETIC — descent", "PHYLOGENETIC — descent")}
        </Chip>
      </Fade>

      {/* beat 5 — caution: flower colour is a poor clue */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <Draw on={true} d={crossD(44, 505, 20, 20)} stroke={RED} sw={2} dur={0.4} />
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 0.9)}>
        <T x={82} y={512} size={15} fill={RED} script anchor="start">
          {t(
            "flower colour ✗ — easy to see ≠ reliable clue",
            "flower colour ✗ — dekhna easy, par reliable nahi"
          )}
        </T>
      </Fade>

      {/* beat 6 — natural and phylogenetic overlap heavily */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={548} size={14} fill={GREEN} script>
          {t(
            "NATURAL ∩ PHYLOGENETIC — same answer, different question",
            "NATURAL ∩ PHYLOGENETIC — jawaab same, sawaal alag"
          )}
        </T>
      </Fade>

      {/* beat 7 — classification is provisional */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <Chip x={300} y={563} w={480} h={28} fill={CREAM} stroke={AMBER_DARK} textFill={AMBER_DARK} size={13} script dashed>
          {t(
            "classification is provisional — revises with new evidence",
            "classification provisional — naya evidence se revise hoti hai"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
