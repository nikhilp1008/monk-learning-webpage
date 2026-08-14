"use client";

/**
 * B11 Ch02 · Section 7 — "Why the five kingdoms are a better map"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 11.43, 22.7, 41.13, 61.78, 79.1, 89.0, 103.42]):
 *  0 title
 *  1 old system: crowded Plantae (3 misfit tags) + Animalia boxes appear
 *  2 extract Bacteria → new Monera (nucleus is fundamental)
 *  3 extract Euglena → new Protista (never fit either old label)
 *  4 extract Fungi → new Fungi (no chlorophyll, absorbs, chitin wall)
 *  5 reveal new Plantae + Animalia — 2 crowded boxes become 5 clean ones
 *  6 ring + define new Plantae/Animalia: multicellular auto-/heterotrophs
 *  7 closing (story band): fundamental features, not superficial ones
 *
 * Layout plan (measured ratios: Anek bl−0.78s..+0.31s):
 *  b1 | old Plantae box (muted)      | Draw  | x90..380  y160..290
 *  b1 | old Plantae label (14 muted) | T st  | x100  y180
 *  b1 | 3 misfit tags (13)           | Chip  | x110  y195/228/261  w100 h26
 *  b1 | old Animalia box             | Draw  | x90..380  y310..390
 *  b1 | old Animalia label           | T st  | x100  y330
 *  b1 | caption slot (script15 ink)  | T mid | x540  y500  [dim@2]
 *  b2 | arrow Bacteria→Monera        | Draw  | (210,208)→(675,182)
 *  b2 | Monera box (ink)             | Chip  | x680  y160  w150 h44
 *  b2 | caption slot (script15 red)  | T mid | x540  y500  [dim@3]
 *  b3 | arrow Euglena→Protista       | Draw  | (210,241)→(675,236)
 *  b3 | Protista box                 | Chip  | x680  y214  w150 h44
 *  b3 | caption slot (script15 red)  | T mid | x540  y500  [dim@4]
 *  b4 | arrow Fungi→Fungi-new        | Draw  | (210,274)→(675,290)
 *  b4 | Fungi-new box                | Chip  | x680  y268  w150 h44
 *  b4 | caption slot (script15 red)  | T mid | x540  y500  [dim@5]
 *  b5 | Plantae-new box              | Chip  | x680  y322  w150 h44
 *  b5 | Animalia-new box             | Chip  | x680  y376  w150 h44
 *  b5 | caption slot (script15 green)| T mid | x540  y500  [dim@6]
 *  b6 | ring Plantae-new / Animalia-new | Draw | c(755,344)/(755,398) rx90 ry27
 *  b6 | "= multicellular autotrophs" | T st  | x840  y344
 *  b6 | "= multicellular heterotrophs"| T st | x840  y398
 *  b7 | closing caption (script17)   | T mid | x540  y110 (story band)
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, ringD, INK, MUTED, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

const MISFITS: { en: string; hi: string; y: number }[] = [
  { en: "Bacteria", hi: "Bacteria", y: 195 },
  { en: "Euglena", hi: "Euglena", y: 228 },
  { en: "Fungi", hi: "Fungi", y: 261 },
];

const NEW_BOXES: { beat: number; y: number; name: string }[] = [
  { beat: 2, y: 160, name: "Monera" },
  { beat: 3, y: 214, name: "Protista" },
  { beat: 4, y: 268, name: "Fungi" },
  { beat: 5, y: 322, name: "Plantae" },
  { beat: 5, y: 376, name: "Animalia" },
];

const ARROWS: [number, number, number, number][] = [
  [210, 208, 675, 182],
  [210, 241, 675, 236],
  [210, 274, 675, 290],
];

export default function B11Ch02Sec7({ currentTime, reveals, language }: SceneProps) {
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
          {t("why the five kingdoms are a better map", "paanch kingdoms ka map behtar kyun hai")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 300 74 C 400 70, 660 70, 760 74" stroke={RED} sw={2.2} dur={0.6} />

      {/* beat 1 — the old system: 2 boxes, one of them crowded */}
      <Draw on={beat >= 1} delay={dl(1, 0.3)} d="M 90 160 h 290 v 130 h -290 z" stroke={MUTED} sw={2.2} dur={0.9} />
      <Fade on={beat >= 1} delay={dl(1, 1.1)}>
        <T x={100} y={180} size={14} fill={MUTED} anchor="start" weight={700}>
          Plantae (old)
        </T>
      </Fade>
      {MISFITS.map((m, i) => (
        <Fade key={m.en} on={beat >= 1} delay={dl(1, 1.5 + i * 0.3)}>
          <Chip x={110} y={m.y} w={100} h={26} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={13} script={false}>
            {t(m.en, m.hi)}
          </Chip>
        </Fade>
      ))}
      <Draw on={beat >= 1} delay={dl(1, 2.6)} d="M 90 310 h 290 v 80 h -290 z" stroke={MUTED} sw={2.2} dur={0.7} />
      <Fade on={beat >= 1} delay={dl(1, 3.2)}>
        <T x={100} y={330} size={14} fill={MUTED} anchor="start" weight={700}>
          {t("Animalia (old)", "Animalia (old)")}
        </T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 2} delay={dl(1, 3.8)}>
        <T x={540} y={500} size={15} fill={INK} script>
          {t("the old system: just 2 boxes", "old system: sirf 2 boxes")}
        </T>
      </Fade>

      {/* beats 2-4 — extract the misfits one at a time */}
      <Draw on={beat >= 2} delay={dl(2, 0.3)} d={`M ${ARROWS[0][0]} ${ARROWS[0][1]} L ${ARROWS[0][2]} ${ARROWS[0][3]}`} stroke={AMBER_DARK} sw={2.2} dur={0.6} />
      <Draw on={beat >= 3} delay={dl(3, 0.3)} d={`M ${ARROWS[1][0]} ${ARROWS[1][1]} L ${ARROWS[1][2]} ${ARROWS[1][3]}`} stroke={AMBER_DARK} sw={2.2} dur={0.6} />
      <Draw on={beat >= 4} delay={dl(4, 0.3)} d={`M ${ARROWS[2][0]} ${ARROWS[2][1]} L ${ARROWS[2][2]} ${ARROWS[2][3]}`} stroke={AMBER_DARK} sw={2.2} dur={0.6} />

      {NEW_BOXES.map((b) => (
        <Fade key={b.name + b.y} on={beat >= b.beat} delay={dl(b.beat, 1)}>
          <Chip x={680} y={b.y} w={150} h={44} fill={INK} textFill={CREAM} size={16} script={false}>
            {b.name}
          </Chip>
        </Fade>
      ))}

      <Fade on={beat >= 2} dim={beat >= 3} delay={dl(2, 1.8)}>
        <T x={540} y={500} size={15} fill={RED} script>
          {t("no true nucleus — more fundamental than colour or size", "true nucleus nahi — colour/size se zyada fundamental")}
        </T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 4} delay={dl(3, 1.8)}>
        <T x={540} y={500} size={15} fill={RED} script>
          {t("Euglena: part-plant, part-animal — never fit either", "Euglena: part-plant, part-animal — kabhi fit nahi hua")}
        </T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 5} delay={dl(4, 1.8)}>
        <T x={540} y={500} size={15} fill={RED} script>
          {t("no chlorophyll, absorbs food, chitin wall", "chlorophyll nahi, food absorb karta, chitin wall")}
        </T>
      </Fade>

      {/* beat 5 — the big reveal: 2 crowded boxes become 5 clean ones */}
      <Fade on={beat >= 5} dim={beat >= 6} delay={dl(5, 1.8)}>
        <T x={540} y={500} size={15} fill={GREEN} script>
          {t(
            "2 crowded boxes → 5 clean ones: sort by type, nutrition, wall",
            "2 crowded boxes → 5 clean boxes: type, nutrition, wall se sort"
          )}
        </T>
      </Fade>

      {/* beat 6 — Plantae and Animalia, now cleanly defined */}
      <Draw on={beat >= 6} delay={dl(6, 0.3)} d={ringD(755, 344, 90, 27)} stroke={GREEN} sw={2.2} dur={0.7} />
      <Draw on={beat >= 6} delay={dl(6, 1)} d={ringD(755, 398, 90, 27)} stroke={GREEN} sw={2.2} dur={0.7} />
      <Fade on={beat >= 6} delay={dl(6, 1.8)}>
        <T x={840} y={349} size={12} fill={GREEN} anchor="start">
          {t("= multicellular autotrophs", "= multicellular autotrophs")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 2.4)}>
        <T x={840} y={403} size={12} fill={AMBER_DARK} anchor="start">
          {t("= multicellular heterotrophs", "= multicellular heterotrophs")}
        </T>
      </Fade>

      {/* beat 7 — closing, in the freed story band */}
      <Fade on={beat >= 7} delay={dl(7, 0.4)}>
        <T x={540} y={100} size={15} fill={GREEN} script>
          {t("fundamental features, not superficial ones", "fundamental features, superficial nahi")}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.4)}>
        <T x={540} y={130} size={13} fill={MUTED} script>
          {t("a green alga and a moss can land in different kingdoms", "green alga aur moss alag kingdoms mein ja sakte hain")}
        </T>
      </Fade>
    </svg>
  );
}
