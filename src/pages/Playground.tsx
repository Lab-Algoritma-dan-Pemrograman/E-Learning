import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Layout } from '../components/Layout';
import { CodeEditor } from '../components/CodeEditor';
import { useCodeRunner, CodeLanguage } from '../hooks/useCodeRunner';
import { Terminal as XTerm } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { Trash2, Copy, Share2 } from 'lucide-react';
import { useStore } from '../store/useStore';

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
      <div className="flex flex-col gap-6 h-[calc(100vh-160px)]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Playground Kode</h1>
            <p className="text-zinc-500">Bereksperimen dengan kode di lingkungan sandbox.</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="flex items-center bg-zinc-100 rounded-xl p-1">
              <button
                onClick={() => handleLanguageChange('python')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  language === 'python' 
                    ? 'bg-rose-700 text-white shadow-lg shadow-rose-700/20' 
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                Python
              </button>
              <button
                onClick={() => handleLanguageChange('c')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  language === 'c' 
                    ? 'bg-rose-700 text-white shadow-lg shadow-rose-700/20' 
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                C
              </button>
            </div>
            <div className="w-px h-8 bg-zinc-200" />
            <button 
              onClick={copyCode}
              className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-500 transition-colors"
              title="Salin Kode"
            >
              <Copy size={20} />
            </button>
            <button 
              className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-500 transition-colors"
              title="Bagikan Cuplikan"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          <div className="lg:col-span-2 h-full">
            <CodeEditor 
              code={code} 
              onChange={(val) => setCode(val || '')} 
              onRun={handleRun}
              isLoading={isLoading}
              language={language}
            />
          </div>

          <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl flex flex-col">
            {/* macOS-style terminal title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800/80 border-b border-zinc-700/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-zinc-400 font-mono ml-2 flex-1">
                {language === 'python' ? 'python' : 'clang'} — playground
              </span>
              <button 
                onClick={clearOutput}
                className="p-1 hover:bg-zinc-700 rounded text-zinc-500 hover:text-zinc-300 transition-colors"
                title="Bersihkan Output"
              >
                <Trash2 size={13} />
              </button>
            </div>

            {/* Stdin input field — removed, C now uses terminal-based stdin */}
            
            {/* xterm.js terminal container */}
            <div ref={termContainerRef} className="flex-1 p-1 min-h-0" />
          </div>
        </div>

        {/* Hint for interactive input */}
          <div className="text-xs text-zinc-400 flex items-center gap-2 -mt-2">
            {language === 'python' ? (
              <span>💡 Ketik langsung di terminal saat program meminta <code className="bg-zinc-100 px-1 rounded text-zinc-600">input()</code></span>
            ) : (
              <span>💡 Program akan otomatis berhenti setelah semua input diberikan — seperti Python!</span>
            )}
          </div>
      </div>
    </Layout>
  );
};
