import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { useStore } from '../store/useStore';
import { assessmentService, AssessmentQuestion } from '../services/assessmentService';
import { Plus, Edit, Trash, Search, ChevronLeft, Save, AlertCircle, HelpCircle, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

export const QuestionBankDashboard: React.FC = () => {
  const { user, setPage } = useStore();
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuFilter, setMenuFilter] = useState<'all' | 'pre_test' | 'post_test' | 'program_keterampilan' | 'ujian_praktik'>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Edit / Create Form State
  const [editingQuestion, setEditingQuestion] = useState<AssessmentQuestion | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

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
    setIsFormOpen(true);
  };

  const handleEdit = (q: AssessmentQuestion) => {
    setEditingQuestion({
      ...q,
      test_cases: typeof q.test_cases === 'string' ? q.test_cases : JSON.stringify(q.test_cases || []),
      validation_rules: typeof q.validation_rules === 'string' ? q.validation_rules : JSON.stringify(q.validation_rules || [])
    });
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
      await assessmentService.saveQuestion(editingQuestion);
      setIsFormOpen(false);
      setEditingQuestion(null);
      fetchQuestions();
    } catch (e: any) {
      alert(`Gagal menyimpan soal: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          q.instruction.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMenu = menuFilter === 'all' || q.menu_type === menuFilter;
    return matchesSearch && matchesMenu;
  });

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
          <button 
            onClick={handleCreateNew}
            className="bg-rose-700 hover:bg-rose-800 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md shadow-rose-700/10 active:scale-95 transition-all flex items-center gap-2"
          >
            <Plus size={16} />
            Tambah Soal Baru
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-sm">
            <AlertCircle size={18} />
            <p>{error}</p>
          </div>
        )}

        {/* QUESTIONS LISTING */}
        {!isFormOpen && (
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
                    onClick={() => setMenuFilter(type as any)}
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

            {loading ? (
              <div className="flex justify-center p-12">
                <Loader2 className="animate-spin text-rose-700" size={32} />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map(q => (
                    <div key={q.id} className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-4 hover:border-zinc-300 transition-colors flex flex-col justify-between">
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
                        <h3 className="font-bold text-lg text-zinc-900 line-clamp-1">{q.title}</h3>
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
                            className="p-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 rounded-lg transition-colors"
                          >
                            <Edit size={14} />
                          </button>
                          <button 
                            onClick={() => handleDelete(q.id!)}
                            className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                          >
                            <Trash size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 p-12 text-center text-zinc-400 italic">
                    Tidak ada soal ditemukan.
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

            {/* FLOWCHART URL FOR TRANSLATION */}
            {editingQuestion.type === 'flowchart_translation' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Flowchart Image URL</label>
                <input 
                  type="text" 
                  value={editingQuestion.flowchart_url || ''}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, flowchart_url: e.target.value })}
                  className="w-full px-4 py-3 border border-zinc-200 rounded-xl outline-none focus:border-rose-700 bg-zinc-50 text-sm font-bold"
                  placeholder="https://image-bucket.com/flowchart_01.png"
                />
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
      </div>
    </Layout>
  );
};
