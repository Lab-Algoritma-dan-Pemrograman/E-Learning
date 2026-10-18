-- =========================================================================
-- MIGRATION: Prestige sukarela berbatas (anti-farming lesson mudah)
-- Aturan (sesuai keputusan user):
--   1. Syarat reset: tamat PENUH 6/6 level (semua lesson completed)
--   2. Cooldown 14 hari antar reset
--   3. Maks 2x per semester kuliah (Ganjil Agu-Jan / Genap Feb-Jul, WIB)
--   4. Arsip dulu sebelum hapus (progress_archive + prestige_history)
--   5. Papan Mingguan = base XP steril multiplier; multiplier lesson-only
-- Jalankan di Supabase SQL Editor (project oidwvfcxlxfyojkyurmm)
-- =========================================================================

-- 1. Kolom prestige di users ------------------------------------------------
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS prestige_tier TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS prestige_mult NUMERIC(4,2) NOT NULL DEFAULT 1.00;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS prestige_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS last_prestige_at TIMESTAMPTZ;

-- 2. Arsip progres sebelum reset (bukti belajar = bahan nilai, jangan DELETE buta)
CREATE TABLE IF NOT EXISTS public.progress_archive (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nim TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  completed_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ DEFAULT NOW(),
  prestige_no INTEGER NOT NULL DEFAULT 0,
  UNIQUE (nim, lesson_id, prestige_no)
);
CREATE INDEX IF NOT EXISTS idx_progress_archive_nim ON public.progress_archive (nim);

-- 3. Riwayat prestige (syarat validasi: cooldown + kuota semester)
CREATE TABLE IF NOT EXISTS public.prestige_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nim TEXT NOT NULL,
  prestige_no INTEGER NOT NULL,
  reset_at TIMESTAMPTZ DEFAULT NOW(),
  levels_completed INTEGER NOT NULL DEFAULT 0,
  lessons_completed INTEGER NOT NULL DEFAULT 0,
  base_xp_archived INTEGER NOT NULL DEFAULT 0,
  tier TEXT,
  mult NUMERIC(4,2) NOT NULL DEFAULT 1.00,
  UNIQUE (nim, prestige_no)
);
CREATE INDEX IF NOT EXISTS idx_prestige_history_nim ON public.prestige_history (nim, reset_at DESC);

-- 4. RLS --------------------------------------------------------------------
ALTER TABLE public.progress_archive ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prestige_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Mahasiswa baca arsip sendiri, staff baca semua" ON public.progress_archive;
CREATE POLICY "Mahasiswa baca arsip sendiri, staff baca semua" ON public.progress_archive
  FOR SELECT TO authenticated
  USING (nim = public.auth_nim() OR public.auth_role() IN ('admin', 'kordas', 'asisten'));

DROP POLICY IF EXISTS "Staff kelola arsip progres" ON public.progress_archive;
CREATE POLICY "Staff kelola arsip progres" ON public.progress_archive
  FOR ALL TO authenticated
  USING (public.auth_role() IN ('admin', 'kordas'))
  WITH CHECK (public.auth_role() IN ('admin', 'kordas'));

DROP POLICY IF EXISTS "Mahasiswa baca prestige sendiri, staff baca semua" ON public.prestige_history;
CREATE POLICY "Mahasiswa baca prestige sendiri, staff baca semua" ON public.prestige_history
  FOR SELECT TO authenticated
  USING (nim = public.auth_nim() OR public.auth_role() IN ('admin', 'kordas', 'asisten'));

DROP POLICY IF EXISTS "Staff kelola prestige_history" ON public.prestige_history;
CREATE POLICY "Staff kelola prestige_history" ON public.prestige_history
  FOR ALL TO authenticated
  USING (public.auth_role() IN ('admin', 'kordas'))
  WITH CHECK (public.auth_role() IN ('admin', 'kordas'));

-- 5. Semester kuliah (kalender Jakarta, tanpa lubang): Ganjil Agu-Jan / Genap Feb-Jul
CREATE OR REPLACE FUNCTION public.jakarta_semester(ts TIMESTAMPTZ)
RETURNS TEXT AS $$
  SELECT ((ts AT TIME ZONE 'Asia/Jakarta')::date::text);
$$ LANGUAGE sql IMMUTABLE;

-- Helper kuota: berapa kali prestige dalam semester kuliah berjalan
-- (kalender Jakarta, tanpa lubang tanggal):
--   Ganjil: 1 Agustus – 31 Januari (buffer Agustus untuk awal kuliah Sept)
--   Genap : 1 Februari – 31 Juli
-- y/m diambil dalam Asia/Jakarta, bukan UTC.
CREATE OR REPLACE FUNCTION public.prestige_count_this_semester(p_nim TEXT, p_now TIMESTAMPTZ DEFAULT NOW())
RETURNS INTEGER AS $$
DECLARE
  y INT; m INT; s_start TIMESTAMPTZ; s_end TIMESTAMPTZ;
BEGIN
  y := EXTRACT(YEAR FROM (p_now AT TIME ZONE 'Asia/Jakarta'))::INT;
  m := EXTRACT(MONTH FROM (p_now AT TIME ZONE 'Asia/Jakarta'))::INT;
  IF m BETWEEN 2 AND 7 THEN
    -- Genap: 1 Feb – 31 Jul tahun berjalan
    s_start := make_timestamptz(y, 2, 1, 0, 0, 0, 'Asia/Jakarta');
    s_end   := make_timestamptz(y, 8, 1, 0, 0, 0, 'Asia/Jakarta');
  ELSIF m >= 8 THEN
    -- Ganjil: 1 Agu tahun berjalan – 31 Jan tahun berikut
    s_start := make_timestamptz(y, 8, 1, 0, 0, 0, 'Asia/Jakarta');
    s_end   := make_timestamptz(y + 1, 2, 1, 0, 0, 0, 'Asia/Jakarta');
  ELSE
    -- Januari ikut Ganjil yang mulai Agu tahun lalu
    s_start := make_timestamptz(y - 1, 8, 1, 0, 0, 0, 'Asia/Jakarta');
    s_end   := make_timestamptz(y, 2, 1, 0, 0, 0, 'Asia/Jakarta');
  END IF;
  RETURN (SELECT COUNT(*) FROM public.prestige_history WHERE nim = p_nim AND reset_at >= s_start AND reset_at < s_end);
END;
$$ LANGUAGE plpgsql STABLE;

-- Proteksi kolom prestige: mahasiswa TIDAK boleh UPDATE langsung
-- prestige_mult / prestige_tier / prestige_count / last_prestige_at.
-- Perubahan kolom ini hanya lewat RPC SECURITY DEFINER (do_prestige_reset).
-- Dicabut via REVOKE kolom + trigger pengaman (defense in depth).
-- REVOKE dijalankan manual oleh owner bila RLS memakai role terbatas:
--   REVOKE UPDATE (prestige_mult, prestige_tier, prestige_count, last_prestige_at)
--     ON public.users FROM authenticated;
-- Trigger pengaman: tolak perubahan kolom prestige oleh non-staff,
-- kecuali last_prestige_at ikut berubah BERSAMAAN dengan xp=0 (jalur RPC).
CREATE OR REPLACE FUNCTION public.guard_prestige_columns()
RETURNS TRIGGER AS $$
BEGIN
  IF public.auth_role() NOT IN ('admin', 'kordas') THEN
    IF NEW.prestige_mult IS DISTINCT FROM OLD.prestige_mult
       OR NEW.prestige_tier IS DISTINCT FROM OLD.prestige_tier
       OR NEW.prestige_count IS DISTINCT FROM OLD.prestige_count THEN
      RAISE EXCEPTION 'Akses Ditolak: kolom prestige hanya bisa diubah lewat Prestige resmi (tamat 6/6).';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_guard_prestige_columns ON public.users;
CREATE TRIGGER trigger_guard_prestige_columns
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.guard_prestige_columns();

-- 6. Trigger XP: izinkan lesson × multiplier, Bug Hunt tetap base ------------
-- Aturan baru: allowed = floor(lesson_base × prestige_mult) + game_sum.
-- Papan Mingguan tetap pakai base (steril multiplier) — lihat service.
CREATE OR REPLACE FUNCTION public.check_user_xp_level()
RETURNS TRIGGER AS $$
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
             JOIN public.lessons l ON sp.lesson_id = l.id
             WHERE sp.nim = NEW.nim);
        game_sum :=
            (SELECT COALESCE(SUM(gh.xp_earned), 0)
             FROM public.game_history gh
             WHERE gh.nim = NEW.nim);
        mult := COALESCE(NEW.prestige_mult, 1.00);
        -- Batasi multiplier di sisi server juga (cap x1.50, minimal x1.00)
        IF mult < 1.00 THEN mult := 1.00; END IF;
        IF mult > 1.50 THEN mult := 1.50; END IF;
        NEW.prestige_mult := mult;

        server_calculated_xp := FLOOR(lesson_base * mult)::INTEGER + game_sum;

        IF NEW.xp > server_calculated_xp THEN
            RAISE EXCEPTION 'Akses Ditolak: Nilai XP yang dikirim (%) melebihi batas XP riil belajar Anda (%)!', NEW.xp, server_calculated_xp;
        END IF;

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

-- 7. RPC TRANSAKSIONAL: do_prestige_reset -------------------------------------
-- Pindahkan eksekusi reset ke server (satu transaksi atomik) agar tidak ada
-- state setengah-jadi (history tercatat tapi progres belum kehapus, dsb).
-- Validasi di server: tamat penuh (semua lesson di levels/modules/lessons),
-- cooldown 14 hari, kuota 2x per semester kuliah (Ganjil Agu–Jan / Genap Feb–Jul).
-- SECURITY DEFINER: mahasiswa memanggil, tapi hak tulis dibatasi fungsi ini.
CREATE OR REPLACE FUNCTION public.do_prestige_reset(p_nim TEXT)
RETURNS JSONB AS $$
DECLARE
  v_levels_total INT;
  v_lessons_total INT;
  v_lessons_done INT;
  v_levels_done INT;
  v_count INT;
  v_last TIMESTAMPTZ;
  v_xp INT;
  v_old_mult NUMERIC(4,2);
  v_final_mult NUMERIC(4,2);
  v_no INT;
  v_sem_used INT;
BEGIN
  -- Kunci baris user selama transaksi
  SELECT xp, COALESCE(prestige_mult, 1.00), COALESCE(prestige_count, 0), last_prestige_at
    INTO v_xp, v_old_mult, v_count, v_last
    FROM public.users WHERE nim = p_nim FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'NIM % tidak ditemukan.', p_nim;
  END IF;

  -- Total kurikulum dari DB (levels/modules/lessons)
  SELECT COUNT(*) INTO v_levels_total FROM public.levels;
  SELECT COUNT(*) INTO v_lessons_total
    FROM public.lessons l JOIN public.modules m ON m.id = l.module_id;
  IF v_levels_total < 6 THEN
    RAISE EXCEPTION 'Kurikulum belum 6 level (sekarang %). Prestige ditolak.', v_levels_total;
  END IF;

  -- Syarat: SEMUA lesson completed ( UNION arsip TIDAK dihitung — harus aktif )
  SELECT COUNT(*) INTO v_lessons_done
    FROM public.student_progress WHERE nim = p_nim AND completed;
  IF v_lessons_done < v_lessons_total THEN
    RAISE EXCEPTION 'Syarat belum terpenuhi: %/% lesson. Reset hanya untuk tamat penuh 6/6.', v_lessons_done, v_lessons_total;
  END IF;
  -- Syarat per-level: tiap level harus full (tutup celah lesson yatim)
  SELECT COUNT(*) INTO v_levels_done
    FROM public.levels lv
    WHERE NOT EXISTS (
      SELECT 1 FROM public.lessons l
      JOIN public.modules m ON m.id = l.module_id AND m.level_id = lv.id
      WHERE NOT EXISTS (
        SELECT 1 FROM public.student_progress sp
        WHERE sp.nim = p_nim AND sp.completed AND sp.lesson_id = l.id
      )
    );
  IF v_levels_done < 6 THEN
    RAISE EXCEPTION 'Syarat belum terpenuhi: tamat %/6 level. Reset hanya untuk tamat penuh.', v_levels_done;
  END IF;

  -- Cooldown 14 hari
  IF v_last IS NOT NULL AND (NOW() - v_last) < INTERVAL '14 days' THEN
    RAISE EXCEPTION 'Cooldown: reset berikutnya %.', to_char(v_last + INTERVAL '14 days', 'DD Mon YYYY HH24:MI');
  END IF;

  -- Kuota 2x per semester kuliah
  v_sem_used := public.prestige_count_this_semester(p_nim, NOW());
  IF v_sem_used >= 2 THEN
    RAISE EXCEPTION 'Kuota semester habis (2/2). Reset lagi semester depan.';
  END IF;

  -- Multiplier tunggal Master x1.50, non-stack take-max
  v_final_mult := GREATEST(v_old_mult, 1.50::NUMERIC(4,2));
  IF v_final_mult > 1.50 THEN v_final_mult := 1.50; END IF;
  v_no := v_count + 1;

  -- Arsip progres aktif
  INSERT INTO public.progress_archive (nim, lesson_id, completed_at, prestige_no)
    SELECT p_nim, lesson_id, completed_at, v_no
    FROM public.student_progress WHERE nim = p_nim AND completed
    ON CONFLICT (nim, lesson_id, prestige_no) DO NOTHING;

  -- Riwayat prestige
  INSERT INTO public.prestige_history
    (nim, prestige_no, levels_completed, lessons_completed, base_xp_archived, tier, mult)
    VALUES (p_nim, v_no, v_levels_done, v_lessons_done, COALESCE(v_xp, 0), 'Master', v_final_mult);

  -- Hapus aktif + reset XP + pasang multiplier
  DELETE FROM public.student_progress WHERE nim = p_nim;
  UPDATE public.users SET
    xp = 0,
    level = public.calculate_level(0),
    streak = 0,
    prestige_tier = 'Master',
    prestige_mult = v_final_mult,
    prestige_count = v_no,
    last_prestige_at = NOW()
    WHERE nim = p_nim;

  RETURN jsonb_build_object(
    'tier', 'Master', 'mult', v_final_mult,
    'prestige_no', v_no, 'archived_lessons', v_lessons_done
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- REVOKE manual oleh owner bila perlu (jalankan sekali):
-- REVOKE ALL ON FUNCTION public.do_prestige_reset(TEXT) FROM PUBLIC;
-- GRANT EXECUTE ON FUNCTION public.do_prestige_reset(TEXT) TO authenticated;
-- Contoh dipakai report.ts / rekap asisten:
-- SELECT COUNT(*) FROM (
--   SELECT lesson_id FROM public.student_progress WHERE nim = $1 AND completed
--   UNION
--   SELECT lesson_id FROM public.progress_archive WHERE nim = $1
-- ) t;
