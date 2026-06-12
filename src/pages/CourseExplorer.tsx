import React from 'react';
import { Layout } from '../components/Layout';
import { BookOpen, ChevronRight, Lock, CheckCircle2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { useStore } from '../store/useStore';
import { useProgress } from '../store/useProgress';

export const CourseExplorer: React.FC = () => {
  const { user, setPage, setCurrentLessonId, curriculum } = useStore();
  const { completedLessons } = useProgress();

  const getEffectiveAccessMode = (levelId: string): 'auto' | 'unlocked' | 'locked' => {
    const userOverride = user?.levelAccessOverrides?.[levelId];
    if (userOverride && userOverride !== 'auto') {
      return userOverride;
    }
    const level = curriculum.find(l => l.id === levelId);
    if (!level) return 'locked';
    
    if (level.accessMode) return level.accessMode;
    if (level.locked === true) return 'locked';
    
    return 'auto';
  };

  const isModuleLocked = (levelIdx: number, moduleIdx: number) => {
    if (curriculum.length === 0) return true;

    const level = curriculum[levelIdx];
    if (!level) return true;

    const accessMode = getEffectiveAccessMode(level.id);
    if (accessMode === 'locked') return true;
    if (accessMode === 'unlocked') return false;

    // accessMode === 'auto' -> Sequential check

    // Very first module of the very first level is always unlocked
    if (levelIdx === 0 && moduleIdx === 0) return false;

    // AUTO mode: ALL lessons in ALL previous levels must be completed
    for (let i = 0; i < levelIdx; i++) {
      const prevLevel = curriculum[i];
      if (!prevLevel) continue;
      const prevAccess = getEffectiveAccessMode(prevLevel.id);
      // Only check previous levels that are in auto mode (skip explicitly unlocked ones)
      if (prevAccess === 'unlocked') continue;
      for (const mod of (prevLevel.modules || [])) {
        for (const lesson of (mod.lessons || [])) {
          if (!completedLessons.includes(lesson.id)) {
            return true; // lock — previous level not fully completed
          }
        }
      }
    }

    // Within the same level, check sequentially: previous modules must be done
    if (moduleIdx > 0) {
      const prevModule = level.modules?.[moduleIdx - 1];
      if (!prevModule) return false;
      const allLessonsCompleted = prevModule.lessons?.every(lesson =>
        completedLessons.includes(lesson.id)
      ) || false;
      return !allLessonsCompleted;
    }

    return false;
  };

  const getModuleProgress = (module: any) => {
    if (!Array.isArray(module?.lessons) || module.lessons.length === 0) return 0;
    const completedInModule = module.lessons.filter((l: any) => completedLessons.includes(l.id)).length;
    return Math.round((completedInModule / module.lessons.length) * 100);
  };

  // Find the first uncompleted lesson in a module (resume feature)
  const getResumeLessonId = (module: any): string | null => {
    if (!module?.lessons?.length) return null;
    // Find first uncompleted lesson
    const firstUncompleted = module.lessons.find((l: any) => !completedLessons.includes(l.id));
    if (firstUncompleted) return firstUncompleted.id;
    // All completed: return last lesson (so they can review)
    return module.lessons[module.lessons.length - 1].id;
  };

  return (
    <Layout>
      <div className="space-y-12">
        {/* Back Button */}
        <button
          onClick={() => setPage('dashboard')}
          className="flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Kembali ke Dashboard
        </button>

        <div className="max-w-3xl">
          <h1 className="text-4xl font-black tracking-tight mb-4">Eksplorasi Kurikulum</h1>
          <p className="text-xl text-zinc-500">
            Yuk mulai petualangan ngoding kamu! Pilih <span className="text-rose-700 font-bold">Python</span> untuk kemudahan dan dunia data, atau <span className="text-blue-700 font-bold">Bahasa C</span> untuk ngulik jeroan sistem lebih dalam.
          </p>
        </div>

        <div className="space-y-16">
          {curriculum.map((level, lIdx) => {
            const isLangC = level.id.startsWith('c-');
            const accentGradient = isLangC ? 'from-blue-500 to-blue-600' : 'from-rose-500 to-pink-600';
            const accentBg = isLangC ? 'bg-blue-50' : 'bg-rose-50';
            const accentText = isLangC ? 'text-blue-700' : 'text-rose-700';
            
            return (
              <div key={level.id} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-xl transition-all",
                    isModuleLocked(lIdx, 0)
                      ? "bg-zinc-300 text-white shadow-zinc-300/10" 
                      : `bg-gradient-to-br ${accentGradient} text-white shadow-lg ${isLangC ? 'shadow-blue-500/20' : 'shadow-rose-500/20'}`
                  )}>
                    {isModuleLocked(lIdx, 0) ? <Lock size={22} /> : lIdx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
                        {level.title}
                      </h2>
                      {isModuleLocked(lIdx, 0) && (
                        <span className="text-[9px] font-black text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-lg uppercase tracking-[0.2em]">
                          Terkunci
                        </span>
                      )}
                      <span className={cn(
                        "text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-[0.2em]",
                        isLangC ? "bg-blue-50 text-blue-700" : "bg-rose-50 text-rose-700"
                      )}>
                        {isLangC ? 'Bahasa C' : 'Python'}
                      </span>
                    </div>
                    <p className="text-zinc-500 text-sm">{level.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {(level.modules || []).map((module, mIdx) => {
                    const locked = isModuleLocked(lIdx, mIdx);
                    const progress = getModuleProgress(module);
                    return (
                      <ModuleCard 
                        key={module.id} 
                        module={module} 
                        locked={locked}
                        progress={progress}
                        accentGradient={accentGradient}
                        accentBg={accentBg}
                        accentText={accentText}
                        onClick={() => {
                          if (!locked) {
                            const resumeId = getResumeLessonId(module);
                            if (resumeId) {
                              setCurrentLessonId(resumeId);
                              setPage('lesson');
                            }
                          }
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

const ModuleCard: React.FC<{ module: any; locked?: boolean; progress: number; accentGradient: string; accentBg: string; accentText: string; onClick?: () => void }> = ({ module, locked, progress, accentGradient, accentBg, accentText, onClick }) => {
  const isComplete = progress === 100;
  
  return (
    <motion.div 
      whileHover={locked ? {} : { y: -4, scale: 1.01 }}
      transition={{ type: 'tween', duration: 0.2 }}
      onClick={onClick}
      className={cn(
        "bg-white border rounded-[1.5rem] p-7 transition-all group relative overflow-hidden",
        locked 
          ? "border-zinc-200 opacity-50 grayscale cursor-not-allowed" 
          : isComplete
            ? "border-transparent shadow-lg cursor-pointer"
            : "border-zinc-200 hover:shadow-xl hover:shadow-zinc-200/60 cursor-pointer"
      )}
    >
      {/* Gradient top bar for unlocked cards */}
      {!locked && (
        <div className={cn("absolute top-0 left-6 right-6 h-1 rounded-b-full bg-gradient-to-r", accentGradient, isComplete ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity')} />
      )}
      {/* Completion glow */}
      {isComplete && !locked && (
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-[0.03]", accentGradient)} />
      )}
      
      {locked && (
        <div className="absolute top-5 right-5 text-zinc-300">
          <div className="w-9 h-9 bg-zinc-100 rounded-xl flex items-center justify-center">
            <Lock size={16} />
          </div>
        </div>
      )}
      
      <div className="space-y-5">
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
          locked 
            ? "bg-zinc-100 text-zinc-400" 
            : isComplete
              ? `bg-gradient-to-br ${accentGradient} text-white shadow-lg`
              : `${accentBg} ${accentText} group-hover:bg-gradient-to-br group-hover:${accentGradient} group-hover:text-white group-hover:shadow-lg`
        )}>
          {isComplete ? <CheckCircle2 size={24} /> : <BookOpen size={24} />}
        </div>
        
        <div>
          <h3 className="text-lg font-black mb-2 leading-tight">{module.title}</h3>
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-400">
            <span>{module.lessons?.length || 0} Pelajaran</span>
            <span className="w-1 h-1 rounded-full bg-zinc-300" />
            <span>~{(module.lessons?.length || 0) * 5} menit</span>
          </div>
        </div>

        <div className="space-y-2">
          {module.lessons?.slice(0, 3).map((lesson: any) => {
            const isCompleted = useProgress.getState().completedLessons.includes(lesson.id);
            return (
              <div key={lesson.id} className="flex items-center justify-between text-sm text-zinc-500 group-hover:text-zinc-700 transition-colors">
                <div className="flex items-center gap-2 truncate">
                  {isCompleted ? (
                    <CheckCircle2 size={14} className={accentText} />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-zinc-200" />
                  )}
                  <span className="truncate font-medium">{lesson.title}</span>
                </div>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
          {(module.lessons?.length || 0) > 3 && (
            <div className="text-[10px] font-black text-zinc-400 pt-1 uppercase tracking-wider">
              + {(module.lessons?.length || 0) - 3} pelajaran lagi
            </div>
          )}
        </div>

        {!locked && (
          <div className="pt-3">
            <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
              <motion.div 
                className={cn("h-full bg-gradient-to-r rounded-full", accentGradient)} 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            <div className="mt-2 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">{progress}% Selesai</div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
