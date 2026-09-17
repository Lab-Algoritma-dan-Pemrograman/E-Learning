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


