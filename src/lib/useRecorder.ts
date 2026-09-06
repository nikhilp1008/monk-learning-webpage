"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Hold-to-ask capture.
 *
 * The mic opens the moment the student presses "ask a follow-up", so this is
 * built to start fast and to always let go of the device afterwards: a stream
 * left running keeps the browser's recording indicator lit, which reads as the
 * page listening when it is not.
 */

export type RecorderState = "idle" | "starting" | "recording" | "denied" | "unsupported";

/** What the browser will actually record in, best first. */
function pickMimeType(): string | undefined {
  if (typeof MediaRecorder === "undefined") return undefined;
  const candidates = [
    "audio/webm;codecs=opus",   // Chrome, Edge, Firefox
    "audio/webm",
    "audio/mp4",                // Safari — gives m4a
    "audio/ogg;codecs=opus",
  ];
  return candidates.find((t) => MediaRecorder.isTypeSupported(t));
}

export function useRecorder() {
  const [state, setState] = useState<RecorderState>("idle");
  const [seconds, setSeconds] = useState(0);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const releaseDevice = useCallback(() => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    recorderRef.current = null;
  }, []);

  // The recording indicator must not outlive the view.
  useEffect(() => releaseDevice, [releaseDevice]);

  const start = useCallback(async (): Promise<boolean> => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setState("unsupported");
      return false;
    }
    setState("starting");
    setSeconds(0);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mimeType = pickMimeType();
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.start();
      recorderRef.current = recorder;
      setState("recording");
      tickRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
      return true;
    } catch {
      // Denied, or no device. Either way the student cannot speak, and the
      // caller falls back rather than showing a dead bar.
      releaseDevice();
      setState("denied");
      return false;
    }
  }, [releaseDevice]);

  /** Stops and resolves with the recording. Null if there was nothing. */
  const stop = useCallback((): Promise<Blob | null> => {
    const recorder = recorderRef.current;
    if (!recorder || recorder.state === "inactive") {
      releaseDevice();
      setState("idle");
      return Promise.resolve(null);
    }
    return new Promise((resolve) => {
      recorder.onstop = () => {
        const type = recorder.mimeType || "audio/webm";
        const blob = new Blob(chunksRef.current, { type });
        chunksRef.current = [];
        releaseDevice();
        setState("idle");
        // A recording of nothing is a slip; the caller treats it like the
        // server's "did not catch that" rather than sending empty bytes.
        resolve(blob.size > 0 ? blob : null);
      };
      recorder.stop();
    });
  }, [releaseDevice]);

  /** Throw the recording away — used when the view closes mid-listen. */
  const cancel = useCallback(() => {
    const recorder = recorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      recorder.onstop = null;
      try {
        recorder.stop();
      } catch {
        /* already stopping */
      }
    }
    chunksRef.current = [];
    releaseDevice();
    setState("idle");
    setSeconds(0);
  }, [releaseDevice]);

  return { state, seconds, start, stop, cancel };
}
