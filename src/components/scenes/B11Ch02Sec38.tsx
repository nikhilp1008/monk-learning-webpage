"use client";

/**
 * B11 Ch02 · Section 38 — "The autotroph exceptions"
 * Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0, 9.13, 19.46, 34.13, 52.99, 69.38, 90.79, 103.42]):
 *  0 the false statement, crossed out: "all plants make their own food"
 *  1 two categories set up: INSECTIVOROUS (left) vs PARASITIC (right)
 *  2 insectivorous: "partially heterotrophic" — keeps chlorophyll, photosynthesises
 *  3 insectivorous: why — nitrogen, marshy N-poor soil
 *  4 insectivorous: 3 named examples (Venus flytrap / bladderwort / pitcher plant)
 *  5 parasitic: Cuscuta (dodder/Amarbel) — chlorophyll lost entirely, twines + suckers
 *  6 parasitic: visual clue — yellowish threads, not green = not photosynthesising
 *  7 closing: Plantae = body+ancestry not strictly self-feeding; insectivorous ≠ parasitic
 *
 * Layout plan (Anek bl−0.78s..+0.31s, Kalam bl−1.3s..+0.5s):
 *  title (persist)       | T mid script20 RED    | x540 y58
 *  title swoosh           | Draw                   | y76 x340..740
 *  b0 claim (Anek14)      | T mid                  | x540 y100
 *  b0 crossD              | Draw                   | x410..670 y87..107
 *  b0 correction (RED14)  | T mid                  | x540 y132
 *  b1 divider              | Draw                   | x540 y160..204
 *  b1 INSECTIVOROUS chip   | Chip GREEN             | x100 y162 w390 h40
 *  b1 PARASITIC chip       | Chip RED               | x590 y162 w390 h40
 *  b2 tag "partially heterotrophic" | T mid GREEN16 | x295 y230
 *  b2 subline (Anek14)     | T mid                  | x295 y262
 *  b3 nitrogen (Anek14 AMBER_DARK)| T mid           | x295 y292
 *  b4 3 examples (Anek14)  | T mid                  | x295 y325/351/377
 *  b5 Cuscuta name + ring  | T mid RED15 / Draw ring| x785 y230 ring c785,226 rx105 ry18
 *  b5 subline1/2 (Anek14)  | T mid                  | x785 y262/296
 *  b6 visual clue (Anek14 AMBER_DARK)| T mid        | x785 y330
 *  b6 insight (Kalam14 GREEN) + swoosh | T mid/Draw  | x785 y362 / y388
 *  b7 swoosh              | Draw                    | y445 x400..680
 *  b7 axis line (Anek14 GREEN)| T mid               | x540 y470
 *  b7 boundary chip (dashed RED)| Chip               | x300 y495 w480 h40
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
  crossD,
  ringD,
  INK,
  MUTED,
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
} from "./kit";

export default function B11Ch02Sec38({ currentTime, reveals, language }: SceneProps) {
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
          {t("the autotroph exceptions", "autotroph ke exceptions")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 1.8)} d="M 340 76 C 420 72, 660 72, 740 76" stroke={RED} sw={2.2} dur={0.5} />

      {/* beat 0 — the false statement, crossed out */}
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 0.4)}>
        <T x={540} y={100} size={14} fill={INK} anchor="middle">
          {t(
            "“all plants make their own food”",
            "“sab paudhe apna khana khud banate hain”"
          )}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 1)} d={crossD(410, 87, 260, 20)} stroke={RED} sw={2.2} dur={0.5} />
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 1.6)}>
        <T x={540} y={132} size={14} fill={RED} weight={700} anchor="middle">
          {t("...that claim is false", "...yeh baat galat hai")}
        </T>
      </Fade>

      {/* beat 1 — two categories set up */}
      <Draw on={beat >= 1} delay={dl(1, 0.3)} d="M 540 160 L 540 204" stroke={MUTED} sw={1.6} dur={0.4} />
      <Fade on={beat >= 1} delay={dl(1, 0.6)}>
        <Chip x={100} y={162} w={390} h={40} fill={GREEN} textFill={CREAM} size={16} script={false}>
          INSECTIVOROUS
        </Chip>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1)}>
        <Chip x={590} y={162} w={390} h={40} fill={RED} textFill={CREAM} size={16} script={false}>
          PARASITIC
        </Chip>
      </Fade>

      {/* beat 2 — insectivorous: partially heterotrophic */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={295} y={230} size={16} fill={GREEN} weight={800} anchor="middle">
          {t("partially heterotrophic", "partially heterotrophic")}
        </T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 0.9)}>
        <T x={295} y={262} size={14} fill={INK} anchor="middle">
          {t(
            "keeps chlorophyll — photosynthesises normally",
            "chlorophyll rakhte — normally photosynthesise karte"
          )}
        </T>
      </Fade>

      {/* beat 3 — why: nitrogen */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={295} y={292} size={14} fill={AMBER_DARK} weight={700} anchor="middle">
          {t("why? nitrogen — marshy, N-poor soil", "kyun? nitrogen — daldal, N-poor mitti")}
        </T>
      </Fade>

      {/* beat 4 — three named examples */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={295} y={325} size={14} fill={INK} anchor="middle">
          {t("Venus flytrap — snaps shut", "Venus flytrap — snap se band")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 0.9)}>
        <T x={295} y={351} size={14} fill={INK} anchor="middle">
          {t("bladderwort — sucks into bladder-traps", "bladderwort — bladder-traps mein khinchta")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.5)}>
        <T x={295} y={377} size={14} fill={INK} anchor="middle">
          {t("pitcher plant — drowns in fluid-filled leaf", "pitcher plant — fluid-filled leaf mein doobta")}
        </T>
      </Fade>

      {/* beat 5 — parasitic: Cuscuta, chlorophyll lost, twines + suckers */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={785} y={230} size={15} fill={RED} weight={800} anchor="middle">
          Cuscuta (dodder / Amarbel)
        </T>
      </Fade>
      <Draw on={beat >= 5} delay={dl(5, 0.9)} d={ringD(785, 226, 105, 18)} stroke={RED} sw={1.8} dur={0.6} />
      <Fade on={beat >= 5} delay={dl(5, 1.5)}>
        <T x={785} y={262} size={14} fill={INK} anchor="middle">
          {t("chlorophyll LOST entirely", "chlorophyll pura LOST")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 2)}>
        <T x={785} y={296} size={14} fill={INK} anchor="middle">
          {t("twines around host, draws via suckers", "host ke around twine karke suckers se kheenchta")}
        </T>
      </Fade>

      {/* beat 6 — visual clue: not green = not photosynthesising */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={785} y={330} size={14} fill={AMBER_DARK} weight={700} anchor="middle">
          {t("yellowish threads draped over host", "peeli dhaagon jaisi, host par lipti")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1)}>
        <T x={785} y={362} size={14} fill={GREEN} script>
          {t("not green = not photosynthesising", "green nahi = photosynthesis nahi")}
        </T>
      </Fade>
      <Draw on={beat >= 6} delay={dl(6, 1.6)} d="M 680 388 C 720 384, 850 384, 890 388" stroke={GREEN} sw={1.8} dur={0.5} />

      {/* beat 7 — closing: Plantae = body+ancestry; insectivorous ≠ parasitic */}
      <Draw on={beat >= 7} delay={dl(7, 0.2)} d="M 400 445 C 460 441, 620 441, 680 445" stroke={GREEN} sw={1.8} dur={0.5} />
      <Fade on={beat >= 7} delay={dl(7, 0.7)}>
        <T x={540} y={470} size={14} fill={GREEN} weight={700} anchor="middle">
          {t(
            "Plantae = the plant body + ancestry, not strictly self-feeding",
            "Plantae = plant body + ancestry, sirf self-feeding nahi"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.4)}>
        <Chip x={300} y={495} w={480} h={40} fill={CREAM} stroke={RED} textFill={RED} size={15} script={false} dashed>
          {t("insectivorous ≠ parasitic — read the word precisely", "insectivorous ≠ parasitic — shabd theek se padho")}
        </Chip>
      </Fade>
    </svg>
  );
}
