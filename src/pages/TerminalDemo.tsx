import { useEffect, useRef, useState, useCallback } from 'react';
import { Terminal as XTerm } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { Layout } from '../components/Layout';
import { Play, RotateCcw, Loader2 } from 'lucide-react';
import { useStore } from '../store/useStore';

const DEMO_SCRIPTS = [
  {
    name: '👋 Sapa Pengguna',
    code: `nama = input("Siapa nama kamu? ")
print(f"Halo, {nama}! Selamat datang di E-Learning!")
umur = input("Berapa umur kamu? ")
print(f"Wah, {nama} berusia {umur} tahun. Semangat belajar!")`,
  },
  {
    name: '🔢 Kalkulator',
    code: `print("=== Kalkulator Sederhana ===")
a = input("Masukkan angka pertama: ")
b = input("Masukkan angka kedua: ")
op = input("Operasi (+, -, *, /): ")

x, y = float(a), float(b)
if op == "+":
    print(f"{x} + {y} = {x + y}")
elif op == "-":
    print(f"{x} - {y} = {x - y}")
elif op == "*":
    print(f"{x} × {y} = {x * y}")
elif op == "/":
    print(f"{x} ÷ {y} = {x / y}" if y != 0 else "Error: bagi nol!")
else:
    print("Operasi tidak dikenal.")`,
  },
  {
    name: '🎲 Tebak Angka',
    code: `import random
angka = random.randint(1, 10)
print("Saya memikirkan angka 1-10!")
tebakan = input("Tebakan kamu: ")
if int(tebakan) == angka:
    print("🎉 Benar! Kamu hebat!")
else:
    print(f"❌ Salah! Jawabannya: {angka}")`,
  },
];

export const TerminalDemo: React.FC = () => {
  const termRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedScript, setSelectedScript] = useState(0);

  // Use existing Pyodide worker from store
  const { pyodideWorker, isPyodideLoading } = useStore();

  // Input buffer for interactive stdin
  const inputBufferRef = useRef('');
  const waitingForInputRef = useRef(false);

  // Init xterm.js
  useEffect(() => {
    if (!termRef.current || xtermRef.current) return;

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
      fontSize: 14,
      fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
      cursorBlink: true,
      cursorStyle: 'bar',
      convertEol: true,
      scrollback: 1000,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(termRef.current);
    fitAddon.fit();

    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    // Handle resize
    const resizeObserver = new ResizeObserver(() => fitAddon.fit());
    resizeObserver.observe(termRef.current);

    // Handle keyboard input for interactive stdin
    term.onKey(({ key, domEvent }) => {
      if (waitingForInputRef.current) {
        const code = domEvent.keyCode;
        if (code === 13) {
          // Enter
          waitingForInputRef.current = false;
          term.write('\r\n');
          // Store input for the worker
          const inputValue = inputBufferRef.current;
          inputBufferRef.current = '';
          // Send back to worker
          if (pyodideWorker) {
            pyodideWorker.postMessage({ type: 'INPUT_RESPONSE', value: inputValue });
          }
        } else if (code === 8) {
          // Backspace
          if (inputBufferRef.current.length > 0) {
            inputBufferRef.current = inputBufferRef.current.slice(0, -1);
            term.write('\b \b');
          }
        } else if (!domEvent.ctrlKey && !domEvent.altKey && !domEvent.metaKey) {
          inputBufferRef.current += key;
          term.write(key);
        }
      }
    });

    // Welcome message
    term.writeln('\x1b[1;36m╔══════════════════════════════════════════╗\x1b[0m');
    term.writeln('\x1b[1;36m║\x1b[0m  \x1b[1m🖥️  Terminal Interaktif Demo\x1b[0m              \x1b[1;36m║\x1b[0m');
    term.writeln('\x1b[1;36m║\x1b[0m  Pilih script lalu klik \x1b[1;32m▶ Jalankan\x1b[0m       \x1b[1;36m║\x1b[0m');
    term.writeln('\x1b[1;36m╚══════════════════════════════════════════╝\x1b[0m');
    term.writeln('');

    setIsReady(true);

    return () => {
      resizeObserver.disconnect();
      term.dispose();
      xtermRef.current = null;
    };
  }, [pyodideWorker]);

  // Run Python code interactively via worker
  const runPython = useCallback(async (code: string) => {
    const term = xtermRef.current;
    if (!term || !pyodideWorker) return;

    setIsRunning(true);
    
    // Track output position to only write new content
    let lastOutputLength = 0;

    const id = Date.now().toString() + Math.random().toString();

    const handler = (e: MessageEvent) => {
      if (e.data.id !== id) return;

      if (e.data.type === 'INPUT_REQUEST') {
        // Write any new output BEFORE the prompt (output is included in the message)
        const output = e.data.output || '';
        if (output.length > lastOutputLength) {
          term.write(output.slice(lastOutputLength));
          lastOutputLength = output.length;
        }
        // Show prompt and wait for user input
        const prompt = e.data.prompt || '';
        if (prompt) {
          term.write(prompt);
        }
        waitingForInputRef.current = true;
        inputBufferRef.current = '';
      } else if (e.data.type === 'RUN_DONE') {
        pyodideWorker.removeEventListener('message', handler);
        // Write final output
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
    
    // Start interactive run
    pyodideWorker.postMessage({ type: 'RUN_INTERACTIVE', code, id });

    // Store cleanup for reset
    const cleanup = () => {
      pyodideWorker.removeEventListener('message', handler);
    };
    (term as any).__cleanup = cleanup;
  }, [pyodideWorker]);

  const handleRun = () => {
    const term = xtermRef.current;
    if (!term || isRunning || !pyodideWorker) return;

    // Clear terminal
    term.clear();
    term.writeln(`\x1b[1;36m📜 Script: ${DEMO_SCRIPTS[selectedScript].name}\x1b[0m`);
    term.writeln('\x1b[2m' + '─'.repeat(44) + '\x1b[0m');
    term.writeln('');

    runPython(DEMO_SCRIPTS[selectedScript].code);
  };

  const handleReset = () => {
    const term = xtermRef.current;
    if (!term) return;
    
    // Cancel any stuck input in the worker
    if (pyodideWorker) {
      pyodideWorker.postMessage({ type: 'CANCEL' });
    }
    
    // Cleanup any running process
    if ((term as any).__cleanup) {
      (term as any).__cleanup();
      (term as any).__cleanup = null;
    }
    
    waitingForInputRef.current = false;
    inputBufferRef.current = '';
    setIsRunning(false);
    
    term.clear();
    term.writeln('\x1b[1;36m╔══════════════════════════════════════════╗\x1b[0m');
    term.writeln('\x1b[1;36m║\x1b[0m  \x1b[1m🖥️  Terminal Interaktif Demo\x1b[0m              \x1b[1;36m║\x1b[0m');
    term.writeln('\x1b[1;36m║\x1b[0m  Pilih script lalu klik \x1b[1;32m▶ Jalankan\x1b[0m       \x1b[1;36m║\x1b[0m');
    term.writeln('\x1b[1;36m╚══════════════════════════════════════════╝\x1b[0m');
    term.writeln('');
  };

  // Show loading state while Pyodide initializes
  if (isPyodideLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[calc(100vh-160px)]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-zinc-600">Memuat interpreter Python...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col gap-6 h-[calc(100vh-160px)]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">🖥️ Terminal Demo</h1>
            <p className="text-zinc-500">
              Demo terminal interaktif dengan Python <code className="text-xs bg-zinc-100 px-1.5 py-0.5 rounded">input()</code> langsung di terminal
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Script selector */}
            <div className="flex items-center bg-zinc-100 rounded-xl p-1">
              {DEMO_SCRIPTS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedScript(i)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedScript === i
                      ? 'bg-white text-zinc-900 shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-700'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>

            <button
              onClick={handleRun}
              disabled={!isReady || isRunning || !pyodideWorker}
              className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isRunning ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              {isRunning ? 'Berjalan...' : 'Jalankan'}
            </button>

            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-600 transition-colors"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal */}
        <div className="flex-1 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
          {/* Terminal title bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800/80 border-b border-zinc-700/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-zinc-400 font-mono ml-2">python — interactive terminal</span>
          </div>
          {/* xterm.js container */}
          <div ref={termRef} className="p-2 h-[calc(100%-40px)]" />
        </div>

        {/* Info */}
        <div className="text-xs text-zinc-400 flex items-center gap-4">
          <span>💡 Klik <b>Jalankan</b> lalu ketik langsung di terminal saat diminta input</span>
          <span className="text-zinc-300">•</span>
          <span>Tekan <kbd className="px-1.5 py-0.5 bg-zinc-200 rounded text-zinc-600 font-mono text-xs">Enter</kbd> untuk mengirim input</span>
        </div>
      </div>
    </Layout>
  );
};
