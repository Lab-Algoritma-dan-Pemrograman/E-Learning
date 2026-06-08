import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

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
    const { data, error } = await supabase.from('assessment_attempts').select('tab_switch_count').limit(1);
    if (error) {
      console.log("❌ Column/Table error:", error.message);
    } else {
      console.log("✅ Column exists! Sample data:", data);
    }
  } catch (err: any) {
    console.error("❌ Exception during test:", err.message);
  }
}

test();
