"use client";

import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { supabase } from "@/lib/supabase";
import {
  DEFAULT_LANGUAGE,
  DEFAULT_VOICE,
  getLanguageLabel,
  getLearnWithLabel,
  getTutorName,
  loadLanguagePreference,
  loadVoicePreference,
  saveLanguagePreference,
  saveVoicePreference,
  type SessionLanguage,
  type TutorVoice,
} from "@/lib/drona/tutor";
import {
  fetchCatalogue,
  startSession,
  scopeSession,
  endSession,
  checkTopic,
  type TopicCheckResult,
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

/* Shown when the tutor is mid-explanation and the backend has sent no chips.
 * Must follow the session language like every other student-facing string. */

export default function LearnPage() {
  const router = useRouter();
  /* ─── Tutor persona & session language (student-selectable) ───
   * Server render has no localStorage, so start on the defaults and hydrate in
   * an effect. Both values are sent to the API at session start and the backend
   * stores them on drona_sessions.
   */
  const [voicePref, setVoicePref] = useState<TutorVoice>(DEFAULT_VOICE);
  const [languagePref, setLanguagePref] = useState<SessionLanguage>(DEFAULT_LANGUAGE);

  useEffect(() => {
    setVoicePref(loadVoicePreference());
    setLanguagePref(loadLanguagePreference());
  }, []);

  const handleVoiceChange = useCallback((voice: TutorVoice) => {
    setVoicePref(voice);
    saveVoicePreference(voice);
  }, []);

  const handleLanguageChange = useCallback((language: SessionLanguage) => {
    setLanguagePref(language);
    saveLanguagePreference(language);
  }, []);

  const teacher = getTutorName(voicePref);

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
  const [liveCheckOptions, setLiveCheckOptions] = useState<string[]>([]);
  /* Which chip the student tapped, and how the server graded it. Together they
   * drive the green/red cue on that one chip. */
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answerResult, setAnswerResult] = useState<"correct" | "partial" | "incorrect" | null>(null);
  /* Mirror of liveCheckOptions for use inside WS callbacks, which close over
   * stale state. Used to detect "these are different chips = a new question". */
  const liveCheckOptionsRef = useRef<string[]>([]);
  const verdictClearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  /* Phase/chips/verdict from the state frame, held until the turn's audio has
   * finished so the question appears when the student HEARS it, not when the
   * server finished generating it. */
  const pendingStateRef = useRef<{
    phase?: string;
    chips: string[];
    questionText: string | null;
    answerResult: "correct" | "partial" | "incorrect" | null;
  } | null>(null);
  const [questionText, setQuestionText] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [summaryData, setSummaryData] = useState<EndSessionResponse | null>(null);

  /* ─── Topic pre-check ───
   * Runs before any session row is created. While it runs the UI shows a
   * loading card; if the topic belongs to another chapter we offer a link
   * instead of dropping the student into a lesson that cannot work.
   */
  const [topicChecking, setTopicChecking] = useState(false);
  const [topicVerdict, setTopicVerdict] = useState<TopicCheckResult | null>(null);

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

  /* ─── Refresh-safe sessions ───
   * sessionId lived only in React state, so an accidental refresh (or tab
   * crash) mid-lesson dropped the student back at the picker with no way
   * back into a class that was still alive server-side. The active session
   * is remembered here; on return within 90 minutes the picker offers to
   * resume it, and the backend replays the board and the pending question
   * on reconnect.
   */
  const ACTIVE_SESSION_KEY = "monk.drona.activeSession";
  const [resumable, setResumable] = useState<{ id: string; topic: string } | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(ACTIVE_SESSION_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved?.id && Date.now() - (saved.ts || 0) < 90 * 60 * 1000) {
        setResumable({ id: saved.id, topic: saved.topic || "your class" });
      } else {
        window.localStorage.removeItem(ACTIVE_SESSION_KEY);
      }
    } catch {}
  }, []);

  const rememberActiveSession = useCallback((id: string, topic: string) => {
    try {
      window.localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify({ id, topic, ts: Date.now() }));
    } catch {}
  }, []);

  const forgetActiveSession = useCallback(() => {
    setResumable(null);
    try {
      window.localStorage.removeItem(ACTIVE_SESSION_KEY);
    } catch {}
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
      const res: StartSessionResponse = await startSession(chapter.id, languagePref, voicePref);
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
    // languagePref/voicePref MUST be dependencies: without them this callback
    // closes over the values from first render, so toggling the persona or
    // language changed the heading but still started every session as
    // Veda/Hinglish. Caught by the browser matrix.
  }, [setSessionId, languagePref, voicePref]);

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

  /* ─── Open any chapter by id, wherever it sits in the catalogue ───
   * Used by the "that's in Gravitation" link, which may point at a different
   * subject or class than the one currently filtered.
   */
  const openChapterById = useCallback(async (chapterId: string) => {
    for (const group of catalogue) {
      const chapter = group.chapters.find((c) => c.id === chapterId);
      if (chapter) {
        setTopicVerdict(null);
        setSelectedSubject(group.subject);
        if (chapter.class_level) setSelectedClass(chapter.class_level);
        setSearchTerm("");
        await handlePickChapterRef.current?.(chapter);
        return;
      }
    }
    setError("Could not open that chapter — it isn't in the catalogue.");
  }, [catalogue]);

  // handlePickChapter is defined above but referenced by openChapterById, which
  // is itself passed into the render; a ref keeps them from ordering-deadlocking.
  const handlePickChapterRef = useRef<((c: Chapter) => Promise<void>) | null>(null);
  handlePickChapterRef.current = handlePickChapter;

  /* ─── Reset session-playback state ───
   * boardEvents/pendingBoardRef/pendingStateRef/chips/verdict were only ever
   * appended to — nothing cleared them between sessions. A student finishing
   * one lesson and starting the next in the same tab would see the new
   * session's board render with the previous chapter's leftover text still on
   * it, and stray chips/verdicts from the tail of session 1 could flash into
   * session 2 until fresh state frames overwrote them. Referencing
   * pendingBoardRef here (declared further down, near the progressive board
   * reveal logic) is safe: this callback's BODY only runs when invoked, well
   * after the whole component has finished rendering for the first time.
   */
  const resetSessionPlaybackState = useCallback(() => {
    setBoardEvents([]);
    pendingBoardRef.current = [];
    pendingStateRef.current = null;
    liveCheckOptionsRef.current = [];
    setLiveCheckOptions([]);
    setSelectedOption(null);
    setQuestionText(null);
    if (verdictClearTimerRef.current) {
      clearTimeout(verdictClearTimerRef.current);
      verdictClearTimerRef.current = null;
    }
    setAnswerResult(null);
    setIsStreaming(false);
  }, []);

  /* ─── Scoping → teaching (B2 fix) ─── */
  const handleSendScope = useCallback(async (utterance: string) => {
    const sid = sessionIdRef.current;
    if (!sid || scopingInFlightRef.current) {
      console.log("handleSendScope blocked: session is null or scope request already in-flight");
      return;
    }

    // Validate the topic BEFORE committing to a lesson. A chip the student
    // tapped resolves locally with no LLM call; free-form text gets routed.
    setTopicChecking(true);
    setTopicVerdict(null);
    try {
      const verdict = await checkTopic(selectedChapterId, utterance);
      if (verdict.status === "other_chapter" || verdict.status === "out_of_syllabus") {
        setTopicVerdict(verdict);
        setTopicChecking(false);
        return;
      }
    } catch (err) {
      // A router failure must not block learning — fall through and scope.
      console.warn("Topic check failed, continuing to scope:", err);
    }
    setTopicChecking(false);

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
      rememberActiveSession(sid, res.subtopic || utterance);
      resetSessionPlaybackState();
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
  }, [fireTeachingTurn, selectedChapterId, resetSessionPlaybackState, rememberActiveSession]);

  /* ─── Record a student answer ───
   * Shared by all three ways of answering — tapping a chip, typing, and
   * dictating over push-to-talk. Dictation used to skip this entirely: the
   * transcript came back on Drona's caption channel, so a spoken answer was
   * shown as something the teacher said and the question stayed open on
   * screen as though nothing had been answered.
   *
   * When the words match one of the chips (however loosely — "the dropped
   * one", "b", "both together"), that chip is the selection, so a dictated
   * answer paints the same verdict a tapped one does.
   */
  const acceptStudentAnswer = useCallback((utterance: string) => {
    const chips = liveCheckOptionsRef.current;
    const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
    const spoken = norm(utterance);
    const letters = ["a", "b", "c", "d"];
    const matched =
      chips.find((c) => norm(c) === spoken) ??
      chips.find((c) => spoken.includes(norm(c)) || norm(c).includes(spoken)) ??
      chips[letters.indexOf(spoken)];

    // Remember the tapped chip so the verdict can be painted onto it, and clear
    // any previous verdict immediately for responsive feedback.
    setSelectedOption(matched ?? utterance);
    setAnswerResult(null);

    // Take the question down as soon as it is answered. Chips used to survive
    // until the NEXT question arrived, so the answered question sat on screen
    // through the following explanation and the sheet appeared never to close.
    // The next question re-opens it when it is actually spoken.
    liveCheckOptionsRef.current = [];
    setLiveCheckOptions([]);
    setQuestionText(null);
    setSessionPhase("teaching");
    setTranscript(prev => [...prev, {
      id: "student-" + Date.now(),
      sender: "student",
      text: utterance,
      timestamp: new Date(),
    }]);
  }, []);

  /* ─── Send student turn (chip tap / typed answer) ─── */
  const handleSendTurn = useCallback(async (utterance: string) => {
    if (!sessionId) return;
    acceptStudentAnswer(utterance);
    setIsStreaming(true);

    if (voiceClientRef.current) {
      console.log("[STUDENT TURN] Sending student turn over WebSocket voice client");
      voiceClientRef.current.sendUtterance(utterance);
    } else {
      console.error("[STUDENT TURN ERROR] DronaVoiceClient is not connected via WebSocket");
      setIsStreaming(false);
    }
  }, [sessionId, acceptStudentAnswer]);

  /* ─── End session ─── */
  const handleEndSession = useCallback(async () => {
    if (!sessionId) return;

    // Silence the teacher FIRST. Ending only called the REST endpoint and
    // switched the view, leaving the WebSocket open and the already-queued
    // audio buffers playing — so you could still hear the lesson over the
    // summary screen. Flush the queue, then tear the connection down.
    try {
      voiceClientRef.current?.flushAudioQueue("end_session");
      voiceClientRef.current?.disconnect();
      voiceClientRef.current = null;
    } catch (err) {
      console.warn("Voice teardown on end session failed:", err);
    }

    try {
      const res = await endSession(sessionId);
      setSummaryData(res);
      setFlowState("summary");
    } catch (err) {
      console.error("End session failed:", err);
      setFlowState("summary");
    } finally {
      // Otherwise a verdict shown in the last few seconds before ending class
      // (its own 5s auto-clear timer still pending) could survive onto the
      // summary screen or the next lesson.
      resetSessionPlaybackState();
      forgetActiveSession();
    }
  }, [sessionId, resetSessionPlaybackState, forgetActiveSession]);

  /* ─── Return to picker ─── */
  const handleReturnToPicker = useCallback(() => {
    setFlowState("picker");
    setSessionId(null);
    setBoardLatex("");
    setTranscript([]);
    setSummaryData(null);
    setSelectedChapterId(null);
    resetSessionPlaybackState();
    forgetActiveSession();
  }, [resetSessionPlaybackState, forgetActiveSession]);

  /* ─── Free text "Talk to teacher" ─── */
  const handleFreeText = useCallback(async () => {
    const q = freeTextInput.trim();
    if (!q) return;
    setFreeTextLoading(true);
    setTopicVerdict(null);
    try {
      // Resolve the request to a real chapter first. startSession("free_text")
      // used to store chapter_id=null, which left scoping with no subtopics and
      // no way to ever reach teaching.
      const verdict = await checkTopic(null, q);
      if (verdict.status === "out_of_syllabus") {
        setTopicVerdict(verdict);
        return;
      }
      if (verdict.status === "other_chapter" && verdict.chapter) {
        setSessionTopic(q);
        await openChapterById(verdict.chapter.id);
        return;
      }
      setTopicVerdict({
        status: "ambiguous",
        message: "I couldn't place that one — pick a chapter below and we'll start there.",
      });
    } catch (err) {
      console.error("Free text routing failed:", err);
      setError("Could not work out which chapter that belongs to. Please pick a chapter instead.");
    } finally {
      setFreeTextLoading(false);
    }
  }, [freeTextInput, openChapterById]);

  /* ─── "Ask a follow-up" from a snapped doubt ───
   * Snap a Doubt hands the transcribed question over in sessionStorage and
   * navigates here with ?from=snap. It runs through the SAME free-text routing
   * as anything typed into the box — POST /drona/session/start with the
   * question as the topic. There is deliberately no separate session type.
   *
   * The query string is read off window.location rather than useSearchParams so
   * this route keeps its static prerender and needs no Suspense boundary.
   */
  const followUpSeeded = useRef(false);
  useEffect(() => {
    if (followUpSeeded.current) return;
    if (typeof window === "undefined") return;
    if (new URLSearchParams(window.location.search).get("from") !== "snap") return;

    let seed: string | null = null;
    try {
      seed = window.sessionStorage.getItem("monk.snap.followup");
      window.sessionStorage.removeItem("monk.snap.followup");
    } catch {
      // Private mode: fall through to the normal picker.
    }
    if (!seed?.trim()) return;

    followUpSeeded.current = true;
    setFreeTextInput(seed.trim());
  }, []);

  // Runs once the seeded question has landed in state, so handleFreeText reads
  // the value rather than an empty string.
  const followUpStarted = useRef(false);
  useEffect(() => {
    if (!followUpSeeded.current || followUpStarted.current) return;
    if (!freeTextInput.trim()) return;
    followUpStarted.current = true;
    handleFreeText();
  }, [freeTextInput, handleFreeText]);

  /* ─── Progressive board reveal ───
   * board_events arrive for the whole turn at once, before speech. They are
   * parked in pendingBoardRef and written to the board one line at a time as
   * the sentence that produced each one begins playing, so the notes appear at
   * the speed a teacher would write them.
   */
  const pendingBoardRef = useRef<any[]>([]);

  const boardKey = useCallback(
    (evt: any) => String(evt?.latex || evt?.text || "").trim().toLowerCase(),
    []
  );

  const appendBoardEvent = useCallback((evt: any) => {
    const key = boardKey(evt);
    if (!key) return;
    setBoardEvents((prev) =>
      prev.some((e) => boardKey(e) === key) ? prev : [...prev, evt]
    );
  }, [boardKey]);

  const revealBoardEvent = useCallback((evt: any) => {
    const key = boardKey(evt);
    if (!key) return;
    pendingBoardRef.current = pendingBoardRef.current.filter((e) => boardKey(e) !== key);
    appendBoardEvent(evt);
  }, [boardKey, appendBoardEvent]);

  /* ─── Drona Voice Client Lifecycle ─── */
  const voiceClientRef = useRef<DronaVoiceClient | null>(null);
  const [voiceState, setVoiceState] = useState<VoiceClientState | undefined>();

  useEffect(() => {
    if (sessionId) {
      console.log("[VOICE WS INIT] Opening WebSocket connection immediately for session:", sessionId);
      const client = new DronaVoiceClient({
        sessionId,
        onStateChange: (st) => setVoiceState(st),
        onStateFrame: (frame) => {
          console.log("[WS STATE FRAME RECEIVED ON PAGE]", frame);
          if (frame.current_segment) {
            setSegmentIndex(frame.current_segment);
          }

          // Hold the question until the speech reaches it.
          //
          // The state frame arrives when the turn finishes GENERATING, but its
          // audio is still queued and playing — so the chips appeared 10-20s
          // early, while Drona was mid-explanation, and briefly showed the
          // options for a question the student had not yet heard. Buffer the
          // phase/chips/verdict and apply them on turn_complete, which fires
          // after the last scheduled audio reveal.
          pendingStateRef.current = {
            phase: frame.phase ?? pendingStateRef.current?.phase,
            chips: Array.isArray(frame.check_options) && frame.check_options.length
              ? frame.check_options
              : pendingStateRef.current?.chips ?? [],
            questionText: frame.question_text ?? pendingStateRef.current?.questionText ?? null,
            answerResult: frame.answer_result ?? pendingStateRef.current?.answerResult ?? null,
          };
        },
        // Push-to-talk came back with the student's words. The server has
        // already launched the turn from this transcript, so this only has to
        // record the answer on screen — never re-send it.
        onStudentTranscript: (text) => {
          if (!text.trim()) return;
          console.log("[STUDENT TRANSCRIPT] Dictated answer:", text);
          acceptStudentAnswer(text);
          setIsStreaming(true);
        },
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
        // The backend sends the whole turn's board_events up front, ahead of
        // speech, so the data is on the client early. Hold it here rather than
        // painting it — each line is promoted to the board by onBoardUpdate at
        // the exact moment its sentence starts playing.
        onBoardEvents: (events) => {
          console.log(`[BOARD EVENTS BUFFERED] count: ${events.length}`, events);
          if (Array.isArray(events) && events.length > 0) {
            pendingBoardRef.current = [...pendingBoardRef.current, ...events];
          }
        },
        // History after a refresh/reconnect: paint at once, no reveal pacing —
        // the student already watched these lines get written.
        onBoardReplay: (events) => {
          if (Array.isArray(events)) events.forEach(appendBoardEvent);
        },
        onBoardUpdate: (payload: any) => {
          if (!payload) return;
          // Legacy string form — a bare LaTeX line with no event wrapper.
          if (typeof payload === "string") {
            setBoardLatex((prev) => (prev ? `${prev}\n${payload}` : payload));
            return;
          }
          revealBoardEvent(payload);
        },
        // Safety net: a TTS failure means some sentences never played, so their
        // board lines were never revealed. Never leave authored notes unwritten.
        onTurnComplete: () => {
          // Previously only ever cleared on an error path — a successfully
          // completed turn left this stuck `true`, so the "always available"
          // answer input was never actually gated by it.
          setIsStreaming(false);

          if (pendingBoardRef.current.length > 0) {
            console.warn(`[BOARD FLUSH] ${pendingBoardRef.current.length} board events were never reached by audio — flushing at turn end.`);
            const leftovers = pendingBoardRef.current;
            pendingBoardRef.current = [];
            leftovers.forEach(appendBoardEvent);
          }

          // The speech has now finished, so the question the student just heard
          // is the one to put on screen. Applying this at state-frame time
          // showed the options while Drona was still mid-explanation.
          const next = pendingStateRef.current;
          pendingStateRef.current = null;
          if (!next) return;

          if (next.phase) setSessionPhase(next.phase as any);

          if (next.answerResult) {
            setAnswerResult(next.answerResult);
            if (verdictClearTimerRef.current) clearTimeout(verdictClearTimerRef.current);
            verdictClearTimerRef.current = setTimeout(() => setAnswerResult(null), 5000);
          }

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
          handleEndSession();
        },
        // The turn that just got cut off is never reaching its own
        // turn_complete now, so its buffered board lines and pending
        // phase/chips/verdict would otherwise sit here until the NEXT turn's
        // onTurnComplete flushed them on top of whatever that turn is doing.
        onBargeIn: () => {
          pendingBoardRef.current = [];
          pendingStateRef.current = null;
        },
        // A reconnect means whatever turn was streaming died with the old
        // socket — its turn_complete is never coming, and isStreaming was
        // stuck true, leaving the answer box disabled on "Veda is responding…"
        // forever.
        onReconnect: () => {
          setIsStreaming(false);
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
  }, [sessionId, handleEndSession, revealBoardEvent, appendBoardEvent, acceptStudentAnswer]);

  /* ─── RENDER: Session View ─── */
  if (flowState === "session") {
    // Chips belong to a question, nothing else. The old fallback chain could
    // never return empty, so the Ask Sheet stayed mounted through every teaching
    // turn — showing the chapter's SUBTOPIC list as if it were a quiz, and
    // pinning the status to "Waiting for your answer". It also had a hardcoded
    // Physics triple that appeared in Chemistry and Biology lessons.
    // No generic fallback: the backend guarantees real chips for every spoken
    // question, so an awaiting_answer state with no chips is always a broken
    // or transitional state. Inventing "Yes, let's move on / Show me a worked
    // example" over it paired wrong answers with a real content question (the
    // sheet showed the caption as the "question" above chips that answered
    // nothing).
    const effectiveSubtopicOptions =
      sessionPhase === "awaiting_answer" && liveCheckOptions.length > 0
        ? liveCheckOptions
        : [];

    return (
      <div className="min-h-screen flex flex-col bg-ruled-body">
        <Header />
        <main className="flex-1 max-w-[1180px] w-full mx-auto px-0 md:px-6 animate-ml-rise" style={{ paddingTop: 0 }}>
          {/* Board + Transcript + Command Dock */}
          <SessionView
            sessionTopic={sessionTopic}
            tutorName={teacher}
            language={languagePref}
            boardLatex={boardLatex}
            boardEvents={boardEvents}
            transcript={transcript}
            segmentIndex={segmentIndex}
            totalSegments={totalSegments}
            phase={sessionPhase}
            selectedOption={selectedOption}
            questionText={questionText}
            answerResult={answerResult}
            isStreaming={isStreaming}
            voiceState={voiceState}
            subtopicOptions={effectiveSubtopicOptions}
            onSendTurn={handleSendTurn}
            onEndSession={handleEndSession}
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
            tutorName={teacher}
            summaryData={summaryData}
            sessionId={sessionId}
            onReturnToCatalogue={handleReturnToPicker}
            onViewNotes={() => router.push("/notes")}
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
            tutorName={teacher}
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

          {/* Topic pre-check: checking */}
          {topicChecking && (
            <div data-testid="topic-checking" className="flex items-center gap-3 bg-white border border-[rgba(28,26,22,0.12)] rounded-2xl p-4 mb-5">
              <div className="w-5 h-5 border-2 border-[#1C1A16] border-t-transparent rounded-full animate-spin flex-shrink-0" />
              <div>
                <span className="font-bold text-[0.84rem] text-ink">Checking this topic…</span>
                <p className="text-[0.78rem] text-ink-light">Making sure it belongs to this chapter before we begin.</p>
              </div>
            </div>
          )}

          {/* Topic pre-check: belongs to another chapter */}
          {topicVerdict?.status === "other_chapter" && topicVerdict.chapter && (
            <div data-testid="topic-redirect" className="bg-[#FCF4E0] border border-[rgba(238,163,31,0.55)] rounded-2xl p-5 mb-5">
              <span className="block font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-[#9A6A12] mb-2">
                Different chapter
              </span>
              <p className="text-[0.95rem] leading-[1.5] text-ink mb-1">
                {topicVerdict.message}
              </p>
              <p className="text-[0.85rem] text-ink-light mb-4">
                If you&apos;d like, it&apos;s in the {topicVerdict.chapter.name} chapter — I can take you there now.
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  data-testid="topic-redirect-open"
                  onClick={() => openChapterById(topicVerdict.chapter!.id)}
                  className="inline-flex items-center gap-2 font-bold text-[0.88rem] py-[10px] px-4 rounded-full bg-ink text-[#FCFAF4] cursor-pointer hover:-translate-y-[1px] transition-transform"
                >
                  Open {topicVerdict.chapter.name}
                  <svg viewBox="0 0 16 16" width={13} height={13} fill="none">
                    <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={() => setTopicVerdict(null)}
                  className="font-semibold text-[0.86rem] py-[10px] px-4 rounded-full border border-[rgba(28,26,22,0.16)] bg-white text-ink cursor-pointer hover:border-ink transition-colors"
                >
                  Stay here
                </button>
              </div>
            </div>
          )}

          {/* Topic pre-check: outside the syllabus */}
          {topicVerdict?.status === "out_of_syllabus" && (
            <div data-testid="topic-rejected" className="bg-[#FBEAE7] border border-[rgba(221,68,51,0.45)] rounded-2xl p-5 mb-5">
              <span className="block font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-[#8E2317] mb-2">
                Not in the syllabus
              </span>
              <p className="text-[0.95rem] leading-[1.5] text-ink mb-3">{topicVerdict.message}</p>
              <button
                onClick={() => setTopicVerdict(null)}
                className="font-semibold text-[0.86rem] py-[10px] px-4 rounded-full border border-[rgba(28,26,22,0.16)] bg-white text-ink cursor-pointer hover:border-ink transition-colors"
              >
                Pick something else
              </button>
            </div>
          )}

          {/* Preparing banner */}
          {!scopingPlanReady && !topicChecking && !topicVerdict && (
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
        {/* Resume banner: a refresh/crash mid-lesson used to lose the class
            entirely even though it was still live server-side. */}
        {resumable && (
          <div className="flex items-center justify-between gap-3 flex-wrap bg-white border-[1.5px] border-ink rounded-[14px] py-3 px-4 mb-5 shadow-[0_12px_28px_-22px_rgba(28,26,22,0.5)]">
            <span className="text-[0.95rem] text-ink">
              <b>Class in progress:</b> {resumable.topic} — pick up where you left off?
            </span>
            <span className="flex items-center gap-2">
              <button
                type="button"
                data-testid="resume-session"
                onClick={() => {
                  const r = resumable;
                  if (!r) return;
                  setResumable(null);
                  rememberActiveSession(r.id, r.topic);
                  resetSessionPlaybackState();
                  setBoardLatex("");
                  setTranscript([]);
                  setSessionTopic(r.topic);
                  setSessionPhase("teaching");
                  setSessionId(r.id);
                  setFlowState("session");
                }}
                className="font-bold text-[0.84rem] py-1.5 px-4 rounded-full bg-[#1C1A16] text-white hover:bg-[#2C2A26] transition-colors cursor-pointer"
              >
                Resume class
              </button>
              <button
                type="button"
                onClick={forgetActiveSession}
                className="font-bold text-[0.84rem] py-1.5 px-3.5 rounded-full border-[1.4px] border-[rgba(28,26,22,0.16)] text-ink hover:border-[#1C1A16] transition-colors cursor-pointer"
              >
                Dismiss
              </button>
            </span>
          </div>
        )}

        {/* Title + persona / language controls */}
        <div className="flex items-end justify-between gap-4 flex-wrap mb-5">
          <div>
            <h1 className="text-[2.3rem] leading-[1.05] tracking-[-0.025em] font-medium text-ink">
              {getLearnWithLabel(voicePref)}
            </h1>
            <p className="text-ink-light text-base mt-1.5">
              What should we work on today?
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Teacher toggle — Veda (female voice) / Drona (male voice) */}
            <label className="flex flex-col gap-1.5">
              <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-[#9C988C]">
                Teacher
              </span>
              <span className="inline-flex gap-[3px] p-[3px] bg-[rgba(28,26,22,0.055)] rounded-full">
                {(["female", "male"] as TutorVoice[]).map((voice) => (
                  <button
                    key={voice}
                    type="button"
                    data-testid={`voice-${voice}`}
                    aria-pressed={voicePref === voice}
                    onClick={() => handleVoiceChange(voice)}
                    className={`text-[0.82rem] px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                      voicePref === voice
                        ? "font-bold bg-white text-ink shadow-xs"
                        : "font-semibold text-ink-light hover:text-ink"
                    }`}
                  >
                    {getTutorName(voice)}
                  </button>
                ))}
              </span>
            </label>

            {/* Language toggle — drives the tutor's spoken language */}
            <label className="flex flex-col gap-1.5">
              <span className="font-extrabold text-[0.62rem] tracking-[0.14em] uppercase text-[#9C988C]">
                Language
              </span>
              <span className="inline-flex gap-[3px] p-[3px] bg-[rgba(28,26,22,0.055)] rounded-full">
                {(["hinglish", "english"] as SessionLanguage[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    data-testid={`lang-${lang}`}
                    aria-pressed={languagePref === lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`text-[0.82rem] px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                      languagePref === lang
                        ? "font-bold bg-white text-ink shadow-xs"
                        : "font-semibold text-ink-light hover:text-ink"
                    }`}
                  >
                    {getLanguageLabel(lang)}
                  </button>
                ))}
              </span>
            </label>
          </div>
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
