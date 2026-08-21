import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { registerServiceWorker } from './serviceWorkerRegistration'
import './index.css'

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
  }
});

