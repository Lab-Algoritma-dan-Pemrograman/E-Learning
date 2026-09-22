import { jwtVerify, decodeJwt } from 'jose';

export interface TokenPayload {
  nim: string;
  nama: string;
  kelas: string;
  jurusan?: string;
  role?: 'admin' | 'kordas' | 'koordinator' | 'asisten' | 'praktikan' | 'mahasiswa';
  email?: string;
  exp?: number;
  iat?: number;
}

export interface VerifyResult {
  payload: TokenPayload;
  firebaseToken: string | null;
  token?: string | null;
}

// JWT_SECRET is no longer used in the client for security reasons.
// Verification is now handled by the server-side /api/verify endpoint.

/**
 * Kirim token dari Web Utama ke E-Learning via POST JSON ke /api/receive-token.
 * Endpoint mengembalikan { token, redirectUrl } — Web Utama kemudian redirect
 * user ke redirectUrl, atau langsung gunakan token yang dikembalikan.
 *
 * Contoh penggunaan di sisi Web Utama:
 *
 *   const res = await fetch('https://e-learning.domain.com/api/receive-token', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ token: jwtTokenDariWebUtama }),
 *   });
 *   const { redirectUrl } = await res.json();
 *   window.location.href = redirectUrl;  // redirect user ke E-Learning
 *
 * Atau jika Web Utama membuka E-Learning di tab baru / iframe, bisa gunakan
 * window.postMessage setelah E-Learning siap:
 *
 *   elearningWindow.postMessage(
 *     { type: 'ELEARNING_AUTH', token: jwtToken },
 *     'https://e-learning.domain.com'
 *   );
 */
export type ReceiveTokenResult = {
  success: boolean;
  token: string;
  redirectUrl: string;
  payload: TokenPayload;
};

/**
 * Listener postMessage — aktif di sisi E-Learning untuk menerima token
 * dari Web Utama yang membuka E-Learning sebagai popup atau iframe.
 * Dipanggil sekali saat app boot dari SupabaseProvider.
 */
export function startPostMessageListener(
  onToken: (result: VerifyResult) => void
): () => void {
  const handler = async (event: MessageEvent) => {
    // Validasi origin — hanya terima dari Web Utama (algohub.web.id) + localhost dev.
    const allowedOrigins = [
      'https://algohub.web.id',
      'http://localhost:3000',
      'http://localhost:5173',
    ].filter(Boolean);

    const originAllowed = allowedOrigins.some(o =>
      o && event.origin.startsWith(o.replace(/\/$/, ''))
    );

    if (!originAllowed) return;
    if (!event.data || event.data.type !== 'ELEARNING_AUTH') return;

    const { token } = event.data as { type: string; token: string };
    if (!token) return;

    const result = await verifyToken(token);
    if (result) {
      saveToken(result.token || token);
      onToken(result);
      // Konfirmasi ke Web Utama bahwa auth berhasil
      (event.source as Window)?.postMessage(
        { type: 'ELEARNING_AUTH_SUCCESS', nim: result.payload.nim },
        event.origin
      );
    }
  };

  window.addEventListener('message', handler);
  return () => window.removeEventListener('message', handler);
}

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
      token: data.token || null
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
 *
 * Alur prioritas:
 *  1. URL query param ?token=...   (redirect dari Web Utama)
 *  2. sessionStorage               (page refresh)
 *  3. window.postMessage           (Web Utama embed / popup — pasif, dihandle terpisah)
 */
export async function initializeFromToken(): Promise<VerifyResult | null> {
  // 1. Check URL parameter first (fresh redirect from web utama)
  const urlToken = getTokenFromUrl();
  if (urlToken) {
    const result = await verifyToken(urlToken);
    if (result) {
      // Save the translated database token instead of Web Utama token
      saveToken(result.token || urlToken);
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
      if (result.token) {
        saveToken(result.token); // Refresh token in storage if updated
      }
      return result;
    }
    // Token expired or invalid, clear it
    clearToken();
  }

  return null;
}
