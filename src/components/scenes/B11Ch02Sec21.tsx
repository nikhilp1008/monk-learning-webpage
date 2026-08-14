"use client";

/**
 * B11 Ch02 · Section 21 — "Pairing contrasts and reading two clues together"
 * (worked_examples, Protista subtopic — restarts EXAMPLE numbering at 1)
 * Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0, 10.5, 18.77, 35.07, 53.42, 78.25, 85.42, 101.12, 111.62]):
 *  0 EXAMPLE 1 label (CBSE 3-marker, comparison)
 *  1 the question
 *  2 technique: pair them, never two lists — table grid drawn
 *  3 pair ① covering fills in
 *  4 pairs ②③④ habitat/nutrition/storage fill in
 *  5 EXAMPLE 2 label (CUET, hides a trap)
 *  6 the question + 4 options
 *  7 the answer: diatoms, ringed
 *  8 why: read both clues together — dinoflagellates ruled out by wall
 *
 * Layout plan: table x60..920 y165..335, header col x60..260, Euglenoids
 * col x260..590, Dinoflagellates col x590..920. row divs y195/230/265/300.
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, crossD, ringD, INK, MUTED, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

const ROWS = [
  { y: 212, label: "covering", euglenoid: "no wall, pellicle", dino: "cellulose plates" },
  { y: 247, label: "habitat", euglenoid: "freshwater", dino: "marine" },
  { y: 282, label: "nutrition", euglenoid: "mixotrophic", dino: "photosynthetic" },
  { y: 317, label: "storage*", euglenoid: "paramylon", dino: "starch" },
];

const OPTIONS = [
  { x: 225, w: 170, name: "dinoflagellates" },
  { x: 415, w: 110, name: "diatoms" },
  { x: 545, w: 140, name: "euglenoids" },
  { x: 705, w: 150, name: "slime moulds" },
];

function gridPath(): string {
  let d = "M 60 165 H 920 V 335 H 60 Z M 260 165 V 335 M 590 165 V 335 M 60 195 H 920";
  for (const y of [230, 265, 300]) d += ` M 60 ${y} H 920`;
  return d;
}

export default function B11Ch02Sec21({ currentTime, reveals, language }: SceneProps) {
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
        <Chip x={60} y={85} w={280} h={28} fill={AMBER_DARK} textFill={CREAM} size={12} script={false}>
          {t("EXAMPLE 1 · CBSE (comparison, 3 marks)", "EXAMPLE 1 · CBSE (comparison, 3 marks)")}
        </Chip>
      </Fade>

      {/* beat 1 — the question */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={540} y={125} size={14} fill={INK} script>
          {t(
            "distinguish euglenoids from dinoflagellates: any 3 features",
            "euglenoids ko dinoflagellates se distinguish karo: koi 3 features"
          )}
        </T>
      </Fade>

      {/* beat 2 — the technique + table grid */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={540} y={150} size={13} fill={GREEN} script>
          {t("pair them — never two separate lists", "pair karo — do alag lists kabhi nahi")}
        </T>
      </Fade>
      <Draw on={beat >= 2} delay={dl(2, 1)} d={gridPath()} stroke={INK} sw={1.8} dur={1} />
      <Fade on={beat >= 2} delay={dl(2, 1.8)}>
        <T x={425} y={185} size={13} fill={INK} weight={700}>
          Euglenoids
        </T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 2.1)}>
        <T x={755} y={185} size={13} fill={INK} weight={700}>
          Dinoflagellates
        </T>
      </Fade>

      {/* beat 3 — pair 1: covering (lead with the most fundamental) */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={70} y={ROWS[0].y} size={12} fill={INK} anchor="start" weight={700}>
          {ROWS[0].label}
        </T>
        <T x={425} y={ROWS[0].y} size={12} fill={INK}>
          {t(ROWS[0].euglenoid, ROWS[0].euglenoid)}
        </T>
        <T x={755} y={ROWS[0].y} size={12} fill={INK}>
          {t(ROWS[0].dino, ROWS[0].dino)}
        </T>
      </Fade>

      {/* beat 4 — pairs 2, 3, 4 */}
      {ROWS.slice(1).map((r, i) => (
        <Fade key={r.label} on={beat >= 4} delay={dl(4, 0.3 + i * 0.4)}>
          <T x={70} y={r.y} size={12} fill={INK} anchor="start" weight={700}>
            {r.label}
          </T>
          <T x={425} y={r.y} size={12} fill={INK}>
            {t(r.euglenoid, r.euglenoid)}
          </T>
          <T x={755} y={r.y} size={12} fill={INK}>
            {t(r.dino, r.dino)}
          </T>
        </Fade>
      ))}

      {/* beat 5 — Example 2 label */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <Chip x={60} y={365} w={280} h={28} fill={AMBER_DARK} textFill={CREAM} size={12} script={false}>
          {t("EXAMPLE 2 · CUET (hides a trap)", "EXAMPLE 2 · CUET (hides a trap)")}
        </Chip>
      </Fade>

      {/* beat 6 — the question + options */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={405} size={14} fill={INK} script>
          {t("chief ocean producers, indestructible silica walls?", "ocean ke chief producers, silica ki indestructible walls?")}
        </T>
      </Fade>
      {OPTIONS.map((o, i) => (
        <Fade key={o.name} on={beat >= 6} delay={dl(6, 1 + i * 0.25)}>
          <Chip x={o.x} y={430} w={o.w} h={36} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={13} script={false}>
            {o.name}
          </Chip>
        </Fade>
      ))}

      {/* beat 7 — the answer: diatoms */}
      <Draw on={beat >= 7} delay={dl(7, 0.3)} d={ringD(470, 448, 69, 30)} stroke={GREEN} sw={2.4} dur={0.7} />

      {/* beat 8 — read both clues together */}
      <Draw on={beat >= 8} delay={dl(8, 0.3)} d={crossD(225, 430, 170, 36)} stroke={RED} sw={2.2} dur={0.5} />
      <Draw on={beat >= 8} delay={dl(8, 0.7)} d={crossD(545, 430, 140, 36)} stroke={RED} sw={2.2} dur={0.5} />
      <Draw on={beat >= 8} delay={dl(8, 1.1)} d={crossD(705, 430, 150, 36)} stroke={RED} sw={2.2} dur={0.5} />
      <Fade on={beat >= 8} delay={dl(8, 1.6)}>
        <T x={540} y={505} size={13} fill={GREEN} script>
          {t("read BOTH clues together — producer alone fits dinoflagellates too", "DONO clues saath padho — producer akela dinoflagellates pe bhi fit")}
        </T>
      </Fade>
      <Fade on={beat >= 8} delay={dl(8, 2.3)}>
        <T x={540} y={528} size={12} fill={MUTED} script>
          {t("it's the silica wall that rules them out — theirs is cellulose", "silica wall hi unhe rule out karti — unki wall cellulose hai")}
        </T>
      </Fade>
    </svg>
  );
}
