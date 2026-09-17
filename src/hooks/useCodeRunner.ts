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
 * Runs C code using Judge0 CE API (free, no auth, CORS-enabled).
 * https://ce.judge0.com
 */
async function runCWithJudge0(code: string, input?: string): Promise<{ output: string; error: string | null }> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch('https://ce.judge0.com/submissions?base64_encoded=false&wait=true', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source_code: code,
        language_id: 50,
        stdin: input || '',
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();

    if (result.status?.id === 6) {
      return { output: '', error: (result.compile_output || 'Compilation error').trim() };
    }

    if (result.status?.id >= 7) {
      return { output: result.stdout || '', error: (result.stderr || `Runtime error: ${result.status?.description}`).trim() };
    }

    return { output: result.stdout || '', error: null };
  } catch (err: any) {
    clearTimeout(timeout);
    throw err;
  }
}

/**
 * Runs C code using Wandbox API (free, no auth, full GCC compiler).
 * https://wandbox.org
 */
async function runCWithWandbox(code: string, input?: string): Promise<{ output: string; error: string | null }> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

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
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();

    if (result.compiler_error) {
      return { output: '', error: result.compiler_error };
    }

    if (result.program_error) {
      return { output: result.program_output || '', error: result.program_error };
    }

    if (result.status !== 0 && result.status !== '0') {
      const errorMsg = result.program_error || result.compiler_error || `Program exit dengan kode ${result.status}`;
      return { output: result.program_output || '', error: errorMsg };
    }

    return { output: result.program_output || '', error: null };
  } catch (err: any) {
    clearTimeout(timeout);
    throw err;
  }
}

/**
 * Runs C code with automatic fallback:
 * 1. Judge0 CE (Primary) → 2. Wandbox (Fallback, retries up to 2x)
 */
async function runCWithFallback(code: string, input?: string): Promise<{ output: string; error: string | null }> {
  // Try Judge0 CE first
  try {
    return await runCWithJudge0(code, input);
  } catch (err) {
    console.warn('Judge0 failed:', (err as any)?.message);
  }

  // Fallback to Wandbox with retries
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      return await runCWithWandbox(code, input);
    } catch (err) {
      console.warn(`Wandbox attempt ${attempt + 1} failed:`, (err as any)?.message);
      if (attempt === 0) {
        await new Promise(r => setTimeout(r, 1000));
      }
    }
  }

  return { output: '', error: 'Compiler sedang tidak tersedia. Coba lagi dalam beberapa detik.' };
}

/**
 * Automatically injects setbuf(stdout, NULL) and setbuf(stdin, NULL) at the start of main function.
 */
function injectStdoutUnbuffering(code: string): string {
  const mainRegex = /\bmain\s*\([^)]*\)\s*\{/;
  if (mainRegex.test(code)) {
    return code.replace(mainRegex, '$&\n    setbuf(stdout, NULL);\n    setbuf(stdin, NULL);');
  }
  return code;
}

/**
 * Universal code runner hook.
 * - Python: Pyodide (in-browser, offline via Web Worker)
 * - C: Judge0 CE (primary) → Wandbox (fallback)
 */
export const useCodeRunner = (language: CodeLanguage = 'python') => {
  const { pyodideWorker, isPyodideLoading, cWorker, isCLoading } = useStore();

  const runCode = useCallback(async (code: string, input?: string): Promise<{ output: string; error: string | null; waitingForInput?: boolean; inputOffsets?: number[]; stdoutLenAtInputRequest?: number }> => {
    if (language === 'c') {
      if (!cWorker) {
        return {
          output: '',
          error: 'Compiler Clang gagal dimuat atau sedang bermasalah. Silakan muat ulang halaman.'
        };
      }

      return new Promise((resolve) => {
        const responseId = Math.floor(Math.random() * 1000000);
        let outputBuffer = '';

        // Step 1: Compile the C code
        cWorker.postMessage({ id: 'compile', responseId, data: injectStdoutUnbuffering(code) });

        // Wait for COMPILE done
        const compileHandler = (e: MessageEvent) => {
          const { id, data } = e.data;
          
          if (id === 'write') {
            outputBuffer += data;
          } else if (id === 'runAsync' && e.data.responseId === responseId) {
            cWorker.removeEventListener('message', compileHandler);
            
            if (!data.success) {
              resolve({ output: '', error: outputBuffer || data.error || 'Gagal melakukan kompilasi.' });
              return;
            }

            // Step 2: Clear compile output buffer and start program execution
            outputBuffer = ''; // Reset buffer to capture only stdout/stderr of the C program
            
            const runResponseId = responseId + 1; // Unique ID for run
            
            const runHandler = (e2: MessageEvent) => {
              const { id: id2, data: data2 } = e2.data;
              if (id2 === 'write') {
                outputBuffer += data2;
              } else if (id2 === 'runAsync' && e2.data.responseId === runResponseId) {
                cWorker.removeEventListener('message', runHandler);
                resolve({ output: outputBuffer, error: data2.error, waitingForInput: data2.waitingForInput, inputOffsets: data2.inputOffsets, stdoutLenAtInputRequest: data2.stdoutLenAtInputRequest });
              }
            };

            cWorker.addEventListener('message', runHandler);
            cWorker.postMessage({ id: 'run', responseId: runResponseId, data: input || '' });
          }
        };

        cWorker.addEventListener('message', compileHandler);
      });
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
      pyodideWorker.postMessage({ type: 'RUN', code, id, input: input || '' });
    });
  }, [pyodideWorker, cWorker, language]);

  const isLoading = language === 'python' ? isPyodideLoading : isCLoading;

  return { runCode, isLoading, error: null, language };
};
