import { apiFetch } from "@/lib/api";

/**
 * "This is wrong" -- from wherever the student is standing. Ported from
 * monk-learning-mobile lib/reports.ts; both post to POST /reports.
 *
 * This one is allowed to fail loudly. Telemetry swallows errors because a
 * student never asked to send it; a report is the opposite -- they told us
 * something is broken and are shown a confirmation. Swallowing a failure here
 * would be a thank-you for something that never arrived, so this throws and
 * every caller says "couldn't send", not "thanks".
 */

export type ReportSurface = "snap" | "live" | "practice";

/** One vocabulary for all three surfaces, so the dashboard groups them. */
export const REPORT_REASONS = [
  "Wrong answer",
  "Confusing step",
  "Audio glitch",
  "Wrong language",
  "Something else",
] as const;

export interface ReportInput {
  surface: ReportSurface;
  reason?: string | null;
  comment?: string | null;
  /** Whichever applies: a report is about a doubt, a class, or a question. */
  doubtId?: string | null;
  sessionId?: string | null;
  questionId?: string | null;
  subject?: string | null;
  chapter?: string | null;
  /** The line that was on screen -- for a live class, most of the diagnosis. */
  quote?: string | null;
  context?: Record<string, unknown> | null;
}

export function sendReport(input: ReportInput): Promise<{ reported: boolean }> {
  return apiFetch("/reports", {
    method: "POST",
    body: JSON.stringify({
      surface: input.surface,
      reason: input.reason ?? null,
      comment: input.comment ?? null,
      doubt_id: input.doubtId ?? null,
      session_id: input.sessionId ?? null,
      question_id: input.questionId ?? null,
      subject: input.subject ?? null,
      chapter: input.chapter ?? null,
      quote: input.quote ?? null,
      context: input.context ?? null,
      app_version: null,
      platform: "web",
    }),
  });
}
