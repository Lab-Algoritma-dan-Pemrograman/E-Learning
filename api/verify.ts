import { jwtVerify, SignJWT } from 'jose';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    let tokenPayload: any = null;
    let verified = false;

    // 1. Try E-learning Supabase JWT Secret first (for refreshed sessions)
    const supabaseSecretStr = process.env.SUPABASE_JWT_SECRET;
    if (supabaseSecretStr) {
      try {
        const secret = new TextEncoder().encode(supabaseSecretStr);
        const { payload } = await jwtVerify(token, secret);
        tokenPayload = payload;
        verified = true;
      } catch (err) {
        // Fall back to Web Utama secret
      }
    }

    // 2. Try Web Utama JWT Secret
    if (!verified) {
      const secret = new TextEncoder().encode(process.env.VITE_JWT_SECRET || process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      tokenPayload = payload;
    }

    // Validate required fields
    if (!tokenPayload.nim || !tokenPayload.nama) {
      return res.status(400).json({ error: 'Token missing required fields (nim, nama)' });
    }

    // Normalize 'koordinator' to 'kordas' in token payload
    if (tokenPayload.role === 'koordinator') {
      tokenPayload.role = 'kordas';
    }

    // 3. Generate a new JWT token signed with Supabase JWT Secret if configured
    let returnedToken = token;
    if (supabaseSecretStr) {
      const secret = new TextEncoder().encode(supabaseSecretStr);
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

    return res.status(200).json({
      payload: tokenPayload,
      token: returnedToken,
      firebaseToken: null // Firebase is deprecated, return null for safety
    });
  } catch (error: any) {
    console.error('Token verification error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
}

