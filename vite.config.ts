import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Jika di-deploy di sub-folder (mis. GitHub Pages: /nama-repo/),
// ubah base menjadi "/nama-repo/" — router, manifest & service worker ikut menyesuaikan.
export default defineConfig({
  base: "/",
  plugins: [react()],
});
