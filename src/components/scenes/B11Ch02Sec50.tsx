"use client";

/**
 * B11 Ch02 · Section 50 — "The diagnostic table, and why they sit outside"
 * Canvas 1080×620 · safe x36–1044, y30–596. Table pattern mirrors Sec40.
 *
 * Beats (en [0, 7.0, 19.8, 34.82, 49.07, 57.94, 72.28, 94.63]):
 *  0 title
 *  1 grid + headers + Agent/Made-of columns fill (all 3 rows) + the
 *    2 highlighted columns (Nucleic acid / Protein coat) boxed amber
 *  2 question 1: Virus vs Viroid — protein coat? Nucleic-acid+Coat cells
 *    for VIRUS+VIROID fill, Coat column boxed for those 2 rows
 *  3 question 2: Viroid vs Prion — nucleic acid? Nucleic-acid+Coat cells
 *    for PRION fill, Nucleic-acid column boxed for those 2 rows, Example
 *    disease column fills for all 3 rows (de-emphasised — "never need to
 *    memorise the disease lists")
 *  4 transition: the other half — why kept out of the 5 kingdoms at all
 *  5 Whittaker's 3 criteria as chips — "try them on a virus"
 *  6 cross out all 3 — no cell membrane/cytoplasm/organelles, no cell
 *    type to slot it against
 *  7 conclusion: viroids/prions even more reduced, same logic — verdict
 *    stamp: excluded BY THE LOGIC of the scheme, not by accident
 *
 * Layout plan:
 *  b1  grid                   | Draw          | x100..980 y100..320
 *  b1  highlight box (2 cols) | Draw AMBER    | x390..710 y100..320
 *  b1  headers (13 weight700) | T mid         | y125, centers 155/300/475/635/845
 *  b1  Agent+MadeOf cols      | T mid         | y175/235/295, x155 & x300
 *  b2  NucAcid+Coat (rows1-2) | T mid         | y175/235, x475 & x635
 *  b2  emphasis box (Coat)    | Draw AMBER    | x560..710 y140..260
 *  b3  NucAcid+Coat (row3)    | T mid         | y295, x475 & x635
 *  b3  emphasis box (NucAcid) | Draw AMBER    | x390..560 y200..320
 *  b3  Disease col (3 rows)   | T mid size10  | x845, y175/235/295
 *  b2/3 caption slot (beat===k)| T mid script  | x540 y348
 *  b4  transition (persists)   | T mid script GREEN | x540 y348
 *  b5  intro line               | T mid script INK   | x540 y384
 *  b5  3 criteria chips          | Chip                | x170/450/730 y400 w180 h32
 *  b6  cross-outs on 3 chips     | Draw crossD RED     | over each chip
 *  b6  fact line                 | T mid script RED    | x540 y462
 *  b7  conclusion line            | T mid script INK    | x540 y496
 *  b7  verdict stamp               | Chip fill INK        | x260..820 y514..554
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
  crossD,
  INK,
  MUTED,
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
} from "./kit";

const CRITERIA = [
  { x: 170, en: "cell structure", hi: "cell structure" },
  { x: 450, en: "body organisation", hi: "body organisation" },
  { x: 730, en: "nutrition", hi: "nutrition" },
];

function gridPath(): string {
  let d = "M 100 100 H 980 V 320 H 100 Z";
  d += " M 210 100 V 320 M 390 100 V 320 M 560 100 V 320 M 710 100 V 320";
  d += " M 100 140 H 980 M 100 200 H 980 M 100 260 H 980";
  return d;
}

export default function B11Ch02Sec50({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={52} size={15} fill={RED} script>
          {t("virus vs viroid vs prion — the diagnostic table", "virus vs viroid vs prion — diagnostic table")}
        </T>
      </Fade>

      {/* beat 1 — grid + headers + Agent/Made-of columns */}
      <Draw on={beat >= 1} delay={dl(1, 0.3)} d={gridPath()} stroke={INK} sw={2} dur={1} />
      <Draw
        on={beat >= 1}
        delay={dl(1, 1.3)}
        d="M 390 100 h 320 v 220 h -320 z"
        stroke={AMBER_DARK}
        sw={2.2}
        dur={0.8}
      />
      <Fade on={beat >= 1} delay={dl(1, 2)}>
        <T x={155} y={125} size={13} fill={INK} weight={700}>
          {t("Agent", "Agent")}
        </T>
        <T x={300} y={125} size={13} fill={INK} weight={700}>
          {t("Made of", "Made of")}
        </T>
        <T x={475} y={125} size={13} fill={AMBER_DARK} weight={700}>
          {t("Nucleic acid", "Nucleic acid")}
        </T>
        <T x={635} y={125} size={13} fill={AMBER_DARK} weight={700}>
          {t("Protein coat", "Protein coat")}
        </T>
        <T x={845} y={125} size={12} fill={INK} weight={700}>
          {t("Example disease", "Example disease")}
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 2.4)}>
        <T x={155} y={175} size={13} fill={GREEN} weight={700}>
          VIRUS
        </T>
        <T x={155} y={235} size={13} fill={AMBER_DARK} weight={700}>
          VIROID
        </T>
        <T x={155} y={295} size={13} fill={INK} weight={700}>
          PRION
        </T>
        <T x={300} y={175} size={11} fill={INK}>
          {t("nucleoprotein", "nucleoprotein")}
        </T>
        <T x={300} y={235} size={11} fill={INK}>
          {t("free RNA", "free RNA")}
        </T>
        <T x={300} y={295} size={11} fill={INK}>
          {t("protein only", "protein only")}
        </T>
      </Fade>

      {/* beat 2 — question 1: protein coat? (Virus vs Viroid) */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={475} y={175} size={12} fill={AMBER_DARK} weight={700}>
          {t("DNA or RNA", "DNA or RNA")}
        </T>
        <T x={635} y={175} size={12} fill={GREEN} weight={700}>
          {t("present", "present")}
        </T>
        <T x={475} y={235} size={12} fill={AMBER_DARK} weight={700}>
          {t("RNA only", "RNA only")}
        </T>
        <T x={635} y={235} size={12} fill={RED} weight={700}>
          ABSENT
        </T>
      </Fade>
      <Draw
        on={beat >= 2}
        delay={dl(2, 1.1)}
        d="M 560 140 h 150 v 120 h -150 z"
        stroke={AMBER_DARK}
        sw={2}
        dur={0.7}
      />
      <Fade on={beat === 2} delay={dl(2, 1.9)}>
        <T x={540} y={348} size={12} fill={AMBER_DARK} script>
          {t(
            "protein coat: present in Virus, ABSENT in Viroid — the whole difference",
            "protein coat: Virus mein present, Viroid mein ABSENT — bas yahi fark"
          )}
        </T>
      </Fade>

      {/* beat 3 — question 2: nucleic acid? (Viroid vs Prion) + disease col */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={475} y={295} size={12} fill={RED} weight={700}>
          NONE
        </T>
        <T x={635} y={295} size={11} fill={INK}>
          {t("— (is protein)", "— (protein hi hai)")}
        </T>
      </Fade>
      <Draw
        on={beat >= 3}
        delay={dl(3, 0.9)}
        d="M 390 200 h 170 v 120 h -170 z"
        stroke={AMBER_DARK}
        sw={2}
        dur={0.7}
      />
      <Fade on={beat >= 3} delay={dl(3, 1.6)}>
        <T x={845} y={175} size={10} fill={MUTED}>
          {t("mumps, flu, AIDS", "mumps, flu, AIDS")}
        </T>
        <T x={845} y={235} size={10} fill={MUTED}>
          {t("potato spindle tuber", "potato spindle tuber")}
        </T>
        <T x={845} y={295} size={10} fill={MUTED}>
          {t("mad-cow, CJD, kuru", "mad-cow, CJD, kuru")}
        </T>
      </Fade>
      <Fade on={beat === 3} delay={dl(3, 2.2)}>
        <T x={540} y={348} size={12} fill={AMBER_DARK} script>
          {t(
            "nucleic acid: RNA in Viroid, NONE in Prion — 2 questions, 3 agents separated",
            "nucleic acid: Viroid mein RNA, Prion mein NONE — 2 sawaal, 3 agents alag"
          )}
        </T>
      </Fade>

      {/* beat 4 — transition (persists through the close) */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={540} y={348} size={12} fill={GREEN} script>
          {t(
            "the other half — why kept out of the five kingdoms at all?",
            "doosra aadha — inhe paanch kingdoms se bahar kyun rakha jaata?"
          )}
        </T>
      </Fade>

      {/* beat 5 — Whittaker's 3 criteria */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={540} y={384} size={11} fill={INK} script>
          {t(
            "Whittaker classifies cellular life by 3 criteria — try them on a virus:",
            "Whittaker cellular life ko 3 criteria se classify karta — inhe virus par try karo:"
          )}
        </T>
      </Fade>
      {CRITERIA.map((c, i) => (
        <Fade key={c.x} on={beat >= 5} delay={dl(5, 1 + i * 0.3)}>
          <Chip x={c.x} y={400} w={180} h={32} fill={CREAM} stroke={INK} textFill={INK} size={12} script={false}>
            {t(c.en, c.hi)}
          </Chip>
        </Fade>
      ))}

      {/* beat 6 — you can't: cross out + the reason */}
      {CRITERIA.map((c, i) => (
        <Draw
          key={c.x}
          on={beat >= 6}
          delay={dl(6, 0.2 + i * 0.3)}
          d={crossD(c.x, 400, 180, 32)}
          stroke={RED}
          sw={2.2}
          dur={0.5}
        />
      ))}
      <Fade on={beat >= 6} delay={dl(6, 1.3)}>
        <T x={540} y={462} size={11} fill={RED} script>
          {t(
            "no cell membrane, no cytoplasm, no organelles — no “cell type” to slot it against",
            "na cell membrane, na cytoplasm, na organelles — koi 'cell type' hi nahi jahan use rakhein"
          )}
        </T>
      </Fade>

      {/* beat 7 — conclusion + verdict stamp */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={540} y={496} size={11} fill={INK} script>
          {t(
            "viroids & prions are even more reduced — same logic applies",
            "viroids aur prions to aur bhi chhante hue hain — wahi logic lagta hai"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1)}>
        <Chip x={260} y={514} w={560} h={40} fill={INK} textFill={CREAM} size={12} script={false}>
          {t(
            "excluded BY THE LOGIC of the scheme — not unclassified by accident",
            "scheme ke LOGIC se hi bahar — accident se unclassified nahi"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
