import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  const { data: questions } = await supabase
    .from('assessment_questions')
    .select('id, menu_type, module_association, title, difficulty, type')
    .eq('menu_type', 'post_test');
    
  console.log("Post Test Questions in DB:");
  console.log(JSON.stringify(questions, null, 2));
}

check();
