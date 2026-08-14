"use client";

/**
 * P12Ch02 · Section 51 — "Pitfalls: sigma over epsilon zero, cavities, and one-way shielding"
 * Beats (en [0,4,13,25,36,53,65,80]): 8 beats
 */

import React from "react";
import {
  SceneProps, useBeat, delayFor, Fade, Draw, T, Chip, ringD,
  INK, MUTED, AMBER_DARK, GREEN, RED, CREAM,
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

export default function P12Ch02Sec51({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("Common pitfalls in electrostatics of conductors", "Electrostatics of conductors mein common pitfalls")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 250 70 C 440 66, 640 74, 830 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: E outside conductor */}
      <Badge n={1} cx={52} cy={120} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={125} size={14} fill={RED} weight={700} anchor="start">FIELD JUST OUTSIDE A CONDUCTOR</T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 3}>
        <g transform="translate(60, 140)">
          <rect x={0} y={5} width={400} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={200} y={38} anchor="middle" size={18} fill={INK} weight={800}>
            E = σ / ε₀ (NOT σ / 2ε₀)
          </T>
        </g>
      </Fade>

      {/* BEAT 2: Why double? */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={60} y={225} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Conductor is DOUBLE the isolated sheet, because field inside is zero (all flux goes one way).",
            "Conductor isolated sheet ka DOUBLE hai, kyunki andar E=0 hai (saari flux ek hi taraf jati hai)."
          )}
        </T>
      </Fade>

      {/* BEAT 3: Field inside */}
      <Badge n={2} cx={52} cy={270} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={74} y={275} size={14} fill={RED} weight={700} anchor="start">FIELD INSIDE</T>
      </Fade>
      <Fade on={beat >= 3} dim={beat >= 5}>
        <g transform="translate(60, 290)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={480} y={36} anchor="middle" size={16} fill={INK} weight={800} script>
            {t(
              "Thinking field just 'weakens' inside? NO! In equilibrium, E is EXACTLY ZERO.",
              "Lagta hai field andar bas 'weaken' hoti hai? NAHI! Equilibrium mein, E EXACTLY ZERO hoti hai."
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 4: Cavities */}
      <Badge n={3} cx={52} cy={375} on={beat >= 4} delay={dl(4, 0.4)} />
      <Fade on={beat >= 4} delay={dl(4, 0.8)}>
        <T x={74} y={380} size={14} fill={RED} weight={700} anchor="start">CAVITIES</T>
      </Fade>
      <Fade on={beat >= 4} dim={beat >= 6}>
        <g transform="translate(60, 395)">
          <rect x={0} y={5} width={960} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={480} y={36} anchor="middle" size={16} fill={INK} weight={800} script>
            {t(
              "Forgetting induced charge (−q inside, +q outside) corrupts ALL downstream calculations!",
              "Induced charge (−q andar, +q bahar) bhoolne se aage ki SAARI calculations galat ho jati hain!"
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Faraday cage */}
      <Badge n={4} cx={540} cy={120} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={562} y={125} size={14} fill={RED} weight={700} anchor="start">ONE-WAY SHIELDING</T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <g transform="translate(540, 140)">
          <rect x={0} y={5} width={480} height={50} rx={8} fill={CREAM} stroke={AMBER_DARK} strokeWidth={1.8} />
          <T x={240} y={20} anchor="middle" size={14} fill={INK} weight={800} script>
            {t(
              "Cage shields INSIDE from OUTSIDE fields...",
              "Cage ANDAR ko BAHAR ki fields se bachata hai..."
            )}
          </T>
          <T x={240} y={42} anchor="middle" size={14} fill={INK} weight={800} script>
            {t(
              "but NOT outside from inside!",
              "par BAHAR ko andar se NAHI!"
            )}
          </T>
        </g>
      </Fade>

      {/* BEAT 6: Pro tip */}
      <Fade on={beat >= 6}>
        <Chip x={100} y={480} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Pro-tip: Treat any charged conductor as ONE equipotential blob! ✓",
            "★ Pro-tip: Kisi bhi charged conductor ko EK equipotential blob maano! ✓"
          )}
        </Chip>
      </Fade>

      {/* BEAT 7: Shell principle */}
      <Fade on={beat >= 7}>
        <Chip x={100} y={540} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ Concentric shells: Shell contributes kQ/R inside itself, and kQ/r outside! ✓",
            "★ Concentric shells: Shell apne andar kQ/R deti hai, aur bahar kQ/r! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
