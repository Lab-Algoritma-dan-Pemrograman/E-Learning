import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
  onRun: () => void;
  isLoading?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, onRun, isLoading }) => {
  return (
    <div className="flex flex-col h-full bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/50 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-rose-700/80" />
          <span className="ml-2 text-xs font-mono text-zinc-400">main.py</span>
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
        </button>
      </div>
      
      <div className="flex-1 min-h-[300px]">
        <Editor
          height="100%"
          defaultLanguage="python"
          theme="vs-dark"
          value={code}
          onChange={onChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'JetBrains Mono', monospace",
            lineNumbers: 'on',
            roundedSelection: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>
    </div>
  );
};
