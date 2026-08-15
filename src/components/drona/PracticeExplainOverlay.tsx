"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SessionView } from "@/components/drona/SessionView";
import { DronaVoiceClient, VoiceClientState } from "@/lib/drona/voice";
import { startPracticeExplainSession, endSession } from "@/lib/drona/client";
import {
  DEFAULT_LANGUAGE,
  getTutorName,
  loadLanguagePreference,
  loadVoicePreference,
  type SessionLanguage,
} from "@/lib/drona/tutor";
import { TranscriptEntry } from "@/lib/drona/types";

interface PracticeExplainOverlayProps {
  questionId: string;
  chosenOption?: string;
  chosenValue?: number;
  onClose: () => void;
}

/**
 * Full-screen overlay on top of /practice — a disposable, question-scoped
 * Drona session, not a navigation to /learn. Mirrors the socket-lifecycle
 * wiring in src/app/learn/page.tsx, trimmed to a single-segment conversation
 * (no scoping, no segment pacing, no quiz cadence) and deliberately not
 * participating in the ACTIVE_SESSION_KEY resume mechanism — these sessions
 * are meant to be short and disposable, not resumed across a browser restart.
 */
export function PracticeExplainOverlay({
  questionId,
  chosenOption,
  chosenValue,
  onClose,
}: PracticeExplainOverlayProps) {
  const [connecting, setConnecting] = useState(true);
  const [connectError, setConnectError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [tutorName, setTutorName] = useState(getTutorName());
  const [language, setLanguage] = useState<SessionLanguage>(DEFAULT_LANGUAGE);

  const [boardEvents, setBoardEvents] = useState<any[]>([]);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [sessionPhase, setSessionPhase] = useState<"teaching" | "awaiting_answer" | "wrapup" | "complete">("teaching");
  const [liveCheckOptions, setLiveCheckOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [questionText, setQuestionText] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [voiceState, setVoiceState] = useState<VoiceClientState | undefined>();

  const voiceClientRef = useRef<DronaVoiceClient | null>(null);
  const liveCheckOptionsRef = useRef<string[]>([]);
  const pendingBoardRef = useRef<any[]>([]);
  const pendingStateRef = useRef<{
    phase?: string;
    chips: string[];
    questionText: string | null;
  } | null>(null);

  const boardKey = useCallback(
    (evt: any) => String(evt?.latex || evt?.text || "").trim().toLowerCase(),
    []
  );
  const appendBoardEvent = useCallback((evt: any) => {
    const key = boardKey(evt);
    if (!key) return;
    setBoardEvents((prev) => (prev.some((e) => boardKey(e) === key) ? prev : [...prev, evt]));
  }, [boardKey]);
  const revealBoardEvent = useCallback((evt: any) => {
    const key = boardKey(evt);
    if (!key) return;
    pendingBoardRef.current = pendingBoardRef.current.filter((e) => boardKey(e) !== key);
    appendBoardEvent(evt);
  }, [boardKey, appendBoardEvent]);

  const acceptStudentAnswer = useCallback((utterance: string) => {
    const chips = liveCheckOptionsRef.current;
    const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
    const spoken = norm(utterance);
    const matched = chips.find((c) => norm(c) === spoken) ?? chips.find((c) => spoken.includes(norm(c)) || norm(c).includes(spoken));

    setSelectedOption(matched ?? utterance);
    liveCheckOptionsRef.current = [];
    setLiveCheckOptions([]);
    setQuestionText(null);
    setSessionPhase("teaching");
    setTranscript((prev) => [...prev, { id: "student-" + Date.now(), sender: "student", text: utterance, timestamp: new Date() }]);
  }, []);

  const handleSendTurn = useCallback((utterance: string) => {
    if (!sessionId) return;
    acceptStudentAnswer(utterance);
    setIsStreaming(true);
    if (voiceClientRef.current) {
      voiceClientRef.current.sendUtterance(utterance);
    } else {
      setIsStreaming(false);
    }
  }, [sessionId, acceptStudentAnswer]);

  const handleEndClass = useCallback(() => {
    try {
      voiceClientRef.current?.flushAudioQueue("end_session");
      voiceClientRef.current?.disconnect();
      voiceClientRef.current = null;
    } catch (err) {
      console.warn("Voice teardown on end session failed:", err);
    }
    if (sessionId) {
      // Fire-and-forget: no summary screen for this mode, so a failed close
      // call isn't worth blocking the student's return to /practice over.
      endSession(sessionId).catch((err) => console.warn("End practice-explain session failed:", err));
    }
    onClose();
  }, [sessionId, onClose]);

  // Session creation — runs once on mount.
  useEffect(() => {
    let cancelled = false;
    async function start() {
      try {
        const res = await startPracticeExplainSession(
          questionId,
          chosenOption,
          chosenValue,
          loadLanguagePreference(),
          loadVoicePreference()
        );
        if (cancelled) return;
        setSessionId(res.session_id);
        if (res.language) setLanguage(res.language);
        if (res.tutor_name) setTutorName(res.tutor_name);
        setConnecting(false);
      } catch (err) {
        if (cancelled) return;
        console.error("Failed to start practice-explain session:", err);
        setConnectError("Couldn't connect to the teacher. Please try again.");
        setConnecting(false);
      }
    }
    start();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Voice socket lifecycle — mirrors src/app/learn/page.tsx's effect.
  useEffect(() => {
    if (!sessionId) return;

    const client = new DronaVoiceClient({
      sessionId,
      onStateChange: (st) => setVoiceState(st),
      onStateFrame: (frame) => {
        pendingStateRef.current = {
          phase: frame.phase ?? pendingStateRef.current?.phase,
          chips: Array.isArray(frame.check_options) && frame.check_options.length
            ? frame.check_options
            : pendingStateRef.current?.chips ?? [],
          questionText: frame.question_text ?? pendingStateRef.current?.questionText ?? null,
        };
      },
      onStudentTranscript: (text) => {
        if (!text.trim()) return;
        acceptStudentAnswer(text);
        setIsStreaming(true);
      },
      onSpeechText: (text, isFinal) => {
        if (!text) return;
        setTranscript((prev) => {
          const last = prev[prev.length - 1];
          if (last && last.sender === "drona" && last.id.startsWith("voice-")) {
            return [...prev.slice(0, -1), { ...last, text }];
          }
          return [...prev, { id: "voice-" + Date.now(), sender: "drona", text, timestamp: new Date() }];
        });
      },
      onBoardEvents: (events) => {
        if (Array.isArray(events) && events.length > 0) {
          pendingBoardRef.current = [...pendingBoardRef.current, ...events];
        }
      },
      onBoardReplay: (events) => {
        if (Array.isArray(events)) events.forEach(appendBoardEvent);
      },
      onBoardUpdate: (payload: any) => {
        if (!payload) return;
        if (typeof payload === "string") return;
        revealBoardEvent(payload);
      },
      onTurnComplete: () => {
        setIsStreaming(false);
        if (pendingBoardRef.current.length > 0) {
          const leftovers = pendingBoardRef.current;
          pendingBoardRef.current = [];
          leftovers.forEach(appendBoardEvent);
        }
        const next = pendingStateRef.current;
        pendingStateRef.current = null;
        if (!next) return;

        if (next.phase) setSessionPhase(next.phase as any);
        setQuestionText(next.questionText);
        if (next.chips.length > 0) {
          const changed = JSON.stringify(next.chips) !== JSON.stringify(liveCheckOptionsRef.current);
          liveCheckOptionsRef.current = next.chips;
          setLiveCheckOptions(next.chips);
          if (changed) setSelectedOption(null);
        } else {
          liveCheckOptionsRef.current = [];
          setLiveCheckOptions([]);
          setSelectedOption(null);
        }
      },
      onSessionEnded: () => {
        handleEndClass();
      },
      onBargeIn: () => {
        pendingBoardRef.current = [];
        pendingStateRef.current = null;
      },
      onReconnect: () => {
        setIsStreaming(false);
      },
    });

    client.connect().catch((err) => console.warn("Practice-explain voice WS connect failed:", err));
    voiceClientRef.current = client;

    return () => {
      client.disconnect();
      voiceClientRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  const effectiveSubtopicOptions =
    sessionPhase === "awaiting_answer" && liveCheckOptions.length > 0 ? liveCheckOptions : [];

  return (
    <div className="fixed inset-0 z-50 bg-ruled-body overflow-y-auto">
      {connecting ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-pulse text-sm text-neutral-500">Connecting to {tutorName}…</div>
          </div>
        </div>
      ) : connectError ? (
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center space-y-4">
            <p className="text-sm text-neutral-600">{connectError}</p>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm"
            >
              Back to practice
            </button>
          </div>
        </div>
      ) : (
        <main className="max-w-[1180px] w-full mx-auto px-0 md:px-6" style={{ paddingTop: 0 }}>
          <SessionView
            sessionTopic="Explaining this question"
            tutorName={tutorName}
            language={language}
            boardLatex=""
            boardEvents={boardEvents}
            transcript={transcript}
            segmentIndex={1}
            totalSegments={1}
            phase={sessionPhase}
            selectedOption={selectedOption}
            questionText={questionText}
            answerResult={null}
            isStreaming={isStreaming}
            voiceState={voiceState}
            subtopicOptions={effectiveSubtopicOptions}
            onSendTurn={handleSendTurn}
            onEndSession={handleEndClass}
            onTogglePause={() => voiceClientRef.current?.togglePause()}
            onStartPushToTalk={() => voiceClientRef.current?.startPushToTalk()}
            onStopPushToTalk={() => voiceClientRef.current?.stopPushToTalk()}
          />
        </main>
      )}
    </div>
  );
}
