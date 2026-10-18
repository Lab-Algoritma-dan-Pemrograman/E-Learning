-- =========================================================================
-- MIGRATION: Weekly leaderboard standings (history top learner mingguan)
-- Patokan minggu: Asia/Jakarta, Senin 00:00 - Minggu 23:59:59 WIB
-- UTC di DB: Senin 00:00 WIB = Minggu 17:00 UTC (WIB = UTC+7, tanpa DST)
-- Jalankan di Supabase SQL Editor (project oidwvfcxlxfyojkyurmm)
-- =========================================================================

CREATE TABLE IF NOT EXISTS public.weekly_standings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  week_start DATE NOT NULL,              -- tanggal Senin (kalender Jakarta), mis. 2025-10-13
  nim TEXT NOT NULL,
  nama TEXT NOT NULL,
  kelas TEXT,
  shift TEXT,
  jurusan TEXT,
  weekly_xp INTEGER NOT NULL DEFAULT 0,  -- total minggu itu (lesson base + bughunt)
  lesson_xp INTEGER NOT NULL DEFAULT 0,  -- base XP lesson (STERIL multiplier)
  bughunt_xp INTEGER NOT NULL DEFAULT 0,
  lessons_completed INTEGER NOT NULL DEFAULT 0,
  prestige_tier TEXT,                    -- diisi tahap prestige; tahap 1 = NULL
  prestige_count INTEGER NOT NULL DEFAULT 0,
  rank INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (week_start, nim)
);

CREATE INDEX IF NOT EXISTS idx_weekly_standings_week
  ON public.weekly_standings (week_start DESC, weekly_xp DESC);
CREATE INDEX IF NOT EXISTS idx_weekly_standings_nim
  ON public.weekly_standings (nim, week_start DESC);
CREATE INDEX IF NOT EXISTS idx_weekly_standings_kelas_shift
  ON public.weekly_standings (week_start, kelas, shift);

ALTER TABLE public.weekly_standings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Semua user bisa baca weekly_standings" ON public.weekly_standings;
CREATE POLICY "Semua user bisa baca weekly_standings"
  ON public.weekly_standings FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Staff bisa arsip weekly_standings" ON public.weekly_standings;
CREATE POLICY "Staff bisa arsip weekly_standings"
  ON public.weekly_standings FOR INSERT TO authenticated
  WITH CHECK (public.auth_role() IN ('admin', 'kordas', 'asisten'));

DROP POLICY IF EXISTS "Staff bisa update weekly_standings" ON public.weekly_standings;
CREATE POLICY "Staff bisa update weekly_standings"
  ON public.weekly_standings FOR UPDATE TO authenticated
  USING (public.auth_role() IN ('admin', 'kordas', 'asisten'))
  WITH CHECK (public.auth_role() IN ('admin', 'kordas', 'asisten'));

-- Helper: awal minggu (Senin) kalender Jakarta untuk timestamp apapun.
-- Pakai di query agregasi supaya batas minggu selalu WIB, bukan waktu laptop.
CREATE OR REPLACE FUNCTION public.jakarta_week_start(ts TIMESTAMPTZ)
RETURNS DATE AS $$
  -- Geser ke WIB (+7 jam), ambil tanggalnya, mundur ke Senin, kembalikan sebagai DATE
  SELECT (date_trunc('week', (ts AT TIME ZONE 'Asia/Jakarta'))::date);
$$ LANGUAGE sql IMMUTABLE;

-- Contoh agregasi mingguan referensi (base XP, steril multiplier):
-- SELECT u.nim, u.nama, u.kelas, u.shift,
--   COALESCE((
--     SELECT SUM(COALESCE(l.xp_reward, 60))
--     FROM public.student_progress sp
--     JOIN public.lessons l ON l.id = sp.lesson_id
--     WHERE sp.nim = u.nim AND sp.completed
--       AND (sp.completed_at AT TIME ZONE 'Asia/Jakarta') >= w.ws
--       AND (sp.completed_at AT TIME ZONE 'Asia/Jakarta') <  w.ws + INTERVAL '7 days'
--   ), 0) AS lesson_xp,
--   COALESCE((
--     SELECT SUM(gh.xp_earned)
--     FROM public.game_history gh
--     WHERE gh.nim = u.nim
--       AND (gh.played_at AT TIME ZONE 'Asia/Jakarta') >= w.ws
--       AND (gh.played_at AT TIME ZONE 'Asia/Jakarta') <  w.ws + INTERVAL '7 days'
--   ), 0) AS bughunt_xp
-- FROM public.users u, (SELECT date_trunc('week', (NOW() AT TIME ZONE 'Asia/Jakarta'))::date AS ws) w
-- WHERE u.role = 'mahasiswa';

-- Cron snapshot otomatis tiap Senin 00:05 WIB (= Minggu 17:05 UTC).
-- Aktifkan hanya jika ekstensi pg_cron tersedia di project. Jika tidak ada,
-- pakai tombol "Arsipkan Minggu Ini" di dashboard staff (memanggil service
-- saveWeeklySnapshot) atau jalankan INSERT manual dari hasil agregasi.
-- SELECT cron.schedule(
--   'snapshot-weekly-standings',
--   '5 17 * * 0',
--   $$SELECT 1$$
-- );
-- NOTE: isi body cron menyusul setelah RPC snapshot dibuat (tahap 1 pakai
-- snapshot manual dari client staff agar tidak bergantung pg_cron).
