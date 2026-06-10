import { supabase } from '../lib/supabase';
import { useStore } from '../store/useStore';

export interface GameQuestion {
  id: string;
  language: 'c' | 'python';
  difficulty: 'easy' | 'medium' | 'hard';
  title: string;
  code: string;
  bugLine: number;
  explanation: string;
}

export interface GameSettings {
  bugHuntActive: boolean;
  bugHuntCActive: boolean;
  bugHuntPythonActive: boolean;
  bugHuntWeeklyLimit: number;
  bugHuntQuestionCount: number;
}

export const getGameQuestions = async (language: 'c' | 'python', limit: number = 5): Promise<GameQuestion[]> => {
  try {
    const { data, error } = await supabase
      .from('game_questions')
      .select('*')
      .eq('language', language);
    
    if (error) throw error;
    
    const allQuestions = (data || []).map(q => ({
      id: q.id,
      language: q.language,
      difficulty: q.difficulty,
      title: q.title,
      code: q.code,
      bugLine: q.bug_line,
      explanation: q.explanation
    })) as unknown as GameQuestion[];
    
    // Random shuffle and slice
    return allQuestions
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching game questions:', error);
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
    // Enforce weekly limit
    if (history.gameType === 'bug_hunt') {
      const settings = await getGameSettings();
      if (settings.bugHuntWeeklyLimit > 0) {
        const currentPlays = await getPlaysThisWeek(userId);
        if (currentPlays >= settings.bugHuntWeeklyLimit) {
          throw new Error('WEEKLY_LIMIT_REACHED');
        }
      }
    }

    const now = new Date().toISOString();

    // 1. Record in game_history
    const { error: historyErr } = await supabase
      .from('game_history')
      .insert([{
        nim: userId,
        game_type: history.gameType,
        xp_earned: history.xpEarned,
        played_at: now
      }]);

    if (historyErr) throw historyErr;

    // 2. Fetch current user XP and increment it
    const { data: userProfile } = await supabase
      .from('users')
      .select('xp')
      .eq('nim', userId)
      .single();

    if (userProfile) {
      const newXp = userProfile.xp + history.xpEarned;
      const { error: userErr } = await supabase
        .from('users')
        .update({
          xp: newXp,
          last_active: now
        })
        .eq('nim', userId);

      if (userErr) throw userErr;

      // Optimistically update the local store so XP displays immediately in the header
      const currentUser = useStore.getState().user;
      if (currentUser && currentUser.nim === userId) {
        useStore.getState().setUser({ ...currentUser, xp: newXp, lastActive: now });
      }
    }

    console.log(`✅ Game result saved: +${history.xpEarned} XP for ${userId}`);
  } catch (error) {
    if (error instanceof Error && error.message === 'WEEKLY_LIMIT_REACHED') {
      throw error;
    }
    console.error('Error saving game history:', error);
    throw error;
  }
};

export const seedInitialQuestions = async (questions: any[]): Promise<void> => {
  try {
    const { count, error } = await supabase
      .from('game_questions')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;

    // Only seed if empty
    if (count === 0) {
      const formatted = questions.map(q => ({
        language: q.language,
        difficulty: q.difficulty,
        title: q.title,
        code: q.code,
        bug_line: q.bugLine,
        explanation: q.explanation
      }));

      const { error: seedErr } = await supabase
        .from('game_questions')
        .insert(formatted);

      if (seedErr) throw seedErr;
      console.log('✅ Initial game questions seeded successfully');
    } else {
      console.log('ℹ️ Game questions already exist, skipping seed');
    }
  } catch (error) {
    console.error('Error seeding game questions:', error);
  }
};

export const forceResetGameQuestions = async (questions: any[]): Promise<void> => {
  try {
    // Delete all existing
    const { data: allData } = await supabase.from('game_questions').select('id');
    if (allData && allData.length > 0) {
      const ids = allData.map(d => d.id);
      await supabase.from('game_questions').delete().in('id', ids);
    }

    // Insert new
    const formatted = questions.map(q => ({
      language: q.language,
      difficulty: q.difficulty,
      title: q.title,
      code: q.code,
      bug_line: q.bugLine,
      explanation: q.explanation
    }));

    const { error: insertErr } = await supabase
      .from('game_questions')
      .insert(formatted);

    if (insertErr) throw insertErr;
    console.log(`✅ Reset total ${questions.length} game questions successfully`);
  } catch (error) {
    console.error('Error force resetting game questions:', error);
    throw error;
  }
};

export const addGameQuestion = async (question: Omit<GameQuestion, 'id'>): Promise<string> => {
  const { data, error } = await supabase
    .from('game_questions')
    .insert([{
      language: question.language,
      difficulty: question.difficulty,
      title: question.title,
      code: question.code,
      bug_line: question.bugLine,
      explanation: question.explanation
    }])
    .select()
    .single();

  if (error) throw error;
  return data.id;
};

export const updateGameQuestion = async (id: string, question: Partial<GameQuestion>): Promise<void> => {
  const formatted: any = {};
  if (question.language) formatted.language = question.language;
  if (question.difficulty) formatted.difficulty = question.difficulty;
  if (question.title) formatted.title = question.title;
  if (question.code) formatted.code = question.code;
  if (question.bugLine !== undefined) formatted.bug_line = question.bugLine;
  if (question.explanation) formatted.explanation = question.explanation;

  const { error } = await supabase
    .from('game_questions')
    .update(formatted)
    .eq('id', id);

  if (error) throw error;
};

export const deleteGameQuestion = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('game_questions')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const getGameSettings = async (): Promise<GameSettings> => {
  try {
    const { data, error } = await supabase
      .from('game_settings')
      .select('*')
      .eq('id', 'default')
      .single();
    
    if (error || !data) {
      // Return default if not found
      return { 
        bugHuntActive: true,
        bugHuntCActive: true, 
        bugHuntPythonActive: true,
        bugHuntWeeklyLimit: 3,
        bugHuntQuestionCount: 5
      };
    }
    
    return {
      bugHuntActive: data.bug_hunt_active,
      bugHuntCActive: data.bug_hunt_c_active,
      bugHuntPythonActive: data.bug_hunt_python_active,
      bugHuntWeeklyLimit: data.bug_hunt_weekly_limit,
      bugHuntQuestionCount: 5 // standard default
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
  const formatted: any = {};
  if (settings.bugHuntActive !== undefined) formatted.bug_hunt_active = settings.bugHuntActive;
  if (settings.bugHuntCActive !== undefined) formatted.bug_hunt_c_active = settings.bugHuntCActive;
  if (settings.bugHuntPythonActive !== undefined) formatted.bug_hunt_python_active = settings.bugHuntPythonActive;
  if (settings.bugHuntWeeklyLimit !== undefined) formatted.bug_hunt_weekly_limit = settings.bugHuntWeeklyLimit;

  const { error } = await supabase
    .from('game_settings')
    .upsert({ id: 'default', ...formatted });

  if (error) throw error;
};

export const getPlaysThisWeek = async (userId: string): Promise<number> => {
  if (!userId) return 0;
  
  try {
    const now = new Date();
    const startOfWeek = new Date(now);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfWeekIso = startOfWeek.toISOString();

    const { count, error } = await supabase
      .from('game_history')
      .select('*', { count: 'exact', head: true })
      .eq('nim', userId)
      .eq('game_type', 'bug_hunt')
      .gte('played_at', startOfWeekIso);

    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('Error counting weekly plays:', error);
    return 0;
  }
};

export const canPlayBugHunt = async (userId: string): Promise<{ allowed: boolean; playsUsed: number; limit: number }> => {
  const settings = await getGameSettings();
  
  if (!settings.bugHuntActive) {
    return { allowed: false, playsUsed: 0, limit: 0 };
  }
  
  if (settings.bugHuntWeeklyLimit <= 0) {
    return { allowed: true, playsUsed: 0, limit: 0 };
  }
  
  const playsUsed = await getPlaysThisWeek(userId);
  return {
    allowed: playsUsed < settings.bugHuntWeeklyLimit,
    playsUsed,
    limit: settings.bugHuntWeeklyLimit
  };
};
