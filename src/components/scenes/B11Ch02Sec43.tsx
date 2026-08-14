"use client";

/**
 * B11 Ch02 · Section 43 — "Inside the animal: the organ-system level"
 * Canvas 1080×620 · safe x36–1044, y30–596. Mirrors Sec41's cell/consequence split.
 *
 * Beats (en [0, 7.17, 16.13, 35.5, 54.95, 68.18, 87.47, 107.18]):
 *  0 intro: what a body can become once you remove the wall
 *  1 setup: cell on the left, systems on the right — systems are the consequence
 *  2 LEFT: no wall, no plastids; flexible plasma membrane -> movement + ingestion
 *  3 LEFT: heterotrophic, holozoic — ingest->digest->absorb (vs fungi digest outside)
 *  4 LEFT: glycogen+fat storage; locomotion, determinate growth
 *  5 RIGHT headline: ORGAN-SYSTEM LEVEL — most complex body plan of the 5 kingdoms
 *  6 RIGHT: the 4 systems — digestive/circulatory/nervous/muscular
 *  7 closing: reproduction mostly sexual; mobility+coordination = active life
 *
 * Layout plan (Anek bl−0.78s..+0.31s, Kalam bl−1.3s..+0.5s):
 *  title (persist)        | T mid script20 RED  | x540 y58
 *  title swoosh             | Draw                 | y76 x340..740
 *  b0 intro (Anek14)        | T mid                | x540 y100  [dim@1]
 *  b1 setup (Anek14)        | T mid                | x540 y130  [dim@2]
 *  b2 chip "no wall.."       | Chip x115 y120 w360 h36 (GREEN)
 *  b2 chip "flexible..."     | Chip x115 y166 w360 h36 (GREEN)
 *  b3 chip "heterotrophic..."| Chip x110 y212 w370 h36 (GREEN)
 *  b3 "vs fungi..." (Anek14) | T mid                | x295 y276
 *  b4 chip "glycogen.."      | Chip x140 y304 w310 h36 (AMBER_DARK)
 *  b4 chip "locomotion.."    | Chip x140 y350 w310 h36 (AMBER_DARK)
 *  b5 headline (Anek18 GREEN)| T mid                | x785 y140
 *  b5 subtext (Kalam14 RED)  | T mid                | x785 y168
 *  b6 4 system chips (2x2)   | Chip y210/254 h36    | x590 w185 / x785 w185
 *  b7 line1 (Anek14)         | T mid                | x540 y430
 *  b7 line2 (Anek14 GREEN)   | T mid                | x540 y460
 *  b7 line3 (Kalam15 RED)    | T mid                | x540 y496
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, INK, MUTED, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

export default function B11Ch02Sec43({ currentTime, reveals, language }: SceneProps) {
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
          {t("inside the animal: cell, then systems", "animal ke andar: cell, phir systems")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 1.4)} d="M 340 76 C 420 72, 660 72, 740 76" stroke={RED} sw={2.2} dur={0.5} />

      {/* beat 0 — intro */}
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 0.4)}>
        <T x={540} y={100} size={14} fill={INK} anchor="middle">
          {t("what a body can become once you remove the wall", "wall hatane par body kya ban sakta hai")}
        </T>
      </Fade>

      {/* beat 1 — setup (beat-scoped, not dimmed: sits directly under where the
          beat5 RIGHT headline lands, so a lingering dim ghost would bisect it) */}
      <Fade on={beat === 1} delay={dl(1, 0.3)}>
        <T x={540} y={130} size={14} fill={INK} weight={700} anchor="middle">
          {t(
            "cell on the left, systems on the right — systems are the consequence",
            "cell left mein, systems right mein — systems hi consequence hain"
          )}
        </T>
      </Fade>

      {/* beat 2 — LEFT: no wall/plastids; flexible membrane */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <Chip x={115} y={120} w={360} h={36} fill={CREAM} stroke={GREEN} textFill={INK} size={14} script={false}>
          {t("no wall, no plastids", "no wall, no plastids")}
        </Chip>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 0.9)}>
        <Chip x={115} y={166} w={360} h={36} fill={CREAM} stroke={GREEN} textFill={INK} size={14} script={false}>
          {t("flexible plasma membrane → movement + ingestion", "flexible plasma membrane → movement + ingestion")}
        </Chip>
      </Fade>

      {/* beat 3 — LEFT: heterotrophic, holozoic */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <Chip x={110} y={212} w={370} h={36} fill={CREAM} stroke={GREEN} textFill={INK} size={14} script={false}>
          {t("heterotrophic, holozoic — ingest → digest → absorb", "heterotrophic, holozoic — ingest → digest → absorb")}
        </Chip>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 1)}>
        <T x={295} y={276} size={14} fill={MUTED} anchor="middle">
          {t("vs fungi: they digest OUTSIDE", "fungi ke ulat: woh BAHAR digest karte")}
        </T>
      </Fade>

      {/* beat 4 — LEFT: storage, locomotion */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <Chip x={140} y={304} w={310} h={36} fill={CREAM} stroke={AMBER_DARK} textFill={AMBER_DARK} size={14} script={false}>
          {t("glycogen + fat storage", "glycogen + fat storage")}
        </Chip>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 0.9)}>
        <Chip x={140} y={350} w={310} h={36} fill={CREAM} stroke={AMBER_DARK} textFill={AMBER_DARK} size={14} script={false}>
          {t("locomotion, determinate growth", "locomotion, determinate growth")}
        </Chip>
      </Fade>

      {/* beat 5 — RIGHT headline: organ-system level */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={785} y={140} size={18} fill={GREEN} weight={800} anchor="middle">
          ORGAN-SYSTEM LEVEL
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1)}>
        <T x={785} y={168} size={14} fill={RED} script>
          {t("most complex body plan — no other kingdom reaches it", "sabse complex body plan — koi aur kingdom yahan nahi pahunchta")}
        </T>
      </Fade>

      {/* beat 6 — RIGHT: the four systems, one purpose */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <Chip x={590} y={210} w={185} h={36} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={14} script={false}>
          {t("digestive — food", "digestive — food")}
        </Chip>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 0.6)}>
        <Chip x={785} y={210} w={185} h={36} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={14} script={false}>
          {t("circulatory — spread", "circulatory — spread")}
        </Chip>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 0.9)}>
        <Chip x={590} y={254} w={185} h={36} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={14} script={false}>
          {t("nervous — coordinate", "nervous — coordinate")}
        </Chip>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1.2)}>
        <Chip x={785} y={254} w={185} h={36} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={14} script={false}>
          {t("muscular — movement", "muscular — movement")}
        </Chip>
      </Fade>

      {/* beat 7 — closing */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={540} y={430} size={14} fill={INK} anchor="middle">
          {t(
            "reproduction: mostly sexual — copulation → fertilisation → embryo → adult",
            "reproduction: aksar sexual — copulation → fertilisation → embryo → adult"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 0.9)}>
        <T x={540} y={460} size={14} fill={GREEN} weight={700} anchor="middle">
          {t(
            "mobility + internal coordination = active, food-seeking life",
            "mobility + internal coordination = active, khana-dhoondhne wali zindagi"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.5)}>
        <T x={540} y={496} size={15} fill={RED} script>
          {t("most structurally complex of the five kingdoms", "paanch kingdoms mein sabse structurally complex")}
        </T>
      </Fade>
    </svg>
  );
}
