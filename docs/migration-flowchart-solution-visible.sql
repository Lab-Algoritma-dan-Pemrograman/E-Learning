-- =========================================================================
-- VIEW student_lessons: kirim `solution` untuk LATIHAN FLOWCHART
--
-- Praktikan butuh `solution` pada exercise_type='flowchart' karena
-- FlowchartPuzzle menilai susunan di klien (sesuai keputusan pemilik produk:
-- latihan, bukan penilaian). Untuk lesson 'code', `solution` tetap
-- disembunyikan seperti sebelumnya.
--
-- URUTAN KOLOM WAJIB SAMA dengan view yang berlaku sekarang, kalau tidak
-- CREATE OR REPLACE VIEW menolak dengan error 42P16.
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
    (quiz::jsonb - 'correctAnswer') AS quiz,
    test_cases,
    validation_rules,
    sort_order,
    xp_reward,
    exercise_type,
    flowchart_distractors,
    CASE
        WHEN exercise_type = 'flowchart' THEN solution
        WHEN public.auth_role() IN ('admin', 'kordas', 'asisten') THEN solution
        ELSE NULL
    END AS solution
FROM public.lessons;

GRANT SELECT ON public.student_lessons TO authenticated, anon;

-- VERIFIKASI: latihan flowchart harus punya solution, lesson code tetap null
SELECT id, exercise_type,
       (solution IS NOT NULL) AS solution_kelihatan
FROM public.student_lessons
WHERE exercise_type = 'flowchart' OR id = 'c-level-1-m4-l1'
ORDER BY exercise_type DESC, id;
