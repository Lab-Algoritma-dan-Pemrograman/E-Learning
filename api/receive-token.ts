/**
 * api/receive-token.ts
 *
 * Endpoint yang menerima token dari Web Utama via POST JSON.
 * Mendukung JWT format Web Utama ({ username, full_name, role }) maupun
 * format E-Learning ({ nim, nama, kelas, role }).
 *
 * Flow:
 *   POST /api/receive-token  { "token": "eyJ..." }
 *   → verify → normalize fields → sign ulang → return { token, redirectUrl }
 *   → Web Utama redirect user ke redirectUrl
 */

import { verifyToken, detectSupabaseSecret } from './auth.js';
import { SignJWT } from 'jose';
import { applyCors } from './_cors.js';

export default async function handler(req: any, res: any) {
  // HIGH-05: whitelist origin (bukan lagi `*`).
  if (applyCors(req, res)) return;
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const body = req.body as { token?: string };
    const token = body?.token;

    if (!token) {
      return res.status(400).json({ error: 'Field "token" wajib disertakan di request body.' });
    }

    // Verifikasi token (Web Utama secret atau Supabase secret)
    const tokenPayload = await verifyToken(token);
    if (!tokenPayload) {
      return res.status(401).json({ error: 'Token tidak valid.' });
    }

    // Normalize field names
    // Web Utama JWT: { username, full_name, role: 'koordinator', division, ... }
    // E-Learning JWT: { nim, nama, kelas, role, ... }
    const p = tokenPayload as any;
    const nim     = p.nim || p.username || p.sub || null;
    const nama    = p.nama || p.full_name || p.name || null;
    const kelas   = p.kelas || p.class_code || '';
    const jurusan = p.jurusan || p.major || null;
    const email   = p.email || null;

    if (!nim || !nama) {
      return res.status(400).json({
        error: 'Token tidak memiliki field yang diperlukan (nim/username, nama/full_name).',
        receivedKeys: Object.keys(p),
      });
    }

    // Normalize role (kosakata backend Go = kosakata elearning)
    const rawRole = p.user_role || p.role || 'mahasiswa';
    let appRole: string = rawRole;
    if (appRole === 'kordas' || appRole === 'admin') appRole = 'koordinator';
    if (['authenticated', 'anon', 'user', 'praktikan'].includes(appRole)) appRole = 'mahasiswa';

    // Sign ulang dengan Supabase JWT secret
    let signedToken = token;
    const supabaseSecret = await detectSupabaseSecret();
    if (supabaseSecret) {
      signedToken = await new SignJWT({
        nim,
        nama,
        kelas,
        jurusan,
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
      success: true,
      token: signedToken,
      redirectUrl: `/?token=${encodeURIComponent(signedToken)}`,
      payload: { nim, nama, kelas, jurusan, email, role: appRole },
    });

  } catch (error: any) {
    console.error('[receive-token] Error:', error.message);
    return res.status(401).json({ error: 'Token tidak valid: ' + (error.message || 'Unknown error') });
  }
}
