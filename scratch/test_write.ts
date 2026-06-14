import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { SignJWT } from 'jose';

// Load from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const jwtSecret = process.env.JWT_SECRET || process.env.SUPABASE_JWT_SECRET || '';

if (!jwtSecret) {
  console.error("JWT_SECRET is missing!");
  process.exit(1);
}

const key = Buffer.from(jwtSecret, 'base64');

// Helper to get auth client for Kordas
async function getKordasClient() {
  const token = await new SignJWT({
    nim: '202211083', // IVAN JOSE (kordas)
    nama: 'IVAN JOSE',
    kelas: 'SYSTEM',
    role: 'authenticated',
    user_role: 'kordas',
    email: 'kordas@e-learning.internal'
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('5m')
    .sign(key);

  const client = createClient(supabaseUrl, supabaseAnonKey);
  (client as any).rest.headers['Authorization'] = `Bearer ${token}`;
  return client;
}

// Re-implement the get and save logic to test directly
async function runTest() {
  console.log("Initializing Kordas client...");
  const supabase = await getKordasClient();

  // 1. Fetch current curriculum structure
  console.log("Fetching levels, modules, lessons...");
  const { data: dbLevels, error: levelsErr } = await supabase.from('levels').select('*');
  if (levelsErr) throw levelsErr;
  const { data: dbModules, error: modulesErr } = await supabase.from('modules').select('*');
  if (modulesErr) throw modulesErr;
  const { data: dbLessons, error: lessonsErr } = await supabase.from('lessons').select('*');
  if (lessonsErr) throw lessonsErr;

  console.log(`Initial DB count: Levels=${dbLevels?.length || 0}, Modules=${dbModules?.length || 0}, Lessons=${dbLessons?.length || 0}`);

  // 2. Build current levels hierarchy
  const levels = dbLevels.map(level => {
    const levelModules = dbModules
      .filter(m => m.level_id === level.id)
      .map(mod => {
        const modLessons = dbLessons
          .filter(l => l.module_id === mod.id)
          .map(les => ({
            id: les.id,
            title: les.title,
            explanation: les.explanation,
            codeExample: les.code_example,
            initialCode: les.initial_code,
            solution: les.solution,
            hint: les.hint,
            quiz: les.quiz,
            testCases: les.test_cases,
            validationRules: les.validation_rules
          }));
        return {
          id: mod.id,
          title: mod.title,
          lessons: modLessons
        };
      });
    return {
      id: level.id,
      title: level.title,
      description: level.description,
      accessMode: level.access_mode,
      locked: level.locked,
      modules: levelModules
    };
  });

  // Find a lesson to delete for testing
  let lessonToDeleteId = '';
  let targetLevelIdx = -1;
  let targetModIdx = -1;
  let targetLessonIdx = -1;

  for (let l = 0; l < levels.length; l++) {
    const level = levels[l];
    for (let m = 0; m < level.modules.length; m++) {
      const mod = level.modules[m];
      if (mod.lessons && mod.lessons.length > 0) {
        lessonToDeleteId = mod.lessons[0].id;
        targetLevelIdx = l;
        targetModIdx = m;
        targetLessonIdx = 0;
        break;
      }
    }
    if (lessonToDeleteId) break;
  }

  if (!lessonToDeleteId) {
    console.log("No lessons found to delete!");
    return;
  }

  console.log(`Found target lesson to delete: ID="${lessonToDeleteId}" ("${levels[targetLevelIdx].modules[targetModIdx].lessons[targetLessonIdx].title}")`);

  // Clone levels and remove the target lesson
  const updatedLevels = JSON.parse(JSON.stringify(levels));
  const targetMod = updatedLevels[targetLevelIdx].modules[targetModIdx];
  const originalLesson = targetMod.lessons[targetLessonIdx];
  targetMod.lessons.splice(targetLessonIdx, 1); // remove from array

  // 3. Run the deletion and upsert logic using Kordas client
  console.log("Running saveFullCurriculum simulation...");
  try {
    const incomingLevelIds = updatedLevels.map(l => l.id);
    const incomingModuleIds: string[] = [];
    const incomingLessonIds: string[] = [];

    for (const level of updatedLevels) {
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

    const dbLevelIds = (dbLevels || []).map(l => l.id);
    const dbModuleIds = (dbModules || []).map(m => m.id);
    const dbLessonIds = (dbLessons || []).map(l => l.id);

    const levelsToDelete = dbLevelIds.filter(id => !incomingLevelIds.includes(id));
    const modulesToDelete = dbModuleIds.filter(id => !incomingModuleIds.includes(id));
    const lessonsToDelete = dbLessonIds.filter(id => !incomingLessonIds.includes(id));

    console.log("Identified for deletion:");
    console.log("  levels:", levelsToDelete);
    console.log("  modules:", modulesToDelete);
    console.log("  lessons:", lessonsToDelete);

    if (lessonsToDelete.length > 0) {
      const { error } = await supabase
        .from('lessons')
        .delete()
        .in('id', lessonsToDelete);
      if (error) throw error;
      console.log("  Successfully executed lessons delete");
    }

    if (modulesToDelete.length > 0) {
      const { error } = await supabase
        .from('modules')
        .delete()
        .in('id', modulesToDelete);
      if (error) throw error;
      console.log("  Successfully executed modules delete");
    }

    if (levelsToDelete.length > 0) {
      const { error } = await supabase
        .from('levels')
        .delete()
        .in('id', levelsToDelete);
      if (error) throw error;
      console.log("  Successfully executed levels delete");
    }

    // Insert / Upsert the remaining/new levels, modules, and lessons
    for (const level of updatedLevels) {
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
    
    console.log("Save simulation completed successfully!");

    // Verify database count now
    const { data: verifyLessons } = await supabase.from('lessons').select('id').eq('id', lessonToDeleteId);
    if (verifyLessons && verifyLessons.length > 0) {
      console.log("❌ VERIFICATION FAILED: Lesson still exists in database!");
    } else {
      console.log("✅ VERIFICATION SUCCESS: Lesson was deleted from database!");
      
      // Restore the lesson for cleanup
      console.log("Restoring deleted lesson...");
      const { error: restoreErr } = await supabase
        .from('lessons')
        .insert({
          id: originalLesson.id,
          module_id: dbLessons.find(l => l.id === originalLesson.id)?.module_id,
          title: originalLesson.title,
          explanation: originalLesson.explanation,
          code_example: originalLesson.codeExample,
          initial_code: originalLesson.initialCode,
          solution: originalLesson.solution,
          hint: originalLesson.hint,
          quiz: originalLesson.quiz || {},
          test_cases: originalLesson.testCases || [],
          validation_rules: originalLesson.validationRules || [],
          sort_order: dbLessons.find(l => l.id === originalLesson.id)?.sort_order || 0
        });
      if (restoreErr) console.error("Restore failed:", restoreErr);
      else console.log("Restore success.");
    }
  } catch (err) {
    console.error("Test failed with error:", err);
  }
}

runTest();
