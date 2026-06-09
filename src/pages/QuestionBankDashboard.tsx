import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { useStore } from '../store/useStore';
import { assessmentService, AssessmentQuestion } from '../services/assessmentService';
import { Plus, Edit, Trash, Search, ChevronLeft, Save, AlertCircle, HelpCircle, Loader2, Upload, FileText, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { extractDocxText, extractPptxSlides, parsePrePostTest, parseProgramKeterampilan, parseUjianPraktik, parsePrePostTestPpt } from '../lib/documentParser';

export const QuestionBankDashboard: React.FC = () => {
  const { user, setPage } = useStore();
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuFilter, setMenuFilter] = useState<'all' | 'pre_test' | 'post_test' | 'program_keterampilan' | 'ujian_praktik'>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [kodeFilter, setKodeFilter] = useState<string>('all');
  const [modulFilter, setModulFilter] = useState<string>('all');

  // Edit / Create Form State
  const [editingQuestion, setEditingQuestion] = useState<AssessmentQuestion | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [contohOutput, setContohOutput] = useState('');

  // Generate Paket Soal State
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [genMenuType, setGenMenuType] = useState<'pre_test' | 'post_test' | 'program_keterampilan' | 'ujian_praktik'>('pre_test');
  const [genModul, setGenModul] = useState<number>(1);
  const [genKode, setGenKode] = useState<string>('A');
  const [genQuestions, setGenQuestions] = useState<AssessmentQuestion[]>([]);
  const [genLoading, setGenLoading] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);

  const [lastGeneratedAt, setLastGeneratedAt] = useState<string | null>(null);
  const [isSessionActive, setIsSessionActive] = useState<boolean>(false);
  const [statusLoading, setStatusLoading] = useState(false);

  const fetchQuestionSetStatus = async () => {
    setStatusLoading(true);
    try {
      const status = await assessmentService.getQuestionSetStatus(
        genMenuType,
        genMenuType === 'ujian_praktik' ? null : genModul,
        genMenuType === 'ujian_praktik' ? genKode : null
      );
      setLastGeneratedAt(status.lastGeneratedAt);
      setIsSessionActive(status.isSessionActive);
    } catch (err) {
      console.error("Failed to fetch set status:", err);
    } finally {
      setStatusLoading(false);
    }
  };

  useEffect(() => {
    if (isGenerateOpen) {
      fetchQuestionSetStatus();
    }
  }, [isGenerateOpen, genMenuType, genModul, genKode]);

  // Import Word / PPT State
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [importFiles, setImportFiles] = useState<File[]>([]);
  const [importType, setImportType] = useState<'auto' | 'pre_post' | 'pre_post_ppt' | 'keterampilan' | 'ujian_praktik'>('auto');
  const [parsedQuestions, setParsedQuestions] = useState<Omit<AssessmentQuestion, 'id'>[]>([]);
  const [importLoading, setImportLoading] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [rubricItems, setRubricItems] = useState<{ desc: string; points: number }[]>([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await assessmentService.getQuestions();
      setQuestions(data);
    } catch (e: any) {
      setError(e.message || "Gagal memuat bank soal.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setEditingQuestion({
      menu_type: 'pre_test',
      difficulty: 'easy',
      type: 'short_answer',
      title: '',
      instruction: '',
      module_association: null,
      initial_code: '',
      reference_solution: '',
      test_cases: [],
      validation_rules: [],
      flowchart_url: '',
      created_by: user?.nim
    });
    setContohOutput('');
    setIsFormOpen(true);
  };

  const handleEdit = (q: AssessmentQuestion) => {
    const parts = (q.instruction || '').split('---CONTOH_OUTPUT---');
    const instructionClean = parts[0].trim();
    const outputClean = parts[1] ? parts[1].trim() : '';

    setEditingQuestion({
      ...q,
      instruction: instructionClean,
      test_cases: typeof q.test_cases === 'string' ? q.test_cases : JSON.stringify(q.test_cases || []),
      validation_rules: typeof q.validation_rules === 'string' ? q.validation_rules : JSON.stringify(q.validation_rules || [])
    });
    setContohOutput(outputClean);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    const check = window.confirm("Apakah Anda yakin ingin menghapus soal ini?");
    if (!check) return;
    try {
      await assessmentService.deleteQuestion(id);
      fetchQuestions();
    } catch (e) {
      alert("Gagal menghapus soal.");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion) return;

    setLoading(true);
    try {
      const finalInstruction = contohOutput.trim() 
        ? `${editingQuestion.instruction.trim()}\n\n---CONTOH_OUTPUT---\n${contohOutput.trim()}`
        : editingQuestion.instruction.trim();

      const payload = {
        ...editingQuestion,
        instruction: finalInstruction
      };

      await assessmentService.saveQuestion(payload);
      setIsFormOpen(false);
      setEditingQuestion(null);
      setContohOutput('');
      fetchQuestions();
    } catch (e: any) {
      alert(`Gagal menyimpan soal: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const validFiles: File[] = [];
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        const file = e.dataTransfer.files[i];
        const ext = file.name.split('.').pop()?.toLowerCase();
        if (ext === 'docx' || ext === 'pptx') {
          validFiles.push(file);
        }
      }
      if (validFiles.length > 0) {
        setImportFiles(prev => [...prev, ...validFiles]);
        setImportError(null);
        setParsedQuestions([]);
      } else {
        setImportError("Format file tidak didukung. Hanya file .docx dan .pptx yang diizinkan.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const validFiles: File[] = Array.from(e.target.files);
      setImportFiles(prev => [...prev, ...validFiles]);
      setImportError(null);
      setParsedQuestions([]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setImportFiles(prev => prev.filter((_, i) => i !== index));
    setParsedQuestions([]);
  };

  const handleAddRubricItem = () => {
    setRubricItems([...rubricItems, { desc: '', points: 0 }]);
  };

  const handleUpdateRubricItem = (index: number, desc: string, points: number) => {
    const updated = [...rubricItems];
    updated[index] = { desc, points };
    setRubricItems(updated);
  };

  const handleRemoveRubricItem = (index: number) => {
    setRubricItems(rubricItems.filter((_, i) => i !== index));
  };

  const handleProcessImport = async () => {
    if (importFiles.length === 0) {
      setImportError("Silakan pilih file terlebih dahulu.");
      return;
    }

    setImportLoading(true);
    setImportError(null);
    try {
      let allParsed: any[] = [];
      const errors: string[] = [];

      for (const file of importFiles) {
        const filename = file.name;
        const fileExt = filename.split('.').pop()?.toLowerCase();
        
        let detectedType = importType;
        if (detectedType === 'auto') {
          if (fileExt === 'pptx') {
            if (filename.toLowerCase().includes("pre") || filename.toLowerCase().includes("post")) {
              detectedType = 'pre_post_ppt';
            } else {
              detectedType = 'ujian_praktik';
            }
          } else if (fileExt === 'docx') {
            if (filename.toLowerCase().includes("keterampilan")) {
              detectedType = 'keterampilan';
            } else {
              detectedType = 'pre_post';
            }
          } else {
            errors.push(`${filename}: Format file tidak didukung.`);
            continue;
          }
        }

        try {
          let parsed: any[] = [];
          if (detectedType === 'pre_post') {
            if (fileExt !== 'docx') throw new Error("Pre/Post-Test harus berupa file Word (.docx).");
            const paragraphs = await extractDocxText(file);
            parsed = parsePrePostTest(paragraphs, filename);
          } else if (detectedType === 'pre_post_ppt') {
            if (fileExt !== 'pptx') throw new Error("File PowerPoint (.pptx) dibutuhkan.");
            const slides = await extractPptxSlides(file);
            const lowerFilename = filename.toLowerCase();
            const hasPost = lowerFilename.includes("post");
            const hasPre = lowerFilename.includes("pre");
            let detectedPrePost: 'pre_test' | 'post_test';
            if (hasPost && !hasPre) {
              detectedPrePost = 'post_test';
            } else if (hasPre && !hasPost) {
              detectedPrePost = 'pre_test';
            } else {
              // scan slides text for pre/post
              const slidesText = slides.slice(0, 3).map(s => s.texts.join(' ')).join(' ').toLowerCase();
              const contentHasPost = slidesText.includes('post test') || slidesText.includes('post-test') || (!slidesText.includes('pre test') && !slidesText.includes('pre-test') && slidesText.includes('post'));
              const contentHasPre = slidesText.includes('pre test') || slidesText.includes('pre-test') || slidesText.includes('pre');
              
              if (contentHasPost && !contentHasPre) {
                detectedPrePost = 'post_test';
              } else if (contentHasPre && !contentHasPost) {
                detectedPrePost = 'pre_test';
              } else {
                detectedPrePost = contentHasPre ? 'pre_test' : 'post_test';
              }
            }
            parsed = parsePrePostTestPpt(slides, filename, detectedPrePost);
          } else if (detectedType === 'keterampilan') {
            if (fileExt !== 'docx') throw new Error("Program Keterampilan harus berupa file Word (.docx).");
            const paragraphs = await extractDocxText(file);
            parsed = parseProgramKeterampilan(paragraphs, filename);
          } else if (detectedType === 'ujian_praktik') {
            if (fileExt !== 'pptx') throw new Error("Ujian Praktik harus berupa file PowerPoint (.pptx).");
            const slides = await extractPptxSlides(file);
            parsed = parseUjianPraktik(slides, filename);
          }

          if (parsed.length === 0) {
            errors.push(`${filename}: Tidak ada soal yang berhasil diekstrak.`);
          } else {
            allParsed = [...allParsed, ...parsed];
          }
        } catch (e: any) {
          errors.push(`${filename}: ${e.message || "Gagal memproses file."}`);
        }
      }

      if (allParsed.length === 0) {
        throw new Error(errors.length > 0 ? errors.join("\n") : "Tidak ada soal yang berhasil diekstrak.");
      }

      if (errors.length > 0) {
        setImportError(`Selesai dengan beberapa error:\n${errors.join("\n")}`);
      }

      setParsedQuestions(allParsed);
    } catch (e: any) {
      setImportError(e.message || "Gagal memproses file.");
    } finally {
      setImportLoading(false);
    }
  };

  const handleSaveImported = async () => {
    if (parsedQuestions.length === 0) return;
    setImportLoading(true);
    try {
      let successCount = 0;
      for (const q of parsedQuestions) {
        await assessmentService.saveQuestion({
          ...q,
          created_by: user?.nim
        });
        successCount++;
      }
      alert(`Berhasil menyimpan ${successCount} soal ke dalam bank soal!`);
      setIsImportOpen(false);
      setImportFiles([]);
      setParsedQuestions([]);
      fetchQuestions();
    } catch (e: any) {
      alert(`Gagal menyimpan beberapa soal: ${e.message}`);
    } finally {
      setImportLoading(false);
    }
  };

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          q.instruction.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMenu = menuFilter === 'all' || q.menu_type === menuFilter;
    
    let matchesKode = true;
    if (menuFilter === 'ujian_praktik' && kodeFilter !== 'all') {
      const kodeMatch = q.title.match(/\[Kode\s*([^\]]+)\]/i);
      const kode = kodeMatch ? kodeMatch[1].toUpperCase() : 'NO_KODE';
      matchesKode = kode === kodeFilter;
    }

    let matchesModul = true;
    if (modulFilter !== 'all') {
      matchesModul = q.module_association === Number(modulFilter);
    }
    
    return matchesSearch && matchesMenu && matchesKode && matchesModul;
  });

  const uniqueKodes = Array.from(new Set(
    questions
      .filter(q => q.menu_type === 'ujian_praktik')
      .map(q => {
        const match = q.title.match(/\[Kode\s*([^\]]+)\]/i);
        return match ? match[1].toUpperCase() : 'NO_KODE';
      })
  )).sort();

  const renderQuestionCard = (q: AssessmentQuestion) => (
    <div key={q.id} className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-4 hover:border-zinc-300 transition-all hover:shadow-md flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 px-2.5 py-1 rounded-full">
            {q.menu_type.replace('_', ' ')}
          </span>
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full",
            q.difficulty === 'easy' ? "bg-emerald-50 text-emerald-700" :
            q.difficulty === 'medium' ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"
          )}>
            {q.difficulty}
          </span>
        </div>
        <h3 className="font-bold text-base text-zinc-900 line-clamp-1">{q.title}</h3>
        <p className="text-zinc-500 text-xs line-clamp-3 leading-relaxed">{q.instruction}</p>
      </div>
      
      <div className="flex items-center justify-between border-t border-zinc-100 pt-4 mt-4 text-xs font-bold text-zinc-400">
        <div>
          Tipe: <span className="text-zinc-700 uppercase">{q.type.replace('_', ' ')}</span>
          {q.module_association && ` • Modul ${q.module_association}`}
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => handleEdit(q)}
            type="button"
            className="p-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 rounded-lg transition-colors"
          >
            <Edit size={14} />
          </button>
          <button 
            onClick={() => handleDelete(q.id!)}
            type="button"
            className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
          >
            <Trash size={14} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setPage('dashboard')}
              className="p-2.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Pengelolaan Bank Soal Asesmen</h1>
              <p className="text-zinc-500 text-xs">Kelola materi pertanyaan, draf compiler, dan rubrik asesmen.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { setIsGenerateOpen(true); setIsImportOpen(false); setIsFormOpen(false); }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md active:scale-95 transition-all flex items-center gap-2"
            >
              🎲 Generate Paket Soal
            </button>
            <button 
              onClick={() => { setIsImportOpen(true); setIsFormOpen(false); setIsGenerateOpen(false); }}
              className="bg-zinc-800 hover:bg-zinc-950 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md active:scale-95 transition-all flex items-center gap-2"
            >
              <Upload size={16} />
              Import Word/PPT
            </button>
            <button 
              onClick={() => { handleCreateNew(); setIsImportOpen(false); setIsGenerateOpen(false); }}
              className="bg-rose-700 hover:bg-rose-800 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md shadow-rose-700/10 active:scale-95 transition-all flex items-center gap-2"
            >
              <Plus size={16} />
              Tambah Soal Baru
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-sm">
            <AlertCircle size={18} />
            <p>{error}</p>
          </div>
        )}

        {/* QUESTIONS LISTING */}
        {!isFormOpen && !isImportOpen && !isGenerateOpen && (
          <div className="space-y-6">
            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white border border-zinc-200 p-4 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2 border border-zinc-200 px-3 py-2 rounded-xl bg-zinc-50 w-full sm:w-80">
                <Search size={16} className="text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="Cari judul atau isi soal..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm w-full outline-none"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto w-full sm:w-auto">
                {['all', 'pre_test', 'post_test', 'program_keterampilan', 'ujian_praktik'].map(type => (
                  <button
                    key={type}
                    onClick={() => {
                      setMenuFilter(type as any);
                      if (type !== 'ujian_praktik') setKodeFilter('all');
                      setModulFilter('all');
                    }}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap active:scale-95",
                      menuFilter === type 
                        ? "bg-zinc-900 text-white" 
                        : "bg-zinc-50 text-zinc-500 hover:bg-zinc-100"
                    )}
                  >
                    {type.toUpperCase().replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {(menuFilter === 'pre_test' || menuFilter === 'post_test' || menuFilter === 'ujian_praktik') && (
              <div className="flex flex-wrap items-center gap-4 bg-white border border-zinc-200 p-4 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest shrink-0">Filter Modul:</span>
                  <select
                    value={modulFilter}
                    onChange={(e) => setModulFilter(e.target.value)}
                    className="px-3 py-1.5 border border-zinc-200 bg-zinc-50 rounded-lg text-xs font-bold focus:border-rose-700 outline-none cursor-pointer"
                  >
                    <option value="all">Semua Modul</option>
                    {[1, 2, 3, 4, 5, 6].map(m => (
                      <option key={m} value={m.toString()}>Modul {m}</option>
                    ))}
                  </select>
                </div>

                {menuFilter === 'ujian_praktik' && uniqueKodes.length > 0 && (
                  <div className="flex items-center gap-2 border-l border-zinc-200 pl-4">
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest shrink-0">Filter Kode:</span>
                    <button
                      onClick={() => setKodeFilter('all')}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap",
                        kodeFilter === 'all' ? "bg-rose-700 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                      )}
                    >
                      Semua Kode
                    </button>
                    {uniqueKodes.map(kode => (
                      <button
                        key={kode}
                        onClick={() => setKodeFilter(kode)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap",
                          kodeFilter === kode ? "bg-rose-700 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                        )}
                      >
                        {kode === 'NO_KODE' ? 'Tanpa Kode' : `Kode ${kode}`}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {loading ? (
              <div className="flex justify-center p-12">
                <Loader2 className="animate-spin text-rose-700" size={32} />
              </div>
            ) : (
              <div className="space-y-8">
                {(menuFilter === 'pre_test' || menuFilter === 'post_test') ? (
                  [1, 2, 3, 4, 5, 6].map(modNo => {
                    const modQuestions = filteredQuestions.filter(q => q.module_association === modNo);
                    if (modQuestions.length === 0) return null;
                    return (
                      <div key={modNo} className="space-y-4 bg-zinc-50/40 p-6 rounded-3xl border border-zinc-200/50">
                        <div className="flex items-center gap-2 border-b border-zinc-100 pb-2">
                          <h3 className="font-extrabold text-base text-zinc-800">Modul {modNo}</h3>
                          <span className="text-[10px] bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded-full border border-rose-100">
                            {modQuestions.length} Soal
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {modQuestions.map(q => renderQuestionCard(q))}
                        </div>
                      </div>
                    );
                  })
                ) : menuFilter === 'ujian_praktik' ? (
                  (() => {
                    const kodesInFiltered = Array.from(new Set(
                      filteredQuestions.map(q => {
                        const match = q.title.match(/\[Kode\s*([^\]]+)\]/i);
                        return match ? match[1].toUpperCase() : 'NO_KODE';
                      })
                    )).sort();

                    if (kodesInFiltered.length === 0 || filteredQuestions.length === 0) {
                      return <div className="p-12 text-center text-zinc-400 italic bg-white border border-zinc-200 rounded-3xl">Tidak ada soal ditemukan.</div>;
                    }

                    return kodesInFiltered.map(k => {
                      const kodeQuestions = filteredQuestions.filter(q => {
                        const match = q.title.match(/\[Kode\s*([^\]]+)\]/i);
                        const qKode = match ? match[1].toUpperCase() : 'NO_KODE';
                        return qKode === k;
                      });

                      if (kodeQuestions.length === 0) return null;

                      return (
                        <div key={k} className="space-y-6 bg-zinc-50/50 p-6 rounded-3xl border border-zinc-200/60">
                          <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
                            <h3 className="font-black text-lg text-zinc-950">
                              {k === 'NO_KODE' ? 'TANPA KODE' : `PAKET KODE ${k}`}
                            </h3>
                            <span className="text-xs bg-rose-50 text-rose-700 font-bold px-3 py-1 rounded-full border border-rose-100">
                              Total: {kodeQuestions.length} Soal
                            </span>
                          </div>

                          <div className="space-y-6">
                            {[1, 2, 3, 4, 5, 6].map(modNo => {
                              const modQs = kodeQuestions.filter(q => q.module_association === modNo);
                              const flowchartQs = kodeQuestions.filter(q => q.type === 'flowchart_translation' && modNo === 6);
                              const mergedQs = modNo === 6 
                                ? [...modQs, ...flowchartQs.filter(fq => !modQs.find(mq => mq.id === fq.id))] 
                                : modQs;

                              if (mergedQs.length === 0) return null;

                              return (
                                <div key={modNo} className="space-y-3 pl-3 border-l-2 border-rose-700">
                                  <h4 className="font-bold text-sm text-zinc-700">
                                    Modul {modNo} {modNo === 6 && "(inc. Flowchart Translation)"}
                                  </h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {mergedQs.map(q => renderQuestionCard(q))}
                                  </div>
                                </div>
                              );
                            })}

                            {(() => {
                              const leftovers = kodeQuestions.filter(q => !q.module_association && q.type !== 'flowchart_translation');
                              if (leftovers.length === 0) return null;
                              return (
                                <div className="space-y-3 pl-3 border-l-2 border-zinc-300">
                                  <h4 className="font-bold text-sm text-zinc-700">Lain-lain / Tanpa Modul</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {leftovers.map(q => renderQuestionCard(q))}
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        </div>
                      );
                    });
                  })()
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredQuestions.length > 0 ? (
                      filteredQuestions.map(q => renderQuestionCard(q))
                    ) : (
                      <div className="col-span-2 p-12 text-center text-zinc-400 italic bg-white border border-zinc-200 rounded-3xl">
                        Tidak ada soal ditemukan.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* QUESTION CREATE/EDIT FORM */}
        {isFormOpen && editingQuestion && (
          <form onSubmit={handleFormSubmit} className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm space-y-6">
            <h3 className="text-xl font-bold border-b border-zinc-100 pb-4">
              {editingQuestion.id ? 'Edit Soal Asesmen' : 'Tambah Soal Asesmen Baru'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Menu Asesmen</label>
                <select
                  value={editingQuestion.menu_type}
                  onChange={(e: any) => setEditingQuestion({ ...editingQuestion, menu_type: e.target.value })}
                  className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none bg-zinc-50 text-sm font-bold focus:border-rose-700"
                >
                  <option value="pre_test">Pre-Test</option>
                  <option value="post_test">Post-Test</option>
                  <option value="program_keterampilan">Program Keterampilan</option>
                  <option value="ujian_praktik">Ujian Praktik</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Tingkat Kesulitan</label>
                <select
                  value={editingQuestion.difficulty}
                  onChange={(e: any) => setEditingQuestion({ ...editingQuestion, difficulty: e.target.value })}
                  className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none bg-zinc-50 text-sm font-bold focus:border-rose-700"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Tipe Pertanyaan</label>
                <select
                  value={editingQuestion.type}
                  onChange={(e: any) => setEditingQuestion({ ...editingQuestion, type: e.target.value })}
                  className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none bg-zinc-50 text-sm font-bold focus:border-rose-700"
                >
                  <option value="short_answer">Jawaban Singkat</option>
                  <option value="essay">Essay / Analisis</option>
                  <option value="coding">Soal Praktik Coding</option>
                  <option value="flowchart_translation">Flowchart to Program</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Judul Soal</label>
                <input 
                  type="text" 
                  required
                  value={editingQuestion.title}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, title: e.target.value })}
                  className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none focus:border-rose-700 bg-zinc-50 text-sm font-bold"
                  placeholder="Contoh: Nested Loop di C"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Modul Asosiasi (Opsional, Ujian Praktik)</label>
                <input 
                  type="number" 
                  min={1} 
                  max={6}
                  value={editingQuestion.module_association || ''}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, module_association: e.target.value ? Number(e.target.value) : null })}
                  className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none focus:border-rose-700 bg-zinc-50 text-sm font-bold"
                  placeholder="Nilai modul 1 s.d. 6"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Pertanyaan / Instruksi Soal (Markdown Support)</label>
              <textarea
                rows={5}
                required
                value={editingQuestion.instruction}
                onChange={(e) => setEditingQuestion({ ...editingQuestion, instruction: e.target.value })}
                className="w-full p-4 border border-zinc-200 bg-zinc-50 rounded-2xl outline-none focus:border-rose-700 text-sm leading-relaxed"
                placeholder="Tuliskan petunjuk studi kasus atau pertanyaan Anda di sini..."
              />
            </div>

            {/* CONTOH OUTPUT TERMINAL */}
            {(editingQuestion.type === 'coding' || editingQuestion.type === 'flowchart_translation' || editingQuestion.menu_type === 'program_keterampilan' || editingQuestion.menu_type === 'ujian_praktik') && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Contoh Output Terminal (MacBook Mockup)</label>
                <textarea
                  rows={4}
                  value={contohOutput}
                  onChange={(e) => setContohOutput(e.target.value)}
                  className="w-full p-4 border border-zinc-200 bg-zinc-50 rounded-2xl outline-none focus:border-rose-700 text-sm font-mono leading-relaxed"
                  placeholder={`$ python main.py\nMasukkan angka: 5\nHasil: 120`}
                />
                <p className="text-[10px] text-zinc-400 font-semibold mt-1">
                  Konten ini akan dirender di dalam kotak MacBook Terminal di halaman mahasiswa.
                </p>
              </div>
            )}

            {/* RUBRIC POIN HELPER */}
            <div className="bg-zinc-50 border border-zinc-200 p-6 rounded-3xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-zinc-700 uppercase tracking-widest">Helper Rubrik & Poin per Instruksi</h4>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Gunakan panel ini untuk menyusun pembagian poin per instruksi, lalu klik masukkan ke deskripsi atau kunci jawaban.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddRubricItem}
                  className="px-3.5 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-bold transition-all active:scale-95"
                >
                  + Tambah Baris Poin
                </button>
              </div>

              {rubricItems.length > 0 && (
                <div className="space-y-3">
                  {rubricItems.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-center">
                      <input
                        type="text"
                        placeholder="Deskripsi Instruksi (contoh: Mengimpor header stdio.h)"
                        value={item.desc}
                        onChange={(e) => handleUpdateRubricItem(idx, e.target.value, item.points)}
                        className="flex-1 px-3 py-2.5 border border-zinc-200 rounded-xl bg-white text-xs outline-none focus:border-rose-700 font-medium"
                      />
                      <input
                        type="number"
                        placeholder="Poin"
                        value={item.points || ''}
                        onChange={(e) => handleUpdateRubricItem(idx, item.desc, Number(e.target.value))}
                        className="w-20 px-3 py-2.5 border border-zinc-200 rounded-xl bg-white text-xs text-center outline-none focus:border-rose-700 font-bold"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveRubricItem(idx)}
                        className="text-xs text-red-600 hover:text-red-800 font-bold px-2 active:scale-95 transition-transform"
                      >
                        Hapus
                      </button>
                    </div>
                  ))}

                  <div className="flex gap-2 pt-2 border-t border-zinc-200">
                    <button
                      type="button"
                      onClick={() => {
                        const formatted = rubricItems
                          .map((item, i) => `${i + 1}. ${item.desc} (${item.points} poin)`)
                          .join('\n');
                        setEditingQuestion(prev => prev ? {
                          ...prev,
                          instruction: (prev.instruction ? prev.instruction + '\n' : '') + formatted
                        } : null);
                        setRubricItems([]);
                      }}
                      className="px-3 py-2 bg-zinc-800 text-white text-xs font-bold rounded-lg hover:bg-zinc-950 transition-all active:scale-95"
                    >
                      Masukkan ke Deskripsi Instruksi
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const formatted = rubricItems
                          .map((item, i) => `// ${i + 1}. ${item.desc} (${item.points} poin)`)
                          .join('\n');
                        setEditingQuestion(prev => prev ? {
                          ...prev,
                          reference_solution: (prev.reference_solution ? prev.reference_solution + '\n' : '') + formatted
                        } : null);
                        setRubricItems([]);
                      }}
                      className="px-3 py-2 bg-rose-700 text-white text-xs font-bold rounded-lg hover:bg-rose-800 transition-all active:scale-95"
                    >
                      Masukkan ke Kunci Jawaban
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* FLOWCHART/SCREENSHOT/IMAGE UPLOAD */}
            {true && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Gambar Soal / Screenshot Kode / Flowchart (FC to Program)</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={editingQuestion.flowchart_url || ''}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, flowchart_url: e.target.value })}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none focus:border-rose-700 bg-zinc-50 text-sm font-bold"
                    placeholder="https://... atau upload file"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    id="flowchart-upload"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        if (ev.target?.result) {
                          setEditingQuestion({ ...editingQuestion, flowchart_url: ev.target.result as string });
                        }
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                  <label 
                    htmlFor="flowchart-upload"
                    className="px-4 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold rounded-xl cursor-pointer text-sm whitespace-nowrap flex items-center gap-2"
                  >
                    <Upload size={16} /> Upload Gambar
                  </label>
                </div>
                {editingQuestion.flowchart_url && editingQuestion.flowchart_url.length > 200 && (
                  <p className="text-[10px] text-zinc-400 mt-1">Gambar menggunakan format Data URI Base64.</p>
                )}
                {editingQuestion.flowchart_url && (
                  <div className="mt-2 border border-zinc-200 rounded-xl p-2 bg-zinc-50 flex justify-center">
                    <img src={editingQuestion.flowchart_url} alt="Preview" className="max-h-40 object-contain" />
                  </div>
                )}
              </div>
            )}

            {/* CODING FIELDS */}
            {(editingQuestion.type === 'coding' || editingQuestion.type === 'flowchart_translation') && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Kode Awal (Template Siswa)</label>
                    <textarea
                      rows={6}
                      value={editingQuestion.initial_code || ''}
                      onChange={(e) => setEditingQuestion({ ...editingQuestion, initial_code: e.target.value })}
                      className="w-full p-4 border border-zinc-200 bg-zinc-50 rounded-2xl outline-none focus:border-rose-700 font-mono text-xs leading-relaxed"
                      placeholder="#include <stdio.h>\nint main() {\n  // Ketik jawaban di sini\n}"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Referensi Solusi Kunci</label>
                    <textarea
                      rows={6}
                      value={editingQuestion.reference_solution || ''}
                      onChange={(e) => setEditingQuestion({ ...editingQuestion, reference_solution: e.target.value })}
                      className="w-full p-4 border border-zinc-200 bg-zinc-50 rounded-2xl outline-none focus:border-rose-700 font-mono text-xs leading-relaxed"
                      placeholder="Solusi program yang benar..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Test Cases (Format JSON)</label>
                      <span title='Contoh: [{"input": "5", "expectedOutput": "10", "description": "Uji input 5"}]'><HelpCircle size={12} className="text-zinc-400 cursor-pointer" /></span>
                    </div>
                    <textarea
                      rows={4}
                      value={editingQuestion.test_cases || ''}
                      onChange={(e) => setEditingQuestion({ ...editingQuestion, test_cases: e.target.value })}
                      className="w-full p-4 border border-zinc-200 bg-zinc-50 rounded-2xl outline-none focus:border-rose-700 font-mono text-xs leading-relaxed"
                      placeholder='[{"input": "5", "expectedOutput": "10", "description": "Uji input 5"}]'
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Validation Rules (Regex JSON)</label>
                      <span title='Contoh: [{"pattern": "printf", "message": "Wajib menggunakan printf", "shouldExist": true}]'><HelpCircle size={12} className="text-zinc-400 cursor-pointer" /></span>
                    </div>
                    <textarea
                      rows={4}
                      value={editingQuestion.validation_rules || ''}
                      onChange={(e) => setEditingQuestion({ ...editingQuestion, validation_rules: e.target.value })}
                      className="w-full p-4 border border-zinc-200 bg-zinc-50 rounded-2xl outline-none focus:border-rose-700 font-mono text-xs leading-relaxed"
                      placeholder='[{"pattern": "while", "message": "Harus menggunakan perulangan while", "shouldExist": true}]'
                    />
                  </div>
                </div>
              </>
            )}

            {/* TEXT ANSWER KEY REFERENCE */}
            {(editingQuestion.type === 'short_answer' || editingQuestion.type === 'essay') && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Kunci Jawaban Referensi (Sebagai acuan koreksi AI)</label>
                <textarea
                  rows={4}
                  value={editingQuestion.reference_solution || ''}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, reference_solution: e.target.value })}
                  className="w-full p-4 border border-zinc-200 bg-zinc-50 rounded-2xl outline-none focus:border-rose-700 text-sm leading-relaxed"
                  placeholder="Tuliskan kata kunci atau poin-poin penjelasan penting yang wajib ada pada jawaban mahasiswa..."
                />
              </div>
            )}

            {/* Form actions */}
            <div className="flex gap-4 border-t border-zinc-100 pt-6">
              <button 
                type="button"
                onClick={() => { setIsFormOpen(false); setEditingQuestion(null); }}
                className="flex-1 py-3.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold rounded-xl transition-all"
              >
                Batalkan
              </button>
              <button 
                type="submit"
                disabled={loading}
                className="flex-1 py-3.5 bg-rose-700 hover:bg-rose-800 disabled:opacity-50 text-white font-bold rounded-xl active:scale-95 transition-all shadow-md shadow-rose-700/10 flex items-center justify-center gap-1.5"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Simpan Soal
              </button>
            </div>
          </form>
        )}

        {/* IMPORT FILE PANEL */}
        {isImportOpen && (
          <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <h3 className="text-xl font-bold">Import Soal Asesmen (Word / PPTX)</h3>
              <button 
                onClick={() => { setIsImportOpen(false); setImportFiles([]); setParsedQuestions([]); }}
                className="text-xs text-zinc-500 hover:text-rose-700 underline font-bold"
              >
                Kembali ke Bank Soal
              </button>
            </div>

            {/* DRAG AND DROP AREA */}
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={cn(
                "border-2 border-dashed rounded-3xl p-8 text-center flex flex-col items-center justify-center transition-all cursor-pointer select-none",
                isDragActive 
                  ? "border-rose-700 bg-rose-50/50 scale-[0.99]" 
                  : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100/50"
              )}
            >
              <input
                type="file"
                multiple
                accept=".docx,.pptx"
                onChange={handleFileChange}
                className="hidden"
                id="file-import-input"
              />
              <label htmlFor="file-import-input" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                <Upload size={40} className={cn("mb-3 transition-colors", isDragActive ? "text-rose-700" : "text-zinc-400")} />
                <span className="text-zinc-800 font-bold text-base">Drag & Drop file Word/PPTX di sini</span>
                <span className="text-zinc-400 text-xs mt-1">atau klik untuk menelusuri folder komputer</span>
                <span className="text-[10px] text-zinc-400 mt-2 font-medium">Mendukung banyak file sekaligus (.docx, .pptx)</span>
              </label>
            </div>

            {/* FILE PREVIEW LIST */}
            {importFiles.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest block">File Terpilih ({importFiles.length})</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {importFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-zinc-50 border border-zinc-200 px-3.5 py-2.5 rounded-xl text-xs font-medium">
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText size={15} className="text-rose-700 shrink-0" />
                        <span className="text-zinc-700 truncate" title={file.name}>{file.name}</span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => handleRemoveFile(idx)}
                        className="text-zinc-400 hover:text-red-600 transition-colors font-bold ml-2 shrink-0 text-sm"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-4 pt-2">
              <div className="space-y-2 flex-1 sm:max-w-xs">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest block">Tipe Dokumen</label>
                <select
                  value={importType}
                  onChange={(e: any) => setImportType(e.target.value)}
                  className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none bg-zinc-50 text-sm font-bold focus:border-rose-700"
                >
                  <option value="auto">Auto-Detect dari File</option>
                  <option value="pre_post">Pre-Test / Post-Test (Word .docx)</option>
                  <option value="pre_post_ppt">Pre-Test / Post-Test (PowerPoint .pptx)</option>
                  <option value="keterampilan">Program Keterampilan (Word .docx)</option>
                  <option value="ujian_praktik">Ujian Praktik (PowerPoint .pptx)</option>
                </select>
              </div>

              <div className="flex gap-2">
                {importFiles.length > 0 && (
                  <button
                    type="button"
                    onClick={() => { setImportFiles([]); setParsedQuestions([]); setImportError(null); }}
                    className="px-5 py-3 border border-zinc-200 text-zinc-600 font-bold rounded-xl active:scale-95 transition-all text-sm hover:bg-zinc-50"
                  >
                    Bersihkan Semua
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleProcessImport}
                  disabled={importFiles.length === 0 || importLoading}
                  className="px-6 py-3 bg-rose-700 hover:bg-rose-800 disabled:opacity-50 text-white font-bold rounded-xl active:scale-95 transition-all shadow-md shadow-rose-700/10 flex items-center justify-center gap-1.5 text-sm shrink-0"
                >
                  {importLoading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                  Ekstrak & Preview Soal
                </button>
              </div>
            </div>

            {importError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm font-medium whitespace-pre-line">
                {importError}
              </div>
            )}

            {/* PREVIEW EXTRACED QUESTIONS */}
            {parsedQuestions.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-zinc-100">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-zinc-800">Preview Soal yang Berhasil Diekstrak ({parsedQuestions.length} soal)</h4>
                  <button
                    type="button"
                    onClick={handleSaveImported}
                    disabled={importLoading}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <CheckCircle2 size={16} />
                    Simpan Semua ke Database
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto space-y-4 pr-2 border border-zinc-200 p-4 rounded-2xl bg-zinc-50">
                  {parsedQuestions.map((q, idx) => (
                    <div key={idx} className="bg-white border border-zinc-200 p-4 rounded-xl shadow-xs space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        <span>{q.menu_type.replace('_', ' ')} • Modul {q.module_association || 'N/A'}</span>
                        <span className={cn(
                          "px-2 py-0.5 rounded",
                          q.difficulty === 'easy' ? "bg-emerald-50 text-emerald-700" :
                          q.difficulty === 'medium' ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"
                        )}>{q.difficulty}</span>
                      </div>
                      <h5 className="font-bold text-sm text-zinc-900">{q.title}</h5>
                      <p className="text-zinc-600 text-xs whitespace-pre-wrap font-sans bg-zinc-50 p-2.5 rounded-lg border border-zinc-100 leading-relaxed">{q.instruction}</p>
                      {q.type === 'flowchart_translation' && !q.flowchart_url && (
                        <div className="p-2.5 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-[10px] font-bold flex items-center gap-1.5 mt-2">
                          <AlertCircle size={12} className="text-amber-700" />
                          <span>Wajib melampirkan URL Gambar Flowchart. Edit soal ini di bank soal setelah di-import.</span>
                        </div>
                      )}
                      {q.reference_solution && (
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Kunci Jawaban:</span>
                          <pre className="text-zinc-700 text-xs font-mono bg-zinc-100 p-2.5 rounded-lg border border-zinc-200 max-h-40 overflow-y-auto overflow-x-auto whitespace-pre">{q.reference_solution}</pre>
                        </div>
                      )}
                    </div>
                  ))
                  }
                </div>
              </div>
            )}
          </div>
        )}

        {/* GENERATE PAKET SOAL PANEL */}
        {isGenerateOpen && (
          <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-zinc-950">Generate & Acak Paket Soal Ujian</h3>
                <p className="text-xs text-zinc-400 mt-1">Admin/Kordas/Asisten dapat mengacak set soal aktif untuk digunakan oleh praktikan.</p>
              </div>
              <button 
                onClick={() => { setIsGenerateOpen(false); setGenQuestions([]); setGenError(null); }}
                className="text-xs text-zinc-500 hover:text-rose-700 underline font-bold"
              >
                Kembali ke Bank Soal
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-zinc-50 p-6 rounded-2xl border border-zinc-200/50">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Jenis Asesmen</label>
                <select
                  value={genMenuType}
                  onChange={(e: any) => {
                    setGenMenuType(e.target.value);
                    setGenQuestions([]);
                    setGenError(null);
                  }}
                  className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none bg-white text-sm font-bold focus:border-rose-700"
                >
                  <option value="pre_test">Pre-Test</option>
                  <option value="post_test">Post-Test</option>
                  <option value="program_keterampilan">Program Keterampilan</option>
                  <option value="ujian_praktik">Ujian Praktik</option>
                </select>
              </div>

              {genMenuType !== 'ujian_praktik' ? (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Pilih Modul</label>
                  <select
                    value={genModul}
                    onChange={(e: any) => {
                      setGenModul(Number(e.target.value));
                      setGenQuestions([]);
                      setGenError(null);
                    }}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none bg-white text-sm font-bold focus:border-rose-700"
                  >
                    {[1, 2, 3, 4, 5, 6].map(m => (
                      <option key={m} value={m}>Modul {m}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Kode Paket Ujian</label>
                  <input
                    type="text"
                    value={genKode}
                    maxLength={5}
                    onChange={(e: any) => {
                      setGenKode(e.target.value.toUpperCase());
                      setGenQuestions([]);
                      setGenError(null);
                    }}
                    placeholder="CONTOH: A atau MIX"
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none bg-white text-sm font-bold focus:border-rose-700"
                  />
                  <p className="text-[9px] text-zinc-400 font-semibold mt-1">Gunakan "MIX" untuk Mix Mode (Acak dari Soal Post-Test Coding & Flowchart)</p>
                </div>
              )}

              <div className="flex items-end gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    setGenLoading(true);
                    setGenError(null);
                    try {
                      const data = await assessmentService.getGeneratedQuestionSet(
                        genMenuType,
                        genMenuType === 'ujian_praktik' ? null : genModul,
                        genMenuType === 'ujian_praktik' ? genKode : null
                      );
                      setGenQuestions(data);
                      await fetchQuestionSetStatus();
                      if (data.length === 0) {
                        setGenError("Belum ada paket soal ter-generate untuk kriteria ini.");
                      }
                    } catch (e: any) {
                      setGenError(e.message || "Gagal memuat paket soal.");
                    } finally {
                      setGenLoading(false);
                    }
                  }}
                  disabled={genLoading}
                  className="flex-1 py-3 border border-zinc-200 text-zinc-700 hover:bg-zinc-100 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1 bg-white"
                >
                  Lihat Paket Aktif
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    const check = window.confirm("Apakah Anda yakin ingin melakukan generate/acak paket soal baru? Set sebelumnya akan diganti.");
                    if (!check) return;
                    setGenLoading(true);
                    setGenError(null);
                    try {
                      const data = await assessmentService.generateAndSaveQuestionSet(
                        genMenuType,
                        genMenuType === 'ujian_praktik' ? null : genModul,
                        genMenuType === 'ujian_praktik' ? genKode : null
                      );
                      setGenQuestions(data);
                      await fetchQuestionSetStatus();
                      alert("Berhasil menghasilkan paket soal acak baru dan menyimpannya sebagai paket ujian aktif!");
                    } catch (e: any) {
                      setGenError(e.message || "Gagal melakukan generate paket soal.");
                    } finally {
                      setGenLoading(false);
                    }
                  }}
                  disabled={genLoading}
                  className="flex-1 py-3 bg-rose-700 hover:bg-rose-800 text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1 shadow-md shadow-rose-700/10"
                >
                  {genLoading ? <Loader2 size={12} className="animate-spin" /> : "Acak Paket Baru"}
                </button>
              </div>
            </div>

            {/* Status Sesi & Timestamp Terakhir Diacak */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-50 p-4 rounded-2xl border border-zinc-200/50 text-xs font-semibold">
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Terakhir Diacak:</span>
                <span className="text-zinc-800 font-bold">
                  {statusLoading ? 'Memuat...' : (lastGeneratedAt ? new Date(lastGeneratedAt).toLocaleString('id-ID') : 'Belum Pernah')}
                </span>
              </div>
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Status Sesi Ujian:</span>
                <span className={cn(
                  "px-2.5 py-0.5 rounded-full font-bold uppercase text-[9px] tracking-wider",
                  isSessionActive ? "bg-emerald-50 text-emerald-700 border border-emerald-100 animate-pulse" : "bg-zinc-100 text-zinc-500"
                )}>
                  {isSessionActive ? "🟢 Aktif" : "⚪ Tidak Aktif"}
                </span>
              </div>
            </div>

            {genError && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 text-xs font-bold text-center">
                ⚠️ {genError}
              </div>
            )}

            {/* PREVIEW GENERATED QUESTIONS */}
            {genQuestions.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-extrabold text-sm text-zinc-800 uppercase tracking-widest border-b border-zinc-100 pb-2">
                  Daftar Soal Aktif ({genQuestions.length} Soal)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {genQuestions.map((q, idx) => (
                    <div key={q.id || idx} className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 px-2.5 py-1 rounded-full">
                          Soal {idx + 1}
                        </span>
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full",
                          q.difficulty === 'easy' ? "bg-emerald-50 text-emerald-700" :
                          q.difficulty === 'medium' ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"
                        )}>
                          {q.difficulty}
                        </span>
                      </div>
                      <h5 className="font-bold text-sm text-zinc-900">{q.title}</h5>
                      <p className="text-zinc-500 text-xs line-clamp-3 leading-relaxed">{q.instruction}</p>
                      <div className="text-[10px] text-zinc-400 font-bold border-t border-zinc-100 pt-2 flex justify-between">
                        <span>TIPE: {q.type.toUpperCase().replace('_', ' ')}</span>
                        {q.module_association && <span>MODUL: {q.module_association}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};
