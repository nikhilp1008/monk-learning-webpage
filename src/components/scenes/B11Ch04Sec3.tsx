"use client";

/**
 * B11 Ch04 · Section 3 — "The master map: one chart holds the whole kingdom"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 12.71, 26.2, 40.11, 53.08, 67.07, 84.31, 101.03]):
 *  0 title (always-on) + drawn underline · hook: whole chapter = one chart
 *  1 root ANIMALIA box + Q1 chip "notochord at ANY life stage?"
 *  2 tree splits: NO→NON-CHORDATA box (left), YES→CHORDATA box (right)
 *  3 NON-CHORDATA detail: 10 phyla, sponges → Balanoglossus
 *  4 CHORDATA starter kit: notochord+nerve cord+gill slits+tail+heart
 *  5 Q2 chip "cranium present?" under CHORDATA, splits NO→PROTOCHORDATA,
 *    YES→VERTEBRATA
 *  6 Q3 chip "jaws?" under VERTEBRATA, splits NO→AGNATHA, YES→GNATHOSTOMATA
 *    (+ fish/tetrapod annotation)
 *  7 closing SIGNATURE banner: 3 questions deep
 *
 * Layout plan (Kalam bl−1.3s..+0.5s, Anek bl−0.78s..+0.31s):
 *  b0 | title (script24 red)         | T mid  | x?..?  y30..64  (bl56)
 *  b0 | underline swoosh             | Draw   | y70  x400..680
 *  b0 | hook (script13 muted)        | T mid  | x?..?  y89..102 (bl96) [dim@1]
 *  b1 | ANIMALIA box                 | Draw   | x465..615 y104..140
 *  b1 | ANIMALIA label               | T mid  | x540 y121..131 (bl126)
 *  b1 | stem line                    | Draw   | x540 y140..150
 *  b1 | Q1 chip                      | Chip   | x400..680 y150..178
 *  b2 | branch-left line + NO        | Draw/T | x230..540 y178..210 / lbl x372 y198
 *  b2 | branch-right line + YES      | Draw/T | x540..760 y178..210 / lbl x660 y198
 *  b2 | NON-CHORDATA box+label       | Draw/T | x140..320 y210..246 (bl232)
 *  b2 | CHORDATA box+label           | Draw/T | x670..850 y210..246 (bl232)
 *  b3 | non-chordata detail          | T mid  | x70..390 y262..274 (bl268)
 *  b4 | chordata starter-kit         | T mid  | x600..920 y262..274 (bl268)
 *  b5 | stem CHORDATA→Q2             | Draw   | x760 y246..286
 *  b5 | Q2 chip                      | Chip   | x650..870 y286..312
 *  b5 | branch-left + NO             | Draw/T | x560..760 y312..330 / x630 y322
 *  b5 | PROTOCHORDATA box+label      | Draw/T | x470..650 y330..366 (bl352)
 *  b5 | branch-right + YES           | Draw/T | x760..900 y312..330 / x840 y322
 *  b5 | VERTEBRATA box+label         | Draw/T | x810..990 y330..366 (bl352)
 *  b6 | stem VERTEBRATA→Q3           | Draw   | x900 y366..376
 *  b6 | Q3 chip                      | Chip   | x790..1010 y376..402
 *  b6 | branch-left + NO             | Draw/T | x760..900 y402..430 / x800 y416
 *  b6 | AGNATHA box+label            | Draw/T | x680..840 y430..466 (bl452)
 *  b6 | branch-right + YES           | Draw/T | x900..955 y402..430 / x900 y416
 *  b6 | GNATHOSTOMATA box+label      | Draw/T | x880..1030 y430..466 (bl448)
 *  b6 | fish/tetrapod annotation     | T mid  | x955 y480..492 (bl488)
 *  b7 | outer emphasis box           | Draw   | x150..930 y550..594
 *  b7 | SIGNATURE chip               | Chip   | x155..925 y556..582
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

export default function B11Ch04Sec3({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={56} size={24} fill={RED} script>
          {t("One Chart, Three Questions", "Ek Chart, Teen Sawaal")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 0.3)} d="M 400 70 C 460 67, 620 67, 680 70" stroke={RED} sw={2.2} dur={0.6} />
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 1.2)}>
        <T x={540} y={96} size={13} fill={MUTED} script>
          {t("the whole Animal Kingdom chapter lives on THIS chart", "poora Animal Kingdom chapter is chart par hai")}
        </T>
      </Fade>

      {/* beat 1 — root + Q1 */}
      <Draw on={beat >= 1} delay={dl(1, 0.2)} d={boxD(465, 104, 150, 36)} stroke={INK} sw={2} dur={0.5} />
      <Fade on={beat >= 1} delay={dl(1, 0.7)}>
        <T x={540} y={126} size={14} fill={INK} weight={700} script={false}>
          {t("ANIMALIA", "ANIMALIA")}
        </T>
      </Fade>
      <Draw on={beat >= 1} delay={dl(1, 1.1)} d="M 540 140 L 540 150" stroke={INK} sw={1.6} dur={0.3} />
      <Fade on={beat >= 1} delay={dl(1, 1.5)}>
        <Chip x={400} y={150} w={280} h={28} fill={CREAM} stroke={AMBER} textFill={INK} size={12} script={false}>
          {t("notochord at ANY life stage?", "notochord kisi bhi stage par?")}
        </Chip>
      </Fade>

      {/* beat 2 — the split */}
      <Draw on={beat >= 2} delay={dl(2, 0.2)} d="M 470 178 C 420 190, 280 200, 235 210" stroke={INK} sw={1.6} dur={0.5} />
      <Fade on={beat >= 2} delay={dl(2, 0.7)}>
        <T x={372} y={198} size={12} fill={RED} weight={700} script={false}>
          {t("NO", "NAHI")}
        </T>
      </Fade>
      <Draw on={beat >= 2} delay={dl(2, 1.1)} d="M 610 178 C 660 190, 720 200, 755 210" stroke={INK} sw={1.6} dur={0.5} />
      <Fade on={beat >= 2} delay={dl(2, 1.6)}>
        <T x={660} y={198} size={12} fill={GREEN} weight={700} script={false}>
          {t("YES", "HAAN")}
        </T>
      </Fade>
      <Draw on={beat >= 2} delay={dl(2, 2)} d={boxD(140, 210, 180, 36)} stroke={RED} sw={2} dur={0.5} />
      <Fade on={beat >= 2} delay={dl(2, 2.5)}>
        <T x={230} y={232} size={13} fill={RED} weight={700} script={false}>
          {t("NON-CHORDATA", "NON-CHORDATA")}
        </T>
      </Fade>
      <Draw on={beat >= 2} delay={dl(2, 2.9)} d={boxD(670, 210, 180, 36)} stroke={GREEN} sw={2} dur={0.5} />
      <Fade on={beat >= 2} delay={dl(2, 3.4)}>
        <T x={760} y={232} size={13} fill={GREEN} weight={700} script={false}>
          {t("CHORDATA", "CHORDATA")}
        </T>
      </Fade>

      {/* beat 3 — non-chordata detail */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={230} y={268} size={11} fill={MUTED} anchor="middle" script>
          {t("10 phyla, rising complexity: sponges → ... → Balanoglossus", "10 phyla, badhti complexity: sponges → ... → Balanoglossus")}
        </T>
      </Fade>

      {/* beat 4 — chordata starter kit */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={760} y={268} size={11} fill={MUTED} anchor="middle" script>
          {t("starter kit: notochord + nerve cord + gill slits + tail + heart", "starter kit: notochord + nerve cord + gill slits + tail + heart")}
        </T>
      </Fade>

      {/* beat 5 — cranium split */}
      <Draw on={beat >= 5} delay={dl(5, 0.2)} d="M 760 246 L 760 286" stroke={INK} sw={1.6} dur={0.4} />
      <Fade on={beat >= 5} delay={dl(5, 0.6)}>
        <Chip x={650} y={286} w={220} h={26} fill={CREAM} stroke={AMBER} textFill={INK} size={11} script={false}>
          {t("cranium (brain box) present?", "cranium (brain box) hai?")}
        </Chip>
      </Fade>
      <Draw on={beat >= 5} delay={dl(5, 1.1)} d="M 700 312 C 670 320, 620 324, 590 330" stroke={INK} sw={1.6} dur={0.4} />
      <Fade on={beat >= 5} delay={dl(5, 1.5)}>
        <T x={630} y={322} size={11} fill={RED} weight={700} script={false}>
          {t("NO", "NAHI")}
        </T>
      </Fade>
      <Draw on={beat >= 5} delay={dl(5, 1.9)} d={boxD(470, 330, 180, 36)} stroke={RED} sw={1.8} dur={0.5} />
      <Fade on={beat >= 5} delay={dl(5, 2.4)}>
        <T x={560} y={347} size={12} fill={RED} weight={700} script={false}>
          {t("PROTOCHORDATA", "PROTOCHORDATA")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 2.7)}>
        <T x={560} y={361} size={10} fill={MUTED} script={false}>
          {t("(acraniate)", "(acraniate)")}
        </T>
      </Fade>
      <Draw on={beat >= 5} delay={dl(5, 3.1)} d="M 820 312 C 850 320, 880 324, 895 330" stroke={INK} sw={1.6} dur={0.4} />
      <Fade on={beat >= 5} delay={dl(5, 3.5)}>
        <T x={850} y={322} size={11} fill={GREEN} weight={700} script={false}>
          {t("YES", "HAAN")}
        </T>
      </Fade>
      <Draw on={beat >= 5} delay={dl(5, 3.9)} d={boxD(810, 330, 180, 36)} stroke={GREEN} sw={1.8} dur={0.5} />
      <Fade on={beat >= 5} delay={dl(5, 4.4)}>
        <T x={900} y={347} size={12} fill={GREEN} weight={700} script={false}>
          {t("VERTEBRATA", "VERTEBRATA")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 4.7)}>
        <T x={900} y={361} size={10} fill={MUTED} script={false}>
          {t("(craniate)", "(craniate)")}
        </T>
      </Fade>

      {/* beat 6 — jaws split */}
      <Draw on={beat >= 6} delay={dl(6, 0.2)} d="M 900 366 L 900 376" stroke={INK} sw={1.6} dur={0.3} />
      <Fade on={beat >= 6} delay={dl(6, 0.5)}>
        <Chip x={790} y={376} w={220} h={26} fill={CREAM} stroke={AMBER} textFill={INK} size={11} script={false}>
          {t("jaws present?", "jaws hain?")}
        </Chip>
      </Fade>
      <Draw on={beat >= 6} delay={dl(6, 1)} d="M 850 402 C 830 412, 800 420, 790 430" stroke={INK} sw={1.6} dur={0.4} />
      <Fade on={beat >= 6} delay={dl(6, 1.4)}>
        <T x={800} y={416} size={11} fill={RED} weight={700} script={false}>
          {t("NO", "NAHI")}
        </T>
      </Fade>
      <Draw on={beat >= 6} delay={dl(6, 1.8)} d={boxD(680, 430, 160, 36)} stroke={RED} sw={1.8} dur={0.5} />
      <Fade on={beat >= 6} delay={dl(6, 2.3)}>
        <T x={760} y={448} size={12} fill={RED} weight={700} script={false}>
          {t("AGNATHA", "AGNATHA")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 2.6)}>
        <T x={760} y={462} size={10} fill={MUTED} script={false}>
          {t("(jawless)", "(jawless)")}
        </T>
      </Fade>
      <Draw on={beat >= 6} delay={dl(6, 3)} d="M 950 402 C 955 412, 955 420, 955 430" stroke={INK} sw={1.6} dur={0.4} />
      <Fade on={beat >= 6} delay={dl(6, 3.4)}>
        <T x={975} y={416} size={11} fill={GREEN} weight={700} script={false}>
          {t("YES", "HAAN")}
        </T>
      </Fade>
      <Draw on={beat >= 6} delay={dl(6, 3.8)} d={boxD(875, 430, 160, 36)} stroke={GREEN} sw={1.8} dur={0.5} />
      <Fade on={beat >= 6} delay={dl(6, 4.3)}>
        <T x={955} y={448} size={12} fill={GREEN} weight={700} script={false}>
          {t("GNATHOSTOMATA", "GNATHOSTOMATA")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 4.6)}>
        <T x={955} y={462} size={10} fill={MUTED} script={false}>
          {t("(jawed)", "(jawed)")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 5)}>
        <T x={955} y={488} size={10} fill={AMBER_DARK} anchor="middle" script>
          {t("→ 2 fish + 4 tetrapod classes", "→ 2 fish + 4 tetrapod classes")}
        </T>
      </Fade>

      {/* beat 7 — closing SIGNATURE banner */}
      <Draw
        on={beat >= 7}
        delay={dl(7, 0.2)}
        d="M 150 550 h 780 q 8 0 8 8 v 28 q 0 8 -8 8 h -780 q -8 0 -8 -8 v -28 q 0 -8 8 -8"
        stroke={AMBER}
        sw={2}
        dur={0.7}
      />
      <Fade on={beat >= 7} delay={dl(7, 1)}>
        <Chip x={155} y={556} w={770} h={30} fill={INK} textFill={CREAM} size={13} script={false}>
          {t("SIGNATURE: 3 questions deep — notochord → cranium → jaws", "SIGNATURE: 3 sawaal — notochord → cranium → jaws")}
        </Chip>
      </Fade>
    </svg>
  );
}
