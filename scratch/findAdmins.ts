import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase configuration in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  try {
    const { data, error } = await supabase.from('users').select('nim, nama, kelas, role').limit(50);
    if (error) {
      console.log("❌ Error fetching users:", error.message);
    } else {
      console.log("✅ Users found (up to 50):", JSON.stringify(data, null, 2));
    }
  } catch (err: any) {
    console.error("❌ Exception during test:", err.message);
  }
}

test();
