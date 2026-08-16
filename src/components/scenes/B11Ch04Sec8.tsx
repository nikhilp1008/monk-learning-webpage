"use client";

/**
 * B11 Ch04 · Section 8 — "The canonical larval forms"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 12.12, 21.59, 29.44, 40.7, 53.33, 64.43, 80.64]):
 *  0 title (always-on) + drawn underline · hook: cheapest marks in the chapter,
 *    NEET wants straight recall — make the list mechanical
 *  1 SCAFFOLD: two "LARVA → GROUP" column headers + ruled underlines (flashcard
 *    drill format: hear the larva, name the group)
 *  2 planula → Cnidaria (left row 1)
 *  3 trochophore → Annelida & Mollusca, veliger → Mollusca ONLY (left rows 2–3)
 *  4 bipinnaria → Echinodermata (· Asterias, the starfish) (right row 1)
 *  5 tadpole → Amphibia, ammocoete → Cyclostomata (· Petromyzon) (right rows 2–3)
 *  6 TRAP: ring around the trochophore row + red callout — shared by 2 phyla,
 *    need a second clue
 *  7 closing: named larva = name-tag on the group; a larva at all = indirect
 *    development (ties back to Sec 7) + SIGNATURE banner
 *
 * Layout plan (Kalam bl−1.3s..+0.5s, Anek bl−0.78s..+0.31s; text widths
 * estimated 0.5×size×chars, over-estimated where checked against the render):
 *  b0 | title (script22 red)         | T mid  | y60
 *  b0 | underline                    | Draw   | y76 x400..680
 *  b0 | hook (script12 muted) [dim@1]| T mid  | y96
 *  b1 | "LARVA"/"GROUP" ×2 headers   | T st   | y118  x90/330 & x610/850
 *  b1 | header underlines ×2         | Draw   | y126  x90..500 & x610..1020
 *  b2 | planula row                  | T/Draw | y160  x90..500 (left col row1)
 *  b3 | trochophore + veliger rows   | T/Draw | y230,300 (left col rows2-3)
 *  b4 | bipinnaria row + example     | T/Draw | y160,178 (right col row1)
 *  b5 | tadpole + ammocoete rows     | T/Draw | y230,300,318 (right col rows2-3)
 *  b6 | ring on trochophore row      | Draw   | c256,226 rx180 ry20
 *  b6 | trap callout chip            | Chip   | x140..940 y384..416
 *  b7 | distinction line             | T mid  | x540 y480
 *  b7 | SIGNATURE outer box + chip   | Draw/Chip | x100..980 y496..532
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
  ringD,
  INK,
  MUTED,
  AMBER,
  AMBER_DARK,
  RED,
  CREAM,
} from "./kit";

function roundedBoxD(x: number, y: number, w: number, h: number): string {
  return `M ${x} ${y} h ${w - 16} q 8 0 8 8 v ${h - 16} q 0 8 -8 8 h ${-(w - 16)} q -8 0 -8 -8 v ${-(h - 16)} q 0 -8 8 -8`;
}

export default function B11Ch04Sec8({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={60} size={22} fill={RED} script>
          {t("The Canonical Larval Forms", "Canonical Larval Forms")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 0.3)} d="M 400 76 C 460 73, 620 73, 680 76" stroke={RED} sw={2} dur={0.6} />
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 1.2)}>
        <T x={540} y={96} size={12} fill={MUTED} script>
          {t(
            "the cheapest marks in the chapter — NEET wants straight recall, so let's make it mechanical",
            "chapter ke sabse saste marks — NEET seedha recall maangta hai, isse mechanical banate hain"
          )}
        </T>
      </Fade>

      {/* beat 1 — scaffold: two LARVA / GROUP column headers */}
      <Fade on={beat >= 1} delay={dl(1, 0.2)}>
        <T x={90} y={118} size={12} fill={INK} weight={700} anchor="start" script={false}>
          {t("LARVA", "LARVA")}
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 0.4)}>
        <T x={330} y={118} size={12} fill={INK} weight={700} anchor="start" script={false}>
          {t("GROUP", "GROUP")}
        </T>
      </Fade>
      <Draw on={beat >= 1} delay={dl(1, 0.7)} d="M 90 126 L 500 126" stroke={MUTED} sw={1.4} dur={0.4} />

      <Fade on={beat >= 1} delay={dl(1, 1.2)}>
        <T x={610} y={118} size={12} fill={INK} weight={700} anchor="start" script={false}>
          {t("LARVA", "LARVA")}
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1.4)}>
        <T x={850} y={118} size={12} fill={INK} weight={700} anchor="start" script={false}>
          {t("GROUP", "GROUP")}
        </T>
      </Fade>
      <Draw on={beat >= 1} delay={dl(1, 1.7)} d="M 610 126 L 1020 126" stroke={MUTED} sw={1.4} dur={0.4} />

      {/* beat 2 — planula */}
      <Fade on={beat >= 2} delay={dl(2, 0.2)}>
        <T x={90} y={160} size={14} fill={INK} weight={700} anchor="start" script={false}>
          {t("planula", "planula")}
        </T>
      </Fade>
      <Draw on={beat >= 2} delay={dl(2, 0.6)} d={arrowD(147, 156, 284, 156)} stroke={AMBER_DARK} sw={1.6} dur={0.4} />
      <Fade on={beat >= 2} delay={dl(2, 1)}>
        <T x={292} y={160} size={13} fill={AMBER_DARK} weight={700} anchor="start" script={false}>
          {t("Cnidaria", "Cnidaria")}
        </T>
      </Fade>

      {/* beat 3 — trochophore + veliger */}
      <Fade on={beat >= 3} delay={dl(3, 0.2)}>
        <T x={90} y={230} size={14} fill={INK} weight={700} anchor="start" script={false}>
          {t("trochophore", "trochophore")}
        </T>
      </Fade>
      <Draw on={beat >= 3} delay={dl(3, 0.6)} d={arrowD(175, 226, 284, 226)} stroke={AMBER_DARK} sw={1.6} dur={0.4} />
      <Fade on={beat >= 3} delay={dl(3, 1)}>
        <T x={292} y={230} size={13} fill={AMBER_DARK} weight={700} anchor="start" script={false}>
          {t("Annelida & Mollusca", "Annelida & Mollusca")}
        </T>
      </Fade>

      <Fade on={beat >= 3} delay={dl(3, 1.8)}>
        <T x={90} y={300} size={14} fill={INK} weight={700} anchor="start" script={false}>
          {t("veliger", "veliger")}
        </T>
      </Fade>
      <Draw on={beat >= 3} delay={dl(3, 2.2)} d={arrowD(147, 296, 284, 296)} stroke={AMBER_DARK} sw={1.6} dur={0.4} />
      <Fade on={beat >= 3} delay={dl(3, 2.6)}>
        <T x={292} y={300} size={13} fill={AMBER_DARK} weight={700} anchor="start" script={false}>
          {t("Mollusca ONLY", "Mollusca ONLY")}
        </T>
      </Fade>

      {/* beat 4 — bipinnaria */}
      <Fade on={beat >= 4} delay={dl(4, 0.2)}>
        <T x={610} y={160} size={14} fill={INK} weight={700} anchor="start" script={false}>
          {t("bipinnaria", "bipinnaria")}
        </T>
      </Fade>
      <Draw on={beat >= 4} delay={dl(4, 0.6)} d={arrowD(688, 156, 799, 156)} stroke={AMBER_DARK} sw={1.6} dur={0.4} />
      <Fade on={beat >= 4} delay={dl(4, 1)}>
        <T x={807} y={160} size={13} fill={AMBER_DARK} weight={700} anchor="start" script={false}>
          {t("Echinodermata", "Echinodermata")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.4)}>
        <T x={807} y={178} size={10} fill={MUTED} anchor="start" script>
          {t("· Asterias, the starfish", "· Asterias, yaani starfish")}
        </T>
      </Fade>

      {/* beat 5 — tadpole + ammocoete */}
      <Fade on={beat >= 5} delay={dl(5, 0.2)}>
        <T x={610} y={230} size={14} fill={INK} weight={700} anchor="start" script={false}>
          {t("tadpole", "tadpole")}
        </T>
      </Fade>
      <Draw on={beat >= 5} delay={dl(5, 0.6)} d={arrowD(667, 226, 799, 226)} stroke={AMBER_DARK} sw={1.6} dur={0.4} />
      <Fade on={beat >= 5} delay={dl(5, 1)}>
        <T x={807} y={230} size={13} fill={AMBER_DARK} weight={700} anchor="start" script={false}>
          {t("Amphibia", "Amphibia")}
        </T>
      </Fade>

      <Fade on={beat >= 5} delay={dl(5, 1.8)}>
        <T x={610} y={300} size={14} fill={INK} weight={700} anchor="start" script={false}>
          {t("ammocoete", "ammocoete")}
        </T>
      </Fade>
      <Draw on={beat >= 5} delay={dl(5, 2.2)} d={arrowD(681, 296, 799, 296)} stroke={AMBER_DARK} sw={1.6} dur={0.4} />
      <Fade on={beat >= 5} delay={dl(5, 2.6)}>
        <T x={807} y={300} size={13} fill={AMBER_DARK} weight={700} anchor="start" script={false}>
          {t("Cyclostomata", "Cyclostomata")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 3)}>
        <T x={807} y={318} size={10} fill={MUTED} anchor="start" script>
          {t("· Petromyzon", "· Petromyzon")}
        </T>
      </Fade>

      {/* beat 6 — the shared-larva trap */}
      <Draw on={beat >= 6} delay={dl(6, 0.2)} d={ringD(256, 226, 180, 20)} stroke={RED} sw={1.8} dur={0.7} />
      <Fade on={beat >= 6} delay={dl(6, 1)}>
        <Chip x={140} y={384} w={800} h={32} fill={CREAM} stroke={RED} textFill={RED} size={12} script={false}>
          {t(
            "TRAP: trochophore = 2 phyla (Annelida + Mollusca) — need a 2nd clue (shell / segment)",
            "TRAP: trochophore = 2 phyla (Annelida + Mollusca) — dusra clue chahiye (shell / segment)"
          )}
        </Chip>
      </Fade>

      {/* beat 7 — closing distinction + SIGNATURE */}
      <Fade on={beat >= 7} delay={dl(7, 0.2)}>
        <T x={540} y={480} size={12} fill={INK} weight={700} anchor="middle" script={false}>
          {t(
            "a named larva = a name-tag on its group; having a larva at all = INDIRECT development",
            "naam wala larva apne group ka name-tag hai; larva ka hona hi INDIRECT development dikhata hai"
          )}
        </T>
      </Fade>
      <Draw on={beat >= 7} delay={dl(7, 0.9)} d={roundedBoxD(100, 496, 880, 36)} stroke={AMBER} sw={2} dur={0.7} />
      <Fade on={beat >= 7} delay={dl(7, 1.6)}>
        <Chip x={105} y={502} w={870} h={24} fill={INK} textFill={CREAM} size={12} script={false}>
          {t(
            "SIGNATURE: 6 larvae, 6 groups — a named larva = indirect development",
            "SIGNATURE: 6 larvae, 6 groups — naam wala larva = indirect development"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
