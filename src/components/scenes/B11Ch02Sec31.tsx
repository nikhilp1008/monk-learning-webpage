"use client";

/**
 * B11 Ch02 · Section 31 — "Lichens and mycorrhizae"
 * Split-screen comparison (deliberately kept apart, per narration).
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 8.87, 19.97, 33.62, 52.65, 69.97, 83.03, 97.45]):
 *  0 title — two partnerships, don't confuse them
 *  1 divider + headers: LICHEN left, MYCORRHIZA right
 *  2 LEFT: alga (phycobiont) wrapped by fungus (mycobiont) — drawn
 *  3 LEFT: phyco feeds, myco mounts (roles)
 *  4 LEFT: pollution indicator + dyes (litmus, orcein)
 *  5 RIGHT: fungus + plant root (not alga!) — drawn
 *  6 RIGHT: the trade — minerals/water for sugars
 *  7 RIGHT: the scale — majority of land plants, colonising land
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, arrowD, INK, MUTED, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

export default function B11Ch02Sec31({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={48} size={15} fill={RED} script>
          {t("two partnerships — don't confuse them", "do partnerships — confuse mat karo")}
        </T>
      </Fade>

      {/* beat 1 — divider + headers */}
      <Draw on={beat >= 1} delay={dl(1, 0.3)} d="M 540 72 L 540 560" stroke={MUTED} sw={1.6} dur={0.8} />
      <Fade on={beat >= 1} delay={dl(1, 1)}>
        <T x={270} y={90} size={16} fill={INK} weight={700}>
          LICHEN
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1.3)}>
        <T x={810} y={90} size={16} fill={INK} weight={700}>
          MYCORRHIZA
        </T>
      </Fade>

      {/* beat 2 — LEFT: alga wrapped by fungus */}
      <Draw on={beat >= 2} delay={dl(2, 0.3)} d="M 270 155 m -26 0 a 26 26 0 1 0 52 0 a 26 26 0 1 0 -52 0" stroke={GREEN} sw={2.2} dur={0.7} fill={CREAM} />
      <Draw
        on={beat >= 2}
        delay={dl(2, 1)}
        d="M 220 140 Q 200 155, 220 175 Q 240 195, 270 195 M 320 140 Q 340 155, 320 175 Q 300 195, 270 195 M 220 135 Q 270 110, 320 135"
        stroke={AMBER_DARK}
        sw={1.8}
        dur={0.8}
      />
      <Fade on={beat >= 2} delay={dl(2, 1.9)}>
        <T x={270} y={162} size={10} fill={GREEN} weight={700}>
          {t("alga", "alga")}
        </T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 2.3)}>
        <T x={270} y={228} size={11} fill={AMBER_DARK} script>
          {t("phycobiont (alga) + mycobiont (fungus)", "phycobiont (alga) + mycobiont (fungus)")}
        </T>
      </Fade>

      {/* beat 3 — roles */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={270} y={255} size={11} fill={GREEN} script>
          {t("phycobiont = food-maker (photosynthesizes)", "phycobiont = food-maker (photosynthesize)")}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 0.9)}>
        <T x={270} y={277} size={11} fill={AMBER_DARK} script>
          {t("mycobiont = shelter + absorbs water/minerals", "mycobiont = shelter + water/minerals absorb")}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 1.6)}>
        <T x={270} y={302} size={13} fill={RED} script>
          {t("phyco feeds, myco mounts", "phyco feeds, myco mounts")}
        </T>
      </Fade>

      {/* beat 4 — exam-favourite properties */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={270} y={335} size={11} fill={INK} script>
          {t("SO₂ pollution indicator", "SO₂ pollution indicator")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 0.9)}>
        <T x={270} y={357} size={11} fill={INK} script>
          {t("dyes: litmus, orcein", "dyes: litmus, orcein")}
        </T>
      </Fade>

      {/* beat 5 — RIGHT: fungus + plant root */}
      <Draw on={beat >= 5} delay={dl(5, 0.3)} d="M 810 130 L 810 200 M 810 155 L 780 180 M 810 165 L 840 190 M 810 175 L 790 200" stroke={AMBER_DARK} sw={2.4} dur={0.8} />
      <Draw
        on={beat >= 5}
        delay={dl(5, 1.1)}
        d="M 780 145 Q 760 165, 780 185 M 840 145 Q 860 165, 840 185 M 800 210 Q 780 220, 770 205 M 820 210 Q 840 220, 850 205"
        stroke={GREEN}
        sw={1.6}
        dur={0.8}
      />
      <Fade on={beat >= 5} delay={dl(5, 2)}>
        <T x={810} y={228} size={11} fill={RED} script>
          {t("fungus + PLANT ROOT (not alga!)", "fungus + PLANT ROOT (alga nahi!)")}
        </T>
      </Fade>

      {/* beat 6 — the trade */}
      <Draw on={beat >= 6} delay={dl(6, 0.3)} d={arrowD(730, 260, 890, 260)} stroke={AMBER_DARK} sw={2} dur={0.5} />
      <Fade on={beat >= 6} delay={dl(6, 0.9)}>
        <T x={810} y={252} size={10} fill={AMBER_DARK} script>
          {t("minerals (P) + water", "minerals (P) + water")}
        </T>
      </Fade>
      <Draw on={beat >= 6} delay={dl(6, 1.4)} d={arrowD(890, 285, 730, 285)} stroke={GREEN} sw={2} dur={0.5} />
      <Fade on={beat >= 6} delay={dl(6, 2)}>
        <T x={810} y={303} size={10} fill={GREEN} script>
          {t("sugars", "sugars")}
        </T>
      </Fade>

      {/* beat 7 — the scale */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={810} y={335} size={11} fill={INK} script>
          {t("majority of land plants rely on it", "zyada tar land plants isi par depend")}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 0.9)}>
        <T x={810} y={357} size={11} fill={GREEN} script>
          {t("helped the first plants colonise land", "pehle plants ko land colonise karne mein madad ki")}
        </T>
      </Fade>
    </svg>
  );
}
