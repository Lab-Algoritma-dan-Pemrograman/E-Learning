-- ============================================================================
-- FIX 2026-10-26: XP/level server-side rusak total di project oidwvfcxlxfyojkyurmm
-- ============================================================================
-- GEJALA
--   Leaderboard menampilkan 26 mahasiswa dengan XP persis 4920 berderet, dan
--   sebagian mahasiswa yang sudah tamat 81 lesson tampil dengan XP 58-200.
--
-- AKAR MASALAH (3 lapis, semuanya harus diperbaiki)
--   1. public.calculate_level(integer) TIDAK ADA di database, padahal
--      check_user_xp_level() memanggilnya. Setiap UPDATE users oleh mahasiswa
--      gagal: "function public.calculate_level(integer) does not exist".
--      Efeknya XP dan last_active mahasiswa berhenti tersimpan sejak lama.
--   2. check_user_xp_level() membaca tabel public.lessons, sedangkan RLS
--      lessons hanya mengizinkan staf (tabel memuat correctAnswer; mahasiswa
--      dilayani view student_lessons). Bagi mahasiswa, SUM(xp_reward)=0,
--      jadi cap XP = game_sum saja dan setiap update wajar ditolak.
--   3. progressService.completeLesson() melakukan read-modify-write XP di
--      klien: newXp = user.xp + reward dari store lokal yang bisa basi. Nilai
--      basi lolos karena trigger lama hanya menolak XP di ATAS cap, tidak
--      mendeteksi XP yang turun. Ini sumber 4920 massal dan XP hilang.
--
-- PERBAIKAN
--   a. Buat calculate_level(xp integer) = floor(sqrt(xp/50))+1 (sama dengan
--      progressService.calculateLevel di frontend).
--   b. Trigger membaca student_lessons (view, sudah di-GRANT ke authenticated)
--      dan sengaja TIDAK SECURITY DEFINER supaya auth_role() tetap membaca
--      current_user pemanggil. Kalau SECURITY DEFINER, auth_role() melihat
--      'postgres' dan menganggap semua pemanggil admin -> guard mati.
--   c. Trigger MENETAPKAN XP dari sumber (bukan mempercayai klien), jadi
--      nilai basi/gelembung sembuh sendiri pada update berikutnya.
--   d. lessons.xp_reward yang NULL diisi 60 (ada 3 baris; SUM melewati NULL
--      sehingga base XP kurang 180 bagi yang menyelesaikannya).
--   e. users.xp dinormalisasi ke rumus trigger untuk 374 mahasiswa.
--   f. xp_bonus sumber 'kunci-migrasi-20261019' dihapus: itu sisa sistem XP
--      lama yang sudah di-rollback (scripts/xp_sync/03_*) dan menjadi sumber
--      180 XP siluman pada 54 mahasiswa.
-- ============================================================================

-- a. Fungsi level yang hilang.
CREATE OR REPLACE FUNCTION public.calculate_level(xp integer)
RETURNS integer
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
    IF xp IS NULL OR xp <= 0 THEN
        RETURN 1;
    END IF;
    RETURN FLOOR(SQRT(xp::numeric / 50.0))::integer + 1;
END;
$$;

-- b/c. Trigger: baca student_lessons, tetapkan XP dari sumber.
CREATE OR REPLACE FUNCTION public.check_user_xp_level()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
    lesson_base INTEGER;
    game_sum INTEGER;
    mult NUMERIC(4,2);
    server_calculated_xp INTEGER;
BEGIN
    IF public.auth_role() NOT IN ('admin', 'kordas') THEN
        lesson_base :=
            (SELECT COALESCE(SUM(l.xp_reward), 0)
             FROM public.student_progress sp
             JOIN public.student_lessons l ON sp.lesson_id = l.id
             WHERE sp.nim = NEW.nim AND sp.completed);
        game_sum :=
            (SELECT COALESCE(SUM(gh.xp_earned), 0)
             FROM public.game_history gh
             WHERE gh.nim = NEW.nim);
        mult := COALESCE(NEW.prestige_mult, 1.00);
        IF mult < 1.00 THEN mult := 1.00; END IF;
        IF mult > 1.50 THEN mult := 1.50; END IF;
        NEW.prestige_mult := mult;

        server_calculated_xp := FLOOR(lesson_base * mult)::INTEGER + game_sum;

        IF NEW.xp IS DISTINCT FROM OLD.xp
           AND OLD.xp IS NOT NULL
           AND NEW.xp > server_calculated_xp THEN
            RAISE NOTICE 'XP klien (%) di atas cap (%), ditimpa ke cap untuk NIM %',
                NEW.xp, server_calculated_xp, NEW.nim;
        END IF;

        NEW.xp := server_calculated_xp;
        NEW.level := public.calculate_level(NEW.xp);
    END IF;

    RETURN NEW;
END;
$$;

-- d. xp_reward NULL -> 60.
UPDATE lessons SET xp_reward = 60 WHERE xp_reward IS NULL;

-- e. Normalisasi users.xp ke rumus trigger.
WITH calc AS (
  SELECT u.id,
    (floor(coalesce(sum(l.xp_reward) FILTER (WHERE sp.completed), 0) * u.prestige_mult)
      + coalesce((SELECT sum(gh.xp_earned) FROM game_history gh WHERE gh.nim = u.nim), 0))::int AS xp_baru,
    u.xp AS xp_lama
  FROM users u
  LEFT JOIN student_progress sp ON sp.nim = u.nim
  LEFT JOIN lessons l ON l.id = sp.lesson_id
  WHERE u.role = 'mahasiswa'
  GROUP BY u.id, u.xp, u.prestige_mult
)
UPDATE users u SET xp = c.xp_baru, level = public.calculate_level(c.xp_baru)
FROM calc c WHERE c.id = u.id AND c.xp_lama <> c.xp_baru;

-- f. Buang bonus warisan sistem XP lama.
DELETE FROM xp_bonus WHERE sumber = 'kunci-migrasi-20261019';

-- ============================================================================
-- VERIFIKASI (harus 374/374 cocok, 0 level salah)
-- ============================================================================
-- SELECT count(*) total,
--        count(*) FILTER (WHERE xp = cap) cocok,
--        count(*) FILTER (WHERE level <> public.calculate_level(xp)) level_salah
-- FROM (
--   SELECT u.nim, u.xp, u.level,
--     (floor(coalesce(sum(l.xp_reward) FILTER (WHERE sp.completed), 0) * u.prestige_mult)
--       + coalesce((SELECT sum(gh.xp_earned) FROM game_history gh WHERE gh.nim = u.nim), 0))::int cap
--   FROM users u
--   LEFT JOIN student_progress sp ON sp.nim = u.nim
--   LEFT JOIN lessons l ON l.id = sp.lesson_id
--   WHERE u.role = 'mahasiswa'
--   GROUP BY u.nim, u.xp, u.level, u.prestige_mult
-- ) h;

-- ============================================================================
-- CATATAN KENAPA BUKAN SECURITY DEFINER
-- ============================================================================
-- auth_role() memeriksa current_user lebih dulu:
--   IF current_user IN ('postgres','supabase_admin') THEN RETURN 'admin';
-- Dengan SECURITY DEFINER, current_user berubah jadi pemilik fungsi, sehingga
-- SEMUA pemanggil dianggap admin dan seluruh guard XP dilewati. Percobaan
-- pertama memakai SECURITY DEFINER dan terbukti meloloskan update xp=99999.
