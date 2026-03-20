import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { CodeEditor } from '../components/CodeEditor';
import { usePyodide } from '../hooks/usePyodide';
import { Terminal, Trash2, Copy, Share2 } from 'lucide-react';

export const Playground: React.FC = () => {
  const [code, setCode] = useState('# Tulis kode Python Anda di sini\n\ndef sapa(nama):\n    return f"Halo, {nama}!"\n\nprint(sapa("Penjelajah Python"))');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { runCode, isLoading } = usePyodide();

  const handleRun = async () => {
    const result = await runCode(code);
    setOutput(result.output);
    setError(result.error);
  };

  const clearOutput = () => setOutput('');
  
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    // Add toast notification here
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6 h-[calc(100vh-160px)]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Playground Python</h1>
            <p className="text-zinc-500">Bereksperimen dengan kode Python di lingkungan sandbox.</p>
          </div>
          <div className="flex items-center gap-2">
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
            />
          </div>

          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 flex flex-col overflow-hidden shadow-2xl">
            <div className="px-4 py-3 bg-zinc-800/50 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-zinc-400 font-bold text-xs uppercase tracking-widest">
                <Terminal size={14} />
                Konsol
              </div>
              <button 
                onClick={clearOutput}
                className="p-1.5 hover:bg-zinc-700 rounded text-zinc-500 hover:text-zinc-300 transition-colors"
                title="Bersihkan Output"
              >
                <Trash2 size={14} />
              </button>
            </div>
            
            <div className="flex-1 p-4 font-mono text-sm overflow-y-auto custom-scrollbar text-zinc-100 whitespace-pre-wrap">
              {error ? (
                <span className="text-red-400">{error}</span>
              ) : (
                output || <span className="text-zinc-600 italic">Jalankan kode Anda untuk melihat hasil...</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
