import { createClient } from "@supabase/supabase-js";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tgbknrmnjwiokraddurx.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_x_sJn5Q4j3f7GFESXK21wg_Ab2o5sV1";
const supabase = createClient(url, key);
const CHAPTER_ID = "ea46f354-2c41-542e-bf5c-e990c56d2a1d";

async function main() {
  const { data: sections, error } = await supabase
    .from("lesson_sections")
    .select("*")
    .eq("chapter_id", CHAPTER_ID)
    .order("position", { ascending: true });
  if (error) { console.error(error); process.exit(1); }
  console.log(`Total sections: ${sections.length}`);
  import("fs").then((fs) => {
    fs.mkdirSync("scratch/math4", { recursive: true });
    fs.writeFileSync("scratch/math4/all_sections.json", JSON.stringify(sections, null, 2));
    for (const s of sections) {
      fs.writeFileSync(`scratch/math4/sec${s.position}.json`, JSON.stringify(s, null, 2));
    }
    console.log("Dumped to scratch/math4/");
  });
}
main().catch(console.error);
