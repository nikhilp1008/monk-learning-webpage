"use client";

/**
 * B11 Ch02 · Section 13 — "Where Protista sits, and why it is ill-defined"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 7.77, 32.6, 42.24, 58.45, 76.89, 95.74, 119.64]):
 *  0 title
 *  1 3 table-recap comparison lines (vs Monera, vs the multicellular 3, nutrition)
 *  2 the test: single-celled EUKARYOTE, not small
 *  3 the Bacteria trap: same pond, different kingdom (nucleus, never size)
 *  4-6 caption slot: leftovers logic → examples → "messiest, least natural"
 *  7 trap: don't force alternation of generations (that's a plant concept)
 *
 * Layout plan:
 *  b0 | title (script19 red)         | T mid | x540  y54
 *  b1 | 3 comparison lines (13)      | T st  | x70   y95/125/155
 *  b2 | "single-celled EUKARYOTE"    | Chip  | x290  y185  w340 h50
 *  b2 | warning (script13 red)       | T mid | x540  y255
 *  b3 | Bacteria card                | Chip  | x150  y280  w280 h60
 *  b3 | Protist card                 | Chip  | x650  y280  w280 h60
 *  b3 | "same pond!" (script13 amber)| T mid | x540  y305
 *  b4-6| caption slot (script14)     | T mid | x540  y420
 *  b7 | trap line1 (script14 red)    | T mid | x540  y480
 *  b7 | trap line2 (script12 muted)  | T mid | x540  y504
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, INK, MUTED, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

export default function B11Ch02Sec13({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={54} size={19} fill={RED} script>
          {t("placing Protista precisely", "Protista ko theek se rakhna")}
        </T>
      </Fade>

      {/* beat 1 — the table recap, in three lines */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={70} y={95} size={13} fill={INK} anchor="start" script>
          {t("vs Monera: nuclear membrane — absent → present", "vs Monera: nuclear membrane — absent → present")}
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1)}>
        <T x={70} y={125} size={13} fill={INK} anchor="start" script>
          {t(
            "vs Fungi/Plantae/Animalia: body — multicellular → unicellular",
            "vs Fungi/Plantae/Animalia: body — multicellular → unicellular"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1.7)}>
        <T x={70} y={155} size={13} fill={INK} anchor="start" script>
          {t(
            "nutrition: Protista alone gets all 3 — photo + hetero + mixo",
            "nutrition: Protista akele saare 3 leta hai — photo + hetero + mixo"
          )}
        </T>
      </Fade>

      {/* beat 2 — the test: single-celled eukaryote, not small */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <Chip x={290} y={185} w={340} h={50} fill={INK} textFill={CREAM} size={18} script={false}>
          {t("single-celled EUKARYOTE", "single-celled EUKARYOTE")}
        </Chip>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 1.2)}>
        <T x={540} y={255} size={13} fill={RED} script>
          {t("size is the trap — always check for the nucleus", "size hi trap hai — hamesha nucleus check karo")}
        </T>
      </Fade>

      {/* beat 3 — the Bacteria trap: same pond, different kingdom */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <Chip x={150} y={280} w={280} h={60} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={13} script={false}>
          {t("Bacteria: tiny✓ aquatic✓ prokaryotic → Monera", "Bacteria: tiny✓ aquatic✓ prokaryotic → Monera")}
        </Chip>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 1)}>
        <Chip x={650} y={280} w={280} h={60} fill={CREAM} stroke={GREEN} textFill={INK} size={13} script={false}>
          {t("Protist: tiny✓ aquatic✓ eukaryotic → Protista", "Protist: tiny✓ aquatic✓ eukaryotic → Protista")}
        </Chip>
      </Fade>
      <Draw on={beat >= 3} delay={dl(3, 1.5)} d="M 435 310 L 645 310" stroke={AMBER_DARK} sw={2} dur={0.4} />
      <Fade on={beat >= 3} delay={dl(3, 1.8)}>
        <Chip x={470} y={296} w={140} h={28} fill={CREAM} stroke={AMBER_DARK} textFill={AMBER_DARK} size={12} script>
          {t("same pond!", "wahi pond!")}
        </Chip>
      </Fade>

      {/* beats 4-6 — the leftovers logic (single replaced slot) */}
      <Fade on={beat >= 4} dim={beat >= 5} delay={dl(4, 0.4)}>
        <T x={540} y={420} size={14} fill={INK} script>
          {t(
            "not clearly plant, animal or fungus → dropped into Protista",
            "clearly plant, animal ya fungus nahi → Protista mein dala"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 6} delay={dl(5, 0.4)}>
        <T x={540} y={420} size={14} fill={INK} script>
          {t(
            "diatoms · Euglena · malaria parasite — share little beyond being single eukaryotic cells",
            "diatoms · Euglena · malaria parasite — sirf single eukaryotic cell hone mein similar"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 0.4)}>
        <T x={540} y={420} size={14} fill={GREEN} script>
          {t(
            "the messiest, least natural of Whittaker's five kingdoms",
            "Whittaker ke paanch mein sabse messy, least natural kingdom"
          )}
        </T>
      </Fade>

      {/* beat 7 — trap: don't force alternation of generations */}
      <Fade on={beat >= 7} delay={dl(7, 0.4)}>
        <T x={540} y={480} size={14} fill={RED} script>
          {t(
            "don't force alternation of generations — that's a plant concept",
            "alternation of generations mat thoko — woh plant concept hai"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.3)}>
        <T x={540} y={504} size={12} fill={MUTED} script>
          {t(
            "most protists: haploid single cells (slime moulds are the exception)",
            "zyada tar protists: haploid single cells (slime moulds exception hain)"
          )}
        </T>
      </Fade>
    </svg>
  );
}
