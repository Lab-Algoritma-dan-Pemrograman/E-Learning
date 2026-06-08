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
  const { data: users, error } = await client
    .from('users')
    .select('nim, nama, kelas')
    .eq('role', 'praktikan');

  if (error) {
    console.error('Error fetching users:', error);
    return;
  }

  const uniqueClasses = new Set<string>();
  const nimPrefixes = new Set<string>();
  
  for (const u of users) {
    if (u.kelas) uniqueClasses.add(u.kelas.trim());
    if (u.nim && u.nim.length >= 6) {
      nimPrefixes.add(u.nim.substring(0, 6));
    }
  }

  console.log('Total students:', users.length);
  console.log('Unique classes in DB:', Array.from(uniqueClasses));
  console.log('NIM Prefixes (first 6 chars):', Array.from(nimPrefixes));
}

runTest();
