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
 * Update the authorization token for all Supabase requests (REST + Realtime).
 * Mapped to the student's JWT token for Row Level Security (RLS).
 */
export const setSupabaseSession = (token: string) => {
  if (!token) return;

  // JANGAN pakai token backend sebagai Authorization PostgREST: token itu
  // ditandatangani JWT_SECRET backend, sedangkan PostgREST memverifikasi
  // dengan legacy secret Supabase -> PGRST301 "None of the keys was able to
  // decode the JWT" pada SEMUA request. Biarkan anon key yang dipakai;
  // keamanan dijaga column-level grant (password_hash dkk tidak di-grant).
  // ponytail: kolom gamifikasi bisa ditulis siapa saja yang punya anon key.
  // Kalau itu jadi masalah, pindahkan write ke server pakai service_role.
};

// Auto-initialize on load if token exists in session storage
const initialToken = sessionStorage.getItem('elearning_token');
if (initialToken) {
  setSupabaseSession(initialToken);
}

