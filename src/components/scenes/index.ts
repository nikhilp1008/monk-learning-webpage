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

/* ================================================================== */
/* Ch14 · Waves — scene block (branch premium-board-ch14)             */
/* ================================================================== */
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

const CH14 = "7dca7b5a-e77c-530d-bbe8-01a3518dc5d0"; // Class 11 · Waves

REGISTRY[`${CH14}:1`] = Ch14Sec1;
REGISTRY[`${CH14}:2`] = Ch14Sec2;
REGISTRY[`${CH14}:3`] = Ch14Sec3;
REGISTRY[`${CH14}:4`] = Ch14Sec4;
REGISTRY[`${CH14}:5`] = Ch14Sec5;
REGISTRY[`${CH14}:6`] = Ch14Sec6;
REGISTRY[`${CH14}:7`] = Ch14Sec7;
REGISTRY[`${CH14}:8`] = Ch14Sec8;
REGISTRY[`${CH14}:9`] = Ch14Sec9;
REGISTRY[`${CH14}:10`] = Ch14Sec10;
REGISTRY[`${CH14}:11`] = Ch14Sec11;
REGISTRY[`${CH14}:12`] = Ch14Sec12;
REGISTRY[`${CH14}:13`] = Ch14Sec13;
REGISTRY[`${CH14}:14`] = Ch14Sec14;
REGISTRY[`${CH14}:15`] = Ch14Sec15;
REGISTRY[`${CH14}:16`] = Ch14Sec16;
REGISTRY[`${CH14}:17`] = Ch14Sec17;
REGISTRY[`${CH14}:18`] = Ch14Sec18;
REGISTRY[`${CH14}:19`] = Ch14Sec19;
REGISTRY[`${CH14}:20`] = Ch14Sec20;
REGISTRY[`${CH14}:21`] = Ch14Sec21;
REGISTRY[`${CH14}:22`] = Ch14Sec22;
REGISTRY[`${CH14}:23`] = Ch14Sec23;
REGISTRY[`${CH14}:24`] = Ch14Sec24;
REGISTRY[`${CH14}:25`] = Ch14Sec25;
REGISTRY[`${CH14}:26`] = Ch14Sec26;
REGISTRY[`${CH14}:27`] = Ch14Sec27;
REGISTRY[`${CH14}:28`] = Ch14Sec28;
REGISTRY[`${CH14}:29`] = Ch14Sec29;
REGISTRY[`${CH14}:30`] = Ch14Sec30;
REGISTRY[`${CH14}:31`] = Ch14Sec31;
REGISTRY[`${CH14}:32`] = Ch14Sec32;
REGISTRY[`${CH14}:33`] = Ch14Sec33;
REGISTRY[`${CH14}:34`] = Ch14Sec34;
REGISTRY[`${CH14}:35`] = Ch14Sec35;
REGISTRY[`${CH14}:36`] = Ch14Sec36;
REGISTRY[`${CH14}:37`] = Ch14Sec37;
/* ============================ end Ch14 ============================ */
