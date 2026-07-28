import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardClient } from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();

  // 1. Authenticate user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 2. Fetch student profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    redirect("/onboarding");
  }

  // 3. Stat Card 1: Questions practised count (head: true)
  const { count: questionsPracticedCount } = await supabase
    .from("practice_attempts")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  // 4. Fetch user's lesson_progress rows to calculate chapters started & resume session
  const { data: progressRows } = await supabase
    .from("lesson_progress")
    .select("lesson_section_id, updated_at")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  let chaptersStartedCount = 0;
  let resumeSessionData = null;

  if (progressRows && progressRows.length > 0) {
    const sectionIds = progressRows
      .map((p) => p.lesson_section_id)
      .filter((id): id is string => Boolean(id));

    if (sectionIds.length > 0) {
      const { data: sectionRows } = await supabase
        .from("lesson_sections")
        .select("id, chapter_id, title, position")
        .in("id", sectionIds);

      if (sectionRows && sectionRows.length > 0) {
        // Map section ID to section row
        const sectionMap = new Map(sectionRows.map((s) => [s.id, s]));

        // Calculate unique chapter_ids
        const uniqueChapterIds = new Set(
          sectionRows
            .map((s) => s.chapter_id)
            .filter((id): id is string => Boolean(id))
        );
        chaptersStartedCount = uniqueChapterIds.size;

        // Find most recent progress row with a valid section
        const recentProgress = progressRows.find(
          (p) => p.lesson_section_id && sectionMap.has(p.lesson_section_id)
        );

        if (recentProgress && recentProgress.lesson_section_id) {
          const recentSection = sectionMap.get(recentProgress.lesson_section_id)!;

          if (recentSection.chapter_id) {
            const { data: chapterRow } = await supabase
              .from("chapters")
              .select("name")
              .eq("id", recentSection.chapter_id)
              .maybeSingle();

            resumeSessionData = {
              chapterId: recentSection.chapter_id,
              chapterName: chapterRow?.name || "Chapter",
              sectionTitle: recentSection.title || `Part ${recentSection.position || 1}`,
              position: recentSection.position || 1,
            };
          }
        }
      }
    }
  }

  return (
    <DashboardClient
      profile={profile}
      questionsPracticed={questionsPracticedCount || 0}
      chaptersStarted={chaptersStartedCount}
      resumeSession={resumeSessionData}
    />
  );
}
