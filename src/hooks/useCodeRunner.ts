import { useCallback } from 'react';
import { useStore } from '../store/useStore';

export type CodeLanguage = 'python' | 'c';

/**
 * Detects the programming language from code content.
 */
export function detectLanguage(code: string): CodeLanguage {
  const cPatterns = [
    /\#include\s*</,
    /\bprintf\s*\(/,
    /\bscanf\s*\(/,
    /\bint\s+main\s*\(/,
    /\bvoid\s+main\s*\(/,
    /\bstdio\.h\b/,
    /\bstdlib\.h\b/,
    /\breturn\s+0\s*;/,
  ];

  const matchCount = cPatterns.filter(p => p.test(code)).length;
  return matchCount >= 2 ? 'c' : 'python';
}

/**
 * Runs C code using Wandbox API (free, no auth, full GCC compiler).
 * https://wandbox.org
 */
async function runCWithWandbox(code: string, input?: string): Promise<{ output: string; error: string | null }> {
  try {
    const response = await fetch('https://wandbox.org/api/compile.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: code,
        compiler: 'gcc-head',
        options: '',
        stdin: input || '',
      }),
    });

    if (!response.ok) {
      return { output: '', error: `Server error (${response.status}). Coba lagi dalam beberapa detik.` };
    }

    const result = await response.json();

    // Check compile errors
    if (result.compiler_error) {
      return { output: '', error: result.compiler_error };
    }

    // Check runtime errors
    if (result.program_error) {
      return { output: result.program_output || '', error: result.program_error };
    }

    // Check status (non-zero = runtime error)
    if (result.status !== 0 && result.status !== '0') {
      const errorMsg = result.program_error || result.compiler_error || `Program exit dengan kode ${result.status}`;
      return { output: result.program_output || '', error: errorMsg };
    }

    return { output: result.program_output || '', error: null };
  } catch (err: any) {
    return { output: '', error: `Gagal terhubung ke compiler. Periksa koneksi internet: ${err.message}` };
  }
}

/**
 * Universal code runner hook.
 * - Python: Pyodide (in-browser, offline via Web Worker)
 * - C: Wandbox API (full GCC compiler, online)
 */
export const useCodeRunner = (language: CodeLanguage = 'python') => {
  const { pyodideWorker, isPyodideLoading } = useStore();

  const runCode = useCallback(async (code: string, input?: string): Promise<{ output: string; error: string | null }> => {
    if (language === 'c') {
      return runCWithWandbox(code, input);
    }

    // Python via Pyodide Worker
    if (!pyodideWorker) {
      return { 
        output: '', 
        error: 'Interpreter Python gagal dimuat atau sedang bermasalah. Pastikan koneksi internet stabil dan muat ulang halaman.' 
      };
    }

    return new Promise((resolve) => {
      const id = Date.now().toString() + Math.random().toString();
      const handler = (e: MessageEvent) => {
        if (e.data.id === id) {
          pyodideWorker.removeEventListener('message', handler);
          if (e.data.type === 'RUN_DONE') {
            resolve({ output: e.data.output, error: null });
          } else if (e.data.type === 'RUN_ERROR') {
            resolve({ output: '', error: e.data.error });
          }
        }
      };
      pyodideWorker.addEventListener('message', handler);
      pyodideWorker.postMessage({ type: 'RUN', code, id });
    });
  }, [pyodideWorker, language]);

  const isLoading = language === 'python' ? isPyodideLoading : false;

  return { runCode, isLoading, error: null, language };
};
