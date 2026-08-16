"use client";

/**
 * B11 Ch04 · Section 7 — "Development vocabulary: eggs, live young, larvae, metagenesis"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 11.35, 27.82, 41.9, 54.19, 73.81, 85.85, 101.46, 115.54]):
 *  0 title (always-on) + drawn underline · hook: two questions — where does the
 *    embryo grow, and does a larva appear on the way?
 *  1 SCAFFOLD: the teacher lays out the whole board at once — 3 row captions
 *    (eggs/live young · fertilised inside/outside · direct/indirect) as 6 empty
 *    outlined boxes, plus a tall METAGENESIS box on the right ("the odd one")
 *  2 fill OVIPAROUS box (row A, left)
 *  3 fill VIVIPAROUS box (row A, right) — cartilaginous-fish trap flagged amber
 *  4 fill INTERNAL box (row B, left) then EXTERNAL box (row B, right) — one beat
 *  5 fill DIRECT box (row C, left) + baby-circle→arrow→same-shape-bigger-circle
 *  6 fill INDIRECT box (row C, right) + egg→tadpole→frog icon chain (shape changes)
 *  7 fill METAGENESIS box (right column): polyp ⇌ medusa icons + cyclic arrows
 *  8 closing distinction line (metamorphosis ≠ metagenesis) + SIGNATURE banner
 *
 * Layout plan (Kalam bl−1.3s..+0.5s, Anek bl−0.78s..+0.31s; icon marks are
 * stroke-only, never text, so they are exempt from the text-overlap gate —
 * still kept clear of text boxes by eye):
 *  b0 | title (script22 red)         | T mid  | y60
 *  b0 | underline                    | Draw   | y76 x400..680
 *  b0 | hook (script12 muted) [dim@1]| T mid  | y96
 *  b1 | capA "EGGS vs LIVE YOUNG?"   | T mid  | x395 y136
 *  b1 | boxA_L / boxA_R outlines     | Draw   | x50..380 / x410..740  y150..226
 *  b1 | capB "FERTILISED IN/OUT?"    | T mid  | x395 y260
 *  b1 | boxB_L / boxB_R outlines     | Draw   | x50..380 / x410..740  y276..352
 *  b1 | capC "DIRECT vs INDIRECT?"   | T mid  | x395 y386
 *  b1 | boxC_L / boxC_R outlines     | Draw   | x50..380 / x410..740  y402..502
 *  b1 | metagenesis outline + header | Draw/T | x780..1030 y150..502, hdr y178
 *  b2 | OVIPAROUS header/def/ex/icon | T/Draw | inside boxA_L
 *  b3 | VIVIPAROUS header/def/ex/icon| T/Draw | inside boxA_R (ex line AMBER_DARK)
 *  b4 | INTERNAL then EXTERNAL       | T/Draw | inside boxB_L then boxB_R
 *  b5 | DIRECT + baby→adult icon     | T/Draw | inside boxC_L
 *  b6 | INDIRECT + egg→tadpole→frog  | T/Draw | inside boxC_R
 *  b7 | METAGENESIS content          | T/Draw | inside right column, y178..369
 *  b8 | distinction line             | T mid  | x540 y536
 *  b8 | SIGNATURE outer box + chip   | Draw/Chip | x100..980 y552..588
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
  INK,
  MUTED,
  AMBER,
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
} from "./kit";

function circleD(cx: number, cy: number, r: number): string {
  return `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0`;
}

function ellipseD(cx: number, cy: number, rx: number, ry: number): string {
  return `M ${cx - rx} ${cy} a ${rx} ${ry} 0 1 0 ${2 * rx} 0 a ${rx} ${ry} 0 1 0 ${-2 * rx} 0`;
}

function boxD(x: number, y: number, w: number, h: number): string {
  return `M ${x} ${y} h ${w} v ${h} h ${-w} Z`;
}

function roundedBoxD(x: number, y: number, w: number, h: number): string {
  return `M ${x} ${y} h ${w - 16} q 8 0 8 8 v ${h - 16} q 0 8 -8 8 h ${-(w - 16)} q -8 0 -8 -8 v ${-(h - 16)} q 0 -8 8 -8`;
}

export default function B11Ch04Sec7({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={60} size={22} fill={RED} script>
          {t("Development Vocabulary", "Development ki Vocabulary")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 0.3)} d="M 400 76 C 460 73, 620 73, 680 76" stroke={RED} sw={2} dur={0.6} />
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 1.2)}>
        <T x={540} y={96} size={12} fill={MUTED} script>
          {t(
            "two questions: where does the embryo grow, and does a larva show up on the way?",
            "do sawaal: embryo kahaan badhta hai, aur kya beech mein ek larva stage aata hai?"
          )}
        </T>
      </Fade>

      {/* beat 1 — scaffold: row captions + 6 empty boxes + metagenesis column */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={395} y={136} size={12} fill={INK} weight={700} script={false}>
          {t("EGGS vs LIVE YOUNG?", "EGGS vs LIVE YOUNG?")}
        </T>
      </Fade>
      <Draw on={beat >= 1} delay={dl(1, 0.8)} d={boxD(50, 150, 330, 76)} stroke={MUTED} sw={1.4} dur={0.4} />
      <Draw on={beat >= 1} delay={dl(1, 1.3)} d={boxD(410, 150, 330, 76)} stroke={MUTED} sw={1.4} dur={0.4} />

      <Fade on={beat >= 1} delay={dl(1, 3.5)}>
        <T x={395} y={260} size={12} fill={INK} weight={700} script={false}>
          {t("FERTILISED — INSIDE or OUTSIDE?", "FERTILISATION — ANDAR ya BAAHAR?")}
        </T>
      </Fade>
      <Draw on={beat >= 1} delay={dl(1, 4)} d={boxD(50, 276, 330, 76)} stroke={MUTED} sw={1.4} dur={0.4} />
      <Draw on={beat >= 1} delay={dl(1, 4.5)} d={boxD(410, 276, 330, 76)} stroke={MUTED} sw={1.4} dur={0.4} />

      <Fade on={beat >= 1} delay={dl(1, 7)}>
        <T x={395} y={386} size={12} fill={INK} weight={700} script={false}>
          {t("LARVA ON THE WAY? — DIRECT vs INDIRECT", "LARVA AATA HAI? — DIRECT vs INDIRECT")}
        </T>
      </Fade>
      <Draw on={beat >= 1} delay={dl(1, 7.5)} d={boxD(50, 402, 330, 100)} stroke={MUTED} sw={1.4} dur={0.4} />
      <Draw on={beat >= 1} delay={dl(1, 8)} d={boxD(410, 402, 330, 100)} stroke={MUTED} sw={1.4} dur={0.4} />

      <Draw on={beat >= 1} delay={dl(1, 10.5)} d={boxD(780, 150, 250, 352)} stroke={AMBER} sw={1.8} dur={0.6} />
      <Fade on={beat >= 1} delay={dl(1, 11.2)}>
        <T x={905} y={178} size={13} fill={AMBER_DARK} weight={700} anchor="middle" script={false}>
          {t("METAGENESIS — the odd one", "METAGENESIS — alag hi cheez")}
        </T>
      </Fade>

      {/* beat 2 — OVIPAROUS */}
      <Fade on={beat >= 2} delay={dl(2, 0.2)}>
        <T x={64} y={170} size={13} fill={INK} weight={700} anchor="start" script={false}>
          {t("OVIPAROUS", "OVIPAROUS")}
        </T>
      </Fade>
      <Draw on={beat >= 2} delay={dl(2, 0.6)} d={ellipseD(330, 165, 9, 12)} stroke={INK} sw={1.4} dur={0.4} />
      <Fade on={beat >= 2} delay={dl(2, 1)}>
        <T x={64} y={192} size={11} fill={INK} anchor="start" script={false}>
          {t("eggs laid — embryo develops OUTSIDE mother", "ande diye — embryo maa ke BAAHAR develop hota hai")}
        </T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 1.4)}>
        <T x={64} y={212} size={10} fill={MUTED} anchor="start" script>
          {t("bony fish · amphibians · reptiles · birds · monotremes", "bony fish · amphibians · reptiles · birds · monotremes")}
        </T>
      </Fade>

      {/* beat 3 — VIVIPAROUS */}
      <Fade on={beat >= 3} delay={dl(3, 0.2)}>
        <T x={424} y={170} size={13} fill={INK} weight={700} anchor="start" script={false}>
          {t("VIVIPAROUS", "VIVIPAROUS")}
        </T>
      </Fade>
      <Draw on={beat >= 3} delay={dl(3, 0.6)} d={circleD(690, 163, 8)} stroke={INK} sw={1.4} dur={0.4} />
      <Draw on={beat >= 3} delay={dl(3, 1)} d={circleD(704, 174, 4)} stroke={INK} sw={1.3} dur={0.3} />
      <Fade on={beat >= 3} delay={dl(3, 1.4)}>
        <T x={424} y={192} size={11} fill={INK} anchor="start" script={false}>
          {t("live young are BORN, not laid as eggs", "bachche ZINDA paida hote hain, ande nahi")}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 1.8)}>
        <T x={424} y={212} size={10} fill={AMBER_DARK} anchor="start" script>
          {t("most mammals · MANY cartilaginous fishes too!", "zyaadatar mammals · MANY cartilaginous fishes bhi!")}
        </T>
      </Fade>

      {/* beat 4 — INTERNAL then EXTERNAL fertilisation */}
      <Fade on={beat >= 4} delay={dl(4, 0.2)}>
        <T x={64} y={296} size={13} fill={INK} weight={700} anchor="start" script={false}>
          {t("INTERNAL", "INTERNAL")}
        </T>
      </Fade>
      <Draw on={beat >= 4} delay={dl(4, 0.6)} d={circleD(330, 291, 13)} stroke={MUTED} sw={1.3} dur={0.4} />
      <Draw on={beat >= 4} delay={dl(4, 1)} d={circleD(326, 291, 3)} stroke={INK} sw={1.3} dur={0.3} />
      <Draw on={beat >= 4} delay={dl(4, 1.3)} d={circleD(334, 291, 3)} stroke={INK} sw={1.3} dur={0.3} />
      <Fade on={beat >= 4} delay={dl(4, 1.7)}>
        <T x={64} y={318} size={11} fill={INK} anchor="start" script={false}>
          {t("egg + sperm fuse INSIDE the female", "egg + sperm female ke ANDAR fuse hote hain")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 2.1)}>
        <T x={64} y={338} size={10} fill={MUTED} anchor="start" script>
          {t("cartilaginous fish · reptiles · birds · mammals", "cartilaginous fish · reptiles · birds · mammals")}
        </T>
      </Fade>

      <Fade on={beat >= 4} delay={dl(4, 5)}>
        <T x={424} y={296} size={13} fill={INK} weight={700} anchor="start" script={false}>
          {t("EXTERNAL", "EXTERNAL")}
        </T>
      </Fade>
      <Draw on={beat >= 4} delay={dl(4, 5.4)} d={circleD(680, 286, 3)} stroke={INK} sw={1.3} dur={0.3} />
      <Draw on={beat >= 4} delay={dl(4, 5.7)} d={circleD(690, 286, 3)} stroke={INK} sw={1.3} dur={0.3} />
      <Draw on={beat >= 4} delay={dl(4, 6.1)} d="M 670 298 q 6 -5 12 0 q 6 5 12 0 q 6 -5 12 0" stroke={MUTED} sw={1.2} dur={0.4} />
      <Fade on={beat >= 4} delay={dl(4, 6.6)}>
        <T x={424} y={318} size={11} fill={INK} anchor="start" script={false}>
          {t("gametes fuse OUTSIDE, in water", "gametes paani mein, body ke BAAHAR fuse hote hain")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 7)}>
        <T x={424} y={338} size={10} fill={MUTED} anchor="start" script>
          {t("bony fish · amphibians · aquatic invertebrates", "bony fish · amphibians · aquatic invertebrates")}
        </T>
      </Fade>

      {/* beat 5 — DIRECT development */}
      <Fade on={beat >= 5} delay={dl(5, 0.2)}>
        <T x={64} y={422} size={13} fill={INK} weight={700} anchor="start" script={false}>
          {t("DIRECT", "DIRECT")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 0.6)}>
        <T x={64} y={446} size={11} fill={INK} anchor="start" script={false}>
          {t("no larva — adult SAME SHAPE, just bigger", "larva nahi — adult SAME SHAPE, bas bada")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1)}>
        <T x={64} y={464} size={10} fill={MUTED} anchor="start" script>
          {t("reptiles · birds · mammals", "reptiles · birds · mammals")}
        </T>
      </Fade>
      <Draw on={beat >= 5} delay={dl(5, 1.5)} d={circleD(90, 486, 7)} stroke={INK} sw={1.4} dur={0.4} />
      <Draw on={beat >= 5} delay={dl(5, 2)} d={arrowD(102, 486, 142, 486)} stroke={MUTED} sw={1.4} dur={0.4} />
      <Draw on={beat >= 5} delay={dl(5, 2.5)} d={circleD(175, 484, 13)} stroke={INK} sw={1.6} dur={0.5} />

      {/* beat 6 — INDIRECT development */}
      <Fade on={beat >= 6} delay={dl(6, 0.2)}>
        <T x={424} y={422} size={13} fill={INK} weight={700} anchor="start" script={false}>
          {t("INDIRECT", "INDIRECT")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 0.6)}>
        <T x={424} y={446} size={11} fill={INK} anchor="start" script={false}>
          {t("goes through a LARVA stage, then metamorphosis", "ek LARVA stage se guzarta hai, phir metamorphosis")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1)}>
        <T x={424} y={464} size={10} fill={MUTED} anchor="start" script>
          {t("most invertebrates · amphibians (tadpole)", "zyaadatar invertebrates · amphibians (tadpole)")}
        </T>
      </Fade>
      <Draw on={beat >= 6} delay={dl(6, 1.5)} d={circleD(440, 486, 6)} stroke={INK} sw={1.3} dur={0.3} />
      <Draw on={beat >= 6} delay={dl(6, 1.9)} d={arrowD(448, 486, 472, 486)} stroke={MUTED} sw={1.3} dur={0.3} />
      <Draw on={beat >= 6} delay={dl(6, 2.3)} d={circleD(488, 486, 7)} stroke={INK} sw={1.4} dur={0.3} />
      <Draw on={beat >= 6} delay={dl(6, 2.6)} d="M 496 486 L 512 486" stroke={INK} sw={1.4} dur={0.3} />
      <Draw on={beat >= 6} delay={dl(6, 3)} d={arrowD(518, 486, 542, 486)} stroke={MUTED} sw={1.3} dur={0.3} />
      <Draw on={beat >= 6} delay={dl(6, 3.4)} d={circleD(566, 484, 12)} stroke={GREEN} sw={1.6} dur={0.5} />

      {/* beat 7 — METAGENESIS */}
      <Draw on={beat >= 7} delay={dl(7, 0.2)} d="M 845 290 L 845 260" stroke={INK} sw={1.6} dur={0.4} />
      <Draw
        on={beat >= 7}
        delay={dl(7, 0.6)}
        d="M 845 260 L 833 246 M 845 260 L 841 244 M 845 260 L 849 244 M 845 260 L 857 246"
        stroke={INK}
        sw={1.2}
        dur={0.4}
      />
      <Fade on={beat >= 7} delay={dl(7, 1)}>
        <T x={845} y={310} size={10} fill={INK} anchor="middle" script={false}>
          {t("polyp", "polyp")}
        </T>
      </Fade>

      <Draw on={beat >= 7} delay={dl(7, 1.4)} d="M 950 270 A 15 12 0 0 1 980 270" stroke={INK} sw={1.6} dur={0.4} />
      <Draw
        on={beat >= 7}
        delay={dl(7, 1.8)}
        d="M 958 270 L 958 285 M 965 270 L 965 288 M 972 270 L 972 285"
        stroke={INK}
        sw={1.2}
        dur={0.4}
      />
      <Fade on={beat >= 7} delay={dl(7, 2.2)}>
        <T x={965} y={310} size={10} fill={INK} anchor="middle" script={false}>
          {t("medusa", "medusa")}
        </T>
      </Fade>

      <Draw on={beat >= 7} delay={dl(7, 2.6)} d={arrowD(866, 222, 936, 222)} stroke={AMBER_DARK} sw={1.4} dur={0.4} />
      <Draw on={beat >= 7} delay={dl(7, 3)} d={arrowD(936, 234, 866, 234)} stroke={AMBER_DARK} sw={1.4} dur={0.4} />

      <Fade on={beat >= 7} delay={dl(7, 3.5)}>
        <T x={905} y={336} size={11} fill={INK} anchor="middle" script={false}>
          {t("asexual POLYP ⇌ sexual MEDUSA phase", "asexual POLYP ⇌ sexual MEDUSA phase")}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 3.9)}>
        <T x={905} y={364} size={10} fill={MUTED} anchor="middle" script>
          {t("classic example: Obelia", "classic example: Obelia")}
        </T>
      </Fade>

      {/* beat 8 — closing distinction + SIGNATURE */}
      <Fade on={beat >= 8} delay={dl(8, 0.2)}>
        <T x={540} y={536} size={12} fill={INK} weight={700} anchor="middle" script={false}>
          {t(
            "metamorphosis = ONE individual changes form  ·  metagenesis = TWO body-forms alternate",
            "metamorphosis = EK individual apna form badalta hai · metagenesis = DO body-forms alternate hote hain"
          )}
        </T>
      </Fade>
      <Draw on={beat >= 8} delay={dl(8, 0.9)} d={roundedBoxD(100, 552, 880, 36)} stroke={AMBER} sw={2} dur={0.7} />
      <Fade on={beat >= 8} delay={dl(8, 1.6)}>
        <Chip x={105} y={558} w={870} h={24} fill={INK} textFill={CREAM} size={12} script={false}>
          {t(
            "SIGNATURE: oviparous/viviparous · internal/external · direct/indirect — metagenesis stands apart",
            "SIGNATURE: oviparous/viviparous · internal/external · direct/indirect — metagenesis alag hai"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
