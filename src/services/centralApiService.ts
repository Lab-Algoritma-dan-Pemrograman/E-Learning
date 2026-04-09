import { supabase } from '../lib/supabase';
import { Level } from '../data/curriculum';

export interface LevelProgressPayload {
  nim: string;
  levelId: string;
  levelTitle: string;
  lessonsCompleted: number;
  totalLessons: number;
  isCompleted: boolean;
}

export interface LessonLogPayload {
  nim: string;
  levelId: string;
  lessonId: string;
  lessonTitle: string;
  score?: number;
}

/**
 * Report level progress to Supabase central database.
 * Called every time a lesson is completed, to keep the progress up-to-date.
 * Uses upsert so the same (nim, level_id) row is updated, not duplicated.
 */
export async function reportProgressToSupabase(payload: LevelProgressPayload): Promise<void> {
  try {
    const { error } = await supabase
      .from('elearning_progress')
      .upsert({
        nim: payload.nim,
        level_id: payload.levelId,
        level_title: payload.levelTitle,
        lessons_completed: payload.lessonsCompleted,
        total_lessons: payload.totalLessons,
        is_completed: payload.isCompleted,
        completed_at: payload.isCompleted ? new Date().toISOString() : null,
        last_activity: new Date().toISOString(),
      }, {
        onConflict: 'nim,level_id',
      });

    if (error) {
      console.error('Failed to report progress to Supabase:', error);
    } else {
      console.log(`Progress reported: ${payload.nim} - ${payload.levelId} (${payload.lessonsCompleted}/${payload.totalLessons})`);
    }
  } catch (error) {
    console.error('Error reporting progress to Supabase:', error);
  }
}

/**
 * Log individual lesson completion to Supabase.
 * This is optional detailed tracking for analytics.
 */
export async function logLessonCompletion(payload: LessonLogPayload): Promise<void> {
  try {
    const { error } = await supabase
      .from('elearning_lesson_log')
      .upsert({
        nim: payload.nim,
        level_id: payload.levelId,
        lesson_id: payload.lessonId,
        lesson_title: payload.lessonTitle,
        score: payload.score ?? null,
        completed_at: new Date().toISOString(),
      }, {
        onConflict: 'nim,lesson_id',
      });

    if (error) {
      console.error('Failed to log lesson completion:', error);
    }
  } catch (error) {
    console.error('Error logging lesson completion:', error);
  }
}

/**
 * Find which level a lesson belongs to, and count progress within that level.
 * Returns level info + completion stats based on the completed lessons list.
 */
export function getLevelInfoForLesson(
  lessonId: string,
  curriculum: Level[],
  completedLessons: string[]
): {
  levelId: string;
  levelTitle: string;
  lessonTitle: string;
  lessonsCompleted: number;
  totalLessons: number;
  isCompleted: boolean;
} | null {
  for (const level of curriculum) {
    let totalLessons = 0;
    let completedInLevel = 0;
    let lessonTitle = '';
    let found = false;

    for (const module of level.modules || []) {
      for (const lesson of module.lessons || []) {
        totalLessons++;
        // Count the current lesson as completed too (it's being completed right now)
        if (completedLessons.includes(lesson.id) || lesson.id === lessonId) {
          completedInLevel++;
        }
        if (lesson.id === lessonId) {
          found = true;
          lessonTitle = lesson.title;
        }
      }
    }

    if (found) {
      return {
        levelId: level.id,
        levelTitle: level.title,
        lessonTitle,
        lessonsCompleted: completedInLevel,
        totalLessons,
        isCompleted: completedInLevel >= totalLessons,
      };
    }
  }

  return null;
}
