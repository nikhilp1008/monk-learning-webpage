import { apiFetch } from "@/lib/api";

/**
 * Practice focus: the chapter filter behind "Weak areas first" and the
 * single-chapter picker. Ported from monk-learning-mobile lib/weak-focus.ts.
 *
 * "Weak" is Progress's own currency: headroom = exam weightage x (100 -
 * mastery), computed server-side per chapter (GET /progress). Weak mode
 * samples across that list in proportion to headroom, so high-value weak
 * chapters dominate without the session locking onto one. Strong chapters are
 * excluded outright, never merely down-weighted: "Weak areas first" must not
 * serve a chapter the Progress page calls Strong.
 */

export type FocusMode = "mixed" | "weak" | "chapter";

export interface PracticeFocus {
  mode: FocusMode;
  chapterId: string | null;
  chapterName: string | null;
}

export const DEFAULT_FOCUS: PracticeFocus = { mode: "mixed", chapterId: null, chapterName: null };

export interface FocusChapter {
  chapter_id: string;
  name: string;
  class_level: number;
  subject: string;
  state: "strong" | "improving" | "needs_revision" | "not_started";
  headroom: number;
  curated: boolean;
}

interface ProgressSlice {
  subjects: { subject: string; chapters: FocusChapter[] }[];
}

let cache: FocusChapter[] | null = null;
let inFlight: Promise<FocusChapter[]> | null = null;

/** One request at a time: the payload is large and every caller that finds
 *  an empty cache would otherwise fire its own. */
export function loadFocusChapters(): Promise<FocusChapter[]> {
  if (cache) return Promise.resolve(cache);
  inFlight ??= apiFetch<ProgressSlice>("/progress")
    .then((data) => {
      cache = data.subjects.flatMap((s) => s.chapters);
      return cache;
    })
    .finally(() => {
      inFlight = null;
    });
  return inFlight;
}

export function getCachedFocusChapters(): FocusChapter[] | null {
  return cache;
}

/**
 * Pick a chapter for the next weak-mode question, or null for "no filter".
 *
 * Null is a real answer: with no progress yet, no mastery at all, or every
 * chapter strong, an unfiltered question IS the right question. `exclude`
 * lets a retry skip a chapter whose pool just came back empty. `classLevel`
 * is "11" | "12" | "both".
 */
export function sampleWeakChapterId(
  chapters: FocusChapter[] | null,
  classLevel: string,
  exclude: string[] = []
): string | null {
  if (!chapters) return null;
  const candidates = chapters.filter(
    (ch) =>
      ch.curated &&
      ch.state !== "strong" &&
      ch.headroom > 0 &&
      !exclude.includes(ch.chapter_id) &&
      (classLevel === "both" || String(ch.class_level) === classLevel)
  );
  if (candidates.length === 0) return null;
  let ticket = Math.random() * candidates.reduce((sum, ch) => sum + ch.headroom, 0);
  for (const ch of candidates) {
    ticket -= ch.headroom;
    if (ticket <= 0) return ch.chapter_id;
  }
  return candidates[candidates.length - 1].chapter_id;
}
