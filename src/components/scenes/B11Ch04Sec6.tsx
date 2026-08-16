"use client";

/**
 * B11 Ch04 · Section 6 — "Reproduction vocabulary: who makes the gametes"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 13.14, 22.61, 34.73, 49.58, 63.32, 76.8, 87.89, 99.33]):
 *  0 title (always-on) + drawn underline · hook: vocabulary that pays off later
 *  1 ASEXUAL box (left) + definition: one parent, no gametes
 *  2 SEXUAL box (right) + sub-question "same body?" + dashed divider
 *  3 asexual routes: BUDDING card + FRAGMENTATION card (left)
 *  4 HERMAPHRODITE def (right)
 *  5 hermaphrodite list (right)
 *  6 DIOECIOUS def (right)
 *  7 dioecious list (right)
 *  8 memory aid: mono=one house, di=two houses + SIGNATURE banner
 *
 * Layout plan (Kalam bl−1.3s..+0.5s, Anek bl−0.78s..+0.31s):
 *  b0 | title (script22 red)        | T mid  | x?..?  y31..71  (bl60)
 *  b0 | underline swoosh            | Draw   | y76  x400..680
 *  b0 | hook (script12 muted)       | T mid  | x?..?  y88..102 (bl96) [dim@1]
 *  b1 | ASEXUAL box+label           | Draw/T | x70..260 y110..146 (bl132)
 *  b1 | definition (2 lines)        | T mid  | x?..?  y162..178 (bl170/186)
 *  b2 | dashed divider              | Fade   | x430 y104..540
 *  b2 | SEXUAL box+label            | Draw/T | x610..800 y110..146 (bl132)
 *  b2 | sub-question chip           | Chip   | x580..830 y156..180
 *  b3 | BUDDING card                | Draw/T | x70..400 y196..226 (bl214)
 *  b3 | FRAGMENTATION card          | Draw/T | x70..400 y234..264 (bl252)
 *  b4 | hermaphrodite def           | T mid  | x?..?  y204..218 (bl210)
 *  b5 | hermaphrodite list          | T mid  | x?..?  y260..274 (bl266)
 *  b6 | dioecious def               | T mid  | x?..?  y304..318 (bl310)
 *  b7 | dioecious list              | T mid  | x?..?  y340..354 (bl346)
 *  b8 | mono house icon+label       | Draw/T | x300..380 y420..470 / lbl y495
 *  b8 | di houses icon+label        | Draw/T | x700..790 y420..470 / lbl y495
 *  b8 | outer box + SIGNATURE chip  | Draw/Chip | x150..930 y536..572
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

function houseD(cx: number, baseY: number, w: number, h: number): string {
  const hw = w / 2;
  return `M ${cx - hw} ${baseY} L ${cx - hw} ${baseY - h} L ${cx} ${baseY - h - hw * 0.8} L ${cx + hw} ${baseY - h} L ${cx + hw} ${baseY} Z`;
}

export default function B11Ch04Sec6({ currentTime, reveals, language }: SceneProps) {
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
          {t("Reproduction Vocabulary", "Reproduction ki Vocabulary")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 0.3)} d="M 400 76 C 460 73, 620 73, 680 76" stroke={RED} sw={2} dur={0.6} />
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 1.2)}>
        <T x={540} y={96} size={12} fill={MUTED} script>
          {t("lock these once — they pay off on every page ahead", "ye ek baar lock karo — aage har page kaam aayenge")}
        </T>
      </Fade>

      {/* beat 1 — asexual */}
      <Draw on={beat >= 1} delay={dl(1, 0.2)} d={boxD(70, 110, 190, 36)} stroke={RED} sw={2} dur={0.5} />
      <Fade on={beat >= 1} delay={dl(1, 0.7)}>
        <T x={165} y={132} size={14} fill={RED} weight={700} script={false}>
          {t("ASEXUAL", "ASEXUAL")}
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1.1)}>
        <T x={165} y={166} size={11} fill={INK} anchor="middle" script>
          {t("ONE parent, no gametes at all", "EK parent, gametes bilkul nahi")}
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1.4)}>
        <T x={165} y={182} size={11} fill={INK} anchor="middle" script>
          {t("new individual = from parent's own body", "naya individual = parent ki apni body se")}
        </T>
      </Fade>

      {/* beat 2 — sexual + divider */}
      <Fade on={beat >= 2} delay={dl(2, 0.2)}>
        <path d="M 430 104 L 430 540" stroke={MUTED} strokeWidth={1.4} strokeDasharray="6 6" fill="none" />
      </Fade>
      <Draw on={beat >= 2} delay={dl(2, 0.6)} d={boxD(610, 110, 190, 36)} stroke={GREEN} sw={2} dur={0.5} />
      <Fade on={beat >= 2} delay={dl(2, 1.1)}>
        <T x={705} y={132} size={14} fill={GREEN} weight={700} script={false}>
          {t("SEXUAL", "SEXUAL")}
        </T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 1.5)}>
        <Chip x={580} y={156} w={250} h={26} fill={CREAM} stroke={AMBER} textFill={INK} size={11} script={false}>
          {t("same body for both sexes?", "dono sexes ek hi body mein?")}
        </Chip>
      </Fade>

      {/* beat 3 — asexual routes */}
      <Draw on={beat >= 3} delay={dl(3, 0.2)} d={boxD(70, 196, 330, 30)} stroke={MUTED} sw={1.4} dur={0.4} />
      <Fade on={beat >= 3} delay={dl(3, 0.6)}>
        <T x={235} y={215} size={11} fill={INK} anchor="middle" script={false}>
          {t("BUDDING — outgrowth → new individual (Hydra, sponges)", "BUDDING — outgrowth → naya individual (Hydra, sponges)")}
        </T>
      </Fade>
      <Draw on={beat >= 3} delay={dl(3, 1.1)} d={boxD(70, 234, 330, 30)} stroke={MUTED} sw={1.4} dur={0.4} />
      <Fade on={beat >= 3} delay={dl(3, 1.5)}>
        <T x={235} y={253} size={11} fill={INK} anchor="middle" script={false}>
          {t("FRAGMENTATION + regeneration (Planaria)", "FRAGMENTATION + regeneration (Planaria)")}
        </T>
      </Fade>

      {/* beat 4 — hermaphrodite def */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={730} y={210} size={11} fill={GREEN} anchor="middle" script={false}>
          {t("HERMAPHRODITE = bisexual = monoecious: ONE individual, both sexes", "HERMAPHRODITE = bisexual = monoecious: EK individual, dono sexes")}
        </T>
      </Fade>

      {/* beat 5 — hermaphrodite list */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={730} y={266} size={10} fill={MUTED} anchor="middle" script>
          {t("sponges · coelenterates · ctenophores · most flatworms · earthworm · leech", "sponges · coelenterates · ctenophores · most flatworms · earthworm · leech")}
        </T>
      </Fade>

      {/* beat 6 — dioecious def */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={730} y={310} size={11} fill={RED} anchor="middle" script={false}>
          {t("DIOECIOUS = unisexual: sexes in SEPARATE individuals", "DIOECIOUS = unisexual: sexes ALAG individuals mein")}
        </T>
      </Fade>

      {/* beat 7 — dioecious list */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={730} y={346} size={10} fill={MUTED} anchor="middle" script>
          {t("Aschelminthes · most arthropods · most molluscs · echinoderms · most chordates (us!)", "Aschelminthes · most arthropods · most molluscs · echinoderms · most chordates (hum bhi!)")}
        </T>
      </Fade>

      {/* beat 8 — memory aid + SIGNATURE */}
      <Draw on={beat >= 8} delay={dl(8, 0.2)} d={houseD(340, 470, 70, 40)} stroke={GREEN} sw={2} dur={0.6} />
      <Draw on={beat >= 8} delay={dl(8, 0.8)} d="M 325 460 L 325 470 L 355 470 L 355 460" stroke={GREEN} sw={1.6} dur={0.3} />
      <Fade on={beat >= 8} delay={dl(8, 1.2)}>
        <T x={340} y={492} size={11} fill={GREEN} anchor="middle" script>
          {t("MONO = one house, both sexes", "MONO = ek ghar, dono sexes")}
        </T>
      </Fade>
      <Draw on={beat >= 8} delay={dl(8, 1.6)} d={houseD(700, 470, 55, 40)} stroke={RED} sw={2} dur={0.5} />
      <Draw on={beat >= 8} delay={dl(8, 2.1)} d={houseD(780, 470, 55, 40)} stroke={RED} sw={2} dur={0.5} />
      <Fade on={beat >= 8} delay={dl(8, 2.6)}>
        <T x={740} y={492} size={11} fill={RED} anchor="middle" script>
          {t("DI = two houses, one sex each", "DI = do ghar, ek sex har ghar mein")}
        </T>
      </Fade>
      <Draw
        on={beat >= 8}
        delay={dl(8, 3.2)}
        d="M 150 536 h 780 q 8 0 8 8 v 20 q 0 8 -8 8 h -780 q -8 0 -8 -8 v -20 q 0 -8 8 -8"
        stroke={AMBER}
        sw={2}
        dur={0.7}
      />
      <Fade on={beat >= 8} delay={dl(8, 4)}>
        <Chip x={155} y={542} w={770} h={24} fill={INK} textFill={CREAM} size={12} script={false}>
          {t("SIGNATURE: asexual vs sexual — hermaphrodite (mono) vs dioecious (di)", "SIGNATURE: asexual vs sexual — hermaphrodite (mono) vs dioecious (di)")}
        </Chip>
      </Fade>
    </svg>
  );
}
