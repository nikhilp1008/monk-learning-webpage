"use client";

/**
 * B11 Ch03 · Section 8 — "What an alga actually is"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md.
 * Opens the "Algae" subtopic (secs 8-22).
 *
 * Beats (en [0, 26.15, 44.98, 65.91, 89.62, 108.8, 128.33, 158.32]):
 *  Phase A — the five-claim definition (beats 0-5, erased at beat 6, `defOn = beat<6`):
 *  0 hook: mandi produce section, sorted by colour not label (dims at b>=1)
 *  1 the 5-claim row: CHLOROPHYLL-BEARING / SIMPLE / THALLOID / AUTOTROPHIC / LARGELY AQUATIC
 *  2 ring claims 1+4 (chlorophyll-bearing, autotrophic) → chlorophyll-a/producer insight + callback flag
 *  3 ring claims 2+3 (simple, thalloid) → Spirogyra filament diagram + no-root/stem/leaf/vascular line
 *  4 ring claim 5 (largely aquatic) → habitat range + "largely ≠ always" insight
 *  5 pin-down: thallus definition in two stacked halves
 *  Phase B — the big picture (beats 6-7, full canvas reused):
 *  6 railway-line diagram: algae = platform one, roots/vessels/seeds not yet built
 *  7 caveat callout: not a tidy monophyletic family tree, an assemblage of exam categories
 *
 * Layout plan (Anek bl−0.78s..+0.31s; script only on title):
 *  always | title (script23 red)            | T mid | y61 (bl~61)
 *  Phase A (on while defOn):
 *  b0 | hook line (12 muted)                 | T mid | y96
 *  b0 | 3 pigment blobs (Fade+Draw filled)    | Draw  | cx210/540/870 cy126 r13
 *  b0 | blob labels (11)                      | T mid | y150
 *  b1 | def-label (13 amber-d)                | T mid | y182
 *  b1 | 5 term chips                          | Chip  | cx160/350/540/730/920 y214 w170 h30
 *  b2 | ring chip1+chip4 (amber-d)             | Draw  | ringD(cx,229,99,27)
 *  b2 | insight (12 green) / flag (11 muted)  | T mid | y270 / y298
 *  b3 | ring chip2+chip3 (amber-d)             | Draw  | ringD(cx,229,99,27)
 *  b3 | filament capsule + ticks (ink)        | Draw  | x420..660 y335..355
 *  b3 | filament label / absence line         | T mid | y378 / y408
 *  b4 | ring chip5 (amber-d)                   | Draw  | ringD(920,229,99,27)
 *  b4 | habitat line (12 ink) / "largely" (12 green) | T mid | y440 / y470
 *  b5 | pin-down header (13 amber-d)          | T mid | y510
 *  b5 | 2 stacked answer chips                | Chip  | x310 y530/566 w460 h24
 *  Phase B (on while beat>=6, full canvas):
 *  b6 | header (13 amber-d)                   | T mid | y110
 *  b6 | railway line + arrowhead (ink)        | Draw  | x150..1000 y280
 *  b6 | platform-1 ALGAE (Fade+Draw filled)   | Draw  | cx150 cy280 r16
 *  b6 | 4 future platforms (ink/muted stroke) | Draw  | cx380/570/760/950 cy280 r8
 *  b6 | ALGAE label / subcaption              | T     | y318 mid / y344 start x100
 *  b6 | future caption                        | T     | y318 start x380
 *  b6 | insight (13 green)                    | T mid | y370
 *  b7 | caveat box outline (red)              | Draw  | x210 y480 w660 h110
 *  b7 | caveat header (13 red)                | T mid | y502
 *  b7 | 2 caveat lines (12 ink)                | T mid | y536 / y568
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
  GREEN,
  RED,
  CREAM,
} from "./kit";

function circleD(cx: number, cy: number, r: number): string {
  return `M ${cx - r} ${cy} A ${r} ${r} 0 1 0 ${cx + r} ${cy} A ${r} ${r} 0 1 0 ${
    cx - r
  } ${cy} Z`;
}

const CHIP_X = [160, 350, 540, 730, 920];
const CHIP_LABELS = [
  "CHLOROPHYLL-BEARING",
  "SIMPLE",
  "THALLOID",
  "AUTOTROPHIC",
  "LARGELY AQUATIC",
];
const CHIP_Y = 214;
const CHIP_W = 170;
const CHIP_H = 30;
const CHIP_CY = CHIP_Y + CHIP_H / 2;

export default function B11Ch03Sec8({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);
  const defOn = beat < 6;

  return (
    <svg
      viewBox="0 0 1080 620"
      preserveAspectRatio="xMidYMin meet"
      className="w-full h-full select-none"
    >
      {/* title — always on */}
      <Fade on={true}>
        <T x={540} y={61} size={23} fill={RED} script>
          {t("what an alga actually is", "ek alga asal mein hota kya hai")}
        </T>
      </Fade>

      {/* ══════════ Phase A — the five-claim definition (beats 0-5) ══════════ */}

      {/* beat 0 — mandi hook */}
      <Fade on={beat >= 0 && defOn} dim={beat >= 1} delay={dl(0, 0.3)}>
        <T x={540} y={96} size={12} fill={MUTED} anchor="middle" script={false}>
          {t(
            "a mandi's produce section — sorted by colour, not by label",
            "ek mandi ka sabzi section — colour se sorted, label se nahi"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 0 && defOn} dim={beat >= 1} delay={dl(0, 0.8)}>
        <Draw on={true} d={circleD(210, 126, 13)} fill={GREEN} stroke={GREEN} sw={1} dur={0.4} />
      </Fade>
      <Fade on={beat >= 0 && defOn} dim={beat >= 1} delay={dl(0, 1.1)}>
        <Draw on={true} d={circleD(540, 126, 13)} fill={AMBER_DARK} stroke={AMBER_DARK} sw={1} dur={0.4} />
      </Fade>
      <Fade on={beat >= 0 && defOn} dim={beat >= 1} delay={dl(0, 1.4)}>
        <Draw on={true} d={circleD(870, 126, 13)} fill={RED} stroke={RED} sw={1} dur={0.4} />
      </Fade>
      <Fade on={beat >= 0 && defOn} dim={beat >= 1} delay={dl(0, 1.8)}>
        <T x={210} y={150} size={11} fill={GREEN} anchor="middle" script={false}>
          {t("green", "hara")}
        </T>
      </Fade>
      <Fade on={beat >= 0 && defOn} dim={beat >= 1} delay={dl(0, 1.9)}>
        <T x={540} y={150} size={11} fill={AMBER_DARK} anchor="middle" script={false}>
          {t("brown", "bhura")}
        </T>
      </Fade>
      <Fade on={beat >= 0 && defOn} dim={beat >= 1} delay={dl(0, 2.0)}>
        <T x={870} y={150} size={11} fill={RED} anchor="middle" script={false}>
          {t("red", "laal")}
        </T>
      </Fade>

      {/* beat 1 — the 5-claim row */}
      <Fade on={beat >= 1 && defOn} delay={dl(1, 0.3)}>
        <T x={540} y={182} size={13} fill={AMBER_DARK} anchor="middle" script={false}>
          {t(
            "the formal definition — five separate claims, not one sentence",
            "formal definition — paanch alag claims, ek sentence nahi"
          )}
        </T>
      </Fade>
      {CHIP_X.map((cx, i) => (
        <Fade key={i} on={beat >= 1 && defOn} delay={dl(1, 0.8 + i * 0.3)}>
          <Chip
            x={cx - CHIP_W / 2}
            y={CHIP_Y}
            w={CHIP_W}
            h={CHIP_H}
            fill={CREAM}
            stroke={INK}
            textFill={INK}
            size={11}
            script={false}
          >
            {CHIP_LABELS[i]}
          </Chip>
        </Fade>
      ))}

      {/* beat 2 — chlorophyll-bearing + autotrophic */}
      <Draw
        on={beat >= 2 && defOn}
        delay={dl(2, 0.3)}
        d={ringD(CHIP_X[0], CHIP_CY, CHIP_W / 2 + 14, CHIP_H / 2 + 12)}
        stroke={AMBER_DARK}
        sw={2}
        dur={0.6}
      />
      <Draw
        on={beat >= 2 && defOn}
        delay={dl(2, 1.0)}
        d={ringD(CHIP_X[3], CHIP_CY, CHIP_W / 2 + 14, CHIP_H / 2 + 12)}
        stroke={AMBER_DARK}
        sw={2}
        dur={0.6}
      />
      <Fade on={beat >= 2 && defOn} delay={dl(2, 1.8)}>
        <T x={540} y={270} size={12} fill={GREEN} anchor="middle" script={false}>
          {t(
            "chlorophyll a in every alga → producer, base of the food chain",
            "chlorophyll a har alga mein → producer, food chain ki sabse neeche wali seedhi"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 2 && defOn} delay={dl(2, 2.4)}>
        <T x={540} y={298} size={11} fill={MUTED} anchor="middle" script={false}>
          {t(
            "(remember this — comes back for the brown & red algae)",
            "(yaad rakhna — brown aur red algae mein wapas aayega)"
          )}
        </T>
      </Fade>

      {/* beat 3 — simple + thalloid */}
      <Draw
        on={beat >= 3 && defOn}
        delay={dl(3, 0.3)}
        d={ringD(CHIP_X[1], CHIP_CY, CHIP_W / 2 + 14, CHIP_H / 2 + 12)}
        stroke={AMBER_DARK}
        sw={2}
        dur={0.6}
      />
      <Draw
        on={beat >= 3 && defOn}
        delay={dl(3, 1.0)}
        d={ringD(CHIP_X[2], CHIP_CY, CHIP_W / 2 + 14, CHIP_H / 2 + 12)}
        stroke={AMBER_DARK}
        sw={2}
        dur={0.6}
      />
      <Draw
        on={beat >= 3 && defOn}
        delay={dl(3, 1.8)}
        d="M 420 335 h 240 v 20 h -240 z M 468 335 v 20 M 516 335 v 20 M 564 335 v 20 M 612 335 v 20"
        stroke={INK}
        sw={2}
        dur={0.8}
      />
      <Fade on={beat >= 3 && defOn} delay={dl(3, 3.0)}>
        <T x={540} y={378} size={12} fill={INK} anchor="middle" script={false}>
          {t(
            "Spirogyra filament — a chain of similar cells",
            "Spirogyra filament — similar cells ki ek chain"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 3 && defOn} delay={dl(3, 3.8)}>
        <T x={540} y={408} size={12} fill={RED} anchor="middle" script={false}>
          {t(
            "✗ root · ✗ stem · ✗ leaf · ✗ vascular tissue — none of it exists yet",
            "✗ root · ✗ stem · ✗ leaf · ✗ vascular tissue — abhi tak kuch nahi bana"
          )}
        </T>
      </Fade>

      {/* beat 4 — largely aquatic */}
      <Draw
        on={beat >= 4 && defOn}
        delay={dl(4, 0.3)}
        d={ringD(CHIP_X[4], CHIP_CY, CHIP_W / 2 + 14, CHIP_H / 2 + 12)}
        stroke={AMBER_DARK}
        sw={2}
        dur={0.6}
      />
      <Fade on={beat >= 4 && defOn} delay={dl(4, 1.2)}>
        <T x={540} y={440} size={12} fill={INK} anchor="middle" script={false}>
          {t(
            "fresh, brackish, sea water — moist stones, soil, even lichens (+fungi) & sloth-bear fur",
            "fresh, brackish, sea water — geeli chattanein, mitti, lichens (+fungi), sloth-bear ke baal tak"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 4 && defOn} delay={dl(4, 2.4)}>
        <T x={540} y={470} size={12} fill={GREEN} anchor="middle" script={false}>
          {t(
            "“largely” ≠ always — leaves room for every exception",
            "“largely” ≠ always — har exception ke liye jagah chhodta hai"
          )}
        </T>
      </Fade>

      {/* beat 5 — pin down thallus */}
      <Fade on={beat >= 5 && defOn} delay={dl(5, 0.3)}>
        <T x={540} y={510} size={13} fill={AMBER_DARK} anchor="middle" script={false}>
          {t("PIN DOWN: thallus — say it in two halves", "PIN DOWN: thallus — do hisson mein bolo")}
        </T>
      </Fade>
      <Fade on={beat >= 5 && defOn} delay={dl(5, 1.2)}>
        <Chip x={310} y={530} w={460} h={24} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={11} script={false}>
          {t(
            "① not differentiated into root, stem, or leaf",
            "① root, stem, ya leaf mein differentiate nahi"
          )}
        </Chip>
      </Fade>
      <Fade on={beat >= 5 && defOn} delay={dl(5, 2.2)}>
        <Chip x={310} y={566} w={460} h={24} fill={CREAM} stroke={AMBER_DARK} textFill={INK} size={11} script={false}>
          {t("② AND lacking vascular tissue", "② AUR vascular tissue nahi hai")}
        </Chip>
      </Fade>

      {/* ══════════ Phase B — the big picture (beats 6-7) ══════════ */}

      {/* beat 6 — railway-line diagram */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={110} size={13} fill={AMBER_DARK} anchor="middle" script={false}>
          {t(
            "the whole plant kingdom as one long railway line",
            "poora plant kingdom ek lambi railway line ki tarah"
          )}
        </T>
      </Fade>
      <Draw on={beat >= 6} delay={dl(6, 1.2)} d={arrowD(150, 280, 1000, 280)} stroke={INK} sw={2.2} dur={1.0} />
      <Fade on={beat >= 6} delay={dl(6, 2.6)}>
        <Draw on={true} d={circleD(150, 280, 16)} fill={AMBER} stroke={AMBER_DARK} sw={1.5} dur={0.5} />
      </Fade>
      <Draw
        on={beat >= 6}
        delay={dl(6, 3.4)}
        d="M 372 280 A 8 8 0 1 0 388 280 A 8 8 0 1 0 372 280 Z M 562 280 A 8 8 0 1 0 578 280 A 8 8 0 1 0 562 280 Z M 752 280 A 8 8 0 1 0 768 280 A 8 8 0 1 0 752 280 Z M 942 280 A 8 8 0 1 0 958 280 A 8 8 0 1 0 942 280 Z"
        stroke={MUTED}
        sw={1.8}
        dur={0.8}
      />
      <Fade on={beat >= 6} delay={dl(6, 4.2)}>
        <T x={150} y={318} size={13} fill={INK} weight={700} anchor="middle" script={false}>
          ALGAE
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 4.6)}>
        <T x={100} y={344} size={10} fill={MUTED} anchor="start" script={false}>
          {t("captures sunlight → makes food", "sunlight capture karta → khaana banata")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 5.0)}>
        <T x={380} y={318} size={11} fill={MUTED} anchor="start" script={false}>
          {t(
            "not yet: roots to anchor · vessels for water · seeds to travel",
            "abhi nahi: anchor ke liye roots · paani ke liye vessels · safar ke liye seeds"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 5.8)}>
        <T x={540} y={370} size={13} fill={GREEN} anchor="middle" script={false}>
          {t(
            "solved sunlight → food first — exactly why the chapter starts here",
            "sunlight → food pehle solve kiya — isiliye chapter yahin se shuru hota"
          )}
        </T>
      </Fade>

      {/* beat 7 — caveat callout */}
      <Draw
        on={beat >= 7}
        delay={dl(7, 0.3)}
        d="M 220 480 h 640 q 10 0 10 10 v 90 q 0 10 -10 10 h -640 q -10 0 -10 -10 v -90 q 0 -10 10 -10"
        stroke={RED}
        sw={2}
        dur={0.7}
      />
      <Fade on={beat >= 7} delay={dl(7, 1.3)}>
        <T x={540} y={502} size={13} fill={RED} weight={700} anchor="middle" script={false}>
          {t(
            "CAVEAT — algae are NOT a tidy family tree",
            "CAVEAT — algae koi tidy family tree nahi"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.9)}>
        <T x={540} y={536} size={12} fill={INK} anchor="middle" script={false}>
          {t(
            "not “plants” in the strict modern sense, not one natural (monophyletic) group",
            "strict modern sense mein “plants” nahi, na hi ek natural (monophyletic) group"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 2.5)}>
        <T x={540} y={568} size={12} fill={INK} anchor="middle" script={false}>
          {t(
            "an assemblage grouped for convenience — treat classes as exam categories, not a family tree",
            "convenience ke liye grouped assemblage — classes ko exam categories maano, family tree nahi"
          )}
        </T>
      </Fade>
    </svg>
  );
}
