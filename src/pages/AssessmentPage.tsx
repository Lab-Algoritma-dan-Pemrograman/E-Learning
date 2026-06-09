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
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
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
  const [studentAttempts, setStudentAttempts] = useState<any[]>([]);
  const [questionsMetadata, setQuestionsMetadata] = useState<Record<string, { module_association: number | null; title: string }>>({});
  const [loadingRecap, setLoadingRecap] = useState(false);
  const [inspectingAttempt, setInspectingAttempt] = useState<{ attempt: any; questions: any[] } | null>(null);
  const [zoomImageUrl, setZoomImageUrl] = useState<string | null>(null);
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

  // Fetch attempts and questions metadata for grouped score recap
  useEffect(() => {
    if (!user) return;
    const fetchAttemptsAndQuestions = async () => {
      setLoadingRecap(true);
      try {
        const { data: attemptsData, error: attemptsErr } = await supabase
          .from('assessment_attempts')
          .select('*')
          .eq('nim', user.nim)
          .order('started_at', { ascending: false });

        if (attemptsErr) throw attemptsErr;

        const list = attemptsData || [];
        setStudentAttempts(list);

        const qIds = Array.from(new Set(list.flatMap(a => a.selected_questions || [])));
        if (qIds.length > 0) {
          const { data: qData, error: qErr } = await supabase
            .from('assessment_questions')
            .select('id, module_association, title')
            .in('id', qIds);

          if (!qErr && qData) {
            const metadataMap: Record<string, any> = {};
            qData.forEach(q => {
              metadataMap[q.id] = {
                module_association: q.module_association,
                title: q.title
              };
            });
            setQuestionsMetadata(metadataMap);
          }
        }
      } catch (err) {
        console.error("Failed to load student recap details:", err);
      } finally {
        setLoadingRecap(false);
      }
    };

    fetchAttemptsAndQuestions();
  }, [user, attempt]);

  const resolveAttemptDetails = (att: any) => {
    const firstQId = att.selected_questions?.[0];
    const qMeta = firstQId ? questionsMetadata[firstQId] : null;
    
    let moduleAssociation = qMeta?.module_association || null;
    let kode = null;
    
    if (att.menu_type === 'ujian_praktik' && qMeta) {
      const match = qMeta.title.match(/\[Kode\s*([^\]]+)\]/i);
      kode = match ? match[1].toUpperCase() : null;
    }

    return { moduleAssociation, kode };
  };

  const handleViewRecapDetails = async (att: any) => {
    setLoading(true);
    try {
      const { data: qData, error: qErr } = await supabase
        .from('assessment_questions')
        .select('*')
        .in('id', att.selected_questions);

      if (qErr) throw qErr;

      setInspectingAttempt({
        attempt: att,
        questions: att.selected_questions.map((id: string) => qData?.find(q => q.id === id)).filter(Boolean)
      });
    } catch (err: any) {
      alert("Gagal memuat detail jawaban: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const parseInstructionAndOutput = (instructionText: string) => {
    if (!instructionText) return { instruction: '', contohOutput: '' };
    const parts = instructionText.split('---CONTOH_OUTPUT---');
    return {
      instruction: parts[0].trim(),
      contohOutput: parts[1] ? parts[1].trim() : ''
    };
  };

  const renderInstructionCards = (instructionText: string) => {
    const { instruction } = parseInstructionAndOutput(instructionText);
    const parts = instruction
      .split(/(?=\r?\n\d+\.)|(?=\r?\n-\s)|(?:\r?\n){2,}/)
      .map(p => p.trim())
      .filter(Boolean);

    return (
      <div className="space-y-3">
        {parts.map((part, idx) => (
          <div 
            key={idx} 
            className="bg-zinc-50/50 border border-zinc-200/80 p-4.5 rounded-2xl shadow-xs flex items-start gap-3.5 hover:border-zinc-300 transition-colors"
          >
            <div className="w-6 h-6 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-rose-100">
              {idx + 1}
            </div>
            <p className="text-zinc-700 text-sm leading-relaxed font-medium whitespace-pre-wrap flex-1">
              {part}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const MacbookTerminal: React.FC<{ title: string; content: string }> = ({ title, content }) => {
    if (!content) return null;
    return (
      <div className="bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-lg mt-4">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border-b border-zinc-800">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
          <span className="text-zinc-500 text-[10px] font-mono ml-2">{title} — Terminal</span>
        </div>
        <div className="p-4 font-mono text-xs text-emerald-400 leading-relaxed min-h-[100px] whitespace-pre-wrap">
          {content}
        </div>
      </div>
    );
  };

  const ImagePreview: React.FC<{ url: string; label?: string }> = ({ url, label = "Gambar Lampiran / Flowchart" }) => {
    if (!url) return null;
    return (
      <div className="space-y-2">
        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{label}</label>
        <div className="relative group border border-zinc-200 rounded-2xl p-2 bg-zinc-50 flex justify-center max-h-72 overflow-hidden shadow-xs">
          <img src={url} alt="Flowchart/SS" className="object-contain max-h-64 rounded-xl" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
            <button
              onClick={() => setZoomImageUrl(url)}
              className="px-4 py-2 bg-white text-zinc-800 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform"
            >
              🔍 Perbesar Gambar
            </button>
          </div>
        </div>
      </div>
    );
  };

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
  const isReloading = useRef(false);

  useEffect(() => {
    if (!attempt || attempt.status !== 'in_progress' || !user) return;

    tabSwitchCountRef.current = attempt.tab_switch_count || 0;

    const handleTabSwitch = async () => {
      if (isReloading.current) return;
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

    const handleBeforeUnload = () => {
      isReloading.current = true;
      setTimeout(() => {
        isReloading.current = false;
      }, 2000);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('beforeunload', handleBeforeUnload);
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
        assessmentType === 'ujian_praktik' ? tokenInput.trim().toUpperCase() : null,
        selectedModule
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
      setSelectedModule(null);
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
      setSelectedModule(null);
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
                  setPage('dashboard');
                } else if (selectedModule !== null) {
                  setSelectedModule(null);
                } else if (assessmentType !== null) {
                  setAssessmentType(null);
                } else {
                  setPage('dashboard');
                }
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

            {/* Rekap Nilai Asesmen per Modul */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4 text-zinc-900">Rekap Jawaban & Nilai Asesmen</h3>
              {loadingRecap && studentAttempts.length === 0 ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="animate-spin text-rose-700" size={20} />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(m => {
                      const preAttempt = studentAttempts.find(a => a.menu_type === 'pre_test' && resolveAttemptDetails(a).moduleAssociation === m);
                      const postAttempt = studentAttempts.find(a => a.menu_type === 'post_test' && resolveAttemptDetails(a).moduleAssociation === m);
                      const pkAttempt = studentAttempts.find(a => a.menu_type === 'program_keterampilan' && resolveAttemptDetails(a).moduleAssociation === m);
                      const upAttempt = studentAttempts.find(a => a.menu_type === 'ujian_praktik');

                      const upQId = upAttempt?.selected_questions?.find(id => questionsMetadata[id]?.module_association === m);
                      const upScore = upAttempt?.ai_grades?.[upQId || '']?.total_score;
                      const upStatus = upAttempt?.status;

                      return (
                        <div key={m} className="border border-zinc-100 rounded-2xl p-5 bg-zinc-50/50 space-y-4 shadow-2xs hover:border-zinc-200 transition-colors">
                          <h4 className="font-extrabold text-sm text-zinc-800 uppercase tracking-widest border-b border-zinc-100 pb-2">
                            Modul {m}
                          </h4>
                          <div className="space-y-3 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-zinc-500">Pre-Test</span>
                              {preAttempt ? (
                                <button
                                  onClick={() => handleViewRecapDetails(preAttempt)}
                                  className="flex items-center gap-2 text-rose-700 hover:underline font-extrabold"
                                >
                                  <span>{preAttempt.status === 'graded' ? `${preAttempt.final_score} Poin` : (preAttempt.status === 'submitted' ? 'Dikumpulkan' : preAttempt.status)}</span>
                                </button>
                              ) : (
                                <span className="text-zinc-400">Belum Mulai</span>
                              )}
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-zinc-500">Post-Test</span>
                              {postAttempt ? (
                                <button
                                  onClick={() => handleViewRecapDetails(postAttempt)}
                                  className="flex items-center gap-2 text-rose-700 hover:underline font-extrabold"
                                >
                                  <span>{postAttempt.status === 'graded' ? `${postAttempt.final_score} Poin` : (postAttempt.status === 'submitted' ? 'Dikumpulkan' : postAttempt.status)}</span>
                                </button>
                              ) : (
                                <span className="text-zinc-400">Belum Mulai</span>
                              )}
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-zinc-500">Prog. Keterampilan</span>
                              {pkAttempt ? (
                                <button
                                  onClick={() => handleViewRecapDetails(pkAttempt)}
                                  className="flex items-center gap-2 text-rose-700 hover:underline font-extrabold"
                                >
                                  <span>{pkAttempt.status === 'graded' ? `${pkAttempt.final_score} Poin` : (pkAttempt.status === 'submitted' ? 'Dikumpulkan' : pkAttempt.status)}</span>
                                </button>
                              ) : (
                                <span className="text-zinc-400">Belum Mulai</span>
                              )}
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-zinc-500">Ujian Praktik</span>
                              {upAttempt ? (
                                <button
                                  onClick={() => handleViewRecapDetails(upAttempt)}
                                  className="flex items-center gap-2 text-rose-700 hover:underline font-extrabold"
                                >
                                  <span>
                                    {upStatus === 'graded' ? (upScore !== undefined ? `${upScore} Poin` : 'Dinilai') : (upStatus === 'submitted' ? 'Dikumpulkan' : upStatus)}
                                  </span>
                                </button>
                              ) : (
                                <span className="text-zinc-400">Belum Mulai</span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MODUL SELECTION SCREEN FOR PRE/POST TEST / PROGRAM KETERAMPILAN */}
        {assessmentType && !attempt && (assessmentType === 'pre_test' || assessmentType === 'post_test' || assessmentType === 'program_keterampilan') && selectedModule === null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-black text-zinc-900">Pilih Modul Asesmen</h3>
              <p className="text-zinc-500 text-sm">
                Pilih modul materi yang ingin Anda kerjakan untuk evaluasi **{assessmentType === 'pre_test' ? 'Pre-Test' : (assessmentType === 'post_test' ? 'Post-Test' : 'Program Keterampilan')}**.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(m => (
                <button
                  key={m}
                  onClick={() => setSelectedModule(m)}
                  className="bg-white border border-zinc-200 hover:border-rose-700 p-6 rounded-3xl text-left hover:shadow-lg transition-all group flex flex-col justify-between h-40 active:scale-95"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 px-2.5 py-1 rounded-full group-hover:bg-rose-700 group-hover:text-white transition-colors">
                      Modul {m}
                    </span>
                    <h4 className="font-extrabold text-base text-zinc-800 mt-3 group-hover:text-zinc-955">
                      {m === 1 ? 'Pengenalan Python / C' :
                       m === 2 ? 'Variabel & Tipe Data' :
                       m === 3 ? 'Percabangan / Kondisi' :
                       m === 4 ? 'Perulangan / Loops' :
                       m === 5 ? 'Fungsi / Functions' :
                       'Struktur Data Dasar'}
                    </h4>
                  </div>
                  <span className="text-xs font-bold text-rose-700 group-hover:underline mt-auto flex items-center gap-1">
                    Mulai Asesmen &rarr;
                  </span>
                </button>
              ))}
            </div>

            <div className="flex justify-center pt-4">
              <button 
                onClick={() => setAssessmentType(null)}
                className="px-6 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold rounded-xl text-sm transition-all"
              >
                Kembali ke Menu Utama
              </button>
            </div>
          </motion.div>
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
        {assessmentType && !attempt && (!questions || questions.length === 0) && (assessmentType !== 'ujian_praktik' || isTokenPassed) && ((assessmentType !== 'pre_test' && assessmentType !== 'post_test' && assessmentType !== 'program_keterampilan') || selectedModule !== null) && (
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
              {selectedModule !== null && (
                <p className="text-xs font-bold text-rose-700 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full inline-block border border-rose-100">
                  Modul {selectedModule}
                </p>
              )}
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
                Anda akan memulai pengerjaan **{assessmentType.toUpperCase().replace(/_/g, ' ')}** {selectedModule !== null && `Modul ${selectedModule}`}. 
                Waktu pengerjaan akan segera dihitung mundur setelah Anda menekan tombol di bawah.
                Sistem auto-save aktif untuk mengamankan jawaban draf Anda.
              </p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  if (assessmentType === 'pre_test' || assessmentType === 'post_test' || assessmentType === 'program_keterampilan') {
                    setSelectedModule(null);
                  } else {
                    setAssessmentType(null);
                  }
                }}
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
                {renderInstructionCards(questions[0]?.instruction)}
                {questions[0]?.flowchart_url && (
                  <div className="pt-2">
                    <ImagePreview url={questions[0].flowchart_url} label="Gambar Pendukung / SS Kode" />
                  </div>
                )}
                {(() => {
                  const { contohOutput } = parseInstructionAndOutput(questions[0]?.instruction);
                  return <MacbookTerminal title="contoh_output.py" content={contohOutput} />;
                })()}
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
                    {renderInstructionCards(activeQuestion.instruction)}
                    {activeQuestion.flowchart_url && (
                      <div className="pt-2">
                        <ImagePreview url={activeQuestion.flowchart_url} label={activeQuestion.type === 'flowchart_translation' ? "Gambar Flowchart" : "Gambar Lampiran Soal"} />
                      </div>
                    )}
                    {(() => {
                      const { contohOutput } = parseInstructionAndOutput(activeQuestion.instruction);
                      return <MacbookTerminal title="contoh_output.py" content={contohOutput} />;
                    })()}
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

                  {/* Instruction Cards */}
                  {renderInstructionCards(activeQuestion.instruction)}

                  {/* Image/Screenshot Preview */}
                  {activeQuestion.flowchart_url && (
                    <div className="pt-2">
                      <ImagePreview url={activeQuestion.flowchart_url} label="Gambar Pendukung / SS Kode" />
                    </div>
                  )}

                  {(() => {
                    const { contohOutput } = parseInstructionAndOutput(activeQuestion.instruction);
                    return <MacbookTerminal title="contoh_output.py" content={contohOutput} />;
                  })()}

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
        {/* INSPECTOR MODAL */}
        <AnimatePresence>
          {inspectingAttempt && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden border border-zinc-200"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-5 border-b border-zinc-100 shrink-0">
                  <div>
                    <h3 className="text-xl font-black text-zinc-900">Detail Hasil Jawaban Anda</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Tipe Asesmen: <span className="font-bold text-rose-700 uppercase">{inspectingAttempt.attempt.menu_type.replace(/_/g, ' ')}</span>
                      {inspectingAttempt.attempt.status === 'graded' && ` • Nilai Akhir: ${inspectingAttempt.attempt.final_score} Poin`}
                    </p>
                  </div>
                  <button
                    onClick={() => setInspectingAttempt(null)}
                    className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold rounded-xl text-xs transition-all active:scale-95"
                  >
                    Tutup
                  </button>
                </div>
                
                {/* Body */}
                <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                  {inspectingAttempt.questions.map((q: any, idx: number) => {
                    const ans = inspectingAttempt.attempt.answers?.[q.id] || {};
                    const grade = inspectingAttempt.attempt.ai_grades?.[q.id] || null;
                    const { instruction, contohOutput } = parseInstructionAndOutput(q.instruction);

                    return (
                      <div key={q.id} className="border border-zinc-200 rounded-3xl p-6 bg-zinc-50 space-y-4 shadow-3xs">
                        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                          <h4 className="font-black text-base text-rose-800">Soal {idx + 1}: {q.title}</h4>
                          <span className="text-[10px] bg-zinc-200 text-zinc-700 px-2 py-0.5 rounded-full font-bold uppercase">
                            {q.type.replace(/_/g, ' ')}
                          </span>
                        </div>

                        {/* Instruction Cards */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">Instruksi Soal</label>
                          {renderInstructionCards(q.instruction)}
                        </div>

                        {/* Flowchart/Screenshot if any */}
                        {q.flowchart_url && (
                          <div className="pt-2">
                            <ImagePreview url={q.flowchart_url} label={q.type === 'flowchart_translation' ? "Gambar Flowchart" : "Gambar Lampiran Soal"} />
                          </div>
                        )}

                        {/* Contoh Output Terminal */}
                        {contohOutput && (
                          <div className="pt-2">
                            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">Contoh Output Terminal</label>
                            <MacbookTerminal title="main.py" content={contohOutput} />
                          </div>
                        )}

                        {/* Student Answer */}
                        <div className="space-y-2 pt-2">
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">Jawaban Anda</label>
                          {q.type === 'coding' || q.type === 'flowchart_translation' ? (
                            <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-2xl text-xs overflow-x-auto font-mono max-h-60 shadow-inner">
                              {ans.codeSubmitted || 'KOSONG'}
                            </pre>
                          ) : (
                            <div className="bg-white border border-zinc-200 p-4 rounded-2xl text-xs text-zinc-700 leading-relaxed whitespace-pre-wrap">
                              {ans.answerText || 'KOSONG'}
                            </div>
                          )}
                        </div>

                        {/* AI Grading Feedback */}
                        {grade && (
                          <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl space-y-3 text-xs text-blue-900 shadow-2xs">
                            <div className="flex items-center justify-between font-bold border-b border-blue-100/50 pb-2">
                              <span>Skor Soal: {grade.total_score} Poin</span>
                              {grade.scores && (
                                <div className="flex gap-2 text-[9px]">
                                  {Object.entries(grade.scores).map(([k, v]: [string, any]) => (
                                    <span key={k} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold uppercase tracking-wider font-mono">
                                      {k.replace(/_/g, ' ')}: {v}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <p className="leading-relaxed whitespace-pre-wrap">{grade.feedback || 'Tidak ada catatan.'}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ZOOM IMAGE OVERLAY */}
        <AnimatePresence>
          {zoomImageUrl && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-5xl max-h-[90vh] bg-white p-2 rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center"
              >
                <button
                  onClick={() => setZoomImageUrl(null)}
                  className="absolute top-4 right-4 bg-zinc-900/80 hover:bg-zinc-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md transition-all active:scale-95"
                >
                  ✕
                </button>
                <img src={zoomImageUrl} alt="Zoomed View" className="object-contain max-w-full max-h-[85vh] rounded-2xl" />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
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
