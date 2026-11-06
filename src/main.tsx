import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { disableZoom } from "./lib/disableZoom";
import { registerServiceWorker } from "./lib/pwa";
import "./styles/global.css";

disableZoom();
registerServiceWorker();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
