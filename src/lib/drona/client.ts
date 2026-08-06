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

function getBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_API_URL environment variable is not defined");
  }
  return url.replace(/\/$/, "");
}

async function getAuthToken(): Promise<string> {
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

export async function startSession(
  chapterId: string,
  language: "english" | "hinglish"
): Promise<StartSessionResponse> {
  const token = await getAuthToken();
  const res = await fetch(`${getBaseUrl()}/drona/session/start`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chapter_id: chapterId, language }),
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
