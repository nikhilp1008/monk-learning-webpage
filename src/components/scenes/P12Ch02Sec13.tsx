"use client";

/**
 * P12Ch02 · Section 13 — "Pitfalls: V and E ask different questions"
 * Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0,7,19,32,42,54,64,74,84]):
 *  0 Title
 *  1 Pitfall 1: V=0 ≠ E=0 and vice versa
 *  2 Examples: midpoint cases
 *  3 Pitfall 2: forgetting V is scalar
 *  4 Fix: just add kq_i/r_i with signs
 *  5 Pitfall 3: dropping minus sign in E = −dV/dr
 *  6 Sign tells field points downhill
 *  7 Pitfall 4: equipotential → zero work (always!)
 *  8 Pro-tip: ratio + sign check
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

export default function P12Ch02Sec13({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* ── BEAT 0: Title ── */}
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("common pitfalls in potential & equipotential surfaces", "potential & equipotential surfaces ke common pitfalls")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 140 70 C 400 66, 640 74, 940 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* ── BEAT 1: Pitfall 1 — V=0 ≠ E=0 ── */}
      <Badge n={1} cx={52} cy={120} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={125} size={14} fill={RED} weight={700} anchor="start">
          PITFALL: V = 0 ∴ E = 0? WRONG!
        </T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 3}>
        <T x={74} y={150} size={13} fill={INK} anchor="start" script>
          {t(
            "V=0 does NOT mean E=0, and E=0 does NOT mean V=0 — evaluate each separately!",
            "V=0 ka matlab E=0 NAHI, aur E=0 ka matlab V=0 NAHI — dono alag evaluate karo!"
          )}
        </T>
      </Fade>

      {/* ── BEAT 2: Examples ── */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <g transform="translate(74, 165)">
          <rect x={0} y={5} width={900} height={50} rx={6} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.5} />
          <T x={450} y={24} anchor="middle" size={13} fill={INK} weight={700}>
            {t(
              "Opposite charges midpoint: V = 0, E ≠ 0  |  Like charges midpoint: E = 0, V ≠ 0",
              "Opposite charges midpoint: V = 0, E ≠ 0  |  Like charges midpoint: E = 0, V ≠ 0"
            )}
          </T>
          <T x={450} y={46} anchor="middle" size={12} fill={MUTED} script>
            {t("Evaluate scalar (V) and vector (E) independently!", "Scalar (V) aur vector (E) independently evaluate karo!")}
          </T>
        </g>
      </Fade>

      {/* ── BEAT 3: Pitfall 2 — V is scalar ── */}
      <Badge n={2} cx={52} cy={255} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={74} y={260} size={14} fill={RED} weight={700} anchor="start">
          PITFALL: Treating V like a vector (adding angles/components)
        </T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 5}>
        <T x={74} y={285} size={13} fill={INK} anchor="start" script>
          {t(
            "V is a scalar — students wrongly drag in angles & components as if adding fields!",
            "V scalar hai — students galat mein angles & components lagate hain jaise field add kar rahe ho!"
          )}
        </T>
      </Fade>

      {/* ── BEAT 4: Fix ── */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <g transform="translate(74, 300)">
          <rect x={0} y={5} width={500} height={40} rx={6} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={250} y={32} anchor="middle" size={15} fill={GREEN} weight={700}>
            FIX: Just add Σ kqᵢ / rᵢ with signs — one-line sum!
          </T>
        </g>
      </Fade>

      {/* ── BEAT 5: Pitfall 3 — minus sign ── */}
      <Badge n={3} cx={52} cy={380} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={74} y={385} size={14} fill={RED} weight={700} anchor="start">
          PITFALL: Dropping the minus in E = −dV/dr
        </T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <T x={74} y={410} size={13} fill={INK} anchor="start" script>
          {t(
            "Dropping minus sign flips field direction entirely!",
            "Minus sign drop karne se field direction completely ulta ho jaata hai!"
          )}
        </T>
      </Fade>

      {/* ── BEAT 6: Sign meaning ── */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={74} y={435} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "The sign tells you: field points DOWNHILL toward lower potential!",
            "Sign batata hai: field DOWNHILL jaata hai lower potential ki taraf!"
          )}
        </T>
      </Fade>

      {/* ── BEAT 7: Pitfall 4 — Equipotential work ── */}
      <Badge n={4} cx={540} cy={380} on={beat >= 7} delay={dl(7, 0.4)} />
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={562} y={385} size={14} fill={RED} weight={700} anchor="start">
          RULE: Equipotential → ZERO work (always!)
        </T>
      </Fade>
      <Fade on={beat >= 7}>
        <g transform="translate(560, 400)">
          <rect x={0} y={5} width={420} height={40} rx={6} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={210} y={32} anchor="middle" size={14} fill={GREEN} weight={700}>
            {t("Path along equipotential: W = 0, no exceptions!", "Equipotential par path: W = 0, koi exception nahi!")}
          </T>
        </g>
      </Fade>

      {/* ── BEAT 8: Pro-tip ── */}
      <Fade on={beat >= 8}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ PRO-TIP: Compare distances with ratio + run sign check ✓",
            "★ PRO-TIP: Distances ka ratio compare karo + sign check karo ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
