import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tgbknrmnjwiokraddurx.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_x_sJn5Q4j3f7GFESXK21wg_Ab2o5sV1";
const supabase = createClient(url, key);

const CHAPTER_ID = "fa37da68-46a0-562f-9c75-2967215b8893";
const JSON_PATH = "JSON_LESSONS/Class11_Chem/c11_ch01_some-basic-concepts-of-chemistry_full.json";
const pos = parseInt(process.argv[2], 10);

async function main() {
  const { data: sections, error } = await supabase
    .from("lesson_sections")
    .select("*")
    .eq("chapter_id", CHAPTER_ID)
    .order("position", { ascending: true });

  if (error) { console.error(error); return; }
  console.log("Total sections in Supabase:", sections?.length);

  const row = sections.find((s) => s.position === pos);
  console.log("\n--- Supabase row for position", pos, "---");
  console.log(JSON.stringify(row, null, 2));
  console.log("\nreveals_en count:", row?.board_reveal_at_english?.length, "reveals_hi count:", row?.board_reveal_at_hinglish?.length);
  console.log("segments_en count:", row?.segments_english?.length, "segments_hi count:", row?.segments_hinglish?.length);
}
main().catch(console.error);
