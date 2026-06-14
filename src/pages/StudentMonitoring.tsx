import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { useStore } from '../store/useStore';
import { supabase } from '../lib/supabase';
import { useProgress } from '../store/useProgress';
import { resetUserProgress, adjustUserXp, deleteUser } from '../services/progressService';
import { monitoringService } from '../services/monitoringService';
import { Search, RefreshCw, ChevronDown, ChevronRight, Trash2, Edit3, RotateCcw, CheckCircle2, Lock, X, Save, AlertTriangle, Users, BookOpen, Clock, Activity, Trophy } from 'lucide-react';
import { cn } from '../lib/utils';

interface Student {
  nim: string;
  nama: string;
  kelas: string;
  jurusan?: string;
  xp: number;
  streak: number;
  last_active: string;
  role: string;
}

export const StudentMonitoring: React.FC = () => {
  const { user, curriculum } = useStore();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [kelasFilter, setKelasFilter] = useState('all');
  const [expandedNim, setExpandedNim] = useState<string | null>(null);
  const [studentProgress, setStudentProgress] = useState<Record<string, string[]>>({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [editXpNim, setEditXpNim] = useState<string | null>(null);
  const [editXpValue, setEditXpValue] = useState('');
  const [confirmAction, setConfirmAction] = useState<{ type: string; nim: string; nama: string } | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [onlineCount, setOnlineCount] = useState(0);

  const totalLessons = curriculum.reduce((acc, l) => acc + (l.modules?.reduce((m, mod) => m + (mod.lessons?.length || 0), 0) || 0), 0);

  const fetchStudents = async () => {
    setIsRefreshing(true);
    try {
      // 1. Cleanup stale sessions
      await monitoringService.cleanupStaleSessions(2);

      // 2. Fetch active sessions count
      const { count } = await supabase
        .from('active_sessions')
        .select('*', { count: 'exact', head: true });
      setOnlineCount(count || 0);

      // 3. Fetch students
      const { data, error } = await supabase
        .from('users')
        .select('nim, nama, kelas, jurusan, xp, streak, last_active, role')
        .eq('role', 'praktikan')
        .order('nama');
      if (!error && data) setStudents(data);
    } catch (e) { console.error(e); }
    finally { setIsRefreshing(false); setLoading(false); }
  };

  const fetchStudentProgress = async (nim: string) => {
    if (studentProgress[nim]) return;
    const { data } = await supabase
      .from('student_progress')
      .select('lesson_id')
      .eq('nim', nim)
      .eq('completed', true);
    if (data) {
      setStudentProgress(prev => ({ ...prev, [nim]: data.map(p => p.lesson_id) }));
    }
  };

  useEffect(() => { fetchStudents(); }, []);

  useEffect(() => {
    if (expandedNim) fetchStudentProgress(expandedNim);
  }, [expandedNim]);

  const filtered = students.filter(s => {
    const matchSearch = s.nama.toLowerCase().includes(search.toLowerCase()) || s.nim.includes(search);
    const matchKelas = kelasFilter === 'all' || s.kelas === kelasFilter;
    return matchSearch && matchKelas;
  });

  const kelasList = [...new Set(students.map(s => s.kelas))].sort();

  const handleResetProgress = async (nim: string) => {
    setActionLoading(true);
    try {
      await resetUserProgress(nim);
      setStudentProgress(prev => { const n = { ...prev }; delete n[nim]; return n; });
      await fetchStudents();
    } catch (e) { console.error(e); }
    finally { setActionLoading(false); setConfirmAction(null); }
  };

  const handleAdjustXp = async (nim: string) => {
    const val = parseInt(editXpValue);
    if (isNaN(val) || val < 0) return;
    setActionLoading(true);
    try {
      await adjustUserXp(nim, val);
      await fetchStudents();
    } catch (e) { console.error(e); }
    finally { setActionLoading(false); setEditXpNim(null); setEditXpValue(''); }
  };

  const handleDeleteUser = async (nim: string) => {
    setActionLoading(true);
    try {
      await deleteUser(nim);
      await fetchStudents();
    } catch (e) { console.error(e); }
    finally { setActionLoading(false); setConfirmAction(null); }
  };

  const getProgressPercent = (nim: string) => {
    const completed = studentProgress[nim]?.length || 0;
    return totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
  };

  const getLevelProgress = (nim: string, levelIdx: number) => {
    const level = curriculum[levelIdx];
    if (!level) return { completed: 0, total: 0 };
    const completed = studentProgress[nim] || [];
    let total = 0, done = 0;
    for (const mod of level.modules || []) {
      for (const les of mod.lessons || []) {
        total++;
        if (completed.includes(les.id)) done++;
      }
    }
    return { completed: done, total };
  };

  const formatTime = (iso: string) => {
    if (!iso) return '-';
    const d = new Date(iso);
    return new Intl.DateTimeFormat('id-ID', { timeZone: 'Asia/Jakarta', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(d);
  };

  if (loading) {
    return <Layout><div className="flex items-center justify-center h-64"><RefreshCw className="w-8 h-8 animate-spin text-rose-700" /></div></Layout>;
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Monitoring Mahasiswa</h1>
            <p className="text-sm text-zinc-500 mt-1">{filtered.length} dari {students.length} mahasiswa</p>
          </div>
          <button onClick={fetchStudents} disabled={isRefreshing} className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-xl text-sm font-bold text-zinc-700 hover:bg-zinc-50 disabled:opacity-50">
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-zinc-200 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 bg-rose-50 text-rose-700 rounded-xl flex items-center justify-center shrink-0">
              <Users size={22} />
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Total Praktikan</div>
              <div className="text-xl font-black text-zinc-900">{students.length} Orang</div>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center shrink-0">
              <Activity size={22} className="animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Sedang Online</div>
              <div className="text-xl font-black text-zinc-900">{onlineCount} Aktif</div>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center shrink-0">
              <Trophy size={22} />
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Rata-rata XP</div>
              <div className="text-xl font-black text-zinc-900">
                {students.length > 0 ? Math.round(students.reduce((sum, s) => sum + s.xp, 0) / students.length) : 0} XP
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama atau NIM..." className="w-full pl-9 pr-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-700/20" />
          </div>
          <select value={kelasFilter} onChange={e => setKelasFilter(e.target.value)} className="px-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm font-bold text-zinc-700 focus:outline-none focus:ring-2 focus:ring-rose-700/20">
            <option value="all">Semua Kelas</option>
            {kelasList.map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>

        {/* Student List */}
        <div className="space-y-2">
          {filtered.map(s => {
            const pct = getProgressPercent(s.nim);
            const isExpanded = expandedNim === s.nim;
            return (
              <div key={s.nim} className="bg-white border border-zinc-200 rounded-2xl overflow-hidden transition-all">
                {/* Student Row */}
                <div className="flex items-center gap-4 p-4 cursor-pointer hover:bg-zinc-50/50" onClick={() => setExpandedNim(isExpanded ? null : s.nim)}>
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-sm font-black text-zinc-500 shrink-0">
                    {s.nama.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm truncate">{s.nama}</span>
                      <span className="text-[10px] font-bold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded shrink-0">{s.kelas}</span>
                    </div>
                    <div className="text-xs text-zinc-500">{s.nim} • {s.xp} XP • Streak {s.streak}</div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="w-24 h-2 bg-zinc-100 rounded-full overflow-hidden hidden sm:block">
                      <div className="h-full bg-rose-700 rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs font-bold text-zinc-500 w-10 text-right">{pct}%</span>
                    {isExpanded ? <ChevronDown size={16} className="text-zinc-400" /> : <ChevronRight size={16} className="text-zinc-400" />}
                  </div>
                </div>

                {/* Expanded Detail */}
                {isExpanded && (
                  <div className="border-t border-zinc-100 p-4 space-y-4 bg-zinc-50/30">
                    {/* Level Progress */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {curriculum.map((level, idx) => {
                        const lp = getLevelProgress(s.nim, idx);
                        const lvlPct = lp.total > 0 ? Math.round((lp.completed / lp.total) * 100) : 0;
                        return (
                          <div key={level.id} className="bg-white p-3 rounded-xl border border-zinc-100">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] font-bold text-zinc-400 uppercase">Level {idx + 1}</span>
                              <span className="text-[10px] font-bold text-zinc-500">{lp.completed}/{lp.total}</span>
                            </div>
                            <div className="text-xs font-bold truncate mb-2">{level.title}</div>
                            <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                              <div className={cn("h-full rounded-full transition-all", lvlPct === 100 ? 'bg-emerald-500' : 'bg-rose-700')} style={{ width: `${lvlPct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Progress Detail Tree */}
                    <div className="bg-white rounded-2xl border border-zinc-200/85 p-5 space-y-3">
                      <div className="text-xs font-bold text-zinc-800 flex items-center gap-1.5 mb-2">
                        <BookOpen size={14} className="text-zinc-500" />
                        Peta Progres Pembelajaran Detail
                      </div>
                      
                      <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar bg-zinc-50/20 p-2 rounded-xl border border-zinc-100">
                        {curriculum.map((level, lIdx) => {
                          const completedList = studentProgress[s.nim] || [];
                          return (
                            <div key={level.id} className="space-y-2 border-b border-zinc-100 last:border-0 pb-3 last:pb-0">
                              <div className="text-xs font-black text-zinc-850 uppercase tracking-wide flex items-center gap-1.5">
                                <span className="w-5 h-5 bg-zinc-100 text-zinc-500 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0">{lIdx + 1}</span>
                                {level.title}
                              </div>
                              
                              <div className="ml-5 space-y-3">
                                {level.modules?.map((mod) => (
                                  <div key={mod.id} className="space-y-1.5 border-l border-zinc-200 pl-3 ml-2">
                                    <div className="text-[10px] font-bold text-zinc-650 flex items-center gap-1">
                                      <BookOpen size={10} className="text-zinc-400" />
                                      {mod.title}
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 ml-2 mt-1">
                                      {mod.lessons?.map((les) => {
                                        const isCompleted = completedList.includes(les.id);
                                        return (
                                          <div key={les.id} className="flex items-center gap-2 text-[11px] py-0.5">
                                            {isCompleted ? (
                                              <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                                            ) : (
                                              <div className="w-3 h-3 rounded-full border border-zinc-300 shrink-0 bg-white" />
                                            )}
                                            <span className={isCompleted ? "text-zinc-700 font-medium truncate" : "text-zinc-450 truncate"}>{les.title}</span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Info & Actions */}
                    <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-zinc-100">
                      <span className="text-xs text-zinc-500">Terakhir aktif: {formatTime(s.last_active)}</span>
                      <div className="flex-1" />
                      
                      {user?.role !== 'asisten' && (
                        editXpNim === s.nim ? (
                          <div className="flex items-center gap-1">
                            <input value={editXpValue} onChange={e => setEditXpValue(e.target.value)} type="number" placeholder="XP baru" className="w-24 px-2 py-1 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-700/20" autoFocus />
                            <button onClick={() => handleAdjustXp(s.nim)} disabled={actionLoading} className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100"><Save size={14} /></button>
                            <button onClick={() => setEditXpNim(null)} className="p-1.5 bg-zinc-100 text-zinc-500 rounded-lg hover:bg-zinc-200"><X size={14} /></button>
                          </div>
                        ) : (
                          <>
                            <button onClick={() => { setEditXpNim(s.nim); setEditXpValue(String(s.xp)); }} className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 border border-blue-200/50">
                              <Edit3 size={10} /> Atur XP
                            </button>
                            <button onClick={() => setConfirmAction({ type: 'reset', nim: s.nim, nama: s.nama })} className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 border border-amber-200/50">
                              <RotateCcw size={10} /> Reset Progres
                            </button>
                            <button onClick={() => setConfirmAction({ type: 'delete', nim: s.nim, nama: s.nama })} className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold bg-red-50 text-red-500 rounded-lg hover:bg-red-100 border border-red-200/50">
                              <Trash2 size={10} /> Hapus
                            </button>
                          </>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-zinc-400">
              <Users size={32} className="mx-auto mb-3 opacity-50" />
              <p className="font-bold">Tidak ada mahasiswa ditemukan</p>
            </div>
          )}
        </div>

        {/* Confirm Modal */}
        {confirmAction && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 className="font-bold">{confirmAction.type === 'reset' ? 'Reset Progres' : 'Hapus Mahasiswa'}</h3>
                  <p className="text-sm text-zinc-500">{confirmAction.nama} ({confirmAction.nim})</p>
                </div>
              </div>
              <p className="text-sm text-zinc-600">
                {confirmAction.type === 'reset'
                  ? 'Semua progres pelajaran, XP, dan streak akan direset ke 0. Tindakan ini tidak bisa dibatalkan.'
                  : 'Akun mahasiswa beserta semua data progres dan pencapaian akan dihapus permanen.'}
              </p>
              <div className="flex gap-2 pt-2">
                <button onClick={() => setConfirmAction(null)} disabled={actionLoading} className="flex-1 py-2.5 bg-zinc-100 text-zinc-700 font-bold rounded-xl hover:bg-zinc-200 text-sm">Batal</button>
                <button onClick={() => confirmAction.type === 'reset' ? handleResetProgress(confirmAction.nim) : handleDeleteUser(confirmAction.nim)} disabled={actionLoading} className="flex-1 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 text-sm disabled:opacity-50">
                  {actionLoading ? 'Memproses...' : confirmAction.type === 'reset' ? 'Reset Sekarang' : 'Hapus Sekarang'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
