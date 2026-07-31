"use client";

/**
 * P12Ch02 · Section 15 — "The sign of U tells the story of the system"
 * Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0,11,21,32,41,53,63]):
 *  0 Title "the sign of U tells the story"
 *  1 Diagram: like charges vs unlike charges
 *  2 U > 0: like charges → push against repulsion → wound up spring
 *  3 Wound up → eager to fly apart
 *  4 U < 0: unlike charges → attraction does work → bound state
 *  5 Bound = fixed deposit: invest energy to break apart
 *  6 Why every bound system in nature has negative PE
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
  ringD,
  INK,
  MUTED,
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
} from "./kit";

function Badge({ n, cx, cy, on, delay }: { n: number; cx: number; cy: number; on: boolean; delay: number }) {
  return (
    <g>
      <Draw on={on} delay={delay}
        d={`M ${cx - 13} ${cy} A 13 13 0 1 1 ${cx + 13} ${cy} A 13 13 0 1 1 ${cx - 13} ${cy}`}
        stroke={RED} sw={2.2} dur={0.4} />
      <Fade on={on} delay={delay + 0.3}>
        <T x={cx} y={cy + 5} size={14} fill={RED} weight={800}>{n}</T>
      </Fade>
    </g>
  );
}

export default function P12Ch02Sec15({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* ── BEAT 0: Title ── */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("the sign of U tells the story of the system", "U ka sign system ki kahani batata hai")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 200 70 C 440 66, 640 74, 880 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* ── BEAT 1: Diagram — Like vs Unlike ── */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        {/* Like charges panel */}
        <rect x={60} y={100} width={440} height={180} rx={10} fill="none" stroke={RED} strokeWidth={1.5} strokeDasharray="6 3" />
        <T x={280} y={120} size={14} fill={RED} weight={700}>LIKE CHARGES (+ +)</T>
        <circle cx={180} cy={200} r={20} fill={RED} stroke={INK} strokeWidth={1.5} />
        <T x={180} y={205} size={14} fill="#fff" weight={800}>+</T>
        <circle cx={360} cy={200} r={20} fill={RED} stroke={INK} strokeWidth={1.5} />
        <T x={360} y={205} size={14} fill="#fff" weight={800}>+</T>
        {/* Repulsion arrows */}
        <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 202 200 h 50" stroke={RED} sw={2} />
        <polygon points="254,200 244,195 244,205" fill={RED} />
        <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 338 200 h -50" stroke={RED} sw={2} />
        <polygon points="286,200 296,195 296,205" fill={RED} />
        <T x={280} y={258} size={15} fill={RED} weight={800}>U &gt; 0</T>

        {/* Unlike charges panel */}
        <rect x={560} y={100} width={440} height={180} rx={10} fill="none" stroke="#3b82f6" strokeWidth={1.5} strokeDasharray="6 3" />
        <T x={780} y={120} size={14} fill="#3b82f6" weight={700}>UNLIKE CHARGES (+ −)</T>
        <circle cx={680} cy={200} r={20} fill={RED} stroke={INK} strokeWidth={1.5} />
        <T x={680} y={205} size={14} fill="#fff" weight={800}>+</T>
        <circle cx={860} cy={200} r={20} fill="#3b82f6" stroke={INK} strokeWidth={1.5} />
        <T x={860} y={205} size={14} fill="#fff" weight={800}>−</T>
        {/* Attraction arrows */}
        <Draw on={beat >= 1} delay={dl(1, 0.8)} d="M 702 200 h 50" stroke={GREEN} sw={2} />
        <polygon points="754,200 744,195 744,205" fill={GREEN} />
        <Draw on={beat >= 1} delay={dl(1, 0.8)} d="M 838 200 h -50" stroke={GREEN} sw={2} />
        <polygon points="786,200 796,195 796,205" fill={GREEN} />
        <T x={780} y={258} size={15} fill="#3b82f6" weight={800}>U &lt; 0</T>
      </Fade>

      {/* ── BEAT 2: U > 0 explanation ── */}
      <Badge n={1} cx={52} cy={320} on={beat >= 2} delay={dl(2, 0.4)} />
      <Fade on={beat >= 2} delay={dl(2, 0.8)}>
        <T x={74} y={325} size={14} fill={RED} weight={700} anchor="start">
          U &gt; 0: REPULSION → POSITIVE WORK TO ASSEMBLE
        </T>
      </Fade>
      <Fade on={beat >= 2} dim={beat >= 4}>
        <T x={74} y={350} size={13} fill={INK} anchor="start" script>
          {t(
            "Push against repulsion → external agent does positive work → energy stored!",
            "Repulsion ke against push karo → external agent positive work karta → energy store!"
          )}
        </T>
      </Fade>

      {/* ── BEAT 3: Wound up spring ── */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={74} y={378} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "System wound up like a compressed spring — eager to fly apart the instant you let go!",
            "System compressed spring jaisa wound up hai — chodte hi udna chahta hai!"
          )}
        </T>
      </Fade>

      {/* ── BEAT 4: U < 0 explanation ── */}
      <Badge n={2} cx={52} cy={420} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={74} y={425} size={14} fill="#3b82f6" weight={700} anchor="start">
          U &lt; 0: ATTRACTION → NEGATIVE WORK → BOUND STATE
        </T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <T x={74} y={450} size={13} fill={INK} anchor="start" script>
          {t(
            "Attraction does work FOR you → external agent does negative work → system is BOUND!",
            "Attraction apne aap work karta hai → external agent negative work → system BOUND hai!"
          )}
        </T>
      </Fade>

      {/* ── BEAT 5: Fixed deposit analogy ── */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={74} y={478} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "Bound = fixed deposit: you must INVEST energy to break it apart!",
            "Bound = fixed deposit: todne ke liye energy INVEST karna padega!"
          )}
        </T>
      </Fade>

      {/* ── BEAT 6: Takeaway ── */}
      <Fade on={beat >= 6}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Every bound system in nature (atom, planet) has NEGATIVE PE ✓",
            "★ Nature mein har bound system (atom, planet) ka PE NEGATIVE hota hai ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
