"use client";

/**
 * B11 Ch02 · Section 30 — "Plasmogamy, karyogamy, meiosis and the dikaryon"
 * (single most-tested process in the sub-topic) Canvas 1080×620 ·
 * safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 11.86, 32.51, 53.33, 58.97, 83.46, 94.72, 113.92]):
 *  0 title — three steps, in order
 *  1 step ① plasmogamy: protoplasm fuses, nuclei stay separate
 *  2 step ② karyogamy (nuclei fuse) + step ③ meiosis (haploid spores)
 *  3 transition: follow the board
 *  4 the dikaryon: delayed karyogamy in Asco/Basidiomycetes only
 *  5 clamp connections spread the dikaryotic condition
 *  6 somatogamy: Basidiomycetes lack sex organs
 *  7 why bother: keeps options open, meiosis restores variation
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, arrowD, INK, MUTED, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

const SPORE_DOTS: [number, number][] = [[825, 130], [860, 122], [895, 132], [858, 155]];

export default function B11Ch02Sec30({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={48} size={14} fill={RED} script>
          {t("the sexual cycle: three steps, in order", "sexual cycle: teen steps, order mein")}
        </T>
      </Fade>

      {/* beat 1 — plasmogamy */}
      <Draw on={beat >= 1} delay={dl(1, 0.3)} d="M 240 140 m -90 0 a 90 32 0 1 0 180 0 a 90 32 0 1 0 -180 0" stroke={INK} sw={2.2} dur={0.8} fill={CREAM} />
      <Fade on={beat >= 1} delay={dl(1, 1)}>
        <circle cx={210} cy={140} r={9} fill={AMBER_DARK} />
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1.3)}>
        <circle cx={270} cy={140} r={9} fill={AMBER_DARK} />
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1.7)}>
        <T x={240} y={98} size={12} fill={INK} weight={700}>
          {t("① PLASMOGAMY", "① PLASMOGAMY")}
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 2)}>
        <T x={240} y={192} size={10} fill={AMBER_DARK} script>
          {t("protoplasm fuses, nuclei stay separate", "protoplasm fuse, nuclei alag")}
        </T>
      </Fade>

      {/* beat 2 — karyogamy + meiosis */}
      <Draw on={beat >= 2} delay={dl(2, 0.2)} d={arrowD(345, 140, 465, 140)} stroke={MUTED} sw={1.6} dur={0.4} />
      <Draw on={beat >= 2} delay={dl(2, 0.5)} d="M 555 140 m -90 0 a 90 32 0 1 0 180 0 a 90 32 0 1 0 -180 0" stroke={INK} sw={2.2} dur={0.8} fill={CREAM} />
      <Fade on={beat >= 2} delay={dl(2, 1.1)}>
        <circle cx={555} cy={140} r={11} fill={GREEN} />
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 1.4)}>
        <T x={555} y={98} size={12} fill={INK} weight={700}>
          {t("② KARYOGAMY", "② KARYOGAMY")}
        </T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 1.7)}>
        <T x={555} y={192} size={10} fill={GREEN} script>
          {t("nuclei fuse (2n zygote)", "nuclei fuse (2n zygote)")}
        </T>
      </Fade>

      <Draw on={beat >= 2} delay={dl(2, 2)} d={arrowD(660, 140, 780, 140)} stroke={MUTED} sw={1.6} dur={0.4} />
      <Draw on={beat >= 2} delay={dl(2, 2.3)} d="M 860 140 m -90 0 a 90 32 0 1 0 180 0 a 90 32 0 1 0 -180 0" stroke={INK} sw={2.2} dur={0.8} fill={CREAM} />
      {SPORE_DOTS.map(([x, y], i) => (
        <Fade key={i} on={beat >= 2} delay={dl(2, 2.9 + i * 0.15)}>
          <circle cx={x} cy={y} r={5} fill={RED} />
        </Fade>
      ))}
      <Fade on={beat >= 2} delay={dl(2, 3.6)}>
        <T x={860} y={98} size={12} fill={INK} weight={700}>
          {t("③ MEIOSIS", "③ MEIOSIS")}
        </T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 3.9)}>
        <T x={860} y={192} size={10} fill={RED} script>
          {t("4 haploid (n) spores", "4 haploid (n) spores")}
        </T>
      </Fade>

      {/* beat 4 — the dikaryon: delayed karyogamy */}
      <Draw on={beat >= 4} delay={dl(4, 0.3)} d="M 345 220 L 660 220" stroke={AMBER_DARK} sw={2} dur={0.6} />
      <Fade on={beat >= 4} delay={dl(4, 1)}>
        <T x={500} y={245} size={12} fill={AMBER_DARK} script>
          {t("dikaryon (n+n) — delayed karyogamy", "dikaryon (n+n) — karyogamy delayed")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.6)}>
        <T x={500} y={267} size={11} fill={MUTED} script>
          {t("only in Ascomycetes + Basidiomycetes", "sirf Ascomycetes + Basidiomycetes mein")}
        </T>
      </Fade>

      {/* beat 5 — clamp connections */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={540} y={305} size={13} fill={INK} script>
          {t(
            "clamp connections spread the dikaryotic state through the mycelium",
            "clamp connections dikaryotic state ko mycelium mein failate hain"
          )}
        </T>
      </Fade>

      {/* beat 6 — somatogamy */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={335} size={13} fill={RED} script>
          {t(
            "Basidiomycetes lack sex organs — somatogamy fuses vegetative cells instead",
            "Basidiomycetes ke pass sex organs nahi — somatogamy vegetative cells fuse karta"
          )}
        </T>
      </Fade>

      {/* beat 7 — why bother */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={540} y={375} size={13} fill={GREEN} script>
          {t(
            "the dikaryon keeps genetic commitment delayed — options stay open",
            "dikaryon genetic commitment delay karta — options khule rehte hain"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.2)}>
        <T x={540} y={398} size={12} fill={MUTED} script>
          {t("meiosis restores haploidy + reshuffles genes for variation", "meiosis haploidy restore karta + genes reshuffle karke variation deta")}
        </T>
      </Fade>
    </svg>
  );
}
