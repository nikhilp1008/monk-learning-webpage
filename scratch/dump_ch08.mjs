import { createClient } from "@supabase/supabase-js";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tgbknrmnjwiokraddurx.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_x_sJn5Q4j3f7GFESXK21wg_Ab2o5sV1";
const supabase = createClient(url, key);
const CHAPTER_ID = "15bf6c7a-ff09-5741-93b8-e48e8a915273";
const { data, error } = await supabase.from("lesson_sections").select("*").eq("chapter_id", CHAPTER_ID).order("position");
if (error) { console.error(error); process.exit(1); }
import fs from "fs";
fs.writeFileSync("scratch/ch08_sections.json", JSON.stringify(data, null, 2));
console.log("wrote", data.length, "sections");
data.forEach(d => console.log(d.position, "|", d.subtopic, "|", d.title, "| beats en/hi:", d.board_reveal_at_english.length, d.board_reveal_at_hinglish.length));
