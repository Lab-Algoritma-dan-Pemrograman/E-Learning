import { SignJWT } from 'jose';
import { verifyToken, detectSupabaseSecret } from './auth.js';

export default async function handler(req: any, res: any) {
  // CORS headers untuk semua response
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    const tokenPayload = await verifyToken(token);
    if (!tokenPayload) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // ── Normalize field names ──────────────────────────────────────────────
    // Web Utama JWT pakai: { username, full_name, role: 'koordinator', ... }
    // E-Learning JWT pakai: { nim, nama, kelas, role, ... }
    // Handle keduanya.
    const nim   = (tokenPayload as any).nim
               || (tokenPayload as any).username
               || (tokenPayload as any).sub
               || null;

    const nama  = (tokenPayload as any).nama
               || (tokenPayload as any).full_name
               || (tokenPayload as any).name
               || null;

    const kelas = (tokenPayload as any).kelas
               || (tokenPayload as any).class_code
               || (tokenPayload as any).kelas
               || '';

    const jurusan = (tokenPayload as any).jurusan
                 || (tokenPayload as any).major
                 || null;

    const email = (tokenPayload as any).email || null;

    if (!nim || !nama) {
      console.error('Token missing required fields. Payload keys:', Object.keys(tokenPayload));
      return res.status(400).json({
        error: 'Token missing required fields (nim/username, nama/full_name)',
        receivedKeys: Object.keys(tokenPayload),
      });
    }

    // ── Normalize role ─────────────────────────────────────────────────────
    const rawRole = String(
      (tokenPayload as any).user_role || (tokenPayload as any).role || 'praktikan'
    ).toLowerCase().trim();

    let appRole: string = 'praktikan';
    if (['admin', 'superadmin', 'super_admin', 'administrator'].includes(rawRole)) {
      appRole = 'admin';
    } else if (['kordas', 'koordinator', 'korda'].includes(rawRole)) {
      appRole = 'kordas';
    } else if (['asisten', 'assistant', 'laboran'].includes(rawRole)) {
      appRole = 'asisten';
    } else {
      appRole = 'praktikan';
    }

    // ── Sign ulang dengan Supabase JWT secret ──────────────────────────────
    let returnedToken = token;
    const supabaseSecret = await detectSupabaseSecret();
    if (supabaseSecret) {
      returnedToken = await new SignJWT({
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
      payload: {
        nim,
        nama,
        kelas,
        jurusan,
        email,
        role: appRole,
      },
      token: returnedToken,
      firebaseToken: null,
    });

  } catch (error: any) {
    console.error('Token verification error:', error);
    return res.status(401).json({ error: 'Invalid token: ' + (error.message || 'unknown') });
  }
}


