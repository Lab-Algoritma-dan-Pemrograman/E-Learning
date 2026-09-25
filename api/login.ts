/**
 * api/login.ts
 *
 * Login langsung di dalam E-Learning (tanpa lempar ke Web Utama).
 * Proxy ke backend praktikum Go, lalu sign ulang jadi token Supabase
 * supaya SupabaseProvider yang sudah ada bisa langsung pakai.
 *
 * Request : POST /api/login  { "identifier": "NIM atau email", "password": "..." }
 * Response: { payload: { nim, nama, kelas, jurusan, email, role }, token, backendToken, user }
 * Error   : { error: "..." } dengan status 400/401/404/500
 */

import { SignJWT } from 'jose';
import { detectSupabaseSecret } from './auth.js';
import { applyCors } from './_cors.js';

function backendBase(): string {
  const raw =
    process.env.BACKEND_API_URL ||
    process.env.VITE_API_URL ||
    'https://api.algohub.web.id/api';
  const cleaned = raw.replace(/\/+$/, '');
  // VITE_API_URL lokal = localhost — tidak bisa dijangkau dari server Vercel.
  // Saat jalan di Vercel, paksa ke backend prod kecuali BACKEND_API_URL diset eksplisit.
  if (process.env.VERCEL && /localhost|127\.0\.0\.1/i.test(cleaned) && !process.env.BACKEND_API_URL) {
    return 'https://api.algohub.web.id/api';
  }
  return cleaned;
}

function mapRole(backendRole: string): string {
  const r = (backendRole || '').toLowerCase().trim();
  if (r === 'admin') return 'admin';
  if (['koordinator', 'kordas', 'superadmin', 'super_admin', 'administrator', 'korda'].includes(r)) return 'kordas';
  if (['asisten', 'assistant', 'laboran'].includes(r)) return 'asisten';
  return 'praktikan';
}

export default async function handler(req: any, res: any) {
  // HIGH-05: whitelist origin (bukan lagi `*`).
  if (applyCors(req, res)) return;
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const identifier = (body.identifier || '').trim();
    const password = body.password || '';

    if (!identifier || !password) {
      return res.status(400).json({ error: 'NIM/email dan password wajib diisi.' });
    }

    // 1. Login ke backend praktikum (Go). Response: { success, message, data: { token, user } }
    const loginRes = await fetch(`${backendBase()}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    });

    let loginJson: any = null;
    try {
      loginJson = await loginRes.json();
    } catch {
      return res.status(502).json({ error: 'Backend tidak merespons dengan benar. Coba lagi.' });
    }

    if (!loginRes.ok || !loginJson?.success || !loginJson?.data?.token) {
      const status = loginRes.status === 404 ? 404 : loginRes.status === 401 ? 401 : 400;
      // MEDIUM-01: pesan generik — jangan bedakan "akun tidak ditemukan" vs
      // "password salah" (mencegah enumerasi NIM/email yang valid).
      const msg =
        loginRes.status === 404 || loginRes.status === 401
          ? 'NIM/email atau password salah.'
          : loginJson?.message || 'Login gagal. Coba lagi.';
      return res.status(status).json({ error: msg });
    }

    const backendToken: string = loginJson.data.token;
    const u = loginJson.data.user || {};
    const nim: string = u.nim || identifier;
    const nama: string = u.nama || nim;
    const kelas: string = u.nama_kelas || '';
    const email: string | null = null; // UserResponse backend tidak membawa email
    const appRole = mapRole(u.role || 'mahasiswa');

    // 2. Sign ulang dengan Supabase JWT secret (format yang dimengerti SupabaseProvider)
    let signedToken = backendToken;
    const supabaseSecret = await detectSupabaseSecret();
    if (supabaseSecret) {
      signedToken = await new SignJWT({
        nim,
        nama,
        kelas,
        jurusan: null,
        role: 'authenticated',
        user_role: appRole,
        email,
        iss: 'supabase',
        sub: nim,
        aud: 'authenticated',
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(supabaseSecret);
    }

    return res.status(200).json({
      payload: { nim, nama, kelas, jurusan: null, email, role: appRole },
      token: signedToken,
      backendToken,
      user: {
        nim,
        nama,
        kelas,
        role: appRole,
        nama_kelas: u.nama_kelas || null,
        shift: u.shift ?? null,
      },
    });
  } catch (error: any) {
    console.error('[api/login] Error:', error?.message || error);
    return res.status(500).json({ error: 'Terjadi kesalahan server. Coba lagi.' });
  }
}
