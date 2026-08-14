"use client";

/**
 * B11 Ch02 · Section 25 — "Hyphae, mycelium, and the septate divide"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 7.77, 28.07, 33.54, 54.1, 68.44, 88.83, 102.74]):
 *  0 title
 *  1 hyphae → mycelium: a thread tangles into a network
 *  2 transition: look at the inset
 *  3 surface area: endless branching = maximum contact for absorption
 *  4 SEPTATE hyphae (cross-walls) → 3 classes
 *  5 ASEPTATE/coenocytic (no cross-walls, many nuclei) → 1 class, free ID
 *  6 chitin wall — same as the master table, never cellulose
 *  7 two exceptions: yeast (unicellular), pseudomycelium
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, INK, MUTED, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

const SEPTA_X = [176, 252, 328, 404];
const NUCLEI: [number, number][] = [[650, 212], [710, 226], [770, 210], [830, 224], [890, 214]];

export default function B11Ch02Sec25({ currentTime, reveals, language }: SceneProps) {
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
          {t("hyphae, mycelium, and the septate divide", "hyphae, mycelium, aur septate divide")}
        </T>
      </Fade>

      {/* beat 1 — thread tangles into a network */}
      <Draw
        on={beat >= 1}
        delay={dl(1, 0.3)}
        d="M 300 80 Q 340 95, 320 115 Q 360 120, 380 100 Q 400 130, 370 140 Q 410 150, 420 125 Q 450 140, 430 160 Q 460 155, 470 175"
        stroke={INK}
        sw={1.6}
        dur={1}
      />
      <Fade on={beat >= 1} delay={dl(1, 1.4)}>
        <T x={540} y={148} size={13} fill={INK} script>
          {t("hyphae, woven together → mycelium", "hyphae, saath bunkar → mycelium")}
        </T>
      </Fade>

      {/* beat 3 — maximum surface area for absorption */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={540} y={172} size={13} fill={GREEN} script>
          {t("endless branching = huge surface area for absorption", "endless branching = absorption ke liye bada surface area")}
        </T>
      </Fade>

      {/* beat 4 — septate hyphae */}
      <Draw on={beat >= 4} delay={dl(4, 0.3)} d="M 100 200 h 380 v 40 h -380 z" stroke={INK} sw={2.2} dur={0.8} fill={CREAM} />
      <Draw
        on={beat >= 4}
        delay={dl(4, 1.1)}
        d={SEPTA_X.map((x) => `M ${x} 200 V 240`).join(" ")}
        stroke={AMBER_DARK}
        sw={1.8}
        dur={0.6}
      />
      <Fade on={beat >= 4} delay={dl(4, 1.8)}>
        <T x={290} y={190} size={13} fill={INK} weight={700}>
          {t("SEPTATE (cross-walls)", "SEPTATE (cross-walls)")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 2.3)}>
        <T x={290} y={262} size={12} fill={INK}>
          Ascomycetes
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 2.6)}>
        <T x={290} y={284} size={12} fill={INK}>
          Basidiomycetes
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 2.9)}>
        <T x={290} y={306} size={12} fill={INK}>
          Deuteromycetes
        </T>
      </Fade>

      {/* divider */}
      <Draw on={beat >= 4} delay={dl(4, 0.3)} d="M 540 185 V 320" stroke={MUTED} sw={1.4} dur={0.6} />

      {/* beat 5 — aseptate / coenocytic hyphae */}
      <Draw on={beat >= 5} delay={dl(5, 0.3)} d="M 600 200 h 380 v 40 h -380 z" stroke={INK} sw={2.2} dur={0.8} fill={CREAM} />
      {NUCLEI.map(([x, y], i) => (
        <Fade key={i} on={beat >= 5} delay={dl(5, 1 + i * 0.15)}>
          <circle cx={x} cy={y} r={4} fill={AMBER_DARK} />
        </Fade>
      ))}
      <Fade on={beat >= 5} delay={dl(5, 1.9)}>
        <T x={790} y={190} size={13} fill={INK} weight={700}>
          {t("ASEPTATE / coenocytic", "ASEPTATE / coenocytic")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 2.4)}>
        <T x={790} y={262} size={12} fill={INK}>
          Phycomycetes
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 2.8)}>
        <T x={790} y={284} size={12} fill={GREEN} script>
          {t("→ free identification!", "→ free identification!")}
        </T>
      </Fade>

      {/* beat 6 — the chitin wall */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={355} size={14} fill={AMBER_DARK} script>
          {t(
            "cell wall: chitin — same as the master table, never cellulose",
            "cell wall: chitin — master table jaisa, cellulose kabhi nahi"
          )}
        </T>
      </Fade>

      {/* beat 7 — two exceptions */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={540} y={390} size={13} fill={INK} script>
          {t("yeast → the unicellular exception, no threads at all", "yeast → unicellular exception, threads bilkul nahi")}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1)}>
        <T x={540} y={415} size={13} fill={INK} script>
          {t("pseudomycelium → cells loosely joined in chains", "pseudomycelium → cells chains mein loosely joined")}
        </T>
      </Fade>
    </svg>
  );
}
