import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseServiceKey) {
  console.error("SUPABASE_SERVICE_ROLE_KEY is missing!");
  process.exit(1);
}

// Initialize with service role key (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runTest() {
  console.log("Initializing Service Client...");

  // 1. Fetch current lessons
  const { data: dbLessons, error: lessonsErr } = await supabase.from('lessons').select('id, title');
  if (lessonsErr) throw lessonsErr;

  console.log(`Lessons count: ${dbLessons?.length || 0}`);

  if (!dbLessons || dbLessons.length === 0) {
    console.log("No lessons found!");
    return;
  }

  // Pick the first lesson to delete for testing
  const targetLesson = dbLessons[0];
  console.log(`Target lesson to delete: ID="${targetLesson.id}" Title="${targetLesson.title}"`);

  // 2. Perform deletion
  console.log("Executing delete query with service role key...");
  const { data: deleteData, error: deleteErr } = await supabase
    .from('lessons')
    .delete()
    .eq('id', targetLesson.id)
    .select();

  if (deleteErr) {
    console.error("Delete failed with error:", deleteErr);
  } else {
    console.log("Delete query completed. Returned data:", deleteData);
    
    // 3. Verify deletion
    const { data: verifyLessons } = await supabase.from('lessons').select('id').eq('id', targetLesson.id);
    if (verifyLessons && verifyLessons.length > 0) {
      console.log("❌ VERIFICATION FAILED: Lesson still exists in database!");
    } else {
      console.log("✅ VERIFICATION SUCCESS: Lesson was deleted from database!");
      
      // Restore the lesson immediately
      console.log("Restoring deleted lesson...");
      const { error: restoreErr } = await supabase.from('lessons').insert({
        id: targetLesson.id,
        module_id: dbLessons.find(l => l.id === targetLesson.id)?.module_id || '',
        title: targetLesson.title,
        explanation: 'Restored',
        code_example: '',
        initial_code: '',
        solution: '',
        hint: '',
        quiz: {},
        test_cases: [],
        validation_rules: [],
        sort_order: 0
      });
      if (restoreErr) console.error("Restore failed:", restoreErr);
      else console.log("Restore success.");
    }
  }
}

runTest();
