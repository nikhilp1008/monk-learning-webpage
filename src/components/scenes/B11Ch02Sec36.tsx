"use client";

/**
 * B11 Ch02 · Section 36 — "Make food versus find food" (opens subtopic 4:
 * Kingdoms Plantae & Animalia) Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0, 15.27, 29.78, 47.02, 60.33, 79.36, 92.16, 108.54]):
 *  0 recap: Monera/Protista/Fungi done — last two kingdoms, met daily
 *  1 Plantae = multicellular green makers; Animalia = multicellular movers/eaters
 *  2 between them: almost every large organism (tree/grass/fish/bird/insect/mammal)
 *  3 setup: "the single most valuable idea in this sub-topic"
 *  4 THE AXIS: PLANTAE=make food (solar factory, rooted) vs ANIMALIA=find food (mobile consumer)
 *  5 payoff: one difference drives almost every other contrast — "VS" ringed
 *  6 cascade 1: make food→cellulose wall/plastids/fixed&rooted; find food→wall-less/plastid-free/mobile
 *  7 cascade 2: storage follows too — starch (slow) vs glycogen (ready); "nothing arbitrary"
 *
 * Layout plan (Anek bl−0.78s..+0.31s, Kalam bl−1.3s..+0.5s):
 *  title (persist)     | T mid script20 RED   | x540 y60
 *  title swoosh         | Draw                  | y76  x340..740
 *  b0 recap (Anek14)    | T mid                 | x540 y100
 *  b1 chip PLANTAE def  | Chip x110 y118 w380 h40
 *  b1 chip ANIMALIA def | Chip x590 y118 w380 h40
 *  b2 examples L/R      | T mid Anek14          | x300/x780 y185
 *  b2 caption (Kalam15) | T mid                 | x540 y224
 *  b3 setup (Anek14 700)| T mid                 | x540 y258
 *  b4 PLANTAE box       | Draw fill GREEN       | x100..490 y282..340
 *  b4 "PLANTAE"/"make food" | T mid CREAM       | x295 y310/330
 *  b4 ANIMALIA box       | Draw fill AMBER_DARK | x590..980 y282..340
 *  b4 "ANIMALIA"/"find food" | T mid CREAM      | x785 y310/330
 *  b5 "VS" + ring        | T mid RED / Draw ring| x540 y317 ring c540,312 rx22 ry20
 *  b5 caption (Kalam15)  | T mid GREEN           | x540 y372
 *  b6 3 arrows L (green) | Draw                  | y350->387 x165/287/416.5
 *  b6 chips L: cellulose wall/plastids/fixed&rooted | Chip y392 h32 x100 w130 / x242 w90 / x344 w145
 *  b6 3 arrows R (amber) | Draw                  | y350->387 x637.5/754.5/899
 *  b6 chips R: wall-less/plastid-free/mobile body   | Chip y392 h32 x590 w95 / x697 w115 / x824 w150
 *  b7 arrow L (green)    | Draw                  | x295 y432->455
 *  b7 arrow R (amber)    | Draw                  | x785 y432->455
 *  b7 chip starch        | Chip x203 y460 w185 h34
 *  b7 chip glycogen      | Chip x685 y460 w200 h34
 *  b7 closing (Kalam16)  | T mid RED             | x540 y525
 *  b7 closing swoosh     | Draw                  | y542 x400..680
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

export default function B11Ch02Sec36({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={60} size={20} fill={RED} script>
          {t("one axis: make food vs find food", "ek axis: khana banana vs khana dhoondhna")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.4)} d="M 340 76 C 420 72, 660 72, 740 76" stroke={RED} sw={2.2} dur={0.6} />

      {/* beat 0 — recap: three kingdoms done, last two ahead */}
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 0.6)}>
        <T x={540} y={100} size={14} fill={INK} anchor="middle">
          {t(
            "Monera, Protista, Fungi — done. The last two: met with the naked eye.",
            "Monera, Protista, Fungi — ho gaya. Aakhri do: jinse nangi aankh milti hai."
          )}
        </T>
      </Fade>

      {/* beat 1 — Plantae / Animalia one-line definitions */}
      <Fade on={beat >= 1} dim={beat >= 4} delay={dl(1, 0.3)}>
        <Chip x={110} y={118} w={380} h={40} fill={CREAM} stroke={GREEN} textFill={GREEN} size={14} script={false}>
          {t("PLANTAE — multicellular green makers", "PLANTAE — multicellular hare banane wale")}
        </Chip>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 4} delay={dl(1, 0.9)}>
        <Chip x={590} y={118} w={380} h={40} fill={CREAM} stroke={AMBER_DARK} textFill={AMBER_DARK} size={14} script={false}>
          {t("ANIMALIA — multicellular movers & eaters", "ANIMALIA — multicellular chalne aur khaane wale")}
        </Chip>
      </Fade>

      {/* beat 2 — the visible world: examples, then the caption */}
      <Fade on={beat >= 2} dim={beat >= 4} delay={dl(2, 0.3)}>
        <T x={300} y={185} size={14} fill={MUTED} anchor="middle">
          {t("tree · grass · every green plant", "ped · ghaas · har hara paudha")}
        </T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 4} delay={dl(2, 0.7)}>
        <T x={780} y={185} size={14} fill={MUTED} anchor="middle">
          {t("fish · bird · insect · mammal", "machhli · chidiya · keeda · standhari")}
        </T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 4} delay={dl(2, 1.3)}>
        <T x={540} y={224} size={15} fill={INK} script>
          {t("this is the visible world", "yehi dikhne wali duniya hai")}
        </T>
      </Fade>

      {/* beat 3 — setup: the single most valuable idea */}
      <Fade on={beat >= 3} dim={beat >= 4} delay={dl(3, 0.3)}>
        <T x={540} y={258} size={14} fill={INK} weight={700} anchor="middle">
          {t(
            "the board holds the single most valuable idea in this sub-topic:",
            "board par is poore sub-topic ka sabse keemti idea hai:"
          )}
        </T>
      </Fade>

      {/* beat 4 — THE AXIS: Plantae = make food, Animalia = find food */}
      <Draw on={beat >= 4} delay={dl(4, 0.3)} d="M 100 282 h 390 v 58 h -390 z" stroke={GREEN} sw={2.6} dur={0.8} fill={beat >= 4 ? GREEN : "none"} />
      <Fade on={beat >= 4} delay={dl(4, 1.2)}>
        <T x={295} y={310} size={20} fill={CREAM} weight={800} anchor="middle">
          PLANTAE
        </T>
        <T x={295} y={330} size={14} fill={CREAM} weight={700} anchor="middle">
          {t("make food", "khana banana")}
        </T>
      </Fade>
      <Draw on={beat >= 4} delay={dl(4, 1.8)} d="M 590 282 h 390 v 58 h -390 z" stroke={AMBER_DARK} sw={2.6} dur={0.8} fill={beat >= 4 ? AMBER_DARK : "none"} />
      <Fade on={beat >= 4} delay={dl(4, 2.7)}>
        <T x={785} y={310} size={20} fill={CREAM} weight={800} anchor="middle">
          ANIMALIA
        </T>
        <T x={785} y={330} size={14} fill={CREAM} weight={700} anchor="middle">
          {t("find food", "khana dhoondhna")}
        </T>
      </Fade>

      {/* beat 5 — the payoff: VS ringed, "one idea generates the whole table" */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={540} y={317} size={22} fill={RED} weight={800} anchor="middle">
          VS
        </T>
      </Fade>
      <Draw on={beat >= 5} delay={dl(5, 0.9)} d="M 518 312 C 518 297, 562 297, 562 312 C 562 327, 518 327, 518 312" stroke={RED} sw={2.2} dur={0.6} />
      <Fade on={beat >= 5} dim={beat >= 6} delay={dl(5, 1.6)}>
        <T x={540} y={372} size={15} fill={GREEN} script>
          {t("one idea generates the whole table", "ek idea poori table bana deta hai")}
        </T>
      </Fade>

      {/* beat 6 — cascade 1: wall / plastids / body-plan follow from the axis */}
      <Draw on={beat >= 6} delay={dl(6, 0.2)} d="M 165 350 L 165 387 M 158 380 L 165 387 L 172 380" stroke={GREEN} sw={1.8} dur={0.4} />
      <Draw on={beat >= 6} delay={dl(6, 0.4)} d="M 295 350 L 287 387 M 280 380 L 287 387 L 294 381" stroke={GREEN} sw={1.8} dur={0.4} />
      <Draw on={beat >= 6} delay={dl(6, 0.6)} d="M 430 350 L 416 387 M 409 380 L 416 387 L 423 381" stroke={GREEN} sw={1.8} dur={0.4} />
      <Fade on={beat >= 6} delay={dl(6, 1)}>
        <Chip x={100} y={392} w={130} h={32} fill={CREAM} stroke={GREEN} textFill={INK} size={14} script={false}>
          {t("cellulose wall", "cellulose wall")}
        </Chip>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1.3)}>
        <Chip x={242} y={392} w={90} h={32} fill={CREAM} stroke={GREEN} textFill={INK} size={14} script={false}>
          {t("plastids", "plastids")}
        </Chip>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1.6)}>
        <Chip x={344} y={392} w={145} h={32} fill={CREAM} stroke={GREEN} textFill={INK} size={14} script={false}>
          {t("fixed & rooted", "jadi hui zindagi")}
        </Chip>
      </Fade>

      <Draw on={beat >= 6} delay={dl(6, 2)} d="M 650 350 L 637.5 387 M 630.5 380 L 637.5 387 L 644.5 381" stroke={AMBER_DARK} sw={1.8} dur={0.4} />
      <Draw on={beat >= 6} delay={dl(6, 2.2)} d="M 785 350 L 754.5 387 M 747.5 380 L 754.5 387 L 761.5 381" stroke={AMBER_DARK} sw={1.8} dur={0.4} />
      <Draw on={beat >= 6} delay={dl(6, 2.4)} d="M 920 350 L 899 387 M 892 380 L 899 387 L 906 381" stroke={AMBER_DARK} sw={1.8} dur={0.4} />
      <Fade on={beat >= 6} delay={dl(6, 2.8)}>
        <Chip x={590} y={392} w={95} h={32} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={14} script={false}>
          {t("wall-less", "wall nahi")}
        </Chip>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 3.1)}>
        <Chip x={697} y={392} w={115} h={32} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={14} script={false}>
          {t("plastid-free", "plastid nahi")}
        </Chip>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 3.4)}>
        <Chip x={824} y={392} w={150} h={32} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={14} script={false}>
          {t("mobile body", "chalta-firta body")}
        </Chip>
      </Fade>

      {/* beat 7 — cascade 2: storage chemistry follows too, then the close */}
      <Draw on={beat >= 7} delay={dl(7, 0.2)} d="M 295 432 L 295 455 M 288 448 L 295 455 L 302 448" stroke={GREEN} sw={2} dur={0.4} />
      <Fade on={beat >= 7} delay={dl(7, 0.6)}>
        <Chip x={203} y={460} w={185} h={34} fill={CREAM} stroke={GREEN} textFill={GREEN} size={14} script={false}>
          {t("starch (slow store)", "starch (dheeme store)")}
        </Chip>
      </Fade>
      <Draw on={beat >= 7} delay={dl(7, 1.1)} d="M 785 432 L 785 455 M 778 448 L 785 455 L 792 448" stroke={AMBER_DARK} sw={2} dur={0.4} />
      <Fade on={beat >= 7} delay={dl(7, 1.5)}>
        <Chip x={685} y={460} w={200} h={34} fill={CREAM} stroke={AMBER_DARK} textFill={AMBER_DARK} size={14} script={false}>
          {t("glycogen (ready store)", "glycogen (turant store)")}
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 2.2)}>
        <T x={540} y={525} size={16} fill={RED} script>
          {t("nothing here is arbitrary", "yahan kuch bhi manmana nahi")}
        </T>
      </Fade>
      <Draw on={beat >= 7} delay={dl(7, 2.9)} d="M 400 542 C 460 538, 620 538, 680 542" stroke={RED} sw={2} dur={0.5} />
    </svg>
  );
}
