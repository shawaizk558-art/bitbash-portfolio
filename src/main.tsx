// Import React first to ensure proper initialization order
import "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Defer error suppression until after initial render to reduce main-thread work
if (typeof window !== 'undefined') {
  // Use requestIdleCallback to defer non-critical error handling
  const setupErrorHandling = () => {
    const originalError = console.error;
    console.error = (...args: any[]) => {
      // Suppress 404 errors from iconify API
      const message = args[0]?.toString() || '';
      if (message.includes('api.iconify.design') && message.includes('404')) {
        return; // Silently ignore iconify 404 errors
      }
      originalError.apply(console, args);
    };

    // Also suppress network errors in the console
    window.addEventListener('error', (event) => {
      if (event.message?.includes('api.iconify.design') || 
          event.filename?.includes('iconify')) {
        event.preventDefault();
        return false;
      }
    }, true);

    // Suppress unhandled promise rejections from failed image loads
    window.addEventListener('unhandledrejection', (event) => {
      const reason = event.reason?.toString() || '';
      if (reason.includes('api.iconify.design') || reason.includes('404')) {
        event.preventDefault();
        return false;
      }
    });
  };

  // Defer error handling setup
  if ('requestIdleCallback' in window) {
    requestIdleCallback(setupErrorHandling, { timeout: 1000 });
  } else {
    setTimeout(setupErrorHandling, 1000);
  }
}

createRoot(document.getElementById("root")!).render(<App />);
