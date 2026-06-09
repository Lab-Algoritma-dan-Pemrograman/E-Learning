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
import { Timer, Send, Key, ChevronLeft, ChevronRight, Lock, Loader2, Save, FileText, CheckCircle2, AlertTriangle, Play, Terminal } from 'lucide-react';
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
  const [scoreRecap, setScoreRecap] = useState<any[]>([]);
  const [showQuestionPopover, setShowQuestionPopover] = useState(false);
  const [durations, setDurations] = useState<Record<string, number>>({
    pre_test: 15,
    post_test: 15,
    program_keterampilan: 90,
    ujian_praktik: 120
  });

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

  // Fetch score recap on mount / when user changes
  useEffect(() => {
    if (!user) return;
    const fetchScoreRecap = async () => {
      const types = ['pre_test', 'post_test', 'program_keterampilan', 'ujian_praktik'];
      const results: any[] = [];
      for (const t of types) {
        try {
          const { data } = await supabase
            .from('assessment_attempts')
            .select('menu_type, status, final_score')
            .eq('nim', user.nim)
            .eq('menu_type', t)
            .order('submitted_at', { ascending: false })
            .limit(1);
          results.push(data?.[0] || { menu_type: t, status: null, final_score: null });
        } catch (err) {
          console.error(`Gagal memuat rekap nilai untuk ${t}:`, err);
          results.push({ menu_type: t, status: null, final_score: null });
        }
      }
      setScoreRecap(results);
    };
    fetchScoreRecap();
  }, [user]);

  // Fetch dynamic duration rules from DB
  useEffect(() => {
    const fetchDurations = async () => {
      try {
        const { data } = await supabase.from('assessment_grading_rules').select('id, rules');
        if (data) {
          const map: Record<string, number> = {};
          data.forEach((row: any) => {
            if (row.rules && (row.rules as any).duration_minutes) {
              map[row.id] = Number((row.rules as any).duration_minutes);
            }
          });
          setDurations(prev => ({ ...prev, ...map }));
        }
      } catch (err) {
        console.error("Failed to fetch durations:", err);
      }
    };
    fetchDurations();
  }, []);

  // Anti-Cheat: Tab Switch Detection
  const isHandlingBlur = useRef(false);
  const tabSwitchCountRef = useRef(0);

  useEffect(() => {
    if (!attempt || attempt.status !== 'in_progress' || !user) return;

    tabSwitchCountRef.current = attempt.tab_switch_count || 0;

    const handleTabSwitch = async () => {
      if (isHandlingBlur.current) return;
      isHandlingBlur.current = true;

      const nextCount = tabSwitchCountRef.current + 1;
      tabSwitchCountRef.current = nextCount;

      try {
        await supabase
          .from('assessment_attempts')
          .update({ tab_switch_count: nextCount })
          .eq('id', attempt.id);

        await monitoringService.addAuditLog(
          user.nim,
          user.nama,
          'access_modified',
          `Meninggalkan tab ujian (Peringatan ke-${nextCount})`
        );

        alert(`⚠️ PERINGATAN: Dilarang berpindah tab saat ujian! (Pelanggaran: ${nextCount}/3)`);

        if (nextCount >= 3) {
          await handleAutoSubmit();
        }
      } catch (err) {
        console.error('Error recording anti-cheat event:', err);
      } finally {
        isHandlingBlur.current = false;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleTabSwitch();
      }
    };

    const handleWindowBlur = () => {
      handleTabSwitch();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [attempt, user]);

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
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <MenuCard 
                title="Pre-Test"
                desc="Menguji pemahaman awal Anda sebelum pelajaran dimulai. 5 soal: 1 Easy, 2 Medium, 2 Hard."
                unlocked={user?.assessmentAccess?.pre_test ?? false}
                duration={durations.pre_test}
                onClick={() => setAssessmentType('pre_test')}
              />
              <MenuCard 
                title="Post-Test"
                desc="Menguji penguasaan materi level. 3 soal: 1 Easy, 1 Medium, 1 Hard (Coding)."
                unlocked={user?.assessmentAccess?.post_test ?? false}
                duration={durations.post_test}
                onClick={() => setAssessmentType('post_test')}
              />
              <MenuCard 
                title="Program Keterampilan"
                desc="Membuat program fungsional sesuai petunjuk khusus studi kasus."
                unlocked={user?.assessmentAccess?.program_keterampilan ?? false}
                duration={durations.program_keterampilan}
                onClick={() => setAssessmentType('program_keterampilan')}
              />
              <MenuCard 
                title="Ujian Praktik"
                desc="Ujian evaluasi akhir komprehensif. Membutuhkan token asisten laboratorium."
                unlocked={user?.assessmentAccess?.ujian_praktik ?? false}
                duration={durations.ujian_praktik}
                onClick={() => setAssessmentType('ujian_praktik')}
              />
            </div>

            {/* Rekap Nilai Asesmen */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4 text-zinc-900">Rekap Nilai Asesmen Anda</h3>
              <div className="overflow-x-auto border border-zinc-100 rounded-2xl">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-50 text-zinc-500 font-bold border-b border-zinc-100">
                      <th className="p-3">Asesmen</th>
                      <th className="p-3 text-center">Status</th>
                      <th className="p-3 text-center">Skor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 font-medium">
                    {scoreRecap.map(r => (
                      <tr key={r.menu_type} className="hover:bg-zinc-50/50">
                        <td className="p-3 font-bold text-zinc-800">{r.menu_type.replace(/_/g, ' ').toUpperCase()}</td>
                        <td className="p-3 text-center">
                          <span className={cn(
                            "text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider",
                            r.status === 'graded' ? 'bg-blue-50 text-blue-700' :
                            r.status === 'submitted' ? 'bg-emerald-50 text-emerald-700' :
                            r.status === 'in_progress' ? 'bg-amber-50 text-amber-700' : 'bg-zinc-100 text-zinc-400'
                          )}>
                            {r.status === 'graded' ? 'Dinilai' : 
                             r.status === 'submitted' ? 'Dikumpulkan' : 
                             r.status === 'in_progress' ? 'Sedang Dikerjakan' : 'Belum Mulai'}
                          </span>
                        </td>
                        <td className="p-3 text-center font-black text-lg text-zinc-900">
                          {r.final_score !== null && r.final_score !== undefined ? r.final_score : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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
              <div className="flex justify-center gap-4 py-2">
                <span className="px-4 py-1.5 bg-zinc-100 text-zinc-700 rounded-xl text-xs font-bold flex items-center gap-1.5">
                  ⏱️ Durasi: {durations[assessmentType] || 0} Menit
                </span>
                <span className="px-4 py-1.5 bg-rose-50 text-rose-700 rounded-xl text-xs font-bold flex items-center gap-1.5">
                  📝 {assessmentType === 'program_keterampilan' ? '1 Soal Studi Kasus' : 
                      assessmentType === 'ujian_praktik' ? '6 Soal Komprehensif' : 
                      assessmentType === 'pre_test' ? '5 Soal Evaluasi' : '3 Soal Evaluasi'}
                </span>
              </div>
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
        {attempt && questions.length > 0 && attempt.menu_type === 'program_keterampilan' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-[calc(100vh-200px)] bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
            {/* Left: Instruction + Terminal Mockup */}
            <div className="flex flex-col border-r border-zinc-200 overflow-y-auto">
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between mb-2 border-b border-zinc-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 px-2.5 py-1 rounded-full">Studi Kasus</span>
                  </div>
                  <span className={cn(
                    "text-xs px-3 py-1 rounded-lg font-bold text-white font-mono flex items-center gap-1 bg-zinc-800",
                    timeLeft !== null && timeLeft < 300 && "bg-rose-600 animate-pulse"
                  )}>
                    <Timer size={12} /> {formatTime(timeLeft)}
                  </span>
                </div>
                <h3 className="text-xl font-black text-zinc-900">{questions[0]?.title}</h3>
                {/* Instruction Content formatted beautifully */}
                <div className="space-y-4">
                  {questions[0]?.instruction?.split(/(?=\n\d+\.)|(?=\nContoh Output)/i).map((part, idx) => {
                    const trimmed = part.trim();
                    if (!trimmed) return null;
                    
                    if (trimmed.toLowerCase().startsWith('contoh output')) {
                      return (
                        <div key={idx} className="bg-zinc-900 rounded-xl overflow-hidden shadow-sm mt-6">
                          <div className="bg-zinc-800 px-4 py-2 text-[10px] font-mono text-zinc-400 font-bold tracking-widest uppercase flex items-center gap-2">
                            <Terminal size={12} className="text-emerald-400" />
                            Contoh Output Program
                          </div>
                          <pre className="p-4 text-emerald-400 font-mono text-xs whitespace-pre-wrap">
                            {trimmed.replace(/^Contoh Output.*?:?/i, '').trim()}
                          </pre>
                        </div>
                      );
                    }
                    
                    const isNumbered = /^\d+\./.test(trimmed);
                    if (isNumbered) {
                      const match = trimmed.match(/^(\d+)\.\s*(.*)/s);
                      if (match) {
                        return (
                          <div key={idx} className="flex gap-3 items-start bg-zinc-50 border border-zinc-100 p-4 rounded-2xl">
                            <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                              {match[1]}
                            </div>
                            <div className="text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap">
                              {match[2]}
                            </div>
                          </div>
                        );
                      }
                    }

                    // Regular text
                    return (
                      <p key={idx} className="text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap">
                        {trimmed}
                      </p>
                    );
                  })}
                </div>
              </div>
              {/* Retro Terminal Mockup */}
              <div className="mx-6 mb-6 bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-lg">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border-b border-zinc-800">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  <span className="text-zinc-500 text-[10px] font-mono ml-2">contoh_output.py — Terminal</span>
                </div>
                <div className="p-4 font-mono text-sm text-emerald-400 leading-relaxed min-h-[120px]">
                  <div className="text-zinc-500">$ python main.py</div>
                  <div className="mt-1">{questions[0]?.reference_solution ? '>>> Program berhasil dijalankan' : '>>> Menunggu program Anda...'}</div>
                  <div className="text-amber-300 mt-1">{'> Output akan tampil di sini setelah dinilai'}</div>
                  <div className="animate-pulse text-emerald-300 mt-2">█</div>
                </div>
              </div>
            </div>
            {/* Right: Code Editor + Submit */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between px-6 py-3 bg-zinc-50 border-b border-zinc-200">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Editor Kode ({detectLang.toUpperCase()})</span>
                <span className="text-[10px] text-zinc-400">Auto-save aktif</span>
              </div>
              <div className="flex-1 min-h-[300px]">
                <CodeEditor
                  code={activeAnswer?.codeSubmitted || ''}
                  onChange={(val) => handleAnswerChange({ codeSubmitted: val || '' })}
                  onRun={() => {}}
                  isLoading={false}
                  language={detectLang as CodeLanguage}
                />
              </div>
              <div className="p-4 border-t border-zinc-200 bg-zinc-50">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/15 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <><Send size={16} /> Kirim Jawaban</>}
                </button>
              </div>
            </div>
          </div>
        )}

        {attempt && questions.length > 0 && attempt.menu_type === 'ujian_praktik' && (
          <div className="space-y-4">
            {/* Top bar with show/hide question list */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-zinc-600">Soal {activeQuestionIdx + 1} / {questions.length}</span>
                <span className={cn(
                  "text-xs px-3 py-1 rounded-lg font-bold text-white font-mono flex items-center gap-1 bg-zinc-800",
                  timeLeft !== null && timeLeft < 300 && "bg-rose-600 animate-pulse"
                )}>
                  <Timer size={12} /> {formatTime(timeLeft)}
                </span>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowQuestionPopover(!showQuestionPopover)}
                  className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-xl font-bold text-sm text-zinc-700 flex items-center gap-2 transition-all"
                >
                  <FileText size={14} />
                  {showQuestionPopover ? 'Sembunyikan Soal' : 'Tampilkan Soal'}
                </button>
                {showQuestionPopover && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 top-12 z-50 bg-white border border-zinc-200 rounded-2xl shadow-xl p-4 w-64 space-y-2"
                  >
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Navigasi Soal</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {questions.map((q, idx) => {
                        const isAnswered = answers[q.id]?.answerText || answers[q.id]?.codeSubmitted;
                        return (
                          <button
                            key={q.id}
                            onClick={() => { setActiveQuestionIdx(idx); setShowQuestionPopover(false); }}
                            className={cn(
                              "py-2 rounded-xl font-bold text-sm transition-all",
                              idx === activeQuestionIdx ? "bg-rose-700 text-white" :
                              isAnswered ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                              "bg-zinc-50 text-zinc-600 hover:bg-zinc-100"
                            )}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
            {/* Main Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-[calc(100vh-260px)] bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
              {/* Left: Question/Instruction */}
              <div className="flex flex-col border-r border-zinc-200 overflow-y-auto p-6 space-y-4">
                {activeQuestion && (
                  <>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full",
                        activeQuestion.difficulty === 'easy' ? "bg-emerald-50 text-emerald-700" :
                        activeQuestion.difficulty === 'medium' ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"
                      )}>{activeQuestion.difficulty}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-zinc-100 text-zinc-600 px-2.5 py-1 rounded-full">
                        {activeQuestion.type.replace('_', ' ')}
                      </span>
                    </div>
                    <h3 className="text-xl font-black">{activeQuestion.title}</h3>
                    <div className="prose prose-zinc max-w-none text-zinc-700 leading-relaxed text-sm">
                      <p className="whitespace-pre-wrap">{activeQuestion.instruction}</p>
                    </div>
                    {activeQuestion.type === 'flowchart_translation' && activeQuestion.flowchart_url && (
                      <div className="border border-zinc-200 rounded-2xl p-4 bg-zinc-50 flex justify-center max-h-96 overflow-hidden">
                        <img src={activeQuestion.flowchart_url} alt="Flowchart" className="object-contain max-h-80" />
                      </div>
                    )}
                  </>
                )}
              </div>
              {/* Right: Editor + Output + Run */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between px-6 py-3 bg-zinc-50 border-b border-zinc-200">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Editor Kode ({detectLang.toUpperCase()})</span>
                  <button
                    onClick={handleRunCode}
                    disabled={isCodeRunning}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 transition-all"
                  >
                    {isCodeRunning ? <Loader2 size={12} className="animate-spin" /> : <Play size={12} fill="currentColor" />}
                    Jalankan
                  </button>
                </div>
                <div className="flex-1 min-h-[300px]">
                  <CodeEditor
                    code={activeAnswer?.codeSubmitted || ''}
                    onChange={(val) => handleAnswerChange({ codeSubmitted: val || '' })}
                    onRun={handleRunCode}
                    isLoading={isCodeRunning}
                    language={detectLang as CodeLanguage}
                  />
                </div>
                {/* Sandbox Output */}
                <div className="h-36 bg-zinc-900 border-t border-zinc-800 p-4 font-mono text-sm text-zinc-100 overflow-y-auto">
                  <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Output Sandbox</div>
                  {activeAnswer?.errors ? (
                    <span className="text-red-400">{activeAnswer.errors}</span>
                  ) : (
                    activeAnswer?.outputStandard || <span className="text-zinc-600 italic">Jalankan program untuk melihat output...</span>
                  )}
                </div>
                {/* Footer Nav */}
                <div className="flex items-center justify-between p-4 border-t border-zinc-200 bg-zinc-50">
                  <button
                    disabled={activeQuestionIdx === 0}
                    onClick={() => setActiveQuestionIdx(prev => prev - 1)}
                    className="px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200 disabled:opacity-50 text-zinc-700 font-bold rounded-xl text-sm flex items-center gap-1"
                  >
                    <ChevronLeft size={16} /> Sebelumnya
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm flex items-center gap-2"
                  >
                    <Send size={16} /> Submit
                  </button>
                  <button
                    disabled={activeQuestionIdx === questions.length - 1}
                    onClick={() => setActiveQuestionIdx(prev => prev + 1)}
                    className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-white font-bold rounded-xl text-sm flex items-center gap-1"
                  >
                    Berikutnya <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. ACTIVE EXAM WORKSPACE - Generic/Default layout for pre_test and post_test */}
        {attempt && questions.length > 0 && attempt.menu_type !== 'program_keterampilan' && attempt.menu_type !== 'ujian_praktik' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="space-y-4 lg:col-span-1">
              {/* Timer Card */}
              <div className={cn(
                "border rounded-2xl p-4 shadow-sm text-center font-bold space-y-1 transition-all",
                timeLeft !== null && timeLeft < 300 
                  ? "bg-rose-50 border-rose-200 text-rose-700 animate-pulse" 
                  : "bg-white border-zinc-200 text-zinc-800"
              )}>
                <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Sisa Waktu</div>
                <div className="text-2xl font-black font-mono flex items-center justify-center gap-2">
                  <Timer size={20} />
                  {formatTime(timeLeft)}
                </div>
              </div>

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
const MenuCard: React.FC<{ title: string; desc: string; unlocked: boolean; duration?: number; onClick: () => void }> = ({ title, desc, unlocked, duration, onClick }) => (
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
      <div className="flex flex-col items-end">
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Menu</span>
        {duration !== undefined && (
          <span className="text-[10px] font-bold text-rose-700 mt-1 bg-rose-50 px-2 py-0.5 rounded-md flex items-center gap-1">
            ⏱️ {duration} mnt
          </span>
        )}
      </div>
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
  </div>
);
