import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tgbknrmnjwiokraddurx.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_x_sJn5Q4j3f7GFESXK21wg_Ab2o5sV1";

const supabase = createClient(url, key);

async function main() {
  const { data: chapters } = await supabase.from("chapters").select("subject, class_level, id, name");
  console.log("Chapters Count:", chapters?.length || 0);

  const subjectCounts = {};
  (chapters || []).forEach(c => {
    const key = `${c.subject} (Class ${c.class_level})`;
    subjectCounts[key] = (subjectCounts[key] || 0) + 1;
  });

  console.log("Chapters breakdown:", subjectCounts);
}

main().catch(console.error);
