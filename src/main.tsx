import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Matikan service worker lama (sisa era PWA): SW basi bisa menyajikan
// bundle kadaluarsa (yang tombolnya masih lari ke web-lab-ap).
// Build sekarang PWA-off, jadi tidak ada SW baru yang didaftarkan.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations()
    .then((regs) => { regs.forEach((r) => { r.unregister().catch(() => {}); }); })
    .catch(() => {});
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
