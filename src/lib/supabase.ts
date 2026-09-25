import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Progress reporting to central database will not work.');
}

/**
 * Module-level token storage for the custom fetch wrapper.
 * This is the ONLY reliable way to inject a custom Authorization header
 * in Supabase JS v2.x, because `supabase.rest` is a getter that creates
 * a new PostgrestClient on each access (so setting headers on it doesn't persist).
 */
let _currentToken: string | null = null;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    fetch: (url: RequestInfo | URL, init?: RequestInit) => {
      // Clone headers and override Authorization if we have a custom token
      const headers = new Headers(init?.headers);
      if (_currentToken) {
        headers.set('Authorization', `Bearer ${_currentToken}`);
      }
      return fetch(url, { ...init, headers });
    },
  },
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});

/**
 * Decode payload JWT TANPA verifikasi. Cukup sebagai penjaga: yang menentukan
 * sah/tidaknya token adalah PostgREST, bukan klien ini.
 */
const jwtPayload = (token: string): Record<string, any> | null => {
  try {
    const part = token.split('.')[1];
    const b64 = part.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(decodeURIComponent(escape(atob(b64 + '='.repeat((4 - (b64.length % 4)) % 4)))));
  } catch {
    return null;
  }
};

/**
 * Update the authorization token for all Supabase requests (REST + Realtime).
 * Mapped to the student's JWT token for Row Level Security (RLS).
 *
 * HANYA token yang ditandatangani Supabase JWT secret yang boleh dipakai.
 * Token dari backend Go ditandatangani JWT_SECRET backend, sedangkan PostgREST
 * memverifikasi dengan legacy secret Supabase -> PGRST301 "None of the keys was
 * able to decode the JWT" pada SEMUA request. Dulu itu yang membuat injeksi
 * token dimatikan; sekarang cukup disaring di sini: token non-Supabase
 * diabaikan sehingga anon key tetap dipakai seperti sebelumnya.
 */
export const setSupabaseSession = (token: string) => {
  if (!token) {
    _currentToken = null;
    return;
  }

  const payload = jwtPayload(token);

  if (!payload || payload.iss !== 'supabase' || payload.role !== 'authenticated') {
    console.warn('[supabase] Token bukan token Supabase (iss/role tidak cocok) - request tetap memakai anon key.');
    _currentToken = null;
    return;
  }

  if (typeof payload.exp === 'number' && payload.exp * 1000 <= Date.now()) {
    console.warn('[supabase] Token sudah kedaluwarsa - request tetap memakai anon key.');
    _currentToken = null;
    return;
  }

  _currentToken = token;
};

/** Lepas token (dipakai saat logout) supaya request kembali memakai anon key. */
export const clearSupabaseSession = () => {
  _currentToken = null;
};

// Auto-initialize on load if token exists in session storage
const initialToken = sessionStorage.getItem('elearning_token');
if (initialToken) {
  setSupabaseSession(initialToken);
}

