"use client";

/**
 * B11 Ch02 · Section 37 — "Kingdom Plantae, and the range it covers"
 * Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0, 5.89, 25.0, 30.81, 52.05, 66.99, 85.42, 104.36]):
 *  0 intro: the definition is a one-mark question by itself
 *  1 THE DEFINITION: multicellular + eukaryotic + chlorophyll autotroph + cellulose wall
 *  2 setup: look at the span it covers — wider than expected
 *  3 THE LADDER: algae → bryophytes → pteridophytes → gymnosperms → angiosperms
 *  4 quick tags: bryophytes = plant amphibians; pteridophytes = first vascular
 *  5 quick tags: gymnosperms = naked seed; angiosperms = enclosed seed + punchline
 *  6 direction of travel: one long arrow, 3 improving trends underneath
 *  7 boundary: kingdom-level only, full classification is Chapter 3
 *
 * Layout plan (Anek bl−0.78s..+0.31s, Kalam bl−1.3s..+0.5s):
 *  title (persist)      | T mid script20 RED    | x540 y58
 *  title swoosh          | Draw                   | y76  x340..740
 *  b0 intro (Anek14)     | T mid                  | x540 y98  [dim@1]
 *  b1 "definition:" lbl  | T mid Anek14           | x540 y124
 *  b1 underline          | Draw                   | y130 x435..645
 *  b1 4 def chips        | Chip y140 h38 GREEN    | x115 w120/x261 w100/x387 w180/x593 w130 (centered row)
 *  b1 "+" connectors ×3  | T mid size16 MUTED     | between chips, baseline164
 *  b1 "say it as a unit" | T mid Kalam14 GREEN    | x540 y208
 *  b2 setup (Anek14)     | T mid                  | x540 y240  [dim@3]
 *  b2 swoosh             | Draw                   | y256 x400..680
 *  b3 5-chain chips (INK)| Chip y280 h38          | x175 w70/x300 w100/x455 w120/x630 w110/x795 w110
 *  b3 4 chain arrows     | Draw                   | between chips, y299
 *  b3 span caption       | T mid Kalam14 MUTED    | x540 y350  [dim@4]
 *  b4 connector arrows×2 | Draw GREEN             | x350/x515 y322->365
 *  b4 tags "plant amphibians"/"first vascular" | T mid Anek14 GREEN | x350/x515 y380
 *  b5 connector arrows×2 | Draw GREEN             | x685/x850 y322->365
 *  b5 tags "naked seed"/"enclosed seed"         | T mid Anek14 GREEN | x685/x850 y380
 *  b5 closer (Kalam14 RED)| T mid                 | x540 y418
 *  b6 long arrow (GREEN) | Draw                   | x175..905 y450
 *  b6 3 trend labels     | T mid Anek14 MUTED     | x210/x540/x870 y475
 *  b7 boundary rule      | Draw RED               | y490 x300..780
 *  b7 boundary chip      | Chip x280 y497 w520 h44 dashed RED
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

const DEF_CHIPS: { x: number; w: number; en: string; hi: string }[] = [
  { x: 115, w: 120, en: "multicellular", hi: "multicellular" },
  { x: 261, w: 100, en: "eukaryotic", hi: "eukaryotic" },
  { x: 387, w: 180, en: "chlorophyll autotroph", hi: "chlorophyll autotroph" },
  { x: 593, w: 130, en: "cellulose wall", hi: "cellulose wall" },
];
const PLUS_X = [241, 391, 587];

const CHAIN: { x: number; w: number; name: string }[] = [
  { x: 175, w: 70, name: "algae" },
  { x: 300, w: 100, name: "bryophytes" },
  { x: 455, w: 120, name: "pteridophytes" },
  { x: 630, w: 110, name: "gymnosperms" },
  { x: 795, w: 110, name: "angiosperms" },
];

export default function B11Ch02Sec37({ currentTime, reveals, language }: SceneProps) {
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
          {t("Plantae — the definition, then the ladder", "Plantae — definition, phir ladder")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 1.6)} d="M 340 76 C 420 72, 660 72, 740 76" stroke={RED} sw={2.2} dur={0.5} />

      {/* beat 0 — intro */}
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 0.5)}>
        <T x={540} y={98} size={14} fill={INK} anchor="middle">
          {t(
            "the definition is a one-mark question by itself",
            "definition khud ek one-mark question hai"
          )}
        </T>
      </Fade>

      {/* beat 1 — THE DEFINITION: four terms, each doing work */}
      <Fade on={beat >= 1} dim={beat >= 2} delay={dl(1, 0.2)}>
        <T x={540} y={124} size={14} fill={INK} weight={700} anchor="middle">
          {t("the definition, word by word:", "definition, shabd shabd:")}
        </T>
      </Fade>
      <Draw on={beat >= 1} delay={dl(1, 0.6)} d="M 435 130 L 645 130" stroke={GREEN} sw={1.8} dur={0.4} />
      {DEF_CHIPS.map((c, i) => (
        <Fade key={c.en} on={beat >= 1} dim={beat >= 2} delay={dl(1, 1 + i * 0.6)}>
          <Chip x={c.x} y={140} w={c.w} h={38} fill={CREAM} stroke={GREEN} textFill={INK} size={14} script={false}>
            {t(c.en, c.hi)}
          </Chip>
        </Fade>
      ))}
      {PLUS_X.map((x, i) => (
        <Fade key={x} on={beat >= 1} dim={beat >= 2} delay={dl(1, 1.4 + i * 0.6)}>
          <T x={x} y={164} size={16} fill={MUTED} weight={700} anchor="middle">
            +
          </T>
        </Fade>
      ))}
      <Fade on={beat >= 1} dim={beat >= 2} delay={dl(1, 3.6)}>
        <T x={540} y={208} size={14} fill={GREEN} script>
          {t("every word doing work — say it as a unit", "har shabd kaam kar raha — ek unit ki tarah bolo")}
        </T>
      </Fade>

      {/* beat 2 — setup: the span is wider than expected */}
      <Fade on={beat >= 2} dim={beat >= 3} delay={dl(2, 0.3)}>
        <T x={540} y={240} size={14} fill={INK} weight={700} anchor="middle">
          {t(
            "now look at the span it covers — wider than expected",
            "ab dekho iska span — jitna sochte ho usse zyada"
          )}
        </T>
      </Fade>
      <Draw on={beat >= 2} delay={dl(2, 1.2)} d="M 400 256 C 450 252, 630 252, 680 256" stroke={AMBER_DARK} sw={2} dur={0.5} />

      {/* beat 3 — THE LADDER: five groups, four connecting arrows */}
      {CHAIN.map((c, i) => (
        <Fade key={c.name} on={beat >= 3} delay={dl(3, 0.3 + i * 0.35)}>
          <Chip x={c.x} y={280} w={c.w} h={38} fill={INK} textFill={CREAM} size={14} script={false}>
            {c.name}
          </Chip>
        </Fade>
      ))}
      <Draw on={beat >= 3} delay={dl(3, 2.1)} d={arrowD(245, 299, 300, 299)} stroke={AMBER_DARK} sw={2} dur={0.35} />
      <Draw on={beat >= 3} delay={dl(3, 2.3)} d={arrowD(400, 299, 455, 299)} stroke={AMBER_DARK} sw={2} dur={0.35} />
      <Draw on={beat >= 3} delay={dl(3, 2.5)} d={arrowD(575, 299, 630, 299)} stroke={AMBER_DARK} sw={2} dur={0.35} />
      <Draw on={beat >= 3} delay={dl(3, 2.7)} d={arrowD(740, 299, 795, 299)} stroke={AMBER_DARK} sw={2} dur={0.35} />
      <Fade on={beat >= 3} dim={beat >= 4} delay={dl(3, 3.2)}>
        <T x={540} y={350} size={14} fill={MUTED} script>
          {t(
            "pond alga → banyan tree — all united by the green, walled cell",
            "pond alga se banyan tree tak — sab green, walled cell se jude hain"
          )}
        </T>
      </Fade>

      {/* beat 4 — quick tags: bryophytes, pteridophytes */}
      <Draw on={beat >= 4} delay={dl(4, 0.3)} d={arrowD(350, 322, 350, 365)} stroke={GREEN} sw={1.6} dur={0.35} />
      <Fade on={beat >= 4} delay={dl(4, 0.7)}>
        <T x={350} y={380} size={14} fill={GREEN} anchor="middle">
          {t("plant amphibians", "plant amphibians")}
        </T>
      </Fade>
      <Draw on={beat >= 4} delay={dl(4, 1.2)} d={arrowD(515, 322, 515, 365)} stroke={GREEN} sw={1.6} dur={0.35} />
      <Fade on={beat >= 4} delay={dl(4, 1.6)}>
        <T x={515} y={380} size={14} fill={GREEN} anchor="middle">
          {t("first vascular", "first vascular")}
        </T>
      </Fade>

      {/* beat 5 — quick tags: gymnosperms, angiosperms + punchline */}
      <Draw on={beat >= 5} delay={dl(5, 0.3)} d={arrowD(685, 322, 685, 365)} stroke={GREEN} sw={1.6} dur={0.35} />
      <Fade on={beat >= 5} delay={dl(5, 0.7)}>
        <T x={685} y={380} size={14} fill={GREEN} anchor="middle">
          {t("naked seed", "nanga beej")}
        </T>
      </Fade>
      <Draw on={beat >= 5} delay={dl(5, 1.2)} d={arrowD(850, 322, 850, 365)} stroke={GREEN} sw={1.6} dur={0.35} />
      <Fade on={beat >= 5} delay={dl(5, 1.6)}>
        <T x={850} y={380} size={14} fill={GREEN} anchor="middle">
          {t("enclosed seed", "band beej")}
        </T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 6} delay={dl(5, 2.2)}>
        <T x={540} y={418} size={14} fill={RED} script>
          {t(
            "naked seed vs enclosed seed — the split in 5 words",
            "nanga beej vs band beej — 5 shabdon mein split"
          )}
        </T>
      </Fade>

      {/* beat 6 — direction of travel: increasing adaptation to life on land */}
      <Draw on={beat >= 6} delay={dl(6, 0.3)} d={arrowD(175, 450, 905, 450)} stroke={GREEN} sw={2.4} dur={1.1} />
      <Fade on={beat >= 6} delay={dl(6, 1.6)}>
        <T x={210} y={475} size={14} fill={MUTED} anchor="middle">
          {t("better water transport", "behtar water transport")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 2)}>
        <T x={540} y={475} size={14} fill={MUTED} anchor="middle">
          {t("better embryo protection", "behtar embryo protection")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 2.4)}>
        <T x={870} y={475} size={14} fill={MUTED} anchor="middle">
          {t("less dependence on water", "paani par kam nirbharta")}
        </T>
      </Fade>

      {/* beat 7 — boundary: kingdom-level only, full classification is Ch3 */}
      <Draw on={beat >= 7} delay={dl(7, 0.2)} d="M 300 490 L 780 490" stroke={RED} sw={1.6} dur={0.5} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <Chip x={280} y={497} w={520} h={44} fill={CREAM} stroke={RED} textFill={RED} size={14} script={false} dashed>
          {t(
            "this is kingdom-level only — full classification is Chapter 3",
            "yeh sirf kingdom-level hai — poori classification Chapter 3 mein"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
