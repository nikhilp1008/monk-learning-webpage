"use client";

/**
 * B11 Ch05 · Section 6 — "The three root systems: tap, fibrous, adventitious"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 *
 * Beats (en [0, 8.7, 20.82, 36.1, 50.26, 61.27, 73.13, 88.15]
 *        hi [0, 8.28, 21.16, 36.27, 48.9, 60.67, 72.11, 85.16]):
 *  0 title + hook: three types, read left to right [dim@1]
 *  1 DIAGRAM: three-column frame opens — TAP | FIBROUS | ADVENTITIOUS
 *  2 TAP: one main root + laterals icon · from radicle, dicots, MUSTARD
 *  3 FIBROUS: many fine roots from the base icon · stem base, monocots, WHEAT
 *  4 ADVENTITIOUS: roots from a stem's side icon · anywhere but radicle ·
 *    grass/banyan/Monstera/maize
 *  5 the classifier is ORIGIN, not appearance
 *  6 tap vs fibrous read as opposites (keep the radicle vs let it go)
 *  7 verdict: adventitious is defined by NEGATION — why it spans grass,
 *    banyan, maize without contradiction
 *
 * Layout plan (Kalam bl−1.3s..+0.5s · Anek bl−0.78s..+0.31s). Thirds guide:
 * TAP_CX=210, FIBROUS_CX=540, ADV_CX=870; dividers x=375/705.
 *  b0 | title (script24 red)          | T mid  | x?..? y30..76 (bl63)
 *  b0 | underline                     | Draw   | y77 x330..750
 *  b0 | hook (script14 muted)         | T mid  | x?..? y88..110 (bl102) [dim@1]
 *  b1 | 2 dividers                    | Draw   | x375/705 y150..335
 *  b1 | "TAP" (16 amber-d)            | T mid  | x?..? y143..160 (bl155)
 *  b1 | "FIBROUS" (16 green)          | T mid  | x?..? y143..160 (bl155)
 *  b1 | "ADVENTITIOUS" (15 red)       | T mid  | x?..? y144..160 (bl155)
 *  b2 | taproot icon                  | Draw   | x175..245 y180..282
 *  b2 | "from radicle · dicots"       | T mid  | x120..300 y293..307 (bl300)
 *  b2 | "e.g. MUSTARD"                | T mid  | x?..? y314..328 (bl320)
 *  b3 | fibrous-root icon             | Draw   | x505..575 y180..282
 *  b3 | "from stem base · monocots"   | T mid  | x450..630 y293..307 (bl300)
 *  b3 | "e.g. WHEAT"                  | T mid  | x?..? y314..328 (bl320)
 *  b4 | node-with-roots icon          | Draw   | x825..915 y195..238
 *  b4 | "from ANYWHERE but radicle"   | T mid  | x?..? y293..307 (bl300)
 *  b4 | "grass·banyan·Monstera·maize" | T mid  | x779..961 y313..327 (bl320)
 *  b5 | classifier statement (16 red) | T mid  | x?..? y359..375 (bl365)
 *  b5 | underline                     | Draw   | y378 x400..680
 *  b6 | opposites line (13 ink script)| T mid  | x?..? y399..421 (bl415)
 *  b6 | double-headed arrow           | Draw   | x400..680 y419..431
 *  b7 | verdict chip (15 ink/cream)   | Chip   | x240..840 y460..496
 *  b7 | closing (script13 green)      | T mid  | x?..? y502..524 (bl515)
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

export default function B11Ch05Sec6({ currentTime, reveals, language }: SceneProps) {
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
        <T x={540} y={63} size={24} fill={RED} script>
          {t("the three root systems", "teen root systems")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 0.3)} d="M 330 77 C 420 74, 660 74, 750 77" stroke={RED} sw={2.2} dur={0.6} />
      <Fade on={beat >= 0} dim={beat >= 1} delay={dl(0, 1.4)}>
        <T x={540} y={102} size={14} fill={MUTED} script>
          {t("three types — read the board left to right", "teen types — board ko baaye se daaye padhiye")}
        </T>
      </Fade>

      {/* beat 1 — three-column frame opens */}
      <Draw on={beat >= 1} delay={dl(1, 0.3)} d="M 375 150 L 375 335" stroke={INK} sw={1.6} dur={0.7} />
      <Draw on={beat >= 1} delay={dl(1, 0.6)} d="M 705 150 L 705 335" stroke={INK} sw={1.6} dur={0.7} />
      <Fade on={beat >= 1} delay={dl(1, 1.3)}>
        <T x={210} y={155} size={16} fill={AMBER_DARK} weight={700}>
          TAP
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1.6)}>
        <T x={540} y={155} size={16} fill={GREEN} weight={700}>
          FIBROUS
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1.9)}>
        <T x={870} y={155} size={15} fill={RED} weight={700}>
          ADVENTITIOUS
        </T>
      </Fade>

      {/* beat 2 — TAP: one main root + laterals */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <Draw
          on={true}
          d="M 210 185 C 205 220, 215 250, 208 282 M 210 205 L 186 197 M 210 205 L 233 199 M 210 235 L 188 231 M 210 235 L 231 229 M 209 262 L 190 260 M 209 262 L 227 257"
          stroke={AMBER_DARK}
          sw={2}
          dur={1}
        />
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 1.6)}>
        <T x={210} y={300} size={12} fill={INK}>
          {t("from the radicle · dicots", "radicle se · dicots")}
        </T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 2.3)}>
        <T x={210} y={320} size={13} fill={AMBER_DARK} weight={700}>
          {t("e.g. MUSTARD", "e.g. MUSTARD")}
        </T>
      </Fade>

      {/* beat 3 — FIBROUS: many fine roots from the base */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <Draw
          on={true}
          d="M 540 185 L 522 280 M 540 185 L 531 282 M 540 185 L 540 284 M 540 185 L 549 282 M 540 185 L 558 280 M 540 185 L 512 262 M 540 185 L 568 262"
          stroke={GREEN}
          sw={1.8}
          dur={1}
        />
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 1.6)}>
        <T x={540} y={300} size={12} fill={INK}>
          {t("from the stem base · monocots", "stem ke base se · monocots")}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 2.3)}>
        <T x={540} y={320} size={13} fill={GREEN} weight={700}>
          {t("e.g. WHEAT", "e.g. WHEAT")}
        </T>
      </Fade>

      {/* beat 4 — ADVENTITIOUS: roots from a stem's side, not the radicle */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <Draw
          on={true}
          d="M 830 200 L 910 200 M 850 200 L 845 232 M 850 200 L 856 230 M 882 200 L 877 236 M 882 200 L 889 233"
          stroke={RED}
          sw={1.8}
          dur={1}
        />
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.6)}>
        <T x={870} y={300} size={11} fill={INK}>
          {t("from ANYWHERE but the radicle", "kahin se bhi, radicle se nahi")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 2.3)}>
        <T x={870} y={320} size={11} fill={RED} weight={700}>
          {t("grass · banyan · Monstera · maize", "grass · banyan · Monstera · maize")}
        </T>
      </Fade>

      {/* beat 5 — the classifier is origin, not appearance */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={540} y={365} size={16} fill={RED} weight={700}>
          {t("the classifier is ORIGIN, not appearance", "classifier hai ORIGIN, appearance nahi")}
        </T>
      </Fade>
      <Draw on={beat >= 5} delay={dl(5, 1.2)} d="M 400 378 C 460 375, 620 375, 680 378" stroke={RED} sw={1.8} dur={0.5} />

      {/* beat 6 — tap and fibrous read as opposites */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={415} size={13} fill={INK} script>
          {t(
            "tap keeps the radicle & builds — fibrous lets it go, starts fresh from the base",
            "tap radicle ko rakhta hai — fibrous usse chhod deta, base se fresh shuru karta"
          )}
        </T>
      </Fade>
      <Draw
        on={beat >= 6}
        delay={dl(6, 1.6)}
        d="M 400 430 L 680 430 M 415 424 L 400 430 L 415 436 M 665 424 L 680 430 L 665 436"
        stroke={INK}
        sw={1.8}
        dur={0.6}
      />

      {/* beat 7 — verdict: adventitious defined by negation */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <Chip x={240} y={460} w={600} h={36} fill={INK} textFill={CREAM} size={15} script={false}>
          {t(
            "ADVENTITIOUS = defined by NEGATION — “not from the radicle”",
            "ADVENTITIOUS = NEGATION se define — “radicle se nahi”"
          )}
        </Chip>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.3)}>
        <T x={540} y={515} size={13} fill={GREEN} script>
          {t(
            "that's why it spans a grass, a banyan AND a maize — no contradiction",
            "isiliye ek grass, ek banyan AUR ek maize — sab fit ho jaate hain"
          )}
        </T>
      </Fade>
    </svg>
  );
}
