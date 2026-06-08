-- ============================================================
-- Migration: Assessment Grading Rules & Anti-Cheat
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. Create the grading rules configuration table
CREATE TABLE IF NOT EXISTS public.assessment_grading_rules (
    id TEXT PRIMARY KEY, -- 'pre_test', 'post_test', 'program_keterampilan', 'ujian_praktik'
    rules JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Add tab_switch_count column for anti-cheat tracking
ALTER TABLE public.assessment_attempts 
ADD COLUMN IF NOT EXISTS tab_switch_count INTEGER DEFAULT 0;

-- 3. Seed default grading rules
INSERT INTO public.assessment_grading_rules (id, rules) VALUES
('pre_test', '{
  "duration_minutes": 15,
  "total_max_score": 100,
  "difficulties": {
    "easy": {
      "max_score": 20,
      "question_count": 1,
      "total_points": 20,
      "criteria": {
        "jawaban_benar": 20,
        "jawaban_salah": 8,
        "jawaban_kosong": 0
      }
    },
    "medium": {
      "max_score": 15,
      "question_count": 2,
      "total_points": 30,
      "criteria": {
        "jawaban_benar_singkat": 10,
        "jawaban_benar_penjelasan": 15,
        "jawaban_salah_penjelasan_logis": 7,
        "jawaban_salah": 3,
        "jawaban_kosong": 0
      }
    },
    "hard": {
      "max_score": 25,
      "question_count": 2,
      "total_points": 50,
      "criteria": {
        "jawaban_benar_singkat": 15,
        "jawaban_benar_penjelasan": 25,
        "jawaban_salah_penjelasan_logis": 10,
        "jawaban_salah": 5,
        "jawaban_kosong": 0
      }
    }
  }
}'::jsonb)
ON CONFLICT (id) DO UPDATE SET rules = EXCLUDED.rules, updated_at = NOW();

INSERT INTO public.assessment_grading_rules (id, rules) VALUES
('post_test', '{
  "duration_minutes": 15,
  "total_max_score": 100,
  "difficulties": {
    "easy": {
      "max_score": 20,
      "question_count": 1,
      "total_points": 20,
      "criteria": {
        "jawaban_benar": 20,
        "jawaban_salah": 8,
        "jawaban_kosong": 0
      }
    },
    "medium": {
      "max_score": 35,
      "question_count": 1,
      "total_points": 35,
      "criteria": {
        "jawaban_benar_singkat": 20,
        "jawaban_benar_penjelasan": 35,
        "jawaban_salah_penjelasan_logis": 15,
        "jawaban_salah": 5,
        "jawaban_kosong": 0
      }
    },
    "hard": {
      "max_score": 45,
      "question_count": 1,
      "total_points": 45,
      "criteria": {
        "jawaban_benar_singkat": 25,
        "jawaban_benar_penjelasan": 45,
        "jawaban_salah_penjelasan_logis": 18,
        "jawaban_salah": 8,
        "jawaban_kosong": 0
      }
    }
  }
}'::jsonb)
ON CONFLICT (id) DO UPDATE SET rules = EXCLUDED.rules, updated_at = NOW();

INSERT INTO public.assessment_grading_rules (id, rules) VALUES
('program_keterampilan', '{
  "duration_minutes": 90,
  "total_max_score": 85,
  "criteria": [
    { "no": 1, "label": "Kesesuaian sintaks", "nilai": 5 },
    { "no": 1, "label": "Berjalan Sebagian", "nilai": 15 },
    { "no": 1, "label": "Berjalan Sempurna", "nilai": 10 },
    { "no": 1, "label": "Dapat berjalan tanpa error", "nilai": 30 },
    { "no": 2, "label": "Sesuai dengan petunjuk", "nilai": 35 },
    { "no": 3, "label": "Tepat Waktu/selesai", "nilai": 20 },
    { "no": 4, "label": "Belum Selesai", "nilai": 10 }
  ]
}'::jsonb)
ON CONFLICT (id) DO UPDATE SET rules = EXCLUDED.rules, updated_at = NOW();

INSERT INTO public.assessment_grading_rules (id, rules) VALUES
('ujian_praktik', '{
  "duration_minutes": 120,
  "total_max_score": 100,
  "requires_token": true,
  "soal_1_5": {
    "max_per_soal": 15,
    "criteria": {
      "kesesuaian_sintaks": 2,
      "dapat_berjalan_tanpa_error": 5,
      "sesuai_petunjuk": 5,
      "tepat_waktu": 3
    }
  },
  "soal_6_flowchart": {
    "max_per_soal": 25,
    "criteria": {
      "kesesuaian_sintaks": 5,
      "dapat_berjalan_tanpa_error": 8,
      "sesuai_petunjuk": 7,
      "tepat_waktu": 5
    }
  }
}'::jsonb)
ON CONFLICT (id) DO UPDATE SET rules = EXCLUDED.rules, updated_at = NOW();

-- 4. Enable RLS on the new table
ALTER TABLE public.assessment_grading_rules ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read grading rules
CREATE POLICY "Allow authenticated read grading rules" ON public.assessment_grading_rules
    FOR SELECT TO authenticated USING (true);

-- Allow admin/kordas to update grading rules  
CREATE POLICY "Allow admin update grading rules" ON public.assessment_grading_rules
    FOR ALL TO authenticated USING (true) WITH CHECK (true);
