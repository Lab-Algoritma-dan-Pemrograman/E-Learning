import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { curriculum } from '../src/data/curriculum';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Supabase URL or Key missing in env!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncToSupabase() {
  console.log("⏳ Starting full curriculum sync to Supabase...");
  
  // 1. Gather all incoming IDs
  const incomingLevelIds = curriculum.map(l => l.id);
  const incomingModuleIds: string[] = [];
  const incomingLessonIds: string[] = [];

  for (const level of curriculum) {
    if (level.modules) {
      for (const mod of level.modules) {
        incomingModuleIds.push(mod.id);
        if (mod.lessons) {
          for (const lesson of mod.lessons) {
            incomingLessonIds.push(lesson.id);
          }
        }
      }
    }
  }

  // 2. Fetch existing DB IDs
  const { data: dbLevels } = await supabase.from('levels').select('id');
  const { data: dbModules } = await supabase.from('modules').select('id');
  const { data: dbLessons } = await supabase.from('lessons').select('id');

  const dbLevelIds = (dbLevels || []).map(l => l.id);
  const dbModuleIds = (dbModules || []).map(m => m.id);
  const dbLessonIds = (dbLessons || []).map(l => l.id);

  // 3. Determine deletions
  const levelsToDelete = dbLevelIds.filter(id => !incomingLevelIds.includes(id));
  const modulesToDelete = dbModuleIds.filter(id => !incomingModuleIds.includes(id));
  const lessonsToDelete = dbLessonIds.filter(id => !incomingLessonIds.includes(id));

  if (lessonsToDelete.length > 0) {
    await supabase.from('lessons').delete().in('id', lessonsToDelete);
  }
  if (modulesToDelete.length > 0) {
    await supabase.from('modules').delete().in('id', modulesToDelete);
  }
  if (levelsToDelete.length > 0) {
    await supabase.from('levels').delete().in('id', levelsToDelete);
  }

  // 4. Batch / Bulk Upsert (3 requests instead of 132 sequential requests)
  const levelsToUpsert: any[] = [];
  const modulesToUpsert: any[] = [];
  const lessonsToUpsert: any[] = [];

  for (let lIdx = 0; lIdx < curriculum.length; lIdx++) {
    const level = curriculum[lIdx];
    levelsToUpsert.push({
      id: level.id,
      title: level.title,
      description: level.description,
      access_mode: level.accessMode || 'auto',
      locked: level.locked || false,
      sort_order: lIdx
    });

    if (level.modules) {
      for (let mIdx = 0; mIdx < level.modules.length; mIdx++) {
        const mod = level.modules[mIdx];
        modulesToUpsert.push({
          id: mod.id,
          level_id: level.id,
          title: mod.title,
          sort_order: mIdx
        });

        if (mod.lessons) {
          for (let lesIdx = 0; lesIdx < mod.lessons.length; lesIdx++) {
            const lesson = mod.lessons[lesIdx];
            lessonsToUpsert.push({
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
              sort_order: lesIdx
            });
          }
        }
      }
    }
  }

  console.log(`Sending batch upserts: ${levelsToUpsert.length} levels, ${modulesToUpsert.length} modules, ${lessonsToUpsert.length} lessons...`);
  if (levelsToUpsert.length > 0) {
    const { error: err1 } = await supabase.from('levels').upsert(levelsToUpsert);
    if (err1) throw err1;
  }
  if (modulesToUpsert.length > 0) {
    const { error: err2 } = await supabase.from('modules').upsert(modulesToUpsert);
    if (err2) throw err2;
  }
  if (lessonsToUpsert.length > 0) {
    const { error: err3 } = await supabase.from('lessons').upsert(lessonsToUpsert);
    if (err3) throw err3;
  }

  console.log("✅ Successfully synced curriculum to Supabase DB!");
}

syncToSupabase().catch(err => {
  console.error("❌ Sync error:", err);
  process.exit(1);
});
