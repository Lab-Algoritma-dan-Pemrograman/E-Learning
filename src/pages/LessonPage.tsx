import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from '../components/Layout';
import { CodeEditor } from '../components/CodeEditor';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { Quiz } from '../components/Quiz';
import { usePyodide } from '../hooks/usePyodide';
import { CheckCircle2, Lightbulb, ChevronRight, BookOpen, Menu, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useStore } from '../store/useStore';
import { completeLesson as completeLessonService } from '../services/progressService';
import { cn } from '../lib/utils';
import { getCodeHint } from '../services/aiService';
import { Sparkles, Loader2 } from 'lucide-react';

export const LessonPage: React.FC = () => {
  const { user, currentLessonId, setCurrentLessonId, curriculum } = useStore();
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [currentModuleIdx, setCurrentModuleIdx] = useState(0);
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);

  useEffect(() => {
    if (currentLessonId && curriculum.length > 0) {
      for (let l = 0; l < curriculum.length; l++) {
        for (let m = 0; m < curriculum[l].modules.length; m++) {
          const lessonIdx = curriculum[l].modules[m].lessons.findIndex(less => less.id === currentLessonId);
          if (lessonIdx !== -1) {
            setCurrentLevelIdx(l);
            setCurrentModuleIdx(m);
            setCurrentLessonIdx(lessonIdx);
            return;
          }
        }
      }
    }
  }, [currentLessonId, curriculum]);

  const [step, setStep] = useState<'learn' | 'quiz' | 'code'>('learn');
  const [code, setCode] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [aiHint, setAiHint] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const lesson = curriculum.length > 0 
    ? curriculum[currentLevelIdx]?.modules[currentModuleIdx]?.lessons[currentLessonIdx]
    : null;
  
  const { runCode, isLoading, error: pyodideError } = usePyodide();

  useEffect(() => {
    if (lesson) {
      setStep('learn');
      setCode(lesson.initialCode || lesson.codeExample);
      setIsCorrect(null);
      setShowHint(false);
      setAiHint(null);
      setIsAiLoading(false);
      setOutput('');
      setError(null);
    }
  }, [currentLevelIdx, currentModuleIdx, currentLessonIdx, lesson?.initialCode, lesson?.codeExample]);

  if (!lesson) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
        </div>
      </Layout>
    );
  }

  const handleRun = async () => {
    const result = await runCode(code);
    setOutput(result.output);
    setError(result.error);

    const success = lesson.testCases.every(tc => {
      return result.output.trim() === tc.expectedOutput.trim();
    });

    setIsCorrect(success);
    if (!success) {
      setAiHint(null); // Reset AI hint on new run if incorrect
    }
    if (success) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#6ee7b7']
      });
    }
  };

  const handleAiHint = async () => {
    if (isAiLoading) return;
    setIsAiLoading(true);
    const hint = await getCodeHint(
      lesson.title,
      lesson.explanation,
      code,
      error || output,
      lesson.testCases[0]?.expectedOutput
    );
    setAiHint(hint || null);
    setIsAiLoading(false);
    setShowHint(true);
  };

  const nextLesson = async () => {
    if (user) {
      await completeLessonService(user, lesson.id, 50);
    }
    
    // Find next lesson
    let nextId: string | null = null;
    const currentModule = curriculum[currentLevelIdx].modules[currentModuleIdx];
    
    if (currentLessonIdx < currentModule.lessons.length - 1) {
      nextId = currentModule.lessons[currentLessonIdx + 1].id;
    } else if (currentModuleIdx < curriculum[currentLevelIdx].modules.length - 1) {
      nextId = curriculum[currentLevelIdx].modules[currentModuleIdx + 1].lessons[0].id;
    } else if (currentLevelIdx < curriculum.length - 1) {
      nextId = curriculum[currentLevelIdx + 1].modules[0].lessons[0].id;
    }

    if (nextId) {
      setCurrentLessonId(nextId);
    } else {
      // Course completed!
      setShowSuccessModal(true);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Success Modal */}
        <AnimatePresence>
          {showSuccessModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[2.5rem] p-12 max-w-lg w-full shadow-2xl text-center space-y-8 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Trophy size={48} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-4xl font-black tracking-tight">Luar Biasa!</h3>
                  <p className="text-zinc-500 text-lg leading-relaxed">
                    Selamat! Anda telah menyelesaikan semua pelajaran yang tersedia di kurikulum ini. Anda telah mengambil langkah besar dalam menguasai Python!
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setShowSuccessModal(false);
                    useStore.getState().setPage('dashboard');
                  }}
                  className="w-full py-5 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-900/10 active:scale-95"
                >
                  Kembali ke Dashboard
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Header with Selector */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <BookOpen size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                Level {currentLevelIdx + 1} • {curriculum[currentLevelIdx].modules[currentModuleIdx].title}
              </div>
              <h1 className="text-xl font-bold">{lesson.title}</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-400 transition-colors">
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Progress Stepper */}
        <div className="flex items-center justify-center gap-4">
          <StepIndicator active={step === 'learn'} completed={step !== 'learn'} label="Pelajari" />
          <div className="w-12 h-px bg-zinc-200" />
          <StepIndicator active={step === 'quiz'} completed={step === 'code'} label="Kuis" />
          <div className="w-12 h-px bg-zinc-200" />
          <StepIndicator active={step === 'code'} completed={false} label="Latihan" />
        </div>

        <AnimatePresence mode="wait">
          {step === 'learn' && (
            <motion.div 
              key="learn"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 bg-emerald-50 w-fit px-3 py-1 rounded-full">
                  <BookOpen size={16} />
                  Level {currentLevelIdx + 1} • Pelajaran {currentLessonIdx + 1}
                </div>
                <h1 className="text-5xl font-black tracking-tight text-zinc-900">{lesson.title}</h1>
                <MarkdownRenderer content={lesson.explanation} />
                <button 
                  onClick={() => setStep('quiz')}
                  className="bg-zinc-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all flex items-center gap-2"
                >
                  Ikuti Kuis
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-zinc-800">
                <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4">Contoh Kode</div>
                <pre className="text-zinc-100 font-mono text-lg leading-relaxed">
                  {lesson.codeExample}
                </pre>
              </div>
            </motion.div>
          )}

          {step === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <Quiz 
                question={lesson.quiz.question}
                options={lesson.quiz.options}
                correctAnswer={lesson.quiz.correctAnswer}
                onComplete={(correct) => {
                  if (correct) setTimeout(() => setStep('code'), 1500);
                }}
              />
            </motion.div>
          )}

          {step === 'code' && (
            <motion.div 
              key="code"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-280px)]"
            >
              <div className="flex flex-col gap-6 overflow-y-auto pr-4 custom-scrollbar">
                <h2 className="text-3xl font-bold tracking-tight">Latihan Pemrograman</h2>
                <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-lg mb-4">Tugas Anda</h3>
                  <div className="space-y-4 mb-4">
                    {lesson.testCases.map((tc, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-zinc-600">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <p>{tc.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setShowHint(!showHint)}
                      className="text-sm font-medium text-zinc-500 hover:text-zinc-900 flex items-center gap-1 transition-colors"
                    >
                      <Lightbulb size={14} />
                      {showHint ? "Sembunyikan Petunjuk" : "Butuh petunjuk?"}
                    </button>
                    {(isCorrect === false || error) && (
                      <button 
                        onClick={handleAiHint}
                        disabled={isAiLoading}
                        className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors bg-emerald-50 px-3 py-1.5 rounded-lg"
                      >
                        {isAiLoading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                        Tanya AI
                      </button>
                    )}
                  </div>
                  <AnimatePresence>
                    {(showHint || aiHint) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden space-y-3"
                      >
                        {showHint && (
                          <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-xl text-sm text-amber-800 italic">
                            {lesson.hint}
                          </div>
                        )}
                        {aiHint && (
                          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-sm text-emerald-800">
                            <div className="flex items-center gap-2 mb-2 font-bold text-emerald-700">
                              <Sparkles size={14} />
                              Analisis AI
                            </div>
                            {aiHint}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex-1">
                  <CodeEditor 
                    code={code} 
                    onChange={(val) => {
                      setCode(val || '');
                      setIsCorrect(null);
                    }} 
                    onRun={handleRun}
                    isLoading={isLoading}
                  />
                </div>
                <div className="h-40 bg-zinc-900 rounded-2xl border border-zinc-800 p-4 font-mono text-sm flex flex-col">
                  <div className="flex items-center justify-between mb-2 text-zinc-500 text-xs uppercase tracking-widest font-bold">
                    <div className="flex items-center gap-2">
                      <span>Output</span>
                      {(isCorrect === false || error) && (
                        <button 
                          onClick={handleAiHint}
                          disabled={isAiLoading}
                          className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded hover:bg-emerald-400 transition-colors flex items-center gap-1"
                        >
                          {isAiLoading ? <Loader2 size={10} className="animate-spin" /> : <Sparkles size={10} />}
                          Tanya AI
                        </button>
                      )}
                    </div>
                    {isCorrect !== null && (
                      <span className={isCorrect ? "text-emerald-400" : "text-red-400"}>
                        {isCorrect ? "Berhasil!" : "Coba lagi"}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 overflow-y-auto text-zinc-100 whitespace-pre-wrap">
                    {error ? <span className="text-red-400">{error}</span> : output}
                  </div>
                </div>
                <button 
                  disabled={!isCorrect}
                  onClick={nextLesson}
                  className="w-full py-4 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-400 disabled:opacity-50 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                >
                  Selesaikan Pelajaran
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

const StepIndicator: React.FC<{ active: boolean; completed: boolean; label: string }> = ({ active, completed, label }) => (
  <div className="flex items-center gap-2">
    <div className={cn(
      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
      active ? "bg-emerald-500 text-white scale-110 shadow-lg shadow-emerald-500/20" : 
      completed ? "bg-emerald-100 text-emerald-600" : "bg-zinc-100 text-zinc-400"
    )}>
      {completed ? <CheckCircle2 size={16} /> : label[0]}
    </div>
    <span className={cn(
      "text-xs font-bold uppercase tracking-widest",
      active ? "text-zinc-900" : "text-zinc-400"
    )}>{label}</span>
  </div>
);
