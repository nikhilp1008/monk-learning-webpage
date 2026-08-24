import { ApiError, apiFetch } from "@/lib/api";
import { supabase } from "@/lib/supabase";

/** One move of the solution. Math arrives as `$…$` / `$$…$$`. */
export interface SolutionStep {
  n: number;
  text: string;
}

export type DoubtStatus = "solved" | "failed" | "illegible" | "unsure";

/** What the student can actually DO about a refusal. */
export type Remedy = "retake" | "not_photo" | "our_side";

/** One answer choice, as read off the page. */
export interface DoubtOption {
  label: string;
  text: string;
}

export interface DoubtSummary {
  id: string;
  submission_id: string;
  question_index: number;
  question_text: string | null;
  /** The question WITHOUT its options — pairs with `options` for structured display. */
  stem?: string | null;
  options?: DoubtOption[] | null;
  subject: string | null;
  /** Chapter-level topic ("Waves and Organ Pipes") — the API column is `chapter`. */
  chapter: string | null;
  /** Short display title for the doubt. */
  concept: string | null;
  question_type: string | null;
  legible: boolean;
  legibility_note: string | null;
  answer: string | null;
  key_idea: string | null;
  status: DoubtStatus;
  failure_reason: string | null;
  option_labels?: string[] | null;
  created_at: string;
  scrap: string;
  /** What to PRINT for `subject` — the column stores the corpus key
   * ("mathematics"), this is the label ("Math"). Null when nothing was read. */
  subject_label?: string | null;
  /** False when this subject is not on the student's exam. Never a refusal —
   * the doubt is solved and saved either way — just worth marking. Null when
   * the photo carried no readable question. */
  on_syllabus?: boolean | null;
}

/** A filter chip: the stored key to filter on, and the label to show. */
export interface SubjectChip {
  key: string;
  label: string;
  on_syllabus: boolean;
}

export interface DoubtDetail extends Omit<DoubtSummary, "scrap"> {
  steps: SolutionStep[];
  /** Short-lived presigned R2 URL, or null when one could not be produced. */
  image_url: string | null;
  reported: boolean;
}

export interface DoubtsListResponse {
  doubts: DoubtSummary[];
  count: number;
  /** The student's syllabus first, then any subject they have actually snapped
   * from outside it (`on_syllabus: false`). Off-syllabus doubts are appended
   * rather than hidden — a doubt you cannot find is worse than a chip you did
   * not expect. */
  subjects: SubjectChip[];
  /** 'jee' | 'neet' | 'both', resolved from the student's entitlement. */
  exam: string;
}

/** One question inside a submission, as returned by POST /doubts. */
export interface SnappedQuestion {
  id: string;
  question_index: number;
  question_type?: string | null;
  option_labels?: string[] | null;
  remedy?: Remedy;
  retake_helps?: boolean;
  question_text: string | null;
  stem?: string | null;
  options?: DoubtOption[] | null;
  subject: string | null;
  /** Chapter-level topic. Was typed `topic` while the API always sent
   * `chapter`, so the chapter chip never rendered on the live snap screen —
   * fixed alongside adding stem/options. */
  chapter: string | null;
  legible: boolean;
  legibility_note: string | null;
  answer: string | null;
  steps: SolutionStep[];
  key_idea: string | null;
  status: DoubtStatus;
  failure_reason: string | null;
}

export interface SnapResponse {
  submission_id: string;
  /** Set when more questions were visible than were read, or the read was partial. */
  note: string | null;
  solved_count: number;
  questions: SnappedQuestion[];
  questions_used_today?: number;
  daily_limit?: number;
}

/** POST /doubts rejects with this shape, so the UI can name the failing stage. */
export interface SnapFailure {
  message: string;
  stage: "transcribe" | "solve" | "config" | "quota" | string;
  reason?: string;
  /** retake = their photo | not_photo = needs a figure | our_side = ours */
  remedy?: Remedy;
  retake_helps?: boolean;
  doubt_id?: string;
  /** Quota refusals only. */
  used_today?: number;
  daily_limit?: number;
  retry_after_seconds?: number | null;
}

export async function listDoubts(
  params: { q?: string; subject?: string } = {}
): Promise<DoubtsListResponse> {
  const search = new URLSearchParams();
  if (params.q?.trim()) search.set("q", params.q.trim());
  if (params.subject && params.subject !== "All") search.set("subject", params.subject);
  const qs = search.toString();
  return apiFetch<DoubtsListResponse>(`/doubts${qs ? `?${qs}` : ""}`);
}

export async function getDoubt(doubtId: string): Promise<DoubtDetail> {
  return apiFetch<DoubtDetail>(`/doubts/${doubtId}`);
}

/** Uploads one photo and waits for ALL its questions. Prefer streamSnap. */
export async function snapDoubt(file: File): Promise<SnapResponse> {
  const body = new FormData();
  body.append("file", file);
  return apiFetch<SnapResponse>("/doubts", { method: "POST", body });
}

/**
 * A question as READ off the photo, before any solving. Carries no answer —
 * it exists so the page can show the student their own question while the
 * solver works, instead of an empty panel for the whole ~20-30s solve.
 */
export interface ReadQuestion {
  question_index: number;
  question_text: string | null;
  stem?: string | null;
  options?: DoubtOption[] | null;
  subject: string | null;
  chapter: string | null;
  question_type?: string | null;
  legible: boolean;
  legibility_note: string | null;
}

export interface SnapStreamHandlers {
  onMeta?: (m: { submission_id: string; question_count: number; note: string | null }) => void;
  /** Everything read off the photo, sent before the first solve starts. */
  onQuestionsRead?: (r: { questions: ReadQuestion[] }) => void;
  /** Solver heartbeat while it reasons — lets the UI show live activity. */
  onThinking?: (t: { question_index: number; seconds: number }) => void;
  /** One step of the working, emitted AS the solver writes it. Never an answer. */
  onStep?: (s: { question_index: number; n: number; text: string }) => void;
  /** A retry started; discard the steps shown so far for this question. */
  onStepsReset?: (r: { question_index: number }) => void;
  onQuestion?: (q: SnappedQuestion) => void;
  onDone?: (d: { solved_count: number; questions_used_today: number; daily_limit: number }) => void;
  onError?: (f: SnapFailure) => void;
}

/**
 * Streams one photo's questions, delivering each answer as it lands.
 *
 * A solve takes ~25s, so a page of five kept the student on a spinner for over
 * a minute before anything appeared. Measured on a JEE page: the first answer
 * arrives at 26s instead of 75s.
 */
export async function streamSnap(
  file: File,
  handlers: SnapStreamHandlers
): Promise<void> {
  // Seconds after a deploy, the fresh container has been seen returning an
  // empty stream (headers OK, zero events). One silent retry covers it; a
  // second empty response is reported honestly.
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    const sawEvent = await streamSnapOnce(file, handlers, attempt === 2);
    if (sawEvent) return;
  }
}

async function streamSnapOnce(
  file: File,
  handlers: SnapStreamHandlers,
  lastAttempt: boolean
): Promise<boolean> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;
  if (!token) {
    if (typeof window !== "undefined") window.location.href = "/login";
    throw new ApiError("No authentication session found", 401);
  }

  const body = new FormData();
  body.append("file", file);

  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/doubts/stream`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body,
  });

  // Quota and validation failures arrive as ordinary JSON, not as a stream.
  if (!res.ok || !res.body) {
    let data: unknown = null;
    try {
      data = await res.json();
    } catch {
      /* non-JSON error body */
    }
    handlers.onError?.(readSnapFailure(new ApiError("Snap failed", res.status, data)));
    return true; // a real HTTP error is an outcome, not a cold start — no retry
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let eventName = "";
  let sawEvent = false;

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // SSE frames are separated by a blank line; keep the partial tail.
    const frames = buffer.split("\n\n");
    buffer = frames.pop() ?? "";

    for (const frame of frames) {
      for (const line of frame.split("\n")) {
        if (line.startsWith("event: ")) {
          eventName = line.slice(7).trim();
        } else if (line.startsWith("data: ")) {
          const payload = JSON.parse(line.slice(6));
          sawEvent = true;
          if (eventName === "meta") handlers.onMeta?.(payload);
          else if (eventName === "questions_read") handlers.onQuestionsRead?.(payload);
          else if (eventName === "thinking") handlers.onThinking?.(payload);
          else if (eventName === "step") handlers.onStep?.(payload);
          else if (eventName === "steps_reset") handlers.onStepsReset?.(payload);
          else if (eventName === "question") handlers.onQuestion?.(payload);
          else if (eventName === "done") handlers.onDone?.(payload);
          else if (eventName === "error") handlers.onError?.(payload);
        }
      }
    }
  }

  if (!sawEvent && lastAttempt) {
    handlers.onError?.({
      message: "The server went quiet before answering. Please try again.",
      stage: "unknown",
      remedy: "our_side",
      retake_helps: false,
    });
    return true;
  }
  return sawEvent;
}

export async function reportDoubt(
  doubtId: string,
  comment?: string
): Promise<{ reported: boolean }> {
  return apiFetch<{ reported: boolean }>(`/doubts/${doubtId}/report`, {
    method: "POST",
    body: JSON.stringify({ comment: comment ?? null }),
  });
}

export async function deleteDoubt(doubtId: string): Promise<void> {
  await apiFetch<void>(`/doubts/${doubtId}`, { method: "DELETE" });
}

/**
 * Pulls the stage and message out of a rejected snap. The API returns a JSON
 * object as `detail`; ApiError stringifies it, so the structured copy on
 * `error.data` is the reliable source.
 */
export function readSnapFailure(error: unknown): SnapFailure {
  const fallback: SnapFailure = {
    message: "Something went wrong reading that photo.",
    stage: "unknown",
    remedy: "our_side",
  };
  if (!error || typeof error !== "object") return fallback;

  const data = (error as { data?: unknown }).data;
  if (data && typeof data === "object" && "detail" in data) {
    const detail = (data as { detail: unknown }).detail;
    if (typeof detail === "string") {
      return { message: detail, stage: "unknown" };
    }
    if (detail && typeof detail === "object") {
      const d = detail as Partial<SnapFailure>;
      return {
        message: d.message || fallback.message,
        stage: d.stage || "unknown",
        reason: d.reason,
        remedy: d.remedy,
        retake_helps: d.retake_helps,
        doubt_id: d.doubt_id,
        used_today: d.used_today,
        daily_limit: d.daily_limit,
        retry_after_seconds: d.retry_after_seconds,
      };
    }
  }
  if (error instanceof Error && error.message) {
    return { message: error.message, stage: "unknown" };
  }
  return fallback;
}

/** Mirrors the API's own caps, so bad input is rejected before upload. */
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
export const MAX_QUESTIONS = 3;
export const ACCEPTED_MIME = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
];

/** Returns a student-facing reason, or null when the file is acceptable. */
export function rejectReason(file: File): string | null {
  const mime = (file.type || "").toLowerCase();
  if (!ACCEPTED_MIME.includes(mime)) {
    return "That file type is not supported. Send a JPEG, PNG, WebP or HEIC photo.";
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return `That photo is larger than ${MAX_IMAGE_BYTES / (1024 * 1024)} MB.`;
  }
  return null;
}
