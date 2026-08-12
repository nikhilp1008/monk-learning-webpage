import { createClient } from "@/lib/supabase/server";
import { DashboardClient } from "./DashboardClient";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";

export const dynamic = "force-dynamic";

function dayOfYear() {
  const now = new Date();
  return Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
  );
}

type DoubtOfDay = {
  subject: string;
  concept: string;
  questionText: string;
  chapterId: string | null;
} | null;

// Doubt of the day: deterministic pick from `questions`, changes once per
// calendar day. Independent of `user`, so it doesn't need to wait on
// anything else this page fetches.
async function loadDoubtOfDay(
  supabase: SupabaseClient<Database>
): Promise<DoubtOfDay> {
  try {
    const { count } = await supabase
      .from("questions")
      .select("*", { count: "exact", head: true })
      .not("question_text", "is", null);

    if (!count || count <= 0) return null;

    const offset = dayOfYear() % count;
    const { data: picked } = await supabase
      .from("questions")
      .select("subject, concept, question_text, chapter_id")
      .not("question_text", "is", null)
      .order("id", { ascending: true })
      .range(offset, offset);

    const row = picked?.[0];
    if (!row?.question_text) return null;

    return {
      subject: row.subject || "General",
      concept: row.concept || "Concept",
      questionText: row.question_text,
      chapterId: row.chapter_id,
    };
  } catch (err) {
    console.error("Failed to load doubt of the day:", err);
    return null;
  }
}

async function loadPracticeAndProgress(
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<{ questionsPracticedCount: number; chaptersStartedCount: number }> {
  // These two don't depend on each other -- fire together instead of
  // waiting for the count before even starting the progress query.
  const [practiceResult, progressResult] = await Promise.all([
    supabase
      .from("practice_attempts")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId),
    supabase
      .from("lesson_progress")
      .select("lesson_section_id, updated_at")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false }),
  ]);

  const questionsPracticedCount = practiceResult.count || 0;
  const progressRows = progressResult.data;

  let chaptersStartedCount = 0;
  const sectionIds = (progressRows || [])
    .map((p) => p.lesson_section_id)
    .filter((id): id is string => Boolean(id));

  if (sectionIds.length > 0) {
    const { data: sectionRows } = await supabase
      .from("lesson_sections")
      .select("chapter_id")
      .in("id", sectionIds);

    if (sectionRows) {
      const uniqueChapterIds = new Set(
        sectionRows
          .map((s) => s.chapter_id)
          .filter((id): id is string => Boolean(id))
      );
      chaptersStartedCount = uniqueChapterIds.size;
    }
  }

  return { questionsPracticedCount, chaptersStartedCount };
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Previously this was up to 7 SEQUENTIAL round trips to Supabase
  // (getUser -> profile -> questions count -> questions range -> practice
  // count -> lesson_progress -> lesson_sections), each one waiting on the
  // last, before the dashboard could render anything. The three pieces of
  // data below don't actually depend on each other -- only on `user` -- so
  // fetching them with Promise.all collapses that chain down to whichever
  // single branch is slowest, run once, instead of paying for all of them
  // back to back on every dashboard visit.
  const [profileResult, doubtOfDay, practiceAndProgress] = await Promise.all([
    user
      ? supabase.from("profiles").select("*").eq("id", user.id).maybeSingle()
      : Promise.resolve({ data: null }),
    loadDoubtOfDay(supabase),
    user
      ? loadPracticeAndProgress(supabase, user.id)
      : Promise.resolve({ questionsPracticedCount: 0, chaptersStartedCount: 0 }),
  ]);

  // Fallback profile if unauthenticated or testing
  const activeProfile = profileResult.data || {
    id: "test-id",
    display_name: "balayya",
    target_exam: "JEE",
    enrolled_class: 11,
    teaching_language: "hinglish",
    created_at: null,
    teacher_voice: "drona",
    read_equations_aloud: true,
    allow_interrupt: true,
    daily_reminder: true,
    notify_new_content: true,
    notify_product_updates: false,
  };

  return (
    <DashboardClient
      profile={activeProfile}
      questionsPracticed={practiceAndProgress.questionsPracticedCount}
      chaptersStarted={practiceAndProgress.chaptersStartedCount}
      resumeSession={null}
      doubtOfDay={doubtOfDay}
    />
  );
}
