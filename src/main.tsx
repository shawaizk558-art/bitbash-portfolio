import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// Initialize performance monitoring early so it's available in console
import "./lib/performance";

createRoot(document.getElementById("root")!).render(<App />);
