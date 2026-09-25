-- =========================================================================
-- FIX: Update auth_role() to read from 'user_role' JWT claim
-- =========================================================================
-- ALASAN: Supabase PostgREST memerlukan role='authenticated' di JWT 
-- untuk menerima request. Jadi custom role (admin/kordas/asisten/praktikan)
-- dipindahkan ke claim 'user_role'.
-- 
-- JALANKAN SQL INI DI SUPABASE SQL EDITOR
-- =========================================================================

CREATE OR REPLACE FUNCTION public.auth_role() 
RETURNS TEXT AS $$
BEGIN
  -- 1. Jika query dieksekusi langsung dari SQL Editor / superuser postgres
  IF current_user IN ('postgres', 'supabase_admin') THEN
    RETURN 'admin';
  END IF;

  -- 2. Jika tidak ada header request JWT (koneksi direct database / script backend)
  IF current_setting('request.jwt.claims', true) IS NULL OR current_setting('request.jwt.claims', true) = '' THEN
    RETURN 'admin';
  END IF;

  -- 3. Jika menggunakan Supabase service_role key
  IF (current_setting('request.jwt.claims', true)::json->>'role') = 'service_role' THEN
    RETURN 'admin';
  END IF;

  -- 4. Membaca klaim dari JWT pengguna web aplikasi
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
