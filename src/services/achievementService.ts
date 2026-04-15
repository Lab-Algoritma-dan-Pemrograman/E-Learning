import { collection, doc, setDoc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { UserProfile } from '../store/useStore';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirementType: 'xp' | 'game_score' | 'lesson_count' | 'streak' | 'level_completed';
  requirementValue: number | string;
}

export const checkAndUnlockAchievements = async (user: UserProfile, stats: { xp?: number; gamesPlayed?: number; perfectGames?: number; completedLevelIds?: string[] }): Promise<Achievement[]> => {
  if (!user.nim) return [];
  
  try {
    // 1. Get all available achievements
    const achSnapshot = await getDocs(collection(db, 'achievements'));
    const allAchievements = achSnapshot.docs.map(d => ({ id: d.id, ...d.data() })) as Achievement[];
    
    // 2. Get user's unlocked achievements
    const unlockedSnapshot = await getDocs(collection(db, 'users', user.nim, 'unlocked_achievements'));
    const unlockedIds = new Set(unlockedSnapshot.docs.map(d => d.id));
    
    const newlyUnlocked: Achievement[] = [];
    
    for (const ach of allAchievements) {
      if (unlockedIds.has(ach.id)) continue;
      
      let met = false;
      if (ach.requirementType === 'xp' && (stats.xp || user.xp) >= (ach.requirementValue as number)) met = true;
      if (ach.requirementType === 'streak' && user.streak >= (ach.requirementValue as number)) met = true;
      if (ach.requirementType === 'level_completed' && stats.completedLevelIds?.includes(ach.requirementValue as string)) met = true;
      if (ach.requirementType === 'game_score' && (stats.perfectGames || 0) >= (ach.requirementValue as number)) met = true;
      
      if (met) {
        await setDoc(doc(db, 'users', user.nim, 'unlocked_achievements', ach.id), {
          unlockedAt: new Date().toISOString(),
          serverTimestamp: serverTimestamp()
        });
        newlyUnlocked.push(ach);
      }
    }
    
    return newlyUnlocked;
  } catch (error) {
    console.error('Error checking achievements:', error);
    return [];
  }
};

export const getAchievements = async (): Promise<Achievement[]> => {
  const snapshot = await getDocs(collection(db, 'achievements'));
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as Achievement[];
};
