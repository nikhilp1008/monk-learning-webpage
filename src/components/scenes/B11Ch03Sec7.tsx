"use client";

/**
 * B11 Ch03 · Section 7 — "Traps, fixes, and the keyword decoder"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 * Closes the "Classification Systems" subtopic (secs 1-7).
 *
 * Beats (en [0, 13.65, 31.83, 56.66, 76.46, 101.29, 126.12, 147.29]):
 *  Traps (beats 0-4, then fully erased):
 *  0 title (always-on) + hook: easy topic, easy to fumble — 3 slips
 *  1 legend: ✗ = WRONG (crossed out) / ✓ = RIGHT (ticked)
 *  2 TRAP 1 — swapping proponents: wrong example crossed, chant ticked
 *  3 TRAP 2 — mixing modern taxonomies: wrong crossed, prefix-read ticked
 *  4 TRAP 3 — artificial ≠ bad/useless: wrong crossed, correction ticked
 *  Decoder + mnemonic + strategy (beats 5-7, full canvas reused):
 *  5 keyword decoder: classical column + modern column, 3 mappings each
 *  6 mnemonic: mini ascending staircase + "few→many→ancestry" caption
 *  7 closing strategy banner: reliable 1-mark scorer, learn 3+3 cold
 *
 * Layout plan (Anek bl−0.78s..+0.31s throughout; script only on title/mnemonic):
 *  always | title (script22 red)          | T mid  | x?..?  y32.9..70.9 (bl61)
 *  Traps (on while beat<5):
 *  b0 | hook (12 muted)                    | T mid  | x?..?  bl94
 *  b1 | legend ✗ / ✓ (12 red/green)        | T end/st| x510/570  bl118
 *  b2 | TRAP1 title/wrong/right             | T mid  | x?..?  bl160/190/220
 *  b3 | TRAP2 title/wrong/right             | T mid  | x?..?  bl260/290/320
 *  b4 | TRAP3 title/wrong/right             | T mid  | x?..?  bl360/390/420
 *  Decoder (on while beat>=5):
 *  b5 | label (13 amber-d)                  | T mid  | x?..?  bl98
 *  b5 | CLASSICAL / MODERN headers          | T mid  | x270/810  bl130
 *  b5 | 3+3 rows                            | T mid  | x270/810  bl160/190/220
 *  b6 | 3 ascending bars                    | Draw   | x490..550 y265..300
 *  b6 | mnemonic caption (13 amber-d)       | T mid  | x?..?  bl330
 *  b7 | outer box                           | Draw   | x270..810 y365..405
 *  b7 | strategy chip                       | Chip   | x275..805 y369..401
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
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
} from "./kit";

export default function B11Ch03Sec7({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);
  const trapsOn = beat < 5;

  return (
    <svg
      viewBox="0 0 1080 620"
      preserveAspectRatio="xMidYMin meet"
      className="w-full h-full select-none"
    >
      {/* title — always on */}
      <Fade on={true}>
        <T x={540} y={61} size={22} fill={RED} script>
          {t("three traps, three one-line fixes", "teen traps, teen one-line fixes")}
        </T>
      </Fade>

      {/* ══════════ traps (beats 0-4) ══════════ */}
      <Fade on={beat >= 0 && trapsOn} dim={beat >= 2} delay={dl(0, 0.3)}>
        <T x={540} y={94} size={12} fill={MUTED} anchor="middle" script={false}>
          {t(
            "easy topic, easy to fumble — 3 specific slips, name each + fix",
            "easy topic, fumble hona easy — 3 specific slips, naam + fix"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 1 && trapsOn} dim={beat >= 2} delay={dl(1, 0.3)}>
        <T x={510} y={118} size={12} fill={RED} anchor="end" script={false}>
          {t("✗ = WRONG (crossed out)", "✗ = WRONG (crossed out)")}
        </T>
      </Fade>
      <Fade on={beat >= 1 && trapsOn} dim={beat >= 2} delay={dl(1, 0.6)}>
        <T x={570} y={118} size={12} fill={GREEN} anchor="start" script={false}>
          {t("✓ = RIGHT (ticked)", "✓ = RIGHT (ticked)")}
        </T>
      </Fade>

      {/* beat 2 — TRAP 1: swapping proponents */}
      <Fade on={beat >= 2 && trapsOn} delay={dl(2, 0.3)}>
        <T x={540} y={160} size={13} fill={INK} weight={700} anchor="middle" script={false}>
          {t("TRAP 1 — swapping proponents", "TRAP 1 — proponents badal jaana")}
        </T>
      </Fade>
      <Fade on={beat >= 2 && trapsOn} delay={dl(2, 0.9)}>
        <T x={540} y={190} size={12} fill={RED} anchor="middle" script={false}>
          {t(
            "✗ writing 'Linnaeus → natural' (names float loose under pressure)",
            "✗ 'Linnaeus → natural' likhna (pressure mein naam idhar-udhar ho jaate)"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 2 && trapsOn} delay={dl(2, 1.5)}>
        <T x={540} y={220} size={12} fill={GREEN} anchor="middle" script={false}>
          {t(
            "✓ chant: Linnaeus=ARTIFICIAL(stamens) · B&H=NATURAL · Engler&Prantl=PHYLOGENETIC(evolution)",
            "✓ chant: Linnaeus=ARTIFICIAL(stamens) · B&H=NATURAL · Engler&Prantl=PHYLOGENETIC(evolution)"
          )}
        </T>
      </Fade>

      {/* beat 3 — TRAP 2: mixing modern taxonomies */}
      <Fade on={beat >= 3 && trapsOn} delay={dl(3, 0.3)}>
        <T x={540} y={260} size={13} fill={INK} weight={700} anchor="middle" script={false}>
          {t("TRAP 2 — mixing the modern taxonomies", "TRAP 2 — modern taxonomies mix karna")}
        </T>
      </Fade>
      <Fade on={beat >= 3 && trapsOn} delay={dl(3, 0.9)}>
        <T x={540} y={290} size={12} fill={RED} anchor="middle" script={false}>
          {t("✗ confusing which prefix means what", "✗ prefix ka matlab confuse karna")}
        </T>
      </Fade>
      <Fade on={beat >= 3 && trapsOn} delay={dl(3, 1.5)}>
        <T x={540} y={320} size={12} fill={GREEN} anchor="middle" script={false}>
          {t(
            "✓ read the WORD: Cyto=chromosomes · Chemo=chemicals · Numerical=computer+equal weight",
            "✓ WORD padho: Cyto=chromosomes · Chemo=chemicals · Numerical=computer+barabar weight"
          )}
        </T>
      </Fade>

      {/* beat 4 — TRAP 3: artificial ≠ bad/useless */}
      <Fade on={beat >= 4 && trapsOn} delay={dl(4, 0.3)}>
        <T x={540} y={360} size={13} fill={INK} weight={700} anchor="middle" script={false}>
          {t("TRAP 3 — thinking artificial = bad/useless", "TRAP 3 — artificial = bekaar sochna")}
        </T>
      </Fade>
      <Fade on={beat >= 4 && trapsOn} delay={dl(4, 0.9)}>
        <T x={540} y={390} size={12} fill={RED} anchor="middle" script={false}>
          {t("✗ artificial = bad, wrong, useless", "✗ artificial = bekaar, galat, useless")}
        </T>
      </Fade>
      <Fade on={beat >= 4 && trapsOn} delay={dl(4, 1.5)}>
        <T x={540} y={420} size={12} fill={GREEN} anchor="middle" script={false}>
          {t(
            "✓ convenient but unnatural — a vital EARLY step, not worthless",
            "✓ convenient par unnatural — zaroori EARLY step, bekaar nahi"
          )}
        </T>
      </Fade>

      {/* ══════════ decoder + mnemonic + strategy (beats 5-7) ══════════ */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={540} y={98} size={13} fill={AMBER_DARK} anchor="middle" script={false}>
          {t("THE KEYWORD DECODER — decode, don't recall", "THE KEYWORD DECODER — decode karo, recall nahi")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 0.6)}>
        <T x={270} y={130} size={13} fill={INK} weight={700} anchor="middle" script={false}>
          CLASSICAL
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={810} y={130} size={13} fill={INK} weight={700} anchor="middle" script={false}>
          {t("MODERN TAXONOMIES", "MODERN TAXONOMIES")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1.1)}>
        <T x={270} y={160} size={12} fill={INK} anchor="middle" script={false}>
          {t("one/few characters → ARTIFICIAL", "ek-do characters → ARTIFICIAL")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1.4)}>
        <T x={270} y={190} size={12} fill={INK} anchor="middle" script={false}>
          {t("all characters / affinities → NATURAL", "SAB characters / affinities → NATURAL")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1.7)}>
        <T x={270} y={220} size={12} fill={INK} anchor="middle" script={false}>
          {t("evolution / ancestry → PHYLOGENETIC", "evolution / ancestry → PHYLOGENETIC")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 2.0)}>
        <T x={810} y={160} size={12} fill={INK} anchor="middle" script={false}>
          {t("chromosomes → CYTO", "chromosomes → CYTO")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 2.3)}>
        <T x={810} y={190} size={12} fill={INK} anchor="middle" script={false}>
          {t("chemicals → CHEMO", "chemicals → CHEMO")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 2.6)}>
        <T x={810} y={220} size={12} fill={INK} anchor="middle" script={false}>
          {t("computer / equal weight → NUMERICAL", "computer / barabar weight → NUMERICAL")}
        </T>
      </Fade>

      {/* beat 6 — mnemonic: mini ascending staircase */}
      <Draw on={beat >= 6} delay={dl(6, 0.2)} d="M 490 300 h 20 v -15 h 20 v -10 h 20 v -10 h 20" stroke={AMBER_DARK} sw={2.2} dur={0.8} />
      <Fade on={beat >= 6} delay={dl(6, 1.1)}>
        <T x={540} y={330} size={13} fill={AMBER_DARK} anchor="middle" script>
          {t(
            "A → N → P = few → many → ancestry — walk the staircase",
            "A → N → P = kam → zyada → ancestry — staircase chalo"
          )}
        </T>
      </Fade>

      {/* beat 7 — closing strategy */}
      <Draw
        on={beat >= 7}
        delay={dl(7, 0.2)}
        d="M 270 365 h 540 q 8 0 8 8 v 24 q 0 8 -8 8 h -540 q -8 0 -8 -8 v -24 q 0 -8 8 -8"
        stroke={AMBER_DARK}
        sw={2}
        dur={0.7}
      />
      <Fade on={beat >= 7} delay={dl(7, 1.0)}>
        <Chip x={275} y={369} w={530} h={32} fill={CREAM} stroke="none" textFill={AMBER_DARK} size={12} script={false}>
          {t(
            "reliable 1-mark scorer — match-column + one-liners; learn 3+3 COLD",
            "bharosemand 1-mark scorer — match-column + one-liners; 3+3 PAKKA seekho"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
