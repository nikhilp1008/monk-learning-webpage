"use client";

import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { Header } from "@/components/Header";
import { supabase } from "@/lib/supabase";
import { getTutorName } from "@/lib/drona/tutor";
import {
  fetchCatalogue,
  startSession,
  scopeSession,
  endSession,
} from "@/lib/drona/client";
import type {
  SubjectGroup,
  Chapter,
  Subtopic,
  StartSessionResponse,
  TranscriptEntry,
  EndSessionResponse,
} from "@/lib/drona/types";
import { SessionView } from "@/components/drona/SessionView";
import { EndStatesView } from "@/components/drona/EndStatesView";
import { DronaVoiceClient, VoiceClientState } from "@/lib/drona/voice";

/* ─── Subject icon SVGs (ported from design-reference/index.html) ─── */
function PhysicsIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.6}>
      <circle cx={12} cy={12} r={2.2} />
      <ellipse cx={12} cy={12} rx={10} ry={4.4} />
      <ellipse cx={12} cy={12} rx={10} ry={4.4} transform="rotate(60 12 12)" />
      <ellipse cx={12} cy={12} rx={10} ry={4.4} transform="rotate(120 12 12)" />
    </svg>
  );
}

function ChemistryIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" />
      <path d="M7.5 14h9" />
    </svg>
  );
}

function MathsIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
      <rect x={5} y={3} width={14} height={18} rx={2} />
      <path d="M9 7h6" />
      <path d="M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01" />
    </svg>
  );
}

function BiologyIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v8" />
      <path d="M8.5 8A4.5 4.5 0 0 0 4 12.5C4 15 6 17 8 18l4 4 4-4c2-1 4-3 4-5.5A4.5 4.5 0 0 0 15.5 8" />
      <path d="M12 10a3 3 0 0 0-3 3" />
    </svg>
  );
}

const SUBJECT_ICONS: Record<string, React.ReactNode> = {
  physics: <PhysicsIcon />,
  chemistry: <ChemistryIcon />,
  mathematics: <MathsIcon />,
  biology: <BiologyIcon />,
};

const SUBJECT_LABELS: Record<string, string> = {
  physics: "Physics",
  chemistry: "Chemistry",
  mathematics: "Maths",
  biology: "Biology",
};

/* ─── Flow type ─── */
type FlowState = "picker" | "scoping" | "session" | "summary" | "error";

export default function LearnPage() {
  const teacher = getTutorName("male"); // TODO: read from profile.drona_voice

  /* ─── Catalogue state ─── */
  const [catalogue, setCatalogue] = useState<SubjectGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<number>(11);
  const [selectedSubject, setSelectedSubject] = useState<string>("physics");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);

  /* ─── Flow state ─── */
  const [flowState, setFlowState] = useState<FlowState>("picker");

  /* ─── Session state ─── */
  const [sessionTopic, setSessionTopic] = useState("");
  const [scopingSpeech, setScopingSpeech] = useState("");
  const [scopingOptions, setScopingOptions] = useState<string[]>([]);
  const [scopingPlanReady, setScopingPlanReady] = useState(false);

  /* ─── Session playback state ─── */
  const [boardLatex, setBoardLatex] = useState("");
  const [boardEvents, setBoardEvents] = useState<any[]>([]);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [segmentIndex, setSegmentIndex] = useState(1);
  const [totalSegments, setTotalSegments] = useState(1);
  const [sessionPhase, setSessionPhase] = useState<"teaching" | "awaiting_answer" | "wrapup" | "complete">("teaching");
  const [checkOptions, setCheckOptions] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [summaryData, setSummaryData] = useState<EndSessionResponse | null>(null);

  /* ─── Free text state ─── */
  const [freeTextInput, setFreeTextInput] = useState("");
  const [freeTextLoading, setFreeTextLoading] = useState(false);
  const [loadingChapterId, setLoadingChapterId] = useState<string | null>(null);
  const [loadingSubtopic, setLoadingSubtopic] = useState<string | null>(null);

  /* ─── Load user's enrolled_class ─── */
  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("enrolled_class")
            .eq("id", user.id)
            .maybeSingle();
          if (profile?.enrolled_class) {
            setSelectedClass(profile.enrolled_class);
          }
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    }
    loadProfile();
  }, []);

  /* ─── Load catalogue ─── */
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCatalogue();
        if (!cancelled) {
          setCatalogue(data);
          // Default to first subject from API
          if (data.length > 0 && !data.find(g => g.subject === selectedSubject)) {
            setSelectedSubject(data[0].subject);
          }
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load catalogue");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ─── Derived: subjects from API ─── */
  const subjects = useMemo(() => {
    return catalogue.map(g => g.subject);
  }, [catalogue]);

  /* ─── Session ID Ref (prevents stale closures in async callbacks) ─── */
  const [sessionId, setSessionIdState] = useState<string | null>(null);
  const sessionIdRef = useRef<string | null>(null);

  const setSessionId = useCallback((id: string | null) => {
    sessionIdRef.current = id;
    setSessionIdState(id);
  }, []);

  /* ─── Derived: chapters for selected subject & class ─── */
  const allSubjectChapters = useMemo(() => {
    const group = catalogue.find(g => g.subject === selectedSubject);
    return group ? group.chapters : [];
  }, [catalogue, selectedSubject]);

  const filteredChapters = useMemo(() => {
    let chapters = allSubjectChapters;
    // Filter on class_level (B4)
    chapters = chapters.filter(c => c.class_level === undefined || c.class_level === selectedClass);
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      chapters = chapters.filter(c => c.name.toLowerCase().includes(q));
    }
    return chapters;
  }, [allSubjectChapters, selectedClass, searchTerm]);

  /* ─── Chapter count label ─── */
  const chapterCountLabel = useMemo(() => {
    const classTotal = allSubjectChapters.filter(c => c.class_level === undefined || c.class_level === selectedClass).length;
    return `${filteredChapters.length} of ${classTotal} chapters`;
  }, [filteredChapters, allSubjectChapters, selectedClass]);

  /* ─── Pick a chapter → start session ─── */
  const handlePickChapter = useCallback(async (chapter: Chapter) => {
    setLoadingChapterId(chapter.id);
    setSelectedChapterId(chapter.id);
    setSessionTopic(chapter.name);
    setScopingSpeech("");
    setScopingOptions([]);
    setScopingPlanReady(false);

    try {
      const res: StartSessionResponse = await startSession(chapter.id, "hinglish");
      setSessionId(res.session_id);
      setScopingSpeech(res.speech);

      // Show available subtopics as scoping options
      const availableSubtopics = chapter.subtopics
        .filter((s: Subtopic) => s.grounding_status !== "unavailable")
        .map((s: Subtopic) => s.name);
      setScopingOptions(availableSubtopics);
      setScopingPlanReady(true);
      setFlowState("scoping");
    } catch (err) {
      console.error("Failed to start session:", err);
      setError("Failed to start session. Please try again.");
      setFlowState("picker");
    } finally {
      setLoadingChapterId(null);
    }
  }, [setSessionId]);

  /* ─── Fire a teaching turn ─── */
  const fireTeachingTurn = useCallback(async (activeSessionId?: string) => {
    const sid = activeSessionId || sessionIdRef.current;
    if (!sid) return;
    setIsStreaming(true);

    if (!voiceClientRef.current) {
      console.error("[TEACHING TURN ERROR] Voice client ref is null!");
      setError("WebSocket connection failed to initialize. Please try again.");
      setFlowState("error");
      setIsStreaming(false);
      return;
    }

    const isReady = await voiceClientRef.current.awaitReady(10000);
    if (!isReady) {
      console.error("[TEACHING TURN ERROR] WebSocket connection failed to open within 10s!");
      setError("WebSocket connection timed out before initial turn could fire.");
      setFlowState("error");
      setIsStreaming(false);
      return;
    }

    console.log("[TEACHING TURN SUCCESS] Sending initial turn over open WebSocket");
    voiceClientRef.current.sendUtterance("Begin lesson segment");
  }, []);

  const scopingInFlightRef = useRef<boolean>(false);

  /* ─── Scoping → teaching (B2 fix) ─── */
  const handleSendScope = useCallback(async (utterance: string) => {
    const sid = sessionIdRef.current;
    if (!sid || scopingInFlightRef.current) {
      console.log("handleSendScope blocked: session is null or scope request already in-flight");
      return;
    }
    scopingInFlightRef.current = true;
    setLoadingSubtopic(utterance);
    setScopingPlanReady(false);
    voiceClientRef.current?.unlockAudio();
    try {
      const res = await scopeSession(sid, utterance);
      setSessionTopic(res.subtopic || utterance);

      const opts = (res as any).subtopic_options || (res as any).options || [];
      if (opts.length > 0) {
        setScopingOptions(opts);
        setScopingSpeech(res.speech);
        setScopingPlanReady(true);
        return;
      }

      // Transition to session
      setFlowState("session");
      setBoardLatex("");
      setTranscript([{
        id: "scoping-" + Date.now(),
        sender: "drona",
        text: res.speech,
        timestamp: new Date(),
      }]);
      setSegmentIndex(1);
      setTotalSegments(1);
      setSessionPhase("teaching");

      // Fire first turn with explicit session ID
      fireTeachingTurn(sid);
    } catch (err) {
      console.error("Scoping failed:", err);
      setScopingPlanReady(true);
    } finally {
      scopingInFlightRef.current = false;
      setLoadingSubtopic(null);
    }
  }, [fireTeachingTurn]);

  /* ─── Send student turn ─── */
  const handleSendTurn = useCallback(async (utterance: string) => {
    if (!sessionId) return;
    setTranscript(prev => [...prev, {
      id: "student-" + Date.now(),
      sender: "student",
      text: utterance,
      timestamp: new Date(),
    }]);
    setCheckOptions([]);
    setIsStreaming(true);

    if (voiceClientRef.current) {
      console.log("[STUDENT TURN] Sending student turn over WebSocket voice client");
      voiceClientRef.current.sendUtterance(utterance);
    } else {
      console.error("[STUDENT TURN ERROR] DronaVoiceClient is not connected via WebSocket");
      setIsStreaming(false);
    }
  }, [sessionId]);

  /* ─── End session ─── */
  const handleEndSession = useCallback(async () => {
    if (!sessionId) return;
    try {
      const res = await endSession(sessionId);
      setSummaryData(res);
      setFlowState("summary");
    } catch (err) {
      console.error("End session failed:", err);
      setFlowState("summary");
    }
  }, [sessionId]);

  /* ─── Return to picker ─── */
  const handleReturnToPicker = useCallback(() => {
    setFlowState("picker");
    setSessionId(null);
    setBoardLatex("");
    setTranscript([]);
    setSummaryData(null);
    setSelectedChapterId(null);
  }, []);

  /* ─── Free text "Talk to teacher" ─── */
  const handleFreeText = useCallback(async () => {
    const q = freeTextInput.trim() || "Thermodynamics and key physics concepts";
    setFreeTextLoading(true);
    try {
      const res = await startSession("free_text", "hinglish");
      setSessionId(res.session_id);
      setScopingSpeech(res.speech);
      setSessionTopic(q);
      setFlowState("scoping");
      setScopingPlanReady(true);
    } catch (err) {
      console.error("Free text session failed:", err);
      setError("Could not start a free-text session. Please pick a chapter instead.");
    } finally {
      setFreeTextLoading(false);
    }
  }, [freeTextInput]);

  /* ─── Drona Voice Client Lifecycle ─── */
  const voiceClientRef = useRef<DronaVoiceClient | null>(null);
  const [voiceState, setVoiceState] = useState<VoiceClientState | undefined>();

  useEffect(() => {
    if (sessionId) {
      console.log("[VOICE WS INIT] Opening WebSocket connection immediately for session:", sessionId);
      const client = new DronaVoiceClient({
        sessionId,
        onStateChange: (st) => setVoiceState(st),
        onSpeechText: (text, isFinal) => {
          if (text) {
            setTranscript((prev) => {
              const last = prev[prev.length - 1];
              if (last && last.sender === "drona" && last.id.startsWith("voice-")) {
                return [...prev.slice(0, -1), { ...last, text }];
              }
              return [
                ...prev,
                {
                  id: "voice-" + Date.now(),
                  sender: "drona",
                  text,
                  timestamp: new Date(),
                },
              ];
            });
          }
        },
        onBoardEvents: (events) => {
          console.log(`[BOARD EVENTS RECEIVED ON CLIENT] count: ${events.length}`, events);
          if (Array.isArray(events) && events.length > 0) {
            setBoardEvents((prev) => {
              const existingKeys = new Set(prev.map((e) => (e.latex || e.text || "").trim().toLowerCase()));
              const uniqueNew = events.filter((e) => {
                const key = (e.latex || e.text || "").trim().toLowerCase();
                return key && !existingKeys.has(key);
              });
              return [...prev, ...uniqueNew];
            });
          }
        },
        onBoardUpdate: (payload: any) => {
          if (typeof payload === "string" && payload) {
            setBoardLatex((prev) => (prev ? `${prev}\n${payload}` : payload));
          }
        },
        onPhaseChange: (phase, options) => {
          console.log(`[PHASE CHANGE] phase=${phase} check_options=${options.length}`);
          setSessionPhase(phase as "teaching" | "awaiting_answer" | "wrapup" | "complete");
          setCheckOptions(options);
        },
        onSessionEnded: () => {
          handleEndSession();
        },
      });

      client.connect().catch((err) => console.warn("Voice WS connect failed:", err));
      voiceClientRef.current = client;

      return () => {
        console.log("[VOICE WS CLEANUP] Disconnecting WebSocket for session:", sessionId);
        client.disconnect();
        voiceClientRef.current = null;
      };
    }
  }, [sessionId, handleEndSession]);

  /* ─── RENDER: Session View ─── */
  if (flowState === "session") {
    return (
      <div className="min-h-screen flex flex-col bg-ruled-body">
        <Header />
        <main className="flex-1 max-w-[1180px] w-full mx-auto px-0 md:px-6 animate-ml-rise" style={{ paddingTop: 0 }}>
          {/* Board + Transcript + Command Dock */}
          <SessionView
            sessionTopic={sessionTopic}
            boardLatex={boardLatex}
            boardEvents={boardEvents}
            transcript={transcript}
            segmentIndex={segmentIndex}
            totalSegments={totalSegments}
            phase={sessionPhase}
            isStreaming={isStreaming}
            voiceState={voiceState}
            subtopicOptions={checkOptions}
            onSendTurn={handleSendTurn}
            onEndSession={handleEndSession}
            onToggleMute={() => voiceClientRef.current?.toggleMute()}
            onInterrupt={() => voiceClientRef.current?.interrupt()}
            onTogglePause={() => voiceClientRef.current?.togglePause()}
            onStartPushToTalk={() => voiceClientRef.current?.startPushToTalk()}
            onStopPushToTalk={() => voiceClientRef.current?.stopPushToTalk()}
          />
        </main>
      </div>
    );
  }

  /* ─── RENDER: Summary View ─── */
  if (flowState === "summary") {
    return (
      <div className="min-h-screen flex flex-col bg-ruled-body">
        <Header />
        <main className="flex-1 max-w-[1180px] w-full mx-auto px-6 md:px-11 py-8 animate-ml-rise">
          <EndStatesView
            type="normal"
            summaryData={summaryData}
            onReturnToCatalogue={handleReturnToPicker}
          />
        </main>
      </div>
    );
  }

  /* ─── RENDER: Error View ─── */
  if (flowState === "error") {
    return (
      <div className="min-h-screen flex flex-col bg-ruled-body">
        <Header />
        <main className="flex-1 max-w-[1180px] w-full mx-auto px-6 md:px-11 py-8 animate-ml-rise">
          <EndStatesView
            type="error"
            errorMessage={error || "Something went wrong."}
            onReturnToCatalogue={handleReturnToPicker}
            onRetry={() => { setFlowState("picker"); setError(null); }}
          />
        </main>
      </div>
    );
  }

  /* ─── RENDER: Scoping View ─── */
  if (flowState === "scoping") {
    return (
      <div className="min-h-screen flex flex-col bg-ruled-body">
        <Header />
        <main className="flex-1 max-w-[1180px] w-full mx-auto px-6 md:px-11 pt-[30px] pb-16 animate-ml-rise">
          <div className="mb-5">
            <button
              onClick={handleReturnToPicker}
              className="inline-flex items-center gap-2 font-semibold text-[0.86rem] text-ink-light hover:text-ink transition-colors"
            >
              ← Back to chapters
            </button>
          </div>
          <h1 className="text-[2.3rem] leading-[1.05] tracking-[-0.025em] font-medium text-ink mb-2">
            What would you like to learn?
          </h1>
          <p className="text-ink-light text-base mb-6">
            {sessionTopic} — tell {teacher} what to focus on.
          </p>

          {/* Drona speech */}
          {scopingSpeech && (
            <div className="relative bg-[#FFFEFB] border border-[rgba(28,26,22,0.12)] rounded-2xl p-5 pl-12 mb-5" style={{ backgroundImage: "repeating-linear-gradient(transparent 0 27px, rgba(28,26,22,0.06) 27px 28px)" }}>
              <span className="absolute top-3 bottom-3 left-8 w-[1.4px] bg-[rgba(221,68,51,0.35)]" />
              <p className="text-[0.94rem] leading-[1.55] text-ink">{scopingSpeech}</p>
            </div>
          )}

          {/* Preparing banner */}
          {!scopingPlanReady && (
            <div className="flex items-center gap-3 bg-[#FCF4E0] border border-[rgba(238,163,31,0.45)] rounded-2xl p-4 mb-5">
              <div className="w-5 h-5 border-2 border-[#EEA31F] border-t-transparent rounded-full animate-spin flex-shrink-0" />
              <div>
                <span className="font-bold text-[0.84rem] text-ink">Preparing your lesson…</span>
                <p className="text-[0.78rem] text-ink-light">Analyzing topic grounding and assembling your custom lesson segments.</p>
              </div>
            </div>
          )}

          {/* Subtopic options */}
          {scopingOptions.length > 0 && (
            <div className="flex flex-wrap gap-[7px] mb-5">
              {scopingOptions.map((opt) => {
                const isSubLoading = loadingSubtopic === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => handleSendScope(opt)}
                    disabled={loadingSubtopic !== null}
                    className={`inline-flex items-center gap-2 py-[10px] px-4 border rounded-[10px] text-[0.88rem] font-semibold transition-colors cursor-pointer shadow-xs ${
                      isSubLoading
                        ? "bg-[#EEA31F] border-[#EEA31F] text-[#241a08]"
                        : "bg-white border-[rgba(28,26,22,0.12)] text-ink hover:bg-[#EEA31F] hover:text-[#241a08]"
                    }`}
                  >
                    {isSubLoading && (
                      <div className="w-3.5 h-3.5 border-2 border-[#241a08] border-t-transparent rounded-full animate-spin flex-none" />
                    )}
                    <span>{isSubLoading ? "Assembling lesson…" : opt}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Free-form scoping input */}
          <form onSubmit={(e) => { e.preventDefault(); const v = (e.target as HTMLFormElement).querySelector("input")?.value.trim(); if (v && scopingPlanReady) handleSendScope(v); }} className="flex items-center gap-[9px]">
            <div className="flex-1 flex items-center gap-[9px] bg-white border-[1.4px] border-[rgba(28,26,22,0.12)] rounded-full py-[9px] px-[15px]">
              <input
                placeholder="Or type what you want to learn…"
                disabled={!scopingPlanReady}
                className="flex-1 min-w-0 border-none bg-transparent font-[inherit] text-[0.9rem] text-ink outline-none placeholder:text-[#9C988C]"
              />
            </div>
            <button
              type="submit"
              disabled={!scopingPlanReady}
              className="flex items-center justify-center gap-[9px] font-semibold text-[0.9rem] py-[11px] px-[20px] rounded-full border-none text-[#FCFAF4] bg-ink cursor-pointer disabled:opacity-50 hover:-translate-y-[1px] transition-transform"
              style={{ boxShadow: "0 10px 24px -12px rgba(28,26,22,0.7)" }}
            >
              Start learning
              <svg viewBox="0 0 16 16" width={14} height={14} fill="none">
                <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </main>
      </div>
    );
  }

  /* ═══════════════════ PICKER (design-reference lines 490–565) ═══════════════════ */
  return (
    <div className="min-h-screen flex flex-col bg-ruled-body">
      <Header />

      <main className="flex-1 max-w-[1180px] w-full mx-auto px-6 md:px-11 pt-[30px] pb-16 animate-ml-rise">
        {/* Title */}
        <div className="mb-5">
          <h1 className="text-[2.3rem] leading-[1.05] tracking-[-0.025em] font-medium text-ink">
            What should we work on today?
          </h1>
        </div>

        {/* ─── "Talk to teacher" free-text bar (ported from design L496–507) ─── */}
        <div
          role="button"
          tabIndex={0}
          className="relative overflow-hidden flex items-center gap-[18px] bg-[#16130E] text-[#EFEBDD] border border-[#2a2419] rounded-[20px] py-[18px] px-[22px] mb-[18px] cursor-pointer hover:-translate-y-[2px] transition-transform"
          style={{ boxShadow: "0 16px 34px -22px rgba(22,19,14,0.8)" }}
        >
          <span className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(80% 140% at 12% 0%, rgba(238,163,31,0.16), transparent 55%)" }} />
          <span className="relative w-[54px] h-[54px] flex-none rounded-full grid place-items-center border border-[rgba(255,255,255,0.14)]" style={{ background: "radial-gradient(circle at 50% 38%, #2f2a22, #16130E)" }}>
            <svg viewBox="0 0 120 120" width={30} height={30} fill="none">
              <circle cx={60} cy={60} r={36} stroke="#FCFAF4" strokeWidth={11} strokeLinecap="round" strokeDasharray="52 23.4" transform="rotate(-90 60 60)" />
              <circle cx={60} cy={60} r={19} stroke="#FCFAF4" strokeWidth={9} strokeLinecap="round" strokeDasharray="21.8 18" transform="rotate(-30 60 60)" />
              <circle cx={60} cy={60} r={6} fill="#EEA31F" />
            </svg>
          </span>
          <span className="relative flex-1 min-w-0">
            <b className="block font-bold text-[1.12rem] text-white">Just start talking — no topic needed</b>
            <span className="block text-[0.9rem] text-[#C7C1B3] mt-[2px]">Tell {teacher} what&apos;s on your mind. It follows your lead, like a real teacher.</span>
          </span>
          <form
            onSubmit={(e) => { e.preventDefault(); handleFreeText(); }}
            className="relative flex-none flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              value={freeTextInput}
              onChange={(e) => setFreeTextInput(e.target.value)}
              placeholder="e.g. torque on a hinge…"
              className="w-[180px] py-[9px] px-[14px] rounded-full bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] text-[0.86rem] text-white placeholder:text-[#938d80] outline-none focus:border-[#EEA31F] transition-colors"
            />
            <button
              type="submit"
              disabled={freeTextLoading}
              className="inline-flex items-center gap-[9px] font-bold text-[0.9rem] py-[11px] px-[20px] rounded-full bg-[#EEA31F] text-[#241a08] disabled:opacity-50 cursor-pointer hover:bg-[#F2B238] transition-colors"
              style={{ boxShadow: "0 8px 18px -10px rgba(238,163,31,0.7)" }}
            >
              <span>Talk to {teacher}</span>
              <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="#241a08" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a4 4 0 0 1 4 4v4a4 4 0 0 1-8 0V7a4 4 0 0 1 4-4Z" />
                <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
              </svg>
            </button>
          </form>
        </div>

        {/* Divider: "or pick a chapter" */}
        <div className="flex items-center gap-3 mb-4">
          <span className="flex-1 h-px bg-[rgba(28,26,22,0.1)]" />
          <span className="font-script font-bold text-[#DD4433] text-[0.95rem]" style={{ transform: "rotate(-1deg)" }}>or pick a chapter</span>
          <span className="flex-1 h-px bg-[rgba(28,26,22,0.1)]" />
        </div>

        {/* ─── Main grid: chapters left, sidebar right ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-5 items-start">

          {/* ─── LEFT: Chapter picker card ─── */}
          <div className="bg-white border border-[rgba(28,26,22,0.08)] rounded-[20px] py-[22px] px-[24px]" style={{ boxShadow: "0 14px 30px -22px rgba(28,26,22,0.4)" }}>
            {/* Controls: "Pick a chapter" + Class toggle */}
            <div className="flex items-center justify-between gap-3 mb-[6px]">
              <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-[#9C988C]">Pick a chapter</span>
              <span className="inline-flex gap-[3px] p-[3px] bg-[rgba(28,26,22,0.055)] rounded-full">
                {[11, 12].map(cls => (
                  <button
                    key={cls}
                    onClick={() => setSelectedClass(cls)}
                    className={`text-[0.82rem] px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                      selectedClass === cls
                        ? "font-bold bg-white text-ink shadow-xs"
                        : "font-semibold text-ink-light"
                    }`}
                  >
                    Class {cls}
                  </button>
                ))}
              </span>
            </div>

            {/* Subject tabs — dynamic from API */}
            <div className="grid shadow-[inset_0_-1px_rgba(28,26,22,0.1)] mb-4" style={{ gridTemplateColumns: `repeat(${subjects.length || 3}, 1fr)` }}>
              {subjects.map(subj => {
                const isActive = selectedSubject === subj;
                return (
                  <button
                    key={subj}
                    onClick={() => setSelectedSubject(subj)}
                    className={`flex items-center justify-center gap-2 text-[0.95rem] py-[13px] px-1 border-b-[2.5px] transition-colors cursor-pointer ${
                      isActive
                        ? "font-bold text-ink border-[#EEA31F]"
                        : "font-semibold text-[#9C988C] border-transparent"
                    }`}
                  >
                    {SUBJECT_ICONS[subj]}
                    {SUBJECT_LABELS[subj] || subj}
                  </button>
                );
              })}
            </div>

            {/* Search + count */}
            <div className="flex items-center gap-[10px] mb-3">
              <div className="flex-1 flex items-center gap-[9px] bg-white border-[1.4px] border-[rgba(28,26,22,0.12)] rounded-full py-[9px] px-[15px]">
                <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="#9C988C" strokeWidth={2} strokeLinecap="round">
                  <circle cx={11} cy={11} r={7} />
                  <path d="m20 20-3.2-3.2" />
                </svg>
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search a chapter…"
                  className="flex-1 min-w-0 border-none bg-transparent font-[inherit] text-[0.9rem] text-ink outline-none placeholder:text-[#9C988C]"
                />
              </div>
              <span className="text-[0.74rem] text-[#9C988C] font-semibold flex-none">{chapterCountLabel}</span>
            </div>

            {/* Chapters grid */}
            {loading ? (
              <div className="py-16 flex flex-col items-center justify-center gap-3 text-[#9C988C]">
                <div className="w-6 h-6 border-2 border-[#EEA31F] border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-semibold">Loading chapters…</span>
              </div>
            ) : error ? (
              <div className="py-16 text-center text-[#C53A2B] text-sm font-semibold">{error}</div>
            ) : filteredChapters.length === 0 ? (
              <div className="py-16 text-center text-[#9C988C] text-sm font-semibold">
                No chapters found for Class {selectedClass} {SUBJECT_LABELS[selectedSubject] || selectedSubject}.
              </div>
            ) : (
              <div className="max-h-[296px] overflow-y-auto overscroll-contain grid grid-cols-2 gap-[7px] mb-[18px] pr-1 content-start">
                {filteredChapters.map((chapter, i) => {
                  const numStr = String(i + 1).padStart(2, "0");
                  const isSelected = selectedChapterId === chapter.id;
                  const isChapLoading = loadingChapterId === chapter.id;
                  const availableSubs = chapter.subtopics.filter(s => s.grounding_status !== "unavailable");
                  return (
                    <button
                      key={chapter.id}
                      onClick={() => handlePickChapter(chapter)}
                      disabled={loadingChapterId !== null}
                      className={`flex items-center gap-[10px] py-[11px] px-[13px] rounded-[10px] text-left transition-colors cursor-pointer border ${
                        isChapLoading
                          ? "bg-[#FCF4E0] border-[#EEA31F] shadow-xs"
                          : isSelected
                          ? "bg-[#FCF4E0] border-[rgba(238,163,31,0.45)]"
                          : "bg-white border-transparent hover:bg-[rgba(252,244,224,0.5)]"
                      }`}
                    >
                      <span className="font-script font-bold text-[0.86rem] text-[#9C988C] flex-none w-[22px]">{numStr}</span>
                      <span className="flex-1 min-w-0 flex flex-col">
                        <b className="font-bold text-[0.84rem] text-ink overflow-hidden text-ellipsis" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                          {isChapLoading ? "Initializing session…" : chapter.name}
                        </b>
                        {availableSubs.length > 0 && (
                          <span className="text-[0.68rem] text-[#9C988C] font-semibold mt-0.5">{availableSubs.length} subtopics</span>
                        )}
                      </span>
                      {isChapLoading ? (
                        <div className="w-4 h-4 border-2 border-[#EEA31F] border-t-transparent rounded-full animate-spin flex-none" />
                      ) : isSelected ? (
                        <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="#9A6A12" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="flex-none">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Start learning button */}
            <button
              onClick={() => {
                const targetChapter = filteredChapters.find(c => c.id === selectedChapterId) || filteredChapters[0];
                if (targetChapter) handlePickChapter(targetChapter);
              }}
              disabled={filteredChapters.length === 0}
              className="flex items-center justify-center gap-[9px] w-full font-semibold text-[0.95rem] py-[14px] rounded-full border-none text-[#FCFAF4] bg-ink shadow-[0_10px_24px_-12px_rgba(28,26,22,0.7)] cursor-pointer hover:-translate-y-[2px] transition-transform disabled:opacity-50 mt-2"
            >
              Start learning
              <svg viewBox="0 0 16 16" width={14} height={14} fill="none">
                <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* ─── RIGHT: sidebar cards ─── */}
          <div className="flex flex-col gap-[18px]">
            {/* "Resume your last session" — HIDDEN (no backend) */}
            {/* GAP REPORT: Session resume requires session persistence, which is not built. */}

            {/* "How a session works" card */}
            <div className="bg-white border border-[rgba(28,26,22,0.08)] rounded-[20px] p-[22px]" style={{ boxShadow: "0 10px 24px -20px rgba(28,26,22,0.4)" }}>
              <span className="block font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-[#9C988C] mb-3">How a session works</span>
              <div className="flex flex-col gap-[10px]">
                {[
                  `${teacher} explains aloud, in your language`,
                  "The board writes itself as it teaches",
                  "Cut in any time, like a real class",
                  `${teacher} checks your understanding back`,
                ].map((text, i) => (
                  <span key={i} className="flex gap-[10px] text-[0.88rem] items-center">
                    <span className="w-[7px] h-[7px] rounded-full bg-[#EEA31F] flex-none" />
                    <span>{text}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
