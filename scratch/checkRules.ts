import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase configuration in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  try {
    const { data, error } = await supabase.from('assessment_grading_rules').select('*');
    if (error) {
      console.log("❌ Error:", error.message);
    } else {
      console.log("✅ Rules found:", JSON.stringify(data, null, 2));
    }
  } catch (err: any) {
    console.error("❌ Exception during test:", err.message);
  }
}

test();
