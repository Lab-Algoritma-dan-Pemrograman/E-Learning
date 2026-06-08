import { jwtVerify } from 'jose';

/**
 * Decodes the Supabase JWT secret. If it's base64 encoded (as standard in Supabase),
 * it decodes the base64 string to raw bytes. Otherwise, it uses UTF-8 bytes.
 */
export function getSupabaseSecret(secretStr: string | undefined): Uint8Array | null {
  if (!secretStr) return null;
  try {
    const clean = secretStr.trim();
    if (clean.length === 88 || clean.endsWith('=')) {
      return Buffer.from(clean, 'base64');
    }
  } catch (e) {
    // Fallback
  }
  return new TextEncoder().encode(secretStr.trim());
}

/**
 * Encodes the Web Utama JWT secret.
 */
export function getWebUtamaSecret(): Uint8Array {
  const secretStr = process.env.VITE_JWT_SECRET || process.env.JWT_SECRET || '';
  return new TextEncoder().encode(secretStr.trim());
}

/**
 * Verifies a token against either the Supabase JWT secret (first) or the Web Utama JWT secret (fallback).
 */
export async function verifyToken(token: string): Promise<any> {
  const supabaseSecretStr = process.env.SUPABASE_JWT_SECRET;
  if (supabaseSecretStr) {
    try {
      const secret = getSupabaseSecret(supabaseSecretStr);
      if (secret) {
        const { payload } = await jwtVerify(token, secret);
        return payload;
      }
    } catch (err) {
      // Fallback
    }
  }

  const secret = getWebUtamaSecret();
  const { payload } = await jwtVerify(token, secret);
  return payload;
}
