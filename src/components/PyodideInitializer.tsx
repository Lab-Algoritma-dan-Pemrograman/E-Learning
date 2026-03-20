import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';

declare global {
  interface Window {
    loadPyodide: any;
  }
}

export const PyodideInitializer: React.FC = () => {
  const { pyodide, setPyodide, setIsPyodideLoading } = useStore();

  useEffect(() => {
    const loadPyodide = async () => {
      if (pyodide) return;
      
      if (!window.loadPyodide) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
        script.async = true;
        script.onload = async () => {
          try {
            const py = await window.loadPyodide();
            setPyodide(py);
            setIsPyodideLoading(false);
          } catch (err) {
            console.error('Failed to initialize Pyodide:', err);
            setIsPyodideLoading(false);
          }
        };
        script.onerror = () => {
          console.error('Failed to load Pyodide script');
          setIsPyodideLoading(false);
        };
        document.head.appendChild(script);
      } else {
        try {
          const py = await window.loadPyodide();
          setPyodide(py);
          setIsPyodideLoading(false);
        } catch (err) {
          console.error('Failed to initialize Pyodide:', err);
          setIsPyodideLoading(false);
        }
      }
    };

    loadPyodide();
  }, [pyodide, setPyodide, setIsPyodideLoading]);

  return null;
};
