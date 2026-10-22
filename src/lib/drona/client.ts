import { supabase } from "@/lib/supabase";
import {
  SubjectGroup,
  StartSessionResponse,
  ScopeSessionResponse,
  TurnRequest,
  EndSessionResponse,
  SSEEventSpeech,
  SSEEventBoard,
  SSEEventMeta,
  SSEEventState,
} from "./types";
import { DEFAULT_VOICE, type SessionLanguage, type TutorVoice } from "./tutor";

function getBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_API_URL environment variable is not defined");
  }
  return url.replace(/\/$/, "");
}

async function getAuthToken(): Promise<string> {
  if (typeof window !== "undefined" && (window as any).__E2E_MOCK_TOKEN__) {
    return (window as any).__E2E_MOCK_TOKEN__;
  }
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;
  if (!token) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    throw new Error("No authentication session found");
  }
  return token;
}

export async function fetchCatalogue(): Promise<SubjectGroup[]> {
  const token = await getAuthToken();
  const res = await fetch(`${getBaseUrl()}/drona/catalogue`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`Catalogue request failed: ${res.status}`);
  }
  return res.json();
}

export interface TopicCheckResult {
  status: "ok" | "other_chapter" | "out_of_syllabus" | "ambiguous";
  chapter_id?: string;
  subtopic?: string;
  subtopic_key?: string;
  chapter?: { id: string; name: string; subject?: string; class_level?: number };
  options?: string[];
  message?: string;
}

/**
 * Validates a topic BEFORE a session is created, so the UI can show a loading
 * card and then either open the lesson or point the student at the chapter that
 * actually covers it. Creates nothing server-side.
 */
export async function checkTopic(
  chapterId: string | null,
  utterance: string
): Promise<TopicCheckResult> {
  const token = await getAuthToken();
  const res = await fetch(`${getBaseUrl()}/drona/topic/check`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chapter_id: chapterId, utterance }),
  });
  if (!res.ok) {
    throw new Error(`Topic check failed: ${res.status}`);
  }
  return res.json();
}

export async function startSession(
  chapterId: string,
  language: SessionLanguage,
  voice: TutorVoice = DEFAULT_VOICE
): Promise<StartSessionResponse> {
  const token = await getAuthToken();
  const res = await fetch(`${getBaseUrl()}/drona/session/start`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chapter_id: chapterId, language, voice }),
  });
  if (!res.ok) {
    throw new Error(`Start session failed: ${res.status}`);
  }
  return res.json();
}

export async function scopeSession(
  sessionId: string,
  utterance: string
): Promise<ScopeSessionResponse> {
  const token = await getAuthToken();
  const res = await fetch(
    `${getBaseUrl()}/drona/session/${sessionId}/scope`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ utterance }),
    }
  );
  if (!res.ok) {
    throw new Error(`Scope session failed: ${res.status}`);
  }
  return res.json();
}

// streamTurn removed — WebSocket /drona/session/{id}/live is the sole live turn transport

export async function endSession(
  sessionId: string
): Promise<EndSessionResponse> {
  const token = await getAuthToken();
  const res = await fetch(
    `${getBaseUrl()}/drona/session/${sessionId}/end`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error(`End session failed: ${res.status}`);
  }
  return res.json();
}
