"use client";

/**
 * B11 Ch02 · Section 34 — "Class from a feature set, and the
 * Deuteromycetes assertion-reason" (continues Sec33 as EXAMPLE 3 / 4)
 * Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0, 8.19, 31.83, 43.95, 59.73, 80.73, 88.23, 109.14]):
 *  0 EXAMPLE 3 label (NEET feature pile)
 *  1 the clues + 4 candidate chips
 *  2 the answer named: Ascomycete
 *  3 eliminate: septate rules out Phyco; has sexual stage rules out Deutero
 *  4 eliminate: endogenous/sac rules out Basidio → Ascomycetes confirmed
 *  5 EXAMPLE 4 label (assertion-reason on Deuteromycetes)
 *  6 A and R statements
 *  7 the drill worked through → answer stamp
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, crossD, ringD, INK, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

const OPTIONS = [
  { x: 145, w: 190, name: "Phycomycetes" },
  { x: 355, w: 170, name: "Ascomycetes" },
  { x: 545, w: 210, name: "Basidiomycetes" },
  { x: 775, w: 190, name: "Deuteromycetes" },
];

export default function B11Ch02Sec34({ currentTime, reveals, language }: SceneProps) {
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
      {/* beat 0 — Example 3 label */}
      <Fade on={beat >= 0} delay={dl(0, 0.2)}>
        <Chip x={60} y={80} w={260} h={28} fill={AMBER_DARK} textFill={CREAM} size={12} script={false}>
          {t("EXAMPLE 3 · NEET (feature pile)", "EXAMPLE 3 · NEET (feature pile)")}
        </Chip>
      </Fade>

      {/* beat 1 — the clues + candidates */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={540} y={125} size={12} fill={INK} script>
          {t(
            "septate · conidia (exogenous, conidiophore) · sexual spores (endogenous, sac) · ascocarp",
            "septate · conidia (exogenous) · sexual spores (endogenous, sac) · ascocarp"
          )}
        </T>
      </Fade>
      {OPTIONS.map((o, i) => (
        <Fade key={o.name} on={beat >= 1} delay={dl(1, 1 + i * 0.25)}>
          <Chip x={o.x} y={150} w={o.w} h={34} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={12} script={false}>
            {o.name}
          </Chip>
        </Fade>
      ))}

      {/* beat 2 — the answer named */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={540} y={210} size={13} fill={GREEN} script>
          {t("an Ascomycete — sac + ascocarp is the signature", "Ascomycete — sac + ascocarp signature hai")}
        </T>
      </Fade>

      {/* beat 3 — eliminate Phycomycetes and Deuteromycetes */}
      <Draw on={beat >= 3} delay={dl(3, 0.3)} d={crossD(145, 150, 190, 34)} stroke={RED} sw={2.2} dur={0.5} />
      <Draw on={beat >= 3} delay={dl(3, 0.8)} d={crossD(775, 150, 190, 34)} stroke={RED} sw={2.2} dur={0.5} />
      <Fade on={beat >= 3} delay={dl(3, 1.4)}>
        <T x={540} y={240} size={11} fill={RED} script>
          {t("septate → not Phyco; has a sexual stage → not Deutero", "septate → Phyco nahi; sexual stage hai → Deutero nahi")}
        </T>
      </Fade>

      {/* beat 4 — eliminate Basidiomycetes, confirm Ascomycetes */}
      <Draw on={beat >= 4} delay={dl(4, 0.3)} d={crossD(545, 150, 210, 34)} stroke={RED} sw={2.2} dur={0.5} />
      <Draw on={beat >= 4} delay={dl(4, 0.9)} d={ringD(440, 167, 99, 29)} stroke={GREEN} sw={2.4} dur={0.7} />
      <Fade on={beat >= 4} delay={dl(4, 1.6)}>
        <T x={540} y={272} size={11} fill={GREEN} script>
          {t("endogenous, in a sac → not Basidio → only Ascomycetes survives", "endogenous, sac mein → Basidio nahi → sirf Ascomycetes bachta")}
        </T>
      </Fade>

      {/* beat 5 — Example 4 label */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <Chip x={60} y={305} w={300} h={28} fill={AMBER_DARK} textFill={CREAM} size={12} script={false}>
          {t("EXAMPLE 4 · Assertion-Reason", "EXAMPLE 4 · Assertion-Reason")}
        </Chip>
      </Fade>

      {/* beat 6 — the assertion and reason */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={90} y={350} size={13} fill={INK} script anchor="start">
          {t(
            "A: once its sexual stage is found, a fungus leaves Deuteromycetes",
            "A: sexual stage milte hi, fungus Deuteromycetes se nikal jaata"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1.2)}>
        <T x={90} y={376} size={13} fill={INK} script anchor="start">
          {t(
            "R: Deuteromycetes is artificial — defined only by an absent sexual stage",
            "R: Deuteromycetes artificial hai — sirf absent sexual stage se defined"
          )}
        </T>
      </Fade>

      {/* beat 7 — the drill, worked through */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <Chip x={270} y={410} w={140} h={32} fill={CREAM} stroke={GREEN} textFill={GREEN} size={13} script={false}>
          A ✓ true
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <Chip x={430} y={410} w={140} h={32} fill={CREAM} stroke={GREEN} textFill={GREEN} size={13} script={false}>
          R ✓ true
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.3)}>
        <Chip x={590} y={410} w={220} h={32} fill={CREAM} stroke={GREEN} textFill={GREEN} size={12} script={false}>
          {t("losing the criterion = losing membership", "criterion khona = membership khona")}
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 2.1)}>
        <Chip x={280} y={452} w={520} h={40} fill={GREEN} textFill="#fff" size={14} script={false}>
          {t("answer: both true — R is the correct explanation of A", "answer: dono true — R hi A ka correct explanation hai")}
        </Chip>
      </Fade>
    </svg>
  );
}
