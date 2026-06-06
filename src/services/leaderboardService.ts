import { supabase } from '../lib/supabase';
import { UserProfile } from '../store/useStore';

export const getLeaderboard = async (limitCount: number = 10): Promise<UserProfile[]> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('xp', { ascending: false })
      .limit(limitCount);

    if (error) throw error;

    return (data || []).map(u => ({
      nim: u.nim,
      nama: u.nama,
      kelas: u.kelas,
      email: u.email,
      xp: u.xp || 0,
      level: u.level || 1,
      streak: u.streak || 0,
      lastActive: u.last_active || '',
      createdAt: u.created_at || '',
      role: u.role || 'user',
      assessmentAccess: u.assessment_access
    })) as UserProfile[];
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
};

export const getUserRank = async (xp: number): Promise<number | null> => {
  if (xp === 0) return null;
  
  try {
    const { count, error } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .gt('xp', xp);

    if (error) throw error;
    return (count || 0) + 1;
  } catch (error) {
    console.error('Error counting user rank:', error);
    return null;
  }
};
