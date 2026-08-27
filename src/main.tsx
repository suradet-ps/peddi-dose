import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles/tokens.css';
import './styles/base.css';
import './styles/app.css';

import ErrorBoundary from './components/ErrorBoundary';
import App from './App';

const metaThemeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
if (metaThemeColor !== null) {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const updateThemeColor = () => {
    metaThemeColor.content = mq.matches ? '#0b0f19' : '#f6f8fb';
  };
  updateThemeColor();
  mq.addEventListener('change', updateThemeColor);
}

const rootElement = document.getElementById('root');
if (rootElement === null) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
