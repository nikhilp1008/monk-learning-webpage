import { apiFetch } from "@/lib/api";
import { supabase } from "@/lib/supabase";
import type { SubjectGroup } from "@/lib/drona/types";

/**
 * The student's exam as the catalogue and textbooks understand it. Unlike the
 * mock tests (where "both" sits the JEE pattern) a "both" student sees every
 * subject here, so the three-way value is kept.
 */
export type TextbookExam = "jee" | "neet" | "both";

export function textbookExamFrom(target: string | null | undefined): TextbookExam {
  const t = (target ?? "").toLowerCase();
  const jee = t.includes("jee");
  const neet = t.includes("neet");
  if (jee && neet) return "both";
  if (neet) return "neet";
  if (jee) return "jee";
  return "both";
}

export async function loadTextbookExam(): Promise<TextbookExam> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return "both";
    const { data } = await supabase
      .from("profiles")
      .select("target_exam")
      .eq("id", user.id)
      .maybeSingle();
    return textbookExamFrom(data?.target_exam);
  } catch {
    return "both";
  }
}

const byExam = new Map<TextbookExam, Promise<SubjectGroup[]>>();

/** GET /drona/catalogue narrowed to the exam by the server (`?exam=`), so a
 *  student is never offered a chapter they cannot be examined on. Cached per
 *  exam for the session; "both" sends no param (the server's default is the
 *  whole corpus, so a hidden chapter and a broken one never look alike). */
export function loadTextbookCatalogue(exam: TextbookExam): Promise<SubjectGroup[]> {
  const cached = byExam.get(exam);
  if (cached) return cached;
  const query = exam === "both" ? "" : `?exam=${exam}`;
  const p = apiFetch<SubjectGroup[]>(`/drona/catalogue${query}`)
    .then((groups) => groups.filter((g) => g.chapters.length > 0))
    .catch((err) => {
      byExam.delete(exam);
      throw err;
    });
  byExam.set(exam, p);
  return p;
}
