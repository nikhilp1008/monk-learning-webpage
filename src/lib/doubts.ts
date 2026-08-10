import { apiFetch } from "@/lib/api";

/** One move of the solution. Math arrives as `$…$` / `$$…$$`. */
export interface SolutionStep {
  n: number;
  text: string;
}

export type DoubtStatus = "solved" | "failed" | "illegible";

export interface DoubtSummary {
  id: string;
  submission_id: string;
  question_index: number;
  question_text: string | null;
  subject: string | null;
  topic: string | null;
  legible: boolean;
  legibility_note: string | null;
  answer: string | null;
  key_idea: string | null;
  status: DoubtStatus;
  failure_reason: string | null;
  created_at: string;
  scrap: string;
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
  subjects: string[];
}

/** One question inside a submission, as returned by POST /doubts. */
export interface SnappedQuestion {
  id: string;
  question_index: number;
  question_text: string | null;
  subject: string | null;
  topic: string | null;
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
  /** Set when more than two questions were visible, or the read was partial. */
  note: string | null;
  solved_count: number;
  questions: SnappedQuestion[];
}

/** POST /doubts rejects with this shape, so the UI can name the failing stage. */
export interface SnapFailure {
  message: string;
  stage: "transcribe" | "solve" | "config" | string;
  doubt_id?: string;
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

/** Uploads one photo and waits for its questions to be read and solved. */
export async function snapDoubt(file: File): Promise<SnapResponse> {
  const body = new FormData();
  body.append("file", file);
  return apiFetch<SnapResponse>("/doubts", { method: "POST", body });
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
        doubt_id: d.doubt_id,
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
export const MAX_QUESTIONS = 2;
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
