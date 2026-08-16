"use client";

/**
 * B11 Ch04 · Section 9 — "Worked example: reading a life-history fingerprint"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 12.8, 32.77, 44.89, 61.7, 78.34, 91.56, 105.56, 114.6]):
 *  0 title (always-on) + drawn underline · hook: no anatomy at all, only a
 *    life history — name the group
 *  1 the 4 given clues as a chip row: marine · sexes separate · fuse outside
 *    (water) · → bipinnaria larva
 *  2 SCAFFOLD: a narrowing funnel of 4 stacked bars (ALL ANIMALS, then 3
 *    empty dashed filter slots) — "one clue, one filter"
 *  3 Step 1: dioecious filter fires (amber) — deletes the hermaphrodite groups
 *  4 Step 2: external fertilisation filter fires (amber) — narrows, doesn't decide
 *  5 Step 3: bipinnaria filter fires (GREEN, deciding) — Echinodermata (Asterias)
 *  6 Step 4 bonus: larva present → indirect development + metamorphosis
 *  7 ANSWER line: Echinodermata, zero anatomy needed + green ring on the
 *    deciding band
 *  8 consistency check (clue 1 agrees with clue 3) + SIGNATURE banner
 *
 * Layout plan (Kalam bl−1.3s..+0.5s, Anek bl−0.78s..+0.31s):
 *  b0 | title (script22 red)          | T mid  | y60
 *  b0 | underline                     | Draw   | y76 x400..680
 *  b0 | hook (script12 muted) [dim@1] | T mid  | y96
 *  b1 | 4 clue chips                  | Chip   | y118 h26  x90..1016
 *  b2 | band0 "ALL ANIMALS"           | Draw/T | x190..890 y156..188
 *  b2 | band1/2/3 empty dashed slots  | Draw   | x260..820/330..750/400..680
 *  b3 | band1 filled (amber) + expl   | Draw/T | y200..232, expl y252
 *  b4 | band2 filled (amber) + expl   | Draw/T | y266..298, expl y318
 *  b5 | band3 filled (GREEN) + expl   | Draw/T | y332..364, expl y384
 *  b6 | bonus chip                    | Chip   | x160..920 y406..434
 *  b7 | answer line + ring on band3   | T/Draw | y456, ring c540,348 rx154 ry28
 *  b8 | consistency line              | T mid  | x540 y484
 *  b8 | SIGNATURE outer box + chip    | Draw/Chip | x100..980 y500..532
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
  ringD,
  INK,
  MUTED,
  AMBER,
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
} from "./kit";

function boxD(x: number, y: number, w: number, h: number): string {
  return `M ${x} ${y} h ${w} v ${h} h ${-w} Z`;
}

function roundedBoxD(x: number, y: number, w: number, h: number): string {
  return `M ${x} ${y} h ${w - 16} q 8 0 8 8 v ${h - 16} q 0 8 -8 8 h ${-(w - 16)} q -8 0 -8 -8 v ${-(h - 16)} q 0 -8 8 -8`;
}

export default function B11Ch04Sec9({ currentTime, reveals, language }: SceneProps) {
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
          {t("Reading a Life-History Fingerprint", "Life-History Fingerprint Padhna")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 0.3)} d="M 400 76 C 460 73, 620 73, 680 76" stroke={RED} sw={2} dur={0.6} />
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 1.2)}>
        <T x={540} y={96} size={12} fill={MUTED} script>
          {t(
            "no anatomy at all — only a life history. Name the group.",
            "anatomy bilkul nahi — sirf life history milegi. Group ka naam batao."
          )}
        </T>
      </Fade>

      {/* beat 1 — the 4 given clues */}
      <Fade on={beat >= 1} delay={dl(1, 0.2)}>
        <Chip x={90} y={118} w={130} h={26} fill={CREAM} stroke={MUTED} textFill={INK} size={11} script={false}>
          {t("MARINE", "MARINE")}
        </Chip>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 0.6)}>
        <Chip x={232} y={118} w={270} h={26} fill={CREAM} stroke={MUTED} textFill={INK} size={11} script={false}>
          {t("sexes SEPARATE (dioecious)", "sexes ALAG (dioecious)")}
        </Chip>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1)}>
        <Chip x={514} y={118} w={280} h={26} fill={CREAM} stroke={MUTED} textFill={INK} size={11} script={false}>
          {t("gametes fuse OUTSIDE (water)", "gametes BAAHAR fuse (paani mein)")}
        </Chip>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1.4)}>
        <Chip x={806} y={118} w={210} h={26} fill={CREAM} stroke={MUTED} textFill={INK} size={11} script={false}>
          {t("→ BIPINNARIA larva", "→ BIPINNARIA larva")}
        </Chip>
      </Fade>

      {/* beat 2 — funnel scaffold */}
      <Draw on={beat >= 2} delay={dl(2, 0.2)} d={boxD(190, 156, 700, 32)} stroke={MUTED} sw={1.6} dur={0.5} />
      <Fade on={beat >= 2} delay={dl(2, 0.7)}>
        <T x={540} y={176} size={12} fill={INK} weight={700} anchor="middle" script={false}>
          {t("ALL ANIMALS — whole kingdom", "SAARE ANIMALS — poora kingdom")}
        </T>
      </Fade>
      <Draw on={beat >= 2} delay={dl(2, 1.1)} d="M 260 200 h 560 v 32 h -560 Z" stroke={MUTED} sw={1.2} dur={0.4} />
      <Draw on={beat >= 2} delay={dl(2, 1.4)} d="M 330 266 h 420 v 32 h -420 Z" stroke={MUTED} sw={1.2} dur={0.4} />
      <Draw on={beat >= 2} delay={dl(2, 1.7)} d="M 400 332 h 280 v 32 h -280 Z" stroke={MUTED} sw={1.2} dur={0.4} />

      {/* beat 3 — filter 1: dioecious */}
      <Draw on={beat >= 3} delay={dl(3, 0.2)} d={boxD(260, 200, 560, 32)} stroke={AMBER_DARK} sw={2} dur={0.5} />
      <Fade on={beat >= 3} delay={dl(3, 0.7)}>
        <T x={540} y={220} size={12} fill={AMBER_DARK} weight={700} anchor="middle" script={false}>
          {t("FILTER 1 — DIOECIOUS (sexes separate)", "FILTER 1 — DIOECIOUS (sexes alag)")}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 1.2)}>
        <T x={540} y={252} size={9} fill={RED} anchor="middle" script>
          {t(
            "deletes: sponges · coelenterates · ctenophores · most flatworms · earthworm · leech",
            "hata deta hai: sponges · coelenterates · ctenophores · zyaadatar flatworms · earthworm · leech"
          )}
        </T>
      </Fade>

      {/* beat 4 — filter 2: external fertilisation */}
      <Draw on={beat >= 4} delay={dl(4, 0.2)} d={boxD(330, 266, 420, 32)} stroke={AMBER_DARK} sw={2} dur={0.5} />
      <Fade on={beat >= 4} delay={dl(4, 0.7)}>
        <T x={540} y={286} size={12} fill={AMBER_DARK} weight={700} anchor="middle" script={false}>
          {t("FILTER 2 — EXTERNAL FERTILISATION", "FILTER 2 — EXTERNAL FERTILISATION")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.2)}>
        <T x={540} y={318} size={9} fill={MUTED} anchor="middle" script>
          {t(
            "narrows, doesn't decide — many aquatic invertebrates too",
            "narrow karta hai, decide nahi — bahut saare aquatic invertebrates bhi"
          )}
        </T>
      </Fade>

      {/* beat 5 — filter 3: bipinnaria (deciding) */}
      <Draw on={beat >= 5} delay={dl(5, 0.2)} d={boxD(400, 332, 280, 32)} stroke={GREEN} sw={2.2} dur={0.5} />
      <Fade on={beat >= 5} delay={dl(5, 0.7)}>
        <T x={540} y={352} size={12} fill={GREEN} weight={700} anchor="middle" script={false}>
          {t("BIPINNARIA → ECHINODERMATA", "BIPINNARIA → ECHINODERMATA")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1.2)}>
        <T x={540} y={384} size={9} fill={GREEN} anchor="middle" script>
          {t("ONE larva, ONE phylum — Asterias", "EK larva, EK phylum — Asterias")}
        </T>
      </Fade>

      {/* beat 6 — step 4 bonus: indirect development */}
      <Fade on={beat >= 6} delay={dl(6, 0.2)}>
        <Chip x={160} y={406} w={760} h={28} fill={CREAM} stroke={AMBER_DARK} textFill={AMBER_DARK} size={12} script={false}>
          {t(
            "BONUS: a larva exists → INDIRECT development (metamorphosis: larva → adult)",
            "BONUS: larva hai → INDIRECT development (metamorphosis: larva → adult)"
          )}
        </Chip>
      </Fade>

      {/* beat 7 — answer + ring on the deciding band */}
      <Draw on={beat >= 7} delay={dl(7, 0.2)} d={ringD(540, 348, 154, 28)} stroke={GREEN} sw={2} dur={0.7} />
      <Fade on={beat >= 7} delay={dl(7, 1)}>
        <T x={540} y={456} size={12} fill={GREEN} weight={700} anchor="middle" script={false}>
          {t(
            "✓ ANSWER — Echinodermata (e.g. Asterias). Zero anatomical features needed.",
            "✓ ANSWER — Echinodermata (jaise Asterias). Ek bhi anatomical feature nahi chahiye tha."
          )}
        </T>
      </Fade>

      {/* beat 8 — consistency check + SIGNATURE */}
      <Fade on={beat >= 8} delay={dl(8, 0.2)}>
        <T x={540} y={484} size={11} fill={INK} anchor="middle" script={false}>
          {t(
            "consistency check: echinoderms ARE dioecious — clue 1 agrees with clue 3, no contradiction",
            "consistency check: echinoderms dioecious HAIN — clue 1, clue 3 se match karta hai, koi contradiction nahi"
          )}
        </T>
      </Fade>
      <Draw on={beat >= 8} delay={dl(8, 0.9)} d={roundedBoxD(100, 500, 880, 32)} stroke={AMBER} sw={2} dur={0.7} />
      <Fade on={beat >= 8} delay={dl(8, 1.6)}>
        <Chip x={105} y={504} w={870} h={24} fill={INK} textFill={CREAM} size={12} script={false}>
          {t(
            "SIGNATURE: one clue, one filter — narrow the field, don't guess",
            "SIGNATURE: ek clue, ek filter — field narrow karo, guess mat karo"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
