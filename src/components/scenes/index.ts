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

const CH01 = "8d7ccfaa-af16-53e4-9f28-823c8ea923d1"; // Class 11 · Units & Measurements
const CH02 = "563ae2b1-3427-537a-afde-f7fbc193731f"; // Class 11 · Motion in a Straight Line

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
};

export function getScene(
  chapterId: string | undefined,
  position: number | null | undefined
): React.ComponentType<SceneProps> | null {
  if (!chapterId || position == null) return null;
  return REGISTRY[`${chapterId}:${position}`] ?? null;
}

export type { SceneProps };
