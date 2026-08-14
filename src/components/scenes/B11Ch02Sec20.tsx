"use client";

/**
 * B11 Ch02 · Section 20 — "Reproduction and why protists matter"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 7.68, 25.09, 40.36, 52.05, 71.77, 89.17, 114.01]):
 *  0 title
 *  1 asexual reproduction: binary fission, cysts, budding, sporulation
 *  2 sexual reproduction: syngamy + conjugation
 *  3 significance framing: two columns, divider drawn
 *  4 beneficial #1 (the big one): phytoplankton → O2 + food webs
 *  5 beneficial #2,3: diatomaceous earth, slime mould recycling
 *  6 harmful: the 3 pairings — Plasmodium/Trypanosoma/Entamoeba
 *  7 harmful extra: red tides + closing punchline
 *
 * Layout plan: repro lines y85/108, divider y130..560 x540,
 * BENEFICIAL header x270 y155, HARMFUL header x810 y155,
 * left column lines x75 (start) y190/225/255, right column lines x575
 * (start) y190/220/250/285, closing line y330 (centered).
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, GREEN, RED, INK } from "./kit";

export default function B11Ch02Sec20({ currentTime, reveals, language }: SceneProps) {
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
          {t("reproduction, and why protists matter", "reproduction, aur protists kyun matter karte hain")}
        </T>
      </Fade>

      {/* beat 1 — asexual routes */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={540} y={85} size={12} fill={INK} script>
          {t(
            "asexual: binary fission (Euglena) · cysts (Entamoeba) · budding · sporulation",
            "asexual: binary fission (Euglena) · cysts (Entamoeba) · budding · sporulation"
          )}
        </T>
      </Fade>

      {/* beat 2 — sexual route */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={540} y={108} size={12} fill={INK} script>
          {t(
            "sexual: syngamy + conjugation — cell fusion, zygote formation",
            "sexual: syngamy + conjugation — cell fusion, zygote formation"
          )}
        </T>
      </Fade>

      {/* beat 3 — the two columns */}
      <Draw on={beat >= 3} delay={dl(3, 0.3)} d="M 540 140 L 540 300" stroke={INK} sw={1.6} dur={0.7} />
      <Fade on={beat >= 3} delay={dl(3, 1)}>
        <T x={270} y={158} size={15} fill={GREEN} weight={800}>
          {t("BENEFICIAL", "BENEFICIAL")}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 1.3)}>
        <T x={810} y={158} size={15} fill={RED} weight={800}>
          {t("HARMFUL", "HARMFUL")}
        </T>
      </Fade>

      {/* beat 4 — beneficial: the big one */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={75} y={190} size={13} fill={GREEN} anchor="start" weight={700}>
          {t("phytoplankton → O2 + base of food webs", "phytoplankton → O2 + food webs ka base")}
        </T>
      </Fade>

      {/* beat 5 — two more benefits */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={75} y={225} size={12} fill={INK} anchor="start">
          {t("diatomaceous earth → abrasive, filter", "diatomaceous earth → abrasive, filter")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 0.9)}>
        <T x={75} y={255} size={12} fill={INK} anchor="start">
          {t("slime moulds → recycle nutrients", "slime moulds → nutrients recycle")}
        </T>
      </Fade>

      {/* beat 6 — the three harmful pairings */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={575} y={190} size={13} fill={RED} anchor="start" weight={700}>
          {t("Plasmodium → malaria", "Plasmodium → malaria")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={575} y={220} size={13} fill={RED} anchor="start" weight={700}>
          {t("Trypanosoma → sleeping sickness", "Trypanosoma → sleeping sickness")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1.3)}>
        <T x={575} y={250} size={13} fill={RED} anchor="start" weight={700}>
          {t("Entamoeba → amoebic dysentery", "Entamoeba → amoebic dysentery")}
        </T>
      </Fade>

      {/* beat 7 — one more harm, and the punchline */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={575} y={285} size={12} fill={INK} anchor="start">
          {t("red tides (dinoflagellates) → poison fish/shellfish", "red tides (dinoflagellates) → fish/shellfish poison")}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.2)}>
        <T x={540} y={330} size={14} fill={RED} script>
          {t(
            "the same group that feeds the ocean can also poison it",
            "jo group ocean ko khilata hai, wahi poison bhi kar sakta hai"
          )}
        </T>
      </Fade>
    </svg>
  );
}
