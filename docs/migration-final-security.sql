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
