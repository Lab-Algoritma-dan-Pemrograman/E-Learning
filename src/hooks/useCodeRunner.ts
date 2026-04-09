import { useCallback } from 'react';
import { useStore } from '../store/useStore';

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
 * Load JSCPP from CDN (avoids ESM/CJS compatibility issues)
 */
let _jscppPromise: Promise<any> | null = null;

function loadJSCPP(): Promise<any> {
  if ((window as any).JSCPP) return Promise.resolve((window as any).JSCPP);
  
  if (_jscppPromise) return _jscppPromise;

  _jscppPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/JSCPP@2.0.3/dist/JSCPP.es5.min.js';
    script.async = true;
    script.onload = () => {
      if ((window as any).JSCPP) {
        resolve((window as any).JSCPP);
      } else {
        reject(new Error('JSCPP loaded but not available on window'));
      }
    };
    script.onerror = () => {
      _jscppPromise = null;
      reject(new Error('Failed to load JSCPP from CDN'));
    };
    document.head.appendChild(script);
  });

  return _jscppPromise;
}

/**
 * Runs C code using JSCPP interpreter in the browser.
 */
async function runCCode(code: string, input?: string): Promise<{ output: string; error: string | null }> {
  try {
    const JSCPP = await loadJSCPP();

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
    let errorMsg = err.message || String(err);
    
    // Make JSCPP errors more user-friendly
    if (errorMsg.includes('Parsing Failure')) {
      const lineMatch = errorMsg.match(/line (\d+)/);
      const line = lineMatch ? lineMatch[1] : '?';
      errorMsg = `Syntax Error di baris ${line}: Kode C tidak valid. Pastikan syntax C Anda benar.`;
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

  // For C, there's no loading time
  const isLoading = language === 'python' ? isPyodideLoading : false;

  return { runCode, isLoading, error: null, language };
};
