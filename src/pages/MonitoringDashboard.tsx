import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { useStore } from '../store/useStore';
import { monitoringService, ActiveSession, ActivityLog } from '../services/monitoringService';
import { assessmentService, AssessmentAttempt } from '../services/assessmentService';
import { assessmentTokenService, AssessmentToken } from '../services/assessmentTokenService';
import { supabase } from '../lib/supabase';
import { Monitor, Key, Terminal, RefreshCw, CheckSquare, Square, Play, ShieldAlert, Clock, Loader2, Database, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export const MonitoringDashboard: React.FC = () => {
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState<'monitoring' | 'tokens' | 'logs'>('monitoring');
  
  // Realtime lists
  const [sessions, setSessions] = useState<ActiveSession[]>([]);
  const [auditLogs, setAuditLogs] = useState<ActivityLog[]>([]);
  
  // Assessment attempts state
  const [attempts, setAttempts] = useState<any[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<'pre_test' | 'post_test' | 'program_keterampilan' | 'ujian_praktik'>('ujian_praktik');
  
  // Token state
  const [tokens, setTokens] = useState<AssessmentToken[]>([]);
  const [tokenLimit, setTokenLimit] = useState(40);
  const [tokenClasses, setTokenClasses] = useState('3A');
  const [tokenDuration, setTokenDuration] = useState(4);
  const [isGeneratingToken, setIsGeneratingToken] = useState(false);

  // Users perizinan list
  const [students, setStudents] = useState<any[]>([]);
  const [searchFilter, setSearchFilter] = useState('');

  // Bulk Choice State
  const [selectedAttempts, setSelectedAttempts] = useState<string[]>([]);
  const [isGrading, setIsGrading] = useState(false);
  const [gradingProgress, setGradingProgress] = useState('');

  // Draft inspection modal state
  const [inspectingAttempt, setInspectingAttempt] = useState<any | null>(null);
  const [editScores, setEditScores] = useState<Record<string, { total_score: number; feedback: string }>>({});
  const [editFinalScore, setEditFinalScore] = useState<number>(0);
  const [isSavingManualGrade, setIsSavingManualGrade] = useState(false);

  useEffect(() => {
    if (inspectingAttempt) {
      const initialScores: Record<string, { total_score: number; feedback: string }> = {};
      inspectingAttempt.selected_questions?.forEach((qId: string) => {
        const qGrade = inspectingAttempt.ai_grades?.[qId] || {};
        initialScores[qId] = {
          total_score: qGrade.total_score !== undefined && qGrade.total_score !== null ? Number(qGrade.total_score) : 0,
          feedback: qGrade.feedback || ''
        };
      });
      setEditScores(initialScores);
      setEditFinalScore(inspectingAttempt.final_score !== undefined && inspectingAttempt.final_score !== null ? Number(inspectingAttempt.final_score) : 0);
    } else {
      setEditScores({});
      setEditFinalScore(0);
    }
  }, [inspectingAttempt]);

  const handleQuestionScoreChange = (qId: string, val: number) => {
    setEditScores(prev => {
      const next = {
        ...prev,
        [qId]: {
          ...prev[qId],
          total_score: val
        }
      };
      const values = Object.values(next).map(x => x.total_score);
      const avg = values.length > 0 ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0;
      setEditFinalScore(avg);
      return next;
    });
  };

  const handleSaveManualGrade = async () => {
    if (!inspectingAttempt || !user) return;
    setIsSavingManualGrade(true);
    try {
      const nextAiGrades = { ...(inspectingAttempt.ai_grades || {}) };
      inspectingAttempt.selected_questions.forEach((qId: string) => {
        const existingQGrade = nextAiGrades[qId] || {};
        nextAiGrades[qId] = {
          ...existingQGrade,
          total_score: editScores[qId]?.total_score ?? 0,
          feedback: editScores[qId]?.feedback ?? ''
        };
      });

      const { error } = await supabase
        .from('assessment_attempts')
        .update({
          ai_grades: nextAiGrades,
          final_score: Number(editFinalScore),
          status: 'graded',
          graded_at: new Date().toISOString()
        })
        .eq('id', inspectingAttempt.id);

      if (error) throw error;

      await monitoringService.addAuditLog(
        user.nim,
        user.nama,
        'ai_grading',
        `Menilai manual pengerjaan NIM ${inspectingAttempt.nim} (${inspectingAttempt.menu_type}) dengan skor ${editFinalScore}`
      );

      alert("Nilai manual berhasil disimpan!");
      setInspectingAttempt(null);
      fetchAttempts();
    } catch (err: any) {
      alert(`Gagal menyimpan nilai manual: ${err.message}`);
    } finally {
      setIsSavingManualGrade(false);
    }
  };

  const [classFilter, setClassFilter] = useState<string>('all');
  const [majorFilter, setMajorFilter] = useState<string>('all');
  const [questionsMetadata, setQuestionsMetadata] = useState<Record<string, { module_association: number | null; title: string; type: string }>>({});

  const resolveAttemptDetails = (att: any) => {
    const questionIds = att.selected_questions || [];
    const firstQId = questionIds[0];
    const qMeta = questionsMetadata[firstQId];
    let moduleAssociation = qMeta?.module_association || null;
    let type = qMeta?.type || '';
    return { moduleAssociation, type };
  };

  // Initialize data subscriptions
  useEffect(() => {
    // 1. Subscribe to online sessions
    const unsubSessions = monitoringService.subscribeActiveSessions(setSessions);
    
    // 2. Subscribe to logs
    const unsubLogs = monitoringService.subscribeAuditLogs(setAuditLogs);

    // 3. Fetch initial tokens
    fetchTokens();

    // 4. Fetch student profiles for perizinan
    fetchStudents();

    // 5. Fetch attempts
    fetchAttempts();

    // Fetch questions metadata
    const fetchQuestionsMetadata = async () => {
      const { data } = await supabase
        .from('assessment_questions')
        .select('id, module_association, title, type');
      if (data) {
        const meta: Record<string, any> = {};
        data.forEach(q => {
          meta[q.id] = {
            module_association: q.module_association,
            title: q.title,
            type: q.type
          };
        });
        setQuestionsMetadata(meta);
      }
    };
    fetchQuestionsMetadata();

    return () => {
      unsubSessions();
      unsubLogs();
    };
  }, [selectedMenu]);

  const fetchTokens = async () => {
    try {
      const data = await assessmentTokenService.getAllTokens();
      setTokens(data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchStudents = async () => {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'praktikan')
      .order('nim');
    setStudents(data || []);
  };

  const fetchAttempts = async () => {
    try {
      const data = await assessmentService.getAllAttempts(selectedMenu);
      setAttempts(data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleGenerateToken = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsGeneratingToken(true);
    try {
      const classes = tokenClasses.split(',').map(c => c.trim()).filter(Boolean);
      const token = await assessmentTokenService.generateToken(user.nim, tokenLimit, classes, tokenDuration);
      
      await monitoringService.addAuditLog(user.nim, user.nama, 'token_generated', `Membuat token '${token.token}' untuk kelas [${classes.join(', ')}]`);
      fetchTokens();
    } catch (err) {
      alert("Gagal membuat token.");
    } finally {
      setIsGeneratingToken(false);
    }
  };

  const handleDeactivateToken = async (tokenStr: string) => {
    if (!user) return;
    try {
      await assessmentTokenService.deactivateToken(tokenStr);
      await monitoringService.addAuditLog(user.nim, user.nama, 'token_used', `Menonaktifkan token '${tokenStr}'`);
      fetchTokens();
    } catch (e) {
      alert("Gagal menonaktifkan token.");
    }
  };

  // Toggle student menu permissions
  const handleToggleAccess = async (nim: string, field: string, currentValue: boolean) => {
    if (!user) return;
    const { data: profile } = await supabase
      .from('users')
      .select('assessment_access')
      .eq('nim', nim)
      .single();

    if (profile) {
      const updatedAccess = {
        ...profile.assessment_access,
        [field]: !currentValue
      };

      const { error } = await supabase
        .from('users')
        .update({ assessment_access: updatedAccess })
        .eq('nim', nim);

      if (!error) {
        await monitoringService.addAuditLog(
          user.nim, 
          user.nama, 
          'access_modified', 
          `Mengubah izin akses asesmen ${field} NIM ${nim} menjadi ${!currentValue}`
        );
        fetchStudents();
      }
    }
  };

  // Batch toggle: Open/Lock ALL students for a specific assessment type
  const handleBatchToggleAll = async (field: string, open: boolean) => {
    if (!user) return;
    const targetStudents = filteredStudents.length > 0 ? filteredStudents : students;
    if (targetStudents.length === 0) return;

    const confirmed = window.confirm(
      `${open ? 'BUKA' : 'KUNCI'} akses ${field.replace(/_/g, ' ').toUpperCase()} untuk ${targetStudents.length} mahasiswa?`
    );
    if (!confirmed) return;

    try {
      // Update all students in batch
      for (const s of targetStudents) {
        const currentAccess = s.assessment_access || {};
        const updatedAccess = { ...currentAccess, [field]: open };
        await supabase
          .from('users')
          .update({ assessment_access: updatedAccess })
          .eq('nim', s.nim);
      }

      await monitoringService.addAuditLog(
        user.nim,
        user.nama,
        'access_modified',
        `${open ? 'Membuka' : 'Mengunci'} akses ${field} untuk ${targetStudents.length} mahasiswa`
      );
      fetchStudents();
    } catch (err) {
      console.error('Batch toggle error:', err);
      alert('Gagal mengubah izin secara massal.');
    }
  };

  // Bulk AI Grading call
  const handleBulkGrading = async () => {
    if (selectedAttempts.length === 0 || !user) return;
    setIsGrading(true);
    setGradingProgress(`Menilai ${selectedAttempts.length} pengerjaan massal via AI...`);
    try {
      const results = await assessmentService.triggerAIGrading(selectedAttempts);
      await monitoringService.addAuditLog(user.nim, user.nama, 'ai_grading', `Melakukan bulk AI grading pada ${results.gradedCount} pengerjaan`);
      
      alert(`Penilaian AI selesai! Berhasil menilai ${results.gradedCount} pengerjaan.`);
      setSelectedAttempts([]);
      fetchAttempts();
    } catch (e: any) {
      alert(`Error penilaian AI: ${e.message}`);
    } finally {
      setIsGrading(false);
      setGradingProgress('');
    }
  };

  const toggleSelectAttempt = (id: string) => {
    setSelectedAttempts(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Helper to determine cell color based on questions & answers state
  const getCellColorClass = (qId: string, studentAttempt: any) => {
    if (!studentAttempt) return 'bg-zinc-50 border-zinc-200 text-zinc-400';
    
    const status = studentAttempt.status;
    const answers = studentAttempt.answers || {};
    const aiGrades = studentAttempt.ai_grades || {};

    if (status === 'graded') {
      const qGrade = aiGrades[qId] || {};
      return 'bg-blue-50 border-blue-200 text-blue-800 font-black cursor-pointer'; // Graded
    }

    if (status === 'submitted') {
      return 'bg-emerald-50 border-emerald-200 text-emerald-800 cursor-pointer'; // Submitted
    }

    // in progress: check if answers contain draft
    const ans = answers[qId] || {};
    if (ans.answerText?.trim() || ans.codeSubmitted?.trim()) {
      return 'bg-amber-50 border-amber-200 text-amber-700 cursor-pointer'; // Draft saved
    }

    return 'bg-zinc-100 border-zinc-200 text-zinc-400'; // Empty
  };

  const getCellLabel = (qId: string, studentAttempt: any) => {
    if (!studentAttempt) return '—';
    const status = studentAttempt.status;
    if (status === 'graded') {
      const grade = studentAttempt.ai_grades?.[qId]?.total_score ?? '✓';
      return String(grade);
    }
    if (status === 'submitted') return 'SUBMIT';
    
    const ans = studentAttempt.answers?.[qId] || {};
    if (ans.answerText?.trim() || ans.codeSubmitted?.trim()) return 'DRAFT';

    return 'KOSONG';
  };

  const filteredStudents = students.filter(s => 
    s.nama.toLowerCase().includes(searchFilter.toLowerCase()) || 
    s.nim.includes(searchFilter) ||
    s.kelas.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // Derive unique classes from attempts data
  const uniqueClasses = [...new Set(attempts.map((a: any) => a.users?.kelas).filter(Boolean))];

  // Major detection from NIM prefix
  const getMajorFromNim = (nim: string) => {
    if (nim.startsWith('202515')) return 'Teknik Informatika';
    if (nim.startsWith('202516')) return 'Sistem Informasi';
    if (nim.startsWith('202517')) return 'Teknik Komputer';
    return 'Lainnya';
  };
  const uniqueMajors = [...new Set(attempts.map((a: any) => getMajorFromNim(a.nim)).filter(Boolean))];

  // Deduplicate attempts: keep only latest per NIM
  const deduplicatedAttempts = (() => {
    const map = new Map<string, any>();
    for (const att of attempts) {
      const existing = map.get(att.nim);
      if (!existing || new Date(att.started_at) > new Date(existing.started_at)) {
        map.set(att.nim, att);
      }
    }
    return [...map.values()];
  })();

  // Apply class and major filters
  const filteredAttempts = deduplicatedAttempts.filter(att => {
    if (classFilter !== 'all' && att.users?.kelas !== classFilter) return false;
    if (majorFilter !== 'all' && getMajorFromNim(att.nim) !== majorFilter) return false;
    return true;
  });

  // Online sessions (heartbeat < 60s)
  const onlineSessions = sessions.filter(s => (Date.now() - new Date(s.last_heartbeat).getTime()) < 60000);

  return (
    <Layout>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-zinc-900">Dashboard Monitoring & Asisten</h1>
            <p className="text-zinc-500 text-sm mt-1">Pantau status pengerjaan, buat token ujian, dan picu bulk AI grading.</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => { fetchAttempts(); fetchStudents(); fetchTokens(); }}
              className="p-2.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl transition-all"
              title="Refresh Data"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </div>

        {/* TABS SELECTOR */}
        <div className="flex border-b border-zinc-200">
          <TabButton active={activeTab === 'monitoring'} icon={<Monitor size={16} />} label="Monitoring & Rekap Jawaban" onClick={() => setActiveTab('monitoring')} />
          <TabButton active={activeTab === 'tokens'} icon={<Key size={16} />} label="Token & Perizinan" onClick={() => setActiveTab('tokens')} />
          <TabButton active={activeTab === 'logs'} icon={<Terminal size={16} />} label="Log Aktivitas Audit" onClick={() => setActiveTab('logs')} />
        </div>

        {/* 1. MONITORING TAB */}
        {activeTab === 'monitoring' && (
          <div className="space-y-8">
            {/* Live Online Users count */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="Online Saat Ini" value={sessions.filter(s => (Date.now() - new Date(s.last_heartbeat).getTime()) < 60000).length} desc="Heartbeat terdeteksi < 1 menit" color="rose" />
              <StatCard title="Ujian Terkumpul" value={attempts.filter(a => a.status === 'submitted').length} desc="Siap untuk dinilai AI" color="emerald" />
              <StatCard title="Selesai Dinilai" value={attempts.filter(a => a.status === 'graded').length} desc="Skor telah tersimpan" color="blue" />
            </div>

            {/* Rekap Jawaban Matrix */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg">Rekap & Live Inspector {selectedMenu === 'ujian_praktik' ? 'Soal' : 'Modul'}</h3>
                  <p className="text-xs text-zinc-500 mt-1">Klik nama mahasiswa untuk menginspeksi kode draf hasil auto-save secara real-time.</p>
                </div>
                <div className="flex items-center gap-4">
                  <select 
                    value={selectedMenu}
                    onChange={(e: any) => setSelectedMenu(e.target.value)}
                    className="px-4 py-2 border border-zinc-200 rounded-xl outline-none font-bold text-sm bg-zinc-50 focus:border-rose-700"
                  >
                    <option value="pre_test">PRE-TEST</option>
                    <option value="post_test">POST-TEST</option>
                    <option value="program_keterampilan">PROGRAM KETERAMPILAN</option>
                    <option value="ujian_praktik">UJIAN PRAKTIK</option>
                  </select>

                  <select
                    value={classFilter}
                    onChange={(e: any) => setClassFilter(e.target.value)}
                    className="px-4 py-2 border border-zinc-200 rounded-xl outline-none font-bold text-sm bg-zinc-50 focus:border-rose-700"
                  >
                    <option value="all">Semua Kelas</option>
                    {uniqueClasses.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>

                  <select
                    value={majorFilter}
                    onChange={(e: any) => setMajorFilter(e.target.value)}
                    className="px-4 py-2 border border-zinc-200 rounded-xl outline-none font-bold text-sm bg-zinc-50 focus:border-rose-700"
                  >
                    <option value="all">Semua Jurusan</option>
                    {uniqueMajors.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>

                  {selectedAttempts.length > 0 && (
                    <button 
                      onClick={handleBulkGrading}
                      disabled={isGrading}
                      className="bg-rose-700 hover:bg-rose-800 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 active:scale-95 transition-all"
                    >
                      {isGrading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Menilai...
                        </>
                      ) : (
                        <>
                          <Play size={14} fill="currentColor" />
                          Grade AI ({selectedAttempts.length} terpilih)
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {isGrading && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs flex items-center gap-2 font-bold animate-pulse">
                  <Loader2 size={14} className="animate-spin" />
                  {gradingProgress}
                </div>
              )}

              <div className="overflow-x-auto border border-zinc-100 rounded-2xl">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-zinc-50 text-zinc-500 font-bold border-b border-zinc-100">
                      <th className="p-4 w-12 text-center">Pilih</th>
                      <th className="p-4 w-64">Nama & Kelas</th>
                      <th className="p-4 w-44">Status Ujian</th>
                      <th className="p-4 text-center">{selectedMenu === 'ujian_praktik' ? 'Soal 1' : 'Modul 1'}</th>
                      <th className="p-4 text-center">{selectedMenu === 'ujian_praktik' ? 'Soal 2' : 'Modul 2'}</th>
                      <th className="p-4 text-center">{selectedMenu === 'ujian_praktik' ? 'Soal 3' : 'Modul 3'}</th>
                      <th className="p-4 text-center">{selectedMenu === 'ujian_praktik' ? 'Soal 4' : 'Modul 4'}</th>
                      <th className="p-4 text-center">{selectedMenu === 'ujian_praktik' ? 'Soal 5' : 'Modul 5'}</th>
                      <th className="p-4 text-center">{selectedMenu === 'ujian_praktik' ? 'Soal 6' : 'Modul 6'}</th>
                      <th className="p-4 text-center w-24">Skor Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 font-medium">
                    {filteredAttempts.length > 0 ? (
                      filteredAttempts.map((att) => {
                        const studentSubmittedAttempts = attempts.filter(
                          a => a.nim === att.nim && a.status === 'submitted'
                        );
                        
                        return (
                          <tr key={att.id} className="hover:bg-zinc-50/50">
                            <td className="p-4 text-center">
                              {studentSubmittedAttempts.length > 0 ? (
                                <div className="flex flex-col gap-1 items-center justify-center">
                                  {studentSubmittedAttempts.map(sa => {
                                    const saDetails = resolveAttemptDetails(sa);
                                    const label = selectedMenu === 'ujian_praktik' ? 'Ujian' : `M${saDetails.moduleAssociation || '?'}`;
                                    const isSelected = selectedAttempts.includes(sa.id);
                                    return (
                                      <button 
                                        key={sa.id}
                                        onClick={() => toggleSelectAttempt(sa.id)}
                                        className="text-rose-700 hover:scale-105 transition-transform flex items-center gap-1 text-[10px] font-bold bg-zinc-50 border border-zinc-200 px-1.5 py-0.5 rounded shadow-sm"
                                        title={`Pilih ${label} untuk dinilai`}
                                      >
                                        {isSelected ? <CheckSquare size={12} /> : <Square size={12} />}
                                        <span>{label}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                              ) : (
                                <span className="text-zinc-300">-</span>
                              )}
                            </td>
                            <td 
                              onClick={() => setInspectingAttempt(att)}
                              className="p-4 font-bold text-rose-800 cursor-pointer hover:underline"
                            >
                              <div>{att.users?.nama || att.nim}</div>
                              <div className="text-[10px] text-zinc-400 font-mono mt-0.5">{att.nim} • {att.users?.kelas || 'N/A'}</div>
                            </td>
                            <td className="p-4">
                              <span className={cn(
                                "text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider",
                                att.status === 'in_progress' ? "bg-amber-50 text-amber-700" :
                                att.status === 'submitted' ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"
                              )}>
                                {att.status}
                              </span>
                            </td>
                            {selectedMenu === 'ujian_praktik' ? (
                              /* Ujian Praktik: Soal 1 s.d. Soal 6 */
                              [0, 1, 2, 3, 4, 5].map((idx) => {
                                const qId = att.selected_questions?.[idx];
                                return (
                                  <td key={idx} className="p-3 text-center">
                                    {qId ? (
                                      <div 
                                        onClick={() => setInspectingAttempt(att)}
                                        className={cn(
                                          "inline-flex w-14 h-9 rounded-lg border text-[10px] font-bold items-center justify-center transition-all hover:scale-105 cursor-pointer",
                                          getCellColorClass(qId, att)
                                        )}
                                      >
                                        {getCellLabel(qId, att)}
                                      </div>
                                    ) : (
                                      <span className="text-zinc-200">—</span>
                                    )}
                                  </td>
                                );
                              })
                            ) : (
                              /* Non-Ujian Praktik: Modul 1 s.d. Modul 6 */
                              [1, 2, 3, 4, 5, 6].map((m) => {
                                const matchAttempt = attempts.find(
                                  a => a.nim === att.nim && resolveAttemptDetails(a).moduleAssociation === m
                                );
                                return (
                                  <td key={m} className="p-3 text-center">
                                    {matchAttempt ? (
                                      <div 
                                        onClick={() => setInspectingAttempt(matchAttempt)}
                                        className={cn(
                                          "inline-flex w-14 h-9 rounded-lg border text-[10px] font-bold items-center justify-center transition-all hover:scale-105 cursor-pointer",
                                          matchAttempt.status === 'graded' ? 'bg-blue-50 border-blue-200 text-blue-800 font-black' :
                                          matchAttempt.status === 'submitted' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
                                          matchAttempt.status === 'in_progress' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                                          'bg-zinc-100 border-zinc-200 text-zinc-400'
                                        )}
                                      >
                                        {matchAttempt.status === 'graded' ? matchAttempt.final_score : 
                                         matchAttempt.status === 'submitted' ? 'SUBMIT' : 'DRAFT'}
                                      </div>
                                    ) : (
                                      <span className="text-zinc-200">—</span>
                                    )}
                                  </td>
                                );
                              })
                            )}
                            <td className="p-4 text-center font-black text-zinc-955 bg-zinc-50/50">
                              {selectedMenu === 'ujian_praktik' ? (
                                att.final_score !== null && att.final_score !== undefined ? att.final_score : '—'
                              ) : (
                                <div className="flex flex-col gap-0.5 text-xs">
                                  {attempts
                                    .filter(a => a.nim === att.nim && a.status === 'graded')
                                    .map(a => {
                                      const mAssoc = resolveAttemptDetails(a).moduleAssociation;
                                      return (
                                        <div key={a.id} className="text-[10px] text-zinc-500 whitespace-nowrap">
                                          Modul {mAssoc}: <span className="font-extrabold text-zinc-800">{a.final_score}</span>
                                        </div>
                                      );
                                    })}
                                  {attempts.filter(a => a.nim === att.nim && a.status === 'graded').length === 0 && '—'}
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={10} className="p-8 text-center text-zinc-500 italic">
                          Belum ada mahasiswa yang memulai pengerjaan asesmen {selectedMenu.toUpperCase()}.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tabel Mahasiswa Online Real-time */}
            <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Mahasiswa Online Saat Ini
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">Menampilkan mahasiswa dengan heartbeat aktif {'<'} 1 menit.</p>
                </div>
                <span className="text-2xl font-black text-emerald-700">{onlineSessions.length}</span>
              </div>
              <div className="overflow-x-auto border border-zinc-100 rounded-2xl">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-zinc-50 text-zinc-500 font-bold border-b border-zinc-100">
                      <th className="p-3">NIM</th>
                      <th className="p-3">Nama</th>
                      <th className="p-3">Kelas</th>
                      <th className="p-3">Lokasi / Aktivitas</th>
                      <th className="p-3 text-center">Terakhir Aktif</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 font-medium">
                    {onlineSessions.length > 0 ? (
                      onlineSessions.map(s => (
                        <tr key={s.nim} className="hover:bg-zinc-50/50">
                          <td className="p-3 font-mono text-xs text-zinc-600">{s.nim}</td>
                          <td className="p-3 font-bold text-zinc-900">{s.nama}</td>
                          <td className="p-3 text-zinc-600">{s.kelas}</td>
                          <td className="p-3">
                            <span className="text-xs px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full font-bold">
                              {s.current_activity?.replace(/_/g, ' ').replace(/taking /i, 'Mengerjakan ').replace(/entering /i, 'Memasuki ').replace('on assessment menu', 'Menu Asesmen') || 'Dashboard'}
                            </span>
                          </td>
                          <td className="p-3 text-center text-xs text-zinc-400">
                            {new Date(s.last_heartbeat).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'})}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-zinc-500 italic">Tidak ada mahasiswa yang online saat ini.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. TOKENS & PERMISSIONS TAB */}
        {activeTab === 'tokens' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Token generator card */}
            <div className="lg:col-span-1 bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-6">
              <div>
                <h3 className="font-bold text-lg">Buat Token Ujian Baru</h3>
                <p className="text-xs text-zinc-500 mt-1">Token 6-digit acak akan di-generate untuk kelas sasaran.</p>
              </div>
              <form onSubmit={handleGenerateToken} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Batas Kuota Penggunaan</label>
                  <input type="number" value={tokenLimit} onChange={(e) => setTokenLimit(Number(e.target.value))} className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none focus:border-rose-700 bg-zinc-50 text-sm font-bold" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Kelas Sasaran (Pisah koma)</label>
                  <input type="text" value={tokenClasses} onChange={(e) => setTokenClasses(e.target.value)} className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none focus:border-rose-700 bg-zinc-50 text-sm font-bold" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Masa Aktif (Jam)</label>
                  <input type="number" value={tokenDuration} onChange={(e) => setTokenDuration(Number(e.target.value))} className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none focus:border-rose-700 bg-zinc-50 text-sm font-bold" />
                </div>
                <button 
                  type="submit"
                  disabled={isGeneratingToken}
                  className="w-full py-3.5 bg-rose-700 hover:bg-rose-800 disabled:opacity-50 text-white font-bold rounded-xl active:scale-95 shadow-md shadow-rose-700/10 transition-all text-sm"
                >
                  {isGeneratingToken ? "Menyusun Token..." : "Generate Token"}
                </button>
              </form>
            </div>

            {/* Token List & Permissions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Token List */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-lg">Daftar Token Ujian Aktif</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-zinc-50 text-zinc-500 font-bold border-b border-zinc-100">
                        <th className="p-3">Kode Token</th>
                        <th className="p-3">Sasaran Kelas</th>
                        <th className="p-3">Penggunaan</th>
                        <th className="p-3">Berakhir</th>
                        <th className="p-3 text-center">Status</th>
                        <th className="p-3 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 font-medium">
                      {tokens.length > 0 ? (
                        tokens.map(t => (
                          <tr key={t.token} className="hover:bg-zinc-50/40">
                            <td className="p-3 font-mono font-black text-rose-800 text-lg tracking-wider">{t.token}</td>
                            <td className="p-3 text-zinc-600 font-bold text-xs">{t.target_classes?.join(', ') || 'Semua'}</td>
                            <td className="p-3 text-xs">{t.usage_count} / {t.usage_limit}</td>
                            <td className="p-3 text-zinc-500 text-xs">{new Date(t.expired_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                            <td className="p-3 text-center">
                              <span className={cn(
                                "text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider",
                                t.status === 'active' ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                              )}>
                                {t.status}
                              </span>
                            </td>
                            <td className="p-3 text-center">
                              {t.status === 'active' && (
                                <button 
                                  onClick={() => handleDeactivateToken(t.token)}
                                  className="text-xs text-red-600 hover:underline font-bold"
                                >
                                  Matikan
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="p-6 text-center text-zinc-500 italic">Belum ada token ujian yang dibuat.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Student Permissions Toggle Panel */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg">Kontrol Sesi Asesmen</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">Buka / Kunci akses asesmen per-mahasiswa atau massal per-kelas.</p>
                  </div>
                  <div className="flex items-center gap-2 border border-zinc-200 px-3 py-1.5 rounded-xl bg-zinc-50 w-full sm:w-64">
                    <Search size={16} className="text-zinc-400" />
                    <input 
                      type="text" 
                      placeholder="Cari NIM/Nama/Kelas..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="bg-transparent text-sm w-full outline-none"
                    />
                  </div>
                </div>

                {/* Batch Control Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { field: 'pre_test', label: 'Pre-Test' },
                    { field: 'post_test', label: 'Post-Test' },
                    { field: 'program_keterampilan', label: 'Keterampilan' },
                    { field: 'ujian_praktik', label: 'Ujian Praktik' },
                  ].map(({ field, label }) => {
                    const openCount = filteredStudents.filter(s => (s.assessment_access || {})[field]).length;
                    const total = filteredStudents.length;
                    const allOpen = total > 0 && openCount === total;
                    return (
                      <div key={field} className="bg-zinc-50 border border-zinc-200 rounded-2xl p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-zinc-600">{label}</span>
                          <span className={cn(
                            "text-[9px] px-1.5 py-0.5 rounded-full font-bold",
                            allOpen ? "bg-emerald-50 text-emerald-700" : openCount > 0 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"
                          )}>
                            {openCount}/{total}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          <button 
                            onClick={() => handleBatchToggleAll(field, true)}
                            className="flex-1 text-[10px] font-bold py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all active:scale-95"
                          >
                            BUKA SEMUA
                          </button>
                          <button 
                            onClick={() => handleBatchToggleAll(field, false)}
                            className="flex-1 text-[10px] font-bold py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all active:scale-95"
                          >
                            KUNCI SEMUA
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="overflow-x-auto max-h-[300px] custom-scrollbar border border-zinc-100 rounded-2xl">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-zinc-50 text-zinc-500 font-bold border-b border-zinc-100 sticky top-0">
                        <th className="p-3 w-64">NIM & Nama</th>
                        <th className="p-3 text-center">Pre-Test</th>
                        <th className="p-3 text-center">Post-Test</th>
                        <th className="p-3 text-center">Keterampilan</th>
                        <th className="p-3 text-center">Ujian Praktik</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 font-medium">
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map(student => {
                          const access = student.assessment_access || {};
                          return (
                            <tr key={student.nim} className="hover:bg-zinc-50/50">
                              <td className="p-3 font-bold text-zinc-900">
                                <div>{student.nama}</div>
                                <div className="text-[9px] text-zinc-400 font-mono">{student.nim} • {student.kelas}</div>
                              </td>
                              {['pre_test', 'post_test', 'program_keterampilan', 'ujian_praktik'].map(field => {
                                const allowed = access[field] ?? false;
                                return (
                                  <td key={field} className="p-3 text-center">
                                    <button
                                      onClick={() => handleToggleAccess(student.nim, field, allowed)}
                                      className={cn(
                                        "px-2.5 py-1 rounded-full font-bold text-[9px] uppercase tracking-wide transition-all active:scale-95",
                                        allowed ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                                      )}
                                    >
                                      {allowed ? 'BUKA' : 'KUNCI'}
                                    </button>
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={5} className="p-6 text-center text-zinc-500 italic">Tidak ada data mahasiswa ditemukan.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. AUDIT LOGS TAB */}
        {activeTab === 'logs' && (
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Terminal size={18} className="text-rose-700" />
              Stream Log Audit Aktivitas
            </h3>
            <div className="bg-zinc-900 text-zinc-300 font-mono text-xs rounded-2xl p-6 h-[450px] overflow-y-auto space-y-3 custom-scrollbar">
              {auditLogs.length > 0 ? (
                auditLogs.map((log, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="text-zinc-500 shrink-0 select-none">
                      [{new Date(log.timestamp).toLocaleTimeString()}]
                    </span>
                    <span className={cn(
                      "font-bold shrink-0",
                      log.event_type === 'login' ? "text-blue-400" :
                      log.event_type === 'start_test' ? "text-amber-400" :
                      log.event_type === 'submit_test' ? "text-emerald-400" :
                      log.event_type === 'token_generated' ? "text-purple-400" : "text-zinc-400"
                    )}>
                      {log.event_type.toUpperCase().replace('_', ' ')}
                    </span>
                    <span className="text-zinc-400 shrink-0 font-bold">{log.nama} ({log.nim}):</span>
                    <span className="text-zinc-200">{log.details}</span>
                  </div>
                ))
              ) : (
                <div className="text-zinc-600 italic">Menunggu log audit sistem...</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* DRAFT INSPECT MODAL (DRAWER) */}
      <AnimatePresence>
        {inspectingAttempt && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-[100]"
              onClick={() => setInspectingAttempt(null)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[550px] bg-white shadow-2xl z-[110] flex flex-col border-l border-zinc-200 p-6 overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-6">
                <div>
                  <h3 className="font-black text-lg">Inspektor Jawaban Real-time</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">{inspectingAttempt.users?.nama} • {inspectingAttempt.nim}</p>
                </div>
                <button 
                  onClick={() => setInspectingAttempt(null)}
                  className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 rounded-xl font-bold text-xs"
                >
                  Tutup
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar pr-2">
                {inspectingAttempt.selected_questions?.map((qId: string, idx: number) => {
                  const ans = inspectingAttempt.answers?.[qId] || {};
                  return (
                    <div key={qId} className="border border-zinc-200 rounded-2xl p-4 bg-zinc-50 space-y-3">
                      <h4 className="font-bold text-sm text-rose-800">
                        {inspectingAttempt.menu_type === 'ujian_praktik' ? `Soal ${idx + 1}` : `Soal ${idx + 1} (Modul ${resolveAttemptDetails(inspectingAttempt).moduleAssociation || '?'})`} ({qId})
                      </h4>
                      {ans.answerText?.trim() && (
                        <div className="space-y-1">
                          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Jawaban Teks</div>
                          <div className="bg-white border border-zinc-100 p-3 rounded-xl text-xs text-zinc-700 leading-relaxed whitespace-pre-wrap">
                            {ans.answerText}
                          </div>
                        </div>
                      )}
                      {ans.codeSubmitted?.trim() && (
                        <div className="space-y-1">
                          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Kode Program</div>
                          <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-xl text-xs overflow-x-auto font-mono max-h-60">
                            {ans.codeSubmitted}
                          </pre>
                        </div>
                      )}
                      {/* AI Feedback */}
                      {inspectingAttempt.ai_grades?.[qId] && (
                        <div className="space-y-2 mt-2 border-t border-zinc-200 pt-3">
                          <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Umpan Balik AI</div>
                          <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl text-xs text-blue-800 leading-relaxed">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold">Skor: {inspectingAttempt.ai_grades[qId].total_score ?? '—'}</span>
                              {inspectingAttempt.ai_grades[qId].scores && (
                                <div className="flex gap-2 text-[9px]">
                                  {Object.entries(inspectingAttempt.ai_grades[qId].scores).map(([key, val]: [string, any]) => (
                                    <span key={key} className="bg-blue-100 px-1.5 py-0.5 rounded font-bold">
                                      {key.replace(/_/g, ' ')}: {val}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <p className="whitespace-pre-wrap">{inspectingAttempt.ai_grades[qId].feedback || 'Tidak ada catatan.'}</p>
                          </div>
                        </div>
                      )}
                      {!ans.answerText?.trim() && !ans.codeSubmitted?.trim() && !inspectingAttempt.ai_grades?.[qId] && (
                        <div className="text-xs text-zinc-400 italic">Mahasiswa belum mengisi jawaban soal ini.</div>
                      )}

                      {/* Penilaian Manual */}
                      {['admin', 'kordas', 'asisten'].includes(user?.role || '') && (
                        <div className="mt-4 pt-3 border-t border-zinc-200 space-y-3 bg-white p-3 rounded-xl border border-zinc-100">
                          <div className="text-[10px] font-black text-rose-800 uppercase tracking-widest">Penilaian Manual Asisten</div>
                          <div className="flex items-center gap-3">
                            <label className="text-xs font-bold text-zinc-500 shrink-0">Skor Soal (0-100):</label>
                            <input 
                              type="number"
                              min="0"
                              max="100"
                              value={editScores[qId]?.total_score ?? 0}
                              onChange={(e) => handleQuestionScoreChange(qId, Number(e.target.value))}
                              className="w-20 px-2.5 py-1.5 border border-zinc-200 rounded-lg text-xs font-bold bg-zinc-50 focus:border-rose-700 outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-zinc-500">Umpan Balik Manual:</label>
                            <textarea
                              rows={2}
                              value={editScores[qId]?.feedback ?? ''}
                              onChange={(e) => setEditScores(prev => ({
                                ...prev,
                                [qId]: { ...prev[qId], feedback: e.target.value }
                              }))}
                              placeholder="Tulis masukan/evaluasi untuk soal ini..."
                              className="w-full p-2.5 border border-zinc-200 rounded-xl text-xs bg-zinc-50 focus:border-rose-700 outline-none resize-none"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Manual Grading Action Bar */}
              {['admin', 'kordas', 'asisten'].includes(user?.role || '') && (
                <div className="border-t border-zinc-100 pt-4 mt-6 space-y-4">
                  <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-zinc-500">Nilai Akhir Total</div>
                      <div className="text-[10px] text-zinc-400">Rata-rata otomatis atau sesuaikan manual</div>
                    </div>
                    <input 
                      type="number"
                      min="0"
                      max="100"
                      value={editFinalScore}
                      onChange={(e) => setEditFinalScore(Number(e.target.value))}
                      className="w-24 px-3 py-2 border border-zinc-300 rounded-xl text-center font-black text-lg text-rose-800 bg-white focus:border-rose-700 outline-none"
                    />
                  </div>
                  <button
                    onClick={handleSaveManualGrade}
                    disabled={isSavingManualGrade}
                    className="w-full py-3.5 bg-rose-700 hover:bg-rose-800 disabled:opacity-50 text-white font-bold rounded-2xl active:scale-95 transition-all text-sm flex items-center justify-center gap-2"
                  >
                    {isSavingManualGrade ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Menyimpan Nilai...
                      </>
                    ) : (
                      <>
                        <Database size={16} />
                        Simpan Nilai Manual
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Layout>
  );
};

// UI Mini helpers
const TabButton: React.FC<{ active: boolean; icon: React.ReactNode; label: string; onClick: () => void }> = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 px-6 py-4 font-bold text-sm border-b-2 transition-all active:scale-95 outline-none",
      active 
        ? "border-rose-700 text-rose-700 font-black scale-102" 
        : "border-transparent text-zinc-400 hover:text-zinc-600"
    )}
  >
    {icon}
    {label}
  </button>
);

const StatCard: React.FC<{ title: string; value: string | number; desc: string; color: 'rose' | 'emerald' | 'blue' }> = ({ title, value, desc, color }) => (
  <div className="bg-white border border-zinc-200 p-6 rounded-3xl shadow-sm flex items-center justify-between">
    <div>
      <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{title}</div>
      <div className="text-3xl font-black mt-2 text-zinc-950">{value}</div>
      <div className="text-[10px] text-zinc-500 mt-1">{desc}</div>
    </div>
    <div className={cn(
      "w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-inner",
      color === 'rose' ? "bg-rose-50 text-rose-700" :
      color === 'emerald' ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"
    )}>
      {title.charAt(0)}
    </div>
  </div>
);
