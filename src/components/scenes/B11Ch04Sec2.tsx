"use client";

/**
 * B11 Ch04 · Section 2 — "Movement, definite growth, and the animal control system"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 10.92, 20.74, 39.42, 55.04, 68.52, 81.92, 91.22, 102.66]):
 *  0 title (always-on) + drawn underline · hook: cell done, now 4 organism traits
 *  1 MOVEMENT: footprint trail + chip "move + locomote, at some life stage"
 *  2 "at some stage": sponge + coral glued to a rock, larva swims free
 *  3 MAIN DEMO: growth graph — animal curve rises then flattens; plant curve
 *    (dashed) keeps climbing. Legend, no axis clutter.
 *  4 consequence: ring the plateau, "characteristic adult shape+size, then STOPS"
 *  — beats 1–4 ERASE at beat 5 (opacity 0), main band reused —
 *  5 CONTROL flow: ENVIRONMENT --sensory--> ANIMAL --neuromotor--> MUSCLES
 *  6 REPRODUCTION chip: predominantly sexual, diploid → embryo → individual
 *  7 asexual footnote: not exclusive — budding in Hydra & sponges
 *  8 closing SIGNATURE banner: moves · fixed-size growth · senses+responds · mostly sexual
 *
 * Layout plan (Kalam bl−1.3s..+0.5s, Anek bl−0.78s..+0.31s):
 *  b0 | title (script26 red)          | T mid  | x?..?  y30..66  (bl58)
 *  b0 | underline swoosh              | Draw   | y72  x400..680
 *  b0 | hook (script14 muted)         | T mid  | x?..?  y93..107 (bl100) [dim@1]
 *  b1 | footprint trail (4 dots)      | Draw   | x78..170  y132..180
 *  b1 | movement chip                 | Chip   | x210..560 y138..168
 *  b2 | rock/seabed line              | Draw   | x600..980 y198
 *  b2 | sponge shape                  | Draw   | x648..702 y150..198
 *  b2 | coral shape                   | Draw   | x758..832 y150..198
 *  b2 | larva icon + dashed arrow     | Draw   | x862..952 y104..152
 *  b2 | larva label                   | T st   | x905..?  y104..116 (bl110)
 *  b2 | annotation                    | T mid  | x?..?  y208..222 (bl220)
 *  b3 | y-axis                        | Draw   | x150 y282..452
 *  b3 | x-axis                        | Draw   | y452 x150..900
 *  b3 | animal curve (solid)          | Draw   | x150..850 → plateau y294
 *  b3 | plant curve (dashed)          | Draw   | x150..850 → keeps climbing y268
 *  b3 | legend swatch+label ×2        | Draw/T | x160..380 y285..317
 *  b3 | "time →" label                | T end  | x830..900 y466..478 (bl474)
 *  b4 | ring on plateau               | Draw   | c(620,294) rx42 ry19
 *  b4 | small arrow down              | Draw   | (620,315)→(620,334)
 *  b4 | consequence line              | T mid  | x?..?  y345..361 (bl358)
 *  [erase b1–b4 at beat>=5]
 *  b5 | ENVIRONMENT box               | Draw   | x150..330 y350..400
 *  b5 | ENVIRONMENT label             | T mid  | x240  y368..380 (bl376)
 *  b5 | ANIMAL box                    | Draw   | x460..640 y350..400
 *  b5 | ANIMAL label                  | T mid  | x550  y368..380 (bl376)
 *  b5 | MUSCLES box                   | Draw   | x760..940 y350..400
 *  b5 | MUSCLES label                 | T mid  | x850  y368..380 (bl376)
 *  b5 | arrow1 + "sensory system"     | Draw/T | x338..452 y345..359 (bl355) / shaft y375
 *  b5 | arrow2 + "neuromotor system"  | Draw/T | x648..752 y345..359 (bl355) / shaft y375
 *  b5 | caption                      | T mid  | x?..?  y414..428 (bl424)
 *  b6 | reproduction chip             | Chip   | x180..900 y452..482
 *  b7 | asexual footnote              | T mid  | x?..?  y509..523 (bl519)
 *  b8 | outer emphasis box            | Draw   | x160..920 y555..594
 *  b8 | SIGNATURE chip                | Chip   | x165..915 y562..588
 */

import React from "react";
import {
  SceneProps,
  useBeat,
  delayFor,
  Fade,
  Draw,
  T,
  Chip,
  arrowD,
  ringD,
  INK,
  MUTED,
  AMBER,
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
} from "./kit";

export default function B11Ch04Sec2({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);
  const act1 = beat >= 1 && beat < 5;

  return (
    <svg
      viewBox="0 0 1080 620"
      preserveAspectRatio="xMidYMin meet"
      className="w-full h-full select-none"
    >
      {/* title — always on */}
      <Fade on={true}>
        <T x={540} y={58} size={26} fill={RED} script>
          {t("The Organism-Level Card: Four Traits", "Organism-Level Card: Four Traits")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 0.3)} d="M 400 72 C 460 69, 620 69, 680 72" stroke={RED} sw={2.2} dur={0.6} />
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 1.3)}>
        <T x={540} y={100} size={14} fill={MUTED} script>
          {t("cell sorted — now zoom out to the whole organism", "cell ho gaya — ab poore organism par zoom out")}
        </T>
      </Fade>

      {/* beat 1 — movement */}
      <>
        {[
          [86, 178, 6, 9],
          [108, 163, 6, 9],
          [130, 150, 6, 9],
          [152, 138, 6, 9],
        ].map(([cx, cy, rx, ry], i) => (
          <Draw
            key={i}
            on={act1 && beat >= 1}
            delay={dl(1, 0.2 + i * 0.25)}
            d={`M ${cx - rx} ${cy} a ${rx} ${rx} 0 1 0 ${2 * rx} 0 a ${rx} ${rx} 0 1 0 ${-2 * rx} 0`}
            stroke={INK}
            sw={1.4}
            dur={0.3}
          />
        ))}
        <Draw on={act1 && beat >= 1} delay={dl(1, 1.3)} d={arrowD(158, 132, 190, 112)} stroke={AMBER_DARK} sw={1.8} dur={0.4} />
        <Fade on={act1 && beat >= 1} delay={dl(1, 1.7)}>
          <Chip x={210} y={138} w={350} h={30} fill={CREAM} stroke={AMBER} textFill={INK} size={13} script={false}>
            {t("MOVE + LOCOMOTE — most, at some life stage", "MOVE + LOCOMOTE — mostly, kisi stage par")}
          </Chip>
        </Fade>
      </>

      {/* beat 2 — sessile exception */}
      <>
        <Draw on={act1 && beat >= 2} delay={dl(2, 0.2)} d="M 600 198 C 700 194, 860 194, 980 198" stroke={MUTED} sw={1.6} dur={0.5} />
        <Draw
          on={act1 && beat >= 2}
          delay={dl(2, 0.7)}
          d="M 648 198 L 655 158 Q 675 145, 695 158 L 702 198 Z"
          stroke={INK}
          sw={1.6}
          fill={CREAM}
          dur={0.5}
        />
        <Draw
          on={act1 && beat >= 2}
          delay={dl(2, 1.2)}
          d="M 795 198 L 795 172 M 795 182 L 770 160 M 795 178 L 820 158 M 795 190 L 758 178 M 795 186 L 832 172"
          stroke={INK}
          sw={2}
          dur={0.5}
        />
        <Fade on={act1 && beat >= 2} delay={dl(2, 1.7)}>
          <T x={675} y={214} size={11} fill={MUTED} script>
            {t("sponge", "sponge")}
          </T>
        </Fade>
        <Fade on={act1 && beat >= 2} delay={dl(2, 1.9)}>
          <T x={800} y={214} size={11} fill={MUTED} script>
            {t("coral", "coral")}
          </T>
        </Fade>
        <Draw
          on={act1 && beat >= 2}
          delay={dl(2, 2.3)}
          d="M 862 190 q 12 -10 26 -4 q 10 5 4 14"
          stroke={AMBER_DARK}
          sw={1.6}
          fill="none"
          dur={0.5}
        />
        <Fade on={act1 && beat >= 2} delay={dl(2, 2.8)}>
          <path
            d="M 892 176 C 915 150, 930 130, 948 112"
            stroke={AMBER_DARK}
            strokeWidth={1.6}
            strokeDasharray="5 5"
            fill="none"
          />
        </Fade>
        <Fade on={act1 && beat >= 2} delay={dl(2, 3.4)}>
          <T x={905} y={110} size={11} fill={AMBER_DARK} anchor="start" script>
            {t("free-swimming larva", "free-swim larva")}
          </T>
        </Fade>
        <Fade on={act1 && beat >= 2} delay={dl(2, 4)}>
          <T x={790} y={246} size={12} fill={INK} script={false}>
            {t("sessile adult ≠ immobile animal", "sessile adult ≠ immobile animal")}
          </T>
        </Fade>
      </>

      {/* beat 3 — main demo: growth graph */}
      <>
        <Draw on={act1 && beat >= 3} delay={dl(3, 0.2)} d="M 150 282 L 150 452" stroke={MUTED} sw={1.4} dur={0.4} />
        <Draw on={act1 && beat >= 3} delay={dl(3, 0.5)} d="M 150 452 L 900 452" stroke={MUTED} sw={1.4} dur={0.5} />
        <Draw
          on={act1 && beat >= 3}
          delay={dl(3, 1)}
          d="M 150 447 C 260 440, 380 400, 440 350 C 480 316, 540 296, 620 294 L 850 294"
          stroke={INK}
          sw={2.4}
          dur={1.1}
        />
        <Fade on={act1 && beat >= 3} delay={dl(3, 2.2)}>
          <path
            d="M 150 447 C 280 424, 480 350, 620 302 C 700 280, 780 272, 850 268"
            stroke={MUTED}
            strokeWidth={2}
            strokeDasharray="7 6"
            fill="none"
          />
        </Fade>
        <Fade on={act1 && beat >= 3} delay={dl(3, 3.3)}>
          <path d="M 160 288 h 30" stroke={INK} strokeWidth={2.4} fill="none" />
          <T x={198} y={292} size={12} fill={INK} anchor="start" script={false}>
            {t("ANIMAL — growth stops", "ANIMAL — growth ruk jaati")}
          </T>
        </Fade>
        <Fade on={act1 && beat >= 3} delay={dl(3, 3.7)}>
          <path d="M 160 308 h 30" stroke={MUTED} strokeWidth={2} strokeDasharray="4 4" fill="none" />
          <T x={198} y={312} size={12} fill={MUTED} anchor="start" script={false}>
            {t("PLANT — keeps growing", "PLANT — badhta hi rehta")}
          </T>
        </Fade>
        <Fade on={act1 && beat >= 3} delay={dl(3, 4)}>
          <T x={900} y={474} size={12} fill={MUTED} anchor="end" script>
            {t("time →", "time →")}
          </T>
        </Fade>
      </>

      {/* beat 4 — consequence */}
      <>
        <Draw on={act1 && beat >= 4} delay={dl(4, 0.3)} d={ringD(620, 294, 42, 19)} stroke={AMBER_DARK} sw={2} dur={0.6} />
        <Draw on={act1 && beat >= 4} delay={dl(4, 1)} d={arrowD(620, 316, 620, 333)} stroke={AMBER_DARK} sw={1.6} dur={0.4} />
        <Fade on={act1 && beat >= 4} delay={dl(4, 1.5)}>
          <T x={620} y={358} size={13} fill={AMBER_DARK} script>
            {t("characteristic adult shape + size — then it STOPS", "characteristic adult shape+size — phir ruk jaata")}
          </T>
        </Fade>
      </>

      {/* beat 5 — control flow (reuses the erased main band) */}
      <Draw on={beat >= 5} delay={dl(5, 0.2)} d="M 150 350 h 180 v 50 h -180 Z" stroke={INK} sw={1.8} dur={0.5} />
      <Fade on={beat >= 5} delay={dl(5, 0.7)}>
        <T x={240} y={376} size={13} fill={INK} weight={700} script={false}>
          {t("ENVIRONMENT", "ENVIRONMENT")}
        </T>
      </Fade>
      <Draw on={beat >= 5} delay={dl(5, 1.1)} d="M 460 350 h 180 v 50 h -180 Z" stroke={AMBER_DARK} sw={1.8} dur={0.5} />
      <Fade on={beat >= 5} delay={dl(5, 1.6)}>
        <T x={550} y={376} size={13} fill={AMBER_DARK} weight={700} script={false}>
          {t("ANIMAL", "ANIMAL")}
        </T>
      </Fade>
      <Draw on={beat >= 5} delay={dl(5, 2)} d="M 760 350 h 180 v 50 h -180 Z" stroke={INK} sw={1.8} dur={0.5} />
      <Fade on={beat >= 5} delay={dl(5, 2.5)}>
        <T x={850} y={376} size={13} fill={INK} weight={700} script={false}>
          {t("MUSCLES", "MUSCLES")}
        </T>
      </Fade>
      <Draw on={beat >= 5} delay={dl(5, 3)} d={arrowD(338, 375, 452, 375)} stroke={GREEN} sw={1.8} dur={0.4} />
      <Fade on={beat >= 5} delay={dl(5, 3.4)}>
        <T x={395} y={355} size={12} fill={GREEN} script>
          {t("sensory system", "sensory system")}
        </T>
      </Fade>
      <Draw on={beat >= 5} delay={dl(5, 3.8)} d={arrowD(648, 375, 752, 375)} stroke={GREEN} sw={1.8} dur={0.4} />
      <Fade on={beat >= 5} delay={dl(5, 4.2)}>
        <T x={700} y={355} size={12} fill={GREEN} script>
          {t("neuromotor system", "neuromotor system")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 4.7)}>
        <T x={540} y={424} size={13} fill={INK} script>
          {t("sense it, then respond to it", "pehle sense karo, phir respond")}
        </T>
      </Fade>

      {/* beat 6 — reproduction */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <Chip x={180} y={452} w={720} h={30} fill={CREAM} stroke={GREEN} textFill={GREEN} size={13} script={false}>
          {t(
            "predominantly SEXUAL: diploid parent → embryo → new individual",
            "predominantly SEXUAL: diploid parent → embryo → new individual"
          )}
        </Chip>
      </Fade>

      {/* beat 7 — asexual footnote */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={540} y={519} size={13} fill={INK} script>
          {t(
            "not exclusive — asexual too: budding in Hydra & sponges",
            "exclusive nahi — asexual bhi: budding in Hydra & sponges"
          )}
        </T>
      </Fade>

      {/* beat 8 — closing SIGNATURE banner */}
      <Draw
        on={beat >= 8}
        delay={dl(8, 0.2)}
        d="M 160 555 h 760 q 8 0 8 8 v 23 q 0 8 -8 8 h -760 q -8 0 -8 -8 v -23 q 0 -8 8 -8"
        stroke={AMBER}
        sw={2}
        dur={0.7}
      />
      <Fade on={beat >= 8} delay={dl(8, 1)}>
        <Chip x={165} y={562} w={750} h={26} fill={INK} textFill={CREAM} size={13} script={false}>
          {t(
            "SIGNATURE: moves · grows to a fixed size & stops · senses+responds · mostly sexual",
            "SIGNATURE: moves · fixed size tak grow karke rukta · senses+responds · mostly sexual"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
