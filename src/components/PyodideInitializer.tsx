import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1500;

export const PyodideInitializer: React.FC = () => {
  const { pyodideWorker, setPyodideWorker, setIsPyodideLoading } = useStore();

  useEffect(() => {
    if (pyodideWorker) return;

    let cancelled = false;
    let attempt = 0;

    const tryInit = () => {
      if (cancelled || pyodideWorker) return;

      console.log(`Initializing Pyodide Worker from /public (attempt ${attempt + 1}) ...`);
      let worker: Worker | null = null;

      try {
        // Explicitly loading from public URL bypasses Vite Worker Bundling entirely
        worker = new Worker('/pyodide.worker.js');
      } catch (err) {
        console.error('Failed to construct Pyodide Worker:', err);
        if (!cancelled) setIsPyodideLoading(false);
        return;
      }

      // Worker script itself gagal di-load (mis. CDN/path error) — harus di-handle,
      // kalau tidak isLoading tetap true selamanya.
      worker.onerror = (e) => {
        console.error('Pyodide Worker error:', e.message || e);
        worker?.terminate();
        if (cancelled) return;
        if (attempt < MAX_RETRIES) {
          attempt += 1;
          setTimeout(tryInit, RETRY_DELAY_MS);
        } else {
          setIsPyodideLoading(false);
        }
      };

      worker.onmessage = (e) => {
        if (e.data.type === 'INIT_DONE') {
          console.log('Pyodide Worker core initialized' + (e.data.cdn ? ` via ${e.data.cdn}` : ''));
          if (!cancelled) {
            setPyodideWorker(worker);
            setIsPyodideLoading(false);
          }
        } else if (e.data.type === 'INIT_ERROR') {
          console.error('Failed to initialize Pyodide in worker:', e.data.error);
          worker?.terminate();
          if (cancelled) return;
          if (attempt < MAX_RETRIES) {
            attempt += 1;
            setTimeout(tryInit, RETRY_DELAY_MS);
          } else {
            setIsPyodideLoading(false);
          }
        }
      };

      worker.postMessage({ type: 'INIT' });
    };

    tryInit();

    return () => {
      cancelled = true;
      // NOTE: We don't terminate the worker on unmount because
      // PyodideInitializer is part of App layout and should persist across pages.
    };
  }, [pyodideWorker, setPyodideWorker, setIsPyodideLoading]);

  return null;
};



