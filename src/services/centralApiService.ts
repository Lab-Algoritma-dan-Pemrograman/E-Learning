import { supabase } from '../lib/supabase';
import { Level } from '../data/curriculum';

export interface ProgressSummaryPayload {
  nim: string;
  studentName: string;
  completedLessons: number;
  totalLessons: number;
  isCompleted: boolean;
}

/**
 * Report aggregated progress (1 row per user) to Supabase central database.
 * Counts ALL lessons across ALL levels and sends a single summary row.
 * Uses upsert on 'nim' so the same user always has 1 row.
 */
export async function reportProgressToSupabase(payload: ProgressSummaryPayload): Promise<void> {
  try {
    const percentage = payload.totalLessons > 0
      ? Math.round((payload.completedLessons / payload.totalLessons) * 10000) / 100
      : 0;

    const { error } = await supabase
      .from('elearning_progress')
      .upsert({
        nim: payload.nim,
        student_name: payload.studentName,
        lessons_completed: payload.completedLessons,
        total_lessons: payload.totalLessons,
        completion_percentage: percentage,
        is_completed: payload.isCompleted,
        last_accessed_at: new Date().toISOString(),
      }, {
        onConflict: 'nim',
      });

    if (error) {
      console.error('Failed to report progress to Supabase:', error);
    } else {
      console.log(`📊 Progress reported: ${payload.nim} (${payload.completedLessons}/${payload.totalLessons} = ${percentage}%)`);
    }
  } catch (error) {
    console.error('Error reporting progress to Supabase:', error);
  }
}

/**
 * Calculate total progress across ALL levels in the curriculum.
 * Returns aggregated counts for the entire curriculum, not per-level.
 */
export function getOverallProgress(
  lessonId: string,
  curriculum: Level[],
  completedLessons: string[]
): {
  completedCount: number;
  totalCount: number;
  isAllCompleted: boolean;
} {
  let totalCount = 0;
  let completedCount = 0;

  for (const level of curriculum) {
    for (const module of level.modules || []) {
      for (const lesson of module.lessons || []) {
        totalCount++;
        // Count the current lesson as completed too (it's being completed right now)
        if (completedLessons.includes(lesson.id) || lesson.id === lessonId) {
          completedCount++;
        }
      }
    }
  }

  return {
    completedCount,
    totalCount,
    isAllCompleted: totalCount > 0 && completedCount >= totalCount,
  };
}

// ===== ADMIN RESET FUNCTIONS =====

/**
 * Reset ALL Supabase progress for a user.
 * Deletes all rows in elearning_progress.
 */
export async function resetSupabaseProgress(nim: string): Promise<void> {
  try {
    await supabase.from('elearning_progress').delete().eq('nim', nim);
    console.log(`✅ Supabase progress reset for ${nim}`);
  } catch (error) {
    console.error('Error resetting Supabase progress:', error);
  }
}

/**
 * Reset Supabase progress for a specific level.
 * Since we use 1 row per user, we just re-sync the full progress.
 * The caller should re-trigger a full progress report after this.
 */
export async function resetSupabaseLevelProgress(nim: string, _levelId: string): Promise<void> {
  try {
    // With 1-row-per-user model, we can't delete a single level.
    // Instead, we delete the entire row. It will be re-created on next lesson completion.
    await supabase.from('elearning_progress').delete().eq('nim', nim);
    console.log(`✅ Supabase progress reset for ${nim} (level reset triggers full reset)`);
  } catch (error) {
    console.error('Error resetting Supabase level progress:', error);
  }
}
