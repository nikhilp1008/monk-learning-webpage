"use client";

/**
 * B11 Ch02 · Section 26 — "Three ways of making a living"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 7.77, 17.58, 32.68, 47.53, 63.57, 86.44, 104.7]):
 *  0 title
 *  1 root question: dead, alive, or a partner?
 *  2 branch ① saprophytic → Rhizopus
 *  3 branch ② parasitic → rusts, smuts, Albugo
 *  4 branch ③ symbiotic → lichens, mycorrhizae (more soon)
 *  5 significance: one habit explains surface area, habitat, chitin wall
 *  6 ecological weight: the great decomposers
 *  7 closing: strip fungi from a forest → dead matter piles up
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, arrowD, INK, GREEN, RED, AMBER_DARK, CREAM } from "./kit";

export default function B11Ch02Sec26({ currentTime, reveals, language }: SceneProps) {
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
          {t("three ways of making a living", "living banane ke teen tareeke")}
        </T>
      </Fade>

      {/* beat 1 — the root question */}
      <Draw on={beat >= 1} delay={dl(1, 0.3)} d="M 340 82 h 400 v 44 h -400 z" stroke={INK} sw={2.2} dur={0.8} fill={CREAM} />
      <Fade on={beat >= 1} delay={dl(1, 1.1)}>
        <T x={540} y={109} size={14} fill={INK} weight={700}>
          {t("food source: dead? alive? a partner?", "food source: dead? alive? partner?")}
        </T>
      </Fade>
      <Draw on={beat >= 1} delay={dl(1, 1.6)} d={arrowD(540, 126, 175, 178)} stroke={INK} sw={1.8} dur={0.4} />
      <Draw on={beat >= 1} delay={dl(1, 1.9)} d={arrowD(540, 126, 540, 178)} stroke={INK} sw={1.8} dur={0.4} />
      <Draw on={beat >= 1} delay={dl(1, 2.2)} d={arrowD(540, 126, 905, 178)} stroke={INK} sw={1.8} dur={0.4} />

      {/* beat 2 — saprophytic */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <Chip x={65} y={182} w={220} h={46} fill={INK} textFill={CREAM} size={13} script={false}>
          {t("① SAPROPHYTIC — dead matter", "① SAPROPHYTIC — dead matter")}
        </Chip>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 1)}>
        <T x={175} y={252} size={12} fill={INK} script>
          {t("Rhizopus (bread mould)", "Rhizopus (bread mould)")}
        </T>
      </Fade>

      {/* beat 3 — parasitic */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <Chip x={430} y={182} w={220} h={46} fill={INK} textFill={CREAM} size={13} script={false}>
          {t("② PARASITIC — living host", "② PARASITIC — living host")}
        </Chip>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 1)}>
        <T x={540} y={252} size={12} fill={RED} script>
          {t("rusts, smuts, Albugo", "rusts, smuts, Albugo")}
        </T>
      </Fade>

      {/* beat 4 — symbiotic */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <Chip x={795} y={182} w={220} h={46} fill={INK} textFill={CREAM} size={13} script={false}>
          {t("③ SYMBIOTIC — a partnership", "③ SYMBIOTIC — a partnership")}
        </Chip>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1)}>
        <T x={905} y={252} size={12} fill={GREEN} script>
          {t("lichens, mycorrhizae — more soon", "lichens, mycorrhizae — jald aayenge")}
        </T>
      </Fade>

      {/* beat 5 — one habit explains everything */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={540} y={300} size={14} fill={GREEN} script>
          {t(
            "one habit explains it all: surface area, humid habitat, chitin wall",
            "ek habit sab explain karti: surface area, humid habitat, chitin wall"
          )}
        </T>
      </Fade>

      {/* beat 6 — the ecological weight */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={335} size={13} fill={AMBER_DARK} script>
          {t(
            "the great decomposers: rot leaves, wood, remains → carbon & minerals back to soil",
            "great decomposers: leaves, wood, remains sadate → carbon & minerals soil mein"
          )}
        </T>
      </Fade>

      {/* beat 7 — closing thought experiment */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={540} y={375} size={14} fill={RED} script>
          {t(
            "strip fungi from a forest → dead matter simply piles up",
            "forest se fungi hataa do → dead matter bas jama ho jaata"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.2)}>
        <T x={540} y={400} size={12} fill={AMBER_DARK} script>
          {t(
            "a mouldy roti is spoilage to us — the same process that turns every nutrient cycle",
            "sadi roti humein spoilage lagti — wahi process har nutrient cycle chalata"
          )}
        </T>
      </Fade>
    </svg>
  );
}
