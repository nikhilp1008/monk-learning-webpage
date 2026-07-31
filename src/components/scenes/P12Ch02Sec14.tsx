"use client";

/**
 * P12Ch02 · Section 14 — "Potential energy — the cost of assembling a configuration"
 * Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0,7,20,29,41,53,63]):
 *  0 Title "potential energy: the assembly bill"
 *  1 Analogy: seating quarrelsome family — push enemies apart costs work
 *  2 Inseparable relatives: pulling apart costs work
 *  3 Total tension depends only on final arrangement, not order
 *  4 Formula: U = work to assemble from infinity
 *  5 Conservative force: path-independent
 *  6 Path independence makes U a meaningful single number
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

export default function P12Ch02Sec14({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* ── BEAT 0: Title ── */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("potential energy: the assembly bill", "potential energy: assembly ka bill")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 240 70 C 440 66, 640 74, 840 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* ── BEAT 1: Analogy — quarrelsome family ── */}
      <Badge n={1} cx={52} cy={120} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={125} size={14} fill={RED} weight={700} anchor="start">
          ANALOGY: SEATING A QUARRELSOME FAMILY
        </T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 4}>
        <g transform="translate(74, 140)">
          <rect x={0} y={5} width={900} height={60} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.5} />
          <T x={450} y={28} anchor="middle" size={14} fill={INK} script>
            {t(
              "Push two who dislike each other close together → costs WORK (positive energy stored!)",
              "Do log jo ek doosre ko pasand nahi → paas baithao → WORK lagta hai (positive energy stored!)"
            )}
          </T>
          <T x={450} y={52} anchor="middle" size={14} fill={INK} script>
            {t(
              "Like charges repel → pushing them together stores positive U!",
              "Like charges repel karte hain → paas laane mein positive U store hota hai!"
            )}
          </T>
        </g>
      </Fade>

      {/* ── BEAT 2: Inseparable relatives ── */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <g transform="translate(74, 215)">
          <rect x={0} y={5} width={900} height={45} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.5} />
          <T x={450} y={34} anchor="middle" size={14} fill={INK} script>
            {t(
              "Inseparable relatives WANT to sit together — pulling apart costs work → negative U (bound state!)",
              "Inseparable relatives SAATH baithna chahte hain — alag karne mein work lagta → negative U (bound state!)"
            )}
          </T>
        </g>
      </Fade>

      {/* ── BEAT 3: Order doesn't matter ── */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={74} y={295} size={14} fill={AMBER_DARK} anchor="start" script>
          {t(
            "Total tension depends ONLY on who ends up where — never on the order they sat down!",
            "Total tension SIRF is pe depend karta hai ki kaun kahaan hai — order matter nahi karta!"
          )}
        </T>
      </Fade>

      {/* ── BEAT 4: Badge 2 — Formula ── */}
      <Badge n={2} cx={52} cy={340} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 1)}>
        <T x={74} y={345} size={14} fill={RED} weight={700} anchor="start">
          DEFINITION OF POTENTIAL ENERGY U
        </T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(60, 358)">
          <rect x={0} y={5} width={500} height={55} rx={10} fill={CREAM} stroke={RED} strokeWidth={2.5} />
          <T x={250} y={40} anchor="middle" size={22} fill={RED} weight={800}>
            U = W_ext (∞ → final config)
          </T>
        </g>
      </Fade>

      {/* ── BEAT 5: Conservative force ── */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <g transform="translate(580, 340)">
          <rect x={0} y={5} width={420} height={50} rx={8} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={210} y={24} anchor="middle" size={14} fill={GREEN} weight={700}>
            {t("CONSERVATIVE FORCE!", "CONSERVATIVE FORCE!")}
          </T>
          <T x={210} y={46} anchor="middle" size={13} fill={INK} script>
            {t(
              "Work depends only on final arrangement, never on path taken!",
              "Work sirf final arrangement pe depend karta, path pe nahi!"
            )}
          </T>
        </g>
      </Fade>

      {/* ── BEAT 6: Takeaway ── */}
      <Fade on={beat >= 6}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Path independence → U is a meaningful single number for any configuration ✓",
            "★ Path independence → U kisi bhi configuration ka ek meaningful number hai ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
