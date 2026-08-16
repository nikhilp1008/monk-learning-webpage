"use client";

/**
 * B11 Ch02 · Section 48 — "Stepping off the edge of the cellular world"
 * (opens subtopic 5: Viruses, Viroids, Prions & Lichens) Canvas 1080×620 ·
 * safe x36–1044, y30–596.
 *
 * Beats (en [0, 11.43, 25.17, 45.31, 53.5, 77.91, 96.17, 109.91]):
 *  0 title / everything so far has been a cell — now we step off that edge
 *  1 acellular fact -> no place in Whittaker's five kingdoms
 *  2 borderland between living/non-living, no wall/nucleus to check
 *  3 the pen-drive image introduced
 *  4 LEFT card: unplugged pen-drive (outside host) — inert, crystallisable,
 *    virus definition, "behaves NON-LIVING"
 *  5 arrow "plug it in" + RIGHT card: plugged in (inside host) — hijacks
 *    machinery, obligate intracellular parasite, "behaves LIVING"
 *  6 shared fact banner: no ribosomes/enzymes/metabolism of their own
 *  7 verdict stamp: NON-LIVING outside -> LIVING inside + exam-priority line
 *
 * Layout plan:
 *  b0  title            | T mid script RED      | x~300..780 y31..60
 *  b1  fact line          | T mid script INK      | x~336..744 y94..114
 *  b1  consequence(red)   | T mid script RED      | x~360..720 y130..150
 *  b2  borderland line    | T mid script INK      | x~283..797 y170..190
 *  b3  pen-drive intro     | T mid script GREEN    | x~370..710 y210..230
 *  b4  LEFT card box       | Draw rect CREAM/MUTED | x70..500  y270..468
 *  b4  LEFT icon+connector | rect+rect PAPER/INK   | x205..371 y312..338
 *  b4  LEFT 5 text rows    | T mid (various)       | inside card, y360..452
 *  b5  arrow                | Draw arrowD AMBER_DARK| (500,349)->(580,349)
 *  b5  arrow label           | T mid AMBER_DARK      | x540 y333
 *  b5  RIGHT card box        | Draw rect CREAM/MUTED | x580..1010 y270..468
 *  b5  RIGHT icon+connector  | rect+rect PAPER/INK   | x715..881 y312..338
 *  b5  RIGHT 4 text rows     | T mid (various)       | inside card, y360..430
 *  b6  banner chip            | Chip fill AMBER_DARK  | x70..1010 y472..504
 *  b7  verdict stamp chip     | Chip fill INK         | x310..770 y514..554
 *  b7  exam-priority subline  | T mid script RED      | x~328..752 y564..584
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
  INK,
  MUTED,
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
  PAPER,
} from "./kit";

export default function B11Ch02Sec48({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={52} size={16} fill={RED} script>
          {t(
            "life at the edges — viruses, viroids & prions",
            "life ke edges par — viruses, viroids & prions"
          )}
        </T>
      </Fade>

      {/* beat 1 — acellular fact */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={540} y={108} size={12} fill={INK} script>
          {t(
            "viruses, viroids & prions are acellular — not made of cells at all",
            "viruses, viroids & prions acellular hain — cells se bane hi nahi"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1)}>
        <T x={540} y={144} size={12} fill={RED} script>
          {t(
            "→ no place in Whittaker's five-kingdom system",
            "→ Whittaker ke five-kingdom system mein koi jagah nahi"
          )}
        </T>
      </Fade>

      {/* beat 2 — borderland */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={540} y={184} size={12} fill={INK} script>
          {t(
            "a strange borderland between living & non-living — no wall, no nucleus to check",
            "zinda aur na-zinda ke beech ek ajeeb sarhad — na wall, na nucleus dhoondhna"
          )}
        </T>
      </Fade>

      {/* beat 3 — pen-drive image */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={540} y={224} size={13} fill={GREEN} script>
          {t(
            "picture it as a pen-drive lying on a table",
            "isse mez par padi ek pen-drive samjho"
          )}
        </T>
      </Fade>

      {/* beat 4 — LEFT card: outside a host */}
      <Draw
        on={beat >= 4}
        delay={dl(4, 0.3)}
        d="M 70 270 h 430 v 198 h -430 z"
        stroke={MUTED}
        sw={1.8}
        dur={0.7}
        fill={CREAM}
      />
      <Fade on={beat >= 4} delay={dl(4, 1)}>
        <T x={285} y={296} size={13} fill={INK} weight={700}>
          {t("OUTSIDE a host", "host ke BAAHAR")}
        </T>
        <rect x={205} y={312} width={150} height={26} rx={4} fill={PAPER} stroke={INK} strokeWidth={1.6} />
        <rect x={355} y={318} width={16} height={14} fill={INK} />
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.6)}>
        <T x={285} y={360} size={10} fill={INK} script>
          {t("an unplugged pen-drive", "pen-drive, unplugged")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 2.1)}>
        <T x={285} y={386} size={11} fill={INK} script>
          {t(
            "no movement, no metabolism, no reproduction on its own",
            "na hilta, na metabolism, na khud se reproduction"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 2.7)}>
        <T x={285} y={408} size={11} fill={RED} weight={700} script>
          {t(
            "can be CRYSTALLISED & shelved — like a chemical",
            "CRYSTALLISE karke chemical jaisa shelf par rakh sakte"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 3.3)}>
        <T x={285} y={430} size={10} fill={INK}>
          {t(
            "the definition: DNA/RNA packet in a protein coat, inert",
            "definition: DNA/RNA packet, protein coat mein, inert"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 3.9)}>
        <T x={285} y={452} size={12} fill={MUTED} weight={800}>
          {t("→ behaves NON-LIVING", "→ NON-LIVING jaisa behave")}
        </T>
      </Fade>

      {/* beat 5 — arrow + RIGHT card: inside a host cell */}
      <Draw
        on={beat >= 5}
        delay={dl(5, 0.2)}
        d={arrowD(500, 349, 580, 349)}
        stroke={AMBER_DARK}
        sw={2.2}
        dur={0.4}
      />
      <Fade on={beat >= 5} delay={dl(5, 0.6)}>
        <T x={540} y={333} size={11} fill={AMBER_DARK} weight={700}>
          {t("plug it in →", "plug karo →")}
        </T>
      </Fade>
      <Draw
        on={beat >= 5}
        delay={dl(5, 1)}
        d="M 580 270 h 430 v 198 h -430 z"
        stroke={MUTED}
        sw={1.8}
        dur={0.7}
        fill={CREAM}
      />
      <Fade on={beat >= 5} delay={dl(5, 1.7)}>
        <T x={795} y={296} size={13} fill={INK} weight={700}>
          {t("INSIDE a host cell", "host cell ke ANDAR")}
        </T>
        <rect x={715} y={312} width={150} height={26} rx={4} fill={PAPER} stroke={AMBER_DARK} strokeWidth={1.6} />
        <rect x={865} y={318} width={16} height={14} fill={AMBER_DARK} />
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 2.3)}>
        <T x={795} y={360} size={10} fill={INK} script>
          {t("plugged in — the program runs", "plug hua — program chalta hai")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 2.8)}>
        <T x={795} y={386} size={11} fill={INK} script>
          {t(
            "hijacks the cell's machinery, makes thousands of copies",
            "cell ki machinery hijack karke hazaaron copies banata hai"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 3.4)}>
        <T x={795} y={408} size={11} fill={GREEN} weight={700} script>
          = obligate intracellular parasite
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 4)}>
        <T x={795} y={430} size={12} fill={GREEN} weight={800}>
          {t("→ behaves LIVING", "→ LIVING jaisa behave")}
        </T>
      </Fade>

      {/* beat 6 — shared fact banner */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <Chip x={70} y={472} w={940} h={32} fill={AMBER_DARK} textFill={CREAM} size={11} script={false}>
          {t(
            "no ribosomes, no enzymes, no metabolism of their own — borrowed machinery is the only machinery they have",
            "na ribosomes, na apne enzymes, na metabolism — udhaar ki machinery hi inki ikalauti machinery hai"
          )}
        </Chip>
      </Fade>

      {/* beat 7 — is a virus alive? */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <Chip x={310} y={514} w={460} h={40} fill={INK} textFill={CREAM} size={13} script={false}>
          {t(
            "NON-LIVING outside a host → LIVING inside one",
            "host ke BAAHAR NON-LIVING → ANDAR LIVING"
          )}
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1)}>
        <T x={540} y={578} size={11} fill={RED} script>
          {t(
            "the exam's #1 idea here — heredity yes, self-sufficient metabolism no",
            "exam ka #1 idea yahi hai — heredity haan, khud ka metabolism nahi"
          )}
        </T>
      </Fade>
    </svg>
  );
}
