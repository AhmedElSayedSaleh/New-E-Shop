import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/wc": {
        target: "https://hawaaeg.com/wp-json/wc/v3",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/wc/, ""),
      },
    },
  },
});
