import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Progress reporting to central database will not work.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    headers: {},
  },
});

/**
 * Update the authorization header dynamically for Supabase requests.
 * Mapped to the student's JWT token for Row Level Security (RLS).
 */
export const setSupabaseSession = (token: string) => {
  if (!token) return;
  
  // Set REST Postgrest headers
  if ((supabase as any).rest) {
    (supabase as any).rest.headers['Authorization'] = `Bearer ${token}`;
  }
  
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
