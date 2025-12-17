import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Suppress 404 errors from Iconify API in console
if (typeof window !== 'undefined') {
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
}

createRoot(document.getElementById("root")!).render(<App />);
