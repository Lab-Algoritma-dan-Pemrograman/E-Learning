import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function inspect() {
  console.log("Inspecting routines...");
  try {
    const { data: routines, error: routinesErr } = await supabase
      .from('routines' as any)
      .select('routine_name, routine_definition' as any)
      .eq('routine_schema', 'public')
      .in('routine_name', ['auth_role', 'auth_nim']);

    if (routinesErr) {
      console.error("Routines query error:", routinesErr);
    } else {
      console.log("Routines result:", routines);
    }
  } catch (e) {
    console.error("Catch error:", e);
  }
}

inspect();
