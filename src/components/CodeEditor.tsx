import React, { useRef, useEffect } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { CodeLanguage } from '../hooks/useCodeRunner';

interface CodeEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
  onRun: () => void;
  isLoading?: boolean;
  language?: CodeLanguage;
}

const LANGUAGE_CONFIG: Record<CodeLanguage, { monacoLang: string; fileName: string }> = {
  python: { monacoLang: 'python', fileName: 'main.py' },
  c: { monacoLang: 'c', fileName: 'main.c' },
};

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, onRun, isLoading, language = 'python' }) => {
  const config = LANGUAGE_CONFIG[language] || LANGUAGE_CONFIG.python;
  const onRunRef = useRef(onRun);

  // Keep ref updated so the Monaco action always calls the latest onRun
  useEffect(() => {
    onRunRef.current = onRun;
  }, [onRun]);

  const handleEditorMount: OnMount = (editor) => {
    // Register Ctrl+Enter / Cmd+Enter shortcut to run code
    editor.addAction({
      id: 'run-code',
      label: 'Jalankan Kode',
      keybindings: [
        // Ctrl+Enter (Windows/Linux)
        2048 | 3, // KeyMod.CtrlCmd | KeyCode.Enter
      ],
      run: () => {
        onRunRef.current();
      },
    });
  };

  return (
    <div className="flex flex-col h-full bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/50 border-b border-zinc-800 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-rose-700/80" />
          <span className="ml-2 text-xs font-mono text-zinc-400">{config.fileName}</span>
          <span className="text-[10px] font-bold text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded uppercase tracking-wider">
            {language === 'c' ? 'C' : 'Python'}
          </span>
        </div>
        <button
          onClick={onRun}
          disabled={isLoading}
          className="px-4 py-1.5 bg-rose-700 hover:bg-rose-600 disabled:opacity-50 text-white text-sm font-bold rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-rose-700/20 active:scale-95"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
          Jalankan
          <span className="hidden sm:inline text-[10px] font-normal text-white/50 ml-1">Ctrl+Enter</span>
        </button>
      </div>
      
      <div className="flex-1 relative min-h-[400px]">
        <div className="absolute inset-0">
          <Editor
            height="100%"
            language={config.monacoLang}
            theme="vs-dark"
            value={code}
            onChange={onChange}
            onMount={handleEditorMount}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: "'JetBrains Mono', monospace",
              lineNumbers: 'on',
              roundedSelection: true,
              scrollBeyondLastLine: false,
              cursorBlinking: "smooth",
              cursorStyle: "line",
              automaticLayout: true,
              padding: { top: 16, bottom: 16 },
            }}
          />
        </div>
      </div>
    </div>
  );
};
