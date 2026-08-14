"use client";

/**
 * B11 Ch02 · Section 46 — "Placing an organism, and the Cuscuta
 * assertion-reason" (continues Sec45 as EXAMPLE 3 / 4, mirrors Sec34's
 * pattern) Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0, 7.42, 22.44, 40.79, 52.05, 76.8, 86.27, 104.45]):
 *  0 EXAMPLE 3 label (NEET placement)
 *  1 the clues + 4 candidate chips (Plantae/Fungi/Animalia/Protista)
 *  2 the answer named: Animalia — three clues converge
 *  3 eliminate: no wall rules out Plantae (cellulose) and Fungi (chitin)
 *  4 eliminate: ingests rules out fungi/plants; multicellular rules out Protista
 *  5 EXAMPLE 4 label (assertion-reason on Cuscuta)
 *  6 A and R statements
 *  7 the drill worked through → answer stamp + cave-fish analogy
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, crossD, ringD, INK, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

const OPTIONS = [
  { x: 310, w: 90, name: "Plantae" },
  { x: 430, w: 80, name: "Fungi" },
  { x: 540, w: 100, name: "Animalia" },
  { x: 670, w: 100, name: "Protista" },
];

export default function B11Ch02Sec46({ currentTime, reveals, language }: SceneProps) {
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
          {t("EXAMPLE 3 · NEET (placement)", "EXAMPLE 3 · NEET (placement)")}
        </Chip>
      </Fade>

      {/* beat 1 — the clues + candidates */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={540} y={125} size={12} fill={INK} script>
          {t(
            "multicellular, eukaryotic, NO wall, ingests food, glycogen storage",
            "multicellular, eukaryotic, NO wall, ingests food, glycogen storage"
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
          {t("Animalia — three clues converge", "Animalia — teen clues milte hain")}
        </T>
      </Fade>

      {/* beat 3 — eliminate Plantae and Fungi */}
      <Draw on={beat >= 3} delay={dl(3, 0.3)} d={crossD(310, 150, 90, 34)} stroke={RED} sw={2.2} dur={0.5} />
      <Draw on={beat >= 3} delay={dl(3, 0.8)} d={crossD(430, 150, 80, 34)} stroke={RED} sw={2.2} dur={0.5} />
      <Fade on={beat >= 3} delay={dl(3, 1.4)}>
        <T x={540} y={240} size={11} fill={RED} script>
          {t("no wall → not Plantae (cellulose) / Fungi (chitin)", "no wall → Plantae (cellulose) / Fungi (chitin) nahi")}
        </T>
      </Fade>

      {/* beat 4 — eliminate Protista, confirm Animalia */}
      <Draw on={beat >= 4} delay={dl(4, 0.3)} d={crossD(670, 150, 100, 34)} stroke={RED} sw={2.2} dur={0.5} />
      <Draw on={beat >= 4} delay={dl(4, 0.9)} d={ringD(590, 167, 64, 29)} stroke={GREEN} sw={2.4} dur={0.7} />
      <Fade on={beat >= 4} delay={dl(4, 1.6)}>
        <T x={540} y={272} size={11} fill={GREEN} script>
          {t(
            "ingests → not fungi/plants; multicellular → not Protista (unicellular)",
            "ingests → fungi/plants nahi; multicellular → Protista (unicellular) nahi"
          )}
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
            "A: Cuscuta is in Plantae even though it CAN'T photosynthesise",
            "A: Cuscuta Plantae mein hai, photosynthesise NAHI kar sakta phir bhi"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1.2)}>
        <T x={90} y={376} size={13} fill={INK} script anchor="start">
          {t(
            "R: kingdom membership = overall organisation, not nutrition alone",
            "R: kingdom membership = overall organisation, sirf nutrition nahi"
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
          {t("R explains A ✓", "R hi A explain karta ✓")}
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 2.1)}>
        <Chip x={280} y={452} w={520} h={40} fill={GREEN} textFill="#fff" size={14} script={false}>
          {t("answer: both true — R is the correct explanation of A", "answer: dono true — R hi A ka correct explanation hai")}
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 2.8)}>
        <T x={540} y={526} size={13} fill={RED} script>
          {t("a cave fish that lost its eyes is still a fish", "andhi cave fish bhi fish hi rehti hai")}
        </T>
      </Fade>
    </svg>
  );
}
