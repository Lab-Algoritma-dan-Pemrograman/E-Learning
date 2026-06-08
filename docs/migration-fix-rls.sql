-- =========================================================================
-- JALANKAN SALAH SATU PILIHAN DI BAWAH INI DI SUPABASE SQL EDITOR
-- =========================================================================

-- =========================================================================
-- PILIHAN A (SANGAT DIREKOMENDASIKAN & LEBIH SEDERHANA):
-- Menonaktifkan RLS pada tabel-tabel konten statis & materi pembelajaran.
-- Tabel-tabel ini tidak berisi data sensitif user, sehingga menonaktifkan
-- RLS mempermudah skrip migrasi untuk menulis dan memperbarui kurikulum.
-- =========================================================================

ALTER TABLE levels DISABLE ROW LEVEL SECURITY;
ALTER TABLE modules DISABLE ROW LEVEL SECURITY;
ALTER TABLE lessons DISABLE ROW LEVEL SECURITY;
ALTER TABLE game_questions DISABLE ROW LEVEL SECURITY;
ALTER TABLE game_settings DISABLE ROW LEVEL SECURITY;


-- =========================================================================
-- PILIHAN B (JIKA INGIN TETAP MENGGUNAKAN RLS):
-- Mengaktifkan RLS dan membuat kebijakan (policy) agar semua user terautentikasi
-- bisa melihat (SELECT), tetapi hanya role 'admin' & 'kordas' yang bisa
-- melakukan modifikasi (INSERT/UPDATE/DELETE).
-- =========================================================================

/*
-- 1. Pastikan RLS Aktif
ALTER TABLE levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_settings ENABLE ROW LEVEL SECURITY;

-- 2. Kebijakan untuk Tabel: levels
DROP POLICY IF EXISTS "Semua user bisa melihat level" ON levels;
DROP POLICY IF EXISTS "Hanya Admin & Kordas yang bisa mengelola level" ON levels;
CREATE POLICY "Semua user bisa melihat level" ON levels
    FOR SELECT USING (true);
CREATE POLICY "Hanya Admin & Kordas yang bisa mengelola level" ON levels
    FOR ALL USING (public.auth_role() IN ('admin', 'kordas'));

-- 3. Kebijakan untuk Tabel: modules
DROP POLICY IF EXISTS "Semua user bisa melihat modul" ON modules;
DROP POLICY IF EXISTS "Hanya Admin & Kordas yang bisa mengelola modul" ON modules;
CREATE POLICY "Semua user bisa melihat modul" ON modules
    FOR SELECT USING (true);
CREATE POLICY "Hanya Admin & Kordas yang bisa mengelola modul" ON modules
    FOR ALL USING (public.auth_role() IN ('admin', 'kordas'));

-- 4. Kebijakan untuk Tabel: lessons
DROP POLICY IF EXISTS "Semua user bisa melihat pelajaran" ON lessons;
DROP POLICY IF EXISTS "Hanya Admin & Kordas yang bisa mengelola pelajaran" ON lessons;
CREATE POLICY "Semua user bisa melihat pelajaran" ON lessons
    FOR SELECT USING (true);
CREATE POLICY "Hanya Admin & Kordas yang bisa mengelola pelajaran" ON lessons
    FOR ALL USING (public.auth_role() IN ('admin', 'kordas'));

-- 5. Kebijakan untuk Tabel: game_questions
DROP POLICY IF EXISTS "Semua user bisa melihat game questions" ON game_questions;
DROP POLICY IF EXISTS "Hanya Admin & Kordas yang bisa mengelola game questions" ON game_questions;
CREATE POLICY "Semua user bisa melihat game questions" ON game_questions
    FOR SELECT USING (true);
CREATE POLICY "Hanya Admin & Kordas yang bisa mengelola game questions" ON game_questions
    FOR ALL USING (public.auth_role() IN ('admin', 'kordas'));

-- 6. Kebijakan untuk Tabel: game_settings
DROP POLICY IF EXISTS "Semua user bisa melihat game settings" ON game_settings;
DROP POLICY IF EXISTS "Hanya Admin & Kordas yang bisa mengelola game settings" ON game_settings;
CREATE POLICY "Semua user bisa melihat game settings" ON game_settings
    FOR SELECT USING (true);
CREATE POLICY "Hanya Admin & Kordas yang bisa mengelola game settings" ON game_settings
    FOR ALL USING (public.auth_role() IN ('admin', 'kordas'));
*/
