"use client";

/**
 * B11 Ch02 · Section 45 — "Three distinguishing features, and reading a
 * word precisely" (worked_examples) Canvas 1080×620 · safe x36–1044, y30–596.
 * Grid geometry reused from Sec33's proven 3-row comparison table.
 *
 * Beats (en [0, 9.56, 16.38, 32.94, 45.74, 70.57, 79.87, 90.45, 105.73]):
 *  0 EXAMPLE 1 label (CBSE 3-marker, structured comparison)
 *  1 the question — 3 distinguishing features
 *  2 grid drawn + pair 1: cell wall (present/cellulose vs absent)
 *  3 pair 2: nutrition (autotrophic/photosynthetic vs heterotrophic/holozoic)
 *  4 pair 3: stored food (starch vs glycogen+fat) + strategic note
 *  5 EXAMPLE 2 label (CUET, read the word precisely)
 *  6 the question + 4 options
 *  7 the answer: Venus flytrap (ringed) + why "partially" heterotrophic
 *  8 the distractors, each failing differently
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, ringD, INK, MUTED, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

const OPTIONS = [
  { x: 303, w: 90, name: "Cuscuta" },
  { x: 413, w: 130, name: "Venus flytrap" },
  { x: 563, w: 100, name: "Spirogyra" },
  { x: 683, w: 95, name: "mushroom" },
];

function gridPath(): string {
  return "M 60 150 H 920 V 280 H 60 Z M 260 150 V 280 M 590 150 V 280 M 60 185 H 920 M 60 220 H 920 M 60 245 H 920";
}

export default function B11Ch02Sec45({ currentTime, reveals, language }: SceneProps) {
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
      {/* beat 0 — Example 1 label */}
      <Fade on={beat >= 0} delay={dl(0, 0.3)}>
        <Chip x={60} y={75} w={330} h={28} fill={AMBER_DARK} textFill={CREAM} size={12} script={false}>
          {t("EXAMPLE 1 · CBSE (3-marker comparison)", "EXAMPLE 1 · CBSE (3-marker comparison)")}
        </Chip>
      </Fade>

      {/* beat 1 — the question */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={540} y={118} size={13} fill={INK} script>
          {t("3 features distinguishing Plantae from Animalia", "Plantae aur Animalia mein 3 features batao")}
        </T>
      </Fade>

      {/* beat 2 — grid + pair 1: cell wall */}
      <Draw on={beat >= 2} delay={dl(2, 0.3)} d={gridPath()} stroke={INK} sw={1.8} dur={1} />
      <Fade on={beat >= 2} delay={dl(2, 1.2)}>
        <T x={425} y={172} size={12} fill={INK} weight={700}>
          Plantae
        </T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 1.5)}>
        <T x={755} y={172} size={12} fill={INK} weight={700}>
          Animalia
        </T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 1.9)}>
        <T x={70} y={207} size={11} fill={INK} anchor="start" weight={700}>
          {t("cell wall", "cell wall")}
        </T>
        <T x={425} y={207} size={11} fill={GREEN}>
          {t("present, cellulose", "present, cellulose")}
        </T>
        <T x={755} y={207} size={11} fill={AMBER_DARK}>
          {t("absent", "absent")}
        </T>
      </Fade>

      {/* beat 3 — pair 2: nutrition */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={70} y={237} size={11} fill={INK} anchor="start" weight={700}>
          {t("nutrition", "nutrition")}
        </T>
        <T x={425} y={237} size={11} fill={GREEN}>
          {t("autotrophic, photosynthetic", "autotrophic, photosynthetic")}
        </T>
        <T x={755} y={237} size={11} fill={AMBER_DARK}>
          {t("heterotrophic, holozoic", "heterotrophic, holozoic")}
        </T>
      </Fade>

      {/* beat 4 — pair 3: stored food + strategic note */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={70} y={264} size={11} fill={INK} anchor="start" weight={700}>
          {t("stored food", "stored food")}
        </T>
        <T x={425} y={264} size={11} fill={GREEN}>
          {t("starch", "starch")}
        </T>
        <T x={755} y={264} size={11} fill={AMBER_DARK}>
          {t("glycogen + fat", "glycogen + fat")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.1)}>
        <T x={540} y={300} size={11} fill={AMBER_DARK} script>
          {t(
            "lead with nutrition or wall — shows WHY, not just THAT",
            "nutrition ya wall se shuru karo — WHY dikhta hai, sirf THAT nahi"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.6)}>
        <T x={540} y={318} size={10} fill={MUTED}>
          {t(
            "extra pairs: plastids present/absent · fixed/motile — matched pairs, never lists!",
            "extra pairs: plastids present/absent · fixed/motile — matched pairs, list nahi!"
          )}
        </T>
      </Fade>

      {/* beat 5 — Example 2 label */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <Chip x={60} y={340} w={330} h={28} fill={AMBER_DARK} textFill={CREAM} size={12} script={false}>
          {t("EXAMPLE 2 · CUET (read the word precisely)", "EXAMPLE 2 · CUET (read the word precisely)")}
        </Chip>
      </Fade>

      {/* beat 6 — the question + options */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={385} size={13} fill={INK} script>
          {t("partially heterotrophic + insectivorous — which plant?", "partially heterotrophic + insectivorous — kaunsa plant?")}
        </T>
      </Fade>
      {OPTIONS.map((o, i) => (
        <Fade key={o.name} on={beat >= 6} delay={dl(6, 1 + i * 0.25)}>
          <Chip x={o.x} y={405} w={o.w} h={32} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={12} script={false}>
            {o.name}
          </Chip>
        </Fade>
      ))}

      {/* beat 7 — the answer: Venus flytrap, ringed */}
      <Draw on={beat >= 7} delay={dl(7, 0.3)} d={ringD(478, 421, 79, 28)} stroke={GREEN} sw={2.4} dur={0.7} />
      <Fade on={beat >= 7} delay={dl(7, 1.2)}>
        <T x={540} y={465} size={12} fill={GREEN} script>
          {t(
            "traps for NITROGEN, keeps photosynthesising = partially heterotrophic",
            "NITROGEN ke liye trap karta, photosynthesis chalu rakhta = partially heterotrophic"
          )}
        </T>
      </Fade>

      {/* beat 8 — the distractors, each failing differently */}
      <Fade on={beat >= 8} delay={dl(8, 0.3)}>
        <T x={540} y={495} size={11} fill={RED}>
          {t("Cuscuta = parasitic (not insectivorous), chlorophyll GONE", "Cuscuta = parasitic (insectivorous nahi), chlorophyll GAYA")}
        </T>
      </Fade>
      <Fade on={beat >= 8} delay={dl(8, 0.7)}>
        <T x={540} y={515} size={11} fill={RED}>
          {t("Spirogyra = fully autotrophic alga, no trapping", "Spirogyra = poori tarah autotrophic alga, trapping nahi")}
        </T>
      </Fade>
      <Fade on={beat >= 8} delay={dl(8, 1.1)}>
        <T x={540} y={535} size={11} fill={RED}>
          {t("mushroom = fungus, not a plant — absorbs, doesn't trap", "mushroom = fungus hai, plant nahi — absorb karta, trap nahi")}
        </T>
      </Fade>
    </svg>
  );
}
