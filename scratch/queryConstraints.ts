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

async function run() {
  console.log("Attempting to query pg_catalog.pg_constraint...");
  const { data: data1, error: error1 } = await supabase
    .from('pg_constraint' as any)
    .select('*' as any)
    .limit(1);
  if (error1) {
    console.log("❌ pg_constraint query failed:", error1.message);
  } else {
    console.log("✅ pg_constraint query succeeded:", data1);
  }

  console.log("Attempting to query information_schema.table_constraints...");
  const { data: data2, error: error2 } = await supabase
    .from('table_constraints' as any)
    .select('*' as any)
    .limit(1);
  if (error2) {
    console.log("❌ table_constraints query failed:", error2.message);
  } else {
    console.log("✅ table_constraints query succeeded:", data2);
  }
}

run();
