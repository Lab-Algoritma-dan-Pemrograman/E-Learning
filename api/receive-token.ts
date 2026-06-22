/**
 * api/receive-token.ts
 *
 * Endpoint yang menerima token dari Web Utama via POST JSON.
 *
 * Cara kerja:
 *   Web Utama melakukan POST ke https://e-learning.domain.com/api/receive-token
 *   dengan body: { "token": "eyJ..." }
 *
 *   Endpoint ini memverifikasi token, men-sign ulang untuk Supabase RLS,
 *   lalu redirect user ke halaman utama dengan token yang sudah di-sign
 *   sebagai query parameter (agar tokenService.ts bisa langsung membacanya).
 *
 * Alternatif:
 *   Web Utama juga bisa tetap pakai GET ?token=... seperti sebelumnya.
 *   Kedua cara berjalan paralel.
 */

import { verifyToken, detectSupabaseSecret } from './auth.js';
import { SignJWT } from 'jose';

export default async function handler(req: any, res: any) {
  // ── Handle CORS preflight ──────────────────────────────────────────────
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    // ── Baca token dari body ───────────────────────────────────────────────
    const body = req.body as { token?: string };
    const token = body?.token;

    if (!token) {
      return res.status(400).json({ error: 'Field "token" wajib disertakan di request body.' });
    }

    // ── Verifikasi token Web Utama ─────────────────────────────────────────
    const tokenPayload = await verifyToken(token);
    if (!tokenPayload || !tokenPayload.nim || !tokenPayload.nama) {
      return res.status(401).json({ error: 'Token tidak valid atau tidak memiliki field yang diperlukan (nim, nama).' });
    }

    // ── Normalisasi role ───────────────────────────────────────────────────
    const rawRole = (tokenPayload as any).user_role || (tokenPayload as any).role;
    let appRole: string = rawRole || 'praktikan';
    if (appRole === 'koordinator') appRole = 'kordas';
    if (appRole === 'authenticated' || appRole === 'anon') appRole = 'praktikan';

    // ── Sign ulang dengan Supabase JWT secret ─────────────────────────────
    let signedToken = token;
    const supabaseSecret = await detectSupabaseSecret();
    if (supabaseSecret) {
      signedToken = await new SignJWT({
        nim: (tokenPayload as any).nim,
        nama: (tokenPayload as any).nama,
        kelas: (tokenPayload as any).kelas || '',
        role: 'authenticated',
        user_role: appRole,
        email: (tokenPayload as any).email || null,
        iss: 'supabase',
        sub: (tokenPayload as any).nim,
        aud: 'authenticated',
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(supabaseSecret);
    }

    // ── Kembalikan token yang sudah di-sign + payload ──────────────────────
    // Web Utama menerima ini, lalu redirect user ke:
    //   https://e-learning.domain.com?token=<signedToken>
    // atau simpan token di localStorage/cookie sendiri.
    return res.status(200).json({
      success: true,
      token: signedToken,
      redirectUrl: `/?token=${encodeURIComponent(signedToken)}`,
      payload: {
        nim: (tokenPayload as any).nim,
        nama: (tokenPayload as any).nama,
        kelas: (tokenPayload as any).kelas,
        role: appRole,
        email: (tokenPayload as any).email || null,
      },
    });

  } catch (error: any) {
    console.error('[receive-token] Error:', error.message);
    return res.status(401).json({ error: 'Token tidak valid: ' + (error.message || 'Unknown error') });
  }
}
