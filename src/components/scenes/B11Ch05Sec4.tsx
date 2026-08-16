"use client";

/**
 * B11 Ch05 · Section 4 — "The leaf: flat by design, the plant's kitchen"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 9.39, 21.76, 33.28, 45.74, 56.66, 70.83, 80.73]
 *        hi [0, 8.96, 20.65, 32.51, 44.2, 55.47, 67.07, 76.89]):
 *  0 title + hook: leaf = third member, one headline job [dim@1]
 *  1 DIAGRAM: leaf outline + sun → PHOTOSYNTHESIS chip, "the plant's kitchen"
 *  2 stem stub + node dot at the base — "flat green outgrowth, at a node"
 *  3 axil bud (ringed) — "remember this, it's the test later"
 *  4 teaser: "why flat?" + arrow down into the demo
 *  5 DIAGRAM: thin sheet (all lit) vs stacked block (only top lit)
 *  6 shopkeeper analogy line — spread wins, piling loses
 *  7 verdict: ROOT + STEM + LEAF chips, "everything else = one of these
 *    three, modified"
 *
 * Layout plan (Kalam bl−1.3s..+0.5s · Anek bl−0.78s..+0.31s). Zone A (leaf,
 * b1–3) stacks above Zone B (flatness demo, b4–6) above the verdict band
 * (b7) — accumulates without dimming, room permits.
 *  b0 | title (script25 red)          | T mid  | x?..? y30..77 (bl64)
 *  b0 | underline                     | Draw   | y78 x340..740
 *  b0 | hook (script15 muted)         | T mid  | x?..? y85..112 (bl104) [dim@1]
 *  b1 | leaf outline (green)          | Draw   | x195..305 y150..258
 *  b1 | midrib                        | Draw   | x250 y158..248
 *  b1 | sun + 4 rays                  | Draw   | x123..163 y138..170
 *  b1 | arrow sun→leaf                | Draw   | x158..205 y168..185
 *  b1 | PHOTOSYNTHESIS chip (green)   | Chip   | x380..610 y175..207
 *  b1 | caption "plant's kitchen…"    | T mid  | x381..609 y215..229 (bl225)
 *  b2 | stem stub                     | Draw   | x250 y258..285
 *  b2 | node dot                      | Draw   | c250,258 r4
 *  b2 | label "flat green…node"       | T st   | x140..~460 y297..311 (bl308)
 *  b3 | axil bud (teardrop, ringed)   | Draw   | x260..276 y264..282
 *  b3 | label "bud in the axil…"      | T st   | x140..~480 y327..341 (bl338)
 *  b4 | teaser "why flat?…"           | T mid  | x?..? y352..377 (bl368)
 *  b4 | arrow down                    | Draw   | x540 y378..394
 *  b5 | thin sheet rect               | Draw   | x150..430 y415..427
 *  b5 | 4 sun-ray arrows → sheet      | Draw   | x190/260/330/400 y400..415
 *  b5 | sheet label                   | T mid  | x149..431 y438..452 (bl445)
 *  b5 | 3-layer block                 | Draw   | x650..770 y397..425
 *  b5 | sun-ray arrow → top layer     | Draw   | x710 y385..397
 *  b5 | block label                   | T mid  | x581..839 y438..452 (bl445)
 *  b6 | shopkeeper line (script13 ink)| T mid  | x?..? y473..497 (bl490)
 *  b6 | underline swoosh              | Draw   | y500 x400..680
 *  b7 | ROOT chip (amber-d)           | Chip   | x228..383 y520..550
 *  b7 | + mark                        | Draw   | x388..398 y530..540
 *  b7 | STEM chip (ink)               | Chip   | x403..638 y520..550
 *  b7 | + mark                        | Draw   | x643..653 y530..540
 *  b7 | LEAF chip (green)             | Chip   | x658..853 y520..550
 *  b7 | closing (script14 ink)        | T mid  | x286..794 y567..593 (bl585)
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

export default function B11Ch05Sec4({ currentTime, reveals, language }: SceneProps) {
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
      {/* title — always on */}
      <Fade on={true}>
        <T x={540} y={64} size={25} fill={RED} script>
          {t("the leaf: flat by design, the plant's kitchen", "the leaf: flat by design, plant ki kitchen")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 0.3)} d="M 340 78 C 430 75, 650 75, 740 78" stroke={RED} sw={2.2} dur={0.6} />
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 1.4)}>
        <T x={540} y={104} size={15} fill={MUTED} script>
          {t(
            "the third member of the trio — with just one headline job",
            "trio ka teesra member — bas ek hi headline job"
          )}
        </T>
      </Fade>

      {/* beat 1 — the leaf's job: photosynthesis, the plant's kitchen */}
      <Draw on={beat >= 1} delay={dl(1, 0.3)} d="M 250 150 C 205 165, 195 210, 250 258 C 305 210, 295 165, 250 150 Z" stroke={GREEN} sw={2.2} dur={1} />
      <Draw on={beat >= 1} delay={dl(1, 1.4)} d="M 250 158 L 250 248" stroke={INK} sw={1.4} dur={0.6} />
      <Fade on={beat >= 1} delay={dl(1, 2)}>
        <Draw
          on={true}
          d="M 130 160 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0 M 140 147 L 140 138 M 153 160 L 162 160 M 131 149 L 124 142 M 149 149 L 156 142"
          stroke={AMBER_DARK}
          sw={1.4}
          fill={AMBER}
          dur={0.6}
        />
      </Fade>
      <Draw on={beat >= 1} delay={dl(1, 2.6)} d={arrowD(158, 168, 205, 185)} stroke={AMBER_DARK} sw={2} dur={0.4} />
      <Fade on={beat >= 1} delay={dl(1, 3.2)}>
        <Chip x={380} y={175} w={230} h={32} fill={CREAM} stroke={GREEN} textFill={GREEN} size={15} script={false}>
          PHOTOSYNTHESIS
        </Chip>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 4)}>
        <T x={495} y={225} size={13} fill={INK}>
          {t("the plant's kitchen · food factory", "plant ki kitchen · food factory")}
        </T>
      </Fade>

      {/* beat 2 — structure: flat, green, at a node */}
      <Draw on={beat >= 2} delay={dl(2, 0.3)} d="M 250 258 L 250 285" stroke={INK} sw={2} dur={0.5} />
      <Fade on={beat >= 2} delay={dl(2, 0.9)}>
        <Draw on={true} d="M 246 258 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0" stroke={INK} sw={1} fill={INK} dur={0.3} />
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 1.5)}>
        <T x={140} y={308} size={13} fill={INK} weight={700} anchor="start">
          {t("flat green outgrowth — arises at a node", "flat green outgrowth — node par arise karta hai")}
        </T>
      </Fade>

      {/* beat 3 — the axil bud, worth remembering */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <Draw
          on={true}
          d="M 268 264 C 260 268, 260 276, 268 282 C 276 276, 276 268, 268 264 Z"
          stroke={AMBER_DARK}
          sw={1}
          fill={AMBER_DARK}
          dur={0.5}
        />
      </Fade>
      <Draw on={beat >= 3} delay={dl(3, 1)} d={ringD(268, 272, 18, 16)} stroke={AMBER_DARK} sw={1.8} dur={0.6} />
      <Fade on={beat >= 3} delay={dl(3, 1.8)}>
        <T x={140} y={338} size={13} fill={AMBER_DARK} weight={700} anchor="start">
          {t("bud in the axil — remember this (the test, later)", "axil mein bud — yaad rakhiye (baad mein test hoga)")}
        </T>
      </Fade>

      {/* beat 4 — teaser: why flat? */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={540} y={368} size={16} fill={GREEN} script>
          {t("why flat? let's see two shapes", "flat kyun? do shapes dekhte hain")}
        </T>
      </Fade>
      <Draw on={beat >= 4} delay={dl(4, 1.3)} d={arrowD(540, 378, 540, 394)} stroke={GREEN} sw={2.2} dur={0.4} />

      {/* beat 5 — thin sheet (all lit) vs stacked block (top only) */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <Draw on={true} d="M 150 415 h 280 v 12 h -280 z" stroke={GREEN} sw={2} fill={CREAM} dur={0.8} />
      </Fade>
      <Draw on={beat >= 5} delay={dl(5, 1.3)} d={arrowD(190, 400, 190, 415)} stroke={AMBER_DARK} sw={1.6} dur={0.3} />
      <Draw on={beat >= 5} delay={dl(5, 1.5)} d={arrowD(260, 400, 260, 415)} stroke={AMBER_DARK} sw={1.6} dur={0.3} />
      <Draw on={beat >= 5} delay={dl(5, 1.7)} d={arrowD(330, 400, 330, 415)} stroke={AMBER_DARK} sw={1.6} dur={0.3} />
      <Draw on={beat >= 5} delay={dl(5, 1.9)} d={arrowD(400, 400, 400, 415)} stroke={AMBER_DARK} sw={1.6} dur={0.3} />
      <Fade on={beat >= 5} delay={dl(5, 2.5)}>
        <T x={290} y={445} size={12} fill={GREEN}>
          {t("spread thin → every gram in the light", "patli sheet mein failao → har gram light mein")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 3.1)}>
        <Draw on={true} d="M 650 397 h 120 v 8 h -120 z" stroke={INK} sw={1.5} fill={CREAM} dur={0.4} />
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 3.4)}>
        <Draw on={true} d="M 650 407 h 120 v 8 h -120 z" stroke={INK} sw={1.5} fill={CREAM} dur={0.4} />
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 3.7)}>
        <Draw on={true} d="M 650 417 h 120 v 8 h -120 z" stroke={INK} sw={1.5} fill={CREAM} dur={0.4} />
      </Fade>
      <Draw on={beat >= 5} delay={dl(5, 4.2)} d={arrowD(710, 385, 710, 397)} stroke={AMBER_DARK} sw={1.6} dur={0.3} />
      <Fade on={beat >= 5} delay={dl(5, 4.8)}>
        <T x={710} y={445} size={12} fill={INK}>
          {t("piled thick → only top layer earns", "block mein dhero → sirf top layer kamaati")}
        </T>
      </Fade>

      {/* beat 6 — the shopkeeper analogy */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={490} size={13} fill={INK} script>
          {t(
            "just like a shopkeeper: spread wins, piling loses",
            "bilkul dukaandaar jaisa: failana jeetta, dherna haarta"
          )}
        </T>
      </Fade>
      <Draw on={beat >= 6} delay={dl(6, 1.4)} d="M 400 500 C 460 497, 620 497, 680 500" stroke={INK} sw={1.6} dur={0.5} />

      {/* beat 7 — verdict: the trio is complete */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <Chip x={228} y={520} w={155} h={30} fill={CREAM} stroke={AMBER_DARK} textFill={AMBER_DARK} size={13} script={false}>
          {t("ROOT — fetches", "ROOT — fetch karta")}
        </Chip>
      </Fade>
      <Draw on={beat >= 7} delay={dl(7, 0.9)} d="M 388 535 L 398 535 M 393 530 L 393 540" stroke={INK} sw={1.6} dur={0.3} />
      <Fade on={beat >= 7} delay={dl(7, 1.3)}>
        <Chip x={403} y={520} w={235} h={30} fill={CREAM} stroke={INK} textFill={INK} size={13} script={false}>
          {t("STEM — carries & connects", "STEM — carry aur connect karta")}
        </Chip>
      </Fade>
      <Draw on={beat >= 7} delay={dl(7, 1.9)} d="M 643 535 L 653 535 M 648 530 L 648 540" stroke={INK} sw={1.6} dur={0.3} />
      <Fade on={beat >= 7} delay={dl(7, 2.3)}>
        <Chip x={658} y={520} w={195} h={30} fill={CREAM} stroke={GREEN} textFill={GREEN} size={13} script={false}>
          {t("LEAF — manufactures", "LEAF — manufacture karta")}
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 3)}>
        <T x={540} y={585} size={14} fill={INK} script>
          {t(
            "everything else here = one of these three, modified",
            "yahan baaki sab kuch = inhi teen ka modified roop"
          )}
        </T>
      </Fade>
    </svg>
  );
}
