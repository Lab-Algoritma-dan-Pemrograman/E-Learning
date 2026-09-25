-- =========================================================================
-- FIX: IZINKAN PERUBAHAN ROLE DARI SQL EDITOR & SERVICE ROLE
-- Jalankan skrip ini di SQL Editor Supabase untuk mengatasi error:
-- "ERROR: P0001: Akses Ditolak: Anda tidak diperbolehkan mengubah peran (role) Anda sendiri!"
-- =========================================================================

-- 1. UPDATE FUNGSI auth_role()
-- Mengenali query dari SQL Editor / superuser (postgres) / service_role sebagai 'admin'
CREATE OR REPLACE FUNCTION public.auth_role() 
RETURNS TEXT AS $$
BEGIN
  -- Jika query dieksekusi langsung dari SQL Editor / superuser postgres
  IF current_user IN ('postgres', 'supabase_admin') THEN
    RETURN 'admin';
  END IF;

  -- Jika tidak ada header request JWT (koneksi direct database / script backend)
  IF current_setting('request.jwt.claims', true) IS NULL OR current_setting('request.jwt.claims', true) = '' THEN
    RETURN 'admin';
  END IF;

  -- Jika menggunakan Supabase service_role key
  IF (current_setting('request.jwt.claims', true)::json->>'role') = 'service_role' THEN
    RETURN 'admin';
  END IF;

  -- Membaca klaim dari JWT pengguna web aplikasi
  RETURN COALESCE(
    CASE 
      WHEN current_setting('request.jwt.claims', true)::json->>'user_role' = 'koordinator' THEN 'kordas'
      WHEN current_setting('request.jwt.claims', true)::json->>'user_role' = 'user' THEN 'praktikan'
      ELSE current_setting('request.jwt.claims', true)::json->>'user_role'
    END,
    'praktikan'
  )::text;
END;
$$ LANGUAGE plpgsql STABLE;


-- 2. UPDATE TRIGGER check_user_updates()
-- Memastikan admin/kordas/SQL Editor bebas mengubah role dan atribut user
CREATE OR REPLACE FUNCTION public.check_user_updates()
RETURNS TRIGGER AS $$
BEGIN
    -- Lewati pengecekan jika dijalankan oleh admin, kordas, superuser, atau dari SQL Editor
    IF current_user IN ('postgres', 'supabase_admin') 
       OR current_setting('request.jwt.claims', true) IS NULL 
       OR current_setting('request.jwt.claims', true) = ''
       OR public.auth_role() IN ('admin', 'kordas', 'service_role') THEN
        RETURN NEW;
    END IF;

    -- A. Mencegah eskalasi/perubahan peran (role) oleh mahasiswa (praktikan) atau asisten
    IF NEW.role IS DISTINCT FROM OLD.role THEN
        IF NEW.role IS DISTINCT FROM public.auth_role() THEN
            RAISE EXCEPTION 'Akses Ditolak: Anda tidak diperbolehkan mengubah peran (role) Anda sendiri!';
        END IF;
    END IF;

    -- B. Mencegah manipulasi level access overrides
    IF NEW.level_access_overrides IS DISTINCT FROM OLD.level_access_overrides THEN
        RAISE EXCEPTION 'Akses Ditolak: Anda tidak memiliki wewenang untuk mengubah level_access_overrides!';
    END IF;

    -- C. Mencegah manipulasi hak akses asesmen
    IF NEW.assessment_access IS DISTINCT FROM OLD.assessment_access THEN
        RAISE EXCEPTION 'Akses Ditolak: Anda tidak memiliki wewenang untuk mengubah assessment_access!';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- 3. UPDATE TRIGGER check_user_xp_level()
-- Memastikan admin/SQL Editor juga bebas menyesuaikan XP/Level tanpa terblokir
CREATE OR REPLACE FUNCTION public.check_user_xp_level()
RETURNS TRIGGER AS $$
DECLARE
    server_calculated_xp INTEGER;
BEGIN
    -- Lewati validasi jika admin/superuser/service_role
    IF current_user IN ('postgres', 'supabase_admin') 
       OR current_setting('request.jwt.claims', true) IS NULL 
       OR current_setting('request.jwt.claims', true) = ''
       OR public.auth_role() IN ('admin', 'kordas', 'service_role') THEN
        RETURN NEW;
    END IF;

    -- Hitung total XP riil hasil belajar
    server_calculated_xp := 
        (SELECT COALESCE(SUM(l.xp_reward), 0) 
         FROM public.student_progress sp 
         JOIN public.lessons l ON sp.lesson_id = l.id 
         WHERE sp.nim = NEW.nim) 
        + 
        (SELECT COALESCE(SUM(gh.xp_earned), 0) 
         FROM public.game_history gh 
         WHERE gh.nim = NEW.nim);

    IF NEW.xp > server_calculated_xp THEN
        RAISE EXCEPTION 'Akses Ditolak: Nilai XP yang dikirim (%) melebihi batas XP riil belajar Anda (%)!', NEW.xp, server_calculated_xp;
    END IF;

    NEW.level := public.calculate_level(NEW.xp);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
