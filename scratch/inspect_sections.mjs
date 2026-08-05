import { createClient } from "@supabase/supabase-js";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tgbknrmnjwiokraddurx.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_x_sJn5Q4j3f7GFESXK21wg_Ab2o5sV1";
const supabase = createClient(url, key);
const CHAPTER_ID = "15bf6c7a-ff09-5741-93b8-e48e8a915273";
const { data, error } = await supabase.from("lesson_sections").select("*").eq("chapter_id", CHAPTER_ID).order("position");
if (error) { console.error(error); process.exit(1); }
console.log("count:", data.length);
console.log("keys:", Object.keys(data[0]));
console.log(JSON.stringify(data[0], null, 2).slice(0, 3000));
