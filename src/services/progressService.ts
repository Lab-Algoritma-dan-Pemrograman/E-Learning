import { doc, setDoc, updateDoc, increment, collection, onSnapshot, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { UserProfile } from '../store/useStore';
import { LessonProgress } from '../store/useProgress';
import { reportProgressToSupabase, getLevelInfoForLesson, resetSupabaseProgress, resetSupabaseLevelProgress } from './centralApiService';
import { Level } from '../data/curriculum';

export const completeLesson = async (
  user: UserProfile,
  lessonId: string,
  xpReward: number,
  curriculum: Level[] = [],
  completedLessons: string[] = []
) => {
  // ===== FIX: Skip XP increment if lesson already completed =====
  if (completedLessons.includes(lessonId)) {
    console.log(`⏭️ Lesson "${lessonId}" already completed. Skipping XP reward.`);
    return;
  }

  const userRef = doc(db, 'users', user.nim);
  const progressRef = doc(db, 'users', user.nim, 'progress', lessonId);

  try {
    // Update user XP and streak
    const today = new Date().toDateString();
    const lastActive = new Date(user.lastActive).toDateString();
    
    let streakUpdate = user.streak;
    if (today !== lastActive) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const isYesterday = yesterday.toDateString() === lastActive;
      streakUpdate = isYesterday ? user.streak + 1 : 1;
    }

    try {
      await updateDoc(userRef, {
        xp: increment(xpReward),
        streak: streakUpdate,
        lastActive: new Date().toISOString(),
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `users/${user.nim}`);
      return;
    }

    // Save lesson progress to Firestore
    const progress: LessonProgress = {
      userId: user.nim,
      lessonId,
      completed: true,
      completedAt: new Date().toISOString(),
    };
    await setDoc(progressRef, progress);

    // Report to Supabase central database
    if (curriculum.length > 0) {
      const levelInfo = getLevelInfoForLesson(lessonId, curriculum, completedLessons);

      if (levelInfo) {
        // Report level progress
        await reportProgressToSupabase({
          nim: user.nim,
          levelId: levelInfo.levelId,
          levelTitle: levelInfo.levelTitle,
          lessonsCompleted: levelInfo.lessonsCompleted,
          totalLessons: levelInfo.totalLessons,
          isCompleted: levelInfo.isCompleted,
        });

        if (levelInfo.isCompleted) {
          console.log(`🎉 Level "${levelInfo.levelTitle}" completed by ${user.nim}!`);
        }
      }
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${user.nim}/progress/${lessonId}`);
  }
};

export const syncProgress = (userId: string, setCompletedLessons: (lessons: string[]) => void) => {
  const progressRef = collection(db, 'users', userId, 'progress');
  const q = query(progressRef, where('completed', '==', true));

  return onSnapshot(q, (snapshot) => {
    const lessons = snapshot.docs.map(doc => doc.data().lessonId);
    setCompletedLessons(lessons);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, `users/${userId}/progress`);
  });
};

// ===== ADMIN FUNCTIONS =====

/**
 * Reset ALL progress for a user: delete all progress docs, set XP to 0, level to 1.
 * Also syncs to Supabase.
 */
export const resetUserProgress = async (nim: string): Promise<void> => {
  try {
    // Delete all progress documents
    const progressRef = collection(db, 'users', nim, 'progress');
    const snapshot = await getDocs(progressRef);
    const deletePromises = snapshot.docs.map(d => deleteDoc(d.ref));
    await Promise.all(deletePromises);

    // Reset user XP and level
    const userRef = doc(db, 'users', nim);
    await updateDoc(userRef, {
      xp: 0,
      level: 1,
      streak: 0,
    });

    // Sync to Supabase
    await resetSupabaseProgress(nim);

    console.log(`✅ All progress reset for ${nim}`);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${nim}/progress`);
    throw error;
  }
};

/**
 * Reset progress for a specific level only.
 * Deletes progress docs for lessons in that level and reduces XP accordingly.
 */
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

    // Check which of these lessons the user has actually completed
    const progressRef = collection(db, 'users', nim, 'progress');
    const snapshot = await getDocs(progressRef);
    let deletedCount = 0;

    const deletePromises = snapshot.docs
      .filter(d => lessonIds.includes(d.data().lessonId))
      .map(d => {
        deletedCount++;
        return deleteDoc(d.ref);
      });
    await Promise.all(deletePromises);

    // Reduce XP: 50 per deleted lesson
    if (deletedCount > 0) {
      const userRef = doc(db, 'users', nim);
      await updateDoc(userRef, {
        xp: increment(-(deletedCount * 50)),
      });
    }

    // Sync to Supabase
    await resetSupabaseLevelProgress(nim, levelId);

    console.log(`✅ Level "${levelId}" progress reset for ${nim} (${deletedCount} lessons removed, -${deletedCount * 50} XP)`);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${nim}/progress`);
    throw error;
  }
};

/**
 * Adjust a user's XP to a specific value. Validates >= 0.
 */
export const adjustUserXp = async (nim: string, newXp: number): Promise<void> => {
  try {
    const safeXp = Math.max(0, Math.round(newXp));
    const userRef = doc(db, 'users', nim);
    await updateDoc(userRef, {
      xp: safeXp,
    });
    console.log(`✅ XP set to ${safeXp} for ${nim}`);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${nim}`);
    throw error;
  }
};
