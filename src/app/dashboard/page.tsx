import { createClient } from "@/lib/supabase/server";
import { DashboardClient } from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;

  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();
    profile = data;
  }

  // Fallback profile if unauthenticated or testing
  const activeProfile = profile || {
    id: "test-id",
    display_name: "balayya",
    target_exam: "JEE",
    enrolled_class: 11,
    teaching_language: "hinglish",
    created_at: null,
  };

  let questionsPracticedCount = 0;
  let chaptersStartedCount = 0;

  if (user) {
    const { count } = await supabase
      .from("practice_attempts")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);
    questionsPracticedCount = count || 0;

    const { data: progressRows } = await supabase
      .from("lesson_progress")
      .select("lesson_section_id, updated_at")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });

    if (progressRows && progressRows.length > 0) {
      const sectionIds = progressRows
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
    }
  }

  return (
    <DashboardClient
      profile={activeProfile}
      questionsPracticed={questionsPracticedCount}
      chaptersStarted={chaptersStartedCount}
      resumeSession={null}
    />
  );
}
