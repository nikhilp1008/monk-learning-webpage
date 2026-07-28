"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface ChapterItem {
  id: string;
  name: string | null;
  subject: string | null;
  class_level: number | null;
  chapter_order: number | null;
  status: string | null;
}

interface TestResults {
  chapters: ChapterItem[];
  chaptersError: string | null;
  lessonSectionsCount: number | null;
  lessonSectionsError: string | null;
  questionsCount: number | null;
  questionsRows: any[];
  questionsError: string | null;
  loading: boolean;
}

export default function TestPage() {
  const [results, setResults] = useState<TestResults>({
    chapters: [],
    chaptersError: null,
    lessonSectionsCount: null,
    lessonSectionsError: null,
    questionsCount: null,
    questionsRows: [],
    questionsError: null,
    loading: true,
  });

  useEffect(() => {
    async function runConnectionTests() {
      // a) Query Physics Class 11 chapters
      const { data: chaptersData, error: chaptersErr } = await supabase
        .from("chapters")
        .select("id, name, subject, class_level, chapter_order, status")
        .eq("subject", "physics")
        .eq("class_level", 11)
        .order("chapter_order", { ascending: true });

      // b) Query lesson_sections count for one chapter that has lessons
      let lessonCount: number | null = null;
      let lessonErrStr: string | null = null;

      if (chaptersData && chaptersData.length > 0) {
        // Pick first chapter (Units & Measurements)
        const targetChapterId = chaptersData[0].id;
        const { count, error: lessonErr } = await supabase
          .from("lesson_sections")
          .select("id", { count: "exact", head: true })
          .eq("chapter_id", targetChapterId);

        lessonCount = count;
        if (lessonErr) lessonErrStr = lessonErr.message;
      }

      // c) Query questions pool using Publishable Key (MUST return 0 rows under RLS)
      const { data: questionsData, error: questionsErr, count: qCount } = await supabase
        .from("questions")
        .select("id, question_text", { count: "exact" })
        .limit(10);

      setResults({
        chapters: (chaptersData as ChapterItem[]) || [],
        chaptersError: chaptersErr ? chaptersErr.message : null,
        lessonSectionsCount: lessonCount,
        lessonSectionsError: lessonErrStr,
        questionsCount: qCount,
        questionsRows: questionsData || [],
        questionsError: questionsErr ? questionsErr.message : null,
        loading: false,
      });
    }

    runConnectionTests();
  }, []);

  if (results.loading) {
    return <div style={{ padding: 20 }}>Running connection tests...</div>;
  }

  return (
    <div style={{ padding: 20, fontFamily: "monospace", lineHeight: 1.6 }}>
      <h1>Supabase Client Connection Test (/test)</h1>

      <section style={{ marginBottom: 24 }}>
        <h2>a) Physics Class 11 Chapters ({results.chapters.length} rows)</h2>
        {results.chaptersError && (
          <p style={{ color: "red" }}>Error: {results.chaptersError}</p>
        )}
        <ol style={{ paddingLeft: 20 }}>
          {results.chapters.map((ch) => (
            <li key={ch.id}>
              <strong>Order {ch.chapter_order}</strong>: {ch.name} (ID: {ch.id}, Status: {ch.status})
            </li>
          ))}
        </ol>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>b) Lesson Sections Count (for Chapter &quot;{results.chapters[0]?.name}&quot;)</h2>
        {results.lessonSectionsError && (
          <p style={{ color: "red" }}>Error: {results.lessonSectionsError}</p>
        )}
        <p>Count: {results.lessonSectionsCount} sections</p>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>c) Questions Pool Query (RLS Verification)</h2>
        {results.questionsError && (
          <p style={{ color: "red" }}>Error: {results.questionsError}</p>
        )}
        <p>Rows Returned: <strong>{results.questionsRows.length}</strong> (Must be 0 under RLS)</p>
        <p>Total Count: <strong>{results.questionsCount ?? 0}</strong></p>
      </section>
    </div>
  );
}
