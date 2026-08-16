"use client";

/**
 * B11 Ch02 · Section 49 — "The strip-down ladder" (subtopic 5 continues)
 * Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0, 6.57, 17.24, 27.99, 41.73, 46.93, 67.41, 84.22]):
 *  0 title
 *  1 virus already stripped-down / viroid more minimal -> VIRUS box lands
 *  2 viroid = naked RNA, no coat -> VIROID box + "-coat" arrow land
 *  3 prion strips further, pure protein -> PRION box + "-acid" arrow land
 *  4 "the board lines them up" transition + decorative underline squiggle
 *  5 the reading: coat+acid / acid only / protein only captions land
 *  6 insight: each step throws something away, yet stays infectious
 *  7 housekeeping aside: Lichens are alive+cellular, bundled in anyway
 *
 * Layout plan — a literal descending staircase, 3 columns that never share
 * x-range so their vertically-overlapping boxes never collide:
 *  b1  VIRUS box (GREEN)    | Draw rect         | x70..330  y250..360
 *  b1  VIRUS header/chips    | T/Chip             | inside, y278..350
 *  b2  VIROID box (AMBER_DARK)| Draw rect        | x400..660 y310..420
 *  b2  VIROID header/chip     | T/Chip             | inside, y338..378
 *  b2  arrow1 "-coat"         | Draw arrowD        | (330,305)->(400,365)
 *  b3  PRION box (INK)        | Draw rect          | x730..990 y370..480
 *  b3  PRION header/chip       | T/Chip             | inside, y398..438
 *  b3  arrow2 "-acid"          | Draw arrowD         | (660,365)->(730,425)
 *  b4  transition line          | T mid script GREEN  | x540 y222
 *  b4  squiggle underline        | Draw path GREEN     | x400..680 y234
 *  b5  3 below-box captions       | T mid weight700      | y384 / y444 / y504
 *  b6  insight line                | T mid script GREEN   | x349..732 y544
 *  b7  lichens aside                | T mid script MUTED   | x286..794 y578
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

export default function B11Ch02Sec49({ currentTime, reveals, language }: SceneProps) {
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
            "the strip-down ladder — how little does an infectious agent need?",
            "strip-down ladder — ek infectious agent ko kitna kam chahiye?"
          )}
        </T>
      </Fade>

      {/* beat 1 — virus already stripped-down, viroid more minimal */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={540} y={100} size={11} fill={INK} script>
          {t(
            "a virus is already a stripped-down packet: instructions in a coat",
            "virus pehle se ek chhata packet hai: coat mein instructions"
          )}
        </T>
      </Fade>
      <Draw
        on={beat >= 1}
        delay={dl(1, 1)}
        d="M 70 250 h 260 v 110 h -260 z"
        stroke={GREEN}
        sw={2}
        dur={0.7}
        fill={GREEN}
      />
      <Fade on={beat >= 1} delay={dl(1, 1.7)}>
        <T x={200} y={278} size={16} fill="#fff" weight={800}>
          VIRUS
        </T>
        <Chip x={110} y={292} w={180} h={26} fill={PAPER} stroke={GREEN} textFill={GREEN} size={10} script={false}>
          {t("protein coat", "protein coat")}
        </Chip>
        <Chip x={120} y={326} w={160} h={24} fill={CREAM} stroke={AMBER_DARK} textFill={AMBER_DARK} size={10} script={false}>
          {t("nucleic acid", "nucleic acid")}
        </Chip>
      </Fade>

      {/* beat 2 — viroid: naked RNA, no coat */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={540} y={126} size={11} fill={INK} script>
          {t(
            "a viroid is just naked RNA — no protein coat at all",
            "viroid bas nanga RNA hai — koi protein coat nahi"
          )}
        </T>
      </Fade>
      <Draw
        on={beat >= 2}
        delay={dl(2, 1)}
        d={arrowD(330, 305, 400, 365)}
        stroke={AMBER_DARK}
        sw={2}
        dur={0.4}
      />
      <Fade on={beat >= 2} delay={dl(2, 1.4)}>
        <T x={365} y={328} size={10} fill={AMBER_DARK} weight={700}>
          − coat
        </T>
      </Fade>
      <Draw
        on={beat >= 2}
        delay={dl(2, 1.7)}
        d="M 400 310 h 260 v 110 h -260 z"
        stroke={AMBER_DARK}
        sw={2}
        dur={0.7}
        fill={AMBER_DARK}
      />
      <Fade on={beat >= 2} delay={dl(2, 2.4)}>
        <T x={530} y={338} size={16} fill="#fff" weight={800}>
          VIROID
        </T>
        <Chip x={460} y={352} w={140} h={26} fill={PAPER} stroke={AMBER_DARK} textFill={AMBER_DARK} size={10} script={false}>
          {t("free RNA", "free RNA")}
        </Chip>
      </Fade>

      {/* beat 3 — prion: pure protein, no nucleic acid */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={540} y={152} size={11} fill={INK} script>
          {t(
            "a prion strips further still — pure protein, no nucleic acid",
            "prion aur aage chhaant deta — sirf protein, koi nucleic acid nahi"
          )}
        </T>
      </Fade>
      <Draw
        on={beat >= 3}
        delay={dl(3, 1)}
        d={arrowD(660, 365, 730, 425)}
        stroke={INK}
        sw={2}
        dur={0.4}
      />
      <Fade on={beat >= 3} delay={dl(3, 1.4)}>
        <T x={695} y={388} size={10} fill={INK} weight={700}>
          − acid
        </T>
      </Fade>
      <Draw
        on={beat >= 3}
        delay={dl(3, 1.7)}
        d="M 730 370 h 260 v 110 h -260 z"
        stroke={INK}
        sw={2}
        dur={0.7}
        fill={INK}
      />
      <Fade on={beat >= 3} delay={dl(3, 2.4)}>
        <T x={860} y={398} size={16} fill={CREAM} weight={800}>
          PRION
        </T>
        <Chip x={790} y={412} w={140} h={26} fill={PAPER} stroke={INK} textFill={INK} size={10} script={false}>
          {t("protein only", "protein only")}
        </Chip>
      </Fade>

      {/* beat 4 — the board lines them up */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <T x={540} y={222} size={12} fill={GREEN} script>
          {t(
            "the board lines them up — a ladder going down",
            "board inhe qatar mein rakhta — neeche jaati seedhi jaisi"
          )}
        </T>
      </Fade>
      <Draw
        on={beat >= 4}
        delay={dl(4, 1)}
        d="M 400 234 q 35 8 70 0 q 35 -8 70 0 q 35 8 70 0 q 35 -8 70 0"
        stroke={GREEN}
        sw={1.8}
        dur={0.8}
      />

      {/* beat 5 — the reading: coat+acid / acid only / protein only */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={200} y={384} size={11} fill={GREEN} weight={700}>
          {t("coat + acid", "coat + acid")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={530} y={444} size={11} fill={AMBER_DARK} weight={700}>
          {t("acid only, no coat", "acid only, no coat")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1.3)}>
        <T x={860} y={504} size={11} fill={INK} weight={700}>
          {t("protein only, NO acid", "protein only, NO acid")}
        </T>
      </Fade>

      {/* beat 6 — the insight */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={544} size={12} fill={GREEN} script>
          {t(
            "each step throws something away — yet remains infectious",
            "har step kuch chhod deta hai — phir bhi infectious rehta hai"
          )}
        </T>
      </Fade>

      {/* beat 7 — lichens housekeeping aside */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={540} y={578} size={11} fill={MUTED} script>
          {t(
            "aside: Lichens ARE alive & cellular — just don't fit one kingdom either (more soon)",
            "note: Lichens zinda aur cellular hain — bas ek kingdom mein fit nahi hote (aage aayega)"
          )}
        </T>
      </Fade>
    </svg>
  );
}
