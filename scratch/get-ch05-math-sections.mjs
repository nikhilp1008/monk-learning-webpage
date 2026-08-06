import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tgbknrmnjwiokraddurx.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_x_sJn5Q4j3f7GFESXK21wg_Ab2o5sV1";
const supabase = createClient(url, key);

const CHAPTER_ID = "7bc767a8-c36f-5f5c-93f5-fb8337ffd7f5";

async function main() {
  const { data: chapter, error: chErr } = await supabase
    .from("chapters")
    .select("id, name, subject, class_level")
    .eq("id", CHAPTER_ID)
    .single();
  if (chErr) console.error("chapter error:", chErr);
  console.log("Chapter:", chapter);

  const { data: sections, error } = await supabase
    .from("lesson_sections")
    .select("*")
    .eq("chapter_id", CHAPTER_ID)
    .order("position", { ascending: true });

  if (error) {
    console.error("sections error:", error);
    return;
  }
  console.log("Supabase section count:", sections.length);
  fs.writeFileSync(
    "scratch/ch05_math_sections.json",
    JSON.stringify(sections, null, 2)
  );
  console.log("Wrote scratch/ch05_math_sections.json");
  // quick sanity of first row's columns
  console.log("Columns:", Object.keys(sections[0] || {}));
}

main().catch(console.error);
