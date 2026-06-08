import { SignJWT } from 'jose';
import { verifyToken, getSupabaseSecret } from './auth.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    const tokenPayload = await verifyToken(token);
    if (!tokenPayload || !tokenPayload.nim || !tokenPayload.nama) {
      return res.status(400).json({ error: 'Token missing required fields (nim, nama)' });
    }

    // Normalize 'koordinator' to 'kordas' in token payload
    if (tokenPayload.role === 'koordinator') {
      tokenPayload.role = 'kordas';
    }

    // 3. Generate a new JWT token signed with Supabase JWT Secret if configured
    let returnedToken = token;
    const supabaseSecretStr = process.env.SUPABASE_JWT_SECRET;
    if (supabaseSecretStr) {
      const secret = getSupabaseSecret(supabaseSecretStr);
      if (secret) {
        returnedToken = await new SignJWT({
          nim: tokenPayload.nim,
          nama: tokenPayload.nama,
          kelas: tokenPayload.kelas,
          role: tokenPayload.role || 'praktikan',
          email: tokenPayload.email || null
        })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime('1d')
          .sign(secret);
      }
    }

    return res.status(200).json({
      payload: tokenPayload,
      token: returnedToken,
      firebaseToken: null // Firebase is deprecated
    });
  } catch (error: any) {
    console.error('Token verification error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
}


