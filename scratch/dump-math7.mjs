import { createClient } from "@supabase/supabase-js";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tgbknrmnjwiokraddurx.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_x_sJn5Q4j3f7GFESXK21wg_Ab2o5sV1";
const supabase = createClient(url, key);
const CHAPTER_ID = "ad7f3197-f77b-5be6-8581-f5372ffb7797";
const positions = process.argv.slice(2).map(Number);
async function main() {
  const { data: sections, error } = await supabase
    .from("lesson_sections")
    .select("*")
    .eq("chapter_id", CHAPTER_ID)
    .order("position", { ascending: true });
  if (error) { console.error(error); return; }
  if (positions.length === 0) {
    console.log("TOTAL SECTIONS:", sections.length);
    console.log(sections.map(s => `${s.position}: ${s.title || s.section_type || ""}`).join("\n"));
    return;
  }
  const out = {};
  for (const p of positions) {
    out[p] = sections.find((s) => s.position === p);
  }
  console.log(JSON.stringify(out, null, 2));
}
main().catch(console.error);
