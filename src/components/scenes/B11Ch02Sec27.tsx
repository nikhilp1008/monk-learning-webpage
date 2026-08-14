"use client";

/**
 * B11 Ch02 · Section 27 — "The four classes: the table half the
 * questions come from" Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0, 9.47, 25.86, 38.06, 62.89, 87.21, 110.76, 131.67]):
 *  0 title
 *  1 the 3-column spine: mycelium morphology, spore formation, fruiting body
 *  2 grid + headers drawn
 *  3 row ① Phycomycetes (odd one out, highlighted)
 *  4 row ② Ascomycetes
 *  5 row ③ Basidiomycetes
 *  6 row ④ Deuteromycetes
 *  7 the sexual-spores column is where the marks are — boxed
 *
 * Layout: header col x40..230, Mycelium x230..380, Asexual x380..560,
 * Sexual+FB x560..780, Examples x780..1040. header row y110..150,
 * 4 data rows h70 (150..220/220..290/290..360/360..430).
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, INK, MUTED, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

const COL_X = [305, 470, 670, 910];
const COL_DIVS = [380, 560, 780];
const ROW_Y = [190, 255, 325, 395];
const ROW_DIVS = [220, 290, 360];
const CLASSES = ["Phycomycetes", "Ascomycetes", "Basidiomycetes", "Deuteromycetes"];
const HEADERS = ["Mycelium", "Asexual spores", "Sexual spores + fruiting body", "Examples"];

function gridPath(): string {
  let d = "M 40 110 H 1040 V 430 H 40 Z M 230 110 V 430 M 40 150 H 1040";
  for (const x of COL_DIVS) d += ` M ${x} 110 V 430`;
  for (const y of ROW_DIVS) d += ` M 40 ${y} H 1040`;
  return d;
}

export default function B11Ch02Sec27({ currentTime, reveals, language }: SceneProps) {
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
          {t("the table half the sub-topic's questions come from", "wo table jahan se aadhe questions aate hain")}
        </T>
      </Fade>

      {/* beat 1 — the three-column spine */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={540} y={72} size={12} fill={INK} script>
          {t(
            "the spine: mycelium morphology · spore formation · fruiting body",
            "spine: mycelium morphology · spore formation · fruiting body"
          )}
        </T>
      </Fade>

      {/* beat 2 — the grid + headers */}
      <Draw on={beat >= 2} delay={dl(2, 0.3)} d={gridPath()} stroke={INK} sw={1.8} dur={1.2} />
      {CLASSES.map((c, i) => (
        <Fade key={c} on={beat >= 2} delay={dl(2, 1.4 + i * 0.15)}>
          <T x={50} y={ROW_Y[i] + 4} size={12} fill={i === 0 ? AMBER_DARK : INK} anchor="start" weight={700}>
            {c}
          </T>
        </Fade>
      ))}
      {HEADERS.map((h, i) => (
        <Fade key={h} on={beat >= 2} delay={dl(2, 2 + i * 0.15)}>
          <T x={COL_X[i]} y={135} size={11} fill={INK} weight={700}>
            {h}
          </T>
        </Fade>
      ))}

      {/* beat 3 — Phycomycetes, the odd one out (amber label already marks it) */}
      <Fade on={beat >= 3} delay={dl(3, 0.5)}>
        <T x={COL_X[0]} y={ROW_Y[0]} size={10} fill={INK}>
          {t("aseptate, coenocytic", "aseptate, coenocytic")}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 0.9)}>
        <T x={COL_X[1]} y={ROW_Y[0]} size={10} fill={INK}>
          {t("zoospores/aplanospores", "zoospores/aplanospores")}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 1.3)}>
        <T x={COL_X[2]} y={ROW_Y[0]} size={10} fill={INK}>
          {t("isogamy/anisogamy/oogamy", "isogamy/anisogamy/oogamy")}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 1.7)}>
        <T x={COL_X[3]} y={ROW_Y[0]} size={10} fill={INK} script>
          {t("Mucor, Rhizopus, Albugo", "Mucor, Rhizopus, Albugo")}
        </T>
      </Fade>

      {/* beat 4 — Ascomycetes */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={COL_X[0]} y={ROW_Y[1]} size={10} fill={INK}>
          {t("septate, branched", "septate, branched")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 0.7)}>
        <T x={COL_X[1]} y={ROW_Y[1]} size={10} fill={INK}>
          {t("conidia (conidiophore)", "conidia (conidiophore)")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.1)}>
        <T x={COL_X[2]} y={ROW_Y[1]} size={10} fill={INK}>
          {t("ascospores in ascus → ascocarp", "ascospores ascus mein → ascocarp")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.5)}>
        <T x={COL_X[3]} y={ROW_Y[1] - 8} size={10} fill={INK} script>
          {t("Penicillium, Aspergillus,", "Penicillium, Aspergillus,")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.7)}>
        <T x={COL_X[3]} y={ROW_Y[1] + 10} size={10} fill={INK} script>
          {t("Neurospora, Yeast, Claviceps", "Neurospora, Yeast, Claviceps")}
        </T>
      </Fade>

      {/* beat 5 — Basidiomycetes */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={COL_X[0]} y={ROW_Y[2]} size={10} fill={INK}>
          {t("septate", "septate")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 0.7)}>
        <T x={COL_X[1]} y={ROW_Y[2]} size={10} fill={RED} script>
          {t("generally none", "generally none")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1.1)}>
        <T x={COL_X[2]} y={ROW_Y[2]} size={10} fill={INK}>
          {t("basidiospores → basidiocarp", "basidiospores → basidiocarp")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1.5)}>
        <T x={COL_X[3]} y={ROW_Y[2]} size={10} fill={INK} script>
          {t("Agaricus, Puccinia, Ustilago", "Agaricus, Puccinia, Ustilago")}
        </T>
      </Fade>

      {/* beat 6 — Deuteromycetes */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={COL_X[0]} y={ROW_Y[3]} size={10} fill={INK}>
          {t("septate", "septate")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 0.7)}>
        <T x={COL_X[1]} y={ROW_Y[3]} size={10} fill={INK}>
          {t("conidia only", "conidia only")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1.1)}>
        <T x={COL_X[2]} y={ROW_Y[3]} size={10} fill={RED} script>
          {t("absent / unknown", "absent / unknown")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1.5)}>
        <T x={COL_X[3]} y={ROW_Y[3]} size={10} fill={INK} script>
          {t("Alternaria, Colletotrichum, Trichoderma", "Alternaria, Colletotrichum, Trichoderma")}
        </T>
      </Fade>

      {/* beat 7 — the sexual-spores column is where the marks are */}
      <Draw on={beat >= 7} delay={dl(7, 0.3)} d="M 555 145 h 230 v 290 h -230 z" stroke={GREEN} sw={2.4} dur={1} />
      <Fade on={beat >= 7} delay={dl(7, 1.4)}>
        <T x={540} y={462} size={13} fill={GREEN} script>
          {t(
            "no sac → in a sac → on a club → none: that column alone is worth the most",
            "no sac → sac mein → club pe → none: yeh column sabse zyada worth hai"
          )}
        </T>
      </Fade>
    </svg>
  );
}
