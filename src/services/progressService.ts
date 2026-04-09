import { doc, setDoc, updateDoc, increment, collection, onSnapshot, query, where } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { UserProfile } from '../store/useStore';
import { LessonProgress } from '../store/useProgress';
import { reportProgressToSupabase, logLessonCompletion, getLevelInfoForLesson } from './centralApiService';
import { Level } from '../data/curriculum';

export const completeLesson = async (
  user: UserProfile,
  lessonId: string,
  xpReward: number,
  curriculum: Level[] = [],
  completedLessons: string[] = []
) => {
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

        // Log individual lesson completion
        await logLessonCompletion({
          nim: user.nim,
          levelId: levelInfo.levelId,
          lessonId,
          lessonTitle: levelInfo.lessonTitle,
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

