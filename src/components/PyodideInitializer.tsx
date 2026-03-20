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
          
          // Load packages one by one to avoid massive fetch failures and handle errors individually
          const packages = ['numpy', 'pandas', 'matplotlib', 'scipy', 'scikit-learn'];
          
          for (const pkg of packages) {
            try {
              console.log(`Loading ${pkg}...`);
              await py.loadPackage(pkg);
            } catch (pkgErr) {
              console.error(`Failed to load ${pkg}:`, pkgErr);
              // We continue even if one package fails so the basic environment is still available
            }
          }

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
