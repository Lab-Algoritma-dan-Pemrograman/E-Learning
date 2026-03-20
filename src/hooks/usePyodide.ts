import { useCallback } from 'react';
import { useStore } from '../store/useStore';

export const usePyodide = () => {
  const { pyodide, isPyodideLoading } = useStore();

  const runCode = useCallback(async (code: string) => {
    if (!pyodide) return { output: '', error: 'Pyodide belum dimuat' };

    try {
      // Redirect stdout to a string
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
  }, [pyodide]);

  return { runCode, isLoading: isPyodideLoading, error: null };
};
