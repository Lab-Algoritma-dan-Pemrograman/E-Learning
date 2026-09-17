import { supabase } from '../lib/supabase';
import { UserProfile } from '../store/useStore';

export const getLeaderboard = async (limitCount: number = 10, kelas?: string, jurusan?: string): Promise<UserProfile[]> => {
  try {
    let query = supabase
      .from('users')
      .select('nim, nama, kelas, jurusan, xp, level, streak')
      .eq('role', 'praktikan');

    if (kelas) {
      query = query.eq('kelas', kelas);
    }
    if (jurusan) {
      query = query.eq('jurusan', jurusan);
    }

    query = query.order('xp', { ascending: false });

    if (limitCount > 0) {
      query = query.limit(limitCount);
    }

    const { data, error } = await query;

    if (error) throw error;

    return (data || []).map(u => ({
      nim: u.nim,
      nama: u.nama,
      kelas: u.kelas,
      jurusan: u.jurusan,
      email: null,
      xp: u.xp || 0,
      level: u.level || 1,
      streak: u.streak || 0,
      lastActive: '',
      createdAt: '',
      role: 'praktikan',
      assessmentAccess: {}
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
      .select('nim', { count: 'exact', head: true })
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

export const getLeaderboardFilters = async (): Promise<{ kelas: string[]; jurusan: string[] }> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('kelas, jurusan')
      .eq('role', 'praktikan');

    if (error) throw error;

    const kelas = [...new Set((data || []).map(u => u.kelas).filter(Boolean))].sort() as string[];
    const jurusan = [...new Set((data || []).map(u => u.jurusan).filter(Boolean))].sort() as string[];
    return { kelas, jurusan };
  } catch (error) {
    console.error('Error fetching leaderboard filters:', error);
    return { kelas: [], jurusan: [] };
  }
};
