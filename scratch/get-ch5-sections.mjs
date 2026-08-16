import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tgbknrmnjwiokraddurx.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_x_sJn5Q4j3f7GFESXK21wg_Ab2o5sV1";

const supabase = createClient(url, key);

async function main() {
  const chapterId = "a6961d73-9ca9-5716-8e0c-61c69c5e343f";

  const { data: sections, error: secErr } = await supabase
    .from("lesson_sections")
    .select("id, chapter_id, position, title, board_reveal_at_english, board_reveal_at_hinglish")
    .eq("chapter_id", chapterId)
    .order("position", { ascending: true });

  if (secErr) {
    console.error("Error fetching sections:", secErr);
    process.exit(1);
  }

  console.log("Found sections count:", sections?.length);

  const localJsonPath = "./JSON_LESSONS/Class11_Chem/c11_ch05_chemical-thermodynamics_full.json";
  const jsonContent = JSON.parse(fs.readFileSync(localJsonPath, "utf8"));
  const jsonSections = jsonContent.sections || [];
  console.log("JSON sections count:", jsonSections.length);

  const merged = sections.map((dbSec) => {
    const j = jsonSections.find((js) => js.section_index === dbSec.position);
    return {
      position: dbSec.position,
      id: dbSec.id,
      title: dbSec.title,
      subtopic: j?.subtopic,
      section_type: j?.section_type,
      reveals_en: dbSec.board_reveal_at_english,
      reveals_hi: dbSec.board_reveal_at_hinglish,
      board_events: j?.board_events,
      narration_en: j?.narration?.english?.segments?.map((s) => s.text),
      narration_hi: j?.narration?.hinglish?.segments?.map((s) => s.text),
    };
  });

  fs.writeFileSync(
    "/private/tmp/claude-501/-Users-nikhi-Downloads-monk-scenes-chem5/2867b06b-b82f-4b57-9315-438c9d32cefa/scratchpad/ch5_sections.json",
    JSON.stringify(merged, null, 2)
  );
  console.log("Wrote merged sections to scratchpad/ch5_sections.json");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
