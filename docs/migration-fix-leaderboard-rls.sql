-- =========================================================================
-- FIX: Kebijakan RLS untuk tabel 'users' agar Leaderboard bisa menampilkan
-- data seluruh user ke sesama mahasiswa (praktikan).
-- =========================================================================
-- JALANKAN SQL INI DI SUPABASE SQL EDITOR
-- =========================================================================

-- 1. Hapus kebijakan RLS lama pada tabel 'users' yang membatasi SELECT untuk praktikan
DROP POLICY IF EXISTS "Mahasiswa hanya bisa baca & ubah data miliknya sendiri" ON public.users;
DROP POLICY IF EXISTS "Asisten ke atas bisa membaca data seluruh user" ON public.users;
DROP POLICY IF EXISTS "Admin & Kordas bisa melakukan modifikasi seluruh user" ON public.users;

-- 2. Buat kebijakan SELECT: Semua user terautentikasi (kordas, admin, asisten, praktikan)
-- bisa membaca data seluruh user agar papan peringkat (leaderboard) bisa berfungsi.
CREATE POLICY "Semua user terautentikasi bisa membaca data seluruh user" 
ON public.users
FOR SELECT
TO authenticated
USING (true);

-- 3. Buat kebijakan INSERT: Praktikan bisa mendaftarkan/menambahkan profil mereka sendiri
CREATE POLICY "Praktikan hanya bisa membuat data miliknya sendiri" 
ON public.users
FOR INSERT
TO authenticated
WITH CHECK (nim = public.auth_nim());

-- 4. Buat kebijakan UPDATE: Praktikan hanya bisa mengubah/memperbarui data profil mereka sendiri
CREATE POLICY "Praktikan hanya bisa mengubah data miliknya sendiri" 
ON public.users
FOR UPDATE
TO authenticated
USING (nim = public.auth_nim())
WITH CHECK (nim = public.auth_nim());

-- 5. Buat kebijakan MODIFIKASI LENGKAP untuk Admin & Kordas (Super Admin)
-- Admin & Kordas bisa melakukan INSERT, UPDATE, DELETE, dan SELECT untuk seluruh user
CREATE POLICY "Admin & Kordas bisa mengelola seluruh user" 
ON public.users
FOR ALL
TO authenticated
USING (public.auth_role() IN ('admin', 'kordas'))
WITH CHECK (public.auth_role() IN ('admin', 'kordas'));
