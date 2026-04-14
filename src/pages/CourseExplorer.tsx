import React from 'react';
import { Layout } from '../components/Layout';
import { BookOpen, ChevronRight, Lock, CheckCircle2, ArrowLeft } from 'lucide-react';
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

    if (levelIdx === 0 && moduleIdx === 0) return false;
    
    // Get previous module
    let prevLevelIdx = levelIdx;
    let prevModuleIdx = moduleIdx - 1;
    
    if (prevModuleIdx < 0) {
      prevLevelIdx = levelIdx - 1;
      if (prevLevelIdx < 0) return false;
      prevModuleIdx = (curriculum[prevLevelIdx]?.modules?.length || 0) - 1;
    }
    
    if (prevModuleIdx < 0) return false;

    const prevModule = curriculum[prevLevelIdx]?.modules?.[prevModuleIdx];
    if (!prevModule) return false;

    const allLessonsCompleted = prevModule.lessons?.every(lesson => 
      completedLessons.includes(lesson.id)
    ) || false;
    
    return !allLessonsCompleted;
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
          <h1 className="text-4xl font-black tracking-tight mb-4">Kurikulum Kursus</h1>
          <p className="text-xl text-zinc-500">
            Dari nol menjadi pahlawan. Ikuti jalur terstruktur kami untuk menguasai Python, Sains Data, dan Pembelajaran Mesin.
          </p>
        </div>

        <div className="space-y-16">
          {curriculum.map((level, lIdx) => (
            <div key={level.id} className="space-y-8">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-xl",
                  isModuleLocked(lIdx, 0)
                    ? "bg-zinc-400 text-white shadow-zinc-400/10" 
                    : "bg-zinc-900 text-white shadow-zinc-900/10"
                )}>
                  {isModuleLocked(lIdx, 0) ? <Lock size={20} /> : lIdx + 1}
                </div>
                <div>
                  <h2 className="text-2xl font-black flex items-center gap-2">
                    {level.title}
                    {isModuleLocked(lIdx, 0) && (
                      <span className="text-xs font-bold text-zinc-400 bg-zinc-100 px-2 py-1 rounded-lg uppercase tracking-wider">
                        Terkunci
                      </span>
                    )}
                  </h2>
                  <p className="text-zinc-500">{level.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(level.modules || []).map((module, mIdx) => {
                  const locked = isModuleLocked(lIdx, mIdx);
                  const progress = getModuleProgress(module);
                  return (
                    <ModuleCard 
                      key={module.id} 
                      module={module} 
                      locked={locked}
                      progress={progress}
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
          ))}
        </div>
      </div>
    </Layout>
  );
};

const ModuleCard: React.FC<{ module: any; locked?: boolean; progress: number; onClick?: () => void }> = ({ module, locked, progress, onClick }) => (
  <div 
    onClick={onClick}
    className={cn(
      "bg-white border border-zinc-200 rounded-[2rem] p-8 transition-all group relative overflow-hidden",
      locked ? "opacity-60 grayscale cursor-not-allowed" : "hover:border-rose-200 hover:shadow-2xl hover:shadow-rose-700/5 cursor-pointer"
    )}
  >
    {locked && (
      <div className="absolute top-6 right-6 text-zinc-400">
        <Lock size={20} />
      </div>
    )}
    
    <div className="space-y-6">
      <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:bg-rose-50 group-hover:text-rose-700 transition-colors">
        <BookOpen size={24} />
      </div>
      
      <div>
        <h3 className="text-xl font-black mb-2">{module.title}</h3>
        <div className="flex items-center gap-2 text-sm font-bold text-zinc-400">
          <span>{module.lessons?.length || 0} Pelajaran</span>
          <span>•</span>
          <span>~{(module.lessons?.length || 0) * 5} menit</span>
        </div>
      </div>

      <div className="space-y-3">
        {module.lessons?.slice(0, 3).map((lesson: any) => {
          const isCompleted = useProgress.getState().completedLessons.includes(lesson.id);
          return (
            <div key={lesson.id} className="flex items-center justify-between text-sm text-zinc-500 group-hover:text-zinc-700 transition-colors">
              <div className="flex items-center gap-2 truncate">
                {isCompleted ? <CheckCircle2 size={14} className="text-rose-700" /> : <div className="w-3.5 h-3.5" />}
                <span className="truncate">{lesson.title}</span>
              </div>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          );
        })}
        {(module.lessons?.length || 0) > 3 && (
          <div className="text-xs font-bold text-zinc-400 pt-2">
            + {(module.lessons?.length || 0) - 3} pelajaran lagi
          </div>
        )}
      </div>

      {!locked && (
        <div className="pt-4">
          <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
            <div className="h-full bg-rose-700 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest">{progress}% Selesai</div>
        </div>
      )}
    </div>
  </div>
);
