import { jwtVerify, decodeJwt } from 'jose';

export interface TokenPayload {
  nim: string;
  nama: string;
  kelas: string;
  email?: string;
  exp?: number;
  iat?: number;
}

const JWT_SECRET = import.meta.env.VITE_JWT_SECRET || '';

/**
 * Extract token from URL query parameter.
 * URL format: https://e-learning.domain.com?token=eyJ...
 */
export function getTokenFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('token');
}

/**
 * Save token to sessionStorage for persistence across page refreshes.
 */
export function saveToken(token: string): void {
  sessionStorage.setItem('elearning_token', token);
}

/**
 * Get saved token from sessionStorage.
 */
export function getSavedToken(): string | null {
  return sessionStorage.getItem('elearning_token');
}

/**
 * Clear saved token (logout).
 */
export function clearToken(): void {
  sessionStorage.removeItem('elearning_token');
}

/**
 * Decode JWT token without verification (for quick payload access).
 * Use this when signature verification is handled elsewhere or
 * when the JWT_SECRET is not available in the frontend.
 */
export function decodeToken(token: string): TokenPayload | null {
  try {
    const payload = decodeJwt(token) as unknown as TokenPayload;
    
    // Check expiration
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      console.warn('Token has expired');
      return null;
    }

    // Validate required fields
    if (!payload.nim || !payload.nama) {
      console.warn('Token is missing required fields (nim, nama)');
      return null;
    }

    return payload;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}

/**
 * Verify JWT token with signature validation.
 * Use this when JWT_SECRET is available.
 */
export async function verifyToken(token: string): Promise<TokenPayload | null> {
  if (!JWT_SECRET) {
    // Fallback to decode-only if secret is not configured
    console.warn('JWT_SECRET not configured, falling back to decode-only mode');
    return decodeToken(token);
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    const tokenPayload = payload as unknown as TokenPayload;

    // Validate required fields
    if (!tokenPayload.nim || !tokenPayload.nama) {
      console.warn('Token is missing required fields (nim, nama)');
      return null;
    }

    return tokenPayload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Initialize user session from token.
 * Checks URL first, then sessionStorage.
 * Returns the decoded token payload or null.
 */
export async function initializeFromToken(): Promise<TokenPayload | null> {
  // 1. Check URL parameter first (fresh redirect from web utama)
  const urlToken = getTokenFromUrl();
  if (urlToken) {
    const payload = await verifyToken(urlToken);
    if (payload) {
      saveToken(urlToken);
      // Clean URL to remove token parameter
      const url = new URL(window.location.href);
      url.searchParams.delete('token');
      window.history.replaceState({}, '', url.toString());
      return payload;
    }
  }

  // 2. Check sessionStorage (page refresh)
  const savedToken = getSavedToken();
  if (savedToken) {
    const payload = await verifyToken(savedToken);
    if (payload) {
      return payload;
    }
    // Token expired or invalid, clear it
    clearToken();
  }

  return null;
}
