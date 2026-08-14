"use client";

/**
 * B11 Ch02 · Section 1 — "Why classification exists at all"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 11.09, 23.04, 40.62, 53.16, 68.18, 80.04, 98.65]):
 *  0 title fades in + drawn underline swoosh
 *  1 DIAGRAM 1a: a box of scattered, multi-coloured dots — "millions of
 *    unsorted organisms" (chaos box, left)
 *  2 quote "classification = biology's catalogue" · DIAGRAM 1b: arrow into a
 *    second box where the SAME dots now sit tidy in 3 colour-grouped columns
 *    ("sorted into groups", right) — dims at beat 3 (superseded by Diagram 2)
 *  3 DIAGRAM 2: FUNGI box + 3 fanned arrows to 3 empty outline slots
 *  4 the 3 slots fill in: eukaryote / heterotrophic / chitin cell wall
 *  5 green ring around the FUNGI box + "predictive power" caption (dims @7)
 *  6 DIAGRAM 3 (story band, reused space): a crossed-out train (no zones) →
 *    arrow → zone / class / route chips, "taxonomy does this for life"
 *  7 closing: "the big boxes:" + 5 kingdom chips land (Monera…Animalia)
 *
 * Layout plan (measured ratios: Kalam bl−1.3s..+0.5s, Anek bl−0.78s..+0.31s):
 *  b0 | title (script25 red)         | T mid  | x?..?  y49..75 (bl62, longer=HI)
 *  b0 | underline swoosh             | Draw   | y90  x320..760
 *  b1 | chaos box (muted)            | Draw   | x90..390  y290..430
 *  b1 | 18 dots (ink/amber/red)      | Fade   | inside x100..380 y300..420
 *  b1 | "millions, unsorted" (13)    | T mid  | x240  y458  [dim@3]
 *  b2 | quote (script18 green)       | T mid  | x540  y255 (bl255)
 *  b2 | arrow chaos→sorted           | Draw   | (390,360)→(495,360)
 *  b2 | sorted box (muted)           | Draw   | x500..780  y290..430
 *  b2 | 12 dots, 3 colour columns    | Fade   | x540/640/740  y320..410
 *  b2 | "sorted into groups" (13)    | T mid  | x640  y458  [dim@3]
 *  b3 | FUNGI box (ink fill)         | Draw   | x140..320  y320..420
 *  b3 | "FUNGI" (22 cream)           | T mid  | x230  y378
 *  b3 | 3 arrows (amber-dark)        | Draw   | (320,335)/(320,371)/(320,405) → chip left edges −5
 *  b3 | 3 empty outline slots        | Draw   | x610..820  y278..316 / 352..390 / 426..464
 *  b4 | chip "eukaryote" (16)        | Chip   | x610  y278  w210 h38
 *  b4 | chip "heterotrophic" (16)    | Chip   | x610  y352  w210 h38
 *  b4 | chip "chitin cell wall" (16) | Chip   | x610  y426  w210 h38
 *  b5 | ring around FUNGI box        | Draw   | c(230,370) rx104 ry62
 *  b5 | caption (script17 green)     | T mid  | x540  y500  [dim@6]
 *  b6 | train rect+wheels (ink)      | Draw   | x150..260 y120..144, wheels cy152
 *  b6 | cross-out over train         | Draw   | x150..240 y120..152
 *  b6 | arrow train→chips            | Draw   | (250,136)→(335,136)
 *  b6 | chip "zone"/"class"/"route"  | Chip   | y122..150  x340..430/450..556/576..690
 *  b6 | caption "taxonomy…" (16)     | T mid  | x540  y185
 *  b7 | "the big boxes:" (script18)  | T mid  | x540  y490
 *  b7 | 5 kingdom chips (16)         | Chip   | y505..541  x100..250/270..420/440..590/610..760/780..930
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
  crossD,
  INK,
  MUTED,
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
} from "./kit";

const CHAOS_DOTS: [number, number, string][] = [
  [120, 310, INK], [160, 325, AMBER_DARK], [140, 350, RED],
  [190, 305, INK], [220, 340, AMBER_DARK], [250, 315, RED],
  [280, 360, INK], [310, 330, AMBER_DARK], [340, 305, RED],
  [360, 355, INK], [130, 390, AMBER_DARK], [170, 405, RED],
  [210, 380, INK], [250, 400, AMBER_DARK], [290, 385, RED],
  [330, 410, INK], [360, 395, AMBER_DARK], [200, 365, RED],
];

const SORTED_COLS: [number, string][] = [
  [540, INK],
  [640, AMBER_DARK],
  [740, RED],
];
const SORTED_ROWS = [320, 350, 380, 410];

const KINGDOMS: [number, string][] = [
  [175, "Monera"],
  [345, "Protista"],
  [515, "Fungi"],
  [685, "Plantae"],
  [855, "Animalia"],
];

export default function B11Ch02Sec1({ currentTime, reveals, language }: SceneProps) {
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
      {/* beat 0 — title + underline swoosh */}
      <Fade on={beat >= 0} delay={dl(0, 0.2)}>
        <T x={540} y={62} size={25} fill={RED} script>
          {t(
            "why does biology need classification?",
            "biology ko classification ki zarurat kyun hai?"
          )}
        </T>
      </Fade>
      <Draw
        on={beat >= 0}
        delay={dl(0, 3)}
        d="M 320 90 C 420 86, 660 86, 760 90"
        stroke={RED}
        sw={2.4}
        dur={0.7}
      />

      {/* beat 1 — chaos box: millions of unsorted organisms */}
      <Fade on={beat >= 1} dim={beat >= 3} delay={dl(1, 0.3)}>
        <Draw
          on={true}
          d="M 90 290 h 300 v 140 h -300 z"
          stroke={MUTED}
          sw={2}
          dur={1}
        />
      </Fade>
      {CHAOS_DOTS.map(([x, y, c], i) => (
        <Fade key={`chaos${i}`} on={beat >= 1} dim={beat >= 3} delay={dl(1, 0.9 + i * 0.13)}>
          <circle cx={x} cy={y} r={5} fill={c} />
        </Fade>
      ))}
      <Fade on={beat >= 1} dim={beat >= 3} delay={dl(1, 4.2)}>
        <T x={240} y={458} size={13} fill={MUTED} script>
          {t("millions, unsorted", "lakhon, bina order ke")}
        </T>
      </Fade>

      {/* beat 2 — the catalogue quote + sort into 3 colour-grouped columns */}
      <Fade on={beat >= 2} delay={dl(2, 0.4)}>
        <T x={540} y={255} size={18} fill={GREEN} script>
          {t(
            "classification = biology's catalogue",
            "classification = biology ka catalogue hai"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 3} delay={dl(2, 2.2)}>
        <Draw on={true} d={arrowD(390, 360, 495, 360)} stroke={AMBER_DARK} sw={2.4} dur={0.6} />
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 3} delay={dl(2, 3)}>
        <Draw on={true} d="M 500 290 h 280 v 140 h -280 z" stroke={MUTED} sw={2} dur={0.8} />
      </Fade>
      {SORTED_COLS.map(([cx, c], ci) =>
        SORTED_ROWS.map((cy, ri) => (
          <Fade
            key={`sorted${ci}-${ri}`}
            on={beat >= 2}
            dim={beat >= 3}
            delay={dl(2, 3.8 + (ci * 4 + ri) * 0.13)}
          >
            <circle cx={cx} cy={cy} r={5} fill={c} />
          </Fade>
        ))
      )}
      <Fade on={beat >= 2} dim={beat >= 3} delay={dl(2, 6.2)}>
        <T x={640} y={458} size={13} fill={GREEN} script>
          {t("sorted into groups", "groups mein sorted")}
        </T>
      </Fade>

      {/* beat 3 — the payoff diagram: FUNGI box fanning into 3 empty slots */}
      <Draw on={beat >= 3} delay={dl(3, 0.3)} d="M 140 320 h 180 v 100 h -180 z" stroke={INK} sw={2.6} dur={0.8} fill={beat >= 3 ? INK : "none"} />
      <Fade on={beat >= 3} delay={dl(3, 1.3)}>
        <T x={230} y={378} size={22} fill={CREAM} weight={800}>
          FUNGI
        </T>
      </Fade>
      <Draw on={beat >= 3} delay={dl(3, 2)} d={arrowD(320, 335, 605, 297)} stroke={AMBER_DARK} sw={2.2} dur={0.5} />
      <Draw on={beat >= 3} delay={dl(3, 2.3)} d="M 610 278 h 210 v 38 h -210 z" stroke={MUTED} sw={1.8} dur={0.5} />
      <Draw on={beat >= 3} delay={dl(3, 2.8)} d={arrowD(320, 371, 605, 371)} stroke={AMBER_DARK} sw={2.2} dur={0.5} />
      <Draw on={beat >= 3} delay={dl(3, 3.1)} d="M 610 352 h 210 v 38 h -210 z" stroke={MUTED} sw={1.8} dur={0.5} />
      <Draw on={beat >= 3} delay={dl(3, 3.6)} d={arrowD(320, 405, 605, 445)} stroke={AMBER_DARK} sw={2.2} dur={0.5} />
      <Draw on={beat >= 3} delay={dl(3, 3.9)} d="M 610 426 h 210 v 38 h -210 z" stroke={MUTED} sw={1.8} dur={0.5} />

      {/* beat 4 — the 3 facts land */}
      <Fade on={beat >= 4} delay={dl(4, 0.4)}>
        <Chip x={610} y={278} w={210} h={38} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={16} script={false}>
          eukaryote
        </Chip>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.6)}>
        <Chip x={610} y={352} w={210} h={38} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={16} script={false}>
          heterotrophic
        </Chip>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 2.8)}>
        <Chip x={610} y={426} w={210} h={38} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={16} script={false}>
          chitin cell wall
        </Chip>
      </Fade>

      {/* beat 5 — predictive power: ring the source, caption below */}
      <Draw on={beat >= 5} delay={dl(5, 0.4)} d={ringD(230, 370, 104, 62)} stroke={GREEN} sw={2.6} dur={0.8} />
      <Fade on={beat >= 5} dim={beat >= 6} delay={dl(5, 1.5)}>
        <T x={540} y={500} size={17} fill={GREEN} script>
          {t(
            "predictive power: you inherit the group's properties for free",
            "predictive power: group ke properties tumhe free mein milte hain"
          )}
        </T>
      </Fade>

      {/* beat 6 — the Indian Railways analogy, in the freed story band */}
      <Draw on={beat >= 6} delay={dl(6, 0.3)} d="M 150 120 h 110 v 24 h -110 z M 170 152 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0 M 230 152 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0" stroke={INK} sw={2.2} dur={0.6} />
      <Draw on={beat >= 6} delay={dl(6, 1.2)} d={crossD(150, 120, 90, 32)} stroke={RED} sw={2.4} dur={0.5} />
      <Draw on={beat >= 6} delay={dl(6, 2)} d={arrowD(250, 136, 335, 136)} stroke={AMBER_DARK} sw={2} dur={0.4} />
      <Fade on={beat >= 6} delay={dl(6, 2.6)}>
        <Chip x={340} y={122} w={90} h={28} fill={CREAM} stroke={GREEN} textFill={GREEN} size={13} script={false}>
          zone
        </Chip>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 3.3)}>
        <Chip x={450} y={122} w={106} h={28} fill={CREAM} stroke={GREEN} textFill={GREEN} size={13} script={false}>
          class
        </Chip>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 4)}>
        <Chip x={576} y={122} w={114} h={28} fill={CREAM} stroke={GREEN} textFill={GREEN} size={13} script={false}>
          route
        </Chip>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 4.8)}>
        <T x={540} y={185} size={16} fill={INK} script>
          {t("taxonomy does this for life", "taxonomy life ke liye yehi karta hai")}
        </T>
      </Fade>

      {/* beat 7 — closing: the big boxes, five kingdom chips land */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={540} y={490} size={18} fill={INK} script>
          {t("the big boxes:", "yeh bade boxes:")}
        </T>
      </Fade>
      {KINGDOMS.map(([cx, name], i) => (
        <Fade key={name} on={beat >= 7} delay={dl(7, 1 + i * 0.5)}>
          <Chip x={cx - 75} y={505} w={150} h={36} fill={INK} textFill={CREAM} size={16} script={false}>
            {name}
          </Chip>
        </Fade>
      ))}
    </svg>
  );
}
