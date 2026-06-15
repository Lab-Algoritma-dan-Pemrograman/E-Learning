import React from 'react';
import { Layout } from '../components/Layout';
import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { useStore } from '../store/useStore';
import { useProgress } from '../store/useProgress';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      damping: 15
    }
  }
};

const getModuleTheme = (idx: number) => {
  const themes = [
    {
      bg: 'bg-blue-50 text-fun-blue shadow-[0_4px_0_#DBEAFE] group-hover:bg-fun-blue group-hover:text-white group-hover:shadow-[0_4px_0_#0284C7]',
      icon: 'fa-book-open-reader',
      textColor: 'group-hover:text-fun-blue',
      accentBg: 'bg-blue-50',
      accentText: 'text-fun-blue'
    },
    {
      bg: 'bg-teal-50 text-fun-green shadow-[0_4px_0_#CCFBF1] group-hover:bg-fun-green group-hover:text-white group-hover:shadow-[0_4px_0_#047857]',
      icon: 'fa-laptop-code',
      textColor: 'group-hover:text-fun-green',
      accentBg: 'bg-teal-50',
      accentText: 'text-fun-green'
    },
    {
      bg: 'bg-purple-50 text-fun-purple shadow-[0_4px_0_#F3E8FF] group-hover:bg-fun-purple group-hover:text-white group-hover:shadow-[0_4px_0_#7E22CE]',
      icon: 'fa-box-archive',
      textColor: 'group-hover:text-fun-purple',
      accentBg: 'bg-purple-50',
      accentText: 'text-fun-purple'
    },
    {
      bg: 'bg-amber-50 text-fun-yellow shadow-[0_4px_0_#FEF3C7] group-hover:bg-fun-yellow group-hover:text-white group-hover:shadow-[0_4px_0_#D97706]',
      icon: 'fa-shapes',
      textColor: 'group-hover:text-fun-yellow',
      accentBg: 'bg-amber-50',
      accentText: 'text-fun-yellow'
    }
  ];
  return themes[idx % themes.length];
};

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

  const getLevelProgress = (level: any) => {
    if (!level?.modules) return 0;
    let totalLessons = 0;
    let completedInLevel = 0;
    for (const mod of level.modules) {
      if (Array.isArray(mod.lessons)) {
        totalLessons += mod.lessons.length;
        completedInLevel += mod.lessons.filter((l: any) => completedLessons.includes(l.id)).length;
      }
    }
    if (totalLessons === 0) return 0;
    return Math.round((completedInLevel / totalLessons) * 100);
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
        {/* Page Title */}
        <div className="mb-10 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-black text-maroon mb-4 tracking-tight flex items-center select-none">
            Eksplorasi Kurikulum 
            <i className="fa-solid fa-wand-magic-sparkles text-fun-yellow ml-4 text-3xl animate-pulse"></i>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed font-bold">
            Yuk mulai petualangan ngoding kamu! Pilih <span className="font-black text-python bg-blue-50 px-2 py-1 rounded-lg border border-blue-100">Python</span> untuk kemudahan dan dunia data, atau <span className="font-black text-c bg-blue-50 px-2 py-1 rounded-lg border border-blue-100">Bahasa C</span> untuk ngulik jeroan sistem lebih dalam.
          </p>
        </div>

        <div className="space-y-16">
          {curriculum.map((level, lIdx) => {
            const isLangC = level.id.startsWith('c-');
            const isLocked = isModuleLocked(lIdx, 0);
            
            const levelProgress = getLevelProgress(level);

            // Custom colors based on language
            const levelColorClass = isLocked ? 'bg-zinc-300' : (isLangC ? 'bg-fun-blue' : 'bg-rose-500');
            const levelShadowClass = isLocked ? 'shadow-[0_8px_0_#71717a]' : (isLangC ? 'shadow-[0_8px_0_#023E8A]' : 'shadow-[0_8px_0_#9F1239]');
            const tagBgClass = isLangC ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-rose-100 text-rose-700 border-rose-200';
            const bgBlobClass = isLangC ? 'bg-fun-blue/5' : 'bg-rose-500/5';
            
            return (
              <div key={level.id} className="space-y-6">
                {/* Level Section Header */}
                <div className="bg-white rounded-[2rem] p-6 shadow-soft mb-8 flex flex-col md:flex-row items-start md:items-center gap-6 border-2 border-gray-100 relative overflow-hidden group hover:border-maroon/30 transition-colors">
                  
                  {/* Decorative background patterns */}
                  <div className={cn("absolute right-0 top-0 w-32 h-32 rounded-bl-full pointer-events-none transition-all", bgBlobClass)}></div>
                  
                  <div className="flex-shrink-0 relative">
                    {/* Playful Number Badge */}
                    <div className={cn(
                      "w-20 h-20 rounded-3xl flex items-center justify-center text-white font-black text-4xl transform rotate-[-5deg] group-hover:rotate-0 transition-all cursor-pointer z-10 relative select-none",
                      levelColorClass,
                      levelShadowClass
                    )}>
                      {isLocked ? (
                        <i className="fa-solid fa-lock text-3xl"></i>
                      ) : (
                        lIdx + 1
                      )}
                    </div>
                    {/* Little sparkle */}
                    {!isLocked && (
                      <i className="fa-solid fa-star absolute -top-2 -right-2 text-fun-yellow text-xl z-20 animate-pulse"></i>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h2 className="text-2xl font-black text-dark tracking-tight uppercase leading-snug">
                        {level.title}
                      </h2>
                      {isLocked && (
                        <span className="bg-zinc-100 text-zinc-500 text-[10px] font-black px-2.5 py-1 rounded-xl border border-zinc-200 uppercase tracking-widest">
                          Terkunci
                        </span>
                      )}
                      <span className={cn("text-xs font-black px-3 py-1.5 rounded-xl border-2 uppercase tracking-wide", tagBgClass)}>
                        {isLangC ? 'Bahasa C' : 'Python'}
                      </span>
                    </div>
                    <p className="text-gray-500 font-bold bg-gray-50 inline-block px-3 py-1 rounded-lg text-sm border border-gray-100">
                      {level.description}
                    </p>
                  </div>
                  
                  {/* Overall Level Progress Card */}
                  {!isLocked && (
                    <div className="md:w-56 w-full bg-maroon-bg p-4 rounded-2xl border-2 border-maroon/10 flex flex-col items-center justify-center relative overflow-hidden select-none">
                      <div className="text-xs font-black text-maroon/70 uppercase mb-1 tracking-widest z-10">Progres Level</div>
                      <div className="flex items-baseline space-x-1 z-10">
                        <span className="text-3xl font-black text-maroon">{levelProgress}%</span>
                        <span className="text-sm font-bold text-maroon/70">Selesai</span>
                      </div>
                      {/* Progress Bar Container */}
                      <div className="w-full h-3 bg-white rounded-full mt-3 overflow-hidden border border-maroon/20 z-10 shadow-inner">
                        <div 
                          className="h-full bg-maroon rounded-full relative transition-all duration-500"
                          style={{ width: `${levelProgress}%` }}
                        >
                          {/* Shine effect on progress bar */}
                          <div className="absolute top-0 left-0 right-0 h-1 bg-white/30 rounded-t-full"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Cards Grid */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {(level.modules || []).map((module, mIdx) => {
                    const locked = isModuleLocked(lIdx, mIdx);
                    const progress = getModuleProgress(module);
                    return (
                      <ModuleCard 
                        key={module.id} 
                        module={module} 
                        locked={locked}
                        progress={progress}
                        isLangC={isLangC}
                        cardIndex={mIdx}
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
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

const ModuleCard: React.FC<{ 
  module: any; 
  locked?: boolean; 
  progress: number; 
  isLangC: boolean;
  cardIndex: number;
  onClick?: () => void 
}> = ({ module, locked, progress, isLangC, cardIndex, onClick }) => {
  const isComplete = progress === 100;
  const { completedLessons } = useProgress();
  const { setCurrentLessonId, setPage } = useStore();
  
  // Get themed styles for this module index
  const theme = getModuleTheme(cardIndex);

  return (
    <motion.div 
      variants={cardVariants}
      whileHover={locked ? {} : { y: -6 }}
      onClick={onClick}
      className={cn(
        "bg-white rounded-[2rem] p-7 shadow-soft border-2 border-gray-100 flex flex-col h-full relative overflow-hidden group select-none transition-colors duration-300",
        locked 
          ? "opacity-50 grayscale cursor-not-allowed bg-zinc-50 border-zinc-200" 
          : "card-hover cursor-pointer hover:border-maroon/20"
      )}
    >
      {/* Locked overlay lock icon */}
      {locked && (
        <div className="absolute top-5 right-5 text-zinc-400 z-20">
          <div className="w-9 h-9 bg-zinc-100 rounded-xl flex items-center justify-center border border-zinc-200 shadow-sm">
            <Lock size={16} />
          </div>
        </div>
      )}
      
      <div className="mb-5 flex justify-between items-start mt-2">
        {/* Bubbly Icon */}
        <div className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 transform group-hover:scale-110",
          locked 
            ? "bg-zinc-100 text-zinc-400" 
            : theme.bg,
          cardIndex % 2 === 0 ? "group-hover:-rotate-6" : "group-hover:rotate-6"
        )}>
          <i className={cn("fa-solid", locked ? "fa-lock-open" : theme.icon)}></i>
        </div>
      </div>
      
      <h3 className={cn(
        "text-xl font-black text-dark mb-3 leading-tight transition-colors",
        locked ? "" : theme.textColor
      )}>
        {module.title}
      </h3>
      
      {/* Badges */}
      <div className="flex items-center text-xs font-bold text-gray-500 mb-6 space-x-2">
        <span className="bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100 flex items-center text-gray-600">
          <i className="fa-solid fa-list-ul mr-1.5 text-fun-yellow"></i> 
          {module.lessons?.length || 0} Pelajaran
        </span>
        <span className="bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100 flex items-center text-gray-600">
          <i className="fa-solid fa-clock mr-1.5 text-fun-blue"></i> 
          ~{(module.lessons?.length || 0) * 5} mnt
        </span>
      </div>
      
      {/* Custom Checkbox Indicators */}
      <div className="space-y-4 flex-1 mb-6">
        {module.lessons?.slice(0, 3).map((lesson: any) => {
          const isCompleted = completedLessons.includes(lesson.id);
          return (
            <div 
              key={lesson.id} 
              onClick={(e) => {
                e.stopPropagation();
                if (locked) return;
                setCurrentLessonId(lesson.id);
                setPage('lesson');
              }}
              className={cn(
                "flex items-start space-x-3 group/item",
                locked ? "cursor-not-allowed" : "cursor-pointer"
              )}
            >
              <div className="relative w-6 h-6 mt-0.5 flex-shrink-0">
                <div className={cn(
                  "w-6 h-6 border-2 rounded-full flex items-center justify-center transition-all bg-white shadow-sm group-hover/item:scale-110",
                  isCompleted 
                    ? "bg-fun-green border-fun-green text-white" 
                    : "border-gray-300 group-hover/item:border-maroon/50"
                )}>
                  <svg 
                    className={cn(
                      "w-3.5 h-3.5 text-white transition-all duration-200", 
                      isCompleted ? "opacity-100 scale-100" : "opacity-0 scale-50"
                    )} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <span className={cn(
                "text-sm font-bold transition-colors pt-0.5 truncate",
                locked 
                  ? "text-zinc-400" 
                  : "text-gray-600 group-hover/item:text-maroon group-hover/item:underline"
              )}>
                {lesson.title}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-auto">
        {(module.lessons?.length || 0) > 3 ? (
          <button className={cn(
            "text-xs font-black uppercase tracking-widest mb-5 transition-colors px-3 py-1.5 rounded-lg w-full text-left",
            locked
              ? "text-zinc-400 bg-zinc-100"
              : isLangC 
                ? "text-fun-blue bg-blue-50 hover:bg-blue-100" 
                : "text-rose-700 bg-rose-50 hover:bg-rose-100"
          )}>
            + {(module.lessons?.length || 0) - 3} PELAJARAN LAGI
          </button>
        ) : (
          <div className="h-[34px] mb-5"></div>
        )}
        
        <div className="pt-5 border-t-2 border-dashed border-gray-100 flex items-center justify-between">
          <span className="text-xs font-black text-gray-400 tracking-widest uppercase bg-gray-50 px-3 py-1 rounded-full">
            {progress}% Selesai
          </span>
          <button 
            onClick={locked ? undefined : onClick}
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-sm cursor-pointer",
              locked 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : isComplete
                  ? "bg-fun-green hover:bg-emerald-600 text-white shadow-bubbly hover:-translate-y-1"
                  : "bg-gray-100 hover:bg-maroon text-gray-500 hover:text-white hover:shadow-bubbly-maroon transform hover:-translate-y-1"
            )}
          >
            {isComplete ? (
              <i className="fa-solid fa-check text-lg"></i>
            ) : (
              <i className="fa-solid fa-play ml-0.5 text-sm"></i>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
