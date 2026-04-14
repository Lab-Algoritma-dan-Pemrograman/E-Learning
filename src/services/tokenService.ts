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

// Removing decodeToken fallback to prevent unsanitized token use if JWT_SECRET is missing.
export async function verifyToken(token: string): Promise<TokenPayload | null> {
  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not configured! Cannot verify token safely.');
    return null;
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

    // Protection against replay attacks over long term
    // Verify `iat` (issued-at) is not older than 24h
    const MAX_AGE_SECONDS = 24 * 60 * 60;
    if (tokenPayload.iat && (Date.now() / 1000 - tokenPayload.iat > MAX_AGE_SECONDS)) {
       console.warn('Token is too old (issued at time exceeded max age).');
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
    } else {
      const url = new URL(window.location.href);
      url.searchParams.delete('token');
      window.history.replaceState({}, '', url.toString());
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
