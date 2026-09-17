-- =========================================================================
-- MIGRATION: FINAL SECURITY & RLS POLICIES
-- Jalankan skrip ini di SQL Editor Supabase untuk mengamankan database
-- dan mengizinkan admin/kordas mengelola kurikulum & log audit.
-- =========================================================================

-- 1. AKTIFKAN RLS PADA TABEL KURIKULUM & PENGATURAN GAME
ALTER TABLE levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_settings ENABLE ROW LEVEL SECURITY;

-- 2. KEBIJAKAN UNTUK TABEL: levels
DROP POLICY IF EXISTS "Semua user bisa melihat level" ON levels;
DROP POLICY IF EXISTS "Hanya Admin & Kordas yang bisa mengelola level" ON levels;

CREATE POLICY "Semua user bisa melihat level" ON levels
    FOR SELECT USING (true);
CREATE POLICY "Hanya Admin & Kordas yang bisa mengelola level" ON levels
    FOR ALL USING (public.auth_role() IN ('admin', 'kordas'));

-- 3. KEBIJAKAN UNTUK TABEL: modules
DROP POLICY IF EXISTS "Semua user bisa melihat modul" ON modules;
DROP POLICY IF EXISTS "Hanya Admin & Kordas yang bisa mengelola modul" ON modules;

CREATE POLICY "Semua user bisa melihat modul" ON modules
    FOR SELECT USING (true);
CREATE POLICY "Hanya Admin & Kordas yang bisa mengelola modul" ON modules
    FOR ALL USING (public.auth_role() IN ('admin', 'kordas'));

-- 4. KEBIJAKAN UNTUK TABEL: lessons
DROP POLICY IF EXISTS "Semua user bisa melihat pelajaran" ON lessons;
DROP POLICY IF EXISTS "Hanya Admin & Kordas yang bisa mengelola pelajaran" ON lessons;

CREATE POLICY "Semua user bisa melihat pelajaran" ON lessons
    FOR SELECT USING (true);
CREATE POLICY "Hanya Admin & Kordas yang bisa mengelola pelajaran" ON lessons
    FOR ALL USING (public.auth_role() IN ('admin', 'kordas'));

-- 5. KEBIJAKAN UNTUK TABEL: game_questions
DROP POLICY IF EXISTS "Semua user bisa melihat game questions" ON game_questions;
DROP POLICY IF EXISTS "Hanya Admin & Kordas yang bisa mengelola game questions" ON game_questions;

CREATE POLICY "Semua user bisa melihat game questions" ON game_questions
    FOR SELECT USING (true);
CREATE POLICY "Hanya Admin & Kordas yang bisa mengelola game questions" ON game_questions
    FOR ALL USING (public.auth_role() IN ('admin', 'kordas'));

-- 6. KEBIJAKAN UNTUK TABEL: game_settings
DROP POLICY IF EXISTS "Semua user bisa melihat game settings" ON game_settings;
DROP POLICY IF EXISTS "Hanya Admin & Kordas yang bisa mengelola game settings" ON game_settings;

CREATE POLICY "Semua user bisa melihat game settings" ON game_settings
    FOR SELECT USING (true);
CREATE POLICY "Hanya Admin & Kordas yang bisa mengelola game settings" ON game_settings
    FOR ALL USING (public.auth_role() IN ('admin', 'kordas'));

-- 7. KEBIJAKAN UNTUK TABEL: activity_logs (LOG AUDIT)
-- Menambahkan policy DELETE agar Admin (dan hanya Admin) bisa menghapus log audit
DROP POLICY IF EXISTS "Hanya Admin yang bisa menghapus log audit" ON activity_logs;

CREATE POLICY "Hanya Admin yang bisa menghapus log audit" ON activity_logs
    FOR DELETE USING (public.auth_role() = 'admin');

-- 8. KEBIJAKAN UNTUK SUPABASE STORAGE BUCKET: lesson-images
-- Catatan: Kebijakan ini berlaku pada tabel storage.objects.
-- Jalankan ini agar pengunggahan gambar lewat Rich Text Editor tidak terkena error RLS.

-- A. Izinkan akses publik untuk membaca berkas gambar
DROP POLICY IF EXISTS "Izinkan publik membaca gambar materi" ON storage.objects;
CREATE POLICY "Izinkan publik membaca gambar materi" ON storage.objects
    FOR SELECT USING (bucket_id = 'lesson-images');

-- B. Izinkan staf (admin, kordas, asisten) untuk mengunggah berkas gambar
DROP POLICY IF EXISTS "Izinkan staf mengunggah gambar materi" ON storage.objects;
CREATE POLICY "Izinkan staf mengunggah gambar materi" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'lesson-images'
        AND (public.auth_role() IN ('admin', 'kordas', 'asisten'))
    );

-- C. Izinkan staf memperbarui berkas gambar
DROP POLICY IF EXISTS "Izinkan staf memperbarui gambar materi" ON storage.objects;
CREATE POLICY "Izinkan staf memperbarui gambar materi" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'lesson-images'
        AND (public.auth_role() IN ('admin', 'kordas', 'asisten'))
    );

-- D. Izinkan staf menghapus berkas gambar
DROP POLICY IF EXISTS "Izinkan staf menghapus gambar materi" ON storage.objects;
CREATE POLICY "Izinkan staf menghapus gambar materi" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'lesson-images'
        AND (public.auth_role() IN ('admin', 'kordas', 'asisten'))
    );


-- 9. KEBIJAKAN UNTUK TABEL: active_sessions
-- Mengizinkan staf (admin, kordas, asisten) menghapus sesi aktif yang usang (stale sessions)
DROP POLICY IF EXISTS "Staf bisa menghapus sesi aktif apa saja" ON active_sessions;
CREATE POLICY "Staf bisa menghapus sesi aktif apa saja" ON active_sessions
    FOR DELETE USING (public.auth_role() IN ('admin', 'kordas', 'asisten'));

-- 10. KEBIJAKAN UNTUK TABEL: game_history
-- Mengaktifkan RLS pada tabel riwayat game agar aman dan berfungsi
ALTER TABLE game_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Mahasiswa hanya bisa melihat riwayat game sendiri" ON game_history;
CREATE POLICY "Mahasiswa hanya bisa melihat riwayat game sendiri" ON game_history
    FOR SELECT USING (nim = public.auth_nim());

DROP POLICY IF EXISTS "Staf bisa melihat riwayat game seluruh praktikan" ON game_history;
CREATE POLICY "Staf bisa melihat riwayat game seluruh praktikan" ON game_history
    FOR SELECT USING (public.auth_role() IN ('admin', 'kordas', 'asisten'));

DROP POLICY IF EXISTS "Mahasiswa hanya bisa mencatat riwayat game sendiri" ON game_history;
CREATE POLICY "Mahasiswa hanya bisa mencatat riwayat game sendiri" ON game_history
    FOR INSERT WITH CHECK (nim = public.auth_nim());


-- 11. KEBIJAKAN UNTUK TABEL: achievements & unlocked_achievements
-- Mengaktifkan RLS pada tabel pencapaian agar aman dan berfungsi
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE unlocked_achievements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Semua user terautentikasi bisa melihat pencapaian" ON achievements;
CREATE POLICY "Semua user terautentikasi bisa melihat pencapaian" ON achievements
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Hanya Admin & Kordas yang bisa mengelola pencapaian" ON achievements;
CREATE POLICY "Hanya Admin & Kordas yang bisa mengelola pencapaian" ON achievements
    FOR ALL USING (public.auth_role() IN ('admin', 'kordas'));

DROP POLICY IF EXISTS "Mahasiswa hanya bisa melihat pencapaian miliknya sendiri" ON unlocked_achievements;
CREATE POLICY "Mahasiswa hanya bisa melihat pencapaian miliknya sendiri" ON unlocked_achievements
    FOR SELECT USING (nim = public.auth_nim());

DROP POLICY IF EXISTS "Staf bisa melihat pencapaian seluruh praktikan" ON unlocked_achievements;
CREATE POLICY "Staf bisa melihat pencapaian seluruh praktikan" ON unlocked_achievements
    FOR SELECT USING (public.auth_role() IN ('admin', 'kordas', 'asisten'));

DROP POLICY IF EXISTS "Mahasiswa hanya bisa mencatat pencapaian miliknya sendiri" ON unlocked_achievements;
CREATE POLICY "Mahasiswa hanya bisa mencatat pencapaian miliknya sendiri" ON unlocked_achievements
    FOR INSERT WITH CHECK (nim = public.auth_nim());

DROP POLICY IF EXISTS "Staf bisa menghapus pencapaian praktikan" ON unlocked_achievements;
CREATE POLICY "Staf bisa menghapus pencapaian praktikan" ON unlocked_achievements
    FOR DELETE USING (public.auth_role() IN ('admin', 'kordas', 'asisten'));


-- 12. TRIGGER OTOMATIS: Update last_active pada users saat active_sessions terupdate
CREATE OR REPLACE FUNCTION public.update_user_last_active_from_session()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.users 
    SET last_active = NEW.last_heartbeat
    WHERE nim = NEW.nim;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_update_user_last_active ON active_sessions;
CREATE TRIGGER trigger_update_user_last_active
AFTER INSERT OR UPDATE ON active_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_user_last_active_from_session();


-- 13. KEBIJAKAN UNTUK TABEL: student_progress
-- Memastikan tabel student_progress RLS dikonfigurasi dengan benar agar staf bisa melakukan reset
DROP POLICY IF EXISTS "Mahasiswa hanya bisa modifikasi progress-nya sendiri" ON student_progress;
DROP POLICY IF EXISTS "Asisten ke atas bisa melihat progress semua mahasiswa" ON student_progress;
DROP POLICY IF EXISTS "Mahasiswa bisa mengelola progres belajarnya sendiri" ON student_progress;
DROP POLICY IF EXISTS "Staf bisa mengelola progres belajar praktikan" ON student_progress;

CREATE POLICY "Mahasiswa hanya bisa modifikasi progress-nya sendiri" ON student_progress
    FOR ALL USING (nim = public.auth_nim());

CREATE POLICY "Staf bisa mengelola progres belajar praktikan" ON student_progress
    FOR ALL USING (public.auth_role() IN ('admin', 'kordas', 'asisten'));




