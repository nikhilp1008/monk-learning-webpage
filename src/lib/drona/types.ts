export interface Subtopic {
  id: string;
  name: string;
  grounding_status: 'grounded' | 'sections_only' | 'unavailable';
}

export interface Chapter {
  id: string;
  name: string;
  class_level?: number;
  subtopics: Subtopic[];
}

export interface SubjectGroup {
  subject: string;
  chapters: Chapter[];
}

export interface StartSessionResponse {
  session_id: string;
  phase: string;
  speech: string;
  /** Echoed by the API so the UI shows the persona the session actually got. */
  language?: 'english' | 'hinglish';
  tutor_voice?: 'male' | 'female';
  tutor_name?: string;
}

export interface ScopeSessionRequest {
  utterance: string;
}

export interface ScopeSessionResponse {
  phase: string;
  speech: string;
  subtopic?: string;
  plan_ready: boolean;
  options?: string[];
  language?: 'english' | 'hinglish';
  tutor_voice?: 'male' | 'female';
  tutor_name?: string;
}

export interface TurnRequest {
  utterance: string | null;
  turn_type: 'answer' | 'interruption' | 'no_response';
  playback_cutoff_point: null;
}

export interface SSEEventSpeech {
  delta: string;
}

export interface SSEEventBoard {
  latex: string;
}

export interface SSEEventMeta {
  segment_index: number;
  total_segments: number;
  session_complete: boolean;
}

export interface SSEEventState {
  phase: 'teaching' | 'awaiting_answer' | 'wrapup' | 'complete';
  reason?: 'session_ended' | string;
}

export interface EndSessionResponse {
  summary_points: string[];
  mistakes_count: number;
  /** Real class length in minutes (the UI used to show a hardcoded "~10m"). */
  duration_minutes?: number;
  /** Checkpoint questions the student actually answered (graded turns). */
  questions_answered?: number;
  /** Chapter the session belonged to. */
  chapter_name?: string | null;
  next_suggestion?: {
    chapter_id: string;
    chapter_name: string;
  };
}

export interface TranscriptEntry {
  id: string;
  sender: 'drona' | 'student';
  text: string;
  timestamp: Date;
}
