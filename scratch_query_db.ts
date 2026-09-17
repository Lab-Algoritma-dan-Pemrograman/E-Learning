import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

async function check() {
  const { data, error } = await supabase
    .from('lessons')
    .select('id, title, validation_rules, initial_code, solution')
    .eq('id', 'c-level-1-m1-l1');

  if (error) {
    console.error("Supabase error:", error);
    return;
  }

  console.log(`Retrieved ${data?.length} lessons from Supabase:`);
  data?.forEach(les => {
    console.log(`\nLesson ID: ${les.id}`);
    console.log(`Title: ${les.title}`);
    console.log(`Initial Code:`, JSON.stringify(les.initial_code));
    console.log(`Solution:`, JSON.stringify(les.solution));
    console.log(`Validation Rules:`, JSON.stringify(les.validation_rules, null, 2));
  });
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);
check();
