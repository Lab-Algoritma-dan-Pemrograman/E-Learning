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
 * Piston API language mapping
 */
const PISTON_LANGUAGES: Record<string, { language: string; version: string }> = {
  c: { language: 'c', version: '10.2.0' },
  python: { language: 'python', version: '3.10.0' },
};

/**
 * Runs code using the Piston API (free, no auth required).
 * Supports C, Python, and many other languages with full compiler/interpreter.
 * API docs: https://github.com/engineer-man/piston
 */
async function runWithPiston(code: string, language: CodeLanguage, input?: string): Promise<{ output: string; error: string | null }> {
  const langConfig = PISTON_LANGUAGES[language];
  if (!langConfig) {
    return { output: '', error: `Bahasa "${language}" tidak didukung.` };
  }

  try {
    const response = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: langConfig.language,
        version: langConfig.version,
        files: [{ name: language === 'c' ? 'main.c' : 'main.py', content: code }],
        stdin: input || '',
      }),
    });

    if (!response.ok) {
      return { output: '', error: `Server error: ${response.status}. Coba lagi.` };
    }

    const result = await response.json();
    
    // Check compile errors (for C)
    if (result.compile && result.compile.stderr) {
      return { output: '', error: result.compile.stderr };
    }

    // Check runtime errors
    if (result.run?.stderr) {
      return { output: result.run.stdout || '', error: result.run.stderr };
    }

    return { output: result.run?.stdout || '', error: null };
  } catch (err: any) {
    return { output: '', error: `Gagal terhubung ke server: ${err.message}. Periksa koneksi internet.` };
  }
}

/**
 * Universal code runner hook that supports Python (Pyodide) and C (Piston API).
 * - Python: Uses Pyodide (in-browser, offline) as primary, Piston as fallback
 * - C: Always uses Piston API (full GCC compiler)
 */
export const useCodeRunner = (language: CodeLanguage = 'python') => {
  const { pyodide, isPyodideLoading } = useStore();

  const runCode = useCallback(async (code: string, input?: string): Promise<{ output: string; error: string | null }> => {
    if (language === 'c') {
      // C always uses Piston API (full GCC compiler)
      return runWithPiston(code, 'c', input);
    }

    // Python: try Pyodide first (faster, offline), fallback to Piston
    if (pyodide) {
      try {
        await pyodide.runPythonAsync(`
import sys
import io
sys.stdout = io.StringIO()
        `);

        await pyodide.runPythonAsync(code);
        
        const stdout = await pyodide.runPythonAsync('sys.stdout.getvalue()');
        return { output: stdout, error: null };
      } catch (err: any) {
        return { output: '', error: err.message };
      }
    }

    // Fallback: Piston API for Python too
    return runWithPiston(code, 'python', input);
  }, [pyodide, language]);

  const isLoading = language === 'python' ? isPyodideLoading : false;

  return { runCode, isLoading, error: null, language };
};
