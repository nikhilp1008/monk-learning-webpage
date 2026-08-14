"use client";

/**
 * B11 Ch02 · Section 33 — "The sac-versus-club contrast and an
 * example-to-class recall" (worked_examples, restarts numbering for
 * subtopic 3) Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0, 9.9, 29.1, 42.07, 66.73, 82.43, 92.25, 103.42, 122.03]):
 *  0 EXAMPLE 1 label (CBSE 3-marker, structured comparison)
 *  1 the question — three axes handed to you
 *  2 axis 1: common name (sac fungi vs club fungi) — grid drawn
 *  3 axis 2: endogenous/ascus vs exogenous/basidium
 *  4 axis 3: example (Penicillium vs Agaricus)
 *  5 EXAMPLE 2 label (CUET example-to-class recall)
 *  6 the question + 4 options
 *  7 the answer: Phycomycetes, confirmed by feature not just recall
 *  8 memory hook: the recurring trio
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, ringD, INK, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

const OPTIONS = [
  { x: 155, w: 190, name: "Phycomycetes" },
  { x: 365, w: 170, name: "Ascomycetes" },
  { x: 555, w: 190, name: "Basidiomycetes" },
  { x: 765, w: 190, name: "Deuteromycetes" },
];

function gridPath(): string {
  return "M 60 150 H 920 V 280 H 60 Z M 260 150 V 280 M 590 150 V 280 M 60 185 H 920 M 60 220 H 920 M 60 245 H 920";
}

export default function B11Ch02Sec33({ currentTime, reveals, language }: SceneProps) {
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
        <Chip x={60} y={85} w={310} h={28} fill={AMBER_DARK} textFill={CREAM} size={12} script={false}>
          {t("EXAMPLE 1 · CBSE (structured, 3 marks)", "EXAMPLE 1 · CBSE (structured, 3 marks)")}
        </Chip>
      </Fade>

      {/* beat 1 — the question */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={540} y={128} size={13} fill={INK} script>
          {t(
            "distinguish Asco- vs Basidiomycetes: name, sexual spores, example",
            "Asco- vs Basidiomycetes: name, sexual spores, example se distinguish karo"
          )}
        </T>
      </Fade>

      {/* beat 2 — axis 1: common name */}
      <Draw on={beat >= 2} delay={dl(2, 0.3)} d={gridPath()} stroke={INK} sw={1.8} dur={1} />
      <Fade on={beat >= 2} delay={dl(2, 1.2)}>
        <T x={425} y={172} size={12} fill={INK} weight={700}>
          Ascomycetes
        </T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 1.5)}>
        <T x={755} y={172} size={12} fill={INK} weight={700}>
          Basidiomycetes
        </T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 1.9)}>
        <T x={70} y={207} size={11} fill={INK} anchor="start" weight={700}>
          {t("common name", "common name")}
        </T>
        <T x={425} y={207} size={11} fill={INK}>
          {t("sac fungi", "sac fungi")}
        </T>
        <T x={755} y={207} size={11} fill={INK}>
          {t("club fungi", "club fungi")}
        </T>
      </Fade>

      {/* beat 3 — axis 2: the marks-winning line */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={70} y={237} size={11} fill={INK} anchor="start" weight={700}>
          {t("sexual spores", "sexual spores")}
        </T>
        <T x={425} y={237} size={10} fill={AMBER_DARK}>
          {t("endogenous, in an ascus", "endogenous, ascus mein")}
        </T>
        <T x={755} y={237} size={10} fill={GREEN}>
          {t("exogenous, on a basidium", "exogenous, basidium par")}
        </T>
      </Fade>

      {/* beat 4 — axis 3: example */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={70} y={264} size={11} fill={INK} anchor="start" weight={700}>
          {t("example", "example")}
        </T>
        <T x={425} y={264} size={11} fill={INK} script>
          Penicillium
        </T>
        <T x={755} y={264} size={11} fill={INK} script>
          Agaricus
        </T>
      </Fade>

      {/* beat 5 — Example 2 label */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <Chip x={60} y={305} w={310} h={28} fill={AMBER_DARK} textFill={CREAM} size={12} script={false}>
          {t("EXAMPLE 2 · CUET (example → class)", "EXAMPLE 2 · CUET (example → class)")}
        </Chip>
      </Fade>

      {/* beat 6 — the question + options */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={350} size={14} fill={INK} script>
          {t("Mucor, Rhizopus, Albugo — which class?", "Mucor, Rhizopus, Albugo — kaunsi class?")}
        </T>
      </Fade>
      {OPTIONS.map((o, i) => (
        <Fade key={o.name} on={beat >= 6} delay={dl(6, 1 + i * 0.25)}>
          <Chip x={o.x} y={378} w={o.w} h={34} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={12} script={false}>
            {o.name}
          </Chip>
        </Fade>
      ))}

      {/* beat 7 — the answer, confirmed by feature */}
      <Draw on={beat >= 7} delay={dl(7, 0.3)} d={ringD(250, 395, 109, 29)} stroke={GREEN} sw={2.4} dur={0.7} />
      <Fade on={beat >= 7} delay={dl(7, 1.2)}>
        <T x={540} y={462} size={12} fill={GREEN} script>
          {t(
            "confirm, don't just recall: aseptate/coenocytic — unique to this class",
            "confirm karo, sirf recall nahi: aseptate/coenocytic — sirf isi class mein"
          )}
        </T>
      </Fade>

      {/* beat 8 — the memory hook */}
      <Fade on={beat >= 8} delay={dl(8, 0.3)}>
        <T x={540} y={489} size={12} fill={AMBER_DARK} script>
          {t(
            "Mucor + Rhizopus = bread/dung moulds, Albugo = mustard's white rust",
            "Mucor + Rhizopus = bread/dung moulds, Albugo = mustard ka white rust"
          )}
        </T>
      </Fade>
    </svg>
  );
}
