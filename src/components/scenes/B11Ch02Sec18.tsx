"use client";

/**
 * B11 Ch02 · Section 18 — "Slime moulds: the fungus-like protists"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 7.17, 26.88, 32.68, 52.65, 65.45, 78.93, 92.42]):
 *  0 title
 *  1 creeping body blob + "creeps over decaying matter, engulfing"
 *  2 it hinges on conditions — fork arrows diverge
 *  3 LEFT (favorable): plasmodium + trap — ≠ Plasmodium the malaria parasite
 *  4 RIGHT (unfavorable): fruiting body + spores disperse by air
 *  5 fact: haploid AND diploid phases — unusual among protists
 *  6 nickname: protistan fungi
 *  7 exam trap: why not Fungi? structure over nutrition
 *
 * Layout plan:
 *  b1 | body blob (ink)              | Draw  | c(540,110) rx90 ry32
 *  b1 | caption (script13 ink)       | T mid | x540  y165
 *  b2 | caption (script13 red)       | T mid | x540  y188
 *  b2 | 2 fork arrows                | Draw  | (540,195)→(270,235)/(810,235)
 *  b3 | plasmodium blob              | Draw  | c(270,275) rx85 ry38
 *  b3 | "PLASMODIUM" label           | T mid | x270  y280
 *  b3 | trap caption (script12 red)  | T mid | x270  y345
 *  b4 | fruiting body (stalk+cap)    | Draw  | x795..825 y240..320
 *  b4 | spore dots                   | Fade  | scattered above cap
 *  b4 | caption (script12 green)     | T mid | x810  y345
 *  b5 | caption (script14 ink)       | T mid | x540  y385
 *  b6 | caption (script14 amber)     | T mid | x540  y415
 *  b7 | trap line1 (script14 red)    | T mid | x540  y460
 *  b7 | trap line2 (script13 green) | T mid | x540  y486
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, INK, MUTED, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

const SPORE_DOTS: [number, number][] = [
  [790, 220], [805, 205], [822, 218], [838, 208], [812, 232],
];

export default function B11Ch02Sec18({ currentTime, reveals, language }: SceneProps) {
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
      {/* beat 0 — title */}
      <Fade on={beat >= 0} delay={dl(0, 0.2)}>
        <T x={540} y={52} size={18} fill={RED} script>
          {t("slime moulds: the fungus-like protists", "slime moulds: fungus-like protists")}
        </T>
      </Fade>

      {/* beat 1 — the creeping body */}
      <Draw
        on={beat >= 1}
        delay={dl(1, 0.3)}
        d="M 450 110 Q 460 80, 520 88 Q 560 75, 600 95 Q 640 85, 630 115 Q 645 140, 600 135 Q 560 150, 510 138 Q 460 145, 450 110"
        stroke={INK}
        sw={2.2}
        dur={1}
        fill={CREAM}
      />
      <Fade on={beat >= 1} delay={dl(1, 1.5)}>
        <T x={540} y={165} size={13} fill={INK} script>
          {t("creeps over decaying matter, engulfing it", "decaying matter par creep karta, engulf karta")}
        </T>
      </Fade>

      {/* beat 2 — it hinges on conditions */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={540} y={188} size={13} fill={RED} script>
          {t("it all hinges on conditions", "sab conditions par depend karta hai")}
        </T>
      </Fade>
      <Draw on={beat >= 2} delay={dl(2, 1)} d="M 500 195 L 280 232" stroke={INK} sw={1.8} dur={0.5} />
      <Draw on={beat >= 2} delay={dl(2, 1.4)} d="M 580 195 L 800 232" stroke={INK} sw={1.8} dur={0.5} />
      <Fade on={beat >= 2} delay={dl(2, 1.9)}>
        <T x={330} y={215} size={11} fill={GREEN} weight={700}>
          {t("favorable", "favorable")}
        </T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 2.2)}>
        <T x={750} y={215} size={11} fill={RED} weight={700}>
          {t("unfavorable", "unfavorable")}
        </T>
      </Fade>

      {/* beat 3 — LEFT: plasmodium, and the trap */}
      <Draw
        on={beat >= 3}
        delay={dl(3, 0.3)}
        d="M 185 275 Q 200 245, 270 250 Q 330 240, 350 275 Q 360 310, 300 308 Q 260 322, 210 305 Q 180 300, 185 275"
        stroke={INK}
        sw={2.2}
        dur={0.9}
        fill={CREAM}
      />
      <Fade on={beat >= 3} delay={dl(3, 1.3)}>
        <T x={270} y={280} size={13} fill={INK} weight={700}>
          PLASMODIUM
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 2)}>
        <T x={270} y={345} size={12} fill={RED} script>
          {t("≠ Plasmodium, the malaria parasite!", "≠ Plasmodium, malaria parasite nahi!")}
        </T>
      </Fade>

      {/* beat 4 — RIGHT: fruiting body, spores disperse */}
      <Draw on={beat >= 4} delay={dl(4, 0.3)} d="M 810 320 L 810 260 M 780 260 Q 810 235, 840 260 Q 810 275, 780 260" stroke={INK} sw={2.2} dur={0.8} fill={CREAM} />
      {SPORE_DOTS.map(([x, y], i) => (
        <Fade key={i} on={beat >= 4} delay={dl(4, 1 + i * 0.15)}>
          <circle cx={x} cy={y} r={3} fill={AMBER_DARK} />
        </Fade>
      ))}
      <Fade on={beat >= 4} delay={dl(4, 1.8)}>
        <T x={810} y={345} size={12} fill={GREEN} script>
          {t("fruiting body → spores disperse by air", "fruiting body → spores air se disperse")}
        </T>
      </Fade>

      {/* beat 5 — haploid and diploid phases */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={540} y={385} size={14} fill={INK} script>
          {t(
            "life cycle: haploid AND diploid phases — unusual among protists",
            "life cycle: haploid AUR diploid phases — protists mein unusual"
          )}
        </T>
      </Fade>

      {/* beat 6 — the nickname */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={415} size={14} fill={AMBER_DARK} script>
          {t(
            "nickname: protistan fungi — crawls like protozoa, spore-forms like fungi",
            "nickname: protistan fungi — protozoa jaisa crawl, fungi jaisa spore"
          )}
        </T>
      </Fade>

      {/* beat 7 — the exam trap */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={540} y={460} size={14} fill={RED} script>
          {t(
            "why not Fungi? wall-less while feeding, crawls like protozoa",
            "Fungi mein kyun nahi? feeding mein wall-less, protozoa jaisa crawl"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.2)}>
        <T x={540} y={486} size={13} fill={GREEN} script>
          {t(
            "classification follows structure, not nutrition alone",
            "classification structure follow karta hai, sirf nutrition nahi"
          )}
        </T>
      </Fade>
    </svg>
  );
}
