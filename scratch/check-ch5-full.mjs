import { createClient } from "@supabase/supabase-js";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tgbknrmnjwiokraddurx.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_x_sJn5Q4j3f7GFESXK21wg_Ab2o5sV1";
const supabase = createClient(url, key);
const chapterId = "a6961d73-9ca9-5716-8e0c-61c69c5e343f";
const { data, error } = await supabase
  .from("lesson_sections")
  .select("*")
  .eq("chapter_id", chapterId)
  .in("position", [1, 2]);
if (error) { console.error(error); process.exit(1); }
console.log(JSON.stringify(data, null, 2));
