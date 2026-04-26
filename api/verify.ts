import { jwtVerify } from 'jose';
import admin from 'firebase-admin';

// Node.js runtime required for Firebase Admin SDK
// (Edge runtime does not support it)

// Initialize Firebase Admin (Only once)
if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error('Firebase Admin init error:', error);
  }
}

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
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const tokenPayload = payload as any;

    // 2. Validate required fields
    if (!tokenPayload.nim || !tokenPayload.nama) {
      return res.status(400).json({ error: 'Token missing required fields (nim, nama)' });
    }

    // 3. Generate Firebase Custom Token using NIM as UID
    // This allows the client to call signInWithCustomToken()
    // and makes request.auth.uid === nim in Firestore Security Rules
    let firebaseToken: string | null = null;
    try {
      firebaseToken = await admin.auth().createCustomToken(tokenPayload.nim, {
        nama: tokenPayload.nama,
        kelas: tokenPayload.kelas || '',
        role: 'user', // Default role; actual role is in Firestore doc
      });
    } catch (fbError) {
      console.error('Failed to create Firebase Custom Token:', fbError);
      // Continue without Firebase token — client will work in degraded mode
    }

    return res.status(200).json({
      payload: tokenPayload,
      firebaseToken, // null if Firebase Admin failed
    });
  } catch (error: any) {
    console.error('Token verification error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
}
