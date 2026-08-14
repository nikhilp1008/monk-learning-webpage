"use client";

/**
 * B11 Ch02 · Section 28 — "The diagnostic anchors hidden in the names"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 12.97, 17.83, 39.08, 49.92, 65.02, 83.2, 102.23]):
 *  0 title
 *  1 four names, four built-in answers
 *  2 anchor 1: aseptate/coenocytic = Phycomycetes (septate = not this)
 *  3 "algal fungi" — resembles algae
 *  4 anchor 2 (the big one): SAC (ascus) vs CLUB (basidium) — drawn
 *  5 endogenous vs exogenous — say it as a pair
 *  6 anchor 3: no sexual stage = Deuteromycetes, imperfect ≠ flawed
 *  7 consequence: discover a sexual stage → reclassified
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, INK, MUTED, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

const SAC_DOTS: [number, number][] = [[270, 232], [305, 224], [325, 242], [288, 256]];
const CLUB_DOTS: [number, number][] = [[748, 236], [765, 222], [785, 216], [805, 222], [822, 236]];

export default function B11Ch02Sec28({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={48} size={16} fill={RED} script>
          {t("the diagnostic anchors hidden in the names", "names ke andar chhupe diagnostic anchors")}
        </T>
      </Fade>

      {/* beat 1 — four names, four built-in answers */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={540} y={72} size={13} fill={GREEN} script>
          {t("four names, four built-in answers", "chaar naam, chaar built-in answers")}
        </T>
      </Fade>

      {/* beat 2 — anchor 1: Phycomycetes */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={540} y={100} size={13} fill={INK} script>
          {t(
            "aseptate/coenocytic = Phycomycetes (septate → NOT this one)",
            "aseptate/coenocytic = Phycomycetes (septate → yeh nahi)"
          )}
        </T>
      </Fade>

      {/* beat 3 — algal fungi */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={540} y={123} size={12} fill={AMBER_DARK} script>
          {t("“algal fungi” — resembles algae, coenocytic threads", "“algal fungi” — algae jaisa, coenocytic threads")}
        </T>
      </Fade>

      {/* beat 4 — the big one: sac vs club */}
      <Fade on={beat >= 4} delay={dl(4, 0.1)}>
        <T x={300} y={178} size={14} fill={INK} weight={700}>
          {t("ASCOMYCETES = sac fungi", "ASCOMYCETES = sac fungi")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 0.1)}>
        <T x={790} y={178} size={14} fill={INK} weight={700}>
          {t("BASIDIOMYCETES = club fungi", "BASIDIOMYCETES = club fungi")}
        </T>
      </Fade>
      <Draw
        on={beat >= 4}
        delay={dl(4, 0.5)}
        d="M 250 210 Q 230 240, 250 270 Q 300 288, 350 270 Q 372 240, 350 210 Q 300 194, 250 210"
        stroke={INK}
        sw={2.2}
        dur={0.8}
        fill={CREAM}
      />
      {SAC_DOTS.map(([x, y], i) => (
        <Fade key={i} on={beat >= 4} delay={dl(4, 1.3 + i * 0.15)}>
          <circle cx={x} cy={y} r={4} fill={AMBER_DARK} />
        </Fade>
      ))}
      <Fade on={beat >= 4} delay={dl(4, 2)}>
        <T x={300} y={316} size={12} fill={AMBER_DARK} script>
          {t("spores INSIDE the ascus", "spores ASCUS ke ANDAR")}
        </T>
      </Fade>

      <Draw on={beat >= 4} delay={dl(4, 0.5)} d="M 785 280 L 785 245" stroke={INK} sw={2.2} dur={0.6} />
      <Draw
        on={beat >= 4}
        delay={dl(4, 0.9)}
        d="M 740 240 Q 785 208, 830 240 Q 785 252, 740 240"
        stroke={INK}
        sw={2.2}
        dur={0.7}
        fill={CREAM}
      />
      {CLUB_DOTS.map(([x, y], i) => (
        <Fade key={i} on={beat >= 4} delay={dl(4, 1.6 + i * 0.15)}>
          <circle cx={x} cy={y} r={4} fill={GREEN} />
        </Fade>
      ))}
      <Fade on={beat >= 4} delay={dl(4, 2.4)}>
        <T x={785} y={316} size={12} fill={GREEN} script>
          {t("spores OUTSIDE on the basidium", "spores basidium ke BAHAR")}
        </T>
      </Fade>

      {/* beat 5 — endogenous vs exogenous, say it as a pair */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={540} y={250} size={14} fill={RED} script>
          {t("in a sac, on a club", "sac ke andar, club ke upar")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1)}>
        <T x={540} y={350} size={12} fill={MUTED} script>
          {t("endogenous vs exogenous — that's the giveaway", "endogenous vs exogenous — yehi giveaway hai")}
        </T>
      </Fade>

      {/* beat 6 — anchor 3: Deuteromycetes */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={385} size={13} fill={INK} script>
          {t(
            "no sexual stage = Deuteromycetes — “imperfect” ≠ flawed, just unseen",
            "sexual stage nahi = Deuteromycetes — “imperfect” ≠ flawed, bas unseen"
          )}
        </T>
      </Fade>

      {/* beat 7 — the consequence */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={540} y={425} size={14} fill={GREEN} script>
          {t(
            "discover a sexual stage → reclassified into Asco- or Basidiomycetes",
            "sexual stage mil jaaye → Asco- ya Basidiomycetes mein reclassify"
          )}
        </T>
      </Fade>
    </svg>
  );
}
