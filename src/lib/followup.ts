import { supabase } from "./supabase";
import { ApiError } from "./api";

/**
 * "Ask a follow-up", out loud.
 *
 * A student who has just pressed the button has the question in their head
 * NOW; typing it is a slower, different act. So the mic opens on press and the
 * recording goes up as it is — transcribed on the server, where the key lives,
 * and the transcript comes back down the same connection as the answer so the
 * screen can show what was HEARD before any of the answer arrives.
 */

export interface FollowUpStep {
  n: number;
  text: string;
}

export interface AskVoiceHandlers {
  /** What the recording was heard as. Show it immediately — before any step. */
  onTranscript?: (text: string) => void;
  /** One finished step, as it is written. */
  onStep?: (step: FollowUpStep) => void;
  /** The whole answer as continuous speech, for `speakFollowUp`. */
  onSpoken?: (text: string) => void;
  onDone?: (totalMs: number) => void;
  /** A real failure. `notHeard` is separate — see below. */
  onError?: (message: string) => void;
  /**
   * Nothing was heard. A slip, not a failure: offer to ask again rather than
   * showing an error.
   */
  onNotHeard?: (message: string) => void;
}

export interface FollowUpTurn {
  role: "user" | "assistant";
  content: string;
}

function apiBase(): string {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) throw new Error("NEXT_PUBLIC_API_URL is not defined");
  return base.replace(/\/$/, "");
}

async function bearer(): Promise<string> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;
  if (!token) {
    if (typeof window !== "undefined") window.location.href = "/login";
    throw new ApiError("No authentication session found", 401);
  }
  return token;
}

/**
 * Sends one recording and streams the reply.
 *
 * EventSource cannot POST, so this reads the response body itself. Frames are
 * separated by a blank line and a chunk can split one down the middle, so the
 * partial tail is carried to the next read rather than parsed and dropped.
 */
export async function askVoice(
  doubtId: string,
  audio: Blob,
  history: FollowUpTurn[],
  handlers: AskVoiceHandlers
): Promise<void> {
  const token = await bearer();
  const body = new FormData();
  // The extension only has to keep the browser happy; Deepgram detects the
  // container from the bytes, and Chrome gives webm/opus where iOS gives m4a.
  const ext = audio.type.includes("mp4") || audio.type.includes("m4a") ? "m4a" : "webm";
  body.append("audio", audio, `ask.${ext}`);
  body.append("history", JSON.stringify(history ?? []));

  const res = await fetch(`${apiBase()}/doubts/${doubtId}/ask-voice`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body,
  });

  if (!res.ok || !res.body) {
    let detail: string | null = null;
    try {
      const data = await res.json();
      detail = typeof data?.detail === "string" ? data.detail : null;
    } catch {
      /* non-JSON error body */
    }
    // 422 is "nothing was heard" — the one failure that is not a failure.
    if (res.status === 422) {
      handlers.onNotHeard?.(detail || "Monk did not catch that — try asking again.");
      return;
    }
    handlers.onError?.(detail || "Monk could not answer that just now.");
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let eventName = "";

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const frames = buffer.split("\n\n");
    buffer = frames.pop() ?? "";

    for (const frame of frames) {
      for (const line of frame.split("\n")) {
        if (line.startsWith("event: ")) {
          eventName = line.slice(7).trim();
        } else if (line.startsWith("data: ")) {
          let payload: Record<string, unknown>;
          try {
            payload = JSON.parse(line.slice(6));
          } catch {
            continue;
          }
          if (eventName === "transcript") {
            handlers.onTranscript?.(String(payload.text ?? ""));
          } else if (eventName === "step") {
            handlers.onStep?.({
              n: Number(payload.n ?? 0),
              text: String(payload.text ?? ""),
            });
          } else if (eventName === "spoken") {
            handlers.onSpoken?.(String(payload.text ?? ""));
          } else if (eventName === "done") {
            handlers.onDone?.(Number(payload.total_ms ?? 0));
          } else if (eventName === "error") {
            handlers.onError?.(
              String(payload.message ?? "Monk could not answer that just now.")
            );
          }
        }
      }
    }
  }
}

/**
 * The answer read aloud, in the teacher this student picked.
 *
 * Returns null when it could not be synthesised. Call this only once the steps
 * are on screen: they are useful in silence, so a slow or refused synthesis
 * must cost nothing that was already readable — and a missing voice is not an
 * error worth showing.
 */
export async function speakFollowUp(
  doubtId: string,
  text: string
): Promise<Blob | null> {
  if (!text.trim()) return null;
  try {
    const token = await bearer();
    const res = await fetch(`${apiBase()}/doubts/${doubtId}/speak`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) return null;      // 503 included: skip silently
    return await res.blob();
  } catch {
    return null;
  }
}

/**
 * Where the answer belongs. One short step reads fine over the solution; more
 * than that needs the room a sheet gives it.
 *
 * 240 characters is roughly three lines on a phone. It is a guess, and the
 * point of trying this on web first is to find out whether it is the right one.
 */
export const INLINE_ANSWER_MAX_CHARS = 240;

export function answerFitsInline(steps: FollowUpStep[]): boolean {
  if (steps.length !== 1) return false;
  return (steps[0]?.text?.length ?? 0) <= INLINE_ANSWER_MAX_CHARS;
}
