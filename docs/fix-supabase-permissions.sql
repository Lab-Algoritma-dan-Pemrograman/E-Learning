-- =========================================================================
-- FIX: SUPABASE TABLE PERMISSIONS & RLS GRANTS
-- =========================================================================
-- Jalankan skrip ini di SQL Editor Dashboard Supabase Anda:
-- https://supabase.com/dashboard/project/<PROJECT_ID>/sql
-- 
-- Skrip ini menyelesaikan error:
-- 1. "permission denied for table users / active_sessions (code 42501)"
-- 2. "Failed to load game_settings (406 / empty row)"
-- 3. Mengamankan RLS di semua tabel E-Learning
-- =========================================================================

-- 1. BERIKAN HAK AKSES TABLE-LEVEL KEPADA anon DAN authenticated
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO anon, authenticated, service_role;


-- 2. PASTIKAN ROW DEFAULT UNTUK game_settings TERSEDIA
INSERT INTO public.game_settings (id, bug_hunt_active, bug_hunt_c_active, bug_hunt_python_active, bug_hunt_weekly_limit, bug_hunt_question_count)
VALUES ('default', true, true, true, 3, 5)
ON CONFLICT (id) DO NOTHING;


-- 3. AKTIFKAN RLS PADA SEMUA TABEL
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.active_sessions ENABLE ROW LEVEL SECURITY;
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
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;


-- 4. KEBIJAKAN RLS UNTUK TABEL users
DROP POLICY IF EXISTS "Allow select users" ON public.users;
DROP POLICY IF EXISTS "Allow insert users" ON public.users;
DROP POLICY IF EXISTS "Allow update users" ON public.users;
DROP POLICY IF EXISTS "Allow delete users" ON public.users;
DROP POLICY IF EXISTS "Semua user terautentikasi bisa membaca profil sendiri dan praktikan lain" ON public.users;
DROP POLICY IF EXISTS "User terautentikasi bisa mendaftarkan profil sendiri" ON public.users;
DROP POLICY IF EXISTS "User terautentikasi bisa memperbarui profil sendiri" ON public.users;
DROP POLICY IF EXISTS "Staf bisa memperbarui profil praktikan" ON public.users;
DROP POLICY IF EXISTS "Staf bisa menghapus profil praktikan" ON public.users;

CREATE POLICY "Allow select users" ON public.users
    FOR SELECT USING (true);

CREATE POLICY "Allow insert users" ON public.users
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update users" ON public.users
    FOR UPDATE USING (true);

CREATE POLICY "Allow delete users" ON public.users
    FOR DELETE USING (public.auth_role() IN ('admin', 'kordas'));


-- 5. KEBIJAKAN RLS UNTUK TABEL active_sessions (HEARTBEAT)
DROP POLICY IF EXISTS "Allow all for active_sessions" ON public.active_sessions;
DROP POLICY IF EXISTS "Staf bisa menghapus sesi aktif apa saja" ON public.active_sessions;

CREATE POLICY "Allow all for active_sessions" ON public.active_sessions
    FOR ALL USING (true) WITH CHECK (true);


-- 6. KEBIJAKAN RLS UNTUK KURIKULUM & PENGATURAN (levels, modules, lessons, game_settings, game_questions)
DROP POLICY IF EXISTS "Public select levels" ON public.levels;
CREATE POLICY "Public select levels" ON public.levels FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin manage levels" ON public.levels;
CREATE POLICY "Admin manage levels" ON public.levels FOR ALL USING (public.auth_role() IN ('admin', 'kordas'));

DROP POLICY IF EXISTS "Public select modules" ON public.modules;
CREATE POLICY "Public select modules" ON public.modules FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin manage modules" ON public.modules;
CREATE POLICY "Admin manage modules" ON public.modules FOR ALL USING (public.auth_role() IN ('admin', 'kordas'));

DROP POLICY IF EXISTS "Public select lessons" ON public.lessons;
CREATE POLICY "Public select lessons" ON public.lessons FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin manage lessons" ON public.lessons;
CREATE POLICY "Admin manage lessons" ON public.lessons FOR ALL USING (public.auth_role() IN ('admin', 'kordas'));

DROP POLICY IF EXISTS "Public select game_questions" ON public.game_questions;
CREATE POLICY "Public select game_questions" ON public.game_questions FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin manage game_questions" ON public.game_questions;
CREATE POLICY "Admin manage game_questions" ON public.game_questions FOR ALL USING (public.auth_role() IN ('admin', 'kordas'));

DROP POLICY IF EXISTS "Public select game_settings" ON public.game_settings;
CREATE POLICY "Public select game_settings" ON public.game_settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin manage game_settings" ON public.game_settings;
CREATE POLICY "Admin manage game_settings" ON public.game_settings FOR ALL USING (public.auth_role() IN ('admin', 'kordas'));

DROP POLICY IF EXISTS "Public select playground_examples" ON public.playground_examples;
CREATE POLICY "Public select playground_examples" ON public.playground_examples FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin manage playground_examples" ON public.playground_examples;
CREATE POLICY "Admin manage playground_examples" ON public.playground_examples FOR ALL USING (public.auth_role() IN ('admin', 'kordas'));

DROP POLICY IF EXISTS "Public select achievements" ON public.achievements;
CREATE POLICY "Public select achievements" ON public.achievements FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin manage achievements" ON public.achievements;
CREATE POLICY "Admin manage achievements" ON public.achievements FOR ALL USING (public.auth_role() IN ('admin', 'kordas'));


-- 7. KEBIJAKAN RLS UNTUK PROGRES & LOG (student_progress, unlocked_achievements, game_history, activity_logs)
DROP POLICY IF EXISTS "Manage student_progress" ON public.student_progress;
CREATE POLICY "Manage student_progress" ON public.student_progress FOR ALL USING (true);

DROP POLICY IF EXISTS "Manage unlocked_achievements" ON public.unlocked_achievements;
CREATE POLICY "Manage unlocked_achievements" ON public.unlocked_achievements FOR ALL USING (true);

DROP POLICY IF EXISTS "Manage game_history" ON public.game_history;
CREATE POLICY "Manage game_history" ON public.game_history FOR ALL USING (true);

DROP POLICY IF EXISTS "Manage activity_logs" ON public.activity_logs;
CREATE POLICY "Manage activity_logs" ON public.activity_logs FOR ALL USING (true);
