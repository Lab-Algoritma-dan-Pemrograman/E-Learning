import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Layout } from '../components/Layout';
import { CodeEditor } from '../components/CodeEditor';
import { useCodeRunner, CodeLanguage } from '../hooks/useCodeRunner';
import { Terminal as XTerm } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { Trash2, Copy, Share2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { PlaygroundExample, getPlaygroundExamples } from '../services/playgroundService';

const DEFAULT_CODE: Record<CodeLanguage, string> = {
  python: '# Tulis kode Python Anda di sini\n# Gunakan input() untuk menerima input dari terminal\n\nnama = input("Siapa nama kamu? ")\nprint(f"Halo, {nama}! Selamat datang!")',
  c: '#include <stdio.h>\n\nint main() {\n    char nama[100];\n    printf("Siapa nama kamu? ");\n    scanf("%[^\\n]", nama);\n    printf("Halo, %s! Selamat datang!\\n", nama);\n    return 0;\n}',
};

export const Playground: React.FC = () => {
  const [language, setLanguage] = useState<CodeLanguage>('python');
  const [code, setCode] = useState(DEFAULT_CODE.python);
  const [isRunning, setIsRunning] = useState(false);
  const { runCode, isLoading } = useCodeRunner(language);
  const { pyodideWorker } = useStore();

  // Example code state
  const [showExamples, setShowExamples] = useState(false);
  const [examples, setExamples] = useState<PlaygroundExample[]>([]);
  const [loadingExamples, setLoadingExamples] = useState(false);

  // Load examples when modal opens
  useEffect(() => {
    if (!showExamples) return;
    const load = async () => {
      setLoadingExamples(true);
      const data = await getPlaygroundExamples(language);
      setExamples(data);
      setLoadingExamples(false);
    };
    load();
  }, [showExamples, language]);

  // xterm.js refs
  const termContainerRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  // Interactive input state (for Python RUN_INTERACTIVE)
  const inputBufferRef = useRef('');
  const waitingForInputRef = useRef(false);
  // C iterative execution mode
  const cStdinModeRef = useRef(false);
  const cStdinLinesRef = useRef<string[]>([]);
  const cStdinBufferRef = useRef('');
  const cLastOutputLenRef = useRef(0);
  const cStdinInputCountRef = useRef(0);
  const cStdinFullOutputRef = useRef('');
  const cStdinOffsetsRef = useRef<number[]>([]);

  // Init xterm.js terminal
  useEffect(() => {
    if (!termContainerRef.current || xtermRef.current) return;

    const term = new XTerm({
      theme: {
        background: '#18181b',
        foreground: '#e4e4e7',
        cursor: '#a1a1aa',
        cursorAccent: '#18181b',
        selectionBackground: '#3f3f4680',
        green: '#4ade80',
        red: '#f87171',
        yellow: '#facc15',
        blue: '#60a5fa',
        magenta: '#c084fc',
        cyan: '#22d3ee',
      },
      fontSize: 13,
      fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
      cursorBlink: true,
      cursorStyle: 'bar',
      convertEol: true,
      disableStdin: false,
      scrollback: 5000,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(termContainerRef.current);
    fitAddon.fit();

    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    // Handle keyboard input for interactive stdin
    term.onKey(({ key, domEvent }) => {
      const keyCode = domEvent.keyCode;

      if (waitingForInputRef.current) {
        // Python interactive input mode
        if (keyCode === 13) {
          waitingForInputRef.current = false;
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
        // C iterative stdin mode — Enter sends input & re-runs
        if (keyCode === 13) {
          term.write('\r\n');
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

    // Placeholder message
    term.writeln('\x1b[2mJalankan kode Anda untuk melihat hasil...\x1b[0m');

    const resizeObserver = new ResizeObserver(() => fitAddon.fit());
    resizeObserver.observe(termContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      term.dispose();
      xtermRef.current = null;
    };
  }, [pyodideWorker]);

  // Run Python interactively via worker
  const runPythonInteractive = useCallback(async (code: string) => {
    const term = xtermRef.current;
    if (!term || !pyodideWorker) return;

    setIsRunning(true);
    term.clear();
    term.writeln('\x1b[1;36m$ python run\x1b[0m');
    term.writeln('');

    let lastOutputLength = 0;
    const id = Date.now().toString() + Math.random().toString();

    const handler = (e: MessageEvent) => {
      if (e.data.id !== id) return;

      if (e.data.type === 'INPUT_REQUEST') {
        const output = e.data.output || '';
        if (output.length > lastOutputLength) {
          term.write(output.slice(lastOutputLength));
          lastOutputLength = output.length;
        }
        const prompt = e.data.prompt || '';
        if (prompt) {
          term.write(prompt);
        }
        waitingForInputRef.current = true;
        inputBufferRef.current = '';
      } else if (e.data.type === 'RUN_DONE') {
        pyodideWorker.removeEventListener('message', handler);
        const output = e.data.output || '';
        if (output.length > lastOutputLength) {
          term.write(output.slice(lastOutputLength));
        }
        term.writeln('');
        term.writeln('\x1b[1;32m✓ Program selesai!\x1b[0m');
        term.writeln('');
        setIsRunning(false);
      } else if (e.data.type === 'RUN_ERROR') {
        pyodideWorker.removeEventListener('message', handler);
        term.writeln(`\x1b[1;31m❌ Error: ${e.data.error}\x1b[0m`);
        term.writeln('');
        setIsRunning(false);
      } else if (e.data.type === 'RUN_CANCELLED') {
        pyodideWorker.removeEventListener('message', handler);
        term.writeln('\x1b[1;33m⚠ Program dibatalkan.\x1b[0m');
        term.writeln('');
        setIsRunning(false);
      }
    };

    pyodideWorker.addEventListener('message', handler);
    pyodideWorker.postMessage({ type: 'RUN_INTERACTIVE', code, id });

    (term as any).__cleanup = () => {
      pyodideWorker.removeEventListener('message', handler);
      pyodideWorker.postMessage({ type: 'CANCEL' });
    };
  }, [pyodideWorker]);

  // C step-through: re-runs with accumulated stdin, auto-detects when done
  const executeCCode = useCallback(async (stdin: string) => {
    const term = xtermRef.current;
    if (!term) return;

    setIsRunning(true);
    const result = await runCode(code, stdin || undefined);

    // Compilation error → show & stop
    if (result.error && !result.output) {
      cStdinModeRef.current = false;
      term.clear();
      term.writeln('\x1b[1;36m$ clang run\x1b[0m');
      term.writeln('');
      term.writeln(`\x1b[1;31m❌ Error:\x1b[0m`);
      term.writeln(`\x1b[31m${result.error}\x1b[0m`);
      term.writeln('');
      setIsRunning(false);
      return;
    }

    // Clear and re-show full output
    term.clear();
    term.writeln('\x1b[1;36m$ clang run\x1b[0m');
    term.writeln('');

    // Accumulate the pause offset for the next input request
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
    
    // Interleave stdout and typed stdin inputs to display them in the exact order they happened
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

    // Show runtime error if any
    if (result.error) {
      term.writeln('');
      term.writeln(`\x1b[33m⚠ ${result.error}\x1b[0m`);
    }

    if (result.waitingForInput) {
      // Program needs more input — stay in input mode
      cStdinModeRef.current = true;
      cStdinBufferRef.current = '';
    } else {
      // Program is done!
      cStdinModeRef.current = false;
      if (!output.endsWith('\n') && output.length > 0) term.writeln('');
      term.writeln('');
      term.writeln('\x1b[1;32m✓ Program selesai!\x1b[0m');
      term.writeln('');
      setIsRunning(false);
    }
  }, [runCode, code]);

  // Run C
  const runC = useCallback(async (code: string) => {
    const term = xtermRef.current;
    if (!term) return;

    setIsRunning(true);
    term.clear();
    term.writeln('\x1b[1;36m$ clang run\x1b[0m');

    cStdinLinesRef.current = [];
    cStdinBufferRef.current = '';
    cLastOutputLenRef.current = 0;
    cStdinOffsetsRef.current = [];

    await executeCCode("");
  }, [executeCCode]);

  // Store executeCCode ref so terminal keyboard handler can call it
  const executeCCodeRef = useRef(executeCCode);
  executeCCodeRef.current = executeCCode;

  const handleRun = async () => {
    const term = xtermRef.current;
    if (!term || isRunning) return;

    if (language === 'python') {
      await runPythonInteractive(code);
    } else {
      await runC(code);
    }
  };

  const handleLanguageChange = (newLang: CodeLanguage) => {
    // Cancel any running interactive session
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
    cStdinInputCountRef.current = 0;
    cStdinFullOutputRef.current = '';
    setIsRunning(false);

    setLanguage(newLang);
    setCode(DEFAULT_CODE[newLang]);
    if (term) {
      term.clear();
      term.writeln('\x1b[2mJalankan kode Anda untuk melihat hasil...\x1b[0m');
    }
  };

  const clearOutput = () => {
    const term = xtermRef.current;
    if (!term) return;
    // Cancel any running interactive session
    if ((term as any).__cleanup) {
      (term as any).__cleanup();
      (term as any).__cleanup = null;
    }
    waitingForInputRef.current = false;
    inputBufferRef.current = '';
    cStdinModeRef.current = false;
    cStdinLinesRef.current = [];
    cStdinBufferRef.current = '';
    cStdinInputCountRef.current = 0;
    cStdinFullOutputRef.current = '';
    setIsRunning(false);
    term.clear();
    term.writeln('\x1b[2mJalankan kode Anda untuk melihat hasil...\x1b[0m');
  };
  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6 h-auto lg:h-[calc(100vh-160px)] pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
          <div>
            <h1 className="text-3xl font-black text-maroon mb-1 tracking-tight flex items-center">
              Playground Kode
              <i className="fa-solid fa-terminal text-fun-yellow ml-3 animate-pulse"></i>
            </h1>
            <p className="text-zinc-550 font-bold text-sm">Bereksperimen dengan kode di lingkungan sandbox.</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-zinc-100 rounded-2xl p-1.5 border border-zinc-200/60 shadow-inner">
              <button
                onClick={() => handleLanguageChange('python')}
                className={`px-5 py-2 rounded-xl text-sm font-black transition-all cursor-pointer ${
                  language === 'python' 
                    ? 'bg-rose-700 text-white shadow-[0_3px_0_#5C0E25] btn-bubbly active:translate-y-[3px] active:shadow-none' 
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                Python
              </button>
              <button
                onClick={() => handleLanguageChange('c')}
                className={`px-5 py-2 rounded-xl text-sm font-black transition-all cursor-pointer ${
                  language === 'c' 
                    ? 'bg-rose-700 text-white shadow-[0_3px_0_#5C0E25] btn-bubbly active:translate-y-[3px] active:shadow-none' 
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                C
              </button>
            </div>
            <div className="w-px h-8 bg-zinc-200" />
            <button 
              onClick={copyCode}
              className="p-3 bg-rose-50 border-2 border-rose-200 text-rose-700 rounded-xl hover:bg-rose-100 shadow-[0_3px_0_#8A1538] active:translate-y-[3px] active:shadow-none btn-bubbly cursor-pointer transition-all"
              title="Salin Kode"
            >
              <i className="fa-solid fa-copy"></i>
            </button>
            <button 
              className="p-3 bg-rose-50 border-2 border-rose-200 text-rose-700 rounded-xl hover:bg-rose-100 shadow-[0_3px_0_#8A1538] active:translate-y-[3px] active:shadow-none btn-bubbly cursor-pointer transition-all"
              title="Bagikan Cuplikan"
            >
              <i className="fa-solid fa-share-nodes"></i>
            </button>
            <div className="w-px h-8 bg-zinc-200" />
            <button 
              onClick={() => setShowExamples(true)}
              className="px-4 py-2.5 bg-rose-700 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-[0_3px_0_#5C0E25] active:translate-y-[3px] active:shadow-none btn-bubbly cursor-pointer transition-all hover:bg-rose-600"
            >
              <i className="fa-solid fa-book-open"></i>
              Contoh Kode
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0 lg:h-full h-auto">
          <div className="lg:col-span-2 h-[450px] lg:h-full bg-white border-2 border-gray-100 rounded-[2rem] shadow-soft p-4 flex flex-col justify-between">
            <CodeEditor 
              code={code} 
              onChange={(val) => setCode(val || '')} 
              onRun={handleRun}
              isLoading={isLoading}
              language={language}
            />
          </div>

          <div className="rounded-[2rem] overflow-hidden border-2 border-zinc-950 bg-zinc-900 shadow-[0_8px_0_#000] flex flex-col h-[300px] lg:h-full">
            {/* macOS-style terminal title bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800/80 border-b-2 border-zinc-950/40">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-zinc-400 font-mono ml-2 flex-1 font-bold">
                {language === 'python' ? 'python' : 'clang'} — playground
              </span>
              <button 
                onClick={clearOutput}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-700/60 hover:bg-zinc-600 border border-zinc-600 rounded-lg text-zinc-300 hover:text-white transition-colors cursor-pointer text-[11px] font-bold"
                title="Bersihkan Output"
              >
                <i className="fa-solid fa-trash text-[10px]"></i>
                <span>Bersihkan</span>
              </button>
            </div>

            {/* Stdin input field — removed, C now uses terminal-based stdin */}
            
            {/* xterm.js terminal container */}
            <div ref={termContainerRef} className="flex-1 p-2.5 min-h-0 font-mono" />
          </div>
        </div>

        {/* Hint for interactive input */}
        <div className="text-xs text-zinc-450 font-bold flex items-center gap-2 select-none">
          {language === 'python' ? (
            <span>💡 Ketik langsung di terminal saat program meminta <code className="bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 rounded text-zinc-650">input()</code></span>
          ) : (
            <span>💡 Program akan otomatis berhenti setelah semua input diberikan — seperti Python!</span>
          )}
        </div>
      </div>

      {/* Example Code Modal */}
      <AnimatePresence>
        {showExamples && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm"
            onClick={() => setShowExamples(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl border border-zinc-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                <div>
                  <h3 className="text-xl font-black tracking-tight text-zinc-900 flex items-center gap-2">
                    <i className="fa-solid fa-book-open text-rose-700"></i>
                    Contoh Kode
                  </h3>
                  <p className="text-zinc-500 text-xs font-semibold mt-0.5">
                    Pilih contoh kode {language === 'python' ? 'Python' : 'Bahasa C'} untuk dipelajari.
                  </p>
                </div>
                <button
                  onClick={() => setShowExamples(false)}
                  className="p-2 bg-white text-zinc-400 hover:text-zinc-600 rounded-full border border-zinc-200 transition-colors"
                >
                  <i className="fa-solid fa-xmark text-lg"></i>
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
                {loadingExamples ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <div className="w-10 h-10 border-4 border-rose-700 border-t-transparent rounded-full animate-spin" />
                    <p className="text-zinc-400 font-bold text-sm">Memuat contoh kode...</p>
                  </div>
                ) : examples.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                    <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center">
                      <i className="fa-solid fa-code text-2xl text-zinc-300"></i>
                    </div>
                    <p className="text-zinc-400 font-bold text-sm">Belum ada contoh kode untuk {language === 'python' ? 'Python' : 'Bahasa C'}.</p>
                    <p className="text-zinc-300 text-xs">Hubungi admin untuk menambahkan contoh.</p>
                  </div>
                ) : (
                  examples.map((ex) => (
                    <div
                      key={ex.id}
                      className="group border border-zinc-200 rounded-2xl overflow-hidden hover:border-rose-200 hover:shadow-lg hover:shadow-rose-500/5 transition-all"
                    >
                      <div className="p-4 flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              ex.language === 'python'
                                ? 'bg-rose-100 text-rose-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {ex.language === 'python' ? 'Python' : 'C'}
                            </span>
                            <h4 className="font-bold text-sm text-zinc-900 truncate">{ex.title}</h4>
                          </div>
                          {ex.description && (
                            <p className="text-xs text-zinc-500 line-clamp-2 mt-1">{ex.description}</p>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            setCode(ex.code);
                            setShowExamples(false);
                          }}
                          className="shrink-0 px-4 py-2 bg-rose-700 text-white rounded-xl text-xs font-bold hover:bg-rose-600 transition-all active:scale-95 shadow-lg shadow-rose-700/20"
                        >
                          Gunakan
                        </button>
                      </div>
                      {/* Code preview */}
                      <div className="bg-zinc-900 px-4 py-3 border-t border-zinc-200 max-h-24 overflow-hidden relative">
                        <pre className="text-[11px] text-emerald-400 font-mono whitespace-pre leading-relaxed">
                          {ex.code.split('\n').slice(0, 5).join('\n')}
                        </pre>
                        {ex.code.split('\n').length > 5 && (
                          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-zinc-900 to-transparent" />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};
