"use client";

/**
 * B11 Ch02 · Section 24 — "A fungus does not eat, it absorbs"
 * (opens subtopic 3, Kingdom Fungi) Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0, 21.67, 36.69, 53.93, 65.96, 80.21, 97.02, 118.1]):
 *  0 title
 *  1 defining idea: eukaryotic + heterotrophic
 *  2 the twist: ABSORBS, not eats
 *  3 comparison: us (ingest→digest inside) vs fungus (outside first)
 *  4 THE 3-STEP DIAGRAM: secrete enzymes → digest externally → absorb
 *  5 consequence: must live in/on its food, can never chase it
 *  6 decomposer role: plant=farmer, animal=hunter, fungus=recycler
 *  7 trap: not a plant — no chlorophyll, no photosynthesis
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, arrowD, INK, MUTED, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

export default function B11Ch02Sec24({ currentTime, reveals, language }: SceneProps) {
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
          {t("a fungus doesn't eat — it absorbs", "fungus khaata nahi — absorb karta hai")}
        </T>
      </Fade>

      {/* beat 1 — the defining idea */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={540} y={78} size={13} fill={INK} script>
          {t("eukaryotic + heterotrophic — can't make its own food", "eukaryotic + heterotrophic — khud food nahi bana sakta")}
        </T>
      </Fade>

      {/* beat 2 — the twist: the verb that explains everything */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={540} y={130} size={26} fill={GREEN} weight={800}>
          {t("ABSORBS, not eats", "ABSORB karta, khaata nahi")}
        </T>
      </Fade>

      {/* beat 3 — the reversed order */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={540} y={165} size={13} fill={INK} script>
          {t("us: ingest first, then digest inside", "hum: pehle ingest, phir andar digest")}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 1)}>
        <T x={540} y={188} size={13} fill={AMBER_DARK} script>
          {t("fungus: digests outside — inside-out", "fungus: bahar digest karta — inside-out")}
        </T>
      </Fade>

      {/* beat 4 — the three-step process */}
      <Draw on={beat >= 4} delay={dl(4, 0.3)} d="M 200 270 m -35 0 a 35 35 0 1 0 70 0 a 35 35 0 1 0 -70 0" stroke={INK} sw={2.2} dur={0.7} fill={CREAM} />
      <Draw on={beat >= 4} delay={dl(4, 1)} d="M 195 300 L 180 330 M 200 305 L 200 335 M 205 300 L 220 330" stroke={AMBER_DARK} sw={1.8} dur={0.5} />
      <Fade on={beat >= 4} delay={dl(4, 1.6)}>
        <T x={200} y={355} size={12} fill={INK} weight={700}>
          {t("① secrete enzymes", "① enzymes secrete")}
        </T>
      </Fade>

      <Draw on={beat >= 4} delay={dl(4, 2)} d={arrowD(255, 270, 385, 270)} stroke={MUTED} sw={1.8} dur={0.4} />

      <Draw on={beat >= 4} delay={dl(4, 2.4)} d="M 430 270 Q 470 250, 510 270 Q 550 290, 590 270" stroke={AMBER_DARK} sw={2} dur={0.6} />
      <Fade on={beat >= 4} delay={dl(4, 3)}>
        <T x={510} y={355} size={12} fill={INK} weight={700}>
          {t("② digest externally", "② bahar digest")}
        </T>
      </Fade>

      <Draw on={beat >= 4} delay={dl(4, 3.4)} d={arrowD(600, 270, 730, 270)} stroke={MUTED} sw={1.8} dur={0.4} />

      <Draw on={beat >= 4} delay={dl(4, 3.8)} d="M 820 270 m -35 0 a 35 35 0 1 0 70 0 a 35 35 0 1 0 -70 0" stroke={INK} sw={2.2} dur={0.7} fill={CREAM} />
      <Draw on={beat >= 4} delay={dl(4, 4.4)} d="M 800 330 L 815 300 M 820 335 L 820 305 M 840 330 L 825 300" stroke={GREEN} sw={1.8} dur={0.5} />
      <Fade on={beat >= 4} delay={dl(4, 5)}>
        <T x={820} y={355} size={12} fill={INK} weight={700}>
          {t("③ absorb nutrients", "③ nutrients absorb")}
        </T>
      </Fade>

      {/* beat 5 — the consequence */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={540} y={400} size={14} fill={RED} script>
          {t("must live in/on its food — can never chase it", "apne food ke andar/upar rehna padta — chase nahi kar sakta")}
        </T>
      </Fade>

      {/* beat 6 — the colony roles */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={430} size={13} fill={INK} script>
          {t(
            "plant = farmer, animal = hunter, fungus = recycler",
            "plant = farmer, animal = hunter, fungus = recycler"
          )}
        </T>
      </Fade>

      {/* beat 7 — the trap: not a plant */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={540} y={465} size={14} fill={RED} script>
          {t(
            "not a plant — no chlorophyll, no photosynthesis at all",
            "plant nahi — chlorophyll nahi, photosynthesis bilkul nahi"
          )}
        </T>
      </Fade>
    </svg>
  );
}
