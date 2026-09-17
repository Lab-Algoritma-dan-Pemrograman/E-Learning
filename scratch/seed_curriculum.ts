import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { curriculum } from '../src/data/curriculum';

// Load .env.local first to get SUPABASE_SERVICE_ROLE_KEY, then .env
dotenv.config({ path: '.env.local' });
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("⏳ Starting database curriculum seeding...");
  console.log(`Using Supabase URL: ${supabaseUrl}`);
  console.log(`Using Key starts with: ${supabaseKey.substring(0, 15)}...`);

  try {
    // 1. Delete existing levels (cascades to modules & lessons)
    console.log("🗑️ Clearing existing curriculum from Supabase...");
    const { data: levelsData } = await supabase.from('levels').select('id');
    if (levelsData && levelsData.length > 0) {
      const ids = levelsData.map(d => d.id);
      const { error: deleteErr } = await supabase.from('levels').delete().in('id', ids);
      if (deleteErr) throw deleteErr;
    }
    console.log("✅ Database cleared successfully.");

    // 2. Insert new levels, modules, and lessons
    for (const level of curriculum) {
      console.log(`📁 Inserting Level: ${level.id} - ${level.title}`);
      const { error: lvlErr } = await supabase
        .from('levels')
        .upsert({
          id: level.id,
          title: level.title,
          description: level.description,
          access_mode: level.accessMode || 'auto',
          locked: level.locked || false
        });

      if (lvlErr) throw lvlErr;

      if (level.modules) {
        for (let mIdx = 0; mIdx < level.modules.length; mIdx++) {
          const mod = level.modules[mIdx];
          const { error: modErr } = await supabase
            .from('modules')
            .upsert({
              id: mod.id,
              level_id: level.id,
              title: mod.title,
              sort_order: mIdx
            });

          if (modErr) throw modErr;

          if (mod.lessons) {
            for (let lIdx = 0; lIdx < mod.lessons.length; lIdx++) {
              const lesson = mod.lessons[lIdx];
              const { error: lesErr } = await supabase
                .from('lessons')
                .upsert({
                  id: lesson.id,
                  module_id: mod.id,
                  title: lesson.title,
                  explanation: lesson.explanation,
                  code_example: lesson.codeExample,
                  initial_code: lesson.initialCode,
                  solution: lesson.solution,
                  hint: lesson.hint,
                  quiz: lesson.quiz || {},
                  test_cases: lesson.testCases || [],
                  validation_rules: lesson.validationRules || [],
                  sort_order: lIdx
                });

              if (lesErr) throw lesErr;
            }
          }
        }
      }
    }
    console.log("🎉 Database curriculum seeded successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
}

seed();
