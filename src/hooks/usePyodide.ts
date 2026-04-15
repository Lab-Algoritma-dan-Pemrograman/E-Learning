import { useCallback } from 'react';
import { useStore } from '../store/useStore';

export const usePyodide = () => {
  const { pyodideWorker, isPyodideLoading } = useStore();

  const runCode = useCallback(async (code: string): Promise<{ output: string; error: string | null }> => {
    if (!pyodideWorker) return { output: '', error: 'Pyodide belum dimuat' };

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
  }, [pyodideWorker]);

  return { runCode, isLoading: isPyodideLoading, error: null };
};
