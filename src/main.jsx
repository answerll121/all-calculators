import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './i18n'
import { CurrencyProvider } from './context/CurrencyContext'
import { FavoritesProvider } from './context/FavoritesContext'

import GlobalErrorBoundary from './components/GlobalErrorBoundary'
import { HelmetProvider } from 'react-helmet-async';

// PWA Service Worker Registration
import { registerSW } from 'virtual:pwa-register';

if ('serviceWorker' in navigator) {
  registerSW({
    immediate: true,
    onNeedRefresh() {
      // Prompt user or automatically refresh
      console.log('New content available, please refresh.');
    },
    onOfflineReady() {
      console.log('App is ready to work offline.');
    },
  });
}

// Initialize GA4
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_TRACKING_ID;
if (GA_MEASUREMENT_ID) {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <HelmetProvider>
        <CurrencyProvider>
          <FavoritesProvider>
            <App />
          </FavoritesProvider>
        </CurrencyProvider>
      </HelmetProvider>
    </GlobalErrorBoundary>
  </StrictMode>,
)
