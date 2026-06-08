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
  -- Membaca dari claim 'user_role' (bukan 'role' yang berisi 'authenticated')
  SELECT COALESCE(
    CASE 
      WHEN current_setting('request.jwt.claims', true)::json->>'user_role' = 'koordinator' THEN 'kordas'
      WHEN current_setting('request.jwt.claims', true)::json->>'user_role' = 'user' THEN 'praktikan'
      ELSE current_setting('request.jwt.claims', true)::json->>'user_role'
    END,
    'praktikan'
  )::text;
$$ LANGUAGE sql STABLE;
