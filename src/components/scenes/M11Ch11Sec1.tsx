"use client";

/**
 * M11 Ch11 · Section 1 — "The centroid: a triangle's balance point"
 * Canvas 1080×620 · safe x36–1044, y30–596. Spec: SCENE_AUTHORING.md + SCENE_AUTHORING_MATHS.md.
 * section_type: concept — opens subtopic 1 (Applications: Centroid, Collinearity & Locus, 2D,
 * pure CartesianAxes/lineD — nothing 3D here). Reference exemplar for Ch11.
 *
 * Illustrative triangle (not given in JSON — conceptual opener): A(1,5), B(-3,-1), C(5,-1) math
 * units, scale 38px/unit, origin(280,380). toScreen(x,y) = {x:280+38x, y:380-38y}.
 *   A(1,5)->(318,190)  B(-3,-1)->(166,418)  C(5,-1)->(470,418)
 *   Centroid G = avg = ((1-3+5)/3,(5-1-1)/3) = (1,1) -> (318,342)
 *   D = midpoint BC = (1,-1) -> (318,418)  [median AD is vertical, x=318 throughout]
 *   E = midpoint AC = (3,2) -> (394,304)   F = midpoint AB = (-1,2) -> (242,304)
 * Verified all 3 medians concur at G: AD trivially (x=318 const). BE: G-B=(152,-76),
 * E-B=(228,-114), ratio 152/228=76/114=0.667=2/3 ✓. CF: G-C=(-152,-76), F-C=(-228,-114),
 * ratio 0.667 ✓. So AG:GD = BG:GE = CG:GF = 2:1 as the section claims.
 *
 * reveals_english = [0, 10.24, 24.23, 35.07, 46.25, 60.07, 73.47, 88.66] (8 values, beats 0-7).
 *
 * Beats:
 *  0(title, always-on) | "The centroid: where a triangle balances"
 *  1 | intro: cut a triangle from card, balance on a fingertip = centroid G
 *  2 | THE DIAGRAM: axes, triangle ABC, midpoint D, all 3 medians, G marked
 *  3 | ring G — "where the three medians meet"
 *  4 | inline "2" / "1" labels on median AD — the 2:1 ratio
 *  5 | right-column: coordinate formula G = ((x1+x2+x3)/3, (y1+y2+y3)/3)
 *  6 | checkmark + caption: each coordinate balances alone (independence)
 *  7 | guardrail (red): G always exists, always unique, independent of side lengths
 *
 * Layout plan:
 *  b0 | title (26,red,script)              | T mid  | x540 y58
 *  b1 | 2-line intro (15,ink)               | T mid  | x540 y98 / y122
 *  b2 | axes c(280,380) 120..520/150..450   | CartesianAxes (no ticks)
 *  b2 | triangle sides AB,BC,CA (ink)       | Draw   | A(318,190) B(166,418) C(470,418)
 *  b2 | A/B/C dots + coord labels           | circle+T | above A, left of B, right of C
 *  b2 | D dot (muted) + label               | circle+T | (318,418) label (330,432)
 *  b2 | medians AD,BE,CF (amber)            | Draw   | A->D, B->E, C->F
 *  b2 | G dot (amber_dark) + label          | circle+T | (318,342) label (332,348)
 *  b3 | ring around G+label                 | Draw   | ringD(331,340,30,22)
 *  b4 | "2" at AG midpoint, "1" at GD mid   | T start | (336,270) / (336,390)
 *  b5 | right col label + formula           | T start | (600,210) / (600,240)
 *  b6 | checkmark + independence caption    | Draw+T | (605,288) / (628,292)
 *  b7 | red bar + 2-line guardrail          | Draw+T | x600 y320-372 / (616,340) (616,362)
 */

import React from "react";
import {
  SceneProps,
  useBeat,
  delayFor,
  Fade,
  Draw,
  T,
  INK,
  MUTED,
  AMBER,
  AMBER_DARK,
  GREEN,
  RED,
  ringD,
} from "./kit";
import { CartesianAxes, lineD, checkD } from "./math-kit";

const OX = 280;
const OY = 380;
const SCALE = 38;
function toScreen(x: number, y: number) {
  return { x: OX + x * SCALE, y: OY - y * SCALE };
}

const A = toScreen(1, 5); // (318,190)
const B = toScreen(-3, -1); // (166,418)
const C = toScreen(5, -1); // (470,418)
const G = toScreen(1, 1); // (318,342)
const D = toScreen(1, -1); // (318,418) midpoint BC
const E = toScreen(3, 2); // (394,304) midpoint AC
const F = toScreen(-1, 2); // (242,304) midpoint AB

export default function M11Ch11Sec1({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg viewBox="0 0 1080 620" preserveAspectRatio="xMidYMin meet" className="w-full h-full select-none">
      {/* title — always on */}
      <Fade on={true}>
        <T x={540} y={58} size={26} fill={RED} anchor="middle" script>
          {t("The centroid: where a triangle balances", "Centroid: jahaan triangle balance karta hai")}
        </T>
      </Fade>

      {/* beat 1 — intro */}
      <Fade on={beat >= 1} delay={dl(1, 0)}>
        <T x={540} y={98} size={15} fill={INK} anchor="middle">
          {t(
            "Cut a triangle from card and balance it on a fingertip —",
            "Card se ek triangle kaato aur usse ek ungli par balance karo —"
          )}
        </T>
        <T x={540} y={122} size={15} fill={INK} anchor="middle">
          {t("the point where it balances is the centroid, G.", "jahaan woh balance hota hai, wahi centroid hai, G.")}
        </T>
      </Fade>

      {/* beat 2 — THE DIAGRAM: axes, triangle, medians, G */}
      <CartesianAxes on={beat >= 2} delay={dl(2, 0)} originX={OX} originY={OY} xLeft={120} xRight={520} yTop={150} yBottom={450} showTicks={false} />
      <Draw on={beat >= 2} delay={dl(2, 0.5)} d={lineD(A.x, A.y, B.x, B.y)} stroke={INK} sw={2} dur={0.4} />
      <Draw on={beat >= 2} delay={dl(2, 0.9)} d={lineD(B.x, B.y, C.x, C.y)} stroke={INK} sw={2} dur={0.4} />
      <Draw on={beat >= 2} delay={dl(2, 1.3)} d={lineD(C.x, C.y, A.x, A.y)} stroke={INK} sw={2} dur={0.4} />
      <Fade on={beat >= 2} delay={dl(2, 1.8)}>
        <circle cx={A.x} cy={A.y} r={4} fill={INK} />
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 2.0)}>
        <T x={318} y={172} size={13} fill={INK} anchor="middle" weight={700}>A(1,5)</T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 2.3)}>
        <circle cx={B.x} cy={B.y} r={4} fill={INK} />
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 2.5)}>
        <T x={150} y={438} size={13} fill={INK} anchor="end" weight={700}>B(-3,-1)</T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 2.8)}>
        <circle cx={C.x} cy={C.y} r={4} fill={INK} />
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 3.0)}>
        <T x={480} y={438} size={13} fill={INK} anchor="start" weight={700}>C(5,-1)</T>
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 3.4)}>
        <circle cx={D.x} cy={D.y} r={3} fill={MUTED} />
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 3.6)}>
        <T x={330} y={432} size={12} fill={MUTED} anchor="start">D</T>
      </Fade>
      <Draw on={beat >= 2} delay={dl(2, 4.0)} d={lineD(A.x, A.y, D.x, D.y)} stroke={AMBER} sw={2} dur={0.5} />
      <Draw on={beat >= 2} delay={dl(2, 4.6)} d={lineD(B.x, B.y, E.x, E.y)} stroke={AMBER} sw={2} dur={0.5} />
      <Draw on={beat >= 2} delay={dl(2, 5.2)} d={lineD(C.x, C.y, F.x, F.y)} stroke={AMBER} sw={2} dur={0.5} />
      <Fade on={beat >= 2} delay={dl(2, 5.9)}>
        <circle cx={G.x} cy={G.y} r={5} fill={AMBER_DARK} />
      </Fade>
      <Fade on={beat >= 2} delay={dl(2, 6.1)}>
        <T x={332} y={348} size={13} fill={AMBER_DARK} anchor="start" weight={700}>G</T>
      </Fade>

      {/* beat 3 — ring G: "where the three medians meet" */}
      <Draw on={beat >= 3} delay={dl(3, 0)} d={ringD(331, 340, 30, 22)} stroke={AMBER_DARK} sw={2.2} dur={0.6} />

      {/* beat 4 — the 2:1 ratio, marked directly on median AD */}
      <Fade on={beat >= 4} delay={dl(4, 0)}>
        <T x={336} y={270} size={13} fill={AMBER_DARK} anchor="start" weight={700}>2</T>
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 0.35)}>
        <T x={336} y={390} size={13} fill={AMBER_DARK} anchor="start" weight={700}>1</T>
      </Fade>

      {/* beat 5 — right column: the coordinate formula */}
      <Fade on={beat >= 5} delay={dl(5, 0)}>
        <T x={600} y={210} size={14} fill={INK} anchor="start">
          {t("In coordinates:", "Coordinates mein:")}
        </T>
      </Fade>
      <Fade on={beat >= 5} delay={dl(5, 0.4)}>
        <T x={600} y={240} size={17} fill={AMBER_DARK} anchor="start" weight={700}>
          G = ( (x1+x2+x3)/3 , (y1+y2+y3)/3 )
        </T>
      </Fade>

      {/* beat 6 — independence: each coordinate balances alone */}
      <Draw on={beat >= 6} delay={dl(6, 0)} d={checkD(605, 288, 14)} stroke={GREEN} sw={2.5} dur={0.4} />
      <Fade on={beat >= 6} delay={dl(6, 0.4)}>
        <T x={628} y={292} size={14} fill={INK} anchor="start">
          {t("Each coordinate balances alone — three 1D acts.", "Har coordinate akela balance hota hai — teen 1D acts.")}
        </T>
      </Fade>

      {/* beat 7 — guardrail: always exists, always unique, side-length independent */}
      <Draw on={beat >= 7} delay={dl(7, 0)} d="M 600 320 L 600 372" stroke={RED} sw={4} dur={0.4} />
      <Fade on={beat >= 7} delay={dl(7, 0.5)}>
        <T x={616} y={340} size={14} fill={RED} anchor="start" weight={700}>
          {t("G always exists, always unique —", "G hamesha exist karta hai, hamesha unique hai —")}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 0.8)}>
        <T x={616} y={362} size={14} fill={RED} anchor="start" weight={700}>
          {t("depends only on vertices, not side lengths.", "sirf vertices pe depend hai, side lengths pe nahi.")}
        </T>
      </Fade>
    </svg>
  );
}
