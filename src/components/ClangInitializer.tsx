import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1500;
const SAB_SIZE = 4096; // cukup untuk satu baris input C

export const ClangInitializer: React.FC = () => {
  const { cWorker, setCWorker, setIsCLoading, setCWorkerRef, setCSab, setOnCNeedInput } = useStore();

  useEffect(() => {
    if (cWorker) return;

    let cancelled = false;
    let attempt = 0;
    let localSab: SharedArrayBuffer | null = null;
    let sabMeta: Int32Array | null = null;
    let sabData: Uint8Array | null = null;

    // SAB hanya tersedia kalau halaman cross-origin isolated (COOP+COEP).
    // Kalau tidak, worker fallback ke mode EOF lama.
    try {
      if (typeof SharedArrayBuffer !== 'undefined' && (self as any).crossOriginIsolated) {
        localSab = new SharedArrayBuffer(SAB_SIZE);
        sabMeta = new Int32Array(localSab, 0, 2);
        sabData = new Uint8Array(localSab, 8);
        setCSab(localSab);
      } else {
        setCSab(null);
      }
    } catch (e) {
      localSab = null;
      setCSab(null);
    }

    // UI memanggil ini saat user mengetik input → tulis ke SAB + notify worker.
    const sendCInput = (value: string) => {
      if (!localSab || !sabMeta || !sabData) return;
      const bytes = new TextEncoder().encode(value + '\n');
      if (bytes.length > sabData.length) return;
      sabData.set(bytes);
      Atomics.store(sabMeta, 1, bytes.length);
      Atomics.store(sabMeta, 0, 1);
      Atomics.notify(sabMeta, 0);
    };
    setOnCNeedInput(() => sendCInput);

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
            setCWorkerRef(worker);
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

      // Handle pesan need-input dari worker (mode SAB): kasih tahu UI.
      worker.onmessage = (e) => {
        if (e.data && e.data.type === 'need-input') {
          const fn = useStore.getState().onCNeedInput;
          // UI di-beri tahu via callback yang didaftarkan komponen yang pakai.
          const st = useStore.getState();
          if (st.onCNeedInput && (st as any)._lastNeedInputCb) {
            (st as any)._lastNeedInputCb();
          }
          // fallback: log saja
          }
      };

      // Kirim SAB (kalau ada) bersama port ke worker. Catatan: SAB dikirim
      // by value (bukan di transfer list) — SAB tidak boleh masuk transfer list.
      if (localSab) {
        worker.postMessage({ id: 'constructor', data: channel.port2, sab: localSab }, [channel.port2]);
      } else {
        worker.postMessage({ id: 'constructor', data: channel.port2 }, [channel.port2]);
      }
    };

    tryInit();

    return () => {
      cancelled = true;
      setOnCNeedInput(null);
      // Keep running
    };
  }, [cWorker, setCWorker, setIsCLoading, setCWorkerRef, setCSab, setOnCNeedInput]);

  return null;
};
