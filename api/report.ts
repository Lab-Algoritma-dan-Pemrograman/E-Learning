import { jwtVerify } from 'jose';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client (Only once)
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token, nim } = req.body;
    
    if (!token || !nim) {
      return res.status(400).json({ error: 'Missing token or nim' });
    }

    // 1. Verify token
    const secret = new TextEncoder().encode(process.env.VITE_JWT_SECRET || process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const tokenPayload = payload as any;

    if (tokenPayload.nim !== nim) {
      return res.status(403).json({ error: 'Identity mismatch' });
    }

    // 2. Fetch DATA from Supabase relasional
    // A. Get Total Lessons count
    const { count: totalLessons, error: totalErr } = await supabase
      .from('lessons')
      .select('*', { count: 'exact', head: true });

    if (totalErr) throw totalErr;
    const totalCount = totalLessons || 0;

    // B. Get Completed Lessons count
    const { count: completedLessons, error: compErr } = await supabase
      .from('student_progress')
      .select('*', { count: 'exact', head: true })
      .eq('nim', nim)
      .eq('completed', true);

    if (compErr) throw compErr;
    const completedCount = completedLessons || 0;

    // C. Calculate which levels are fully completed
    const { data: levels, error: lvlErr } = await supabase
      .from('levels')
      .select('*, modules(*, lessons(*))');

    if (lvlErr) throw lvlErr;

    const { data: userProgress, error: progErr } = await supabase
      .from('student_progress')
      .select('lesson_id')
      .eq('nim', nim)
      .eq('completed', true);

    if (progErr) throw progErr;
    const completedLessonIds = (userProgress || []).map(p => p.lesson_id);

    const completedLevels: string[] = [];
    let currentLevelTitle = '';

    (levels || []).forEach(level => {
      let levelTotal = 0;
      let levelDone = 0;
      
      (level.modules || []).forEach((mod: any) => {
        (mod.lessons || []).forEach((lsn: any) => {
          levelTotal++;
          if (completedLessonIds.includes(lsn.id)) {
            levelDone++;
          }
        });
      });

      if (levelTotal > 0 && levelDone >= levelTotal) {
        completedLevels.push(level.title);
      } else if (levelDone > 0 && !currentLevelTitle) {
        currentLevelTitle = level.title;
      }
    });

    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 10000) / 100 : 0;

    // 3. Sync to Supabase progress tracking table
    const { error: supabaseError } = await supabase
      .from('elearning_progress')
      .upsert({
        nim: nim,
        student_name: tokenPayload.nama || tokenPayload.full_name || 'Student',
        lessons_completed: completedCount,
        total_lessons: totalCount,
        completion_percentage: percentage,
        is_completed: totalCount > 0 && completedCount >= totalCount,
        completed_levels: completedLevels,
        current_level: currentLevelTitle || 'Introduction',
        last_accessed_at: new Date().toISOString(),
      }, {
        onConflict: 'nim',
      });

    if (supabaseError) throw supabaseError;

    return res.status(200).json({ 
      success: true, 
      recalculated: { 
        completed: completedCount, 
        total: totalCount,
        percentage 
      } 
    });

  } catch (error: any) {
    console.error('Report error:', error);
    return res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
}

