import { supabase } from '../lib/supabase';
import { UserProfile } from '../store/useStore';

// Minggu berjalan patokan Asia/Jakarta: Senin 00:00 - Minggu 23:59:59 WIB.
// WIB = UTC+7 tanpa DST. DB menyimpan UTC, jadi batas minggu dihitung
// sebagai rentang UTC: Senin 00:00 WIB = Minggu 17:00 UTC.
export interface JakartaWeek {
  weekStart: Date;      // Senin 00:00 WIB (dalam UTC)
  weekEnd: Date;        // Senin berikut 00:00 WIB (eksklusif, dalam UTC)
  weekStartLabel: string; // 'YYYY-MM-DD' tanggal Senin kalender Jakarta
  label: string;        // '13–19 Okt 2025 • WIB'
}

const MONTHS_ID = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

export const getJakartaWeek = (now: Date = new Date()): JakartaWeek => {
  // Waktu Jakarta = UTC + 7 jam
  const jakartaMs = now.getTime() + 7 * 60 * 60 * 1000;
  const jakarta = new Date(jakartaMs);
  // Hari Jakarta: 0=Minggu..6=Sabtu (pakai getUTCDay dari waktu yang digeser)
  const day = jakarta.getUTCDay();
  const daysSinceMonday = (day + 6) % 7;
  // Senin 00:00 WIB -> dalam UTC = Senin 00:00 Jakarta minus 7 jam
  const mondayJakarta00 = Date.UTC(
    jakarta.getUTCFullYear(), jakarta.getUTCMonth(), jakarta.getUTCDate() - daysSinceMonday, 0, 0, 0, 0
  );
  const weekStart = new Date(mondayJakarta00 - 7 * 60 * 60 * 1000);
  const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
  const y = jakarta.getUTCFullYear();
  const m = jakarta.getUTCMonth();
  const dMon = jakarta.getUTCDate() - daysSinceMonday;
  // Label rentang pakai kalender Jakarta (tanganin lintas bulan sederhana)
  const startDate = new Date(Date.UTC(y, m, dMon));
  const endDate = new Date(Date.UTC(y, m, dMon + 6));
  const fmt = (dt: Date) => `${dt.getUTCDate()} ${MONTHS_ID[dt.getUTCMonth()]}`;
  const sameMonth = startDate.getUTCMonth() === endDate.getUTCMonth();
  const range = sameMonth
    ? `${startDate.getUTCDate()}–${endDate.getUTCDate()} ${MONTHS_ID[startDate.getUTCMonth()]} ${startDate.getUTCFullYear()}`
    : `${fmt(startDate)} – ${fmt(endDate)} ${endDate.getUTCFullYear()}`;
  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    weekStart,
    weekEnd,
    weekStartLabel: `${y}-${pad(m + 1)}-${pad(dMon)}`,
    label: `${range} • WIB`,
  };
};

export interface WeeklyEntry extends UserProfile {
  weeklyXp: number;
  lessonXp: number;
  bughuntXp: number;
  lessonsCompleted: number;
  isCarry?: boolean; // true = 0 minggu ini, tampil bawa 50% minggu lalu (khusus 19–25 Okt 2026)
  carryXp?: number; // nilai carry yang dipakai (50% minggu lalu, floor)
}

// Bonus transisi KHUSUS minggu 19–25 Okt 2026 (weekStartLabel '2026-10-19'):
// SEMUA entry dapat bonus floor(50% XP minggu lalu 12–18 Okt) DITAMBAH
// XP minggu ini. Yang 0 minggu ini tetap tampil bawa bonusnya. Yang aktif
// minggu ini = bonus + usaha aslinya. Auto-mati minggu depan.
const CARRY_WEEK_LABEL = '2026-10-19';
const CARRY_DISCOUNT = 0.5;

// Agregasi XP minggu berjalan dari event yang SUDAH ADA (tanpa ubah skema):
// student_progress.completed_at (lesson, join xp_reward) +
// game_history.played_at + xp_earned (bug hunt).
// Base XP lesson = steril multiplier (aturan prestige tahap lanjut).
export const getWeeklyLeaderboard = async (
  limitCount: number = 10,
  kelas?: string,
  jurusan?: string,
  shift?: string | null,
  week: JakartaWeek = getJakartaWeek()
): Promise<WeeklyEntry[]> => {
  try {
    const startIso = week.weekStart.toISOString();
    const endIso = week.weekEnd.toISOString();

    // 1. Daftar kandidat (mahasiswa dalam lingkup filter)
    let userQuery = supabase
      .from('users')
      .select('nim, nama, kelas, jurusan, shift, level, streak')
      .eq('role', 'mahasiswa');
    if (kelas) userQuery = userQuery.eq('kelas', kelas);
    if (jurusan) userQuery = userQuery.eq('jurusan', jurusan);
    if (shift != null && shift !== '') userQuery = userQuery.eq('shift', shift);
    const { data: users, error: userErr } = await userQuery;
    if (userErr) throw userErr;
    if (!users || users.length === 0) return [];

    const nims = users.map(u => u.nim);
    const CHUNK = 100;
    const lessonXp = new Map<string, number>();
    const lessonCount = new Map<string, number>();
    const bughuntXp = new Map<string, number>();

    for (let i = 0; i < nims.length; i += CHUNK) {
      const chunk = nims.slice(i, i + CHUNK);
      const [{ data: prog }, { data: games }] = await Promise.all([
        supabase
          .from('student_progress')
          .select('nim, lesson_id, completed_at, lessons:lesson_id(xp_reward)')
          .in('nim', chunk)
          .eq('completed', true)
          .gte('completed_at', startIso)
          .lt('completed_at', endIso),
        supabase
          .from('game_history')
          .select('nim, xp_earned')
          .in('nim', chunk)
          .gte('played_at', startIso)
          .lt('played_at', endIso),
      ]);
      // Catatan: join lessons:lesson_id butuh FK lesson_id -> lessons.id.
      // Kalau FK belum ada, fallback 60 XP per lesson (sesuai default DB).
      for (const p of (prog || []) as any[]) {
        const reward = p.lessons?.xp_reward ?? 60;
        lessonXp.set(p.nim, (lessonXp.get(p.nim) || 0) + (reward || 0));
        lessonCount.set(p.nim, (lessonCount.get(p.nim) || 0) + 1);
      }
      for (const g of (games || []) as any[]) {
        bughuntXp.set(g.nim, (bughuntXp.get(g.nim) || 0) + (g.xp_earned || 0));
      }
    }

    const entries: WeeklyEntry[] = (users || []).map(u => {
      const lx = lessonXp.get(u.nim) || 0;
      const bx = bughuntXp.get(u.nim) || 0;
      const thisWeek = lx + bx;
      return {
        nim: u.nim,
        nama: u.nama,
        kelas: u.kelas,
        jurusan: u.jurusan,
        shift: u.shift != null ? String(u.shift) : null,
        email: null,
        xp: thisWeek,
        level: u.level || 1,
        streak: u.streak || 0,
        lastActive: '',
        createdAt: '',
        role: 'praktikan',
        assessmentAccess: {},
        weeklyXp: thisWeek,
        lessonXp: lx,
        bughuntXp: bx,
        lessonsCompleted: lessonCount.get(u.nim) || 0,
        isCarry: false,
        carryXp: 0,
      };
    });

    // Bonus transisi KHUSUS minggu 19–25 Okt: SEMUA entry dapat
    // floor(50% XP minggu lalu 12–18 Okt) + XP minggu ini. Dihitung dari
    // event mentah (bukan snapshot) biar jalan walau migrasi
    // weekly_standings belum dijalankan.
    if (week.weekStartLabel === CARRY_WEEK_LABEL) {
      const prevStart = new Date(week.weekStart.getTime() - 7 * 24 * 60 * 60 * 1000);
      const prevEnd = week.weekStart;
      const prevStartIso = prevStart.toISOString();
      const prevEndIso = prevEnd.toISOString();
      const prevLessonXp = new Map<string, number>();
      const prevBughuntXp = new Map<string, number>();
      for (let i = 0; i < nims.length; i += CHUNK) {
        const chunk = nims.slice(i, i + CHUNK);
        const [{ data: pProg }, { data: pGames }] = await Promise.all([
          supabase
            .from('student_progress')
            .select('nim, lesson_id, completed_at, lessons:lesson_id(xp_reward)')
            .in('nim', chunk)
            .eq('completed', true)
            .gte('completed_at', prevStartIso)
            .lt('completed_at', prevEndIso),
          supabase
            .from('game_history')
            .select('nim, xp_earned')
            .in('nim', chunk)
            .gte('played_at', prevStartIso)
            .lt('played_at', prevEndIso),
        ]);
        for (const p of (pProg || []) as any[]) {
          const reward = p.lessons?.xp_reward ?? 60;
          prevLessonXp.set(p.nim, (prevLessonXp.get(p.nim) || 0) + (reward || 0));
        }
        for (const g of (pGames || []) as any[]) {
          prevBughuntXp.set(g.nim, (prevBughuntXp.get(g.nim) || 0) + (g.xp_earned || 0));
        }
      }
      for (const e of entries) {
        const prevTotal = (prevLessonXp.get(e.nim) || 0) + (prevBughuntXp.get(e.nim) || 0);
        if (prevTotal > 0) {
          const bonus = Math.floor(prevTotal * CARRY_DISCOUNT);
          e.weeklyXp = e.weeklyXp + bonus;
          e.xp = e.weeklyXp;
          e.isCarry = true;
          e.carryXp = bonus;
        }
      }
    }

    entries.sort((a, b) => b.weeklyXp - a.weeklyXp || a.nama.localeCompare(b.nama));
    return limitCount > 0 ? entries.slice(0, limitCount) : entries;
  } catch (error) {
    console.error('Error fetching weekly leaderboard:', error);
    return [];
  }
};

export const getUserWeeklyRank = async (
  weeklyXp: number,
  kelas?: string,
  jurusan?: string,
  shift?: string | null,
  week: JakartaWeek = getJakartaWeek()
): Promise<number | null> => {
  if (weeklyXp <= 0) return null;
  try {
    // Hitung rank dengan agregasi penuh tanpa limit, lalu cari posisi.
    const all = await getWeeklyLeaderboard(0, kelas, jurusan, shift, week);
    const above = all.filter(e => e.weeklyXp > weeklyXp).length;
    return above + 1;
  } catch (error) {
    console.error('Error counting weekly rank:', error);
    return null;
  }
};

export interface WeeklySnapshotRow {
  week_start: string;
  nim: string;
  nama: string;
  kelas: string | null;
  shift: string | null;
  jurusan: string | null;
  weekly_xp: number;
  lesson_xp: number;
  bughunt_xp: number;
  lessons_completed: number;
  rank: number;
}

// Arsipkan snapshot minggu berjalan ke weekly_standings (dipanggil staff
// via tombol "Arsipkan Minggu Ini", atau cron setelah pg_cron tersedia).
// Idempotent: upsert per (week_start, nim).
export const saveWeeklySnapshot = async (
  week: JakartaWeek = getJakartaWeek()
): Promise<{ inserted: number; error?: string }> => {
  try {
    const all = await getWeeklyLeaderboard(0, undefined, undefined, undefined, week);
    if (all.length === 0) return { inserted: 0 };
    const rows: WeeklySnapshotRow[] = all.map((e, idx) => ({
      week_start: week.weekStartLabel,
      nim: e.nim,
      nama: e.nama,
      kelas: e.kelas || null,
      shift: e.shift || null,
      jurusan: e.jurusan || null,
      weekly_xp: e.weeklyXp,
      lesson_xp: e.lessonXp,
      bughunt_xp: e.bughuntXp,
      lessons_completed: e.lessonsCompleted,
      rank: idx + 1,
    }));
    const { error } = await supabase
      .from('weekly_standings')
      .upsert(rows, { onConflict: 'week_start,nim' });
    if (error) throw error;
    return { inserted: rows.length };
  } catch (error: any) {
    console.error('Error saving weekly snapshot:', error);
    return { inserted: 0, error: error?.message || 'Gagal menyimpan snapshot' };
  }
};

// Riwayat minggu lalu buat "Hall of Fame" / arsip top learner.
export const getWeeklyHistory = async (limitWeeks: number = 8): Promise<{ week_start: string; top: WeeklySnapshotRow[] }[]> => {
  try {
    const { data: weeks, error: wErr } = await supabase
      .from('weekly_standings')
      .select('week_start')
      .order('week_start', { ascending: false });
    if (wErr) throw wErr;
    const uniq = [...new Set((weeks || []).map(w => w.week_start))].slice(0, limitWeeks);
    const result: { week_start: string; top: WeeklySnapshotRow[] }[] = [];
    for (const ws of uniq) {
      const { data, error } = await supabase
        .from('weekly_standings')
        .select('*')
        .eq('week_start', ws)
        .order('rank', { ascending: true })
        .limit(3);
      if (error) throw error;
      result.push({ week_start: ws, top: (data || []) as WeeklySnapshotRow[] });
    }
    return result;
  } catch (error) {
    console.error('Error fetching weekly history:', error);
    return [];
  }
};

export const getLeaderboard = async (limitCount: number = 10, kelas?: string, jurusan?: string, shift?: string | null): Promise<UserProfile[]> => {
  try {
    let query = supabase
      .from('users')
      .select('nim, nama, kelas, jurusan, shift, xp, level, streak')
      .eq('role', 'mahasiswa');

    if (kelas) {
      query = query.eq('kelas', kelas);
    }
    if (jurusan) {
      query = query.eq('jurusan', jurusan);
    }
    if (shift != null && shift !== '') {
      query = query.eq('shift', shift);
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
      shift: u.shift != null ? String(u.shift) : null,
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

export const getUserRank = async (xp: number, kelas?: string, jurusan?: string, shift?: string | null): Promise<number | null> => {
  if (xp === 0) return null;
  
  try {
    let query = supabase
      .from('users')
      .select('nim', { count: 'exact', head: true })
      .eq('role', 'mahasiswa')
      .gt('xp', xp);

    if (kelas) {
      query = query.eq('kelas', kelas);
    }
    if (jurusan) {
      query = query.eq('jurusan', jurusan);
    }
    if (shift != null && shift !== '') {
      query = query.eq('shift', shift);
    }

    const { count, error } = await query;

    if (error) throw error;
    return (count || 0) + 1;
  } catch (error) {
    console.error('Error counting user rank:', error);
    return null;
  }
};

export const getLeaderboardFilters = async (): Promise<{ kelas: string[]; jurusan: string[]; shift: string[] }> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('kelas, jurusan, shift')
      .eq('role', 'mahasiswa');

    if (error) throw error;

    const kelas = [...new Set((data || []).map(u => u.kelas).filter(Boolean))].sort() as string[];
    const jurusan = [...new Set((data || []).map(u => u.jurusan).filter(Boolean))].sort() as string[];
    const shift = [...new Set((data || []).map(u => u.shift != null ? String(u.shift) : '').filter(Boolean))].sort() as string[];
    return { kelas, jurusan, shift };
  } catch (error) {
    console.error('Error fetching leaderboard filters:', error);
    return { kelas: [], jurusan: [], shift: [] };
  }
};
