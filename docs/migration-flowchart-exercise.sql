-- =========================================================================
-- MIGRASI: latihan flowchart (drag & drop) pada modul Flowchart
--
-- Menambah dua kolom pada public.lessons:
--   exercise_type          : 'code' (default) atau 'flowchart'
--   flowchart_distractors  : JSON string FlowchartSymbol[] pengecoh
--
-- Latihan flowchart tidak memakai koding. Konvensinya (lihat src/types.ts):
--   initial_code                   : kode C sederhana yang divisualkan (read-only)
--   solution                       : JSON string FlowchartSymbol[] urutan benar
--   test_cases[0].description      : instruksi tugas
--   flowchart_distractors          : kartu pengecoh di bank
--
-- View student_lessons WAJIB ikut diperbarui karena daftar kolomnya eksplisit.
-- Tanpa itu, praktikan tidak menerima exercise_type sehingga latihan tampil
-- sebagai editor kode kosong.
-- =========================================================================

-- 1. KOLOM BARU
-- =========================================================================
ALTER TABLE public.lessons
    ADD COLUMN IF NOT EXISTS exercise_type TEXT DEFAULT 'code';

ALTER TABLE public.lessons
    ADD COLUMN IF NOT EXISTS flowchart_distractors TEXT;


-- 2. VIEW student_lessons (perbarui daftar kolom)
-- =========================================================================
CREATE OR REPLACE VIEW public.student_lessons AS
SELECT
    id,
    module_id,
    title,
    explanation,
    code_example,
    initial_code,
    hint,
    (quiz - 'correctAnswer') AS quiz,   -- kunci jawaban tidak dikirim ke siswa
    test_cases,
    validation_rules,
    xp_reward,
    sort_order,
    exercise_type,
    flowchart_distractors,
    CASE
        WHEN public.auth_role() IN ('admin', 'kordas', 'asisten') THEN solution
        ELSE NULL
    END AS solution
FROM public.lessons;

GRANT SELECT ON public.student_lessons TO authenticated, anon;


-- 3. VERIFIKASI
-- =========================================================================
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'lessons'
  AND column_name IN ('exercise_type', 'flowchart_distractors')
ORDER BY column_name;
