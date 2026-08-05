import { createClient } from "@supabase/supabase-js";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tgbknrmnjwiokraddurx.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_x_sJn5Q4j3f7GFESXK21wg_Ab2o5sV1";
const supabase = createClient(url, key);
const CHAPTER_ID = "16bf043d-bc59-5ebb-93ad-7b0fddf484c9";
const { data: sections, error } = await supabase
  .from("lesson_sections")
  .select("position,title,audio_url_english,duration_sec_english,duration_sec_hinglish")
  .eq("chapter_id", CHAPTER_ID)
  .order("position", { ascending: true });
if (error) { console.error(error); process.exit(1); }
for (const s of sections) {
  const stale = s.audio_url_english.includes("_structure-of-atom");
  console.log(`${s.position}\t${stale ? "STALE-PATH" : "ok-path"}\t${s.duration_sec_english}\t${s.duration_sec_hinglish}\t${s.title}`);
}
