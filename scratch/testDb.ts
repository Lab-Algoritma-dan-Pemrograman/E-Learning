import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { SignJWT } from 'jose';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabaseSecret = process.env.SUPABASE_JWT_SECRET || process.env.JWT_SECRET || '';

if (!supabaseUrl || !supabaseSecret) {
  console.error('❌ Supabase URL or SUPABASE_JWT_SECRET/JWT_SECRET is missing!');
  process.exit(1);
}

async function runTest() {
  const key = Buffer.from(supabaseSecret, 'base64');
  
  // Create an admin token
  const tokenAdmin = await new SignJWT({
    nim: '202211083',
    nama: 'IVAN JOSE',
    kelas: 'AP-1',
    role: 'authenticated',
    user_role: 'admin',
    email: 'ivan@example.com'
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(key);

  const client = createClient(supabaseUrl, supabaseAnonKey);
  (client as any).rest.headers['Authorization'] = `Bearer ${tokenAdmin}`;

  console.log('--- Checking levels table count ---');
  const { data: levels, error: levelsErr } = await client.from('levels').select('*');
  if (levelsErr) {
    console.error('Error selecting levels:', levelsErr);
  } else {
    console.log('Levels count:', levels.length, levels);
  }

  console.log('--- Checking game_questions count ---');
  const { data: gq, error: gqErr } = await client.from('game_questions').select('*');
  if (gqErr) {
    console.error('Error selecting game_questions:', gqErr);
  } else {
    console.log('Game questions count:', gq?.length, gq);
  }

  console.log('--- Testing insert level as admin ---');
  const { error: insertErr } = await client.from('levels').upsert({
    id: 'test-level',
    title: 'Test Level',
    description: 'Test Description',
    access_mode: 'auto',
    locked: false
  });
  if (insertErr) {
    console.error('Insert level error:', insertErr);
  } else {
    console.log('✅ Level insert succeeded!');
  }
}

runTest();
