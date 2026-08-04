"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  SubjectGroup,
  StartSessionResponse,
  ScopeSessionResponse,
  EndSessionResponse,
  TranscriptEntry,
} from "@/lib/drona/types";
import {
  fetchCatalogue,
  startSession,
  scopeSession,
  streamTurn,
  endSession,
} from "@/lib/drona/client";
import { CatalogueView } from "@/components/drona/CatalogueView";
import { ScopingView } from "@/components/drona/ScopingView";
import { SessionView } from "@/components/drona/SessionView";
import { EndStatesView } from "@/components/drona/EndStatesView";

type ViewMode = "loading" | "catalogue" | "scoping" | "session" | "end";

export default function DronaPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("loading");
  const [catalogue, setCatalogue] = useState<SubjectGroup[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<"english" | "hinglish">("hinglish");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Session State
  const [sessionId, setSessionId] = useState<string>("");
  const [scopingSpeech, setScopingSpeech] = useState<string>("");
  const [scopingOptions, setScopingOptions] = useState<string[]>([]);
  const [planReady, setPlanReady] = useState<boolean>(true);

  // Live Session View State
  const [boardLatex, setBoardLatex] = useState<string>("");
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [segmentIndex, setSegmentIndex] = useState<number>(1);
  const [totalSegments, setTotalSegments] = useState<number>(5);
  const [phase, setPhase] = useState<"teaching" | "awaiting_answer" | "wrapup" | "complete">("teaching");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  // End View State
  const [endType, setEndType] = useState<"normal" | "session_ended" | "error">("normal");
  const [summaryData, setSummaryData] = useState<EndSessionResponse | null>(null);

  // AbortController per turn (Rule §4)
  const abortControllerRef = useRef<AbortController | null>(null);

  // Load Catalogue on Mount
  useEffect(() => {
    loadCatalogueData();
  }, []);

  const loadCatalogueData = async () => {
    try {
      setViewMode("loading");
      const data = await fetchCatalogue();
      setCatalogue(data);
      setViewMode("catalogue");
    } catch (err: unknown) {
      console.error("Failed to load catalogue:", err);
      setErrorMsg(err instanceof Error ? err.message : "Failed to load catalogue");
      setEndType("error");
      setViewMode("end");
    }
  };

  const handleSelectChapter = async (chapterId: string, chapterName: string) => {
    try {
      setViewMode("loading");
      const res: StartSessionResponse = await startSession(chapterId, selectedLanguage);
      setSessionId(res.session_id);
      setScopingSpeech(res.speech);
      setPlanReady(true);
      setViewMode("scoping");
    } catch (err: unknown) {
      console.error("Start session failed:", err);
      setErrorMsg(err instanceof Error ? err.message : "Failed to start session");
      setEndType("error");
      setViewMode("end");
    }
  };

  const handleCustomTopic = async (topicText: string) => {
    try {
      setViewMode("loading");
      const res: StartSessionResponse = await startSession(topicText, selectedLanguage);
      setSessionId(res.session_id);
      setScopingSpeech(res.speech);
      setPlanReady(true);
      setViewMode("scoping");
    } catch (err: unknown) {
      console.error("Custom topic start failed:", err);
      setErrorMsg(err instanceof Error ? err.message : "Failed to start custom topic session");
      setEndType("error");
      setViewMode("end");
    }
  };

  const handleSendScope = async (utterance: string) => {
    try {
      setPlanReady(false);
      const res: ScopeSessionResponse = await scopeSession(sessionId, utterance);
      setPlanReady(res.plan_ready);

      if (res.options) {
        setScopingOptions(res.options);
      }

      if (res.phase === "teaching") {
        // Transition into Live Session!
        setPhase("teaching");
        const initialDronaEntry: TranscriptEntry = {
          id: `msg-${Date.now()}`,
          sender: "drona",
          text: res.speech,
          timestamp: new Date(),
        };
        setTranscript([initialDronaEntry]);
        setViewMode("session");

        // Trigger first turn stream to start lesson segment!
        triggerTurnStream(sessionId, null, "answer");
      } else {
        setScopingSpeech(res.speech);
      }
    } catch (err: unknown) {
      console.error("Scope request failed:", err);
      setErrorMsg(err instanceof Error ? err.message : "Scoping request failed");
      setEndType("error");
      setViewMode("end");
    }
  };

  const triggerTurnStream = async (
    sId: string,
    studentUtterance: string | null,
    turnType: "answer" | "interruption" | "no_response"
  ) => {
    // Abort existing turn if running (Rule §4)
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsStreaming(true);

    // Append student utterance to transcript if provided
    if (studentUtterance) {
      const studentEntry: TranscriptEntry = {
        id: `stu-${Date.now()}`,
        sender: "student",
        text: studentUtterance,
        timestamp: new Date(),
      };
      setTranscript((prev) => [...prev, studentEntry]);
    }

    // Create placeholder Drona transcript entry
    const dronaEntryId = `dro-${Date.now()}`;
    const dronaEntry: TranscriptEntry = {
      id: dronaEntryId,
      sender: "drona",
      text: "",
      timestamp: new Date(),
    };

    setTranscript((prev) => [...prev, dronaEntry]);

    let accumulatedSpeech = "";

    await streamTurn(
      sId,
      {
        utterance: studentUtterance,
        turn_type: turnType,
        playback_cutoff_point: null,
      },
      {
        onSpeech: (delta: string) => {
          accumulatedSpeech += delta;
          setTranscript((prev) =>
            prev.map((item) =>
              item.id === dronaEntryId
                ? { ...item, text: accumulatedSpeech }
                : item
            )
          );
        },
        onBoard: (latex: string) => {
          // Rule F3: Board content REPLACES, never appends!
          if (latex !== "") {
            setBoardLatex(latex);
          }
        },
        onMeta: (meta) => {
          setSegmentIndex(meta.segment_index);
          setTotalSegments(meta.total_segments);
        },
        onState: async (state) => {
          if (state.phase) {
            setPhase(state.phase);
          }

          // Quiet End State (reason: "session_ended")
          if (state.reason === "session_ended") {
            setIsStreaming(false);
            setEndType("session_ended");
            setViewMode("end");
            return;
          }

          // Normal Session Completion
          if (state.phase === "complete") {
            setIsStreaming(false);
            try {
              const endRes = await endSession(sId);
              setSummaryData(endRes);
              setEndType("normal");
            } catch {
              setEndType("session_ended");
            }
            setViewMode("end");
          }
        },
        onError: (err) => {
          setIsStreaming(false);
          setErrorMsg(err.message);
          setEndType("error");
          setViewMode("end");
        },
        onDone: () => {
          setIsStreaming(false);
          // Drop empty placeholder entry if turn yielded no speech (Rule §4)
          if (!accumulatedSpeech.trim()) {
            setTranscript((prev) =>
              prev.filter((item) => item.id !== dronaEntryId)
            );
          }
        },
      },
      controller.signal
    );
  };

  const handleSendTurn = (utterance: string) => {
    triggerTurnStream(sessionId, utterance, "answer");
  };

  const handleReturnToCatalogue = () => {
    setSessionId("");
    setBoardLatex("");
    setTranscript([]);
    setEndType("normal");
    setSummaryData(null);
    loadCatalogueData();
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col">
      {/* Loading Spinner View */}
      {viewMode === "loading" && (
        <div className="flex-1 flex flex-col items-center justify-center py-20 space-y-3">
          <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
            Connecting to Drona...
          </span>
        </div>
      )}

      {/* Catalogue View */}
      {viewMode === "catalogue" && (
        <CatalogueView
          catalogue={catalogue}
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          onSelectChapter={handleSelectChapter}
          onCustomTopic={handleCustomTopic}
        />
      )}

      {/* Scoping View */}
      {viewMode === "scoping" && (
        <ScopingView
          initialSpeech={scopingSpeech}
          options={scopingOptions}
          planReady={planReady}
          onSendScope={handleSendScope}
        />
      )}

      {/* Live Session View */}
      {viewMode === "session" && (
        <div className="flex-1 h-[calc(100vh-60px)]">
          <SessionView
            boardLatex={boardLatex}
            transcript={transcript}
            segmentIndex={segmentIndex}
            totalSegments={totalSegments}
            phase={phase}
            isStreaming={isStreaming}
            onSendTurn={handleSendTurn}
          />
        </div>
      )}

      {/* End States View */}
      {viewMode === "end" && (
        <EndStatesView
          type={endType}
          summaryData={summaryData}
          errorMessage={errorMsg}
          onReturnToCatalogue={handleReturnToCatalogue}
          onRetry={loadCatalogueData}
        />
      )}
    </div>
  );
}
