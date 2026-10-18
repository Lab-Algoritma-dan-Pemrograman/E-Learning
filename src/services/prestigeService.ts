import { supabase } from '../lib/supabase';
import { UserProfile, useStore } from '../store/useStore';
import { useProgress } from '../store/useProgress';
import { Level } from '../data/curriculum';
import { calculateLevel } from './progressService';
import { normalizeRole } from './tokenService';

// =========================================================================
// PRESTIGE SUKARELA BERBATAS — anti-farming lesson mudah
// Aturan (keputusan user):
//   1. Syarat: tamat PENUH 6/6 level (semua lesson completed)
//   2. Cooldown 14 hari antar reset
//   3. Maks 2x per semester (Jan–Jun / Jul–Des, kalender Jakarta)
//   4. Arsip dulu (progress_archive + prestige_history), baru hapus aktif
//   5. Multiplier lesson-only, cap x1.50, non-stack (take-max).
//      Papan Mingguan = base XP steril multiplier.
// =========================================================================

export const PRESTIGE_COOLDOWN_DAYS = 14;
export const PRESTIGE_MAX_PER_SEMESTER = 2;
export const PRESTIGE_MULT_CAP = 1.5;
export const REQUIRED_LEVELS = 6;

// Tier: syarat reset = tamat penuh 6/6, jadi multiplier TUNGGAL x1.50
// untuk semua yang layak (single mult, tidak ada tier parsial).
// `prestige_count` dipakai untuk badge kosmetik (Prestige-I/II/...),
// bukan untuk menaikkan multiplier (non-stack, take-max, cap x1.50).
export const PRESTIGE_MASTER_MULT = 1.5;
export const prestigeTierForLevels = (levelsDone: number): { tier: string; mult: number } => {
  if (levelsDone >= 6) return { tier: 'Master', mult: PRESTIGE_MASTER_MULT };
  return { tier: 'Base', mult: 1.0 };
};

export const prestigeBadgeForCount = (count: number): string =>
  count > 0 ? `Prestige-${count}` : 'Base';

export interface PrestigeEligibility {
  eligible: boolean;
  reason: string;
  levelsDone: number;
  totalLevels: number;
  lessonsDone: number;
  totalLessons: number;
  tier: string;
  mult: number;
  prestigeCount: number;
  lastPrestigeAt: string | null;
  semesterUsed: number;
}

// Ambil kurikulum ala normal: DB (levels/modules/lessons) dulu,
// fallback curriculum.ts kalau kosong.
export const loadCurriculumForPrestige = async (): Promise<Level[]> => {
  try {
    const { data: levelsData } = await supabase.from('levels').select('*').order('sort_order');
    if (levelsData && levelsData.length > 0) {
      const { data: modulesData } = await supabase.from('modules').select('*').order('sort_order');
      const { data: lessonsData } = await supabase.from('lessons').select('id, module_id, title').order('sort_order');
      return (levelsData || []).map((lv: any) => ({
        id: lv.id,
        title: lv.title,
        description: lv.description || '',
        accessMode: 'auto',
        locked: false,
        modules: ((modulesData || []) as any[])
          .filter(m => m.level_id === lv.id)
          .map(mod => ({
            id: mod.id,
            title: mod.title,
            lessons: ((lessonsData || []) as any[])
              .filter(l => l.module_id === mod.id)
              .map(l => ({ id: l.id, title: l.title })),
          })),
      })) as unknown as Level[];
    }
  } catch { /* fallback ke lokal */ }
  const { curriculum } = await import('../data/curriculum');
  return curriculum as Level[];
};

// Semester kuliah (kalender Jakarta, tanpa lubang tanggal):
//   Ganjil: 1 Agustus – 31 Januari (buffer Agustus untuk awal kuliah Sept)
//   Genap : 1 Februari – 31 Juli
const semesterStartJakarta = (now: Date): Date => {
  const jakartaMs = now.getTime() + 7 * 60 * 60 * 1000;
  const j = new Date(jakartaMs);
  const y = j.getUTCFullYear();
  const m = j.getUTCMonth(); // 0-based: Jan=0 ... Des=11
  // Feb(1)–Jul(6) → Genap mulai 1 Feb tahun berjalan
  // Agu(7)–Des(11) → Ganjil mulai 1 Agu tahun berjalan
  // Jan(0) → Ganjil mulai 1 Agu tahun sebelumnya
  const s = (m >= 1 && m <= 6) ? Date.UTC(y, 1, 1)
    : (m >= 7) ? Date.UTC(y, 7, 1)
    : Date.UTC(y - 1, 7, 1);
  return new Date(s - 7 * 60 * 60 * 1000);
};

export const semesterLabelJakarta = (now: Date = new Date()): string => {
  const jakartaMs = now.getTime() + 7 * 60 * 60 * 1000;
  const j = new Date(jakartaMs);
  const m = j.getUTCMonth();
  const y = j.getUTCFullYear();
  if (m >= 1 && m <= 6) return `Genap Feb–Jul ${y}`;
  if (m >= 7) return `Ganjil Agu ${y}–Jan ${y + 1}`;
  return `Ganjil Agu ${y - 1}–Jan ${y}`;
};

export const checkPrestigeEligibility = async (nim: string): Promise<PrestigeEligibility> => {
  const curriculum = await loadCurriculumForPrestige();
  const totalLevels = curriculum.length;
  const allLessonIds = new Set<string>();
  for (const lv of curriculum) {
    for (const mod of lv.modules || []) {
      for (const les of (mod.lessons as any[]) || []) allLessonIds.add(les.id);
    }
  }
  const { data: prog } = await supabase
    .from('student_progress')
    .select('lesson_id')
    .eq('nim', nim)
    .eq('completed', true);
  const doneSet = new Set((prog || []).map(p => p.lesson_id));
  let levelsDone = 0;
  for (const lv of curriculum) {
    const ids: string[] = [];
    for (const mod of lv.modules || []) {
      for (const les of (mod.lessons as any[]) || []) ids.push(les.id);
    }
    if (ids.length > 0 && ids.every(id => doneSet.has(id))) levelsDone++;
  }
  const { data: userRow } = await supabase
    .from('users')
    .select('prestige_count, last_prestige_at, prestige_mult')
    .eq('nim', nim)
    .maybeSingle();
  const prestigeCount = (userRow as any)?.prestige_count || 0;
  const lastPrestigeAt = (userRow as any)?.last_prestige_at || null;
  const { data: hist } = await supabase
    .from('prestige_history')
    .select('reset_at')
    .eq('nim', nim)
    .gte('reset_at', semesterStartJakarta(new Date()).toISOString());
  const semesterUsed = (hist || []).length;
  const { tier, mult } = prestigeTierForLevels(levelsDone);

  if (levelsDone < REQUIRED_LEVELS || doneSet.size < allLessonIds.size) {
    return {
      eligible: false,
      reason: `Syarat belum terpenuhi: tamat ${levelsDone}/${totalLevels} level (${doneSet.size}/${allLessonIds.size} lesson). Reset sukarela hanya untuk yang tamat penuh 6/6.`,
      levelsDone, totalLevels, lessonsDone: doneSet.size, totalLessons: allLessonIds.size,
      tier, mult, prestigeCount, lastPrestigeAt, semesterUsed,
    };
  }
  if (lastPrestigeAt) {
    const days = (Date.now() - new Date(lastPrestigeAt).getTime()) / (24 * 60 * 60 * 1000);
    if (days < PRESTIGE_COOLDOWN_DAYS) {
      const left = Math.ceil(PRESTIGE_COOLDOWN_DAYS - days);
      return {
        eligible: false,
        reason: `Cooldown: reset berikutnya bisa dilakukan ${left} hari lagi (jeda 14 hari antar reset).`,
        levelsDone, totalLevels, lessonsDone: doneSet.size, totalLessons: allLessonIds.size,
        tier, mult, prestigeCount, lastPrestigeAt, semesterUsed,
      };
    }
  }
  if (semesterUsed >= PRESTIGE_MAX_PER_SEMESTER) {
    return {
      eligible: false,
      reason: `Kuota semester habis (${semesterUsed}/${PRESTIGE_MAX_PER_SEMESTER}). Reset lagi semester depan (${semesterLabelJakarta()}).`,
      levelsDone, totalLevels, lessonsDone: doneSet.size, totalLessons: allLessonIds.size,
      tier, mult, prestigeCount, lastPrestigeAt, semesterUsed,
    };
  }
  return {
    eligible: true,
    reason: `Layak prestige: tamat penuh 6/6 → Master x1.50 lesson-only. Badge: ${prestigeBadgeForCount(prestigeCount + 1)}. Papan mingguan tetap base.`,
    levelsDone, totalLevels, lessonsDone: doneSet.size, totalLessons: allLessonIds.size,
    tier: 'Master', mult: PRESTIGE_MASTER_MULT, prestigeCount, lastPrestigeAt, semesterUsed,
  };
};

// XP lesson yang dikali multiplier — SATU-SATUNYA tempat multiplier dipakai.
// completeLesson / grantXp WAJIB lewat fungsi ini untuk jalur lesson.
// Bug Hunt TIDAK pernah lewat sini (arena netral, selalu base).
export const applyPrestigeMult = (baseXp: number, mult: number | null | undefined): number => {
  const m = Math.min(PRESTIGE_MULT_CAP, Math.max(1, mult || 1));
  return Math.floor(baseXp * m);
};

// Eksekusi reset sukarela LEWAT RPC TRANSAKSIONAL (do_prestige_reset).
// Seluruh validasi (6/6, cooldown, kuota) + arsip + delete + update users
// jalan atomik di server — client tidak lagi 4 call terpisah.
// Hanya untuk diri sendiri (mahasiswa) ATAU staff (admin/kordas/asisten)
// yang meresetkan mahasiswa — RPC tetap validasi NIM yang di-reset.
export const doVoluntaryPrestigeReset = async (nim: string): Promise<{ tier: string; mult: number; prestigeNo: number }> => {
  const actor = useStore.getState().user;
  if (!actor) throw new Error('Harus login dulu.');
  const actorRole = normalizeRole(actor.role);
  const isSelf = actor.nim === nim;
  const isStaff = ['admin', 'kordas', 'asisten'].includes(actorRole);
  if (!isSelf && !isStaff) throw new Error('Akses ditolak.');

  // Cek cepat di client biar pesan error enak dibaca; keputusan final di RPC.
  const elig = await checkPrestigeEligibility(nim);
  if (!elig.eligible) throw new Error(elig.reason);

  const { data, error } = await supabase.rpc('do_prestige_reset', { p_nim: nim });
  if (error) throw new Error(error.message || 'Gagal prestige.');
  const res = data as any;
  const tier = res?.tier || 'Master';
  const mult = Number(res?.mult || 1.5);
  const prestigeNo = Number(res?.prestige_no || 0);

  // Audit log (jangan gagalkan reset kalau audit gagal)
  try {
    const { monitoringService } = await import('./monitoringService');
    await monitoringService.addAuditLog(
      actor.nim, actor.nama, 'progress_reset',
      `Prestige sukarela #${prestigeNo} NIM ${nim}: tamat penuh 6/6 → tier ${tier} x${mult.toFixed(2)} (lesson-only, RPC atomik). Progres diarsip, bukan dihapus.`
    );
  } catch { /* abaikan */ }

  if (isSelf) {
    useProgress.getState().setCompletedLessons([]);
    useStore.getState().setUser({
      ...actor,
      xp: 0,
      level: calculateLevel(0),
      streak: 0,
      prestigeTier: tier,
      prestigeMult: mult,
      prestigeCount: prestigeNo,
    } as UserProfile);
  }
  return { tier, mult, prestigeNo };
};
