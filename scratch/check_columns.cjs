const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function check() {
  try {
    const tables = ['users', 'student_progress', 'active_sessions', 'achievements', 'unlocked_achievements'];
    
    for (const table of tables) {
      const { data: row, error: err } = await supabase
        .from(table)
        .select('*')
        .limit(1);
        
      if (err) {
        console.log(`Table ${table} error:`, err.message);
      } else {
        console.log(`Table ${table} columns:`, row && row.length > 0 ? Object.keys(row[0]) : 'empty table or no columns');
      }
    }
  } catch (e) {
    console.error("Catch error:", e);
  }
}

check();
