import React, { useState, useRef, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, BookOpen, Trophy, Zap, ChevronRight, Play, Code2, BarChart3, BrainCircuit, LogIn, RotateCcw, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useCodeRunner, CodeLanguage } from '../hooks/useCodeRunner';
import { parseOutputWithImages } from '../utils/parseOutputWithImages';
import '@xterm/xterm/css/xterm.css';

// Demo IDE (Monaco + xterm) di-lazy: sebelumnya ikut terunduh saat landing dibuka.
// Sekarang landing awal ringan; editor + terminal baru diunduh saat section demo dirender.
const CodeEditor = lazy(() => import('../components/CodeEditor').then((m) => ({ default: m.CodeEditor })));
const PlotDisplay = lazy(() => import('../components/PlotDisplay').then((m) => ({ default: m.PlotDisplay })));

const DEMO_SCRIPTS = {
  python: [
    {
      name: '👋 Sapa',
      code: 'nama = input("Siapa nama kamu? ")\nprint(f"Halo, {nama}! Selamat datang di E-Learning!")\numur = input("Berapa umur kamu? ")\nprint(f"Keren, umur {umur} tahun! Semangat belajar Python!")'
    },
    {
      name: '🔢 Ganjil Genap',
      code: 'angka = input("Masukkan angka: ")\nn = int(angka)\nif n % 2 == 0:\n    print(f"{n} adalah bilangan Genap!")\nelse:\n    print(f"{n} adalah bilangan Ganjil!")'
    },
    {
      name: '⭐ Bintang',
      code: 'baris = input("Masukkan jumlah baris: ")\nfor i in range(1, int(baris) + 1):\n    print("*" * i)'
    },
    {
      name: '📊 Grafik',
      code: 'import matplotlib.pyplot as plt\n\nbulan = ["Jan", "Feb", "Mar", "Apr", "Mei"]\npenjualan = [10, 25, 18, 30, 42]\n\nplt.plot(bulan, penjualan, marker="o", color="#800000", linewidth=2)\nplt.title("Grafik Penjualan Bulanan")\nplt.xlabel("Bulan")\nplt.ylabel("Penjualan (Juta)")\nplt.grid(True)\n\nplt.show()\nprint("Grafik berhasil ditampilkan!")'
    }
  ],
  c: [
    {
      name: '👋 Sapa',
      code: '#include <stdio.h>\n\nint main() {\n    char nama[50];\n    int umur;\n    printf("Siapa nama kamu? ");\n    scanf("%49s", nama);\n    printf("Halo, %s!\\n", nama);\n    printf("Berapa umur kamu? ");\n    scanf("%d", &umur);\n    printf("Umur kamu %d tahun!\\n", umur);\n    return 0;\n}'
    },
    {
      name: '🔢 Ganjil Genap',
      code: '#include <stdio.h>\n\nint main() {\n    int n;\n    printf("Masukkan angka: ");\n    scanf("%d", &n);\n    if (n % 2 == 0) {\n        printf("%d adalah Genap!\\n", n);\n    } else {\n        printf("%d adalah Ganjil!\\n", n);\n    }\n    return 0;\n}'
    },
    {
      name: '⭐ Bintang',
      code: '#include <stdio.h>\n\nint main() {\n    int baris, i, j;\n    printf("Masukkan jumlah baris: ");\n    scanf("%d", &baris);\n    for (i = 1; i <= baris; i++) {\n        for (j = 1; j <= i; j++) {\n            printf("*");\n        }\n        printf("\\n");\n    }\n    return 0;\n}'
    }
  ]
};

const DEFAULT_CODE: Record<CodeLanguage, string> = {
  python: '# Tulis kode Python Anda di sini\nnama = input("Siapa nama kamu? ")\nprint(f"Halo, {nama}! Selamat datang!")',
  c: '#include <stdio.h>\n\nint main() {\n    char nama[100];\n    printf("Siapa nama kamu? ");\n    scanf("%[^\\n]", nama);\n    printf("Halo, %s! Selamat datang!\\n", nama);\n    return 0;\n}',
};

export const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const setUser = useStore((state) => state.setUser);
  const setPage = useStore((state) => state.setPage);

  const [language, setLanguage] = useState<CodeLanguage>('python');
  const [code, setCode] = useState(DEFAULT_CODE.python);
  const [isRunning, setIsRunning] = useState(false);
  const { runCode, isLoading } = useCodeRunner(language);
  const { pyodideWorker, isPyodideLoading, isCLoading } = useStore();

  const [activeTemplateIdx, setActiveTemplateIdx] = useState<number | null>(null);
  const [plotImages, setPlotImages] = useState<string[]>([]);

  // Mobile Input helper states
  const [isWaitingForInput, setIsWaitingForInput] = useState(false);
  const [mobileInputValue, setMobileInputValue] = useState('');

  // xterm.js refs (tipe any agar modul xterm hanya dimuat saat demo dirender)
  const termContainerRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<any | null>(null);
  const fitAddonRef = useRef<any | null>(null);

  // Interactive input state (for Python RUN_INTERACTIVE)
  const inputBufferRef = useRef('');
  const waitingForInputRef = useRef(false);

  // C iterative execution mode
  const cStdinModeRef = useRef(false);
  const cStdinLinesRef = useRef<string[]>([]);
  const cStdinBufferRef = useRef('');
  const cLastOutputLenRef = useRef(0);
  const cStdinOffsetsRef = useRef<number[]>([]);

  // Init xterm.js terminal (dynamic import agar tidak ikut bundle awal landing)
  useEffect(() => {
    if (!termContainerRef.current || xtermRef.current) return;
    let cancelled = false;
    let term: any = null;
    let resizeObserver: ResizeObserver | null = null;

    (async () => {
      const [{ Terminal }, { FitAddon }] = await Promise.all([
        import('@xterm/xterm'),
        import('@xterm/addon-fit'),
      ]);
      if (cancelled || !termContainerRef.current || xtermRef.current) return;

      term = new Terminal({
      theme: {
        background: '#09090b',
        foreground: '#e4e4e7',
        cursor: '#a1a1aa',
        cursorAccent: '#09090b',
        selectionBackground: '#3f3f4680',
        green: '#4ade80',
        red: '#f87171',
        yellow: '#facc15',
        blue: '#60a5fa',
        magenta: '#c084fc',
        cyan: '#22d3ee',
      },
      fontSize: 12,
      fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
      cursorBlink: true,
      cursorStyle: 'bar',
      convertEol: true,
      disableStdin: false,
      scrollback: 1000,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(termContainerRef.current);
    fitAddon.fit();

    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    term.onKey(({ key, domEvent }) => {
      const keyCode = domEvent.keyCode;

      if (waitingForInputRef.current) {
        if (keyCode === 13) {
          waitingForInputRef.current = false;
          setIsWaitingForInput(false);
          term.write('\r\n');
          const inputValue = inputBufferRef.current;
          inputBufferRef.current = '';
          if (pyodideWorker) {
            pyodideWorker.postMessage({ type: 'INPUT_RESPONSE', value: inputValue });
          }
        } else if (keyCode === 8) {
          if (inputBufferRef.current.length > 0) {
            inputBufferRef.current = inputBufferRef.current.slice(0, -1);
            term.write('\b \b');
          }
        } else if (!domEvent.ctrlKey && !domEvent.altKey && !domEvent.metaKey) {
          inputBufferRef.current += key;
          term.write(key);
        }
      } else if (cStdinModeRef.current) {
        if (keyCode === 13) {
          term.write('\r\n');
          setIsWaitingForInput(false);
          cStdinLinesRef.current.push(cStdinBufferRef.current);
          cStdinBufferRef.current = '';
          const allStdin = cStdinLinesRef.current.join('\n') + '\n';
          executeCCodeRef.current(allStdin);
        } else if (keyCode === 8) {
          if (cStdinBufferRef.current.length > 0) {
            cStdinBufferRef.current = cStdinBufferRef.current.slice(0, -1);
            term.write('\b \b');
          }
        } else if (!domEvent.ctrlKey && !domEvent.altKey && !domEvent.metaKey) {
          cStdinBufferRef.current += key;
          term.write(key);
        }
      }
    });

    // Welcoming text
    term.writeln('\x1b[2mKetik kode di editor atas, lalu klik "Jalankan" untuk menguji!\x1b[0m');

    resizeObserver = new ResizeObserver(() => fitAddon.fit());
    if (termContainerRef.current) resizeObserver.observe(termContainerRef.current);
    })();

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      term?.dispose();
      xtermRef.current = null;
    };
  }, [pyodideWorker]);

  const runPythonInteractive = useCallback(async (codeToRun: string) => {
    const term = xtermRef.current;
    if (!term || !pyodideWorker) return;

    setIsRunning(true);
    setPlotImages([]);
    term.clear();
    term.writeln('\x1b[1;36m$ python main.py\x1b[0m');
    term.writeln('');

    let lastOutputLength = 0;
    const id = Date.now().toString() + Math.random().toString();

    const handler = (e: MessageEvent) => {
      if (e.data.id !== id) return;

      if (e.data.type === 'INPUT_REQUEST') {
        const rawOutput = e.data.output || '';
        const { cleanText, images } = parseOutputWithImages(rawOutput);
        if (images.length > 0) {
          setPlotImages(images);
        }
        if (cleanText.length > lastOutputLength) {
          term.write(cleanText.slice(lastOutputLength));
          lastOutputLength = cleanText.length;
        }
        const prompt = e.data.prompt || '';
        if (prompt) {
          term.write(prompt);
        }
        waitingForInputRef.current = true;
        setIsWaitingForInput(true);
        inputBufferRef.current = '';
        setMobileInputValue('');
      } else if (e.data.type === 'RUN_DONE') {
        pyodideWorker.removeEventListener('message', handler);
        const rawOutput = e.data.output || '';
        const { cleanText, images } = parseOutputWithImages(rawOutput);
        if (images.length > 0) {
          setPlotImages(images);
        }
        if (cleanText.length > lastOutputLength) {
          term.write(cleanText.slice(lastOutputLength));
        }
        term.writeln('');
        term.writeln('\x1b[1;32m✓ Selesai!\x1b[0m');
        setIsRunning(false);
        setIsWaitingForInput(false);
      } else if (e.data.type === 'RUN_ERROR') {
        pyodideWorker.removeEventListener('message', handler);
        term.writeln(`\x1b[1;31m❌ Error: ${e.data.error}\x1b[0m`);
        setIsRunning(false);
        setIsWaitingForInput(false);
      } else if (e.data.type === 'RUN_CANCELLED') {
        pyodideWorker.removeEventListener('message', handler);
        term.writeln('\x1b[1;33m⚠ Dibatalkan.\x1b[0m');
        setIsRunning(false);
        setIsWaitingForInput(false);
      }
    };

    pyodideWorker.addEventListener('message', handler);
    pyodideWorker.postMessage({ type: 'RUN_INTERACTIVE', code: codeToRun, id });

    (term as any).__cleanup = () => {
      pyodideWorker.removeEventListener('message', handler);
      pyodideWorker.postMessage({ type: 'CANCEL' });
    };
  }, [pyodideWorker]);

  const executeCCode = useCallback(async (stdin: string) => {
    const term = xtermRef.current;
    if (!term) return;

    setIsRunning(true);
    const result = await runCode(code, stdin || undefined);

    if (result.error && !result.output) {
      cStdinModeRef.current = false;
      setIsWaitingForInput(false);
      term.clear();
      term.writeln('\x1b[1;36m$ gcc main.c -o main && ./main\x1b[0m');
      term.writeln('');
      term.writeln(`\x1b[1;31m❌ Error:\x1b[0m`);
      term.writeln(`\x1b[31m${result.error}\x1b[0m`);
      setIsRunning(false);
      return;
    }

    term.clear();
    term.writeln('\x1b[1;36m$ gcc main.c -o main && ./main\x1b[0m');
    term.writeln('');

    if (result.waitingForInput && result.stdoutLenAtInputRequest !== undefined) {
      const newOffset = result.stdoutLenAtInputRequest;
      if (!cStdinOffsetsRef.current.includes(newOffset)) {
        cStdinOffsetsRef.current.push(newOffset);
      }
    }

    let output = result.output || '';
    if (result.waitingForInput && result.stdoutLenAtInputRequest !== undefined) {
      output = output.slice(0, result.stdoutLenAtInputRequest);
    }
    
    let displayOutput = '';
    const offsets = cStdinOffsetsRef.current;
    const inputs = cStdinLinesRef.current;
    
    let lastOffset = 0;
    for (let i = 0; i < offsets.length; i++) {
      const offset = offsets[i];
      displayOutput += output.slice(lastOffset, offset);
      if (i < inputs.length) {
        displayOutput += inputs[i] + '\n';
      }
      lastOffset = offset;
    }
    displayOutput += output.slice(lastOffset);
    
    term.write(displayOutput);

    if (result.error) {
      term.writeln('');
      term.writeln(`\x1b[33m⚠ ${result.error}\x1b[0m`);
    }

    if (result.waitingForInput) {
      cStdinModeRef.current = true;
      setIsWaitingForInput(true);
      cStdinBufferRef.current = '';
      setMobileInputValue('');
    } else {
      cStdinModeRef.current = false;
      setIsWaitingForInput(false);
      if (!output.endsWith('\n') && output.length > 0) term.writeln('');
      term.writeln('');
      term.writeln('\x1b[1;32m✓ Selesai!\x1b[0m');
      setIsRunning(false);
    }
  }, [runCode, code]);

  const runC = useCallback(async () => {
    const term = xtermRef.current;
    if (!term) return;

    setIsRunning(true);
    term.clear();
    term.writeln('\x1b[1;36m$ gcc main.c -o main && ./main\x1b[0m');

    cStdinLinesRef.current = [];
    cStdinBufferRef.current = '';
    cLastOutputLenRef.current = 0;
    cStdinOffsetsRef.current = [];

    await executeCCode("");
  }, [executeCCode]);

  const executeCCodeRef = useRef(executeCCode);
  useEffect(() => {
    executeCCodeRef.current = executeCCode;
  }, [executeCCode]);

  const handleRun = () => {
    const term = xtermRef.current;
    if (!term || isRunning) return;

    if (language === 'python') {
      runPythonInteractive(code);
    } else {
      runC();
    }
  };

  const handleMobileInputSubmit = (forcedValue?: string) => {
    const val = forcedValue !== undefined ? forcedValue : mobileInputValue;
    setMobileInputValue('');
    setIsWaitingForInput(false);

    const term = xtermRef.current;
    if (!term) return;

    if (waitingForInputRef.current) {
      waitingForInputRef.current = false;
      term.writeln(val);
      if (pyodideWorker) {
        pyodideWorker.postMessage({ type: 'INPUT_RESPONSE', value: val });
      }
    } else if (cStdinModeRef.current) {
      term.writeln(val);
      cStdinLinesRef.current.push(val);
      const allStdin = cStdinLinesRef.current.join('\n') + '\n';
      executeCCode(allStdin);
    }
  };

  const handleLanguageChange = (newLang: CodeLanguage) => {
    const term = xtermRef.current;
    if (term && (term as any).__cleanup) {
      (term as any).__cleanup();
      (term as any).__cleanup = null;
    }
    waitingForInputRef.current = false;
    inputBufferRef.current = '';
    cStdinModeRef.current = false;
    cStdinLinesRef.current = [];
    cStdinBufferRef.current = '';
    cStdinOffsetsRef.current = [];
    setIsRunning(false);
    setIsWaitingForInput(false);
    setActiveTemplateIdx(null);

    setLanguage(newLang);
    setPlotImages([]);
    setCode(DEFAULT_CODE[newLang]);
    if (term) {
      term.clear();
      term.writeln('\x1b[2mKetik kode di editor atas, lalu klik "Jalankan" untuk menguji!\x1b[0m');
    }
  };

  const handleReset = () => {
    const term = xtermRef.current;
    if (!term) return;
    if ((term as any).__cleanup) {
      (term as any).__cleanup();
      (term as any).__cleanup = null;
    }
    waitingForInputRef.current = false;
    inputBufferRef.current = '';
    cStdinModeRef.current = false;
    cStdinLinesRef.current = [];
    cStdinBufferRef.current = '';
    setIsRunning(false);
    setIsWaitingForInput(false);
    setActiveTemplateIdx(null);
    setCode(DEFAULT_CODE[language]);
    term.clear();
    term.writeln('\x1b[2mKetik kode di editor atas, lalu klik "Jalankan" untuk menguji!\x1b[0m');
  };

  const selectTemplate = (idx: number) => {
    setActiveTemplateIdx(idx);
    const templateCode = DEMO_SCRIPTS[language][idx].code;
    setCode(templateCode);
    
    // Clear output and output reset message
    const term = xtermRef.current;
    if (term) {
      if ((term as any).__cleanup) {
        (term as any).__cleanup();
        (term as any).__cleanup = null;
      }
      waitingForInputRef.current = false;
      inputBufferRef.current = '';
      cStdinModeRef.current = false;
      cStdinLinesRef.current = [];
      cStdinBufferRef.current = '';
      setIsRunning(false);
      setIsWaitingForInput(false);
      setPlotImages([]);
      term.clear();
      term.writeln(`\x1b[1;36m📝 Menggunakan template: ${DEMO_SCRIPTS[language][idx].name}\x1b[0m`);
      term.writeln('\x1b[2mKetik kode di editor atas, lalu klik "Jalankan" untuk menguji!\x1b[0m');
    }
  };

  const handleDevLogin = (role: 'kordas' | 'praktikan') => {
    const mockUser = {
      nim: role === 'kordas' ? '123456789' : '202211083',
      nama: role === 'kordas' ? 'Developer Koordinator' : 'Developer Mahasiswa',
      kelas: 'DEV-X',
      role: role,
      xp: role === 'kordas' ? 9999 : 120,
      level: role === 'kordas' ? 10 : 1,
      streak: 3,
      lastActive: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      assessmentAccess: {
        pre_test: true,
        post_test: true,
        program_keterampilan: true,
        ujian_praktik: true
      },
      levelAccessOverrides: {}
    };
    setUser(mockUser);
    setPage('dashboard');
  };

  return (
    <div className="min-h-screen bg-transparent text-dark font-sans selection:bg-maroon-bg selection:text-maroon">
      {/* Navbar */}
      <nav className="h-20 px-6 md:px-12 flex items-center justify-between sticky top-0 bg-[#FDFBF7]/80 backdrop-blur-md z-50 border-b border-maroon/5">
        <div 
          onClick={() => setPage('dashboard')}
          className="flex items-center gap-3 font-black text-2xl tracking-tighter cursor-pointer"
        >
          <div className="w-11 h-11 bg-maroon rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-bubbly-maroon rotate-[-6deg] hover:rotate-0 transition-transform">
            E
          </div>
          <span className="text-maroon font-black tracking-tight ml-1">E-Learning</span>
        </div>
        <button 
          onClick={onStart}
          className="bg-maroon hover:bg-maroon-light text-white px-8 py-3.5 rounded-2xl font-black transition-all active:scale-95 shadow-bubbly-maroon active:translate-y-[6px] active:shadow-none btn-bubbly flex items-center gap-2 text-sm cursor-pointer"
        >
          <LogIn size={16} />
          Mulai Sekarang
        </button>
      </nav>

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-20 md:py-32 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-fun-yellow/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-maroon/5 rounded-full blur-[120px] -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-10"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-maroon-bg text-maroon rounded-2xl text-xs font-black border border-maroon/10 uppercase tracking-widest">
            <Zap size={14} fill="currentColor" className="text-fun-yellow" />
            Join the pro league!
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.95] text-dark">
            Jago <span className="text-transparent bg-clip-text bg-gradient-to-r from-maroon via-maroon-light to-rose-600">Coding</span> <br />
            Tanpa <span className="italic font-serif text-zinc-450 relative">
              Pusing.
              <span className="absolute bottom-1.5 left-0 w-full h-3 bg-fun-yellow/30 -z-10 rounded-full" />
            </span>
          </h1>

          <p className="text-xl text-zinc-550 max-w-lg leading-relaxed font-bold">
            Siap buat naik level? Yuk pelajari <span className="text-dark font-black underline decoration-maroon underline-offset-4 decoration-2">Python</span> & <span className="text-dark font-black underline decoration-fun-blue underline-offset-4 decoration-2">Bahasa C</span> dengan cara yang lebih seru dan interaktif.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button 
              onClick={onStart}
              className="group w-full sm:w-auto bg-gradient-to-r from-maroon to-maroon-light hover:from-maroon-light hover:to-rose-700 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-[0_8px_30px_rgb(138,21,56,0.2)] hover:shadow-[0_8px_35px_rgb(138,21,56,0.35)] hover:-translate-y-0.5 active:translate-y-1 flex items-center justify-center gap-3 cursor-pointer"
            >
              Let's Go!
              <ChevronRight size={22} className="group-hover:translate-x-1.5 transition-transform duration-350" />
            </button>
            <button 
              onClick={() => {
                const playgroundEl = document.getElementById('interactive-playground');
                playgroundEl?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group w-full sm:w-auto bg-white/80 hover:bg-maroon-bg/25 text-maroon border-2 border-maroon/10 hover:border-maroon/35 px-10 py-5 rounded-2xl font-black text-lg transition-all hover:-translate-y-0.5 active:translate-y-1 shadow-soft hover:shadow-md flex items-center justify-center gap-3 cursor-pointer"
            >
              Coba Playground
              <Terminal size={22} className="group-hover:rotate-12 transition-transform duration-350" />
            </button>
          </div>

          {/* New Access Info */}
          <div className="p-5 bg-white/60 backdrop-blur-md border border-maroon/10 rounded-[2rem] shadow-soft max-w-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-maroon/5 rounded-full -mr-12 -mt-12 transition-all group-hover:scale-150 duration-500" />
            <div className="flex gap-4 relative z-10">
              <div className="w-12 h-12 bg-maroon-bg text-maroon rounded-2xl flex items-center justify-center shrink-0 border border-maroon/10 shadow-sm">
                <Play size={20} fill="currentColor" className="ml-0.5 text-maroon" />
              </div>
              <div>
                <h4 className="font-black text-sm uppercase tracking-wide mb-1 text-dark">Gimana caranya masuk?</h4>
                <p className="text-zinc-550 text-xs leading-relaxed font-semibold">
                  Masuk pakai NIM dan password akun portal praktikum kamu, langsung di halaman ini. Gampang kan?
                </p>
              </div>
            </div>
          </div>

          {import.meta.env.DEV && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname.startsWith('192.168.')) && (
            <div className="pt-6 border-t border-maroon/5 space-y-3">
              <p className="text-xs font-black text-maroon/50 uppercase tracking-widest">🧪 Developer Quick Access (Local Only)</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleDevLogin('kordas')}
                  className="px-4 py-2 bg-zinc-950 text-white text-xs font-bold rounded-xl transition-all active:scale-95 shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  Masuk sebagai Koordinator
                </button>
                <button
                  onClick={() => handleDevLogin('praktikan')}
                  className="px-4 py-2 bg-white hover:bg-zinc-55 text-zinc-900 text-xs font-bold rounded-xl transition-all active:scale-95 border border-zinc-200 flex items-center gap-1.5 cursor-pointer"
                >
                  Masuk sebagai Mahasiswa
                </button>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "circOut", delay: 0.2 }}
          className="relative"
        >
          <div className="bg-zinc-950 rounded-[3rem] p-8 shadow-[0_50px_100px_-20px_rgba(138,21,56,0.3)] border border-white/5 relative z-10 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-maroon/10 via-transparent to-fun-blue/10 opacity-50" />
            <div className="flex items-center justify-between mb-8 px-2 relative z-10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest font-bold">coding_adventure.v1</div>
            </div>
            <pre className="font-mono text-sm md:text-lg text-zinc-300 p-4 leading-relaxed relative z-10">
              <span className="text-zinc-650 italic">// Bahasa C</span><br />
              <span className="text-rose-400">#include</span> <span className="text-amber-300">&lt;stdio.h&gt;</span><br />
              <span className="text-rose-400">int</span> <span className="text-blue-450">main</span>() {"{"}<br />
              &nbsp;&nbsp;<span className="text-blue-450">printf</span>(<span className="text-amber-300">"Waktunya Jadi Pro!"</span>);<br />
              &nbsp;&nbsp;<span className="text-rose-400">return</span> <span className="text-amber-300">0</span>;<br />
              {"}"}<br />
              <br />
              <span className="text-zinc-650 italic"># Python</span><br />
              <span className="text-rose-400">def</span> <span className="text-blue-450">semangat</span>():<br />
              &nbsp;&nbsp;<span className="text-blue-450">print</span>(<span className="text-amber-300">"Kamu Pasti Bisa!"</span>)<br />
            </pre>
            
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-maroon/20 blur-3xl rounded-full" />
          </div>
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-maroon/10 rounded-full blur-[100px]" />
        </motion.div>
      </section>

      {/* Interactive Playground Section (Full Width) */}
      <section id="interactive-playground" className="px-6 md:px-12 py-20 max-w-7xl mx-auto relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-maroon/5 rounded-full blur-[160px] -z-10 pointer-events-none" />
        
        <div className="mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-maroon-bg border border-maroon/10 text-maroon rounded-2xl text-xs font-black uppercase tracking-wider">
            <Terminal size={14} className="text-maroon animate-pulse" />
            Live WebAssembly Playground
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-dark">
            Cobain Editor Interaktif <span className="text-transparent bg-clip-text bg-gradient-to-r from-maroon via-maroon-light to-rose-600">Tanpa Batas</span>
          </h2>
          <p className="text-zinc-550 font-bold max-w-2xl text-base leading-relaxed">
            Tidak perlu login, registrasi, atau instalasi. Tulis kode Python atau C Anda langsung di browser secara offline dan lihat eksekusinya secara instan!
          </p>
        </div>

        <div className="flex flex-col gap-5 relative z-10 w-full">
          {/* Controls Bar: Language + Templates */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-md border border-maroon/5 p-4 rounded-[2rem] shadow-soft">
            {/* Language Selection */}
            <div className="flex items-center bg-zinc-100 rounded-2xl p-1 border border-zinc-200/50 shadow-inner">
              <button
                onClick={() => handleLanguageChange('python')}
                className={`px-5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  language === 'python' 
                    ? 'bg-maroon text-white shadow-bubbly-maroon active:translate-y-[2px]' 
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                Python
              </button>
              <button
                onClick={() => handleLanguageChange('c')}
                className={`px-5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  language === 'c' 
                    ? 'bg-maroon text-white shadow-bubbly-maroon active:translate-y-[2px]' 
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                Bahasa C
              </button>
            </div>

            {/* Template Selector */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-black text-maroon/60 uppercase tracking-wider mr-1.5 flex items-center gap-1">
                <Sparkles size={12} className="text-fun-yellow fill-fun-yellow animate-pulse" />
                Template:
              </span>
              {DEMO_SCRIPTS[language].map((script, idx) => (
                <button
                  key={idx}
                  onClick={() => selectTemplate(idx)}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                    activeTemplateIdx === idx
                      ? 'bg-maroon-bg border-maroon/30 text-maroon font-black'
                      : 'bg-white border-zinc-200 text-zinc-650 hover:bg-zinc-50 hover:border-zinc-300'
                  }`}
                >
                  {script.name}
                </button>
              ))}
            </div>
          </div>

          {/* IDE Window: CodeEditor (Left) + xterm.js Terminal (Right) side-by-side on desktop */}
          <div className="bg-zinc-950 rounded-[3rem] p-6 shadow-[0_50px_100px_-20px_rgba(138,21,56,0.35)] border border-white/10 grid grid-cols-1 lg:grid-cols-3 gap-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-maroon/5 via-transparent to-fun-blue/5 opacity-40 pointer-events-none" />

            {/* Editor Area (Left 2 cols) */}
            <div className="lg:col-span-2 h-[380px] overflow-hidden rounded-2xl border border-white/5 shadow-2xl relative z-10">
              <Suspense fallback={<div className="h-full flex items-center justify-center text-xs text-zinc-500">Memuat editor...</div>}>
                <CodeEditor
                  code={code}
                  onChange={(val) => setCode(val || '')}
                  onRun={handleRun}
                  isLoading={isRunning}
                  language={language}
                  onReset={handleReset}
                />
              </Suspense>
            </div>

            {/* Terminal Area (Right 1 col) */}
            <div className="h-[380px] bg-[#09090b] rounded-2xl border border-white/5 flex flex-col overflow-hidden shadow-2xl relative z-10">
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/60 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-amber-500 animate-ping' : 'bg-emerald-500 animate-pulse'}`} />
                  <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">Terminal Output</span>
                </div>
                <button 
                  onClick={handleReset}
                  className="text-[9px] text-zinc-400 hover:text-white bg-zinc-800 border border-white/10 hover:border-white/20 px-3 py-1 rounded-lg transition-all cursor-pointer font-bold flex items-center gap-1.5"
                >
                  <RotateCcw size={10} />
                  Reset
                </button>
              </div>
              <div ref={termContainerRef} className="flex-1 p-3 min-h-0 font-mono text-xs overflow-hidden" />
              
              {/* Matplotlib plot display on LandingPage */}
              {plotImages.length > 0 && (
                <div className="p-3 border-t border-white/10 bg-zinc-950 max-h-[300px] overflow-y-auto custom-scrollbar">
                  <Suspense fallback={<div className="text-xs text-zinc-500">Memuat gambar...</div>}>
                    <PlotDisplay images={plotImages} />
                  </Suspense>
                </div>
              )}
              
              {/* Mobile Input Helper */}
              {isWaitingForInput && (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleMobileInputSubmit();
                  }}
                  className="flex gap-2 p-2 bg-zinc-900 border-t border-white/5 relative z-20 items-center w-full"
                >
                  <span className="text-[9px] text-maroon font-black bg-maroon-bg/20 border border-maroon/20 px-2.5 py-1 rounded-lg uppercase tracking-wider shrink-0 animate-pulse">
                    Ketik Jawaban:
                  </span>
                  <input
                    type="text"
                    placeholder="Masukkan jawaban Anda..."
                    value={mobileInputValue}
                    onChange={(e) => setMobileInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleMobileInputSubmit(e.currentTarget.value);
                      }
                    }}
                    className="flex-1 bg-zinc-800 border border-white/10 text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-maroon/50 transition-all font-mono"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="bg-maroon hover:bg-maroon-light text-white px-4 py-1.5 rounded-xl text-xs font-black transition-all active:scale-95 cursor-pointer shadow-md"
                  >
                    Kirim
                  </button>
                </form>
              )}
            </div>

            {/* Sandbox Load Status / Tips */}
            <div className="lg:col-span-3 px-2 text-[10px] text-zinc-550 font-bold flex justify-between items-center relative z-10 mt-2">
              <span className="flex items-center gap-1.5">
                {(language === 'python' ? isPyodideLoading : isCLoading) ? (
                  <>
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                    Menyiapkan compiler offline...
                  </>
                ) : (
                  <>
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                    Interpreter WebAssembly Siap
                  </>
                )}
              </span>
              <span>Ketik langsung di terminal saat input() / scanf() dipanggil</span>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-maroon/10 rounded-full blur-[100px] -z-10" />
      </section>

      {/* Curriculum Grid */}
      <section className="px-6 md:px-12 py-32 border-y border-maroon/5 bg-maroon-bg/25">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-dark">Level Up Perjalananmu</h2>
            <p className="text-xl text-zinc-550 max-w-2xl mx-auto font-bold">
              Gak perlu bingung mulai dari mana. Kita udah susun jalan ninja kamu biar makin jago step-by-step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CurriculumCard 
              icon={<Terminal size={24} />} 
              title="Dasar Logika Pemrograman" 
              desc="Pengenalan dasar algoritma, tipe data dasar, operator, input-output, serta pemecahan masalah sederhana dalam Bahasa C."
              level="Bahasa C"
              color="c"
              stats="Level 1 • 6 Lesson"
            />
            <CurriculumCard 
              icon={<Code2 size={24} />} 
              title="Struktur Kontrol & Kondisional" 
              desc="Menguasai percabangan (if-else, switch-case) dan perulangan (for, while, do-while) untuk mengontrol alur eksekusi program C."
              level="Bahasa C"
              color="c"
              stats="Level 2 • 5 Lesson"
            />
            <CurriculumCard 
              icon={<BookOpen size={24} />} 
              title="Array, Struct, & Operasi File" 
              desc="Penyimpanan data majemuk (Array multi-dimensi), pembuatan tipe data kustom (Struct), dan manipulasi file external di C."
              level="Bahasa C"
              color="c"
              stats="Level 3 • 7 Lesson"
            />
            <CurriculumCard 
              icon={<Terminal size={24} />} 
              title="Pengenalan Sintaks Python" 
              desc="Memahami filosofi Python, perbedaan sintaksis dengan C, tipe data dinamis, dan operasi dasar input-output."
              level="Python"
              color="python"
              stats="Level 4 • 5 Lesson"
            />
            <CurriculumCard 
              icon={<Code2 size={24} />} 
              title="Kontrol Alur Python" 
              desc="Implementasi percabangan if-elif-else dan perulangan for-in/while dengan blok indentasi khas Python."
              level="Python"
              color="python"
              stats="Level 5 • 6 Lesson"
            />
            <CurriculumCard 
              icon={<BarChart3 size={24} />} 
              title="List, Dict, & File Handling" 
              desc="Menguasai koleksi data Python (List, Tuple, Dictionary, Set) serta pembacaan dan penulisan berkas teks eksternal."
              level="Python"
              color="python"
              stats="Level 6 • 8 Lesson"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-12 py-32">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-zinc-950 via-maroon-dark/95 to-zinc-900 rounded-[3.5rem] p-12 md:p-24 text-center space-y-10 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(138,21,56,0.35)] border border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(138,21,56,0.3),transparent_70%)]" />
          <h2 className="text-5xl md:text-8xl font-black text-white relative z-10 tracking-tighter leading-tight">Siap Jadi <br />Game Changer?</h2>
          <p className="text-zinc-400 text-xl max-w-2xl mx-auto relative z-10 leading-relaxed font-bold">
            Buruan masuk dan tunjukin skill kamu. Ratusan tantangan seru udah nungguin buat kamu taklukin!
          </p>
          <button 
            onClick={onStart}
            className="bg-white hover:bg-maroon-bg text-dark hover:text-maroon px-16 py-6 rounded-[2rem] font-black text-xl hover:scale-105 active:scale-95 transition-all duration-350 relative z-10 shadow-2xl shadow-maroon/10 flex items-center gap-3 mx-auto cursor-pointer"
          >
            Mulai Sekarang!
            <ChevronRight size={22} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-16 border-t border-maroon/5 text-center space-y-4">
        <div className="font-black text-xl tracking-tighter text-maroon/30 uppercase">Lab-AP E-Learning</div>
        <div className="text-zinc-550 text-sm font-bold">
          Dibuat oleh Aslab AP untuk praktikan tercinta
        </div>
      </footer>
    </div>
  );
};

interface CurriculumCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  level: string;
  color: 'c' | 'python';
  stats: string;
}

const CurriculumCard: React.FC<CurriculumCardProps> = ({ icon, title, desc, level, color, stats }) => {
  const badgeColor = color === 'c' 
    ? 'bg-blue-50 text-blue-600 border-blue-100' 
    : 'bg-amber-50 text-amber-700 border-amber-100';
  
  const hoverBorder = color === 'c'
    ? 'hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5'
    : 'hover:border-amber-300 hover:shadow-lg hover:shadow-amber-500/5';

  return (
    <div className={`bg-white p-8 rounded-[2.5rem] border border-zinc-200 hover:-translate-y-2 ${hoverBorder} transition-all duration-300 group relative overflow-hidden`}>
      <div className="absolute top-0 right-0 w-24 h-24 bg-zinc-50 rounded-full translate-x-12 -translate-y-12 transition-transform group-hover:scale-150" />
      <div className="flex items-start justify-between relative z-10 mb-8">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-all ${
          color === 'c' ? 'bg-blue-50/50 text-blue-600' : 'bg-amber-50/50 text-amber-600'
        }`}>
          {icon}
        </div>
        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border ${badgeColor}`}>
          {level}
        </span>
      </div>
      <div className="text-zinc-400 text-[11px] font-bold mb-1 tracking-wider uppercase">{stats}</div>
      <h3 className="text-2xl font-black mb-3 text-dark group-hover:text-maroon transition-colors">{title}</h3>
      <p className="text-zinc-550 leading-relaxed text-sm font-semibold italic min-h-[48px]">"{desc}"</p>
      
      <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-zinc-400 group-hover:text-maroon transition-colors">
        <span>Mulai Belajar</span>
        <ChevronRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
