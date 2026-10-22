"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MathText } from "@/components/MathText";
import { useRecorder } from "@/lib/useRecorder";
import {
  answerFitsInline,
  askVoice,
  streamFollowUpSpeech,
  type FollowUpStep,
  type FollowUpSurface,
  type FollowUpTurn,
} from "@/lib/followup";

/**
 * Asking a follow-up out loud, over the solution that prompted it.
 *
 * The mic opens on press — no text box, no sheet. A student who has just
 * pressed the button has the question in their head now, and typing it is a
 * slower, different act. The solution stays readable behind the bar, which is
 * the point: the question is usually about something visible on it.
 *
 * A short answer stays on the bar; a longer one opens a sheet and is rendered
 * as the same numbered rail the solution above uses. The conversation lives in
 * this component and dies with it — it belongs to this sitting with this
 * solution, so there is nothing to store.
 */

type Phase = "listening" | "thinking" | "answered" | "notHeard" | "error";

export function FollowUp({
  doubtId,
  teacher,
  onClose,
  surface = "doubts",
}: {
  /** The doubt's id, or the practice question's id when surface is "practice". */
  doubtId: string;
  teacher: string;
  onClose: () => void;
  surface?: FollowUpSurface;
}) {
  const recorder = useRecorder();
  const [phase, setPhase] = useState<Phase>("listening");
  const [transcript, setTranscript] = useState<string | null>(null);
  const [steps, setSteps] = useState<FollowUpStep[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<FollowUpTurn[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);
  // Sentences arrive faster than they play, so they queue. Playing chunk N+1
  // from chunk N's `ended` is what keeps the reading continuous — waiting for
  // a fetch between sentences is audible.
  const queueRef = useRef<string[]>([]);
  const playingRef = useRef(false);
  const abandonedRef = useRef(false);

  const stopAudio = useCallback(() => {
    abandonedRef.current = true;
    audioRef.current?.pause();
    audioRef.current = null;
    playingRef.current = false;
    queueRef.current.forEach((u) => URL.revokeObjectURL(u));
    queueRef.current = [];
  }, []);

  /** Plays whatever is queued, in order, and stops when it runs dry. */
  const drainQueue = useCallback(() => {
    if (playingRef.current || abandonedRef.current) return;
    const url = queueRef.current.shift();
    if (!url) return;
    playingRef.current = true;
    const audio = new Audio(url);
    audioRef.current = audio;
    const next = () => {
      URL.revokeObjectURL(url);
      playingRef.current = false;
      audioRef.current = null;
      if (!abandonedRef.current) drainQueue();
    };
    audio.onended = next;
    // A chunk that will not play must not stall the ones behind it.
    audio.onerror = next;
    void audio.play().catch(() => {
      // Autoplay refused. The steps are readable, so this is not an error —
      // but the queue is dropped rather than left half-spoken.
      URL.revokeObjectURL(url);
      playingRef.current = false;
      abandonedRef.current = true;
      queueRef.current.forEach((u) => URL.revokeObjectURL(u));
      queueRef.current = [];
    });
  }, []);

  const beginListening = useCallback(async () => {
    setPhase("listening");
    setTranscript(null);
    setSteps([]);
    setMessage(null);
    stopAudio();
    const ok = await recorder.start();
    if (!ok) {
      setPhase("error");
      setMessage(
        recorder.state === "unsupported"
          ? "This browser cannot record audio. Try Chrome, Safari or Edge."
          : `${teacher} needs the microphone to hear your question. Allow access and try again.`
      );
    }
  }, [recorder, stopAudio, teacher]);

  // Listening starts on open, not on a second tap.
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    void beginListening();
  }, [beginListening]);

  useEffect(() => stopAudio, [stopAudio]);

  const send = useCallback(async () => {
    const clip = await recorder.stop();
    if (!clip) {
      setPhase("notHeard");
      setMessage(`${teacher} did not catch that — ask again.`);
      return;
    }
    setPhase("thinking");

    const collected: FollowUpStep[] = [];
    let spokenLine = "";

    await askVoice(doubtId, clip, history, {
      onTranscript: (text) => setTranscript(text),
      onStep: (step) => {
        collected.push(step);
        setSteps([...collected]);
        setPhase("answered");
      },
      onSpoken: (text) => {
        spokenLine = text;
      },
      onDone: async () => {
        setPhase("answered");
        const asked = transcript ?? "";
        setHistory((h) => [
          ...h,
          { role: "user", content: asked },
          { role: "assistant", content: collected.map((s) => s.text).join(" ") },
        ]);
        // Only once the steps are on screen. They are useful in silence, and a
        // slow or refused synthesis must cost nothing already readable.
        if (spokenLine) {
          abandonedRef.current = false;
          await streamFollowUpSpeech(
            doubtId,
            spokenLine,
            (wav) => {
              if (abandonedRef.current) return;
              queueRef.current.push(URL.createObjectURL(wav));
              drainQueue();
            },
            () => abandonedRef.current,
            surface
          );
        }
      },
      onNotHeard: (m) => {
        setPhase("notHeard");
        setMessage(m);
      },
      onError: (m) => {
        setPhase("error");
        setMessage(m);
      },
    }, surface);
  }, [doubtId, drainQueue, history, recorder, teacher, transcript, surface]);

  const close = useCallback(() => {
    recorder.cancel();
    stopAudio();
    onClose();
  }, [onClose, recorder, stopAudio]);

  const inline = phase === "answered" && answerFitsInline(steps);
  const sheet = phase === "answered" && !inline;

  return (
    <>
      {/* ─── The bar. Sits over the solution, which stays readable. ─── */}
      <div className="sticky bottom-4 z-30 mt-4">
        <div className="rounded-[18px] border border-border-subtle bg-white shadow-[0_18px_44px_-24px_rgba(28,26,22,0.55)] px-4 py-3.5">
          {transcript && (
            <p className="text-[0.82rem] text-ink-muted mb-2.5 leading-snug">
              <span className="font-extrabold text-[0.6rem] tracking-[0.14em] uppercase text-ink-muted mr-1.5">
                You asked
              </span>
              “{transcript}”
            </p>
          )}

          {phase === "listening" && (
            <div className="flex items-center gap-3">
              <span className="relative flex-none w-9 h-9 rounded-full bg-red-note/10 grid place-items-center">
                <span className="absolute inset-0 rounded-full bg-red-note/20 animate-ping" />
                <MicIcon />
              </span>
              <div className="flex-1 min-w-0">
                <b className="block font-bold text-[0.94rem] text-ink">
                  Listening…
                </b>
                <span className="block text-[0.8rem] text-ink-muted tabular-nums">
                  {recorder.state === "starting"
                    ? "opening the mic…"
                    : `${recorder.seconds}s — ask your question, then press Done`}
                </span>
              </div>
              <button
                onClick={send}
                disabled={recorder.state !== "recording"}
                className="flex-none font-semibold text-[0.86rem] py-2.5 px-5 rounded-full border-none text-cream-light bg-ink cursor-pointer hover:-translate-y-0.5 transition-transform disabled:opacity-40 disabled:hover:translate-y-0"
              >
                Done
              </button>
              <button
                onClick={close}
                aria-label="Cancel"
                className="flex-none text-ink-muted hover:text-ink text-[0.86rem] px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          {phase === "thinking" && (
            <div className="flex items-center gap-3 text-ink-muted text-[0.88rem]">
              <span className="w-4 h-4 rounded-full border-2 border-ink-dim border-t-ink animate-ml-spin" />
              {transcript ? `${teacher} is answering…` : "Sending your question…"}
            </div>
          )}

          {inline && (
            <div className="flex flex-col gap-3">
              <p className="text-[0.98rem] leading-[1.7] text-ink">
                <MathText content={steps[0]?.text} />
              </p>
              <AskAgain onAsk={beginListening} onClose={close} teacher={teacher} />
            </div>
          )}

          {sheet && (
            <div className="flex items-center gap-3 text-[0.88rem] text-ink-light">
              <span className="flex-1">{teacher} answered below.</span>
              <AskAgain onAsk={beginListening} onClose={close} teacher={teacher} />
            </div>
          )}

          {(phase === "notHeard" || phase === "error") && (
            <div className="flex items-center gap-3">
              <p
                className={`flex-1 text-[0.88rem] leading-snug ${
                  phase === "error" ? "text-red-dark" : "text-ink-light"
                }`}
              >
                {message}
              </p>
              <AskAgain onAsk={beginListening} onClose={close} teacher={teacher} />
            </div>
          )}
        </div>
      </div>

      {/* ─── The sheet. Only when the answer needs the room. ─── */}
      {sheet && (
        <div className="mt-4 rounded-[20px] border border-border-subtle bg-white p-5 shadow-ref-card">
          <span className="block font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-ink-muted mb-3.5">
            {teacher} explains
          </span>
          {/* The same numbered rail the solution above uses. */}
          <ol className="flex flex-col gap-5">
            {steps.map((step, idx) => (
              <li key={step.n ?? idx} className="flex gap-3.5 items-start">
                <span className="mt-0.5 w-6 h-6 flex-none rounded-full bg-ink/[0.04] border border-border-subtle grid place-items-center font-bold text-[0.68rem] text-ink-light">
                  {step.n ?? idx + 1}
                </span>
                <span className="flex-1 min-w-0 text-[0.98rem] leading-[1.75] text-ink-light">
                  <MathText content={step.text} />
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
}

function AskAgain({
  onAsk,
  onClose,
  teacher,
}: {
  onAsk: () => void;
  onClose: () => void;
  teacher: string;
}) {
  return (
    <div className="flex gap-2 flex-none">
      <button
        onClick={onAsk}
        title={`Ask ${teacher} another question`}
        className="inline-flex items-center gap-1.5 font-semibold text-[0.84rem] py-2 px-4 rounded-full border-[1.4px] border-[rgba(28,26,22,0.14)] bg-white text-ink cursor-pointer hover:border-ink transition-colors"
      >
        <MicIcon size={13} />
        Ask another
      </button>
      <button
        onClick={onClose}
        className="font-semibold text-[0.84rem] py-2 px-3 rounded-full bg-transparent text-ink-muted hover:text-ink cursor-pointer"
      >
        Done
      </button>
    </div>
  );
}

function MicIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="relative"
    >
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <path d="M12 18v3" />
    </svg>
  );
}
