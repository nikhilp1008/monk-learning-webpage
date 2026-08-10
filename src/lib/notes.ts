import { apiFetch } from "@/lib/api";
import type { BoardEventData } from "@/components/BoardEvent";

/** One segment's worth of saved board, in the order it was written. */
export interface NoteSegment {
  segment_index: number;
  segment_title: string;
  items: BoardEventData[];
}

export interface NoteSummary {
  id: string;
  session_id: string;
  chapter_id: string | null;
  subject: string | null;
  chapter_name: string | null;
  subtopic_key: string | null;
  title: string;
  heading: string | null;
  segments_covered: number;
  total_segments: number;
  item_count: number;
  created_at: string;
  preview: string;
}

export interface NoteDetail extends NoteSummary {
  board_items: NoteSegment[];
  session_started_at: string | null;
}

export interface NotesListResponse {
  notes: NoteSummary[];
  count: number;
  subjects: string[];
}

export interface SaveNoteResponse {
  id: string;
  title: string;
  /** True when this session was already on the shelf and the note was refreshed. */
  already_saved: boolean;
  item_count: number;
  segments_covered: number;
  total_segments: number;
}

export async function listNotes(params: {
  q?: string;
  subject?: string;
} = {}): Promise<NotesListResponse> {
  const search = new URLSearchParams();
  if (params.q?.trim()) search.set("q", params.q.trim());
  if (params.subject && params.subject !== "All") search.set("subject", params.subject);
  const qs = search.toString();
  return apiFetch<NotesListResponse>(`/notes${qs ? `?${qs}` : ""}`);
}

export async function getNote(noteId: string): Promise<NoteDetail> {
  return apiFetch<NoteDetail>(`/notes/${noteId}`);
}

export async function saveSessionNote(sessionId: string): Promise<SaveNoteResponse> {
  return apiFetch<SaveNoteResponse>("/notes", {
    method: "POST",
    body: JSON.stringify({ session_id: sessionId }),
  });
}

export async function deleteNote(noteId: string): Promise<void> {
  await apiFetch<void>(`/notes/${noteId}`, { method: "DELETE" });
}

/** "today" / "yesterday" / "3 days ago" / "12 Jun" — the tone the design uses. */
export function relativeDay(iso: string | null | undefined): string {
  if (!iso) return "";
  const then = new Date(iso);
  if (Number.isNaN(then.getTime())) return "";

  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const days = Math.round(
    (startOfDay(new Date()).getTime() - startOfDay(then).getTime()) / 86_400_000
  );

  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  return then.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

/** Subject accent colours, matching the dots in the design's note cards. */
export function subjectColors(subject: string | null): { color: string; dot: string } {
  switch ((subject || "").toLowerCase()) {
    case "physics":
      return { color: "#1F6FB2", dot: "#2E86C8" };
    case "chemistry":
      return { color: "#9A6A12", dot: "#EEA31F" };
    case "biology":
      return { color: "#157A45", dot: "#1C9B57" };
    case "mathematics":
    case "maths":
    case "math":
      return { color: "#8A3A8F", dot: "#B255B8" };
    default:
      return { color: "#57534B", dot: "#9C988C" };
  }
}
