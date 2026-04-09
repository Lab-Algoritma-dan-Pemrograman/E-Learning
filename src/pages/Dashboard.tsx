import React from 'react';
import { Layout } from '../components/Layout';
import { motion } from 'framer-motion';
import { Trophy, Zap, Clock, BookOpen, ChevronRight, Play } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useProgress } from '../store/useProgress';

export const Dashboard: React.FC = () => {
  const { user, setPage, currentLessonId, setCurrentLessonId, curriculum } = useStore();
  const { completedLessons } = useProgress();

  const handleContinue = () => {
    if (curriculum.length === 0) return;
    
    // Find the first lesson that is not completed
    let firstUncompletedLessonId: string | null = null;
    
    for (const level of curriculum) {
      for (const module of (level.modules || [])) {
        for (const lesson of (module.lessons || [])) {
          if (!completedLessons.includes(lesson.id)) {
            firstUncompletedLessonId = lesson.id;
            break;
          }
        }
        if (firstUncompletedLessonId) break;
      }
      if (firstUncompletedLessonId) break;
    }

    if (firstUncompletedLessonId) {
      setCurrentLessonId(firstUncompletedLessonId);
    } else if (!currentLessonId && curriculum.length > 0 && curriculum[0].modules?.length > 0 && curriculum[0].modules[0].lessons?.length > 0) {
      // If all completed or no current lesson, start from the very first one
      setCurrentLessonId(curriculum[0].modules[0].lessons[0].id);
    }
    
    setPage('lesson');
  };

  const totalLessons = curriculum.reduce((acc, level) => 
    acc + (level.modules?.reduce((mAcc, module) => mAcc + (module.lessons?.length || 0), 0) || 0), 0
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

  return (
    <Layout>
      <div className="space-y-8">
        {/* Setup Banner for Admin if DB is empty */}
        {curriculum.length === 0 && user?.role === 'admin' && (
          <div className="bg-rose-50 border-2 border-dashed border-rose-200 rounded-3xl p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-rose-100 text-rose-700 rounded-2xl flex items-center justify-center mx-auto">
              <Zap size={32} />
            </div>
            <div className="max-w-md mx-auto">
              <h2 className="text-xl font-bold text-rose-900">Database Anda Masih Kosong</h2>
              <p className="text-rose-700 text-sm mt-2">
                Klik tombol di bawah untuk mengisi database Firestore Anda dengan kurikulum E-Learning standar secara otomatis.
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Selamat datang kembali, {user?.nama?.split(' ')[0] || 'Penjelajah'}! 👋</h1>
            <p className="text-zinc-500 mt-1">Anda membuat kemajuan besar. Pertahankan!</p>
          </div>
          <div className="flex items-center gap-3 bg-white border border-zinc-200 p-2 rounded-2xl shadow-sm">
            <StatCard icon={<Zap className="text-amber-500" size={20} />} label="Beruntun" value={`${user?.streak || 0} hari`} />
            <div className="w-px h-8 bg-zinc-100" />
            <StatCard icon={<Trophy className="text-rose-700" size={20} />} label="XP" value={(user?.xp || 0).toLocaleString()} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Progress */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning Card */}
            <motion.div 
              whileHover={{ y: -4 }}
              onClick={handleContinue}
              className="bg-zinc-900 text-white rounded-3xl p-8 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-700/10 rounded-full -mr-20 -mt-20 blur-3xl transition-all group-hover:bg-rose-700/20" />
              
              <div className="relative z-10">
                <div className="text-rose-400 text-sm font-bold uppercase tracking-widest mb-2">Lanjutkan Belajar</div>
                <h2 className="text-3xl font-bold mb-4">{curriculum[0]?.title || 'Kursus Anda'}</h2>
                <p className="text-zinc-400 mb-8 max-w-md">Kuasai materi yang telah disusun. Anda telah menyelesaikan <span className="text-white font-medium">{completedLessons.length}</span> dari <span className="text-white font-medium">{totalLessons}</span> pelajaran.</p>
                
                <div className="flex items-center gap-6">
                  <button className="bg-rose-700 hover:bg-rose-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95">
                    <Play size={18} fill="currentColor" />
                    Lanjutkan Pelajaran
                  </button>
                  <div className="flex flex-col gap-1">
                    <div className="text-xs text-zinc-500 font-bold uppercase">Kemajuan Keseluruhan</div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-700 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }} />
                      </div>
                      <span className="text-sm font-bold">{progressPercentage}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Course Curriculum Preview */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <BookOpen size={20} className="text-rose-700" />
                Kurikulum Anda
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {curriculum.map((level, idx) => {
                  const totalInLevel = level.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;
                  const completedInLevel = level.modules?.reduce((acc, m) => 
                    acc + (m.lessons?.filter(l => completedLessons.includes(l.id)).length || 0), 0
                  ) || 0;
                  const levelProgress = totalInLevel > 0 ? Math.round((completedInLevel / totalInLevel) * 100) : 0;

                  return (
                    <div 
                      key={level.id} 
                      onClick={() => {
                        if (level.modules?.[0]?.lessons?.[0]?.id) {
                          setCurrentLessonId(level.modules[0].lessons[0].id);
                          setPage('lesson');
                        }
                      }}
                      className="bg-white border border-zinc-200 p-6 rounded-2xl hover:border-rose-200 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-400 group-hover:bg-rose-50 group-hover:text-rose-700 transition-colors">
                          {idx + 1}
                        </div>
                        <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Level {idx + 1}</div>
                      </div>
                      <h4 className="font-bold text-lg mb-1">{level.title}</h4>
                      <p className="text-sm text-zinc-500 mb-4 line-clamp-2">{level.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-zinc-400 font-medium">{level.modules?.length || 0} Modul</span>
                          <span className="text-rose-700 font-bold">{levelProgress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                          <div className="h-full bg-rose-700 rounded-full transition-all duration-500" style={{ width: `${levelProgress}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-8">
            <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Clock size={20} className="text-rose-700" />
                Aktivitas Terbaru
              </h3>
              <div className="space-y-6">
                {completedLessons.length > 0 ? (
                  completedLessons.slice(-3).reverse().map((lessonId, i) => (
                    <ActivityItem key={lessonId} title={`Pelajaran ${lessonId}`} time={i === 0 ? "Baru saja" : `${i + 1} hari yang lalu`} xp={50} />
                  ))
                ) : (
                  <p className="text-sm text-zinc-500 italic">Belum ada aktivitas. Mulai pelajaran pertama Anda!</p>
                )}
              </div>
            </div>

            <div className="bg-rose-800 rounded-3xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
              <h3 className="font-bold text-lg mb-2 relative z-10">Tips Pro! 💡</h3>
              <p className="text-rose-100 text-sm relative z-10 leading-relaxed">
                Konsistensi adalah kunci. Cobalah untuk memprogram setidaknya 15 menit setiap hari untuk membangun memori otot.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
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

const ActivityItem: React.FC<{ title: string; time: string; xp: number }> = ({ title, time, xp }) => (
  <div className="flex items-center gap-4">
    <div className="w-2 h-2 rounded-full bg-rose-700" />
    <div className="flex-1">
      <div className="text-sm font-bold">{title}</div>
      <div className="text-xs text-zinc-400">{time}</div>
    </div>
    <div className="text-xs font-bold text-rose-700">+{xp} XP</div>
  </div>
);
