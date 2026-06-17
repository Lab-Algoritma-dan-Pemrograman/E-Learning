import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '../Web Lab AP/.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

console.log('Connecting to Web Lab AP Supabase URL:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  try {
    const { count: usersCount, error: usersError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });
    console.log('Users count:', usersError ? `Error: ${usersError.message}` : usersCount);

    const { count: progressCount, error: progressError } = await supabase
      .from('elearning_progress')
      .select('*', { count: 'exact', head: true });
    console.log('E-Learning Progress count:', progressError ? `Error: ${progressError.message}` : progressCount);

    const { count: sessionsCount, error: sessionsError } = await supabase
      .from('active_sessions')
      .select('*', { count: 'exact', head: true });
    console.log('Active Sessions count:', sessionsError ? `Error: ${sessionsError.message}` : sessionsCount);

  } catch (err: any) {
    console.error('Test error:', err.message);
  }
}

test();
