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

      const setupPyodide = async () => {
        try {
          const py = await window.loadPyodide({ indexURL });
          
          // Only load the core engine initially. 
          // Packages will be loaded on-demand in the CodeEditor or Lesson components.
          console.log('Pyodide core initialized');

          setPyodide(py);
          setIsPyodideLoading(false);
        } catch (err) {
          console.error('Failed to initialize Pyodide:', err);
          setIsPyodideLoading(false);
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
