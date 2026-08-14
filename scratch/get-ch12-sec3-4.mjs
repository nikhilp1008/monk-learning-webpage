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
    .in("position", [3, 4])
    .order("position", { ascending: true });

  if (secErr) {
    console.error("Error fetching sections 3 & 4:", secErr);
    return;
  }

  console.log("Sections 3 & 4 DB Records:\n", JSON.stringify(sections, null, 2));

  // Load JSON file
  const localJsonPath = "/Users/raasikhnaveed/Desktop/JSON_LESSONS/Class12_phy/p12_ch01_electric-charges-and-fields_full.json";
  const jsonContent = JSON.parse(fs.readFileSync(localJsonPath, "utf8"));
  
  const jsonSec3 = jsonContent.sections?.[2];
  const jsonSec4 = jsonContent.sections?.[3];

  console.log("\n=== SECTION 3 ===");
  console.log("Title:", jsonSec3?.title);
  console.log("Subtopic:", jsonSec3?.subtopic);
  console.log("Narration EN:", JSON.stringify(jsonSec3?.narration?.english, null, 2));
  console.log("Narration HI:", JSON.stringify(jsonSec3?.narration?.hinglish, null, 2));

  console.log("\n=== SECTION 4 ===");
  console.log("Title:", jsonSec4?.title);
  console.log("Subtopic:", jsonSec4?.subtopic);
  console.log("Narration EN:", JSON.stringify(jsonSec4?.narration?.english, null, 2));
  console.log("Narration HI:", JSON.stringify(jsonSec4?.narration?.hinglish, null, 2));
}

main().catch(console.error);
