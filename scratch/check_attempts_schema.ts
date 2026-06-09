import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_ANON_KEY || ''
);

async function check() {
  const { data, error } = await supabase
    .from('assessment_attempts')
    .select('*')
    .limit(1);

  if (error) {
    console.error("Error fetching assessment_attempts:", error.message);
  } else if (data && data.length > 0) {
    console.log("Columns in assessment_attempts:", Object.keys(data[0]));
  } else {
    console.log("No attempts found to inspect columns directly. Querying all column names using postgres schema table...");
    const { data: colsData, error: colsError } = await supabase.rpc('get_table_columns', { table_name: 'assessment_attempts' });
    if (colsError) {
      console.log("RPC get_table_columns failed, attempting to select columns info...");
      // Let's try to query an empty select to see if it succeeds
      const { error: testErr } = await supabase.from('assessment_attempts').select('module_association, kode').limit(0);
      if (testErr) {
        console.log("❌ module_association/kode columns DO NOT exist:", testErr.message);
      } else {
        console.log("✅ module_association and kode columns exist!");
      }
    } else {
      console.log("Columns from RPC:", colsData);
    }
  }
}

check();
