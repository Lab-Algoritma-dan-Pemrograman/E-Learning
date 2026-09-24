-- migration-canonical-role.sql
-- Pagar kolom bersama users.role: hanya nilai kanonik yang valid untuk
-- SEMUA app (Praktikum: mahasiswa/asisten/koordinator — enums.go).
-- Nilai non-kanonik ('admin', 'kordas', 'praktikan') membuat user ditolak
-- guard role di Praktikum. Data lama tidak diubah; trigger menormalisasi
-- saat INSERT/UPDATE berikutnya.

-- Role 'admin' khas E-Learning (di bawah kordas, di atas asisten) disimpan
-- TERPISAH di kolom ini supaya kolom bersama tetap kanonik.
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS elearning_role text;

CREATE OR REPLACE FUNCTION public.canonicalize_user_role()
RETURNS trigger AS $$
BEGIN
    NEW.role := CASE lower(trim(NEW.role))
        WHEN 'admin'       THEN 'koordinator'
        WHEN 'kordas'      THEN 'koordinator'
        WHEN 'korda'       THEN 'koordinator'
        WHEN 'praktikan'   THEN 'mahasiswa'
        WHEN 'mahasiswa'   THEN 'mahasiswa'
        WHEN 'asisten'     THEN 'asisten'
        WHEN 'koordinator' THEN 'koordinator'
        ELSE NEW.role  -- nilai lain (divisi-based dll) dibiarkan
    END;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_canonicalize_user_role ON public.users;
CREATE TRIGGER trigger_canonicalize_user_role
    BEFORE INSERT OR UPDATE OF role ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.canonicalize_user_role();

-- Normalisasi satu kali data yang sudah terlanjur non-kanonik:
UPDATE public.users SET role = 'koordinator' WHERE role IN ('admin', 'kordas', 'korda');
UPDATE public.users SET role = 'mahasiswa'   WHERE role = 'praktikan';
