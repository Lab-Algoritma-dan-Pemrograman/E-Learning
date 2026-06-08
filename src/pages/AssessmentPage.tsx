import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '../components/Layout';
import { CodeEditor } from '../components/CodeEditor';
import { useStore } from '../store/useStore';
import { useAutoSave } from '../hooks/useAutoSave';
import { supabase } from '../lib/supabase';
import { assessmentService, AssessmentAttempt, AssessmentQuestion } from '../services/assessmentService';
import { assessmentTokenService } from '../services/assessmentTokenService';
import { monitoringService } from '../services/monitoringService';
import { useCodeRunner, CodeLanguage } from '../hooks/useCodeRunner';
import { Timer, Send, Key, ChevronLeft, ChevronRight, Lock, Loader2, Save, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { cn } from '../lib/utils';

export const AssessmentPage: React.FC = () => {
  const { user, setPage } = useStore();
  const [assessmentType, setAssessmentType] = useState<'pre_test' | 'post_test' | 'program_keterampilan' | 'ujian_praktik' | null>(null);
  const [tokenInput, setTokenInput] = useState('');
  const [tokenError, setTokenError] = useState('');
  const [isTokenValidating, setIsTokenValidating] = useState(false);
  const [isTokenPassed, setIsTokenPassed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Active Attempt State
  const [attempt, setAttempt] = useState<AssessmentAttempt | null>(null);
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);

  // Student Answers State
  const [answers, setAnswers] = useState<Record<string, { answerText?: string; codeSubmitted?: string; outputStandard?: string; errors?: string }>>({});
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState<number | null>(null); // in seconds
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Heartbeat monitoring
  useEffect(() => {
    if (!user) return;
    
    // Heartbeat every 20 seconds
    const interval = setInterval(() => {
      const activity = attempt 
        ? `taking_${attempt.menu_type}` 
        : assessmentType 
          ? `entering_${assessmentType}` 
          : 'on_assessment_menu';
          
      monitoringService.updateHeartbeat(user.nim, user.nama, user.kelas, activity, attempt?.id || null);
    }, 20000);

    // Initial heartbeat
    monitoringService.updateHeartbeat(user.nim, user.nama, user.kelas, 'on_assessment_menu');

    return () => clearInterval(interval);
  }, [user, assessmentType, attempt]);

  // Check for existing active attempt on load
  useEffect(() => {
    const checkActive = async () => {
      if (!user || !assessmentType) return;
      setLoading(true);
      try {
        const active = await assessmentService.getActiveAttempt(user.nim, assessmentType);
        if (active) {
          // If Ujian Praktik, skip token gate since it's already active
          if (assessmentType === 'ujian_praktik') {
            setIsTokenPassed(true);
          }
          await loadAttemptDetails(active);
        }
      } catch (e: any) {
        setError(e.message || "Gagal memeriksa sesi ujian aktif.");
      } finally {
        setLoading(false);
      }
    };
    checkActive();
  }, [assessmentType, user]);

  const loadAttemptDetails = async (activeAttempt: AssessmentAttempt) => {
    // Load question definitions first
    const { data: questionData, error: qError } = await supabaseQueryQuestions(activeAttempt.selected_questions);
    if (qError) throw qError;
    
    // Initialize timer
    const elapsedSeconds = Math.floor((Date.now() - new Date(activeAttempt.started_at).getTime()) / 1000);
    const totalDurationSeconds = activeAttempt.duration_minutes * 60;
    const remaining = Math.max(0, totalDurationSeconds - elapsedSeconds);

    setQuestions(questionData || []);
    setActiveQuestionIdx(0);
    setAnswers(activeAttempt.answers || {});
    setTimeLeft(remaining);
    setAttempt(activeAttempt);
  };

  // Helper to fetch matching questions order
  const supabaseQueryQuestions = async (ids: string[]) => {
    const { data, error } = await supabase
      .from('assessment_questions')
      .select('*')
      .in('id', ids);
    
    if (error) return { data: null, error };
    
    // Sort to match the selected questions sequence stored in attempt
    const sorted = ids.map(id => data.find(q => q.id === id)).filter(Boolean);
    return { data: sorted, error: null };
  };

  // Timer countdown hook
  useEffect(() => {
    if (timeLeft === null || !attempt) {
      return;
    }

    if (timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }

    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [timeLeft, attempt]);

  // Auto-Save hook setup
  const { status: saveStatus, lastSaved, forceSave } = useAutoSave(
    attempt?.id || null,
    answers,
    20000 // 20 seconds debounce for faster feedback
  );

  const activeQuestion = questions[activeQuestionIdx];
  const activeAnswer = activeQuestion ? (answers[activeQuestion.id] || { answerText: '', codeSubmitted: activeQuestion.initial_code || '', outputStandard: '', errors: '' }) : null;

  // Code Runner Hooks for coding questions
  const detectLang = activeQuestion?.type === 'flowchart_translation' || activeQuestion?.type === 'coding'
    ? (activeQuestion.initial_code?.includes('#include') ? 'c' : 'python')
    : 'python';
    
  const { runCode, isLoading: isCodeRunning } = useCodeRunner(detectLang as CodeLanguage);

  const handleRunCode = async () => {
    if (!activeQuestion || !activeAnswer) return;
    
    const codeToRun = activeAnswer.codeSubmitted || '';
    
    // Set output to running
    setAnswers(prev => ({
      ...prev,
      [activeQuestion.id]: {
        ...prev[activeQuestion.id],
        outputStandard: 'Mengeksekusi program...',
        errors: ''
      }
    }));

    try {
      const res = await runCode(codeToRun);
      setAnswers(prev => ({
        ...prev,
        [activeQuestion.id]: {
          ...prev[activeQuestion.id],
          outputStandard: res.output,
          errors: res.error || ''
        }
      }));
    } catch (e: any) {
      setAnswers(prev => ({
        ...prev,
        [activeQuestion.id]: {
          ...prev[activeQuestion.id],
          outputStandard: '',
          errors: e.message || 'Error running code'
        }
      }));
    }
  };

  const handleStartExam = async () => {
    if (!user || !assessmentType) return;
    setLoading(true);
    setError(null);
    try {
      // Create session
      const newAttempt = await assessmentService.startAttempt(
        user.nim,
        assessmentType,
        assessmentType === 'ujian_praktik' ? tokenInput.trim().toUpperCase() : null
      );

      // Increment token use if Ujian Praktik
      if (assessmentType === 'ujian_praktik') {
        await assessmentTokenService.incrementTokenUsage(tokenInput);
      }

      await monitoringService.addAuditLog(user.nim, user.nama, 'start_test', `Memulai pengerjaan ${assessmentType}`);
      await loadAttemptDetails(newAttempt);
    } catch (e: any) {
      setError(e.message || "Gagal memulai asesmen. Silakan coba kembali.");
    } finally {
      setLoading(false);
    }
  };

  const handleTokenSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;
    
    setIsTokenValidating(true);
    setTokenError('');
    try {
      const validation = await assessmentTokenService.validateToken(tokenInput, user?.kelas || '');
      if (validation.valid) {
        setIsTokenPassed(true);
        await monitoringService.addAuditLog(user!.nim, user!.nama, 'token_used', `Token ${tokenInput.trim().toUpperCase()} berhasil divalidasi`);
        await handleStartExam();
      } else {
        setTokenError(validation.message);
      }
    } catch (err) {
      setTokenError("Gagal memproses token. Periksa koneksi internet.");
    } finally {
      setIsTokenValidating(false);
    }
  };

  const handleAutoSubmit = async () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (!attempt) return;
    
    setLoading(true);
    try {
      await forceSave();
      await assessmentService.submitAttempt(attempt.id!);
      await monitoringService.addAuditLog(user!.nim, user!.nama, 'submit_test', `Ujian dikumpulkan otomatis (waktu habis) untuk ${attempt.menu_type}`);
      
      confetti({ particleCount: 150, spread: 80 });
      setAttempt(null);
      setAssessmentType(null);
      alert("Waktu habis! Jawaban Anda telah dikumpulkan secara otomatis.");
      setPage('dashboard');
    } catch (e) {
      setError("Gagal mengumpulkan jawaban otomatis. Hubungi asisten.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const confirm = window.confirm("Apakah Anda yakin ingin menyelesaikan dan mengirimkan asesmen ini?");
    if (!confirm || !attempt) return;

    setLoading(true);
    try {
      await forceSave();
      await assessmentService.submitAttempt(attempt.id!);
      await monitoringService.addAuditLog(user!.nim, user!.nama, 'submit_test', `Mengumpulkan pengerjaan ${attempt.menu_type}`);
      
      confetti({ particleCount: 150, spread: 80 });
      setAttempt(null);
      setAssessmentType(null);
      setPage('dashboard');
    } catch (e: any) {
      setError(e.message || "Gagal mengumpulkan asesmen.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (fields: Partial<{ answerText: string; codeSubmitted: string; outputStandard: string; errors: string }>) => {
    if (!activeQuestion) return;
    setAnswers(prev => ({
      ...prev,
      [activeQuestion.id]: {
        ...(prev[activeQuestion.id] || { answerText: '', codeSubmitted: activeQuestion.initial_code || '', outputStandard: '', errors: '' }),
        ...fields
      }
    }));
  };

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return "--:--:--";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Layout>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* PAGE HEADER */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                if (attempt) {
                  const check = window.confirm("Ujian sedang berlangsung! Pindah halaman akan tetap menjalankan timer. Lanjutkan?");
                  if (!check) return;
                }
                setPage('dashboard');
              }}
              className="p-2.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
                {!assessmentType ? "Menu Asesmen" : assessmentType.toUpperCase().replace('_', ' ')}
              </h1>
              <p className="text-zinc-500 text-xs">Pastikan Anda membaca rubrik penilaian dengan saksama.</p>
            </div>
          </div>
          
          {/* Live Timer & Save Indicators */}
          {attempt && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-100 px-3 py-1.5 rounded-xl">
                <Save size={14} className={cn(saveStatus === 'saving' && "animate-spin text-rose-600")} />
                <span>
                  {saveStatus === 'saving' ? 'Menyimpan...' : 
                   saveStatus === 'saved' ? `Draf disimpan otomatis pukul ${lastSaved}` : 
                   saveStatus === 'error' ? 'Gagal menyimpan draf' : 'Draf aman'}
                </span>
              </div>
              
              <div className={cn(
                "flex items-center gap-2 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-md transition-colors",
                timeLeft < 300 ? "bg-rose-600 animate-pulse" : "bg-zinc-900"
              )}>
                <Timer size={16} />
                <span className="font-mono">{formatTime(timeLeft)}</span>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-sm">
            <AlertTriangle size={18} />
            <p>{error}</p>
          </div>
        )}

        {/* 1. SELECTION MENU SCREEN */}
        {!assessmentType && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <MenuCard 
              title="Pre-Test"
              desc="Menguji pemahaman awal Anda sebelum pelajaran dimulai. 5 soal: 1 Easy, 2 Medium, 2 Hard."
              unlocked={user?.assessmentAccess?.pre_test ?? false}
              onClick={() => setAssessmentType('pre_test')}
            />
            <MenuCard 
              title="Post-Test"
              desc="Menguji penguasaan materi level. 3 soal: 1 Easy, 1 Medium, 1 Hard (Coding)."
              unlocked={user?.assessmentAccess?.post_test ?? false}
              onClick={() => setAssessmentType('post_test')}
            />
            <MenuCard 
              title="Program Keterampilan"
              desc="Membuat program fungsional sesuai petunjuk khusus studi kasus."
              unlocked={user?.assessmentAccess?.program_keterampilan ?? false}
              onClick={() => setAssessmentType('program_keterampilan')}
            />
            <MenuCard 
              title="Ujian Praktik"
              desc="Ujian evaluasi akhir komprehensif. Membutuhkan token asisten laboratorium."
              unlocked={user?.assessmentAccess?.ujian_praktik ?? false}
              onClick={() => setAssessmentType('ujian_praktik')}
            />
          </div>
        )}

        {/* 2. TOKEN INPUT GATE (FOR UJIAN PRAKTIK ONLY) */}
        {assessmentType === 'ujian_praktik' && !isTokenPassed && !attempt && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto bg-white border border-zinc-200 rounded-3xl p-8 shadow-xl space-y-6 text-center"
          >
            <div className="w-16 h-16 bg-rose-50 text-rose-700 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <Key size={30} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Verifikasi Token Ujian</h3>
              <p className="text-sm text-zinc-500 mt-2">
                Ujian Praktik dikunci untuk keamanan. Masukkan kode/token 6-digit yang diberikan oleh asisten Anda.
              </p>
            </div>
            <form onSubmit={handleTokenSubmit} className="space-y-4">
              <input 
                type="text" 
                maxLength={6}
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value.toUpperCase())}
                placeholder="CONTOH: XP99A2"
                className="w-full text-center tracking-widest uppercase font-mono text-2xl font-bold py-4 bg-zinc-50 border-2 border-zinc-200 focus:border-rose-700 rounded-2xl outline-none transition-all"
              />
              {tokenError && <p className="text-xs text-red-600 font-bold">{tokenError}</p>}
              <button 
                type="submit"
                disabled={isTokenValidating || !tokenInput}
                className="w-full py-4 bg-rose-700 hover:bg-rose-800 disabled:opacity-50 text-white font-bold rounded-2xl shadow-lg shadow-rose-700/15 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {isTokenValidating ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Memverifikasi...
                  </>
                ) : (
                  "Buka & Mulai Ujian"
                )}
              </button>
            </form>
          </motion.div>
        )}

        {/* 3. EXAM CONFIRMATION SCREEN (Non-Token assessments or after token success) */}
        {assessmentType && !attempt && (!questions || questions.length === 0) && (assessmentType !== 'ujian_praktik' || isTokenPassed) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto bg-white border border-zinc-200 rounded-3xl p-8 shadow-xl space-y-8 text-center"
          >
            <div className="w-16 h-16 bg-rose-50 text-rose-700 rounded-2xl flex items-center justify-center mx-auto">
              <FileText size={32} />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold">Siap memulai pengerjaan?</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Anda akan memulai pengerjaan **{assessmentType.toUpperCase().replace('_', ' ')}**. 
                Waktu pengerjaan akan segera dihitung mundur setelah Anda menekan tombol di bawah.
                Sistem auto-save aktif untuk mengamankan jawaban draf Anda.
              </p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setAssessmentType(null)}
                className="flex-1 py-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold rounded-2xl transition-all"
              >
                Kembali
              </button>
              <button 
                onClick={handleStartExam}
                disabled={loading}
                className="flex-1 py-4 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-2xl shadow-lg shadow-rose-700/15 active:scale-95 transition-all flex items-center justify-center"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Mulai Sekarang"}
              </button>
            </div>
          </motion.div>
        )}

        {/* 4. ACTIVE EXAM WORKSPACE */}
        {attempt && questions.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="space-y-4 lg:col-span-1">
              <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm space-y-4">
                <h4 className="font-bold text-sm text-zinc-500 uppercase tracking-widest">Daftar Soal</h4>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((q, idx) => {
                    const isAnswered = answers[q.id]?.answerText || answers[q.id]?.codeSubmitted;
                    return (
                      <button
                        key={q.id}
                        onClick={() => setActiveQuestionIdx(idx)}
                        className={cn(
                          "w-10 h-10 rounded-xl font-bold text-sm transition-all active:scale-90 flex items-center justify-center",
                          idx === activeQuestionIdx 
                            ? "bg-rose-700 text-white shadow-md shadow-rose-700/10 scale-105" 
                            : isAnswered 
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-zinc-50 text-zinc-700 hover:bg-zinc-100"
                        )}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/15 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <Send size={16} />
                    Submit Ujian
                  </>
                )}
              </button>
            </div>

            {/* Question Area */}
            <div className="lg:col-span-3 space-y-6">
              {activeQuestion && activeAnswer && (
                <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm space-y-6">
                  {/* Title & Badge */}
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                    <h3 className="text-xl font-black">{activeQuestion.title}</h3>
                    <div className="flex gap-2">
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full",
                        activeQuestion.difficulty === 'easy' ? "bg-emerald-50 text-emerald-700" :
                        activeQuestion.difficulty === 'medium' ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"
                      )}>
                        {activeQuestion.difficulty}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-zinc-100 text-zinc-600 px-2.5 py-1 rounded-full">
                        {activeQuestion.type.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Instruction */}
                  <div className="prose prose-zinc max-w-none text-zinc-700 leading-relaxed text-sm">
                    <p className="whitespace-pre-wrap">{activeQuestion.instruction}</p>
                  </div>

                  {/* Flowchart Image if translation */}
                  {activeQuestion.type === 'flowchart_translation' && activeQuestion.flowchart_url && (
                    <div className="border border-zinc-200 rounded-2xl p-4 bg-zinc-50 flex justify-center max-h-96 overflow-hidden">
                      <img src={activeQuestion.flowchart_url} alt="Flowchart Translation" className="object-contain max-h-80" />
                    </div>
                  )}

                  {/* Answers Forms */}
                  {activeQuestion.type === 'short_answer' || activeQuestion.type === 'essay' ? (
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Tuliskan Jawaban Anda</label>
                      <textarea
                        rows={8}
                        value={activeAnswer.answerText || ''}
                        onChange={(e) => handleAnswerChange({ answerText: e.target.value })}
                        placeholder="Ketikkan teks jawaban atau analisis Anda di sini..."
                        className="w-full p-4 border border-zinc-200 bg-zinc-50 rounded-2xl outline-none focus:border-rose-700 outline-none transition-colors text-sm leading-relaxed"
                      />
                    </div>
                  ) : (
                    // Coding / Flowchart to code Workspace
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-[500px]">
                      <div className="flex flex-col h-full">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Editor Kode ({detectLang.toUpperCase()})</label>
                        <div className="flex-1 min-h-[350px]">
                          <CodeEditor
                            code={activeAnswer.codeSubmitted || ''}
                            onChange={(val) => handleAnswerChange({ codeSubmitted: val || '' })}
                            onRun={handleRunCode}
                            isLoading={isCodeRunning}
                            language={detectLang as CodeLanguage}
                          />
                        </div>
                      </div>

                      {/* Compiler Sandbox Output */}
                      <div className="flex flex-col h-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 font-mono text-sm text-zinc-100">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2 text-zinc-500 text-xs font-bold uppercase tracking-widest">
                          <span>Output Sandbox</span>
                        </div>
                        <div className="flex-1 overflow-y-auto whitespace-pre-wrap select-text custom-scrollbar">
                          {activeAnswer.errors ? (
                            <span className="text-red-400">{activeAnswer.errors}</span>
                          ) : (
                            activeAnswer.outputStandard || <span className="text-zinc-600 italic">Jalankan program untuk melihat output...</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Question Footer Nav */}
                  <div className="flex justify-between border-t border-zinc-100 pt-6 mt-4">
                    <button
                      disabled={activeQuestionIdx === 0}
                      onClick={() => setActiveQuestionIdx(prev => prev - 1)}
                      className="px-6 py-3 bg-zinc-100 hover:bg-zinc-200 disabled:opacity-50 text-zinc-700 font-bold rounded-xl transition-all flex items-center gap-1 text-sm"
                    >
                      <ChevronLeft size={16} />
                      Sebelumnya
                    </button>
                    <button
                      disabled={activeQuestionIdx === questions.length - 1}
                      onClick={() => setActiveQuestionIdx(prev => prev + 1)}
                      className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-white font-bold rounded-xl transition-all flex items-center gap-1 text-sm"
                    >
                      Berikutnya
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

// Menu cards for selection
const MenuCard: React.FC<{ title: string; desc: string; unlocked: boolean; onClick: () => void }> = ({ title, desc, unlocked, onClick }) => (
  <div 
    onClick={() => unlocked && onClick()}
    className={cn(
      "bg-white border p-8 rounded-3xl relative overflow-hidden transition-all shadow-sm",
      unlocked 
        ? "border-zinc-200 hover:border-rose-200 cursor-pointer hover:-y-1 group" 
        : "opacity-60 grayscale cursor-not-allowed border-zinc-100"
    )}
  >
    {!unlocked && (
      <div className="absolute inset-0 bg-zinc-100/30 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center text-zinc-400 gap-2">
        <Lock size={26} />
        <span className="text-[10px] font-bold uppercase tracking-wider">Belum Diizinkan Asisten</span>
      </div>
    )}
    <div className="flex items-center justify-between mb-4">
      <div className={cn(
        "w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm",
        unlocked ? "bg-rose-50 text-rose-700 group-hover:scale-105 transition-transform" : "bg-zinc-100 text-zinc-400"
      )}>
        {title.charAt(0)}
      </div>
      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Menu</span>
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
  </div>
);
