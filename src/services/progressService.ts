import { supabase } from '../lib/supabase';
import { UserProfile, useStore } from '../store/useStore';
import { reportProgressToSupabase, getOverallProgress, resetSupabaseProgress } from './centralApiService';
import { Level } from '../data/curriculum';
import { Achievement, checkAndUnlockAchievements } from './achievementService';

export const completeLesson = async (
  user: UserProfile,
  lessonId: string,
  xpReward: number,
  curriculum: Level[] = [],
  completedLessons: string[] = []
): Promise<Achievement[]> => {
  if (completedLessons.includes(lessonId)) {
    console.log(`⏭️ Lesson "${lessonId}" already completed. Skipping XP reward.`);
    return [];
  }

  try {
    // 1. Double-check in database to avoid duplicate writes
    const { data: existingProgress } = await supabase
      .from('student_progress')
      .select('*')
      .eq('nim', user.nim)
      .eq('lesson_id', lessonId)
      .maybeSingle();

    if (existingProgress && existingProgress.completed) {
      console.log(`⏭️ Lesson "${lessonId}" already verified in Supabase. Skipping XP.`);
      return [];
    }

    // 2. Calculate streak
    const today = new Date().toDateString();
    const lastActive = user.lastActive ? new Date(user.lastActive).toDateString() : '';
    
    let streakUpdate = user.streak || 0;
    if (today !== lastActive) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const isYesterday = yesterday.toDateString() === lastActive;
      streakUpdate = isYesterday ? (user.streak || 0) + 1 : 1;
    }

    const newXp = (user.xp || 0) + xpReward;

    // 3. Update User profile in Supabase
    const { error: userError } = await supabase
      .from('users')
      .update({
        xp: newXp,
        streak: streakUpdate,
        last_active: new Date().toISOString()
      })
      .eq('nim', user.nim);

    if (userError) throw userError;

    // Optimistically update the local store so XP displays immediately in the header
    useStore.getState().setUser({ ...user, xp: newXp, streak: streakUpdate, lastActive: new Date().toISOString() });

    // 4. Save progress record to Supabase
    const { error: progressError } = await supabase
      .from('student_progress')
      .insert([{
        nim: user.nim,
        lesson_id: lessonId,
        completed: true,
        completed_at: new Date().toISOString()
      }]);

    if (progressError) throw progressError;

    // 5. Report aggregated progress back to elearning_progress table
    reportProgressToSupabase(user.nim);

    // 6. Check for Achievements
    const newlyUnlocked = await checkAndUnlockAchievements(user, { 
      xp: newXp,
      completedLevelIds: curriculum
        .filter(l => getOverallProgress(lessonId, curriculum, completedLessons).completedLevels.includes(l.title))
        .map(l => l.id)
    });
    return newlyUnlocked;

  } catch (error) {
    console.error("Failed to complete lesson:", error);
    return [];
  }
};

export const grantXp = async (user: UserProfile, amount: number): Promise<void> => {
  const newXp = (user.xp || 0) + amount;
  const { error } = await supabase
    .from('users')
    .update({ xp: newXp, last_active: new Date().toISOString() })
    .eq('nim', user.nim);

  if (error) throw error;

  useStore.getState().setUser({ ...user, xp: newXp, lastActive: new Date().toISOString() });
};

export const syncProgress = (userId: string, setCompletedLessons: (lessons: string[]) => void) => {
  const loadProgress = async () => {
    const { data, error } = await supabase
      .from('student_progress')
      .select('lesson_id')
      .eq('nim', userId)
      .eq('completed', true);
    if (!error && data) {
      setCompletedLessons(data.map(p => p.lesson_id));
    }
  };

  loadProgress();

  const channel = supabase
    .channel(`realtime:student_progress:${userId}`)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'student_progress',
      filter: `nim=eq.${userId}`
    }, loadProgress)
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

export const syncExistingProgressToSupabase = async (
  user: UserProfile,
  _curriculum: Level[],
  _completedLessons: string[]
): Promise<void> => {
  if (!user.nim) return;

  try {
    await reportProgressToSupabase(user.nim);
    console.log('🔄 Existing progress synced to Supabase rekap table');
  } catch (error) {
    console.error('Error syncing existing progress:', error);
  }
};

// =========================================================================
// ADMIN FUNCTIONS
// =========================================================================

export const resetUserProgress = async (nim: string): Promise<void> => {
  try {
    // 1. Delete all progress records
    const { error: deleteErr } = await supabase
      .from('student_progress')
      .delete()
      .eq('nim', nim);

    if (deleteErr) throw deleteErr;

    // 2. Reset user stats
    const { error: userErr } = await supabase
      .from('users')
      .update({
        xp: 0,
        level: 1,
        streak: 0
      })
      .eq('nim', nim);

    if (userErr) throw userErr;

    // 3. Reset Supabase aggregated rekap table
    await resetSupabaseProgress(nim);

    console.log(`✅ All progress reset in Supabase for ${nim}`);
  } catch (error) {
    console.error("Failed to reset user progress:", error);
    throw error;
  }
};

export const resetLevelProgress = async (
  nim: string,
  levelId: string,
  curriculum: Level[]
): Promise<void> => {
  try {
    const level = curriculum.find(l => l.id === levelId);
    if (!level) throw new Error(`Level ${levelId} not found`);

    // Get all lesson IDs in this level
    const lessonIds: string[] = [];
    for (const mod of level.modules || []) {
      for (const lesson of mod.lessons || []) {
        lessonIds.push(lesson.id);
      }
    }

    // Get currently completed lessons for this level
    const { data: levelProgress } = await supabase
      .from('student_progress')
      .select('lesson_id')
      .eq('nim', nim)
      .in('lesson_id', lessonIds);

    const completedInLevel = (levelProgress || []).map(p => p.lesson_id);
    const completedCount = completedInLevel.length;

    if (completedCount > 0) {
      // 1. Delete progress documents
      const { error: deleteErr } = await supabase
        .from('student_progress')
        .delete()
        .eq('nim', nim)
        .in('lesson_id', completedInLevel);

      if (deleteErr) throw deleteErr;

      // 2. Deduct user XP (50 per lesson completed in this level)
      const { data: userProfile } = await supabase
        .from('users')
        .select('xp')
        .eq('nim', nim)
        .single();

      if (userProfile) {
        const deductedXp = Math.max(0, userProfile.xp - (completedCount * 50));
        await supabase
          .from('users')
          .update({ xp: deductedXp })
          .eq('nim', nim);
      }
    }

    // 3. Re-trigger aggregated sync
    await reportProgressToSupabase(nim);

    console.log(`✅ Level "${levelId}" progress reset in Supabase for ${nim}`);
  } catch (error) {
    console.error("Failed to reset level progress:", error);
    throw error;
  }
};

export const adjustUserXp = async (nim: string, newXp: number): Promise<void> => {
  try {
    const safeXp = Math.max(0, Math.round(newXp));
    const { error } = await supabase
      .from('users')
      .update({ xp: safeXp })
      .eq('nim', nim);

    if (error) throw error;
    console.log(`✅ XP set to ${safeXp} for ${nim}`);
  } catch (error) {
    console.error("Failed to adjust XP:", error);
    throw error;
  }
};

export const deleteUser = async (nim: string): Promise<void> => {
  try {
    // PostgreSQL Foreign Key ON DELETE CASCADE handles deletion in:
    // student_progress, unlocked_achievements, active_sessions, assessment_attempts
    // so we only need to delete the user row!
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('nim', nim);

    if (error) throw error;

    // Reset aggregation progress
    await resetSupabaseProgress(nim);

    console.log(`✅ User ${nim} deleted successfully in Supabase.`);
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw error;
  }
};
