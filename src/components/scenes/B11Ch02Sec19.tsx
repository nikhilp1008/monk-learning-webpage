"use client";

/**
 * B11 Ch02 · Section 19 — "Protozoa: the four classes"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 10.07, 25.86, 35.41, 57.26, 70.14, 90.45, 113.92]):
 *  0 title
 *  1 two universal facts: heterotrophs; classified by locomotion
 *  2 table framing: locomotion drives everything — dividers drawn
 *  3 class ① amoeboid: pseudopodia — Amoeba / Entamoeba, silica shells
 *  4 class ② flagellated: flagella — Trypanosoma, sleeping sickness
 *  5 class ③ ciliated: cilia — Paramecium, gullet + water current
 *  6 class ④ sporozoan: no locomotor organ — Plasmodium, most tested
 *  7 two extra facts: contractile vacuole; Paramecium's two nuclei
 *
 * Layout plan: 4 cards, x [50,300,550,800] w230, dividers x [285,535,785]
 * y90..360. header y110, icon y140..185, example y215/240, extra y275.
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, MUTED, AMBER_DARK, GREEN, RED, INK, CREAM } from "./kit";

const CARD_CX = [165, 415, 665, 915];

export default function B11Ch02Sec19({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={50} size={16} fill={RED} script>
          {t("protozoa: four classes, one locomotion column", "protozoa: chaar classes, ek locomotion column")}
        </T>
      </Fade>

      {/* beat 1 — the two universal facts */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={540} y={72} size={12} fill={INK} script>
          {t(
            "heterotrophs — predators or parasites; classified by HOW THEY MOVE",
            "heterotrophs — predator ya parasite; classify HOW THEY MOVE se"
          )}
        </T>
      </Fade>

      {/* beat 2 — table framing: the dividers */}
      <Draw on={beat >= 2} delay={dl(2, 0.3)} d="M 285 90 V 360 M 535 90 V 360 M 785 90 V 360" stroke={MUTED} sw={1.6} dur={0.8} />

      {/* beat 3 — class 1: amoeboid */}
      <Fade on={beat >= 3} delay={dl(3, 0.2)}>
        <T x={CARD_CX[0]} y={110} size={14} fill={AMBER_DARK} weight={800}>
          {t("① AMOEBOID", "① AMOEBOID")}
        </T>
      </Fade>
      <Draw on={beat >= 3} delay={dl(3, 0.6)} d="M 165 160 m -16 0 a 16 16 0 1 0 32 0 a 16 16 0 1 0 -32 0 M 149 160 Q 130 152, 118 158 M 165 144 Q 160 122, 175 116 M 181 160 Q 200 165, 210 155 M 165 176 Q 172 196, 158 202" stroke={INK} sw={1.6} dur={0.7} fill={CREAM} />
      <Fade on={beat >= 3} delay={dl(3, 1.4)}>
        <T x={CARD_CX[0]} y={216} size={11} fill={INK}>
          {t("Amoeba: phagocytosis", "Amoeba: phagocytosis")}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 1.8)}>
        <T x={CARD_CX[0]} y={238} size={11} fill={INK}>
          {t("Entamoeba: gut parasite", "Entamoeba: gut parasite")}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 2.3)}>
        <T x={CARD_CX[0]} y={278} size={11} fill={GREEN} script>
          {t("marine forms: silica shells", "marine forms: silica shells")}
        </T>
      </Fade>

      {/* beat 4 — class 2: flagellated */}
      <Fade on={beat >= 4} delay={dl(4, 0.2)}>
        <T x={CARD_CX[1]} y={110} size={14} fill={AMBER_DARK} weight={800}>
          {t("② FLAGELLATED", "② FLAGELLATED")}
        </T>
      </Fade>
      <Draw on={beat >= 4} delay={dl(4, 0.6)} d="M 415 160 m -14 0 a 14 14 0 1 0 28 0 a 14 14 0 1 0 -28 0 M 429 160 Q 460 150, 470 170 Q 478 185, 465 190" stroke={INK} sw={1.6} dur={0.7} fill={CREAM} />
      <Fade on={beat >= 4} delay={dl(4, 1.4)}>
        <T x={CARD_CX[1]} y={216} size={11} fill={INK}>
          Trypanosoma
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.8)}>
        <T x={CARD_CX[1]} y={238} size={11} fill={RED} script>
          {t("→ African sleeping sickness", "→ African sleeping sickness")}
        </T>
      </Fade>

      {/* beat 5 — class 3: ciliated */}
      <Fade on={beat >= 5} delay={dl(5, 0.2)}>
        <T x={CARD_CX[2]} y={110} size={14} fill={AMBER_DARK} weight={800}>
          {t("③ CILIATED", "③ CILIATED")}
        </T>
      </Fade>
      <Draw
        on={beat >= 5}
        delay={dl(5, 0.6)}
        d="M 665 160 m -22 -10 a 22 10 0 1 0 44 0 a 22 10 0 1 0 -44 0 M 646 152 L 640 144 M 654 148 L 650 139 M 665 147 L 665 137 M 676 148 L 680 139 M 684 152 L 690 144 M 646 168 L 640 176 M 654 172 L 650 181 M 676 172 L 680 181 M 684 168 L 690 176"
        stroke={INK}
        sw={1.4}
        dur={0.7}
        fill={CREAM}
      />
      <Fade on={beat >= 5} delay={dl(5, 1.4)}>
        <T x={CARD_CX[2]} y={216} size={11} fill={INK}>
          Paramecium
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1.8)}>
        <T x={CARD_CX[2]} y={238} size={11} fill={GREEN} script>
          {t("gullet + water current", "gullet + water current")}
        </T>
      </Fade>

      {/* beat 6 — class 4: sporozoan, breaks the pattern */}
      <Fade on={beat >= 6} delay={dl(6, 0.2)}>
        <T x={CARD_CX[3]} y={110} size={14} fill={RED} weight={800}>
          {t("④ SPOROZOAN", "④ SPOROZOAN")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 0.6)}>
        <path d="M 915 160 m -15 0 a 15 15 0 1 0 30 0 a 15 15 0 1 0 -30 0" fill="none" stroke={MUTED} strokeWidth={1.6} strokeDasharray="4 4" />
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1)}>
        <T x={CARD_CX[3]} y={192} size={10} fill={MUTED} script>
          {t("no locomotor organ", "koi locomotor organ nahi")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1.5)}>
        <T x={CARD_CX[3]} y={216} size={11} fill={INK}>
          Plasmodium
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1.9)}>
        <T x={CARD_CX[3]} y={238} size={11} fill={RED} script>
          {t("malaria — most tested!", "malaria — sabse zyada tested!")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 2.4)}>
        <T x={CARD_CX[3]} y={278} size={10} fill={AMBER_DARK} script>
          {t("named for life-cycle stage", "life-cycle stage se naam")}
        </T>
      </Fade>

      {/* beat 7 — two extra facts */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={540} y={400} size={13} fill={INK} script>
          {t(
            "freshwater: contractile vacuole for osmoregulation",
            "freshwater: contractile vacuole osmoregulation ke liye"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1)}>
        <T x={540} y={425} size={13} fill={GREEN} script>
          {t("Paramecium carries two types of nuclei", "Paramecium mein do tarah ke nuclei hote hain")}
        </T>
      </Fade>
    </svg>
  );
}
