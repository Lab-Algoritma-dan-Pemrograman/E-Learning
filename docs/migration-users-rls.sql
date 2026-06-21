-- =========================================================================
-- MIGRATION: ACTIVATE ROW LEVEL SECURITY (RLS) ON users TABLE
-- Jalankan skrip ini di SQL Editor Supabase untuk mengamankan tabel users.
-- Skrip ini melengkapi kebijakan RLS yang sudah ada di tabel-tabel lainnya.
-- =========================================================================

-- 1. AKTIFKAN RLS PADA TABEL users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 2. HAPUS KEBIJAKAN SEBELUMNYA JIKA ADA
DROP POLICY IF EXISTS "Semua user terautentikasi bisa membaca profil sendiri dan praktikan lain" ON public.users;
DROP POLICY IF EXISTS "User terautentikasi bisa mendaftarkan profil sendiri" ON public.users;
DROP POLICY IF EXISTS "Staf bisa mendaftarkan profil praktikan" ON public.users;
DROP POLICY IF EXISTS "User terautentikasi bisa memperbarui profil sendiri" ON public.users;
DROP POLICY IF EXISTS "Staf bisa memperbarui profil praktikan" ON public.users;
DROP POLICY IF EXISTS "Staf bisa menghapus profil praktikan" ON public.users;

-- 3. BUAT KEBIJAKAN BARU (RLS POLICIES)

-- A. Kebijakan Membaca (SELECT):
-- Mahasiswa (praktikan) hanya boleh melihat profil sendiri dan profil mahasiswa lain (yang memiliki role 'praktikan') untuk keperluan Leaderboard.
-- Staf (admin/kordas/asisten) dapat melihat profil semua pengguna.
CREATE POLICY "Semua user terautentikasi bisa membaca profil sendiri dan praktikan lain" ON public.users
    FOR SELECT TO authenticated
    USING (
        nim = public.auth_nim() 
        OR role = 'praktikan' 
        OR public.auth_role() IN ('admin', 'kordas', 'asisten')
    );

-- B. Kebijakan Menambahkan (INSERT):
-- Mahasiswa hanya boleh membuat profil mereka sendiri dan wajib sesuai dengan data JWT (NIM & Role).
-- Staf diperbolehkan menambahkan profil siapa saja.
CREATE POLICY "User terautentikasi bisa mendaftarkan profil sendiri" ON public.users
    FOR INSERT TO authenticated
    WITH CHECK (
        nim = public.auth_nim() 
        AND role = public.auth_role()
    );

CREATE POLICY "Staf bisa mendaftarkan profil praktikan" ON public.users
    FOR INSERT TO authenticated
    WITH CHECK (
        public.auth_role() IN ('admin', 'kordas')
    );

-- C. Kebijakan Memperbarui (UPDATE):
-- Mahasiswa hanya boleh memperbarui profil mereka sendiri.
-- Staf diperbolehkan memperbarui profil siapa saja.
-- Catatan: Penguncian kolom sensitif dikelola lebih ketat oleh database trigger di bawah.
CREATE POLICY "User terautentikasi bisa memperbarui profil sendiri" ON public.users
    FOR UPDATE TO authenticated
    USING (nim = public.auth_nim())
    WITH CHECK (nim = public.auth_nim());

CREATE POLICY "Staf bisa memperbarui profil praktikan" ON public.users
    FOR UPDATE TO authenticated
    USING (public.auth_role() IN ('admin', 'kordas'))
    WITH CHECK (true);

-- D. Kebijakan Menghapus (DELETE):
-- Hanya staf (admin/kordas) yang diperbolehkan menghapus data profil pengguna.
CREATE POLICY "Staf bisa menghapus profil praktikan" ON public.users
    FOR DELETE TO authenticated
    USING (public.auth_role() IN ('admin', 'kordas'));


-- 4. PEMBATASAN KOLOM SENSITIF PADA OPERASI UPDATE (DATABASE TRIGGER)
-- Trigger ini mencegah mahasiswa/asisten mengubah kolom kritis seperti role, level_access_overrides,
-- dan assessment_access secara ilegal via console browser, tetapi tetap mengizinkan perubahan role yang sah jika
-- disinkronkan secara resmi berdasarkan klaim JWT token dari Web Utama.

CREATE OR REPLACE FUNCTION public.check_user_updates()
RETURNS TRIGGER AS $$
BEGIN
    -- Jika yang melakukan update bukan admin/kordas (asisten & praktikan)
    IF public.auth_role() NOT IN ('admin', 'kordas') THEN
        
        -- A. Mencegah eskalasi/perubahan peran (role)
        IF NEW.role IS DISTINCT FROM OLD.role THEN
            -- Hanya perbolehkan sinkronisasi role jika NEW.role sama dengan klaim JWT terautentikasi (auth_role)
            IF NEW.role IS DISTINCT FROM public.auth_role() THEN
                RAISE EXCEPTION 'Akses Ditolak: Anda tidak diperbolehkan mengubah peran (role) Anda sendiri!';
            END IF;
        END IF;

        -- B. Mencegah manipulasi level access overrides
        IF NEW.level_access_overrides IS DISTINCT FROM OLD.level_access_overrides THEN
            RAISE EXCEPTION 'Akses Ditolak: Anda tidak memiliki wewenang untuk mengubah level_access_overrides!';
        END IF;

        -- C. Mencegah manipulasi hak akses asesmen (jika ada)
        IF NEW.assessment_access IS DISTINCT FROM OLD.assessment_access THEN
            RAISE EXCEPTION 'Akses Ditolak: Anda tidak memiliki wewenang untuk mengubah assessment_access!';
        END IF;
        
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_check_user_updates ON public.users;
CREATE TRIGGER trigger_check_user_updates
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.check_user_updates();
