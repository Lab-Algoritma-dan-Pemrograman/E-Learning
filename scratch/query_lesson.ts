import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function query() {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', 'c1-l1')
    .single();

  if (error) {
    console.error("Error fetching lesson:", error);
  } else {
    console.log("Database lesson c1-l1:");
    console.log(JSON.stringify(data, null, 2));
  }
}

query();
