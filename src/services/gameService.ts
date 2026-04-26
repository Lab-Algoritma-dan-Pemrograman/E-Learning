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
    // Enforce weekly limit before saving
    if (history.gameType === 'bug_hunt') {
      const settings = await getGameSettings();
      if (settings.bugHuntWeeklyLimit > 0) {
        const currentPlays = await getPlaysThisWeek(userId);
        if (currentPlays >= settings.bugHuntWeeklyLimit) {
          console.warn(`⚠️ Weekly limit reached for ${userId}. Result NOT saved.`);
          throw new Error('WEEKLY_LIMIT_REACHED');
        }
      }
    }

    // 1. Record in game_history with ISO string timestamp for consistent filtering
    const now = new Date().toISOString();
    const historyRef = collection(db, 'users', userId, 'game_history');
    await addDoc(historyRef, {
      ...history,
      savedAt: now
    });

    // 2. Update User XP
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      xp: increment(history.xpEarned),
      lastActive: now
    });

    console.log(`✅ Game result saved: +${history.xpEarned} XP for ${userId}`);
  } catch (error) {
    if (error instanceof Error && error.message === 'WEEKLY_LIMIT_REACHED') {
      throw error; // Re-throw limit error without wrapping
    }
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
  bugHuntActive: boolean;
  bugHuntCActive: boolean;
  bugHuntPythonActive: boolean;
  bugHuntWeeklyLimit: number;
  bugHuntQuestionCount: number;
}

export const getGameSettings = async (): Promise<GameSettings> => {
  try {
    const docRef = doc(db, 'app_settings', 'games');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        bugHuntActive: data.bugHuntActive ?? true,
        bugHuntCActive: data.bugHuntCActive ?? true,
        bugHuntPythonActive: data.bugHuntPythonActive ?? true,
        bugHuntWeeklyLimit: data.bugHuntWeeklyLimit ?? 3,
        bugHuntQuestionCount: data.bugHuntQuestionCount ?? 5
      };
    }
    
    // Return default if not exists
    return { 
      bugHuntActive: true,
      bugHuntCActive: true, 
      bugHuntPythonActive: true,
      bugHuntWeeklyLimit: 3,
      bugHuntQuestionCount: 5
    };
  } catch (error) {
    console.error('Error fetching game settings:', error);
    return { 
      bugHuntActive: true,
      bugHuntCActive: true, 
      bugHuntPythonActive: true,
      bugHuntWeeklyLimit: 3,
      bugHuntQuestionCount: 5
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
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);

    const historyRef = collection(db, 'users', userId, 'game_history');
    // Fetch all bug_hunt plays for this user and filter in memory to avoid composite index requirement
    const q = query(
      historyRef,
      where('gameType', '==', 'bug_hunt')
    );
    
    const snapshot = await getDocs(q);
    const weeklyPlays = snapshot.docs.filter(doc => {
      const data = doc.data();
      // Check multiple possible timestamp fields for backwards compatibility
      const ts = data.savedAt || data.serverTimestamp || data.playedAt;
      if (!ts) return false;
      
      // Handle Firestore Timestamp, Date object, or ISO string
      let date: Date;
      if (ts.toDate) {
        date = ts.toDate(); // Firestore Timestamp
      } else if (ts instanceof Date) {
        date = ts;
      } else {
        date = new Date(ts); // ISO string
      }
      
      // Validate that the date is valid
      if (isNaN(date.getTime())) return false;
      
      return date >= startOfWeek;
    });
    
    console.log(`📊 Weekly plays for ${userId}: ${weeklyPlays.length} (checked ${snapshot.docs.length} total records)`);
    return weeklyPlays.length;
  } catch (error) {
    console.error('Error counting weekly plays:', error);
    return 0;
  }
};

/**
 * Pre-check if a user can play Bug Hunt right now.
 * This does a fresh Firestore read to avoid stale state issues.
 */
export const canPlayBugHunt = async (userId: string): Promise<{ allowed: boolean; playsUsed: number; limit: number }> => {
  const settings = await getGameSettings();
  
  if (!settings.bugHuntActive) {
    return { allowed: false, playsUsed: 0, limit: 0 };
  }
  
  if (settings.bugHuntWeeklyLimit <= 0) {
    // Unlimited
    return { allowed: true, playsUsed: 0, limit: 0 };
  }
  
  const playsUsed = await getPlaysThisWeek(userId);
  return {
    allowed: playsUsed < settings.bugHuntWeeklyLimit,
    playsUsed,
    limit: settings.bugHuntWeeklyLimit
  };
};
