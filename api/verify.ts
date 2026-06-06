import { jwtVerify } from 'jose';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    // 1. Verify the JWT from "web utama"
    const secret = new TextEncoder().encode(process.env.VITE_JWT_SECRET || process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const tokenPayload = payload as any;

    // 2. Validate required fields
    if (!tokenPayload.nim || !tokenPayload.nama) {
      return res.status(400).json({ error: 'Token missing required fields (nim, nama)' });
    }

    return res.status(200).json({
      payload: tokenPayload,
      firebaseToken: null // Firebase is deprecated, return null for safety
    });
  } catch (error: any) {
    console.error('Token verification error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
}

