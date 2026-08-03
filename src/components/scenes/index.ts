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
// REGISTRY[`${P12CH04}:25`] = P12Ch04Sec25;
// REGISTRY[`${P12CH04}:26`] = P12Ch04Sec26;
// REGISTRY[`${P12CH04}:27`] = P12Ch04Sec27;
// REGISTRY[`${P12CH04}:28`] = P12Ch04Sec28;
// REGISTRY[`${P12CH04}:29`] = P12Ch04Sec29;
// REGISTRY[`${P12CH04}:30`] = P12Ch04Sec30;
// REGISTRY[`${P12CH04}:31`] = P12Ch04Sec31;
// REGISTRY[`${P12CH04}:32`] = P12Ch04Sec32;
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

const CH10 = "087ea53b-681c-51a2-92ef-5ea77f6bdf8b"; // Class 11 · Thermal Properties of Matter

REGISTRY[`${CH10}:1`] = Ch10Sec1;
REGISTRY[`${CH10}:2`] = Ch10Sec2;
REGISTRY[`${CH10}:3`] = Ch10Sec3;
REGISTRY[`${CH10}:4`] = Ch10Sec4;
REGISTRY[`${CH10}:5`] = Ch10Sec5;
REGISTRY[`${CH10}:6`] = Ch10Sec6;
REGISTRY[`${CH10}:7`] = Ch10Sec7;
REGISTRY[`${CH10}:8`] = Ch10Sec8;
REGISTRY[`${CH10}:9`] = Ch10Sec9;
REGISTRY[`${CH10}:10`] = Ch10Sec10;
REGISTRY[`${CH10}:11`] = Ch10Sec11;
REGISTRY[`${CH10}:12`] = Ch10Sec12;
REGISTRY[`${CH10}:13`] = Ch10Sec13;
REGISTRY[`${CH10}:14`] = Ch10Sec14;
REGISTRY[`${CH10}:15`] = Ch10Sec15;
REGISTRY[`${CH10}:16`] = Ch10Sec16;
REGISTRY[`${CH10}:17`] = Ch10Sec17;
REGISTRY[`${CH10}:18`] = Ch10Sec18;
REGISTRY[`${CH10}:19`] = Ch10Sec19;
REGISTRY[`${CH10}:20`] = Ch10Sec20;
REGISTRY[`${CH10}:21`] = Ch10Sec21;
REGISTRY[`${CH10}:22`] = Ch10Sec22;
REGISTRY[`${CH10}:23`] = Ch10Sec23;
REGISTRY[`${CH10}:24`] = Ch10Sec24;
REGISTRY[`${CH10}:25`] = Ch10Sec25;
REGISTRY[`${CH10}:26`] = Ch10Sec26;
REGISTRY[`${CH10}:27`] = Ch10Sec27;
REGISTRY[`${CH10}:28`] = Ch10Sec28;
REGISTRY[`${CH10}:29`] = Ch10Sec29;
REGISTRY[`${CH10}:30`] = Ch10Sec30;
REGISTRY[`${CH10}:31`] = Ch10Sec31;
REGISTRY[`${CH10}:32`] = Ch10Sec32;
REGISTRY[`${CH10}:33`] = Ch10Sec33;
REGISTRY[`${CH10}:34`] = Ch10Sec34;
REGISTRY[`${CH10}:35`] = Ch10Sec35;
REGISTRY[`${CH10}:36`] = Ch10Sec36;
REGISTRY[`${CH10}:37`] = Ch10Sec37;
REGISTRY[`${CH10}:38`] = Ch10Sec38;
REGISTRY[`${CH10}:39`] = Ch10Sec39;
REGISTRY[`${CH10}:40`] = Ch10Sec40;
REGISTRY[`${CH10}:41`] = Ch10Sec41;
REGISTRY[`${CH10}:42`] = Ch10Sec42;
REGISTRY[`${CH10}:43`] = Ch10Sec43;
REGISTRY[`${CH10}:44`] = Ch10Sec44;
REGISTRY[`${CH10}:45`] = Ch10Sec45;
REGISTRY[`${CH10}:46`] = Ch10Sec46;
REGISTRY[`${CH10}:47`] = Ch10Sec47;
REGISTRY[`${CH10}:48`] = Ch10Sec48;
REGISTRY[`${CH10}:49`] = Ch10Sec49;
REGISTRY[`${CH10}:50`] = Ch10Sec50;
REGISTRY[`${CH10}:51`] = Ch10Sec51;
REGISTRY[`${CH10}:52`] = Ch10Sec52;
REGISTRY[`${CH10}:53`] = Ch10Sec53;
REGISTRY[`${CH10}:54`] = Ch10Sec54;
REGISTRY[`${CH10}:55`] = Ch10Sec55;
/* ============================ end Ch10 ============================ */
