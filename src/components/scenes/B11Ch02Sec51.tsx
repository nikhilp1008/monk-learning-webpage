"use client";

/**
 * B11 Ch02 · Section 51 — "Virion, capsid, capsomeres" (subtopic 5
 * continues) Canvas 1080×620 · safe x36–1044, y30–596.
 *
 * Beats (en [0, 9.47, 26.62, 44.63, 51.63, 68.61, 81.15, 100.95]):
 *  0 title
 *  1 virion = whole particle, chemically a nucleoprotein -> bullseye
 *    diagram lands (capsid ring + core + capsomere dots undrawn yet)
 *  2 unpack: core/capsid/capsomeres labels + leader land on the bullseye
 *  3 transition "2 shapes you must know" + dashed divider drawn
 *  4 TMV rod (helical capsomeres, coiled RNA) lands on the right
 *  5 size facts: too small for light microscope, passes bacterial filters
 *  6 inertness, the structural reason: no ribosomes/enzymes/organelles
 *  7 bullseye dims -> bacteriophage anatomy drawn in its place (head /
 *    collar / sheath-tail / tail fibres) + closing sequence chip
 *
 * Layout plan — two diagram zones separated by a dashed divider so
 * neither ever needs to share x-range with the other:
 *  b1  capsid ring + core       | circle/circle   | cx230 cy380 r95 / r38
 *  b2  CAPSID label + subnote    | T mid           | x230 y308/323
 *  b2  core label                 | T mid CREAM      | x230 y383
 *  b2  8 capsomere dots            | circle x8         | r95 ring around cx230,cy380
 *  b2  capsomere leader + label     | line + T start     | (297,447)->(340,460), x345 y463
 *  b3  dashed divider                | line dashed         | x565 y280..470
 *  b4  TMV rod                        | Draw rect            | x650..950 y330..400
 *  b4  TMV ticks + coil + labels       | lines/path/T          | inside rod, y418..458
 *  b7  bullseye dims (beat>=7)          | Fade dim               | (same group as b1/b2)
 *  b7  phage head/collar/sheath/fibres   | polygon/rect/lines      | x170..270 y295..465
 *  b7  phage labels                       | T start                 | x345 y320/370/400/450
 *  b7  closing sequence chip               | Chip fill INK             | x240..840 y520..560
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
  INK,
  MUTED,
  AMBER_DARK,
  GREEN,
  RED,
  CREAM,
  PAPER,
} from "./kit";

const DOT_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];
function dotPos(deg: number, r: number, cx: number, cy: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function B11Ch02Sec51({ currentTime, reveals, language }: SceneProps) {
  const beat = useBeat(currentTime, reveals);
  const en = language === "english";
  const t = (e: string, h: string) => (en ? e : h);
  const dl = (k: number, d: number) => delayFor(beat, k, d);

  return (
    <svg
      viewBox="0 0 1080 620"
      preserveAspectRatio="xMidYMin meet"
      className="w-full h-full select-none"
    >
      {/* beat 0 — title */}
      <Fade on={beat >= 0} delay={dl(0, 0.2)}>
        <T x={540} y={52} size={16} fill={RED} script>
          {t("virion, capsid, capsomeres", "virion, capsid, capsomeres")}
        </T>
      </Fade>

      {/* beat 1 — virion / nucleoprotein */}
      <Fade on={beat >= 1} delay={dl(1, 0.3)}>
        <T x={540} y={100} size={12} fill={INK} script>
          {t("a complete virus particle = VIRION", "ek pura virus particle = VIRION")}
        </T>
      </Fade>
      <Fade on={beat >= 1} delay={dl(1, 0.9)}>
        <T x={540} y={126} size={11} fill={AMBER_DARK} script>
          {t(
            "chemically: an infectious NUCLEOPROTEIN — nucleo=acid, protein=coat",
            "chemically: ek infectious NUCLEOPROTEIN — nucleo=acid, protein=coat"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 1} dim={beat >= 7} delay={dl(1, 1.6)}>
        <circle cx={230} cy={380} r={95} fill={PAPER} stroke={INK} strokeWidth={2.2} />
        <circle cx={230} cy={380} r={38} fill={AMBER_DARK} />
      </Fade>

      {/* beat 2 — unpack: core / capsid / capsomeres */}
      <Fade on={beat >= 2} dim={beat >= 7} delay={dl(2, 0.3)}>
        <T x={230} y={383} size={9} fill={CREAM} weight={700}>
          nucleic acid
        </T>
        <T x={230} y={308} size={12} fill={INK} weight={700}>
          CAPSID
        </T>
        <T x={230} y={323} size={9} fill={INK}>
          {t("(protein coat)", "(protein coat)")}
        </T>
        {DOT_ANGLES.map((deg) => {
          const p = dotPos(deg, 95, 230, 380);
          return <circle key={deg} cx={p.x} cy={p.y} r={4} fill={GREEN} />;
        })}
        <line x1={297.2} y1={447.2} x2={340} y2={460} stroke={AMBER_DARK} strokeWidth={1.4} />
        <T x={345} y={463} size={10} fill={AMBER_DARK} anchor="start">
          = capsomeres (repeating subunits)
        </T>
      </Fade>

      {/* beat 3 — 2 shapes you must know + divider */}
      <Fade on={beat >= 3} delay={dl(3, 0.3)}>
        <T x={540} y={152} size={12} fill={GREEN} script>
          {t(
            "the board — there isn't one virus shape, there are two",
            "board dekho — virus ki ek shape nahi, do hain jo aani chahiye"
          )}
        </T>
      </Fade>
      <Fade on={beat >= 3} delay={dl(3, 1)}>
        <line x1={565} y1={280} x2={565} y2={470} stroke={MUTED} strokeWidth={1.6} strokeDasharray="6 5" />
      </Fade>

      {/* beat 4 — TMV, helical */}
      <Draw
        on={beat >= 4}
        delay={dl(4, 0.3)}
        d="M 650 330 h 300 v 70 h -300 z"
        stroke={INK}
        sw={2}
        dur={0.8}
        fill={PAPER}
      />
      <Fade on={beat >= 4} delay={dl(4, 1.3)}>
        <path
          d="M 665 332 V 398 M 692 332 V 398 M 719 332 V 398 M 746 332 V 398 M 773 332 V 398 M 800 332 V 398 M 827 332 V 398 M 854 332 V 398 M 881 332 V 398 M 908 332 V 398 M 935 332 V 398"
          stroke={AMBER_DARK}
          strokeWidth={1.2}
          opacity={0.55}
        />
        <path
          d="M 660 365 q 12 -14 24 0 q 12 14 24 0 q 12 -14 24 0 q 12 14 24 0 q 12 -14 24 0 q 12 14 24 0 q 12 -14 24 0 q 12 14 24 0 q 12 -14 24 0 q 12 14 24 0"
          fill="none"
          stroke={AMBER_DARK}
          strokeWidth={2.4}
        />
      </Fade>
      <Fade on={beat >= 4} delay={dl(4, 1.9)}>
        <T x={800} y={418} size={12} fill={INK} weight={700}>
          Tobacco Mosaic Virus (TMV)
        </T>
        <T x={800} y={440} size={11} fill={GREEN} weight={700}>
          {t("capsomeres arranged HELICALLY", "capsomeres HELICALLY sajayi jaati")}
        </T>
        <T x={800} y={458} size={10} fill={MUTED}>
          {t("(or polyhedrally / icosahedral)", "(ya polyhedrally / icosahedral)")}
        </T>
      </Fade>

      {/* beat 5 — size facts */}
      <Fade on={beat >= 5} delay={dl(5, 0.3)}>
        <T x={540} y={178} size={11} fill={INK} script>
          {t(
            "too small for a light microscope; pass through filters that stop bacteria",
            "light microscope se dekhne layak nahi; bacteria-stopping filters se nikal jaate"
          )}
        </T>
      </Fade>

      {/* beat 6 — inertness, the structural reason */}
      <Fade on={beat >= 6} delay={dl(6, 0.3)}>
        <T x={540} y={204} size={11} fill={RED} script>
          {t(
            "no ribosomes, no enzymes, no organelles of their own → inert outside a host",
            "na ribosomes, na enzymes, na apne organelles → host ke bahar inert"
          )}
        </T>
      </Fade>

      {/* beat 7 — bacteriophage anatomy replaces the bullseye */}
      <Fade on={beat >= 7} delay={dl(7, 0.3)}>
        <path
          d="M 230 295 L 262 313 L 262 347 L 230 365 L 198 347 L 198 313 Z"
          fill={PAPER}
          stroke={INK}
          strokeWidth={2}
        />
        <rect x={210} y={365} width={40} height={10} fill={INK} />
        <rect x={218} y={375} width={24} height={55} fill={INK} />
        <line x1={200} y1={430} x2={178} y2={462} stroke={INK} strokeWidth={2.2} />
        <line x1={216} y1={430} x2={205} y2={465} stroke={INK} strokeWidth={2.2} />
        <line x1={244} y1={430} x2={255} y2={465} stroke={INK} strokeWidth={2.2} />
        <line x1={260} y1={430} x2={282} y2={462} stroke={INK} strokeWidth={2.2} />
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1)}>
        <T x={345} y={318} size={11} fill={INK} anchor="start" weight={700}>
          {t("HEAD", "HEAD")}
        </T>
        <T x={345} y={332} size={9} fill={INK} anchor="start">
          {t("holds nucleic acid", "nucleic acid rakhta hai")}
        </T>
        <T x={345} y={373} size={11} fill={INK} anchor="start" weight={700}>
          COLLAR
        </T>
        <T x={345} y={405} size={11} fill={INK} anchor="start" weight={700}>
          {t("SHEATH / TAIL", "SHEATH / TAIL")}
        </T>
        <T x={345} y={450} size={11} fill={INK} anchor="start" weight={700}>
          {t("TAIL FIBRES", "TAIL FIBRES")}
        </T>
        <T x={345} y={464} size={9} fill={INK} anchor="start">
          {t("anchor to the bacterial host", "bacterial host se jodta hai")}
        </T>
      </Fade>
      <Fade on={beat >= 7} delay={dl(7, 1.8)}>
        <Chip x={240} y={520} w={600} h={40} fill={INK} textFill={CREAM} size={12} script={false}>
          {t(
            "HEAD → COLLAR → SHEATH/TAIL → TAIL FIBRES — the sequence worth having ready",
            "HEAD → COLLAR → SHEATH/TAIL → TAIL FIBRES — yeh sequence taiyar rakhna"
          )}
        </Chip>
      </Fade>
    </svg>
  );
}
