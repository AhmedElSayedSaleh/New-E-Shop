import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
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
