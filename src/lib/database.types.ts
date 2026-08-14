export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chapters: {
        Row: {
          chapter_order: number | null
          class_level: number | null
          id: string
          name: string | null
          status: string | null
          subject: string | null
          slug: string | null
          source_file_prefix: string | null
        }
        Insert: {
          chapter_order?: number | null
          class_level?: number | null
          id?: string
          name?: string | null
          slug?: string | null
          source_file_prefix?: string | null
          status?: string | null
          subject?: string | null
        }
        Update: {
          chapter_order?: number | null
          class_level?: number | null
          id?: string
          name?: string | null
          slug?: string | null
          source_file_prefix?: string | null
          status?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      lesson_progress: {
        Row: {
          completed: boolean | null
          lesson_section_id: string | null
          updated_at: string | null
          user_id: string | null
          watched_seconds: number | null
        }
        Insert: {
          completed?: boolean | null
          lesson_section_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          watched_seconds?: number | null
        }
        Update: {
          completed?: boolean | null
          lesson_section_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          watched_seconds?: number | null
        }
        Relationships: []
      }
      lesson_sections: {
        Row: {
          audio_url_english: string | null
          audio_url_hinglish: string | null
          board_content: Json | null
          board_reveal_at_english: Json | null
          board_reveal_at_hinglish: Json | null
          chapter_id: string | null
          duration_sec_english: number | null
          duration_sec_hinglish: number | null
          id: string
          part: number | null
          position: number | null
          section_type: string | null
          segments_english: Json | null
          segments_hinglish: Json | null
          subtopic: string | null
          title: string | null
        }
        Insert: {
          audio_url_english?: string | null
          audio_url_hinglish?: string | null
          board_content?: Json | null
          board_reveal_at_english?: Json | null
          board_reveal_at_hinglish?: Json | null
          chapter_id?: string | null
          duration_sec_english?: number | null
          duration_sec_hinglish?: number | null
          id?: string
          part?: number | null
          position?: number | null
          section_type?: string | null
          segments_english?: Json | null
          segments_hinglish?: Json | null
          subtopic?: string | null
          title?: string | null
        }
        Update: {
          audio_url_english?: string | null
          audio_url_hinglish?: string | null
          board_content?: Json | null
          board_reveal_at_english?: Json | null
          board_reveal_at_hinglish?: Json | null
          chapter_id?: string | null
          duration_sec_english?: number | null
          duration_sec_hinglish?: number | null
          id?: string
          part?: number | null
          position?: number | null
          section_type?: string | null
          segments_english?: Json | null
          segments_hinglish?: Json | null
          subtopic?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lesson_sections_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          }
        ]
      }
      mock_test_questions: {
        Row: {
          mock_test_id: string | null
          position: number | null
          question_id: string | null
          section: string | null
        }
        Insert: {
          mock_test_id?: string | null
          position?: number | null
          question_id?: string | null
          section?: string | null
        }
        Update: {
          mock_test_id?: string | null
          position?: number | null
          question_id?: string | null
          section?: string | null
        }
        Relationships: []
      }
      mock_tests: {
        Row: {
          duration_minutes: number | null
          exam: string | null
          id: string
          is_published: boolean | null
          title: string | null
        }
        Insert: {
          duration_minutes?: number | null
          exam?: string | null
          id?: string
          is_published?: boolean | null
          title?: string | null
        }
        Update: {
          duration_minutes?: number | null
          exam?: string | null
          id?: string
          is_published?: boolean | null
          title?: string | null
        }
        Relationships: []
      }
      practice_attempts: {
        Row: {
          chosen_option: string | null
          chosen_value: number | null
          created_at: string | null
          id: string
          is_correct: boolean | null
          mock_run_id: string | null
          mode: string | null
          question_id: string | null
          user_id: string | null
        }
        Insert: {
          chosen_option?: string | null
          chosen_value?: number | null
          created_at?: string | null
          id?: string
          is_correct?: boolean | null
          mock_run_id?: string | null
          mode?: string | null
          question_id?: string | null
          user_id?: string | null
        }
        Update: {
          chosen_option?: string | null
          chosen_value?: number | null
          created_at?: string | null
          id?: string
          is_correct?: boolean | null
          mock_run_id?: string | null
          mode?: string | null
          question_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          display_name: string | null
          enrolled_class: number | null
          id: string
          target_exam: string | null
          teaching_language: string | null
          teacher_voice: string | null
          read_equations_aloud: boolean | null
          allow_interrupt: boolean | null
          daily_reminder: boolean | null
          notify_new_content: boolean | null
          notify_product_updates: boolean | null
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          enrolled_class?: number | null
          id?: string
          target_exam?: string | null
          teaching_language?: string | null
          teacher_voice?: string | null
          read_equations_aloud?: boolean | null
          allow_interrupt?: boolean | null
          daily_reminder?: boolean | null
          notify_new_content?: boolean | null
          notify_product_updates?: boolean | null
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          enrolled_class?: number | null
          id?: string
          target_exam?: string | null
          teaching_language?: string | null
          teacher_voice?: string | null
          read_equations_aloud?: boolean | null
          allow_interrupt?: boolean | null
          daily_reminder?: boolean | null
          notify_new_content?: boolean | null
          notify_product_updates?: boolean | null
        }
        Relationships: []
      }
      notes: {
        Row: {
          id: string
          user_id: string
          subject: string | null
          chapter: string | null
          concept: string | null
          content: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subject?: string | null
          chapter?: string | null
          concept?: string | null
          content?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subject?: string | null
          chapter?: string | null
          concept?: string | null
          content?: string | null
          created_at?: string
        }
        Relationships: []
      }
      doubts: {
        Row: {
          id: string
          user_id: string
          subject: string | null
          chapter: string | null
          concept: string | null
          question_text: string | null
          image_url: string | null
          explanation: string | null
          solved: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subject?: string | null
          chapter?: string | null
          concept?: string | null
          question_text?: string | null
          image_url?: string | null
          explanation?: string | null
          solved?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subject?: string | null
          chapter?: string | null
          concept?: string | null
          question_text?: string | null
          image_url?: string | null
          explanation?: string | null
          solved?: boolean
          created_at?: string
        }
        Relationships: []
      }
      plan_items: {
        Row: {
          id: string
          user_id: string
          plan_date: string
          label: string
          minutes: number | null
          is_done: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_date?: string
          label: string
          minutes?: number | null
          is_done?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_date?: string
          label?: string
          minutes?: number | null
          is_done?: boolean
          sort_order?: number
          created_at?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          answer_source: string | null
          chapter_id: string | null
          chapter_name: string | null
          concept: string | null
          correct_option: string | null
          correct_value: number | null
          created_at: string | null
          diagram: string | null
          difficulty: number | null
          discipline: string | null
          distractor_map: Json | null
          explanations: Json | null
          id: string
          image_url: string | null
          needs_manual: string | null
          options: Json | null
          question_num: number | null
          question_text: string | null
          question_type: string | null
          reference_exam: string | null
          reference_year: number | null
          scenario: string | null
          seed_vs_generated: string | null
          solution: Json | null
          source: string | null
          source_pdf: string | null
          source_status: string | null
          stated_key: string | null
          sub_concept: string | null
          subject: string | null
          target_exams: string[] | null
          value_tolerance: number | null
          variables: Json | null
          variant_id: string | null
        }
        Insert: {
          answer_source?: string | null
          chapter_id?: string | null
          chapter_name?: string | null
          concept?: string | null
          correct_option?: string | null
          correct_value?: number | null
          created_at?: string | null
          diagram?: string | null
          difficulty?: number | null
          discipline?: string | null
          distractor_map?: Json | null
          explanations?: Json | null
          id?: string
          image_url?: string | null
          needs_manual?: string | null
          options?: Json | null
          question_num?: number | null
          question_text?: string | null
          question_type?: string | null
          reference_exam?: string | null
          reference_year?: number | null
          scenario?: string | null
          seed_vs_generated?: string | null
          solution?: Json | null
          source?: string | null
          source_pdf?: string | null
          source_status?: string | null
          stated_key?: string | null
          sub_concept?: string | null
          subject?: string | null
          target_exams?: string[] | null
          value_tolerance?: number | null
          variables?: Json | null
          variant_id?: string | null
        }
        Update: {
          answer_source?: string | null
          chapter_id?: string | null
          chapter_name?: string | null
          concept?: string | null
          correct_option?: string | null
          correct_value?: number | null
          created_at?: string | null
          diagram?: string | null
          difficulty?: number | null
          discipline?: string | null
          distractor_map?: Json | null
          explanations?: Json | null
          id?: string
          image_url?: string | null
          needs_manual?: string | null
          options?: Json | null
          question_num?: number | null
          question_text?: string | null
          question_type?: string | null
          reference_exam?: string | null
          reference_year?: number | null
          scenario?: string | null
          seed_vs_generated?: string | null
          solution?: Json | null
          source?: string | null
          source_pdf?: string | null
          source_status?: string | null
          stated_key?: string | null
          sub_concept?: string | null
          subject?: string | null
          target_exams?: string[] | null
          value_tolerance?: number | null
          variables?: Json | null
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}