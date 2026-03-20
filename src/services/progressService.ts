import { doc, setDoc, updateDoc, increment, collection, onSnapshot, query, where } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { UserProfile } from '../store/useStore';
import { LessonProgress } from '../store/useProgress';

export const completeLesson = async (user: UserProfile, lessonId: string, xpReward: number) => {
  const userRef = doc(db, 'users', user.uid);
  const progressRef = doc(db, 'users', user.uid, 'progress', lessonId);

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
      handleFirestoreError(e, OperationType.WRITE, `users/${user.uid}`);
      return;
    }

    // Save lesson progress
    const progress: LessonProgress = {
      userId: user.uid,
      lessonId,
      completed: true,
      completedAt: new Date().toISOString(),
    };
    await setDoc(progressRef, progress);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}/progress/${lessonId}`);
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
