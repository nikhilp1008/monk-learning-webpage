import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tgbknrmnjwiokraddurx.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_x_sJn5Q4j3f7GFESXK21wg_Ab2o5sV1";

const supabase = createClient(url, key);

async function main() {
  const chapterId = 'cf605dc6-faed-5c33-8107-81114cbfef79'; // Class 12 Ch01

  const { data: sections, error: secErr } = await supabase
    .from("lesson_sections")
    .select("id, chapter_id, position, title, board_reveal_at_english, board_reveal_at_hinglish")
    .eq("chapter_id", chapterId)
    .eq("position", 2);

  if (secErr) {
    console.error("Error fetching section 2:", secErr);
    return;
  }

  const sec2 = sections?.[0];
  console.log("Section 2 DB Record:\n", JSON.stringify(sec2, null, 2));

  // Load JSON file section 2
  const localJsonPath = "/Users/raasikhnaveed/Desktop/JSON_LESSONS/Class12_phy/p12_ch01_electric-charges-and-fields_full.json";
  const jsonContent = JSON.parse(fs.readFileSync(localJsonPath, "utf8"));
  const jsonSec2 = jsonContent.sections?.[1]; // 0-indexed

  console.log("\nJSON Section 2 Title:", jsonSec2?.title);
  console.log("JSON Section 2 Subtopic:", jsonSec2?.subtopic);
  console.log("\nJSON Section 2 Narration English:\n", JSON.stringify(jsonSec2?.narration?.english, null, 2));
  console.log("\nJSON Section 2 Narration Hinglish:\n", JSON.stringify(jsonSec2?.narration?.hinglish, null, 2));
  console.log("\nJSON Section 2 Board Events:\n", JSON.stringify(jsonSec2?.board_events, null, 2));
}

main().catch(console.error);
