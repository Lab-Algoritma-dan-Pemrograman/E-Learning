-- =========================================================================
-- COMPLETE SUPABASE DATABASE SETUP SCRIPT (E-LEARNING)
-- =========================================================================
-- Jalankan skrip ini di SQL Editor Supabase project baru Anda:
-- https://supabase.com/dashboard/project/<PROJECT_ID>/sql
-- =========================================================================

-- 1. HELPER FUNCTIONS
-- =========================================================================

CREATE OR REPLACE FUNCTION public.auth_nim() 
RETURNS TEXT AS $$
BEGIN
  RETURN COALESCE(
    current_setting('request.jwt.claims', true)::json->>'nim',
    current_setting('request.jwt.claims', true)::json->>'sub',
    current_setting('request.jwt.claims', true)::json->>'username'
  );
EXCEPTION WHEN OTHERS THEN
  RETURN NULL;
END;
$$ LANGUAGE plpgsql STABLE;

CREATE OR REPLACE FUNCTION public.auth_role() 
RETURNS TEXT AS $$
DECLARE
  raw_role TEXT;
  user_role TEXT;
BEGIN
  IF current_user IN ('postgres', 'supabase_admin') THEN
    RETURN 'admin';
  END IF;

  IF current_setting('request.jwt.claims', true) IS NULL OR current_setting('request.jwt.claims', true) = '' THEN
    RETURN 'admin';
  END IF;

  raw_role := current_setting('request.jwt.claims', true)::json->>'role';
  IF raw_role = 'service_role' THEN
    RETURN 'admin';
  END IF;

  user_role := LOWER(TRIM(COALESCE(
    current_setting('request.jwt.claims', true)::json->>'user_role',
    current_setting('request.jwt.claims', true)::json->>'role',
    'praktikan'
  )));

  IF user_role IN ('admin', 'superadmin', 'super_admin', 'administrator', 'super admin') THEN
    RETURN 'admin';
  ELSIF user_role IN ('kordas', 'koordinator', 'korda', 'coordinator') THEN
    RETURN 'kordas';
  ELSIF user_role IN ('asisten', 'assistant', 'laboran', 'ast') THEN
    RETURN 'asisten';
  ELSE
    RETURN 'praktikan';
  END IF;
EXCEPTION WHEN OTHERS THEN
  RETURN 'praktikan';
END;
$$ LANGUAGE plpgsql STABLE;

CREATE OR REPLACE FUNCTION public.calculate_level(xp INTEGER)
RETURNS INTEGER AS $$
BEGIN
  IF xp IS NULL OR xp <= 0 THEN
    RETURN 1;
  END IF;
  RETURN FLOOR(SQRT(xp::FLOAT / 50.0)) + 1;
END;
$$ LANGUAGE plpgsql IMMUTABLE;


-- 2. CREATE CORE TABLES
-- =========================================================================

CREATE TABLE IF NOT EXISTS public.users (
    nim TEXT PRIMARY KEY,
    nama TEXT NOT NULL,
    kelas TEXT NOT NULL,
    jurusan TEXT,
    email TEXT,
    role TEXT NOT NULL DEFAULT 'praktikan',
    xp INTEGER NOT NULL DEFAULT 0,
    level INTEGER NOT NULL DEFAULT 1,
    streak INTEGER NOT NULL DEFAULT 0,
    study_time INTEGER DEFAULT 0,
    last_active TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    assessment_access JSONB DEFAULT '{"pre_test": false, "post_test": false, "program_keterampilan": false, "ujian_praktik": false}'::jsonb,
    level_access_overrides JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS public.active_sessions (
    nim TEXT PRIMARY KEY,
    nama TEXT NOT NULL,
    kelas TEXT NOT NULL,
    last_heartbeat TIMESTAMPTZ DEFAULT NOW(),
    current_activity TEXT DEFAULT 'dashboard'
);

CREATE TABLE IF NOT EXISTS public.levels (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    access_mode TEXT DEFAULT 'unlocked',
    locked BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.modules (
    id TEXT PRIMARY KEY,
    level_id TEXT NOT NULL REFERENCES public.levels(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.lessons (
    id TEXT PRIMARY KEY,
    module_id TEXT NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    explanation TEXT,
    code_example TEXT,
    initial_code TEXT,
    solution TEXT,
    hint TEXT,
    quiz JSONB,
    test_cases JSONB DEFAULT '[]'::jsonb,
    validation_rules JSONB DEFAULT '[]'::jsonb,
    xp_reward INTEGER DEFAULT 60,
    sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.student_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nim TEXT NOT NULL,
    lesson_id TEXT NOT NULL,
    completed BOOLEAN DEFAULT TRUE,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    score INTEGER DEFAULT 100,
    UNIQUE(nim, lesson_id)
);

CREATE TABLE IF NOT EXISTS public.game_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    language TEXT NOT NULL,
    question TEXT NOT NULL,
    buggy_code TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_option INTEGER NOT NULL,
    explanation TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.game_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    bug_hunt_active BOOLEAN DEFAULT TRUE,
    bug_hunt_c_active BOOLEAN DEFAULT TRUE,
    bug_hunt_python_active BOOLEAN DEFAULT TRUE,
    bug_hunt_weekly_limit INTEGER DEFAULT 3,
    bug_hunt_question_count INTEGER DEFAULT 5
);

CREATE TABLE IF NOT EXISTS public.game_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nim TEXT NOT NULL,
    game_type TEXT NOT NULL,
    score INTEGER NOT NULL,
    xp_earned INTEGER NOT NULL,
    played_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.achievements (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT,
    category TEXT,
    requirement_type TEXT,
    requirement_value INTEGER,
    xp_reward INTEGER DEFAULT 50
);

CREATE TABLE IF NOT EXISTS public.unlocked_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nim TEXT NOT NULL,
    achievement_id TEXT NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(nim, achievement_id)
);

CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nim TEXT,
    nama TEXT NOT NULL,
    event_type TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    details TEXT,
    ip_address TEXT
);

CREATE TABLE IF NOT EXISTS public.playground_examples (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    language TEXT NOT NULL,
    description TEXT,
    code TEXT NOT NULL
);


-- 3. CREATE SECURE VIEW: student_lessons (Hides solutions from students)
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
    quiz,
    test_cases,
    validation_rules,
    xp_reward,
    sort_order,
    CASE 
        WHEN public.auth_role() IN ('admin', 'kordas', 'asisten') THEN solution
        ELSE NULL
    END AS solution
FROM public.lessons;


-- 4. INSERT DEFAULT SEED DATA
-- =========================================================================

INSERT INTO public.game_settings (id, bug_hunt_active, bug_hunt_c_active, bug_hunt_python_active, bug_hunt_weekly_limit, bug_hunt_question_count)
VALUES ('default', true, true, true, 3, 5)
ON CONFLICT (id) DO NOTHING;


-- 5. TABLE-LEVEL PRIVILEGES (Mencegah Error 42501 Permission Denied)
-- =========================================================================

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO anon, authenticated, service_role;


-- 6. CONFIGURE ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.active_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.unlocked_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playground_examples ENABLE ROW LEVEL SECURITY;

-- users policies
DROP POLICY IF EXISTS "Allow select users" ON public.users;
DROP POLICY IF EXISTS "Allow insert users" ON public.users;
DROP POLICY IF EXISTS "Allow update users" ON public.users;
DROP POLICY IF EXISTS "Allow delete users" ON public.users;

CREATE POLICY "Allow select users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow insert users" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update users" ON public.users FOR UPDATE USING (true);
CREATE POLICY "Allow delete users" ON public.users FOR DELETE USING (public.auth_role() IN ('admin', 'kordas'));

-- active_sessions policies
DROP POLICY IF EXISTS "Allow all for active_sessions" ON public.active_sessions;
CREATE POLICY "Allow all for active_sessions" ON public.active_sessions FOR ALL USING (true) WITH CHECK (true);

-- curriculum policies
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

-- game & achievements policies
DROP POLICY IF EXISTS "Public select game_questions" ON public.game_questions;
CREATE POLICY "Public select game_questions" ON public.game_questions FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin manage game_questions" ON public.game_questions;
CREATE POLICY "Admin manage game_questions" ON public.game_questions FOR ALL USING (public.auth_role() IN ('admin', 'kordas'));

DROP POLICY IF EXISTS "Public select game_settings" ON public.game_settings;
CREATE POLICY "Public select game_settings" ON public.game_settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin manage game_settings" ON public.game_settings;
CREATE POLICY "Admin manage game_settings" ON public.game_settings FOR ALL USING (public.auth_role() IN ('admin', 'kordas'));

DROP POLICY IF EXISTS "Public select achievements" ON public.achievements;
CREATE POLICY "Public select achievements" ON public.achievements FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin manage achievements" ON public.achievements;
CREATE POLICY "Admin manage achievements" ON public.achievements FOR ALL USING (public.auth_role() IN ('admin', 'kordas'));

DROP POLICY IF EXISTS "Public select playground_examples" ON public.playground_examples;
CREATE POLICY "Public select playground_examples" ON public.playground_examples FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin manage playground_examples" ON public.playground_examples;
CREATE POLICY "Admin manage playground_examples" ON public.playground_examples FOR ALL USING (public.auth_role() IN ('admin', 'kordas'));

-- student tracking & history policies
DROP POLICY IF EXISTS "Manage student_progress" ON public.student_progress;
CREATE POLICY "Manage student_progress" ON public.student_progress FOR ALL USING (true);

DROP POLICY IF EXISTS "Manage unlocked_achievements" ON public.unlocked_achievements;
CREATE POLICY "Manage unlocked_achievements" ON public.unlocked_achievements FOR ALL USING (true);

DROP POLICY IF EXISTS "Manage game_history" ON public.game_history;
CREATE POLICY "Manage game_history" ON public.game_history FOR ALL USING (true);

DROP POLICY IF EXISTS "Manage activity_logs" ON public.activity_logs;
CREATE POLICY "Manage activity_logs" ON public.activity_logs FOR ALL USING (true);
