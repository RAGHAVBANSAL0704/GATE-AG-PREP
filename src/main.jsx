import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { registerServiceWorker } from './serviceWorkerRegistration'
import './index.css'

// Global resilience against stale deployment chunk mismatch
window.addEventListener('error', (e) => {
  if (e?.message && (e.message.includes('Importing a module script failed') || e.message.includes('Failed to fetch dynamically imported module'))) {
    const refreshed = sessionStorage.getItem('gate_ag_chunk_reload');
    if (!refreshed) {
      sessionStorage.setItem('gate_ag_chunk_reload', 'true');
      window.location.reload();
    }
  }
});

window.addEventListener('unhandledrejection', (e) => {
  if (e?.reason?.message && (e.reason.message.includes('Importing a module script failed') || e.reason.message.includes('Failed to fetch dynamically imported module'))) {
    const refreshed = sessionStorage.getItem('gate_ag_chunk_reload');
    if (!refreshed) {
      sessionStorage.setItem('gate_ag_chunk_reload', 'true');
      window.location.reload();
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)

// Initialize Service Worker for PWA Offline Functionality
registerServiceWorker({
  onSuccess: (reg) => {
    console.log('[PWA] App is ready for offline use.');
  },
  onUpdate: (reg) => {
    console.log('[PWA] New version available. Refresh to activate.');
    if (reg?.waiting) {
      reg.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  }
});

