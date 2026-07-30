"use client";

/**
 * Ch01 · Section 2 — "Base and derived quantities: seven notes, endless songs"
 *
 * Beats:
 *  0 heading · 1 chaos (a standard for everything?) · 2 the founding members
 *  3 THE HUB: 7 SI base units, arrows fan out to derived units
 *  4 speed/force are derived · 5 language + सा रे ग म analogy
 *  6 supplementary box, deliberately unconnected · 7 convention, not nature
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
  crossD,
  INK,
  MUTED,
  AMBER,
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
} from "./kit";

const HX = 400;
const HY = 330;
const NODE: [string, string, number][] = [
  ["m", "meter", -90],
  ["kg", "kilogram", -39],
  ["s", "second", 12],
  ["A", "ampere", 63],
  ["K", "kelvin", 114],
  ["mol", "mole", 165],
  ["cd", "candela", 216],
];
// hand-placed derived labels (stay on-board, clear of hub / सुर line / box)
const DERIV: [string, number, number][] = [
  ["speed", 165, 175],
  ["force", 650, 168],
  ["energy", 105, 305],
  ["pressure", 130, 440],
  ["density", 215, 512],
  ["power", 585, 505],
  ["charge", 668, 472],
];

export default function Ch01Sec2({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1000 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* beat 0 — heading */}
      <Fade on={beat >= 0}>
        <T x={500} y={52} size={30} fill={RED} script>
          {t(
            "base quantities vs derived quantities",
            "base quantities vs derived quantities"
          )}
        </T>
      </Fade>

      {/* beat 1 — chaos (dims once the hub arrives) */}
      <Fade on={beat >= 1} dim={beat >= 2}>
        <Chip x={205} y={80} w={180} h={40} fill={PAPERISH} stroke={INK} textFill={INK} size={16} script={false}>
          {t("speed: own standard?", "speed ka apna standard?")}
        </Chip>
        <Chip x={405} y={80} w={180} h={40} fill={PAPERISH} stroke={INK} textFill={INK} size={16} script={false}>
          {t("force: own standard?", "force ka apna standard?")}
        </Chip>
        <Chip x={605} y={80} w={190} h={40} fill={PAPERISH} stroke={INK} textFill={INK} size={16} script={false}>
          {t("pressure: own standard?", "pressure ka apna standard?")}
        </Chip>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 0.9)} dim={beat >= 2}>
        <Draw
          on={beat >= 1}
          delay={dl(1, 0.9)}
          d="M 215 92 C 350 130, 450 78, 590 112 C 680 132, 740 84, 790 108"
          stroke={RED}
          sw={3.4}
          dur={1}
        />
        <T x={880} y={108} size={26} fill={RED} script>
          CHAOS
        </T>
      </Fade>

      {/* beat 2 — hub + the obvious three */}
      <Fade on={beat >= 2}>
        <circle cx={HX} cy={HY} r={60} fill={CREAM} stroke={AMBER} strokeWidth={3} />
        <T x={HX} y={HY - 4} size={28} fill={INK} weight={800}>
          7
        </T>
        <T x={HX} y={HY + 22} size={15} fill={AMBER_DARK} script>
          base units
        </T>
      </Fade>
      {NODE.slice(0, 3).map(([sym, name, ang], i) => (
        <HubNode key={sym} sym={sym} name={name} ang={ang} on={beat >= 2} delay={dl(2, 0.5 + i * 0.4)} />
      ))}

      {/* beat 3 — the full seven + fan-out */}
      {NODE.slice(3).map(([sym, name, ang], i) => (
        <HubNode key={sym} sym={sym} name={name} ang={ang} on={beat >= 3} delay={dl(3, i * 0.45)} />
      ))}
      {DERIV.map(([name, lx, ly], i) => {
        const dx = lx - HX;
        const dy = ly - HY;
        const len = Math.hypot(dx, dy);
        const ux = dx / len;
        const uy = dy / len;
        const r0 = Math.min(190, len - 55);
        return (
          <g key={name}>
            <Draw
              on={beat >= 3}
              delay={dl(3, 2 + i * 0.9)}
              d={arrowD(HX + r0 * ux, HY + r0 * uy, lx - 40 * ux, ly - 40 * uy)}
              stroke={AMBER}
              sw={2.6}
              dur={0.4}
            />
            <Fade on={beat >= 3} delay={dl(3, 2.3 + i * 0.9)}>
              <T x={lx} y={ly + 6} size={17} fill={AMBER_DARK} script>
                {name}
              </T>
            </Fade>
          </g>
        );
      })}

      {/* beat 4 — derived examples */}
      <Fade on={beat >= 4}>
        <Chip x={730} y={222} w={210} h={42} fill="#fff" stroke={GREEN} textFill={GREEN} size={18}>
          speed = L / T
        </Chip>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 0.7)}>
        <Chip x={730} y={274} w={230} h={42} fill="#fff" stroke={GREEN} textFill={GREEN} size={18}>
          force = M·L / T²
        </Chip>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.3)}>
        <T x={845} y={344} size={15} fill={MUTED} script>
          {t("↑ derived — built from base", "↑ derived — base se bani")}
        </T>
      </Fade>

      {/* beat 5 — language + sur analogy */}
      <Fade on={beat >= 5}>
        <T x={430} y={568} size={30} fill={INK} script>
          सा  रे  ग  म  प  ध  नि
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 1.2)}>
        <T x={430} y={602} size={17} fill={AMBER_DARK} script>
          {t(
            "seven notes → every raga, every song. these seven = physics ke सुर",
            "saat sur → har raag, har song. physics ke 7 sur = ye units"
          )}
        </T>
      </Fade>

      {/* beat 6 — supplementary corner box, deliberately unconnected */}
      <Fade on={beat >= 6}>
        <Chip x={735} y={380} w={225} h={40} fill="#fff" stroke={INK} textFill={INK} size={18} dashed>
          radian · steradian
        </Chip>
        <T x={848} y={444} size={15} fill={RED} script>
          {t("supplementary — NOT base", "supplementary — NOT base")}
        </T>
      </Fade>
      <Fade on={beat >= 6} delay={dl(6, 0.8)}>
        <Draw on={beat >= 6} delay={dl(6, 0.8)} d={arrowD(590, 368, 706, 392)} stroke={MUTED} sw={2.2} dur={0.4} />
        <Draw on={beat >= 6} delay={dl(6, 1.2)} d={crossD(630, 358, 44, 30)} stroke={RED} sw={2.8} dur={0.4} />
        <T x={652} y={344} size={13} fill={MUTED} script>
          {t("not connected!", "connect nahi!")}
        </T>
      </Fade>

      {/* beat 7 — convention, not nature */}
      <Fade on={beat >= 7}>
        <T x={365} y={148} size={21} fill={GREEN} script>
          {t(
            "“this choice is convention — not nature”",
            "“ye chunaav convention hai — nature nahi”"
          )}
        </T>
      </Fade>
    </svg>
  );
}

const PAPERISH = "#FFFEFB";

function HubNode({
  sym,
  name,
  ang,
  on,
  delay,
}: {
  sym: string;
  name: string;
  ang: number;
  on: boolean;
  delay: number;
}) {
  const a = (ang * Math.PI) / 180;
  const nx = HX + 150 * Math.cos(a);
  const ny = HY + 150 * Math.sin(a);
  const off = ny > HY + 80 ? 50 : ny < HY - 80 ? -40 : 46;
  return (
    <Fade on={on} delay={delay}>
      <line
        x1={HX + 62 * Math.cos(a)}
        y1={HY + 62 * Math.sin(a)}
        x2={nx - 29 * Math.cos(a)}
        y2={ny - 29 * Math.sin(a)}
        stroke={MUTED}
        strokeWidth={1.6}
      />
      <circle cx={nx} cy={ny} r={29} fill="#fff" stroke={INK} strokeWidth={2.4} />
      <T x={nx} y={ny + 7} size={19} fill={INK} weight={800}>
        {sym}
      </T>
      <T x={nx} y={ny + off} size={14} fill={MUTED} script>
        {name}
      </T>
    </Fade>
  );
}
