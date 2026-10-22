import { apiFetch } from "@/lib/api";

/**
 * Mock exams -- web client for the same /mock/* endpoints the phone app uses
 * (monk-learning-mobile lib/mock.ts + lib/mock-report.ts). Ported, not
 * redesigned: the server owns the paper, the clock and the marking.
 *
 * Differences from the phone, all because a browser tab is not a phone:
 *  - The in-progress answers live in localStorage, keyed by run id, and are
 *    laid back onto the server's paper (GET /mock/active) after a refresh.
 *  - A finished paper is never cached here. GET /mock/{id}/review rebuilds
 *    it on any device, so the report is always read from the server.
 */

export type ExamKey = "jee" | "neet";
export type QuestionType =
  | "single_correct"
  | "numerical"
  | "assertion_reason"
  | "match_the_following";

export interface DiagramFigure {
  url: string;
  form?: string;
}

export interface MockQuestion {
  question_num: number;
  id: string;
  subject: string;
  question_type: QuestionType;
  question_text: string;
  options: Record<string, string> | null;
  image_url: string | null;
  diagram: DiagramFigure[] | null;
}

export interface MockPaper {
  mock_run_id: string;
  exam: ExamKey;
  duration_minutes: number;
  marks_correct: number;
  marks_wrong: number;
  total_questions: number;
  max_marks: number;
  sections: { subject: string; questions: number }[];
  questions: MockQuestion[];
  /** The server's clock for this paper. A resumed paper runs against this. */
  seconds_left?: number;
  /** Only on GET /mock/active: the deadline passed while the tab was away. */
  expired?: boolean;
}

export interface MockSubjectScore {
  correct: number;
  wrong: number;
  unanswered: number;
  marks: number;
}

export interface MockLock {
  code: "mock_locked";
  exam: string;
  threshold: number;
  unique_correct: number;
  credits_earned: number;
  mocks_used: number;
  credits_available: number;
  correct_to_next: number;
}

export interface MockStatus {
  exam: string;
  threshold: number;
  unique_correct: number;
  credits_earned: number;
  mocks_used: number;
  credits_available: number;
  correct_to_next: number;
  active_paper?: {
    mock_run_id: string;
    deadline: string;
    seconds_left: number;
    expired: boolean;
  } | null;
}

export interface MockRunRow {
  id: string;
  exam: ExamKey;
  status: "in_progress" | "submitted" | "abandoned";
  created_at: string;
  submitted_at: string | null;
  score: {
    correct: number;
    wrong: number;
    unanswered: number;
    total_marks: number;
    max_marks: number;
    per_subject: Record<string, MockSubjectScore>;
  } | null;
}

export interface MockReportQuestion {
  id: string;
  num: number;
  subject: string;
  type: QuestionType;
  stem: string;
  options: Record<string, string> | null;
  diagram?: DiagramFigure[] | null;
  chosen_option: string | null;
  chosen_value: number | null;
  correct_option: string | null;
  correct_value: number | null;
  answered: boolean;
  is_correct: boolean;
  marked: boolean;
  elapsed_ms: number;
  solution: unknown;
  chapter_id?: string | null;
  chapter_name?: string | null;
}

export interface MockReport {
  run_id: string;
  exam: ExamKey;
  submitted_at: string;
  duration_minutes: number;
  marks_correct: number;
  marks_wrong: number;
  max_marks: number;
  total_marks: number;
  correct: number;
  wrong: number;
  unanswered: number;
  per_subject: Record<string, MockSubjectScore>;
  questions: MockReportQuestion[];
}

/* ── API ────────────────────────────────────────────────────────────── */

export function createMockPaper(exam: ExamKey): Promise<MockPaper> {
  return apiFetch("/mock/paper", {
    method: "POST",
    body: JSON.stringify({ exam }),
  });
}

export function getMockStatus(exam: ExamKey): Promise<MockStatus> {
  return apiFetch(`/mock/status?exam=${encodeURIComponent(exam)}`);
}

export async function listMockRuns(): Promise<MockRunRow[]> {
  const data = await apiFetch<{ runs?: MockRunRow[] }>("/mock/runs");
  return data.runs ?? [];
}

export function getActivePaper(exam: ExamKey): Promise<{ paper: MockPaper | null }> {
  return apiFetch(`/mock/active?exam=${encodeURIComponent(exam)}`);
}

export function fetchReport(runId: string): Promise<MockReport> {
  return apiFetch(`/mock/${encodeURIComponent(runId)}/review`);
}

export interface MockAnswerPayload {
  question_id: string;
  chosen_option?: string;
  chosen_value?: number;
}

export function submitMockPaper(
  runId: string,
  answers: MockAnswerPayload[],
  extra: { marked?: string[]; elapsed_ms?: Record<string, number> } = {}
): Promise<unknown> {
  return apiFetch(`/mock/${encodeURIComponent(runId)}/submit`, {
    method: "POST",
    body: JSON.stringify({ answers, ...extra }),
  });
}

/** POST /mock/paper answers 403 with a body, not a string, when the student
 *  has not earned a paper yet. apiFetch keeps that body on `data`. */
export function mockLockFrom(err: unknown): MockLock | null {
  const detail = (err as { data?: { detail?: unknown } } | null)?.data?.detail;
  if (!detail || typeof detail !== "object") return null;
  return (detail as Partial<MockLock>).code === "mock_locked"
    ? (detail as MockLock)
    : null;
}

/** Practice answers into the batch toward the next paper, 0..threshold. */
export function earnedTowardNext(
  s: Pick<MockStatus, "threshold" | "correct_to_next">
): number {
  return Math.max(0, Math.min(s.threshold, s.threshold - s.correct_to_next));
}

/** The student's exam as a mock exam. A "both" student sits the JEE pattern. */
export function examFromTarget(target: string | null | undefined): ExamKey {
  return (target ?? "").toLowerCase().includes("neet") &&
    !(target ?? "").toLowerCase().includes("jee")
    ? "neet"
    : "jee";
}

/* ── In-progress paper (browser storage) ───────────────────────────── */

export interface MockAnswerDraft {
  option?: string;
  /** Raw typed text until submit so the input never fights its parsing. */
  value?: string;
}

export interface StoredProgress {
  run_id: string;
  answers: [string, MockAnswerDraft][];
  marked: string[];
  index: number;
  elapsed: [string, number][];
}

const PROGRESS_KEY = "ml:mock:progress:";

export function loadProgress(runId: string): StoredProgress | null {
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY + runId);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredProgress;
    return parsed.run_id === runId ? parsed : null;
  } catch {
    return null;
  }
}

export function saveProgress(p: StoredProgress): void {
  try {
    window.localStorage.setItem(PROGRESS_KEY + p.run_id, JSON.stringify(p));
  } catch {
    // Storage full or blocked: the paper still works, it just won't survive
    // a refresh.
  }
}

export function forgetProgress(runId: string): void {
  try {
    window.localStorage.removeItem(PROGRESS_KEY + runId);
  } catch {
    // nothing to do
  }
}

/** Only questions with something actually entered. An unparseable numerical
 *  entry counts as unanswered, not as a wrong guess the student never made. */
export function answersPayload(
  paper: MockPaper,
  answers: Map<string, MockAnswerDraft>
): MockAnswerPayload[] {
  const out: MockAnswerPayload[] = [];
  for (const q of paper.questions) {
    const draft = answers.get(q.id);
    if (!draft) continue;
    if (q.question_type === "numerical") {
      const parsed = parseFloat((draft.value ?? "").trim());
      if (!Number.isNaN(parsed)) out.push({ question_id: q.id, chosen_value: parsed });
    } else if (draft.option) {
      out.push({ question_id: q.id, chosen_option: draft.option });
    }
  }
  return out;
}

export function isAnswered(q: MockQuestion, draft: MockAnswerDraft | undefined): boolean {
  if (!draft) return false;
  if (q.question_type === "numerical") {
    return !Number.isNaN(parseFloat((draft.value ?? "").trim()));
  }
  return !!draft.option;
}

/* ── Report insights (ported from the phone's mockInsights) ─────────── */

export interface SubjectStanding {
  subject: string;
  correct: number;
  wrong: number;
  unanswered: number;
  marks: number;
  accuracy: number | null;
  timeMs: number;
  medianMs: number | null;
}

export interface ChapterStanding {
  chapterId: string;
  name: string;
  subject: string;
  questions: number;
  correct: number;
  wrong: number;
  skipped: number;
  lost: number;
}

export interface MockInsights {
  subjects: SubjectStanding[];
  /** Chapters with at least one WRONG answer, worst first. A skip alone does
   *  not qualify: it says time or nerve ran out, not that the chapter won. */
  weakChapters: ChapterStanding[];
  strongest: SubjectStanding | null;
  weakest: SubjectStanding | null;
  lostToWrong: number;
  leftOnTable: number;
  attempted: number;
  timeMs: number;
  medianMs: number | null;
}

function median(values: number[]): number | null {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

export function mockInsights(report: MockReport): MockInsights {
  const bySubject = new Map<string, MockReportQuestion[]>();
  for (const q of report.questions) {
    const list = bySubject.get(q.subject);
    if (list) list.push(q);
    else bySubject.set(q.subject, [q]);
  }

  const subjects: SubjectStanding[] = [...bySubject.entries()].map(([subject, list]) => {
    const attempted = list.filter((q) => q.answered);
    const correct = list.filter((q) => q.is_correct).length;
    const wrong = attempted.length - correct;
    const score = report.per_subject[subject];
    return {
      subject,
      correct: score?.correct ?? correct,
      wrong: score?.wrong ?? wrong,
      unanswered: score?.unanswered ?? list.length - attempted.length,
      marks: score?.marks ?? correct * report.marks_correct + wrong * report.marks_wrong,
      accuracy: attempted.length ? correct / attempted.length : null,
      timeMs: list.reduce((sum, q) => sum + q.elapsed_ms, 0),
      medianMs: median(attempted.map((q) => q.elapsed_ms)),
    };
  });

  // Ranked on accuracy, not marks: a subject with 40 blanks can outscore one
  // the student was better at, and "strongest" would name the one reached first.
  const ranked = subjects
    .filter((s) => s.accuracy !== null)
    .sort((a, b) => (b.accuracy ?? 0) - (a.accuracy ?? 0));

  const attempted = report.questions.filter((q) => q.answered);

  const byChapter = new Map<string, ChapterStanding>();
  for (const q of report.questions) {
    if (!q.chapter_id || !q.chapter_name) continue;
    const c = byChapter.get(q.chapter_id) ?? {
      chapterId: q.chapter_id,
      name: q.chapter_name,
      subject: q.subject,
      questions: 0,
      correct: 0,
      wrong: 0,
      skipped: 0,
      lost: 0,
    };
    c.questions += 1;
    if (!q.answered) c.skipped += 1;
    else if (q.is_correct) c.correct += 1;
    else c.wrong += 1;
    byChapter.set(q.chapter_id, c);
  }
  for (const c of byChapter.values()) {
    const scored = c.correct * report.marks_correct + c.wrong * report.marks_wrong;
    c.lost = c.questions * report.marks_correct - scored;
  }
  const accuracy = (c: ChapterStanding) => c.correct / Math.max(1, c.correct + c.wrong);
  const weakChapters = [...byChapter.values()]
    .filter((c) => c.wrong > 0)
    .sort((a, b) => b.wrong - a.wrong || accuracy(a) - accuracy(b) || b.lost - a.lost);

  const hasGap =
    ranked.length > 1 &&
    (ranked[0].accuracy ?? 0) > (ranked[ranked.length - 1].accuracy ?? 0);

  return {
    subjects,
    weakChapters,
    strongest: hasGap ? ranked[0] : null,
    weakest: hasGap ? ranked[ranked.length - 1] : null,
    lostToWrong: Math.abs(report.wrong * report.marks_wrong),
    leftOnTable: report.unanswered * report.marks_correct,
    attempted: attempted.length,
    timeMs: report.questions.reduce((sum, q) => sum + q.elapsed_ms, 0),
    medianMs: median(attempted.map((q) => q.elapsed_ms)),
  };
}

/* ── Formatting ─────────────────────────────────────────────────────── */

/** "1h 48m", "4m 20s", "38s". */
export function formatSpan(ms: number): string {
  const total = Math.max(0, Math.round(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h) return `${h}h ${m}m`;
  if (m) return `${m}m ${s}s`;
  return `${s}s`;
}

/** "1:48:05" / "04:20" for the countdown. */
export function formatClock(totalSeconds: number): string {
  const t = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "24 Sep", and "24 Sep 2025" once the year is not this one. */
export function formatDay(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const stem = `${d.getDate()} ${MONTHS[d.getMonth()]}`;
  return d.getFullYear() === new Date().getFullYear() ? stem : `${stem} ${d.getFullYear()}`;
}

export function subjectLabel(subject: string): string {
  const s = subject.toLowerCase();
  if (s === "mathematics" || s === "maths") return "Maths";
  return s.charAt(0).toUpperCase() + s.slice(1);
}
