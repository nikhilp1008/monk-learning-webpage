"use client";

/**
 * B11 Ch02 · Section 17 — "Dinoflagellates and euglenoids"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 13.31, 26.62, 40.11, 56.06, 80.9, 98.82, 113.58]):
 *  0 title — split screen framing
 *  1 divider + both headers + "sharpest contrast: stiff plates vs no wall"
 *  2 LEFT: dinoflagellate body (plated) + marine/photosynthetic
 *  3 LEFT: two flagella (longitudinal + transverse) → spins as it swims
 *  4 LEFT: examples — Gonyaulax (red tide), Noctiluca (bioluminescent)
 *  5 RIGHT: euglenoid body (flexible) + no wall, pellicle instead
 *  6 RIGHT: equipment — gullet, flagellum, eyespot
 *  7 RIGHT: paramylon + mixotroph punchline
 *
 * Layout plan: divider x540 y100..580. Left half centre x275, right half
 * centre x805. Both sides mirror the same vertical rhythm: header y95,
 * body y150..230, detail y245..335, facts y360..430.
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, INK, MUTED, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

export default function B11Ch02Sec17({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={54} size={17} fill={RED} script>
          {t("the split screen: dinoflagellates vs euglenoids", "split screen: dinoflagellates vs euglenoids")}
        </T>
      </Fade>

      {/* beat 1 — the divider and the sharpest contrast */}
      <Draw on={beat >= 1} delay={dl(1, 0.3)} d="M 540 78 L 540 580" stroke={MUTED} sw={1.6} dur={0.8} />
      <Fade on={beat >= 1} delay={dl(1, 1)}>
        <T x={275} y={95} size={16} fill={INK} weight={700}>
          Dinoflagellates
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1.3)}>
        <T x={805} y={95} size={16} fill={INK} weight={700}>
          Euglenoids
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1.8)}>
        <T x={540} y={78} size={12} fill={RED} script>
          {t("stiff plates vs no wall at all", "stiff plates vs wall bilkul nahi")}
        </T>
      </Fade>

      {/* beat 2 — LEFT: dinoflagellate body */}
      <Draw on={beat >= 2} delay={dl(2, 0.3)} d="M 165 190 a 110 45 0 1 0 220 0 a 110 45 0 1 0 -220 0" stroke={INK} sw={2.2} dur={0.9} fill={CREAM} />
      <Draw on={beat >= 2} delay={dl(2, 1.1)} d="M 210 150 Q 240 190, 210 230 M 275 148 Q 285 190, 275 232 M 340 150 Q 310 190, 340 230" stroke={AMBER_DARK} sw={1.4} dur={0.6} />
      <Fade on={beat >= 2} delay={dl(2, 1.8)}>
        <T x={275} y={250} size={12} fill={INK} script>
          {t("marine, photosynthetic", "marine, photosynthetic")}
        </T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 2.3)}>
        <T x={275} y={270} size={12} fill={AMBER_DARK} weight={700}>
          {t("cellulose plates (armour)", "cellulose plates (armour)")}
        </T>
      </Fade>

      {/* beat 3 — LEFT: two flagella, perpendicular */}
      <Draw on={beat >= 3} delay={dl(3, 0.3)} d="M 165 190 Q 130 210, 105 245" stroke={INK} sw={1.8} dur={0.5} />
      <Draw on={beat >= 3} delay={dl(3, 0.9)} d="M 210 210 Q 275 225, 340 210" stroke={INK} sw={1.8} dur={0.5} />
      <Fade on={beat >= 3} delay={dl(3, 1.5)}>
        <T x={275} y={300} size={12} fill={INK} script>
          {t("longitudinal + transverse — perpendicular", "longitudinal + transverse — perpendicular")}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 2.1)}>
        <T x={275} y={320} size={13} fill={GREEN} script>
          {t("→ the cell spins as it swims", "→ cell spin karti hai swim karte waqt")}
        </T>
      </Fade>

      {/* beat 4 — LEFT: the two exam names */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <Chip x={130} y={355} w={290} h={40} fill={CREAM} stroke={RED} textFill={INK} size={12} script={false}>
          {t("Gonyaulax → red tide, toxins", "Gonyaulax → red tide, toxins")}
        </Chip>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1)}>
        <Chip x={130} y={405} w={290} h={40} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={12} script={false}>
          {t("Noctiluca → bioluminescent", "Noctiluca → bioluminescent")}
        </Chip>
      </Fade>

      {/* beat 5 — RIGHT: euglenoid body, flexible, no wall */}
      <Draw on={beat >= 5} delay={dl(5, 0.3)} d="M 695 190 Q 700 145, 805 148 Q 915 145, 915 190 Q 915 232, 805 232 Q 700 232, 695 190" stroke={INK} sw={2.2} dur={0.9} fill={CREAM} />
      <Fade on={beat >= 5} delay={dl(5, 1.2)}>
        <T x={805} y={196} size={13} fill={INK} weight={700}>
          Euglena
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1.7)}>
        <T x={805} y={250} size={12} fill={INK} script>
          {t("no wall — flexible pellicle instead", "wall nahi — flexible pellicle hai")}
        </T>
      </Fade>

      {/* beat 6 — RIGHT: gullet, flagellum, eyespot */}
      <Fade on={beat >= 6} delay={dl(6, 0.2)}>
        <circle cx={720} cy={185} r={5} fill={RED} />
      </Fade>
      <Draw on={beat >= 6} delay={dl(6, 0.3)} d="M 695 190 Q 650 205, 610 220" stroke={INK} sw={1.8} dur={0.5} />
      <Fade on={beat >= 6} delay={dl(6, 1)}>
        <T x={805} y={285} size={12} fill={INK} script>
          {t("gullet (takes in food) · long flagellum (swims)", "gullet (food leta) · long flagellum (swim)")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 1.6)}>
        <T x={805} y={305} size={12} fill={RED} script>
          {t("eyespot — senses light to orient toward it", "eyespot — light ki taraf orient karta hai")}
        </T>
      </Fade>

      {/* beat 7 — RIGHT: paramylon + mixotroph punchline */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={805} y={355} size={13} fill={AMBER_DARK} weight={700}>
          {t("stores paramylon", "paramylon store karta")}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1)}>
        <T x={805} y={378} size={13} fill={GREEN} script>
          {t("mixotroph: photosynthetic in light,", "mixotroph: light mein photosynthetic,")}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.5)}>
        <T x={805} y={398} size={13} fill={GREEN} script>
          {t("heterotrophic in the dark", "andhere mein heterotrophic")}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 2.2)}>
        <T x={540} y={440} size={14} fill={RED} script>
          {t("standing between plant and animal", "plant aur animal ke beech mein khada")}
        </T>
      </Fade>
    </svg>
  );
}
