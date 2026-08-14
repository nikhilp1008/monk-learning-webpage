import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tgbknrmnjwiokraddurx.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_x_sJn5Q4j3f7GFESXK21wg_Ab2o5sV1";

const supabase = createClient(url, key);

async function main() {
  const chapterId = 'cf605dc6-faed-5c33-8107-81114cbfef79'; // Class 12 Ch01

  const { data: sections, error: secErr } = await supabase
    .from("lesson_sections")
    .select("id, chapter_id, position, title, board_reveal_at_english, board_reveal_at_hinglish")
    .eq("chapter_id", chapterId)
    .in("position", [3, 4])
    .order("position", { ascending: true });

  if (secErr) {
    console.error("Error fetching sections 3 & 4:", secErr);
    return;
  }

  sections.forEach(s => {
    console.log(`\n--- Position ${s.position}: ${s.title} ---`);
    console.log("en reveals:", JSON.stringify(s.board_reveal_at_english));
    console.log("hi reveals:", JSON.stringify(s.board_reveal_at_hinglish));
  });
}

main().catch(console.error);
