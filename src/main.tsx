import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Fix for "Cannot set property fetch of #<Window> which has only a getter"
// This error occurs when a library tries to polyfill fetch in an environment where it's read-only.
if (typeof window !== 'undefined') {
  const originalFetch = window.fetch;
  if (originalFetch) {
    try {
      // We use a getter/setter pattern. The setter is a no-op to prevent
      // libraries from crashing when they try to overwrite fetch.
      Object.defineProperty(window, 'fetch', {
        get() { return originalFetch; },
        set() { 
          console.warn('A library tried to overwrite window.fetch. This operation was ignored to prevent a TypeError.');
        },
        configurable: true,
        enumerable: true
      });
    } catch (e) {
      // If we can't redefine it, it's likely already protected.
    }
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
