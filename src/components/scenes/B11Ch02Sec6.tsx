"use client";

/**
 * B11 Ch02 · Section 6 — "Woese's three-domain refinement"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 13.48, 26.54, 38.31, 47.45, 65.45, 76.37, 91.39]):
 *  0 title
 *  1 Monera box alone — "isn't one group" (caption in verdict slot)
 *  2 the other 4 kingdom boxes complete the bottom row
 *  3 the 3 domain boxes appear on top: Archaea, Bacteria, Eukarya
 *  4 lines: Archaea/Bacteria → Monera's two halves (different wall chemistry)
 *  5 lines: Eukarya → the 4 eukaryotic kingdoms (fan out)
 *  6 green box around the kingdoms row — "still fully intact"
 *  7 closing (story band): different levels, same tower, not rivals
 *
 * Layout plan (measured ratios: Anek bl−0.78s..+0.31s):
 *  b1 | Monera box (ink)             | Draw  | x100..250  y440..492
 *  b1 | caption slot (script16 red)  | T mid | x540  y535  [dim@3]
 *  b2 | Protista/Fungi/Plantae/Animalia boxes | Draw | y440..492  x270-420/440-590/610-760/780-930
 *  b3 | Archaea box (amber-dark)     | Draw  | x70..260   y180..230
 *  b3 | Bacteria box (amber-dark)    | Draw  | x290..480  y180..230
 *  b3 | Eukarya box (amber-dark)     | Draw  | x560..880  y180..230
 *  b3 | caption slot (script16 ink)  | T mid | x540  y535  [dim@4]
 *  b4 | line Archaea→Monera-left     | Draw  | (165,230)→(140,440)
 *  b4 | line Bacteria→Monera-right   | Draw  | (385,230)→(210,440)
 *  b4 | caption slot (script15 red)  | T mid | x540  y535  [dim@5]
 *  b5 | 4 lines Eukarya→kingdoms     | Draw  | (620/680/760/820,230)→(345/515/685/855,440)
 *  b5 | caption slot (script15 green)| T mid | x540  y535  [dim@6]
 *  b6 | box around kingdoms row      | Draw  | x88..942  y436..498
 *  b6 | caption slot (script16 green)| T mid | x540  y535  [dim@7]
 *  b7 | closing caption (script17)   | T mid | x540  y110 (story band)
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, INK, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

const KINGDOMS: { x: number; cx: number; name: string }[] = [
  { x: 100, cx: 175, name: "Monera" },
  { x: 270, cx: 345, name: "Protista" },
  { x: 440, cx: 515, name: "Fungi" },
  { x: 610, cx: 685, name: "Plantae" },
  { x: 780, cx: 855, name: "Animalia" },
];
const K_Y = 440;
const K_H = 52;

const DOMAINS: { x: number; w: number; cx: number; name: string }[] = [
  { x: 70, w: 190, cx: 165, name: "Archaea" },
  { x: 290, w: 190, cx: 385, name: "Bacteria" },
  { x: 560, w: 320, cx: 720, name: "Eukarya" },
];
const D_Y = 180;
const D_H = 50;

const EUK_LINES: [number, number][] = [
  [620, 345],
  [680, 515],
  [760, 685],
  [820, 855],
];

export default function B11Ch02Sec6({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={56} size={22} fill={RED} script>
          {t("Woese's three-domain refinement", "Woese ka three-domain system")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 310 74 C 410 70, 650 70, 750 74" stroke={RED} sw={2.2} dur={0.6} />

      {/* beat 1 — Monera, alone, isn't one clean group */}
      <Draw on={beat >= 1} delay={dl(1, 0.3)} d={`M 100 ${K_Y} h 150 v ${K_H} h -150 z`} stroke={INK} sw={2.4} dur={0.9} fill={CREAM} />
      <Fade on={beat >= 1} delay={dl(1, 1.3)}>
        <T x={175} y={K_Y + K_H / 2 + 6} size={17} fill={INK} weight={700}>
          Monera
        </T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 3} delay={dl(1, 2)}>
        <T x={540} y={535} size={16} fill={RED} script>
          {t("Monera isn't one group — 2 kinds of prokaryote hide inside", "Monera ek group nahi — ismein 2 tarah ke prokaryote chhupe")}
        </T>
      </Fade>

      {/* beat 2 — the rest of the kingdom row completes */}
      {KINGDOMS.slice(1).map((k, i) => (
        <React.Fragment key={k.name}>
          <Draw
            on={beat >= 2}
            delay={dl(2, 0.3 + i * 0.4)}
            d={`M ${k.x} ${K_Y} h 150 v ${K_H} h -150 z`}
            stroke={INK}
            sw={2.4}
            dur={0.7}
            fill={CREAM}
          />
          <Fade on={beat >= 2} delay={dl(2, 0.8 + i * 0.4)}>
            <T x={k.cx} y={K_Y + K_H / 2 + 6} size={17} fill={INK} weight={700}>
              {k.name}
            </T>
          </Fade>
        </React.Fragment>
      ))}

      {/* beat 3 — the three domains appear on top */}
      {DOMAINS.map((dm, i) => (
        <React.Fragment key={dm.name}>
          <Draw
            on={beat >= 3}
            delay={dl(3, 0.3 + i * 0.5)}
            d={`M ${dm.x} ${D_Y} h ${dm.w} v ${D_H} h ${-dm.w} z`}
            stroke={AMBER_DARK}
            sw={2.6}
            dur={0.7}
            fill={AMBER_DARK}
          />
          <Fade on={beat >= 3} delay={dl(3, 0.8 + i * 0.5)}>
            <T x={dm.cx} y={D_Y + D_H / 2 + 6} size={18} fill={CREAM} weight={800}>
              {dm.name}
            </T>
          </Fade>
        </React.Fragment>
      ))}
      <Fade on={beat >= 3} dim={beat >= 4} delay={dl(3, 2.4)}>
        <T x={540} y={535} size={16} fill={INK} script>
          {t("three domains: Archaea, Bacteria, Eukarya", "teen domains: Archaea, Bacteria, Eukarya")}
        </T>
      </Fade>

      {/* beat 4 — Archaea/Bacteria split old Monera */}
      <Draw on={beat >= 4} delay={dl(4, 0.3)} d="M 165 230 L 140 440" stroke={AMBER_DARK} sw={2.2} dur={0.6} />
      <Draw on={beat >= 4} delay={dl(4, 1)} d="M 385 230 L 210 440" stroke={AMBER_DARK} sw={2.2} dur={0.6} />
      <Fade on={beat >= 4} dim={beat >= 5} delay={dl(4, 1.8)}>
        <T x={540} y={535} size={15} fill={RED} script>
          {t(
            "different wall & membrane chemistry — hidden inside old Monera",
            "alag wall & membrane chemistry — old Monera ke andar chhupi thi"
          )}
        </T>
      </Fade>

      {/* beat 5 — Eukarya fans out to the four eukaryotic kingdoms */}
      {EUK_LINES.map(([sx, tx], i) => (
        <Draw
          key={`euk${i}`}
          on={beat >= 5}
          delay={dl(5, 0.3 + i * 0.3)}
          d={`M ${sx} 230 L ${tx} 440`}
          stroke={AMBER_DARK}
          sw={2}
          dur={0.5}
        />
      ))}
      <Fade on={beat >= 5} dim={beat >= 6} delay={dl(5, 1.8)}>
        <T x={540} y={535} size={15} fill={GREEN} script>
          {t("all eukaryotes — one domain, Eukarya", "sabhi eukaryotes — ek hi domain, Eukarya")}
        </T>
      </Fade>

      {/* beat 6 — refinement, not replacement: kingdoms still fully intact */}
      <Draw on={beat >= 6} delay={dl(6, 0.3)} d="M 88 436 h 854 v 62 h -854 z" stroke={GREEN} sw={2.2} dur={1} />
      <Fade on={beat >= 6} dim={beat >= 7} delay={dl(6, 1.5)}>
        <T x={540} y={535} size={16} fill={GREEN} script>
          {t(
            "refinement, not replacement — kingdoms still intact beneath",
            "refinement hai, replacement nahi — kingdoms neeche intact hain"
          )}
        </T>
      </Fade>

      {/* beat 7 — closing, in the freed story band */}
      <Fade on={beat >= 7} delay={dl(7, 0.4)}>
        <T x={540} y={110} size={17} fill={GREEN} script>
          {t(
            "domains and kingdoms — different levels, same tower, not rivals",
            "domains aur kingdoms — same tower ke alag levels, rivals nahi"
          )}
        </T>
      </Fade>
    </svg>
  );
}
