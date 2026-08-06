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
import Ch01Sec53 from "./Ch01Sec53";
import Ch01Sec54 from "./Ch01Sec54";
import Ch01Sec55 from "./Ch01Sec55";
import Ch01Sec56 from "./Ch01Sec56";
import Ch01Sec57 from "./Ch01Sec57";
import Ch01Sec58 from "./Ch01Sec58";
import Ch01Sec59 from "./Ch01Sec59";
import Ch01Sec60 from "./Ch01Sec60";
import Ch01Sec61 from "./Ch01Sec61";
import Ch01Sec62 from "./Ch01Sec62";
import Ch01Sec63 from "./Ch01Sec63";
import Ch01Sec64 from "./Ch01Sec64";
import Ch01Sec65 from "./Ch01Sec65";
import Ch01Sec66 from "./Ch01Sec66";
import Ch01Sec67 from "./Ch01Sec67";
import Ch01Sec68 from "./Ch01Sec68";
import Ch01Sec69 from "./Ch01Sec69";
import Ch01Sec70 from "./Ch01Sec70";
import Ch01Sec71 from "./Ch01Sec71";
import Ch01Sec72 from "./Ch01Sec72";
import Ch01Sec73 from "./Ch01Sec73";
import Ch01Sec74 from "./Ch01Sec74";
import Ch01Sec75 from "./Ch01Sec75";
import Ch01Sec76 from "./Ch01Sec76";
import Ch01Sec77 from "./Ch01Sec77";
import Ch01Sec78 from "./Ch01Sec78";
import Ch01Sec79 from "./Ch01Sec79";
import Ch01Sec80 from "./Ch01Sec80";
import Ch01Sec81 from "./Ch01Sec81";
import Ch01Sec82 from "./Ch01Sec82";
import Ch01Sec83 from "./Ch01Sec83";
import Ch01Sec84 from "./Ch01Sec84";
import Ch01Sec85 from "./Ch01Sec85";
import Ch01Sec86 from "./Ch01Sec86";
import Ch01Sec87 from "./Ch01Sec87";
import Ch01Sec88 from "./Ch01Sec88";
import Ch01Sec89 from "./Ch01Sec89";
import Ch01Sec90 from "./Ch01Sec90";
import Ch01Sec91 from "./Ch01Sec91";
import Ch01Sec92 from "./Ch01Sec92";
import Ch02Sec1 from "./Ch02Sec1";
import Ch02Sec2 from "./Ch02Sec2";
import Ch02Sec3 from "./Ch02Sec3";
import Ch02Sec4 from "./Ch02Sec4";
import Ch02Sec5 from "./Ch02Sec5";
import Ch02Sec6 from "./Ch02Sec6";
import Ch02Sec7 from "./Ch02Sec7";
import Ch02Sec8 from "./Ch02Sec8";
import Ch02Sec9 from "./Ch02Sec9";
import Ch02Sec10 from "./Ch02Sec10";
import Ch02Sec11 from "./Ch02Sec11";
import Ch02Sec12 from "./Ch02Sec12";
import Ch02Sec13 from "./Ch02Sec13";
import Ch02Sec14 from "./Ch02Sec14";
import Ch02Sec15 from "./Ch02Sec15";
import Ch02Sec16 from "./Ch02Sec16";
import Ch02Sec17 from "./Ch02Sec17";
import Ch02Sec18 from "./Ch02Sec18";
import Ch02Sec19 from "./Ch02Sec19";
import Ch02Sec20 from "./Ch02Sec20";
import Ch02Sec21 from "./Ch02Sec21";
import Ch02Sec22 from "./Ch02Sec22";
import Ch02Sec23 from "./Ch02Sec23";
import Ch02Sec24 from "./Ch02Sec24";
import Ch02Sec25 from "./Ch02Sec25";
import Ch02Sec26 from "./Ch02Sec26";
import Ch02Sec27 from "./Ch02Sec27";
import Ch02Sec28 from "./Ch02Sec28";
import Ch02Sec29 from "./Ch02Sec29";
import Ch02Sec30 from "./Ch02Sec30";
import Ch02Sec31 from "./Ch02Sec31";
import Ch02Sec32 from "./Ch02Sec32";
import Ch02Sec33 from "./Ch02Sec33";
import Ch02Sec34 from "./Ch02Sec34";
import Ch02Sec35 from "./Ch02Sec35";
import Ch02Sec36 from "./Ch02Sec36";
import Ch02Sec37 from "./Ch02Sec37";
import Ch02Sec38 from "./Ch02Sec38";
import Ch02Sec39 from "./Ch02Sec39";
import Ch02Sec40 from "./Ch02Sec40";
import Ch02Sec41 from "./Ch02Sec41";
import Ch02Sec42 from "./Ch02Sec42";
import Ch02Sec43 from "./Ch02Sec43";
import Ch02Sec44 from "./Ch02Sec44";
import Ch02Sec45 from "./Ch02Sec45";
import Ch02Sec46 from "./Ch02Sec46";
import Ch02Sec47 from "./Ch02Sec47";
import Ch02Sec48 from "./Ch02Sec48";
import Ch02Sec49 from "./Ch02Sec49";
import Ch02Sec50 from "./Ch02Sec50";
import Ch02Sec51 from "./Ch02Sec51";
import Ch02Sec52 from "./Ch02Sec52";
import Ch02Sec53 from "./Ch02Sec53";
import Ch02Sec54 from "./Ch02Sec54";
import Ch02Sec55 from "./Ch02Sec55";
import Ch02Sec56 from "./Ch02Sec56";
import Ch02Sec57 from "./Ch02Sec57";
import Ch02Sec58 from "./Ch02Sec58";
import Ch02Sec59 from "./Ch02Sec59";
import Ch02Sec60 from "./Ch02Sec60";
import Ch02Sec61 from "./Ch02Sec61";
import Ch02Sec62 from "./Ch02Sec62";
import Ch02Sec63 from "./Ch02Sec63";
import Ch02Sec64 from "./Ch02Sec64";
import Ch02Sec65 from "./Ch02Sec65";
import Ch02Sec66 from "./Ch02Sec66";
import Ch02Sec67 from "./Ch02Sec67";
import Ch02Sec68 from "./Ch02Sec68";
import Ch02Sec69 from "./Ch02Sec69";
import Ch02Sec70 from "./Ch02Sec70";
import Ch02Sec71 from "./Ch02Sec71";
import Ch02Sec72 from "./Ch02Sec72";
import Ch02Sec73 from "./Ch02Sec73";
// ── Ch05 imports (Work, Energy & Power) — session branch premium-board-ch5 ──
import Ch05Sec1 from "./Ch05Sec1";
import Ch05Sec2 from "./Ch05Sec2";
import Ch05Sec3 from "./Ch05Sec3";
import Ch05Sec4 from "./Ch05Sec4";
import Ch05Sec5 from "./Ch05Sec5";
import Ch05Sec6 from "./Ch05Sec6";
import Ch05Sec7 from "./Ch05Sec7";
import Ch05Sec8 from "./Ch05Sec8";
import Ch05Sec9 from "./Ch05Sec9";
import Ch05Sec10 from "./Ch05Sec10";
import Ch05Sec11 from "./Ch05Sec11";
import Ch05Sec12 from "./Ch05Sec12";
import Ch05Sec13 from "./Ch05Sec13";
import Ch05Sec14 from "./Ch05Sec14";
import Ch05Sec15 from "./Ch05Sec15";
import Ch05Sec16 from "./Ch05Sec16";
import Ch05Sec17 from "./Ch05Sec17";
import Ch05Sec18 from "./Ch05Sec18";
import Ch05Sec19 from "./Ch05Sec19";
import Ch05Sec20 from "./Ch05Sec20";
import Ch05Sec21 from "./Ch05Sec21";
import Ch05Sec22 from "./Ch05Sec22";
import Ch05Sec23 from "./Ch05Sec23";
import Ch05Sec24 from "./Ch05Sec24";
import Ch05Sec25 from "./Ch05Sec25";
import Ch05Sec26 from "./Ch05Sec26";
import Ch05Sec27 from "./Ch05Sec27";
import Ch05Sec28 from "./Ch05Sec28";
import Ch05Sec29 from "./Ch05Sec29";
import Ch05Sec30 from "./Ch05Sec30";
import Ch05Sec31 from "./Ch05Sec31";
import Ch05Sec32 from "./Ch05Sec32";
import Ch05Sec33 from "./Ch05Sec33";
import Ch05Sec34 from "./Ch05Sec34";
import Ch05Sec35 from "./Ch05Sec35";
import Ch05Sec36 from "./Ch05Sec36";
import Ch05Sec37 from "./Ch05Sec37";
import Ch05Sec38 from "./Ch05Sec38";
import Ch05Sec39 from "./Ch05Sec39";
import Ch05Sec40 from "./Ch05Sec40";
import Ch05Sec41 from "./Ch05Sec41";
import Ch05Sec42 from "./Ch05Sec42";
import Ch05Sec43 from "./Ch05Sec43";
import Ch05Sec44 from "./Ch05Sec44";
import Ch05Sec45 from "./Ch05Sec45";
import Ch05Sec46 from "./Ch05Sec46";
import Ch05Sec47 from "./Ch05Sec47";
import Ch05Sec48 from "./Ch05Sec48";
import Ch05Sec49 from "./Ch05Sec49";
import Ch05Sec50 from "./Ch05Sec50";
import Ch05Sec51 from "./Ch05Sec51";
import Ch05Sec52 from "./Ch05Sec52";
import Ch05Sec53 from "./Ch05Sec53";
import Ch05Sec54 from "./Ch05Sec54";
import Ch05Sec55 from "./Ch05Sec55";
import Ch05Sec56 from "./Ch05Sec56";
import Ch05Sec57 from "./Ch05Sec57";
import Ch05Sec58 from "./Ch05Sec58";
import Ch05Sec59 from "./Ch05Sec59";
import Ch05Sec60 from "./Ch05Sec60";
import Ch05Sec61 from "./Ch05Sec61";
import Ch05Sec62 from "./Ch05Sec62";
// ── end Ch05 imports ──

const CH01 = "8d7ccfaa-af16-53e4-9f28-823c8ea923d1"; // Class 11 · Units & Measurements
const CH02 = "563ae2b1-3427-537a-afde-f7fbc193731f"; // Class 11 · Motion in a Straight Line
const CH05 = "a88de5d2-84e4-5489-878a-f17a195e3267"; // Class 11 · Work, Energy & Power

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
  [`${CH01}:53`]: Ch01Sec53,
  [`${CH01}:54`]: Ch01Sec54,
  [`${CH01}:55`]: Ch01Sec55,
  [`${CH01}:56`]: Ch01Sec56,
  [`${CH01}:57`]: Ch01Sec57,
  [`${CH01}:58`]: Ch01Sec58,
  [`${CH01}:59`]: Ch01Sec59,
  [`${CH01}:60`]: Ch01Sec60,
  [`${CH01}:61`]: Ch01Sec61,
  [`${CH01}:62`]: Ch01Sec62,
  [`${CH01}:63`]: Ch01Sec63,
  [`${CH01}:64`]: Ch01Sec64,
  [`${CH01}:65`]: Ch01Sec65,
  [`${CH01}:66`]: Ch01Sec66,
  [`${CH01}:67`]: Ch01Sec67,
  [`${CH01}:68`]: Ch01Sec68,
  [`${CH01}:69`]: Ch01Sec69,
  [`${CH01}:70`]: Ch01Sec70,
  [`${CH01}:71`]: Ch01Sec71,
  [`${CH01}:72`]: Ch01Sec72,
  [`${CH01}:73`]: Ch01Sec73,
  [`${CH01}:74`]: Ch01Sec74,
  [`${CH01}:75`]: Ch01Sec75,
  [`${CH01}:76`]: Ch01Sec76,
  [`${CH01}:77`]: Ch01Sec77,
  [`${CH01}:78`]: Ch01Sec78,
  [`${CH01}:79`]: Ch01Sec79,
  [`${CH01}:80`]: Ch01Sec80,
  [`${CH01}:81`]: Ch01Sec81,
  [`${CH01}:82`]: Ch01Sec82,
  [`${CH01}:83`]: Ch01Sec83,
  [`${CH01}:84`]: Ch01Sec84,
  [`${CH01}:85`]: Ch01Sec85,
  [`${CH01}:86`]: Ch01Sec86,
  [`${CH01}:87`]: Ch01Sec87,
  [`${CH01}:88`]: Ch01Sec88,
  [`${CH01}:89`]: Ch01Sec89,
  [`${CH01}:90`]: Ch01Sec90,
  [`${CH01}:91`]: Ch01Sec91,
  [`${CH01}:92`]: Ch01Sec92,
  [`${CH02}:1`]: Ch02Sec1,
  [`${CH02}:2`]: Ch02Sec2,
  [`${CH02}:3`]: Ch02Sec3,
  [`${CH02}:4`]: Ch02Sec4,
  [`${CH02}:5`]: Ch02Sec5,
  [`${CH02}:6`]: Ch02Sec6,
  [`${CH02}:7`]: Ch02Sec7,
  [`${CH02}:8`]: Ch02Sec8,
  [`${CH02}:9`]: Ch02Sec9,
  [`${CH02}:10`]: Ch02Sec10,
  [`${CH02}:11`]: Ch02Sec11,
  [`${CH02}:12`]: Ch02Sec12,
  [`${CH02}:13`]: Ch02Sec13,
  [`${CH02}:14`]: Ch02Sec14,
  [`${CH02}:15`]: Ch02Sec15,
  [`${CH02}:16`]: Ch02Sec16,
  [`${CH02}:17`]: Ch02Sec17,
  [`${CH02}:18`]: Ch02Sec18,
  [`${CH02}:19`]: Ch02Sec19,
  [`${CH02}:20`]: Ch02Sec20,
  [`${CH02}:21`]: Ch02Sec21,
  [`${CH02}:22`]: Ch02Sec22,
  [`${CH02}:23`]: Ch02Sec23,
  [`${CH02}:24`]: Ch02Sec24,
  [`${CH02}:25`]: Ch02Sec25,
  [`${CH02}:26`]: Ch02Sec26,
  [`${CH02}:27`]: Ch02Sec27,
  [`${CH02}:28`]: Ch02Sec28,
  [`${CH02}:29`]: Ch02Sec29,
  [`${CH02}:30`]: Ch02Sec30,
  [`${CH02}:31`]: Ch02Sec31,
  [`${CH02}:32`]: Ch02Sec32,
  [`${CH02}:33`]: Ch02Sec33,
  [`${CH02}:34`]: Ch02Sec34,
  [`${CH02}:35`]: Ch02Sec35,
  [`${CH02}:36`]: Ch02Sec36,
  [`${CH02}:37`]: Ch02Sec37,
  [`${CH02}:38`]: Ch02Sec38,
  [`${CH02}:39`]: Ch02Sec39,
  [`${CH02}:40`]: Ch02Sec40,
  [`${CH02}:41`]: Ch02Sec41,
  [`${CH02}:42`]: Ch02Sec42,
  [`${CH02}:43`]: Ch02Sec43,
  [`${CH02}:44`]: Ch02Sec44,
  [`${CH02}:45`]: Ch02Sec45,
  [`${CH02}:46`]: Ch02Sec46,
  [`${CH02}:47`]: Ch02Sec47,
  [`${CH02}:48`]: Ch02Sec48,
  [`${CH02}:49`]: Ch02Sec49,
  [`${CH02}:50`]: Ch02Sec50,
  [`${CH02}:51`]: Ch02Sec51,
  [`${CH02}:52`]: Ch02Sec52,
  [`${CH02}:53`]: Ch02Sec53,
  [`${CH02}:54`]: Ch02Sec54,
  [`${CH02}:55`]: Ch02Sec55,
  [`${CH02}:56`]: Ch02Sec56,
  [`${CH02}:57`]: Ch02Sec57,
  [`${CH02}:58`]: Ch02Sec58,
  [`${CH02}:59`]: Ch02Sec59,
  [`${CH02}:60`]: Ch02Sec60,
  [`${CH02}:61`]: Ch02Sec61,
  [`${CH02}:62`]: Ch02Sec62,
  [`${CH02}:63`]: Ch02Sec63,
  [`${CH02}:64`]: Ch02Sec64,
  [`${CH02}:65`]: Ch02Sec65,
  [`${CH02}:66`]: Ch02Sec66,
  [`${CH02}:67`]: Ch02Sec67,
  [`${CH02}:68`]: Ch02Sec68,
  [`${CH02}:69`]: Ch02Sec69,
  [`${CH02}:70`]: Ch02Sec70,
  [`${CH02}:71`]: Ch02Sec71,
  [`${CH02}:72`]: Ch02Sec72,
  [`${CH02}:73`]: Ch02Sec73,
  // ── Ch05 registry (Work, Energy & Power) — session branch premium-board-ch5 ──
  [`${CH05}:1`]: Ch05Sec1,
  [`${CH05}:2`]: Ch05Sec2,
  [`${CH05}:3`]: Ch05Sec3,
  [`${CH05}:4`]: Ch05Sec4,
  [`${CH05}:5`]: Ch05Sec5,
  [`${CH05}:6`]: Ch05Sec6,
  [`${CH05}:7`]: Ch05Sec7,
  [`${CH05}:8`]: Ch05Sec8,
  [`${CH05}:9`]: Ch05Sec9,
  [`${CH05}:10`]: Ch05Sec10,
  [`${CH05}:11`]: Ch05Sec11,
  [`${CH05}:12`]: Ch05Sec12,
  [`${CH05}:13`]: Ch05Sec13,
  [`${CH05}:14`]: Ch05Sec14,
  [`${CH05}:15`]: Ch05Sec15,
  [`${CH05}:16`]: Ch05Sec16,
  [`${CH05}:17`]: Ch05Sec17,
  [`${CH05}:18`]: Ch05Sec18,
  [`${CH05}:19`]: Ch05Sec19,
  [`${CH05}:20`]: Ch05Sec20,
  [`${CH05}:21`]: Ch05Sec21,
  [`${CH05}:22`]: Ch05Sec22,
  [`${CH05}:23`]: Ch05Sec23,
  [`${CH05}:24`]: Ch05Sec24,
  [`${CH05}:25`]: Ch05Sec25,
  [`${CH05}:26`]: Ch05Sec26,
  [`${CH05}:27`]: Ch05Sec27,
  [`${CH05}:28`]: Ch05Sec28,
  [`${CH05}:29`]: Ch05Sec29,
  [`${CH05}:30`]: Ch05Sec30,
  [`${CH05}:31`]: Ch05Sec31,
  [`${CH05}:32`]: Ch05Sec32,
  [`${CH05}:33`]: Ch05Sec33,
  [`${CH05}:34`]: Ch05Sec34,
  [`${CH05}:35`]: Ch05Sec35,
  [`${CH05}:36`]: Ch05Sec36,
  [`${CH05}:37`]: Ch05Sec37,
  [`${CH05}:38`]: Ch05Sec38,
  [`${CH05}:39`]: Ch05Sec39,
  [`${CH05}:40`]: Ch05Sec40,
  [`${CH05}:41`]: Ch05Sec41,
  [`${CH05}:42`]: Ch05Sec42,
  [`${CH05}:43`]: Ch05Sec43,
  [`${CH05}:44`]: Ch05Sec44,
  [`${CH05}:45`]: Ch05Sec45,
  [`${CH05}:46`]: Ch05Sec46,
  [`${CH05}:47`]: Ch05Sec47,
  [`${CH05}:48`]: Ch05Sec48,
  [`${CH05}:49`]: Ch05Sec49,
  [`${CH05}:50`]: Ch05Sec50,
  [`${CH05}:51`]: Ch05Sec51,
  [`${CH05}:52`]: Ch05Sec52,
  [`${CH05}:53`]: Ch05Sec53,
  [`${CH05}:54`]: Ch05Sec54,
  [`${CH05}:55`]: Ch05Sec55,
  [`${CH05}:56`]: Ch05Sec56,
  [`${CH05}:57`]: Ch05Sec57,
  [`${CH05}:58`]: Ch05Sec58,
  [`${CH05}:59`]: Ch05Sec59,
  [`${CH05}:60`]: Ch05Sec60,
  [`${CH05}:61`]: Ch05Sec61,
  [`${CH05}:62`]: Ch05Sec62,
  // ── end Ch05 registry ──
};

export function getScene(
  chapterId: string | undefined,
  position: number | null | undefined
): React.ComponentType<SceneProps> | null {
  if (!chapterId || position == null) return null;
  return REGISTRY[`${chapterId}:${position}`] ?? null;
}

export type { SceneProps };

/* ================================================================== */
/* Ch03 — Motion in a Plane (branch premium-board-ch3)                 */
/* Registered via Object.assign so this block stays self-contained     */
/* at the end of the file; do not edit blocks above.                   */
/* ================================================================== */
import Ch03Sec1 from "./Ch03Sec1";
import Ch03Sec2 from "./Ch03Sec2";
import Ch03Sec3 from "./Ch03Sec3";
import Ch03Sec4 from "./Ch03Sec4";
import Ch03Sec5 from "./Ch03Sec5";
import Ch03Sec6 from "./Ch03Sec6";
import Ch03Sec7 from "./Ch03Sec7";
import Ch03Sec8 from "./Ch03Sec8";
import Ch03Sec9 from "./Ch03Sec9";
import Ch03Sec10 from "./Ch03Sec10";
import Ch03Sec11 from "./Ch03Sec11";
import Ch03Sec12 from "./Ch03Sec12";
import Ch03Sec13 from "./Ch03Sec13";
import Ch03Sec14 from "./Ch03Sec14";
import Ch03Sec15 from "./Ch03Sec15";
import Ch03Sec16 from "./Ch03Sec16";
import Ch03Sec17 from "./Ch03Sec17";
import Ch03Sec18 from "./Ch03Sec18";
import Ch03Sec19 from "./Ch03Sec19";
import Ch03Sec20 from "./Ch03Sec20";
import Ch03Sec21 from "./Ch03Sec21";
import Ch03Sec22 from "./Ch03Sec22";
import Ch03Sec23 from "./Ch03Sec23";
import Ch03Sec24 from "./Ch03Sec24";
import Ch03Sec25 from "./Ch03Sec25";
import Ch03Sec26 from "./Ch03Sec26";
import Ch03Sec27 from "./Ch03Sec27";
import Ch03Sec28 from "./Ch03Sec28";
import Ch03Sec29 from "./Ch03Sec29";
import Ch03Sec30 from "./Ch03Sec30";
import Ch03Sec31 from "./Ch03Sec31";
import Ch03Sec32 from "./Ch03Sec32";
import Ch03Sec33 from "./Ch03Sec33";
import Ch03Sec34 from "./Ch03Sec34";
import Ch03Sec35 from "./Ch03Sec35";
import Ch03Sec36 from "./Ch03Sec36";
import Ch03Sec37 from "./Ch03Sec37";
import Ch03Sec38 from "./Ch03Sec38";
import Ch03Sec39 from "./Ch03Sec39";
import Ch03Sec40 from "./Ch03Sec40";
import Ch03Sec41 from "./Ch03Sec41";
import Ch03Sec42 from "./Ch03Sec42";
import Ch03Sec43 from "./Ch03Sec43";
import Ch03Sec44 from "./Ch03Sec44";
import Ch03Sec45 from "./Ch03Sec45";
import Ch03Sec46 from "./Ch03Sec46";
import Ch03Sec47 from "./Ch03Sec47";
import Ch03Sec48 from "./Ch03Sec48";
import Ch03Sec49 from "./Ch03Sec49";
import Ch03Sec50 from "./Ch03Sec50";
import Ch03Sec51 from "./Ch03Sec51";
import Ch03Sec52 from "./Ch03Sec52";
import Ch03Sec53 from "./Ch03Sec53";
import Ch03Sec54 from "./Ch03Sec54";
import Ch03Sec55 from "./Ch03Sec55";
import Ch03Sec56 from "./Ch03Sec56";
import Ch03Sec57 from "./Ch03Sec57";
import Ch03Sec58 from "./Ch03Sec58";

const CH03 = "a5970ed6-3b48-55f9-9b80-8abdd3d4c336"; // Class 11 · Motion in a Plane

Object.assign(REGISTRY, {
  [`${CH03}:1`]: Ch03Sec1,
  [`${CH03}:2`]: Ch03Sec2,
  [`${CH03}:3`]: Ch03Sec3,
  [`${CH03}:4`]: Ch03Sec4,
  [`${CH03}:5`]: Ch03Sec5,
  [`${CH03}:6`]: Ch03Sec6,
  [`${CH03}:7`]: Ch03Sec7,
  [`${CH03}:8`]: Ch03Sec8,
  [`${CH03}:9`]: Ch03Sec9,
  [`${CH03}:10`]: Ch03Sec10,
  [`${CH03}:11`]: Ch03Sec11,
  [`${CH03}:12`]: Ch03Sec12,
  [`${CH03}:13`]: Ch03Sec13,
  [`${CH03}:14`]: Ch03Sec14,
  [`${CH03}:15`]: Ch03Sec15,
  [`${CH03}:16`]: Ch03Sec16,
  [`${CH03}:17`]: Ch03Sec17,
  [`${CH03}:18`]: Ch03Sec18,
  [`${CH03}:19`]: Ch03Sec19,
  [`${CH03}:20`]: Ch03Sec20,
  [`${CH03}:21`]: Ch03Sec21,
  [`${CH03}:22`]: Ch03Sec22,
  [`${CH03}:23`]: Ch03Sec23,
  [`${CH03}:24`]: Ch03Sec24,
  [`${CH03}:25`]: Ch03Sec25,
  [`${CH03}:26`]: Ch03Sec26,
  [`${CH03}:27`]: Ch03Sec27,
  [`${CH03}:28`]: Ch03Sec28,
  [`${CH03}:29`]: Ch03Sec29,
  [`${CH03}:30`]: Ch03Sec30,
  [`${CH03}:31`]: Ch03Sec31,
  [`${CH03}:32`]: Ch03Sec32,
  [`${CH03}:33`]: Ch03Sec33,
  [`${CH03}:34`]: Ch03Sec34,
  [`${CH03}:35`]: Ch03Sec35,
  [`${CH03}:36`]: Ch03Sec36,
  [`${CH03}:37`]: Ch03Sec37,
  [`${CH03}:38`]: Ch03Sec38,
  [`${CH03}:39`]: Ch03Sec39,
  [`${CH03}:40`]: Ch03Sec40,
  [`${CH03}:41`]: Ch03Sec41,
  [`${CH03}:42`]: Ch03Sec42,
  [`${CH03}:43`]: Ch03Sec43,
  [`${CH03}:44`]: Ch03Sec44,
  [`${CH03}:45`]: Ch03Sec45,
  [`${CH03}:46`]: Ch03Sec46,
  [`${CH03}:47`]: Ch03Sec47,
  [`${CH03}:48`]: Ch03Sec48,
  [`${CH03}:49`]: Ch03Sec49,
  [`${CH03}:50`]: Ch03Sec50,
  [`${CH03}:51`]: Ch03Sec51,
  [`${CH03}:52`]: Ch03Sec52,
  [`${CH03}:53`]: Ch03Sec53,
  [`${CH03}:54`]: Ch03Sec54,
  [`${CH03}:55`]: Ch03Sec55,
  [`${CH03}:56`]: Ch03Sec56,
  [`${CH03}:57`]: Ch03Sec57,
  [`${CH03}:58`]: Ch03Sec58,
});
/* ================================================================== */
/* end Ch03 block                                                      */
/* ================================================================== */
/* ================= Ch04 · Laws of Motion (premium-board-ch4) ================= */
/* Single appended block — keep ALL Ch04 imports + registrations here.          */
import Ch04Sec1 from "./Ch04Sec1";
import Ch04Sec2 from "./Ch04Sec2";
import Ch04Sec3 from "./Ch04Sec3";
import Ch04Sec4 from "./Ch04Sec4";
import Ch04Sec5 from "./Ch04Sec5";
import Ch04Sec6 from "./Ch04Sec6";
import Ch04Sec7 from "./Ch04Sec7";
import Ch04Sec8 from "./Ch04Sec8";
import Ch04Sec9 from "./Ch04Sec9";
import Ch04Sec10 from "./Ch04Sec10";
import Ch04Sec11 from "./Ch04Sec11";
import Ch04Sec12 from "./Ch04Sec12";
import Ch04Sec13 from "./Ch04Sec13";
import Ch04Sec14 from "./Ch04Sec14";
import Ch04Sec15 from "./Ch04Sec15";
import Ch04Sec16 from "./Ch04Sec16";
import Ch04Sec17 from "./Ch04Sec17";
import Ch04Sec18 from "./Ch04Sec18";
import Ch04Sec19 from "./Ch04Sec19";
import Ch04Sec20 from "./Ch04Sec20";
import Ch04Sec21 from "./Ch04Sec21";
import Ch04Sec22 from "./Ch04Sec22";
import Ch04Sec23 from "./Ch04Sec23";
import Ch04Sec24 from "./Ch04Sec24";
import Ch04Sec25 from "./Ch04Sec25";
import Ch04Sec26 from "./Ch04Sec26";
import Ch04Sec27 from "./Ch04Sec27";
import Ch04Sec28 from "./Ch04Sec28";
import Ch04Sec29 from "./Ch04Sec29";
import Ch04Sec30 from "./Ch04Sec30";
import Ch04Sec31 from "./Ch04Sec31";
import Ch04Sec32 from "./Ch04Sec32";
import Ch04Sec33 from "./Ch04Sec33";
import Ch04Sec34 from "./Ch04Sec34";
import Ch04Sec35 from "./Ch04Sec35";
import Ch04Sec36 from "./Ch04Sec36";
import Ch04Sec37 from "./Ch04Sec37";
import Ch04Sec38 from "./Ch04Sec38";
import Ch04Sec39 from "./Ch04Sec39";
import Ch04Sec40 from "./Ch04Sec40";
import Ch04Sec41 from "./Ch04Sec41";

const CH04 = "50ae6550-951b-599c-b352-1d6e5f84bc3b"; // Class 11 · Laws of Motion
Object.assign(REGISTRY, {
  [`${CH04}:1`]: Ch04Sec1,
  [`${CH04}:2`]: Ch04Sec2,
  [`${CH04}:3`]: Ch04Sec3,
  [`${CH04}:4`]: Ch04Sec4,
  [`${CH04}:5`]: Ch04Sec5,
  [`${CH04}:6`]: Ch04Sec6,
  [`${CH04}:7`]: Ch04Sec7,
  [`${CH04}:8`]: Ch04Sec8,
  [`${CH04}:9`]: Ch04Sec9,
  [`${CH04}:10`]: Ch04Sec10,
  [`${CH04}:11`]: Ch04Sec11,
  [`${CH04}:12`]: Ch04Sec12,
  [`${CH04}:13`]: Ch04Sec13,
  [`${CH04}:14`]: Ch04Sec14,
  [`${CH04}:15`]: Ch04Sec15,
  [`${CH04}:16`]: Ch04Sec16,
  [`${CH04}:17`]: Ch04Sec17,
  [`${CH04}:18`]: Ch04Sec18,
  [`${CH04}:19`]: Ch04Sec19,
  [`${CH04}:20`]: Ch04Sec20,
  [`${CH04}:21`]: Ch04Sec21,
  [`${CH04}:22`]: Ch04Sec22,
  [`${CH04}:23`]: Ch04Sec23,
  [`${CH04}:24`]: Ch04Sec24,
  [`${CH04}:25`]: Ch04Sec25,
  [`${CH04}:26`]: Ch04Sec26,
  [`${CH04}:27`]: Ch04Sec27,
  [`${CH04}:28`]: Ch04Sec28,
  [`${CH04}:29`]: Ch04Sec29,
  [`${CH04}:30`]: Ch04Sec30,
  [`${CH04}:31`]: Ch04Sec31,
  [`${CH04}:32`]: Ch04Sec32,
  [`${CH04}:33`]: Ch04Sec33,
  [`${CH04}:34`]: Ch04Sec34,
  [`${CH04}:35`]: Ch04Sec35,
  [`${CH04}:36`]: Ch04Sec36,
  [`${CH04}:37`]: Ch04Sec37,
  [`${CH04}:38`]: Ch04Sec38,
  [`${CH04}:39`]: Ch04Sec39,
  [`${CH04}:40`]: Ch04Sec40,
  [`${CH04}:41`]: Ch04Sec41,
});
/* =============================== end Ch04 ==================================== */
/* ─────────────────────────────────────────────────────────────────────
 * Ch06 · System of Particles & Rotational Motion (Class 11)
 * Single block appended by the ch6 worktree session — keep all Ch06
 * imports and registrations inside this block only.
 * ──────────────────────────────────────────────────────────────────── */
import Ch06Sec1 from "./Ch06Sec1";
import Ch06Sec2 from "./Ch06Sec2";
import Ch06Sec3 from "./Ch06Sec3";
import Ch06Sec4 from "./Ch06Sec4";
import Ch06Sec5 from "./Ch06Sec5";
import Ch06Sec6 from "./Ch06Sec6";
import Ch06Sec7 from "./Ch06Sec7";
import Ch06Sec8 from "./Ch06Sec8";
import Ch06Sec9 from "./Ch06Sec9";
import Ch06Sec10 from "./Ch06Sec10";
import Ch06Sec11 from "./Ch06Sec11";
import Ch06Sec12 from "./Ch06Sec12";
import Ch06Sec13 from "./Ch06Sec13";
import Ch06Sec14 from "./Ch06Sec14";
import Ch06Sec15 from "./Ch06Sec15";
import Ch06Sec16 from "./Ch06Sec16";
import Ch06Sec17 from "./Ch06Sec17";
import Ch06Sec18 from "./Ch06Sec18";
import Ch06Sec19 from "./Ch06Sec19";
import Ch06Sec20 from "./Ch06Sec20";
import Ch06Sec21 from "./Ch06Sec21";
import Ch06Sec22 from "./Ch06Sec22";
import Ch06Sec23 from "./Ch06Sec23";
import Ch06Sec24 from "./Ch06Sec24";
import Ch06Sec25 from "./Ch06Sec25";
import Ch06Sec26 from "./Ch06Sec26";
import Ch06Sec27 from "./Ch06Sec27";
import Ch06Sec28 from "./Ch06Sec28";
import Ch06Sec29 from "./Ch06Sec29";
import Ch06Sec30 from "./Ch06Sec30";
import Ch06Sec31 from "./Ch06Sec31";
import Ch06Sec32 from "./Ch06Sec32";
import Ch06Sec33 from "./Ch06Sec33";
import Ch06Sec34 from "./Ch06Sec34";
import Ch06Sec35 from "./Ch06Sec35";
import Ch06Sec36 from "./Ch06Sec36";
import Ch06Sec37 from "./Ch06Sec37";
import Ch06Sec38 from "./Ch06Sec38";
import Ch06Sec39 from "./Ch06Sec39";
import Ch06Sec40 from "./Ch06Sec40";
import Ch06Sec41 from "./Ch06Sec41";

const CH06 = "262da95c-2f3a-56da-905e-003fa8f0e4dc"; // Class 11 · System of Particles & Rotational Motion

Object.assign(REGISTRY, {
  [`${CH06}:1`]: Ch06Sec1,
  [`${CH06}:2`]: Ch06Sec2,
  [`${CH06}:3`]: Ch06Sec3,
  [`${CH06}:4`]: Ch06Sec4,
  [`${CH06}:5`]: Ch06Sec5,
  [`${CH06}:6`]: Ch06Sec6,
  [`${CH06}:7`]: Ch06Sec7,
  [`${CH06}:8`]: Ch06Sec8,
  [`${CH06}:9`]: Ch06Sec9,
  [`${CH06}:10`]: Ch06Sec10,
  [`${CH06}:11`]: Ch06Sec11,
  [`${CH06}:12`]: Ch06Sec12,
  [`${CH06}:13`]: Ch06Sec13,
  [`${CH06}:14`]: Ch06Sec14,
  [`${CH06}:15`]: Ch06Sec15,
  [`${CH06}:16`]: Ch06Sec16,
  [`${CH06}:17`]: Ch06Sec17,
  [`${CH06}:18`]: Ch06Sec18,
  [`${CH06}:19`]: Ch06Sec19,
  [`${CH06}:20`]: Ch06Sec20,
  [`${CH06}:21`]: Ch06Sec21,
  [`${CH06}:22`]: Ch06Sec22,
  [`${CH06}:23`]: Ch06Sec23,
  [`${CH06}:24`]: Ch06Sec24,
  [`${CH06}:25`]: Ch06Sec25,
  [`${CH06}:26`]: Ch06Sec26,
  [`${CH06}:27`]: Ch06Sec27,
  [`${CH06}:28`]: Ch06Sec28,
  [`${CH06}:29`]: Ch06Sec29,
  [`${CH06}:30`]: Ch06Sec30,
  [`${CH06}:31`]: Ch06Sec31,
  [`${CH06}:32`]: Ch06Sec32,
  [`${CH06}:33`]: Ch06Sec33,
  [`${CH06}:34`]: Ch06Sec34,
  [`${CH06}:35`]: Ch06Sec35,
  [`${CH06}:36`]: Ch06Sec36,
  [`${CH06}:37`]: Ch06Sec37,
  [`${CH06}:38`]: Ch06Sec38,
  [`${CH06}:39`]: Ch06Sec39,
  [`${CH06}:40`]: Ch06Sec40,
  [`${CH06}:41`]: Ch06Sec41,
});
/* Ch07 · Gravitation — scene block (branch premium-board-ch7)         */
/* ================================================================== */
import Ch07Sec1 from "./Ch07Sec1";
import Ch07Sec2 from "./Ch07Sec2";
import Ch07Sec3 from "./Ch07Sec3";
import Ch07Sec4 from "./Ch07Sec4";
import Ch07Sec5 from "./Ch07Sec5";
import Ch07Sec6 from "./Ch07Sec6";
import Ch07Sec7 from "./Ch07Sec7";
import Ch07Sec8 from "./Ch07Sec8";
import Ch07Sec9 from "./Ch07Sec9";
import Ch07Sec10 from "./Ch07Sec10";
import Ch07Sec11 from "./Ch07Sec11";
import Ch07Sec12 from "./Ch07Sec12";
import Ch07Sec13 from "./Ch07Sec13";
import Ch07Sec14 from "./Ch07Sec14";
import Ch07Sec15 from "./Ch07Sec15";
import Ch07Sec16 from "./Ch07Sec16";
import Ch07Sec17 from "./Ch07Sec17";
import Ch07Sec18 from "./Ch07Sec18";
import Ch07Sec19 from "./Ch07Sec19";
import Ch07Sec20 from "./Ch07Sec20";
import Ch07Sec21 from "./Ch07Sec21";
import Ch07Sec22 from "./Ch07Sec22";
import Ch07Sec23 from "./Ch07Sec23";
import Ch07Sec24 from "./Ch07Sec24";
import Ch07Sec25 from "./Ch07Sec25";
import Ch07Sec26 from "./Ch07Sec26";
import Ch07Sec27 from "./Ch07Sec27";
import Ch07Sec28 from "./Ch07Sec28";
import Ch07Sec29 from "./Ch07Sec29";

const CH07 = "29b5be47-3b75-550d-9636-ad45a901d4dd"; // Class 11 · Gravitation

REGISTRY[`${CH07}:1`] = Ch07Sec1;
REGISTRY[`${CH07}:2`] = Ch07Sec2;
REGISTRY[`${CH07}:3`] = Ch07Sec3;
REGISTRY[`${CH07}:4`] = Ch07Sec4;
REGISTRY[`${CH07}:5`] = Ch07Sec5;
REGISTRY[`${CH07}:6`] = Ch07Sec6;
REGISTRY[`${CH07}:7`] = Ch07Sec7;
REGISTRY[`${CH07}:8`] = Ch07Sec8;
REGISTRY[`${CH07}:9`] = Ch07Sec9;
REGISTRY[`${CH07}:10`] = Ch07Sec10;
REGISTRY[`${CH07}:11`] = Ch07Sec11;
REGISTRY[`${CH07}:12`] = Ch07Sec12;
REGISTRY[`${CH07}:13`] = Ch07Sec13;
REGISTRY[`${CH07}:14`] = Ch07Sec14;
REGISTRY[`${CH07}:15`] = Ch07Sec15;
REGISTRY[`${CH07}:16`] = Ch07Sec16;
REGISTRY[`${CH07}:17`] = Ch07Sec17;
REGISTRY[`${CH07}:18`] = Ch07Sec18;
REGISTRY[`${CH07}:19`] = Ch07Sec19;
REGISTRY[`${CH07}:20`] = Ch07Sec20;
REGISTRY[`${CH07}:21`] = Ch07Sec21;
REGISTRY[`${CH07}:22`] = Ch07Sec22;
REGISTRY[`${CH07}:23`] = Ch07Sec23;
REGISTRY[`${CH07}:24`] = Ch07Sec24;
REGISTRY[`${CH07}:25`] = Ch07Sec25;
REGISTRY[`${CH07}:26`] = Ch07Sec26;
REGISTRY[`${CH07}:27`] = Ch07Sec27;
REGISTRY[`${CH07}:28`] = Ch07Sec28;
REGISTRY[`${CH07}:29`] = Ch07Sec29;
/* ============================ end Ch07 ============================ */

/* ============================ Class 12 Ch01 ============================ */
import P12Ch01Sec1 from "./P12Ch01Sec1";
import P12Ch01Sec2 from "./P12Ch01Sec2";
import P12Ch01Sec3 from "./P12Ch01Sec3";
import P12Ch01Sec4 from "./P12Ch01Sec4";
import P12Ch01Sec5 from "./P12Ch01Sec5";
import P12Ch01Sec6 from "./P12Ch01Sec6";
import P12Ch01Sec7 from "./P12Ch01Sec7";
import P12Ch01Sec8 from "./P12Ch01Sec8";
import P12Ch01Sec9 from "./P12Ch01Sec9";
import P12Ch01Sec10 from "./P12Ch01Sec10";
import P12Ch01Sec11 from "./P12Ch01Sec11";
import P12Ch01Sec12 from "./P12Ch01Sec12";
import P12Ch01Sec13 from "./P12Ch01Sec13";
import P12Ch01Sec14 from "./P12Ch01Sec14";
import P12Ch01Sec15 from "./P12Ch01Sec15";
import P12Ch01Sec16 from "./P12Ch01Sec16";
import P12Ch01Sec17 from "./P12Ch01Sec17";
import P12Ch01Sec18 from "./P12Ch01Sec18";
import P12Ch01Sec19 from "./P12Ch01Sec19";
import P12Ch01Sec20 from "./P12Ch01Sec20";
import P12Ch01Sec21 from "./P12Ch01Sec21";
import P12Ch01Sec22 from "./P12Ch01Sec22";
import P12Ch01Sec23 from "./P12Ch01Sec23";
import P12Ch01Sec24 from "./P12Ch01Sec24";
import P12Ch01Sec25 from "./P12Ch01Sec25";
import P12Ch01Sec26 from "./P12Ch01Sec26";
import P12Ch01Sec27 from "./P12Ch01Sec27";
import P12Ch01Sec28 from "./P12Ch01Sec28";
import P12Ch01Sec29 from "./P12Ch01Sec29";
import P12Ch01Sec30 from "./P12Ch01Sec30";
import P12Ch01Sec31 from "./P12Ch01Sec31";
import P12Ch01Sec32 from "./P12Ch01Sec32";
import P12Ch01Sec33 from "./P12Ch01Sec33";
import P12Ch01Sec34 from "./P12Ch01Sec34";
import P12Ch01Sec35 from "./P12Ch01Sec35";
import P12Ch01Sec36 from "./P12Ch01Sec36";
import P12Ch01Sec37 from "./P12Ch01Sec37";
import P12Ch01Sec38 from "./P12Ch01Sec38";
import P12Ch01Sec39 from "./P12Ch01Sec39";
import P12Ch01Sec40 from "./P12Ch01Sec40";
import P12Ch01Sec41 from "./P12Ch01Sec41";
import P12Ch01Sec42 from "./P12Ch01Sec42";
import P12Ch01Sec43 from "./P12Ch01Sec43";
import P12Ch01Sec44 from "./P12Ch01Sec44";
import P12Ch01Sec45 from "./P12Ch01Sec45";
import P12Ch01Sec46 from "./P12Ch01Sec46";
import P12Ch01Sec47 from "./P12Ch01Sec47";
import P12Ch01Sec48 from "./P12Ch01Sec48";
import P12Ch01Sec49 from "./P12Ch01Sec49";
import P12Ch01Sec50 from "./P12Ch01Sec50";
import P12Ch01Sec51 from "./P12Ch01Sec51";
import P12Ch01Sec52 from "./P12Ch01Sec52";
import P12Ch01Sec53 from "./P12Ch01Sec53";
import P12Ch01Sec54 from "./P12Ch01Sec54";
import P12Ch01Sec55 from "./P12Ch01Sec55";
import P12Ch01Sec56 from "./P12Ch01Sec56";
import P12Ch01Sec57 from "./P12Ch01Sec57";
import P12Ch01Sec58 from "./P12Ch01Sec58";
import P12Ch01Sec59 from "./P12Ch01Sec59";
import P12Ch01Sec60 from "./P12Ch01Sec60";
import P12Ch01Sec61 from "./P12Ch01Sec61";
import P12Ch01Sec62 from "./P12Ch01Sec62";
import P12Ch01Sec63 from "./P12Ch01Sec63";
import P12Ch01Sec64 from "./P12Ch01Sec64";
import P12Ch01Sec65 from "./P12Ch01Sec65";
const P12CH01 = "cf605dc6-faed-5c33-8107-81114cbfef79"; // Class 12 · Electric Charges and Fields

REGISTRY[`${P12CH01}:1`] = P12Ch01Sec1;
REGISTRY[`${P12CH01}:2`] = P12Ch01Sec2;
REGISTRY[`${P12CH01}:3`] = P12Ch01Sec3;
REGISTRY[`${P12CH01}:4`] = P12Ch01Sec4;
REGISTRY[`${P12CH01}:5`] = P12Ch01Sec5;
REGISTRY[`${P12CH01}:6`] = P12Ch01Sec6;
REGISTRY[`${P12CH01}:7`] = P12Ch01Sec7;
REGISTRY[`${P12CH01}:8`] = P12Ch01Sec8;
REGISTRY[`${P12CH01}:9`] = P12Ch01Sec9;
REGISTRY[`${P12CH01}:10`] = P12Ch01Sec10;
REGISTRY[`${P12CH01}:11`] = P12Ch01Sec11;
REGISTRY[`${P12CH01}:12`] = P12Ch01Sec12;
REGISTRY[`${P12CH01}:13`] = P12Ch01Sec13;
REGISTRY[`${P12CH01}:14`] = P12Ch01Sec14;
REGISTRY[`${P12CH01}:15`] = P12Ch01Sec15;
REGISTRY[`${P12CH01}:16`] = P12Ch01Sec16;
REGISTRY[`${P12CH01}:17`] = P12Ch01Sec17;
REGISTRY[`${P12CH01}:18`] = P12Ch01Sec18;
REGISTRY[`${P12CH01}:19`] = P12Ch01Sec19;
REGISTRY[`${P12CH01}:20`] = P12Ch01Sec20;
REGISTRY[`${P12CH01}:21`] = P12Ch01Sec21;
REGISTRY[`${P12CH01}:22`] = P12Ch01Sec22;
REGISTRY[`${P12CH01}:23`] = P12Ch01Sec23;
REGISTRY[`${P12CH01}:24`] = P12Ch01Sec24;
REGISTRY[`${P12CH01}:25`] = P12Ch01Sec25;
REGISTRY[`${P12CH01}:26`] = P12Ch01Sec26;
REGISTRY[`${P12CH01}:27`] = P12Ch01Sec27;
REGISTRY[`${P12CH01}:28`] = P12Ch01Sec28;
REGISTRY[`${P12CH01}:29`] = P12Ch01Sec29;
REGISTRY[`${P12CH01}:30`] = P12Ch01Sec30;
REGISTRY[`${P12CH01}:31`] = P12Ch01Sec31;
REGISTRY[`${P12CH01}:32`] = P12Ch01Sec32;
REGISTRY[`${P12CH01}:33`] = P12Ch01Sec33;
REGISTRY[`${P12CH01}:34`] = P12Ch01Sec34;
REGISTRY[`${P12CH01}:35`] = P12Ch01Sec35;
REGISTRY[`${P12CH01}:36`] = P12Ch01Sec36;
REGISTRY[`${P12CH01}:37`] = P12Ch01Sec37;
REGISTRY[`${P12CH01}:38`] = P12Ch01Sec38;
REGISTRY[`${P12CH01}:39`] = P12Ch01Sec39;
REGISTRY[`${P12CH01}:40`] = P12Ch01Sec40;
REGISTRY[`${P12CH01}:41`] = P12Ch01Sec41;
REGISTRY[`${P12CH01}:42`] = P12Ch01Sec42;
REGISTRY[`${P12CH01}:43`] = P12Ch01Sec43;
REGISTRY[`${P12CH01}:44`] = P12Ch01Sec44;
REGISTRY[`${P12CH01}:45`] = P12Ch01Sec45;
REGISTRY[`${P12CH01}:46`] = P12Ch01Sec46;
REGISTRY[`${P12CH01}:47`] = P12Ch01Sec47;
REGISTRY[`${P12CH01}:48`] = P12Ch01Sec48;
REGISTRY[`${P12CH01}:49`] = P12Ch01Sec49;
REGISTRY[`${P12CH01}:50`] = P12Ch01Sec50;
REGISTRY[`${P12CH01}:51`] = P12Ch01Sec51;
REGISTRY[`${P12CH01}:52`] = P12Ch01Sec52;
REGISTRY[`${P12CH01}:53`] = P12Ch01Sec53;
REGISTRY[`${P12CH01}:54`] = P12Ch01Sec54;
REGISTRY[`${P12CH01}:55`] = P12Ch01Sec55;
REGISTRY[`${P12CH01}:56`] = P12Ch01Sec56;
REGISTRY[`${P12CH01}:57`] = P12Ch01Sec57;
REGISTRY[`${P12CH01}:58`] = P12Ch01Sec58;
REGISTRY[`${P12CH01}:59`] = P12Ch01Sec59;
REGISTRY[`${P12CH01}:60`] = P12Ch01Sec60;
REGISTRY[`${P12CH01}:61`] = P12Ch01Sec61;
REGISTRY[`${P12CH01}:62`] = P12Ch01Sec62;
REGISTRY[`${P12CH01}:63`] = P12Ch01Sec63;
REGISTRY[`${P12CH01}:64`] = P12Ch01Sec64;
REGISTRY[`${P12CH01}:65`] = P12Ch01Sec65;
/* ============================ end P12Ch01 ============================ */

import P12Ch02Sec1 from "./P12Ch02Sec1";
import P12Ch02Sec2 from "./P12Ch02Sec2";
import P12Ch02Sec3 from "./P12Ch02Sec3";
import P12Ch02Sec4 from "./P12Ch02Sec4";
import P12Ch02Sec5 from "./P12Ch02Sec5";
import P12Ch02Sec6 from "./P12Ch02Sec6";
import P12Ch02Sec7 from "./P12Ch02Sec7";
import P12Ch02Sec8 from "./P12Ch02Sec8";
import P12Ch02Sec9 from "./P12Ch02Sec9";
import P12Ch02Sec10 from "./P12Ch02Sec10";
import P12Ch02Sec11 from "./P12Ch02Sec11";
import P12Ch02Sec12 from "./P12Ch02Sec12";
import P12Ch02Sec13 from "./P12Ch02Sec13";
import P12Ch02Sec14 from "./P12Ch02Sec14";
import P12Ch02Sec15 from "./P12Ch02Sec15";
import P12Ch02Sec16 from "./P12Ch02Sec16";
import P12Ch02Sec17 from "./P12Ch02Sec17";
import P12Ch02Sec18 from "./P12Ch02Sec18";
import P12Ch02Sec19 from "./P12Ch02Sec19";
import P12Ch02Sec20 from "./P12Ch02Sec20";
import P12Ch02Sec21 from "./P12Ch02Sec21";
import P12Ch02Sec22 from "./P12Ch02Sec22";
import P12Ch02Sec23 from "./P12Ch02Sec23";
import P12Ch02Sec24 from "./P12Ch02Sec24";
import P12Ch02Sec25 from "./P12Ch02Sec25";
import P12Ch02Sec26 from "./P12Ch02Sec26";
import P12Ch02Sec27 from "./P12Ch02Sec27";
import P12Ch02Sec28 from "./P12Ch02Sec28";
import P12Ch02Sec29 from "./P12Ch02Sec29";
import P12Ch02Sec30 from "./P12Ch02Sec30";
import P12Ch02Sec31 from "./P12Ch02Sec31";
import P12Ch02Sec32 from "./P12Ch02Sec32";
import P12Ch02Sec33 from "./P12Ch02Sec33";
import P12Ch02Sec34 from "./P12Ch02Sec34";
import P12Ch02Sec35 from "./P12Ch02Sec35";
import P12Ch02Sec36 from "./P12Ch02Sec36";
import P12Ch02Sec37 from "./P12Ch02Sec37";
import P12Ch02Sec38 from "./P12Ch02Sec38";
import P12Ch02Sec39 from "./P12Ch02Sec39";
import P12Ch02Sec40 from "./P12Ch02Sec40";
import P12Ch02Sec41 from "./P12Ch02Sec41";
import P12Ch02Sec42 from "./P12Ch02Sec42";
import P12Ch02Sec43 from "./P12Ch02Sec43";
import P12Ch02Sec44 from "./P12Ch02Sec44";
import P12Ch02Sec45 from "./P12Ch02Sec45";
import P12Ch02Sec46 from "./P12Ch02Sec46";
import P12Ch02Sec47 from "./P12Ch02Sec47";
import P12Ch02Sec48 from "./P12Ch02Sec48";
import P12Ch02Sec49 from "./P12Ch02Sec49";
import P12Ch02Sec50 from "./P12Ch02Sec50";
import P12Ch02Sec51 from "./P12Ch02Sec51";
import P12Ch02Sec52 from "./P12Ch02Sec52";
import P12Ch02Sec53 from "./P12Ch02Sec53";
import P12Ch02Sec54 from "./P12Ch02Sec54";
import P12Ch02Sec55 from "./P12Ch02Sec55";
import P12Ch02Sec56 from "./P12Ch02Sec56";
import P12Ch02Sec57 from "./P12Ch02Sec57";
import P12Ch02Sec58 from "./P12Ch02Sec58";
import P12Ch02Sec59 from "./P12Ch02Sec59";
import P12Ch02Sec60 from "./P12Ch02Sec60";
import P12Ch02Sec61 from "./P12Ch02Sec61";
import P12Ch02Sec62 from "./P12Ch02Sec62";
import P12Ch02Sec63 from "./P12Ch02Sec63";
import P12Ch02Sec64 from "./P12Ch02Sec64";
import P12Ch02Sec65 from "./P12Ch02Sec65";
import P12Ch02Sec66 from "./P12Ch02Sec66";
const P12CH02 = "32366295-8398-526f-a430-cefdeea6d001"; // Class 12 · Electrostatic Potential and Capacitance

REGISTRY[`${P12CH02}:1`] = P12Ch02Sec1;
REGISTRY[`${P12CH02}:2`] = P12Ch02Sec2;
REGISTRY[`${P12CH02}:3`] = P12Ch02Sec3;
REGISTRY[`${P12CH02}:4`] = P12Ch02Sec4;
REGISTRY[`${P12CH02}:5`] = P12Ch02Sec5;
REGISTRY[`${P12CH02}:6`] = P12Ch02Sec6;
REGISTRY[`${P12CH02}:7`] = P12Ch02Sec7;
REGISTRY[`${P12CH02}:8`] = P12Ch02Sec8;
REGISTRY[`${P12CH02}:9`] = P12Ch02Sec9;
REGISTRY[`${P12CH02}:10`] = P12Ch02Sec10;
REGISTRY[`${P12CH02}:11`] = P12Ch02Sec11;
REGISTRY[`${P12CH02}:12`] = P12Ch02Sec12;
REGISTRY[`${P12CH02}:13`] = P12Ch02Sec13;
REGISTRY[`${P12CH02}:14`] = P12Ch02Sec14;
REGISTRY[`${P12CH02}:15`] = P12Ch02Sec15;
REGISTRY[`${P12CH02}:16`] = P12Ch02Sec16;
REGISTRY[`${P12CH02}:17`] = P12Ch02Sec17;
REGISTRY[`${P12CH02}:18`] = P12Ch02Sec18;
REGISTRY[`${P12CH02}:19`] = P12Ch02Sec19;
REGISTRY[`${P12CH02}:20`] = P12Ch02Sec20;
REGISTRY[`${P12CH02}:21`] = P12Ch02Sec21;
REGISTRY[`${P12CH02}:22`] = P12Ch02Sec22;
REGISTRY[`${P12CH02}:23`] = P12Ch02Sec23;
REGISTRY[`${P12CH02}:24`] = P12Ch02Sec24;
REGISTRY[`${P12CH02}:25`] = P12Ch02Sec25;
REGISTRY[`${P12CH02}:26`] = P12Ch02Sec26;
REGISTRY[`${P12CH02}:27`] = P12Ch02Sec27;
REGISTRY[`${P12CH02}:28`] = P12Ch02Sec28;
REGISTRY[`${P12CH02}:29`] = P12Ch02Sec29;
REGISTRY[`${P12CH02}:30`] = P12Ch02Sec30;
REGISTRY[`${P12CH02}:31`] = P12Ch02Sec31;
REGISTRY[`${P12CH02}:32`] = P12Ch02Sec32;
REGISTRY[`${P12CH02}:33`] = P12Ch02Sec33;
REGISTRY[`${P12CH02}:34`] = P12Ch02Sec34;
REGISTRY[`${P12CH02}:35`] = P12Ch02Sec35;
REGISTRY[`${P12CH02}:36`] = P12Ch02Sec36;
REGISTRY[`${P12CH02}:37`] = P12Ch02Sec37;
REGISTRY[`${P12CH02}:38`] = P12Ch02Sec38;
REGISTRY[`${P12CH02}:39`] = P12Ch02Sec39;
REGISTRY[`${P12CH02}:40`] = P12Ch02Sec40;
REGISTRY[`${P12CH02}:41`] = P12Ch02Sec41;
REGISTRY[`${P12CH02}:42`] = P12Ch02Sec42;
REGISTRY[`${P12CH02}:43`] = P12Ch02Sec43;
REGISTRY[`${P12CH02}:44`] = P12Ch02Sec44;
REGISTRY[`${P12CH02}:45`] = P12Ch02Sec45;
REGISTRY[`${P12CH02}:46`] = P12Ch02Sec46;
REGISTRY[`${P12CH02}:47`] = P12Ch02Sec47;
REGISTRY[`${P12CH02}:48`] = P12Ch02Sec48;
REGISTRY[`${P12CH02}:49`] = P12Ch02Sec49;
REGISTRY[`${P12CH02}:50`] = P12Ch02Sec50;
REGISTRY[`${P12CH02}:51`] = P12Ch02Sec51;
REGISTRY[`${P12CH02}:52`] = P12Ch02Sec52;
REGISTRY[`${P12CH02}:53`] = P12Ch02Sec53;
REGISTRY[`${P12CH02}:54`] = P12Ch02Sec54;
REGISTRY[`${P12CH02}:55`] = P12Ch02Sec55;
REGISTRY[`${P12CH02}:56`] = P12Ch02Sec56;
REGISTRY[`${P12CH02}:57`] = P12Ch02Sec57;
REGISTRY[`${P12CH02}:58`] = P12Ch02Sec58;
REGISTRY[`${P12CH02}:59`] = P12Ch02Sec59;
REGISTRY[`${P12CH02}:60`] = P12Ch02Sec60;
REGISTRY[`${P12CH02}:61`] = P12Ch02Sec61;
REGISTRY[`${P12CH02}:62`] = P12Ch02Sec62;
REGISTRY[`${P12CH02}:63`] = P12Ch02Sec63;
REGISTRY[`${P12CH02}:64`] = P12Ch02Sec64;
REGISTRY[`${P12CH02}:65`] = P12Ch02Sec65;
REGISTRY[`${P12CH02}:66`] = P12Ch02Sec66;
/* ============================ end P12Ch02 ============================ */

/* ============================ P12Ch03: Current Electricity ============================ */
import P12Ch03Sec1 from "./P12Ch03Sec1";
import P12Ch03Sec2 from "./P12Ch03Sec2";
import P12Ch03Sec3 from "./P12Ch03Sec3";
import P12Ch03Sec4 from "./P12Ch03Sec4";
import P12Ch03Sec5 from "./P12Ch03Sec5";
import P12Ch03Sec6 from "./P12Ch03Sec6";
import P12Ch03Sec7 from "./P12Ch03Sec7";
import P12Ch03Sec8 from "./P12Ch03Sec8";
import P12Ch03Sec9 from "./P12Ch03Sec9";
import P12Ch03Sec10 from "./P12Ch03Sec10";
import P12Ch03Sec11 from "./P12Ch03Sec11";
import P12Ch03Sec12 from "./P12Ch03Sec12";
import P12Ch03Sec13 from "./P12Ch03Sec13";
import P12Ch03Sec14 from "./P12Ch03Sec14";
import P12Ch03Sec15 from "./P12Ch03Sec15";
import P12Ch03Sec16 from "./P12Ch03Sec16";
import P12Ch03Sec17 from "./P12Ch03Sec17";
import P12Ch03Sec18 from "./P12Ch03Sec18";
import P12Ch03Sec19 from "./P12Ch03Sec19";
import P12Ch03Sec20 from "./P12Ch03Sec20";
import P12Ch03Sec21 from "./P12Ch03Sec21";
import P12Ch03Sec22 from "./P12Ch03Sec22";
import P12Ch03Sec23 from "./P12Ch03Sec23";
import P12Ch03Sec24 from "./P12Ch03Sec24";
import P12Ch03Sec25 from "./P12Ch03Sec25";
import P12Ch03Sec26 from "./P12Ch03Sec26";
import P12Ch03Sec27 from "./P12Ch03Sec27";
import P12Ch03Sec28 from "./P12Ch03Sec28";
import P12Ch03Sec29 from "./P12Ch03Sec29";
import P12Ch03Sec30 from "./P12Ch03Sec30";
import P12Ch03Sec31 from "./P12Ch03Sec31";
import P12Ch03Sec32 from "./P12Ch03Sec32";
import P12Ch03Sec33 from "./P12Ch03Sec33";
import P12Ch03Sec34 from "./P12Ch03Sec34";
import P12Ch03Sec35 from "./P12Ch03Sec35";
import P12Ch03Sec36 from "./P12Ch03Sec36";
import P12Ch03Sec37 from "./P12Ch03Sec37";
import P12Ch03Sec38 from "./P12Ch03Sec38";
import P12Ch03Sec39 from "./P12Ch03Sec39";
import P12Ch03Sec40 from "./P12Ch03Sec40";
import P12Ch03Sec41 from "./P12Ch03Sec41";
import P12Ch03Sec42 from "./P12Ch03Sec42";
import P12Ch03Sec43 from "./P12Ch03Sec43";
import P12Ch03Sec44 from "./P12Ch03Sec44";
import P12Ch03Sec45 from "./P12Ch03Sec45";
import P12Ch03Sec46 from "./P12Ch03Sec46";
import P12Ch03Sec47 from "./P12Ch03Sec47";
import P12Ch03Sec48 from "./P12Ch03Sec48";
import P12Ch03Sec49 from "./P12Ch03Sec49";
import P12Ch03Sec50 from "./P12Ch03Sec50";
import P12Ch03Sec51 from "./P12Ch03Sec51";
import P12Ch03Sec52 from "./P12Ch03Sec52";
import P12Ch03Sec53 from "./P12Ch03Sec53";
import P12Ch03Sec54 from "./P12Ch03Sec54";
import P12Ch03Sec55 from "./P12Ch03Sec55";
import P12Ch03Sec56 from "./P12Ch03Sec56";
import P12Ch03Sec57 from "./P12Ch03Sec57";
import P12Ch03Sec58 from "./P12Ch03Sec58";
import P12Ch03Sec59 from "./P12Ch03Sec59";
import P12Ch03Sec60 from "./P12Ch03Sec60";
import P12Ch03Sec61 from "./P12Ch03Sec61";
import P12Ch03Sec62 from "./P12Ch03Sec62";
import P12Ch03Sec63 from "./P12Ch03Sec63";
import P12Ch03Sec64 from "./P12Ch03Sec64";
import P12Ch03Sec65 from "./P12Ch03Sec65";
import P12Ch03Sec66 from "./P12Ch03Sec66";
import P12Ch03Sec67 from "./P12Ch03Sec67";
import P12Ch03Sec68 from "./P12Ch03Sec68";
import P12Ch03Sec69 from "./P12Ch03Sec69";
import P12Ch03Sec70 from "./P12Ch03Sec70";
import P12Ch03Sec71 from "./P12Ch03Sec71";
import P12Ch03Sec72 from "./P12Ch03Sec72";
import P12Ch03Sec73 from "./P12Ch03Sec73";
import P12Ch03Sec74 from "./P12Ch03Sec74";
import P12Ch03Sec75 from "./P12Ch03Sec75";
import P12Ch03Sec76 from "./P12Ch03Sec76";
import P12Ch03Sec77 from "./P12Ch03Sec77";
import P12Ch03Sec78 from "./P12Ch03Sec78";
import P12Ch03Sec79 from "./P12Ch03Sec79";
import P12Ch03Sec80 from "./P12Ch03Sec80";
import P12Ch03Sec81 from "./P12Ch03Sec81";
import P12Ch03Sec82 from "./P12Ch03Sec82";
import P12Ch03Sec83 from "./P12Ch03Sec83";
import P12Ch03Sec84 from "./P12Ch03Sec84";
import P12Ch03Sec85 from "./P12Ch03Sec85";
import P12Ch03Sec86 from "./P12Ch03Sec86";
import P12Ch03Sec87 from "./P12Ch03Sec87";
import P12Ch03Sec88 from "./P12Ch03Sec88";
import P12Ch03Sec89 from "./P12Ch03Sec89";
import P12Ch03Sec90 from "./P12Ch03Sec90";
import P12Ch03Sec91 from "./P12Ch03Sec91";
import P12Ch03Sec92 from "./P12Ch03Sec92";
import P12Ch03Sec93 from "./P12Ch03Sec93";
import P12Ch03Sec94 from "./P12Ch03Sec94";
import P12Ch03Sec95 from "./P12Ch03Sec95";
import P12Ch03Sec96 from "./P12Ch03Sec96";
import P12Ch03Sec97 from "./P12Ch03Sec97";
import P12Ch03Sec98 from "./P12Ch03Sec98";
import P12Ch03Sec99 from "./P12Ch03Sec99";
import P12Ch03Sec100 from "./P12Ch03Sec100";
import P12Ch03Sec101 from "./P12Ch03Sec101";
import P12Ch03Sec102 from "./P12Ch03Sec102";
import P12Ch03Sec103 from "./P12Ch03Sec103";
import P12Ch04Sec1 from "./P12Ch04Sec1";
import P12Ch04Sec2 from "./P12Ch04Sec2";
import P12Ch04Sec3 from "./P12Ch04Sec3";
import P12Ch04Sec4 from "./P12Ch04Sec4";
import P12Ch04Sec5 from "./P12Ch04Sec5";
import P12Ch04Sec6 from "./P12Ch04Sec6";
import P12Ch04Sec7 from "./P12Ch04Sec7";
import P12Ch04Sec8 from "./P12Ch04Sec8";
import P12Ch04Sec9 from "./P12Ch04Sec9";
import P12Ch04Sec10 from "./P12Ch04Sec10";
import P12Ch04Sec11 from "./P12Ch04Sec11";
import P12Ch04Sec12 from "./P12Ch04Sec12";
import P12Ch04Sec13 from "./P12Ch04Sec13";
import P12Ch04Sec14 from "./P12Ch04Sec14";
import P12Ch04Sec15 from "./P12Ch04Sec15";
import P12Ch04Sec16 from "./P12Ch04Sec16";
import P12Ch04Sec17 from "./P12Ch04Sec17";
import P12Ch04Sec18 from "./P12Ch04Sec18";
import P12Ch04Sec19 from "./P12Ch04Sec19";
import P12Ch04Sec20 from "./P12Ch04Sec20";
import P12Ch04Sec21 from "./P12Ch04Sec21";
import P12Ch04Sec22 from "./P12Ch04Sec22";
import P12Ch04Sec23 from "./P12Ch04Sec23";
import P12Ch04Sec24 from "./P12Ch04Sec24";
import P12Ch04Sec25 from "./P12Ch04Sec25";
import P12Ch04Sec26 from "./P12Ch04Sec26";
import P12Ch04Sec27 from "./P12Ch04Sec27";
import P12Ch04Sec28 from "./P12Ch04Sec28";
import P12Ch04Sec29 from "./P12Ch04Sec29";
import P12Ch04Sec30 from "./P12Ch04Sec30";
import P12Ch04Sec31 from "./P12Ch04Sec31";
import P12Ch04Sec32 from "./P12Ch04Sec32";
import P12Ch04Sec33 from "./P12Ch04Sec33";
import P12Ch04Sec34 from "./P12Ch04Sec34";
import P12Ch04Sec35 from "./P12Ch04Sec35";
import P12Ch04Sec36 from "./P12Ch04Sec36";
import P12Ch04Sec37 from "./P12Ch04Sec37";
import P12Ch04Sec38 from "./P12Ch04Sec38";
import P12Ch04Sec39 from "./P12Ch04Sec39";
import P12Ch04Sec40 from "./P12Ch04Sec40";
import P12Ch04Sec41 from "./P12Ch04Sec41";
import P12Ch04Sec42 from "./P12Ch04Sec42";
import P12Ch04Sec43 from "./P12Ch04Sec43";

const P12CH03 = "5bd38ee4-dc52-5144-89a3-a51bbb35af15"; // Class 12 · Current Electricity
const P12CH04 = "86b64ce4-24f5-5296-9cb2-f67b0989eca7"; // Class 12 · Moving Charges and Magnetism

REGISTRY[`${P12CH03}:1`] = P12Ch03Sec1;
REGISTRY[`${P12CH03}:2`] = P12Ch03Sec2;
REGISTRY[`${P12CH03}:3`] = P12Ch03Sec3;
REGISTRY[`${P12CH03}:4`] = P12Ch03Sec4;
REGISTRY[`${P12CH03}:5`] = P12Ch03Sec5;
REGISTRY[`${P12CH03}:6`] = P12Ch03Sec6;
REGISTRY[`${P12CH03}:7`] = P12Ch03Sec7;
REGISTRY[`${P12CH03}:8`] = P12Ch03Sec8;
REGISTRY[`${P12CH03}:9`] = P12Ch03Sec9;
REGISTRY[`${P12CH03}:10`] = P12Ch03Sec10;
REGISTRY[`${P12CH03}:11`] = P12Ch03Sec11;
REGISTRY[`${P12CH03}:12`] = P12Ch03Sec12;
REGISTRY[`${P12CH03}:13`] = P12Ch03Sec13;
REGISTRY[`${P12CH03}:14`] = P12Ch03Sec14;
REGISTRY[`${P12CH03}:15`] = P12Ch03Sec15;
REGISTRY[`${P12CH03}:16`] = P12Ch03Sec16;
REGISTRY[`${P12CH03}:17`] = P12Ch03Sec17;
REGISTRY[`${P12CH03}:18`] = P12Ch03Sec18;
REGISTRY[`${P12CH03}:19`] = P12Ch03Sec19;
REGISTRY[`${P12CH03}:20`] = P12Ch03Sec20;
REGISTRY[`${P12CH03}:21`] = P12Ch03Sec21;
REGISTRY[`${P12CH03}:22`] = P12Ch03Sec22;
REGISTRY[`${P12CH03}:23`] = P12Ch03Sec23;
REGISTRY[`${P12CH03}:24`] = P12Ch03Sec24;
REGISTRY[`${P12CH03}:25`] = P12Ch03Sec25;
REGISTRY[`${P12CH03}:26`] = P12Ch03Sec26;
REGISTRY[`${P12CH03}:27`] = P12Ch03Sec27;
REGISTRY[`${P12CH03}:28`] = P12Ch03Sec28;
REGISTRY[`${P12CH03}:29`] = P12Ch03Sec29;
REGISTRY[`${P12CH03}:30`] = P12Ch03Sec30;
REGISTRY[`${P12CH03}:31`] = P12Ch03Sec31;
REGISTRY[`${P12CH03}:32`] = P12Ch03Sec32;
REGISTRY[`${P12CH03}:33`] = P12Ch03Sec33;
REGISTRY[`${P12CH03}:34`] = P12Ch03Sec34;
REGISTRY[`${P12CH03}:35`] = P12Ch03Sec35;
REGISTRY[`${P12CH03}:36`] = P12Ch03Sec36;
REGISTRY[`${P12CH03}:37`] = P12Ch03Sec37;
REGISTRY[`${P12CH03}:38`] = P12Ch03Sec38;
REGISTRY[`${P12CH03}:39`] = P12Ch03Sec39;
REGISTRY[`${P12CH03}:40`] = P12Ch03Sec40;
REGISTRY[`${P12CH03}:41`] = P12Ch03Sec41;
REGISTRY[`${P12CH03}:42`] = P12Ch03Sec42;
REGISTRY[`${P12CH03}:43`] = P12Ch03Sec43;
REGISTRY[`${P12CH03}:44`] = P12Ch03Sec44;
REGISTRY[`${P12CH03}:45`] = P12Ch03Sec45;
REGISTRY[`${P12CH03}:46`] = P12Ch03Sec46;
REGISTRY[`${P12CH03}:47`] = P12Ch03Sec47;
REGISTRY[`${P12CH03}:48`] = P12Ch03Sec48;
REGISTRY[`${P12CH03}:49`] = P12Ch03Sec49;
REGISTRY[`${P12CH03}:50`] = P12Ch03Sec50;
REGISTRY[`${P12CH03}:51`] = P12Ch03Sec51;
REGISTRY[`${P12CH03}:52`] = P12Ch03Sec52;
REGISTRY[`${P12CH03}:53`] = P12Ch03Sec53;
REGISTRY[`${P12CH03}:54`] = P12Ch03Sec54;
REGISTRY[`${P12CH03}:55`] = P12Ch03Sec55;
REGISTRY[`${P12CH03}:56`] = P12Ch03Sec56;
REGISTRY[`${P12CH03}:57`] = P12Ch03Sec57;
REGISTRY[`${P12CH03}:58`] = P12Ch03Sec58;
REGISTRY[`${P12CH03}:59`] = P12Ch03Sec59;
REGISTRY[`${P12CH03}:60`] = P12Ch03Sec60;
REGISTRY[`${P12CH03}:61`] = P12Ch03Sec61;
REGISTRY[`${P12CH03}:62`] = P12Ch03Sec62;
REGISTRY[`${P12CH03}:63`] = P12Ch03Sec63;
REGISTRY[`${P12CH03}:64`] = P12Ch03Sec64;
REGISTRY[`${P12CH03}:65`] = P12Ch03Sec65;
REGISTRY[`${P12CH03}:66`] = P12Ch03Sec66;
REGISTRY[`${P12CH03}:67`] = P12Ch03Sec67;
REGISTRY[`${P12CH03}:68`] = P12Ch03Sec68;
REGISTRY[`${P12CH03}:69`] = P12Ch03Sec69;
REGISTRY[`${P12CH03}:70`] = P12Ch03Sec70;
REGISTRY[`${P12CH03}:71`] = P12Ch03Sec71;
REGISTRY[`${P12CH03}:72`] = P12Ch03Sec72;
REGISTRY[`${P12CH03}:73`] = P12Ch03Sec73;
REGISTRY[`${P12CH03}:74`] = P12Ch03Sec74;
REGISTRY[`${P12CH03}:75`] = P12Ch03Sec75;
REGISTRY[`${P12CH03}:76`] = P12Ch03Sec76;
REGISTRY[`${P12CH03}:77`] = P12Ch03Sec77;
REGISTRY[`${P12CH03}:78`] = P12Ch03Sec78;
REGISTRY[`${P12CH03}:79`] = P12Ch03Sec79;
REGISTRY[`${P12CH03}:80`] = P12Ch03Sec80;
REGISTRY[`${P12CH03}:81`] = P12Ch03Sec81;
REGISTRY[`${P12CH03}:82`] = P12Ch03Sec82;
REGISTRY[`${P12CH03}:83`] = P12Ch03Sec83;
REGISTRY[`${P12CH03}:84`] = P12Ch03Sec84;
REGISTRY[`${P12CH03}:85`] = P12Ch03Sec85;
REGISTRY[`${P12CH03}:86`] = P12Ch03Sec86;
REGISTRY[`${P12CH03}:87`] = P12Ch03Sec87;
REGISTRY[`${P12CH03}:88`] = P12Ch03Sec88;
REGISTRY[`${P12CH03}:89`] = P12Ch03Sec89;
REGISTRY[`${P12CH03}:90`] = P12Ch03Sec90;
REGISTRY[`${P12CH03}:91`] = P12Ch03Sec91;
REGISTRY[`${P12CH03}:92`] = P12Ch03Sec92;
REGISTRY[`${P12CH03}:93`] = P12Ch03Sec93;
REGISTRY[`${P12CH03}:94`] = P12Ch03Sec94;
REGISTRY[`${P12CH03}:95`] = P12Ch03Sec95;
REGISTRY[`${P12CH03}:96`] = P12Ch03Sec96;
REGISTRY[`${P12CH03}:97`] = P12Ch03Sec97;
REGISTRY[`${P12CH03}:98`] = P12Ch03Sec98;
REGISTRY[`${P12CH03}:99`] = P12Ch03Sec99;
REGISTRY[`${P12CH03}:100`] = P12Ch03Sec100;
REGISTRY[`${P12CH03}:101`] = P12Ch03Sec101;
REGISTRY[`${P12CH03}:102`] = P12Ch03Sec102;
REGISTRY[`${P12CH03}:103`] = P12Ch03Sec103;

/* ============================ start P12Ch04 ============================ */
REGISTRY[`${P12CH04}:1`] = P12Ch04Sec1;
REGISTRY[`${P12CH04}:2`] = P12Ch04Sec2;
REGISTRY[`${P12CH04}:3`] = P12Ch04Sec3;
REGISTRY[`${P12CH04}:4`] = P12Ch04Sec4;
REGISTRY[`${P12CH04}:5`] = P12Ch04Sec5;
REGISTRY[`${P12CH04}:6`] = P12Ch04Sec6;
REGISTRY[`${P12CH04}:7`] = P12Ch04Sec7;
REGISTRY[`${P12CH04}:8`] = P12Ch04Sec8;
REGISTRY[`${P12CH04}:9`] = P12Ch04Sec9;
REGISTRY[`${P12CH04}:10`] = P12Ch04Sec10;
REGISTRY[`${P12CH04}:11`] = P12Ch04Sec11;
REGISTRY[`${P12CH04}:12`] = P12Ch04Sec12;
REGISTRY[`${P12CH04}:13`] = P12Ch04Sec13;
REGISTRY[`${P12CH04}:14`] = P12Ch04Sec14;
REGISTRY[`${P12CH04}:15`] = P12Ch04Sec15;
REGISTRY[`${P12CH04}:16`] = P12Ch04Sec16;
REGISTRY[`${P12CH04}:17`] = P12Ch04Sec17;
REGISTRY[`${P12CH04}:18`] = P12Ch04Sec18;
REGISTRY[`${P12CH04}:19`] = P12Ch04Sec19;
REGISTRY[`${P12CH04}:20`] = P12Ch04Sec20;
REGISTRY[`${P12CH04}:21`] = P12Ch04Sec21;
REGISTRY[`${P12CH04}:22`] = P12Ch04Sec22;
REGISTRY[`${P12CH04}:23`] = P12Ch04Sec23;
REGISTRY[`${P12CH04}:24`] = P12Ch04Sec24;
REGISTRY[`${P12CH04}:25`] = P12Ch04Sec25;
REGISTRY[`${P12CH04}:26`] = P12Ch04Sec26;
REGISTRY[`${P12CH04}:27`] = P12Ch04Sec27;
REGISTRY[`${P12CH04}:28`] = P12Ch04Sec28;
REGISTRY[`${P12CH04}:29`] = P12Ch04Sec29;
REGISTRY[`${P12CH04}:30`] = P12Ch04Sec30;
REGISTRY[`${P12CH04}:31`] = P12Ch04Sec31;
REGISTRY[`${P12CH04}:32`] = P12Ch04Sec32;
REGISTRY[`${P12CH04}:33`] = P12Ch04Sec33;
REGISTRY[`${P12CH04}:34`] = P12Ch04Sec34;
REGISTRY[`${P12CH04}:35`] = P12Ch04Sec35;
REGISTRY[`${P12CH04}:36`] = P12Ch04Sec36;
REGISTRY[`${P12CH04}:37`] = P12Ch04Sec37;
REGISTRY[`${P12CH04}:38`] = P12Ch04Sec38;
REGISTRY[`${P12CH04}:39`] = P12Ch04Sec39;
REGISTRY[`${P12CH04}:40`] = P12Ch04Sec40;
REGISTRY[`${P12CH04}:41`] = P12Ch04Sec41;
REGISTRY[`${P12CH04}:42`] = P12Ch04Sec42;
REGISTRY[`${P12CH04}:43`] = P12Ch04Sec43;
/* ============================ end P12Ch04 ============================ */

/* ============================ start P12Ch05 ============================ */
import P12Ch05Sec1 from "./P12Ch05Sec1";
import P12Ch05Sec2 from "./P12Ch05Sec2";
import P12Ch05Sec3 from "./P12Ch05Sec3";
import P12Ch05Sec4 from "./P12Ch05Sec4";
import P12Ch05Sec5 from "./P12Ch05Sec5";
import P12Ch05Sec6 from "./P12Ch05Sec6";
import P12Ch05Sec7 from "./P12Ch05Sec7";
import P12Ch05Sec8 from "./P12Ch05Sec8";
import P12Ch05Sec9 from "./P12Ch05Sec9";
import P12Ch05Sec10 from "./P12Ch05Sec10";
import P12Ch05Sec11 from "./P12Ch05Sec11";
import P12Ch05Sec12 from "./P12Ch05Sec12";
import P12Ch05Sec13 from "./P12Ch05Sec13";
import P12Ch05Sec14 from "./P12Ch05Sec14";
import P12Ch05Sec15 from "./P12Ch05Sec15";
import P12Ch05Sec16 from "./P12Ch05Sec16";
import P12Ch05Sec17 from "./P12Ch05Sec17";
import P12Ch05Sec18 from "./P12Ch05Sec18";
import P12Ch05Sec19 from "./P12Ch05Sec19";
import P12Ch05Sec20 from "./P12Ch05Sec20";
import P12Ch05Sec21 from "./P12Ch05Sec21";
import P12Ch05Sec22 from "./P12Ch05Sec22";
import P12Ch05Sec23 from "./P12Ch05Sec23";
import P12Ch05Sec24 from "./P12Ch05Sec24";
import P12Ch05Sec25 from "./P12Ch05Sec25";
import P12Ch05Sec26 from "./P12Ch05Sec26";
import P12Ch05Sec27 from "./P12Ch05Sec27";
import P12Ch05Sec28 from "./P12Ch05Sec28";
import P12Ch05Sec29 from "./P12Ch05Sec29";
import P12Ch05Sec30 from "./P12Ch05Sec30";
import P12Ch05Sec31 from "./P12Ch05Sec31";
import P12Ch05Sec32 from "./P12Ch05Sec32";
import P12Ch05Sec33 from "./P12Ch05Sec33";
import P12Ch05Sec34 from "./P12Ch05Sec34";
import P12Ch05Sec35 from "./P12Ch05Sec35";
import P12Ch05Sec36 from "./P12Ch05Sec36";
import P12Ch05Sec37 from "./P12Ch05Sec37";
import P12Ch05Sec38 from "./P12Ch05Sec38";
import P12Ch05Sec39 from "./P12Ch05Sec39";
import P12Ch05Sec40 from "./P12Ch05Sec40";
import P12Ch05Sec41 from "./P12Ch05Sec41";
import P12Ch05Sec42 from "./P12Ch05Sec42";
import P12Ch05Sec43 from "./P12Ch05Sec43";
import P12Ch05Sec44 from "./P12Ch05Sec44";
import P12Ch05Sec45 from "./P12Ch05Sec45";
import P12Ch05Sec46 from "./P12Ch05Sec46";
import P12Ch05Sec47 from "./P12Ch05Sec47";
import P12Ch05Sec48 from "./P12Ch05Sec48";
import P12Ch05Sec49 from "./P12Ch05Sec49";
import P12Ch05Sec50 from "./P12Ch05Sec50";
import P12Ch05Sec51 from "./P12Ch05Sec51";
import P12Ch05Sec52 from "./P12Ch05Sec52";
import P12Ch05Sec53 from "./P12Ch05Sec53";
import P12Ch05Sec54 from "./P12Ch05Sec54";
import P12Ch05Sec55 from "./P12Ch05Sec55";
import P12Ch05Sec56 from "./P12Ch05Sec56";
import P12Ch05Sec57 from "./P12Ch05Sec57";
import P12Ch05Sec58 from "./P12Ch05Sec58";
import P12Ch05Sec59 from "./P12Ch05Sec59";
import P12Ch05Sec60 from "./P12Ch05Sec60";
import P12Ch05Sec61 from "./P12Ch05Sec61";
import P12Ch05Sec62 from "./P12Ch05Sec62";
import P12Ch05Sec63 from "./P12Ch05Sec63";
import P12Ch05Sec64 from "./P12Ch05Sec64";
import P12Ch05Sec65 from "./P12Ch05Sec65";
import P12Ch05Sec66 from "./P12Ch05Sec66";
import P12Ch05Sec67 from "./P12Ch05Sec67";
import P12Ch05Sec68 from "./P12Ch05Sec68";
import P12Ch05Sec69 from "./P12Ch05Sec69";
import P12Ch05Sec70 from "./P12Ch05Sec70";

const P12CH05 = "cf5d01e5-1a4b-538b-9e72-4d7074b2f61d"; // Class 12 · Magnetism and Matter

REGISTRY[`${P12CH05}:1`] = P12Ch05Sec1;
REGISTRY[`${P12CH05}:2`] = P12Ch05Sec2;
REGISTRY[`${P12CH05}:3`] = P12Ch05Sec3;
REGISTRY[`${P12CH05}:4`] = P12Ch05Sec4;
REGISTRY[`${P12CH05}:5`] = P12Ch05Sec5;
REGISTRY[`${P12CH05}:6`] = P12Ch05Sec6;
REGISTRY[`${P12CH05}:7`] = P12Ch05Sec7;
REGISTRY[`${P12CH05}:8`] = P12Ch05Sec8;
REGISTRY[`${P12CH05}:9`] = P12Ch05Sec9;
REGISTRY[`${P12CH05}:10`] = P12Ch05Sec10;
REGISTRY[`${P12CH05}:11`] = P12Ch05Sec11;
REGISTRY[`${P12CH05}:12`] = P12Ch05Sec12;
REGISTRY[`${P12CH05}:13`] = P12Ch05Sec13;
REGISTRY[`${P12CH05}:14`] = P12Ch05Sec14;
REGISTRY[`${P12CH05}:15`] = P12Ch05Sec15;
REGISTRY[`${P12CH05}:16`] = P12Ch05Sec16;
REGISTRY[`${P12CH05}:17`] = P12Ch05Sec17;
REGISTRY[`${P12CH05}:18`] = P12Ch05Sec18;
REGISTRY[`${P12CH05}:19`] = P12Ch05Sec19;
REGISTRY[`${P12CH05}:20`] = P12Ch05Sec20;
REGISTRY[`${P12CH05}:21`] = P12Ch05Sec21;
REGISTRY[`${P12CH05}:22`] = P12Ch05Sec22;
REGISTRY[`${P12CH05}:23`] = P12Ch05Sec23;
REGISTRY[`${P12CH05}:24`] = P12Ch05Sec24;
REGISTRY[`${P12CH05}:25`] = P12Ch05Sec25;
REGISTRY[`${P12CH05}:26`] = P12Ch05Sec26;
REGISTRY[`${P12CH05}:27`] = P12Ch05Sec27;
REGISTRY[`${P12CH05}:28`] = P12Ch05Sec28;
REGISTRY[`${P12CH05}:29`] = P12Ch05Sec29;
REGISTRY[`${P12CH05}:30`] = P12Ch05Sec30;
REGISTRY[`${P12CH05}:31`] = P12Ch05Sec31;
REGISTRY[`${P12CH05}:32`] = P12Ch05Sec32;
REGISTRY[`${P12CH05}:33`] = P12Ch05Sec33;
REGISTRY[`${P12CH05}:34`] = P12Ch05Sec34;
REGISTRY[`${P12CH05}:35`] = P12Ch05Sec35;
REGISTRY[`${P12CH05}:36`] = P12Ch05Sec36;
REGISTRY[`${P12CH05}:37`] = P12Ch05Sec37;
REGISTRY[`${P12CH05}:38`] = P12Ch05Sec38;
REGISTRY[`${P12CH05}:39`] = P12Ch05Sec39;
REGISTRY[`${P12CH05}:40`] = P12Ch05Sec40;
REGISTRY[`${P12CH05}:41`] = P12Ch05Sec41;
REGISTRY[`${P12CH05}:42`] = P12Ch05Sec42;
REGISTRY[`${P12CH05}:43`] = P12Ch05Sec43;
REGISTRY[`${P12CH05}:44`] = P12Ch05Sec44;
REGISTRY[`${P12CH05}:45`] = P12Ch05Sec45;
REGISTRY[`${P12CH05}:46`] = P12Ch05Sec46;
REGISTRY[`${P12CH05}:47`] = P12Ch05Sec47;
REGISTRY[`${P12CH05}:48`] = P12Ch05Sec48;
REGISTRY[`${P12CH05}:49`] = P12Ch05Sec49;
REGISTRY[`${P12CH05}:50`] = P12Ch05Sec50;
REGISTRY[`${P12CH05}:51`] = P12Ch05Sec51;
REGISTRY[`${P12CH05}:52`] = P12Ch05Sec52;
REGISTRY[`${P12CH05}:53`] = P12Ch05Sec53;
REGISTRY[`${P12CH05}:54`] = P12Ch05Sec54;
REGISTRY[`${P12CH05}:55`] = P12Ch05Sec55;
REGISTRY[`${P12CH05}:56`] = P12Ch05Sec56;
REGISTRY[`${P12CH05}:57`] = P12Ch05Sec57;
REGISTRY[`${P12CH05}:58`] = P12Ch05Sec58;
REGISTRY[`${P12CH05}:59`] = P12Ch05Sec59;
REGISTRY[`${P12CH05}:60`] = P12Ch05Sec60;
REGISTRY[`${P12CH05}:61`] = P12Ch05Sec61;
REGISTRY[`${P12CH05}:62`] = P12Ch05Sec62;
REGISTRY[`${P12CH05}:63`] = P12Ch05Sec63;
REGISTRY[`${P12CH05}:64`] = P12Ch05Sec64;
REGISTRY[`${P12CH05}:65`] = P12Ch05Sec65;
REGISTRY[`${P12CH05}:66`] = P12Ch05Sec66;
REGISTRY[`${P12CH05}:67`] = P12Ch05Sec67;
REGISTRY[`${P12CH05}:68`] = P12Ch05Sec68;
REGISTRY[`${P12CH05}:69`] = P12Ch05Sec69;
REGISTRY[`${P12CH05}:70`] = P12Ch05Sec70;
/* ============================ end P12Ch05 ============================ */

/* ============================ P12Ch06: Electromagnetic Induction ============================ */
import P12Ch06Sec1 from "./P12Ch06Sec1";
import P12Ch06Sec2 from "./P12Ch06Sec2";
import P12Ch06Sec3 from "./P12Ch06Sec3";
import P12Ch06Sec4 from "./P12Ch06Sec4";
import P12Ch06Sec5 from "./P12Ch06Sec5";
import P12Ch06Sec6 from "./P12Ch06Sec6";
import P12Ch06Sec7 from "./P12Ch06Sec7";
import P12Ch06Sec8 from "./P12Ch06Sec8";
import P12Ch06Sec9 from "./P12Ch06Sec9";
import P12Ch06Sec10 from "./P12Ch06Sec10";
import P12Ch06Sec11 from "./P12Ch06Sec11";
import P12Ch06Sec12 from "./P12Ch06Sec12";
import P12Ch06Sec13 from "./P12Ch06Sec13";
import P12Ch06Sec14 from "./P12Ch06Sec14";
import P12Ch06Sec15 from "./P12Ch06Sec15";
import P12Ch06Sec16 from "./P12Ch06Sec16";
import P12Ch06Sec17 from "./P12Ch06Sec17";
import P12Ch06Sec18 from "./P12Ch06Sec18";
import P12Ch06Sec19 from "./P12Ch06Sec19";
import P12Ch06Sec20 from "./P12Ch06Sec20";
import P12Ch06Sec21 from "./P12Ch06Sec21";
import P12Ch06Sec22 from "./P12Ch06Sec22";
import P12Ch06Sec23 from "./P12Ch06Sec23";
import P12Ch06Sec24 from "./P12Ch06Sec24";
import P12Ch06Sec25 from "./P12Ch06Sec25";
import P12Ch06Sec26 from "./P12Ch06Sec26";
import P12Ch06Sec27 from "./P12Ch06Sec27";
import P12Ch06Sec28 from "./P12Ch06Sec28";
import P12Ch06Sec29 from "./P12Ch06Sec29";
import P12Ch06Sec30 from "./P12Ch06Sec30";
import P12Ch06Sec31 from "./P12Ch06Sec31";
import P12Ch06Sec32 from "./P12Ch06Sec32";
import P12Ch06Sec33 from "./P12Ch06Sec33";
import P12Ch06Sec34 from "./P12Ch06Sec34";
import P12Ch06Sec35 from "./P12Ch06Sec35";
import P12Ch06Sec36 from "./P12Ch06Sec36";
import P12Ch06Sec37 from "./P12Ch06Sec37";
import P12Ch06Sec38 from "./P12Ch06Sec38";
import P12Ch06Sec39 from "./P12Ch06Sec39";
import P12Ch06Sec40 from "./P12Ch06Sec40";
import P12Ch06Sec41 from "./P12Ch06Sec41";
import P12Ch06Sec42 from "./P12Ch06Sec42";
import P12Ch06Sec43 from "./P12Ch06Sec43";
import P12Ch06Sec44 from "./P12Ch06Sec44";
import P12Ch06Sec45 from "./P12Ch06Sec45";
import P12Ch06Sec46 from "./P12Ch06Sec46";
import P12Ch06Sec47 from "./P12Ch06Sec47";
import P12Ch06Sec48 from "./P12Ch06Sec48";
import P12Ch06Sec49 from "./P12Ch06Sec49";
import P12Ch06Sec50 from "./P12Ch06Sec50";
import P12Ch06Sec51 from "./P12Ch06Sec51";
import P12Ch06Sec52 from "./P12Ch06Sec52";
import P12Ch06Sec53 from "./P12Ch06Sec53";
import P12Ch06Sec54 from "./P12Ch06Sec54";
import P12Ch06Sec55 from "./P12Ch06Sec55";
import P12Ch06Sec56 from "./P12Ch06Sec56";
import P12Ch06Sec57 from "./P12Ch06Sec57";
import P12Ch06Sec58 from "./P12Ch06Sec58";
import P12Ch06Sec59 from "./P12Ch06Sec59";
import P12Ch06Sec60 from "./P12Ch06Sec60";
import P12Ch06Sec61 from "./P12Ch06Sec61";
import P12Ch06Sec62 from "./P12Ch06Sec62";
import P12Ch06Sec63 from "./P12Ch06Sec63";
import P12Ch06Sec64 from "./P12Ch06Sec64";
import P12Ch06Sec65 from "./P12Ch06Sec65";

const P12CH06 = "b8223a22-15d4-5760-886f-53750c7dc9e8"; // Class 12 · Electromagnetic Induction

REGISTRY[`${P12CH06}:1`] = P12Ch06Sec1;
REGISTRY[`${P12CH06}:2`] = P12Ch06Sec2;
REGISTRY[`${P12CH06}:3`] = P12Ch06Sec3;
REGISTRY[`${P12CH06}:4`] = P12Ch06Sec4;
REGISTRY[`${P12CH06}:5`] = P12Ch06Sec5;
REGISTRY[`${P12CH06}:6`] = P12Ch06Sec6;
REGISTRY[`${P12CH06}:7`] = P12Ch06Sec7;
REGISTRY[`${P12CH06}:8`] = P12Ch06Sec8;
REGISTRY[`${P12CH06}:9`] = P12Ch06Sec9;
REGISTRY[`${P12CH06}:10`] = P12Ch06Sec10;
REGISTRY[`${P12CH06}:11`] = P12Ch06Sec11;
REGISTRY[`${P12CH06}:12`] = P12Ch06Sec12;
REGISTRY[`${P12CH06}:13`] = P12Ch06Sec13;
REGISTRY[`${P12CH06}:14`] = P12Ch06Sec14;
REGISTRY[`${P12CH06}:15`] = P12Ch06Sec15;
REGISTRY[`${P12CH06}:16`] = P12Ch06Sec16;
REGISTRY[`${P12CH06}:17`] = P12Ch06Sec17;
REGISTRY[`${P12CH06}:18`] = P12Ch06Sec18;
REGISTRY[`${P12CH06}:19`] = P12Ch06Sec19;
REGISTRY[`${P12CH06}:20`] = P12Ch06Sec20;
REGISTRY[`${P12CH06}:21`] = P12Ch06Sec21;
REGISTRY[`${P12CH06}:22`] = P12Ch06Sec22;
REGISTRY[`${P12CH06}:23`] = P12Ch06Sec23;
REGISTRY[`${P12CH06}:24`] = P12Ch06Sec24;
REGISTRY[`${P12CH06}:25`] = P12Ch06Sec25;
REGISTRY[`${P12CH06}:26`] = P12Ch06Sec26;
REGISTRY[`${P12CH06}:27`] = P12Ch06Sec27;
REGISTRY[`${P12CH06}:28`] = P12Ch06Sec28;
REGISTRY[`${P12CH06}:29`] = P12Ch06Sec29;
REGISTRY[`${P12CH06}:30`] = P12Ch06Sec30;
REGISTRY[`${P12CH06}:31`] = P12Ch06Sec31;
REGISTRY[`${P12CH06}:32`] = P12Ch06Sec32;
REGISTRY[`${P12CH06}:33`] = P12Ch06Sec33;
REGISTRY[`${P12CH06}:34`] = P12Ch06Sec34;
REGISTRY[`${P12CH06}:35`] = P12Ch06Sec35;
REGISTRY[`${P12CH06}:36`] = P12Ch06Sec36;
REGISTRY[`${P12CH06}:37`] = P12Ch06Sec37;
REGISTRY[`${P12CH06}:38`] = P12Ch06Sec38;
REGISTRY[`${P12CH06}:39`] = P12Ch06Sec39;
REGISTRY[`${P12CH06}:40`] = P12Ch06Sec40;
REGISTRY[`${P12CH06}:41`] = P12Ch06Sec41;
REGISTRY[`${P12CH06}:42`] = P12Ch06Sec42;
REGISTRY[`${P12CH06}:43`] = P12Ch06Sec43;
REGISTRY[`${P12CH06}:44`] = P12Ch06Sec44;
REGISTRY[`${P12CH06}:45`] = P12Ch06Sec45;
REGISTRY[`${P12CH06}:46`] = P12Ch06Sec46;
REGISTRY[`${P12CH06}:47`] = P12Ch06Sec47;
REGISTRY[`${P12CH06}:48`] = P12Ch06Sec48;
REGISTRY[`${P12CH06}:49`] = P12Ch06Sec49;
REGISTRY[`${P12CH06}:50`] = P12Ch06Sec50;
REGISTRY[`${P12CH06}:51`] = P12Ch06Sec51;
REGISTRY[`${P12CH06}:52`] = P12Ch06Sec52;
REGISTRY[`${P12CH06}:53`] = P12Ch06Sec53;
REGISTRY[`${P12CH06}:54`] = P12Ch06Sec54;
REGISTRY[`${P12CH06}:55`] = P12Ch06Sec55;
REGISTRY[`${P12CH06}:56`] = P12Ch06Sec56;
REGISTRY[`${P12CH06}:57`] = P12Ch06Sec57;
REGISTRY[`${P12CH06}:58`] = P12Ch06Sec58;
REGISTRY[`${P12CH06}:59`] = P12Ch06Sec59;
REGISTRY[`${P12CH06}:60`] = P12Ch06Sec60;
REGISTRY[`${P12CH06}:61`] = P12Ch06Sec61;
REGISTRY[`${P12CH06}:62`] = P12Ch06Sec62;
REGISTRY[`${P12CH06}:63`] = P12Ch06Sec63;
REGISTRY[`${P12CH06}:64`] = P12Ch06Sec64;
REGISTRY[`${P12CH06}:65`] = P12Ch06Sec65;
/* ============================ end P12Ch06 ============================ */

/* ============================ start P12Ch07 ============================ */
import P12Ch07Sec1 from "./P12Ch07Sec1";
import P12Ch07Sec2 from "./P12Ch07Sec2";
import P12Ch07Sec3 from "./P12Ch07Sec3";
import P12Ch07Sec4 from "./P12Ch07Sec4";
import P12Ch07Sec5 from "./P12Ch07Sec5";
import P12Ch07Sec6 from "./P12Ch07Sec6";
import P12Ch07Sec7 from "./P12Ch07Sec7";
import P12Ch07Sec8 from "./P12Ch07Sec8";
import P12Ch07Sec9 from "./P12Ch07Sec9";
import P12Ch07Sec10 from "./P12Ch07Sec10";
import P12Ch07Sec11 from "./P12Ch07Sec11";
import P12Ch07Sec12 from "./P12Ch07Sec12";
import P12Ch07Sec13 from "./P12Ch07Sec13";

const P12CH07 = "69dbf2ca-bc1d-514e-a033-de1eefec09c9"; // Class 12 · Alternating Current

REGISTRY[`${P12CH07}:1`] = P12Ch07Sec1;
REGISTRY[`${P12CH07}:2`] = P12Ch07Sec2;
REGISTRY[`${P12CH07}:3`] = P12Ch07Sec3;
REGISTRY[`${P12CH07}:4`] = P12Ch07Sec4;
REGISTRY[`${P12CH07}:5`] = P12Ch07Sec5;
REGISTRY[`${P12CH07}:6`] = P12Ch07Sec6;
REGISTRY[`${P12CH07}:7`] = P12Ch07Sec7;
REGISTRY[`${P12CH07}:8`] = P12Ch07Sec8;
REGISTRY[`${P12CH07}:9`] = P12Ch07Sec9;
REGISTRY[`${P12CH07}:10`] = P12Ch07Sec10;
REGISTRY[`${P12CH07}:11`] = P12Ch07Sec11;
REGISTRY[`${P12CH07}:12`] = P12Ch07Sec12;
REGISTRY[`${P12CH07}:13`] = P12Ch07Sec13;
/* ============================ end P12Ch07 ============================ */


/* ============================================================ */
/* Deploy completion: register all remaining Class-11 Physics    */
/* chapter sections (ch3-14 finals) not already registered above. */
/* ============================================================ */
import Ch03Sec59 from "./Ch03Sec59";
import Ch03Sec60 from "./Ch03Sec60";
import Ch03Sec61 from "./Ch03Sec61";
import Ch03Sec62 from "./Ch03Sec62";
import Ch03Sec63 from "./Ch03Sec63";
import Ch03Sec64 from "./Ch03Sec64";
import Ch03Sec65 from "./Ch03Sec65";
import Ch03Sec66 from "./Ch03Sec66";
import Ch03Sec67 from "./Ch03Sec67";
import Ch03Sec68 from "./Ch03Sec68";
import Ch03Sec69 from "./Ch03Sec69";
import Ch03Sec70 from "./Ch03Sec70";
import Ch03Sec71 from "./Ch03Sec71";
import Ch03Sec72 from "./Ch03Sec72";
import Ch03Sec73 from "./Ch03Sec73";
import Ch03Sec74 from "./Ch03Sec74";
import Ch03Sec75 from "./Ch03Sec75";
import Ch03Sec76 from "./Ch03Sec76";
import Ch04Sec42 from "./Ch04Sec42";
import Ch04Sec43 from "./Ch04Sec43";
import Ch04Sec44 from "./Ch04Sec44";
import Ch04Sec45 from "./Ch04Sec45";
import Ch04Sec46 from "./Ch04Sec46";
import Ch04Sec47 from "./Ch04Sec47";
import Ch04Sec48 from "./Ch04Sec48";
import Ch04Sec49 from "./Ch04Sec49";
import Ch04Sec50 from "./Ch04Sec50";
import Ch04Sec51 from "./Ch04Sec51";
import Ch04Sec52 from "./Ch04Sec52";
import Ch04Sec53 from "./Ch04Sec53";
import Ch04Sec54 from "./Ch04Sec54";
import Ch04Sec55 from "./Ch04Sec55";
import Ch04Sec56 from "./Ch04Sec56";
import Ch04Sec57 from "./Ch04Sec57";
import Ch04Sec58 from "./Ch04Sec58";
import Ch04Sec59 from "./Ch04Sec59";
import Ch04Sec60 from "./Ch04Sec60";
import Ch04Sec61 from "./Ch04Sec61";
import Ch04Sec62 from "./Ch04Sec62";
import Ch04Sec63 from "./Ch04Sec63";
import Ch04Sec64 from "./Ch04Sec64";
import Ch04Sec65 from "./Ch04Sec65";
import Ch04Sec66 from "./Ch04Sec66";
import Ch04Sec67 from "./Ch04Sec67";
import Ch04Sec68 from "./Ch04Sec68";
import Ch04Sec69 from "./Ch04Sec69";
import Ch04Sec70 from "./Ch04Sec70";
import Ch04Sec71 from "./Ch04Sec71";
import Ch04Sec72 from "./Ch04Sec72";
import Ch04Sec73 from "./Ch04Sec73";
import Ch04Sec74 from "./Ch04Sec74";
import Ch04Sec75 from "./Ch04Sec75";
import Ch04Sec76 from "./Ch04Sec76";
import Ch04Sec77 from "./Ch04Sec77";
import Ch04Sec78 from "./Ch04Sec78";
import Ch04Sec79 from "./Ch04Sec79";
import Ch04Sec80 from "./Ch04Sec80";
import Ch04Sec81 from "./Ch04Sec81";
import Ch04Sec82 from "./Ch04Sec82";
import Ch04Sec83 from "./Ch04Sec83";
import Ch04Sec84 from "./Ch04Sec84";
import Ch04Sec85 from "./Ch04Sec85";
import Ch04Sec86 from "./Ch04Sec86";
import Ch04Sec87 from "./Ch04Sec87";
import Ch04Sec88 from "./Ch04Sec88";
import Ch04Sec89 from "./Ch04Sec89";
import Ch04Sec90 from "./Ch04Sec90";
import Ch04Sec91 from "./Ch04Sec91";
import Ch04Sec92 from "./Ch04Sec92";
import Ch05Sec63 from "./Ch05Sec63";
import Ch05Sec64 from "./Ch05Sec64";
import Ch05Sec65 from "./Ch05Sec65";
import Ch05Sec66 from "./Ch05Sec66";
import Ch06Sec42 from "./Ch06Sec42";
import Ch06Sec43 from "./Ch06Sec43";
import Ch06Sec44 from "./Ch06Sec44";
import Ch06Sec45 from "./Ch06Sec45";
import Ch06Sec46 from "./Ch06Sec46";
import Ch06Sec47 from "./Ch06Sec47";
import Ch06Sec48 from "./Ch06Sec48";
import Ch06Sec49 from "./Ch06Sec49";
import Ch06Sec50 from "./Ch06Sec50";
import Ch06Sec51 from "./Ch06Sec51";
import Ch06Sec52 from "./Ch06Sec52";
import Ch06Sec53 from "./Ch06Sec53";
import Ch06Sec54 from "./Ch06Sec54";
import Ch06Sec55 from "./Ch06Sec55";
import Ch06Sec56 from "./Ch06Sec56";
import Ch06Sec57 from "./Ch06Sec57";
import Ch06Sec58 from "./Ch06Sec58";
import Ch06Sec59 from "./Ch06Sec59";
import Ch06Sec60 from "./Ch06Sec60";
import Ch06Sec61 from "./Ch06Sec61";
import Ch06Sec62 from "./Ch06Sec62";
import Ch06Sec63 from "./Ch06Sec63";
import Ch06Sec64 from "./Ch06Sec64";
import Ch06Sec65 from "./Ch06Sec65";
import Ch06Sec66 from "./Ch06Sec66";
import Ch06Sec67 from "./Ch06Sec67";
import Ch06Sec68 from "./Ch06Sec68";
import Ch06Sec69 from "./Ch06Sec69";
import Ch06Sec70 from "./Ch06Sec70";
import Ch07Sec30 from "./Ch07Sec30";
import Ch07Sec31 from "./Ch07Sec31";
import Ch07Sec32 from "./Ch07Sec32";
import Ch07Sec33 from "./Ch07Sec33";
import Ch07Sec34 from "./Ch07Sec34";
import Ch07Sec35 from "./Ch07Sec35";
import Ch07Sec36 from "./Ch07Sec36";
import Ch07Sec37 from "./Ch07Sec37";
import Ch07Sec38 from "./Ch07Sec38";
import Ch07Sec39 from "./Ch07Sec39";
import Ch07Sec40 from "./Ch07Sec40";
import Ch07Sec41 from "./Ch07Sec41";
import Ch07Sec42 from "./Ch07Sec42";
import Ch07Sec43 from "./Ch07Sec43";
import Ch07Sec44 from "./Ch07Sec44";
import Ch07Sec45 from "./Ch07Sec45";
import Ch07Sec46 from "./Ch07Sec46";
import Ch07Sec47 from "./Ch07Sec47";
import Ch07Sec48 from "./Ch07Sec48";
import Ch07Sec49 from "./Ch07Sec49";
import Ch07Sec50 from "./Ch07Sec50";
import Ch07Sec51 from "./Ch07Sec51";
import Ch07Sec52 from "./Ch07Sec52";
import Ch07Sec53 from "./Ch07Sec53";
import Ch07Sec54 from "./Ch07Sec54";
import Ch07Sec55 from "./Ch07Sec55";
import Ch07Sec56 from "./Ch07Sec56";
import Ch07Sec57 from "./Ch07Sec57";
import Ch07Sec58 from "./Ch07Sec58";
import Ch07Sec59 from "./Ch07Sec59";
import Ch07Sec60 from "./Ch07Sec60";
import Ch07Sec61 from "./Ch07Sec61";
import Ch07Sec62 from "./Ch07Sec62";
import Ch07Sec63 from "./Ch07Sec63";
import Ch07Sec64 from "./Ch07Sec64";
import Ch07Sec65 from "./Ch07Sec65";
import Ch07Sec66 from "./Ch07Sec66";
import Ch07Sec67 from "./Ch07Sec67";
import Ch07Sec68 from "./Ch07Sec68";
import Ch07Sec69 from "./Ch07Sec69";
import Ch07Sec70 from "./Ch07Sec70";
import Ch07Sec71 from "./Ch07Sec71";
import Ch07Sec72 from "./Ch07Sec72";
import Ch07Sec73 from "./Ch07Sec73";
import Ch07Sec74 from "./Ch07Sec74";
import Ch07Sec75 from "./Ch07Sec75";
import Ch07Sec76 from "./Ch07Sec76";
import Ch08Sec1 from "./Ch08Sec1";
import Ch08Sec2 from "./Ch08Sec2";
import Ch08Sec3 from "./Ch08Sec3";
import Ch08Sec4 from "./Ch08Sec4";
import Ch08Sec5 from "./Ch08Sec5";
import Ch08Sec6 from "./Ch08Sec6";
import Ch08Sec7 from "./Ch08Sec7";
import Ch08Sec8 from "./Ch08Sec8";
import Ch08Sec9 from "./Ch08Sec9";
import Ch08Sec10 from "./Ch08Sec10";
import Ch08Sec11 from "./Ch08Sec11";
import Ch08Sec12 from "./Ch08Sec12";
import Ch08Sec13 from "./Ch08Sec13";
import Ch08Sec14 from "./Ch08Sec14";
import Ch08Sec15 from "./Ch08Sec15";
import Ch08Sec16 from "./Ch08Sec16";
import Ch08Sec17 from "./Ch08Sec17";
import Ch08Sec18 from "./Ch08Sec18";
import Ch08Sec19 from "./Ch08Sec19";
import Ch08Sec20 from "./Ch08Sec20";
import Ch08Sec21 from "./Ch08Sec21";
import Ch08Sec22 from "./Ch08Sec22";
import Ch08Sec23 from "./Ch08Sec23";
import Ch08Sec24 from "./Ch08Sec24";
import Ch08Sec25 from "./Ch08Sec25";
import Ch08Sec26 from "./Ch08Sec26";
import Ch08Sec27 from "./Ch08Sec27";
import Ch08Sec28 from "./Ch08Sec28";
import Ch08Sec29 from "./Ch08Sec29";
import Ch08Sec30 from "./Ch08Sec30";
import Ch08Sec31 from "./Ch08Sec31";
import Ch08Sec32 from "./Ch08Sec32";
import Ch08Sec33 from "./Ch08Sec33";
import Ch08Sec34 from "./Ch08Sec34";
import Ch08Sec35 from "./Ch08Sec35";
import Ch08Sec36 from "./Ch08Sec36";
import Ch08Sec37 from "./Ch08Sec37";
import Ch08Sec38 from "./Ch08Sec38";
import Ch08Sec39 from "./Ch08Sec39";
import Ch08Sec40 from "./Ch08Sec40";
import Ch08Sec41 from "./Ch08Sec41";
import Ch08Sec42 from "./Ch08Sec42";
import Ch08Sec43 from "./Ch08Sec43";
import Ch08Sec44 from "./Ch08Sec44";
import Ch08Sec45 from "./Ch08Sec45";
import Ch08Sec46 from "./Ch08Sec46";
import Ch08Sec47 from "./Ch08Sec47";
import Ch08Sec48 from "./Ch08Sec48";
import Ch08Sec49 from "./Ch08Sec49";
import Ch08Sec50 from "./Ch08Sec50";
import Ch08Sec51 from "./Ch08Sec51";
import Ch08Sec52 from "./Ch08Sec52";
import Ch08Sec53 from "./Ch08Sec53";
import Ch08Sec54 from "./Ch08Sec54";
import Ch08Sec55 from "./Ch08Sec55";
import Ch08Sec56 from "./Ch08Sec56";
import Ch08Sec57 from "./Ch08Sec57";
import Ch08Sec58 from "./Ch08Sec58";
import Ch08Sec59 from "./Ch08Sec59";
import Ch08Sec60 from "./Ch08Sec60";
import Ch08Sec61 from "./Ch08Sec61";
import Ch08Sec62 from "./Ch08Sec62";
import Ch08Sec63 from "./Ch08Sec63";
import Ch08Sec64 from "./Ch08Sec64";
import Ch09Sec1 from "./Ch09Sec1";
import Ch09Sec2 from "./Ch09Sec2";
import Ch09Sec3 from "./Ch09Sec3";
import Ch09Sec4 from "./Ch09Sec4";
import Ch09Sec5 from "./Ch09Sec5";
import Ch09Sec6 from "./Ch09Sec6";
import Ch09Sec7 from "./Ch09Sec7";
import Ch09Sec8 from "./Ch09Sec8";
import Ch09Sec9 from "./Ch09Sec9";
import Ch09Sec10 from "./Ch09Sec10";
import Ch09Sec11 from "./Ch09Sec11";
import Ch09Sec12 from "./Ch09Sec12";
import Ch09Sec13 from "./Ch09Sec13";
import Ch09Sec14 from "./Ch09Sec14";
import Ch09Sec15 from "./Ch09Sec15";
import Ch09Sec16 from "./Ch09Sec16";
import Ch09Sec17 from "./Ch09Sec17";
import Ch09Sec18 from "./Ch09Sec18";
import Ch09Sec19 from "./Ch09Sec19";
import Ch09Sec20 from "./Ch09Sec20";
import Ch09Sec21 from "./Ch09Sec21";
import Ch09Sec22 from "./Ch09Sec22";
import Ch09Sec23 from "./Ch09Sec23";
import Ch09Sec24 from "./Ch09Sec24";
import Ch09Sec25 from "./Ch09Sec25";
import Ch09Sec26 from "./Ch09Sec26";
import Ch09Sec27 from "./Ch09Sec27";
import Ch09Sec28 from "./Ch09Sec28";
import Ch09Sec29 from "./Ch09Sec29";
import Ch09Sec30 from "./Ch09Sec30";
import Ch09Sec31 from "./Ch09Sec31";
import Ch09Sec32 from "./Ch09Sec32";
import Ch09Sec33 from "./Ch09Sec33";
import Ch09Sec34 from "./Ch09Sec34";
import Ch09Sec35 from "./Ch09Sec35";
import Ch09Sec36 from "./Ch09Sec36";
import Ch09Sec37 from "./Ch09Sec37";
import Ch09Sec38 from "./Ch09Sec38";
import Ch09Sec39 from "./Ch09Sec39";
import Ch09Sec40 from "./Ch09Sec40";
import Ch09Sec41 from "./Ch09Sec41";
import Ch09Sec42 from "./Ch09Sec42";
import Ch09Sec43 from "./Ch09Sec43";
import Ch09Sec44 from "./Ch09Sec44";
import Ch09Sec45 from "./Ch09Sec45";
import Ch09Sec46 from "./Ch09Sec46";
import Ch09Sec47 from "./Ch09Sec47";
import Ch09Sec48 from "./Ch09Sec48";
import Ch09Sec49 from "./Ch09Sec49";
import Ch09Sec50 from "./Ch09Sec50";
import Ch09Sec51 from "./Ch09Sec51";
import Ch09Sec52 from "./Ch09Sec52";
import Ch09Sec53 from "./Ch09Sec53";
import Ch09Sec54 from "./Ch09Sec54";
import Ch09Sec55 from "./Ch09Sec55";
import Ch09Sec56 from "./Ch09Sec56";
import Ch09Sec57 from "./Ch09Sec57";
import Ch09Sec58 from "./Ch09Sec58";
import Ch09Sec59 from "./Ch09Sec59";
import Ch09Sec60 from "./Ch09Sec60";
import Ch09Sec61 from "./Ch09Sec61";
import Ch09Sec62 from "./Ch09Sec62";
import Ch09Sec63 from "./Ch09Sec63";
import Ch09Sec64 from "./Ch09Sec64";
import Ch09Sec65 from "./Ch09Sec65";
import Ch09Sec66 from "./Ch09Sec66";
import Ch09Sec67 from "./Ch09Sec67";
import Ch09Sec68 from "./Ch09Sec68";
import Ch09Sec69 from "./Ch09Sec69";
import Ch09Sec70 from "./Ch09Sec70";
import Ch09Sec71 from "./Ch09Sec71";
import Ch09Sec72 from "./Ch09Sec72";
import Ch09Sec73 from "./Ch09Sec73";
import Ch09Sec74 from "./Ch09Sec74";
import Ch09Sec75 from "./Ch09Sec75";
import Ch09Sec76 from "./Ch09Sec76";
import Ch09Sec77 from "./Ch09Sec77";
import Ch09Sec78 from "./Ch09Sec78";
import Ch09Sec79 from "./Ch09Sec79";
import Ch09Sec80 from "./Ch09Sec80";
import Ch09Sec81 from "./Ch09Sec81";
import Ch09Sec82 from "./Ch09Sec82";
import Ch09Sec83 from "./Ch09Sec83";
import Ch09Sec84 from "./Ch09Sec84";
import Ch09Sec85 from "./Ch09Sec85";
import Ch09Sec86 from "./Ch09Sec86";
import Ch10Sec1 from "./Ch10Sec1";
import Ch10Sec2 from "./Ch10Sec2";
import Ch10Sec3 from "./Ch10Sec3";
import Ch10Sec4 from "./Ch10Sec4";
import Ch10Sec5 from "./Ch10Sec5";
import Ch10Sec6 from "./Ch10Sec6";
import Ch10Sec7 from "./Ch10Sec7";
import Ch10Sec8 from "./Ch10Sec8";
import Ch10Sec9 from "./Ch10Sec9";
import Ch10Sec10 from "./Ch10Sec10";
import Ch10Sec11 from "./Ch10Sec11";
import Ch10Sec12 from "./Ch10Sec12";
import Ch10Sec13 from "./Ch10Sec13";
import Ch10Sec14 from "./Ch10Sec14";
import Ch10Sec15 from "./Ch10Sec15";
import Ch10Sec16 from "./Ch10Sec16";
import Ch10Sec17 from "./Ch10Sec17";
import Ch10Sec18 from "./Ch10Sec18";
import Ch10Sec19 from "./Ch10Sec19";
import Ch10Sec20 from "./Ch10Sec20";
import Ch10Sec21 from "./Ch10Sec21";
import Ch10Sec22 from "./Ch10Sec22";
import Ch10Sec23 from "./Ch10Sec23";
import Ch10Sec24 from "./Ch10Sec24";
import Ch10Sec25 from "./Ch10Sec25";
import Ch10Sec26 from "./Ch10Sec26";
import Ch10Sec27 from "./Ch10Sec27";
import Ch10Sec28 from "./Ch10Sec28";
import Ch10Sec29 from "./Ch10Sec29";
import Ch10Sec30 from "./Ch10Sec30";
import Ch10Sec31 from "./Ch10Sec31";
import Ch10Sec32 from "./Ch10Sec32";
import Ch10Sec33 from "./Ch10Sec33";
import Ch10Sec34 from "./Ch10Sec34";
import Ch10Sec35 from "./Ch10Sec35";
import Ch10Sec36 from "./Ch10Sec36";
import Ch10Sec37 from "./Ch10Sec37";
import Ch10Sec38 from "./Ch10Sec38";
import Ch10Sec39 from "./Ch10Sec39";
import Ch10Sec40 from "./Ch10Sec40";
import Ch10Sec41 from "./Ch10Sec41";
import Ch10Sec42 from "./Ch10Sec42";
import Ch10Sec43 from "./Ch10Sec43";
import Ch10Sec44 from "./Ch10Sec44";
import Ch10Sec45 from "./Ch10Sec45";
import Ch10Sec46 from "./Ch10Sec46";
import Ch10Sec47 from "./Ch10Sec47";
import Ch10Sec48 from "./Ch10Sec48";
import Ch10Sec49 from "./Ch10Sec49";
import Ch10Sec50 from "./Ch10Sec50";
import Ch10Sec51 from "./Ch10Sec51";
import Ch10Sec52 from "./Ch10Sec52";
import Ch10Sec53 from "./Ch10Sec53";
import Ch10Sec54 from "./Ch10Sec54";
import Ch10Sec55 from "./Ch10Sec55";
import Ch10Sec56 from "./Ch10Sec56";
import Ch10Sec57 from "./Ch10Sec57";
import Ch10Sec58 from "./Ch10Sec58";
import Ch10Sec59 from "./Ch10Sec59";
import Ch10Sec60 from "./Ch10Sec60";
import Ch10Sec61 from "./Ch10Sec61";
import Ch10Sec62 from "./Ch10Sec62";
import Ch10Sec63 from "./Ch10Sec63";
import Ch10Sec64 from "./Ch10Sec64";
import Ch10Sec65 from "./Ch10Sec65";
import Ch10Sec66 from "./Ch10Sec66";
import Ch10Sec67 from "./Ch10Sec67";
import Ch10Sec68 from "./Ch10Sec68";
import Ch10Sec69 from "./Ch10Sec69";
import Ch10Sec70 from "./Ch10Sec70";
import Ch10Sec71 from "./Ch10Sec71";
import Ch10Sec72 from "./Ch10Sec72";
import Ch10Sec73 from "./Ch10Sec73";
import Ch10Sec74 from "./Ch10Sec74";
import Ch11Sec1 from "./Ch11Sec1";
import Ch11Sec2 from "./Ch11Sec2";
import Ch11Sec3 from "./Ch11Sec3";
import Ch11Sec4 from "./Ch11Sec4";
import Ch11Sec5 from "./Ch11Sec5";
import Ch11Sec6 from "./Ch11Sec6";
import Ch11Sec7 from "./Ch11Sec7";
import Ch11Sec8 from "./Ch11Sec8";
import Ch11Sec9 from "./Ch11Sec9";
import Ch11Sec10 from "./Ch11Sec10";
import Ch11Sec11 from "./Ch11Sec11";
import Ch11Sec12 from "./Ch11Sec12";
import Ch11Sec13 from "./Ch11Sec13";
import Ch11Sec14 from "./Ch11Sec14";
import Ch11Sec15 from "./Ch11Sec15";
import Ch11Sec16 from "./Ch11Sec16";
import Ch11Sec17 from "./Ch11Sec17";
import Ch11Sec18 from "./Ch11Sec18";
import Ch11Sec19 from "./Ch11Sec19";
import Ch11Sec20 from "./Ch11Sec20";
import Ch11Sec21 from "./Ch11Sec21";
import Ch11Sec22 from "./Ch11Sec22";
import Ch11Sec23 from "./Ch11Sec23";
import Ch11Sec24 from "./Ch11Sec24";
import Ch11Sec25 from "./Ch11Sec25";
import Ch11Sec26 from "./Ch11Sec26";
import Ch11Sec27 from "./Ch11Sec27";
import Ch11Sec28 from "./Ch11Sec28";
import Ch11Sec29 from "./Ch11Sec29";
import Ch11Sec30 from "./Ch11Sec30";
import Ch11Sec31 from "./Ch11Sec31";
import Ch11Sec32 from "./Ch11Sec32";
import Ch11Sec33 from "./Ch11Sec33";
import Ch11Sec34 from "./Ch11Sec34";
import Ch11Sec35 from "./Ch11Sec35";
import Ch11Sec36 from "./Ch11Sec36";
import Ch11Sec37 from "./Ch11Sec37";
import Ch11Sec38 from "./Ch11Sec38";
import Ch11Sec39 from "./Ch11Sec39";
import Ch11Sec40 from "./Ch11Sec40";
import Ch11Sec41 from "./Ch11Sec41";
import Ch11Sec42 from "./Ch11Sec42";
import Ch11Sec43 from "./Ch11Sec43";
import Ch11Sec44 from "./Ch11Sec44";
import Ch11Sec45 from "./Ch11Sec45";
import Ch11Sec46 from "./Ch11Sec46";
import Ch11Sec47 from "./Ch11Sec47";
import Ch11Sec48 from "./Ch11Sec48";
import Ch11Sec49 from "./Ch11Sec49";
import Ch11Sec50 from "./Ch11Sec50";
import Ch11Sec51 from "./Ch11Sec51";
import Ch11Sec52 from "./Ch11Sec52";
import Ch11Sec53 from "./Ch11Sec53";
import Ch11Sec54 from "./Ch11Sec54";
import Ch11Sec55 from "./Ch11Sec55";
import Ch11Sec56 from "./Ch11Sec56";
import Ch11Sec57 from "./Ch11Sec57";
import Ch11Sec58 from "./Ch11Sec58";
import Ch11Sec59 from "./Ch11Sec59";
import Ch11Sec60 from "./Ch11Sec60";
import Ch11Sec61 from "./Ch11Sec61";
import Ch12Sec1 from "./Ch12Sec1";
import Ch12Sec2 from "./Ch12Sec2";
import Ch12Sec3 from "./Ch12Sec3";
import Ch12Sec4 from "./Ch12Sec4";
import Ch12Sec5 from "./Ch12Sec5";
import Ch12Sec6 from "./Ch12Sec6";
import Ch12Sec7 from "./Ch12Sec7";
import Ch12Sec8 from "./Ch12Sec8";
import Ch12Sec9 from "./Ch12Sec9";
import Ch12Sec10 from "./Ch12Sec10";
import Ch12Sec11 from "./Ch12Sec11";
import Ch12Sec12 from "./Ch12Sec12";
import Ch12Sec13 from "./Ch12Sec13";
import Ch12Sec14 from "./Ch12Sec14";
import Ch12Sec15 from "./Ch12Sec15";
import Ch12Sec16 from "./Ch12Sec16";
import Ch12Sec17 from "./Ch12Sec17";
import Ch12Sec18 from "./Ch12Sec18";
import Ch12Sec19 from "./Ch12Sec19";
import Ch12Sec20 from "./Ch12Sec20";
import Ch12Sec21 from "./Ch12Sec21";
import Ch12Sec22 from "./Ch12Sec22";
import Ch12Sec23 from "./Ch12Sec23";
import Ch12Sec24 from "./Ch12Sec24";
import Ch12Sec25 from "./Ch12Sec25";
import Ch12Sec26 from "./Ch12Sec26";
import Ch12Sec27 from "./Ch12Sec27";
import Ch12Sec28 from "./Ch12Sec28";
import Ch12Sec29 from "./Ch12Sec29";
import Ch12Sec30 from "./Ch12Sec30";
import Ch12Sec31 from "./Ch12Sec31";
import Ch12Sec32 from "./Ch12Sec32";
import Ch12Sec33 from "./Ch12Sec33";
import Ch12Sec34 from "./Ch12Sec34";
import Ch12Sec35 from "./Ch12Sec35";
import Ch12Sec36 from "./Ch12Sec36";
import Ch12Sec37 from "./Ch12Sec37";
import Ch12Sec38 from "./Ch12Sec38";
import Ch12Sec39 from "./Ch12Sec39";
import Ch12Sec40 from "./Ch12Sec40";
import Ch12Sec41 from "./Ch12Sec41";
import Ch12Sec42 from "./Ch12Sec42";
import Ch12Sec43 from "./Ch12Sec43";
import Ch12Sec44 from "./Ch12Sec44";
import Ch12Sec45 from "./Ch12Sec45";
import Ch12Sec46 from "./Ch12Sec46";
import Ch12Sec47 from "./Ch12Sec47";
import Ch12Sec48 from "./Ch12Sec48";
import Ch13Sec1 from "./Ch13Sec1";
import Ch13Sec2 from "./Ch13Sec2";
import Ch13Sec3 from "./Ch13Sec3";
import Ch13Sec4 from "./Ch13Sec4";
import Ch13Sec5 from "./Ch13Sec5";
import Ch13Sec6 from "./Ch13Sec6";
import Ch13Sec7 from "./Ch13Sec7";
import Ch13Sec8 from "./Ch13Sec8";
import Ch13Sec9 from "./Ch13Sec9";
import Ch13Sec10 from "./Ch13Sec10";
import Ch13Sec11 from "./Ch13Sec11";
import Ch13Sec12 from "./Ch13Sec12";
import Ch13Sec13 from "./Ch13Sec13";
import Ch13Sec14 from "./Ch13Sec14";
import Ch13Sec15 from "./Ch13Sec15";
import Ch13Sec16 from "./Ch13Sec16";
import Ch13Sec17 from "./Ch13Sec17";
import Ch13Sec18 from "./Ch13Sec18";
import Ch13Sec19 from "./Ch13Sec19";
import Ch13Sec20 from "./Ch13Sec20";
import Ch13Sec21 from "./Ch13Sec21";
import Ch13Sec22 from "./Ch13Sec22";
import Ch13Sec23 from "./Ch13Sec23";
import Ch13Sec24 from "./Ch13Sec24";
import Ch13Sec25 from "./Ch13Sec25";
import Ch13Sec26 from "./Ch13Sec26";
import Ch13Sec27 from "./Ch13Sec27";
import Ch13Sec28 from "./Ch13Sec28";
import Ch13Sec29 from "./Ch13Sec29";
import Ch13Sec30 from "./Ch13Sec30";
import Ch13Sec31 from "./Ch13Sec31";
import Ch13Sec32 from "./Ch13Sec32";
import Ch13Sec33 from "./Ch13Sec33";
import Ch13Sec34 from "./Ch13Sec34";
import Ch13Sec35 from "./Ch13Sec35";
import Ch13Sec36 from "./Ch13Sec36";
import Ch13Sec37 from "./Ch13Sec37";
import Ch13Sec38 from "./Ch13Sec38";
import Ch13Sec39 from "./Ch13Sec39";
import Ch13Sec40 from "./Ch13Sec40";
import Ch13Sec41 from "./Ch13Sec41";
import Ch13Sec42 from "./Ch13Sec42";
import Ch13Sec43 from "./Ch13Sec43";
import Ch13Sec44 from "./Ch13Sec44";
import Ch13Sec45 from "./Ch13Sec45";
import Ch13Sec46 from "./Ch13Sec46";
import Ch13Sec47 from "./Ch13Sec47";
import Ch13Sec48 from "./Ch13Sec48";
import Ch13Sec49 from "./Ch13Sec49";
import Ch13Sec50 from "./Ch13Sec50";
import Ch13Sec51 from "./Ch13Sec51";
import Ch13Sec52 from "./Ch13Sec52";
import Ch13Sec53 from "./Ch13Sec53";
import Ch13Sec54 from "./Ch13Sec54";
import Ch13Sec55 from "./Ch13Sec55";
import Ch13Sec56 from "./Ch13Sec56";
import Ch13Sec57 from "./Ch13Sec57";
import Ch13Sec58 from "./Ch13Sec58";
import Ch14Sec1 from "./Ch14Sec1";
import Ch14Sec2 from "./Ch14Sec2";
import Ch14Sec3 from "./Ch14Sec3";
import Ch14Sec4 from "./Ch14Sec4";
import Ch14Sec5 from "./Ch14Sec5";
import Ch14Sec6 from "./Ch14Sec6";
import Ch14Sec7 from "./Ch14Sec7";
import Ch14Sec8 from "./Ch14Sec8";
import Ch14Sec9 from "./Ch14Sec9";
import Ch14Sec10 from "./Ch14Sec10";
import Ch14Sec11 from "./Ch14Sec11";
import Ch14Sec12 from "./Ch14Sec12";
import Ch14Sec13 from "./Ch14Sec13";
import Ch14Sec14 from "./Ch14Sec14";
import Ch14Sec15 from "./Ch14Sec15";
import Ch14Sec16 from "./Ch14Sec16";
import Ch14Sec17 from "./Ch14Sec17";
import Ch14Sec18 from "./Ch14Sec18";
import Ch14Sec19 from "./Ch14Sec19";
import Ch14Sec20 from "./Ch14Sec20";
import Ch14Sec21 from "./Ch14Sec21";
import Ch14Sec22 from "./Ch14Sec22";
import Ch14Sec23 from "./Ch14Sec23";
import Ch14Sec24 from "./Ch14Sec24";
import Ch14Sec25 from "./Ch14Sec25";
import Ch14Sec26 from "./Ch14Sec26";
import Ch14Sec27 from "./Ch14Sec27";
import Ch14Sec28 from "./Ch14Sec28";
import Ch14Sec29 from "./Ch14Sec29";
import Ch14Sec30 from "./Ch14Sec30";
import Ch14Sec31 from "./Ch14Sec31";
import Ch14Sec32 from "./Ch14Sec32";
import Ch14Sec33 from "./Ch14Sec33";
import Ch14Sec34 from "./Ch14Sec34";
import Ch14Sec35 from "./Ch14Sec35";
import Ch14Sec36 from "./Ch14Sec36";
import Ch14Sec37 from "./Ch14Sec37";
import Ch14Sec38 from "./Ch14Sec38";
// ── C11 Ch06 (Equilibrium) imports ──
import C11Ch06Sec1 from "./C11Ch06Sec1";
import C11Ch06Sec2 from "./C11Ch06Sec2";
import C11Ch06Sec3 from "./C11Ch06Sec3";
import C11Ch06Sec4 from "./C11Ch06Sec4";
import C11Ch06Sec5 from "./C11Ch06Sec5";
import C11Ch06Sec6 from "./C11Ch06Sec6";
import C11Ch06Sec7 from "./C11Ch06Sec7";
import C11Ch06Sec8 from "./C11Ch06Sec8";
import C11Ch06Sec9 from "./C11Ch06Sec9";
import C11Ch06Sec10 from "./C11Ch06Sec10";
import C11Ch06Sec11 from "./C11Ch06Sec11";
import C11Ch06Sec12 from "./C11Ch06Sec12";
import C11Ch06Sec13 from "./C11Ch06Sec13";
import C11Ch06Sec14 from "./C11Ch06Sec14";
import C11Ch06Sec15 from "./C11Ch06Sec15";
import C11Ch06Sec16 from "./C11Ch06Sec16";
import C11Ch06Sec17 from "./C11Ch06Sec17";
import C11Ch06Sec18 from "./C11Ch06Sec18";
import C11Ch06Sec19 from "./C11Ch06Sec19";
import C11Ch06Sec20 from "./C11Ch06Sec20";
import C11Ch06Sec21 from "./C11Ch06Sec21";
import C11Ch06Sec22 from "./C11Ch06Sec22";
import C11Ch06Sec23 from "./C11Ch06Sec23";
import C11Ch06Sec24 from "./C11Ch06Sec24";
import C11Ch06Sec25 from "./C11Ch06Sec25";
import C11Ch06Sec26 from "./C11Ch06Sec26";
import C11Ch06Sec27 from "./C11Ch06Sec27";
import C11Ch06Sec28 from "./C11Ch06Sec28";
import C11Ch06Sec29 from "./C11Ch06Sec29";
import C11Ch06Sec30 from "./C11Ch06Sec30";
import C11Ch06Sec31 from "./C11Ch06Sec31";
import C11Ch06Sec32 from "./C11Ch06Sec32";
import C11Ch06Sec33 from "./C11Ch06Sec33";
import C11Ch06Sec34 from "./C11Ch06Sec34";
import C11Ch06Sec35 from "./C11Ch06Sec35";
import C11Ch06Sec36 from "./C11Ch06Sec36";
import C11Ch06Sec37 from "./C11Ch06Sec37";
import C11Ch06Sec38 from "./C11Ch06Sec38";
import C11Ch06Sec39 from "./C11Ch06Sec39";
import C11Ch06Sec40 from "./C11Ch06Sec40";
import C11Ch06Sec41 from "./C11Ch06Sec41";
import C11Ch06Sec42 from "./C11Ch06Sec42";
import C11Ch06Sec43 from "./C11Ch06Sec43";
import C11Ch06Sec44 from "./C11Ch06Sec44";
import C11Ch06Sec45 from "./C11Ch06Sec45";
import C11Ch06Sec46 from "./C11Ch06Sec46";
import C11Ch06Sec47 from "./C11Ch06Sec47";
import C11Ch06Sec48 from "./C11Ch06Sec48";
import C11Ch06Sec49 from "./C11Ch06Sec49";
import C11Ch06Sec50 from "./C11Ch06Sec50";
import C11Ch06Sec51 from "./C11Ch06Sec51";
import C11Ch06Sec52 from "./C11Ch06Sec52";
import C11Ch06Sec53 from "./C11Ch06Sec53";
import C11Ch06Sec54 from "./C11Ch06Sec54";
import C11Ch06Sec55 from "./C11Ch06Sec55";
import C11Ch06Sec56 from "./C11Ch06Sec56";
import C11Ch06Sec57 from "./C11Ch06Sec57";
import C11Ch06Sec58 from "./C11Ch06Sec58";
import C11Ch06Sec59 from "./C11Ch06Sec59";
import C11Ch06Sec60 from "./C11Ch06Sec60";
import C11Ch06Sec61 from "./C11Ch06Sec61";
import C11Ch06Sec62 from "./C11Ch06Sec62";
import C11Ch06Sec63 from "./C11Ch06Sec63";
import C11Ch06Sec64 from "./C11Ch06Sec64";
import C11Ch06Sec65 from "./C11Ch06Sec65";
import C11Ch06Sec66 from "./C11Ch06Sec66";
import C11Ch06Sec67 from "./C11Ch06Sec67";
import C11Ch06Sec68 from "./C11Ch06Sec68";
import C11Ch06Sec69 from "./C11Ch06Sec69";
import C11Ch06Sec70 from "./C11Ch06Sec70";
import C11Ch06Sec71 from "./C11Ch06Sec71";
import C11Ch06Sec72 from "./C11Ch06Sec72";

REGISTRY[`a5970ed6-3b48-55f9-9b80-8abdd3d4c336:59`] = Ch03Sec59;
REGISTRY[`a5970ed6-3b48-55f9-9b80-8abdd3d4c336:60`] = Ch03Sec60;
REGISTRY[`a5970ed6-3b48-55f9-9b80-8abdd3d4c336:61`] = Ch03Sec61;
REGISTRY[`a5970ed6-3b48-55f9-9b80-8abdd3d4c336:62`] = Ch03Sec62;
REGISTRY[`a5970ed6-3b48-55f9-9b80-8abdd3d4c336:63`] = Ch03Sec63;
REGISTRY[`a5970ed6-3b48-55f9-9b80-8abdd3d4c336:64`] = Ch03Sec64;
REGISTRY[`a5970ed6-3b48-55f9-9b80-8abdd3d4c336:65`] = Ch03Sec65;
REGISTRY[`a5970ed6-3b48-55f9-9b80-8abdd3d4c336:66`] = Ch03Sec66;
REGISTRY[`a5970ed6-3b48-55f9-9b80-8abdd3d4c336:67`] = Ch03Sec67;
REGISTRY[`a5970ed6-3b48-55f9-9b80-8abdd3d4c336:68`] = Ch03Sec68;
REGISTRY[`a5970ed6-3b48-55f9-9b80-8abdd3d4c336:69`] = Ch03Sec69;
REGISTRY[`a5970ed6-3b48-55f9-9b80-8abdd3d4c336:70`] = Ch03Sec70;
REGISTRY[`a5970ed6-3b48-55f9-9b80-8abdd3d4c336:71`] = Ch03Sec71;
REGISTRY[`a5970ed6-3b48-55f9-9b80-8abdd3d4c336:72`] = Ch03Sec72;
REGISTRY[`a5970ed6-3b48-55f9-9b80-8abdd3d4c336:73`] = Ch03Sec73;
REGISTRY[`a5970ed6-3b48-55f9-9b80-8abdd3d4c336:74`] = Ch03Sec74;
REGISTRY[`a5970ed6-3b48-55f9-9b80-8abdd3d4c336:75`] = Ch03Sec75;
REGISTRY[`a5970ed6-3b48-55f9-9b80-8abdd3d4c336:76`] = Ch03Sec76;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:42`] = Ch04Sec42;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:43`] = Ch04Sec43;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:44`] = Ch04Sec44;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:45`] = Ch04Sec45;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:46`] = Ch04Sec46;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:47`] = Ch04Sec47;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:48`] = Ch04Sec48;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:49`] = Ch04Sec49;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:50`] = Ch04Sec50;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:51`] = Ch04Sec51;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:52`] = Ch04Sec52;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:53`] = Ch04Sec53;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:54`] = Ch04Sec54;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:55`] = Ch04Sec55;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:56`] = Ch04Sec56;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:57`] = Ch04Sec57;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:58`] = Ch04Sec58;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:59`] = Ch04Sec59;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:60`] = Ch04Sec60;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:61`] = Ch04Sec61;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:62`] = Ch04Sec62;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:63`] = Ch04Sec63;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:64`] = Ch04Sec64;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:65`] = Ch04Sec65;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:66`] = Ch04Sec66;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:67`] = Ch04Sec67;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:68`] = Ch04Sec68;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:69`] = Ch04Sec69;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:70`] = Ch04Sec70;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:71`] = Ch04Sec71;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:72`] = Ch04Sec72;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:73`] = Ch04Sec73;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:74`] = Ch04Sec74;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:75`] = Ch04Sec75;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:76`] = Ch04Sec76;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:77`] = Ch04Sec77;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:78`] = Ch04Sec78;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:79`] = Ch04Sec79;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:80`] = Ch04Sec80;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:81`] = Ch04Sec81;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:82`] = Ch04Sec82;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:83`] = Ch04Sec83;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:84`] = Ch04Sec84;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:85`] = Ch04Sec85;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:86`] = Ch04Sec86;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:87`] = Ch04Sec87;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:88`] = Ch04Sec88;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:89`] = Ch04Sec89;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:90`] = Ch04Sec90;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:91`] = Ch04Sec91;
REGISTRY[`50ae6550-951b-599c-b352-1d6e5f84bc3b:92`] = Ch04Sec92;
REGISTRY[`a88de5d2-84e4-5489-878a-f17a195e3267:63`] = Ch05Sec63;
REGISTRY[`a88de5d2-84e4-5489-878a-f17a195e3267:64`] = Ch05Sec64;
REGISTRY[`a88de5d2-84e4-5489-878a-f17a195e3267:65`] = Ch05Sec65;
REGISTRY[`a88de5d2-84e4-5489-878a-f17a195e3267:66`] = Ch05Sec66;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:42`] = Ch06Sec42;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:43`] = Ch06Sec43;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:44`] = Ch06Sec44;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:45`] = Ch06Sec45;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:46`] = Ch06Sec46;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:47`] = Ch06Sec47;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:48`] = Ch06Sec48;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:49`] = Ch06Sec49;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:50`] = Ch06Sec50;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:51`] = Ch06Sec51;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:52`] = Ch06Sec52;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:53`] = Ch06Sec53;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:54`] = Ch06Sec54;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:55`] = Ch06Sec55;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:56`] = Ch06Sec56;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:57`] = Ch06Sec57;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:58`] = Ch06Sec58;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:59`] = Ch06Sec59;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:60`] = Ch06Sec60;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:61`] = Ch06Sec61;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:62`] = Ch06Sec62;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:63`] = Ch06Sec63;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:64`] = Ch06Sec64;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:65`] = Ch06Sec65;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:66`] = Ch06Sec66;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:67`] = Ch06Sec67;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:68`] = Ch06Sec68;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:69`] = Ch06Sec69;
REGISTRY[`262da95c-2f3a-56da-905e-003fa8f0e4dc:70`] = Ch06Sec70;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:30`] = Ch07Sec30;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:31`] = Ch07Sec31;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:32`] = Ch07Sec32;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:33`] = Ch07Sec33;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:34`] = Ch07Sec34;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:35`] = Ch07Sec35;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:36`] = Ch07Sec36;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:37`] = Ch07Sec37;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:38`] = Ch07Sec38;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:39`] = Ch07Sec39;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:40`] = Ch07Sec40;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:41`] = Ch07Sec41;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:42`] = Ch07Sec42;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:43`] = Ch07Sec43;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:44`] = Ch07Sec44;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:45`] = Ch07Sec45;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:46`] = Ch07Sec46;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:47`] = Ch07Sec47;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:48`] = Ch07Sec48;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:49`] = Ch07Sec49;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:50`] = Ch07Sec50;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:51`] = Ch07Sec51;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:52`] = Ch07Sec52;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:53`] = Ch07Sec53;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:54`] = Ch07Sec54;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:55`] = Ch07Sec55;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:56`] = Ch07Sec56;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:57`] = Ch07Sec57;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:58`] = Ch07Sec58;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:59`] = Ch07Sec59;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:60`] = Ch07Sec60;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:61`] = Ch07Sec61;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:62`] = Ch07Sec62;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:63`] = Ch07Sec63;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:64`] = Ch07Sec64;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:65`] = Ch07Sec65;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:66`] = Ch07Sec66;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:67`] = Ch07Sec67;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:68`] = Ch07Sec68;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:69`] = Ch07Sec69;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:70`] = Ch07Sec70;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:71`] = Ch07Sec71;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:72`] = Ch07Sec72;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:73`] = Ch07Sec73;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:74`] = Ch07Sec74;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:75`] = Ch07Sec75;
REGISTRY[`29b5be47-3b75-550d-9636-ad45a901d4dd:76`] = Ch07Sec76;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:1`] = Ch08Sec1;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:2`] = Ch08Sec2;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:3`] = Ch08Sec3;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:4`] = Ch08Sec4;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:5`] = Ch08Sec5;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:6`] = Ch08Sec6;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:7`] = Ch08Sec7;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:8`] = Ch08Sec8;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:9`] = Ch08Sec9;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:10`] = Ch08Sec10;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:11`] = Ch08Sec11;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:12`] = Ch08Sec12;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:13`] = Ch08Sec13;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:14`] = Ch08Sec14;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:15`] = Ch08Sec15;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:16`] = Ch08Sec16;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:17`] = Ch08Sec17;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:18`] = Ch08Sec18;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:19`] = Ch08Sec19;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:20`] = Ch08Sec20;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:21`] = Ch08Sec21;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:22`] = Ch08Sec22;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:23`] = Ch08Sec23;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:24`] = Ch08Sec24;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:25`] = Ch08Sec25;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:26`] = Ch08Sec26;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:27`] = Ch08Sec27;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:28`] = Ch08Sec28;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:29`] = Ch08Sec29;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:30`] = Ch08Sec30;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:31`] = Ch08Sec31;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:32`] = Ch08Sec32;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:33`] = Ch08Sec33;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:34`] = Ch08Sec34;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:35`] = Ch08Sec35;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:36`] = Ch08Sec36;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:37`] = Ch08Sec37;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:38`] = Ch08Sec38;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:39`] = Ch08Sec39;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:40`] = Ch08Sec40;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:41`] = Ch08Sec41;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:42`] = Ch08Sec42;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:43`] = Ch08Sec43;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:44`] = Ch08Sec44;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:45`] = Ch08Sec45;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:46`] = Ch08Sec46;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:47`] = Ch08Sec47;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:48`] = Ch08Sec48;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:49`] = Ch08Sec49;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:50`] = Ch08Sec50;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:51`] = Ch08Sec51;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:52`] = Ch08Sec52;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:53`] = Ch08Sec53;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:54`] = Ch08Sec54;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:55`] = Ch08Sec55;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:56`] = Ch08Sec56;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:57`] = Ch08Sec57;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:58`] = Ch08Sec58;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:59`] = Ch08Sec59;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:60`] = Ch08Sec60;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:61`] = Ch08Sec61;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:62`] = Ch08Sec62;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:63`] = Ch08Sec63;
REGISTRY[`39bfe6d1-bd93-5157-a29c-b8ee68c3676b:64`] = Ch08Sec64;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:1`] = Ch09Sec1;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:2`] = Ch09Sec2;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:3`] = Ch09Sec3;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:4`] = Ch09Sec4;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:5`] = Ch09Sec5;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:6`] = Ch09Sec6;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:7`] = Ch09Sec7;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:8`] = Ch09Sec8;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:9`] = Ch09Sec9;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:10`] = Ch09Sec10;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:11`] = Ch09Sec11;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:12`] = Ch09Sec12;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:13`] = Ch09Sec13;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:14`] = Ch09Sec14;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:15`] = Ch09Sec15;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:16`] = Ch09Sec16;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:17`] = Ch09Sec17;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:18`] = Ch09Sec18;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:19`] = Ch09Sec19;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:20`] = Ch09Sec20;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:21`] = Ch09Sec21;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:22`] = Ch09Sec22;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:23`] = Ch09Sec23;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:24`] = Ch09Sec24;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:25`] = Ch09Sec25;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:26`] = Ch09Sec26;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:27`] = Ch09Sec27;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:28`] = Ch09Sec28;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:29`] = Ch09Sec29;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:30`] = Ch09Sec30;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:31`] = Ch09Sec31;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:32`] = Ch09Sec32;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:33`] = Ch09Sec33;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:34`] = Ch09Sec34;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:35`] = Ch09Sec35;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:36`] = Ch09Sec36;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:37`] = Ch09Sec37;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:38`] = Ch09Sec38;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:39`] = Ch09Sec39;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:40`] = Ch09Sec40;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:41`] = Ch09Sec41;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:42`] = Ch09Sec42;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:43`] = Ch09Sec43;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:44`] = Ch09Sec44;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:45`] = Ch09Sec45;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:46`] = Ch09Sec46;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:47`] = Ch09Sec47;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:48`] = Ch09Sec48;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:49`] = Ch09Sec49;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:50`] = Ch09Sec50;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:51`] = Ch09Sec51;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:52`] = Ch09Sec52;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:53`] = Ch09Sec53;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:54`] = Ch09Sec54;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:55`] = Ch09Sec55;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:56`] = Ch09Sec56;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:57`] = Ch09Sec57;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:58`] = Ch09Sec58;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:59`] = Ch09Sec59;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:60`] = Ch09Sec60;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:61`] = Ch09Sec61;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:62`] = Ch09Sec62;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:63`] = Ch09Sec63;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:64`] = Ch09Sec64;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:65`] = Ch09Sec65;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:66`] = Ch09Sec66;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:67`] = Ch09Sec67;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:68`] = Ch09Sec68;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:69`] = Ch09Sec69;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:70`] = Ch09Sec70;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:71`] = Ch09Sec71;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:72`] = Ch09Sec72;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:73`] = Ch09Sec73;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:74`] = Ch09Sec74;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:75`] = Ch09Sec75;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:76`] = Ch09Sec76;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:77`] = Ch09Sec77;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:78`] = Ch09Sec78;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:79`] = Ch09Sec79;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:80`] = Ch09Sec80;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:81`] = Ch09Sec81;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:82`] = Ch09Sec82;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:83`] = Ch09Sec83;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:84`] = Ch09Sec84;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:85`] = Ch09Sec85;
REGISTRY[`33795397-f8fe-5ef6-ba2d-64549905ecd3:86`] = Ch09Sec86;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:1`] = Ch10Sec1;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:2`] = Ch10Sec2;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:3`] = Ch10Sec3;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:4`] = Ch10Sec4;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:5`] = Ch10Sec5;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:6`] = Ch10Sec6;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:7`] = Ch10Sec7;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:8`] = Ch10Sec8;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:9`] = Ch10Sec9;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:10`] = Ch10Sec10;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:11`] = Ch10Sec11;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:12`] = Ch10Sec12;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:13`] = Ch10Sec13;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:14`] = Ch10Sec14;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:15`] = Ch10Sec15;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:16`] = Ch10Sec16;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:17`] = Ch10Sec17;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:18`] = Ch10Sec18;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:19`] = Ch10Sec19;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:20`] = Ch10Sec20;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:21`] = Ch10Sec21;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:22`] = Ch10Sec22;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:23`] = Ch10Sec23;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:24`] = Ch10Sec24;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:25`] = Ch10Sec25;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:26`] = Ch10Sec26;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:27`] = Ch10Sec27;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:28`] = Ch10Sec28;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:29`] = Ch10Sec29;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:30`] = Ch10Sec30;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:31`] = Ch10Sec31;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:32`] = Ch10Sec32;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:33`] = Ch10Sec33;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:34`] = Ch10Sec34;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:35`] = Ch10Sec35;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:36`] = Ch10Sec36;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:37`] = Ch10Sec37;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:38`] = Ch10Sec38;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:39`] = Ch10Sec39;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:40`] = Ch10Sec40;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:41`] = Ch10Sec41;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:42`] = Ch10Sec42;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:43`] = Ch10Sec43;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:44`] = Ch10Sec44;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:45`] = Ch10Sec45;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:46`] = Ch10Sec46;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:47`] = Ch10Sec47;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:48`] = Ch10Sec48;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:49`] = Ch10Sec49;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:50`] = Ch10Sec50;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:51`] = Ch10Sec51;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:52`] = Ch10Sec52;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:53`] = Ch10Sec53;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:54`] = Ch10Sec54;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:55`] = Ch10Sec55;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:56`] = Ch10Sec56;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:57`] = Ch10Sec57;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:58`] = Ch10Sec58;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:59`] = Ch10Sec59;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:60`] = Ch10Sec60;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:61`] = Ch10Sec61;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:62`] = Ch10Sec62;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:63`] = Ch10Sec63;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:64`] = Ch10Sec64;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:65`] = Ch10Sec65;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:66`] = Ch10Sec66;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:67`] = Ch10Sec67;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:68`] = Ch10Sec68;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:69`] = Ch10Sec69;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:70`] = Ch10Sec70;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:71`] = Ch10Sec71;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:72`] = Ch10Sec72;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:73`] = Ch10Sec73;
REGISTRY[`087ea53b-681c-51a2-92ef-5ea77f6bdf8b:74`] = Ch10Sec74;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:1`] = Ch11Sec1;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:2`] = Ch11Sec2;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:3`] = Ch11Sec3;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:4`] = Ch11Sec4;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:5`] = Ch11Sec5;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:6`] = Ch11Sec6;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:7`] = Ch11Sec7;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:8`] = Ch11Sec8;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:9`] = Ch11Sec9;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:10`] = Ch11Sec10;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:11`] = Ch11Sec11;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:12`] = Ch11Sec12;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:13`] = Ch11Sec13;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:14`] = Ch11Sec14;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:15`] = Ch11Sec15;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:16`] = Ch11Sec16;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:17`] = Ch11Sec17;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:18`] = Ch11Sec18;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:19`] = Ch11Sec19;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:20`] = Ch11Sec20;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:21`] = Ch11Sec21;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:22`] = Ch11Sec22;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:23`] = Ch11Sec23;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:24`] = Ch11Sec24;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:25`] = Ch11Sec25;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:26`] = Ch11Sec26;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:27`] = Ch11Sec27;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:28`] = Ch11Sec28;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:29`] = Ch11Sec29;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:30`] = Ch11Sec30;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:31`] = Ch11Sec31;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:32`] = Ch11Sec32;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:33`] = Ch11Sec33;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:34`] = Ch11Sec34;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:35`] = Ch11Sec35;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:36`] = Ch11Sec36;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:37`] = Ch11Sec37;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:38`] = Ch11Sec38;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:39`] = Ch11Sec39;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:40`] = Ch11Sec40;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:41`] = Ch11Sec41;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:42`] = Ch11Sec42;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:43`] = Ch11Sec43;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:44`] = Ch11Sec44;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:45`] = Ch11Sec45;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:46`] = Ch11Sec46;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:47`] = Ch11Sec47;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:48`] = Ch11Sec48;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:49`] = Ch11Sec49;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:50`] = Ch11Sec50;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:51`] = Ch11Sec51;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:52`] = Ch11Sec52;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:53`] = Ch11Sec53;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:54`] = Ch11Sec54;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:55`] = Ch11Sec55;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:56`] = Ch11Sec56;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:57`] = Ch11Sec57;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:58`] = Ch11Sec58;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:59`] = Ch11Sec59;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:60`] = Ch11Sec60;
REGISTRY[`58c19132-676f-5dfb-b84e-e3a34b34a48e:61`] = Ch11Sec61;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:1`] = Ch12Sec1;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:2`] = Ch12Sec2;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:3`] = Ch12Sec3;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:4`] = Ch12Sec4;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:5`] = Ch12Sec5;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:6`] = Ch12Sec6;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:7`] = Ch12Sec7;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:8`] = Ch12Sec8;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:9`] = Ch12Sec9;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:10`] = Ch12Sec10;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:11`] = Ch12Sec11;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:12`] = Ch12Sec12;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:13`] = Ch12Sec13;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:14`] = Ch12Sec14;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:15`] = Ch12Sec15;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:16`] = Ch12Sec16;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:17`] = Ch12Sec17;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:18`] = Ch12Sec18;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:19`] = Ch12Sec19;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:20`] = Ch12Sec20;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:21`] = Ch12Sec21;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:22`] = Ch12Sec22;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:23`] = Ch12Sec23;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:24`] = Ch12Sec24;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:25`] = Ch12Sec25;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:26`] = Ch12Sec26;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:27`] = Ch12Sec27;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:28`] = Ch12Sec28;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:29`] = Ch12Sec29;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:30`] = Ch12Sec30;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:31`] = Ch12Sec31;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:32`] = Ch12Sec32;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:33`] = Ch12Sec33;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:34`] = Ch12Sec34;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:35`] = Ch12Sec35;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:36`] = Ch12Sec36;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:37`] = Ch12Sec37;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:38`] = Ch12Sec38;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:39`] = Ch12Sec39;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:40`] = Ch12Sec40;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:41`] = Ch12Sec41;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:42`] = Ch12Sec42;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:43`] = Ch12Sec43;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:44`] = Ch12Sec44;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:45`] = Ch12Sec45;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:46`] = Ch12Sec46;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:47`] = Ch12Sec47;
REGISTRY[`8300dbf9-d9f7-505b-82c6-ad8d236eaff1:48`] = Ch12Sec48;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:1`] = Ch13Sec1;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:2`] = Ch13Sec2;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:3`] = Ch13Sec3;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:4`] = Ch13Sec4;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:5`] = Ch13Sec5;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:6`] = Ch13Sec6;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:7`] = Ch13Sec7;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:8`] = Ch13Sec8;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:9`] = Ch13Sec9;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:10`] = Ch13Sec10;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:11`] = Ch13Sec11;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:12`] = Ch13Sec12;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:13`] = Ch13Sec13;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:14`] = Ch13Sec14;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:15`] = Ch13Sec15;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:16`] = Ch13Sec16;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:17`] = Ch13Sec17;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:18`] = Ch13Sec18;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:19`] = Ch13Sec19;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:20`] = Ch13Sec20;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:21`] = Ch13Sec21;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:22`] = Ch13Sec22;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:23`] = Ch13Sec23;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:24`] = Ch13Sec24;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:25`] = Ch13Sec25;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:26`] = Ch13Sec26;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:27`] = Ch13Sec27;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:28`] = Ch13Sec28;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:29`] = Ch13Sec29;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:30`] = Ch13Sec30;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:31`] = Ch13Sec31;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:32`] = Ch13Sec32;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:33`] = Ch13Sec33;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:34`] = Ch13Sec34;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:35`] = Ch13Sec35;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:36`] = Ch13Sec36;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:37`] = Ch13Sec37;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:38`] = Ch13Sec38;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:39`] = Ch13Sec39;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:40`] = Ch13Sec40;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:41`] = Ch13Sec41;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:42`] = Ch13Sec42;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:43`] = Ch13Sec43;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:44`] = Ch13Sec44;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:45`] = Ch13Sec45;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:46`] = Ch13Sec46;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:47`] = Ch13Sec47;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:48`] = Ch13Sec48;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:49`] = Ch13Sec49;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:50`] = Ch13Sec50;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:51`] = Ch13Sec51;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:52`] = Ch13Sec52;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:53`] = Ch13Sec53;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:54`] = Ch13Sec54;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:55`] = Ch13Sec55;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:56`] = Ch13Sec56;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:57`] = Ch13Sec57;
REGISTRY[`c1bc937e-5ff5-5ecb-a67b-89053c386c23:58`] = Ch13Sec58;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:1`] = Ch14Sec1;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:2`] = Ch14Sec2;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:3`] = Ch14Sec3;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:4`] = Ch14Sec4;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:5`] = Ch14Sec5;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:6`] = Ch14Sec6;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:7`] = Ch14Sec7;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:8`] = Ch14Sec8;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:9`] = Ch14Sec9;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:10`] = Ch14Sec10;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:11`] = Ch14Sec11;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:12`] = Ch14Sec12;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:13`] = Ch14Sec13;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:14`] = Ch14Sec14;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:15`] = Ch14Sec15;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:16`] = Ch14Sec16;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:17`] = Ch14Sec17;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:18`] = Ch14Sec18;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:19`] = Ch14Sec19;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:20`] = Ch14Sec20;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:21`] = Ch14Sec21;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:22`] = Ch14Sec22;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:23`] = Ch14Sec23;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:24`] = Ch14Sec24;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:25`] = Ch14Sec25;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:26`] = Ch14Sec26;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:27`] = Ch14Sec27;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:28`] = Ch14Sec28;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:29`] = Ch14Sec29;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:30`] = Ch14Sec30;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:31`] = Ch14Sec31;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:32`] = Ch14Sec32;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:33`] = Ch14Sec33;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:34`] = Ch14Sec34;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:35`] = Ch14Sec35;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:36`] = Ch14Sec36;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:37`] = Ch14Sec37;
REGISTRY[`7dca7b5a-e77c-530d-bbe8-01a3518dc5d0:38`] = Ch14Sec38;

/* ================================================================== */
/* C11 Ch01 (Chemistry) — Some Basic Concepts of Chemistry             */
/* (branch premium-board-chem1). Registered via Object.assign-style    */
/* block so this stays self-contained at the end of the file.          */
/* ================================================================== */
import C11Ch01Sec1 from "./C11Ch01Sec1";
import C11Ch01Sec2 from "./C11Ch01Sec2";
import C11Ch01Sec3 from "./C11Ch01Sec3";
import C11Ch01Sec4 from "./C11Ch01Sec4";
import C11Ch01Sec5 from "./C11Ch01Sec5";
import C11Ch01Sec6 from "./C11Ch01Sec6";
import C11Ch01Sec7 from "./C11Ch01Sec7";
import C11Ch01Sec8 from "./C11Ch01Sec8";
import C11Ch01Sec9 from "./C11Ch01Sec9";
import C11Ch01Sec10 from "./C11Ch01Sec10";
import C11Ch01Sec11 from "./C11Ch01Sec11";
import C11Ch01Sec12 from "./C11Ch01Sec12";
import C11Ch01Sec13 from "./C11Ch01Sec13";
import C11Ch01Sec14 from "./C11Ch01Sec14";
import C11Ch01Sec15 from "./C11Ch01Sec15";
import C11Ch01Sec16 from "./C11Ch01Sec16";
import C11Ch01Sec17 from "./C11Ch01Sec17";
import C11Ch01Sec18 from "./C11Ch01Sec18";
import C11Ch01Sec19 from "./C11Ch01Sec19";
import C11Ch01Sec20 from "./C11Ch01Sec20";
import C11Ch01Sec21 from "./C11Ch01Sec21";
import C11Ch01Sec22 from "./C11Ch01Sec22";
import C11Ch01Sec23 from "./C11Ch01Sec23";
import C11Ch01Sec24 from "./C11Ch01Sec24";
import C11Ch01Sec25 from "./C11Ch01Sec25";
import C11Ch01Sec26 from "./C11Ch01Sec26";
import C11Ch01Sec27 from "./C11Ch01Sec27";
import C11Ch01Sec28 from "./C11Ch01Sec28";
import C11Ch01Sec29 from "./C11Ch01Sec29";
import C11Ch01Sec30 from "./C11Ch01Sec30";
import C11Ch01Sec31 from "./C11Ch01Sec31";
import C11Ch01Sec32 from "./C11Ch01Sec32";
import C11Ch01Sec33 from "./C11Ch01Sec33";
import C11Ch01Sec34 from "./C11Ch01Sec34";
import C11Ch01Sec35 from "./C11Ch01Sec35";
import C11Ch01Sec36 from "./C11Ch01Sec36";
import C11Ch01Sec37 from "./C11Ch01Sec37";
import C11Ch01Sec38 from "./C11Ch01Sec38";
import C11Ch01Sec39 from "./C11Ch01Sec39";
import C11Ch01Sec40 from "./C11Ch01Sec40";
import C11Ch01Sec41 from "./C11Ch01Sec41";
import C11Ch01Sec42 from "./C11Ch01Sec42";
import C11Ch01Sec43 from "./C11Ch01Sec43";
import C11Ch01Sec44 from "./C11Ch01Sec44";
import C11Ch01Sec45 from "./C11Ch01Sec45";
import C11Ch01Sec46 from "./C11Ch01Sec46";
import C11Ch01Sec47 from "./C11Ch01Sec47";
import C11Ch01Sec48 from "./C11Ch01Sec48";
import C11Ch01Sec49 from "./C11Ch01Sec49";
import C11Ch01Sec50 from "./C11Ch01Sec50";
import C11Ch01Sec51 from "./C11Ch01Sec51";
import C11Ch01Sec52 from "./C11Ch01Sec52";
import C11Ch01Sec53 from "./C11Ch01Sec53";
import C11Ch01Sec54 from "./C11Ch01Sec54";
import C11Ch01Sec55 from "./C11Ch01Sec55";
import C11Ch01Sec56 from "./C11Ch01Sec56";
import C11Ch01Sec57 from "./C11Ch01Sec57";
import C11Ch01Sec58 from "./C11Ch01Sec58";
import C11Ch01Sec59 from "./C11Ch01Sec59";

const C11CH01 = "fa37da68-46a0-562f-9c75-2967215b8893"; // Class 11 Chemistry · Some Basic Concepts of Chemistry

REGISTRY[`${C11CH01}:1`] = C11Ch01Sec1;
REGISTRY[`${C11CH01}:2`] = C11Ch01Sec2;
REGISTRY[`${C11CH01}:3`] = C11Ch01Sec3;
REGISTRY[`${C11CH01}:4`] = C11Ch01Sec4;
REGISTRY[`${C11CH01}:5`] = C11Ch01Sec5;
REGISTRY[`${C11CH01}:6`] = C11Ch01Sec6;
REGISTRY[`${C11CH01}:7`] = C11Ch01Sec7;
REGISTRY[`${C11CH01}:8`] = C11Ch01Sec8;
REGISTRY[`${C11CH01}:9`] = C11Ch01Sec9;
REGISTRY[`${C11CH01}:10`] = C11Ch01Sec10;
REGISTRY[`${C11CH01}:11`] = C11Ch01Sec11;
REGISTRY[`${C11CH01}:12`] = C11Ch01Sec12;
REGISTRY[`${C11CH01}:13`] = C11Ch01Sec13;
REGISTRY[`${C11CH01}:14`] = C11Ch01Sec14;
REGISTRY[`${C11CH01}:15`] = C11Ch01Sec15;
REGISTRY[`${C11CH01}:16`] = C11Ch01Sec16;
REGISTRY[`${C11CH01}:17`] = C11Ch01Sec17;
REGISTRY[`${C11CH01}:18`] = C11Ch01Sec18;
REGISTRY[`${C11CH01}:19`] = C11Ch01Sec19;
REGISTRY[`${C11CH01}:20`] = C11Ch01Sec20;
REGISTRY[`${C11CH01}:21`] = C11Ch01Sec21;
REGISTRY[`${C11CH01}:22`] = C11Ch01Sec22;
REGISTRY[`${C11CH01}:23`] = C11Ch01Sec23;
REGISTRY[`${C11CH01}:24`] = C11Ch01Sec24;
REGISTRY[`${C11CH01}:25`] = C11Ch01Sec25;
REGISTRY[`${C11CH01}:26`] = C11Ch01Sec26;
REGISTRY[`${C11CH01}:27`] = C11Ch01Sec27;
REGISTRY[`${C11CH01}:28`] = C11Ch01Sec28;
REGISTRY[`${C11CH01}:29`] = C11Ch01Sec29;
REGISTRY[`${C11CH01}:30`] = C11Ch01Sec30;
REGISTRY[`${C11CH01}:31`] = C11Ch01Sec31;
REGISTRY[`${C11CH01}:32`] = C11Ch01Sec32;
REGISTRY[`${C11CH01}:33`] = C11Ch01Sec33;
REGISTRY[`${C11CH01}:34`] = C11Ch01Sec34;
REGISTRY[`${C11CH01}:35`] = C11Ch01Sec35;
REGISTRY[`${C11CH01}:36`] = C11Ch01Sec36;
REGISTRY[`${C11CH01}:37`] = C11Ch01Sec37;
REGISTRY[`${C11CH01}:38`] = C11Ch01Sec38;
REGISTRY[`${C11CH01}:39`] = C11Ch01Sec39;
REGISTRY[`${C11CH01}:40`] = C11Ch01Sec40;
REGISTRY[`${C11CH01}:41`] = C11Ch01Sec41;
REGISTRY[`${C11CH01}:42`] = C11Ch01Sec42;
REGISTRY[`${C11CH01}:43`] = C11Ch01Sec43;
REGISTRY[`${C11CH01}:44`] = C11Ch01Sec44;
REGISTRY[`${C11CH01}:45`] = C11Ch01Sec45;
REGISTRY[`${C11CH01}:46`] = C11Ch01Sec46;
REGISTRY[`${C11CH01}:47`] = C11Ch01Sec47;
REGISTRY[`${C11CH01}:48`] = C11Ch01Sec48;
REGISTRY[`${C11CH01}:49`] = C11Ch01Sec49;
REGISTRY[`${C11CH01}:50`] = C11Ch01Sec50;
REGISTRY[`${C11CH01}:51`] = C11Ch01Sec51;
REGISTRY[`${C11CH01}:52`] = C11Ch01Sec52;
REGISTRY[`${C11CH01}:53`] = C11Ch01Sec53;
REGISTRY[`${C11CH01}:54`] = C11Ch01Sec54;
REGISTRY[`${C11CH01}:55`] = C11Ch01Sec55;
REGISTRY[`${C11CH01}:56`] = C11Ch01Sec56;
REGISTRY[`${C11CH01}:57`] = C11Ch01Sec57;
REGISTRY[`${C11CH01}:58`] = C11Ch01Sec58;
REGISTRY[`${C11CH01}:59`] = C11Ch01Sec59;
/* C11 Ch02 (Chemistry) — Structure of Atom                            */
/* (branch premium-board-chem2). Registered via Object.assign-style    */
/* block so this stays self-contained at the end of the file.          */
/* ================================================================== */
import C11Ch02Sec1 from "./C11Ch02Sec1";
import C11Ch02Sec2 from "./C11Ch02Sec2";
import C11Ch02Sec3 from "./C11Ch02Sec3";
import C11Ch02Sec4 from "./C11Ch02Sec4";
import C11Ch02Sec5 from "./C11Ch02Sec5";
import C11Ch02Sec6 from "./C11Ch02Sec6";
import C11Ch02Sec7 from "./C11Ch02Sec7";
import C11Ch02Sec8 from "./C11Ch02Sec8";
import C11Ch02Sec9 from "./C11Ch02Sec9";
import C11Ch02Sec10 from "./C11Ch02Sec10";
import C11Ch02Sec11 from "./C11Ch02Sec11";
import C11Ch02Sec12 from "./C11Ch02Sec12";
import C11Ch02Sec13 from "./C11Ch02Sec13";
import C11Ch02Sec14 from "./C11Ch02Sec14";
import C11Ch02Sec15 from "./C11Ch02Sec15";
import C11Ch02Sec16 from "./C11Ch02Sec16";
import C11Ch02Sec17 from "./C11Ch02Sec17";
import C11Ch02Sec18 from "./C11Ch02Sec18";
import C11Ch02Sec19 from "./C11Ch02Sec19";
import C11Ch02Sec20 from "./C11Ch02Sec20";
import C11Ch02Sec21 from "./C11Ch02Sec21";
import C11Ch02Sec22 from "./C11Ch02Sec22";
import C11Ch02Sec23 from "./C11Ch02Sec23";
import C11Ch02Sec24 from "./C11Ch02Sec24";
import C11Ch02Sec25 from "./C11Ch02Sec25";
import C11Ch02Sec26 from "./C11Ch02Sec26";
import C11Ch02Sec27 from "./C11Ch02Sec27";
import C11Ch02Sec28 from "./C11Ch02Sec28";
import C11Ch02Sec29 from "./C11Ch02Sec29";
import C11Ch02Sec30 from "./C11Ch02Sec30";
import C11Ch02Sec31 from "./C11Ch02Sec31";
import C11Ch02Sec32 from "./C11Ch02Sec32";
import C11Ch02Sec33 from "./C11Ch02Sec33";
import C11Ch02Sec34 from "./C11Ch02Sec34";
import C11Ch02Sec35 from "./C11Ch02Sec35";
import C11Ch02Sec36 from "./C11Ch02Sec36";
import C11Ch02Sec37 from "./C11Ch02Sec37";
import C11Ch02Sec38 from "./C11Ch02Sec38";
import C11Ch02Sec39 from "./C11Ch02Sec39";
import C11Ch02Sec40 from "./C11Ch02Sec40";
import C11Ch02Sec41 from "./C11Ch02Sec41";
import C11Ch02Sec42 from "./C11Ch02Sec42";
import C11Ch02Sec43 from "./C11Ch02Sec43";
import C11Ch02Sec44 from "./C11Ch02Sec44";
import C11Ch02Sec45 from "./C11Ch02Sec45";
import C11Ch02Sec46 from "./C11Ch02Sec46";
import C11Ch02Sec47 from "./C11Ch02Sec47";
import C11Ch02Sec48 from "./C11Ch02Sec48";
import C11Ch02Sec49 from "./C11Ch02Sec49";
import C11Ch02Sec50 from "./C11Ch02Sec50";
import C11Ch02Sec51 from "./C11Ch02Sec51";
import C11Ch02Sec52 from "./C11Ch02Sec52";
import C11Ch02Sec53 from "./C11Ch02Sec53";
import C11Ch02Sec54 from "./C11Ch02Sec54";
import C11Ch02Sec55 from "./C11Ch02Sec55";
import C11Ch02Sec56 from "./C11Ch02Sec56";
import C11Ch02Sec57 from "./C11Ch02Sec57";

const C11CH02 = "16bf043d-bc59-5ebb-93ad-7b0fddf484c9"; // Class 11 Chemistry · Structure of Atom

REGISTRY[`${C11CH02}:1`] = C11Ch02Sec1;
REGISTRY[`${C11CH02}:2`] = C11Ch02Sec2;
REGISTRY[`${C11CH02}:3`] = C11Ch02Sec3;
REGISTRY[`${C11CH02}:4`] = C11Ch02Sec4;
REGISTRY[`${C11CH02}:5`] = C11Ch02Sec5;
REGISTRY[`${C11CH02}:6`] = C11Ch02Sec6;
REGISTRY[`${C11CH02}:7`] = C11Ch02Sec7;
REGISTRY[`${C11CH02}:8`] = C11Ch02Sec8;
REGISTRY[`${C11CH02}:9`] = C11Ch02Sec9;
REGISTRY[`${C11CH02}:10`] = C11Ch02Sec10;
REGISTRY[`${C11CH02}:11`] = C11Ch02Sec11;
REGISTRY[`${C11CH02}:12`] = C11Ch02Sec12;
REGISTRY[`${C11CH02}:13`] = C11Ch02Sec13;
REGISTRY[`${C11CH02}:14`] = C11Ch02Sec14;
REGISTRY[`${C11CH02}:15`] = C11Ch02Sec15;
REGISTRY[`${C11CH02}:16`] = C11Ch02Sec16;
REGISTRY[`${C11CH02}:17`] = C11Ch02Sec17;
REGISTRY[`${C11CH02}:18`] = C11Ch02Sec18;
REGISTRY[`${C11CH02}:19`] = C11Ch02Sec19;
REGISTRY[`${C11CH02}:20`] = C11Ch02Sec20;
REGISTRY[`${C11CH02}:21`] = C11Ch02Sec21;
REGISTRY[`${C11CH02}:22`] = C11Ch02Sec22;
REGISTRY[`${C11CH02}:23`] = C11Ch02Sec23;
REGISTRY[`${C11CH02}:24`] = C11Ch02Sec24;
REGISTRY[`${C11CH02}:25`] = C11Ch02Sec25;
REGISTRY[`${C11CH02}:26`] = C11Ch02Sec26;
REGISTRY[`${C11CH02}:27`] = C11Ch02Sec27;
REGISTRY[`${C11CH02}:28`] = C11Ch02Sec28;
REGISTRY[`${C11CH02}:29`] = C11Ch02Sec29;
REGISTRY[`${C11CH02}:30`] = C11Ch02Sec30;
REGISTRY[`${C11CH02}:31`] = C11Ch02Sec31;
REGISTRY[`${C11CH02}:32`] = C11Ch02Sec32;
REGISTRY[`${C11CH02}:33`] = C11Ch02Sec33;
REGISTRY[`${C11CH02}:34`] = C11Ch02Sec34;
REGISTRY[`${C11CH02}:35`] = C11Ch02Sec35;
REGISTRY[`${C11CH02}:36`] = C11Ch02Sec36;
REGISTRY[`${C11CH02}:37`] = C11Ch02Sec37;
REGISTRY[`${C11CH02}:38`] = C11Ch02Sec38;
REGISTRY[`${C11CH02}:39`] = C11Ch02Sec39;
REGISTRY[`${C11CH02}:40`] = C11Ch02Sec40;
REGISTRY[`${C11CH02}:41`] = C11Ch02Sec41;
REGISTRY[`${C11CH02}:42`] = C11Ch02Sec42;
REGISTRY[`${C11CH02}:43`] = C11Ch02Sec43;
REGISTRY[`${C11CH02}:44`] = C11Ch02Sec44;
REGISTRY[`${C11CH02}:45`] = C11Ch02Sec45;
REGISTRY[`${C11CH02}:46`] = C11Ch02Sec46;
REGISTRY[`${C11CH02}:47`] = C11Ch02Sec47;
REGISTRY[`${C11CH02}:48`] = C11Ch02Sec48;
REGISTRY[`${C11CH02}:49`] = C11Ch02Sec49;
REGISTRY[`${C11CH02}:50`] = C11Ch02Sec50;
REGISTRY[`${C11CH02}:51`] = C11Ch02Sec51;
REGISTRY[`${C11CH02}:52`] = C11Ch02Sec52;
REGISTRY[`${C11CH02}:53`] = C11Ch02Sec53;
REGISTRY[`${C11CH02}:54`] = C11Ch02Sec54;
REGISTRY[`${C11CH02}:55`] = C11Ch02Sec55;
REGISTRY[`${C11CH02}:56`] = C11Ch02Sec56;
REGISTRY[`${C11CH02}:57`] = C11Ch02Sec57;
// ---- Class 11 Chemistry · Chapter 3 "Classification of Elements" ----
import C11Ch03Sec1 from "./C11Ch03Sec1";
import C11Ch03Sec2 from "./C11Ch03Sec2";
import C11Ch03Sec3 from "./C11Ch03Sec3";
import C11Ch03Sec4 from "./C11Ch03Sec4";
import C11Ch03Sec5 from "./C11Ch03Sec5";
import C11Ch03Sec6 from "./C11Ch03Sec6";
import C11Ch03Sec7 from "./C11Ch03Sec7";
import C11Ch03Sec8 from "./C11Ch03Sec8";
import C11Ch03Sec9 from "./C11Ch03Sec9";
import C11Ch03Sec10 from "./C11Ch03Sec10";
import C11Ch03Sec11 from "./C11Ch03Sec11";
import C11Ch03Sec12 from "./C11Ch03Sec12";
import C11Ch03Sec13 from "./C11Ch03Sec13";
import C11Ch03Sec14 from "./C11Ch03Sec14";
import C11Ch03Sec15 from "./C11Ch03Sec15";
import C11Ch03Sec16 from "./C11Ch03Sec16";
import C11Ch03Sec17 from "./C11Ch03Sec17";
import C11Ch03Sec18 from "./C11Ch03Sec18";
import C11Ch03Sec19 from "./C11Ch03Sec19";
import C11Ch03Sec20 from "./C11Ch03Sec20";
import C11Ch03Sec21 from "./C11Ch03Sec21";
import C11Ch03Sec22 from "./C11Ch03Sec22";
import C11Ch03Sec23 from "./C11Ch03Sec23";
import C11Ch03Sec24 from "./C11Ch03Sec24";
import C11Ch03Sec25 from "./C11Ch03Sec25";
import C11Ch03Sec26 from "./C11Ch03Sec26";
import C11Ch03Sec27 from "./C11Ch03Sec27";
import C11Ch03Sec28 from "./C11Ch03Sec28";
import C11Ch03Sec29 from "./C11Ch03Sec29";
import C11Ch03Sec30 from "./C11Ch03Sec30";
import C11Ch03Sec31 from "./C11Ch03Sec31";
import C11Ch03Sec32 from "./C11Ch03Sec32";
import C11Ch03Sec33 from "./C11Ch03Sec33";
import C11Ch03Sec34 from "./C11Ch03Sec34";
import C11Ch03Sec35 from "./C11Ch03Sec35";
import C11Ch03Sec36 from "./C11Ch03Sec36";
import C11Ch03Sec37 from "./C11Ch03Sec37";
import C11Ch03Sec38 from "./C11Ch03Sec38";
import C11Ch03Sec39 from "./C11Ch03Sec39";
import C11Ch03Sec40 from "./C11Ch03Sec40";
import C11Ch03Sec41 from "./C11Ch03Sec41";
import C11Ch03Sec42 from "./C11Ch03Sec42";
import C11Ch03Sec43 from "./C11Ch03Sec43";
import C11Ch03Sec44 from "./C11Ch03Sec44";
import C11Ch03Sec45 from "./C11Ch03Sec45";
import C11Ch03Sec46 from "./C11Ch03Sec46";
import C11Ch03Sec47 from "./C11Ch03Sec47";
import C11Ch03Sec48 from "./C11Ch03Sec48";
import C11Ch03Sec49 from "./C11Ch03Sec49";
import C11Ch03Sec50 from "./C11Ch03Sec50";
import C11Ch03Sec51 from "./C11Ch03Sec51";
import C11Ch03Sec52 from "./C11Ch03Sec52";
import C11Ch03Sec53 from "./C11Ch03Sec53";
import C11Ch03Sec54 from "./C11Ch03Sec54";

const C11CH03 = "aac04619-0e94-5a09-99bb-abdc2b688290";
REGISTRY[`${C11CH03}:1`] = C11Ch03Sec1;
REGISTRY[`${C11CH03}:2`] = C11Ch03Sec2;
REGISTRY[`${C11CH03}:3`] = C11Ch03Sec3;
REGISTRY[`${C11CH03}:4`] = C11Ch03Sec4;
REGISTRY[`${C11CH03}:5`] = C11Ch03Sec5;
REGISTRY[`${C11CH03}:6`] = C11Ch03Sec6;
REGISTRY[`${C11CH03}:7`] = C11Ch03Sec7;
REGISTRY[`${C11CH03}:8`] = C11Ch03Sec8;
REGISTRY[`${C11CH03}:9`] = C11Ch03Sec9;
REGISTRY[`${C11CH03}:10`] = C11Ch03Sec10;
REGISTRY[`${C11CH03}:11`] = C11Ch03Sec11;
REGISTRY[`${C11CH03}:12`] = C11Ch03Sec12;
REGISTRY[`${C11CH03}:13`] = C11Ch03Sec13;
REGISTRY[`${C11CH03}:14`] = C11Ch03Sec14;
REGISTRY[`${C11CH03}:15`] = C11Ch03Sec15;
REGISTRY[`${C11CH03}:16`] = C11Ch03Sec16;
REGISTRY[`${C11CH03}:17`] = C11Ch03Sec17;
REGISTRY[`${C11CH03}:18`] = C11Ch03Sec18;
REGISTRY[`${C11CH03}:19`] = C11Ch03Sec19;
REGISTRY[`${C11CH03}:20`] = C11Ch03Sec20;
REGISTRY[`${C11CH03}:21`] = C11Ch03Sec21;
REGISTRY[`${C11CH03}:22`] = C11Ch03Sec22;
REGISTRY[`${C11CH03}:23`] = C11Ch03Sec23;
REGISTRY[`${C11CH03}:24`] = C11Ch03Sec24;
REGISTRY[`${C11CH03}:25`] = C11Ch03Sec25;
REGISTRY[`${C11CH03}:26`] = C11Ch03Sec26;
REGISTRY[`${C11CH03}:27`] = C11Ch03Sec27;
REGISTRY[`${C11CH03}:28`] = C11Ch03Sec28;
REGISTRY[`${C11CH03}:29`] = C11Ch03Sec29;
REGISTRY[`${C11CH03}:30`] = C11Ch03Sec30;
REGISTRY[`${C11CH03}:31`] = C11Ch03Sec31;
REGISTRY[`${C11CH03}:32`] = C11Ch03Sec32;
REGISTRY[`${C11CH03}:33`] = C11Ch03Sec33;
REGISTRY[`${C11CH03}:34`] = C11Ch03Sec34;
REGISTRY[`${C11CH03}:35`] = C11Ch03Sec35;
REGISTRY[`${C11CH03}:36`] = C11Ch03Sec36;
REGISTRY[`${C11CH03}:37`] = C11Ch03Sec37;
REGISTRY[`${C11CH03}:38`] = C11Ch03Sec38;
REGISTRY[`${C11CH03}:39`] = C11Ch03Sec39;
REGISTRY[`${C11CH03}:40`] = C11Ch03Sec40;
REGISTRY[`${C11CH03}:41`] = C11Ch03Sec41;
REGISTRY[`${C11CH03}:42`] = C11Ch03Sec42;
REGISTRY[`${C11CH03}:43`] = C11Ch03Sec43;
REGISTRY[`${C11CH03}:44`] = C11Ch03Sec44;
REGISTRY[`${C11CH03}:45`] = C11Ch03Sec45;
REGISTRY[`${C11CH03}:46`] = C11Ch03Sec46;
REGISTRY[`${C11CH03}:47`] = C11Ch03Sec47;
REGISTRY[`${C11CH03}:48`] = C11Ch03Sec48;
REGISTRY[`${C11CH03}:49`] = C11Ch03Sec49;
REGISTRY[`${C11CH03}:50`] = C11Ch03Sec50;
REGISTRY[`${C11CH03}:51`] = C11Ch03Sec51;
REGISTRY[`${C11CH03}:52`] = C11Ch03Sec52;
REGISTRY[`${C11CH03}:53`] = C11Ch03Sec53;
REGISTRY[`${C11CH03}:54`] = C11Ch03Sec54;
import C11Ch04Sec1 from "./C11Ch04Sec1";
import C11Ch04Sec2 from "./C11Ch04Sec2";
import C11Ch04Sec3 from "./C11Ch04Sec3";
import C11Ch04Sec4 from "./C11Ch04Sec4";
import C11Ch04Sec5 from "./C11Ch04Sec5";
import C11Ch04Sec6 from "./C11Ch04Sec6";
import C11Ch04Sec7 from "./C11Ch04Sec7";
import C11Ch04Sec8 from "./C11Ch04Sec8";
import C11Ch04Sec9 from "./C11Ch04Sec9";
import C11Ch04Sec10 from "./C11Ch04Sec10";
import C11Ch04Sec11 from "./C11Ch04Sec11";
import C11Ch04Sec12 from "./C11Ch04Sec12";
import C11Ch04Sec13 from "./C11Ch04Sec13";
import C11Ch04Sec14 from "./C11Ch04Sec14";
import C11Ch04Sec15 from "./C11Ch04Sec15";
import C11Ch04Sec16 from "./C11Ch04Sec16";
import C11Ch04Sec17 from "./C11Ch04Sec17";
import C11Ch04Sec18 from "./C11Ch04Sec18";
import C11Ch04Sec19 from "./C11Ch04Sec19";
import C11Ch04Sec20 from "./C11Ch04Sec20";
import C11Ch04Sec21 from "./C11Ch04Sec21";
import C11Ch04Sec22 from "./C11Ch04Sec22";
import C11Ch04Sec23 from "./C11Ch04Sec23";
import C11Ch04Sec24 from "./C11Ch04Sec24";
import C11Ch04Sec25 from "./C11Ch04Sec25";
import C11Ch04Sec26 from "./C11Ch04Sec26";
import C11Ch04Sec27 from "./C11Ch04Sec27";
import C11Ch04Sec28 from "./C11Ch04Sec28";
import C11Ch04Sec29 from "./C11Ch04Sec29";
import C11Ch04Sec30 from "./C11Ch04Sec30";
import C11Ch04Sec31 from "./C11Ch04Sec31";
import C11Ch04Sec32 from "./C11Ch04Sec32";
import C11Ch04Sec33 from "./C11Ch04Sec33";
import C11Ch04Sec34 from "./C11Ch04Sec34";
import C11Ch04Sec35 from "./C11Ch04Sec35";
import C11Ch04Sec36 from "./C11Ch04Sec36";
import C11Ch04Sec37 from "./C11Ch04Sec37";
import C11Ch04Sec38 from "./C11Ch04Sec38";

const C11CH04 = "862ab5f0-4fa8-5e6f-98d5-74fe5b10ab8e";
REGISTRY[`${C11CH04}:1`] = C11Ch04Sec1;
REGISTRY[`${C11CH04}:2`] = C11Ch04Sec2;
REGISTRY[`${C11CH04}:3`] = C11Ch04Sec3;
REGISTRY[`${C11CH04}:4`] = C11Ch04Sec4;
REGISTRY[`${C11CH04}:5`] = C11Ch04Sec5;
REGISTRY[`${C11CH04}:6`] = C11Ch04Sec6;
REGISTRY[`${C11CH04}:7`] = C11Ch04Sec7;
REGISTRY[`${C11CH04}:8`] = C11Ch04Sec8;
REGISTRY[`${C11CH04}:9`] = C11Ch04Sec9;
REGISTRY[`${C11CH04}:10`] = C11Ch04Sec10;
REGISTRY[`${C11CH04}:11`] = C11Ch04Sec11;
REGISTRY[`${C11CH04}:12`] = C11Ch04Sec12;
REGISTRY[`${C11CH04}:13`] = C11Ch04Sec13;
REGISTRY[`${C11CH04}:14`] = C11Ch04Sec14;
REGISTRY[`${C11CH04}:15`] = C11Ch04Sec15;
REGISTRY[`${C11CH04}:16`] = C11Ch04Sec16;
REGISTRY[`${C11CH04}:17`] = C11Ch04Sec17;
REGISTRY[`${C11CH04}:18`] = C11Ch04Sec18;
REGISTRY[`${C11CH04}:19`] = C11Ch04Sec19;
REGISTRY[`${C11CH04}:20`] = C11Ch04Sec20;
REGISTRY[`${C11CH04}:21`] = C11Ch04Sec21;
REGISTRY[`${C11CH04}:22`] = C11Ch04Sec22;
REGISTRY[`${C11CH04}:23`] = C11Ch04Sec23;
REGISTRY[`${C11CH04}:24`] = C11Ch04Sec24;
REGISTRY[`${C11CH04}:25`] = C11Ch04Sec25;
REGISTRY[`${C11CH04}:26`] = C11Ch04Sec26;
REGISTRY[`${C11CH04}:27`] = C11Ch04Sec27;
REGISTRY[`${C11CH04}:28`] = C11Ch04Sec28;
REGISTRY[`${C11CH04}:29`] = C11Ch04Sec29;
REGISTRY[`${C11CH04}:30`] = C11Ch04Sec30;
REGISTRY[`${C11CH04}:31`] = C11Ch04Sec31;
REGISTRY[`${C11CH04}:32`] = C11Ch04Sec32;
REGISTRY[`${C11CH04}:33`] = C11Ch04Sec33;
REGISTRY[`${C11CH04}:34`] = C11Ch04Sec34;
REGISTRY[`${C11CH04}:35`] = C11Ch04Sec35;
REGISTRY[`${C11CH04}:36`] = C11Ch04Sec36;
REGISTRY[`${C11CH04}:37`] = C11Ch04Sec37;
REGISTRY[`${C11CH04}:38`] = C11Ch04Sec38;
// ── C11 Ch06 · Equilibrium ──
const C11CH06 = "f111ba16-c07d-5237-b2dd-eab22645f161";
REGISTRY[`${C11CH06}:1`] = C11Ch06Sec1;
REGISTRY[`${C11CH06}:2`] = C11Ch06Sec2;
REGISTRY[`${C11CH06}:3`] = C11Ch06Sec3;
REGISTRY[`${C11CH06}:4`] = C11Ch06Sec4;
REGISTRY[`${C11CH06}:5`] = C11Ch06Sec5;
REGISTRY[`${C11CH06}:6`] = C11Ch06Sec6;
REGISTRY[`${C11CH06}:7`] = C11Ch06Sec7;
REGISTRY[`${C11CH06}:8`] = C11Ch06Sec8;
REGISTRY[`${C11CH06}:9`] = C11Ch06Sec9;
REGISTRY[`${C11CH06}:10`] = C11Ch06Sec10;
REGISTRY[`${C11CH06}:11`] = C11Ch06Sec11;
REGISTRY[`${C11CH06}:12`] = C11Ch06Sec12;
REGISTRY[`${C11CH06}:13`] = C11Ch06Sec13;
REGISTRY[`${C11CH06}:14`] = C11Ch06Sec14;
REGISTRY[`${C11CH06}:15`] = C11Ch06Sec15;
REGISTRY[`${C11CH06}:16`] = C11Ch06Sec16;
REGISTRY[`${C11CH06}:17`] = C11Ch06Sec17;
REGISTRY[`${C11CH06}:18`] = C11Ch06Sec18;
REGISTRY[`${C11CH06}:19`] = C11Ch06Sec19;
REGISTRY[`${C11CH06}:20`] = C11Ch06Sec20;
REGISTRY[`${C11CH06}:21`] = C11Ch06Sec21;
REGISTRY[`${C11CH06}:22`] = C11Ch06Sec22;
REGISTRY[`${C11CH06}:23`] = C11Ch06Sec23;
REGISTRY[`${C11CH06}:24`] = C11Ch06Sec24;
REGISTRY[`${C11CH06}:25`] = C11Ch06Sec25;
REGISTRY[`${C11CH06}:26`] = C11Ch06Sec26;
REGISTRY[`${C11CH06}:27`] = C11Ch06Sec27;
REGISTRY[`${C11CH06}:28`] = C11Ch06Sec28;
REGISTRY[`${C11CH06}:29`] = C11Ch06Sec29;
REGISTRY[`${C11CH06}:30`] = C11Ch06Sec30;
REGISTRY[`${C11CH06}:31`] = C11Ch06Sec31;
REGISTRY[`${C11CH06}:32`] = C11Ch06Sec32;
REGISTRY[`${C11CH06}:33`] = C11Ch06Sec33;
REGISTRY[`${C11CH06}:34`] = C11Ch06Sec34;
REGISTRY[`${C11CH06}:35`] = C11Ch06Sec35;
REGISTRY[`${C11CH06}:36`] = C11Ch06Sec36;
REGISTRY[`${C11CH06}:37`] = C11Ch06Sec37;
REGISTRY[`${C11CH06}:38`] = C11Ch06Sec38;
REGISTRY[`${C11CH06}:39`] = C11Ch06Sec39;
REGISTRY[`${C11CH06}:40`] = C11Ch06Sec40;
REGISTRY[`${C11CH06}:41`] = C11Ch06Sec41;
REGISTRY[`${C11CH06}:42`] = C11Ch06Sec42;
REGISTRY[`${C11CH06}:43`] = C11Ch06Sec43;
REGISTRY[`${C11CH06}:44`] = C11Ch06Sec44;
REGISTRY[`${C11CH06}:45`] = C11Ch06Sec45;
REGISTRY[`${C11CH06}:46`] = C11Ch06Sec46;
REGISTRY[`${C11CH06}:47`] = C11Ch06Sec47;
REGISTRY[`${C11CH06}:48`] = C11Ch06Sec48;
REGISTRY[`${C11CH06}:49`] = C11Ch06Sec49;
REGISTRY[`${C11CH06}:50`] = C11Ch06Sec50;
REGISTRY[`${C11CH06}:51`] = C11Ch06Sec51;
REGISTRY[`${C11CH06}:52`] = C11Ch06Sec52;
REGISTRY[`${C11CH06}:53`] = C11Ch06Sec53;
REGISTRY[`${C11CH06}:54`] = C11Ch06Sec54;
REGISTRY[`${C11CH06}:55`] = C11Ch06Sec55;
REGISTRY[`${C11CH06}:56`] = C11Ch06Sec56;
REGISTRY[`${C11CH06}:57`] = C11Ch06Sec57;
REGISTRY[`${C11CH06}:58`] = C11Ch06Sec58;
REGISTRY[`${C11CH06}:59`] = C11Ch06Sec59;
REGISTRY[`${C11CH06}:60`] = C11Ch06Sec60;
REGISTRY[`${C11CH06}:61`] = C11Ch06Sec61;
REGISTRY[`${C11CH06}:62`] = C11Ch06Sec62;
REGISTRY[`${C11CH06}:63`] = C11Ch06Sec63;
REGISTRY[`${C11CH06}:64`] = C11Ch06Sec64;
REGISTRY[`${C11CH06}:65`] = C11Ch06Sec65;
REGISTRY[`${C11CH06}:66`] = C11Ch06Sec66;
REGISTRY[`${C11CH06}:67`] = C11Ch06Sec67;
REGISTRY[`${C11CH06}:68`] = C11Ch06Sec68;
REGISTRY[`${C11CH06}:69`] = C11Ch06Sec69;
REGISTRY[`${C11CH06}:70`] = C11Ch06Sec70;
REGISTRY[`${C11CH06}:71`] = C11Ch06Sec71;
REGISTRY[`${C11CH06}:72`] = C11Ch06Sec72;
// ── C11Ch07 "Redox Reactions" (Class 11 Chemistry) ──
import C11Ch07Sec1 from "./C11Ch07Sec1";
import C11Ch07Sec2 from "./C11Ch07Sec2";
import C11Ch07Sec3 from "./C11Ch07Sec3";
import C11Ch07Sec4 from "./C11Ch07Sec4";
import C11Ch07Sec5 from "./C11Ch07Sec5";
import C11Ch07Sec6 from "./C11Ch07Sec6";
import C11Ch07Sec7 from "./C11Ch07Sec7";
import C11Ch07Sec8 from "./C11Ch07Sec8";
import C11Ch07Sec9 from "./C11Ch07Sec9";
import C11Ch07Sec10 from "./C11Ch07Sec10";
import C11Ch07Sec11 from "./C11Ch07Sec11";
import C11Ch07Sec12 from "./C11Ch07Sec12";
import C11Ch07Sec13 from "./C11Ch07Sec13";
import C11Ch07Sec14 from "./C11Ch07Sec14";
import C11Ch07Sec15 from "./C11Ch07Sec15";
import C11Ch07Sec16 from "./C11Ch07Sec16";
import C11Ch07Sec17 from "./C11Ch07Sec17";
import C11Ch07Sec18 from "./C11Ch07Sec18";
import C11Ch07Sec19 from "./C11Ch07Sec19";
import C11Ch07Sec20 from "./C11Ch07Sec20";
import C11Ch07Sec21 from "./C11Ch07Sec21";
import C11Ch07Sec22 from "./C11Ch07Sec22";
import C11Ch07Sec23 from "./C11Ch07Sec23";
import C11Ch07Sec24 from "./C11Ch07Sec24";
import C11Ch07Sec25 from "./C11Ch07Sec25";
import C11Ch07Sec26 from "./C11Ch07Sec26";
import C11Ch07Sec27 from "./C11Ch07Sec27";
import C11Ch07Sec28 from "./C11Ch07Sec28";
import C11Ch07Sec29 from "./C11Ch07Sec29";
import C11Ch07Sec30 from "./C11Ch07Sec30";
import C11Ch07Sec31 from "./C11Ch07Sec31";
import C11Ch07Sec32 from "./C11Ch07Sec32";
import C11Ch07Sec33 from "./C11Ch07Sec33";
import C11Ch07Sec34 from "./C11Ch07Sec34";
import C11Ch07Sec35 from "./C11Ch07Sec35";
import C11Ch07Sec36 from "./C11Ch07Sec36";
import C11Ch07Sec37 from "./C11Ch07Sec37";
import C11Ch07Sec38 from "./C11Ch07Sec38";
import C11Ch07Sec39 from "./C11Ch07Sec39";
import C11Ch07Sec40 from "./C11Ch07Sec40";
import C11Ch07Sec41 from "./C11Ch07Sec41";
import C11Ch07Sec42 from "./C11Ch07Sec42";
import C11Ch07Sec43 from "./C11Ch07Sec43";
import C11Ch07Sec44 from "./C11Ch07Sec44";

const C11CH07 = "c6da3467-e267-576e-9999-a2687ffe9200"; // Class 11 · Redox Reactions (Chemistry)

REGISTRY[`${C11CH07}:1`] = C11Ch07Sec1;
REGISTRY[`${C11CH07}:2`] = C11Ch07Sec2;
REGISTRY[`${C11CH07}:3`] = C11Ch07Sec3;
REGISTRY[`${C11CH07}:4`] = C11Ch07Sec4;
REGISTRY[`${C11CH07}:5`] = C11Ch07Sec5;
REGISTRY[`${C11CH07}:6`] = C11Ch07Sec6;
REGISTRY[`${C11CH07}:7`] = C11Ch07Sec7;
REGISTRY[`${C11CH07}:8`] = C11Ch07Sec8;
REGISTRY[`${C11CH07}:9`] = C11Ch07Sec9;
REGISTRY[`${C11CH07}:10`] = C11Ch07Sec10;
REGISTRY[`${C11CH07}:11`] = C11Ch07Sec11;
REGISTRY[`${C11CH07}:12`] = C11Ch07Sec12;
REGISTRY[`${C11CH07}:13`] = C11Ch07Sec13;
REGISTRY[`${C11CH07}:14`] = C11Ch07Sec14;
REGISTRY[`${C11CH07}:15`] = C11Ch07Sec15;
REGISTRY[`${C11CH07}:16`] = C11Ch07Sec16;
REGISTRY[`${C11CH07}:17`] = C11Ch07Sec17;
REGISTRY[`${C11CH07}:18`] = C11Ch07Sec18;
REGISTRY[`${C11CH07}:19`] = C11Ch07Sec19;
REGISTRY[`${C11CH07}:20`] = C11Ch07Sec20;
REGISTRY[`${C11CH07}:21`] = C11Ch07Sec21;
REGISTRY[`${C11CH07}:22`] = C11Ch07Sec22;
REGISTRY[`${C11CH07}:23`] = C11Ch07Sec23;
REGISTRY[`${C11CH07}:24`] = C11Ch07Sec24;
REGISTRY[`${C11CH07}:25`] = C11Ch07Sec25;
REGISTRY[`${C11CH07}:26`] = C11Ch07Sec26;
REGISTRY[`${C11CH07}:27`] = C11Ch07Sec27;
REGISTRY[`${C11CH07}:28`] = C11Ch07Sec28;
REGISTRY[`${C11CH07}:29`] = C11Ch07Sec29;
REGISTRY[`${C11CH07}:30`] = C11Ch07Sec30;
REGISTRY[`${C11CH07}:31`] = C11Ch07Sec31;
REGISTRY[`${C11CH07}:32`] = C11Ch07Sec32;
REGISTRY[`${C11CH07}:33`] = C11Ch07Sec33;
REGISTRY[`${C11CH07}:34`] = C11Ch07Sec34;
REGISTRY[`${C11CH07}:35`] = C11Ch07Sec35;
REGISTRY[`${C11CH07}:36`] = C11Ch07Sec36;
REGISTRY[`${C11CH07}:37`] = C11Ch07Sec37;
REGISTRY[`${C11CH07}:38`] = C11Ch07Sec38;
REGISTRY[`${C11CH07}:39`] = C11Ch07Sec39;
REGISTRY[`${C11CH07}:40`] = C11Ch07Sec40;
REGISTRY[`${C11CH07}:41`] = C11Ch07Sec41;
REGISTRY[`${C11CH07}:42`] = C11Ch07Sec42;
REGISTRY[`${C11CH07}:43`] = C11Ch07Sec43;
REGISTRY[`${C11CH07}:44`] = C11Ch07Sec44;
/* ---- C11 Ch08 · Organic Chemistry — Basic Principles & Techniques ---- */
import C11Ch08Sec1 from "./C11Ch08Sec1";
import C11Ch08Sec2 from "./C11Ch08Sec2";
import C11Ch08Sec3 from "./C11Ch08Sec3";
import C11Ch08Sec4 from "./C11Ch08Sec4";
import C11Ch08Sec5 from "./C11Ch08Sec5";
import C11Ch08Sec6 from "./C11Ch08Sec6";
import C11Ch08Sec7 from "./C11Ch08Sec7";
import C11Ch08Sec8 from "./C11Ch08Sec8";
import C11Ch08Sec9 from "./C11Ch08Sec9";
import C11Ch08Sec10 from "./C11Ch08Sec10";
import C11Ch08Sec11 from "./C11Ch08Sec11";
import C11Ch08Sec12 from "./C11Ch08Sec12";
import C11Ch08Sec13 from "./C11Ch08Sec13";
import C11Ch08Sec14 from "./C11Ch08Sec14";
import C11Ch08Sec15 from "./C11Ch08Sec15";
import C11Ch08Sec16 from "./C11Ch08Sec16";
import C11Ch08Sec17 from "./C11Ch08Sec17";
import C11Ch08Sec18 from "./C11Ch08Sec18";
import C11Ch08Sec19 from "./C11Ch08Sec19";
import C11Ch08Sec20 from "./C11Ch08Sec20";
import C11Ch08Sec21 from "./C11Ch08Sec21";
import C11Ch08Sec22 from "./C11Ch08Sec22";
import C11Ch08Sec23 from "./C11Ch08Sec23";
import C11Ch08Sec24 from "./C11Ch08Sec24";
import C11Ch08Sec25 from "./C11Ch08Sec25";
import C11Ch08Sec26 from "./C11Ch08Sec26";
import C11Ch08Sec27 from "./C11Ch08Sec27";
import C11Ch08Sec28 from "./C11Ch08Sec28";
import C11Ch08Sec29 from "./C11Ch08Sec29";
import C11Ch08Sec30 from "./C11Ch08Sec30";
import C11Ch08Sec31 from "./C11Ch08Sec31";
import C11Ch08Sec32 from "./C11Ch08Sec32";
import C11Ch08Sec33 from "./C11Ch08Sec33";
import C11Ch08Sec34 from "./C11Ch08Sec34";
import C11Ch08Sec35 from "./C11Ch08Sec35";
import C11Ch08Sec36 from "./C11Ch08Sec36";
import C11Ch08Sec37 from "./C11Ch08Sec37";
import C11Ch08Sec38 from "./C11Ch08Sec38";
import C11Ch08Sec39 from "./C11Ch08Sec39";
import C11Ch08Sec40 from "./C11Ch08Sec40";
import C11Ch08Sec41 from "./C11Ch08Sec41";
import C11Ch08Sec42 from "./C11Ch08Sec42";
import C11Ch08Sec43 from "./C11Ch08Sec43";
import C11Ch08Sec44 from "./C11Ch08Sec44";
import C11Ch08Sec45 from "./C11Ch08Sec45";
import C11Ch08Sec46 from "./C11Ch08Sec46";
import C11Ch08Sec47 from "./C11Ch08Sec47";
import C11Ch08Sec48 from "./C11Ch08Sec48";
import C11Ch08Sec49 from "./C11Ch08Sec49";
import C11Ch08Sec50 from "./C11Ch08Sec50";
import C11Ch08Sec51 from "./C11Ch08Sec51";
import C11Ch08Sec52 from "./C11Ch08Sec52";

const C11CH08 = "15bf6c7a-ff09-5741-93b8-e48e8a915273";
REGISTRY[`${C11CH08}:1`] = C11Ch08Sec1;
REGISTRY[`${C11CH08}:2`] = C11Ch08Sec2;
REGISTRY[`${C11CH08}:3`] = C11Ch08Sec3;
REGISTRY[`${C11CH08}:4`] = C11Ch08Sec4;
REGISTRY[`${C11CH08}:5`] = C11Ch08Sec5;
REGISTRY[`${C11CH08}:6`] = C11Ch08Sec6;
REGISTRY[`${C11CH08}:7`] = C11Ch08Sec7;
REGISTRY[`${C11CH08}:8`] = C11Ch08Sec8;
REGISTRY[`${C11CH08}:9`] = C11Ch08Sec9;
REGISTRY[`${C11CH08}:10`] = C11Ch08Sec10;
REGISTRY[`${C11CH08}:11`] = C11Ch08Sec11;
REGISTRY[`${C11CH08}:12`] = C11Ch08Sec12;
REGISTRY[`${C11CH08}:13`] = C11Ch08Sec13;
REGISTRY[`${C11CH08}:14`] = C11Ch08Sec14;
REGISTRY[`${C11CH08}:15`] = C11Ch08Sec15;
REGISTRY[`${C11CH08}:16`] = C11Ch08Sec16;
REGISTRY[`${C11CH08}:17`] = C11Ch08Sec17;
REGISTRY[`${C11CH08}:18`] = C11Ch08Sec18;
REGISTRY[`${C11CH08}:19`] = C11Ch08Sec19;
REGISTRY[`${C11CH08}:20`] = C11Ch08Sec20;
REGISTRY[`${C11CH08}:21`] = C11Ch08Sec21;
REGISTRY[`${C11CH08}:22`] = C11Ch08Sec22;
REGISTRY[`${C11CH08}:23`] = C11Ch08Sec23;
REGISTRY[`${C11CH08}:24`] = C11Ch08Sec24;
REGISTRY[`${C11CH08}:25`] = C11Ch08Sec25;
REGISTRY[`${C11CH08}:26`] = C11Ch08Sec26;
REGISTRY[`${C11CH08}:27`] = C11Ch08Sec27;
REGISTRY[`${C11CH08}:28`] = C11Ch08Sec28;
REGISTRY[`${C11CH08}:29`] = C11Ch08Sec29;
REGISTRY[`${C11CH08}:30`] = C11Ch08Sec30;
REGISTRY[`${C11CH08}:31`] = C11Ch08Sec31;
REGISTRY[`${C11CH08}:32`] = C11Ch08Sec32;
REGISTRY[`${C11CH08}:33`] = C11Ch08Sec33;
REGISTRY[`${C11CH08}:34`] = C11Ch08Sec34;
REGISTRY[`${C11CH08}:35`] = C11Ch08Sec35;
REGISTRY[`${C11CH08}:36`] = C11Ch08Sec36;
REGISTRY[`${C11CH08}:37`] = C11Ch08Sec37;
REGISTRY[`${C11CH08}:38`] = C11Ch08Sec38;
REGISTRY[`${C11CH08}:39`] = C11Ch08Sec39;
REGISTRY[`${C11CH08}:40`] = C11Ch08Sec40;
REGISTRY[`${C11CH08}:41`] = C11Ch08Sec41;
REGISTRY[`${C11CH08}:42`] = C11Ch08Sec42;
REGISTRY[`${C11CH08}:43`] = C11Ch08Sec43;
REGISTRY[`${C11CH08}:44`] = C11Ch08Sec44;
REGISTRY[`${C11CH08}:45`] = C11Ch08Sec45;
REGISTRY[`${C11CH08}:46`] = C11Ch08Sec46;
REGISTRY[`${C11CH08}:47`] = C11Ch08Sec47;
REGISTRY[`${C11CH08}:48`] = C11Ch08Sec48;
REGISTRY[`${C11CH08}:49`] = C11Ch08Sec49;
REGISTRY[`${C11CH08}:50`] = C11Ch08Sec50;
REGISTRY[`${C11CH08}:51`] = C11Ch08Sec51;
REGISTRY[`${C11CH08}:52`] = C11Ch08Sec52;

// ---- Class 11 Math · Chapter 5 "Linear Inequalities" ----
import M11Ch05Sec1 from "./M11Ch05Sec1";
import M11Ch05Sec2 from "./M11Ch05Sec2";
import M11Ch05Sec3 from "./M11Ch05Sec3";
import M11Ch05Sec4 from "./M11Ch05Sec4";
import M11Ch05Sec5 from "./M11Ch05Sec5";
import M11Ch05Sec6 from "./M11Ch05Sec6";
import M11Ch05Sec7 from "./M11Ch05Sec7";
import M11Ch05Sec8 from "./M11Ch05Sec8";
import M11Ch05Sec9 from "./M11Ch05Sec9";
import M11Ch05Sec10 from "./M11Ch05Sec10";
import M11Ch05Sec11 from "./M11Ch05Sec11";
import M11Ch05Sec12 from "./M11Ch05Sec12";
import M11Ch05Sec13 from "./M11Ch05Sec13";
import M11Ch05Sec14 from "./M11Ch05Sec14";
import M11Ch05Sec15 from "./M11Ch05Sec15";
import M11Ch05Sec16 from "./M11Ch05Sec16";
import M11Ch05Sec17 from "./M11Ch05Sec17";
import M11Ch05Sec18 from "./M11Ch05Sec18";
import M11Ch05Sec19 from "./M11Ch05Sec19";
import M11Ch05Sec20 from "./M11Ch05Sec20";
import M11Ch05Sec21 from "./M11Ch05Sec21";
import M11Ch05Sec22 from "./M11Ch05Sec22";
import M11Ch05Sec23 from "./M11Ch05Sec23";
import M11Ch05Sec24 from "./M11Ch05Sec24";
import M11Ch05Sec25 from "./M11Ch05Sec25";
import M11Ch05Sec26 from "./M11Ch05Sec26";
import M11Ch05Sec27 from "./M11Ch05Sec27";
import M11Ch05Sec28 from "./M11Ch05Sec28";
import M11Ch05Sec29 from "./M11Ch05Sec29";
import M11Ch05Sec30 from "./M11Ch05Sec30";
import M11Ch05Sec31 from "./M11Ch05Sec31";
import M11Ch05Sec32 from "./M11Ch05Sec32";
import M11Ch05Sec33 from "./M11Ch05Sec33";
import M11Ch05Sec34 from "./M11Ch05Sec34";
import M11Ch05Sec35 from "./M11Ch05Sec35";
import M11Ch05Sec36 from "./M11Ch05Sec36";
import M11Ch05Sec37 from "./M11Ch05Sec37";
import M11Ch05Sec38 from "./M11Ch05Sec38";
import M11Ch05Sec39 from "./M11Ch05Sec39";
import M11Ch05Sec40 from "./M11Ch05Sec40";
import M11Ch05Sec41 from "./M11Ch05Sec41";
import M11Ch05Sec42 from "./M11Ch05Sec42";
import M11Ch05Sec43 from "./M11Ch05Sec43";

const M11CH05 = "7bc767a8-c36f-5f5c-93f5-fb8337ffd7f5";
REGISTRY[`${M11CH05}:1`] = M11Ch05Sec1;
REGISTRY[`${M11CH05}:2`] = M11Ch05Sec2;
REGISTRY[`${M11CH05}:3`] = M11Ch05Sec3;
REGISTRY[`${M11CH05}:4`] = M11Ch05Sec4;
REGISTRY[`${M11CH05}:5`] = M11Ch05Sec5;
REGISTRY[`${M11CH05}:6`] = M11Ch05Sec6;
REGISTRY[`${M11CH05}:7`] = M11Ch05Sec7;
REGISTRY[`${M11CH05}:8`] = M11Ch05Sec8;
REGISTRY[`${M11CH05}:9`] = M11Ch05Sec9;
REGISTRY[`${M11CH05}:10`] = M11Ch05Sec10;
REGISTRY[`${M11CH05}:11`] = M11Ch05Sec11;
REGISTRY[`${M11CH05}:12`] = M11Ch05Sec12;
REGISTRY[`${M11CH05}:13`] = M11Ch05Sec13;
REGISTRY[`${M11CH05}:14`] = M11Ch05Sec14;
REGISTRY[`${M11CH05}:15`] = M11Ch05Sec15;
REGISTRY[`${M11CH05}:16`] = M11Ch05Sec16;
REGISTRY[`${M11CH05}:17`] = M11Ch05Sec17;
REGISTRY[`${M11CH05}:18`] = M11Ch05Sec18;
REGISTRY[`${M11CH05}:19`] = M11Ch05Sec19;
REGISTRY[`${M11CH05}:20`] = M11Ch05Sec20;
REGISTRY[`${M11CH05}:21`] = M11Ch05Sec21;
REGISTRY[`${M11CH05}:22`] = M11Ch05Sec22;
REGISTRY[`${M11CH05}:23`] = M11Ch05Sec23;
REGISTRY[`${M11CH05}:24`] = M11Ch05Sec24;
REGISTRY[`${M11CH05}:25`] = M11Ch05Sec25;
REGISTRY[`${M11CH05}:26`] = M11Ch05Sec26;
REGISTRY[`${M11CH05}:27`] = M11Ch05Sec27;
REGISTRY[`${M11CH05}:28`] = M11Ch05Sec28;
REGISTRY[`${M11CH05}:29`] = M11Ch05Sec29;
REGISTRY[`${M11CH05}:30`] = M11Ch05Sec30;
REGISTRY[`${M11CH05}:31`] = M11Ch05Sec31;
REGISTRY[`${M11CH05}:32`] = M11Ch05Sec32;
REGISTRY[`${M11CH05}:33`] = M11Ch05Sec33;
REGISTRY[`${M11CH05}:34`] = M11Ch05Sec34;
REGISTRY[`${M11CH05}:35`] = M11Ch05Sec35;
REGISTRY[`${M11CH05}:36`] = M11Ch05Sec36;
REGISTRY[`${M11CH05}:37`] = M11Ch05Sec37;
REGISTRY[`${M11CH05}:38`] = M11Ch05Sec38;
REGISTRY[`${M11CH05}:39`] = M11Ch05Sec39;
REGISTRY[`${M11CH05}:40`] = M11Ch05Sec40;
REGISTRY[`${M11CH05}:41`] = M11Ch05Sec41;
REGISTRY[`${M11CH05}:42`] = M11Ch05Sec42;
REGISTRY[`${M11CH05}:43`] = M11Ch05Sec43;
