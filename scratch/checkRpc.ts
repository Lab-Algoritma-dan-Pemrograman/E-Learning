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
  console.log("Calling RPC query_check_constraints...");
  const { data: rpcData, error: rpcError } = await supabase.rpc('query_check_constraints');
  if (rpcError) {
    console.error("RPC query_check_constraints failed:", rpcError.message);
  } else {
    console.log("RPC query_check_constraints returned:", JSON.stringify(rpcData, null, 2));
  }
}

run();
