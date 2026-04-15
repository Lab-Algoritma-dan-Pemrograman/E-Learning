import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';

export const PyodideInitializer: React.FC = () => {
  const { pyodideWorker, setPyodideWorker, setIsPyodideLoading } = useStore();

  useEffect(() => {
    if (pyodideWorker) return;

    console.log('Initializing Pyodide Worker...');
    const worker = new Worker(new URL('../workers/pyodide.worker.ts', import.meta.url), { type: 'module' });

    worker.onmessage = (e) => {
      if (e.data.type === 'INIT_DONE') {
        console.log('Pyodide Worker core initialized');
        setPyodideWorker(worker);
        setIsPyodideLoading(false);
      } else if (e.data.type === 'INIT_ERROR') {
        console.error('Failed to initialize Pyodide in worker:', e.data.error);
        setIsPyodideLoading(false);
      }
    };

    worker.postMessage({ type: 'INIT' });

    return () => {
      // NOTE: We don't terminate the worker on unmount because 
      // PyodideInitializer is part of App layout and should persist across pages.
    };
  }, [pyodideWorker, setPyodideWorker, setIsPyodideLoading]);

  return null;
};
