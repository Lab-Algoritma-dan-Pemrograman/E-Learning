import { jwtVerify, decodeJwt } from 'jose';

export interface TokenPayload {
  nim: string;
  nama: string;
  kelas: string;
  role?: 'admin' | 'kordas' | 'asisten' | 'user';
  email?: string;
  exp?: number;
  iat?: number;
}

export interface VerifyResult {
  payload: TokenPayload;
  firebaseToken: string | null;
}

// JWT_SECRET is no longer used in the client for security reasons.
// Verification is now handled by the server-side /api/verify endpoint.

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
 * Verify token by calling the server-side API.
 * This keeps the JWT_SECRET hidden on the server.
 * Now also returns a Firebase Custom Token for authentication.
 */
export async function verifyToken(token: string): Promise<VerifyResult | null> {
  try {
    // 1. Call server-side verification API
    const response = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      console.warn('Token verification failed on server');
      return null;
    }

    const data = await response.json();
    const tokenPayload = data.payload as TokenPayload;

    // 2. Validate required fields
    if (!tokenPayload.nim || !tokenPayload.nama) {
      console.warn('Token is missing required fields (nim, nama)');
      return null;
    }

    return {
      payload: tokenPayload,
      firebaseToken: data.firebaseToken || null,
    };
  } catch (error) {
    console.error('Token verification error:', error);
    
    // Fallback: If API is not available (dev mode without Vercel), 
    // we can still decode to allow UI to function, but this is UNSAFE for production.
    try {
      const decoded = decodeJwt(token) as unknown as TokenPayload;
      if (import.meta.env.DEV) {
          console.warn('DEV MODE: Falling back to unsafe local decoding. Firebase Auth will NOT be active.');
          return {
            payload: decoded,
            firebaseToken: null,
          };
      }
    } catch (e) {
      return null;
    }
    
    return null;
  }
}


/**
 * Initialize user session from token.
 * Checks URL first, then sessionStorage.
 * Returns the decoded token payload or null.
 */
export async function initializeFromToken(): Promise<VerifyResult | null> {
  // 1. Check URL parameter first (fresh redirect from web utama)
  const urlToken = getTokenFromUrl();
  if (urlToken) {
    const result = await verifyToken(urlToken);
    if (result) {
      saveToken(urlToken);
      // Clean URL to remove token parameter
      const url = new URL(window.location.href);
      url.searchParams.delete('token');
      window.history.replaceState({}, '', url.toString());
      return result;
    } else {
      const url = new URL(window.location.href);
      url.searchParams.delete('token');
      window.history.replaceState({}, '', url.toString());
    }
  }

  // 2. Check sessionStorage (page refresh)
  const savedToken = getSavedToken();
  if (savedToken) {
    const result = await verifyToken(savedToken);
    if (result) {
      return result;
    }
    // Token expired or invalid, clear it
    clearToken();
  }

  return null;
}
