"use client";

/**
 * B11 Ch04 · Section 10 — "Working the map, and the traps hidden in the vocabulary"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 * Closes out subtopic 1 (Master Map of the Animal Kingdom, secs 1–10).
 *
 * Beats (en [0, 13.14, 28.5, 39.59, 56.75, 73.39, 92.07, 110.42]):
 *  0 title (always-on) + drawn underline · hook: this map is front matter with
 *    a job — read it, let the chapters fill it in, then test yourself
 *  1 ROADMAP row: Basis of Classification → Non-Chordata → Chordata (3 boxes
 *    + 2 arrows) — "each hangs on a branch you've already drawn"
 *  2 ROADMAP 4th box: Master Revision — TEST YOURSELF (amber, + arrow) — not a
 *    summary to read, a test to attempt
 *  3 TRAP 1 (top-left): hermaphrodite ≠ asexual — still sexual reproduction
 *  4 TRAP 2 (top-right): mono/di (how many bodies) ≠ internal/external (where
 *    gametes meet) — independent axis
 *  5 TRAP 3 (bottom-left): ovi/vivi (where embryo develops) ≠ direct/indirect
 *    (does a larva appear) — reptile=ovi+direct, frog=ovi+indirect
 *  6 TRAP 4 (bottom-right): metagenesis (Obelia polyp⇌medusa) ≠ metamorphosis
 *    (tadpole larva→adult) — different words, different things
 *  7 PRO-TIP: one canonical example per term (Budding–Hydra, Regeneration–
 *    Planaria, Metagenesis–Obelia, Bipinnaria–Asterias) + SIGNATURE banner
 *
 * Layout plan (Kalam bl−1.3s..+0.5s, Anek bl−0.78s..+0.31s):
 *  b0 | title (script22 red)          | T mid  | y60
 *  b0 | underline                     | Draw   | y76 x400..680
 *  b0 | hook (script12 muted) [dim@1] | T mid  | y96
 *  b1 | box1/2/3 + 2 arrows           | Draw/T | y118..150  x60..680
 *  b2 | box4 (amber) + arrow          | Draw/T | y118..150  x710..990
 *  b3 | TRAP1 card (3 lines)          | Draw/T | x60..520  y180..270
 *  b4 | TRAP2 card (3 lines)          | Draw/T | x560..1020 y180..270
 *  b5 | TRAP3 card (3 lines)          | Draw/T | x60..520  y294..384
 *  b6 | TRAP4 card (3 lines)          | Draw/T | x560..1020 y294..384
 *  b7 | pro-tip lead-in + 4 chips     | T/Chip | y414, chips y432..460
 *  b7 | SIGNATURE outer box + chip    | Draw/Chip | x100..980 y478..512
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

function boxD(x: number, y: number, w: number, h: number): string {
  return `M ${x} ${y} h ${w} v ${h} h ${-w} Z`;
}

function roundedBoxD(x: number, y: number, w: number, h: number): string {
  return `M ${x} ${y} h ${w - 16} q 8 0 8 8 v ${h - 16} q 0 8 -8 8 h ${-(w - 16)} q -8 0 -8 -8 v ${-(h - 16)} q 0 -8 8 -8`;
}

export default function B11Ch04Sec10({ currentTime, reveals, language }: SceneProps) {
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
          {t("Working the Map & Its Traps", "Map ko Kaam Mein Lana, aur Traps")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 0.3)} d="M 400 76 C 460 73, 620 73, 680 76" stroke={RED} sw={2} dur={0.6} />
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 1.2)}>
        <T x={540} y={96} size={12} fill={MUTED} script>
          {t(
            "front matter with a job — read it, let the chapters fill it in, then test yourself",
            "front matter hai jiska kaam hai — padho, chapters ise bharenge, phir khud ko test karo"
          )}
        </T>
      </Fade>

      {/* beat 1 — roadmap: the 3 teaching subtopics */}
      <Draw on={beat >= 1} delay={dl(1, 0.2)} d={boxD(60, 118, 230, 32)} stroke={INK} sw={1.6} dur={0.4} />
      <Fade on={beat >= 1} delay={dl(1, 0.6)}>
        <T x={175} y={138} size={11} fill={INK} weight={700} anchor="middle" script={false}>
          {t("BASIS OF CLASSIFICATION", "BASIS OF CLASSIFICATION")}
        </T>
      </Fade>
      <Draw on={beat >= 1} delay={dl(1, 1)} d={arrowD(294, 134, 316, 134)} stroke={MUTED} sw={1.4} dur={0.3} />

      <Draw on={beat >= 1} delay={dl(1, 1.3)} d={boxD(320, 118, 180, 32)} stroke={INK} sw={1.6} dur={0.4} />
      <Fade on={beat >= 1} delay={dl(1, 1.7)}>
        <T x={410} y={138} size={11} fill={INK} weight={700} anchor="middle" script={false}>
          {t("NON-CHORDATA", "NON-CHORDATA")}
        </T>
      </Fade>
      <Draw on={beat >= 1} delay={dl(1, 2.1)} d={arrowD(504, 134, 526, 134)} stroke={MUTED} sw={1.4} dur={0.3} />

      <Draw on={beat >= 1} delay={dl(1, 2.4)} d={boxD(530, 118, 150, 32)} stroke={INK} sw={1.6} dur={0.4} />
      <Fade on={beat >= 1} delay={dl(1, 2.8)}>
        <T x={605} y={138} size={11} fill={INK} weight={700} anchor="middle" script={false}>
          {t("CHORDATA", "CHORDATA")}
        </T>
      </Fade>

      {/* beat 2 — roadmap: master revision (the test) */}
      <Draw on={beat >= 2} delay={dl(2, 0.2)} d={arrowD(684, 134, 706, 134)} stroke={AMBER_DARK} sw={1.4} dur={0.3} />
      <Draw on={beat >= 2} delay={dl(2, 0.6)} d={boxD(710, 118, 280, 32)} stroke={AMBER} sw={2} dur={0.5} />
      <Fade on={beat >= 2} delay={dl(2, 1.1)}>
        <T x={850} y={138} size={11} fill={AMBER_DARK} weight={700} anchor="middle" script={false}>
          {t("MASTER REVISION — TEST YOURSELF", "MASTER REVISION — KHUD KO TEST KARO")}
        </T>
      </Fade>

      {/* beat 3 — trap 1: hermaphrodite */}
      <Draw on={beat >= 3} delay={dl(3, 0.2)} d={boxD(60, 180, 460, 90)} stroke={RED} sw={1.3} dur={0.5} />
      <Fade on={beat >= 3} delay={dl(3, 0.6)}>
        <T x={80} y={202} size={10} fill={RED} weight={700} anchor="start" script={false}>
          {t("✗ hermaphrodite ≠ asexual", "✗ hermaphrodite ≠ asexual")}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 1)}>
        <T x={80} y={222} size={9} fill={INK} anchor="start" script={false}>
          {t(
            "both sexes in ONE body — but gametes still form and fuse",
            "dono sexes EK body mein — par gametes phir bhi bante aur fuse hote hain"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 1.4)}>
        <T x={80} y={244} size={9} fill={GREEN} weight={700} anchor="start" script={false}>
          {t("✓ that's SEXUAL reproduction, just monoecious", "✓ ye SEXUAL reproduction hai, bas monoecious")}
        </T>
      </Fade>

      {/* beat 4 — trap 2: mono/di vs internal/external */}
      <Draw on={beat >= 4} delay={dl(4, 0.2)} d={boxD(560, 180, 460, 90)} stroke={RED} sw={1.3} dur={0.5} />
      <Fade on={beat >= 4} delay={dl(4, 0.6)}>
        <T x={580} y={202} size={10} fill={RED} weight={700} anchor="start" script={false}>
          {t("✗ don't merge these two questions", "✗ in do sawaalon ko mat milao")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1)}>
        <T x={580} y={222} size={9} fill={INK} anchor="start" script={false}>
          {t("mono/di = sexes in how many bodies?", "mono/di = sexes kitni bodies mein baante hain?")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.4)}>
        <T x={580} y={244} size={9} fill={GREEN} weight={700} anchor="start" script={false}>
          {t(
            "✓ internal/external = WHERE gametes meet — independent axis!",
            "✓ internal/external = gametes KAHAN milte hain — alag axis!"
          )}
        </T>
      </Fade>

      {/* beat 5 — trap 3: ovi/vivi vs direct/indirect */}
      <Draw on={beat >= 5} delay={dl(5, 0.2)} d={boxD(60, 294, 460, 90)} stroke={RED} sw={1.3} dur={0.5} />
      <Fade on={beat >= 5} delay={dl(5, 0.6)}>
        <T x={80} y={316} size={10} fill={RED} weight={700} anchor="start" script={false}>
          {t("✗ two MORE independent questions", "✗ do aur independent sawaal")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1)}>
        <T x={80} y={336} size={9} fill={INK} anchor="start" script={false}>
          {t(
            "ovi/vivi = WHERE embryo develops · direct/indirect = does a LARVA appear?",
            "ovi/vivi = embryo KAHAN develop hota hai · direct/indirect = larva aata hai ya nahi?"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1.4)}>
        <T x={80} y={358} size={9} fill={GREEN} weight={700} anchor="start" script={false}>
          {t("✓ reptile = ovi + direct · frog = ovi + indirect", "✓ reptile = ovi + direct · frog = ovi + indirect")}
        </T>
      </Fade>

      {/* beat 6 — trap 4: metagenesis vs metamorphosis */}
      <Draw on={beat >= 6} delay={dl(6, 0.2)} d={boxD(560, 294, 460, 90)} stroke={RED} sw={1.3} dur={0.5} />
      <Fade on={beat >= 6} delay={dl(6, 0.6)}>
        <T x={580} y={316} size={10} fill={RED} weight={700} anchor="start" script={false}>
          {t("✗ don't merge these two words", "✗ in do words ko mat milao")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1)}>
        <T x={580} y={336} size={9} fill={INK} anchor="start" script={false}>
          {t("metagenesis = polyp ⇌ medusa (Obelia)", "metagenesis = polyp ⇌ medusa (Obelia)")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1.4)}>
        <T x={580} y={358} size={9} fill={GREEN} weight={700} anchor="start" script={false}>
          {t(
            "✓ metamorphosis = larva → adult (tadpole) — different words, different things",
            "✓ metamorphosis = larva → adult (tadpole) — alag words, alag cheezein"
          )}
        </T>
      </Fade>

      {/* beat 7 — pro-tip + SIGNATURE */}
      <Fade on={beat >= 7} delay={dl(7, 0.2)}>
        <T x={540} y={414} size={11} fill={INK} weight={700} anchor="middle" script={false}>
          {t("PRO-TIP: attach ONE example to every term, right now", "PRO-TIP: har term ke saath ABHI ek example jodo")}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 0.6)}>
        <Chip x={70} y={432} w={216} h={28} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={11} script={false}>
          {t("Budding → Hydra", "Budding → Hydra")}
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 0.9)}>
        <Chip x={298} y={432} w={216} h={28} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={11} script={false}>
          {t("Regeneration → Planaria", "Regeneration → Planaria")}
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.2)}>
        <Chip x={526} y={432} w={216} h={28} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={11} script={false}>
          {t("Metagenesis → Obelia", "Metagenesis → Obelia")}
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.5)}>
        <Chip x={754} y={432} w={216} h={28} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={11} script={false}>
          {t("Bipinnaria → Asterias", "Bipinnaria → Asterias")}
        </Chip>
      </Fade>
      <Draw on={beat >= 7} delay={dl(7, 2)} d={roundedBoxD(100, 478, 880, 34)} stroke={AMBER} sw={2} dur={0.7} />
      <Fade on={beat >= 7} delay={dl(7, 2.7)}>
        <Chip x={105} y={482} w={870} h={26} fill={INK} textFill={CREAM} size={12} script={false}>
          {t(
            "SIGNATURE: one example per term = the phylum tables become RECALL, not reasoning",
            "SIGNATURE: ek example har term ke saath = phylum tables RECALL ban jaate hain, reasoning nahi"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
