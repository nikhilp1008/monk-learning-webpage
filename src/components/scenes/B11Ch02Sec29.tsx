"use client";

/**
 * B11 Ch02 · Section 29 — "Three routes of reproduction"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 8.87, 20.99, 36.44, 55.64, 76.8, 96.0, 111.7]):
 *  0 title
 *  1 three branches, sexual coloured differently (own section coming)
 *  2 route ① vegetative: fragmentation, budding, fission
 *  3 route ② asexual by spores: conidia → Asco + Deutero
 *  4 rest of the spore vocabulary: sporangiospores, zoospores, aplanospores
 *  5 why it matters: explosive multiplication, no partner needed
 *  6 the bread-mould example
 *  7 route ③ sexual: the 3-step cycle, most-tested — own section next
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, INK, MUTED, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

export default function B11Ch02Sec29({ currentTime, reveals, language }: SceneProps) {
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
          {t("three routes of reproduction", "reproduction ke teen routes")}
        </T>
      </Fade>

      {/* beat 1 — the three branch headers */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <Chip x={65} y={80} w={220} h={40} fill={INK} textFill={CREAM} size={13} script={false}>
          {t("① VEGETATIVE", "① VEGETATIVE")}
        </Chip>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 0.6)}>
        <Chip x={420} y={80} w={240} h={40} fill={INK} textFill={CREAM} size={13} script={false}>
          {t("② ASEXUAL (spores)", "② ASEXUAL (spores)")}
        </Chip>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 0.9)}>
        <Chip x={795} y={80} w={220} h={40} fill={GREEN} textFill="#fff" size={13} script={false}>
          {t("③ SEXUAL", "③ SEXUAL")}
        </Chip>
      </Fade>

      {/* beat 2 — vegetative */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={175} y={145} size={11} fill={INK}>
          {t("fragmentation", "fragmentation")}
        </T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 0.7)}>
        <T x={175} y={167} size={11} fill={INK}>
          {t("budding (yeast)", "budding (yeast)")}
        </T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 1.1)}>
        <T x={175} y={189} size={11} fill={INK}>
          {t("fission", "fission")}
        </T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 1.6)}>
        <T x={175} y={215} size={11} fill={MUTED} script>
          {t("no spores — simple multiplication", "spores nahi — simple multiplication")}
        </T>
      </Fade>

      {/* beat 3 — conidia, the exam favourite */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={540} y={145} size={11} fill={INK} anchor="middle">
          {t("conidia — exogenous, non-motile", "conidia — exogenous, non-motile")}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 0.9)}>
        <T x={540} y={167} size={11} fill={AMBER_DARK} script>
          {t("→ Ascomycetes + Deuteromycetes", "→ Ascomycetes + Deuteromycetes")}
        </T>
      </Fade>

      {/* beat 4 — the rest of the vocabulary */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={540} y={195} size={11} fill={INK}>
          {t("sporangiospores — inside a sporangium", "sporangiospores — sporangium ke andar")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={540} y={217} size={11} fill={GREEN} script>
          {t("zoospores — motile, Phycomycetes (swims!)", "zoospores — motile, Phycomycetes (tairta!)")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.3)}>
        <T x={540} y={239} size={11} fill={INK}>
          {t("aplanospores — non-motile", "aplanospores — non-motile")}
        </T>
      </Fade>

      {/* beat 1 — sexual: own section, own colour */}
      <Fade on={beat >= 1} delay={dl(1, 1.4)}>
        <T x={905} y={145} size={11} fill={GREEN} script>
          {t("a whole cycle inside it", "iske andar poora cycle hai")}
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1.8)}>
        <T x={905} y={167} size={11} fill={MUTED} script>
          {t("own section, right after this", "apna section, iske turant baad")}
        </T>
      </Fade>

      {/* beat 5 — why asexual matters */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={540} y={290} size={14} fill={GREEN} script>
          {t(
            "explosive multiplication when food + moisture are plentiful",
            "food + moisture bahut ho to explosive multiplication"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1.2)}>
        <T x={540} y={313} size={12} fill={MUTED} script>
          {t("no partner needed, no waiting", "koi partner nahi chahiye, koi wait nahi")}
        </T>
      </Fade>

      {/* beat 6 — the bread-mould example */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={345} size={13} fill={AMBER_DARK} script>
          {t(
            "one spore carpets a whole slice of bread in a day or two",
            "ek spore poori bread slice ko ek-do din mein dhak deta"
          )}
        </T>
      </Fade>

      {/* beat 7 — sexual gets its own section */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={540} y={385} size={14} fill={GREEN} script>
          {t(
            "sexual: a three-step cycle — the single most-tested process here",
            "sexual: teen-step cycle — yahan ka sabse zyada tested process"
          )}
        </T>
      </Fade>
    </svg>
  );
}
