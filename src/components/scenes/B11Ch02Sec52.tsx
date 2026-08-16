"use client";

/**
 * B11 Ch02 · Section 52 — "The discovery story" (subtopic 5 continues)
 * Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0, 17.49, 24.49, 43.43, 63.06, 78.59, 96.6, 104.79]):
 *  0 title
 *  1 "the board puts them in time order" + a bare timeline arrow drawn
 *  2 IVANOWSKY card lands (found the tiny agent, passed the filters)
 *  3 arrow + BEIJERINCK card lands (transmits, named Contagium vivum fluidum)
 *  4 arrow + STANLEY card lands (crystallised, TMV first purified)
 *  5 why it mattered: crystallising = a chemical's trick, hard evidence
 *    for the half-alive idea (callback to Sec48)
 *  6 etymology: "virus" = Latin for poison/venom
 *  7 closing line + I-B-S mnemonic stamp
 *
 * Layout plan:
 *  b1  timeline arrow          | Draw arrowD MUTED | (90,170)->(990,170)
 *  b2  IVANOWSKY card (GREEN)   | Draw rect          | x90..310  y180..330
 *  b2  IVANOWSKY text            | T mid               | y210/238/258
 *  b3  arrow1                     | Draw arrowD MUTED     | (310,255)->(430,255)
 *  b3  BEIJERINCK card (AMBER)     | Draw rect              | x430..650 y180..330
 *  b3  BEIJERINCK text               | T mid                   | y210/238/258
 *  b4  arrow2                          | Draw arrowD MUTED         | (650,255)->(770,255)
 *  b4  STANLEY card (INK)                | Draw rect                  | x770..990 y180..330
 *  b4  STANLEY text                        | T mid                       | y210/238/258
 *  b5  conceptual note                       | T mid script GREEN            | x540 y356
 *  b6  etymology line                          | T mid script AMBER_DARK         | x540 y386
 *  b7  closing line                              | T mid script INK                   | x540 y414
 *  b7  I-B-S stamp                                 | Chip fill INK                        | x290..790 y432..470
 */

import React from "react";
import { SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, arrowD, INK, MUTED, AMBER_DARK, GREEN, RED, CREAM } from "./kit";

export default function B11Ch02Sec52({ currentTime, reveals, language }: SceneProps) {
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
          {t("the discovery story — a guaranteed-marks sequence", "discovery story — guaranteed-marks sequence")}
        </T>
      </Fade>

      {/* beat 1 — time order + bare timeline */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={540} y={110} size={12} fill={GREEN} script>
          {t(
            "the board puts them in time order — that's how to store them",
            "board inhe time order mein rakhta — waise hi yaad rakhna"
          )}
        </T>
      </Fade>
      <Draw on={beat >= 1} delay={dl(1, 1)} d={arrowD(90, 160, 990, 160)} stroke={MUTED} sw={1.6} dur={0.9} />

      {/* beat 2 — Ivanowsky */}
      <Draw
        on={beat >= 2}
        delay={dl(2, 0.3)}
        d="M 90 180 h 220 v 150 h -220 z"
        stroke={GREEN}
        sw={2.2}
        dur={0.8}
        fill={GREEN}
      />
      <Fade on={beat >= 2} delay={dl(2, 1.2)}>
        <T x={200} y={210} size={14} fill="#fff" weight={800}>
          IVANOWSKY
        </T>
        <T x={200} y={238} size={9} fill="#fff">
          {t("tiny agent from tobacco", "tambaku se ek chhota agent")}
        </T>
        <T x={200} y={258} size={9} fill="#fff">
          {t("passed bacteria-stopping filters", "bacteria-stopping filters se nikla")}
        </T>
      </Fade>

      {/* beat 3 — Beijerinck */}
      <Draw on={beat >= 3} delay={dl(3, 0.2)} d={arrowD(310, 255, 430, 255)} stroke={MUTED} sw={2} dur={0.4} />
      <Draw
        on={beat >= 3}
        delay={dl(3, 0.7)}
        d="M 430 180 h 220 v 150 h -220 z"
        stroke={AMBER_DARK}
        sw={2.2}
        dur={0.8}
        fill={AMBER_DARK}
      />
      <Fade on={beat >= 3} delay={dl(3, 1.6)}>
        <T x={540} y={210} size={14} fill="#fff" weight={800}>
          BEIJERINCK
        </T>
        <T x={540} y={238} size={9} fill="#fff">
          {t("tobacco extract infects healthy plants", "tambaku extract se healthy paudhe infect hote")}
        </T>
        <T x={540} y={258} size={9} fill="#fff" weight={700}>
          = Contagium vivum fluidum
        </T>
      </Fade>

      {/* beat 4 — Stanley */}
      <Draw on={beat >= 4} delay={dl(4, 0.2)} d={arrowD(650, 255, 770, 255)} stroke={MUTED} sw={2} dur={0.4} />
      <Draw
        on={beat >= 4}
        delay={dl(4, 0.7)}
        d="M 770 180 h 220 v 150 h -220 z"
        stroke={INK}
        sw={2.2}
        dur={0.8}
        fill={INK}
      />
      <Fade on={beat >= 4} delay={dl(4, 1.6)}>
        <T x={880} y={210} size={14} fill={CREAM} weight={800}>
          STANLEY
        </T>
        <T x={880} y={238} size={9} fill={CREAM}>
          {t("viruses can be CRYSTALLISED", "viruses CRYSTALLISE ho sakte")}
        </T>
        <T x={880} y={258} size={9} fill={CREAM}>
          {t("TMV = first virus purified", "TMV = pehla purified virus")}
        </T>
      </Fade>

      {/* beat 5 — why it mattered */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={540} y={356} size={12} fill={GREEN} script>
          {t(
            "crystallising is a chemical's trick — hard evidence for that half-alive idea",
            "crystallise wahi karte jo ek CHEMICAL ke saath — 'half-alive' idea ka pakka saboot"
          )}
        </T>
      </Fade>

      {/* beat 6 — etymology */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={386} size={12} fill={AMBER_DARK} script>
          {t(
            "the word VIRUS itself = Latin for 'poison' or 'venom'",
            "'VIRUS' shabd khud Latin ke 'poison' ya 'venom' se aaya"
          )}
        </T>
      </Fade>

      {/* beat 7 — closing + I-B-S mnemonic */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={540} y={414} size={11} fill={INK} script>
          {t(
            "named the poison before they ever met the thing",
            "cheez se milne se pehle hi zeher ko naam de diya"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1)}>
        <Chip x={290} y={432} w={500} h={38} fill={INK} textFill={CREAM} size={12} script={false}>
          {t(
            "I-B-S: found it · named the fluid · crystallised it",
            "I-B-S: found kiya · fluid naam diya · crystallise kiya"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
