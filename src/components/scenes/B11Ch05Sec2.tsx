"use client";

/**
 * B11 Ch05 · Section 2 — "Root versus stem: the defining checklist"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 11.61, 20.31, 33.19, 46.68, 58.79, 73.81, 87.89]
 *        hi [0, 10.15, 17.32, 26.62, 41.3, 54.19, 66.3, 78.34]):
 *  0 title + hook: "the single most useful idea…confuses the two" [dim@1]
 *  1 DIAGRAM: two-column checklist frame opens — ROOT | STEM headers, divider
 *  2 direction row: root descending↓ / stem ascending↑
 *  3 colour row: root non-green swatch / stem green swatch
 *  4 decisive row (root side): 0/4 — no nodes/internodes/leaves/buds ✗
 *  5 decisive row (stem side): nodes+internodes ✓, terminal+axillary buds ✓
 *  6 root hairs (unicellular, from radicle) / origin (stem: from plumule);
 *    closing rule draws under the table
 *  7 whisper verdict: a crossed-out depth-ruler icon — "features decide, not
 *    depth"
 *
 * Layout plan (Kalam bl−1.3s..+0.5s · Anek bl−0.78s..+0.31s). Columns:
 * ROOT_CX=290, STEM_CX=790, divider x=540 (halves guide, widened).
 *  b0 | title (script25 red)          | T mid  | x?..? y30..77 (bl64)
 *  b0 | underline                     | Draw   | y78 x350..730
 *  b0 | hook (script15 muted)         | T mid  | x?..? y92..111 (bl104) [dim@1]
 *  b1 | divider                       | Draw   | x540 y140..420
 *  b1 | "ROOT" (16 amber-d)           | T mid  | x260..320 y137..155 (bl150)
 *  b1 | "STEM" (16 green)             | T mid  | x760..820 y137..155 (bl150)
 *  b1 | 2 header underlines           | Draw   | y160 x260..320 / x760..820
 *  b2 | root chip "descending…soil"   | Chip   | x166..414 y182..210
 *  b2 | root ↓ arrow                  | Draw   | x130 y186..206
 *  b2 | stem chip "ascending…light"   | Chip   | x650..930 y182..210
 *  b2 | stem ↑ arrow                  | Draw   | x955 y206..186
 *  b3 | root chip "non-green…"        | Chip   | x163..417 y226..254
 *  b3 | root swatch (ink fill)        | Draw   | c135,240 r7
 *  b3 | stem chip "green…brown"       | Chip   | x639..941 y226..254
 *  b3 | stem swatch (green fill)      | Draw   | c965,240 r7
 *  b4 | root chip "no nodes·…no buds" | Chip   | x148..433 y296..324 (red)
 *  b4 | red X icon                    | Draw   | x91..115 y294..318
 *  b5 | stem chip1 "nodes+internodes" | Chip   | x713..868 y284..308 (green)
 *  b5 | stem chip2 "terminal…buds"    | Chip   | x690..890 y320..346 (green)
 *  b5 | green check icon              | Draw   | x655..705 y280..306
 *  b6 | root chip "root hairs…radicle"| Chip   | x151..429 y386..414
 *  b6 | stem chip "origin: plumule"   | Chip   | x693..887 y387..413
 *  b6 | closing rule                  | Draw   | y428 x150..930
 *  b7 | ruler icon + cross-out        | Draw   | x451..489 y482..546
 *  b7 | "depth ✗" caption             | T mid  | x470 y560..571 (bl565)
 *  b7 | verdict chip (16 ink/cream)   | Chip   | x632..958 y487..523
 *  b7 | verdict caption (script12 grn)| T mid  | x?..? y539..561 (bl555)
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
  crossD,
  INK,
  MUTED,
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
} from "./kit";

export default function B11Ch05Sec2({ currentTime, reveals, language }: SceneProps) {
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
          {t("root vs stem: the defining checklist", "root vs stem: defining checklist")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 0.3)} d="M 350 78 C 430 75, 650 75, 730 78" stroke={RED} sw={2.2} dur={0.6} />
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 1.4)}>
        <T x={540} y={104} size={15} fill={MUTED} script>
          {t(
            "almost every trick question hides in this one confusion",
            "har trick question isi confusion mein chhupa hota hai"
          )}
        </T>
      </Fade>

      {/* beat 1 — checklist frame: divider + column headers */}
      <Draw on={beat >= 1} delay={dl(1, 0.3)} d="M 540 140 L 540 420" stroke={INK} sw={1.6} dur={1} />
      <Fade on={beat >= 1} delay={dl(1, 1.2)}>
        <T x={290} y={150} size={16} fill={AMBER_DARK} weight={700}>
          ROOT
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1.5)}>
        <T x={790} y={150} size={16} fill={GREEN} weight={700}>
          STEM
        </T>
      </Fade>
      <Draw on={beat >= 1} delay={dl(1, 2)} d="M 260 160 L 320 160" stroke={AMBER_DARK} sw={1.6} dur={0.4} />
      <Draw on={beat >= 1} delay={dl(1, 2.2)} d="M 760 160 L 820 160" stroke={GREEN} sw={1.6} dur={0.4} />

      {/* beat 2 — direction */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <Chip x={166} y={182} w={248} h={28} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={13} script={false}>
          {t("descending — grows into the soil", "descending — soil ke andar badhta")}
        </Chip>
      </Fade>
      <Draw on={beat >= 2} delay={dl(2, 0.7)} d={arrowD(130, 186, 130, 206)} stroke={AMBER_DARK} sw={2} dur={0.4} />
      <Fade on={beat >= 2} delay={dl(2, 1.3)}>
        <Chip x={650} y={182} w={280} h={28} fill={CREAM} stroke={GREEN} textFill={INK} size={13} script={false}>
          {t("ascending — grows into air & light", "ascending — hawa aur light mein badhta")}
        </Chip>
      </Fade>
      <Draw on={beat >= 2} delay={dl(2, 1.7)} d={arrowD(955, 206, 955, 186)} stroke={GREEN} sw={2} dur={0.4} />

      {/* beat 3 — colour */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <Chip x={163} y={226} w={254} h={28} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={12} script={false}>
          {t("usually non-green (lives in dark)", "aam taur par non-green (andhere mein)")}
        </Chip>
      </Fade>
      <Draw on={beat >= 3} delay={dl(3, 0.8)} d="M 128 240 a 7 7 0 1 0 14 0 a 7 7 0 1 0 -14 0" stroke={INK} sw={1.4} fill={INK} dur={0.4} />
      <Fade on={beat >= 3} delay={dl(3, 1.4)}>
        <Chip x={639} y={226} w={302} h={28} fill={CREAM} stroke={GREEN} textFill={INK} size={12} script={false}>
          {t("green when young → woody, brown with age", "young mein green → age ke saath woody, brown")}
        </Chip>
      </Fade>
      <Draw on={beat >= 3} delay={dl(3, 1.9)} d="M 958 240 a 7 7 0 1 0 14 0 a 7 7 0 1 0 -14 0" stroke={GREEN} sw={1.4} fill={GREEN} dur={0.4} />

      {/* beat 4 — decisive row, root side: zero on all four */}
      <Draw on={beat >= 4} delay={dl(4, 0.3)} d={crossD(95, 298, 16, 16)} stroke={RED} sw={2.2} dur={0.5} />
      <Fade on={beat >= 4} delay={dl(4, 1)}>
        <Chip x={148} y={296} w={285} h={28} fill={CREAM} stroke={RED} textFill={RED} size={11} script={false}>
          {t(
            "no nodes · no internodes · no leaves · no buds",
            "no nodes · no internodes · no leaves · no buds"
          )}
        </Chip>
      </Fade>

      {/* beat 5 — decisive row, stem side: the opposite on every count */}
      <Draw
        on={beat >= 5}
        delay={dl(5, 0.3)}
        d="M 655 296 L 665 306 L 685 280"
        stroke={GREEN}
        sw={2.4}
        dur={0.5}
      />
      <Fade on={beat >= 5} delay={dl(5, 1)}>
        <Chip x={713} y={284} w={155} h={24} fill={CREAM} stroke={GREEN} textFill={GREEN} size={12} script={false}>
          nodes + internodes ✓
        </Chip>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1.9)}>
        <Chip x={690} y={320} w={200} h={26} fill={CREAM} stroke={GREEN} textFill={GREEN} size={11} script={false}>
          {t("terminal bud + axillary buds ✓", "terminal bud + axillary buds ✓")}
        </Chip>
      </Fade>

      {/* beat 6 — root hairs / origin + table closes */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <Chip x={151} y={386} w={278} h={28} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={11} script={false}>
          {t("root hairs unicellular · from the radicle", "root hairs unicellular · radicle se aata hai")}
        </Chip>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1.1)}>
        <Chip x={693} y={387} w={194} h={26} fill={CREAM} stroke={GREEN} textFill={INK} size={12} script={false}>
          {t("origin: from the plumule", "origin: plumule se aata hai")}
        </Chip>
      </Fade>
      <Draw on={beat >= 6} delay={dl(6, 2)} d="M 150 428 L 930 428" stroke={MUTED} sw={1.2} dur={0.7} />

      {/* beat 7 — whisper verdict: depth never decides, features decide */}
      <Draw
        on={beat >= 7}
        delay={dl(7, 0.3)}
        d="M 470 486 L 470 540 M 460 498 L 480 498 M 460 514 L 480 514 M 460 530 L 480 530"
        stroke={INK}
        sw={2}
        dur={0.8}
      />
      <Draw on={beat >= 7} delay={dl(7, 1.3)} d={crossD(458, 486, 24, 54)} stroke={RED} sw={2.2} dur={0.5} />
      <Fade on={beat >= 7} delay={dl(7, 1.9)}>
        <T x={470} y={565} size={11} fill={MUTED}>
          depth ✗
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 2.4)}>
        <Chip x={632} y={487} w={326} h={36} fill={INK} textFill={CREAM} size={15} script={false}>
          {t("FEATURES decide — not depth", "FEATURES decide karte hain, depth nahi")}
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 3.3)}>
        <T x={795} y={555} size={12} fill={GREEN} script>
          {t(
            "(depth in the soil never decides anything)",
            "(soil mein depth kabhi kuch decide nahi karti)"
          )}
        </T>
      </Fade>
    </svg>
  );
}
