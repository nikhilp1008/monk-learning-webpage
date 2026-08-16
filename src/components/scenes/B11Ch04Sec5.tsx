"use client";

/**
 * B11 Ch04 · Section 5 — "Reading the right branch: chordates down to seven classes"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 16.38, 33.71, 52.57, 67.5, 79.36, 95.32, 110.68]):
 *  0 title (always-on) + drawn underline · hook: ONE phylum holds everything
 *  1 CHORDATA root box + starter-kit line + Q1 chip "cranium present?"
 *  2 NO → PROTOCHORDATA box + Urochordata/Ascidia + Cephalochordata/Branchiostoma
 *  3 YES → VERTEBRATA box + "3rd fate" note (notochord→vertebral column+brain box)
 *  4 under VERTEBRATA: Q2 "jaws?" chip; NO → AGNATHA + Cyclostomata/Petromyzon
 *  5 YES → GNATHOSTOMATA; fans to PISCES header + Chondrichthyes/Scoliodon +
 *    Osteichthyes/Labeo
 *  6 GNATHOSTOMATA fans to TETRAPODA header + 4 classes (Amphibia/Rana,
 *    Reptilia/Naja, Aves/Columba, Mammalia/Homo)
 *  7 closing count: 7 vertebrate classes + SIGNATURE banner
 *
 * Layout plan (Kalam bl−1.3s..+0.5s, Anek bl−0.78s..+0.31s):
 *  b0 | title (script22 red)        | T mid  | x?..?  y30..60  (bl52)
 *  b0 | underline swoosh            | Draw   | y66  x400..680
 *  b0 | hook (script12 muted)       | T mid  | x?..?  y83..95  (bl88) [dim@1]
 *  b1 | CHORDATA box                | Draw   | x465..615 y96..130
 *  b1 | starter-kit line            | T mid  | x?..?  y150..161 (bl158)
 *  b1 | Q1 chip                     | Chip   | x420..660 y178..202
 *  b2 | branch-left+NO / PROTO box  | Draw/T | x140..320 y212..248 (bl234)
 *  b2 | Urochordata chip            | Chip   | x110..350 y264..288
 *  b2 | Cephalochordata chip        | Chip   | x110..350 y298..322
 *  b3 | branch-right+YES / VERT box | Draw/T | x670..850 y212..248 (bl234)
 *  b3 | 3rd-fate note               | T mid  | x?..?  y278..292 (bl288)
 *  b4 | stem + Q2 chip              | Draw/Chip | x650..870 y306..330
 *  b4 | branch-left+NO / AGNATHA    | Draw/T | x470..650 y346..382 (bl364)
 *  b4 | Cyclostomata note           | T mid  | x?..?  y392..404 (bl400)
 *  b5 | branch-right+YES / GNATHO   | Draw/T | x870..1030 y346..382 (bl364)
 *  b5 | PISCES header + branch      | Draw/Chip | x140..440 y412..436
 *  b5 | Chondrichthyes chip         | Chip   | x70..280 y450..474
 *  b5 | Osteichthyes chip           | Chip   | x300..495 y450..474
 *  b6 | TETRAPODA header + branch   | Draw/Chip | x610..910 y412..436
 *  b6 | 4 class chips               | Chip   | x540..1016 y450..474
 *  b7 | count summary               | T mid  | x?..?  y502..518 (bl512)
 *  b7 | outer box + SIGNATURE chip  | Draw/Chip | x150..930 y536..572
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

export default function B11Ch04Sec5({ currentTime, reveals, language }: SceneProps) {
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
          {t("Chordata: One Phylum, Seven Classes", "Chordata: Ek Phylum, Saat Classes")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 0.3)} d="M 400 76 C 460 73, 620 73, 680 76" stroke={RED} sw={2} dur={0.6} />
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 1.2)}>
        <T x={540} y={96} size={12} fill={MUTED} script>
          {t("one phylum holds every fish, frog, snake, sparrow, human", "ek phylum mein fish, frog, snake, sparrow, human sab")}
        </T>
      </Fade>

      {/* beat 1 — root + Q1 */}
      <Draw on={beat >= 1} delay={dl(1, 0.2)} d={boxD(465, 106, 150, 34)} stroke={INK} sw={2} dur={0.5} />
      <Fade on={beat >= 1} delay={dl(1, 0.7)}>
        <T x={540} y={127} size={13} fill={INK} weight={700} script={false}>
          {t("CHORDATA", "CHORDATA")}
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1.1)}>
        <T x={540} y={162} size={10} fill={MUTED} anchor="middle" script>
          {t("notochord+nerve cord+gill slits+tail+heart", "notochord+nerve cord+gill slits+tail+heart")}
        </T>
      </Fade>
      <Draw on={beat >= 1} delay={dl(1, 1.5)} d="M 540 140 L 540 178" stroke={INK} sw={1.4} dur={0.4} />
      <Fade on={beat >= 1} delay={dl(1, 1.9)}>
        <Chip x={420} y={178} w={240} h={24} fill={CREAM} stroke={AMBER} textFill={INK} size={11} script={false}>
          {t("cranium present?", "cranium hai?")}
        </Chip>
      </Fade>

      {/* beat 2 — protochordata */}
      <Draw on={beat >= 2} delay={dl(2, 0.2)} d="M 460 202 C 400 206, 280 208, 235 212" stroke={INK} sw={1.5} dur={0.4} />
      <Fade on={beat >= 2} delay={dl(2, 0.6)}>
        <T x={355} y={200} size={11} fill={RED} weight={700} script={false}>
          {t("NO", "NAHI")}
        </T>
      </Fade>
      <Draw on={beat >= 2} delay={dl(2, 1)} d={boxD(140, 212, 180, 36)} stroke={RED} sw={1.8} dur={0.5} />
      <Fade on={beat >= 2} delay={dl(2, 1.5)}>
        <T x={230} y={234} size={12} fill={RED} weight={700} script={false}>
          {t("PROTOCHORDATA", "PROTOCHORDATA")}
        </T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 1.8)}>
        <Chip x={110} y={264} w={240} h={24} fill={CREAM} stroke={MUTED} textFill={INK} size={10} script={false}>
          {t("Urochordata — larval tail · Ascidia", "Urochordata — larval tail · Ascidia")}
        </Chip>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 2.2)}>
        <Chip x={110} y={298} w={240} h={24} fill={CREAM} stroke={MUTED} textFill={INK} size={10} script={false}>
          {t("Cephalochordata — lifelong · Branchiostoma", "Cephalochordata — lifelong · Branchiostoma")}
        </Chip>
      </Fade>

      {/* beat 3 — vertebrata */}
      <Draw on={beat >= 3} delay={dl(3, 0.2)} d="M 620 202 C 660 206, 730 208, 755 212" stroke={INK} sw={1.5} dur={0.4} />
      <Fade on={beat >= 3} delay={dl(3, 0.6)}>
        <T x={700} y={200} size={11} fill={GREEN} weight={700} script={false}>
          {t("YES", "HAAN")}
        </T>
      </Fade>
      <Draw on={beat >= 3} delay={dl(3, 1)} d={boxD(670, 212, 180, 36)} stroke={GREEN} sw={1.8} dur={0.5} />
      <Fade on={beat >= 3} delay={dl(3, 1.5)}>
        <T x={760} y={234} size={12} fill={GREEN} weight={700} script={false}>
          {t("VERTEBRATA", "VERTEBRATA")}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 1.9)}>
        <T x={760} y={288} size={11} fill={AMBER_DARK} anchor="middle" script>
          {t("notochord → vertebral column + brain box (3rd fate)", "notochord → vertebral column + brain box (3rd fate)")}
        </T>
      </Fade>

      {/* beat 4 — jaws split, agnatha */}
      <Draw on={beat >= 4} delay={dl(4, 0.2)} d="M 760 248 L 760 306" stroke={INK} sw={1.4} dur={0.4} />
      <Fade on={beat >= 4} delay={dl(4, 0.6)}>
        <Chip x={650} y={306} w={220} h={24} fill={CREAM} stroke={AMBER} textFill={INK} size={11} script={false}>
          {t("jaws present?", "jaws hain?")}
        </Chip>
      </Fade>
      <Draw on={beat >= 4} delay={dl(4, 1.1)} d="M 690 330 C 660 336, 590 340, 565 346" stroke={INK} sw={1.5} dur={0.4} />
      <Fade on={beat >= 4} delay={dl(4, 1.5)}>
        <T x={655} y={340} size={11} fill={RED} weight={700} script={false}>
          {t("NO", "NAHI")}
        </T>
      </Fade>
      <Draw on={beat >= 4} delay={dl(4, 1.9)} d={boxD(470, 346, 180, 36)} stroke={RED} sw={1.8} dur={0.5} />
      <Fade on={beat >= 4} delay={dl(4, 2.4)}>
        <T x={560} y={368} size={12} fill={RED} weight={700} script={false}>
          {t("AGNATHA", "AGNATHA")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 2.8)}>
        <T x={560} y={400} size={11} fill={MUTED} anchor="middle" script>
          {t("Cyclostomata — Petromyzon (lamprey)", "Cyclostomata — Petromyzon (lamprey)")}
        </T>
      </Fade>

      {/* beat 5 — gnathostomata + pisces */}
      <Draw on={beat >= 5} delay={dl(5, 0.2)} d="M 830 330 C 870 336, 940 340, 960 346" stroke={INK} sw={1.5} dur={0.4} />
      <Fade on={beat >= 5} delay={dl(5, 0.6)}>
        <T x={880} y={340} size={11} fill={GREEN} weight={700} script={false}>
          {t("YES", "HAAN")}
        </T>
      </Fade>
      <Draw on={beat >= 5} delay={dl(5, 1)} d={boxD(870, 346, 160, 36)} stroke={GREEN} sw={1.8} dur={0.5} />
      <Fade on={beat >= 5} delay={dl(5, 1.5)}>
        <T x={950} y={368} size={12} fill={GREEN} weight={700} script={false}>
          {t("GNATHOSTOMATA", "GNATHOSTOMATA")}
        </T>
      </Fade>
      <Draw on={beat >= 5} delay={dl(5, 2)} d="M 900 382 C 750 396, 450 406, 300 412" stroke={INK} sw={1.4} dur={0.6} />
      <Fade on={beat >= 5} delay={dl(5, 2.6)}>
        <Chip x={140} y={412} w={300} h={24} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={11} script={false}>
          {t("PISCES — 2 fish classes", "PISCES — 2 fish classes")}
        </Chip>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 3.1)}>
        <Chip x={70} y={450} w={210} h={24} fill={CREAM} stroke={MUTED} textFill={INK} size={10} script={false}>
          {t("Chondrichthyes — cartilage · Scoliodon", "Chondrichthyes — cartilage · Scoliodon")}
        </Chip>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 3.5)}>
        <Chip x={300} y={450} w={195} h={24} fill={CREAM} stroke={MUTED} textFill={INK} size={10} script={false}>
          {t("Osteichthyes — bony · Labeo", "Osteichthyes — bony · Labeo")}
        </Chip>
      </Fade>

      {/* beat 6 — tetrapoda */}
      <Draw on={beat >= 6} delay={dl(6, 0.2)} d="M 950 382 C 900 396, 820 406, 770 412" stroke={INK} sw={1.4} dur={0.6} />
      <Fade on={beat >= 6} delay={dl(6, 0.7)}>
        <Chip x={610} y={412} w={300} h={24} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={11} script={false}>
          {t("TETRAPODA — 4 classes", "TETRAPODA — 4 classes")}
        </Chip>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1.2)}>
        <Chip x={540} y={450} w={110} h={24} fill={CREAM} stroke={MUTED} textFill={INK} size={9} script={false}>
          {t("Amphibia · Rana", "Amphibia · Rana")}
        </Chip>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1.6)}>
        <Chip x={662} y={450} w={110} h={24} fill={CREAM} stroke={MUTED} textFill={INK} size={9} script={false}>
          {t("Reptilia · Naja", "Reptilia · Naja")}
        </Chip>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 2)}>
        <Chip x={784} y={450} w={110} h={24} fill={CREAM} stroke={MUTED} textFill={INK} size={9} script={false}>
          {t("Aves · Columba", "Aves · Columba")}
        </Chip>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 2.4)}>
        <Chip x={906} y={450} w={110} h={24} fill={CREAM} stroke={MUTED} textFill={INK} size={9} script={false}>
          {t("Mammalia · Homo", "Mammalia · Homo")}
        </Chip>
      </Fade>

      {/* beat 7 — closing count + SIGNATURE banner */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={540} y={510} size={13} fill={AMBER_DARK} script>
          {t(
            "7 vertebrate classes: Cyclostomata + 2 fish + 4 tetrapod — count on your fingers",
            "7 vertebrate classes: Cyclostomata + 2 fish + 4 tetrapod — ungliyon par ginlo"
          )}
        </T>
      </Fade>
      <Draw
        on={beat >= 7}
        delay={dl(7, 1.2)}
        d="M 150 536 h 780 q 8 0 8 8 v 20 q 0 8 -8 8 h -780 q -8 0 -8 -8 v -20 q 0 -8 8 -8"
        stroke={RED}
        sw={2}
        dur={0.7}
      />
      <Fade on={beat >= 7} delay={dl(7, 2)}>
        <Chip x={155} y={542} w={770} h={24} fill={INK} textFill={CREAM} size={12} script={false}>
          {t("SIGNATURE: notochord → cranium → jaws → 7 vertebrate classes", "SIGNATURE: notochord → cranium → jaws → 7 vertebrate classes")}
        </Chip>
      </Fade>
    </svg>
  );
}
