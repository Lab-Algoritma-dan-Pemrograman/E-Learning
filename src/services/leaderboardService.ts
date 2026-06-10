import { supabase } from '../lib/supabase';
import { UserProfile } from '../store/useStore';

export const getLeaderboard = async (limitCount: number = 10, kelas?: string, jurusan?: string): Promise<UserProfile[]> => {
  try {
    let query = supabase
      .from('users')
      .select('*')
      .eq('role', 'praktikan');

    if (kelas) {
      query = query.eq('kelas', kelas);
    }
    if (jurusan) {
      query = query.eq('jurusan', jurusan);
    }

    const { data, error } = await query
      .order('xp', { ascending: false })
      .limit(limitCount);

    if (error) throw error;

    return (data || []).map(u => ({
      nim: u.nim,
      nama: u.nama,
      kelas: u.kelas,
      jurusan: u.jurusan,
      email: u.email,
      xp: u.xp || 0,
      level: u.level || 1,
      streak: u.streak || 0,
      lastActive: u.last_active || '',
      createdAt: u.created_at || '',
      role: u.role || 'praktikan',
      assessmentAccess: u.assessment_access
    })) as UserProfile[];
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
};

export const getUserRank = async (xp: number, kelas?: string, jurusan?: string): Promise<number | null> => {
  if (xp === 0) return null;
  
  try {
    let query = supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'praktikan')
      .gt('xp', xp);

    if (kelas) {
      query = query.eq('kelas', kelas);
    }
    if (jurusan) {
      query = query.eq('jurusan', jurusan);
    }

    const { count, error } = await query;

    if (error) throw error;
    return (count || 0) + 1;
  } catch (error) {
    console.error('Error counting user rank:', error);
    return null;
  }
};
