import { Level } from '../data/curriculum';
import { getSavedToken } from './tokenService';
import { supabase } from '../lib/supabase';

export interface ProgressSummaryPayload {
  nim: string;
  studentName: string;
  completedLessons: number;
  totalLessons: number;
  isCompleted: boolean;
  completedLevels: string[];
  currentLevel: string;
}

/**
 * Report aggregated progress (1 row per user) to Supabase central database.
 * This report is now handled server-side for security.
 */
export async function reportProgressToSupabase(payload: ProgressSummaryPayload): Promise<void> {
  try {
    const token = getSavedToken();
    if (!token) {
      console.warn('Cannot report progress: No active token found.');
      return;
    }

    // Call server-side API instead of direct Supabase client
    const response = await fetch('/api/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, payload }),
    });

    if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        console.error('Failed to report progress to server:', errData.error || response.statusText);
        return;
    }

    const percentage = payload.totalLessons > 0
      ? Math.round((payload.completedLessons / payload.totalLessons) * 10000) / 100
      : 0;

    console.log(`📊 Progress reported via server: ${payload.nim} (${payload.completedLessons}/${payload.totalLessons} = ${percentage}%)`);
  } catch (error) {
    console.error('Error reporting progress to server:', error);
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
  completedLevels: string[];
  currentLevel: string;
} {
  let totalCount = 0;
  let completedCount = 0;
  const completedLevelTitles: string[] = [];
  let currentLevel = '';

  for (const level of curriculum) {
    let levelTotal = 0;
    let levelCompleted = 0;

    for (const module of level.modules || []) {
      for (const lesson of module.lessons || []) {
        totalCount++;
        levelTotal++;
        if (completedLessons.includes(lesson.id) || lesson.id === lessonId) {
          completedCount++;
          levelCompleted++;
        }
      }
    }

    if (levelTotal > 0 && levelCompleted >= levelTotal) {
      completedLevelTitles.push(level.title);
    } else if (levelCompleted > 0 && levelCompleted < levelTotal) {
      currentLevel = level.title;
    }
  }

  // If no level is partially done, set current to first incomplete level
  if (!currentLevel) {
    for (const level of curriculum) {
      if (!completedLevelTitles.includes(level.title)) {
        currentLevel = level.title;
        break;
      }
    }
  }

  return {
    completedCount,
    totalCount,
    isAllCompleted: totalCount > 0 && completedCount >= totalCount,
    completedLevels: completedLevelTitles,
    currentLevel,
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
