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

export interface TurnStreamCallbacks {
  onSpeech: (delta: string) => void;
  onBoard: (latex: string) => void;
  onMeta: (meta: SSEEventMeta) => void;
  onState: (state: SSEEventState) => void;
  onAudioChunk?: (audio: string, speech: string) => void;
  onError: (error: Error) => void;
  onDone: () => void;
}

export async function streamTurn(
  sessionId: string,
  body: TurnRequest,
  callbacks: TurnStreamCallbacks,
  signal?: AbortSignal
): Promise<void> {
  const token = await getAuthToken();
  const res = await fetch(
    `${getBaseUrl()}/drona/session/${sessionId}/turn`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal,
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    callbacks.onError(new Error(`Turn request failed (${res.status}): ${errorText}`));
    return;
  }

  if (!res.body) {
    callbacks.onError(new Error("Response body is null"));
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      let currentEvent = "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("event:")) {
          currentEvent = trimmed.slice(6).trim();
        } else if (trimmed.startsWith("data:")) {
          const dataStr = trimmed.slice(5).trim();
          if (!dataStr) continue;

          try {
            const data = JSON.parse(dataStr);

            // F1 VIOLATION AUDIT: Ensure server-side keys never leak to client
            const forbiddenKeys = [
              "model_answer",
              "rubric",
              "expected_misconceptions",
              "grade",
              "mistake_tag",
              "phase_request",
              "segment_complete",
            ];
            for (const key of forbiddenKeys) {
              if (key in data) {
                console.error(`[F1 VIOLATION DETECTED] Key '${key}' leaked in SSE event '${currentEvent}'!`);
              }
            }

            if (currentEvent === "speech") {
              callbacks.onSpeech((data as SSEEventSpeech).delta || "");
            } else if (currentEvent === "audio_chunk") {
              callbacks.onAudioChunk?.(data.audio || "", data.speech || "");
            } else if (currentEvent === "board") {
              callbacks.onBoard((data as SSEEventBoard).latex || "");
            } else if (currentEvent === "meta") {
              callbacks.onMeta(data as SSEEventMeta);
            } else if (currentEvent === "state") {
              callbacks.onState(data as SSEEventState);
            } else if (currentEvent === "done") {
              callbacks.onDone();
              return;
            }
          } catch (err) {
            console.warn("Malformed SSE data frame skipped:", line, err);
          }
        }
      }
    }
    callbacks.onDone();
  } catch (err: unknown) {
    if (signal?.aborted) return;
    callbacks.onError(err instanceof Error ? err : new Error(String(err)));
  }
}

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
