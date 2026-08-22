/**
 * Doubt-of-the-day selection.
 *
 * Two properties matter here and neither comes free from `Math.random()`:
 *
 * 1. **Stable for a day.** A student who opens the dashboard, navigates to
 *    /practice and comes back must see the same doubt. Picking randomly per
 *    render would reshuffle the card on every visit.
 * 2. **Different per student.** The old implementation keyed only on the
 *    calendar day, so every student in the country got the identical row.
 *
 * So the pick is a pure function of (user id, IST calendar day): the subject
 * is drawn from the student's exam track with equal weight, then the doubt is
 * drawn from that subject by walking its ordinals with a per-student stride
 * chosen coprime to the pool size. A coprime stride generates the full cycle,
 * which is the part that matters — a student sees all N doubts in a subject
 * before any of them comes round again. Hashing the day directly would start
 * repeating within weeks (birthday collisions), long before the pool is spent.
 */

export type ExamTrack = "JEE" | "NEET" | "Both";
export type DotdSubject = "physics" | "chemistry" | "mathematics" | "biology";

/**
 * Physics and chemistry are shared; only maths and biology split the tracks.
 * A student sitting both exams gets all four at 25% each, everyone else gets
 * three at ~33% each.
 */
export const TRACK_SUBJECTS: Record<ExamTrack, DotdSubject[]> = {
  JEE: ["physics", "chemistry", "mathematics"],
  NEET: ["physics", "chemistry", "biology"],
  Both: ["physics", "chemistry", "mathematics", "biology"],
};

/**
 * `profiles.target_exam` is free text and has been written by several
 * different code paths over time ("JEE", "JEE Main", "NEET UG", null on rows
 * predating onboarding). Anything unrecognised falls back to JEE, matching the
 * dashboard's existing default profile.
 */
export function normalizeTrack(targetExam: string | null | undefined): ExamTrack {
  const value = (targetExam || "").trim().toLowerCase();
  if (value.startsWith("both")) return "Both";
  if (value.startsWith("neet")) return "NEET";
  return "JEE";
}

/** Days since the Unix epoch in IST — the clock the students are actually on. */
export function istDayNumber(now: Date = new Date()): number {
  const IST_OFFSET_MINUTES = 330; // UTC+5:30, no DST
  return Math.floor((now.getTime() + IST_OFFSET_MINUTES * 60_000) / 86_400_000);
}

/** FNV-1a, 32-bit. Small, stable across runtimes, and good enough to spread. */
function hash32(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function gcd(a: number, b: number): number {
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}

/**
 * A stride coprime to `n`, derived from `seed`. Walking 0,s,2s,… mod n then
 * visits every residue exactly once before repeating.
 */
function coprimeStride(seed: number, n: number): number {
  if (n <= 2) return 1;
  let stride = (seed % (n - 1)) + 1;
  // At most a handful of steps in practice: coprime residues are dense.
  for (let guard = 0; guard < n && gcd(stride, n) !== 1; guard++) {
    stride = (stride % (n - 1)) + 1;
  }
  return gcd(stride, n) === 1 ? stride : 1;
}

export function pickSubject(
  userId: string,
  track: ExamTrack,
  day: number = istDayNumber()
): DotdSubject {
  const subjects = TRACK_SUBJECTS[track];
  return subjects[hash32(`${userId}:subject:${day}`) % subjects.length];
}

/**
 * 1-based ordinal within the subject's pool. `poolSize` is the live row count,
 * so retiring a doubt shrinks the rotation instead of leaving a hole.
 */
export function pickOrdinal(
  userId: string,
  subject: DotdSubject,
  poolSize: number,
  day: number = istDayNumber()
): number {
  if (poolSize <= 1) return 1;
  const offset = hash32(`${userId}:${subject}:offset`) % poolSize;
  const stride = coprimeStride(hash32(`${userId}:${subject}:stride`), poolSize);
  return ((offset + day * stride) % poolSize) + 1;
}
