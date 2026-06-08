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
  
  // Set module-level token (picked up by the custom fetch wrapper above)
  _currentToken = token;
  
  // Set Realtime channels authorization
  if (supabase.realtime) {
    supabase.realtime.setAuth(token);
  }
};

// Auto-initialize on load if token exists in session storage
const initialToken = sessionStorage.getItem('elearning_token');
if (initialToken) {
  setSupabaseSession(initialToken);
}

