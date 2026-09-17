const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('nim, nama, role, xp');
      
    if (error) {
      console.log('Error fetching users:', error.message);
    } else {
      console.log('Users in DB:', users);
    }
  } catch (e) {
    console.error("Catch error:", e);
  }
}

check();
