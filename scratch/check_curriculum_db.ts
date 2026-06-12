import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  const { data: levels, error: levelsErr } = await supabase.from('levels').select('id, title');
  const { data: modules, error: modulesErr } = await supabase.from('modules').select('id, title, level_id');
  const { data: lessons, error: lessonsErr } = await supabase.from('lessons').select('id, title, module_id');

  console.log("=== Database Curriculum Check ===");
  if (levelsErr) console.error("Levels Error:", levelsErr);
  else console.log(`Levels: ${levels?.length || 0}`, levels);

  if (modulesErr) console.error("Modules Error:", modulesErr);
  else console.log(`Modules: ${modules?.length || 0}`);

  if (lessonsErr) console.error("Lessons Error:", lessonsErr);
  else console.log(`Lessons: ${lessons?.length || 0}`);
}

check();
