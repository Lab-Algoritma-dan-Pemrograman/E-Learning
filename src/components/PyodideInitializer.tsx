import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';

export const PyodideInitializer: React.FC = () => {
  const { pyodideWorker, setPyodideWorker, setIsPyodideLoading } = useStore();

  useEffect(() => {
    if (pyodideWorker) return;

    console.log('Initializing Pyodide Worker from /public ...');
    
    // Explicitly loading from public URL bypasses Vite Worker Bundling entirely
    const worker = new Worker('/pyodide.worker.js');

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


