"use client";

/**
 * P12Ch02 · Section 29 — "The battery fork — is the battery still connected?"
 * Beats (en [0,10,18,31,42,57,70]): 7 beats
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

export default function P12Ch02Sec29({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      <Fade on={beat >= 0} delay={dl(0, 0.4)}>
        <T x={540} y={58} size={24} fill={RED} script>
          {t("the single most important question: is the battery connected?", "sabse zaroori sawaal: kya battery connected hai?")}
        </T>
      </Fade>
      <Draw on={beat >= 0} delay={dl(0, 2.5)} d="M 120 70 C 400 66, 680 74, 960 69" stroke={RED} sw={2.4} dur={0.7} />

      {/* BEAT 1: Diagram — The Fork */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)} dim={beat >= 4}>
        <T x={540} y={120} size={16} fill={INK} weight={800} anchor="middle">
          DIELECTRIC INSERTED (C rises to KC₀)
        </T>
        <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 540 140 v 20 L 300 190" stroke={AMBER_DARK} sw={2} />
        <Draw on={beat >= 1} delay={dl(1, 0.5)} d="M 540 140 v 20 L 780 190" stroke={GREEN} sw={2} />
      </Fade>

      {/* BEAT 2: Disconnected branch — Q is king */}
      <Fade on={beat >= 2} delay={dl(2, 0.3)}>
        <rect x={100} y={200} width={400} height={200} rx={10} fill={CREAM} stroke={AMBER_DARK} strokeWidth={2} />
        <T x={300} y={230} anchor="middle" size={14} fill={AMBER_DARK} weight={700}>
          BATTERY DISCONNECTED
        </T>
        <T x={300} y={260} anchor="middle" size={18} fill={INK} weight={800}>
          Q IS KING (Stays Constant)
        </T>
        <T x={120} y={300} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Charge is trapped with nowhere to go!",
            "Charge fass gaya hai, kahin nahi ja sakta!"
          )}
        </T>
      </Fade>

      {/* BEAT 3: Disconnected consequences */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={120} y={340} size={14} fill={INK} anchor="start" script>
          {t("C ↑ by K", "C ↑ by K")}
        </T>
        <T x={120} y={365} size={14} fill={RED} anchor="start" script>
          {t("V, E, U all ↓ by K", "V, E, U sab ↓ by K")}
        </T>
      </Fade>

      {/* BEAT 4: Connected branch — V is king */}
      <Fade on={beat >= 4} delay={dl(4, 0.3)}>
        <rect x={580} y={200} width={400} height={200} rx={10} fill={CREAM} stroke={GREEN} strokeWidth={2} />
        <T x={780} y={230} anchor="middle" size={14} fill={GREEN} weight={700}>
          BATTERY CONNECTED
        </T>
        <T x={780} y={260} anchor="middle" size={18} fill={INK} weight={800}>
          V IS KING (Stays Constant)
        </T>
        <T x={600} y={300} size={13} fill={MUTED} anchor="start" script>
          {t(
            "Battery clamps voltage at its EMF!",
            "Battery voltage ko apne EMF pe clamp karti hai!"
          )}
        </T>
      </Fade>

      {/* BEAT 5: Connected consequences */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={600} y={340} size={14} fill={INK} anchor="start" script>
          {t("C ↑ by K", "C ↑ by K")}
        </T>
        <T x={600} y={365} size={14} fill={GREEN} anchor="start" script>
          {t("Q, U both ↑ by K  |  E stays constant", "Q, U dono ↑ by K  |  E constant")}
        </T>
      </Fade>

      {/* BEAT 6: The rule */}
      <Fade on={beat >= 6}>
        <Chip x={100} y={536} w={880} h={44} fill={RED} textFill="#ffffff" size={18}>
          {t(
            "★ Decide this fork first, EVERY SINGLE TIME, before touching a formula! ✓",
            "★ Formula chhune se pehle hamesha yeh decide karo ki konsa fork hai! ✓"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
