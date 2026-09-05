import { supabase } from '../lib/supabase';
import { UserProfile, useStore } from '../store/useStore';
import { getOverallProgress } from './centralApiService';
import { Level } from '../data/curriculum';
import { Achievement, checkAndUnlockAchievements, checkXpAchievements } from './achievementService';
import { useProgress } from '../store/useProgress';
import { calculateStreak } from './streakService';

// Dynamic leveling formula: level = floor(sqrt(xp / 50)) + 1
export const calculateLevel = (xp: number): number => {
  if (xp <= 0) return 1;
  return Math.floor(Math.sqrt(xp / 50)) + 1;
};

export interface LevelProgressInfo {
  level: number;
  currentLevelXp: number;
  nextLevelXpThreshold: number;
  xpInCurrentLevelNeeded: number;
  percentage: number;
}

export const getLevelProgressInfo = (xp: number): LevelProgressInfo => {
  const lvl = calculateLevel(xp);
  const currentLevelBaseXp = 50 * Math.pow(lvl - 1, 2);
  const nextLevelBaseXp = 50 * Math.pow(lvl, 2);
  
  const xpInCurrentLevelNeeded = nextLevelBaseXp - currentLevelBaseXp;
  const currentLevelXp = xp - currentLevelBaseXp;
  const percentage = xpInCurrentLevelNeeded > 0 ? Math.min(100, Math.max(0, (currentLevelXp / xpInCurrentLevelNeeded) * 100)) : 100;
  
  return {
    level: lvl,
    currentLevelXp,
    nextLevelXpThreshold: nextLevelBaseXp,
    xpInCurrentLevelNeeded,
    percentage
  };
};

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
    const { newStreak: streakUpdate } = calculateStreak(user.lastActive, user.streak);

    const newXp = (user.xp || 0) + xpReward;
    const newLevel = calculateLevel(newXp);
    const oldLevel = user.level || 1;

    // 3. Save progress record to Supabase FIRST
    //    (trigger check_user_xp_level menghitung XP riil dari student_progress,
    //     jadi record ini HARUS ada sebelum UPDATE users.xp)
    const { error: progressError } = await supabase
      .from('student_progress')
      .insert([{
        nim: user.nim,
        lesson_id: lessonId,
        completed: true,
        completed_at: new Date().toISOString()
      }]);

    if (progressError) throw progressError;

    // Update the completed lessons in useProgress store immediately
    const currentCompleted = useProgress.getState().completedLessons;
    if (!currentCompleted.includes(lessonId)) {
      useProgress.getState().setCompletedLessons([...currentCompleted, lessonId]);
    }

    // 4. Update User profile in Supabase (trigger can now see the new progress)
    const { error: userError } = await supabase
      .from('users')
      .update({
        xp: newXp,
        level: newLevel,
        streak: streakUpdate,
        last_active: new Date().toISOString()
      })
      .eq('nim', user.nim);

    if (userError) throw userError;

    // Optimistically update the local store
    useStore.getState().setUser({
      ...user,
      xp: newXp,
      level: newLevel,
      streak: streakUpdate,
      lastActive: new Date().toISOString()
    });

    if (newLevel > oldLevel) {
      useStore.getState().setLevelUpNotification(newLevel);
    }



    // 6. Check for Achievements
    const latestCompleted = useProgress.getState().completedLessons;
    const newlyUnlocked = await checkAndUnlockAchievements({
      ...user,
      xp: newXp,
      level: newLevel,
      streak: streakUpdate
    }, { 
      xp: newXp,
      lessonCount: latestCompleted.length,
      completedLevelIds: curriculum
        .filter(l => getOverallProgress(lessonId, curriculum, latestCompleted).completedLevels.includes(l.title))
        .map(l => l.id)
    });

    // Push newly unlocked achievements to store queue
    newlyUnlocked.forEach(ach => {
      useStore.getState().pushAchievement(ach);
    });

    return newlyUnlocked;

  } catch (error) {
    console.error("Failed to complete lesson:", error);
    return [];
  }
};

export const grantXp = async (user: UserProfile, amount: number): Promise<void> => {
  const newXp = (user.xp || 0) + amount;
  const newLevel = calculateLevel(newXp);
  const oldLevel = user.level || 1;

  const { error } = await supabase
    .from('users')
    .update({
      xp: newXp,
      level: newLevel,
      last_active: new Date().toISOString()
    })
    .eq('nim', user.nim);

  if (error) throw error;

  useStore.getState().setUser({
    ...user,
    xp: newXp,
    level: newLevel,
    lastActive: new Date().toISOString()
  });

  if (newLevel > oldLevel) {
    useStore.getState().setLevelUpNotification(newLevel);
  }

  // Check XP-based achievements and show popup if newly unlocked
  const xpAch = await checkXpAchievements(user.nim, newXp);
  if (xpAch) {
    useStore.getState().pushAchievement(xpAch);
  }
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



// =========================================================================
// ADMIN FUNCTIONS
// =========================================================================

export const resetUserProgress = async (nim: string): Promise<void> => {
  const currentUser = useStore.getState().user;
  const isStaff = currentUser && (currentUser.role === 'admin' || currentUser.role === 'kordas' || currentUser.role === 'asisten');
  if (!isStaff) {
    throw new Error('Akses Ditolak: Hanya staf yang diperbolehkan mereset progres.');
  }

  try {
    // 1. Delete all progress records
    const { error: deleteErr } = await supabase
      .from('student_progress')
      .delete()
      .eq('nim', nim);

    if (deleteErr) throw deleteErr;

    // 2. Delete unlocked achievements to allow re-testing
    const { error: achErr } = await supabase
      .from('unlocked_achievements')
      .delete()
      .eq('nim', nim);

    if (achErr) {
      console.warn("Failed to delete unlocked achievements (might be normal if RLS/table not exists):", achErr.message);
    }

    // 3. Reset user stats
    const { error: userErr } = await supabase
      .from('users')
      .update({
        xp: 0,
        level: 1,
        streak: 0
      })
      .eq('nim', nim);

    if (userErr) throw userErr;

    const currentUser = useStore.getState().user;
    if (currentUser) {
      const { monitoringService } = await import('./monitoringService');
      await monitoringService.addAuditLog(
        currentUser.nim,
        currentUser.nama,
        'progress_reset',
        `Mereset seluruh progress belajar mahasiswa NIM: ${nim}`
      );
      if (currentUser.nim === nim) {
        useProgress.getState().setCompletedLessons([]);
      }
    }

    console.log(`✅ All progress and achievements reset in Supabase for ${nim}`);
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
  const currentUser = useStore.getState().user;
  const isStaff = currentUser && (currentUser.role === 'admin' || currentUser.role === 'kordas' || currentUser.role === 'asisten');
  if (!isStaff) {
    throw new Error('Akses Ditolak: Hanya staf yang diperbolehkan mereset progres level.');
  }

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

      // 2. Deduct user XP (60 per lesson completed in this level)
      const { data: userProfile } = await supabase
        .from('users')
        .select('xp, level')
        .eq('nim', nim)
        .single();

      if (userProfile) {
        const deductedXp = Math.max(0, userProfile.xp - (completedCount * 60));
        const newLevel = calculateLevel(deductedXp);
        await supabase
          .from('users')
          .update({
            xp: deductedXp,
            level: newLevel
          })
          .eq('nim', nim);

        const currentUser = useStore.getState().user;
        if (currentUser) {
          const { monitoringService } = await import('./monitoringService');
          await monitoringService.addAuditLog(
            currentUser.nim,
            currentUser.nama,
            'progress_reset',
            `Mereset progres level "${levelId}" untuk mahasiswa NIM: ${nim}`
          );
          if (currentUser.nim === nim) {
            useStore.getState().setUser({
              ...currentUser,
              xp: deductedXp,
              level: newLevel
            });
            // Update completed lessons in store immediately
            const currentCompleted = useProgress.getState().completedLessons;
            const remainingCompleted = currentCompleted.filter(id => !completedInLevel.includes(id));
            useProgress.getState().setCompletedLessons(remainingCompleted);
          }
        }
      }
    }



    console.log(`✅ Level "${levelId}" progress reset in Supabase for ${nim}`);
  } catch (error) {
    console.error("Failed to reset level progress:", error);
    throw error;
  }
};

export const resetLessonProgress = async (
  nim: string,
  lessonId: string,
  lessonTitle: string
): Promise<void> => {
  const currentUser = useStore.getState().user;
  const isStaff = currentUser && (currentUser.role === 'admin' || currentUser.role === 'kordas' || currentUser.role === 'asisten');
  if (!isStaff) {
    throw new Error('Akses Ditolak: Hanya staf yang diperbolehkan mereset progres pelajaran.');
  }

  try {
    // 1. Delete progress record for this specific lesson
    const { error: deleteErr } = await supabase
      .from('student_progress')
      .delete()
      .eq('nim', nim)
      .eq('lesson_id', lessonId);

    if (deleteErr) throw deleteErr;

    // 2. Deduct user XP (60 per lesson)
    const { data: userProfile } = await supabase
      .from('users')
      .select('xp, level')
      .eq('nim', nim)
      .single();

    if (userProfile) {
      const deductedXp = Math.max(0, userProfile.xp - 60);
      const newLevel = calculateLevel(deductedXp);
      await supabase
        .from('users')
        .update({
          xp: deductedXp,
          level: newLevel
        })
        .eq('nim', nim);

      const currentUser = useStore.getState().user;
      if (currentUser) {
        const { monitoringService } = await import('./monitoringService');
        await monitoringService.addAuditLog(
          currentUser.nim,
          currentUser.nama,
          'progress_reset',
          `Mereset progres pelajaran "${lessonTitle}" untuk mahasiswa NIM: ${nim}`
        );
        if (currentUser.nim === nim) {
          useStore.getState().setUser({
            ...currentUser,
            xp: deductedXp,
            level: newLevel
          });
          // Update completed lessons in store immediately
          const currentCompleted = useProgress.getState().completedLessons;
          const remainingCompleted = currentCompleted.filter(id => id !== lessonId);
          useProgress.getState().setCompletedLessons(remainingCompleted);
        }
      }
    }

    console.log(`✅ Lesson "${lessonId}" progress reset in Supabase for ${nim}`);
  } catch (error) {
    console.error("Failed to reset lesson progress:", error);
    throw error;
  }
};


export const adjustUserXp = async (nim: string, newXp: number): Promise<void> => {
  const currentUser = useStore.getState().user;
  const isAdminOrKordas = currentUser && (currentUser.role === 'admin' || currentUser.role === 'kordas');
  if (!isAdminOrKordas) {
    throw new Error('Akses Ditolak: Hanya Admin atau Kordas yang dapat menyesuaikan XP.');
  }

  try {
    const safeXp = Math.max(0, Math.round(newXp));
    const newLevel = calculateLevel(safeXp);

    // Get current user profile to check if they leveled up
    const { data: userProfile } = await supabase
      .from('users')
      .select('level')
      .eq('nim', nim)
      .single();

    const oldLevel = userProfile?.level || 1;

    const { error } = await supabase
      .from('users')
      .update({
        xp: safeXp,
        level: newLevel
      })
      .eq('nim', nim);

    if (error) throw error;
    console.log(`✅ XP set to ${safeXp} and level set to ${newLevel} for ${nim}`);

    const currentUser = useStore.getState().user;
    if (currentUser) {
      const { monitoringService } = await import('./monitoringService');
      await monitoringService.addAuditLog(
        currentUser.nim,
        currentUser.nama,
        'xp_adjusted',
        `Mengubah XP mahasiswa NIM: ${nim} menjadi ${safeXp} (Level: ${newLevel})`
      );
    }
    if (currentUser && currentUser.nim === nim) {
      useStore.getState().setUser({
        ...currentUser,
        xp: safeXp,
        level: newLevel
      });

      if (newLevel > oldLevel) {
        useStore.getState().setLevelUpNotification(newLevel);
      }
    }

    // Check XP-based achievements
    const xpAch = await checkXpAchievements(nim, safeXp);
    if (xpAch) {
      useStore.getState().pushAchievement(xpAch);
    }
  } catch (error) {
    console.error("Failed to adjust XP:", error);
    throw error;
  }
};

export const deleteUser = async (nim: string): Promise<void> => {
  const currentUser = useStore.getState().user;
  const isAdminOrKordas = currentUser && (currentUser.role === 'admin' || currentUser.role === 'kordas');
  if (!isAdminOrKordas) {
    throw new Error('Akses Ditolak: Hanya Admin atau Kordas yang dapat menghapus pengguna.');
  }

  try {
    // Audit log before deleting, so we can retrieve current admin user data from store
    const currentUser = useStore.getState().user;
    if (currentUser) {
      const { monitoringService } = await import('./monitoringService');
      await monitoringService.addAuditLog(
        currentUser.nim,
        currentUser.nama,
        'user_deleted',
        `Menghapus akun mahasiswa NIM: ${nim}`
      );
    }

    const { error } = await supabase
      .from('users')
      .delete()
      .eq('nim', nim);

    if (error) throw error;

    // Reset aggregation progress

    console.log(`✅ User ${nim} deleted successfully in Supabase.`);
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw error;
  }
};
