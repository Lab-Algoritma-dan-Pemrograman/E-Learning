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

async function check() {
  console.log("Querying all assessment_questions...");
  const { data, error } = await supabase
    .from('assessment_questions')
    .select('id, menu_type, difficulty, type, title');

  if (error) {
    console.error("Query failed:", error.message);
  } else if (data) {
    console.log("Total questions:", data.length);
    const types = Array.from(new Set(data.map(item => item.type)));
    const menuTypes = Array.from(new Set(data.map(item => item.menu_type)));
    const difficulties = Array.from(new Set(data.map(item => item.difficulty)));
    console.log("Distinct types:", types);
    console.log("Distinct menu_types:", menuTypes);
    console.log("Distinct difficulties:", difficulties);
    
    // Group by menu_type and type
    const grouping: Record<string, Record<string, number>> = {};
    for (const item of data) {
      if (!grouping[item.menu_type]) grouping[item.menu_type] = {};
      if (!grouping[item.menu_type][item.type]) grouping[item.menu_type][item.type] = 0;
      grouping[item.menu_type][item.type]++;
    }
    console.log("Grouped counts:", JSON.stringify(grouping, null, 2));
  }
}

check();
