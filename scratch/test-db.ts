import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: './.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

console.log('Connecting to Supabase URL:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function test() {
  try {
    // 1. Check users count
    const { count: usersCount, error: usersError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });
    console.log('Users count:', usersError ? `Error: ${usersError.message}` : usersCount);

    // 2. Check levels count
    const { count: levelsCount, error: levelsError } = await supabase
      .from('levels')
      .select('*', { count: 'exact', head: true });
    console.log('Levels count:', levelsError ? `Error: ${levelsError.message}` : levelsCount);

    // 3. Check modules count
    const { count: modulesCount, error: modulesError } = await supabase
      .from('modules')
      .select('*', { count: 'exact', head: true });
    console.log('Modules count:', modulesError ? `Error: ${modulesError.message}` : modulesCount);

    // 4. Check lessons count
    const { count: lessonsCount, error: lessonsError } = await supabase
      .from('lessons')
      .select('*', { count: 'exact', head: true });
    console.log('Lessons count:', lessonsError ? `Error: ${lessonsError.message}` : lessonsCount);

    // 5. Check student_progress count
    const { count: progressCount, error: progressError } = await supabase
      .from('student_progress')
      .select('*', { count: 'exact', head: true });
    console.log('Student Progress count:', progressError ? `Error: ${progressError.message}` : progressCount);

    // 6. Check active_sessions count
    const { count: sessionsCount, error: sessionsError } = await supabase
      .from('active_sessions')
      .select('*', { count: 'exact', head: true });
    console.log('Active Sessions count:', sessionsError ? `Error: ${sessionsError.message}` : sessionsCount);

    // 6.5. Check elearning_progress count
    const { count: elearningProgressCount, error: elearningProgressError } = await supabase
      .from('elearning_progress')
      .select('*', { count: 'exact', head: true });
    console.log('E-Learning Progress count:', elearningProgressError ? `Error: ${elearningProgressError.message}` : elearningProgressCount);

    // 7. Try a join query to verify structure
    const { data: sampleProgress, error: joinError } = await supabase
      .from('student_progress')
      .select('*, lessons(title, modules(title, levels(title)))')
      .limit(1);
    
    if (joinError) {
      console.log('Join query failed:', joinError.message);
    } else {
      console.log('Join query sample:', JSON.stringify(sampleProgress, null, 2));
    }

  } catch (err: any) {
    console.error('Test error:', err.message);
  }
}

test();
