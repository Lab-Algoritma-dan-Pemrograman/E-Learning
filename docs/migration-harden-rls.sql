-- =========================================================================
-- MIGRATION: HARDENED ROW LEVEL SECURITY (RLS) POLICIES (MURNI E-LEARNING)
-- Jalankan skrip ini di SQL Editor Supabase untuk mengamankan database Anda.
-- Skrip ini disesuaikan khusus untuk platform MURNI E-LEARNING (tanpa modul ujian/asesmen).
-- Aturan Keamanan:
-- 1. Orang luar (anon / unauthenticated) tidak bisa membaca/menulis data apapun.
-- 2. Mahasiswa (praktikan) hanya bisa membaca/menulis datanya sendiri dan dilarang mengubah/menghapus progres.
-- 3. Staf (admin, kordas, asisten) bisa mengelola data sesuai wewenangnya.
-- =========================================================================

-- =========================================================================
-- 1. AKTIFKAN RLS DI SEMUA TABEL UTAMA E-LEARNING
-- =========================================================================
ALTER TABLE public.levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playground_examples ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.unlocked_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.active_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;


-- =========================================================================
-- 2. TABEL: levels (Tingkatan Pelajaran)
-- =========================================================================
DROP POLICY IF EXISTS "Semua user bisa melihat level" ON public.levels;
DROP POLICY IF EXISTS "Semua user terautentikasi bisa melihat level" ON public.levels;
DROP POLICY IF EXISTS "Hanya Admin & Kordas yang bisa mengelola level" ON public.levels;

CREATE POLICY "Semua user terautentikasi bisa melihat level" ON public.levels
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Hanya Admin & Kordas yang bisa mengelola level" ON public.levels
    FOR ALL TO authenticated USING (public.auth_role() IN ('admin', 'kordas'));


-- =========================================================================
-- 3. TABEL: modules (Modul Pelajaran)
-- =========================================================================
DROP POLICY IF EXISTS "Semua user bisa melihat modul" ON public.modules;
DROP POLICY IF EXISTS "Semua user terautentikasi bisa melihat modul" ON public.modules;
DROP POLICY IF EXISTS "Hanya Admin & Kordas yang bisa mengelola modul" ON public.modules;

CREATE POLICY "Semua user terautentikasi bisa melihat modul" ON public.modules
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Hanya Admin & Kordas yang bisa mengelola modul" ON public.modules
    FOR ALL TO authenticated USING (public.auth_role() IN ('admin', 'kordas'));


-- =========================================================================
-- 4. TABEL: lessons (Materi Pelajaran)
-- =========================================================================
DROP POLICY IF EXISTS "Semua user bisa melihat pelajaran" ON public.lessons;
DROP POLICY IF EXISTS "Semua user terautentikasi bisa melihat pelajaran" ON public.lessons;
DROP POLICY IF EXISTS "Hanya Admin & Kordas yang bisa mengelola pelajaran" ON public.lessons;

CREATE POLICY "Semua user terautentikasi bisa melihat pelajaran" ON public.lessons
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Hanya Admin & Kordas yang bisa mengelola pelajaran" ON public.lessons
    FOR ALL TO authenticated USING (public.auth_role() IN ('admin', 'kordas'));


-- =========================================================================
-- 5. TABEL: game_questions (Soal Game BugHunt)
-- =========================================================================
DROP POLICY IF EXISTS "Semua user bisa melihat game questions" ON public.game_questions;
DROP POLICY IF EXISTS "Semua user terautentikasi bisa melihat game questions" ON public.game_questions;
DROP POLICY IF EXISTS "Hanya Admin & Kordas yang bisa mengelola game questions" ON public.game_questions;

CREATE POLICY "Semua user terautentikasi bisa melihat game questions" ON public.game_questions
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Hanya Admin & Kordas yang bisa mengelola game questions" ON public.game_questions
    FOR ALL TO authenticated USING (public.auth_role() IN ('admin', 'kordas'));


-- =========================================================================
-- 6. TABEL: game_settings (Pengaturan Game BugHunt)
-- =========================================================================
DROP POLICY IF EXISTS "Semua user bisa melihat game settings" ON public.game_settings;
DROP POLICY IF EXISTS "Semua user terautentikasi bisa melihat game settings" ON public.game_settings;
DROP POLICY IF EXISTS "Hanya Admin & Kordas yang bisa mengelola game settings" ON public.game_settings;

CREATE POLICY "Semua user terautentikasi bisa melihat game settings" ON public.game_settings
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Hanya Admin & Kordas yang bisa mengelola game settings" ON public.game_settings
    FOR ALL TO authenticated USING (public.auth_role() IN ('admin', 'kordas'));


-- =========================================================================
-- 7. TABEL: playground_examples (Contoh Kode Playground)
-- =========================================================================
DROP POLICY IF EXISTS "Anyone can read examples" ON public.playground_examples;
DROP POLICY IF EXISTS "Admin can manage examples" ON public.playground_examples;
DROP POLICY IF EXISTS "Semua user terautentikasi bisa melihat contoh playground" ON public.playground_examples;
DROP POLICY IF EXISTS "Hanya Admin & Kordas yang bisa mengelola contoh playground" ON public.playground_examples;

CREATE POLICY "Semua user terautentikasi bisa melihat contoh playground" ON public.playground_examples
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Hanya Admin & Kordas yang bisa mengelola contoh playground" ON public.playground_examples
    FOR ALL TO authenticated USING (public.auth_role() IN ('admin', 'kordas'));


-- =========================================================================
-- 8. TABEL: achievements (Daftar Achievement)
-- =========================================================================
DROP POLICY IF EXISTS "Semua user terautentikasi bisa melihat pencapaian" ON public.achievements;
DROP POLICY IF EXISTS "Hanya Admin & Kordas yang bisa mengelola pencapaian" ON public.achievements;

CREATE POLICY "Semua user terautentikasi bisa melihat pencapaian" ON public.achievements
    FOR SELECT TO authenticated USING (true);
CREATE POLICY "Hanya Admin & Kordas yang bisa mengelola pencapaian" ON public.achievements
    FOR ALL TO authenticated USING (public.auth_role() IN ('admin', 'kordas'));


-- =========================================================================
-- 9. TABEL: unlocked_achievements (Achievement yang Didapat Mahasiswa)
-- =========================================================================
DROP POLICY IF EXISTS "Mahasiswa hanya bisa melihat pencapaian miliknya sendiri" ON public.unlocked_achievements;
DROP POLICY IF EXISTS "Staf bisa melihat pencapaian seluruh praktikan" ON public.unlocked_achievements;
DROP POLICY IF EXISTS "Mahasiswa hanya bisa mencatat pencapaian miliknya sendiri" ON public.unlocked_achievements;
DROP POLICY IF EXISTS "Staf bisa menghapus pencapaian praktikan" ON public.unlocked_achievements;

CREATE POLICY "Mahasiswa hanya bisa melihat pencapaian miliknya sendiri" ON public.unlocked_achievements
    FOR SELECT TO authenticated USING (nim = public.auth_nim());
CREATE POLICY "Staf bisa melihat pencapaian seluruh praktikan" ON public.unlocked_achievements
    FOR SELECT TO authenticated USING (public.auth_role() IN ('admin', 'kordas', 'asisten'));
CREATE POLICY "Mahasiswa hanya bisa mencatat pencapaian miliknya sendiri" ON public.unlocked_achievements
    FOR INSERT TO authenticated WITH CHECK (nim = public.auth_nim());
CREATE POLICY "Staf bisa menghapus pencapaian praktikan" ON public.unlocked_achievements
    FOR DELETE TO authenticated USING (public.auth_role() IN ('admin', 'kordas', 'asisten'));


-- =========================================================================
-- 10. TABEL: game_history (Riwayat Bermain Game)
-- =========================================================================
DROP POLICY IF EXISTS "Mahasiswa hanya bisa melihat riwayat game sendiri" ON public.game_history;
DROP POLICY IF EXISTS "Staf bisa melihat riwayat game seluruh praktikan" ON public.game_history;
DROP POLICY IF EXISTS "Mahasiswa hanya bisa mencatat riwayat game sendiri" ON public.game_history;

CREATE POLICY "Mahasiswa hanya bisa melihat riwayat game sendiri" ON public.game_history
    FOR SELECT TO authenticated USING (nim = public.auth_nim());
CREATE POLICY "Staf bisa melihat riwayat game seluruh praktikan" ON public.game_history
    FOR SELECT TO authenticated USING (public.auth_role() IN ('admin', 'kordas', 'asisten'));
CREATE POLICY "Mahasiswa hanya bisa mencatat riwayat game sendiri" ON public.game_history
    FOR INSERT TO authenticated WITH CHECK (nim = public.auth_nim());


-- =========================================================================
-- 11. TABEL: active_sessions (Detak Jantung Sesi Aktif)
-- =========================================================================
DROP POLICY IF EXISTS "Asisten ke atas bisa memonitor seluruh sesi aktif" ON public.active_sessions;
DROP POLICY IF EXISTS "Mahasiswa bisa update session heartbeat miliknya" ON public.active_sessions;
DROP POLICY IF EXISTS "Staf bisa menghapus sesi aktif apa saja" ON public.active_sessions;
DROP POLICY IF EXISTS "Staf bisa memonitor seluruh sesi aktif" ON public.active_sessions;
DROP POLICY IF EXISTS "Mahasiswa bisa mendaftarkan sesi miliknya" ON public.active_sessions;
DROP POLICY IF EXISTS "Mahasiswa bisa memperbarui heartbeat miliknya" ON public.active_sessions;
DROP POLICY IF EXISTS "Mahasiswa bisa menghapus sesi miliknya" ON public.active_sessions;

CREATE POLICY "Staf bisa memonitor seluruh sesi aktif" ON public.active_sessions
    FOR SELECT TO authenticated USING (public.auth_role() IN ('admin', 'kordas', 'asisten'));
CREATE POLICY "Mahasiswa bisa mendaftarkan sesi miliknya" ON public.active_sessions
    FOR INSERT TO authenticated WITH CHECK (nim = public.auth_nim());
CREATE POLICY "Mahasiswa bisa memperbarui heartbeat miliknya" ON public.active_sessions
    FOR UPDATE TO authenticated USING (nim = public.auth_nim()) WITH CHECK (nim = public.auth_nim());
CREATE POLICY "Mahasiswa bisa menghapus sesi miliknya" ON public.active_sessions
    FOR DELETE TO authenticated USING (nim = public.auth_nim());
CREATE POLICY "Staf bisa menghapus sesi aktif apa saja" ON public.active_sessions
    FOR DELETE TO authenticated USING (public.auth_role() IN ('admin', 'kordas', 'asisten'));


-- =========================================================================
-- 12. TABEL: activity_logs (Log Aktivitas Audit)
-- =========================================================================
DROP POLICY IF EXISTS "Asisten ke atas bisa membaca seluruh log audit" ON public.activity_logs;
DROP POLICY IF EXISTS "Hanya Admin yang bisa menghapus log audit" ON public.activity_logs;
DROP POLICY IF EXISTS "Kordas bisa menghapus seluruh log audit" ON public.activity_logs;
DROP POLICY IF EXISTS "Mahasiswa hanya bisa menulis log aktivitas" ON public.activity_logs;
DROP POLICY IF EXISTS "Staf bisa membaca seluruh log audit" ON public.activity_logs;
DROP POLICY IF EXISTS "Mahasiswa hanya bisa mencatat log aktivitas miliknya" ON public.activity_logs;
DROP POLICY IF EXISTS "Admin & Kordas bisa menghapus log audit" ON public.activity_logs;

CREATE POLICY "Staf bisa membaca seluruh log audit" ON public.activity_logs
    FOR SELECT TO authenticated USING (public.auth_role() IN ('admin', 'kordas', 'asisten'));
CREATE POLICY "Mahasiswa hanya bisa mencatat log aktivitas miliknya" ON public.activity_logs
    FOR INSERT TO authenticated WITH CHECK (nim = public.auth_nim());
CREATE POLICY "Admin & Kordas bisa menghapus log audit" ON public.activity_logs
    FOR DELETE TO authenticated USING (public.auth_role() IN ('admin', 'kordas'));


-- =========================================================================
-- 13. TABEL: student_progress (Progres Materi Pelajaran)
-- =========================================================================
-- Bagian Kunci Pengaman Utama Progres Belajar Mahasiswa
DROP POLICY IF EXISTS "Asisten ke atas bisa melihat progress semua mahasiswa" ON public.student_progress;
DROP POLICY IF EXISTS "Mahasiswa hanya bisa modifikasi progress-nya sendiri" ON public.student_progress;
DROP POLICY IF EXISTS "Staf bisa mengelola progres belajar praktikan" ON public.student_progress;
DROP POLICY IF EXISTS "Mahasiswa hanya bisa melihat progresnya sendiri" ON public.student_progress;
DROP POLICY IF EXISTS "Staf bisa melihat seluruh progres mahasiswa" ON public.student_progress;
DROP POLICY IF EXISTS "Mahasiswa hanya bisa menambah progresnya sendiri" ON public.student_progress;
DROP POLICY IF EXISTS "Staf bisa mengelola progres belajar seluruh mahasiswa" ON public.student_progress;

-- A. Mahasiswa hanya bisa melihat daftar pelajaran yang telah mereka selesaikan sendiri
CREATE POLICY "Mahasiswa hanya bisa melihat progresnya sendiri" ON public.student_progress
    FOR SELECT TO authenticated USING (nim = public.auth_nim());

-- B. Staf (admin/kordas/asisten) bisa melihat progres semua praktikan untuk pemantauan
CREATE POLICY "Staf bisa melihat seluruh progres mahasiswa" ON public.student_progress
    FOR SELECT TO authenticated USING (public.auth_role() IN ('admin', 'kordas', 'asisten'));

-- C. Mahasiswa hanya bisa mencatat materi pelajaran baru yang diselesaikan (INSERT),
--    serta dikunci hanya untuk NIM milik mereka sendiri.
CREATE POLICY "Mahasiswa hanya bisa menambah progresnya sendiri" ON public.student_progress
    FOR INSERT TO authenticated WITH CHECK (nim = public.auth_nim());

-- D. Hanya Staf yang memegang hak penuh (SELECT, INSERT, UPDATE, DELETE).
--    Ini mencegah mahasiswa mengubah/menghapus data lama, namun staf tetap bisa mereset progres belajar praktikan.
CREATE POLICY "Staf bisa mengelola progres belajar seluruh mahasiswa" ON public.student_progress
    FOR ALL TO authenticated USING (public.auth_role() IN ('admin', 'kordas', 'asisten'));


-- =========================================================================
-- 14. TRIGGER DATABASE: Pembatasan Kecepatan Belajar (Anti-Cheat Velocity)
-- =========================================================================
-- Mencegah mahasiswa melakukan spamming/looping kueri INSERT secara instan
-- menggunakan skrip otomatis/konsol dengan membatasi jeda minimal antar-materi.
-- =========================================================================

CREATE OR REPLACE FUNCTION public.check_progress_velocity()
RETURNS TRIGGER AS $$
DECLARE
    last_completion TIMESTAMPTZ;
    min_delay INTERVAL := '1 minute'; -- Jeda minimal antar penyelesaian materi
    daily_levels_count INTEGER;
    new_lesson_level_id TEXT;
    level_already_accessed_today BOOLEAN;
    max_daily_levels INTEGER := 1; -- Jumlah LEVEL maksimal yang bisa dipelajari/diakses per hari
BEGIN
    -- 1. Cari timestamp materi terakhir yang diselesaikan oleh NIM ini
    SELECT completed_at INTO last_completion
    FROM public.student_progress
    WHERE nim = NEW.nim
    ORDER BY completed_at DESC
    LIMIT 1;

    -- 2. Jika ada materi sebelumnya, periksa apakah jeda waktunya terlalu cepat
    IF last_completion IS NOT NULL AND (NEW.completed_at - last_completion) < min_delay THEN
        RAISE EXCEPTION 'Aktivitas Mencurigakan: Anda menyelesaikan materi terlalu cepat! Harap baca materi dengan seksama.';
    END IF;

    -- 3. Cari level_id untuk pelajaran baru yang sedang dicoba diselesaikan
    SELECT m.level_id INTO new_lesson_level_id
    FROM public.lessons l
    JOIN public.modules m ON l.module_id = m.id
    WHERE l.id = NEW.lesson_id;

    -- 4. Batasan Level Harian: Hitung berapa banyak Level (distinct level_id)
    --    yang diakses/diselesaikan dalam 24 jam terakhir.
    SELECT COUNT(DISTINCT m.level_id) INTO daily_levels_count
    FROM public.student_progress sp
    JOIN public.lessons l ON sp.lesson_id = l.id
    JOIN public.modules m ON l.module_id = m.id
    WHERE sp.nim = NEW.nim
      AND sp.completed_at > NOW() - INTERVAL '24 hours';

    -- 5. Periksa apakah level pelajaran baru ini sudah pernah diakses hari ini
    SELECT EXISTS (
        SELECT 1 
        FROM public.student_progress sp
        JOIN public.lessons l ON sp.lesson_id = l.id
        JOIN public.modules m ON l.module_id = m.id
        WHERE sp.nim = NEW.nim
          AND m.level_id = new_lesson_level_id
          AND sp.completed_at > NOW() - INTERVAL '24 hours'
    ) INTO level_already_accessed_today;

    -- Jika mencoba membuka level baru, dan kuota level harian sudah habis, blokir kueri.
    IF NOT level_already_accessed_today AND daily_levels_count >= max_daily_levels THEN
        RAISE EXCEPTION 'Batas Tingkat Harian Terlampaui: Anda hanya diperbolehkan mempelajari maksimal % level dalam 24 jam. Harap kuasai materi hari ini sebelum melaju ke tingkat berikutnya.', max_daily_levels;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_check_progress_velocity ON public.student_progress;
CREATE TRIGGER trigger_check_progress_velocity
BEFORE INSERT ON public.student_progress
FOR EACH ROW
EXECUTE FUNCTION public.check_progress_velocity();
