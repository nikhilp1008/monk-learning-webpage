"use client";

/**
 * B11 Ch02 · Section 12 — "The kingdom at the crossroads"
 * (opens subtopic 2, Kingdom Protista) Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0, 17.15, 30.55, 49.41, 69.55, 83.2, 103.17, 128.0]):
 *  0 title — Protista, biology's junction
 *  1 caption: crossroads of plant-like, animal-like, fungus-like
 *  2 THE DIAGRAM: hub + 3 spokes (algal/protozoa/slime moulds) + Monera link
 *  3 2 unifying traits: eukaryote, single-celled
 *  4 3rd trait: aquatic
 *  5 connect back: ring the Monera link
 *  6 caption slot: kirana shop vs fitted office analogy
 *  7 caption slot: nutrition — photoauto / hetero / mixotroph
 *
 * Layout plan:
 *  b0 | title (script17 red)         | T mid | x540  y50
 *  b1 | caption (script13 ink)       | T mid | x540  y78
 *  b2 | hub "PROTISTA" (ink circle)  | Draw  | c(540,270) r60
 *  b2 | spoke chips ×3               | Chip  | (155,117)/(720,117)/(780,247) w~200 h46
 *  b2 | Monera-link chip             | Chip  | x435  y407  w210 h46
 *  b2 | 4 spoke arrows               | Draw  | from (540,270) to near each chip
 *  b3 | eukaryote✓/single-celled✓    | Chip  | x70/250  y465  w160/170 h30
 *  b4 | aquatic chip                 | Chip  | x750  y465  w180 h30
 *  b5 | ring Monera-link chip        | Draw  | c(540,430) rx115 ry35
 *  b6 | caption slot (script14 ink)  | T mid | x540  y520  [dim@7]
 *  b7 | caption slot (script14 green)| T mid | x540  y520
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, arrowD, ringD, INK, GREEN, RED, CREAM } from "./kit";

export default function B11Ch02Sec12({ currentTime, reveals, language }: SceneProps) {
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
      {/* beat 0 — title */}
      <Fade on={beat >= 0} delay={dl(0, 0.2)}>
        <T x={540} y={50} size={17} fill={RED} script>
          {t("Protista: biology's junction", "Protista: biology ka junction")}
        </T>
      </Fade>

      {/* beat 1 — the crossroads */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={540} y={78} size={13} fill={INK} script>
          {t(
            "the crossroads: plant-like, animal-like, fungus-like — all in one kingdom",
            "crossroads: plant-like, animal-like, fungus-like — sab ek kingdom mein"
          )}
        </T>
      </Fade>

      {/* beat 2 — the hub-and-spoke diagram */}
      <Draw on={beat >= 2} delay={dl(2, 0.3)} d="M 480 270 a 60 60 0 1 0 120 0 a 60 60 0 1 0 -120 0" stroke={INK} sw={2.6} dur={0.9} fill={INK} />
      <Fade on={beat >= 2} delay={dl(2, 1.1)}>
        <T x={540} y={276} size={17} fill={CREAM} weight={800}>
          PROTISTA
        </T>
      </Fade>
      <Draw on={beat >= 2} delay={dl(2, 1.6)} d={arrowD(540, 270, 235, 128)} stroke={INK} sw={1.8} dur={0.4} />
      <Fade on={beat >= 2} delay={dl(2, 2)}>
        <Chip x={155} y={117} w={210} h={46} fill={CREAM} stroke={INK} textFill={INK} size={13} script={false}>
          {t("algal protists (plant-like)", "algal protists (plant-like)")}
        </Chip>
      </Fade>
      <Draw on={beat >= 2} delay={dl(2, 2.4)} d={arrowD(540, 270, 795, 128)} stroke={INK} sw={1.8} dur={0.4} />
      <Fade on={beat >= 2} delay={dl(2, 2.8)}>
        <Chip x={720} y={117} w={200} h={46} fill={CREAM} stroke={INK} textFill={INK} size={13} script={false}>
          {t("protozoa (animal-like)", "protozoa (animal-like)")}
        </Chip>
      </Fade>
      <Draw on={beat >= 2} delay={dl(2, 3.2)} d={arrowD(540, 270, 850, 270)} stroke={INK} sw={1.8} dur={0.4} />
      <Fade on={beat >= 2} delay={dl(2, 3.6)}>
        <Chip x={780} y={247} w={200} h={46} fill={CREAM} stroke={INK} textFill={INK} size={13} script={false}>
          {t("slime moulds (fungus-like)", "slime moulds (fungus-like)")}
        </Chip>
      </Fade>
      <Draw on={beat >= 2} delay={dl(2, 4)} d={arrowD(540, 270, 540, 400)} stroke={INK} sw={2} dur={0.4} />
      <Draw on={beat >= 2} delay={dl(2, 4.3)} d={arrowD(540, 400, 540, 270)} stroke={INK} sw={2} dur={0.4} />
      <Fade on={beat >= 2} delay={dl(2, 4.7)}>
        <Chip x={435} y={407} w={210} h={46} fill={CREAM} stroke={INK} textFill={INK} size={13} script={false}>
          {t("Monera (prokaryote)", "Monera (prokaryote)")}
        </Chip>
      </Fade>

      {/* beat 3 — two non-negotiable traits */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <Chip x={70} y={465} w={160} h={30} fill={CREAM} stroke={GREEN} textFill={GREEN} size={12} script={false}>
          {t("eukaryote ✓", "eukaryote ✓")}
        </Chip>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 0.9)}>
        <Chip x={250} y={465} w={170} h={30} fill={CREAM} stroke={GREEN} textFill={GREEN} size={12} script={false}>
          {t("single-celled ✓", "single-celled ✓")}
        </Chip>
      </Fade>

      {/* beat 4 — the near-universal third trait */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <Chip x={750} y={465} w={180} h={30} fill={CREAM} stroke={GREEN} textFill={GREEN} size={12} script={false}>
          {t("aquatic (mostly)", "aquatic (zyada tar)")}
        </Chip>
      </Fade>

      {/* beat 5 — connect back to Monera */}
      <Draw on={beat >= 5} delay={dl(5, 0.3)} d={ringD(540, 430, 115, 35)} stroke={GREEN} sw={2.4} dur={0.8} />

      {/* beats 6-7 — replaced caption slot */}
      <Fade on={beat >= 6} dim={beat >= 7} delay={dl(6, 0.4)}>
        <T x={540} y={520} size={14} fill={INK} script>
          {t(
            "Monera = 1-room kirana shop; Protista = office with separate cabins",
            "Monera = 1-room kirana shop; Protista = separate cabins wala office"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 0.4)}>
        <T x={540} y={520} size={14} fill={GREEN} script>
          {t(
            "nutrition: photoautotroph, heterotroph, or mixotroph (switches!)",
            "nutrition: photoautotroph, heterotroph, ya mixotroph (switch karta)"
          )}
        </T>
      </Fade>
    </svg>
  );
}
