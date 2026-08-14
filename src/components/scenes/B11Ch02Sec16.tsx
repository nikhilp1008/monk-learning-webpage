"use client";

/**
 * B11 Ch02 · Section 16 — "Chrysophytes: diatoms and the soap-box wall"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 12.03, 30.04, 34.99, 47.1, 58.71, 69.29, 87.98]):
 *  0 title
 *  1 plankton dots + "microscopic, floats as plankton — chief producer"
 *  2 transition: "look at the wall"
 *  3 bottom shell drawn + "silica = glass, indestructible"
 *  4 top shell (overlapping) drawn + "lid over base, like a soap box"
 *  5 pattern lines + "jewels of the sea"
 *  6 diatomaceous earth: deposits → polishing, filtration
 *  7 2 facts: stored food (chrysolaminarin + oil), major oxygen source
 *
 * Layout plan:
 *  b1 | 8 plankton dots (green)       | Fade  | scattered x150..950 y90..120
 *  b1 | caption (script13 ink)        | T mid | x540  y140
 *  b2 | transition (script14 red)     | T mid | x540  y175
 *  b3 | bottom shell (hypotheca)      | Draw  | x380  y330  w320 h85 rx40
 *  b3-5| caption slot (script14)      | T mid | x540  y210
 *  b4 | top shell (epitheca)          | Draw  | x360  y300  w360 h70 rx35
 *  b4 | "lid"/"base" labels + arrows  | T/Draw| x760  y325/395
 *  b5 | pattern lines on top shell    | Draw  | inside x400..680 y310..360
 *  b6 | caption (script14 green)      | T mid | x540  y460
 *  b7 | 2 fact chips                  | Chip  | x220/620  y500  w280 h44
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, arrowD, INK, GREEN, RED, AMBER_DARK, CREAM } from "./kit";

const PLANKTON_DOTS: [number, number][] = [
  [180, 100], [260, 115], [340, 92], [430, 108], [520, 96],
  [610, 112], [700, 100], [790, 115], [870, 94], [940, 108],
];

export default function B11Ch02Sec16({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={52} size={18} fill={RED} script>
          {t("chrysophytes: diatoms and the soap-box wall", "chrysophytes: diatoms aur soap-box wall")}
        </T>
      </Fade>

      {/* beat 1 — planktonic, chief ocean producer */}
      {PLANKTON_DOTS.map(([x, y], i) => (
        <Fade key={i} on={beat >= 1} delay={dl(1, 0.3 + i * 0.1)}>
          <circle cx={x} cy={y} r={4} fill={GREEN} />
        </Fade>
      ))}
      <Fade on={beat >= 1} delay={dl(1, 1.4)}>
        <T x={540} y={140} size={13} fill={INK} script>
          {t(
            "microscopic, floats as plankton — chief producer of the ocean",
            "microscopic, plankton ki tarah tairta — ocean ka chief producer"
          )}
        </T>
      </Fade>

      {/* beat 2 — transition */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={540} y={175} size={14} fill={RED} script>
          {t("now look at the wall", "ab wall ko dekho")}
        </T>
      </Fade>

      {/* beat 3 — the bottom shell + silica */}
      <Draw on={beat >= 3} delay={dl(3, 0.3)} d="M 380 330 h 320 v 85 h -320 z" stroke={INK} sw={2.4} dur={0.9} fill={CREAM} />
      <Fade on={beat >= 3} dim={beat >= 4} delay={dl(3, 1.2)}>
        <T x={540} y={210} size={14} fill={RED} script>
          {t("silica = glass — indestructible, your ID clue", "silica = glass — indestructible, ID clue")}
        </T>
      </Fade>

      {/* beat 4 — the top shell overlaps like a soap-box lid */}
      <Draw on={beat >= 4} delay={dl(4, 0.3)} d="M 360 300 h 360 v 70 h -360 z" stroke={INK} sw={2.4} dur={0.9} fill={CREAM} />
      <Draw on={beat >= 4} delay={dl(4, 1.1)} d={arrowD(760, 325, 725, 325)} stroke={INK} sw={1.6} dur={0.4} />
      <Fade on={beat >= 4} delay={dl(4, 1.4)}>
        <T x={770} y={330} size={12} fill={INK} anchor="start">
          {t("lid (epitheca)", "lid (epitheca)")}
        </T>
      </Fade>
      <Draw on={beat >= 4} delay={dl(4, 1.8)} d={arrowD(760, 395, 705, 395)} stroke={INK} sw={1.6} dur={0.4} />
      <Fade on={beat >= 4} delay={dl(4, 2.1)}>
        <T x={770} y={400} size={12} fill={INK} anchor="start">
          {t("base (hypotheca)", "base (hypotheca)")}
        </T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 5} delay={dl(4, 2.5)}>
        <T x={540} y={210} size={14} fill={INK} script>
          {t("two halves — lid over base, like a soap box", "do halves — soap box jaisa, lid base ke upar")}
        </T>
      </Fade>

      {/* beat 5 — jewels of the sea */}
      <Draw on={beat >= 5} delay={dl(5, 0.3)} d="M 410 320 Q 540 305, 670 320 M 410 340 Q 540 328, 670 340 M 410 358 Q 540 350, 670 358" stroke={AMBER_DARK} sw={1.4} dur={0.7} />
      <Fade on={beat >= 5} delay={dl(5, 1.2)}>
        <T x={540} y={210} size={14} fill={AMBER_DARK} script>
          {t("the jewels of the sea — glassy, patterned walls", "samundar ke jewels — glassy, patterned walls")}
        </T>
      </Fade>

      {/* beat 6 — diatomaceous earth */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={460} size={14} fill={GREEN} script>
          {t(
            "walls resist decay → diatomaceous earth (polishing, filtration)",
            "walls decay resist karte → diatomaceous earth (polishing, filtration)"
          )}
        </T>
      </Fade>

      {/* beat 7 — two facts to bank */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <Chip x={220} y={500} w={280} h={44} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={13} script={false}>
          {t("food: chrysolaminarin + oil", "food: chrysolaminarin + oil")}
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1)}>
        <Chip x={620} y={500} w={280} h={44} fill={CREAM} stroke={GREEN} textFill={GREEN} size={13} script={false}>
          {t("major source of Earth's oxygen", "Earth ke oxygen ka major source")}
        </Chip>
      </Fade>
    </svg>
  );
}
