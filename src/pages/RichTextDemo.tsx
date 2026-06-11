import React, { useState } from 'react';
import { RichTextEditor } from '../components/RichTextEditor';
import { RichTextRenderer } from '../components/RichTextRenderer';
import { CodeEditor } from '../components/CodeEditor';
import { preprocessCode } from '../lib/codePreprocessor';
import { Layout } from '../components/Layout';
import { 
  BookOpen, HelpCircle, Code2, Settings, Eye, CheckCircle2, 
  XCircle, AlertTriangle, Play, Sparkles, RefreshCw, Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DemoLesson {
  title: string;
  explanation: string;
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
  };
  initialCode: string;
  solution: string;
  validationRules: {
    pattern: string;
    message: string;
    shouldExist: boolean;
    stripStrings: boolean;
  }[];
}

const DEFAULT_DEMO_LESSON: DemoLesson = {
  title: 'Perulangan Bersyarat (While Loop) dalam Python',
  explanation: `
    <h2>Mengenal Perulangan <code>while</code></h2>
    <p>Perulangan <code>while</code> di gunakan untuk mengeksekusi blok kode secara berulang-ulang selama kondisi bernilai <strong>True</strong>.</p>
    
    <h3>Rumus Matematika Deret:</h3>
    <p>Misalkan kita ingin menjumlahkan deret hitung $S_n = \\sum_{i=1}^{n} i$. Rumus cepatnya adalah:</p>
    <p>$$S_n = \\frac{n(n + 1)}{2}$$</p>
    <p>Di bawah ini adalah contoh perbandingan tabel kompleks kecepatan eksekusi:</p>
    
    <table>
      <thead>
        <tr>
          <th>Metode</th>
          <th>Kompleksitas Waktu</th>
          <th>Keterangan</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Rumus Matematika</td>
          <td><strong>O(1)</strong></td>
          <td>Paling optimal, langsung hitung</td>
        </tr>
        <tr>
          <td>Perulangan <code>while</code></td>
          <td><strong>O(n)</strong></td>
          <td>Iteratif, melintasi indeks satu per satu</td>
        </tr>
      </tbody>
    </table>

    <p>Mari pelajari cara kerja perulangan while di bawah ini!</p>
  `,
  quiz: {
    question: '<p>Kapan perulangan <code>while</code> akan <strong>berhenti mengeksekusi</strong> blok kode di dalamnya?</p>',
    options: [
      'Saat kondisi bernilai True',
      'Saat kondisi bernilai False',
      'Saat nilai variabel mencapai 100',
      'Saat program pertama kali dijalankan'
    ],
    correctAnswer: 1
  },
  initialCode: `# Latihan: Buat perulangan while untuk mem-print angka 1 sampai 3
i = 1
# Tulis perulangan while di bawah ini
`,
  solution: `i = 1
while i <= 3:
    print(i)
    i += 1
`,
  validationRules: [
    {
      pattern: '\\bwhile\\b',
      message: 'Anda wajib menggunakan instruksi perulangan "while"!',
      shouldExist: true,
      stripStrings: true
    },
    {
      pattern: 'print\\(\\s*3\\s*\\)',
      message: 'Dilarang melakukan hardcode output print(3) secara langsung!',
      shouldExist: false,
      stripStrings: true
    }
  ]
};

export const RichTextDemo: React.FC = () => {
  // Demo State
  const [lesson, setLesson] = useState<DemoLesson>(DEFAULT_DEMO_LESSON);
  const [activeStep, setActiveStep] = useState<'learn' | 'quiz' | 'exercise'>('learn');
  
  // Student Code State
  const [studentCode, setStudentCode] = useState<string>(DEFAULT_DEMO_LESSON.initialCode);
  const [studentOutput, setStudentOutput] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isCodeCorrect, setIsCodeCorrect] = useState<boolean | null>(null);

  // Admin Self-Test State
  const [selfTestResult, setSelfTestResult] = useState<{ success: boolean; message: string } | null>(null);
  
  // Quiz selection
  const [selectedQuizAns, setSelectedQuizAns] = useState<number | null>(null);
  const [quizChecked, setQuizChecked] = useState<boolean>(false);
  const [isQuizCorrect, setIsQuizCorrect] = useState<boolean | null>(null);

  // Handle Admin edits
  const updateExplanation = (html: string) => {
    setLesson(prev => ({ ...prev, explanation: html }));
  };

  const updateQuizQuestion = (html: string) => {
    setLesson(prev => ({ ...prev, quiz: { ...prev.quiz, question: html } }));
  };

  const handleRuleChange = (index: number, field: string, val: any) => {
    const updatedRules = [...lesson.validationRules];
    updatedRules[index] = { ...updatedRules[index], [field]: val };
    setLesson(prev => ({ ...prev, validationRules: updatedRules }));
  };

  const addRule = () => {
    setLesson(prev => ({
      ...prev,
      validationRules: [
        ...prev.validationRules,
        { pattern: '', message: 'Aturan validasi gagal!', shouldExist: true, stripStrings: true }
      ]
    }));
  };

  const removeRule = (idx: number) => {
    setLesson(prev => ({
      ...prev,
      validationRules: prev.validationRules.filter((_, i) => i !== idx)
    }));
  };

  // Run student code (Mock runtime)
  const handleRunStudentCode = () => {
    setValidationErrors([]);
    setStudentOutput('');
    setIsCodeCorrect(null);

    // 1. Run Preprocessing on student code
    const errors: string[] = [];
    
    for (const rule of lesson.validationRules) {
      try {
        const cleanCode = preprocessCode(studentCode, 'python', { 
          stripComments: true, 
          stripStrings: rule.stripStrings 
        });
        
        const regex = new RegExp(rule.pattern, 'i');
        const exists = regex.test(cleanCode);

        if (rule.shouldExist && !exists) {
          errors.push(rule.message);
        }
        if (!rule.shouldExist && exists) {
          errors.push(rule.message);
        }
      } catch (e) {
        errors.push(`Aturan Regex tidak valid: ${rule.pattern}`);
      }
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      setIsCodeCorrect(false);
      return;
    }

    // Mock output matching the correct while loop structure
    // We simulate code execution output based on simple regex patterns
    const hasWhile = studentCode.includes('while');
    const hasIncrement = studentCode.includes('+=') || studentCode.includes('+ 1') || studentCode.includes('=+');
    
    if (hasWhile && hasIncrement) {
      setStudentOutput("1\n2\n3");
      setIsCodeCorrect(true);
      confetti({ particleCount: 80, spread: 60 });
    } else if (hasWhile && !hasIncrement) {
      setStudentOutput("Error: Infinite Loop detected! (Siswa lupa melakukan increment)");
      setIsCodeCorrect(false);
    } else {
      setStudentOutput("1\n2\n3 (Output simulasi salah)");
      setIsCodeCorrect(false);
    }
  };

  // Admin Self-Test: Validate Solution code against Regex Rules
  const handleAdminSelfTest = () => {
    const errors: string[] = [];
    
    for (const rule of lesson.validationRules) {
      try {
        const cleanSol = preprocessCode(lesson.solution, 'python', {
          stripComments: true,
          stripStrings: rule.stripStrings
        });
        
        const regex = new RegExp(rule.pattern, 'i');
        const exists = regex.test(cleanSol);

        if (rule.shouldExist && !exists) {
          errors.push(`Solusi gagal memenuhi syarat: "${rule.message}"`);
        }
        if (!rule.shouldExist && exists) {
          errors.push(`Solusi melanggar pantangan: "${rule.message}"`);
        }
      } catch (e) {
        errors.push(`Regex sintaks error pada pattern: "${rule.pattern}"`);
      }
    }

    if (errors.length > 0) {
      setSelfTestResult({
        success: false,
        message: errors.join(' | ')
      });
    } else {
      setSelfTestResult({
        success: true,
        message: 'Lolos Uji Mandiri! Kode solusi resmi lulus semua validasi regex.'
      });
    }
  };

  // Check Quiz Answer
  const checkQuizAnswer = () => {
    if (selectedQuizAns === null) return;
    setQuizChecked(true);
    const correct = selectedQuizAns === lesson.quiz.correctAnswer;
    setIsQuizCorrect(correct);
    if (correct) {
      confetti({ particleCount: 50, spread: 40 });
    }
  };

  const resetQuiz = () => {
    setSelectedQuizAns(null);
    setQuizChecked(false);
    setIsQuizCorrect(null);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-8 p-4">
        {/* Banner header */}
        <div className="bg-gradient-to-r from-rose-800 to-zinc-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl -translate-y-12 translate-x-12" />
          <div className="relative z-10 space-y-3">
            <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Prototype Demo
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Rich Text & Regex Evaluation Playground
            </h1>
            <p className="text-zinc-300 max-w-2xl text-sm leading-relaxed">
              Uji coba integrasi visual **React Tiptap Editor (Ekuivalen Edra)** untuk Admin, 
              **Rich Text Renderer dengan LaTeX (Katex)**, serta **Code Preprocessor** (membersihkan komentar & string) 
              sebelum validasi regex.
            </p>
          </div>
        </div>

        {/* Grid Area: Kiri (Admin Interface), Kanan (Student Simulator) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* ============================================================ */}
          {/* PANEL KIRI: ANTARMUKA ADMIN (AUTHORING TOOL)                 */}
          {/* ============================================================ */}
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-zinc-100 pb-4">
              <div className="p-2 bg-rose-50 text-rose-700 rounded-xl">
                <Settings size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-zinc-900">Panel Admin (Pembuatan Soal)</h2>
                <p className="text-xs text-zinc-400">Editor visual tempat guru merancang penjelasan, kuis & aturan regex</p>
              </div>
            </div>

            {/* Input 1: Judul Materi */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Judul Materi</label>
              <input 
                type="text" 
                value={lesson.title} 
                onChange={(e) => setLesson(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-rose-700 font-bold text-zinc-800"
              />
            </div>

            {/* Input 2: Editor Penjelasan Materi (Tiptap) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Penjelasan Materi (Tiptap Editor)</label>
              <RichTextEditor value={lesson.explanation} onChange={updateExplanation} />
              <p className="text-[10px] text-zinc-400 italic">Tips: Coba tulis rumus matematika seperti <code>$E=mc^2$</code> atau tambahkan tabel menggunakan toolbar di atas.</p>
            </div>

            {/* Input 3: Editor Kuis (Tiptap) */}
            <div className="space-y-4 border-t border-zinc-100 pt-4">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest block">Pertanyaan Kuis (Tiptap Editor)</label>
              <RichTextEditor value={lesson.quiz.question} onChange={updateQuizQuestion} />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lesson.quiz.options.map((opt, oIdx) => (
                  <div key={oIdx} className="flex items-center gap-2">
                    <span className="text-xs font-bold text-zinc-400">{String.fromCharCode(65 + oIdx)}.</span>
                    <input 
                      type="text"
                      value={opt}
                      onChange={(e) => {
                        const opts = [...lesson.quiz.options];
                        opts[oIdx] = e.target.value;
                        setLesson(prev => ({ ...prev, quiz: { ...prev.quiz, options: opts } }));
                      }}
                      className="flex-1 px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none"
                    />
                    <input 
                      type="radio" 
                      name="correct_ans_radio" 
                      checked={lesson.quiz.correctAnswer === oIdx}
                      onChange={() => setLesson(prev => ({ ...prev, quiz: { ...prev.quiz, correctAnswer: oIdx } }))}
                      title="Kunci Jawaban"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Input 4: Aturan Pengecekan Regex & Solusi Resmi */}
            <div className="space-y-4 border-t border-zinc-100 pt-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Validasi Regex & Solusi Kode</label>
                <button 
                  onClick={addRule}
                  className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition-colors flex items-center gap-1"
                >
                  <Plus size={12} /> Tambah Aturan
                </button>
              </div>

              {/* List Validasi Rules */}
              <div className="space-y-3">
                {lesson.validationRules.map((rule, rIdx) => (
                  <div key={rIdx} className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-3 relative">
                    <button 
                      onClick={() => removeRule(rIdx)}
                      className="absolute top-2 right-2 text-zinc-400 hover:text-red-500 transition-colors"
                      title="Hapus Aturan"
                    >
                      <XCircle size={16} />
                    </button>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-zinc-400 uppercase">Pattern Regex</label>
                        <input 
                          type="text" 
                          value={rule.pattern} 
                          onChange={(e) => handleRuleChange(rIdx, 'pattern', e.target.value)}
                          placeholder="e.g. \\bwhile\\b"
                          className="w-full px-3 py-2 text-xs border border-zinc-200 rounded-lg focus:outline-none focus:border-rose-700 font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-zinc-400 uppercase">Pesan Error Gagal</label>
                        <input 
                          type="text" 
                          value={rule.message} 
                          onChange={(e) => handleRuleChange(rIdx, 'message', e.target.value)}
                          placeholder="Pesan jika validasi gagal"
                          className="w-full px-3 py-2 text-xs border border-zinc-200 rounded-lg focus:outline-none focus:border-rose-700"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 text-xs text-zinc-600 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={rule.shouldExist}
                          onChange={(e) => handleRuleChange(rIdx, 'shouldExist', e.target.checked)}
                        />
                        Harus Ada di Kode (True)
                      </label>
                      <label className="flex items-center gap-2 text-xs text-zinc-600 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={rule.stripStrings}
                          onChange={(e) => handleRuleChange(rIdx, 'stripStrings', e.target.checked)}
                        />
                        Bersihkan String Literal
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              {/* Solusi Kode Resmi */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest block">Kode Solusi Resmi (Untuk Self-Test)</label>
                <textarea 
                  value={lesson.solution}
                  onChange={(e) => setLesson(prev => ({ ...prev, solution: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-rose-700 font-mono text-sm bg-zinc-950 text-emerald-400"
                  placeholder="# Tulis solusi di sini"
                />
              </div>

              {/* Tombol Self-Test */}
              <div className="space-y-3">
                <button 
                  onClick={handleAdminSelfTest}
                  className="w-full py-3 bg-zinc-900 text-white font-bold rounded-xl hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Sparkles size={16} className="text-rose-400" />
                  Jalankan Uji Mandiri (Self-Test Solusi Resmi)
                </button>

                {selfTestResult && (
                  <div className={`p-4 rounded-xl flex items-start gap-3 border text-sm ${selfTestResult.success ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                    {selfTestResult.success ? <CheckCircle2 className="shrink-0 text-emerald-600" size={18} /> : <AlertTriangle className="shrink-0 text-red-600" size={18} />}
                    <div>
                      <p className="font-bold">{selfTestResult.success ? 'Uji Mandiri Lolos' : 'Uji Mandiri Gagal!'}</p>
                      <p className="text-xs mt-1">{selfTestResult.message}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* PANEL KANAN: SIMULATOR SISWA (STUDENT VIEW)                  */}
          {/* ============================================================ */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                  <Eye size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-zinc-900">Simulator Tampilan Siswa</h2>
                  <p className="text-xs text-zinc-400">Pratinjau interaktif bagaimana materi & kuis terlihat bagi siswa</p>
                </div>
              </div>
            </div>

            {/* Stepper Simulator */}
            <div className="flex items-center justify-center gap-2 bg-white p-2 rounded-2xl border border-zinc-200/50 shadow-sm">
              <button 
                onClick={() => setActiveStep('learn')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase transition-all flex items-center justify-center gap-1.5 ${activeStep === 'learn' ? 'bg-rose-700 text-white shadow-sm shadow-rose-700/10' : 'text-zinc-500 hover:bg-zinc-100'}`}
              >
                <BookOpen size={14} /> 1. Pelajari
              </button>
              <button 
                onClick={() => setActiveStep('quiz')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase transition-all flex items-center justify-center gap-1.5 ${activeStep === 'quiz' ? 'bg-rose-700 text-white shadow-sm shadow-rose-700/10' : 'text-zinc-500 hover:bg-zinc-100'}`}
              >
                <HelpCircle size={14} /> 2. Kuis
              </button>
              <button 
                onClick={() => setActiveStep('exercise')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase transition-all flex items-center justify-center gap-1.5 ${activeStep === 'exercise' ? 'bg-rose-700 text-white shadow-sm shadow-rose-700/10' : 'text-zinc-500 hover:bg-zinc-100'}`}
              >
                <Code2 size={14} /> 3. Latihan
              </button>
            </div>

            {/* Konten Berdasarkan Step active */}
            <div className="bg-white border border-zinc-200/70 rounded-2xl p-6 min-h-[400px] shadow-sm">
              
              {/* STEP 1: MATERI */}
              {activeStep === 'learn' && (
                <div className="space-y-4">
                  <h1 className="text-2xl font-black text-zinc-900 tracking-tight">{lesson.title}</h1>
                  <hr className="border-zinc-100" />
                  <RichTextRenderer content={lesson.explanation} />
                </div>
              )}

              {/* STEP 2: KUIS */}
              {activeStep === 'quiz' && (
                <div className="space-y-6">
                  <span className="text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200/60 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Uji Pemahaman Anda
                  </span>
                  
                  <RichTextRenderer content={lesson.quiz.question} />

                  <div className="space-y-2">
                    {lesson.quiz.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => !quizChecked && setSelectedQuizAns(oIdx)}
                        disabled={quizChecked}
                        className={`w-full text-left px-5 py-4 rounded-xl border text-sm transition-all flex items-center justify-between ${
                          quizChecked
                            ? oIdx === lesson.quiz.correctAnswer
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold'
                              : selectedQuizAns === oIdx
                                ? 'bg-red-50 border-red-400 text-red-800 font-bold'
                                : 'border-zinc-200 text-zinc-400'
                            : selectedQuizAns === oIdx
                              ? 'border-rose-700 bg-rose-50/50 text-rose-950 font-bold shadow-sm'
                              : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                        }`}
                      >
                        <span>{opt}</span>
                        {quizChecked && oIdx === lesson.quiz.correctAnswer && <CheckCircle2 className="text-emerald-600" size={16} />}
                        {quizChecked && selectedQuizAns === oIdx && oIdx !== lesson.quiz.correctAnswer && <XCircle className="text-red-600" size={16} />}
                      </button>
                    ))}
                  </div>

                  {!quizChecked ? (
                    <button
                      onClick={checkQuizAnswer}
                      disabled={selectedQuizAns === null}
                      className="w-full py-4 bg-zinc-950 hover:bg-zinc-800 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-zinc-900/10 active:scale-95"
                    >
                      Kirim Jawaban Kuis
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div className={`p-4 rounded-xl flex items-center gap-2 border text-sm ${isQuizCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                        {isQuizCorrect ? <CheckCircle2 className="text-emerald-600" size={18} /> : <XCircle className="text-red-600" size={18} />}
                        <span className="font-bold">{isQuizCorrect ? 'Jawaban Anda Benar! Sempurna.' : 'Jawaban Anda Salah, silakan coba lagi.'}</span>
                      </div>
                      <button
                        onClick={resetQuiz}
                        className="w-full py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2"
                      >
                        <RefreshCw size={14} /> Coba Lagi
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: LATIHAN CODING */}
              {activeStep === 'exercise' && (
                <div className="space-y-6 flex flex-col h-full">
                  <div>
                    <span className="text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200/60 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Praktik Penulisan Kode (Python)
                    </span>
                    <h3 className="text-lg font-bold mt-3 text-zinc-800">Tugas Anda:</h3>
                    <p className="text-sm text-zinc-500 mt-1">Buatlah kode Python menggunakan perulangan <code>while</code> untuk mencetak angka 1 sampai 3.</p>
                  </div>

                  {/* Monaco Editor Wrapper */}
                  <div className="h-[250px]">
                    <CodeEditor 
                      code={studentCode} 
                      onChange={(val) => setStudentCode(val || '')} 
                      onRun={handleRunStudentCode} 
                      language="python"
                    />
                  </div>

                  {/* Hasil Eksekusi & Validasi Regex */}
                  <div className="space-y-3">
                    <button
                      onClick={handleRunStudentCode}
                      className="w-full py-4 bg-rose-700 hover:bg-rose-600 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-rose-700/10 active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Play size={16} /> Jalankan Kode Latihan
                    </button>

                    {/* Output simulasi */}
                    {studentOutput && (
                      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-200 space-y-1">
                        <span className="text-zinc-500 text-[10px] font-bold block uppercase tracking-wider border-b border-zinc-800 pb-1.5">Output Eksekusi</span>
                        <pre className="pt-1.5 whitespace-pre-wrap">{studentOutput}</pre>
                      </div>
                    )}

                    {/* Error Validasi Regex (Comment Preprocessor check) */}
                    {isCodeCorrect !== null && (
                      <div className={`p-4 rounded-xl border flex items-start gap-2.5 text-sm ${isCodeCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                        {isCodeCorrect ? (
                          <>
                            <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={18} />
                            <div>
                              <p className="font-bold">Latihan Selesai dengan Sukses!</p>
                              <p className="text-xs mt-0.5">Kode Anda lolos semua test cases dan lulus validasi regex (tidak menggunakan trik curang komentar/string).</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <XCircle className="text-red-600 shrink-0 mt-0.5" size={18} />
                            <div>
                              <p className="font-bold">Latihan Gagal Validasi!</p>
                              <ul className="list-disc pl-4 text-xs mt-1.5 space-y-1">
                                {validationErrors.length > 0 ? (
                                  validationErrors.map((err, eIdx) => <li key={eIdx}>{err}</li>)
                                ) : (
                                  <li>Kode Anda tidak memproduksi output yang diharapkan.</li>
                                )}
                              </ul>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {/* Petunjuk cara mencoba celah komentar */}
                    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-xs text-zinc-500 leading-relaxed">
                      💡 **Cara Menguji Celah Komentar**:
                      <ul className="list-disc pl-4 mt-1.5 space-y-1">
                        <li>Aturan menghendaki Anda memakai keyword <code>while</code>. Coba tulis <code># while loop</code> pada kode Anda tetapi jangan ketik instruksi while di kodenya. Kode akan **gagal validasi** karena preprocessor membersihkan komentar sebelum regex diuji!</li>
                        <li>Aturan melarang mencetak 3 secara langsung (hardcode). Coba ketik <code>print(3)</code>. Kode akan **gagal validasi** karena preprocessor membersihkan string literal dan mendeteksi angka 3.</li>
                      </ul>
                    </div>

                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};
