import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { useStore } from '../store/useStore';
import { supabase } from '../lib/supabase';
import { useProgress } from '../store/useProgress';
import { resetUserProgress, adjustUserXp, deleteUser } from '../services/progressService';
import { monitoringService } from '../services/monitoringService';
import { 
  Search, RefreshCw, ChevronDown, ChevronRight, Trash2, Edit3, RotateCcw, 
  CheckCircle2, Lock, X, Save, AlertTriangle, Users, BookOpen, Clock, 
  Activity, Trophy, Sparkles, Filter, Check, Clock3
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Student {
  nim: string;
  nama: string;
  kelas: string;
  jurusan?: string;
  xp: number;
  streak: number;
  last_active: string;
  role: string;
  study_time?: number;
}

export const StudentMonitoring: React.FC = () => {
  const { user, curriculum } = useStore();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [kelasFilter, setKelasFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'offline'>('all');
  const [sortBy, setSortBy] = useState<'nama' | 'xp' | 'progress' | 'last_active'>('nama');
  const [expandedNim, setExpandedNim] = useState<string | null>(null);
  const [studentProgress, setStudentProgress] = useState<Record<string, string[]>>({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [editXpNim, setEditXpNim] = useState<string | null>(null);
  const [editXpValue, setEditXpValue] = useState('');
  const [confirmAction, setConfirmAction] = useState<{ type: string; nim: string; nama: string } | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [onlineNims, setOnlineNims] = useState<Set<string>>(new Set());
  const [sessionHeartbeats, setSessionHeartbeats] = useState<Record<string, string>>({});

  const isReadOnly = user?.role === 'asisten';
  const canManage = ['admin', 'kordas'].includes(user?.role || '');

  const totalLessons = curriculum.reduce((acc, l) => acc + (l.modules?.reduce((m, mod) => m + (mod.lessons?.length || 0), 0) || 0), 0);

  const fetchStudents = async () => {
    setIsRefreshing(true);
    try {
      // 1. Cleanup stale sessions (active within last 2 minutes)
      await monitoringService.cleanupStaleSessions(2);

      // 2. Fetch active sessions list with heartbeat timestamp and user role
      const { data: sessionData } = await supabase
        .from('active_sessions')
        .select('nim, last_heartbeat, users(role)');
      
      const heartbeats: Record<string, string> = {};
      const nims = new Set<string>();
      
      (sessionData || []).forEach(s => {
        const u = s.users as any;
        if (s.nim && s.last_heartbeat && u?.role === 'praktikan') {
          heartbeats[s.nim] = s.last_heartbeat;
          nims.add(s.nim);
        }
      });
      
      setSessionHeartbeats(heartbeats);
      setOnlineNims(nims);

      // 3. Fetch students (using select('*') for schema resilience)
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'praktikan');
      
      if (!error && data) {
        setStudents(data);
      }
    } catch (e) { 
      console.error(e); 
    } finally { 
      setIsRefreshing(false); 
      setLoading(false); 
    }
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

  useEffect(() => { 
    fetchStudents(); 

    // Set up periodic cleanup of stale sessions every 45 seconds
    const cleanupInterval = setInterval(async () => {
      try {
        await monitoringService.cleanupStaleSessions(2);
      } catch (e) {
        console.error("Failed to run periodic cleanup:", e);
      }
    }, 45000);

    // Set up realtime subscription to active_sessions
    const channel = supabase
      .channel('realtime:monitoring_active_sessions')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'active_sessions'
      }, async () => {
        // Fetch updated active sessions and user roles
        const { data: sessionData } = await supabase
          .from('active_sessions')
          .select('nim, last_heartbeat, users(role)');
        
        const heartbeats: Record<string, string> = {};
        const nims = new Set<string>();
        
        (sessionData || []).forEach(s => {
          const u = s.users as any;
          if (s.nim && s.last_heartbeat && u?.role === 'praktikan') {
            heartbeats[s.nim] = s.last_heartbeat;
            nims.add(s.nim);
          }
        });
        
        setSessionHeartbeats(heartbeats);
        setOnlineNims(nims);
      })
      .subscribe();

    return () => {
      clearInterval(cleanupInterval);
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (expandedNim) fetchStudentProgress(expandedNim);
  }, [expandedNim]);

  const getProgressPercent = (nim: string) => {
    const completed = studentProgress[nim]?.length || 0;
    return totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
  };

  const filtered = students.filter(s => {
    const matchSearch = s.nama.toLowerCase().includes(search.toLowerCase()) || s.nim.includes(search);
    const matchKelas = kelasFilter === 'all' || s.kelas === kelasFilter;
    
    const isOnline = onlineNims.has(s.nim);
    const matchStatus = statusFilter === 'all' || 
                        (statusFilter === 'online' && isOnline) || 
                        (statusFilter === 'offline' && !isOnline);
                        
    return matchSearch && matchKelas && matchStatus;
  });

  const sortedStudents = [...filtered].sort((a, b) => {
    if (sortBy === 'nama') {
      return a.nama.localeCompare(b.nama);
    }
    if (sortBy === 'xp') {
      return b.xp - a.xp;
    }
    if (sortBy === 'progress') {
      const pctA = getProgressPercent(a.nim);
      const pctB = getProgressPercent(b.nim);
      return pctB - pctA;
    }
    if (sortBy === 'last_active') {
      const getActiveTime = (stud: Student) => {
        const timeStr = sessionHeartbeats[stud.nim] || stud.last_active || 0;
        return new Date(timeStr).getTime();
      };
      return getActiveTime(b) - getActiveTime(a);
    }
    return 0;
  });

  const kelasList = [...new Set(students.map(s => s.kelas))].sort();

  const handleResetProgress = async (nim: string) => {
    setActionLoading(true);
    try {
      await resetUserProgress(nim);
      setStudentProgress(prev => { const n = { ...prev }; delete n[nim]; return n; });
      await fetchStudents();
    } catch (e) { 
      console.error(e); 
    } finally { 
      setActionLoading(false); 
      setConfirmAction(null); 
    }
  };

  const handleAdjustXp = async (nim: string) => {
    const val = parseInt(editXpValue);
    if (isNaN(val) || val < 0) return;
    setActionLoading(true);
    try {
      await adjustUserXp(nim, val);
      await fetchStudents();
    } catch (e) { 
      console.error(e); 
    } finally { 
      setActionLoading(false); 
      setEditXpNim(null); 
      setEditXpValue(''); 
    }
  };

  const handleDeleteUser = async (nim: string) => {
    setActionLoading(true);
    try {
      await deleteUser(nim);
      await fetchStudents();
    } catch (e) { 
      console.error(e); 
    } finally { 
      setActionLoading(false); 
      setConfirmAction(null); 
    }
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

  const formatLastActive = (iso: string) => {
    if (!iso) return '-';
    const d = new Date(iso);
    return new Intl.DateTimeFormat('id-ID', { 
      timeZone: 'Asia/Jakarta', 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    }).format(d);
  };

  const formatStudyTimeText = (seconds?: number) => {
    if (!seconds || seconds <= 0) return '0 menit';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hrs > 0) {
      return `${hrs} jam ${mins} menit`;
    }
    return `${mins} menit`;
  };

  const totalStudyTimeSeconds = students.reduce((sum, s) => sum + (s.study_time || 0), 0);

  if (!['admin', 'kordas', 'asisten'].includes(user?.role || '')) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
          <div className="w-20 h-20 bg-rose-50 text-rose-700 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
            <Lock size={40} />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 mb-2">Akses Terbatas</h1>
          <p className="text-zinc-500 max-w-sm">Halaman ini hanya dapat diakses oleh staf pengajar.</p>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-96 space-y-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-4 border-rose-200 border-t-rose-700 animate-spin" />
            <Activity className="w-5 h-5 text-rose-700 absolute inset-0 m-auto animate-pulse" />
          </div>
          <span className="text-sm font-semibold text-zinc-500 animate-pulse">Memuat data monitoring...</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8 pb-12">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-zinc-200/80 shadow-sm">
          <div>
            <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-zinc-900 via-zinc-800 to-rose-950 bg-clip-text text-transparent">
              Monitoring Mahasiswa
            </h1>
            <p className="text-sm text-zinc-500 font-medium mt-1">
              Pantau keaktifan, progres belajar, dan nilai XP praktikan secara realtime.
            </p>
          </div>
          <button 
            onClick={fetchStudents} 
            disabled={isRefreshing} 
            className="flex items-center justify-center gap-2 px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl text-sm font-black shadow-lg shadow-zinc-900/10 active:scale-95 transition-all disabled:opacity-50 shrink-0"
          >
            <RefreshCw size={15} className={cn("transition-transform", isRefreshing && "animate-spin")} />
            Refresh Data
          </button>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Total Student */}
          <div className="bg-white border border-zinc-200/80 p-6 rounded-3xl flex items-center gap-5 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-bl-full pointer-events-none" />
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/15">
              <Users size={24} />
            </div>
            <div>
              <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-none mb-1.5">Total Praktikan</div>
              <div className="text-2xl font-black text-zinc-900">{students.length} <span className="text-sm font-bold text-zinc-500">Orang</span></div>
            </div>
          </div>

          {/* Card 2: Online Status */}
          <div className="bg-white border border-zinc-200/80 p-6 rounded-3xl flex items-center gap-5 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/15 relative">
              <Activity size={24} className="animate-pulse" />
              {students.some(s => onlineNims.has(s.nim)) && (
                <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-500 border-2 border-white"></span>
                </span>
              )}
            </div>
            <div>
              <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-none mb-1.5">Sedang Online</div>
              <div className="text-2xl font-black text-zinc-900">
                {students.filter(s => onlineNims.has(s.nim)).length} <span className="text-sm font-bold text-zinc-500">Aktif</span>
              </div>
            </div>
          </div>

          {/* Card 3: Average XP */}
          <div className="bg-white border border-zinc-200/80 p-6 rounded-3xl flex items-center gap-5 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none" />
            <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-amber-400/15">
              <Trophy size={24} />
            </div>
            <div>
              <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-none mb-1.5">Rata-rata XP</div>
              <div className="text-2xl font-black text-zinc-900">
                {students.length > 0 ? Math.round(students.reduce((sum, s) => sum + s.xp, 0) / students.length).toLocaleString() : 0} <span className="text-sm font-bold text-zinc-500">XP</span>
              </div>
            </div>
          </div>

          {/* Card 4: Total Study Time */}
          <div className="bg-white border border-zinc-200/80 p-6 rounded-3xl flex items-center gap-5 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-bl-full pointer-events-none" />
            <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-rose-500/15">
              <Clock size={24} />
            </div>
            <div>
              <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-none mb-1.5">Total Waktu Belajar</div>
              <div className="text-lg font-black text-zinc-900 leading-tight">
                {formatStudyTimeText(totalStudyTimeSeconds)}
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Sorting Controls */}
        <div className="bg-white border border-zinc-200/80 p-5 rounded-3xl shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-xs">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              placeholder="Cari nama atau NIM..." 
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-700/20 focus:bg-white transition-all font-medium" 
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 bg-zinc-50 p-1 rounded-2xl border border-zinc-200">
              <button 
                onClick={() => setStatusFilter('all')} 
                className={cn("px-3 py-1.5 rounded-xl text-xs font-bold transition-all", statusFilter === 'all' ? "bg-white text-zinc-900 shadow-sm border border-zinc-250/20" : "text-zinc-500 hover:text-zinc-800")}
              >
                Semua
              </button>
              <button 
                onClick={() => setStatusFilter('online')} 
                className={cn("px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1", statusFilter === 'online' ? "bg-white text-emerald-600 shadow-sm border border-zinc-250/20" : "text-zinc-500 hover:text-emerald-500")}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online
              </button>
              <button 
                onClick={() => setStatusFilter('offline')} 
                className={cn("px-3 py-1.5 rounded-xl text-xs font-bold transition-all", statusFilter === 'offline' ? "bg-white text-zinc-800 shadow-sm border border-zinc-250/20" : "text-zinc-500 hover:text-zinc-850")}
              >
                Offline
              </button>
            </div>

            {/* Class Filter */}
            <select 
              value={kelasFilter} 
              onChange={e => setKelasFilter(e.target.value)} 
              className="px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs font-bold text-zinc-700 focus:outline-none focus:ring-2 focus:ring-rose-700/20"
            >
              <option value="all">Semua Kelas</option>
              {kelasList.map(k => <option key={k} value={k}>{k}</option>)}
            </select>

            {/* Sorting */}
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-zinc-400" />
              <select 
                value={sortBy} 
                onChange={e => setSortBy(e.target.value as any)} 
                className="px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs font-bold text-zinc-700 focus:outline-none focus:ring-2 focus:ring-rose-700/20"
              >
                <option value="nama">Urut: Nama (A-Z)</option>
                <option value="xp">Urut: XP Terbanyak</option>
                <option value="progress">Urut: Progres Tertinggi</option>
                <option value="last_active">Urut: Terakhir Aktif</option>
              </select>
            </div>
          </div>
        </div>

        {/* Student Cards List */}
        <div className="space-y-3">
          {sortedStudents.map(s => {
            const pct = getProgressPercent(s.nim);
            const isExpanded = expandedNim === s.nim;
            const isOnline = onlineNims.has(s.nim);
            
            return (
              <div 
                key={s.nim} 
                className={cn(
                  "bg-white border rounded-[2rem] overflow-hidden transition-all duration-300",
                  isExpanded 
                    ? "border-rose-200 shadow-lg shadow-rose-700/5 ring-1 ring-rose-700/5" 
                    : "border-zinc-200 hover:border-zinc-350 hover:shadow-md hover:translate-y-[-1px]"
                )}
              >
                {/* Header Row (Click to toggle expansion) */}
                <div 
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 cursor-pointer select-none" 
                  onClick={() => setExpandedNim(isExpanded ? null : s.nim)}
                >
                  {/* Left Side: Avatar + Name info */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="relative shrink-0">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black transition-all",
                        isOnline 
                          ? "bg-emerald-50 text-emerald-700 ring-2 ring-emerald-500/20" 
                          : "bg-zinc-100 text-zinc-500"
                      )}>
                        {s.nama.charAt(0).toUpperCase()}
                      </div>
                      {isOnline ? (
                        <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
                        </span>
                      ) : (
                        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-zinc-350 border-2 border-white rounded-full" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-zinc-950 text-base truncate">{s.nama}</span>
                        <span className="text-[9px] font-black text-zinc-500 bg-zinc-100 border border-zinc-200/50 px-2 py-0.5 rounded-lg shrink-0">
                          {s.kelas}
                        </span>
                        {isOnline && (
                          <span className="text-[8px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200/50 px-2 py-0.5 rounded-lg uppercase tracking-wider shrink-0">
                            Aktif
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-zinc-500 font-semibold mt-0.5 flex items-center gap-1.5 flex-wrap">
                        <span>NIM: {s.nim}</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-300" />
                        <span className="text-rose-700 font-bold">{s.xp.toLocaleString()} XP</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-300" />
                        <span className="text-amber-600 font-bold">Streak {s.streak} Hari</span>
                        {s.study_time !== undefined && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-zinc-300" />
                            <span className="text-zinc-400 flex items-center gap-1">
                              <Clock3 size={11} /> {formatStudyTimeText(s.study_time)}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Progress Bar + Arrow */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t border-zinc-100 sm:border-0 pt-3 sm:pt-0">
                    <div className="flex items-center gap-3">
                      <div className="w-28 h-2.5 bg-zinc-100 rounded-full overflow-hidden hidden sm:block border border-zinc-200/50">
                        <div 
                          className={cn("h-full rounded-full transition-all duration-500", pct === 100 ? "bg-gradient-to-r from-emerald-500 to-teal-500" : "bg-gradient-to-r from-rose-600 to-rose-700")} 
                          style={{ width: `${pct}%` }} 
                        />
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-black text-zinc-900">{pct}%</div>
                        <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Selesai</div>
                      </div>
                    </div>
                    <div className={cn(
                      "w-8 h-8 rounded-xl flex items-center justify-center bg-zinc-50 border border-zinc-200/50 text-zinc-400 transition-all",
                      isExpanded && "bg-rose-50 border-rose-100 text-rose-700"
                    )}>
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details Panel */}
                {isExpanded && (
                  <div className="border-t border-zinc-150 p-6 space-y-6 bg-zinc-50/20">
                    {/* Progress Per Level Summary */}
                    <div className="space-y-2.5">
                      <div className="text-xs font-black text-zinc-400 uppercase tracking-widest flex items-center gap-1">
                        <Sparkles size={12} className="text-amber-500" /> Ringkasan Per Level
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {curriculum.map((level, idx) => {
                          const lp = getLevelProgress(s.nim, idx);
                          const lvlPct = lp.total > 0 ? Math.round((lp.completed / lp.total) * 100) : 0;
                          const isLevelC = level.id.startsWith('c-');
                          return (
                            <div key={level.id} className="bg-white p-4 rounded-2xl border border-zinc-200/60 shadow-sm flex flex-col justify-between">
                              <div className="flex items-center justify-between mb-2">
                                <span className={cn(
                                  "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg border",
                                  isLevelC ? "bg-blue-50 text-blue-700 border-blue-100" : "bg-rose-50 text-rose-700 border-rose-100"
                                )}>
                                  {isLevelC ? "Bahasa C" : "Python"}
                                </span>
                                <span className="text-[10px] font-black text-zinc-500 bg-zinc-50 px-2 py-0.5 rounded-md border border-zinc-100">
                                  {lp.completed} / {lp.total} Lesson
                                </span>
                              </div>
                              <h4 className="text-xs font-extrabold text-zinc-850 truncate mb-3" title={level.title}>
                                {level.title}
                              </h4>
                              <div className="space-y-1.5">
                                <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                                  <div 
                                    className={cn("h-full rounded-full transition-all duration-500", lvlPct === 100 ? 'bg-emerald-500' : isLevelC ? 'bg-blue-600' : 'bg-rose-700')} 
                                    style={{ width: `${lvlPct}%` }} 
                                  />
                                </div>
                                <div className="flex items-center justify-between text-[8px] font-black text-zinc-400 uppercase tracking-widest">
                                  <span>Progres</span>
                                  <span>{lvlPct}%</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Detailed Interactive Progress Tree Map */}
                    <div className="bg-white rounded-3xl border border-zinc-200/80 p-6 shadow-sm space-y-4">
                      <div className="text-xs font-black text-zinc-800 flex items-center justify-between border-b border-zinc-100 pb-3">
                        <span className="flex items-center gap-2">
                          <BookOpen size={16} className="text-rose-700" />
                          Peta Pembelajaran & Detail Pencapaian Pelajaran
                        </span>
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest bg-zinc-50 px-3 py-1 rounded-full border border-zinc-150">
                          {studentProgress[s.nim]?.length || 0} / {totalLessons} Selesai
                        </span>
                      </div>
                      
                      <div className="space-y-5 max-h-72 overflow-y-auto pr-3 custom-scrollbar bg-zinc-50/50 p-4 rounded-2xl border border-zinc-150/70">
                        {curriculum.map((level, lIdx) => {
                          const completedList = studentProgress[s.nim] || [];
                          return (
                            <div key={level.id} className="space-y-3 border-b border-zinc-200/60 last:border-0 pb-4 last:pb-0">
                              <div className="text-xs font-black text-zinc-850 uppercase tracking-wider flex items-center gap-2">
                                <span className="w-6 h-6 bg-zinc-900 text-white rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 shadow-sm">
                                  {lIdx + 1}
                                </span>
                                <span className="truncate">{level.title}</span>
                              </div>
                              
                              <div className="ml-6 space-y-4">
                                {level.modules?.map((mod) => (
                                  <div key={mod.id} className="space-y-2 border-l-2 border-zinc-200 pl-4 ml-3 relative">
                                    <div className="absolute w-2 h-2 rounded-full bg-zinc-300 -left-[5px] top-1.5" />
                                    <div className="text-[10px] font-black text-zinc-700 uppercase tracking-wide flex items-center gap-1.5">
                                      {mod.title}
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 ml-1 mt-1.5">
                                      {mod.lessons?.map((les) => {
                                        const isCompleted = completedList.includes(les.id);
                                        return (
                                          <div 
                                            key={les.id} 
                                            className={cn(
                                              "flex items-center gap-2.5 text-[11px] p-2 rounded-xl border transition-colors",
                                              isCompleted 
                                                ? "bg-emerald-50/40 border-emerald-100 text-emerald-800 font-semibold" 
                                                : "bg-white border-zinc-200/60 text-zinc-500"
                                            )}
                                          >
                                            {isCompleted ? (
                                              <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                                            ) : (
                                              <div className="w-3.5 h-3.5 rounded-full border border-zinc-300 shrink-0 bg-white" />
                                            )}
                                            <span className="truncate flex-1" title={les.title}>{les.title}</span>
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

                    {/* Bottom Action Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-150">
                      <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
                        <Clock size={14} className="text-zinc-400" />
                        <span>Terakhir Aktif: {formatLastActive(sessionHeartbeats[s.nim] || s.last_active)}</span>
                      </div>
                      
                      {canManage && (
                        editXpNim === s.nim ? (
                          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-rose-100 shadow-sm animate-fade-in">
                            <input 
                              value={editXpValue} 
                              onChange={e => setEditXpValue(e.target.value)} 
                              type="number" 
                              placeholder="Input XP baru" 
                              className="w-24 px-3 py-1.5 border border-zinc-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-rose-700/20" 
                              autoFocus 
                            />
                            <button 
                              onClick={() => handleAdjustXp(s.nim)} 
                              disabled={actionLoading} 
                              className="p-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors shadow-sm disabled:opacity-50"
                              title="Simpan XP"
                            >
                              <Check size={14} />
                            </button>
                            <button 
                              onClick={() => setEditXpNim(null)} 
                              className="p-2 bg-zinc-150 text-zinc-650 rounded-xl hover:bg-zinc-200 transition-colors"
                              title="Batal"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => { setEditXpNim(s.nim); setEditXpValue(String(s.xp)); }} 
                              className="flex items-center gap-1.5 px-4 py-2 text-[10px] font-black bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl border border-blue-200/40 transition-colors uppercase tracking-wider"
                            >
                              <Edit3 size={11} /> Atur XP
                            </button>
                            <button 
                              onClick={() => setConfirmAction({ type: 'reset', nim: s.nim, nama: s.nama })} 
                              className="flex items-center gap-1.5 px-4 py-2 text-[10px] font-black bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-xl border border-amber-200/40 transition-colors uppercase tracking-wider"
                            >
                              <RotateCcw size={11} /> Reset Progres
                            </button>
                            <button 
                              onClick={() => setConfirmAction({ type: 'delete', nim: s.nim, nama: s.nama })} 
                              className="flex items-center gap-1.5 px-4 py-2 text-[10px] font-black bg-red-50 text-red-650 hover:bg-red-100 rounded-xl border border-red-200/40 transition-colors uppercase tracking-wider"
                            >
                              <Trash2 size={11} /> Hapus
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          
          {sortedStudents.length === 0 && (
            <div className="text-center py-16 bg-white border border-zinc-200/80 rounded-[2rem] shadow-sm">
              <Users size={40} className="mx-auto mb-4 text-zinc-300 animate-pulse" />
              <p className="font-extrabold text-zinc-800 text-lg">Tidak ada mahasiswa ditemukan</p>
              <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
                Silakan ubah kata kunci pencarian atau bersihkan filter yang aktif.
              </p>
            </div>
          )}
        </div>

        {/* Action Confirmation Modal */}
        <AnimatePresence>
          {confirmAction && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl border border-zinc-100 relative flex flex-col items-center text-center mt-8"
              >
                {/* Floating Warning Badge */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-rose-50 border-4 border-white rounded-full flex items-center justify-center shadow-lg">
                  <AlertTriangle className="text-amber-500 w-10 h-10" />
                </div>

                <div className="mt-8 space-y-3 w-full">
                  <h3 className="text-2xl font-black tracking-tight text-zinc-900">
                    {confirmAction.type === 'reset' ? 'Reset Progres?' : 'Hapus Akun?'}
                  </h3>
                  <p className="text-xs text-zinc-400 font-bold">
                    {confirmAction.nama} ({confirmAction.nim})
                  </p>
                  <p className="text-sm text-zinc-500 font-semibold leading-relaxed">
                    {confirmAction.type === 'reset'
                      ? 'Apakah Anda yakin ingin mereset progres belajar? Seluruh riwayat pelajaran, XP, dan streak akan kembali ke 0.'
                      : 'Apakah Anda yakin ingin menghapus akun mahasiswa ini? Seluruh data progres dan pencapaian akan terhapus selamanya.'}
                  </p>
                  <p className="text-sm text-red-500 font-extrabold">
                    Tindakan ini bersifat permanen dan tidak bisa dibatalkan.
                  </p>
                </div>

                <div className="flex gap-3 w-full mt-8">
                  <button 
                    onClick={() => setConfirmAction(null)} 
                    disabled={actionLoading} 
                    className="flex-1 py-3.5 bg-zinc-50 border border-zinc-200 text-zinc-600 font-black rounded-2xl text-sm transition-all hover:bg-zinc-100"
                  >
                    Batal
                  </button>
                  <button 
                    onClick={() => confirmAction.type === 'reset' ? handleResetProgress(confirmAction.nim) : handleDeleteUser(confirmAction.nim)} 
                    disabled={actionLoading} 
                    className="flex-1 py-3.5 bg-red-650 border-b-4 border-red-800 text-white font-black rounded-2xl text-sm shadow-md shadow-red-500/10 active:border-b-0 active:translate-y-[4px] transition-all hover:bg-red-700"
                  >
                    {actionLoading ? 'Memproses...' : confirmAction.type === 'reset' ? 'Ya, Reset!' : 'Ya, Hapus!'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};
