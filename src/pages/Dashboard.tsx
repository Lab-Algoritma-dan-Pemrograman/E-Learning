import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { motion } from 'framer-motion';
import { Trophy, Zap, Clock, BookOpen, ChevronRight, Play, Lock, Bug, CheckCircle2, Layers, FileText } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { useProgress } from '../store/useProgress';
import { cn } from '../lib/utils';
import { BugHunt } from '../components/games/BugHunt';
import { getGameSettings, GameSettings, getPlaysThisWeek, canPlayBugHunt, seedInitialQuestions } from '../services/gameService';
import { checkXpAchievements } from '../services/achievementService';
import gameQuestions from '../data/gameQuestions.json';
import { AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface RecentActivity {
  lessonId: string;
  completedAt: string;
}

export const Dashboard: React.FC = () => {
  const { user, setPage, currentLessonId, setCurrentLessonId, curriculum } = useStore();
  const { completedLessons } = useProgress();
  const [activeGame, setActiveGame] = useState<{ type: 'bug_hunt'; language: 'c' | 'python' } | null>(null);
  const [gameSettings, setGameSettings] = useState<GameSettings>({ 
    bugHuntActive: true, 
    bugHuntCActive: true, 
    bugHuntPythonActive: true,
    bugHuntWeeklyLimit: 3,
    bugHuntQuestionCount: 5
  });
  const [playsThisWeek, setPlaysThisWeek] = useState(0);
  const [isCheckingLimit, setIsCheckingLimit] = useState(false);
  const isAdmin = user?.role === 'admin';
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);

  // Check XP achievements on page load (catches missed achievements from Bug Hunt, etc.)
  useEffect(() => {
    const checkOnLoad = async () => {
      if (user?.nim && user?.xp) {
        const xpAch = await checkXpAchievements(user.nim, user.xp);
        if (xpAch) {
          useStore.getState().setUnlockedAchievement(xpAch);
        }
      }
    };
    checkOnLoad();
  }, [user?.nim]);

  useEffect(() => {
    const seed = async () => {
      if (isAdmin) {
        await seedInitialQuestions(gameQuestions);
      }
    };

    const fetchSettings = async () => {
      const settings = await getGameSettings();
      setGameSettings(settings);
    };

    const fetchHistory = async () => {
      if (user?.nim) {
        const count = await getPlaysThisWeek(user.nim);
        setPlaysThisWeek(count);
      }
    };

    seed();
    fetchSettings();
    fetchHistory();
  }, [user]);

  useEffect(() => {
    const fetchRecent = async () => {
      if (!user?.nim) return;
      const { data } = await supabase
        .from('student_progress')
        .select('lesson_id, completed_at')
        .eq('nim', user.nim)
        .eq('completed', true)
        .order('completed_at', { ascending: false })
        .limit(5);
      if (data) {
        setRecentActivity(data.map(p => ({ lessonId: p.lesson_id, completedAt: p.completed_at })));
      }
    };
    fetchRecent();
  }, [user?.nim]);

  const resolveLessonName = (lessonId: string): string => {
    for (const level of curriculum) {
      for (const mod of (level.modules || [])) {
        const lesson = (mod.lessons || []).find((l: any) => l.id === lessonId);
        if (lesson) return `${lesson.title} - Latihan`;
      }
    }
    return lessonId;
  };

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Refresh plays count when game is closed
  useEffect(() => {
    if (!activeGame && user?.nim) {
      getPlaysThisWeek(user.nim).then(setPlaysThisWeek);
    }
  }, [activeGame, user?.nim]);

  // Helper: get effective access mode for a level (same logic as CourseExplorer)
  const getEffectiveAccessMode = (levelId: string): 'auto' | 'unlocked' | 'locked' => {
    const override = user?.levelAccessOverrides?.[levelId];
    if (override && override !== 'auto') return override;
    const lv = curriculum.find(l => l.id === levelId);
    if (!lv) return 'locked';
    if (lv.accessMode) return lv.accessMode;
    if (lv.locked === true) return 'locked';
    return 'auto';
  };

  const isLevelLockedDisplay = (level: any, idx: number) => {
    // 1. Per-user override takes highest priority
    const userOverride = user?.levelAccessOverrides?.[level.id];
    if (userOverride && userOverride !== 'auto') return userOverride === 'locked';

    // 2. Explicit access mode on the level
    if (level.accessMode === 'locked') return true;
    if (level.accessMode === 'unlocked') return false;

    // 3. Legacy 'locked' field (only true locks; false is the DB default, don't use it to force-unlock)
    if (level.locked === true) return true;

    // 4. Auto mode: level 0 is always unlocked
    if (idx === 0) return false;

    // 5. Auto mode: ALL previous levels must be fully completed
    //    (skip levels explicitly set to 'unlocked' — they don't gate progress)
    for (let i = 0; i < idx; i++) {
      const prevLevel = curriculum[i];
      if (!prevLevel) continue;
      if (getEffectiveAccessMode(prevLevel.id) === 'unlocked') continue;
      for (const mod of (prevLevel.modules || [])) {
        for (const lesson of (mod.lessons || [])) {
          if (!completedLessons.includes(lesson.id)) {
            return true; // lock — previous level not done
          }
        }
      }
    }
    return false;
  };

  const handleContinue = () => {
    if (curriculum.length === 0) return;

    // Build a flat ordered list of all lessons across unlocked levels
    const allLessons: string[] = [];
    for (let i = 0; i < curriculum.length; i++) {
      const level = curriculum[i];
      if (isLevelLockedDisplay(level, i)) continue;
      for (const module of (level.modules || [])) {
        for (const lesson of (module.lessons || [])) {
          allLessons.push(lesson.id);
        }
      }
    }
    if (allLessons.length === 0) return;

    // Find the first uncompleted lesson in curriculum order
    const firstUncompleted = allLessons.find(id => !completedLessons.includes(id));

    // Strategy 1: Use global checkpoint (saved from LessonPage)
    const rawCheckpoint = localStorage.getItem('last-lesson-checkpoint');
    if (rawCheckpoint) {
      try {
        const cp = JSON.parse(rawCheckpoint) as { lessonId: string; step: string; timestamp: number };
        if (cp.lessonId && allLessons.includes(cp.lessonId)) {
          const cpIdx = allLessons.indexOf(cp.lessonId);
          const firstUncompletedIdx = firstUncompleted ? allLessons.indexOf(firstUncompleted) : -1;

          // If there is an uncompleted lesson before the checkpoint (e.g. due to admin reset),
          // prioritize going back to that uncompleted lesson at the start step.
          if (firstUncompletedIdx !== -1 && firstUncompletedIdx < cpIdx) {
            localStorage.setItem(`lesson-step:${firstUncompleted}`, 'learn');
            setCurrentLessonId(firstUncompleted);
            setPage('lesson');
            return;
          }

          if (!completedLessons.includes(cp.lessonId)) {
            // Checkpoint lesson is still incomplete — resume there (LessonPage reads per-lesson step)
            setCurrentLessonId(cp.lessonId);
            setPage('lesson');
            return;
          } else {
            // Checkpoint lesson is already completed (stale) — find the NEXT lesson after it
            const nextAfterCp = allLessons.slice(cpIdx + 1).find(id => !completedLessons.includes(id));
            if (nextAfterCp) {
              setCurrentLessonId(nextAfterCp);
              setPage('lesson');
              return;
            }
          }
        }
      } catch { /* ignore malformed checkpoint */ }
    }

    // Strategy 2: Find first uncompleted lesson in curriculum order
    if (firstUncompleted) {
      localStorage.setItem(`lesson-step:${firstUncompleted}`, 'learn');
      setCurrentLessonId(firstUncompleted);
      setPage('lesson');
      return;
    }

    // Strategy 3: All lessons completed — open the last lesson for review
    setCurrentLessonId(allLessons[allLessons.length - 1]);
    setPage('lesson');
  };

  const totalLessons = curriculum.reduce((acc, level, i) => 
    acc + (isLevelLockedDisplay(level, i) ? 0 : (level.modules?.reduce((mAcc, module) => mAcc + (module.lessons?.length || 0), 0) || 0)), 0
  );

  const handleInitialize = async () => {
    try {
      const { curriculumService } = await import('../services/curriculumService');
      const { curriculum: staticCurriculum } = await import('../data/curriculum');
      await curriculumService.saveFullCurriculum(staticCurriculum);
      window.location.reload();
    } catch (error) {
      console.error("Failed to initialize:", error);
    }
  };

  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;

  const cLevels = curriculum.filter(l => l.id.startsWith('c-'));
  const pyLevels = curriculum.filter(l => l.id.startsWith('p-'));

  const calculateLangProgress = (levels: any[]) => {
    const total = levels.reduce((acc, level, i) => {
      // Find original index in curriculum to check if locked
      const originalIdx = curriculum.findIndex(l => l.id === level.id);
      return acc + (isLevelLockedDisplay(level, originalIdx) ? 0 : (level.modules?.reduce((mAcc: number, module: any) => mAcc + (module.lessons?.length || 0), 0) || 0));
    }, 0);
    const completed = levels.reduce((acc, level) => 
      acc + (level.modules?.reduce((mAcc: number, m: any) => 
        mAcc + (m.lessons?.filter((l: any) => completedLessons.includes(l.id)).length || 0), 0
      ) || 0), 0
    );
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const cProgress = calculateLangProgress(cLevels);
  const pyProgress = calculateLangProgress(pyLevels);

  return (
    <Layout>
      <div className="space-y-8">
        {/* Setup Banner for Admin/Kordas if DB is empty */}
        {curriculum.length === 0 && (user?.role === 'admin' || user?.role === 'kordas') && (
          <div className="bg-rose-50 border-2 border-dashed border-rose-200 rounded-3xl p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-rose-100 text-rose-700 rounded-2xl flex items-center justify-center mx-auto">
              <Zap size={32} />
            </div>
            <div className="max-w-md mx-auto">
              <h2 className="text-xl font-bold text-rose-900">Database kamu Masih Kosong</h2>
              <p className="text-rose-700 text-sm mt-2">
                Klik tombol di bawah untuk mengisi database Supabase kamu dengan kurikulum E-Learning standar secara otomatis.
              </p>
            </div>
            <button 
              onClick={handleInitialize}
              className="bg-rose-700 hover:bg-rose-800 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-rose-700/20 transition-all active:scale-95"
            >
              Inisialisasi Database E-Learning
            </button>
          </div>
        )}
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-dark select-none leading-tight">
              Selamat datang kembali, {user?.nama?.split(' ')[0] || 'Penjelajah'}! 
              <span className="inline-block animate-bounce ml-2">👋</span>
            </h1>
            <p className="text-zinc-500 font-bold mt-1">Kamu membuat kemajuan besar. Pertahankan!</p>
          </div>
          <div className="flex flex-wrap md:flex-nowrap items-center justify-start md:justify-end gap-3 md:ml-auto w-full md:w-auto">
            {/* Streak */}
            <div className="flex items-center gap-3 bg-white border-2 border-amber-200 px-5 py-3 rounded-2xl shadow-sm hover:shadow-md transition-shadow select-none">
              <div className="w-10 h-10 bg-fun-yellow rounded-xl flex items-center justify-center text-maroon font-black text-lg shadow-sm">
                <i className="fa-solid fa-fire text-lg"></i>
              </div>
              <div>
                <div className="text-[10px] font-black text-amber-600 uppercase tracking-widest leading-none">Beruntun</div>
                <div className="text-lg font-black text-amber-950 mt-1">{user?.streak || 0} <span className="text-xs font-bold text-amber-600">hari</span></div>
              </div>
            </div>

            {/* Total XP */}
            <div className="flex items-center gap-3 bg-white border-2 border-rose-200 px-5 py-3 rounded-2xl shadow-sm hover:shadow-md transition-shadow select-none">
              <div className="w-10 h-10 bg-maroon rounded-xl flex items-center justify-center text-white shadow-sm text-sm">
                <i className="fa-solid fa-trophy"></i>
              </div>
              <div>
                <div className="text-[10px] font-black text-rose-600 uppercase tracking-widest leading-none">Total XP</div>
                <div className="text-lg font-black text-rose-955 mt-1">{(user?.xp || 0).toLocaleString()}</div>
              </div>
            </div>

            {/* Study Time */}
            <div className="flex items-center gap-3 bg-white border-2 border-blue-200 px-5 py-3 rounded-2xl shadow-sm hover:shadow-md transition-shadow select-none">
              <div className="w-10 h-10 bg-fun-blue rounded-xl flex items-center justify-center text-white shadow-sm text-sm">
                <i className="fa-solid fa-clock"></i>
              </div>
              <div>
                <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none">Waktu Belajar</div>
                <div className="text-lg font-black text-blue-955 mt-1">{formatStudyTime(user?.studyTime || 0)}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Progress */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning Card */}
            <motion.div 
              whileHover={{ y: -4, scale: 1.005 }}
              transition={{ type: 'tween', duration: 0.2 }}
              onClick={handleContinue}
              className="bg-white rounded-[2rem] p-8 md:p-10 border-2 border-gray-100 shadow-soft card-hover relative overflow-hidden group select-none transition-colors duration-300 hover:border-maroon/20 cursor-pointer flex flex-col"
            >
              {/* Soft gradient orbs */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-rose-100/30 rounded-full -mr-32 -mt-32 blur-[100px] transition-all duration-700 group-hover:bg-rose-200/40 group-hover:scale-110" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100/20 rounded-full -ml-20 -mb-20 blur-[80px] transition-all duration-700 group-hover:bg-blue-200/30" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200/60 text-rose-700 text-xs font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-4">
                  <i className="fa-solid fa-play text-[9px] mr-1"></i>
                  Lanjutkan Belajar
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-3 leading-tight text-dark">{curriculum[0]?.title || 'Belajar kamu'}</h2>
                <p className="text-zinc-500 font-bold mb-8 max-w-lg leading-relaxed">Kuasai materi yang telah disusun. Kamu telah menyelesaikan <span className="text-maroon font-black">{completedLessons.length}</span> dari <span className="text-dark font-black">{totalLessons}</span> pelajaran.</p>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <button className="bg-maroon hover:bg-maroon-light text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 transition-all shadow-bubbly-maroon active:translate-y-[6px] active:shadow-none btn-bubbly cursor-pointer">
                    <i className="fa-solid fa-play text-sm"></i>
                    Mulai Belajar
                  </button>
                  <div className="flex flex-col gap-4">
                    {cLevels.length > 0 && (
                      <div className="flex flex-col gap-1.5">
                        <div className="text-[10px] text-zinc-500 font-black uppercase tracking-wider flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-fun-blue shadow-[0_1.5px_0_#023E8A]" /> Bahasa C
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-36 h-3 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200 shadow-inner">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full relative" 
                              style={{ width: `${cProgress}%` }}
                            >
                              <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/30 rounded-t-full"></div>
                            </div>
                          </div>
                          <span className="text-xs font-black font-mono text-blue-650">{cProgress}%</span>
                        </div>
                      </div>
                    )}
                    {pyLevels.length > 0 && (
                      <div className="flex flex-col gap-1.5">
                        <div className="text-[10px] text-zinc-500 font-black uppercase tracking-wider flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_1.5px_0_#9F1239]" /> Python
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-36 h-3 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200 shadow-inner">
                            <div 
                              className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full relative" 
                              style={{ width: `${pyProgress}%` }}
                            >
                              <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/30 rounded-t-full"></div>
                            </div>
                          </div>
                          <span className="text-xs font-black font-mono text-rose-650">{pyProgress}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="space-y-12">
              {cLevels.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-black flex items-center gap-3 select-none group/lang cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-fun-blue text-white flex items-center justify-center font-black shadow-[0_4px_0_#023E8A] transform rotate-[-6deg] group-hover/lang:rotate-0 transition-transform">C</div>
                    <div>
                      <span className="text-dark">Kurikulum Bahasa C</span>
                      <div className="text-xs font-bold text-zinc-400 mt-0.5">{cLevels.length} Level</div>
                    </div>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {cLevels.map((level) => {
                      const idx = curriculum.findIndex(l => l.id === level.id);
                      return <LevelCard key={level.id} level={level} idx={idx} isLocked={isLevelLockedDisplay(level, idx)} completedLessons={completedLessons} setCurrentLessonId={setCurrentLessonId} setPage={setPage} colorClass="blue" />;
                    })}
                  </div>
                </div>
              )}

              {pyLevels.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-black flex items-center gap-3 select-none group/lang cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center font-black shadow-[0_4px_0_#9F1239] transform rotate-[6deg] group-hover/lang:rotate-0 transition-transform">Py</div>
                    <div>
                      <span className="text-dark">Kurikulum Python</span>
                      <div className="text-xs font-bold text-zinc-450 mt-0.5">{pyLevels.length} Level</div>
                    </div>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pyLevels.map((level) => {
                      const idx = curriculum.findIndex(l => l.id === level.id);
                      return <LevelCard key={level.id} level={level} idx={idx} isLocked={isLevelLockedDisplay(level, idx)} completedLessons={completedLessons} setCurrentLessonId={setCurrentLessonId} setPage={setPage} colorClass="rose" />;
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Sidebar Stats */}
          <div className="space-y-8">
            {/* Overall Progress Card */}
            <div className="bg-white border-2 border-gray-100 rounded-[2rem] p-6 shadow-soft card-hover hover:border-maroon/20 transition-all group/progress">
              <h3 className="font-black text-lg mb-5 flex items-center gap-3 select-none">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center text-white shadow-[0_3px_0_#5C0E25] transform rotate-[-4deg] group-hover/progress:rotate-0 transition-transform">
                  <i className="fa-solid fa-trophy text-sm"></i>
                </div>
                Progres Keseluruhan
              </h3>
              <div className="space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-4xl font-black text-zinc-900">{progressPercentage}%</div>
                    <div className="text-xs text-zinc-500 font-bold mt-1">{completedLessons.length} / {totalLessons} pelajaran</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-zinc-405 font-bold">Total XP</div>
                    <div className="text-xl font-black text-rose-700">{(user?.xp || 0).toLocaleString()}</div>
                  </div>
                </div>
                <div className="w-full h-3 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200 shadow-inner">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-rose-600 to-pink-500 rounded-full relative" 
                    initial={{ width: 0 }} 
                    animate={{ width: `${progressPercentage}%` }} 
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-white/30 rounded-t-full"></div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Recent Activity Card */}
            <div className="bg-white border-2 border-gray-100 rounded-[2rem] p-6 shadow-soft card-hover hover:border-maroon/20 transition-all group/activity">
              <h3 className="font-black text-lg mb-6 flex items-center gap-3 select-none">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-white shadow-[0_3px_0_#D97706] transform rotate-[4deg] group-hover/activity:rotate-0 transition-transform">
                  <i className="fa-solid fa-clock text-sm"></i>
                </div>
                Aktivitas Terbaru
              </h3>
              <div className="space-y-5">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, i) => (
                    <ActivityItem key={activity.lessonId + activity.completedAt} title={resolveLessonName(activity.lessonId)} time={formatDate(activity.completedAt)} isLast={i === recentActivity.length - 1} />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-zinc-50 border border-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
                      <i className="fa-solid fa-book-open-reader text-zinc-400 text-xl"></i>
                    </div>
                    <p className="text-sm text-zinc-550 font-bold">Belum ada aktivitas</p>
                    <p className="text-xs text-zinc-400 mt-0.5">Mulai pelajaran pertama kamu!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Pro Tips Card */}
            <div className="relative bg-gradient-to-br from-rose-700 via-rose-800 to-pink-900 border-2 border-rose-850 rounded-[2rem] p-6 text-white overflow-hidden shadow-[0_6px_0_#5C0E25] group/tips">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 blur-2xl transition-transform duration-700 group-hover/tips:scale-110" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/10 rounded-full -ml-16 -mb-16 blur-2xl" />
              <div className="relative z-10">
                <div className="text-3xl mb-3 transform rotate-[-8deg] group-hover/tips:rotate-0 transition-transform duration-300">💡</div>
                <h3 className="font-black text-lg mb-2">Tips Pro!</h3>
                <p className="text-rose-100 text-sm leading-relaxed font-bold">
                  Konsistensi adalah kunci. Cobalah untuk memprogram setidaknya 15 menit setiap hari untuk membangun memori otot.
                </p>
              </div>
            </div>

            {/* Bug Hunt Card */}
            <div className="bg-white border-2 border-gray-100 rounded-[2rem] p-6 shadow-soft card-hover hover:border-maroon/20 relative overflow-hidden transition-all duration-350 group/bughunt">
              <div className="absolute top-0 right-0 w-40 h-40 bg-rose-100/40 rounded-full -mr-20 -mt-20 blur-[60px] pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-rose-600 to-pink-700 rounded-2xl flex items-center justify-center text-white shadow-[0_4px_0_#5C0E25] transform rotate-[-5deg] group-hover/bughunt:rotate-0 transition-transform">
                      <i className="fa-solid fa-bug text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-black text-zinc-900 text-xl tracking-tight">Bug Hunt! <span className="inline-block">🎯</span></h3>
                      <p className="text-zinc-500 text-xs font-bold">Cari bug, dapatkan XP!</p>
                    </div>
                  </div>
                  {gameSettings.bugHuntWeeklyLimit > 0 && (
                    <div className="text-center bg-zinc-50 px-3 py-1.5 rounded-xl border border-zinc-200 shadow-inner transform rotate-[3deg]">
                      <div className="text-[8px] font-black text-zinc-400 uppercase tracking-widest leading-none">Sisa</div>
                      <div className={cn(
                        "text-lg font-black mt-0.5",
                        (gameSettings.bugHuntWeeklyLimit - playsThisWeek) <= 0 ? "text-rose-500" : "text-zinc-900"
                      )}>
                        {Math.max(0, gameSettings.bugHuntWeeklyLimit - playsThisWeek)}
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
                  Uji ketelitian mata kamu dengan menemukan bug dalam potongan kode secepat mungkin.
                </p>

                {(!gameSettings.bugHuntActive && !isAdmin) ? (
                  <div className="px-4 py-4 bg-zinc-50 text-zinc-400 rounded-2xl font-bold text-xs text-center border border-zinc-200 italic shadow-inner">
                    Game sedang dinonaktifkan oleh Admin 🛠️
                  </div>
                ) : playsThisWeek >= gameSettings.bugHuntWeeklyLimit && gameSettings.bugHuntWeeklyLimit > 0 && !isAdmin ? (
                  <div className="px-4 py-4 bg-rose-50 text-rose-500 rounded-2xl font-bold text-xs text-center border border-rose-200 flex flex-col gap-1.5 items-center">
                    <i className="fa-solid fa-circle-exclamation text-base"></i>
                    <span className="font-black">Limit Mingguan Tercapai</span>
                    <span className="text-[9px] opacity-60">Kembali lagi minggu depan!</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    {gameSettings.bugHuntCActive ? (
                      <button 
                        onClick={async () => {
                          if (isCheckingLimit || (playsThisWeek >= gameSettings.bugHuntWeeklyLimit && gameSettings.bugHuntWeeklyLimit > 0 && !isAdmin)) return;
                          setIsCheckingLimit(true);
                          try {
                            const check = await canPlayBugHunt(user!.nim);
                            setPlaysThisWeek(check.playsUsed);
                            if (check.allowed) {
                              setActiveGame({ type: 'bug_hunt', language: 'c' });
                            }
                          } finally {
                            setIsCheckingLimit(false);
                          }
                        }}
                        disabled={isCheckingLimit || (playsThisWeek >= gameSettings.bugHuntWeeklyLimit && gameSettings.bugHuntWeeklyLimit > 0 && !isAdmin)}
                        className={cn(
                          "group/btn relative px-4 py-3 bg-zinc-950 text-white rounded-2xl font-black text-sm transition-all shadow-[0_4px_0_#023E8A] border border-zinc-900 active:translate-y-[4px] active:shadow-none btn-bubbly cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                          (playsThisWeek >= gameSettings.bugHuntWeeklyLimit && gameSettings.bugHuntWeeklyLimit > 0 && !isAdmin) && "grayscale"
                        )}
                      >
                        <div className="relative z-10 flex items-center justify-center gap-2">
                          <span className="w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center text-[10px] font-black">C</span>
                          {(playsThisWeek >= gameSettings.bugHuntWeeklyLimit && gameSettings.bugHuntWeeklyLimit > 0 && !isAdmin) ? "Limit Habis" : "Challenge"}
                        </div>
                      </button>
                    ) : isAdmin && (
                      <div className="px-4 py-4 bg-zinc-50 text-zinc-400 rounded-2xl font-bold text-xs flex items-center justify-center border border-dashed border-zinc-200">
                        C Nonaktif
                      </div>
                    )}

                    {gameSettings.bugHuntPythonActive ? (
                      <button 
                        onClick={async () => {
                          if (isCheckingLimit || (playsThisWeek >= gameSettings.bugHuntWeeklyLimit && gameSettings.bugHuntWeeklyLimit > 0 && !isAdmin)) return;
                          setIsCheckingLimit(true);
                          try {
                            const check = await canPlayBugHunt(user!.nim);
                            setPlaysThisWeek(check.playsUsed);
                            if (check.allowed) {
                              setActiveGame({ type: 'bug_hunt', language: 'python' });
                            }
                          } finally {
                            setIsCheckingLimit(false);
                          }
                        }}
                        disabled={isCheckingLimit || (playsThisWeek >= gameSettings.bugHuntWeeklyLimit && gameSettings.bugHuntWeeklyLimit > 0 && !isAdmin)}
                        className={cn(
                          "group/btn relative px-4 py-3 bg-rose-700 text-white rounded-2xl font-black text-sm transition-all shadow-[0_4px_0_#9F1239] border border-rose-800 active:translate-y-[4px] active:shadow-none btn-bubbly cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                          (playsThisWeek >= gameSettings.bugHuntWeeklyLimit && gameSettings.bugHuntWeeklyLimit > 0 && !isAdmin) && "grayscale"
                        )}
                      >
                        <div className="relative z-10 flex items-center justify-center gap-2">
                          <span className="w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center text-[10px] font-black">Py</span>
                          {(playsThisWeek >= gameSettings.bugHuntWeeklyLimit && gameSettings.bugHuntWeeklyLimit > 0 && !isAdmin) ? "Limit Habis" : "Challenge"}
                        </div>
                      </button>
                    ) : isAdmin && (
                      <div className="px-4 py-4 bg-zinc-50 text-zinc-400 rounded-2xl font-bold text-xs flex items-center justify-center border border-dashed border-zinc-200">
                        Py Nonaktif
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Game Modal */}
      <AnimatePresence>
        {activeGame && (
          <BugHunt 
            language={activeGame.language} 
            onGameFinished={async () => {
              if (user?.nim) {
                const count = await getPlaysThisWeek(user.nim);
                setPlaysThisWeek(count);
              }
            }}
            onClose={() => {
              setActiveGame(null);
              // Refresh plays count after playing
              if (user?.nim) {
                getPlaysThisWeek(user.nim).then(setPlaysThisWeek);
              }
            }} 
          />
        )}
      </AnimatePresence>
    </Layout>
  );
};

const LevelCard: React.FC<{ 
  level: any; 
  idx: number; 
  isLocked: boolean; 
  completedLessons: string[]; 
  setCurrentLessonId: (id: string | null) => void;
  setPage: (page: any) => void;
  colorClass: string;
}> = ({ level, idx, isLocked, completedLessons, setCurrentLessonId, setPage, colorClass }) => {
  const totalInLevel = level.modules?.reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0) || 0;
  const completedInLevel = level.modules?.reduce((acc: number, m: any) => 
    acc + (m.lessons?.filter((l: any) => completedLessons.includes(l.id)).length || 0), 0
  ) || 0;
  const levelProgress = totalInLevel > 0 ? Math.round((completedInLevel / totalInLevel) * 100) : 0;
  const isComplete = levelProgress === 100 && totalInLevel > 0;

  const levelLessons: any[] = [];
  (level.modules || []).forEach((mod: any) => {
    (mod.lessons || []).forEach((les: any) => {
      levelLessons.push(les);
    });
  });

  const isBlue = colorClass === 'blue';
  const accent = {
    gradient: isBlue ? 'from-blue-600 to-indigo-600' : 'from-rose-600 to-pink-600',
    gradientLight: isBlue ? 'from-blue-50/70 via-white to-indigo-50/10' : 'from-rose-50/70 via-white to-pink-50/10',
    bg: isBlue ? 'bg-blue-50' : 'bg-rose-50',
    text: isBlue ? 'text-blue-700' : 'text-rose-700',
    textLight: isBlue ? 'text-blue-500' : 'text-rose-500',
    bar: isBlue ? 'from-blue-600 to-indigo-500' : 'from-rose-600 to-pink-500',
    ring: isBlue ? '#2563eb' : '#e11d48',
    ringBg: isBlue ? '#eff6ff' : '#fff1f2',
    blob: isBlue ? 'bg-blue-200/30' : 'bg-rose-200/30',
    dot: isBlue ? 'bg-blue-500' : 'bg-rose-500',
    dotEmpty: isBlue ? 'bg-zinc-200/80' : 'bg-zinc-200/80',
    border: isBlue ? 'border-blue-100/80 shadow-blue-500/[0.01]' : 'border-rose-100/80 shadow-rose-500/[0.01]',
  };

  // Circular progress SVG params
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (levelProgress / 100) * circumference;

  return (
    <div 
      onClick={() => {
        if (isLocked) return;
        if (level.modules?.[0]?.lessons?.[0]?.id) {
          setCurrentLessonId(level.modules[0].lessons[0].id);
          setPage('lesson');
        }
      }}
      className={cn(
        "relative overflow-hidden rounded-[2rem] border-2 transition-all duration-300 p-6 flex flex-col justify-between",
        isLocked 
          ? "cursor-not-allowed opacity-50 grayscale bg-zinc-50 border-zinc-200 shadow-sm" 
          : `cursor-pointer group card-hover hover:border-maroon/20 bg-gradient-to-br ${accent.gradientLight} ${accent.border} shadow-soft`
      )}
    >
      {/* Decorative blob top-right */}
      {!isLocked && (
        <div className={cn(
          "absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl transition-all duration-500",
          accent.blob, "group-hover:scale-125"
        )} />
      )}
      {/* Decorative blob bottom-left */}
      {!isLocked && (
        <div className={cn(
          "absolute -bottom-6 -left-6 w-24 h-24 rounded-full blur-2xl opacity-40",
          accent.blob
        )} />
      )}
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

      {/* Lock overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-zinc-100/60 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-[1.8rem]">
          <div className="flex flex-col items-center gap-2 text-zinc-400">
            <div className="w-12 h-12 bg-zinc-200 rounded-2xl flex items-center justify-center shadow-inner">
              <i className="fa-solid fa-lock text-sm"></i>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Terkunci</span>
          </div>
        </div>
      )}

      <div className="relative z-[1] flex-1 flex flex-col justify-between">
        <div>
          {/* Top row: Number badge + Level label + Circular progress */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm transition-all select-none",
                isLocked 
                  ? "bg-zinc-200 text-zinc-450 shadow-sm" 
                  : isComplete
                    ? `bg-fun-green text-white shadow-[0_3px_0_#047857] transform rotate-[-5deg] group-hover:rotate-0`
                    : isBlue
                      ? `bg-fun-blue text-white shadow-[0_3px_0_#023E8A] transform rotate-[-5deg] group-hover:rotate-0`
                      : `bg-rose-500 text-white shadow-[0_3px_0_#9F1239] transform rotate-[-5deg] group-hover:rotate-0`
              )}>
                {isLocked ? (
                  <i className="fa-solid fa-lock text-xs"></i>
                ) : isComplete ? (
                  <i className="fa-solid fa-check text-sm"></i>
                ) : (
                  idx + 1
                )}
              </div>
              <div>
                <div className={cn(
                  "text-[9px] font-black uppercase tracking-[0.2em]",
                  isComplete ? "text-fun-green" : isBlue ? "text-fun-blue" : "text-rose-600"
                )}>
                  Level {idx + 1}
                </div>
                <div className="text-[10px] text-zinc-550 font-black tracking-wide mt-0.5">
                  {level.modules?.length || 0} Modul • {totalInLevel} Pelajaran
                </div>
              </div>
            </div>

            {/* Circular progress ring */}
            {!isLocked && (
              <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r={radius} fill="none" stroke={accent.ringBg} strokeWidth="5" />
                  <circle 
                    cx="32" cy="32" r={radius} fill="none" 
                    stroke={accent.ring} strokeWidth="5" strokeLinecap="round"
                    strokeDasharray={circumference} strokeDashoffset={isLocked ? circumference : strokeOffset}
                    style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={cn("text-xs font-black", isComplete ? "text-fun-green" : "text-zinc-700")}>{levelProgress}%</span>
                </div>
              </div>
            )}
          </div>

          {/* Title */}
          <h4 className="font-black text-base mb-3 leading-tight text-zinc-900 line-clamp-2">{level.title}</h4>

          {/* Module preview list */}
          <div className="space-y-2 mb-4">
            {(level.modules || []).slice(0, 3).map((mod: any, mIdx: number) => {
              const modTotal = mod.lessons?.length || 0;
              const modDone = (mod.lessons || []).filter((l: any) => completedLessons.includes(l.id)).length;
              const modComplete = modDone === modTotal && modTotal > 0;
              return (
                <div key={mod.id || mIdx} className="flex items-center gap-2.5 text-xs group/item">
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all bg-white shadow-sm",
                    modComplete 
                      ? "bg-fun-green border-fun-green text-white" 
                      : "border-gray-300 group-hover/item:border-maroon/50"
                  )}>
                    <svg 
                      className={cn(
                        "w-3 h-3 text-white transition-all duration-200", 
                        modComplete ? "opacity-100 scale-100" : "opacity-0 scale-50"
                      )} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className={cn("truncate font-bold text-xs flex-1", modComplete ? "text-zinc-400 line-through font-normal" : "text-zinc-700")}>
                    {mod.title}
                  </span>
                  <span className="text-[10px] font-black text-zinc-450 shrink-0">{modDone}/{modTotal}</span>
                </div>
              );
            })}
            {(level.modules?.length || 0) > 3 && (
              <div className="text-[10px] font-black text-zinc-500 tracking-wide pt-0.5 ml-7">
                +{(level.modules?.length || 0) - 3} modul lagi
              </div>
            )}
          </div>
        </div>

        {/* Lesson dot indicators */}
        <div className="flex items-center gap-1.5 flex-wrap pt-3 border-t-2 border-dashed border-gray-100/60 mt-3">
          {levelLessons.map((les, lIdx) => {
            const isLessonDone = completedLessons.includes(les.id);
            return (
              <button 
                key={les.id || lIdx}
                disabled={isLocked}
                onClick={(e) => {
                  e.stopPropagation(); // prevent triggering parent card click
                  if (isLocked) return;
                  setCurrentLessonId(les.id);
                  setPage('lesson');
                }}
                title={les.title}
                className={cn(
                  "w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all border border-transparent shadow-sm hover:scale-125 cursor-pointer focus:outline-none disabled:cursor-not-allowed",
                  isLessonDone 
                    ? "bg-fun-green text-white shadow-[0_1.5px_0_#047857]" 
                    : "bg-zinc-200/85 hover:bg-zinc-300"
                )}
              >
                {isLessonDone && <i className="fa-solid fa-check text-[7px] font-black"></i>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 px-3 py-1">
    {icon}
    <div>
      <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{label}</div>
      <div className="text-sm font-bold">{value}</div>
    </div>
  </div>
);

const ActivityItem: React.FC<{ title: string; time: string; isLast?: boolean }> = ({ title, time, isLast }) => (
  <div className="flex items-start gap-4 relative">
    <div className="flex flex-col items-center">
      <div className="w-3 h-3 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 shadow-sm shadow-rose-500/30 shrink-0 mt-1" />
      {!isLast && <div className="w-px flex-1 bg-zinc-200 mt-1" />}
    </div>
    <div className="flex-1 min-w-0 pb-4">
      <div className="text-sm font-bold truncate">{title}</div>
      <div className="text-xs text-zinc-400 mt-0.5 font-medium">{time}</div>
    </div>
  </div>
);

const formatStudyTime = (seconds: number): string => {
  if (seconds <= 0) return '0d';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hrs > 0) {
    return `${hrs}j ${mins}m`;
  }
  if (mins > 0) {
    return `${mins}m ${secs}s`;
  }
  return `${secs}s`;
};

