import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase URL or Anon Key is missing!');
  process.exit(1);
}

async function runTest() {
  const client = createClient(supabaseUrl, supabaseAnonKey);
  const { data: attempts, error } = await client
    .from('assessment_attempts')
    .select('*')
    .order('started_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error fetching attempts:', error);
    return;
  }

  console.log('--- Last 5 attempts ---');
  for (const att of attempts) {
    const dbTime = att.started_at;
    const parsedDate = new Date(dbTime);
    const elapsedSeconds = Math.floor((Date.now() - parsedDate.getTime()) / 1000);
    const totalDurationSeconds = att.duration_minutes * 60;
    const remaining = totalDurationSeconds - elapsedSeconds;
    
    console.log(`ID: ${att.id}`);
    console.log(`NIM: ${att.nim}`);
    console.log(`Type: ${att.menu_type}`);
    console.log(`Status: ${att.status}`);
    console.log(`started_at (db): ${dbTime}`);
    console.log(`parsed date: ${parsedDate.toISOString()}`);
    console.log(`elapsedSeconds: ${elapsedSeconds}`);
    console.log(`duration_minutes: ${att.duration_minutes}`);
    console.log(`remaining: ${remaining}`);
    console.log('---------------------------');
  }
}

runTest();
