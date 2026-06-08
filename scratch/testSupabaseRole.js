const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const { SignJWT } = require('jose');

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabaseSecret = process.env.SUPABASE_JWT_SECRET || '';

if (!supabaseUrl || !supabaseSecret) {
  console.error('❌ Supabase URL or SUPABASE_JWT_SECRET is missing!');
  process.exit(1);
}

async function runTest() {
  const key = Buffer.from(supabaseSecret, 'base64');
  
  console.log('--- TEST 1: role = "kordas" (Our Current Token) ---');
  const tokenKordas = await new SignJWT({
    nim: '202211083',
    nama: 'IVAN JOSE',
    kelas: 'AP-1',
    role: 'kordas',
    email: 'ivan@example.com'
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(key);

  const clientKordas = createClient(supabaseUrl, supabaseAnonKey);
  clientKordas.rest.headers['Authorization'] = `Bearer ${tokenKordas}`;

  try {
    const { data, error } = await clientKordas
      .from('assessment_questions')
      .select('id')
      .limit(1);
    
    if (error) {
      console.log('❌ role="kordas" failed:', error.status, error.message);
    } else {
      console.log('✅ role="kordas" succeeded!', data);
    }
  } catch (err) {
    console.log('❌ Exception:', err.message);
  }

  console.log('\n--- TEST 2: role = "authenticated" (Standard Supabase Role) ---');
  const tokenAuth = await new SignJWT({
    nim: '202211083',
    nama: 'IVAN JOSE',
    kelas: 'AP-1',
    role: 'authenticated', // standard Supabase role
    user_role: 'kordas', // custom claim for our policy
    email: 'ivan@example.com'
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(key);

  const clientAuth = createClient(supabaseUrl, supabaseAnonKey);
  clientAuth.rest.headers['Authorization'] = `Bearer ${tokenAuth}`;

  try {
    const { data, error } = await clientAuth
      .from('assessment_questions')
      .select('id')
      .limit(1);
    
    if (error) {
      console.log('❌ role="authenticated" failed:', error.status, error.message);
    } else {
      console.log('✅ role="authenticated" succeeded!', data);
    }
  } catch (err) {
    console.log('❌ Exception:', err.message);
  }
}

runTest();
