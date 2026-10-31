import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1500;

export const ClangInitializer: React.FC = () => {
  const { cWorker, setCWorker, setIsCLoading } = useStore();

  useEffect(() => {
    if (cWorker) return;

    let cancelled = false;
    let attempt = 0;

    const tryInit = () => {
      if (cancelled || cWorker) return;

      console.log(`Initializing Clang WASM Worker from /public (attempt ${attempt + 1}) ...`);
      let worker: Worker | null = null;

      try {
        worker = new Worker('/clang-worker.js?v=7');
      } catch (err) {
        console.error('Failed to construct Clang Worker:', err);
        if (!cancelled) setIsCLoading(false);
        return;
      }

      const channel = new MessageChannel();
      const port = channel.port1;

      // Worker script gagal di-load — jangan biarkan isLoading menggantung.
      worker.onerror = (e) => {
        console.error('Clang Worker error:', e.message || e);
        worker?.terminate();
        if (cancelled) return;
        if (attempt < MAX_RETRIES) {
          attempt += 1;
          setTimeout(tryInit, RETRY_DELAY_MS);
        } else {
          setIsCLoading(false);
        }
      };

      port.onmessage = (e) => {
        if (e.data.id === 'init_done') {
          console.log('Clang WASM Compiler initialized successfully');
          if (!cancelled) {
            setCWorker(port);
            setIsCLoading(false);
          }
        } else if (e.data.id === 'init_error') {
          console.error('Failed to initialize Clang WASM Compiler:', e.data.error);
          worker?.terminate();
          if (cancelled) return;
          if (attempt < MAX_RETRIES) {
            attempt += 1;
            setTimeout(tryInit, RETRY_DELAY_MS);
          } else {
            setIsCLoading(false);
          }
        }
      };

      // Send the channel port to the worker
      worker.postMessage({ id: 'constructor', data: channel.port2 }, [channel.port2]);
    };

    tryInit();

    return () => {
      cancelled = true;
      // Keep running
    };
  }, [cWorker, setCWorker, setIsCLoading]);

  return null;
};
