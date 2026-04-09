import { useCallback } from 'react';
import { useStore } from '../store/useStore';

// @ts-ignore - JSCPP doesn't have type definitions
import JSCPP from 'JSCPP';

export type CodeLanguage = 'python' | 'c';

/**
 * Detects the programming language from code content.
 * Looks for C-specific patterns like #include, printf, int main, etc.
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
 * Runs C code using JSCPP interpreter in the browser.
 */
function runCCode(code: string, input?: string): { output: string; error: string | null } {
  try {
    let outputBuffer = '';
    
    const config = {
      stdio: {
        write: (s: string) => {
          outputBuffer += s;
        },
      },
      unsigned_overflow: 'warn',
    };

    if (input) {
      (config.stdio as any).drain = () => input + '\n';
    }

    JSCPP.run(code, input || '', config);
    
    return { output: outputBuffer, error: null };
  } catch (err: any) {
    // Parse JSCPP error messages to be more readable
    let errorMsg = err.message || String(err);
    
    // Clean up common JSCPP error format
    if (errorMsg.includes('line')) {
      errorMsg = `Error: ${errorMsg}`;
    }
    
    return { output: '', error: errorMsg };
  }
}

/**
 * Universal code runner hook that supports Python (Pyodide) and C (JSCPP).
 */
export const useCodeRunner = (language: CodeLanguage = 'python') => {
  const { pyodide, isPyodideLoading } = useStore();

  const runCode = useCallback(async (code: string, input?: string): Promise<{ output: string; error: string | null }> => {
    if (language === 'c') {
      // C runs synchronously via JSCPP - no loading needed
      return runCCode(code, input);
    }

    // Python via Pyodide
    if (!pyodide) return { output: '', error: 'Pyodide belum dimuat. Mohon tunggu...' };

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
  }, [pyodide, language]);

  // For C, there's no loading time (JSCPP is bundled)
  const isLoading = language === 'python' ? isPyodideLoading : false;

  return { runCode, isLoading, error: null, language };
};
