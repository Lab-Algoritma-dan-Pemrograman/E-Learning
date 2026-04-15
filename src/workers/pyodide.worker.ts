/// <reference lib="webworker" />

self.onmessage = async (event) => {
  const { type, code, id } = event.data;

  if (type === 'INIT') {
    if ((self as any).pyodide) {
      self.postMessage({ type: 'INIT_DONE' });
      return;
    }
    try {
      importScripts('https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js');
      (self as any).pyodide = await (self as any).loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
      });
      self.postMessage({ type: 'INIT_DONE' });
    } catch (err: any) {
      self.postMessage({ type: 'INIT_ERROR', error: err.message });
    }
  } else if (type === 'RUN') {
    try {
      const pyodide = (self as any).pyodide;
      if (!pyodide) {
        self.postMessage({ type: 'RUN_ERROR', id, error: 'Pyodide not initialized' });
        return;
      }
      
      await pyodide.runPythonAsync(`
import sys
import io
sys.stdout = io.StringIO()
      `);

      await pyodide.runPythonAsync(code);
      const stdout = await pyodide.runPythonAsync('sys.stdout.getvalue()');
      
      self.postMessage({ type: 'RUN_DONE', id, output: stdout });
    } catch (err: any) {
      self.postMessage({ type: 'RUN_ERROR', id, error: err.message });
    }
  }
};
