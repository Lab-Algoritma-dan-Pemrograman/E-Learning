import { supabase } from '../lib/supabase';
import { UserProfile, useStore } from '../store/useStore';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirementType: 'xp' | 'game_score' | 'lesson_count' | 'streak' | 'level_completed';
  requirementValue: number | string;
}

export const checkAndUnlockAchievements = async (
  user: UserProfile,
  stats: { xp?: number; gamesPlayed?: number; perfectGames?: number; completedLevelIds?: string[] }
): Promise<Achievement[]> => {
  if (!user.nim) return [];
  
  try {
    // 1. Get all available achievements from Supabase
    const { data: allAchievements, error: achError } = await supabase
      .from('achievements')
      .select('*');

    if (achError || !allAchievements) throw achError;

    // Map database snake_case fields to camelCase
    const formattedAchievements = allAchievements.map(ach => ({
      id: ach.id,
      title: ach.title,
      description: ach.description,
      icon: ach.icon,
      requirementType: ach.requirement_type as any,
      requirementValue: isNaN(Number(ach.requirement_value)) ? ach.requirement_value : Number(ach.requirement_value)
    })) as Achievement[];
    
    // 2. Get user's unlocked achievements from Supabase
    const { data: unlockedData, error: unlockError } = await supabase
      .from('unlocked_achievements')
      .select('achievement_id')
      .eq('nim', user.nim);

    if (unlockError) throw unlockError;
    const unlockedIds = new Set((unlockedData || []).map(d => d.achievement_id));
    
    const newlyUnlocked: Achievement[] = [];
    
    for (const ach of formattedAchievements) {
      if (unlockedIds.has(ach.id)) continue;
      
      let met = false;
      const currentXp = stats.xp !== undefined ? stats.xp : (user.xp || 0);
      const currentStreak = user.streak || 0;

      if (ach.requirementType === 'xp' && currentXp >= (ach.requirementValue as number)) met = true;
      if (ach.requirementType === 'streak' && currentStreak >= (ach.requirementValue as number)) met = true;
      if (ach.requirementType === 'level_completed' && stats.completedLevelIds?.includes(ach.requirementValue as string)) met = true;
      if (ach.requirementType === 'game_score' && (stats.perfectGames || 0) >= (ach.requirementValue as number)) met = true;
      
      if (met) {
        const { error: insertErr } = await supabase
          .from('unlocked_achievements')
          .insert([{
            nim: user.nim,
            achievement_id: ach.id,
            unlocked_at: new Date().toISOString()
          }]);

        if (!insertErr) {
          newlyUnlocked.push(ach);
        } else {
          console.error(`Failed to unlock achievement ${ach.id}:`, insertErr);
        }
      }
    }
    
    return newlyUnlocked;
  } catch (error) {
    console.error('Error checking achievements:', error);
    return [];
  }
};

export const getAchievements = async (): Promise<Achievement[]> => {
  try {
    const { data, error } = await supabase
      .from('achievements')
      .select('*');

    if (error) throw error;
    
    return (data || []).map(ach => ({
      id: ach.id,
      title: ach.title,
      description: ach.description,
      icon: ach.icon,
      requirementType: ach.requirement_type as any,
      requirementValue: isNaN(Number(ach.requirement_value)) ? ach.requirement_value : Number(ach.requirement_value)
    }));
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }
};

/**
 * Check XP-based achievements only (lightweight, for use after grantXp or Bug Hunt).
 * Returns the first newly unlocked XP achievement (for popup display).
 */
export const checkXpAchievements = async (nim: string, currentXp: number): Promise<Achievement | null> => {
  try {
    // 1. Get all XP-type achievements
    const { data: xpAchievements, error: achErr } = await supabase
      .from('achievements')
      .select('*')
      .eq('requirement_type', 'xp');

    if (achErr || !xpAchievements) return null;

    const formatted = xpAchievements.map(ach => ({
      id: ach.id,
      title: ach.title,
      description: ach.description,
      icon: ach.icon,
      requirementType: 'xp' as const,
      requirementValue: Number(ach.requirement_value)
    }));

    // 2. Get already unlocked
    const { data: unlockedData, error: unlockErr } = await supabase
      .from('unlocked_achievements')
      .select('achievement_id')
      .eq('nim', nim);

    if (unlockErr) return null;
    const unlockedIds = new Set((unlockedData || []).map(d => d.achievement_id));

    // 3. Find first newly met XP achievement (sorted by threshold ascending)
    const sorted = formatted.sort((a, b) => (a.requirementValue as number) - (b.requirementValue as number));
    
    for (const ach of sorted) {
      if (unlockedIds.has(ach.id)) continue;
      if (currentXp >= (ach.requirementValue as number)) {
        const { error: insertErr } = await supabase
          .from('unlocked_achievements')
          .insert([{ nim, achievement_id: ach.id, unlocked_at: new Date().toISOString() }]);
        
        if (!insertErr) return ach;
      }
    }

    return null;
  } catch (error) {
    console.error('Error checking XP achievements:', error);
    return null;
  }
};
