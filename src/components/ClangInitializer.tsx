import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';

export const ClangInitializer: React.FC = () => {
  const { cWorker, setCWorker, setIsCLoading } = useStore();

  useEffect(() => {
    if (cWorker) return;

    console.log('Initializing Clang WASM Worker from /public ...');
    
    try {
      const worker = new Worker('/clang-worker.js?v=7');
      const channel = new MessageChannel();
      const port = channel.port1;

      // Handle worker messages on the port
      port.onmessage = (e) => {
        if (e.data.id === 'init_done') {
          console.log('Clang WASM Compiler initialized successfully');
          setCWorker(port);
          setIsCLoading(false);
        } else if (e.data.id === 'init_error') {
          console.error('Failed to initialize Clang WASM Compiler:', e.data.error);
          setIsCLoading(false);
        }
      };

      // Send the channel port to the worker
      worker.postMessage({ id: 'constructor', data: channel.port2 }, [channel.port2]);

    } catch (err) {
      console.error('Failed to initialize Clang Worker:', err);
      setIsCLoading(false);
    }

    return () => {
      // Keep running
    };
  }, [cWorker, setCWorker, setIsCLoading]);

  return null;
};
