import React from 'react';
import { Layout } from '../components/Layout';
import { curriculum } from '../data/curriculum';
import { BookOpen, ChevronRight, Lock, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useStore } from '../store/useStore';

export const CourseExplorer: React.FC = () => {
  const { setPage, setCurrentLessonId } = useStore();

  return (
    <Layout>
      <div className="space-y-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-black tracking-tight mb-4">Kurikulum Kursus</h1>
          <p className="text-xl text-zinc-500">
            Dari nol menjadi pahlawan. Ikuti jalur terstruktur kami untuk menguasai Python, Sains Data, dan Pembelajaran Mesin.
          </p>
        </div>

        <div className="space-y-16">
          {curriculum.map((level, idx) => (
            <div key={level.id} className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-900 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-xl shadow-zinc-900/10">
                  {idx + 1}
                </div>
                <div>
                  <h2 className="text-2xl font-black">{level.title}</h2>
                  <p className="text-zinc-500">{level.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {level.modules.map((module) => (
                  <ModuleCard 
                    key={module.id} 
                    module={module} 
                    locked={idx > 0} 
                    onClick={() => {
                      if (idx === 0) {
                        setCurrentLessonId(module.lessons[0].id);
                        setPage('lesson');
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

const ModuleCard: React.FC<{ module: any; locked?: boolean; onClick?: () => void }> = ({ module, locked, onClick }) => (
  <div 
    onClick={onClick}
    className={cn(
      "bg-white border border-zinc-200 rounded-[2rem] p-8 transition-all group relative overflow-hidden",
      locked ? "opacity-60 grayscale" : "hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-500/5 cursor-pointer"
    )}
  >
    {locked && (
      <div className="absolute top-6 right-6 text-zinc-400">
        <Lock size={20} />
      </div>
    )}
    
    <div className="space-y-6">
      <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
        <BookOpen size={24} />
      </div>
      
      <div>
        <h3 className="text-xl font-black mb-2">{module.title}</h3>
        <div className="flex items-center gap-2 text-sm font-bold text-zinc-400">
          <span>{module.lessons.length} Pelajaran</span>
          <span>•</span>
          <span>~{module.lessons.length * 5} menit</span>
        </div>
      </div>

      <div className="space-y-3">
        {module.lessons.slice(0, 3).map((lesson: any) => (
          <div key={lesson.id} className="flex items-center justify-between text-sm text-zinc-500 group-hover:text-zinc-700 transition-colors">
            <span className="truncate">{lesson.title}</span>
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
        {module.lessons.length > 3 && (
          <div className="text-xs font-bold text-zinc-400 pt-2">
            + {module.lessons.length - 3} pelajaran lagi
          </div>
        )}
      </div>

      {!locked && (
        <div className="pt-4">
          <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
            <div className="w-0 h-full bg-emerald-500 rounded-full transition-all duration-1000 group-hover:w-1/4" />
          </div>
          <div className="mt-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest">0% Selesai</div>
        </div>
      )}
    </div>
  </div>
);
