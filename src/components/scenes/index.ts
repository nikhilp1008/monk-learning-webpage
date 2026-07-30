/**
 * Scene registry — hand-choreographed board scenes, keyed by
 * `${chapter_id}:${section position}`. Sections with a registered scene
 * play full motion; everything else falls back to the premium board events.
 */

import type React from "react";
import type { SceneProps } from "./kit";
import Ch01Sec1 from "./Ch01Sec1";
import Ch01Sec2 from "./Ch01Sec2";
import Ch01Sec3 from "./Ch01Sec3";
import Ch01Sec4 from "./Ch01Sec4";
import Ch01Sec5 from "./Ch01Sec5";
import Ch01Sec6 from "./Ch01Sec6";
import Ch01Sec7 from "./Ch01Sec7";
import Ch01Sec8 from "./Ch01Sec8";
import Ch01Sec9 from "./Ch01Sec9";
import Ch01Sec10 from "./Ch01Sec10";
import Ch01Sec11 from "./Ch01Sec11";
import Ch01Sec12 from "./Ch01Sec12";
import Ch01Sec13 from "./Ch01Sec13";
import Ch01Sec14 from "./Ch01Sec14";
import Ch01Sec15 from "./Ch01Sec15";
import Ch01Sec16 from "./Ch01Sec16";
import Ch01Sec17 from "./Ch01Sec17";
import Ch01Sec18 from "./Ch01Sec18";
import Ch01Sec19 from "./Ch01Sec19";
import Ch01Sec20 from "./Ch01Sec20";
import Ch01Sec21 from "./Ch01Sec21";
import Ch01Sec22 from "./Ch01Sec22";
import Ch01Sec23 from "./Ch01Sec23";
import Ch01Sec24 from "./Ch01Sec24";
import Ch01Sec25 from "./Ch01Sec25";
import Ch01Sec26 from "./Ch01Sec26";
import Ch01Sec27 from "./Ch01Sec27";
import Ch01Sec28 from "./Ch01Sec28";
import Ch01Sec29 from "./Ch01Sec29";
import Ch01Sec30 from "./Ch01Sec30";
import Ch01Sec31 from "./Ch01Sec31";
import Ch01Sec32 from "./Ch01Sec32";
import Ch01Sec33 from "./Ch01Sec33";
import Ch01Sec34 from "./Ch01Sec34";
import Ch01Sec35 from "./Ch01Sec35";
import Ch01Sec36 from "./Ch01Sec36";
import Ch01Sec37 from "./Ch01Sec37";
import Ch01Sec38 from "./Ch01Sec38";
import Ch01Sec39 from "./Ch01Sec39";
import Ch01Sec40 from "./Ch01Sec40";
import Ch01Sec41 from "./Ch01Sec41";
import Ch01Sec42 from "./Ch01Sec42";
import Ch01Sec43 from "./Ch01Sec43";
import Ch01Sec44 from "./Ch01Sec44";
import Ch01Sec45 from "./Ch01Sec45";
import Ch01Sec46 from "./Ch01Sec46";
import Ch01Sec47 from "./Ch01Sec47";
import Ch01Sec48 from "./Ch01Sec48";
import Ch01Sec49 from "./Ch01Sec49";
import Ch01Sec50 from "./Ch01Sec50";
import Ch01Sec51 from "./Ch01Sec51";
import Ch01Sec52 from "./Ch01Sec52";

const CH01 = "8d7ccfaa-af16-53e4-9f28-823c8ea923d1"; // Class 11 · Units & Measurements

const REGISTRY: Record<string, React.ComponentType<SceneProps>> = {
  [`${CH01}:1`]: Ch01Sec1,
  [`${CH01}:2`]: Ch01Sec2,
  [`${CH01}:3`]: Ch01Sec3,
  [`${CH01}:4`]: Ch01Sec4,
  [`${CH01}:5`]: Ch01Sec5,
  [`${CH01}:6`]: Ch01Sec6,
  [`${CH01}:7`]: Ch01Sec7,
  [`${CH01}:8`]: Ch01Sec8,
  [`${CH01}:9`]: Ch01Sec9,
  [`${CH01}:10`]: Ch01Sec10,
  [`${CH01}:11`]: Ch01Sec11,
  [`${CH01}:12`]: Ch01Sec12,
  [`${CH01}:13`]: Ch01Sec13,
  [`${CH01}:14`]: Ch01Sec14,
  [`${CH01}:15`]: Ch01Sec15,
  [`${CH01}:16`]: Ch01Sec16,
  [`${CH01}:17`]: Ch01Sec17,
  [`${CH01}:18`]: Ch01Sec18,
  [`${CH01}:19`]: Ch01Sec19,
  [`${CH01}:20`]: Ch01Sec20,
  [`${CH01}:21`]: Ch01Sec21,
  [`${CH01}:22`]: Ch01Sec22,
  [`${CH01}:23`]: Ch01Sec23,
  [`${CH01}:24`]: Ch01Sec24,
  [`${CH01}:25`]: Ch01Sec25,
  [`${CH01}:26`]: Ch01Sec26,
  [`${CH01}:27`]: Ch01Sec27,
  [`${CH01}:28`]: Ch01Sec28,
  [`${CH01}:29`]: Ch01Sec29,
  [`${CH01}:30`]: Ch01Sec30,
  [`${CH01}:31`]: Ch01Sec31,
  [`${CH01}:32`]: Ch01Sec32,
  [`${CH01}:33`]: Ch01Sec33,
  [`${CH01}:34`]: Ch01Sec34,
  [`${CH01}:35`]: Ch01Sec35,
  [`${CH01}:36`]: Ch01Sec36,
  [`${CH01}:37`]: Ch01Sec37,
  [`${CH01}:38`]: Ch01Sec38,
  [`${CH01}:39`]: Ch01Sec39,
  [`${CH01}:40`]: Ch01Sec40,
  [`${CH01}:41`]: Ch01Sec41,
  [`${CH01}:42`]: Ch01Sec42,
  [`${CH01}:43`]: Ch01Sec43,
  [`${CH01}:44`]: Ch01Sec44,
  [`${CH01}:45`]: Ch01Sec45,
  [`${CH01}:46`]: Ch01Sec46,
  [`${CH01}:47`]: Ch01Sec47,
  [`${CH01}:48`]: Ch01Sec48,
  [`${CH01}:49`]: Ch01Sec49,
  [`${CH01}:50`]: Ch01Sec50,
  [`${CH01}:51`]: Ch01Sec51,
  [`${CH01}:52`]: Ch01Sec52,
};

export function getScene(
  chapterId: string | undefined,
  position: number | null | undefined
): React.ComponentType<SceneProps> | null {
  if (!chapterId || position == null) return null;
  return REGISTRY[`${chapterId}:${position}`] ?? null;
}

export type { SceneProps };
