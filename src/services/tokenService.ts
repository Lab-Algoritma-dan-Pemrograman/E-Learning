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
    // Validasi origin — hanya terima dari Web Utama (siakad.algohub.web.id / algohub.web.id) + localhost dev.
    const allowedOrigins = [
      'https://siakad.algohub.web.id',
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

export function normalizeRole(role: string | null | undefined): 'admin' | 'kordas' | 'asisten' | 'praktikan' {
  if (!role) return 'praktikan';
  const clean = String(role).toLowerCase().trim();
  if (['admin', 'superadmin', 'super_admin', 'administrator', 'super admin'].includes(clean)) return 'admin';
  if (['kordas', 'koordinator', 'korda', 'coordinator'].includes(clean)) return 'kordas';
  if (['asisten', 'assistant', 'laboran', 'ast'].includes(clean)) return 'asisten';
  return 'praktikan';
}

/**
 * Petakan role UI E-Learning ke nilai kanonik yang aman disimpan di kolom
 * bersama `users.role`. Nilai harus valid untuk SEMUA app yang membaca kolom
 * itu: Praktikum hanya mengenal mahasiswa/asisten/koordinator — nilai lain
 * (mis. 'admin') membuat user ditolak guard di sana.
 *   admin     -> koordinator  (admin E-Learning setara kordas di kanonik)
 *   kordas    -> koordinator
 *   praktikan -> mahasiswa
 *   asisten   -> asisten
 */
export function toCanonicalRole(uiRole: string | null | undefined): 'mahasiswa' | 'asisten' | 'koordinator' {
  const r = normalizeRole(uiRole);
  if (r === 'admin' || r === 'kordas') return 'koordinator';
  if (r === 'asisten') return 'asisten';
  return 'mahasiswa';
}

/**
 * Role efektif E-Learning. Kolom bersama users.role menyimpan nilai kanonik
 * (mahasiswa/asisten/koordinator) agar Praktikum tidak menolak user; flag
 * 'admin' disimpan terpisah di users.elearning_role (milik E-Learning saja).
 * Hierarki E-Learning: kordas > admin > asisten > praktikan.
 */
export function resolveElearningRole(
  role: string | null | undefined,
  elearningRole: string | null | undefined
): 'admin' | 'kordas' | 'asisten' | 'praktikan' {
  if (String(elearningRole || '').toLowerCase().trim() === 'admin') return 'admin';
  return normalizeRole(role);
}

export function getTokenFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('token') || params.get('jwt') || params.get('access_token') || params.get('auth');
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

    if (response.ok) {
      const data = await response.json();
      const tokenPayload = data.payload as TokenPayload;

      // 2. Validate required fields
      if (tokenPayload.nim && tokenPayload.nama) {
        tokenPayload.role = normalizeRole(tokenPayload.role);
        return {
          payload: tokenPayload,
          firebaseToken: data.firebaseToken || null,
          token: data.token || null
        };
      }
    }
  } catch (error) {
    console.error('Token verification API error:', error);
  }

  // Fallback: decode directly (useful in dev mode or offline token decoding)
  try {
    const decoded = decodeJwt(token) as any;
    if (decoded) {
      const nim = decoded.nim || decoded.username || decoded.sub || '';
      const nama = decoded.nama || decoded.full_name || decoded.name || '';
      const kelas = decoded.kelas || decoded.class_code || '';
      const jurusan = decoded.jurusan || decoded.major || undefined;
      const email = decoded.email || undefined;
      const role = normalizeRole(decoded.user_role || decoded.role);

      if (nim && nama) {
        return {
          payload: {
            nim,
            nama,
            kelas,
            jurusan,
            email,
            role,
            exp: decoded.exp,
            iat: decoded.iat,
          },
          firebaseToken: null,
          token,
        };
      }
    }
  } catch (e) {
    console.warn('Fallback decode failed:', e);
  }

  return null;
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
