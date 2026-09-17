import { supabase } from '../lib/supabase';
import { UserProfile, useStore } from '../store/useStore';
import { checkAndUnlockAchievements } from './achievementService';

export interface StreakResult {
  newStreak: number;
  isChanged: boolean;
  diffDays: number;
}

/**
 * Calculates updated streak based on previous lastActive timestamp and current streak.
 * 
 * Rules:
 * - diffDays === 0 (Same calendar day): Already active today, streak remains >= 1.
 * - diffDays === 1 (Yesterday): Consecutive day! Streak increments by 1.
 * - diffDays > 1 (Missed >= 1 day) or !lastActiveStr: Streak resets to 1 (starts today).
 * - diffDays < 0 (Clock skew): Keeps existing streak (>= 1).
 */
export function calculateStreak(
  lastActiveStr: string | null | undefined,
  currentStreak: number = 0,
  now: Date = new Date()
): StreakResult {
  const safeCurrentStreak = Math.max(0, currentStreak || 0);

  if (!lastActiveStr) {
    return {
      newStreak: 1,
      isChanged: safeCurrentStreak !== 1,
      diffDays: Infinity
    };
  }

  const lastActiveDate = new Date(lastActiveStr);
  if (isNaN(lastActiveDate.getTime())) {
    return {
      newStreak: 1,
      isChanged: safeCurrentStreak !== 1,
      diffDays: Infinity
    };
  }

  // Normalize to local calendar midnight for accurate day comparison
  const currentMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const lastMidnight = new Date(
    lastActiveDate.getFullYear(),
    lastActiveDate.getMonth(),
    lastActiveDate.getDate()
  ).getTime();

  const diffMs = currentMidnight - lastMidnight;
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  let newStreak = safeCurrentStreak;

  if (diffDays === 0) {
    // Same day - keep current streak, ensure minimum 1 if active today
    newStreak = Math.max(safeCurrentStreak, 1);
  } else if (diffDays === 1) {
    // Yesterday - consecutive day!
    newStreak = safeCurrentStreak + 1;
  } else if (diffDays > 1) {
    // Missed at least 1 calendar day - reset to 1
    newStreak = 1;
  } else {
    // Future timestamp / clock skew
    newStreak = Math.max(safeCurrentStreak, 1);
  }

  return {
    newStreak,
    isChanged: newStreak !== safeCurrentStreak,
    diffDays
  };
}

/**
 * Checks and synchronizes the user's streak in Supabase and local store.
 */
export async function syncUserStreak(user: UserProfile): Promise<number> {
  try {
    const { newStreak, isChanged } = calculateStreak(user.lastActive, user.streak);
    const now = new Date().toISOString();

    if (isChanged || !user.streak) {
      const { error } = await supabase
        .from('users')
        .update({
          streak: newStreak,
          last_active: now
        })
        .eq('nim', user.nim);

      if (error) {
        console.error('Failed to sync streak to Supabase:', error);
      } else {
        const updatedUser = {
          ...user,
          streak: newStreak,
          lastActive: now
        };
        useStore.getState().setUser(updatedUser);

        // Check for streak-based achievements (e.g. streak-3, streak-7)
        if (newStreak >= 3) {
          const unlocked = await checkAndUnlockAchievements(updatedUser, {});
          unlocked.forEach(ach => useStore.getState().pushAchievement(ach));
        }
      }
    }

    return newStreak;
  } catch (err) {
    console.error('Error in syncUserStreak:', err);
    return user.streak || 1;
  }
}
