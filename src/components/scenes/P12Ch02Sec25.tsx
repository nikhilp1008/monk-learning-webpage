"use client";

/**
 * P12Ch02 · Section 25 — "Pitfalls: one over r, sign slips, and pair-counting"
 * Beats (en [0,4,20,28,35,50,69,82,98]): 9 beats
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

export default function P12Ch02Sec25({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("common pitfalls in potential energy", "potential energy ke common pitfalls")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 240 70 C 440 66, 640 74, 840 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Pitfall 1 — 1/r² vs 1/r */}
      <Badge n={1} cx={52} cy={115} on={beat >= 1} delay={dl(1, 0.4)} />
      <Fade on={beat >= 1} delay={dl(1, 0.8)}>
        <T x={74} y={120} size={14} fill={RED} weight={700} anchor="start">
          PITFALL: Using 1/r² (force) instead of 1/r (energy)
        </T>
      </Fade>

      {/* BEAT 2: Tattoo it */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <T x={74} y={148} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Tattoo this: F,E ∝ 1/r² but U,V ∝ 1/r — most common arithmetic disaster!",
            "Yaad rakho: F,E ∝ 1/r² lekin U,V ∝ 1/r — sabse common arithmetic disaster!"
          )}
        </T>
      </Fade>

      {/* BEAT 3: Pitfall 2 — Sign slips */}
      <Badge n={2} cx={52} cy={190} on={beat >= 3} delay={dl(3, 0.4)} />
      <Fade on={beat >= 3} delay={dl(3, 0.8)}>
        <T x={74} y={195} size={14} fill={RED} weight={700} anchor="start">
          PITFALL: Sign slips — always plug charges with their OWN signs
        </T>
      </Fade>

      {/* BEAT 4: Sanity check */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <g transform="translate(74, 210)">
          <rect x={0} y={5} width={600} height={40} rx={6} fill={CREAM} stroke={GREEN} strokeWidth={1.8} />
          <T x={300} y={32} anchor="middle" size={14} fill={GREEN} weight={700}>
            {t("CHECK: like charges → U > 0  |  unlike → U < 0", "CHECK: like charges → U > 0  |  unlike → U < 0")}
          </T>
        </g>
      </Fade>

      {/* BEAT 5: Confusing U, V, E */}
      <Badge n={3} cx={52} cy={290} on={beat >= 5} delay={dl(5, 0.4)} />
      <Fade on={beat >= 5} delay={dl(5, 0.8)}>
        <T x={74} y={295} size={14} fill={RED} weight={700} anchor="start">
          PITFALL: Confusing U, V, and E
        </T>
      </Fade>
      <Fade on={beat >= 5} dim={beat >= 7}>
        <T x={74} y={320} size={13} fill={INK} anchor="start" script>
          {t(
            "E = force/charge (vector) | V = energy/charge at point (scalar) | U = system energy (scalar, J)",
            "E = force/charge (vector) | V = energy/charge at point (scalar) | U = system energy (scalar, J)"
          )}
        </T>
      </Fade>

      {/* BEAT 6: Pair counting */}
      <Badge n={4} cx={52} cy={365} on={beat >= 6} delay={dl(6, 0.4)} />
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <T x={74} y={370} size={14} fill={RED} weight={700} anchor="start">
          PITFALL: Pair-counting errors in multi-charge systems
        </T>
      </Fade>
      <Fade on={beat >= 6} dim={beat >= 8}>
        <T x={74} y={395} size={13} fill={INK} anchor="start" script>
          {t(
            "n charges → n(n−1)/2 pairs. 3 charges: 3 pairs. 4 charges: 6 pairs!",
            "n charges → n(n−1)/2 pairs. 3 charges: 3 pairs. 4 charges: 6 pairs!"
          )}
        </T>
      </Fade>

      {/* BEAT 7: Dipole confusion */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <T x={74} y={435} size={13} fill={AMBER_DARK} anchor="start" script>
          {t(
            "Dipole: stable at θ=0 (U_min = −pE), unstable at θ=180° (U_max = +pE)",
            "Dipole: stable θ=0 pe (U_min = −pE), unstable θ=180° pe (U_max = +pE)"
          )}
        </T>
      </Fade>

      {/* BEAT 8: Pro-tip */}
      <Fade on={beat >= 8}>
        <Chip x={100} y={536} w={880} h={44} fill={GREEN} textFill="#ffffff" size={18}>
          {t(
            "★ PRO-TIP: Released from rest? Skip forces → go straight to ΔU = ΔK ✓",
            "★ PRO-TIP: Rest se chhoda? Forces chhodo → sidha ΔU = ΔK use karo ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
