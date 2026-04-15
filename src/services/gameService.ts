import { collection, query, where, getDocs, addDoc, doc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { UserProfile } from '../store/useStore';

export interface GameQuestion {
  id: string;
  language: 'c' | 'python';
  difficulty: 'easy' | 'medium' | 'hard';
  title: string;
  code: string;
  bugLine: number;
  explanation: string;
}

export interface GameResult {
  userId: string;
  gameType: 'bug_hunt';
  language: 'c' | 'python';
  score: number;
  xpEarned: number;
  playedAt: string;
}

export const getGameQuestions = async (language: 'c' | 'python', limit: number = 5): Promise<GameQuestion[]> => {
  try {
    const q = query(
      collection(db, 'game_questions'),
      where('language', '==', language)
    );
    
    const snapshot = await getDocs(q);
    const allQuestions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as GameQuestion[];
    
    // Simple random shuffle for variety
    return allQuestions
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'game_questions');
    return [];
  }
};

export const saveGameResult = async (
  user: UserProfile,
  language: 'c' | 'python',
  score: number,
  xpEarned: number
): Promise<void> => {
  if (!user.nim) return;

  try {
    const gameResult: Omit<GameResult, 'id'> = {
      userId: user.nim,
      gameType: 'bug_hunt',
      language,
      score,
      xpEarned,
      playedAt: new Date().toISOString()
    };

    // 1. Record in game_history
    const historyRef = collection(db, 'users', user.nim, 'game_history');
    await addDoc(historyRef, {
      ...gameResult,
      serverTimestamp: serverTimestamp()
    });

    // 2. Update User XP
    const userRef = doc(db, 'users', user.nim);
    await updateDoc(userRef, {
      xp: increment(xpEarned),
      lastActive: new Date().toISOString()
    });

    console.log(`✅ Game result saved: +${xpEarned} XP for ${user.nim}`);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${user.nim}/game_history`);
    throw error;
  }
};

/**
 * Seed questions from local JSON to Firestore.
 * Use this only once or in admin dashboard.
 */
export const seedInitialQuestions = async (questions: any[]): Promise<void> => {
  try {
    const questionsRef = collection(db, 'game_questions');
    const snapshot = await getDocs(questionsRef);
    
    // Only seed if empty to avoid duplicates during dev
    if (snapshot.empty) {
      const promises = questions.map(q => addDoc(questionsRef, q));
      await Promise.all(promises);
      console.log('✅ Initial questions seeded successfully');
    } else {
      console.log('ℹ️ Questions already exist, skipping seed');
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'game_questions');
  }
};
