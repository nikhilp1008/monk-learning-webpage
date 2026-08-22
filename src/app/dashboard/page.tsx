import { createClient } from "@/lib/supabase/server";
import { DashboardClient } from "./DashboardClient";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";
import {
  normalizeTrack,
  pickOrdinal,
  pickSubject,
  type DotdSubject,
} from "@/lib/dotd";

export const dynamic = "force-dynamic";

type DoubtOfDay = {
  id: string;
  subject: string;
  concept: string;
  questionText: string;
} | null;

// Doubt of the day: a pure function of (user, IST calendar day) over the
// curated `doubt_of_the_day` pool -- see src/lib/dotd.ts for why the pick is
// deterministic rather than random, and how the rotation avoids repeats.
//
// This used to read `questions` by day-of-year, which served an ordinary
// practice question, identical for every student, regardless of their exam.
async function loadDoubtOfDay(
  supabase: SupabaseClient<Database>,
  userId: string | null,
  targetExam: string | null
): Promise<DoubtOfDay> {
  try {
    // Signed-out visitors see the shared default rather than a personal
    // rotation; any stable string works as the seed.
    const seed = userId || "anonymous";
    const subject: DotdSubject = pickSubject(seed, normalizeTrack(targetExam));

    const { count } = await supabase
      .from("doubt_of_the_day")
      .select("*", { count: "exact", head: true })
      .eq("subject", subject)
      .eq("active", true);

    if (!count || count <= 0) return null;

    const ordinal = pickOrdinal(seed, subject, count);
    const columns = "id, subject, concept, question_text";

    let { data: picked } = await supabase
      .from("doubt_of_the_day")
      .select(columns)
      .eq("subject", subject)
      .eq("active", true)
      .eq("subject_ordinal", ordinal)
      .limit(1);

    // Ordinals are dense as seeded, but deactivating a row leaves a hole that
    // makes the direct lookup miss. Fall back to position within whatever
    // rows are actually live so the card never goes blank over a gap.
    if (!picked?.length) {
      ({ data: picked } = await supabase
        .from("doubt_of_the_day")
        .select(columns)
        .eq("subject", subject)
        .eq("active", true)
        .order("subject_ordinal", { ascending: true })
        .range(ordinal - 1, ordinal - 1));
    }

    const row = picked?.[0];
    if (!row?.question_text) return null;

    return {
      id: row.id,
      subject: row.subject || "General",
      concept: row.concept || "Concept",
      questionText: row.question_text,
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
  // last, before the dashboard could render anything. Fetching the
  // independent branches together collapses that chain down to whichever
  // single branch is slowest, instead of paying for all of them back to back.
  //
  // The doubt branch is the one genuine dependency: which subject to draw
  // from is decided by the student's exam track, so it has to wait for the
  // profile. It is chained off that same promise rather than awaited
  // separately, so it still overlaps with the practice/progress branch
  // instead of adding a third leg to the critical path.
  const profilePromise = user
    ? supabase.from("profiles").select("*").eq("id", user.id).maybeSingle()
    : Promise.resolve({ data: null });

  const [profileResult, doubtOfDay, practiceAndProgress] = await Promise.all([
    profilePromise,
    profilePromise.then((res) =>
      loadDoubtOfDay(supabase, user?.id ?? null, res.data?.target_exam ?? null)
    ),
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
