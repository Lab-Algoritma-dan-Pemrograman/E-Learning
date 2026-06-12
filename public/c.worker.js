// C/C++ Worker — runs C code in-browser via JSCPP interpreter
// JSCPP registers its own 'message' listener via addEventListener during importScripts.
// We intercept it to prevent conflicts with our message protocol.

let JSCPP = null;
let ready = false;

// Override addEventListener to capture JSCPP's handler and prevent it from registering
const _origAddEventListener = self.addEventListener.bind(self);
let jscppInterceptedHandler = null;

self.addEventListener = function (type, handler, options) {
  if (type === 'message') {
    jscppInterceptedHandler = handler; // Capture but don't register
    return;
  }
  _origAddEventListener(type, handler, options);
};

function ourHandler(event) {
  const { type, code, id, input } = event.data;
  console.log('[C Worker] Received:', type);

  if (type === 'INIT') {
    if (ready) {
      self.postMessage({ type: 'INIT_DONE' });
      return;
    }
    try {
      console.log('[C Worker] Loading JSCPP...');
      importScripts('JSCPP.es5.min.js');
      JSCPP = self.JSCPP;
      console.log('[C Worker] JSCPP loaded:', typeof JSCPP, typeof JSCPP?.run);

      // Restore original addEventListener
      self.addEventListener = _origAddEventListener;
      // Ensure our handler is the onmessage
      self.onmessage = ourHandler;

      ready = true;
      console.log('[C Worker] INIT complete');
      self.postMessage({ type: 'INIT_DONE' });
    } catch (err) {
      console.error('[C Worker] INIT failed:', err);
      self.addEventListener = _origAddEventListener;
      self.onmessage = ourHandler;
      self.postMessage({ type: 'INIT_ERROR', error: err.message || String(err) });
    }
    return;
  }

  if (type === 'RUN') {
    if (!ready || !JSCPP) {
      self.postMessage({ type: 'RUN_ERROR', id, error: 'C interpreter not initialized' });
      return;
    }

    try {
      let output = '';

      const config = {
        stdio: {
          write: function (s) {
            output += s;
            self.postMessage({ type: 'OUTPUT', id, text: s });
          },
        },
        unsigned_overflow: 'warn',
        maxTimeout: 30000,
      };

      const exitCode = JSCPP.run(code, input || '', config);

      self.postMessage({
        type: 'RUN_DONE',
        id,
        output: output,
        exitCode: exitCode,
      });
    } catch (err) {
      const errMsg = err.message || String(err);
      if (errMsg.includes('timeout') || errMsg.includes('Timeout')) {
        self.postMessage({ type: 'RUN_ERROR', id, error: 'Program timed out (30s limit)' });
      } else {
        self.postMessage({ type: 'RUN_ERROR', id, error: errMsg });
      }
    }
  }
}

self.onmessage = ourHandler;
