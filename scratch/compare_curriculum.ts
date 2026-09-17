import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { curriculum } from '../src/data/curriculum';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function compare() {
  // 1. Static curriculum counts
  let staticLevels = curriculum.length;
  let staticModules = 0;
  let staticLessons = 0;
  curriculum.forEach(level => {
    staticModules += level.modules?.length || 0;
    level.modules?.forEach(mod => {
      staticLessons += mod.lessons?.length || 0;
    });
  });

  console.log("=== Static Curriculum (File src/data/curriculum.ts) ===");
  console.log(`Levels: ${staticLevels}`);
  console.log(`Modules: ${staticModules}`);
  console.log(`Lessons: ${staticLessons}`);

  // 2. Database curriculum counts
  const { data: dbLevels } = await supabase.from('levels').select('id');
  const { data: dbModules } = await supabase.from('modules').select('id');
  const { data: dbLessons } = await supabase.from('lessons').select('id');

  console.log("\n=== Database Curriculum (Supabase) ===");
  console.log(`Levels: ${dbLevels?.length || 0}`);
  console.log(`Modules: ${dbModules?.length || 0}`);
  console.log(`Lessons: ${dbLessons?.length || 0}`);
}

compare();
