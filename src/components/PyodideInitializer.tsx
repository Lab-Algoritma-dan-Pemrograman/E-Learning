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
    const initPyodide = async () => {
      if (pyodide) return;
      
      const PYODIDE_VERSION = '0.25.0';
      const indexURL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

      // Timeout fallback: if pyodide takes more than 10s to load, set loading to false 
      // so the run button activates (it will show a "Pyodide not loaded" error instead of hanging).
      const timeoutId = setTimeout(() => {
        setIsPyodideLoading(false);
        console.warn('Pyodide initialization timed out. Interpreter will show error on run.');
      }, 10000);

      const setupPyodide = async () => {
        try {
          const py = await window.loadPyodide({ indexURL });
          
          console.log('Pyodide core initialized');

          setPyodide(py);
          setIsPyodideLoading(false);
          clearTimeout(timeoutId);
        } catch (err) {
          console.error('Failed to initialize Pyodide:', err);
          setIsPyodideLoading(false);
          clearTimeout(timeoutId);
        }
      };

      if (!window.loadPyodide) {
        const script = document.createElement('script');
        script.src = `${indexURL}pyodide.js`;
        script.async = true;
        script.onload = setupPyodide;
        script.onerror = () => {
          console.error('Failed to load Pyodide script');
          setIsPyodideLoading(false);
        };
        document.head.appendChild(script);
      } else {
        await setupPyodide();
      }
    };

    initPyodide();
  }, [pyodide, setPyodide, setIsPyodideLoading]);

  return null;
};
