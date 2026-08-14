"use client";

/**
 * B11 Ch02 · Section 32 — "Why fungi matter: the double-edged ledger"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 7.77, 18.09, 28.25, 49.32, 66.05, 85.85, 101.97]):
 *  0 title
 *  1 framing: beneficial left, harmful right — organisms with jobs now
 *  2 Penicillium → penicillin
 *  3 Saccharomyces → yeast, fermentation
 *  4 Neurospora → genetics research
 *  5 harmful block: Puccinia/Ustilago/Albugo — 3 crop diseases
 *  6 two more benefits: Deuteromycetes decomposers, morels/truffles
 *  7 Rhizopus spoils food + the fridge is an anti-fungal device
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, GREEN, RED, INK, AMBER_DARK } from "./kit";

export default function B11Ch02Sec32({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={48} size={16} fill={RED} script>
          {t("why fungi matter: the double-edged ledger", "fungi kyun matter karte: double-edged ledger")}
        </T>
      </Fade>

      {/* beat 1 — the framing */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={540} y={75} size={12} fill={INK} script>
          {t("organisms you've met — now showing up with jobs", "organisms jinse mile ho — ab job ke saath")}
        </T>
      </Fade>
      <Draw on={beat >= 1} delay={dl(1, 1)} d="M 540 90 L 540 400" stroke={INK} sw={1.6} dur={0.7} />
      <Fade on={beat >= 1} delay={dl(1, 1.6)}>
        <T x={270} y={108} size={15} fill={GREEN} weight={800}>
          BENEFICIAL
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1.9)}>
        <T x={810} y={108} size={15} fill={RED} weight={800}>
          HARMFUL
        </T>
      </Fade>

      {/* beat 2 — Penicillium */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={75} y={140} size={12} fill={GREEN} anchor="start" weight={700}>
          {t("Penicillium → penicillin (antibiotic)", "Penicillium → penicillin (antibiotic)")}
        </T>
      </Fade>

      {/* beat 3 — Saccharomyces */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={75} y={168} size={11} fill={INK} anchor="start">
          {t("Saccharomyces → yeast: bread, idli, beer, wine", "Saccharomyces → yeast: bread, idli, beer, wine")}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 0.9)}>
        <T x={75} y={190} size={10} fill={INK} anchor="start" script>
          {t("(its CO₂ is exactly what puffs the dough)", "(iska CO₂ hi dough ko puff karta hai)")}
        </T>
      </Fade>

      {/* beat 4 — Neurospora */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={75} y={220} size={11} fill={INK} anchor="start">
          {t("Neurospora → genetics research", "Neurospora → genetics research")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 0.9)}>
        <T x={75} y={242} size={10} fill={AMBER_DARK} anchor="start" script>
          {t("“the Drosophila of the plant kingdom”", "“plant kingdom ka Drosophila”")}
        </T>
      </Fade>

      {/* beat 5 — the harmful block: three crop diseases */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={575} y={140} size={12} fill={RED} anchor="start" weight={700}>
          {t("Puccinia → wheat rust", "Puccinia → wheat rust")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={575} y={165} size={12} fill={RED} anchor="start" weight={700}>
          {t("Ustilago → smut", "Ustilago → smut")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1.3)}>
        <T x={575} y={190} size={12} fill={RED} anchor="start" weight={700}>
          {t("Albugo → white rust of mustard", "Albugo → white rust of mustard")}
        </T>
      </Fade>

      {/* beat 6 — two more benefits */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={75} y={275} size={11} fill={INK} anchor="start">
          {t("Deuteromycetes → decomposers, recycle nutrients", "Deuteromycetes → decomposers, nutrients recycle")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 0.9)}>
        <T x={75} y={300} size={11} fill={GREEN} anchor="start" script>
          {t("morels, truffles → edible delicacies", "morels, truffles → edible delicacies")}
        </T>
      </Fade>

      {/* beat 7 — closing harm: spoilage, and why fridges work */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={575} y={230} size={11} fill={INK} anchor="start">
          {t("Rhizopus → spoils stored food (bread mould)", "Rhizopus → stored food spoil karta (bread mould)")}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1)}>
        <T x={575} y={255} size={11} fill={GREEN} anchor="start" script>
          {t("your fridge = an anti-fungal device", "tumhara fridge = ek anti-fungal device")}
        </T>
      </Fade>
    </svg>
  );
}
