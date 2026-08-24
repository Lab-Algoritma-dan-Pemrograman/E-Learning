import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from '../components/Layout';
import { CodeEditor } from '../components/CodeEditor';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { RichTextRenderer } from '../components/RichTextRenderer';
import { Quiz } from '../components/Quiz';
import { preprocessCode } from '../lib/codePreprocessor';
import { playCodeCorrectSound, playCodeWrongSound, playLessonCompleteSound } from '../lib/soundEffects';

import { CheckCircle2, Lightbulb, ChevronRight, ChevronLeft, BookOpen, Menu, Trophy, ArrowLeft, X, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useStore } from '../store/useStore';
import { useProgress } from '../store/useProgress';
import { completeLesson as completeLessonService, grantXp } from '../services/progressService';
import { cn } from '../lib/utils';
import { useCodeRunner, detectLanguage, CodeLanguage } from '../hooks/useCodeRunner';
import { Loader2, AlertTriangle } from 'lucide-react';
import { parseOutputWithImages } from '../utils/parseOutputWithImages';
import { PlotDisplay } from '../components/PlotDisplay';

/**
 * Normalize output for flexible comparison:
 * - Trim whitespace at start/end
 * - Remove trailing empty lines
 * - Normalize multiple spaces to single space per line
 * - Remove trailing whitespace per line
 * - Case-insensitive (lowercase)
 */
function normalizeOutput(text: string): string {
  return text
    .trim()
    .split('\n')
    .map(line => line.trimEnd().replace(/\s+/g, ' '))
    .filter((line, idx, arr) => {
      // Remove trailing empty lines only
      if (line === '') {
        // Check if all remaining lines are also empty
        return arr.slice(idx).some(l => l !== '');
      }
      return true;
    })
    .join('\n')
    .toLowerCase();
}

export const LessonPage: React.FC = () => {
  const { user, currentLessonId, setCurrentLessonId, curriculum, setPage, setUnlockedAchievement } = useStore();
  const { completedLessons } = useProgress();
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [currentModuleIdx, setCurrentModuleIdx] = useState(0);
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);

  // Check if a level is locked (auto mode: all previous levels must be fully completed)
  const isLevelLocked = (levelIdx: number): boolean => {
    const level = curriculum[levelIdx];
    if (!level) return true;

    // Per-user override
    const userOverride = user?.levelAccessOverrides?.[level.id];
    if (userOverride && userOverride !== 'auto') return userOverride === 'locked';

    // Explicit access mode
    if (level.accessMode === 'locked') return true;
    if (level.accessMode === 'unlocked') return false;

    // Legacy locked field (only true locks; false is the DB default, don't use it to force-unlock)
    if (level.locked === true) return true;

    // Auto: first level is always unlocked
    if (levelIdx === 0) return false;

    // Auto: ALL previous levels must be fully completed
    for (let i = 0; i < levelIdx; i++) {
      const prevLevel = curriculum[i];
      if (!prevLevel) continue;
      for (const mod of (prevLevel.modules || [])) {
        for (const les of (mod.lessons || [])) {
          if (!completedLessons.includes(les.id)) {
            return true;
          }
        }
      }
    }
    return false;
  };

  useEffect(() => {
    if (currentLessonId && curriculum.length > 0) {
      for (let l = 0; l < curriculum.length; l++) {
        const modules = curriculum[l]?.modules || [];
        for (let m = 0; m < modules.length; m++) {
          const lessons = modules[m]?.lessons || [];
          const lessonIdx = lessons.findIndex(less => less.id === currentLessonId);
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLessonNav, setShowLessonNav] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [quizXpGranted, setQuizXpGranted] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const scrollToActiveLesson = () => {
    setTimeout(() => {
      const container = document.getElementById('lesson-drawer-scroll-container');
      const activeItem = container?.querySelector('.active-lesson-item') as HTMLElement;
      if (container && activeItem) {
        const containerRect = container.getBoundingClientRect();
        const activeRect = activeItem.getBoundingClientRect();
        const relativeTop = activeRect.top - containerRect.top + container.scrollTop;
        const targetScrollTop = relativeTop - (containerRect.height / 2) + (activeRect.height / 2);
        
        container.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth'
        });
      } else {
        const activeItemFallback = document.querySelector('.active-lesson-item');
        if (activeItemFallback) {
          activeItemFallback.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }, 150);
  };

  // Auto-scroll to current active lesson item when drawer opens
  useEffect(() => {
    if (showLessonNav) {
      scrollToActiveLesson();
    }
  }, [showLessonNav]);

  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  // States for the interactive Sandbox in the Learn (Pelajari) step
  const [sandboxCode, setSandboxCode] = useState('');
  const [sandboxOutput, setSandboxOutput] = useState('');
  const [sandboxError, setSandboxError] = useState<string | null>(null);
  const [isSandboxRunning, setIsSandboxRunning] = useState(false);
  const [sandboxInput, setSandboxInput] = useState('');

  const handleSandboxRun = async () => {
    setIsSandboxRunning(true);
    setSandboxError(null);
    setSandboxOutput('');
    try {
      const result = await runCode(sandboxCode, sandboxInput || undefined);
      setSandboxOutput(result.output);
      setSandboxError(result.error);
    } catch (err: any) {
      setSandboxError(err.message || 'Error running code');
    } finally {
      setIsSandboxRunning(false);
    }
  };

  const lesson = curriculum.length > 0 
    ? curriculum[currentLevelIdx]?.modules?.[currentModuleIdx]?.lessons?.[currentLessonIdx]
    : null;
  
  const currentLevel = curriculum[currentLevelIdx];
  
  // Deteksi bahasa pelajaran:
  // 1. Properti `language` eksplisit pada level / lesson jika ada
  // 2. Deteksi otomatis dari isi kode template/jawaban
  // 3. Fallback berdasarkan prefix ID Level ('c-' vs 'py-')
  const lessonLanguage: CodeLanguage = (() => {
    const explicitLang = (currentLevel as any)?.language || (lesson as any)?.language;
    if (explicitLang === 'c' || explicitLang === 'python') {
      return explicitLang;
    }
    const sampleCode = code || lesson?.initialCode || lesson?.codeExample || '';
    if (sampleCode.trim().length > 0) {
      return detectLanguage(sampleCode);
    }
    return currentLevel?.id.startsWith('c-') ? 'c' : 'python';
  })();
  
  const { runCode, isLoading, error: runnerError } = useCodeRunner(lessonLanguage);

  useEffect(() => {
    if (lesson) {
      // Resume at last step if lesson is partially done (not fully completed)
      const isLessonDone = completedLessons.includes(lesson.id);
      if (isLessonDone) {
        setStep('learn'); // Review mode — always reset code to template
        setCode(lesson.initialCode || lesson.codeExample);
      } else {
        const savedStep = localStorage.getItem(`lesson-step:${lesson.id}`) as 'learn' | 'quiz' | 'code' | null;
        setStep(savedStep || 'learn');
        // Resume saved code from localStorage (auto-save), fallback to template
        const savedCode = localStorage.getItem(`lesson-code:${lesson.id}`);
        setCode(savedCode ?? (lesson.initialCode || lesson.codeExample));
      }
      setIsCorrect(null);
      setShowHint(false);
      setOutput('');
      setError(null);
      setQuizXpGranted(false);
      
      // Initialize sandbox states
      setSandboxCode(lesson.codeExample || '');
      setSandboxOutput('');
      setSandboxError(null);
    }
  }, [currentLevelIdx, currentModuleIdx, currentLessonIdx, lesson?.id, lesson?.initialCode, lesson?.codeExample]);

  if (!lesson) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-rose-700" />
        </div>
      </Layout>
    );
  }

  const isLessonDone = completedLessons.includes(lesson.id);
  const isQuizPassed = isLessonDone || quizXpGranted;


  const handleRun = async () => {
    // Collect stdin from the first test case that has an input field
    const firstInput = lesson.testCases?.find(tc => tc.input)?.input || undefined;
    const result = await runCode(code, firstInput);
    setOutput(result.output);
    setError(result.error);

    // If there's a compiler/runtime error, stop here
    if (result.error) return;

    // Static code validation (non-AI)
    if (lesson.validationRules && lesson.validationRules.length > 0) {
      for (const rule of lesson.validationRules) {
        try {
          // Bersihkan komentar dan string literal (bila dikonfigurasi) dari kode siswa
          const cleanCode = preprocessCode(code, lessonLanguage, {
            stripComments: true,
            stripStrings: rule.stripStrings
          });

          const regex = new RegExp(rule.pattern, rule.flags || 'im');
          const exists = regex.test(cleanCode);
          
          if (rule.shouldExist && !exists) {
            setError(rule.message);
            setIsCorrect(false);
            return;
          }
          
          if (!rule.shouldExist && exists) {
            setError(rule.message);
            setIsCorrect(false);
            return;
          }
        } catch (e) {
          console.error('Invalid regex pattern:', rule.pattern);
        }
      }
    }

    // Validate test cases — re-run with each test case's stdin if inputs differ
    const inputsNeeded = lesson.testCases.filter(tc => tc.input);
    let allPassed = true;

    // Use clean text (stripped of __IMAGE_DATA__ base64 plot strings) for test case output comparison
    const cleanOutputForValidation = parseOutputWithImages(result.output).cleanText;

    if (inputsNeeded.length <= 1) {
      // Single or no stdin — use the first run's output
      allPassed = lesson.testCases.every(tc => {
        return normalizeOutput(cleanOutputForValidation) === normalizeOutput(tc.expectedOutput);
      });
    } else {
      // Multiple test cases with different stdin — run each separately
      for (const tc of lesson.testCases) {
        const tcResult = tc.input ? await runCode(code, tc.input) : result;
        const cleanTcOutput = parseOutputWithImages(tcResult.output).cleanText;
        if (tcResult.error || normalizeOutput(cleanTcOutput) !== normalizeOutput(tc.expectedOutput)) {
          allPassed = false;
          if (tcResult.error) setError(tcResult.error);
          break;
        }
      }
    }

    setIsCorrect(allPassed);
    if (allPassed) {
      playCodeCorrectSound();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#9f1239', '#e11d48', '#fb7185']
      });
    } else {
      playCodeWrongSound();
    }
  };



  const nextLesson = async () => {
    if (!isQuizPassed) {
      alert("Harap selesaikan kuis terlebih dahulu!");
      return;
    }
    if (isCompleting) return;
    setIsCompleting(true);
    
    try {
      if (user) {
        playLessonCompleteSound();
        const newlyUnlocked = await completeLessonService(user, lesson.id, 35, curriculum, completedLessons);
        if (newlyUnlocked && newlyUnlocked.length > 0) {
          setUnlockedAchievement(newlyUnlocked[0]);
        }
      }
      
      // Find next lesson (same module or next module in same level)
      let nextId: string | null = null;
      const currentLevel = curriculum[currentLevelIdx];
      const currentModule = currentLevel?.modules?.[currentModuleIdx];
      
      if (currentModule && currentLessonIdx < (currentModule.lessons?.length || 0) - 1) {
        nextId = currentModule.lessons[currentLessonIdx + 1].id;
      } else if (currentLevel && currentModuleIdx < (currentLevel.modules?.length || 0) - 1) {
        nextId = currentLevel.modules[currentModuleIdx + 1]?.lessons?.[0]?.id || null;
      } else {
        // Find next UNLOCKED level (using proper auto-mode evaluation)
        for (let i = currentLevelIdx + 1; i < curriculum.length; i++) {
          if (!isLevelLocked(i)) {
            nextId = curriculum[i].modules?.[0]?.lessons?.[0]?.id || null;
            break;
          }
        }
      }

      if (nextId) {
        // Advance global checkpoint to the next lesson so Dashboard resumes there
        localStorage.setItem('last-lesson-checkpoint', JSON.stringify({
          lessonId: nextId,
          step: 'learn',
          timestamp: Date.now()
        }));
        // Clean up per-lesson step and code for the completed lesson
        localStorage.removeItem(`lesson-step:${lesson.id}`);
        localStorage.removeItem(`lesson-code:${lesson.id}`);
        setCurrentLessonId(nextId);
      } else {
        // Course completed! Clear checkpoint
        localStorage.removeItem('last-lesson-checkpoint');
        localStorage.removeItem(`lesson-step:${lesson.id}`);
        localStorage.removeItem(`lesson-code:${lesson.id}`);
        setShowSuccessModal(true);
      }
    } catch (err) {
      console.error('Error completing lesson:', err);
    } finally {
      setIsCompleting(false);
    }
  };

  const getAdjacentLessonId = (direction: 'prev' | 'next'): string | null => {
    const allLessons: { id: string; levelIdx: number }[] = [];
    for (let li = 0; li < curriculum.length; li++) {
      for (const mod of (curriculum[li].modules || [])) {
        for (const l of (mod.lessons || [])) {
          allLessons.push({ id: l.id, levelIdx: li });
        }
      }
    }
    const currentIdx = allLessons.findIndex(x => x.id === currentLessonId);
    if (currentIdx === -1) return null;
    if (direction === 'prev' && currentIdx > 0) return allLessons[currentIdx - 1].id;
    if (direction === 'next' && currentIdx < allLessons.length - 1) {
      const nextEntry = allLessons[currentIdx + 1];
      // Block navigation to a lesson in a locked level
      if (isLevelLocked(nextEntry.levelIdx)) return null;
      return nextEntry.id;
    }
    return null;
  };

  const prevLessonId = getAdjacentLessonId('prev');
  const nextLessonId = getAdjacentLessonId('next');

  // Step-aware navigation: order is learn → quiz → code
  const stepOrder: ('learn' | 'quiz' | 'code')[] = ['learn', 'quiz', 'code'];

  // Save step progress to localStorage for resume feature
  useEffect(() => {
    if (lesson) {
      if (!isLessonDone) {
        // Save per-lesson step for within-lesson resume
        localStorage.setItem(`lesson-step:${lesson.id}`, step);
        // Save global checkpoint for Dashboard "Continue Learning" resume
        localStorage.setItem('last-lesson-checkpoint', JSON.stringify({
          lessonId: lesson.id,
          step: step,
          timestamp: Date.now()
        }));
      }
    }
  }, [step, lesson?.id, completedLessons]);

  // Auto-save code editor content to localStorage (debounced via React's batching)
  useEffect(() => {
    if (lesson && !completedLessons.includes(lesson.id)) {
      localStorage.setItem(`lesson-code:${lesson.id}`, code);
    }
  }, [code, lesson?.id, completedLessons]);

  const handlePrev = () => {
    const currentStepIdx = stepOrder.indexOf(step);
    if (currentStepIdx > 0) {
      // Move to previous step within same lesson
      setStep(stepOrder[currentStepIdx - 1]);
    } else if (prevLessonId) {
      // On first step (learn) → go to last step (code) of previous lesson
      setCurrentLessonId(prevLessonId);
      setStep('code');
    }
  };

  const handleNext = () => {
    const currentStepIdx = stepOrder.indexOf(step);
    if (currentStepIdx < stepOrder.length - 1) {
      // Move to next step within same lesson
      setStep(stepOrder[currentStepIdx + 1]);
    } else if (nextLessonId) {
      // On last step (code) → go to first step (learn) of next lesson
      setCurrentLessonId(nextLessonId);
      setStep('learn');
    }
  };

  // Determine if prev/next are available
  const canGoPrev = stepOrder.indexOf(step) > 0 || !!prevLessonId;
  const canGoNext = stepOrder.indexOf(step) < stepOrder.length - 1 || !!nextLessonId;

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
                <div className="absolute top-0 left-0 w-full h-2 bg-rose-700" />
                <div className="w-24 h-24 bg-rose-100 text-rose-700 rounded-3xl flex items-center justify-center mx-auto mb-6">
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

        {/* Reset Confirm Modal */}
        <AnimatePresence>
          {showResetConfirm && (
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
                className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl relative border border-zinc-100 flex flex-col items-center text-center mt-8"
              >
                {/* Floating Alert Badges */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-rose-50 border-4 border-white rounded-full flex items-center justify-center shadow-lg">
                  <AlertTriangle className="text-amber-500 w-10 h-10" />
                </div>
                
                <div className="mt-8 space-y-3 w-full">
                  <h3 className="text-2xl font-black tracking-tight text-zinc-900">Reset Kode?</h3>
                  <p className="text-sm text-zinc-500 font-semibold leading-relaxed">
                    Apakah kamu yakin ingin mereset kode ke pengaturan awal?
                  </p>
                  <p className="text-sm text-red-500 font-extrabold">
                    Semua perubahanmu di pelajaran ini akan hilang.
                  </p>
                </div>
                
                <div className="flex gap-3 w-full mt-8">
                  <button 
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 py-3.5 bg-zinc-50 border border-zinc-200 text-zinc-650 font-black rounded-2xl text-sm transition-all hover:bg-zinc-100"
                  >
                    Batal
                  </button>
                  <button 
                    onClick={() => {
                      const defaultCode = lesson.initialCode || lesson.codeExample || '';
                      setCode(defaultCode);
                      localStorage.removeItem(`lesson-code:${lesson.id}`);
                      setOutput('');
                      setError(null);
                      setIsCorrect(null);
                      setShowResetConfirm(false);
                    }}
                    className="flex-1 py-3.5 bg-red-600 border-b-4 border-red-700 text-white font-black rounded-2xl text-sm shadow-md shadow-red-500/10 active:border-b-0 active:translate-y-[4px] transition-all hover:bg-red-700"
                  >
                    Ya, Reset!
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lesson Navigation Drawer */}
        <AnimatePresence>
          {showLessonNav && (
            <>
              {/* Dark overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm z-[60]"
                onClick={() => setShowLessonNav(false)}
              />
              {/* Drawer Container */}
              <motion.div
                initial={{ x: 340 }}
                animate={{ x: 0 }}
                exit={{ x: 340 }}
                transition={{ type: 'spring', damping: 24, stiffness: 280 }}
                onAnimationComplete={scrollToActiveLesson}
                className="fixed top-0 right-0 bottom-0 w-85 bg-white border-l border-zinc-200 z-[70] flex flex-col shadow-2xl overflow-hidden rounded-l-[2.5rem]"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-zinc-100 bg-zinc-50/50">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-rose-700/10 text-rose-700 rounded-lg flex items-center justify-center">
                      <BookOpen size={18} />
                    </div>
                    <span className="font-black text-zinc-850 text-base tracking-tight">Kurikulum Belajar</span>
                  </div>
                  <button 
                    onClick={() => setShowLessonNav(false)} 
                    className="p-2 hover:bg-zinc-200/50 text-zinc-500 hover:text-zinc-800 rounded-xl transition-colors border border-transparent hover:border-zinc-200"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                {/* List Body */}
                <div id="lesson-drawer-scroll-container" className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-white">
                  {curriculum.map((level, lIdx) => {
                    const isLvlLocked = isLevelLocked(lIdx);
                    const isLvlActive = lIdx === currentLevelIdx;
                    return (
                      <div 
                        key={level.id}
                        className={cn(
                          "bg-zinc-50/40 border border-zinc-150 rounded-[1.75rem] p-5 transition-all duration-300 relative overflow-hidden",
                          isLvlActive ? "border-rose-200 bg-rose-50/10 shadow-md shadow-rose-500/5" : "hover:border-zinc-300"
                        )}
                      >
                        {/* 3D Level Badge Header */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className={cn(
                            "w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shadow-sm border transition-all",
                            isLvlActive 
                              ? "bg-rose-700 text-white border-rose-600 shadow-rose-700/20 active:scale-95" 
                              : "bg-white text-zinc-500 border-zinc-200"
                          )}>
                            {isLvlLocked ? <Lock size={12} /> : lIdx + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[9px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1">Level {lIdx + 1}</div>
                            <h4 className="text-xs font-bold text-zinc-800 truncate">{level.title}</h4>
                          </div>
                        </div>

                        {/* Modules list */}
                        {!isLvlLocked ? (
                          <div className="space-y-4 pt-1">
                            {(level.modules || []).map((mod) => (
                              <div key={mod.id} className="relative pl-3">
                                {/* Module Title */}
                                <div className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 shrink-0" />
                                  <span className="truncate">{mod.title}</span>
                                </div>
                                
                                {/* Lessons list with connecting lines */}
                                <div className="space-y-1.5 border-l border-zinc-200 pl-3 ml-0.5 relative">
                                  {(mod.lessons || []).map((les) => {
                                    const isActive = les.id === currentLessonId;
                                    const isDone = completedLessons.includes(les.id);
                                    return (
                                      <button
                                        key={les.id}
                                        onClick={() => {
                                          setCurrentLessonId(les.id);
                                          setShowLessonNav(false);
                                        }}
                                        className={cn(
                                          "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs transition-all relative group border border-transparent",
                                          isActive
                                            ? "bg-gradient-to-r from-rose-700 to-rose-600 text-white font-bold shadow-md shadow-rose-700/25 border-b-2 border-rose-800 scale-[1.02] -translate-y-[1px] active-lesson-item"
                                            : isDone
                                              ? "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100/70 hover:translate-x-0.5"
                                              : "text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/70 hover:translate-x-0.5"
                                        )}
                                      >
                                        {/* Status Dot / Check */}
                                        {isDone ? (
                                          <CheckCircle2 size={13} className={cn("shrink-0", isActive ? "text-white" : "text-rose-700")} />
                                        ) : isActive ? (
                                          <span className="relative flex h-2 w-2 shrink-0 my-0.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-200 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                          </span>
                                        ) : (
                                          <div className="w-2 h-2 rounded-full border border-zinc-300 shrink-0 bg-white group-hover:border-zinc-400" />
                                        )}
                                        <span className="truncate flex-1">{les.title}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-[10px] text-zinc-400 italic flex items-center gap-1.5 pt-1 pl-1">
                            <Lock size={10} />
                            Selesaikan level sebelumnya untuk membuka
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {/* Footer Back button */}
                <div className="p-5 border-t border-zinc-100 bg-zinc-50/50">
                  <button
                    onClick={() => { setShowLessonNav(false); setPage('courses'); }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-zinc-100 text-zinc-700 font-bold rounded-2xl hover:bg-zinc-200/80 transition-all text-xs uppercase tracking-wider"
                  >
                    <ArrowLeft size={14} />
                    Kembali ke Belajar
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Header with Selector */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPage('courses')}
              className="w-10 h-10 bg-rose-50 text-rose-700 rounded-xl flex items-center justify-center hover:bg-rose-100 transition-colors"
              title="Kembali ke Belajar"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                Level {currentLevelIdx + 1} • {curriculum[currentLevelIdx]?.modules?.[currentModuleIdx]?.title || 'Pelajaran'}
              </div>
              <h1 className="text-xl font-bold">{lesson.title}</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowLessonNav(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-50 to-pink-50 hover:from-rose-100/70 hover:to-pink-100/70 border border-rose-200/60 rounded-2xl text-xs font-black text-rose-700 hover:shadow-md hover:shadow-rose-500/5 active:scale-95 transition-all cursor-pointer shadow-sm group"
              title="Buka Daftar Pelajaran"
            >
              <Menu size={15} className="text-rose-700 group-hover:rotate-90 transition-transform duration-300" />
              <span>Daftar Menu</span>
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
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:h-[calc(100vh-240px)] h-auto items-stretch"
            >
              {/* Left Column: Theory & Explanation */}
              <div className="lg:col-span-5 flex flex-col gap-6 overflow-y-auto pr-4 custom-scrollbar h-full justify-between pb-4 min-h-[300px]">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-sm font-bold text-rose-700 bg-rose-50 w-fit px-3 py-1 rounded-full">
                    <BookOpen size={16} />
                    Level {currentLevelIdx + 1} • Pelajaran {currentLessonIdx + 1}
                  </div>
                  <h1 className="text-4xl font-black tracking-tight text-zinc-900 leading-tight">{lesson.title}</h1>
                  {/<\/?[a-z][\s\S]*>/i.test(lesson.explanation) ? (
                    <RichTextRenderer content={lesson.explanation} />
                  ) : (
                    <MarkdownRenderer content={lesson.explanation} />
                  )}
                </div>
                
                <div className="pt-4 shrink-0">
                  <button 
                    onClick={() => setStep('quiz')}
                    className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-zinc-900/10 active:scale-95"
                  >
                    Ikuti Kuis
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* Right Column: Code Sandbox */}
              <div className="lg:col-span-7 flex flex-col gap-4 h-full min-h-[500px]">
                <div className="flex-1 min-h-[300px]">
                  <CodeEditor 
                    code={sandboxCode} 
                    onChange={(val) => {
                      setSandboxCode(val || '');
                    }} 
                    onRun={handleSandboxRun}
                    isLoading={isSandboxRunning || isLoading}
                    language={lessonLanguage}
                  />
                </div>
                
                {/* Stdin Input for Sandbox */}
                <div className="flex items-center gap-2 shrink-0">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest whitespace-nowrap">Input (stdin)</label>
                  <textarea
                    rows={1}
                    value={sandboxInput}
                    onChange={(e) => setSandboxInput(e.target.value)}
                    placeholder={lessonLanguage === 'c' ? 'Masukkan input untuk scanf...\n(Gunakan Enter untuk baris baru jika input banyak, Ctrl+Enter untuk menjalankan)' : 'Masukkan input untuk input()...\n(Gunakan Enter untuk baris baru, Ctrl+Enter untuk menjalankan)'}
                    className="flex-1 text-sm bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-1.5 font-mono text-zinc-700 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all resize-y min-h-[38px] max-h-[120px]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                        e.preventDefault();
                        handleSandboxRun();
                      }
                    }}
                  />
                </div>

                {/* Sandbox Terminal Output */}
                <div className="h-44 bg-zinc-950 rounded-2xl border border-zinc-800 p-4 font-mono text-sm flex flex-col shadow-inner shrink-0">
                  <div className="flex items-center justify-between mb-2 text-zinc-500 text-xs uppercase tracking-widest font-bold">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#ff5f56]"></span>
                      <span className="w-2 h-2 rounded-full bg-[#ffbd2e]"></span>
                      <span className="w-2 h-2 rounded-full bg-[#27c93f]"></span>
                      <span className="ml-1 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Output Sandbox</span>
                    </div>
                    <button 
                      onClick={() => {
                        setSandboxCode(lesson.codeExample);
                        setSandboxOutput('');
                        setSandboxError(null);
                      }}
                      className="text-[10px] text-zinc-400 hover:text-white transition-colors bg-zinc-850 hover:bg-zinc-800 px-2 py-1 rounded font-sans uppercase tracking-wider font-bold"
                    >
                      Reset Kode
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto text-zinc-100 whitespace-pre-wrap">
                    {sandboxError ? (
                      <span className="text-red-400">{sandboxError}</span>
                    ) : sandboxOutput ? (
                      (() => {
                        const { cleanText, images } = parseOutputWithImages(sandboxOutput);
                        return (
                          <div className="space-y-3">
                            {cleanText && <span className="text-emerald-400">{cleanText}</span>}
                            {images.length > 0 && <PlotDisplay images={images} />}
                          </div>
                        );
                      })()
                    ) : (
                      <span className="text-zinc-600 italic">// Klik 'Jalankan' atau Ctrl+Enter untuk melihat output</span>
                    )}
                  </div>
                </div>
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
                lessonId={lesson.id}
                question={lesson.quiz.question}
                options={lesson.quiz.options}
                correctAnswer={lesson.quiz.correctAnswer}
                onComplete={async (correct) => {
                  if (correct && !quizXpGranted && user && !completedLessons.includes(lesson.id)) {
                    setQuizXpGranted(true);
                    try {
                      await grantXp(user, 25);
                    } catch (e) {
                      console.error('Failed to grant quiz XP:', e);
                    }
                  }
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
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-auto lg:h-[calc(100vh-280px)]"
            >
              <div className="flex flex-col gap-6 lg:overflow-y-auto pr-4 custom-scrollbar h-auto lg:h-full">
                <h2 className="text-3xl font-bold tracking-tight">Latihan Pemrograman</h2>
                <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-lg mb-4">Tugas Anda</h3>
                  <div className="space-y-4 mb-4">
                    {lesson.testCases.map((tc, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-zinc-600">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-700 shrink-0" />
                        <div className="flex-1 min-w-0">
                          {/<\/?[a-z][\s\S]*>/i.test(tc.description || '') ? (
                            <RichTextRenderer 
                              content={tc.description} 
                              className="prose-sm max-w-none text-zinc-600 prose-p:text-zinc-600 prose-p:my-0 prose-ul:my-0 prose-ol:my-0" 
                            />
                          ) : (
                            <p className="text-sm text-zinc-600 my-0">{tc.description}</p>
                          )}
                        </div>
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
                  </div>
                  <AnimatePresence>
                    {showHint && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden space-y-3"
                      >
                        <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-xl text-sm text-amber-800 italic">
                          {/<\/?[a-z][\s\S]*>/i.test(lesson.hint) ? (
                            <RichTextRenderer content={lesson.hint} className="prose-p:text-amber-800 prose-p:italic text-sm" />
                          ) : (
                            lesson.hint
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Expected Outputs Terminal */}
                  {lesson.testCases && lesson.testCases.length > 0 && (
                    <div className="mt-4 border border-zinc-700 rounded-xl overflow-hidden shadow-lg">
                      {/* Terminal Header */}
                      <div className="bg-zinc-800 px-4 py-2 flex items-center justify-between border-b border-zinc-700">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                          </div>
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-2">Output</span>
                        </div>
                      </div>
                      
                      {/* Terminal Content */}
                      <div className="bg-zinc-950 p-4 font-mono text-xs text-zinc-100 space-y-3 min-h-[60px]">
                        {lesson.testCases.map((tc, idx) => (
                          <div key={idx} className="space-y-1">
                            {lesson.testCases.length > 1 && (
                              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Kasus Uji #{idx + 1}</div>
                            )}
                            {tc.input && (
                              <div className="text-zinc-400">Input: <span className="text-emerald-400">{tc.input}</span></div>
                            )}
                            <pre className="text-zinc-100 whitespace-pre-wrap font-mono select-all">
                              {tc.expectedOutput}
                            </pre>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4 h-auto lg:h-full">
                <div className="h-[400px] lg:h-full lg:flex-1">
                  <CodeEditor 
                    code={code} 
                    onChange={(val) => {
                      setCode(val || '');
                      setIsCorrect(null);
                    }} 
                    onRun={handleRun}
                    onReset={() => {
                      setShowResetConfirm(true);
                    }}
                    isLoading={isLoading}
                    language={lessonLanguage}
                  />
                </div>
                {/* Show test case input hint if lesson uses stdin */}
                {lesson.testCases?.some(tc => tc.input) && (
                  <div className="flex items-center gap-2 shrink-0">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest whitespace-nowrap">Input Uji</label>
                    <div className="flex-1 text-sm bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 font-mono text-zinc-600">
                      {lesson.testCases.filter(tc => tc.input).map((tc, i) => (
                        <span key={i} className="inline-block">
                          {i > 0 && <span className="text-zinc-300 mx-1">•</span>}
                          <span className="bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded font-mono text-xs">{tc.input}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="h-40 bg-zinc-950 rounded-2xl border border-zinc-800 p-4 font-mono text-sm flex flex-col shadow-inner">
                  <div className="flex items-center justify-between mb-2 text-zinc-500 text-xs uppercase tracking-widest font-bold">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#ff5f56]"></span>
                      <span className="w-2 h-2 rounded-full bg-[#ffbd2e]"></span>
                      <span className="w-2 h-2 rounded-full bg-[#27c93f]"></span>
                      <span className="ml-1 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Output Terminal</span>
                    </div>
                    {isCorrect !== null && (
                      <span className={isCorrect ? "text-rose-400" : "text-red-400"}>
                        {isCorrect ? "Berhasil!" : "Coba lagi"}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 overflow-y-auto text-zinc-100 whitespace-pre-wrap">
                    {error ? (
                      <span className="text-red-400">{error}</span>
                    ) : (
                      (() => {
                        const { cleanText, images } = parseOutputWithImages(output);
                        return (
                          <div className="space-y-3">
                            {cleanText && <span>{cleanText}</span>}
                            {images.length > 0 && <PlotDisplay images={images} />}
                          </div>
                        );
                      })()
                    )}
                  </div>
                </div>
                {/* Selesaikan Pelajaran — posisi asli di kolom kanan */}
                <button
                  disabled={!isCorrect || !isQuizPassed || isCompleting}
                  onClick={nextLesson}
                  className="w-full py-4 bg-rose-700 text-white font-bold rounded-2xl hover:bg-rose-600 disabled:opacity-50 transition-all shadow-lg shadow-rose-700/20 active:scale-95 flex items-center justify-center gap-2"
                >
                  {isCompleting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    "Selesaikan Pelajaran"
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between pt-4 pb-8 border-t border-zinc-100 mt-2">
          <button
            onClick={handlePrev}
            disabled={!canGoPrev}
            className={cn(
              "flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all",
              canGoPrev
                ? "text-zinc-600 bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300 active:scale-95 shadow-sm"
                : "text-zinc-300 cursor-not-allowed"
            )}
          >
            <ChevronLeft size={18} />
            Sebelumnya
          </button>

          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className={cn(
              "flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all",
              canGoNext
                ? "text-zinc-600 bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300 active:scale-95 shadow-sm"
                : "text-zinc-300 cursor-not-allowed"
            )}
          >
            Selanjutnya
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </Layout>
  );
};

const StepIndicator: React.FC<{ active: boolean; completed: boolean; label: string }> = ({ active, completed, label }) => (
  <div className="flex items-center gap-2">
    <div className={cn(
      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
      active ? "bg-rose-700 text-white scale-110 shadow-lg shadow-rose-700/20" : 
      completed ? "bg-rose-100 text-rose-700" : "bg-zinc-100 text-zinc-400"
    )}>
      {completed ? <CheckCircle2 size={16} /> : label[0]}
    </div>
    <span className={cn(
      "text-xs font-bold uppercase tracking-widest",
      active ? "text-zinc-900" : "text-zinc-400"
    )}>{label}</span>
  </div>
);
