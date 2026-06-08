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
    .select('nim, nama, kelas, role')
    .eq('role', 'praktikan')
    .limit(20);

  if (error) {
    console.error('Error fetching users:', error);
    return;
  }

  console.log('--- Students list (up to 20) ---');
  for (const u of users) {
    console.log(`NIM: ${u.nim} | Nama: ${u.nama} | Kelas: ${u.kelas} | Role: ${u.role}`);
  }
}

runTest();
