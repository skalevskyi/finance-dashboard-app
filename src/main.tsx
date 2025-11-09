import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';

// Safe checks for external scripts (FingerPrint.js, Ex.js)
// Prevent undefined values in console
if (typeof window !== 'undefined') {
  // Safe localStorage access for FINGERPRINT_SWITCH
  try {
    const fingerprintSwitch = localStorage.getItem('FINGERPRINT_SWITCH') || 'off';
    if (typeof (window as any).all_funcdisable === 'function') {
      (window as any).all_funcdisable = (window as any).all_funcdisable.bind(window);
    }
  } catch (error) {
    // Silently handle localStorage errors (e.g., in private browsing)
  }

  // Wrap console methods to prevent undefined values
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    const filteredArgs = args.filter((arg) => arg !== undefined);
    if (filteredArgs.length > 0) {
      originalError.apply(console, filteredArgs as Parameters<typeof originalError>);
    }
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
