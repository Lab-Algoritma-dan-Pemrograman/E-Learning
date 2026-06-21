-- =========================================================================
-- MIGRATION: SECURITY STRENGTHENING (XP INJECTION & CURRICULUM SECURING)
-- Jalankan skrip ini di SQL Editor Supabase untuk mengamankan database.
-- =========================================================================

-- 1. TAMBAHKAN KOLOM xp_reward KE TABEL lessons (DEFAULT 60 XP)
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS xp_reward INTEGER DEFAULT 60;

-- 2. BUAT FUNGSI DAN TRIGGER UNTUK VALIDASI XP DAN LEVEL SERVER-SIDE
-- Fungsi pembantu menghitung level berdasarkan XP: floor(sqrt(xp / 50)) + 1
CREATE OR REPLACE FUNCTION public.calculate_level(xp integer)
RETURNS integer AS $$
BEGIN
    IF xp <= 0 THEN
        RETURN 1;
    END IF;
    RETURN FLOOR(SQRT(xp::numeric / 50.0))::integer + 1;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Trigger untuk memvalidasi dan mengunci XP/Level mahasiswa agar tidak bisa di-inject dari client
CREATE OR REPLACE FUNCTION public.check_user_xp_level()
RETURNS TRIGGER AS $$
DECLARE
    server_calculated_xp INTEGER;
BEGIN
    -- Hanya validasi untuk non-admin/kordas (mahasiswa/asisten)
    IF public.auth_role() NOT IN ('admin', 'kordas') THEN
        -- A. Hitung total XP riil hasil belajar (pelajaran diselesaikan + riwayat bermain game)
        server_calculated_xp := 
            (SELECT COALESCE(SUM(l.xp_reward), 0) 
             FROM public.student_progress sp 
             JOIN public.lessons l ON sp.lesson_id = l.id 
             WHERE sp.nim = NEW.nim) 
            + 
            (SELECT COALESCE(SUM(gh.xp_earned), 0) 
             FROM public.game_history gh 
             WHERE gh.nim = NEW.nim);

        -- B. Jika mahasiswa mengirimkan XP lebih tinggi dari total riil di server, tolak update
        IF NEW.xp > server_calculated_xp THEN
            RAISE EXCEPTION 'Akses Ditolak: Nilai XP yang dikirim (%) melebihi batas XP riil belajar Anda (%)!', NEW.xp, server_calculated_xp;
        END IF;

        -- C. Hitung dan kunci level secara otomatis sesuai formula database
        NEW.level := public.calculate_level(NEW.xp);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_check_user_xp_level ON public.users;
CREATE TRIGGER trigger_check_user_xp_level
    BEFORE INSERT OR UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.check_user_xp_level();


-- 3. BUAT VIEW student_lessons UNTUK MENYEMBUNYIKAN SOLUSI & JAWABAN KUIS
-- View ini menyembunyikan kolom 'solution' dan menghapus kunci 'correctAnswer' dari objek 'quiz' JSONB.
CREATE OR REPLACE VIEW public.student_lessons AS
SELECT 
    id, 
    module_id, 
    title, 
    explanation, 
    code_example, 
    initial_code, 
    hint, 
    (quiz - 'correctAnswer') AS quiz, -- Mengeluarkan correctAnswer dari JSONB quiz
    test_cases, 
    validation_rules, 
    sort_order,
    xp_reward
FROM public.lessons;

-- 4. SESUAIKAN HAK AKSES DAN KEBIJAKAN RLS
-- A. Batasi seleksi tabel dasar lessons hanya untuk staf (admin/kordas/asisten)
DROP POLICY IF EXISTS "Semua user terautentikasi bisa melihat pelajaran" ON public.lessons;

CREATE POLICY "Staf bisa melihat pelajaran secara penuh" ON public.lessons
    FOR SELECT TO authenticated 
    USING (public.auth_role() IN ('admin', 'kordas', 'asisten'));

-- B. Berikan hak akses membaca view student_lessons kepada semua user terautentikasi (termasuk mahasiswa)
GRANT SELECT ON public.student_lessons TO authenticated;
