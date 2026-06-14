import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, Timer, CheckCircle2, XCircle, Trophy, ArrowRight, X, Terminal, Brain, Loader2 } from 'lucide-react';
import { GameQuestion, getGameQuestions, saveGameHistory, canPlayBugHunt, getGameSettings } from '../../services/gameService';
import { checkAndUnlockAchievements, checkXpAchievements } from '../../services/achievementService';
import { useStore } from '../../store/useStore';
import { cn } from '../../lib/utils';

interface BugHuntProps {
  language: 'c' | 'python';
  onClose: () => void;
  onGameFinished?: () => void;
}

export const BugHunt: React.FC<BugHuntProps> = ({ language, onClose, onGameFinished }) => {
  const { user, pushAchievement } = useStore();
  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [gameStatus, setGameStatus] = useState<'loading' | 'blocked' | 'playing' | 'result' | 'finished'>('loading');
  const [isSaving, setIsSaving] = useState(false);
  const [limitError, setLimitError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [totalXp, setTotalXp] = useState(0);
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [lastResult, setLastResult] = useState<{ correct: boolean; xp: number } | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const scoreRef = useRef(0);
  const totalXpRef = useRef(0);

  useEffect(() => {
    scoreRef.current = 0;
    totalXpRef.current = 0;
  }, []);

  useEffect(() => {
    const loadQuestions = async () => {
      // 1. Get settings first to know how many questions to fetch
      const settings = await getGameSettings();
      const questionCount = settings.bugHuntQuestionCount || 5;

      // 2. Fresh limit check from Firestore before starting the game
      if (user?.nim) {
        const check = await canPlayBugHunt(user.nim);
        if (!check.allowed) {
          setGameStatus('blocked');
          setLoading(false);
          return;
        }
      }
      
      const q = await getGameQuestions(language, questionCount);
      setQuestions(q);
      setLoading(false);
      setGameStatus('playing');
    };
    loadQuestions();
  }, [language, user]);

  useEffect(() => {
    if (gameStatus === 'playing' && !loading && questions.length > 0) {
      setTimeLeft(15);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            handleAnswer(-1); // Time out
            return 0;
          }
          return prev - 0.1;
        });
      }, 100);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStatus, loading, currentIndex, questions.length]);

  const handleAnswer = (lineIndex: number) => {
    if (gameStatus !== 'playing') return;
    if (timerRef.current) clearInterval(timerRef.current);

    const question = questions[currentIndex];
    const isCorrect = lineIndex === question.bugLine;
    const xpBase = isCorrect ? 20 : 0;
    const xpBonus = isCorrect ? Math.round(timeLeft * 2) : 0;
    const earnedXp = xpBase + xpBonus;

    setSelectedLine(lineIndex);
    setLastResult({ correct: isCorrect, xp: earnedXp });
    
    setTotalXp((prev) => {
      const newVal = prev + earnedXp;
      totalXpRef.current = newVal;
      return newVal;
    });
    
    if (isCorrect) {
      setScore((prev) => {
        const newVal = prev + 1;
        scoreRef.current = newVal;
        return newVal;
      });
    }
    
    setGameStatus('result');
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedLine(null);
      setLastResult(null);
      setGameStatus('playing');
    } else {
      finishGame();
    }
  };

  const finishGame = async () => {
    setIsSaving(true);
    setGameStatus('finished');
    try {
      if (user) {
        const finalScore = scoreRef.current;
        const finalXp = totalXpRef.current;

        await saveGameHistory(user.nim, {
          gameType: 'bug_hunt',
          score: finalScore,
          totalQuestions: questions.length,
          xpEarned: finalXp,
          playedAt: new Date().toISOString()
        });

        // Trigger dashboard count refresh immediately
        if (onGameFinished) {
          onGameFinished();
        }

        // Get current XP from store (updated by saveGameHistory)
        const currentUser = useStore.getState().user;
        const currentXp = (currentUser && currentUser.nim === user.nim) ? (currentUser.xp || 0) : user.xp + finalXp;

        // Check for game_score and level_completed achievements
        const newlyUnlocked = await checkAndUnlockAchievements(user, { 
          xp: currentXp,
          gamesPlayed: 1,
          perfectGames: finalScore === questions.length ? 1 : 0 
        });

        // Also check XP-based achievements with current XP
        const xpAch = await checkXpAchievements(user.nim, currentXp);

        newlyUnlocked.forEach(ach => {
          pushAchievement(ach);
        });
        if (xpAch) {
          pushAchievement(xpAch);
        }
      }
    } catch (error: any) {
      if (error?.message === 'WEEKLY_LIMIT_REACHED') {
        setLimitError(true);
        // Reset XP display since it wasn't actually saved
        setTotalXp(0);
        totalXpRef.current = 0;
        console.warn('Game result NOT saved: weekly limit was reached');
      } else {
        console.error("Failed to save game history:", error);
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-zinc-900/90 backdrop-blur-sm z-[100] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-rose-700 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-white font-bold animate-pulse">Menyiapkan Perburuan Bug...</p>
        </div>
      </div>
    );
  }

  if (gameStatus === 'blocked') {
    return (
      <div className="fixed inset-0 bg-zinc-900/90 backdrop-blur-sm z-[100] flex items-center justify-center">
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl text-center space-y-6 max-w-sm">
          <div className="w-16 h-16 bg-rose-900/30 text-rose-500 rounded-2xl flex items-center justify-center mx-auto">
            <XCircle size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Limit Tercapai!</h3>
            <p className="text-zinc-500 text-sm mt-2">Kamu sudah mencapai batas main Bug Hunt minggu ini. Kembali lagi minggu depan! 🎯</p>
          </div>
          <button 
            onClick={onClose}
            className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl font-bold transition-all"
          >
            Tutup
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0 && !loading) {
    return (
      <div className="fixed inset-0 bg-zinc-900/90 backdrop-blur-sm z-[100] flex items-center justify-center">
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl text-center space-y-6 max-w-sm">
          <div className="w-16 h-16 bg-zinc-800 text-zinc-400 rounded-2xl flex items-center justify-center mx-auto">
            <XCircle size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Tidak Ada Soal</h3>
            <p className="text-zinc-500 text-sm mt-2">Maaf, saat ini tidak ada soal yang tersedia untuk bahasa ini. Silakan hubungi admin.</p>
          </div>
          <button 
            onClick={onClose}
            className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl font-bold transition-all"
          >
            Tutup
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="fixed inset-0 bg-zinc-950 z-[100] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-900/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rose-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-rose-700/20">
            <Bug size={24} />
          </div>
          <div>
            <h2 className="text-white font-bold leading-none">Bug Hunt: {language === 'c' ? 'Bahasa C' : 'Python'}</h2>
            <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mt-1">Sesi {currentIndex + 1} / {questions.length}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Timer className={cn("transition-colors", timeLeft < 5 ? "text-rose-500 animate-pulse" : "text-zinc-400")} size={18} />
            <div className="w-32 h-2 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div 
                className={cn("h-full transition-colors", timeLeft < 5 ? "bg-rose-500" : "bg-emerald-500")}
                initial={{ width: '100%' }}
                animate={{ width: `${(timeLeft / 15) * 100}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-700">
            <Trophy className="text-amber-500" size={16} />
            <span className="text-white font-mono font-bold text-sm">+{totalXp} XP</span>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 p-6 overflow-hidden">
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden flex flex-col h-full shadow-2xl">
            <div className="px-4 py-3 bg-zinc-800/50 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-zinc-400 font-bold text-xs uppercase tracking-widest">
                <Terminal size={14} />
                Temukan baris yang mengandung bug!
              </div>
              <div className="text-zinc-500 text-xs font-mono">{currentQuestion?.title}</div>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar p-0 font-mono text-sm leading-relaxed relative">
              {currentQuestion?.code.replace(/\\n/g, '\n').split('\n').map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => gameStatus === 'playing' && handleAnswer(i)}
                  className={cn(
                    "group flex items-start px-4 py-1.5 cursor-pointer transition-colors relative",
                    gameStatus === 'playing' && "hover:bg-zinc-800/50",
                    selectedLine === i && !lastResult?.correct && "bg-rose-500/20",
                    gameStatus === 'result' && i === currentQuestion.bugLine && "bg-emerald-500/20",
                    gameStatus !== 'playing' && "cursor-default"
                  )}
                >
                  <div className="w-8 text-zinc-600 text-right pr-4 select-none group-hover:text-zinc-400 transition-colors">
                    {i + 1}
                  </div>
                  <div className={cn(
                    "flex-1 whitespace-pre transition-colors",
                    gameStatus === 'playing' ? "text-zinc-100" : "text-zinc-400",
                    gameStatus === 'result' && i === currentQuestion.bugLine && "text-emerald-400 font-bold"
                  )}>
                    {line || ' '}
                  </div>
                  
                  {/* Feedback Icons */}
                  {selectedLine === i && !lastResult?.correct && (
                    <XCircle className="absolute right-4 text-rose-500" size={18} />
                  )}
                  {gameStatus === 'result' && i === currentQuestion.bugLine && (
                    <CheckCircle2 className="absolute right-4 text-emerald-500" size={18} />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="w-full lg:w-80 flex flex-col gap-4">
          <AnimatePresence mode="wait">
            {gameStatus === 'playing' ? (
              <motion.div 
                key="hint"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 space-y-4"
              >
                <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center">
                  <Brain size={24} />
                </div>
                <h3 className="text-white font-bold text-lg">Misi Kamu</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Periksa kode di sebelah kiri dengan cermat. Salah satu baris memiliki kesalahan sintaks atau logika yang fatal. Klik baris tersebut sesegera mungkin!
                </p>
                <div className="pt-4 border-t border-zinc-800">
                  <p className="text-xs text-zinc-500 italic">"Gunakan insting programmer-mu untuk menemukan bug-nya!"</p>
                </div>
              </motion.div>
            ) : gameStatus === 'result' ? (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn(
                  "bg-white rounded-2xl p-8 text-center space-y-6 shadow-2xl",
                  lastResult?.correct ? "bg-emerald-50" : "bg-rose-50"
                )}
              >
                <div className={cn(
                  "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4",
                  lastResult?.correct ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                )}>
                  {lastResult?.correct ? <CheckCircle2 size={48} /> : <XCircle size={48} />}
                </div>
                <div>
                  <h3 className={cn("text-2xl font-black mb-2", lastResult?.correct ? "text-emerald-900" : "text-rose-900")}>
                    {lastResult?.correct ? "BUG DITEMUKAN!" : "YAH, SALAH KLIK!"}
                  </h3>
                  <p className="text-zinc-600 font-medium mb-6">
                    {lastResult?.correct 
                      ? `Luar biasa! Kamu mendapatkan ${lastResult.xp} XP.`
                      : "Jangan menyerah, perhatikan baik-baik baris hijau yang benar."}
                  </p>
                  
                  <div className="p-4 bg-white/50 rounded-xl border border-zinc-200 text-left mb-6">
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Penjelasan:</p>
                    <p className="text-sm text-zinc-700 leading-relaxed font-medium">{currentQuestion?.explanation}</p>
                  </div>
                </div>

                <button 
                  onClick={nextQuestion}
                  className={cn(
                    "w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg",
                    lastResult?.correct 
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20" 
                      : "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20"
                  )}
                >
                  {currentIndex < questions.length - 1 ? "Soal Berikutnya" : "Lihat Hasil Akhir"}
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="finished"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 text-center space-y-6"
              >
                <div className="w-24 h-24 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto border-4 border-amber-500/20 relative">
                  <Trophy size={48} />
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }} 
                    transition={{ repeat: Infinity, duration: 2 }} 
                    className="absolute inset-0 bg-amber-500/10 rounded-full" 
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white mb-2">MISI SELESAI!</h2>
                  <p className="text-zinc-400">Kamu telah menyelesaikan tantangan perburuan bug hari ini.</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-800 p-4 rounded-2xl">
                    <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Skor</div>
                    <div className="text-2xl font-black text-white">{score} / {questions.length}</div>
                  </div>
                  <div className="bg-rose-700 p-4 rounded-2xl">
                    <div className="text-[10px] text-rose-100 font-bold uppercase tracking-widest mb-1">Total XP</div>
                <div className="text-2xl font-black text-white">
                    {limitError ? '—' : `+${totalXp}`}
                  </div>
                  </div>
                </div>

                <button 
                  onClick={onClose}
                  disabled={isSaving}
                  className={cn(
                    "w-full py-4 rounded-2xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2",
                    isSaving 
                      ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
                      : "bg-white text-black hover:bg-zinc-200"
                  )}
                >
                  {isSaving ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Menyimpan...
                    </>
                  ) : limitError ? (
                    <>
                      ⚠️ Limit tercapai — XP tidak disimpan
                    </>
                  ) : "Kembali ke Dashboard"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
