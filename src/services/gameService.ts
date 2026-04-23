import { collection, query, where, getDocs, addDoc, doc, updateDoc, increment, serverTimestamp, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
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

export const saveGameHistory = async (
  userId: string,
  history: {
    gameType: string;
    score: number;
    totalQuestions: number;
    xpEarned: number;
    playedAt: string;
  }
): Promise<void> => {
  if (!userId) return;

  try {
    // 1. Record in game_history
    const historyRef = collection(db, 'users', userId, 'game_history');
    await addDoc(historyRef, {
      ...history,
      serverTimestamp: new Date()
    });

    // 2. Update User XP
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      xp: increment(history.xpEarned),
      lastActive: new Date().toISOString()
    });

    console.log(`✅ Game result saved: +${history.xpEarned} XP for ${userId}`);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${userId}/game_history`);
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

export const forceResetGameQuestions = async (questions: any[]): Promise<void> => {
  try {
    const questionsRef = collection(db, 'game_questions');
    const snapshot = await getDocs(questionsRef);
    
    // Delete all existing documents
    const deletePromises = snapshot.docs.map(docSnap => deleteDoc(doc(db, 'game_questions', docSnap.id)));
    await Promise.all(deletePromises);
    
    // Insert new JSON data mapping
    const insertPromises = questions.map(q => addDoc(questionsRef, q));
    await Promise.all(insertPromises);
    
    console.log(`✅ Reset total ${questions.length} questions successfully`);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'game_questions');
    throw error;
  }
};

// ===== NEW: Question Management =====

export const addGameQuestion = async (question: Omit<GameQuestion, 'id'>): Promise<string> => {
  const ref = await addDoc(collection(db, 'game_questions'), question);
  return ref.id;
};

export const updateGameQuestion = async (id: string, question: Partial<GameQuestion>): Promise<void> => {
  await updateDoc(doc(db, 'game_questions', id), question);
};

export const deleteGameQuestion = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'game_questions', id));
};

// ===== NEW: App Settings =====

export interface GameSettings {
  bugHuntActive: boolean; // Global toggle
  bugHuntCActive: boolean;
  bugHuntPythonActive: boolean;
  bugHuntWeeklyLimit: number; // 0 for unlimited
}

export const getGameSettings = async (): Promise<GameSettings> => {
  try {
    const docRef = doc(db, 'app_settings', 'games');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as GameSettings;
    }
    // Return default if not exists
    return { 
      bugHuntActive: true,
      bugHuntCActive: true, 
      bugHuntPythonActive: true,
      bugHuntWeeklyLimit: 3 // Default 3 times/week
    };
  } catch (error) {
    console.error('Error fetching game settings:', error);
    return { 
      bugHuntActive: true,
      bugHuntCActive: true, 
      bugHuntPythonActive: true,
      bugHuntWeeklyLimit: 3
    };
  }
};

export const updateGameSettings = async (settings: Partial<GameSettings>): Promise<void> => {
  const docRef = doc(db, 'app_settings', 'games');
  await setDoc(docRef, settings, { merge: true });
};

export const getPlaysThisWeek = async (userId: string): Promise<number> => {
  if (!userId) return 0;
  
  try {
    const now = new Date();
    // Get start of current week (Monday)
    const startOfWeek = new Date(now);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);

    const historyRef = collection(db, 'users', userId, 'game_history');
    const q = query(
      historyRef,
      where('serverTimestamp', '>=', startOfWeek),
      where('gameType', '==', 'bug_hunt')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.size;
  } catch (error) {
    console.error('Error counting weekly plays:', error);
    return 0;
  }
};
