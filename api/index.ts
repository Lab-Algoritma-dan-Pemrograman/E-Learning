/**
 * api/index.ts
 *
 * Menangani POST dari Web Utama ke root URL E-Learning.
 *
 * Web Utama melakukan:
 *   POST https://e-learning.domain.com/
 *   Content-Type: application/x-www-form-urlencoded
 *   Body: token=eyJ...
 *
 * Handler ini membaca token, lalu redirect ke /?token=... agar
 * tokenService.ts bisa membacanya via query parameter seperti biasa.
 */

import { verifyToken, detectSupabaseSecret } from './auth.js';
import { SignJWT } from 'jose';

export default async function handler(req: any, res: any) {
  // HIGH-05: whitelist origin — ganti `*` agar situs asing tak bisa
  // memanggil API ini dari browser korban (CSRF/CORS abuse).
  const ALLOWED = [
    'https://elearning.algohub.web.id',
    'https://algohub.web.id',
    'https://www.algohub.web.id',
    'https://siakad.algohub.web.id',
  ];
  // Tambahan via env (mis. preview deployment), dipisah koma.
  const extra = (process.env.CORS_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const origin = String(req.headers?.origin || '');
  const okPreview = /^https:\/\/e-learning-[a-z0-9-]+\.vercel\.app$/i.test(origin);
  if (origin && (ALLOWED.includes(origin) || extra.includes(origin) || okPreview)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // Hanya handle POST — GET dilayani oleh static SPA
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Baca token dari body — support dua format:
    // 1. application/x-www-form-urlencoded: token=eyJ...
    // 2. application/json: { "token": "eyJ..." }
    let token: string | null = null;

    const contentType = req.headers['content-type'] || '';

    if (contentType.includes('application/json')) {
      token = req.body?.token || null;
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      // Vercel sudah parse form body ke req.body
      token = req.body?.token || null;

      // Fallback: parse manual jika req.body kosong
      if (!token && typeof req.body === 'string') {
        const params = new URLSearchParams(req.body);
        token = params.get('token');
      }
    }

    if (!token) {
      // Tidak ada token — redirect ke landing page biasa
      return res.redirect(302, '/');
    }

    // Verifikasi dan normalize token
    const tokenPayload = await verifyToken(token);
    if (!tokenPayload) {
      return res.redirect(302, '/?error=invalid_token');
    }

    const p = tokenPayload as any;
    const nim   = p.nim || p.username || p.sub || null;
    const nama  = p.nama || p.full_name || p.name || null;
    const kelas = p.kelas || p.class_code || '';
    const jurusan = p.jurusan || p.major || null;
    const email = p.email || null;

    if (!nim || !nama) {
      return res.redirect(302, '/?error=missing_fields');
    }

    // Normalize role (kosakata lokal E-Learning)
    const rawRole = String(p.user_role || p.role || 'praktikan').toLowerCase().trim();
    let appRole: string = 'praktikan';
    if (['admin'].includes(rawRole)) appRole = 'admin';
    else if (['kordas', 'koordinator', 'korda', 'superadmin', 'super_admin', 'administrator'].includes(rawRole)) appRole = 'kordas';
    else if (['asisten', 'assistant', 'laboran'].includes(rawRole)) appRole = 'asisten';
    else appRole = 'praktikan';

    // Sign ulang dengan Supabase JWT secret
    let signedToken = token;
    const supabaseSecret = await detectSupabaseSecret();
    if (supabaseSecret) {
      signedToken = await new SignJWT({
        nim, nama, kelas, jurusan, email,
        role: 'authenticated',
        user_role: appRole,
        iss: 'supabase',
        sub: nim,
        aud: 'authenticated',
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(supabaseSecret);
    }

    // Redirect ke SPA dengan token sebagai query param
    return res.redirect(302, `/?token=${encodeURIComponent(signedToken)}`);

  } catch (error: any) {
    console.error('[api/index] Error:', error.message);
    return res.redirect(302, '/?error=server_error');
  }
}
