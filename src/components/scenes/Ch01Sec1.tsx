"use client";

/**
 * Ch01 · Section 1 — "A measurement is a number and a unit"
 *
 * Beats (aligned to board_reveal_at):
 *  0 title · 1 the "5 what?" phone story · 2 the real question
 *  3 THE DEMO: meter stick steps across the table, then cm ticks count to 350
 *  4 smaller unit ⇒ bigger number · 5 same wall note · 6 ratio · 7 naked number ✗
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
  crossD,
  useCountUp,
  useTimelineLabel,
  INK,
  MUTED,
  AMBER,
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
} from "./kit";

const TX = 170;
const TY = 320;
const TW = 560;
const TH = 26;

export default function Ch01Sec1({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  const stickLabel = useTimelineLabel(beat === 3, [
    [0.9, "1"],
    [1.9, "2"],
    [2.9, "3"],
    [3.8, "3½"],
  ]);
  const cmCount = useCountUp(beat === 3, 350, 3.2, 6.5);

  return (
    <svg
      viewBox="0 0 1000 620"
      preserveAspectRatio="xMidYMin meet"
      className="w-full h-full select-none"
    >
      {/* beat 0 — title */}
      <Fade on={beat >= 0}>
        <T x={500} y={64} size={33} fill={RED} script>
          {t("a measurement = a number + a unit", "measurement = number + unit")}
        </T>
      </Fade>

      {/* beat 1 — the phone story */}
      <Fade on={beat >= 1}>
        <T x={360} y={128} size={21} fill={MUTED} script>
          {t(
            "“I bought a table that’s… five long.”",
            "“yaar, maine table kharida — 5 ka hai”"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 0.5)}>
        <T x={720} y={140} size={64} fill={INK} weight={800}>
          5
        </T>
        <T x={790} y={138} size={40} fill={RED} script>
          …?
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1.4)}>
        <Chip x={120} y={165} w={130} h={40} fill={CREAM} stroke={AMBER} textFill={INK} size={19}>
          {t("5 feet?", "5 feet?")}
        </Chip>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 1.9)}>
        <Chip x={270} y={165} w={140} h={40} fill={CREAM} stroke={AMBER} textFill={INK} size={19}>
          {t("5 metres?", "5 metre?")}
        </Chip>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 2.4)}>
        <Chip x={430} y={165} w={180} h={40} fill={CREAM} stroke={AMBER} textFill={INK} size={19}>
          {t("5 hand-spans?", "5 hand-span?")}
        </Chip>
      </Fade>

      {/* beat 2 — the real question */}
      <Fade on={beat >= 2}>
        <T x={500} y={262} size={23} fill={GREEN} script>
          {t(
            "“how many times does my standard fit into this?”",
            "“mera standard is cheez mein kitni baar fit hota hai?”"
          )}
        </T>
      </Fade>

      {/* beat 3 — THE DEMO */}
      <Draw
        on={beat >= 3}
        d={`M ${TX} ${TY} h ${TW} v ${TH} h ${-TW} z M ${TX + 30} ${TY + TH} v 42 M ${
          TX + TW - 30
        } ${TY + TH} v 42`}
        stroke={INK}
        sw={3}
        dur={beat > 3 ? 0.3 : 1.2}
      />
      <Fade on={beat >= 3} delay={dl(3, 0.6)}>
        <T x={TX + TW / 2} y={TY - 12} size={17} fill={MUTED} script>
          {t("the table", "the table")}
        </T>
      </Fade>

      {/* meter stick: steps across live, sits parked+dimmed once the beat is past */}
      <g
        className={beat === 3 ? "sc-stick-go" : undefined}
        style={{
          opacity: beat < 3 ? 0 : beat > 3 ? 0.25 : undefined,
          transform: beat > 3 ? "translateX(480px)" : undefined,
        }}
      >
        <g className={beat === 3 ? "sc-dim-later" : undefined}>
          <rect
            x={TX}
            y={TY + TH + 22}
            width={160}
            height={12}
            rx={3}
            fill={AMBER}
            stroke={INK}
            strokeWidth={2}
          />
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <line
              key={i}
              x1={TX + i * 16}
              y1={TY + TH + 22}
              x2={TX + i * 16}
              y2={TY + TH + 22 + (i === 5 ? 9 : 6)}
              stroke={INK}
              strokeWidth={1.1}
            />
          ))}
        </g>
      </g>
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={TX + 78} y={TY + TH + 58} size={15} fill={AMBER_DARK} script>
          {t("1 metre stick", "1 meter stick")}
        </T>
      </Fade>
      {[1, 2, 3].map((i) => (
        <Fade key={i} on={beat >= 3} delay={dl(3, 0.7 + i)}>
          <line
            x1={TX + i * 160}
            y1={TY - 6}
            x2={TX + i * 160}
            y2={TY + TH + 6}
            stroke={RED}
            strokeWidth={2}
            opacity={0.8}
          />
        </Fade>
      ))}
      {beat === 3 && stickLabel && (
        <T x={TX + TW + 60} y={TY + 24} size={34} fill={INK} weight={800}>
          {stickLabel}
        </T>
      )}
      <Fade on={beat >= 3} delay={dl(3, 4.3)}>
        <Chip x={790} y={TY - 18} w={144} h={46} fill={INK} textFill={CREAM} size={23}>
          = 3.5 m
        </Chip>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 6)}>
        <g>
          {Array.from({ length: 57 }, (_, i) => (
            <line
              key={i}
              x1={TX + i * 10}
              y1={TY + TH + 3}
              x2={TX + i * 10}
              y2={TY + TH + 12}
              stroke={GREEN}
              strokeWidth={1.2}
            />
          ))}
        </g>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 6.3)}>
        <T x={TX + 390} y={TY + TH + 58} size={16} fill={GREEN} script>
          {t("now in 10-cm steps…", "ab 10-cm steps se…")}
        </T>
      </Fade>
      {beat === 3 && cmCount > 0 && (
        <T x={TX + TW / 2} y={TY + TH + 106} size={38} fill={GREEN} weight={800}>
          {cmCount}
        </T>
      )}
      <Fade on={beat >= 3} delay={dl(3, 9.6)}>
        <Chip x={790} y={TY + 40} w={144} h={46} fill={GREEN} textFill="#fff" size={22}>
          = 350 cm
        </Chip>
      </Fade>

      {/* beat 4 — smaller unit, bigger number */}
      <Fade on={beat >= 4}>
        <T x={330} y={492} size={19} fill={MUTED} script>
          {t("same table — only the ruler changed", "table wahi — sirf ruler badla")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 0.6)}>
        <Draw on={beat >= 4} delay={dl(4, 0.6)} d={arrowD(610, 470, 610, 500)} stroke={RED} sw={3} dur={0.5} />
        <T x={668} y={488} size={18} fill={RED} script>
          {t("unit smaller", "unit choti")}
        </T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.1)}>
        <Draw on={beat >= 4} delay={dl(4, 1.1)} d={arrowD(790, 500, 790, 470)} stroke={GREEN} sw={3} dur={0.5} />
        <T x={862} y={488} size={18} fill={GREEN} script>
          {t("number bigger", "number bada")}
        </T>
      </Fade>

      {/* beat 5 — same wall note */}
      <Fade on={beat >= 5}>
        <line x1={150} y1={516} x2={150} y2={548} stroke={RED} strokeWidth={3} opacity={0.7} />
        <T x={168} y={540} size={21} fill={RED} script anchor="start">
          {t(
            "3 m and 300 cm are the same wall. only the ruler changed.",
            "3 m aur 300 cm — same wall. sirf ruler badla."
          )}
        </T>
      </Fade>

      {/* beat 6 — measurement is a ratio */}
      <Fade on={beat >= 6}>
        <T x={430} y={596} size={24} fill={INK} weight={800}>
          {t(
            "measurement = size of thing ÷ size of unit",
            "measurement = size of thing ÷ size of unit"
          )}
        </T>
      </Fade>
      <Draw on={beat >= 6} delay={dl(6, 0.9)} d={ringD(770, 588, 74, 26)} stroke={AMBER} sw={3} dur={0.8} />
      <Fade on={beat >= 6} delay={dl(6, 0.9)}>
        <T x={770} y={596} size={24} fill={AMBER_DARK} script>
          RATIO
        </T>
      </Fade>

      {/* beat 7 — a naked number is never an answer */}
      <Fade on={beat >= 7}>
        <Draw on={beat >= 7} d={crossD(700, 90, 105, 62)} stroke={RED} sw={3} dur={0.6} />
        <T x={927} y={128} size={17} fill={RED} script anchor="middle">
          {t("naked number ✗", "nanga number ✗")}
        </T>
      </Fade>
    </svg>
  );
}
