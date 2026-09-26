-- =========================================================================
-- FIX: GRANT KOLOM users YANG HILANG (penyebab PATCH 403 / 42501)
-- =========================================================================
-- Gejala: AdminDashboard gagal mengubah peran user & akses level:
--   PATCH /rest/v1/users?nim=eq.XXXXX  -> 403
--   {"code":"42501","message":"permission denied for table users",
--    "hint":"GRANT UPDATE ON public.users TO authenticated;"}
--
-- SEBAB: role `authenticated` hanya punya GRANT UPDATE pada 9 kolom users
--   (role, nama, xp, level, streak, study_time, last_active, kelas, jurusan).
--   Kode mengirim SATU payload berisi kolom tanpa grant ->
--   PostgREST menolak SELURUH statement (bukan hanya kolom itu):
--     src/pages/AdminDashboard.tsx:1326  { role, elearning_role }
--     src/pages/AdminDashboard.tsx:1195  { level_access_overrides }
--   Hint "GRANT UPDATE ON public.users" menyesatkan: grant tabel penuh
--   tidak diperlukan, cukup 2 kolom. RLS-nya sendiri sudah benar.
--
-- Jalankan di Supabase SQL Editor (DDL — service_role tidak bisa).
-- =========================================================================

-- 1. GRANT kolom yang memang ditulis klien
GRANT UPDATE (elearning_role, level_access_overrides) ON public.users TO authenticated;


-- =========================================================================
-- 2. GUARD: cegah praktikan/asisten menaikkan dirinya sendiri
-- =========================================================================
-- `elearning_role` belum dijaga trigger. Begitu grant di atas aktif, tanpa
-- guard ini praktikan bisa: PATCH {elearning_role:'admin'} -> resolveElearningRole()
-- mengembalikan 'admin' -> eskalasi hak akses penuh di UI.
-- (Kolom role & level_access_overrides sudah dijaga trigger yang sama.)
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

    -- D. Mencegah manipulasi flag admin E-Learning (elearning_role)
    IF NEW.elearning_role IS DISTINCT FROM OLD.elearning_role THEN
        RAISE EXCEPTION 'Akses Ditolak: Anda tidak memiliki wewenang untuk mengubah elearning_role!';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_check_user_updates ON public.users;
CREATE TRIGGER trigger_check_user_updates
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.check_user_updates();


-- =========================================================================
-- 3. VERIFIKASI (jalankan setelah di atas; ketiganya harus 200/204)
-- =========================================================================
-- Lewat aplikasi: Admin -> tab Users -> ubah peran user & toggle akses level.
--
-- Bukti RLS sudah benar (jangan "perbaiki" RLS):
--   praktikan PATCH own row   -> 200 (row kembali)
--   praktikan PATCH row lain  -> 200 []  (RLS menyaring, bukan 403)
--   praktikan role=asisten    -> 400 P0001 (trigger menolak)


-- =========================================================================
-- JEBAKAN: JANGAN jalankan skrip grant "blanket"
-- =========================================================================
-- docs/fix-supabase-permissions.sql dan docs/setup-new-database.sql memuat:
--   GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, ...
--   ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon ...
-- Keduanya membuka kembali seluruh skema ke `anon` (sudah dikunci ketat) dan
-- membuat tabel BARU ikut terbuka otomatis. Pakai HANYA skrip di atas.
