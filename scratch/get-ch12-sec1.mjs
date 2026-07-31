import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tgbknrmnjwiokraddurx.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_x_sJn5Q4j3f7GFESXK21wg_Ab2o5sV1";

const supabase = createClient(url, key);

async function main() {
  const chapterId = 'cf605dc6-faed-5c33-8107-81114cbfef79';

  const { data: sections, error: secErr } = await supabase
    .from("lesson_sections")
    .select("id, chapter_id, position, title, board_reveal_at_english, board_reveal_at_hinglish")
    .eq("chapter_id", chapterId)
    .order("position", { ascending: true });

  if (secErr) {
    console.error("Error fetching sections:", secErr);
    return;
  }

  console.log("Found sections count:", sections?.length);
  const sec1 = sections?.[0];
  console.log("Section 1 DB record:\n", JSON.stringify(sec1, null, 2));

  // Load local JSON file for section 1 narration & board events
  const localJsonPath = "/Users/raasikhnaveed/Desktop/JSON_LESSONS/Class12_phy/p12_ch01_electric-charges-and-fields_full.json";
  const jsonContent = JSON.parse(fs.readFileSync(localJsonPath, "utf8"));

  let firstSection = null;
  for (const part of jsonContent.parts || []) {
    if (part.sections && part.sections.length > 0) {
      firstSection = part.sections[0];
      break;
    }
  }

  console.log("\nJSON Section 1 Title:", firstSection?.title);
  console.log("JSON Section 1 Subtopic:", firstSection?.subtopic);
  console.log("\nJSON Section 1 Narration English:\n", JSON.stringify(firstSection?.narration?.english, null, 2));
  console.log("\nJSON Section 1 Narration Hinglish:\n", JSON.stringify(firstSection?.narration?.hinglish, null, 2));
  console.log("\nJSON Section 1 Board Events:\n", JSON.stringify(firstSection?.board_events, null, 2));
}

main().catch(console.error);
