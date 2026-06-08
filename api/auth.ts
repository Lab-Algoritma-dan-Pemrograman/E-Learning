import { jwtVerify } from 'jose';

/**
 * Cached Supabase secret bytes (auto-detected encoding).
 * null = not yet detected, Uint8Array = detected
 */
let _cachedSupabaseSecret: Uint8Array | null = null;
let _secretDetected = false;

/**
 * Auto-detect the correct encoding for the Supabase JWT secret by verifying
 * the anon key. Supabase PostgREST may use either raw UTF-8 or base64-decoded
 * bytes depending on the configuration. This function tries both and caches
 * the result.
 */
export async function detectSupabaseSecret(): Promise<Uint8Array | null> {
  if (_secretDetected) return _cachedSupabaseSecret;

  const secretStr = process.env.SUPABASE_JWT_SECRET;
  if (!secretStr) {
    _secretDetected = true;
    return null;
  }

  const clean = secretStr.trim();
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  // Strategy 1: If we have the anon key, verify it to detect the correct encoding
  if (anonKey) {
    // Try raw UTF-8 first (most common for Supabase hosted)
    try {
      const rawBytes = new TextEncoder().encode(clean);
      await jwtVerify(anonKey, rawBytes);
      console.log('[auth] Supabase JWT secret detected as RAW UTF-8');
      _cachedSupabaseSecret = rawBytes;
      _secretDetected = true;
      return _cachedSupabaseSecret;
    } catch {
      // Not raw, try base64
    }

    // Try base64 decoded
    try {
      const b64Bytes = Buffer.from(clean, 'base64');
      await jwtVerify(anonKey, b64Bytes);
      console.log('[auth] Supabase JWT secret detected as BASE64');
      _cachedSupabaseSecret = b64Bytes;
      _secretDetected = true;
      return _cachedSupabaseSecret;
    } catch {
      // Neither works
      console.error('[auth] CRITICAL: Supabase JWT secret could not verify the anon key with either encoding!');
    }
  }

  // Strategy 2: Fallback heuristic if no anon key available
  // Try raw first (safer default for Supabase hosted)
  console.warn('[auth] No anon key available for auto-detection, using raw UTF-8 encoding');
  _cachedSupabaseSecret = new TextEncoder().encode(clean);
  _secretDetected = true;
  return _cachedSupabaseSecret;
}

/**
 * Synchronous getter for the Supabase secret (after detection).
 * Falls back to raw UTF-8 if detection hasn't run yet.
 */
export function getSupabaseSecretSync(secretStr: string | undefined): Uint8Array | null {
  if (!secretStr) return null;
  if (_secretDetected && _cachedSupabaseSecret) return _cachedSupabaseSecret;
  // Fallback: raw UTF-8 (most common for Supabase)
  return new TextEncoder().encode(secretStr.trim());
}

/**
 * Alias for backwards compatibility.
 */
export const getSupabaseSecret = getSupabaseSecretSync;

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
  // Ensure secret is auto-detected first
  const supabaseSecret = await detectSupabaseSecret();
  if (supabaseSecret) {
    try {
      const { payload } = await jwtVerify(token, supabaseSecret);
      return payload;
    } catch (err) {
      // Fallback to Web Utama secret
    }
  }

  const secret = getWebUtamaSecret();
  const { payload } = await jwtVerify(token, secret);
  return payload;
}

